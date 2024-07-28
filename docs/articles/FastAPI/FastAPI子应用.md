---
comments: true
---

在大型应用程序中，将应用程序拆分为多个子应用（sub-applications）可以提高代码的组织性和可维护性。FastAPI 支持将一个主应用程序分成多个子应用程序，每个子应用程序可以独立处理自己的路由、依赖关系、中间件等。

### 1. 创建子应用

子应用实际上是独立的 FastAPI 实例，你可以将它们挂载到主应用程序中。以下是如何创建和挂载子应用的步骤。

#### 1.1 安装依赖

首先，确保你已经安装了 FastAPI 和 Uvicorn：

```bash
pip install fastapi uvicorn
```

#### 1.2 创建主应用和子应用

首先，我们创建一个主应用和两个子应用。

```python
from fastapi import FastAPI

# 创建主应用
app = FastAPI()

# 创建子应用 1
sub_app1 = FastAPI()

@sub_app1.get("/sub1")
async def read_sub1():
    return {"message": "This is sub-app 1"}

# 创建子应用 2
sub_app2 = FastAPI()

@sub_app2.get("/sub2")
async def read_sub2():
    return {"message": "This is sub-app 2"}

# 将子应用挂载到主应用上
app.mount("/app1", sub_app1)
app.mount("/app2", sub_app2)

@app.get("/")
async def read_main():
    return {"message": "This is the main app"}
```

在这个例子中，我们创建了一个主应用 `app`，以及两个子应用 `sub_app1` 和 `sub_app2`。然后，我们将子应用挂载到主应用的 `/app1` 和 `/app2` 路径下。

#### 1.3 运行应用

使用 Uvicorn 来运行你的应用：

```bash
uvicorn myapp:app --reload
```

现在，当你访问 `/` 时，你将看到主应用的响应；访问 `/app1/sub1` 和 `/app2/sub2` 将分别看到子应用的响应。

### 2. 子应用的路由、依赖和中间件

每个子应用可以有自己的路由、依赖项和中间件。

#### 2.1 路由

每个子应用可以定义自己的路由，就像主应用一样。

```python
@sub_app1.get("/items/")
async def read_items():
    return {"items": ["item1", "item2"]}
```

#### 2.2 依赖

每个子应用可以定义和使用自己的依赖项。

```python
from fastapi import Depends

def sub_app1_dependency():
    return "sub_app1_dependency"

@sub_app1.get("/dependency/")
async def read_dependency(dep: str = Depends(sub_app1_dependency)):
    return {"dependency": dep}
```

#### 2.3 中间件

每个子应用也可以有自己的中间件。

```python
from starlette.middleware.base import BaseHTTPMiddleware

class SubApp1Middleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-SubApp1"] = "Processed"
        return response

sub_app1.add_middleware(SubApp1Middleware)
```

### 3. 共享中间件和依赖

如果你想在所有子应用之间共享某些中间件或依赖项，可以将它们添加到主应用中。

```python
@app.middleware("http")
async def add_custom_header(request, call_next):
    response = await call_next(request)
    response.headers["X-Custom-Header"] = "Value"
    return response
```

在这种情况下，所有请求，无论是主应用的还是子应用的，都会通过这个中间件。

### 4. 子应用的独立性

虽然子应用可以共享主应用的一些特性，但它们也是独立的 FastAPI 实例。这意味着你可以在子应用中使用任何 FastAPI 功能，比如事件处理、异常处理器、后台任务等。

```python
# 子应用的事件处理器
@sub_app1.on_event("startup")
async def sub_app1_startup():
    print("Sub App 1 is starting up")

# 子应用的异常处理器
@sub_app1.exception_handler(Exception)
async def sub_app1_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "An error occurred in Sub App 1"},
    )
```

### 5. 在子应用中使用独立的文档

FastAPI 允许你为每个子应用提供独立的文档。你可以通过 `docs_url` 和 `openapi_url` 参数来指定子应用的文档路径。

```python
sub_app1 = FastAPI(docs_url="/sub1/docs", openapi_url="/sub1/openapi.json")
sub_app2 = FastAPI(docs_url="/sub2/docs", openapi_url="/sub2/openapi.json")
```

这样，子应用的文档将分别在 `/sub1/docs` 和 `/sub2/docs` 路径下访问。

### 6. 总结

使用 FastAPI 的子应用功能，可以更好地组织和管理大型应用程序。每个子应用可以独立处理自己的路由、依赖项、中间件和事件处理器，从而提高代码的模块化和可维护性。通过合理地拆分和挂载子应用，你可以构建灵活、可扩展的大型应用程序。