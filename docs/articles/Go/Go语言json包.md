---
comments: true
---

Go语言的 `encoding/json` 包提供了用于 JSON 编码（序列化）和解码（反序列化）的功能。这个包非常强大和灵活，支持多种 JSON 数据处理需求。以下是对 `encoding/json` 包的详细介绍，包括主要类型、方法和使用示例。

### 1. 主要类型

#### 1.1 `Encoder` 类型

`Encoder` 类型用于将 Go 数据结构编码为 JSON 数据，并将其写入 `io.Writer`。

**方法**：

- **`func NewEncoder(w io.Writer) *Encoder`**: 创建一个新的 JSON 编码器，将 JSON 输出到 `w`。
- **`func (e *Encoder) Encode(v interface{}) error`**: 将 `v` 编码为 JSON，并写入 `e` 指定的 `io.Writer`。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
    "os"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}

    encoder := json.NewEncoder(os.Stdout)
    err := encoder.Encode(p)
    if err != nil {
        fmt.Println("Error:", err)
    }
}
```

#### 1.2 `Decoder` 类型

`Decoder` 类型用于从 `io.Reader` 中读取 JSON 数据，并将其解码为 Go 数据结构。

**方法**：

- **`func NewDecoder(r io.Reader) *Decoder`**: 创建一个新的 JSON 解码器，从 `r` 读取 JSON 数据。
- **`func (d *Decoder) Decode(v interface{}) error`**: 从 `d` 读取 JSON 数据并将其解码为 `v`。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    jsonData := `{"name":"Alice","age":30}`
    reader := strings.NewReader(jsonData)

    var p Person
    decoder := json.NewDecoder(reader)
    err := decoder.Decode(&p)
    if err != nil {
        fmt.Println("Error:", err)
    }

    fmt.Printf("Decoded: %+v\n", p)
}
```

### 2. 主要函数

#### 2.1 `Marshal` 函数

**`func Marshal(v interface{}) ([]byte, error)`**

`Marshal` 函数将 Go 数据结构编码为 JSON 格式的字节切片。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, err := json.Marshal(p)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Println(string(jsonData))
}
```

#### 2.2 `MarshalIndent` 函数

**`func MarshalIndent(v interface{}, prefix, indent string) ([]byte, error)`**

`MarshalIndent` 函数将 Go 数据结构编码为格式化的 JSON 字节切片。它允许你指定 JSON 输出的前缀和缩进。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, err := json.MarshalIndent(p, "", "  ")
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Println(string(jsonData))
}
```

#### 2.3 `Unmarshal` 函数

**`func Unmarshal(data []byte, v interface{}) error`**

`Unmarshal` 函数将 JSON 格式的字节切片解码为 Go 数据结构。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    jsonData := `{"name":"Alice","age":30}`
    var p Person
    err := json.Unmarshal([]byte(jsonData), &p)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Printf("Decoded: %+v\n", p)
}
```

#### 2.4 `RawMessage` 类型

`RawMessage` 是 `[]byte` 的一种类型，用于延迟 JSON 解码或自定义解码。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name    string          `json:"name"`
    Age     int             `json:"age"`
    Details json.RawMessage `json:"details"`
}

func main() {
    jsonData := `{"name":"Alice","age":30,"details":{"hobby":"reading"}}`
    var p Person
    err := json.Unmarshal([]byte(jsonData), &p)
    if err != nil {
        fmt.Println("Error:", err)
    }

    fmt.Printf("Decoded: %+v\n", p)

    var details map[string]interface{}
    err = json.Unmarshal(p.Details, &details)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Println("Details:", details)
}
```

### 3. JSON 标签

在 Go 语言的结构体字段中使用 JSON 标签，以指定 JSON 数据的字段名称、是否忽略字段、是否进行嵌套等。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name     string `json:"name"`
    Age      int    `json:"age"`
    Occupation string `json:"occupation,omitempty"` // 如果为空则省略
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    jsonData, err := json.Marshal(p)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Println(string(jsonData))
}
```

### 4. 错误处理

`encoding/json` 包在编码和解码过程中可能会发生错误。常见错误包括：

- **`json.Unmarshal`**: 由于 JSON 数据格式不正确或与目标结构体不匹配而导致的错误。
- **`json.Marshal`**: 由于循环引用或不支持的数据类型而导致的错误。

**示例**：

```go
package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    invalidJson := `{"name": "Alice", "age": }` // 错误的 JSON 格式
    var p map[string]interface{}
    err := json.Unmarshal([]byte(invalidJson), &p)
    if err != nil {
        fmt.Println("Error:", err)
    }
}
```

### 5. 总结

Go语言的 `encoding/json` 包为 JSON 数据的编码和解码提供了强大且灵活的工具。通过了解和掌握这些方法和类型，你可以高效地处理 JSON 数据，实现数据的序列化和反序列化。熟练运用这些工具可以帮助你构建可靠的应用程序，处理各种 JSON 数据格式需求。