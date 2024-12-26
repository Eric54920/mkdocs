---
comments: true
---

Git 的 `tag` 命令用于给某个提交打标签（Tag），通常用来标记重要的版本点，例如发布版本（v1.0、v2.0等）。标签可以分为两种类型：**轻量标签（Lightweight Tag）** 和 **附注标签（Annotated Tag）**。

以下是详细的介绍和用法：

### 1. 创建标签

#### 1.1 创建轻量标签
轻量标签只是一个指向某个提交的指针，没有额外的元信息（如作者、日期、消息等）。

```bash
git tag <tag_name>
```
示例：
```bash
git tag v1.0
```

#### 1.2 创建附注标签
附注标签存储了额外的信息，包括创建标签的作者、日期和标签消息。

```bash
git tag -a <tag_name> -m "tag message"
```
示例：
```bash
git tag -a v1.0 -m "Release version 1.0"
```

### 2. 列出标签

#### 2.1 查看所有标签
```bash
git tag
```

#### 2.2 搜索特定模式的标签
```bash
git tag -l "v1.*"
```
示例：查看以 `v1.` 开头的所有标签。

### 3. 查看标签详细信息

#### 3.1 查看附注标签信息
```bash
git show <tag_name>
```
示例：
```bash
git show v1.0
```

### 4. 给指定提交打标签

#### 4.1 打标签到特定提交
如果不想为最新提交打标签，可以为某个特定提交打标签：
```bash
git tag <tag_name> <commit_id>
```
示例：
```bash
git tag v1.0 abc1234
```

#### 4.2 为特定提交创建附注标签
```bash
git tag -a <tag_name> <commit_id> -m "tag message"
```

### 5. 推送标签到远程仓库

#### 5.1 推送单个标签
```bash
git push origin <tag_name>
```
示例：
```bash
git push origin v1.0
```

#### 5.2 推送所有标签
```bash
git push origin --tags
```

### 6. 删除标签

#### 6.1 删除本地标签
```bash
git tag -d <tag_name>
```
示例：
```bash
git tag -d v1.0
```

#### 6.2 删除远程标签
删除远程标签需要先删除本地标签，然后使用 `push` 命令删除远程标签。
```bash
git push origin --delete <tag_name>
```
示例：
```bash
git push origin --delete v1.0
```

### 7. 重命名标签
Git 不支持直接重命名标签，但可以通过以下方式实现：
1. 创建一个新标签：
   ```bash
   git tag <new_tag_name> <tag_name>
   ```
2. 删除旧标签：
   ```bash
   git tag -d <old_tag_name>
   ```
3. 推送新标签并删除远程旧标签（如果需要）：
   ```bash
   git push origin <new_tag_name>
   git push origin --delete <old_tag_name>
   ```

### 8. 标签的常见用途
1. **版本管理**：为发布的版本打标签（如 `v1.0`, `v2.1.3`）。
2. **检查点**：标记重要的开发阶段，以便回溯。
3. **分发代码**：结合 `git archive` 打包带有标签的代码。

### 9. 常用命令速览
| 操作                      | 命令                                   |
|---------------------------|----------------------------------------|
| 创建轻量标签              | `git tag <tag_name>`                  |
| 创建附注标签              | `git tag -a <tag_name> -m "message"`  |
| 查看标签列表              | `git tag`                             |
| 查看标签详情              | `git show <tag_name>`                 |
| 给特定提交打标签          | `git tag <tag_name> <commit_id>`      |
| 推送单个标签到远程        | `git push origin <tag_name>`          |
| 推送所有标签到远程        | `git push origin --tags`              |
| 删除本地标签              | `git tag -d <tag_name>`               |
| 删除远程标签              | `git push origin --delete <tag_name>` |