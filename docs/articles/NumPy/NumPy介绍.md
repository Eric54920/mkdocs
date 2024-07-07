---
comments: true
---

NumPy 是 Python 的一个核心库，用于进行科学计算。它提供了支持多维数组和矩阵运算的功能，同时还提供了大量的数学函数库，可以用来进行数组的运算。NumPy 的高效数组操作和丰富的数学函数库使其成为数据科学和机器学习领域的重要工具。以下是对 NumPy 的详细介绍。

### 安装 NumPy

你可以通过 pip 安装 NumPy：

```bash
pip install numpy
```

或者通过 conda 安装（如果你使用 Anaconda）：

```bash
conda install numpy
```

### 基础用法

#### 导入 NumPy

```python
import numpy as np
```

#### 创建数组

你可以使用 `numpy.array` 函数从 Python 列表创建数组：

```python
import numpy as np

# 创建一维数组
arr1 = np.array([1, 2, 3, 4, 5])
print(arr1)

# 创建二维数组
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2)
```

#### 数组属性

NumPy 数组有很多属性可以访问，例如形状（shape）、维度（ndim）和数据类型（dtype）：

```python
print(arr1.shape)  # 输出: (5,)
print(arr2.shape)  # 输出: (2, 3)
print(arr1.ndim)   # 输出: 1
print(arr2.ndim)   # 输出: 2
print(arr1.dtype)  # 输出: int64（或 int32，取决于系统）
```

#### 数组运算

NumPy 提供了丰富的数组运算功能：

```python
# 数组加法
arr3 = np.array([1, 2, 3])
arr4 = np.array([4, 5, 6])
print(arr3 + arr4)  # 输出: [5 7 9]

# 数组标量乘法
print(arr3 * 2)  # 输出: [2 4 6]

# 数组元素逐个相乘
print(arr3 * arr4)  # 输出: [ 4 10 18]

# 数组矩阵乘法
arr5 = np.array([[1, 2], [3, 4]])
arr6 = np.array([[5, 6], [7, 8]])
print(np.dot(arr5, arr6))
# 输出:
# [[19 22]
#  [43 50]]
```

#### 通用函数（ufunc）

NumPy 提供了一些常用的数学函数，这些函数对数组的每个元素进行运算：

```python
arr = np.array([0, np.pi / 2, np.pi])

# 三角函数
print(np.sin(arr))  # 输出: [0. 1. 0.]

# 指数函数
print(np.exp(arr))  # 输出: [ 1.  4.81047738 23.14069263]

# 平方根
print(np.sqrt(np.array([1, 4, 9])))  # 输出: [1. 2. 3.]
```

### 高级功能

#### 数组切片和索引

NumPy 支持类似于 Python 列表的切片和索引操作：

```python
arr = np.array([1, 2, 3, 4, 5])

# 一维数组切片
print(arr[1:4])  # 输出: [2 3 4]

# 多维数组切片
arr2 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr2[:2, 1:3])
# 输出:
# [[2 3]
#  [5 6]]
```

#### 布尔索引

使用布尔数组进行索引操作：

```python
arr = np.array([1, 2, 3, 4, 5])
print(arr[arr > 3])  # 输出: [4 5]
```

#### 数组形状操作

NumPy 提供了多种改变数组形状的方法：

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

# 展平数组
print(arr.ravel())  # 输出: [1 2 3 4 5 6]

# 转置数组
print(arr.T)
# 输出:
# [[1 4]
#  [2 5]
#  [3 6]]

# 调整形状
print(arr.reshape((3, 2)))
# 输出:
# [[1 2]
#  [3 4]
#  [5 6]]
```

#### 数组拼接

NumPy 提供了水平和垂直拼接数组的方法：

```python
arr1 = np.array([[1, 2], [3, 4]])
arr2 = np.array([[5, 6]])

# 垂直拼接
print(np.vstack((arr1, arr2)))
# 输出:
# [[1 2]
#  [3 4]
#  [5 6]]

# 水平拼接
print(np.hstack((arr1, arr2.T)))
# 输出:
# [[1 2 5]
#  [3 4 6]]
```

### 常用函数

以下是一些常用的 NumPy 函数：

- `np.zeros((m, n))`：创建一个 m 行 n 列的全零数组。
- `np.ones((m, n))`：创建一个 m 行 n 列的全一数组。
- `np.eye(n)`：创建一个 n x n 的单位矩阵。
- `np.arange(start, stop, step)`：创建一个从 start 到 stop 的数组，步长为 step。
- `np.linspace(start, stop, num)`：创建一个从 start 到 stop 的数组，包含 num 个等距元素。

### 总结

NumPy 是一个功能强大且高效的库，适用于各种科学计算和数据处理任务。通过本文的介绍，你应该对 NumPy 的基本用法和一些高级功能有了初步的了解。