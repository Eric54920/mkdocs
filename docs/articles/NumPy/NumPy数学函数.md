NumPy 提供了丰富的数学函数，可以进行各种数组运算。这些函数涵盖了基础算术运算、统计运算、线性代数运算、以及其他特殊函数。以下是一些常用的 NumPy 数学函数及其详细示例：

### 基础算术运算

#### `np.add`

逐元素相加两个数组。

```python
import numpy as np

arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])
result = np.add(arr1, arr2)
print(result)  # 输出: [5 7 9]
```

#### `np.subtract`

逐元素相减两个数组。

```python
result = np.subtract(arr1, arr2)
print(result)  # 输出: [-3 -3 -3]
```

#### `np.multiply`

逐元素相乘两个数组。

```python
result = np.multiply(arr1, arr2)
print(result)  # 输出: [ 4 10 18]
```

#### `np.divide`

逐元素相除两个数组。

```python
result = np.divide(arr1, arr2)
print(result)  # 输出: [0.25 0.4  0.5 ]
```

#### `np.power`

逐元素求幂。

```python
result = np.power(arr1, 2)
print(result)  # 输出: [1 4 9]
```

#### `np.mod`

逐元素求模。

```python
result = np.mod(arr2, arr1)
print(result)  # 输出: [0 1 0]
```

### 统计函数

#### `np.mean`

计算数组的平均值。

```python
arr = np.array([1, 2, 3, 4, 5])
result = np.mean(arr)
print(result)  # 输出: 3.0
```

#### `np.median`

计算数组的中位数。

```python
result = np.median(arr)
print(result)  # 输出: 3.0
```

#### `np.std`

计算数组的标准差。

```python
result = np.std(arr)
print(result)  # 输出: 1.4142135623730951
```

#### `np.var`

计算数组的方差。

```python
result = np.var(arr)
print(result)  # 输出: 2.0
```

#### `np.sum`

计算数组元素的总和。

```python
result = np.sum(arr)
print(result)  # 输出: 15
```

#### `np.prod`

计算数组元素的乘积。

```python
result = np.prod(arr)
print(result)  # 输出: 120
```

#### `np.cumsum`

计算数组元素的累积和。

```python
result = np.cumsum(arr)
print(result)  # 输出: [ 1  3  6 10 15]
```

#### `np.cumprod`

计算数组元素的累积乘积。

```python
result = np.cumprod(arr)
print(result)  # 输出: [  1   2   6  24 120]
```

### 线性代数运算

#### `np.dot`

计算两个数组的点积。

```python
arr1 = np.array([[1, 2], [3, 4]])
arr2 = np.array([[5, 6], [7, 8]])
result = np.dot(arr1, arr2)
print(result)
# 输出:
# [[19 22]
#  [43 50]]
```

#### `np.matmul`

计算两个数组的矩阵乘积。

```python
result = np.matmul(arr1, arr2)
print(result)
# 输出:
# [[19 22]
#  [43 50]]
```

#### `np.linalg.inv`

计算矩阵的逆。

```python
arr = np.array([[1, 2], [3, 4]])
result = np.linalg.inv(arr)
print(result)
# 输出:
# [[-2.   1. ]
#  [ 1.5 -0.5]]
```

#### `np.linalg.det`

计算矩阵的行列式。

```python
result = np.linalg.det(arr)
print(result)  # 输出: -2.0000000000000004
```

#### `np.linalg.eig`

计算矩阵的特征值和特征向量。

```python
eigvals, eigvecs = np.linalg.eig(arr)
print("特征值:", eigvals)
print("特征向量:", eigvecs)
# 输出:
# 特征值: [-0.37228132  5.37228132]
# 特征向量:
# [[-0.82456484 -0.41597356]
#  [ 0.56576746 -0.90937671]]
```

### 其他特殊函数

#### `np.sin`, `np.cos`, `np.tan`

计算数组元素的正弦、余弦和正切值。

```python
arr = np.array([0, np.pi/2, np.pi])
result_sin = np.sin(arr)
result_cos = np.cos(arr)
result_tan = np.tan(arr)
print(result_sin)  # 输出: [0.000000e+00 1.000000e+00 1.224647e-16]
print(result_cos)  # 输出: [ 1.000000e+00  6.123234e-17 -1.000000e+00]
print(result_tan)  # 输出: [ 0.000000e+00  1.633124e+16 -1.224647e-16]
```

#### `np.arcsin`, `np.arccos`, `np.arctan`

计算数组元素的反正弦、反余弦和反正切值。

```python
arr = np.array([0, 0.5, 1])
result_arcsin = np.arcsin(arr)
result_arccos = np.arccos(arr)
result_arctan = np.arctan(arr)
print(result_arcsin)  # 输出: [0.         0.52359878 1.57079633]
print(result_arccos)  # 输出: [1.57079633 1.04719755 0.        ]
print(result_arctan)  # 输出: [0.         0.46364761 0.78539816]
```

#### `np.exp`

计算数组元素的指数值。

```python
arr = np.array([1, 2, 3])
result = np.exp(arr)
print(result)  # 输出: [ 2.71828183  7.3890561  20.08553692]
```

#### `np.log`, `np.log10`, `np.log2`

计算数组元素的自然对数、常用对数和二进制对数。

```python
arr = np.array([1, 10, 100])
result_log = np.log(arr)
result_log10 = np.log10(arr)
result_log2 = np.log2(arr)
print(result_log)  # 输出: [0.         2.30258509 4.60517019]
print(result_log10)  # 输出: [0. 1. 2.]
print(result_log2)  # 输出: [0.         3.32192809 6.64385619]
```

### 数值修约

#### `np.round`

对数组中的元素进行四舍五入。

```python
arr = np.array([1.123, 2.567, 3.789])
result = np.round(arr, 2)
print(result)  # 输出: [1.12 2.57 3.79]
```

#### `np.floor`

返回小于等于数组中元素的最大整数。

```python
result = np.floor(arr)
print(result)  # 输出: [1. 2. 3.]
```

#### `np.ceil`

返回大于等于数组中元素的最小整数。

```python
result = np.ceil(arr)
print(result)  # 输出: [2. 3. 4.]
```

通过这些函数，您可以对 NumPy 数组执行各种数学运算，从而满足不同的数据处理需求。