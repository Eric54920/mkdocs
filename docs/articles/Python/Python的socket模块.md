---
comments: true
---

Python 的 `socket` 模块提供了对底层网络通信的支持，允许你使用套接字（sockets）进行网络通信。套接字是网络通信的基础，它允许在不同计算机之间的程序之间进行数据交换。

### 基本概念

在使用 `socket` 模块之前，需要了解几个基本概念：

- **IP 地址**: 每台联网的设备（如计算机、服务器）在网络中都有一个唯一的标识符，称为 IP 地址，用于定位设备。
- **端口号**: 用于标识特定应用程序的逻辑连接点，允许同一台计算机上运行多个网络服务。
- **协议**: 规定了数据如何在网络中传输和接收的约定。

### 创建套接字

使用 `socket` 模块创建套接字：

```python
import socket

# 创建一个 TCP 套接字
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 创建一个 UDP 套接字
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
```

- `AF_INET` 表示使用 IPv4 地址。
- `SOCK_STREAM` 表示使用 TCP 协议进行可靠的字节流传输。
- `SOCK_DGRAM` 表示使用 UDP 协议进行无连接的数据报传输。

### TCP 服务器端示例

以下是一个简单的 TCP 服务器示例，展示了如何使用 `socket` 模块创建一个 TCP 服务器：

```python
import socket

# 创建 TCP/IP 套接字
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 绑定到指定地址和端口
server_address = ('localhost', 12345)
server_socket.bind(server_address)

# 监听传入连接
server_socket.listen(5)

print(f"服务器启动，监听地址：{server_address}")

while True:
    # 等待连接
    print("等待客户端连接...")
    client_socket, client_address = server_socket.accept()

    try:
        print(f"客户端连接：{client_address}")

        # 接收数据
        data = client_socket.recv(1024)
        print(f"接收到的数据：{data.decode()}")

        # 发送响应数据
        response = "Hello from server!"
        client_socket.sendall(response.encode())
    finally:
        # 关闭连接
        client_socket.close()
```

### TCP 客户端示例

以下是一个简单的 TCP 客户端示例，展示了如何使用 `socket` 模块创建一个 TCP 客户端并与上述服务器进行通信：

```python
import socket

# 创建 TCP/IP 套接字
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 连接到服务器
server_address = ('localhost', 12345)
client_socket.connect(server_address)

try:
    # 发送数据
    message = "Hello from client!"
    client_socket.sendall(message.encode())

    # 接收响应数据
    data = client_socket.recv(1024)
    print(f"接收到的响应：{data.decode()}")
finally:
    # 关闭连接
    client_socket.close()
```

### UDP 示例

以下是一个简单的 UDP 示例，展示了如何使用 `socket` 模块进行 UDP 数据报通信：

```python
import socket

# 创建 UDP 套接字
udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# 绑定到指定地址和端口
server_address = ('localhost', 54321)
udp_socket.bind(server_address)

print(f"UDP 服务器启动，监听地址：{server_address}")

while True:
    # 接收数据
    data, client_address = udp_socket.recvfrom(1024)
    print(f"接收到来自 {client_address} 的数据：{data.decode()}")

    # 发送响应数据
    response = "Hello from UDP server!"
    udp_socket.sendto(response.encode(), client_address)
```

### 注意事项

- 在使用 `socket` 进行网络编程时，要确保理解各种网络协议的特性，如 TCP 和 UDP 的区别。
- 套接字编程涉及网络连接，因此需要处理异常和错误情况，确保程序稳定性。
- 在实际应用中，通常需要考虑安全性、并发连接管理等方面的问题。

### 总结

`socket` 模块提供了底层的网络通信接口，允许 Python 程序通过 TCP 或 UDP 协议进行网络通信。通过掌握 `socket` 模块的基本用法，可以实现各种网络应用程序，如网络服务器、客户端和实时数据传输等，非常适合需要直接控制网络通信细节的场景。