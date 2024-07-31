---
comments: true
---

Tortoise-ORM 是一个异步的 Python ORM，专为使用 asyncio 的应用程序设计。它非常适合与 FastAPI 一起使用，因为 FastAPI 也支持异步操作。以下是如何在 FastAPI 项目中使用 Tortoise-ORM 进行数据库操作的详细介绍。

### 1. 安装依赖

首先，安装必要的依赖项：

```bash
pip install fastapi[all] tortoise-orm
```

### 2. 配置 Tortoise-ORM

在 FastAPI 项目中配置 Tortoise-ORM 通常包括以下步骤：

1. 定义数据库模型。
2. 在 FastAPI 应用程序中初始化 Tortoise-ORM。
3. 使用 Tortoise-ORM 进行数据库操作。

#### 2.1 定义数据库模型

首先，定义你的数据库模型。Tortoise-ORM 使用类来表示数据库表，每个类属性对应表中的一列。

```python
from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=20, unique=True)
    email = fields.CharField(max_length=50, unique=True)
    hashed_password = fields.CharField(max_length=128)
```

#### 2.2 配置 Tortoise-ORM

在 FastAPI 应用程序中配置 Tortoise-ORM。创建一个启动事件处理器来初始化 ORM，并在关闭时进行清理。

```python
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

app = FastAPI()

register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',  # 这里可以根据需要更换为其他数据库，如 PostgreSQL
    modules={'models': ['your_module']},  # your_module 替换为你实际的模块路径
    generate_schemas=True,
    add_exception_handlers=True,
)
```

#### 2.3 创建 Pydantic 模型

使用 Pydantic 定义你的数据模型，用于请求和响应的数据验证和序列化。

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

#### 2.4 数据库操作

使用 Tortoise-ORM 的方法进行数据库操作，例如创建和查询用户。

```python
from fastapi import Depends, FastAPI, HTTPException
from tortoise.contrib.pydantic import pydantic_model_creator
from .models import User
from .schemas import UserCreate

app = FastAPI()

User_Pydantic = pydantic_model_creator(User, name="User")
UserIn_Pydantic = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)

@app.post("/users/", response_model=User_Pydantic)
async def create_user(user: UserCreate):
    user_obj = await User.create(username=user.username, email=user.email, hashed_password=user.password + "notreallyhashed")
    return await User_Pydantic.from_tortoise_orm(user_obj)

@app.get("/users/{user_id}", response_model=User_Pydantic)
async def read_user(user_id: int):
    user = await User_Pydantic.from_queryset_single(User.get(id=user_id))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### 3. 完整示例

以下是一个完整的 FastAPI 应用程序示例，演示了如何使用 Tortoise-ORM 操作 SQLite 数据库。

#### 3.1 `models.py`

```python
from tortoise import fields, models

class User(models.Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=20, unique=True)
    email = fields.CharField(max_length=50, unique=True)
    hashed_password = fields.CharField(max_length=128)
```

#### 3.2 `schemas.py`

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

#### 3.3 `main.py`

```python
from fastapi import FastAPI, HTTPException
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from .models import User
from .schemas import UserCreate

app = FastAPI()

User_Pydantic = pydantic_model_creator(User, name="User")
UserIn_Pydantic = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)

@app.post("/users/", response_model=User_Pydantic)
async def create_user(user: UserCreate):
    user_obj = await User.create(username=user.username, email=user.email, hashed_password=user.password + "notreallyhashed")
    return await User_Pydantic.from_tortoise_orm(user_obj)

@app.get("/users/{user_id}", response_model=User_Pydantic)
async def read_user(user_id: int):
    user = await User_Pydantic.from_queryset_single(User.get(id=user_id))
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',
    modules={'models': ['your_module.models']},
    generate_schemas=True,
    add_exception_handlers=True,
)
```

### 4. 运行应用

使用以下命令运行 FastAPI 应用：

```bash
uvicorn main:app --reload
```

### 5. 说明

- **模型定义**：`models.py` 文件定义了数据库模型，其中每个类表示数据库中的一个表。
- **Pydantic 模型**：`schemas.py` 文件定义了用于请求和响应的数据模型。
- **主应用文件**：`main.py` 文件是 FastAPI 应用的入口，包含了数据库操作的路径函数和 Tortoise-ORM 的配置。
- **数据库初始化**：`register_tortoise` 函数用于在 FastAPI 应用启动时初始化 Tortoise-ORM，并根据需要生成数据库表。

通过以上步骤，你可以使用 Tortoise-ORM 和 FastAPI 构建一个高效的异步 Web 应用，轻松实现与关系型数据库的交互。