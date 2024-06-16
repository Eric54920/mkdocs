在Python中，虽然没有内置的“常量”类型（像在C语言中使用的`const`关键字），但是开发者可以通过约定和编码习惯来定义常量。通常，我们使用全大写的变量名来表示常量，这样可以让其他开发者知道这些值在程序中不应该被修改。

### 定义常量

以下是如何在Python中定义常量的示例：

```python
PI = 3.14159
GRAVITY = 9.8
SPEED_OF_LIGHT = 299792458  # 单位：米/秒
MAX_CONNECTIONS = 100

```

这些变量是常量的约定，因为在Python中，变量可以随时被修改，因此依赖团队协作来保持这些变量的不变性。

### 模块中的常量

为了更好地组织常量，可以将它们放在一个单独的模块中。例如，可以创建一个名为`constants.py`的文件：

```python
# constants.py
PI = 3.14159
GRAVITY = 9.8
SPEED_OF_LIGHT = 299792458
MAX_CONNECTIONS = 100

```

然后在其他模块中导入这些常量：

```python
# main.py
import constants

print(constants.PI)
print(constants.GRAVITY)

```

### 使用命名约定表示常量

Python的命名约定是使用全大写的变量名表示常量。这是一种社区公认的最佳实践，虽然Python本身并不会强制执行这一点：

```python
MAX_USERS = 1000
DATABASE_URL = "<http://example.com/db>"

```

### 常量的保护

虽然Python没有内置机制来保护常量不被修改，但可以通过编写自定义类来模拟常量保护。以下是一个简单的例子：

```python
class _Constants:
    class ConstError(TypeError):
        pass

    def __setattr__(self, name, value):
        if name in self.__dict__:
            raise self.ConstError(f"Can't rebind const({name})")
        self.__dict__[name] = value

    def __delattr__(self, name):
        if name in self.__dict__:
            raise self.ConstError(f"Can't unbind const({name})")
        raise NameError(name)

import sys
sys.modules[__name__] = _Constants()

# 使用
import constants

constants.PI = 3.14159
print(constants.PI)

# 尝试重新赋值将会引发错误
# constants.PI = 3.14  # 会抛出异常 TypeError: Can't rebind const(PI)

```

### 总结

在Python中定义和使用常量的最佳方法是通过命名约定和团队协作来保持变量的不变性。虽然Python不提供内置的常量保护机制，但通过组织代码和编写自定义类，可以在一定程度上实现常量的行为。通常情况下，遵循全大写命名约定并明确这些变量不应被修改，是最简单和最常用的方法。