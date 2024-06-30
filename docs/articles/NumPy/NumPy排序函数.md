NumPy 提供了多种用于排序的函数，这些函数可以对数组进行排序、查找排序后的索引、以及对数组进行分区等操作。以下是一些常用的 NumPy 排序函数及其详细示例：

### 基本排序函数

#### `np.sort`

`np.sort` 函数用于返回数组的排序副本。

```python
import numpy as np

arr = np.array([3, 1, 2])
sorted_arr = np.sort(arr)
print(sorted_arr)  # 输出: [1 2 3]

# 对二维数组排序
arr_2d = np.array([[3, 1, 2], [6, 4, 5]])
sorted_arr_2d = np.sort(arr_2d, axis=1)
print(sorted_arr_2d)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

#### `np.argsort`

`np.argsort` 函数用于返回数组排序后的索引。

```python
arr = np.array([3, 1, 2])
sorted_indices = np.argsort(arr)
print(sorted_indices)  # 输出: [1 2 0]

# 使用索引排序数组
sorted_arr = arr[sorted_indices]
print(sorted_arr)  # 输出: [1 2 3]
```

#### `np.lexsort`

`np.lexsort` 函数用于对多个序列排序。

```python
# 按姓排序，如果姓相同则按名排序
first_names = np.array(['John', 'Jane', 'Bob', 'Alice'])
last_names = np.array(['Doe', 'Doe', 'Smith', 'Johnson'])

# 先按姓排序，再按名排序
sorted_indices = np.lexsort((first_names, last_names))
print(sorted_indices)  # 输出: [3 0 1 2]

# 使用索引排序数组
sorted_first_names = first_names[sorted_indices]
sorted_last_names = last_names[sorted_indices]
print(sorted_first_names)  # 输出: ['Alice' 'John' 'Jane' 'Bob']
print(sorted_last_names)  # 输出: ['Johnson' 'Doe' 'Doe' 'Smith']
```

### 部分排序函数

#### `np.partition`

`np.partition` 函数用于部分排序，即将数组划分为两部分，左侧是所有小于等于第 k 小元素的值，右侧是所有大于第 k 小元素的值。

```python
arr = np.array([3, 1, 2, 5, 4])
partitioned_arr = np.partition(arr, 2)
print(partitioned_arr)  # 输出: [2 1 3 5 4]

# 对二维数组部分排序
arr_2d = np.array([[3, 1, 2], [6, 4, 5]])
partitioned_arr_2d = np.partition(arr_2d, 1, axis=1)
print(partitioned_arr_2d)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

#### `np.argpartition`

`np.argpartition` 函数用于返回部分排序后的索引。

```python
arr = np.array([3, 1, 2, 5, 4])
partitioned_indices = np.argpartition(arr, 2)
print(partitioned_indices)  # 输出: [1 2 0 3 4]

# 使用索引部分排序数组
partitioned_arr = arr[partitioned_indices]
print(partitioned_arr)  # 输出: [1 2 3 5 4]
```

### 查找最大/最小值函数

#### `np.argmax` 和 `np.argmin`

`np.argmax` 和 `np.argmin` 函数用于返回数组中最大值和最小值的索引。

```python
arr = np.array([3, 1, 2, 5, 4])
max_index = np.argmax(arr)
min_index = np.argmin(arr)
print(max_index)  # 输出: 3
print(min_index)  # 输出: 1
```

#### `np.max` 和 `np.min`

`np.max` 和 `np.min` 函数用于返回数组中最大值和最小值。

```python
max_value = np.max(arr)
min_value = np.min(arr)
print(max_value)  # 输出: 5
print(min_value)  # 输出: 1
```

### 其他排序相关函数

#### `np.msort`

`np.msort` 函数用于沿第一个轴排序数组。

```python
arr = np.array([[3, 1, 2], [6, 4, 5]])
sorted_arr = np.msort(arr)
print(sorted_arr)
# 输出:
# [[3 1 2]
#  [6 4 5]]
```

#### `np.sort_complex`

`np.sort_complex` 函数用于对复数数组进行排序，按照复数的实部排序。

```python
arr = np.array([3+2j, 1+1j, 2+3j])
sorted_arr = np.sort_complex(arr)
print(sorted_arr)  # 输出: [1.+1.j 2.+3.j 3.+2.j]
```

通过这些函数，您可以对 NumPy 数组进行多种排序操作，从而满足不同的数据处理需求。