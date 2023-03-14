## git常用命令

### 克隆拉取项目
- 可以将一个项目从远程仓库克隆到本地电脑上
```bash
git clone [href]
```

### 初始化git仓库
- 可以在当前文件夹下，创建并初始化一个代码仓库
- 此时文件不会被自动提交，都是新增状态，需要用户手动选择要提交的文件
```bash
git init
```

### 暂存文件
- 将新增、修改的文件调整为暂存状态，此时文件还没提交到本地仓库，但能区分最新的改动
- 可指定暂存哪个文件，也能使用 `.` 暂存所有文件
```bash
git add [file]

git add .
```

### 提交到本地仓库
- 将暂存的文件的改动，提交到本地仓库
- 可增加参数`-a`将所有未暂存的文件改动一次性提交到本地仓库
```bash
git commit -m '[commit msg]'

git commit -a -m '[commit msg]'
```

### 从远程仓库拉取同步最新的记录
- 当本地仓库的记录落后于远程仓库的记录时，可进行拉取同步，保持一致
- 需要指定要同步的远程代码仓库，以及要同步的分支名
- 同步时，远程分支名和本地分支名可不同
```bash
git pull [remote repository name] [branch name]

git pull [remote repository name] [oemote branch name]:[local branch name]
```

### 将本地仓库的记录推动到远程仓库
- 本地仓库提交一些改动记录后，可推送到远程，让其它人获取你的改动
- 需要指定要同步的远程代码仓库，以及要推送的分支名
- 推送时，远程分支名和本地分支名可不同
```bash
git push [remote repository name] [branch name]

git push [remote repository name] [oemote branch name]:[local branch name]
```

### 管理本地分支
- 可在本地仓库中，创建不同的分支进行代码修改
- 仓库初始化时，默认有一个`master`分支
- 使用`git branch`可查看本地的所有分支名
- 使用`git branch [branch name]`可创建一个新分支，但不会切换过去
- 使用`git branch -D [branch name]`可删除指定的分支
```bash
git branch 

git branch [branch name]

git branch -D [branch name]
```

### 切换本地分支
- 创建分支后，默认不会切换过去，需要手动切换
- 也可创建后直接切换，需要添加参数`-b`
```bash
git checkout [branch name]

git checkout -b [brand name]
```

###  合并分支改动
- 在另一个分支上改动后，可将其改动合并到当前的分支
- 不能将当前分支合并到另一个分支，必须先切换成当前分支
```bash
git merge [branch name]
```


### 同步远程仓库信息
- 只同步本地存储的远程仓库的信息，比如最新记录，最新的分支等信息
- 不会拉取远程的改动或者推送本地的改动
```bash
git fetch

git fetch origin [branch name]
```

### 查看远程仓库信息
- 本地可设置多个远程仓库地址，并设置名称
- 添加参数`-v`，可看远程仓库名字+具体的地址
```bash
git remote

git remote -v
``` 

###  添加远程仓库
- 可在本地仓库添加远程仓库，以便将改动推送到远程仓库
```bash
git remote add [name] [href]
```

### 对远程仓库名字重命名
- 可对本地仓库中的远程仓库的名字重命名
```bash
git remote rename [old name] [new name]
```

### 删除远程仓库地址
- 可删除本地仓库中，远程仓库的地址
```bash
git remote remove origin
```
