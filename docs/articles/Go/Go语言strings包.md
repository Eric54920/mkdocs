---
comments: true
---

Go语言的 `strings` 包提供了一系列函数，用于处理和操作字符串。这个包包括了各种字符串操作功能，如查找、替换、分割和拼接等。以下是对 `strings` 包的详细介绍，包括所有主要方法和使用示例。

### 1. `strings` 包概述

`strings` 包主要用于处理和操作 UTF-8 编码的字符串。它不包括对 Unicode 字符的处理（例如对 Unicode 标准的完整支持），但它处理的所有字符串都是有效的 UTF-8 编码。

### 2. 主要函数和方法

#### 2.1 `Contains` 函数

**`func Contains(s, substr string) bool`**

`Contains` 函数判断字符串 `s` 是否包含子字符串 `substr`。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, world!"
    fmt.Println(strings.Contains(s, "world")) // true
    fmt.Println(strings.Contains(s, "Go"))    // false
}
```

#### 2.2 `ContainsAny` 函数

**`func ContainsAny(s, chars string) bool`**

`ContainsAny` 函数判断字符串 `s` 是否包含任意一个在 `chars` 中列出的字符。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, world!"
    fmt.Println(strings.ContainsAny(s, "aeiou")) // true
    fmt.Println(strings.ContainsAny(s, "xyz"))   // false
}
```

#### 2.3 `ContainsRune` 函数

**`func ContainsRune(s string, r rune) bool`**

`ContainsRune` 函数判断字符串 `s` 是否包含字符 `r`。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, world!"
    fmt.Println(strings.ContainsRune(s, 'o')) // true
    fmt.Println(strings.ContainsRune(s, 'z')) // false
}
```

#### 2.4 `Count` 函数

**`func Count(s, substr string) int`**

`Count` 函数计算子字符串 `substr` 在字符串 `s` 中出现的次数。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "banana"
    fmt.Println(strings.Count(s, "a")) // 3
}
```

#### 2.5 `EqualFold` 函数

**`func EqualFold(s, t string) bool`**

`EqualFold` 函数判断两个字符串是否在忽略大小写的情况下相等。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println(strings.EqualFold("Hello", "hello")) // true
    fmt.Println(strings.EqualFold("Hello", "world")) // false
}
```

#### 2.6 `Fields` 函数

**`func Fields(s string) []string`**

`Fields` 函数将字符串 `s` 分割为子字符串，分隔符是空白字符（空格、制表符、换行符等）。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello   world\tfoo\nbar"
    fmt.Println(strings.Fields(s)) // [Hello world foo bar]
}
```

#### 2.7 `FieldsFunc` 函数

**`func FieldsFunc(s string, f func(rune) bool) []string`**

`FieldsFunc` 函数将字符串 `s` 按照函数 `f` 计算的分隔符进行分割。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {
    s := "Hello, world; foo bar"
    result := strings.FieldsFunc(s, func(r rune) bool {
        return unicode.IsSpace(r) || r == ',' || r == ';'
    })
    fmt.Println(result) // [Hello world foo bar]
}
```

#### 2.8 `HasPrefix` 函数

**`func HasPrefix(s, prefix string) bool`**

`HasPrefix` 函数判断字符串 `s` 是否以 `prefix` 开头。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello.go"
    fmt.Println(strings.HasPrefix(s, "hello")) // true
    fmt.Println(strings.HasPrefix(s, "go"))    // false
}
```

#### 2.9 `HasSuffix` 函数

**`func HasSuffix(s, suffix string) bool`**

`HasSuffix` 函数判断字符串 `s` 是否以 `suffix` 结尾。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello.go"
    fmt.Println(strings.HasSuffix(s, ".go")) // true
    fmt.Println(strings.HasSuffix(s, ".txt")) // false
}
```

#### 2.10 `Index` 函数

**`func Index(s, substr string) int`**

`Index` 函数返回子字符串 `substr` 在字符串 `s` 中第一次出现的位置。如果找不到子字符串，则返回 -1。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello world"
    fmt.Println(strings.Index(s, "world")) // 6
    fmt.Println(strings.Index(s, "foo"))   // -1
}
```

#### 2.11 `IndexAny` 函数

**`func IndexAny(s, chars string) int`**

`IndexAny` 函数返回字符串 `s` 中首次出现任意一个字符 `chars` 中的字符的位置。如果找不到，则返回 -1。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello world"
    fmt.Println(strings.IndexAny(s, "aeiou")) // 1
    fmt.Println(strings.IndexAny(s, "xyz"))   // -1
}
```

#### 2.12 `IndexByte` 函数

**`func IndexByte(s string, c byte) int`**

`IndexByte` 函数返回字符 `c` 在字符串 `s` 中第一次出现的位置。如果找不到字符，则返回 -1。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello world"
    fmt.Println(strings.IndexByte(s, 'o')) // 4
    fmt.Println(strings.IndexByte(s, 'z')) // -1
}
```

#### 2.13 `LastIndex` 函数

