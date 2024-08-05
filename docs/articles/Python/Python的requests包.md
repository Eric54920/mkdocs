---
comments: true
---

`requests` 包是一个用于简化 HTTP 请求的 Python 库，以其易用性和功能强大而广受欢迎。它为开发者提供了友好的 API，可以轻松地发送 HTTP 请求和处理响应。

### 1. 安装
要使用 `requests` 库，首先需要安装它。可以使用 pip 进行安装：
```bash
pip install requests
```

### 2. 基本用法
以下是使用 `requests` 包的一些基本示例，包括发送各种类型的 HTTP 请求。

#### 2.1 发送 GET 请求
```python
import requests

response = requests.get('https://jsonplaceholder.typicode.com/posts')
print(response.status_code)  # 输出响应状态码
print(response.text)         # 输出响应内容
```

#### 2.2 发送 POST 请求
```python
import requests

payload = {'title': 'foo', 'body': 'bar', 'userId': 1}
response = requests.post('https://jsonplaceholder.typicode.com/posts', json=payload)
print(response.status_code)
print(response.json())
```

#### 2.3 发送 PUT 请求
```python
import requests

payload = {'id': 1, 'title': 'foo', 'body': 'bar', 'userId': 1}
response = requests.put('https://jsonplaceholder.typicode.com/posts/1', json=payload)
print(response.status_code)
print(response.json())
```

#### 2.4 发送 DELETE 请求
```python
import requests

response = requests.delete('https://jsonplaceholder.typicode.com/posts/1')
print(response.status_code)
```

### 3. 常见操作

#### 3.1 设置请求头
```python
import requests

headers = {'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}
response = requests.get('https://jsonplaceholder.typicode.com/posts', headers=headers)
print(response.status_code)
print(response.text)
```

#### 3.2 发送带参数的 GET 请求
```python
import requests

params = {'userId': 1}
response = requests.get('https://jsonplaceholder.typicode.com/posts', params=params)
print(response.status_code)
print(response.json())
```

#### 3.3 上传文件
```python
import requests

files = {'file': open('report.txt', 'rb')}
response = requests.post('https://httpbin.org/post', files=files)
print(response.status_code)
print(response.json())
```

#### 3.4 处理响应
`requests` 包提供了多种方法来处理 HTTP 响应。

- **响应状态码**
```python
response = requests.get('https://jsonplaceholder.typicode.com/posts')
print(response.status_code)
```

- **响应头**
```python
response = requests.get('https://jsonplaceholder.typicode.com/posts')
print(response.headers)
```

- **响应内容**
```python
response = requests.get('https://jsonplaceholder.typicode.com/posts')
print(response.text)       # 以字符串形式获取响应内容
print(response.json())     # 以 JSON 形式获取响应内容
```

### 4. 处理异常
`requests` 包提供了一些内置的异常类型，用于处理请求失败的情况。
```python
import requests

try:
    response = requests.get('https://jsonplaceholder.typicode.com/posts')
    response.raise_for_status()  # 如果响应状态码不是 200，会抛出 HTTPError 异常
except requests.exceptions.HTTPError as errh:
    print("Http Error:", errh)
except requests.exceptions.ConnectionError as errc:
    print("Error Connecting:", errc)
except requests.exceptions.Timeout as errt:
    print("Timeout Error:", errt)
except requests.exceptions.RequestException as err:
    print("OOps: Something Else", err)
```

### 5. 认证
`requests` 包支持多种认证方式，包括基本认证和 OAuth 认证。

#### 5.1 基本认证
```python
from requests.auth import HTTPBasicAuth

response = requests.get('https://api.github.com/user', auth=HTTPBasicAuth('username', 'password'))
print(response.status_code)
print(response.json())
```

#### 5.2 令牌认证
```python
headers = {'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}
response = requests.get('https://api.github.com/user', headers=headers)
print(response.status_code)
print(response.json())
```

### 6. 高级用法

#### 6.1 使用 Session 保持会话
`requests.Session` 对象允许你在多个请求之间保持会话。
```python
import requests

s = requests.Session()
s.get('https://httpbin.org/cookies/set/sessioncookie/123456789')
response = s.get('https://httpbin.org/cookies')
print(response.json())
```

#### 6.2 处理重定向
```python
response = requests.get('http://github.com', allow_redirects=True)
print(response.url)  # 输出最终重定向的 URL
print(response.history)  # 输出重定向的历史记录
```

#### 6.3 设置超时
```python
import requests

try:
    response = requests.get('https://httpbin.org/delay/5', timeout=2)
except requests.exceptions.Timeout:
    print('The request timed out')
```

### 7. 总结
`requests` 包是一个功能强大且易于使用的 HTTP 库，可以帮助开发者简化各种 HTTP 请求的处理。无论是简单的 GET 请求还是复杂的认证和会话管理，`requests` 都提供了丰富的工具和选项来满足需求。通过熟悉上述示例和用法，可以更有效地利用 `requests` 库进行 HTTP 请求处理。