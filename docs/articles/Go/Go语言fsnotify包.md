---
comments: true
---

`fsnotify` 是一个用于 Go 语言的文件系统通知库。它可以用来监控文件或目录的变化，并在文件发生修改、创建、删除、重命名等事件时触发通知。`fsnotify` 库跨平台工作，支持 Windows、macOS 和 Linux 等系统。

### 1. 安装 fsnotify

首先，你需要安装 `fsnotify` 包：

```bash
go get -u github.com/fsnotify/fsnotify
```

### 2. 基本用法

以下是一个使用 `fsnotify` 监控目录中文件变化的简单示例。

```go
package main

import (
    "fmt"
    "log"

    "github.com/fsnotify/fsnotify"
)

func main() {
    // 创建一个新的监视器
    watcher, err := fsnotify.NewWatcher()
    if err != nil {
        log.Fatal(err)
    }
    defer watcher.Close()

    // 设置监控的目录
    err = watcher.Add("./mydir")
    if err != nil {
        log.Fatal(err)
    }

    // 监听事件和错误
    done := make(chan bool)
    go func() {
        for {
            select {
            case event, ok := <-watcher.Events:
                if !ok {
                    return
                }
                // 打印文件系统事件
                fmt.Println("event:", event)

                // 检查具体的事件类型
                if event.Op&fsnotify.Write == fsnotify.Write {
                    fmt.Println("modified file:", event.Name)
                }
                if event.Op&fsnotify.Create == fsnotify.Create {
                    fmt.Println("created file:", event.Name)
                }
                if event.Op&fsnotify.Remove == fsnotify.Remove {
                    fmt.Println("deleted file:", event.Name)
                }
                if event.Op&fsnotify.Rename == fsnotify.Rename {
                    fmt.Println("renamed file:", event.Name)
                }
            case err, ok := <-watcher.Errors:
                if !ok {
                    return
                }
                log.Println("error:", err)
            }
        }
    }()

    // 阻止主线程退出
    <-done
}
```

### 3. fsnotify 事件类型

`fsnotify` 支持多种文件系统事件类型，它们被表示为常量，可以使用按位与（`&`）操作符来检测发生的事件。

- `fsnotify.Create`：表示文件或目录被创建。
- `fsnotify.Write`：表示文件被写入或修改。
- `fsnotify.Remove`：表示文件或目录被删除。
- `fsnotify.Rename`：表示文件或目录被重命名。
- `fsnotify.Chmod`：表示文件的权限或属性发生了变化。

这些事件类型可以组合在一起，检测多种操作。例如，检查是否有文件被修改或创建：

```go
if event.Op&(fsnotify.Write|fsnotify.Create) != 0 {
    fmt.Println("file modified or created:", event.Name)
}
```

### 4. 使用场景

`fsnotify` 可以用于多种场景，如：

- **自动重载配置文件**：监控配置文件的变化，当配置文件被更新时，自动重新加载配置。
- **热重启服务**：当代码文件发生变化时，自动重启服务。
- **文件变更同步**：监控文件夹内的文件变化，并同步更改到其他位置（如备份服务器）。
- **日志监控**：监控日志文件的更新，并实时处理新增日志条目。

### 5. 监控整个目录

`fsnotify` 可以监控单个文件或整个目录。如果你要监控整个目录内所有文件的变化，只需将该目录添加到监控列表中。

```go
err = watcher.Add("/path/to/directory")
if err != nil {
    log.Fatal(err)
}
```

不过，`fsnotify` 不会递归监控子目录。如果需要监控子目录中的文件，则需要手动添加每个子目录到监控列表。

### 6. 跨平台注意事项

`fsnotify` 是一个跨平台库，但不同操作系统在文件系统事件方面可能表现不同：

- 在 Linux 系统上，`fsnotify` 基于 `inotify`。
- 在 Windows 系统上，`fsnotify` 基于 `ReadDirectoryChangesW`。
- 在 macOS 和 BSD 系统上，`fsnotify` 基于 `kqueue`。

各个平台支持的事件和行为可能略有差异，例如，一些系统可能不支持特定的事件类型（如 `Chmod`），这在开发时需要注意。

### 7. 处理多个文件和目录

你可以同时监控多个文件或目录，方法是使用 `watcher.Add()` 为每个文件或目录添加监控。

```go
watcher.Add("/path/to/dir1")
watcher.Add("/path/to/dir2")
```

对于复杂的目录结构，特别是需要监控子目录，你需要递归遍历目录并为每个子目录调用 `watcher.Add()`。

### 8. fsnotify 线程模型

`fsnotify` 在独立的 goroutine 中工作，你需要使用通道（channel）来接收事件和错误。因此，在编写程序时要确保在 goroutine 中处理这些通道，避免阻塞主线程。通常使用 `select` 语句来处理来自 `watcher.Events` 和 `watcher.Errors` 的消息。

### 9. 总结

`fsnotify` 是一个非常强大的文件系统监控库，可以在多平台下高效工作。它为开发者提供了简洁的 API 来处理文件和目录的变化，使得处理自动化任务（如配置热重载、文件同步等）变得更加简单。