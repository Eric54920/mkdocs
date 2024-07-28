---
comments: true
---

FastAPI 提供了多种机制来处理安全性和认证，包括 OAuth2、JWT（JSON Web Tokens）、API 密钥等。这些机制帮助开发者保护 API，确保只有授权用户可以访问受保护的资源。以下是对 FastAPI 安全和认证的详细介绍。

### 1. OAuth2 with Password (and hashing), Bearer with JWT tokens

#### 1.1 基础配置

首先，需要安装 `python-jose` 和 `passlib` 库来处理 JWT 和密码哈希：

```bash
pip install python-jose[cryptography] passlib[bcrypt]
```

#### 1.2 配置安全依赖

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional

# 创建 FastAPI 应用
app = FastAPI()

# 配置密码哈希
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 配置 OAuth2 密码流
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 密钥、算法和过期时间配置
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 用户数据模型
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

# 模拟数据库
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": pwd_context.hash("secret"),
        "disabled": False,
    }
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

#### 1.3 获取当前用户

```python
from fastapi import Depends

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
```

在上述例子中，`get_current_user` 函数从 JWT 中提取用户信息，并验证用户的有效性。`get_current_active_user` 函数进一步检查用户是否被禁用。

### 2. 基于 API Key 的认证

有时我们需要使用 API Key 来保护 API，而不是 OAuth2。

#### 2.1 配置 API Key 依赖

```python
from fastapi import FastAPI, Security, HTTPException, status
from fastapi.security.api_key import APIKeyHeader, APIKey

API_KEY = "your-secret-api-key"
API_KEY_NAME = "access_token"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

app = FastAPI()

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key",
        )

@app.get("/secure-data/")
async def get_secure_data(api_key: APIKey = Depends(get_api_key)):
    return {"data": "This is secure data"}
```

在上述例子中，`get_api_key` 函数验证请求头中的 API Key 是否有效。

### 3. HTTP 基本认证

HTTP 基本认证可以用于简单的用户名和密码验证。

#### 3.1 配置 HTTP 基本认证

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()
security = HTTPBasic()

@app.get("/secure-data/")
async def get_secure_data(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "user")
    correct_password = secrets.compare_digest(credentials.password, "password")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return {"data": "This is secure data"}
```

在上述例子中，`get_secure_data` 函数使用 HTTP 基本认证验证用户的用户名和密码。

### 4. 安全依赖和路径操作的结合

你可以将各种安全依赖项结合到路径操作中，以确保不同的端点具有适当的保护措施。

```python
@app.get("/items/", dependencies=[Depends(get_current_active_user)])
async def read_items():
    return [{"item_id": "Foo"}, {"item_id": "Bar"}]

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
```

在上述例子中，`/items/` 路径操作需要用户通过 `get_current_active_user` 的验证，而 `/users/me/` 路径操作则需要从 `get_current_active_user` 获取当前用户信息并返回。

### 5. 总结

FastAPI 提供了多种安全和认证机制，包括 OAuth2、JWT、API Key 和 HTTP 基本认证等。通过使用这些机制，可以确保 API 的安全性，保护敏感数据，确保只有授权用户可以访问受保护的资源。开发者可以根据具体需求选择合适的认证机制，并结合依赖注入、响应模型等特性构建健壮、安全的 API。