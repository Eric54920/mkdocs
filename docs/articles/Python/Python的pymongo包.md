---
comments: true
---

`pymongo` 是一个用于与 MongoDB 进行交互的 Python 库，它提供了对 MongoDB 数据库的完整支持，包括查询、插入、更新、删除等常见操作。`pymongo` 是 MongoDB 官方推荐的 Python 客户端。

下面是一些常见的 `pymongo` 使用示例和关键功能：

### 1. 安装 pymongo

首先，你需要安装 `pymongo` 库。你可以通过 `pip` 安装它：
```bash
pip install pymongo
```

### 2. 连接 MongoDB 数据库

在 `pymongo` 中，连接 MongoDB 是通过 `MongoClient` 类来完成的。

```python
from pymongo import MongoClient

# 连接到本地 MongoDB 实例
client = MongoClient('mongodb://localhost:27017/')

# 选择数据库
db = client["mydatabase"]

# 选择集合（类似于表）
collection = db["mycollection"]
```

### 3. 插入数据

`pymongo` 支持插入单个或多个文档。

#### 3.1 插入单个文档
```python
data = {"name": "John", "age": 30, "city": "New York"}
result = collection.insert_one(data)
print(f"插入的文档 ID: {result.inserted_id}")
```

#### 3.2 插入多个文档
```python
data = [
    {"name": "Alice", "age": 25, "city": "London"},
    {"name": "Bob", "age": 22, "city": "Paris"}
]
result = collection.insert_many(data)
print(f"插入的文档 IDs: {result.inserted_ids}")
```

### 4. 查询数据

你可以使用 `find()` 方法查询集合中的文档。它返回一个游标（cursor），可以通过 `for` 循环遍历结果。

#### 4.1 查询所有文档
```python
cursor = collection.find()
for document in cursor:
    print(document)
```

#### 4.2 查询符合条件的文档
```python
cursor = collection.find({"name": "John"})
for document in cursor:
    print(document)
```

#### 4.3 查询单个文档
```python
document = collection.find_one({"name": "John"})
print(document)
```

### 5. 更新数据

`pymongo` 提供了 `update_one()` 和 `update_many()` 方法来更新文档。`update()` 方法在新版 `pymongo` 中已被弃用。

#### 5.1 更新单个文档
```python
result = collection.update_one(
    {"name": "John"},  # 查询条件
    {"$set": {"age": 35}}  # 更新内容
)
print(f"更新的文档数: {result.modified_count}")
```

#### 5.2 更新多个文档
```python
result = collection.update_many(
    {"age": {"$lt": 30}},  # 查询条件
    {"$set": {"status": "young"}}  # 更新内容
)
print(f"更新的文档数: {result.modified_count}")
```

### 6. 删除数据

`pymongo` 提供了 `delete_one()` 和 `delete_many()` 方法来删除文档。

#### 6.1 删除单个文档
```python
result = collection.delete_one({"name": "John"})
print(f"删除的文档数: {result.deleted_count}")
```

#### 6.2 删除多个文档
```python
result = collection.delete_many({"age": {"$lt": 30}})
print(f"删除的文档数: {result.deleted_count}")
```

### 7. 排序与分页

你可以使用 `sort()` 和 `skip()`/`limit()` 来实现数据排序和分页。

#### 7.1 排序
```python
cursor = collection.find().sort("age", 1)  # 按照 "age" 字段升序排序
for document in cursor:
    print(document)
```

#### 7.2 分页
```python
page = 1
page_size = 10
cursor = collection.find().skip((page - 1) * page_size).limit(page_size)
for document in cursor:
    print(document)
```

### 8. 聚合操作

`pymongo` 支持 MongoDB 的聚合框架。你可以通过 `aggregate()` 方法执行复杂的聚合操作。

```python
pipeline = [
    {"$match": {"age": {"$gt": 25}}},  # 筛选 age 大于 25 的文档
    {"$group": {"_id": "$city", "count": {"$sum": 1}}}  # 按 city 分组并计算每个 city 的数量
]

cursor = collection.aggregate(pipeline)
for document in cursor:
    print(document)
```

### 9. 索引

`pymongo` 支持创建索引来优化查询性能。你可以使用 `create_index()` 方法创建单字段或复合索引。

#### 9.1 创建单字段索引
```python
collection.create_index([("name", 1)])  # 按照 "name" 字段升序创建索引
```

#### 9.2 创建复合索引
```python
collection.create_index([("age", 1), ("city", -1)])  # 按照 "age" 升序和 "city" 降序创建复合索引
```

### 10. 连接池管理

`pymongo` 会自动管理连接池，你可以通过配置 `MongoClient` 来调整连接池的大小、最大连接数等。

```python
client = MongoClient('mongodb://localhost:27017/', maxPoolSize=50)
```

### 11. 错误处理

`pymongo` 提供了很多错误类型来帮助处理不同的错误情况。例如，`DuplicateKeyError` 用于处理重复键错误。

```python
from pymongo.errors import DuplicateKeyError

try:
    collection.insert_one({"_id": 1, "name": "John"})
    collection.insert_one({"_id": 1, "name": "Alice"})
except DuplicateKeyError:
    print("插入数据时发生重复键错误")
```

### 12. 常见查询操作符

- **$eq**: 等于
- **$ne**: 不等于
- **$gt**: 大于
- **$lt**: 小于
- **$gte**: 大于等于
- **$lte**: 小于等于
- **$in**: 在指定值的集合中
- **$nin**: 不在指定值的集合中
- **$and**: 与
- **$or**: 或
- **$not**: 非
- **$exists**: 字段是否存在

例如：
```python
# 查找年龄大于30的用户
cursor = collection.find({"age": {"$gt": 30}})
for document in cursor:
    print(document)

# 查找name为"John"或"Bob"的用户
cursor = collection.find({"name": {"$in": ["John", "Bob"]}})
for document in cursor:
    print(document)
```

### 13. 总结

`pymongo` 是一个功能丰富且易于使用的 MongoDB 客户端库。通过它，你可以轻松执行所有常见的数据库操作，如插入、查询、更新、删除和聚合。同时，`pymongo` 支持并发处理和连接池管理，适用于多种应用场景。