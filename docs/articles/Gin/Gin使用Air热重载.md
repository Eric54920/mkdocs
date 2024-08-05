---
comments: true
---

使用 `Air` 工具来实现 Go Gin 项目的热重载是一种非常高效的方法。下面是如何在你的 Go Gin 项目中设置和使用 `Air` 工具的详细步骤。

### 1. 安装 Air

首先，使用 `go install` 安装 `Air`：

```bash
go install github.com/air-verse/air@latest
```

确保 `$GOPATH/bin` 目录在你的环境变量 `PATH` 中，以便可以全局访问 `air` 命令。

### 2. 创建 Air 配置文件

在你的项目根目录下创建一个名为 `.air.toml` 的配置文件。以下是一个示例配置文件的内容：

```toml
# .air.toml
[build]
  bin = "tmp/main"            # 编译后的二进制文件路径
  cmd = "go build -o tmp/main ." # 编译命令
  include_ext = ["go", "tmpl", "html"] # 包含的文件扩展名
  exclude_dir = ["tmp", "vendor"]     # 排除的目录

[log]
  level = "debug" # 日志级别

[watch]
  include_ext = ["go", "tmpl", "html"] # 监视的文件扩展名
  exclude_dir = ["tmp", "vendor"]      # 监视时排除的目录
```

### 3. 项目目录结构

确保你的项目目录结构合理，例如：

```
my-gin-app/
├── main.go
├── .air.toml
├── other_files_and_directories
```

### 4. 项目示例代码

假设你的 `main.go` 文件内容如下：

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "pong",
        })
    })
    r.Run(":8080") // 监听并在 0.0.0.0:8080 上启动服务
}
```

### 5. 运行项目

在你的项目根目录下运行 `air` 命令：

```bash
air
```

`Air` 会监视项目文件的变化，并在文件变更时自动重载项目。

### 6. 示例项目

完整示例项目的目录结构和文件内容：

```
my-gin-app/
├── main.go
├── .air.toml
└── ...
```

`main.go` 文件内容：

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "pong",
        })
    })
    r.Run(":8080") // 监听并在 0.0.0.0:8080 上启动服务
}
```

`.air.toml` 文件内容：

```toml
# .air.toml
[build]
  bin = "tmp/main"            # 编译后的二进制文件路径
  cmd = "go build -o tmp/main ." # 编译命令
  include_ext = ["go", "tmpl", "html"] # 包含的文件扩展名
  exclude_dir = ["tmp", "vendor"]     # 排除的目录

[log]
  level = "debug" # 日志级别

[watch]
  include_ext = ["go", "tmpl", "html"] # 监视的文件扩展名
  exclude_dir = ["tmp", "vendor"]      # 监视时排除的目录
```

在项目根目录下运行 `air` 命令：

```bash
air
```

### 7. 确认项目自动重载

你可以通过修改 `main.go` 文件中的代码来确认 `Air` 是否正确工作。例如，将 `/ping` 路由的响应消息从 `"pong"` 修改为 `"pong updated"`，然后保存文件。`Air` 应该会检测到文件变更，并自动重新编译和重启服务。

通过这种方式，你可以在开发过程中实时看到代码更改的效果，而不需要手动重启服务器，从而提高开发效率。