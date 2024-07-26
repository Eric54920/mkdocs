---
comments: true
---

Go语言的 `strconv` 包提供了将基本数据类型转换为字符串和将字符串转换为基本数据类型的功能。这个包是处理数据转换的核心组件，尤其是在需要与外部数据交换时，例如解析用户输入或处理配置文件。以下是对 `strconv` 包的详细介绍，包括主要类型、方法和示例。

### 1. 主要函数

#### 1.1 `Atoi` 函数

**`func Atoi(s string) (int, error)`**

`Atoi` 函数将字符串 `s` 转换为 `int` 类型。如果转换失败，则返回错误。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "123"
    num, err := strconv.Atoi(numStr)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Number:", num)
    }
}
```

#### 1.2 `Itoa` 函数

**`func Itoa(i int) string`**

`Itoa` 函数将 `int` 类型的 `i` 转换为字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := 123
    numStr := strconv.Itoa(num)
    fmt.Println("String:", numStr)
}
```

#### 1.3 `ParseBool` 函数

**`func ParseBool(str string) (bool, error)`**

`ParseBool` 函数将字符串 `str` 转换为布尔值。支持的字符串包括 `"1"`、`"t"`、`"true"`、`"0"`、`"f"`、`"false"`，否则返回错误。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    boolStr := "true"
    value, err := strconv.ParseBool(boolStr)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Boolean:", value)
    }
}
```

#### 1.4 `ParseInt` 函数

**`func ParseInt(s string, base int, bitSize int) (int64, error)`**

`ParseInt` 函数将字符串 `s` 转换为 `int64` 类型。`base` 指定了进制（0 表示自动检测），`bitSize` 指定了整数大小（0 表示自动选择）。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    intStr := "1010"
    value, err := strconv.ParseInt(intStr, 2, 64) // 以二进制解析
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Integer:", value)
    }
}
```

#### 1.5 `ParseUint` 函数

**`func ParseUint(s string, base int, bitSize int) (uint64, error)`**

`ParseUint` 函数将字符串 `s` 转换为 `uint64` 类型。`base` 指定了进制（0 表示自动检测），`bitSize` 指定了整数大小（0 表示自动选择）。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    uintStr := "1234"
    value, err := strconv.ParseUint(uintStr, 10, 64) // 以十进制解析
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Unsigned Integer:", value)
    }
}
```

#### 1.6 `FormatBool` 函数

**`func FormatBool(b bool) string`**

`FormatBool` 函数将布尔值 `b` 转换为字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    value := true
    boolStr := strconv.FormatBool(value)
    fmt.Println("String:", boolStr)
}
```

#### 1.7 `FormatInt` 函数

**`func FormatInt(i int64, base int) string`**

`FormatInt` 函数将 `int64` 类型的 `i` 转换为字符串。`base` 指定了进制（2、8、10、16）。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    value := int64(255)
    hexStr := strconv.FormatInt(value, 16) // 转换为十六进制字符串
    fmt.Println("Hexadecimal:", hexStr)
}
```

#### 1.8 `FormatUint` 函数

**`func FormatUint(i uint64, base int) string`**

`FormatUint` 函数将 `uint64` 类型的 `i` 转换为字符串。`base` 指定了进制（2、8、10、16）。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    value := uint64(1234)
    octalStr := strconv.FormatUint(value, 8) // 转换为八进制字符串
    fmt.Println("Octal:", octalStr)
}
```

#### 1.9 `Quote` 函数

**`func Quote(s string) string`**

`Quote` 函数将字符串 `s` 转换为 JSON 字符串字面量形式。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello, World!"
    quotedStr := strconv.Quote(str)
    fmt.Println("Quoted String:", quotedStr)
}
```

#### 1.10 `QuoteToASCII` 函数

**`func QuoteToASCII(s string) string`**

`QuoteToASCII` 函数将字符串 `s` 转换为 ASCII 编码的 JSON 字符串字面量形式，非 ASCII 字符将被转义。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello, 世界!"
    quotedStr := strconv.QuoteToASCII(str)
    fmt.Println("Quoted ASCII String:", quotedStr)
}
```

#### 1.11 `Unquote` 函数

**`func Unquote(s string) (string, error)`**

`Unquote` 函数将被 `Quote` 函数引用的字符串转换回普通字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    quotedStr := `"Hello, World!"`
    unquotedStr, err := strconv.Unquote(quotedStr)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Unquoted String:", unquotedStr)
    }
}
```

### 2. 错误处理

在 `strconv` 包中，许多函数返回的错误都是 `strconv.ErrSyntax`，它表示在转换过程中遇到了语法错误。对于 `Parse` 函数（如 `ParseInt`、`ParseUint`、`ParseBool`），如果输入字符串的格式不正确或超出范围，都会返回该错误。

### 3. 总结

`strconv` 包提供了一组强大而灵活的函数，用于在 Go 中进行字符串和基本数据类型之间的转换。通过掌握这些函数，你可以高效地处理数据解析、格式化和转换，满足各种应用需求。理解和使用这些工具将帮助你在处理数据时更为得心应手。