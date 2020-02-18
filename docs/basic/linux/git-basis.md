---
title: Git 基础
---

## Git 是如何存储信息的

- `.git Directory & Working Directory`：`.git` 目录是 Git 存储信息和操作信息的目录，`Working Directory` 是我们实际操作的目录
- `Object`：Git 对象，文件、目录和提交记录都会以 Git Object 的格式存储在 `.git` 目录中
- `Reference`：Git 引用，分支、远程分支、tag 的索引都是以 Git Reference 的形式存储的，本质是一个包含 SHA1 值的 40 个字符的 16 进制字符串
- `SHA1`：所有的文件内容都会通过该算法计算出其 SHA1 值，作为 Git 对象的文件名
- `plumbing & procelain`：Git 的命令分类方式，前者是晦涩的底层命令，直接操作文件，后者是面向版本管理的高级命令

## .git 目录结构

`objects/[sha1-前两位]/[sha1-剩余值]`

```markdown
- `git init`
- `echo '111' > a.txt`
- `git add a.txt`
  - `objects/[sha1-前两位]/[sha1-剩余值]`  新建一个 `blob` 类型文件
  - `index` 暂存区
- `git commit -m "first commit"`
  - `objects/` 下新建两个文件
  - `commit` 类型，组成了一个树型结构
  - `tree` 类型
- `cat .git/HEAD` 返回 `ref: refs/heads/master`
- `cat .git/refs/heads/master` 返回 `sha1` 值
```

HEAD、分支、普通的 Tag 可以

查看 `SHA1` 对应的文件类型和内容：

- `git cat-file -t [sha1-至少前四位]` 查看类型，对应有 `blob`
- `git cat-file -p [sha1-至少前四位]` 查看内容
  - `commit` 类型对应 `commit message`
  ```shell-session
  tree f253233a1a0e59f33115daca3fa494eaa20758d8
  author qiaoin <qiao.liubing@gmail.com> 1577959020 +0800
  committer qiaoin <qiao.liubing@gmail.com> 1577959020 +0800

  first commit, a.txt
  ```
  - `tree` 类型
  ```shell-session
  100644 blob 58c9bdf9d017fcd178dc8c073cbfcbb7ff240d6c	a.txt
  ```
  - `blob` 类型对应文件内容
  ```shell-session
  111
  ```


## 常用命令

- `git reflog`
- `git stash push [-u | --include-untracked]` 获得干净的工作区
- `git filter-branch --tree-filter 'rm -f pass.txt' HEAD` 从 Git 历史中删除一个文件，例如敏感信息（私钥、内网 IP），或者不需要版本控制的超大文件
- `git commit --amend` 修改 commit message
- `git rebase -i origin/master` 在 git push 到远端仓库之前，交互式修改 commit message
- `git show-branch` 查看两个分支的区别
- `git blame` 查看每一行代码的最后一次变更
- `git bisect`

## 工作流

- `git checkout master`
- `git pull`
- `git checkout dev`
- `git stash`
- `git rebase master`
- `git stash pop`

## 更多问题

- 为什么取 `SHA1` 的前两位作为目录，后 38 位作为文件名？
- Git 为什么使用 `blob` 的形式存储内容？
- `plumbing` 和 `porcelain` 命名的含义是什么
- Git 如何提高存储效率(比如大文件 A 稍作修改，其实就会有另外一个及其相似的备份，十分浪费空间)?
- Git 如何处理分布式协作开发?
- Git 在实际项目中的最佳实践是什么？
