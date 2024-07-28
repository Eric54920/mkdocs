---
comments: true
---

FastAPI 的依赖注入（Dependency Injection）系统是其核心功能之一，允许你在构建 API 时管理和复用复杂的逻辑、参数和服务。依赖注入可以用于共享数据库连接、缓存、配置、用户认证等。以下是 FastAPI 依赖注入的详细介绍。

### 1. 依赖注入的基础

#### 1.1 定义依赖函数

一个依赖函数是一个普通的 Python 函数，可以执行任意逻辑并返回一个值。依赖函数通常用于封装和复用常用逻辑。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def common_parameters(q: str = None, skip: int = 0, limit: int = 10):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

在上述例子中，`common_parameters` 是一个依赖函数，`Depends` 用于将其注入到路径操作函数 `read_items` 中。

### 2. 高级依赖注入

#### 2.1 类作为依赖项

依赖项可以是一个类实例，通过创建类方法和属性，可以更好地组织和管理依赖项的逻辑。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

class CommonQueryParams:
    def __init__(self, q: str = None, skip: int = 0, limit: int = 10):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    return {"q": commons.q, "skip": commons.skip, "limit": commons.limit}
```

在上述例子中，`CommonQueryParams` 类封装了查询参数的逻辑，并作为依赖项注入到路径操作函数中。

#### 2.2 依赖项的依赖

依赖函数可以有自己的依赖项，形成依赖链。这使得你可以构建复杂的依赖关系。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def query_extractor(q: str = None):
    return q

def query_or_cookie_extractor(
    q: str = Depends(query_extractor), last_query: str = None
):
    if not q:
        return last_query
    return q

@app.get("/items/")
async def read_query(query_or_default: str = Depends(query_or_cookie_extractor)):
    return {"q_or_cookie": query_or_default}
```

在上述例子中，`query_or_cookie_extractor` 依赖于 `query_extractor`，形成了一个依赖链。

### 3. 全局依赖项

#### 3.1 应用级别的依赖项

可以在应用启动时添加全局依赖项，这样所有请求都会自动包含这些依赖项。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
    return x_token

app.dependency_overrides[verify_token] = verify_token

@app.get("/items/")
async def read_items(token: str = Depends(verify_token)):
    return {"token": token}
```

在上述例子中，`verify_token` 是一个全局依赖项，每个请求都会自动验证 `X-Token` 头。

### 4. 依赖项中的状态管理

#### 4.1 共享状态

依赖项可以用于管理共享状态，如数据库连接、缓存等。

```python
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base

app = FastAPI()

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 数据库依赖项
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
async def read_items(db: Session = Depends(get_db)):
    items = db.query(Item).all()
    return items
```

在上述例子中，`get_db` 是一个依赖函数，用于管理数据库会话的生命周期。

### 5. 依赖项的参数化

#### 5.1 动态传递参数

可以使用函数或类参数化依赖项，动态地传递参数。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def query_extractor(q: str = None):
    return q

def query_or_default_extractor(
    q: str = Depends(query_extractor), default_q: str = "default"
):
    return q or default_q

@app.get("/items/")
async def read_items(query_or_default: str = Depends(query_or_default_extractor)):
    return {"q": query_or_default}
```

在上述例子中，`query_or_default_extractor` 动态地从 `query_extractor` 或默认值 `default_q` 中获取参数。

### 6. 依赖项的作用域

#### 6.1 单次请求作用域

默认情况下，依赖项在每个请求中执行一次。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

async def log_request_id(request_id: str = Header(...)):
    print(f"Request ID: {request_id}")

@app.get("/items/")
async def read_items(log: None = Depends(log_request_id)):
    return {"message": "Logging request ID"}
```

在上述例子中，每次请求都会执行 `log_request_id`，记录请求 ID。

#### 6.2 单次请求内的共享依赖

使用 `Depends` 可以在单次请求内共享同一个依赖实例。

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def dependency_a():
    return "A"

def dependency_b(dep_a: str = Depends(dependency_a)):
    return dep_a + "B"

@app.get("/items/")
async def read_items(result: str = Depends(dependency_b)):
    return {"result": result}
```

在上述例子中，`dependency_a` 的结果在请求内被 `dependency_b` 共享。

### 7. 异常处理中的依赖

#### 7.1 依赖项中的异常处理

可以在依赖函数中引发和处理异常，以实现复杂的错误处理逻辑。

```python
from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
    return x_token

@app.get("/items/")
async def read_items(token: str = Depends(verify_token)):
    return {"token": token}
```

在上述例子中，`verify_token` 依赖函数中引发的异常将自动被路径操作处理。

### 8. 总结

FastAPI 的依赖注入系统提供了强大而灵活的机制，帮助开发者管理复杂的依赖关系和共享状态。通过依赖函数、类依赖、全局依赖、动态参数化和作用域控制，开发者可以轻松构建和维护高效、模块化的 API。同时，依赖注入还支持异常处理和请求级别的状态管理，使得 API 的开发更加健壮和灵活。