---
comments: true
---

NumPy 提供了一组专门处理字符串的函数，这些函数位于 `numpy.char` 模块中。以下是一些常用的 NumPy 字符串函数及其详细示例：

### 基本字符串操作

#### `numpy.char.add`

用于逐元素连接两个数组中的字符串。

```python
import numpy as np

arr1 = np.array(['Hello', 'Good'])
arr2 = np.array([' World', ' Morning'])
result = np.char.add(arr1, arr2)
print(result)  # 输出: ['Hello World' 'Good Morning']
```

#### `numpy.char.multiply`

用于逐元素重复数组中的字符串。

```python
arr = np.array(['Hello', 'Good'])
result = np.char.multiply(arr, 3)
print(result)  # 输出: ['HelloHelloHello' 'GoodGoodGood']
```

#### `numpy.char.center`

用于逐元素居中字符串，并使用指定字符填充。

```python
arr = np.array(['Hello', 'Good'])
result = np.char.center(arr, 20, fillchar='*')
print(result)
# 输出:
# ['*******Hello********' '*******Good*********']
```

#### `numpy.char.capitalize`

用于逐元素将字符串的首字母大写。

```python
arr = np.array(['hello', 'good morning'])
result = np.char.capitalize(arr)
print(result)  # 输出: ['Hello' 'Good morning']
```

#### `numpy.char.title`

用于逐元素将字符串的每个单词的首字母大写。

```python
arr = np.array(['hello world', 'good morning'])
result = np.char.title(arr)
print(result)  # 输出: ['Hello World' 'Good Morning']
```

### 修改大小写

#### `numpy.char.lower`

用于逐元素将字符串转换为小写。

```python
arr = np.array(['HELLO', 'GOOD MORNING'])
result = np.char.lower(arr)
print(result)  # 输出: ['hello' 'good morning']
```

#### `numpy.char.upper`

用于逐元素将字符串转换为大写。

```python
arr = np.array(['hello', 'good morning'])
result = np.char.upper(arr)
print(result)  # 输出: ['HELLO' 'GOOD MORNING']
```

#### `numpy.char.swapcase`

用于逐元素将字符串的大小写互换。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.swapcase(arr)
print(result)  # 输出: ['hELLO' 'gOOD mORNING']
```

#### `numpy.char.capitalize`

用于逐元素将字符串的首字母大写。

```python
arr = np.array(['hello', 'good morning'])
result = np.char.capitalize(arr)
print(result)  # 输出: ['Hello' 'Good morning']
```

### 去除空白字符

#### `numpy.char.strip`

用于逐元素移除字符串开头和结尾的特定字符（默认为空格）。

```python
arr = np.array(['  Hello  ', '  Good Morning  '])
result = np.char.strip(arr)
print(result)  # 输出: ['Hello' 'Good Morning']
```

#### `numpy.char.lstrip`

用于逐元素移除字符串开头的特定字符（默认为空格）。

```python
arr = np.array(['  Hello  ', '  Good Morning  '])
result = np.char.lstrip(arr)
print(result)  # 输出: ['Hello  ' 'Good Morning  ']
```

#### `numpy.char.rstrip`

用于逐元素移除字符串结尾的特定字符（默认为空格）。

```python
arr = np.array(['  Hello  ', '  Good Morning  '])
result = np.char.rstrip(arr)
print(result)  # 输出: ['  Hello' '  Good Morning']
```

### 字符串比较

#### `numpy.char.equal`

用于逐元素比较两个数组中的字符串是否相等。

```python
arr1 = np.array(['Hello', 'Good'])
arr2 = np.array(['Hello', 'Morning'])
result = np.char.equal(arr1, arr2)
print(result)  # 输出: [ True False]
```

#### `numpy.char.not_equal`

用于逐元素比较两个数组中的字符串是否不相等。

```python
arr1 = np.array(['Hello', 'Good'])
arr2 = np.array(['Hello', 'Morning'])
result = np.char.not_equal(arr1, arr2)
print(result)  # 输出: [False  True]
```

#### `numpy.char.startswith`

用于逐元素检查字符串是否以指定前缀开头。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.startswith(arr, 'Go')
print(result)  # 输出: [False  True]
```

#### `numpy.char.endswith`

用于逐元素检查字符串是否以指定后缀结尾。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.endswith(arr, 'ing')
print(result)  # 输出: [False  True]
```

### 查找和替换

#### `numpy.char.find`

用于逐元素查找子字符串在字符串中的位置，找不到时返回 -1。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.find(arr, 'o')
print(result)  # 输出: [ 4  1]
```

#### `numpy.char.rfind`

用于逐元素从右侧查找子字符串在字符串中的位置，找不到时返回 -1。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.rfind(arr, 'o')
print(result)  # 输出: [ 4  8]
```

#### `numpy.char.replace`

用于逐元素替换字符串中的子字符串。

```python
arr = np.array(['Hello', 'Good Morning'])
result = np.char.replace(arr, 'o', 'O')
print(result)  # 输出: ['HellO' 'GOOd MOrning']
```

### 拆分和连接

#### `numpy.char.split`

用于逐元素分割字符串。

```python
arr = np.array(['Hello World', 'Good Morning'])
result = np.char.split(arr)
print(result)  # 输出: [list(['Hello', 'World']) list(['Good', 'Morning'])]
```

#### `numpy.char.join`

用于逐元素用指定分隔符连接字符串。

```python
arr = np.array(['Hello', 'Good'])
sep = np.array(['-', ' '])
result = np.char.join(sep, arr)
print(result)  # 输出: ['H-e-l-l-o' 'G o o d']
```

通过这些 NumPy 字符串函数，您可以方便地对数组中的字符串进行各种操作，从而满足不同的数据处理需求。