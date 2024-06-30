NumPy 提供了一系列用于在数组中搜索特定值或满足条件的元素的函数。以下是一些常用的 NumPy 搜索函数及其详细示例：

### 基本搜索函数

#### `np.where`

`np.where` 函数用于返回满足指定条件的元素的索引。

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
result = np.where(arr > 3)
print(result)  # 输出: (array([3, 4]),)

# 使用索引来获取满足条件的元素
filtered_arr = arr[result]
print(filtered_arr)  # 输出: [4 5]
```

#### `np.nonzero`

`np.nonzero` 函数用于返回数组中非零元素的索引。

```python
arr = np.array([0, 1, 0, 2, 0, 3])
result = np.nonzero(arr)
print(result)  # 输出: (array([1, 3, 5]),)

# 使用索引来获取非零元素
nonzero_arr = arr[result]
print(nonzero_arr)  # 输出: [1 2 3]
```

#### `np.flatnonzero`

`np.flatnonzero` 函数返回数组中非零元素的扁平索引。

```python
arr = np.array([[0, 1, 0], [2, 0, 3]])
result = np.flatnonzero(arr)
print(result)  # 输出: [1 3 5]

# 使用索引来获取非零元素
nonzero_arr = arr.flatten()[result]
print(nonzero_arr)  # 输出: [1 2 3]
```

### 查找特定值

#### `np.argmax` 和 `np.argmin`

`np.argmax` 和 `np.argmin` 函数用于返回数组中最大值和最小值的索引。

```python
arr = np.array([1, 3, 2, 5, 4])
max_index = np.argmax(arr)
min_index = np.argmin(arr)
print(max_index)  # 输出: 3
print(min_index)  # 输出: 0
```

#### `np.max` 和 `np.min`

`np.max` 和 `np.min` 函数用于返回数组中最大值和最小值。

```python
max_value = np.max(arr)
min_value = np.min(arr)
print(max_value)  # 输出: 5
print(min_value)  # 输出: 1
```

### 搜索排序数组

#### `np.searchsorted`

`np.searchsorted` 函数用于查找插入值的索引以保持数组的有序性。

```python
arr = np.array([1, 2, 3, 4, 5])
result = np.searchsorted(arr, 3)
print(result)  # 输出: 2

# 插入多个值
values = np.array([0, 3, 6])
result = np.searchsorted(arr, values)
print(result)  # 输出: [0 2 5]
```

### 其他搜索函数

#### `np.extract`

`np.extract` 函数用于返回满足条件的元素。

```python
arr = np.array([1, 2, 3, 4, 5])
condition = arr > 3
result = np.extract(condition, arr)
print(result)  # 输出: [4 5]
```

#### `np.take`

`np.take` 函数用于根据索引从数组中获取元素。

```python
arr = np.array([1, 2, 3, 4, 5])
indices = [0, 2, 4]
result = np.take(arr, indices)
print(result)  # 输出: [1 3 5]
```

#### `np.choose`

`np.choose` 函数根据给定的索引数组返回相应的元素。

```python
choices = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
indices = [0, 1, 2]
result = np.choose(indices, choices.T)
print(result)  # 输出: [1 5 9]
```

通过这些函数，您可以在 NumPy 数组中进行各种搜索操作，从而满足不同的数据处理需求。