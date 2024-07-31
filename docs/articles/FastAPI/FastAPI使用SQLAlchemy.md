---
comments: true
---

使用 FastAPI 和 SQLAlchemy 构建一个与关系型数据库交互的应用程序，是一种常见且强大的组合。本文将详细介绍如何在 FastAPI 中使用 SQLAlchemy，包括数据库配置、模型定义、依赖注入、CRUD 操作等。

### 1. 安装依赖

首先，安装必要的依赖项：

```bash
pip install fastapi sqlalchemy databases psycopg2-binary
```

### 2. 数据库配置

#### 2.1 数据库连接设置

在项目的配置文件中设置数据库连接 URL，例如使用 PostgreSQL：

```python
DATABASE_URL = "postgresql://user:password@localhost/dbname"
```

#### 2.2 创建 SQLAlchemy 引擎和会话

在 `database.py` 文件中，创建 SQLAlchemy 引擎和会话：

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### 3. 定义模型

定义数据库模型，每个模型类都应继承 `Base` 类。在 `models.py` 文件中定义模型：

```python
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
```

### 4. 创建 Pydantic 模型

使用 Pydantic 定义用于请求和响应的数据模型。在 `schemas.py` 文件中定义 Pydantic 模型：

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True
```

### 5. 依赖注入数据库会话

使用 FastAPI 的依赖注入系统，将数据库会话注入到路径操作函数中。在 `main.py` 文件中定义依赖项：

```python
from fastapi import Depends
from sqlalchemy.orm import Session
from .database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 6. 创建和查询用户

在 `main.py` 文件中，定义路径操作函数来创建和查询用户：

```python
from fastapi import FastAPI, HTTPException
from . import models, schemas
from .database import engine
from sqlalchemy.orm import Session
from .schemas import UserCreate, UserInDB

app = FastAPI()

# 创建数据库表
models.Base.metadata.create_all(bind=engine)

@app.post("/users/", response_model=schemas.UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(username=user.username, email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=schemas.UserInDB)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
```

### 7. 完整示例

以下是一个完整的 FastAPI 应用程序示例，演示了如何使用 SQLAlchemy 操作 PostgreSQL 数据库。

#### 7.1 `models.py`

```python
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
```

#### 7.2 `schemas.py`

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True
```

#### 7.3 `database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

#### 7.4 `main.py`

```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, SessionLocal
from .schemas import UserCreate, UserInDB

app = FastAPI()

# 创建数据库表
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=schemas.UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(username=user.username, email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=schemas.UserInDB)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
```

### 8. 运行应用

使用以下命令运行 FastAPI 应用：

```bash
uvicorn main:app --reload
```

### 9. 总结

通过使用 FastAPI 和 SQLAlchemy，可以构建高效的 Web 应用程序，并轻松实现与关系型数据库的交互。本文介绍了如何配置数据库连接、定义数据库模型和 Pydantic 模型、依赖注入数据库会话，以及如何进行基本的 CRUD 操作。通过这些步骤，你可以快速构建出功能强大的 API。