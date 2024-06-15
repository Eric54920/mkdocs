Redis 是一个开源的内存数据结构存储系统，可以用作数据库、缓存和消息代理。它支持多种类型的数据结构，每种数据类型都有独特的用途和操作方法。以下是 Redis 基础数据类型的详细介绍及示例：

### 1. 字符串（String）

字符串是 Redis 中最基本的数据类型，可以存储任何形式的文本或二进制数据。

#### 示例：

```bash
# 设置字符串值
SET mykey "Hello, Redis!"

# 获取字符串值
GET mykey
```

### 2. 哈希（Hash）

哈希用于存储键值对集合，适合用来存储对象。

#### 示例：

```bash
# 设置哈希字段
HSET user:1000 name "John Doe"
HSET user:1000 age 30

# 获取哈希字段值
HGET user:1000 name
HGET user:1000 age

# 获取整个哈希
HGETALL user:1000
```

### 3. 列表（List）

列表是一组有序的字符串，可以在其头部或尾部添加新元素。

#### 示例：

```bash
# 在列表头部添加元素
LPUSH mylist "world"
LPUSH mylist "hello"

# 获取列表所有元素
LRANGE mylist 0 -1

# 在列表尾部添加元素
RPUSH mylist "!"
```

### 4. 集合（Set）

集合是一组无序的字符串，不允许重复元素。

#### 示例：

```bash
# 添加元素到集合
SADD myset "apple"
SADD myset "banana"
SADD myset "cherry"

# 获取集合所有元素
SMEMBERS myset

# 检查元素是否在集合中
SISMEMBER myset "banana"
```

### 5. 有序集合（Sorted Set）

有序集合与集合类似，但每个元素都会关联一个分数，用于排序。

#### 示例：

```bash
# 添加元素到有序集合
ZADD myzset 1 "one"
ZADD myzset 2 "two"
ZADD myzset 3 "three"

# 获取有序集合所有元素
ZRANGE myzset 0 -1

# 获取有序集合元素及其分数
ZRANGE myzset 0 -1 WITHSCORES
```

### 6. 位图（Bitmap）

位图是一种紧凑的数据结构，可以对位进行设置和查询。

#### 示例：

```bash
# 设置位
SETBIT mykey 7 1

# 获取位
GETBIT mykey 7
```

### 7. HyperLogLog

HyperLogLog 是一种概率性的数据结构，用于估计集合中唯一元素的数量。

#### 示例：

```bash
# 添加元素到 HyperLogLog
PFADD myhll "foo" "bar" "zap"

# 获取唯一元素的估计数量
PFCOUNT myhll
```

### 8. 地理空间（Geospatial）

用于存储地理位置并执行地理空间操作。

#### 示例：

```bash
# 添加地理位置
GEOADD mygeo 13.361389 38.115556 "Palermo"
GEOADD mygeo 15.087269 37.502669 "Catania"

# 获取地理位置
GEOPOS mygeo "Palermo"

# 计算两个位置之间的距离
GEODIST mygeo "Palermo" "Catania"
```

### 9. 流（Stream）

流是 Redis 5.0 引入的数据类型，适用于时间序列数据。

#### 示例：

```bash
# 添加条目到流
XADD mystream * name "Alice" age 30

# 获取流的条目
XRANGE mystream - +
```

### 小结

Redis 提供了多种基础数据类型，每种类型都适用于不同的应用场景。通过结合使用这些数据类型，Redis 能够高效地处理各种数据存储和操作需求。要使用这些数据类型，你可以通过 Redis 提供的命令行界面（CLI）或通过编程语言的 Redis 客户端库来进行操作。