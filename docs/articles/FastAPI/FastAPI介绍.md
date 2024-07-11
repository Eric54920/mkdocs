---
comments: true
---

FastAPI 是一个用于构建 API 的现代、快速（高性能）Web 框架，使用 Python 3.6+ 编写。它基于标准的 Python 类型提示，提供了极高的性能和简洁的代码语法。FastAPI 是一个理想的框架，用于构建高性能的 Web 应用程序和 API，特别适合需要高并发和快速响应的应用场景。

### 主要特点

**高性能**：

   - 基于 Starlette（用于 Web 部分）和 Pydantic（用于数据部分）构建，性能媲美 Node.js 和 Go。
   - 利用 Python 的类型提示，实现了高效的代码执行和数据验证。

**易于使用**：

   - 语法简洁，代码量少，开发者可以快速上手和开发。
   - 通过类型提示，提供自动补全和类型检查，提高开发效率和代码质量。

**自动生成文档**：

   - 自动生成交互式 API 文档，包括 Swagger UI 和 ReDoc，便于开发者和用户测试和理解 API。
   - 通过简单的注释和类型提示，自动生成详细的 API 文档。

**类型安全**：

   - 完全基于 Python 的类型提示，确保代码的类型安全。
   - 提供强大的数据验证和序列化功能，减少错误和提高安全性。

**异步支持**：

   - 原生支持异步编程模型，可以轻松编写异步代码，提高性能和并发性。

**依赖注入**：

   - 内置依赖注入系统，简化代码结构，提高代码的可维护性和可测试性。

### 基本使用示例

以下是一个简单的 FastAPI 应用示例，展示了如何创建和运行一个基本的 Web 应用。

#### 安装 FastAPI 和 Uvicorn

使用 pip 安装 FastAPI 和 Uvicorn（ASGI 服务器）：

```bash
pip install fastapi uvicorn
```

#### 创建一个简单的 FastAPI 应用

创建一个名为 `main.py` 的文件，内容如下：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

#### 运行 FastAPI 应用

在命令行中运行以下命令启动 Uvicorn 服务器：

```bash
uvicorn main:app --reload
```

访问 `http://127.0.0.1:8000/`，你将看到返回的 JSON 响应 `{"Hello": "World"}`。

访问 `http://127.0.0.1:8000/items/1?q=test`，你将看到返回的 JSON 响应 `{"item_id": 1, "q": "test"}`。

#### 自动生成的文档

访问 `http://127.0.0.1:8000/docs`，查看自动生成的 Swagger UI 文档。

访问 `http://127.0.0.1:8000/redoc`，查看自动生成的 ReDoc 文档。

### 数据模型和验证示例

使用 Pydantic 定义数据模型和验证。

创建一个名为 `main.py` 的文件，内容如下：

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/")
def create_item(item: Item):
    return item
```

运行应用并发送 POST 请求到 `/items/` 端点，可以验证和处理请求体中的数据。

### 路由和依赖注入示例

```python
from fastapi import Depends, FastAPI

app = FastAPI()

def get_query_token(token: str):
    if token != "jessica":
        raise HTTPException(status_code=400, detail="Invalid token")
    return token

@app.get("/items/")
def read_items(token: str = Depends(get_query_token)):
    return [{"item": "Foo"}, {"item": "Bar"}]
```

### 异步支持示例

```python
import asyncio
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root():
    await asyncio.sleep(1)
    return {"message": "Hello World"}
```

### 总结

FastAPI 是一个现代、高性能的 Web 框架，非常适合构建快速、可靠和可扩展的 API。它利用 Python 的类型提示实现了自动文档生成、数据验证和类型安全，极大地提高了开发效率和代码质量。无论是简单的 API 服务还是复杂的 Web 应用，FastAPI 都提供了强大的功能和灵活性，使其成为开发者的理想选择。