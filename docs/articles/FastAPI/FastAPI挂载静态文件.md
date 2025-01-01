---
comments: true
---

在 FastAPI 中挂载静态文件是一个非常常见的需求，特别是当你需要提供 HTML、CSS、JavaScript、图像等静态资源时。FastAPI 提供了一个方便的方式来挂载和提供静态文件，使用 `StaticFiles` 来处理静态文件。

### 1. 基本步骤

1. 导入 `StaticFiles`。
2. 使用 `app.mount()` 方法来挂载静态文件目录。
3. 配置静态文件的路径和 URL 前缀。

### 2. 示例：挂载静态文件

假设你有一个静态文件目录 `./static`，你希望通过 `/static` 访问这些文件。

#### 2.1 项目目录结构

```
/project
    /static
        /images
            logo.png
        /css
            style.css
        /js
            script.js
    main.py
```

#### 2.2 代码示例

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 将静态文件挂载到 /static 路径上
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}
```

#### 2.3 访问静态文件

- 访问静态文件时，可以使用 `/static` 路径。
  - `http://localhost:8000/static/images/logo.png`
  - `http://localhost:8000/static/css/style.css`
  - `http://localhost:8000/static/js/script.js`

### 3. 解释

- `app.mount("/static", StaticFiles(directory="static"), name="static")`：这行代码告诉 FastAPI 将 `static` 目录下的所有文件通过 `/static` 路径提供。这里的 `directory="static"` 是静态文件存储的目录，`name="static"` 是可选的，它为该挂载提供了一个名称。
  
  - `StaticFiles` 是 FastAPI 提供的处理静态文件的类。
  - `directory="static"` 指定静态文件存储的根目录。
  - `/static` 是访问静态文件的 URL 前缀。访问文件时会通过该路径前缀来访问。

### 4. 处理自定义路径

如果你希望静态文件的 URL 前缀不是 `/static`，可以自定义它。例如，你想要通过 `/assets` 来访问静态资源，可以这样做：

```python
app.mount("/assets", StaticFiles(directory="static"), name="assets")
```

这样，静态文件就会通过 `/assets` 前缀来访问，路径如下：

- `http://localhost:8000/assets/images/logo.png`
- `http://localhost:8000/assets/css/style.css`
- `http://localhost:8000/assets/js/script.js`

### 5. 处理文件路径的问题

如果静态文件的路径包含非 ASCII 字符（例如中文），FastAPI 会自动处理 URL 编码，因此你不需要担心路径编码问题。

### 6. 总结

通过 `StaticFiles`，FastAPI 可以非常方便地提供静态文件服务。你只需要指定静态文件目录和 URL 前缀，就可以通过浏览器访问静态资源。这在构建单页应用（SPA）或提供静态资源时非常有用。