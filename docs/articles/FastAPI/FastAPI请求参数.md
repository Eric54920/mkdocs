---
comments: true
---

FastAPI 提供了多种方式来处理和验证请求参数。请求参数主要分为三种：路径参数、查询参数和请求体参数。以下是详细介绍每种请求参数及其使用方式。

### 1. 路径参数

路径参数是从 URL 路径中提取的参数。它们通常用于唯一标识资源。

**定义路径参数**：

在 FastAPI 中，路径参数通过在路径中使用花括号 `{}` 来定义，并在路径操作函数的参数列表中声明对应的参数。

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

在上述例子中，`item_id` 是一个路径参数，它被提取并传递给 `read_item` 函数。类型提示 `int` 确保 `item_id` 被解析为整数。

### 2. 查询参数

查询参数通过 URL 中的查询字符串（以 `?` 开始，后面跟键值对）传递。例如，`/items?name=foo&price=20` 中，`name` 和 `price` 是查询参数。

**定义查询参数**：

在路径操作函数中直接声明参数，且这些参数没有在路径中定义，则它们会被认为是查询参数。

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/")
async def read_item(name: str = None, price: float = None):
    return {"name": name, "price": price}
```

在上述例子中，`name` 和 `price` 是查询参数。默认情况下，它们是可选的（即可以为空），但可以通过设置默认值或使用 `Query` 来更详细地配置。

**使用 `Query` 对查询参数进行配置**：

FastAPI 提供 `Query` 类来配置查询参数的默认值、别名、描述等。

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items/")
async def read_item(name: str = Query(None, alias="item-name"), price: float = Query(..., gt=0)):
    return {"name": name, "price": price}
```

在上述例子中，`name` 参数使用了别名 `item-name`，而 `price` 参数是必需的（没有默认值）且必须大于 0。

### 3. 请求体参数

请求体参数用于接收客户端发送的 JSON、XML、表单数据等。在 FastAPI 中，请求体参数通常使用 Pydantic 模型来定义和验证。

**定义请求体参数**：

通过在路径操作函数中声明 Pydantic 模型类型的参数来接收请求体数据。

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

@app.post("/items/")
async def create_item(item: Item):
    return item
```

在上述例子中，`Item` 模型定义了请求体的结构。客户端发送的 JSON 数据将被解析为 `Item` 对象，并传递给 `create_item` 函数。

**请求体参数的高级配置**：

可以使用 `Body` 类来配置请求体参数，例如添加描述、设置默认值、示例数据等。

```python
from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

@app.post("/items/")
async def create_item(item: Item = Body(..., example={"name": "Foo", "price": 35.4, "is_offer": False})):
    return item
```

### 4. 多个请求体参数

FastAPI 支持在一个路径操作中接收多个请求体参数。使用 `Body` 类可以区分和验证这些参数。

```python
from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

class User(BaseModel):
    username: str
    password: str

@app.put("/items/{item_id}")
async def update_item(
    item_id: int, 
    item: Item, 
    user: User, 
    importance: int = Body(..., gt=0)
):
    return {"item_id": item_id, "item": item, "user": user, "importance": importance}
```

在上述例子中，`item` 和 `user` 是两个独立的请求体参数，`importance` 是一个单独的请求体字段。

### 5. 表单数据

FastAPI 也支持处理表单数据，使用 `Form` 类来声明表单参数。

```python
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/login/")
async def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}
```

在上述例子中，`username` 和 `password` 是从表单数据中提取的参数。

### 6. 文件上传

FastAPI 通过 `File` 类来处理文件上传，并通过 `UploadFile` 类型提供文件操作的接口。

```python
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/uploadfile/")
async def upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
```

在上述例子中，`file` 参数是一个上传的文件。

### 7. 总结

FastAPI 提供了强大的请求参数处理能力，包括路径参数、查询参数、请求体参数、表单数据和文件上传。通过类型提示和 Pydantic 模型，FastAPI 实现了简洁的代码和强大的数据验证功能，使得开发者能够高效地构建和维护 API 服务。