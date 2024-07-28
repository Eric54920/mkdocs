---
comments: true
---

FastAPI 路径操作配置允许开发者详细定义和管理 API 端点的行为和特性。通过配置路径操作，可以设置响应状态码、添加描述、标签、示例等信息，从而提高 API 的可读性和可维护性。以下是对 FastAPI 路径操作配置的详细介绍。

### 1. 路径操作配置

FastAPI 提供了多种路径操作配置选项，如设置响应状态码、添加描述、标签等。

#### 1.1 配置响应状态码

可以通过 `status_code` 参数来设置路径操作的默认响应状态码。

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: Item):
    return item
```

在上述例子中，POST 请求成功时将返回状态码 `201 Created`。

#### 1.2 添加描述和摘要

可以通过 `summary` 和 `description` 参数来添加路径操作的摘要和详细描述。

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    description="Create an item with all the information, name, description, price, and tax",
)
async def create_item(item: Item):
    return item
```

在上述例子中，路径操作的摘要和详细描述将显示在自动生成的 API 文档中。

#### 1.3 添加响应描述

可以通过 `response_description` 参数来添加响应的描述信息。

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    description="Create an item with all the information, name, description, price, and tax",
    response_description="The created item",
)
async def create_item(item: Item):
    return item
```

#### 1.4 添加标签

可以通过 `tags` 参数为路径操作添加标签。标签在自动生成的 API 文档中用于对路径操作进行分类。

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    description="Create an item with all the information, name, description, price, and tax",
    response_description="The created item",
    tags=["items"]
)
async def create_item(item: Item):
    return item
```

#### 1.5 添加示例

可以通过 `examples` 参数为路径操作添加请求和响应的示例。

```python
from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post(
    "/items/",
    response_model=Item,
    summary="Create an item",
    description="Create an item with all the information, name, description, price, and tax",
    response_description="The created item",
    tags=["items"],
    response_model_exclude_unset=True,
)
async def create_item(
    item: Item = Body(
        ...,
        examples={
            "normal": {
                "summary": "A normal example",
                "description": "A **normal** item works correctly.",
                "value": {
                    "name": "Foo",
                    "description": "A very nice Item",
                    "price": 35.4,
                    "tax": 3.2,
                },
            },
            "converted": {
                "summary": "An example with converted data",
                "description": "FastAPI can convert price strings to actual numbers automatically",
                "value": {
                    "name": "Bar",
                    "price": "35.4",
                },
            },
            "invalid": {
                "summary": "Invalid data is rejected with an error",
                "value": {
                    "name": "Baz",
                    "price": "thirty five point four",
                },
            },
        },
    )
):
    return item
```

在上述例子中，使用 `examples` 参数为请求体 `item` 提供了多个示例，这些示例将显示在 API 文档中，帮助用户理解如何正确使用该端点。

### 2. 总结

FastAPI 提供了丰富的路径操作配置选项，使开发者可以详细定义 API 端点的行为和特性。通过配置响应状态码、添加描述、标签、示例等信息，可以提高 API 的可读性和可维护性。此外，FastAPI 还支持在路径操作函数中返回自定义的响应，包括自定义状态码和响应头。通过灵活的路径操作配置，开发者可以构建出功能强大且用户友好的 API。