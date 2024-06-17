`time` 模块是 Python 标准库中用于处理时间的模块，它提供了许多与时间相关的函数。主要用途包括获取当前时间、日期操作、时间格式化、暂停执行等功能。下面是一些常用的 `time` 模块函数和示例用法：

### 导入 time 模块

```python
import time
```

### 常用函数和方法

#### `time.time()`

返回当前时间的时间戳（浮点数形式，单位秒），从1970年1月1日午夜（称为 Unix 时间戳）到现在的秒数。

```python
current_time = time.time()
print(f"当前时间戳: {current_time}")
```

#### `time.sleep()`

暂停程序执行指定的秒数。

```python
print("开始暂停...")
time.sleep(3)  # 暂停 3 秒
print("暂停结束")
```

#### `time.localtime()`

将时间戳转换为本地时间的 struct_time 对象。

```python
local_time = time.localtime(current_time)
print(f"本地时间: {local_time}")
print(f"年份: {local_time.tm_year}")
print(f"月份: {local_time.tm_mon}")
print(f"日: {local_time.tm_mday}")
print(f"小时: {local_time.tm_hour}")
print(f"分钟: {local_time.tm_min}")
print(f"秒: {local_time.tm_sec}")
```

#### `time.gmtime()`

将时间戳转换为 UTC 时间的 struct_time 对象。

```python
utc_time = time.gmtime(current_time)
print(f"UTC 时间: {utc_time}")
```

#### `time.strftime()`

将 struct_time 对象转换为指定格式的字符串。

```python
formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", local_time)
print(f"格式化后的时间字符串: {formatted_time}")
```

#### `time.strptime()`

将字符串解析为 struct_time 对象。

```python
time_str = "2023-06-15 12:30:45"
parsed_time = time.strptime(time_str, "%Y-%m-%d %H:%M:%S")
print(f"解析后的时间对象: {parsed_time}")
```

#### `time.mktime()`

将 struct_time 对象转换为时间戳。

```python
time_tuple = (2023, 6, 15, 12, 30, 45, 0, 0, 0)
time_stamp = time.mktime(time_tuple)
print(f"时间戳: {time_stamp}")
```

#### `time.clock()`

在不同的 Python 版本中，`time.clock()` 的行为不同：
- Python 3.8 之前：返回自程序开始以来的 CPU 时间。在多线程或多进程环境中，这可能不准确。
- Python 3.8+：已被废弃，请使用 `time.perf_counter()` 或 `time.process_time()`。

#### 其他函数

- `time.perf_counter()`: 返回系统运行时间的高精度计时器，用于性能测试。
- `time.process_time()`: 返回进程运行时间的系统和用户 CPU 时间总和。

### 使用示例

以下是一个简单的示例，演示了 `time` 模块中几个常用函数的基本用法：

```python
import time

# 获取当前时间戳
current_time = time.time()
print(f"当前时间戳: {current_time}")

# 暂停执行 2 秒
print("开始暂停...")
time.sleep(2)
print("暂停结束")

# 将时间戳转换为本地时间
local_time = time.localtime(current_time)
print(f"本地时间: {local_time}")

# 格式化时间
formatted_time = time.strftime("%Y-%m-%d %H:%M:%S", local_time)
print(f"格式化后的时间字符串: {formatted_time}")
```

### 总结

`time` 模块是 Python 中用于处理时间的基本模块之一，提供了获取当前时间、时间戳转换、暂停执行等功能。掌握这些函数的使用可以方便地进行时间操作和格式化，是进行时间相关编程的重要工具。