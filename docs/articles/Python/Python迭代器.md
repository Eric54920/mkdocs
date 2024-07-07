---
comments: true
---

在Python中，迭代器（Iterator）是一个实现了迭代协议的对象，即它实现了 `__iter__()` 方法和 `__next__()` 方法。迭代器用于遍历容器对象（如列表、元组、字典等）中的元素，提供了一种访问容器元素的方式，而无需暴露其内部结构。Python中的迭代器可以通过 `iter()` 函数进行创建，可以通过 `next()` 函数逐个访问元素。

### 1. 迭代器协议

迭代器协议包括两个方法：

- `__iter__()`: 返回迭代器对象自身，使得迭代器也可以用于 `for...in` 循环。
- `__next__()`: 返回容器的下一个元素，如果没有元素了则触发 `StopIteration` 异常。

### 2. 创建迭代器

可以通过以下两种方式创建迭代器：

#### 使用 iter() 函数

可以通过 `iter()` 函数从可迭代对象（如列表、元组）创建迭代器。

```python
# 创建一个列表
my_list = [1, 2, 3, 4, 5]

# 创建一个迭代器
my_iterator = iter(my_list)
```

#### 自定义迭代器类

也可以通过自定义类实现 `__iter__()` 和 `__next__()` 方法来创建迭代器。

```python
class MyIterator:
    def __init__(self, data):
        self.data = data
        self.index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        value = self.data[self.index]
        self.index += 1
        return value

# 使用自定义迭代器
my_iterator = MyIterator([1, 2, 3, 4, 5])
```

### 3. 迭代器的使用

迭代器可以用于 `for...in` 循环中，或者通过 `next()` 函数逐个获取元素。

#### 使用 for 循环

```python
for item in my_iterator:
    print(item)
```

#### 使用 next() 函数

```python
print(next(my_iterator))  # 输出: 1
print(next(my_iterator))  # 输出: 2
```

### 4. 内置迭代器和可迭代对象

Python中的许多内置对象和函数都支持迭代器协议，包括列表、元组、字典、集合、文件对象等。它们可以使用 `iter()` 函数来获取迭代器，然后可以使用 `for...in` 循环或者 `next()` 函数来访问它们的元素。

### 5. 使用迭代器的优势

- **惰性计算**：迭代器每次只生成一个元素，节省内存空间。
- **支持无限大数据集合**：可以用来处理无限大或者很大的数据集合，因为它每次只需要一个元素。
- **更加抽象和安全**：可以通过迭代器来隐藏和保护数据的内部结构，只暴露必要的接口。

### 6. 示例应用

使用迭代器处理大文件的行数据：

```python
# 打开文件并创建迭代器
with open('large_file.txt') as f:
    lines_iterator = iter(f)
    
    # 逐行处理文件内容
    for line in lines_iterator:
        process_line(line)
```

以上是关于Python中迭代器的基本介绍和使用方法，迭代器是Python中强大且灵活的工具，可以大大简化代码并提高效率，特别是在处理大数据集合或者需要逐个访问元素的情况下非常有用。