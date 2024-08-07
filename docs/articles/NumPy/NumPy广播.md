---
comments: true
---

NumPy 的广播（broadcasting）机制使数组操作更加高效，允许不同形状的数组在一起进行算术运算而无需显式地复制数据。广播遵循一组规则来处理不同形状的数组，使它们具有相同的形状以便进行操作。下面详细介绍 NumPy 广播机制的规则及示例。

### 广播规则

1. **如果两个数组的维度数不同，通过在维度较小的数组前面加上1来使其维度数相同。**
2. **从末尾维度开始，比较每一维度：**
   - 如果两个维度相等，继续比较下一维度。
   - 如果一个维度是1，使用另一个数组的该维度大小。
   - 如果维度不相等且不为1，则引发错误。

### 示例

#### 1. 简单的广播

```python
import numpy as np

# 创建一个形状为 (3, 1) 的数组
a = np.array([[1], [2], [3]])

# 创建一个形状为 (1, 4) 的数组
b = np.array([1, 2, 3, 4])

# 通过广播机制将两个数组相加
result = a + b
print(result)
# 输出:
# [[2 3 4 5]
#  [3 4 5 6]
#  [4 5 6 7]]
```

在这个例子中，数组 `a` 的形状为 `(3, 1)`，数组 `b` 的形状为 `(1, 4)`。广播机制将 `a` 复制为 `(3, 4)`，将 `b` 复制为 `(3, 4)`，然后进行元素级的加法运算。

#### 2. 多维数组的广播

```python
# 创建一个形状为 (2, 3, 4) 的数组
A = np.ones((2, 3, 4))

# 创建一个形状为 (3, 4) 的数组
B = np.arange(12).reshape((3, 4))

# 通过广播机制将两个数组相加
C = A + B
print(C.shape)  # 输出: (2, 3, 4)
print(C)
# 输出:
# [[[ 1.  2.  3.  4.]
#   [ 5.  6.  7.  8.]
#   [ 9. 10. 11. 12.]]
#
#  [[ 1.  2.  3.  4.]
#   [ 5.  6.  7.  8.]
#   [ 9. 10. 11. 12.]]]
```

在这个例子中，数组 `A` 的形状为 `(2, 3, 4)`，数组 `B` 的形状为 `(3, 4)`。广播机制将 `B` 的形状扩展为 `(1, 3, 4)`，再复制为 `(2, 3, 4)`，然后与 `A` 进行元素级的加法运算。

#### 3. 广播与标量

标量与数组操作时，会自动扩展为数组的形状：

```python
# 创建一个形状为 (3, 4) 的数组
D = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# 将标量 10 添加到数组 D 的每个元素
E = D + 10
print(E)
# 输出:
# [[11 12 13 14]
#  [15 16 17 18]
#  [19 20 21 22]]
```

#### 4. 不兼容形状的广播

如果数组的形状不兼容，将引发 `ValueError`：

```python
# 创建一个形状为 (2, 3) 的数组
F = np.array([[1, 2, 3], [4, 5, 6]])

# 创建一个形状为 (3, 2) 的数组
G = np.array([[1, 2], [3, 4], [5, 6]])

# 尝试将两个数组相加会引发错误
try:
    H = F + G
except ValueError as e:
    print(e)  # 输出: operands could not be broadcast together with shapes (2,3) (3,2)
```

### 广播的实际应用

广播在许多实际应用中非常有用，例如：

#### 1. 标准化数据

将数据的每一列减去其均值：

```python
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
mean = data.mean(axis=0)
normalized_data = data - mean
print(normalized_data)
# 输出:
# [[-3. -3. -3.]
#  [ 0.  0.  0.]
#  [ 3.  3.  3.]]
```

#### 2. 缩放数据

将数据的每一列除以其标准差：

```python
std_dev = data.std(axis=0)
scaled_data = data / std_dev
print(scaled_data)
# 输出:
# [[0.26726124 0.26726124 0.26726124]
#  [1.06904497 1.06904497 1.06904497]
#  [1.87082869 1.87082869 1.87082869]]
```

通过广播机制，NumPy 提供了一种高效且简洁的方式来执行数组操作，而无需显式地扩展数组的维度。这使得代码更加清晰并提高了计算效率。