**`func LastIndex(s, substr string) int`**

`LastIndex` 函数返回子字符串 `substr` 在字符串 `s` 中最后一次出现的位置。如果找不到子字符串，则返回 -1。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "hello world hello"
    fmt.Println(strings.LastIndex(s, "hello")) // 13
    fmt.Println(strings.LastIndex(s, "foo"))   // -1
}
```

#### 2.14 `Join` 函数

**`func Join(a []string, sep string) string`**

`Join` 函数将字符串切片 `a` 中的元素使用分隔符 `sep` 连接成一个字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    parts := []string{"foo", "bar", "baz"}
    result := strings.Join(parts, ", ")
    fmt.Println(result) // foo, bar, baz
}
```

#### 2.15 `Repeat` 函数

**`func Repeat(s string, count int) string`**

`Repeat` 函数将字符串 `s` 重复 `count` 次并返回结果。如果 `count` 为负值，则返回空字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "go"
    fmt.Println(strings.Repeat(s, 3)) // gogo go go
    fmt.Println(strings.Repeat(s, 0)) // 
}
```

#### 2.16 `Replace` 函数

**`func Replace(s, old, new string, n int) string`**

`Replace` 函数将字符串 `s` 中的 `old` 替换为 `new`，`n` 表示替换的次数。`n` 为负数表示替换所有匹配项。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "foo foo foo"
    result := strings.Replace(s, "foo", "bar", 2)
    fmt.Println(result) // bar bar foo
}
```

#### 2.17 `ReplaceAll` 函数

**`func ReplaceAll(s, old, new string) string`**

`ReplaceAll` 函数将字符串 `s` 中所有的 `old` 替换为 `new`。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "foo foo foo"
    result := strings.ReplaceAll(s, "foo", "bar")
    fmt.Println(result) // bar bar bar
}
```

#### 2.18 `Split` 函数

**`func Split(s, sep string) []string`**

`Split` 函数将字符串 `s` 按照分隔符 `sep` 切割成字符串切片。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "a,b,c"
    result := strings.Split(s, ",")
    fmt.Println(result) // [a b c]
}
```

#### 2.19 `SplitN` 函数

**`func SplitN(s, sep string, n int) []string`**

`SplitN` 函数将字符串 `s` 按照分隔符 `sep` 切割成字符串切片，最多切割 `n` 次。`n` 为负数表示不限制切割次数。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "a,b,c,d"
    result := strings.SplitN(s, ",", 3)
    fmt.Println(result) // [a b c,d]
}
```

#### 2.20 `SplitAfter` 函数

**`func SplitAfter(s, sep string) []string`**

`SplitAfter` 函数将字符串 `s` 按照分隔符 `sep` 切割成字符串切片，但保留分隔符。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "a,b,c"
    result := strings.SplitAfter(s, ",")
    fmt.Println(result) // [a, b, c]
}
```

#### 2.21 `SplitAfterN` 函数

**`func SplitAfterN(s, sep string, n int) []string`**

`SplitAfterN` 函数将字符串 `s` 按照分隔符 `sep` 切割成字符串切片，最多切割 `n` 次，并保留分隔符。`n` 为负数表示不限制切割次数。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "a,b,c,d"
    result := strings.SplitAfterN(s, ",", 3)
    fmt.Println(result) // [a, b, c,d]
}
```

#### 2.22 `Trim` 函数

**`func Trim(s string, cutset string) string`**

`Trim` 函数去掉字符串 `s` 两端的所有 `cutset` 中的字符。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "***hello***"
    result := strings.Trim(s, "*")
    fmt.Println(result) // hello
}
```

#### 2.23 `TrimSpace` 函数

**`func TrimSpace(s string) string`**

`TrimSpace` 函数去掉字符串 `s` 两端的空白字符，包括空格、制表符、换行符等。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "   hello   "
    result := strings.TrimSpace(s)
    fmt.Println(result) // hello
}
```

#### 2.24 `TrimPrefix` 函数

**`func TrimPrefix(s, prefix string) string`**

`TrimPrefix` 函数去掉字符串 `s` 开头的 `prefix` 子字符串，如果 `s` 以 `prefix` 开头，则返回去掉 `prefix` 的新字符串，否则返回原字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, world!"
    result := strings.TrimPrefix(s, "Hello, ")
    fmt.Println(result) // world!
}
```

#### 2.25 `TrimSuffix` 函数

**`func TrimSuffix(s, suffix string) string`**

`TrimSuffix` 函数去掉字符串 `s` 结尾的 `suffix` 子字符串，如果 `s` 以 `suffix` 结尾，则返回去掉 `suffix` 的新字符串，否则返回原字符串。

**示例**：

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, world!"
    result := strings.TrimSuffix(s, "world!")
    fmt.Println(result) // Hello, 
}
```

### 3. 总结

`strings` 包提供了处理和操作字符串的丰富功能，包括查找、替换、分割、拼接、修剪等。通过掌握这些函数，你可以高效地处理各种字符串操作需求，使得 Go 语言的字符串处理更加得心应手。