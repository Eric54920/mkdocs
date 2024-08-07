---
comments: true
---

在Python中，深拷贝（deep copy）和浅拷贝（shallow copy）是用于复制对象的两种不同方式。它们的主要区别在于拷贝的程度：

### 1. 浅拷贝（Shallow Copy）

- 浅拷贝会创建一个新的对象，但是只是复制了原始对象的引用，并没有复制对象中包含的子对象。
- 当原始对象中包含可变对象（如列表、字典等）时，浅拷贝的新对象与原始对象会共享这些可变对象，因此对于这些可变对象的修改会影响到原始对象和浅拷贝的对象。
- 在Python中，可以使用`copy`模块的`copy()`函数进行浅拷贝。

### 2. 深拷贝（Deep Copy）

- 深拷贝会递归地复制原始对象以及对象中包含的所有子对象，从而创建一个全新的对象。
- 与浅拷贝不同，深拷贝的新对象与原始对象及其子对象完全独立，对其中任何对象的修改都不会影响其他对象。
- 在Python中，可以使用`copy`模块的`deepcopy()`函数进行深拷贝。

以下是一个简单的示例来说明深拷贝和浅拷贝的区别：

```python
import copy

# 原始列表
original_list = [1, [2, 3], 4]

# 浅拷贝
shallow_copy = copy.copy(original_list)

# 修改浅拷贝的子对象
shallow_copy[1][0] = 'a'

# 修改后，原始对象也受到影响
print(original_list)  # [1, ['a', 3], 4]

# 深拷贝
deep_copy = copy.deepcopy(original_list)

# 修改深拷贝的子对象
deep_copy[1][0] = 'b'

# 修改后，原始对象不受影响
print(original_list)  # [1, ['a', 3], 4]
```

在上面的示例中，对浅拷贝对象的子对象进行修改会影响原始对象，而对深拷贝对象的修改则不会影响原始对象。