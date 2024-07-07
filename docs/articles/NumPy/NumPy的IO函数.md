---
comments: true
---

NumPy 提供了多种用于读取和写入数据的 I/O 函数，主要包括读取和写入文本文件、读取和写入二进制文件、以及与 NumPy 自定义的二进制格式 `.npy` 和 `.npz` 文件相关的函数。以下是一些常用的 NumPy I/O 函数及其详细示例：

### 文本文件的读写

#### `np.loadtxt` 和 `np.savetxt`

`np.loadtxt` 函数用于从文本文件加载数据，`np.savetxt` 函数用于将数据保存到文本文件。

```python
import numpy as np

# 从文本文件加载数据
data = np.loadtxt('data.txt')
print(data)

# 将数据保存到文本文件
np.savetxt('saved_data.txt', data)
```

#### 自定义分隔符和数据类型

可以指定分隔符和数据类型。

```python
# 指定分隔符和数据类型
data = np.loadtxt('data.csv', delimiter=',', dtype=int)
np.savetxt('saved_data.csv', data, delimiter=',', fmt='%d')
```

### 二进制文件的读写

#### `np.fromfile` 和 `np.tofile`

`np.fromfile` 函数用于从二进制文件读取数据，`np.tofile` 函数用于将数据保存到二进制文件。

```python
# 从二进制文件读取数据
data = np.fromfile('data.bin', dtype=float)
print(data)

# 将数据保存到二进制文件
data.tofile('saved_data.bin')
```

#### 自定义数据类型和形状

可以指定数据类型和数组形状。

```python
# 指定数据类型和数组形状
data = np.fromfile('data.bin', dtype=np.int32)
data = data.reshape((3, 4))
```

### NumPy 自定义二进制格式 `.npy` 文件的读写

#### `np.load` 和 `np.save`

`np.load` 函数用于加载 `.npy` 文件，`np.save` 函数用于保存数据到 `.npy` 文件。

```python
# 加载 .npy 文件
data = np.load('data.npy')
print(data)

# 保存数据到 .npy 文件
np.save('saved_data.npy', data)
```

### NumPy 压缩二进制格式 `.npz` 文件的读写

#### `np.load` 和 `np.savez`

`np.load` 函数用于加载 `.npz` 文件，`np.savez` 函数用于保存多个数组到 `.npz` 文件。

```python
# 加载 .npz 文件
archive = np.load('data.npz')
print(archive.files)  # 输出: ['arr_0', 'arr_1']
data1 = archive['arr_0']
data2 = archive['arr_1']

# 保存多个数组到 .npz 文件
np.savez('saved_data.npz', data1=data1, data2=data2)
```

以上是一些常用的 NumPy I/O 函数及其用法示例。通过这些函数，您可以方便地进行数据的读取和保存，适应不同的数据存储和处理需求。