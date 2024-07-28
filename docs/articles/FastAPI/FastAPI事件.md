---
comments: true
---

在 FastAPI 中，事件处理机制允许你在应用启动和关闭时执行一些特定的代码。这对于执行一些初始化操作或清理操作非常有用，例如数据库连接的建立和关闭、缓存的初始化、加载配置文件等。FastAPI 提供了两种类型的事件：启动事件（startup）和关闭事件（shutdown）。

### 1. 安装依赖

确保你已经安装了 FastAPI 和 Uvicorn：

```bash
pip install fastapi uvicorn
```

### 2. 启动事件

启动事件是在应用启动时执行的代码块。你可以使用 `@app.on_event("startup")` 装饰器来定义启动事件。

#### 2.1 示例

以下示例展示了如何在应用启动时连接到数据库：

```python
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # 连接到数据库
    app.state.db = "Database Connection"
    print("Connected to the database")

@app.get("/")
async def read_root():
    return {"message": "Hello World", "db": app.state.db}
```

在这个例子中，`startup_event` 函数在应用启动时执行，建立数据库连接，并将其存储在 `app.state` 中。`app.state` 是一个共享状态对象，允许你在应用的不同部分之间共享数据。

### 3. 关闭事件

关闭事件是在应用关闭时执行的代码块。你可以使用 `@app.on_event("shutdown")` 装饰器来定义关闭事件。

#### 3.1 示例

以下示例展示了如何在应用关闭时断开数据库连接：

```python
@app.on_event("shutdown")
async def shutdown_event():
    # 断开数据库连接
    app.state.db = None
    print("Disconnected from the database")
```

在这个例子中，`shutdown_event` 函数在应用关闭时执行，断开数据库连接。

### 4. 完整示例

以下是一个完整的示例，包括启动和关闭事件，以及如何在路由处理函数中使用共享状态对象：

```python
from fastapi import FastAPI

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # 假设连接到数据库
    app.state.db = "Database Connection"
    print("Connected to the database")

@app.on_event("shutdown")
async def shutdown_event():
    # 假设断开数据库连接
    app.state.db = None
    print("Disconnected from the database")

@app.get("/")
async def read_root():
    return {"message": "Hello World", "db": app.state.db}

@app.get("/items/")
async def read_items():
    if app.state.db:
        return {"items": ["item1", "item2"], "db_status": "connected"}
    else:
        return {"items": [], "db_status": "disconnected"}
```

### 5. 多个启动和关闭事件

你可以定义多个启动和关闭事件。FastAPI 会按定义顺序依次执行它们。

```python
@app.on_event("startup")
async def startup_event1():
    print("Startup Event 1")

@app.on_event("startup")
async def startup_event2():
    print("Startup Event 2")

@app.on_event("shutdown")
async def shutdown_event1():
    print("Shutdown Event 1")

@app.on_event("shutdown")
async def shutdown_event2():
    print("Shutdown Event 2")
```

在这个例子中，FastAPI 会依次执行 `startup_event1` 和 `startup_event2`，然后在关闭时依次执行 `shutdown_event1` 和 `shutdown_event2`。

### 6. 使用依赖项中的事件

你还可以在依赖项中使用事件处理。例如，初始化数据库连接或其他资源可以作为依赖项的一部分。

```python
from fastapi import Depends

def get_db():
    db = "Database Connection"
    try:
        yield db
    finally:
        db = None

@app.get("/items/")
async def read_items(db=Depends(get_db)):
    return {"items": ["item1", "item2"], "db": db}
```

在这个例子中，`get_db` 依赖项在每次请求时建立数据库连接，并在请求结束时关闭连接。

### 7. 使用自定义类中的事件

你可以将事件处理放在自定义类中，以便更好地组织代码。

```python
class EventHandler:
    def __init__(self, app: FastAPI):
        self.app = app
        self.app.add_event_handler("startup", self.startup)
        self.app.add_event_handler("shutdown", self.shutdown)

    async def startup(self):
        self.app.state.db = "Database Connection"
        print("Connected to the database")

    async def shutdown(self):
        self.app.state.db = None
        print("Disconnected from the database")

app = FastAPI()
event_handler = EventHandler(app)

@app.get("/")
async def read_root():
    return {"message": "Hello World", "db": app.state.db}
```

在这个例子中，`EventHandler` 类封装了启动和关闭事件的处理逻辑，并在应用初始化时注册这些事件。

### 8. 总结

FastAPI 的事件处理机制提供了一种在应用启动和关闭时执行特定代码的方法。通过使用 `@app.on_event("startup")` 和 `@app.on_event("shutdown")` 装饰器，你可以轻松地管理资源的初始化和清理工作。这对于确保应用程序在不同环境中稳定运行非常重要。无论是单独定义事件处理函数，还是在依赖项或自定义类中组织事件处理逻辑，FastAPI 都提供了灵活的方式来满足你的需求。