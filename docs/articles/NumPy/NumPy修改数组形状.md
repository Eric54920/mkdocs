---
comments: true
---

在 NumPy 中，可以通过多种方法修改数组的形状。以下是常用的方法及详细示例：

### `reshape` 方法

`reshape` 方法允许您创建一个新的形状相同数据的新数组，而不会修改原始数组的数据。

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])
reshaped_arr = arr.reshape((2, 3))
print(reshaped_arr)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

### `resize` 方法

`resize` 方法会直接修改数组自身的形状和大小。如果新大小大于原大小，多出的元素将填充0。如果小于原大小，数据将被截断。

```python
arr = np.array([1, 2, 3, 4, 5, 6])
arr.resize((3, 2))
print(arr)
# 输出:
# [[1 2]
#  [3 4]
#  [5 6]]

arr.resize((2, 3))
print(arr)
# 输出:
# [[1 2 3]
#  [4 5 6]]

arr.resize((2, 4))
print(arr)
# 输出:
# [[1 2 3 4]
#  [5 6 0 0]]
```

### `ravel` 和 `flatten` 方法

这两个方法都用于将数组展平成一维数组。`flatten` 方法返回的是数组的副本，`ravel` 方法返回的是数组的视图（如有可能）。

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])

flattened_arr = arr_2d.flatten()
print(flattened_arr)
# 输出: [1 2 3 4 5 6]

raveled_arr = arr_2d.ravel()
print(raveled_arr)
# 输出: [1 2 3 4 5 6]
```

### `transpose` 和 `T` 属性

`transpose` 方法和 `T` 属性用于转置数组（交换数组的轴）。

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])

transposed_arr = arr_2d.transpose()
print(transposed_arr)
# 输出:
# [[1 4]
#  [2 5]
#  [3 6]]

print(arr_2d.T)
# 输出:
# [[1 4]
#  [2 5]
#  [3 6]]
```

### 使用 `np.newaxis` 和 `np.expand_dims`

这两种方法可以用于增加数组的维度。

#### `np.newaxis`

`np.newaxis` 是一个新的轴，它用于增加数组的维度。

```python
arr = np.array([1, 2, 3])

arr_newaxis = arr[:, np.newaxis]
print(arr_newaxis)
# 输出:
# [[1]
#  [2]
#  [3]]

arr_newaxis = arr[np.newaxis, :]
print(arr_newaxis)
# 输出:
# [[1 2 3]]
```

#### `np.expand_dims`

`np.expand_dims` 方法也是增加维度的方法。

```python
arr = np.array([1, 2, 3])

expanded_arr = np.expand_dims(arr, axis=0)
print(expanded_arr)
# 输出:
# [[1 2 3]]

expanded_arr = np.expand_dims(arr, axis=1)
print(expanded_arr)
# 输出:
# [[1]
#  [2]
#  [3]]
```

### `squeeze` 方法

`squeeze` 方法用于删除数组中大小为1的维度。

```python
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])
arr_squeezed = np.squeeze(arr)
print(arr_squeezed.shape)  # 输出: (2, 2, 3)

arr = np.array([[[1, 2, 3]]])
arr_squeezed = np.squeeze(arr)
print(arr_squeezed.shape)  # 输出: (3,)
```

### 数组形状属性

#### `shape` 属性

`shape` 属性用于查看或修改数组的形状。

```python
arr = np.array([1, 2, 3, 4, 5, 6])
arr.shape = (2, 3)
print(arr)
# 输出:
# [[1 2 3]
#  [4 5 6]]
```

#### `ndim` 属性

`ndim` 属性返回数组的维度数。

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.ndim)  # 输出: 2
```

#### `size` 属性

`size` 属性返回数组中元素的总个数。

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.size)  # 输出: 6
```

通过这些方法和属性，您可以灵活地查看和修改 NumPy 数组的形状，从而满足各种数据处理需求。