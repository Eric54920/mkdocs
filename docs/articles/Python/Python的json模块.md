---
comments: true
---

`json` 模块是 Python 标准库中用于处理 JSON（JavaScript Object Notation）数据格式的模块。JSON 是一种轻量级的数据交换格式，易于人阅读和编写，也易于机器解析和生成。在 Python 中，`json` 模块提供了用于编码（序列化）和解码（反序列化）JSON 数据的函数，以及与 Python 数据类型之间的转换。

### 导入 json 模块

```python
import json
```

### 常用函数和方法

#### `json.dumps()`

将 Python 对象转换为 JSON 格式的字符串（序列化）。

```python
data = {'name': 'John', 'age': 30, 'city': 'New York'}
json_str = json.dumps(data)
print(f"JSON 字符串: {json_str}")
```

#### `json.loads()`

将 JSON 格式的字符串解析为 Python 对象（反序列化）。

```python
json_str = '{"name": "John", "age": 30, "city": "New York"}'
data = json.loads(json_str)
print(f"Python 对象: {data}")
```

#### `json.dump()`

将 Python 对象写入 JSON 格式的文件。

```python
data = {'name': 'John', 'age': 30, 'city': 'New York'}
with open('data.json', 'w') as f:
    json.dump(data, f)
```

#### `json.load()`

从 JSON 格式的文件中读取数据并转换为 Python 对象。

```python
with open('data.json', 'r') as f:
    data = json.load(f)
    print(f"Python 对象: {data}")
```

#### 处理复杂数据类型

`json` 模块支持处理包括列表、字典、字符串、数字、布尔值和 None 在内的多种数据类型。可以通过参数控制序列化和反序列化的行为，如 `indent` 控制缩进、`sort_keys` 控制键的排序等。

### 示例用法

以下是一个简单的示例，展示了 `json` 模块中几个常用函数的基本用法：

```python
import json

# 将 Python 对象转换为 JSON 字符串
data = {'name': 'John', 'age': 30, 'city': 'New York'}
json_str = json.dumps(data)
print(f"JSON 字符串: {json_str}")

# 将 JSON 字符串解析为 Python 对象
json_str = '{"name": "John", "age": 30, "city": "New York"}'
data = json.loads(json_str)
print(f"Python 对象: {data}")

# 将 Python 对象写入 JSON 文件
with open('data.json', 'w') as f:
    json.dump(data, f)

# 从 JSON 文件读取数据并解析为 Python 对象
with open('data.json', 'r') as f:
    data = json.load(f)
    print(f"Python 对象: {data}")
```

### 总结

`json` 模块是 Python 中用于处理 JSON 数据格式的标准工具，提供了序列化、反序列化以及与文件交互的函数和方法。通过 `json` 模块，可以方便地在 Python 中进行 JSON 数据的编码和解码操作，使得 Python 应用能够轻松地与其他系统进行数据交换和通信。