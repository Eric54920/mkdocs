Python 提供了丰富的基础数据类型，每种类型都有相应的方法和操作。以下是 Python 中一些常见的基础数据类型及其方法的详细介绍：

### 1. 数字类型（Number）

包括整数（int）、浮点数（float）和复数（complex）。

#### 示例：

```python
# 整数
x = 10

# 浮点数
y = 3.14

# 复数
z = 1 + 2j
```

### 2. 字符串（String）

字符串是不可变的字符序列。

#### 常用方法：

```python
s = "Hello, Python!"

# 长度
print(len(s))

# 字符串拼接
print(s + " How are you?")

# 重复
print(s * 2)

# 索引
print(s[0])

# 切片
print(s[0:5])

# 转换为大写
print(s.upper())

# 转换为小写
print(s.lower())

# 去除空白
print(s.strip())

# 查找子字符串
print(s.find("Python"))

# 替换子字符串
print(s.replace("Python", "World"))
```

### 3. 列表（List）

列表是可变的有序集合。

#### 常用方法：

```python
lst = [1, 2, 3, 4, 5]

# 长度
print(len(lst))

# 追加元素
lst.append(6)

# 插入元素
lst.insert(2, 2.5)

# 删除元素
lst.remove(2.5)

# 弹出元素
print(lst.pop())

# 切片
print(lst[1:3])

# 排序
lst.sort()

# 反转
lst.reverse()

print(lst)
```

### 4. 元组（Tuple）

元组是不可变的有序集合。

#### 常用方法：

```python
tup = (1, 2, 3, 4, 5)

# 长度
print(len(tup))

# 索引
print(tup[0])

# 切片
print(tup[1:3])

# 元组解包
a, b, c, d, e = tup

print(a, b, c, d, e)
```

### 5. 集合（Set）

集合是无序的不重复元素集合。

#### 常用方法：

```python
st = {1, 2, 3, 4, 5}

# 添加元素
st.add(6)

# 删除元素
st.remove(4)

# 集合运算
st1 = {3, 4, 5, 6, 7}
print(st & st1)  # 交集
print(st | st1)  # 并集
print(st - st1)  # 差集
print(st ^ st1)  # 对称差集
```

### 6. 字典（Dictionary）

字典是键值对集合。

#### 常用方法：

```python
d = {"name": "Alice", "age": 25, "city": "New York"}

# 获取值
print(d["name"])

# 添加或更新键值对
d["email"] = "alice@example.com"

# 删除键值对
del d["city"]

# 获取所有键
print(d.keys())

# 获取所有值
print(d.values())

# 获取所有键值对
print(d.items())

# 遍历字典
for key, value in d.items():
    print(key, value)
```

### 7. 布尔值（Boolean）

布尔值只有 `True` 和 `False` 两个取值。

#### 示例：

```python
a = True
b = False

# 布尔运算
print(a and b)  # 与
print(a or b)   # 或
print(not a)    # 非
```

### 8. None 类型

`None` 表示空值或未赋值。

#### 示例：

```python
n = None

# 判断是否为 None
if n is None:
    print("n is None")
```

这些基础数据类型和方法构成了 Python 语言的核心，通过灵活使用这些类型及其方法，可以高效地解决各种编程问题。