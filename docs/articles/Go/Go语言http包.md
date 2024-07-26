---
comments: true
---

Go语言的 `net/http` 包是一个强大的标准库，用于构建 HTTP 客户端和服务器。它提供了丰富的功能，使得开发网络应用和服务变得非常简便。以下是对 `net/http` 包的详细介绍，包括所有重要的方法和使用示例。

### 1. `net/http` 包结构概述

`net/http` 包主要包含以下几个核心部分：

- **客户端（Client）**：发送 HTTP 请求并接收响应。
- **服务器（Server）**：接收 HTTP 请求并发送响应。
- **请求（Request）**和**响应（Response）**：表示 HTTP 请求和响应的结构体。
- **处理器（Handler）**：处理 HTTP 请求的接口。

### 2. 重要类型和方法

#### 2.1 `Client` 类型

`Client` 是执行 HTTP 请求的客户端。

**方法**：

- **`Get(url string) (resp *Response, err error)`**: 发送 GET 请求。
- **`Post(url, contentType string, body io.Reader) (resp *Response, err error)`**: 发送 POST 请求。
- **`PostForm(url string, data url.Values) (resp *Response, err error)`**: 发送带有表单数据的 POST 请求。
- **`Do(req *Request) (resp *Response, err error)`**: 发送 HTTP 请求。

**示例**：

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    resp, err := http.Get("http://example.com")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(string(body))
}
```

#### 2.2 `Request` 类型

`Request` 表示一个 HTTP 请求。

**字段**：

- **`Method string`**: HTTP 方法（如 GET、POST）。
- **`URL *url.URL`**: 请求的 URL。
- **`Header Header`**: 请求头。
- **`Body io.ReadCloser`**: 请求体。
- **`ContentLength int64`**: 请求体的长度。
- **`TransferEncoding []string`**: 传输编码。

**方法**：

- **`NewRequest(method, url string, body io.Reader) (*Request, error)`**: 创建一个新的 HTTP 请求。

**示例**：

```go
package main

import (
    "bytes"
    "fmt"
    "net/http"
)

func main() {
    jsonData := []byte(`{"name": "John"}`)
    req, err := http.NewRequest("POST", "http://example.com", bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()

    fmt.Println("Status:", resp.Status)
}
```

#### 2.3 `Response` 类型

`Response` 表示一个 HTTP 响应。

**字段**：

- **`Status string`**: HTTP 状态码和状态描述。
- **`StatusCode int`**: HTTP 状态码。
- **`Header Header`**: 响应头。
- **`Body io.ReadCloser`**: 响应体。
- **`ContentLength int64`**: 响应体的长度。
- **`TransferEncoding []string`**: 传输编码。

#### 2.4 `ServeMux` 类型

`ServeMux` 是一个 HTTP 请求多路复用器，用于将不同的 URL 路径映射到不同的处理器。

**方法**：

- **`Handle(pattern string, handler Handler)`**: 将 URL 模式与处理器关联。
- **`HandleFunc(pattern string, handler func(ResponseWriter, *Request))`**: 将 URL 模式与处理函数关联。

**示例**：

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/hello", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

#### 2.5 `Handler` 接口

`Handler` 是一个接口，包含一个 `ServeHTTP` 方法，用于处理 HTTP 请求。

**方法**：

- **`ServeHTTP(ResponseWriter, *Request)`**: 处理 HTTP 请求。

#### 2.6 `ResponseWriter` 接口

`ResponseWriter` 接口用于构建 HTTP 响应。

**方法**：

- **`Header() Header`**: 返回响应头。
- **`Write([]byte) (int, error)`**: 写入响应体。
- **`WriteHeader(statusCode int)`**: 写入 HTTP 状态码。

#### 2.7 其他函数

- **`http.ListenAndServe(addr string, handler Handler) error`**: 启动 HTTP 服务器。
- **`http.ListenAndServeTLS(addr, certFile, keyFile string, handler Handler) error`**: 启动支持 TLS 的 HTTP 服务器。
- **`http.Serve(l net.Listener, handler Handler) error`**: 接受连接并为每个连接创建一个新的服务例程。
- **`http.ServeTLS(l net.Listener, handler Handler, certFile, keyFile string) error`**: 接受 TLS 连接并为每个连接创建一个新的服务例程。
- **`http.FileServer(root http.FileSystem) Handler`**: 返回一个处理静态文件的处理器。
- **`http.StripPrefix(prefix string, h Handler) Handler`**: 返回一个新的处理器，将请求的 URL 路径中的前缀部分去掉，然后传递给指定的处理器。

### 3. 示例：创建一个简单的HTTP服务器

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/hello", helloHandler)

    fmt.Println("Starting server at :8080")
    if err := http.ListenAndServe(":8080", mux); err != nil {
        fmt.Println("Error:", err)
    }
}
```

### 4. 总结

Go语言的 `net/http` 包提供了一个简单而强大的方法来构建 HTTP 客户端和服务器。它的设计理念是易于使用且功能强大，适合各种网络编程需求。通过熟练掌握 `net/http` 包，你可以轻松构建高效、可靠的 HTTP 应用程序和服务。