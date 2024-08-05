---
comments: true
---

Gin框架支持HTML模板渲染，这使得开发者可以方便地创建动态网页。Gin使用Go语言的`html/template`包来处理模板渲染。以下是Gin模板系统的详细介绍：

### 1. 加载模板

在Gin中，首先需要加载模板文件。可以使用`LoadHTMLGlob`或`LoadHTMLFiles`方法来加载模板。

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()

    // 加载模板文件
    router.LoadHTMLGlob("templates/*")

    // 或者加载具体的模板文件
    // router.LoadHTMLFiles("templates/index.tmpl", "templates/about.tmpl")

    router.GET("/index", func(c *gin.Context) {
        c.HTML(200, "index.tmpl", gin.H{
            "title": "Main website",
        })
    })

    router.Run(":8080")
}
```

假设`templates/index.tmpl`的内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
```

### 2. 渲染模板

#### 2.1 使用`c.HTML`渲染模板

可以使用`c.HTML`方法渲染模板，并传递数据给模板。

```go
router.GET("/index", func(c *gin.Context) {
    c.HTML(200, "index.tmpl", gin.H{
        "title": "Main website",
    })
})
```

#### 2.2 模板继承和布局

可以通过定义布局模板实现模板继承。

`templates/base.tmpl`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ block "title" . }}{{ end }}</title>
</head>
<body>
    {{ block "body" . }}{{ end }}
</body>
</html>
```

`templates/index.tmpl`：

```html
{{ template "base.tmpl" }}

{{ define "title" }}Main website{{ end }}

{{ define "body" }}
<h1>Hello, world!</h1>
{{ end }}
```

加载模板时要包含布局模板：

```go
router.LoadHTMLGlob("templates/*")

router.GET("/index", func(c *gin.Context) {
    c.HTML(200, "index.tmpl", gin.H{
        "title": "Main website",
    })
})
```

### 3. 传递数据给模板

可以通过`gin.H`或结构体将数据传递给模板。

#### 3.1 使用`gin.H`传递数据

```go
router.GET("/index", func(c *gin.Context) {
    c.HTML(200, "index.tmpl", gin.H{
        "title":   "Main website",
        "message": "Welcome to my website!",
    })
})
```

模板文件`templates/index.tmpl`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
</head>
<body>
    <h1>{{ .message }}</h1>
</body>
</html>
```

#### 3.2 使用结构体传递数据

```go
type PageData struct {
    Title   string
    Message string
}

router.GET("/index", func(c *gin.Context) {
    data := PageData{
        Title:   "Main website",
        Message: "Welcome to my website!",
    }
    c.HTML(200, "index.tmpl", data)
})
```

### 4. 模板函数

Gin支持自定义模板函数，可以在模板中使用自定义的函数。

#### 4.1 定义模板函数

```go
func formatAsDate(t time.Time) string {
    year, month, day := t.Date()
    return fmt.Sprintf("%d-%02d-%02d", year, month, day)
}
```

#### 4.2 注册模板函数

```go
router := gin.Default()
router.SetFuncMap(template.FuncMap{
    "formatAsDate": formatAsDate,
})
router.LoadHTMLGlob("templates/*")

router.GET("/index", func(c *gin.Context) {
    c.HTML(200, "index.tmpl", gin.H{
        "title": "Main website",
        "date":  time.Now(),
    })
})
```

模板文件`templates/index.tmpl`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
</head>
<body>
    <h1>{{ .title }}</h1>
    <p>Current date: {{ .date | formatAsDate }}</p>
</body>
</html>
```

### 5. 静态文件

Gin可以方便地提供静态文件服务，例如CSS、JavaScript和图片文件。

```go
router.Static("/assets", "./assets")
```

HTML模板中引用静态文件：

```html
<link rel="stylesheet" href="/assets/css/style.css">
```

### 6. 模板示例项目

结合上述内容，创建一个综合的示例项目：

```go
package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "html/template"
    "time"
)

func formatAsDate(t time.Time) string {
    year, month, day := t.Date()
    return fmt.Sprintf("%d-%02d-%02d", year, month, day)
}

func main() {
    router := gin.Default()

    // 注册模板函数
    router.SetFuncMap(template.FuncMap{
        "formatAsDate": formatAsDate,
    })

    // 加载模板文件
    router.LoadHTMLGlob("templates/*")

    // 静态文件服务
    router.Static("/assets", "./assets")

    router.GET("/index", func(c *gin.Context) {
        c.HTML(200, "index.tmpl", gin.H{
            "title": "Main website",
            "date":  time.Now(),
        })
    })

    router.Run(":8080")
}
```

模板文件`templates/base.tmpl`：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ block "title" . }}{{ end }}</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    {{ block "body" . }}{{ end }}
</body>
</html>
```

模板文件`templates/index.tmpl`：

```html
{{template "base.tmpl"}}

{{ define "title" }}Main website{{ end }}

{{ define "body" }}
<h1>{{ .title }}</h1>
<p>Current date: {{ .date | formatAsDate }}</p>
{{ end }}
```

通过这个详细的介绍，你可以掌握Gin框架中模板的各个方面，包括模板加载、模板渲染、模板继承和布局、数据传递、自定义模板函数以及静态文件服务。这样，你就能更灵活地设计和实现Gin框架下的Web应用模板功能。