在 Python 中，类的私有成员是指那些以双下划线 `__` 开头的成员（属性或方法）。这种命名约定并不是严格的访问控制机制，而是一种名称改写（name mangling）机制，Python 在解释器级别将双下划线开头的标识符重命名，以避免命名冲突。尽管如此，Python 仍然提供了一定程度的访问限制，以保护这些私有成员不被直接访问或修改。

### 1. 私有属性

在 Python 中，以双下划线 `__` 开头的属性会被 Python 解释器重命名为 `_classname__attribute` 的形式，其中 `classname` 是类名。这样的处理机制使得在类外部无法直接访问这些属性，但在类的方法内部仍可以直接访问。

```python
class Example:
    def __init__(self):
        self.__private_attr = 10  # 私有属性
    
    def get_private_attr(self):
        return self.__private_attr

# 创建对象
obj = Example()

# 无法直接访问私有属性（会报错）
# print(obj.__private_attr)  # AttributeError: 'Example' object has no attribute '__private_attr'

# 通过改名方式访问私有属性
print(obj._Example__private_attr)  # 输出: 10

# 在类的方法内部可以直接访问
print(obj.get_private_attr())  # 输出: 10
```

### 2. 私有方法

私有方法的定义和私有属性类似，也是以双下划线 `__` 开头，同样会被重命名，但在方法的定义和调用上有一些特殊之处。

```python
class Example:
    def __init__(self):
        self.__private_method()  # 调用私有方法
    
    def __private_method(self):
        print("This is a private method.")

# 创建对象
obj = Example()

# 无法直接调用私有方法（会报错）
# obj.__private_method()  # AttributeError: 'Example' object has no attribute '__private_method'

# 通过改名方式调用私有方法
# 注意：即使改名也是非常规范的做法，应当避免这样做。
obj._Example__private_method()  # 输出: This is a private method.
```

### 3. 访问限制与命名约定

尽管 Python 提供了私有成员的命名约定和名称改写，但并没有严格的访问控制，所有的访问限制都是基于约定而不是强制性的。因此，Python 更多地依赖于开发者的自律和合理使用，遵守命名约定来达到封装和保护数据的目的。

### 4. 总结

- Python 中的私有成员通过双下划线 `__` 开头来定义。
- 私有属性和方法在类外部不能直接访问，需要通过改名方式访问。
- Python 的私有成员并非严格的访问控制机制，而是一种命名约定，开发者应遵守这些约定来实现数据的封装和保护。