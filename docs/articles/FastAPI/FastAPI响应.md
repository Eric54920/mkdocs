---
comments: true
---

在 FastAPI 中，响应（Response）是 API 的核心部分之一，它决定了服务器如何将数据返回给客户端。FastAPI 提供了多种方式来自定义和处理响应，包括使用标准的 JSON 响应、自定义响应格式、添加响应头等。

### 1. 响应模型

默认情况下，FastAPI 会将路径操作函数返回的任何数据转换为 JSON 格式，并使用 `application/json` 作为响应的内容类型。然而，开发者可以通过使用 Pydantic 模型来定义和验证响应的数据结构。

**定义响应模型**：

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    return {"name": "Foo", "description": "A test item", "price": 42.0, "tax": 3.5}
```

在上述例子中，`response_model=Item` 表示返回的数据必须符合 `Item` 模型的结构和类型。

### 2. 自定义响应

FastAPI 提供了多种自定义响应的方式，包括直接使用 `Response` 类、返回文件、返回 HTML 等。

- **使用 Response 类**

`Response` 类允许开发者完全控制响应的内容、状态码和媒体类型。

```python
from fastapi import FastAPI, Response

app = FastAPI()

@app.get("/custom-response")
async def custom_response():
    content = "This is a custom response"
    return Response(content=content, media_type="text/plain")
```

- **返回文件**

使用 `FileResponse` 可以方便地返回文件内容。

```python
from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/download")
async def download_file():
    return FileResponse("path/to/your/file.txt", media_type='application/octet-stream', filename="file.txt")
```

- **返回 HTML**

使用 `HTMLResponse` 可以返回 HTML 内容。

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/html", response_class=HTMLResponse)
async def get_html():
    html_content = "<html><body><h1>Hello, World!</h1></body></html>"
    return HTMLResponse(content=html_content)
```

### 3. 自定义状态码

可以通过 `status_code` 参数来设置自定义状态码。

```python
from fastapi import FastAPI, status

app = FastAPI()

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(name: str):
    return {"name": name}
```

在上述例子中，POST 请求成功时将返回状态码 `201 Created`。

### 4. 添加响应头

可以通过 `Response` 对象添加自定义响应头。

```python
from fastapi import FastAPI, Response

app = FastAPI()

@app.get("/headers")
async def custom_headers(response: Response):
    response.headers["X-Custom-Header"] = "Custom value"
    return {"message": "Check the custom header"}
```

### 5. StreamingResponse

`StreamingResponse` 允许逐步返回内容，适用于返回大文件或流数据。

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import io

app = FastAPI()

@app.get("/stream")
async def stream():
    def iterfile():
        for i in range(100):
            yield f"line {i}\n"
    
    return StreamingResponse(iterfile(), media_type="text/plain")
```

### 6. RedirectResponse

`RedirectResponse` 用于重定向请求到另一个 URL。

```python
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()

@app.get("/old-path")
async def redirect():
    return RedirectResponse(url="/new-path")

@app.get("/new-path")
async def new_path():
    return {"message": "This is the new path"}
```

### 7. JSONResponse

`JSONResponse` 允许开发者返回自定义的 JSON 响应，特别适用于需要手动构建 JSON 响应的情况。

```python
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/custom-json")
async def custom_json():
    content = {"message": "Hello, World!"}
    return JSONResponse(content=content, status_code=200)
```

### 8. UJSONResponse

`UJSONResponse` 是使用 `ujson` 库的响应类，具有更快的 JSON 编码和解码速度。

```python
from fastapi import FastAPI
from fastapi.responses import UJSONResponse

app = FastAPI()

@app.get("/ujson", response_class=UJSONResponse)
async def get_ujson():
    content = {"message": "Hello, FastAPI with uJSON!"}
    return content
```

### 9. PlainTextResponse

`PlainTextResponse` 用于返回纯文本响应。

```python
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI()

@app.get("/text", response_class=PlainTextResponse)
async def get_text():
    return "This is a plain text response"
```

### 10. 总结

FastAPI 提供了多种方式来处理和自定义响应，从简单的 JSON 响应到复杂的流式响应。通过使用响应模型、状态码、自定义响应头和不同类型的响应类，开发者可以灵活地构建符合需求的 API 响应。