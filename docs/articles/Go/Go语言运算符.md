---
comments: true
---

Go语言提供了多种运算符，用于执行各种操作。运算符主要分为以下几类：算术运算符、关系运算符、逻辑运算符、位运算符、赋值运算符和其他运算符。下面是对每种运算符的详细介绍。

### 1. 算术运算符

算术运算符用于基本的数学运算，如加减乘除等。

| 运算符 | 描述       | 示例     |
| ------ | ---------- | -------- |
| `+`    | 加法       | `a + b`  |
| `-`    | 减法       | `a - b`  |
| `*`    | 乘法       | `a * b`  |
| `/`    | 除法       | `a / b`  |
| `%`    | 取模       | `a % b`  |
| `++`   | 自增       | `a++`    |
| `--`   | 自减       | `a--`    |

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    fmt.Println("a + b =", a+b)
    fmt.Println("a - b =", a-b)
    fmt.Println("a * b =", a*b)
    fmt.Println("a / b =", a/b)
    fmt.Println("a % b =", a%b)

    a++
    fmt.Println("a++ =", a)

    b--
    fmt.Println("b-- =", b)
}
```

### 2. 关系运算符

关系运算符用于比较两个值，返回布尔值（`true`或`false`）。

| 运算符 | 描述       | 示例     |
| ------ | ---------- | -------- |
| `==`   | 等于       | `a == b` |
| `!=`   | 不等于     | `a != b` |
| `>`    | 大于       | `a > b`  |
| `<`    | 小于       | `a < b`  |
| `>=`   | 大于等于   | `a >= b` |
| `<=`   | 小于等于   | `a <= b` |

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    fmt.Println("a == b =", a == b)
    fmt.Println("a != b =", a != b)
    fmt.Println("a > b =", a > b)
    fmt.Println("a < b =", a < b)
    fmt.Println("a >= b =", a >= b)
    fmt.Println("a <= b =", a <= b)
}
```

### 3. 逻辑运算符

逻辑运算符用于连接条件表达式，返回布尔值。

| 运算符 | 描述       | 示例     |
| ------ | ---------- | -------- |
| `&&`   | 逻辑与     | `a && b` |
| `||`   | 逻辑或     | `a || b` |
| `!`    | 逻辑非     | `!a`     |

```go
package main

import "fmt"

func main() {
    a := true
    b := false

    fmt.Println("a && b =", a && b)
    fmt.Println("a || b =", a || b)
    fmt.Println("!a =", !a)
}
```

### 4. 位运算符

位运算符用于按位操作整型数值。

| 运算符 | 描述               | 示例         |
| ------ | ------------------ | ------------ |
| `&`    | 按位与             | `a & b`      |
| `|`    | 按位或             | `a | b`      |
| `^`    | 按位异或           | `a ^ b`      |
| `<<`   | 左移               | `a << b`     |
| `>>`   | 右移               | `a >> b`     |
| `&^`   | 按位清除（AND NOT） | `a &^ b`     |

```go
package main

import "fmt"

func main() {
    a := 60    // 60 = 0011 1100
    b := 13    // 13 = 0000 1101

    fmt.Println("a & b =", a & b)  // 12 = 0000 1100
    fmt.Println("a | b =", a | b)  // 61 = 0011 1101
    fmt.Println("a ^ b =", a ^ b)  // 49 = 0011 0001
    fmt.Println("a << 2 =", a << 2) // 240 = 1111 0000
    fmt.Println("a >> 2 =", a >> 2) // 15 = 0000 1111
    fmt.Println("a &^ b =", a &^ b) // 48 = 0011 0000
}
```

### 5. 赋值运算符

赋值运算符用于给变量赋值。

| 运算符 | 描述            | 示例          |
| ------ | --------------- | ------------- |
| `=`    | 简单赋值        | `a = b`       |
| `+=`   | 加且赋值        | `a += b`      |
| `-=`   | 减且赋值        | `a -= b`      |
| `*=`   | 乘且赋值        | `a *= b`      |
| `/=`   | 除且赋值        | `a /= b`      |
| `%=`   | 取模且赋值      | `a %= b`      |
| `<<=`  | 左移且赋值      | `a <<= b`     |
| `>>=`  | 右移且赋值      | `a >>= b`     |
| `&=`   | 按位与且赋值    | `a &= b`      |
| `^=`   | 按位异或且赋值  | `a ^= b`      |
| `|=`   | 按位或且赋值    | `a |= b`      |
| `&^=`  | 按位清除且赋值  | `a &^= b`     |

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    a += b
    fmt.Println("a += b =", a) // 13

    a -= b
    fmt.Println("a -= b =", a) // 10

    a *= b
    fmt.Println("a *= b =", a) // 30

    a /= b
    fmt.Println("a /= b =", a) // 10

    a %= b
    fmt.Println("a %= b =", a) // 1

    a <<= 2
    fmt.Println("a <<= 2 =", a) // 4

    a >>= 1
    fmt.Println("a >>= 1 =", a) // 2

    a &= b
    fmt.Println("a &= b =", a) // 2

    a ^= b
    fmt.Println("a ^= b =", a) // 1

    a |= b
    fmt.Println("a |= b =", a) // 3

    a &^= b
    fmt.Println("a &^= b =", a) // 0
}
```

### 6. 其他运算符

#### 6.1 指针运算符

Go语言中的指针运算符用于获取变量的地址（`&`）和解引用指针（`*`）。

```go
package main

import "fmt"

func main() {
    var a int = 42
    var p *int = &a

    fmt.Println("a =", a)    // 输出 a 的值
    fmt.Println("&a =", &a)  // 输出 a 的地址
    fmt.Println("p =", p)    // 输出 p 的值（即 a 的地址）
    fmt.Println("*p =", *p)  // 解引用 p，输出 p 指向的值（即 a 的值）
}
```

#### 6.2 `new` 和 `make` 运算符

- `new`：分配内存，返回指向类型的指针。用于值类型（如基本类型、数组、结构体）。

```go
var p *int = new(int)
*p = 42
fmt.Println("*p =", *p) // 输出 42
```

- `make`：分配并初始化内存。仅用于切片（slice）、映射（map）和通道（channel）。

```go
s := make([]int, 5)
m := make(map[string]int)
ch := make(chan int)

fmt.Println(s) // 输出 [0 0 0 0 0]
m["key"] = 42
fmt.Println(m["key"]) // 输出 42
```

### 7. 运算符优先级

运算符有优先级，优先级高的运算符会先执行。可以使用括号改变运算的优先级。

优先级从高到低如下：

1. `*` `/` `%` `<<` `>>` `&` `&^`
2. `+` `-` `|` `^`
3. `==` `!=` `<` `<=` `>` `>=`
4. `&&`
5. `||`

```go
package main

import "fmt"

func main() {
    a := 10 + 2*5 // 20
    b := (10 + 2) * 5 // 60
    c := 10 > 5 && 8 < 3 // false
    d := 10 == 10 || 5 > 3 // true

    fmt.Println("a =", a)
    fmt.Println("b =", b)
    fmt.Println("c =", c)
    fmt.Println("d =", d)
}
```

通过以上内容，可以全面了解Go语言中的各种运算符及其用法，帮助在编写Go程序时有效地进行数据操作和逻辑控制。