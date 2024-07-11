---
comments: true
---

Git 是一个分布式版本控制系统，用于跟踪项目中的更改并促进团队协作。以下是一些常用的 Git 命令及其简要说明。

### 配置

1. **配置用户信息**：
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **查看配置**：
   ```bash
   git config --list
   ```

### 创建和克隆仓库

3. **初始化一个新的 Git 仓库**：
   ```bash
   git init
   ```

4. **克隆一个远程仓库**：
   ```bash
   git clone https://github.com/user/repo.git
   ```

### 基本操作

5. **查看仓库状态**：
   ```bash
   git status
   ```

6. **添加文件到暂存区**：
   ```bash
   git add <file>
   git add .
   ```

7. **提交更改**：
   ```bash
   git commit -m "Commit message"
   ```

8. **查看提交历史**：
   ```bash
   git log
   ```

### 分支操作

9. **创建新分支**：
   ```bash
   git branch <branch-name>
   ```

10. **切换分支**：
    ```bash
    git checkout <branch-name>
    ```

11. **创建并切换到新分支**：
    ```bash
    git checkout -b <branch-name>
    ```

12. **合并分支**：
    ```bash
    git checkout <target-branch>
    git merge <source-branch>
    ```

13. **删除分支**：
    ```bash
    git branch -d <branch-name>
    ```

### 远程操作

14. **添加远程仓库**：
    ```bash
    git remote add origin https://github.com/user/repo.git
    ```

15. **查看远程仓库**：
    ```bash
    git remote -v
    ```

16. **推送到远程仓库**：
    ```bash
    git push origin <branch-name>
    ```

17. **从远程仓库拉取更新**：
    ```bash
    git pull origin <branch-name>
    ```

18. **从远程仓库获取最新变化但不合并**：
    ```bash
    git fetch origin
    ```

### 查看和比较

19. **查看更改**：
    ```bash
    git diff
    ```

20. **比较分支**：
    ```bash
    git diff <branch1> <branch2>
    ```

21. **查看特定文件的更改历史**：
    ```bash
    git log -p <file>
    ```

### 撤销更改

22. **撤销对文件的更改（从暂存区移除）**：
    ```bash
    git reset HEAD <file>
    ```

23. **恢复工作目录中某个文件的内容**：
    ```bash
    git checkout -- <file>
    ```

24. **回滚到特定提交**：
    ```bash
    git revert <commit>
    ```

### 其他有用的命令

25. **查看分支图**：
    ```bash
    git log --graph --oneline --all
    ```

26. **清除未跟踪的文件**：
    ```bash
    git clean -f
    ```

### 总结

这些命令涵盖了 Git 的基本功能和一些常用操作。掌握这些命令可以帮助你更好地管理代码版本、协作开发和维护项目。如果需要更多详细信息或帮助，可以使用 `git help <command>` 查看特定命令的文档。