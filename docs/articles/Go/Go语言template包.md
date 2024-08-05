---
comments: true
---

Go 的标准库 `text/template` 和 `html/template` 提供了强大的模板功能，用于生成文本和 HTML 输出。下面将详细介绍 Go 的模板系统，包括其语法、函数、数据传递等。

### 1. 基础概念

#### 1.1 导入包

- `text/template`：用于生成一般文本。
- `html/template`：用于生成 HTML，具有自动转义功能，防止 XSS 攻击。

```go
import (
    "text/template"
    "html/template"
)
```

### 2. 基本使用

#### 2.1 定义和解析模板

```go
// 定义一个简单的模板
tmpl := `Hello, {{.Name}}!`

// 解析模板
t, err := template.New("example").Parse(tmpl)
if err != nil {
    panic(err)
}
```

#### 2.2 执行模板

```go
// 定义数据结构
data := struct {
    Name string
}{
    Name: "World",
}

// 执行模板并将结果写入 os.Stdout
err = t.Execute(os.Stdout, data)
if err != nil {
    panic(err)
}
```

### 3. 模板语法

#### 3.1 动作

- **字段**：`{{.FieldName}}`
- **方法**：`{{.MethodName}}`
- **函数**：`{{FunctionName .}}`
- **变量声明**：`{{ $variable := .FieldName }}`
- **条件**：`{{if .FieldName}} ... {{end}}`
- **循环**：`{{range .Items}} ... {{end}}`
- **模板包含**：`{{template "templateName" .}}`
- **注释**：`{{/* This is a comment */}}`

#### 3.2 示例

```go
const tmpl = `
{{- /* 定义变量 */ -}}
{{ $name := .Name }}

{{- /* 输出变量 */ -}}
Hello, {{ $name }}!

{{- /* 条件语句 */ -}}
{{ if .IsAdmin }}
  Welcome, admin!
{{ else }}
  Welcome, user!
{{ end }}

{{- /* 循环语句 */ -}}
{{ range .Items }}
  {{ . }}
{{ end }}
`
```

### 4. 嵌套模板

#### 4.1 定义和解析多个模板

```go
// 定义模板
const baseTmpl = `
{{define "base"}}
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{block "title" .}}Default Title{{end}}</title>
  </head>
  <body>
    {{block "body" .}}Default Body{{end}}
  </body>
  </html>
{{end}}
`

const pageTmpl = `
{{template "base" .}}

{{define "title"}}Page Title{{end}}
{{define "body"}}Page Content{{end}}
`

// 解析模板
t, err := template.New("base").Parse(baseTmpl)
if err != nil {
    panic(err)
}
t, err = t.Parse(pageTmpl)
if err != nil {
    panic(err)
}
```

#### 4.2 执行嵌套模板

```go
// 执行模板并将结果写入 os.Stdout
err = t.ExecuteTemplate(os.Stdout, "base", nil)
if err != nil {
    panic(err)
}
```

### 5. 函数

#### 5.1 内置函数

Go 的模板提供了一些内置函数，如 `and`、`or`、`not`、`eq`、`ne`、`lt`、`le`、`gt`、`ge` 等。

```go
{{ if eq .A .B }} A is equal to B {{ end }}
{{ if ne .A .B }} A is not equal to B {{ end }}
```

#### 5.2 自定义函数

可以通过 `FuncMap` 添加自定义函数。

```go
// 定义函数
func add(a, b int) int {
    return a + b
}

// 创建 FuncMap
funcMap := template.FuncMap{
    "add": add,
}

// 解析模板时使用 FuncMap
t, err := template.New("example").Funcs(funcMap).Parse(`{{ add 1 2 }}`)
if err != nil {
    panic(err)
}

// 执行模板
err = t.Execute(os.Stdout, nil)
if err != nil {
    panic(err)
}
```

### 6. 安全性

#### 6.1 HTML 模板自动转义

使用 `html/template` 包生成 HTML 时，模板中的变量会自动转义，防止 XSS 攻击。

```go
import "html/template"

const tmpl = `<div>{{.Content}}</div>`

t, err := template.New("example").Parse(tmpl)
if err != nil {
    panic(err)
}

data := struct {
    Content string
}{
    Content: "<script>alert('XSS');</script>",
}

// 执行模板并将结果写入 os.Stdout
err = t.Execute(os.Stdout, data)
if err != nil {
    panic(err)
}
```

输出结果会将 `<script>` 标签进行转义，防止 XSS 攻击。

### 7. 模板继承

#### 7.1 基础模板

```html
<!-- templates/base.tmpl -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ block "title" . }}Default Title{{ end }}</title>
</head>
<body>
    {{ block "content" . }}Default Content{{ end }}
</body>
</html>
```

#### 7.2 子模板

```html
<!-- templates/home.tmpl -->
{{ define "title" }}Home Page{{ end }}

{{ define "content" }}
<h1>Welcome to the Home Page</h1>
<p>This is the content of the home page.</p>
{{ end }}
```

#### 7.3 加载和解析模板

```go
import (
    "html/template"
    "os"
)

func main() {
    // 解析基础模板和子模板
    tmpl, err := template.ParseFiles("templates/base.tmpl", "templates/home.tmpl")
    if err != nil {
        panic(err)
    }

    // 执行模板并将结果写入 os.Stdout
    err = tmpl.ExecuteTemplate(os.Stdout, "base", nil)
    if err != nil {
        panic(err)
    }
}
```

### 8. 模板传递数据

模板可以接受任何类型的数据，包括结构体、地图、切片等。

```go
type User struct {
    Name string
    Age  int
}

tmpl := `User: {{.Name}}, Age: {{.Age}}`

t, err := template.New("example").Parse(tmpl)
if err != nil {
    panic(err)
}

data := User{Name: "Alice", Age: 30}

// 执行模板并将结果写入 os.Stdout
err = t.Execute(os.Stdout, data)
if err != nil {
    panic(err)
}
```

### 9. 错误处理

模板执行过程中可能会出现错误，需要进行适当的错误处理。

```go
t, err := template.New("example").Parse(`{{.Name}}`)
if err != nil {
    log.Fatalf("Error parsing template: %v", err)
}

data := map[string]string{"Name": "Alice"}

err = t.Execute(os.Stdout, data)
if err != nil {
    log.Fatalf("Error executing template: %v", err)
}
```

### 10. 高级用法

#### 10.1 递归模板

模板中可以调用自身实现递归。例如，生成目录树。

```go
const tmpl = `
{{- define "tree" -}}
<ul>
    {{- range . -}}
    <li>{{ .Name }}
        {{- if .Children -}}
            {{- template "tree" .Children -}}
        {{- end -}}
    </li>
    {{- end -}}
</ul>
{{- end -}}
`

t, err := template.New("tree").Parse(tmpl)
if err != nil {
    panic(err)
}

type Node struct {
    Name     string
    Children []*Node
}

data := []*Node{
    {Name: "Root", Children: []*Node{
        {Name: "Child 1"},
        {Name: "Child 2", Children: []*Node{
            {Name: "Grandchild 1"},
        }},
    }},
}

// 执行模板并将结果写入 os.Stdout
err = t.Execute(os.Stdout, data)
if err != nil {
    panic(err)
}
```

这个示例展示了如何递归地渲染一个树状结构。

通过以上内容，涵盖了 Go 模板系统的基础知识和高级用法。你可以根据具体需求在项目中灵活运用这些功能。