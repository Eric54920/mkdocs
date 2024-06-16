在Python中，正则表达式是处理字符串模式匹配的强大工具，使用 `re` 模块来支持正则表达式操作。正则表达式允许你通过描述和定义一些规则来匹配和处理文本中的字符串，例如查找特定模式的文本、替换文本或者验证字符串格式等。

### 1. re 模块的基本用法

首先需要导入 `re` 模块：

```python
import re
```

### 2. 正则表达式语法

在正则表达式中，常用的语法和符号包括：

- `.`: 匹配任意字符，除了换行符 `\n`。
- `^`: 匹配字符串的开头。
- `$`: 匹配字符串的结尾。
- `*`: 匹配前面的子表达式零次或多次。
- `+`: 匹配前面的子表达式一次或多次。
- `?`: 匹配前面的子表达式零次或一次。
- `{n}`: 匹配前面的子表达式恰好 n 次。
- `{n, m}`: 匹配前面的子表达式至少 n 次，至多 m 次。
- `[]`: 用来表示一组字符，单独列出：`[amk]` 匹配 'a'、'm' 或 'k'。
- `|`: 或运算符，用来匹配两个任一表达式中的一个，如 `(a|b)` 匹配 'a' 或 'b'。

### 3. re 模块常用函数

#### 3.1 `re.search()`

在字符串中搜索匹配正则表达式的第一个位置，返回 `match` 对象。

```python
result = re.search(pattern, string)
```

#### 3.2 `re.match()`

尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，返回 `None`。

```python
result = re.match(pattern, string)
```

#### 3.3 `re.findall()`

在字符串中找到正则表达式匹配的所有子串，并返回一个列表。

```python
result = re.findall(pattern, string)
```

#### 3.4 `re.finditer()`

与 `findall()` 类似，但返回一个迭代器，而不是列表。

```python
result_iterator = re.finditer(pattern, string)
for match in result_iterator:
    print(match)
```

#### 3.5 `re.sub()`

用指定的字符串替换正则表达式匹配到的子串，并返回替换后的字符串。

```python
new_string = re.sub(pattern, replacement, string)
```

### 4. 示例

#### 示例1：匹配邮箱地址

```python
import re

# 定义正则表达式模式
pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

# 测试字符串
text = "Contact us at info@example.com or support@company.co.uk"

# 使用 re.findall() 找到所有匹配的邮箱地址
emails = re.findall(pattern, text)
print(emails)  # 输出: ['info@example.com', 'support@company.co.uk']
```

#### 示例2：替换文本中的数字

```python
import re

# 定义正则表达式模式
pattern = r'\d+'

# 测试字符串
text = "There are 5 apples and 12 oranges in the basket."

# 使用 re.sub() 替换所有数字为 '*'
new_text = re.sub(pattern, '*', text)
print(new_text)  # 输出: "There are * apples and * oranges in the basket."
```

### 5. 注意事项

- **原始字符串**: 使用原始字符串（raw string）来表示正则表达式模式，即在字符串前面加上 `r`，可以避免转义字符带来的问题。
- **贪婪匹配**: 默认情况下，正则表达式是贪婪的，会尽可能多地匹配字符。可以使用 `*?`、`+?`、`{n,m}?` 等来实现非贪婪（最小匹配）模式。
- **编译正则表达式**: 如果多次使用同一个正则表达式模式，可以使用 `re.compile()` 编译模式，提高效率。

正则表达式在处理文本和字符串匹配方面非常强大和灵活，但也需要一定的学习和实践。通过掌握正则表达式的基本语法和常用函数，可以更加高效地处理字符串的复杂匹配和操作需求。