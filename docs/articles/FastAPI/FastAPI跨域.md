---
comments: true
---

跨域资源共享（CORS, Cross-Origin Resource Sharing）是指一种机制，它使用额外的 HTTP 头来告诉浏览器允许一个网页访问来自不同源服务器的资源。FastAPI 提供了对 CORS 的内置支持，可以通过添加中间件来实现。以下是对 FastAPI 中 CORS 支持的详细介绍。

### 1. 安装依赖

首先，你需要安装 `fastapi` 和 `starlette`，后者提供了 CORS 中间件：

```bash
pip install fastapi starlette
```

### 2. 配置 CORS

在 FastAPI 中，可以使用 `CORSMiddleware` 来配置 CORS 规则。以下是一个基本的配置示例：

```python
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允许的源
    allow_credentials=True,  # 允许发送Cookie
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头
)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
```

在这个例子中，`allow_origins` 列表包含了允许访问的源。你可以根据需要调整其他参数：

- `allow_origins`：一个字符串列表，表示允许的源。如果你想允许所有源，可以使用 `["*"]`。
- `allow_credentials`：一个布尔值，表示是否允许发送 Cookie。
- `allow_methods`：一个字符串列表，表示允许的 HTTP 方法，如 `["GET", "POST"]`。可以使用 `["*"]` 允许所有方法。
- `allow_headers`：一个字符串列表，表示允许的 HTTP 头。可以使用 `["*"]` 允许所有头。

### 3. 配置示例

#### 3.1 允许所有来源

如果你想允许所有来源，可以这样配置：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

这种配置方式虽然简单，但可能会带来安全问题，因此应谨慎使用。

#### 3.2 仅允许特定方法和头

如果你只想允许特定的 HTTP 方法和头，可以这样配置：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)
```

这种配置更加安全，限制了允许的方法和头。

#### 3.3 禁用 credentials

如果不需要发送 Cookie，可以将 `allow_credentials` 设置为 `False`：

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://example.com"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. 完整示例

以下是一个更复杂的示例，展示了如何配置 CORS 中间件以及如何创建多个路由：

```python
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "https://example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}

@app.post("/items/")
async def create_item(item: dict):
    return {"item": item}

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: dict):
    return {"item_id": item_id, "item": item}

@app.delete("/items/{item_id}")
async def delete_item(item_id: int):
    return {"item_id": item_id}
```

在这个例子中，我们允许了多个源，启用了 Cookie 支持，并且只允许特定的 HTTP 方法和头。

### 5. CORS 预检请求

当你使用复杂请求（例如，使用方法 PUT 或 DELETE，或者自定义头部）时，浏览器会发送一个预检请求（OPTIONS 请求）来检查服务器是否允许该操作。CORS 中间件会自动处理这些预检请求。

例如：

```python
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/items/")
async def options_handler():
    return {"status": "OK"}

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: dict):
    return {"item_id": item_id, "item": item}
```

在这个例子中，CORS 中间件会自动处理 `/items/` 的 OPTIONS 请求，因此你不需要显式定义 OPTIONS 路由。

### 6. 总结

通过使用 `CORSMiddleware`，你可以在 FastAPI 应用中轻松配置和管理 CORS 规则。合理配置 CORS 对于确保你的 API 在不同的客户端之间安全地共享资源是至关重要的。在允许所有源和方法时要谨慎，以避免潜在的安全风险。通过结合允许的源、方法和头的具体需求，你可以确保你的 API 既灵活又安全。