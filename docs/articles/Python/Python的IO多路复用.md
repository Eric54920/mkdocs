在 Python 中，实现 IO 多路复用通常使用 `select`、`poll`、`epoll`（Linux）或 `kqueue`（BSD/macOS）等机制。其中，`select` 是跨平台的，而 `poll`、`epoll` 和 `kqueue` 则是针对特定操作系统的。在 Python 中，通常使用 `select` 或者 `selectors` 模块来实现 IO 多路复用。

### 1. select 模块
   `select` 模块提供了一个跨平台的接口，允许程序监视多个文件描述符（sockets、文件等），并在其中任何一个文件描述符就绪时通知程序。使用 `select` 模块，可以同时监视多个 IO 对象（如 sockets）的可读性、可写性和异常情况，从而实现 IO 多路复用。

### 2. selectors 模块
   `selectors` 模块是在 Python 3.4 引入的，提供了一个更高级的接口，封装了底层的多路复用机制（如 `select`、`poll`、`epoll` 和 `kqueue`）。它简化了 IO 多路复用的使用，使得程序员可以更方便地编写跨平台的高性能网络应用。

下面是一个使用 `selectors` 模块实现 IO 多路复用的简单示例：

```python
import selectors
import socket

# 创建 selector 对象
selector = selectors.DefaultSelector()

# 创建一个 TCP 服务器
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 8888))
server_socket.listen(5)
server_socket.setblocking(False)  # 设置非阻塞模式

# 注册服务器 socket 到 selector
selector.register(server_socket, selectors.EVENT_READ)

while True:
    # 通过 select 监听事件
    events = selector.select()

    for key, mask in events:
        if key.fileobj == server_socket:
            # 有新连接
            client_socket, addr = server_socket.accept()
            print('Connected from:', addr)
            client_socket.setblocking(False)
            # 注册客户端 socket 到 selector
            selector.register(client_socket, selectors.EVENT_READ)
        else:
            # 有可读数据
            client_socket = key.fileobj
            data = client_socket.recv(1024)
            if data:
                print('Received:', data.decode())
                client_socket.send(data)
            else:
                # 客户端关闭连接
                print('Connection closed:', client_socket.getpeername())
                selector.unregister(client_socket)
                client_socket.close()
```

在这个示例中，程序使用 `selectors` 模块监听服务器 socket 上的连接请求，并监听客户端 socket 上的可读事件。当有新的连接时，将客户端 socket 注册到 selector 中，当客户端 socket 上有数据可读时，程序接收并处理数据，然后将数据发送回客户端。