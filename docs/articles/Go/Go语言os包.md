---
comments: true
---

Go语言的 `os` 标准库提供了与操作系统交互的功能，包括文件和目录操作、环境变量管理、进程信息等。本文将详细介绍 `os` 包内的所有主要方法和类型，帮助你高效地使用这些功能来完成各种系统编程任务。

### 1. 文件和目录操作

- **`os.Create(name string) (*os.File, error)`**

创建一个新文件，如果文件已存在，则清空文件内容。

```go
file, err := os.Create("example.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()
```

- **`os.Open(name string) (*os.File, error)`**

打开一个已存在的文件进行读取。文件必须存在，否则返回错误。

```go
file, err := os.Open("example.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()
```

- **`os.OpenFile(name string, flag int, perm os.FileMode) (*os.File, error)`**

以指定的标志和权限打开一个文件。标志可以组合使用，如 `os.O_RDWR`（读写模式）、`os.O_CREATE`（创建文件）等。

```go
file, err := os.OpenFile("example.txt", os.O_RDWR|os.O_CREATE, 0666)
if err != nil {
    log.Fatal(err)
}
defer file.Close()
```

- **`os.Remove(name string) error`**

删除指定文件。

```go
err := os.Remove("example.txt")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Rename(oldpath, newpath string) error`**

重命名（或移动）文件或目录。

```go
err := os.Rename("oldname.txt", "newname.txt")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Mkdir(name string, perm os.FileMode) error`**

创建一个新目录。

```go
err := os.Mkdir("newdir", 0755)
if err != nil {
    log.Fatal(err)
}
```

- **`os.MkdirAll(path string, perm os.FileMode) error`**

递归创建目录。如果父目录不存在，则一并创建。

```go
err := os.MkdirAll("path/to/dir", 0755)
if err != nil {
    log.Fatal(err)
}
```

- **`os.RemoveAll(path string) error`**

删除指定路径及其所有子文件和目录。

```go
err := os.RemoveAll("path/to/dir")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Getwd() (string, error)`**

获取当前工作目录。

```go
cwd, err := os.Getwd()
if err != nil {
    log.Fatal(err)
}
```

- **`os.Chdir(dir string) error`**

改变当前工作目录。

```go
err := os.Chdir("path/to/dir")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Stat(name string) (os.FileInfo, error)`**

获取文件或目录的信息。

```go
info, err := os.Stat("example.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println(info.Name(), info.Size())
```

### 2. 文件信息

`os.File` 表示一个打开的文件。主要方法包括：

- **`file.Close() error`**: 关闭文件。
- **`file.Read(p []byte) (n int, err error)`**: 从文件中读取数据。
- **`file.Write(p []byte) (n int, err error)`**: 向文件写入数据。
- **`file.Seek(offset int64, whence int) (pos int64, err error)`**: 移动文件指针。

```go
file, err := os.Open("example.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

buf := make([]byte, 100)
_, err = file.Read(buf)
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(buf))
```

`os.FileInfo` 文件或目录的信息。主要方法包括：

- **`info.Name() string`**: 返回文件名。
- **`info.Size() int64`**: 返回文件大小（以字节为单位）。
- **`info.Mode() os.FileMode`**: 返回文件模式和权限。
- **`info.ModTime() time.Time`**: 返回文件最后修改时间。
- **`info.IsDir() bool`**: 判断是否为目录。

```go
info, err := os.Stat("example.txt")
if err != nil {
    log.Fatal(err)
}
fmt.Println("File Name:", info.Name())
fmt.Println("Size:", info.Size())
```

### 3. 环境变量

- **`os.Getenv(key string) string`**

获取环境变量的值。如果环境变量不存在，返回空字符串。

```go
value := os.Getenv("HOME")
fmt.Println("HOME:", value)
```

- **`os.Setenv(key, value string) error`**

设置环境变量。

```go
err := os.Setenv("MY_VAR", "my_value")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Unsetenv(key string) error`**

删除环境变量。

```go
err := os.Unsetenv("MY_VAR")
if err != nil {
    log.Fatal(err)
}
```

- **`os.Environ() []string`**

返回所有环境变量，以 `key=value` 格式的切片表示。

```go
envs := os.Environ()
for _, env := range envs {
    fmt.Println(env)
}
```

### 4. 进程管理

- **`os.Getpid() int`**

获取当前进程的 PID（进程ID）。

```go
pid := os.Getpid()
fmt.Println("PID:", pid)
```

- **`os.Getppid() int`**

获取当前进程的父进程 PID（父进程ID）。

```go
ppid := os.Getppid()
fmt.Println("PPID:", ppid)
```

- **`os.Exit(code int)`**

退出当前进程，并返回指定的退出码。

```go
os.Exit(1)
```

- **`os.Signal`**

用于处理进程信号。`os` 包提供了对信号的支持，可以在 `os/signal` 包中找到更多细节。

```go
import "os/signal"

sigc := make(chan os.Signal, 1)
signal.Notify(sigc, os.Interrupt)
<-sigc
fmt.Println("Interrupt signal received, exiting...")
```

### 5. 临时文件和目录

- **`os.TempDir() string`**

获取默认的临时目录。

```go
tempDir := os.TempDir()
fmt.Println("TempDir:", tempDir)
```

- **`os.CreateTemp(dir, pattern string) (*os.File, error)`**

创建一个新的临时文件，文件名根据指定的模式生成。

```go
file, err := os.CreateTemp("", "prefix-*.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()
fmt.Println("Temporary file created:", file.Name())
```

- **`os.MkdirTemp(dir, pattern string) (string, error)`**

创建一个新的临时目录，目录名根据指定的模式生成。

```go
dir, err := os.MkdirTemp("", "prefix-")
if err != nil {
    log.Fatal(err)
}
defer os.RemoveAll(dir)
fmt.Println("Temporary directory created:", dir)
```

### 6. 文件模式和权限

`os.FileMode` 表示文件的模式和权限，主要方法包括：

- **`mode.IsDir() bool`**: 判断是否为目录。
- **`mode.Perm() os.FileMode`**: 返回权限部分。

文件权限的常用值包括：

- **`0644`**: 读写权限（所有者），读权限（组和其他）。
- **`0755`**: 读、写、执行权限（所有者），读和执行权限（组和其他）。

```go
info, err := os.Stat("example.txt")
if err != nil {
    log.Fatal(err)
}
mode := info.Mode()
fmt.Println("File permissions:", mode.Perm())
```

### 7. 总结

Go语言的 `os` 标准库提供了丰富的功能来处理文件和目录操作、环境变量管理、进程信息等。通过掌握这些功能，你可以更高效地进行系统编程和开发。