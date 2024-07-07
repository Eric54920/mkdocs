---
comments: true
---

在不重启 Redis 服务器的情况下，可以通过以下步骤从 RDB 持久化切换到 AOF 持久化：

1. **开启 AOF 持久化**：修改配置文件并应用更改。
2. **触发 AOF 文件的生成**：使用 `bgrewriteaof` 命令。
3. **确认 AOF 持久化生效**：检查 AOF 文件。

下面是详细的步骤：

### 步骤 1：开启 AOF 持久化

首先，确保 `redis.conf` 配置文件中包含以下内容，但我们不会重启 Redis。

```
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec

```

### 步骤 2：在 Redis CLI 中启用 AOF 持久化

1. 连接到 Redis：

```bash
redis-cli

```

1. 启用 AOF 持久化：

```bash
CONFIG SET appendonly yes
CONFIG SET appendfilename "appendonly.aof"
CONFIG SET appendfsync everysec

```

1. 触发 AOF 重写：

```bash
BGREWRITEAOF

```

### 步骤 3：确认 AOF 持久化生效

1. 确认 `appendonly.aof` 文件已生成，并且开始记录操作。
2. 查看 Redis 日志，确认 AOF 重写已成功完成。

可以使用以下命令查看 Redis 的当前持久化配置：

```bash
CONFIG GET appendonly
CONFIG GET appendfilename
CONFIG GET appendfsync

```

这些步骤将会确保 Redis 在不重启的情况下，从仅使用 RDB 切换到使用 AOF 进行持久化。在这期间，Redis 会保持运行，并且不会影响正在进行的操作。

### 示例流程

1. **连接到 Redis CLI**

```bash
redis-cli

```

1. **启用 AOF 并触发重写**

```bash
127.0.0.1:6379> CONFIG SET appendonly yes
OK
127.0.0.1:6379> CONFIG SET appendfilename "appendonly.aof"
OK
127.0.0.1:6379> CONFIG SET appendfsync everysec
OK
127.0.0.1:6379> BGREWRITEAOF
Background append only file rewriting started

```

1. **检查 AOF 文件生成**

在 Redis 数据目录（通常是 `/var/lib/redis` 或 `/path/to/your/redis/directory`），确认 `appendonly.aof` 文件已经生成并开始记录操作。

1. **验证 AOF 配置**

```bash
127.0.0.1:6379> CONFIG GET appendonly
1) "appendonly"
2) "yes"
127.0.0.1:6379> CONFIG GET appendfilename
1) "appendfilename"
2) "appendonly.aof"
127.0.0.1:6379> CONFIG GET appendfsync
1) "appendfsync"
2) "everysec"

```

通过这些步骤，可以在不重启 Redis 服务的情况下，切换从 RDB 备份到 AOF 备份，确保数据的持久化和可靠性。