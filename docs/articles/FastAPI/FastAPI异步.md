---
comments: true
---

FastAPI 是一个现代的、快速（高性能）的 Web 框架，它基于标准的 Python 类型提示构建，用于快速构建 API。其主要特性之一是对异步编程的全面支持，使得处理并发操作变得简单和高效。

### 1. 异步编程基础

在深入了解 FastAPI 的异步特性之前，首先需要了解一些异步编程的基础知识：

- **`async` 和 `await` 关键字**：Python 3.5 引入了 `async` 和 `await` 关键字，用于定义异步函数（coroutines）和暂停执行，直到异步操作完成。
- **`asyncio` 模块**：Python 标准库中的 `asyncio` 模块提供了事件循环、任务和协程，用于编写并发代码。

### 2. FastAPI 中的异步视图函数

在 FastAPI 中，你可以使用标准的同步函数或异步函数（使用 `async def`）来处理请求。

#### 2.1 同步视图函数

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/sync")
def read_sync():
    return {"message": "This is a synchronous endpoint"}
```

#### 2.2 异步视图函数

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/async")
async def read_async():
    return {"message": "This is an asynchronous endpoint"}
```

### 3. 异步数据库操作

在处理涉及 I/O 操作的任务时，使用异步编程可以显著提高性能。以下是如何使用异步数据库库（如 `databases`）与 FastAPI 结合进行异步数据库操作。

#### 3.1 安装依赖

```bash
pip install databases asyncpg
```

#### 3.2 异步数据库操作

```python
from fastapi import FastAPI
from databases import Database

DATABASE_URL = "postgresql://user:password@localhost/dbname"

database = Database(DATABASE_URL)

app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    query = "SELECT * FROM items WHERE id = :item_id"
    item = await database.fetch_one(query, values={"item_id": item_id})
    return {"item": item}
```

在这个例子中，应用启动时连接到数据库，并在关闭时断开连接。请求处理函数 `read_item` 是异步的，并使用 `await` 来等待数据库查询完成。

### 4. 异步 HTTP 请求

你可以使用 `httpx` 库在 FastAPI 中执行异步 HTTP 请求。

#### 4.1 安装依赖

```bash
pip install httpx
```

#### 4.2 异步 HTTP 请求

```python
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.get("/external-data")
async def get_external_data():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://jsonplaceholder.typicode.com/posts")
        return response.json()
```

在这个例子中，`get_external_data` 视图函数使用 `httpx.AsyncClient` 进行异步 HTTP 请求，并返回响应数据。

### 5. 异步任务队列

对于需要在后台执行的长时间任务，可以使用 Celery 之类的任务队列。以下是如何使用 Celery 与 FastAPI 集成：

#### 5.1 安装依赖

```bash
pip install celery redis
```

#### 5.2 配置 Celery

创建一个 `celery.py` 文件：

```python
from celery import Celery

celery_app = Celery(
    "worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def background_task(data):
    # 执行一些后台任务
    return {"message": "Task completed", "data": data}
```

#### 5.3 使用 Celery 任务

在 FastAPI 应用中，异步调用 Celery 任务：

```python
from fastapi import FastAPI
from .celery import background_task

app = FastAPI()

@app.post("/process-data/")
async def process_data(data: dict):
    task = background_task.delay(data)
    return {"message": "Task submitted", "task_id": task.id}
```

在这个例子中，`process_data` 视图函数提交了一个 Celery 后台任务，该任务将在后台执行。

### 6. 使用异步依赖

FastAPI 还支持异步依赖项，允许在依赖项中使用异步代码。

#### 6.1 异步依赖

```python
from fastapi import FastAPI, Depends

app = FastAPI()

async def common_parameters(q: str = None):
    return {"q": q}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

在这个例子中，`common_parameters` 是一个异步依赖项，`read_items` 视图函数依赖它并异步地获得参数。

### 7. 事件处理中的异步操作

在启动和关闭事件处理函数中也可以使用异步操作：

```python
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # 异步启动事件
    print("Starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    # 异步关闭事件
    print("Shutting down...")
```

### 8. 总结

通过异步编程，FastAPI 提供了处理并发操作的强大工具，使得处理 I/O 密集型任务（如数据库查询、HTTP 请求等）更加高效。FastAPI 支持异步视图函数、异步数据库操作、异步 HTTP 请求、异步任务队列以及异步依赖项和事件处理。合理使用这些异步特性，可以显著提升应用的性能和响应速度。