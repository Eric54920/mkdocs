---
comments: true
---

中间件（Middleware）是处理请求和响应过程中间的一层，可以在请求到达路由之前和响应发送到客户端之前执行一些通用逻辑。FastAPI 支持中间件，这使得它非常适合用于跨切面任务，例如日志记录、身份验证、修改请求和响应等。

### 1. 中间件的基础

中间件是一个函数，它接受 `request` 对象和一个 `call_next` 函数，并返回一个响应对象。`call_next` 函数将请求传递给下一个中间件或最终的请求处理程序（路由函数），并返回响应。

#### 1.1 创建一个简单的中间件

```python
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

class SimpleMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 在请求到达路由之前执行
        print("Request received")
        
        response = await call_next(request)
        
        # 在响应发送到客户端之前执行
        print("Response sent")
        
        return response

# 添加中间件到应用
app.add_middleware(SimpleMiddleware)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
```

在这个例子中，`SimpleMiddleware` 中间件打印请求和响应的日志。

### 2. 多个中间件

你可以添加多个中间件，它们会按添加顺序执行。第一个添加的中间件首先处理请求，最后处理响应。

```python
from starlette.middleware.base import BaseHTTPMiddleware

class MiddlewareA(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("Middleware A - Before")
        response = await call_next(request)
        print("Middleware A - After")
        return response

class MiddlewareB(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print("Middleware B - Before")
        response = await call_next(request)
        print("Middleware B - After")
        return response

app.add_middleware(MiddlewareA)
app.add_middleware(MiddlewareB)

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
```

在这个例子中，`MiddlewareA` 和 `MiddlewareB` 都会按顺序处理请求和响应。

### 3. 使用依赖注入的中间件

有时你可能需要使用依赖注入来获取某些依赖项，例如数据库连接或配置。

```python
from fastapi import Depends

class DependencyMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, some_dependency: str):
        super().__init__(app)
        self.some_dependency = some_dependency

    async def dispatch(self, request: Request, call_next):
        request.state.some_dependency = self.some_dependency
        response = await call_next(request)
        return response

def get_dependency():
    return "This is a dependency"

app.add_middleware(DependencyMiddleware, some_dependency=Depends(get_dependency))

@app.get("/")
async def read_root(request: Request):
    return {"message": request.state.some_dependency}
```

在这个例子中，`DependencyMiddleware` 使用依赖注入来获取某些依赖项，并将其添加到请求的状态中，以便在路由处理程序中使用。

### 4. 常见用途

#### 4.1 日志记录

中间件常用于记录请求和响应日志：

```python
class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print(f"Request: {request.method} {request.url}")
        response = await call_next(request)
        print(f"Response: {response.status_code}")
        return response

app.add_middleware(LoggingMiddleware)
```

#### 4.2 错误处理

中间件可以捕获和处理异常，并返回自定义响应：

```python
class ErrorHandlingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
        except Exception as exc:
            return JSONResponse(
                status_code=500,
                content={"message": "Internal Server Error"},
            )
        return response

app.add_middleware(ErrorHandlingMiddleware)
```

#### 4.3 修改请求和响应

你可以在中间件中修改请求和响应，例如添加或修改头部信息：

```python
class ModifyRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request.headers["X-Modified"] = "True"
        response = await call_next(request)
        response.headers["X-Modified"] = "True"
        return response

app.add_middleware(ModifyRequestMiddleware)
```

### 5. 添加 Starlette 内置中间件

FastAPI 也支持 Starlette 内置中间件。例如，你可以添加 GZipMiddleware 来自动压缩响应：

```python
from starlette.middleware.gzip import GZipMiddleware

app.add_middleware(GZipMiddleware, minimum_size=1000)
```

这个中间件会压缩所有大于 1000 字节的响应。

### 6. 总结

FastAPI 的中间件系统非常强大且灵活，允许你在请求和响应过程中执行各种通用任务。无论是日志记录、错误处理、修改请求和响应，还是集成复杂的依赖注入逻辑，中间件都可以帮助你实现这些功能。通过合理地使用中间件，可以使你的 API 更加模块化、可维护和易于扩展。