---
comments: true
---

Beanie 是一个基于 MongoDB 的异步 ODM（Object Document Mapper），为 Python 提供了便捷的数据操作能力。以下是使用 Beanie 执行增删改查（CRUD）操作的基本用法。

### 1. **安装依赖**
```bash
pip install beanie motor
```

### 2. **初始化 Beanie 和定义模型**

#### 2.1 定义文档模型
Beanie 支持嵌套模型、索引、验证和默认值设置：

```python
from beanie import Document, Indexed, init_beanie
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

# 嵌套文档模型
class Address(BaseModel):
    city: str
    zip_code: str

# 主文档模型
class User(Document):
    name: Indexed(str, unique=True)  # 索引字段，唯一约束
    age: int = Field(ge=0, le=120)  # 年龄，范围验证
    email: Indexed(str)
    address: Address  # 嵌套文档
    created_at: datetime = Field(default_factory=datetime.utcnow)  # 自动添加时间戳

    class Settings:
        name = "users"  # 集合名称
        indexes = [
            "email",  # 单字段索引
            [("age", 1)],  # 复合索引
        ]

# 初始化数据库连接
async def init():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    await init_beanie(database=client.test_db, document_models=[User])  # test_db 是数据库名称

asyncio.run(init())
```

### 3. **增删改查基础用法**

#### 3.1 创建文档（Create）

- **单个文档创建**
```python
async def create_user():
    user = User(
        name="Alice",
        age=25,
        email="alice@example.com",
        address=Address(city="New York", zip_code="10001")
    )
    await user.insert()  # 保存到数据库
    print(f"Created user: {user.id}")
```

- **批量插入**
```python
async def create_multiple_users():
    users = [
        User(name="Bob", age=30, email="bob@example.com", address=Address(city="LA", zip_code="90001")),
        User(name="Charlie", age=35, email="charlie@example.com", address=Address(city="Chicago", zip_code="60601"))
    ]
    await User.insert_many(users)
    print("Inserted multiple users.")
```

#### 3.2 查询文档（Read）

- **查询单个文档**
```python
async def get_user_by_name(name: str):
    user = await User.find_one(User.name == name)
    if user:
        print(user.dict())
    else:
        print("User not found")
```

- **条件查询**
```python
async def get_users_by_age_range(min_age: int, max_age: int):
    users = await User.find(User.age >= min_age, User.age <= max_age).to_list()
    for user in users:
        print(user.dict())
```

- **聚合查询**
```python
async def aggregate_users_by_age():
    pipeline = [
        {"$group": {"_id": "$age", "count": {"$sum": 1}}}
    ]
    result = await User.aggregate(pipeline).to_list()
    print(result)
```

- **分页查询**
```python
async def get_users_paginated(skip: int, limit: int):
    users = await User.find_all().skip(skip).limit(limit).to_list()
    for user in users:
        print(user.dict())
```

#### 3.3 更新文档（Update）

- **更新单个字段**
```python
async def update_user_email(name: str, new_email: str):
    user = await User.find_one(User.name == name)
    if user:
        user.email = new_email
        await user.save()
        print(f"Updated user {name}")
```

- **部分更新（`update` 方法）**
```python
async def update_user_age(name: str, new_age: int):
    result = await User.find(User.name == name).update({"$set": {"age": new_age}})
    print(f"Updated {result.modified_count} document(s).")
```

- **批量更新**
```python
async def update_ages_for_users(min_age: int, new_age: int):
    result = await User.find(User.age >= min_age).update_many({"$set": {"age": new_age}})
    print(f"Updated {result.modified_count} document(s).")
```

#### 3.4 删除文档（Delete）

- **删除单个文档**
```python
async def delete_user_by_name(name: str):
    user = await User.find_one(User.name == name)
    if user:
        await user.delete()
        print(f"Deleted user {name}")
```

- **条件删除**
```python
async def delete_users_by_age(age: int):
    result = await User.find(User.age > age).delete_many()
    print(f"Deleted {result.deleted_count} document(s).")
```

### 4. **高级功能**

#### 4.1 嵌套文档查询
```python
async def find_users_by_city(city: str):
    users = await User.find(User.address.city == city).to_list()
    for user in users:
        print(user.dict())
```

#### 4.2 事务管理
Beanie 支持 MongoDB 的事务功能：

```python
from beanie.odm.fields import PydanticObjectId

async def transactional_operation():
    async with User.start_transaction():
        user = await User.find_one(User.name == "Alice")
        if user:
            user.age += 1
            await user.save()
        await User(name="Transactional User", age=20, email="txn@example.com").insert()
```

#### 4.3 配置校验
通过 `pydantic` 的 `Field`，可以定义字段验证规则：

```python
class User(Document):
    name: str = Field(..., min_length=3, max_length=50)  # 必须有值，长度限制
    age: int = Field(..., ge=0)  # 非负整数
```

#### 4.4 TTL（Time-To-Live）索引
文档可以设置自动过期时间：

```python
from datetime import datetime, timedelta

class Session(Document):
    user_id: str
    expires_at: datetime = Field(default_factory=lambda: datetime.utcnow() + timedelta(hours=1))

    class Settings:
        name = "sessions"
        indexes = [
            {"fields": ["expires_at"], "expireAfterSeconds": 0}  # 自动删除过期文档
        ]
```

### 5. 总结与扩展

- **增删改查功能：** 提供了简单易用的方法，如 `insert`、`find`、`save` 和 `delete`。
- **高级功能：** 支持嵌套文档、事务、TTL 索引、聚合和分页查询。
- **扩展：** 可以通过 Pydantic 的功能扩展字段验证和默认值。

如果有其他具体需求或扩展功能，可以进一步探讨和实现。