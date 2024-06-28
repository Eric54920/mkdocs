`numpy.ndarray` 是 NumPy 中的核心数据结构，它表示一个多维数组。NumPy 数组（ndarray）提供了高效的存储和操作方式，能够方便地进行数值计算、线性代数运算和数据分析。下面是对 `ndarray` 的详细介绍，包括创建、属性、基本操作和高级功能。

### 创建 `ndarray`

#### 从列表或元组创建

你可以使用 `numpy.array` 函数从列表或元组创建 `ndarray`：

```python
import numpy as np

# 创建一维数组
arr1 = np.array([1, 2, 3, 4, 5])
print(arr1)

# 创建二维数组
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2)
```

#### 使用 NumPy 内置函数创建

NumPy 提供了多种函数来创建数组：

```python
# 创建全零数组
arr_zeros = np.zeros((3, 4))
print(arr_zeros)

# 创建全一数组
arr_ones = np.ones((2, 3))
print(arr_ones)

# 创建单位矩阵
arr_eye = np.eye(4)
print(arr_eye)

# 创建等差数组
arr_arange = np.arange(0, 10, 2)
print(arr_arange)

# 创建等距数组
arr_linspace = np.linspace(0, 1, 5)
print(arr_linspace)
```

### `ndarray` 属性

#### 形状、维度和大小

你可以访问数组的形状（shape）、维度（ndim）和大小（size）属性：

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print("Shape:", arr.shape)  # 输出: (2, 3)
print("Number of dimensions:", arr.ndim)  # 输出: 2
print("Size:", arr.size)  # 输出: 6
```

#### 数据类型和类型转换

NumPy 数组有自己的数据类型（dtype），你可以查看或转换数组的数据类型：

```python
print("Data type:", arr.dtype)  # 输出: int64（或 int32，取决于系统）

# 类型转换
arr_float = arr.astype(np.float64)
print("New data type:", arr_float.dtype)  # 输出: float64
```

### 基本操作

#### 数组运算

NumPy 支持对数组进行各种数学运算：

```python
arr = np.array([1, 2, 3, 4])

# 数组加法
print(arr + 2)  # 输出: [3 4 5 6]

# 数组乘法
print(arr * 2)  # 输出: [2 4 6 8]

# 数组元素逐个相乘
print(arr * arr)  # 输出: [ 1  4  9 16]

# 数组矩阵乘法
arr2 = np.array([[1, 2], [3, 4]])
arr3 = np.array([[5, 6], [7, 8]])
print(np.dot(arr2, arr3))
# 输出:
# [[19 22]
#  [43 50]]
```

#### 数组切片和索引

NumPy 提供了灵活的数组切片和索引方式：

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

### 高级功能

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

#### 数组拼接和分割

NumPy 提供了水平和垂直拼接数组的方法，以及分割数组的方法：

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

# 数组分割
arr3 = np.array([1, 2, 3, 4, 5, 6])
print(np.split(arr3, 3))
# 输出:
# [array([1, 2]), array([3, 4]), array([5, 6])]
```

### 总结

NumPy 的 `ndarray` 是进行数值计算和数据处理的基础数据结构，它提供了高效的数组运算和丰富的操作方法。通过本文的介绍，你应该对 `ndarray` 的基本用法和一些高级功能有了初步的了解。