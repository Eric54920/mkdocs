---
comments: true
---

在 FastAPI 中，异常处理（Exception Handling）是构建健壮和用户友好的 API 的关键部分。FastAPI 提供了灵活而强大的机制来处理异常，包括内置的 HTTP 异常、全局异常处理器、自定义异常等。以下是详细介绍 FastAPI 异常处理的方法和技巧。

### 1. 内置 HTTP 异常

FastAPI 提供了一些内置的 HTTP 异常，这些异常可以用于返回标准的 HTTP 错误响应。例如：

- `HTTPException`: 通用的 HTTP 异常类。
- `RequestValidationError`: 请求验证失败时的异常类。

**使用 HTTPException**:

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id > 10:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id}
```

在上述例子中，当 `item_id` 大于 10 时，API 将返回 404 错误，错误详情为 "Item not found"。

### 2. 全局异常处理器

可以通过 `exception_handler` 装饰器来注册全局异常处理器。全局异常处理器可以捕获特定类型的异常并返回自定义的响应。

**自定义异常处理器**:

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name

@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. We are out of tea."},
    )

@app.get("/unicorns/{name}")
async def read_unicorn(name: str):
    if name == "yolo":
        raise UnicornException(name=name)
    return {"unicorn_name": name}
```

在上述例子中，自定义的 `UnicornException` 被注册为全局异常处理器。当 `UnicornException` 被引发时，API 将返回 418 状态码和自定义的错误信息。

### 3. 请求验证异常处理

FastAPI 自动处理请求验证异常（如 `RequestValidationError`），并返回 422 状态码和详细的验证错误信息。不过，开发者也可以自定义处理这些异常。

**自定义请求验证异常处理**:

```python
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"detail": exc.errors(), "body": exc.body},
    )
```

在上述例子中，请求验证失败时将返回 400 状态码，并包括详细的错误信息和请求体。

### 4. 捕获所有未处理的异常

可以通过 `app.exception_handler` 捕获所有未处理的异常，并返回自定义的响应。这样可以防止 API 返回未预期的错误信息。

**捕获所有异常**:

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error"},
    )
```

在上述例子中，任何未处理的异常都会返回 500 状态码和自定义的错误信息。

### 5. 依赖引发的异常处理

FastAPI 允许在依赖项中引发异常，并在路径操作中捕获和处理这些异常。依赖项的异常处理和路径操作的异常处理类似。

**在依赖项中引发异常**:

```python
from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

async def verify_token(token: str):
    if token != "valid-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

@app.get("/protected-route")
async def protected_route(token: str = Depends(verify_token)):
    return {"message": "Access granted"}

```

在上述例子中，如果提供的 `token` 无效，将引发 401 错误。

### 6. 使用自定义响应模型

FastAPI 允许使用 Pydantic 模型来定义异常响应的结构，从而提供一致且可预见的错误响应格式。

**自定义响应模型**:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ErrorResponse(BaseModel):
    detail: str

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.get("/items/{item_id}", response_model=ErrorResponse)
async def read_item(item_id: int):
    if item_id > 10:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id}
```

在上述例子中，`ErrorResponse` 模型定义了错误响应的结构。所有引发 `HTTPException` 的地方都会返回一致的错误响应格式。

### 7. 总结

FastAPI 提供了多种方式来处理异常，包括使用内置的 HTTP 异常、注册全局异常处理器、自定义请求验证异常处理器和捕获所有未处理的异常。通过灵活的异常处理机制，开发者可以构建健壮且用户友好的 API 服务。