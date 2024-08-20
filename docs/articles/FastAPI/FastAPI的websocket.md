---
comments: true
---

FastAPI 提供了对 WebSocket 的支持，使得构建实时通信应用变得简单和高效。WebSocket 是一种协议，允许客户端和服务器之间进行全双工通信。与 HTTP 请求-响应模式不同，WebSocket 连接一旦建立，客户端和服务器可以在任何时间双向发送数据。

### 1. WebSocket 基础

WebSocket 使用单个长连接进行通信，可以显著减少 HTTP 请求的开销，并且适用于实时应用，如聊天应用、在线游戏、实时通知等。

### 2. FastAPI 中的 WebSocket

FastAPI 提供了 `WebSocket` 类和相应的路由装饰器，使得处理 WebSocket 连接非常直观。以下是一些关键点和详细示例。

#### 2.1 安装依赖

确保你已经安装了 FastAPI 和 Uvicorn：

```bash
pip install fastapi uvicorn
```

#### 2.2 基本示例

这是一个简单的 FastAPI WebSocket 示例：

```python
from fastapi import FastAPI, WebSocket

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # 接受 WebSocket 连接
    while True:
        data = await websocket.receive_text()  # 接收文本消息
        await websocket.send_text(f"Message text was: {data}")  # 发送文本消息
```

在这个示例中：

- 客户端连接到 `/ws` 路径的 WebSocket。
- 服务器接受 WebSocket 连接。
- 服务器持续接收客户端消息，并回发接收到的消息。

#### 2.3 WebSocket 连接管理

为了处理多个客户端连接，你需要管理这些 WebSocket 连接。下面是一个处理多个客户端连接的示例：

```python
from fastapi import FastAPI, WebSocket
from typing import List

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
```

在这个示例中，`ConnectionManager` 类管理所有活动的 WebSocket 连接，并提供了方法来发送个人消息和广播消息。

#### 2.4 处理异常

在 WebSocket 连接中处理异常是必要的，以确保在连接断开或发生错误时能够正确地清理资源。

```python
from fastapi import WebSocketDisconnect

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Client left the chat")
```

在这个示例中，`WebSocketDisconnect` 异常用于捕获 WebSocket 连接断开的情况，并进行相应的处理。

### 3. 高级功能

#### 3.1 发送和接收 JSON 数据

除了发送和接收文本数据，FastAPI 还支持发送和接收 JSON 数据。

```python
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()  # 接收 JSON 数据
        await websocket.send_json({"message": data})  # 发送 JSON 数据
```

#### 3.2 限制并发连接数

你可以限制同时连接的客户端数量，以避免资源耗尽。

```python
from fastapi import HTTPException

MAX_CONNECTIONS = 10

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    if len(manager.active_connections) >= MAX_CONNECTIONS:
        raise HTTPException(status_code=400, detail="Too many connections")
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
```

#### 3.3 WebSocket 路由参数

你可以在 WebSocket 路由中使用路径参数。

```python
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"Client #{client_id} wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
```

### 4. 总结

通过 FastAPI，处理 WebSocket 变得简单而强大。你可以轻松地建立和管理 WebSocket 连接，处理多个客户端连接，并处理各种消息类型（如文本和 JSON）。此外，通过处理异常和限制并发连接数，你可以构建更加健壮和可扩展的实时通信应用。

使用 FastAPI 的 WebSocket 支持，你可以轻松构建聊天应用、实时通知系统、在线游戏等各种实时应用，提高用户体验和交互性能。