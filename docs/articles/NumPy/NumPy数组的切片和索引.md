---
comments: true
---

NumPy 的 `ndarray` 提供了强大的切片和索引功能，这些功能允许我们高效地访问和操作数组的特定元素或子数组。下面详细介绍 `ndarray` 的索引和切片方法，并通过示例进行说明。

### 基本索引

#### 一维数组索引

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr[0])   # 输出: 1
print(arr[4])   # 输出: 5
print(arr[-1])  # 输出: 5 (从末尾开始索引)
```

#### 多维数组索引

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr_2d[0, 0])  # 输出: 1
print(arr_2d[1, 2])  # 输出: 6
print(arr_2d[-1, -1])  # 输出: 9
```

### 切片

#### 一维数组切片

```python
arr = np.array([1, 2, 3, 4, 5])
print(arr[1:4])   # 输出: [2 3 4]
print(arr[:3])    # 输出: [1 2 3]
print(arr[2:])    # 输出: [3 4 5]
print(arr[::2])   # 输出: [1 3 5] (步长为2)
print(arr[::-1])  # 输出: [5 4 3 2 1] (反转数组)
```

#### 多维数组切片

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# 取第一行
print(arr_2d[0, :])  # 输出: [1 2 3]

# 取第二列
print(arr_2d[:, 1])  # 输出: [2 5 8]

# 取右下2x2子数组
print(arr_2d[1:3, 1:3])  # 输出: [[5 6]
                        #        [8 9]]
```

### 高级索引

#### 布尔索引

```python
arr = np.array([1, 2, 3, 4, 5])
bool_idx = arr > 3
print(bool_idx)     # 输出: [False False False  True  True]
print(arr[bool_idx])  # 输出: [4 5]
```

对于多维数组：

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
bool_idx_2d = arr_2d > 5
print(bool_idx_2d)
# 输出:
# [[False False False]
#  [False False  True]
#  [ True  True  True]]
print(arr_2d[bool_idx_2d])  # 输出: [6 7 8 9]
```

#### 花式索引

使用整数数组进行索引：

```python
arr = np.array([10, 20, 30, 40, 50])
idx = [0, 2, 4]
print(arr[idx])  # 输出: [10 30 50]

arr_2d = np.array([[1, 2], [3, 4], [5, 6]])
row_idx = [0, 1, 2]
col_idx = [1, 0, 1]
print(arr_2d[row_idx, col_idx])  # 输出: [2 3 6]
```

### 结合切片和索引

可以将切片和索引结合使用：

```python
arr_2d = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# 提取指定行和列
print(arr_2d[:2, 1:3])
# 输出:
# [[2 3]
#  [6 7]]

# 使用布尔索引结合切片
bool_idx = arr_2d[:, 1] > 5
print(arr_2d[bool_idx, :])
# 输出:
# [[ 5  6  7  8]
#  [ 9 10 11 12]]
```

### 修改数组元素

索引和切片不仅可以用来访问元素，还可以用来修改元素：

```python
arr = np.array([1, 2, 3, 4, 5])
arr[0] = 10
print(arr)  # 输出: [10  2  3  4  5]

arr[1:4] = [20, 30, 40]
print(arr)  # 输出: [10 20 30 40  5]

arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr_2d[0, 0] = 10
print(arr_2d)
# 输出:
# [[10  2  3]
#  [ 4  5  6]
#  [ 7  8  9]]

arr_2d[:, 2] = [30, 60, 90]
print(arr_2d)
# 输出:
# [[10  2 30]
#  [ 4  5 60]
#  [ 7  8 90]]
```

这些示例展示了 NumPy 数组的各种索引和切片方法。通过这些功能，可以灵活高效地访问、修改和操作数组中的数据。