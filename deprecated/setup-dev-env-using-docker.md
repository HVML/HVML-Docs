# 使用 docker 搭建 HVML 的开发和测试环境

Linux（Ubuntu）是推荐的开发和测试环境，但是有些小伙伴平时使用的是 macOS 或者 Windows 系统。这里介绍 在macOS 上使用 docker 搭建 HVML 开发和测试环境的步骤。Windows 上的过程类似。

### 第一步，安装并启动 docker

下载 https://download.docker.com/mac/stable/Docker.dmg

安装并启动。

### 第二步，获取并运行 Ubuntu 镜像

```
# docker pull ubuntu
# docker run -it ubuntu /bin/bash 
```

这个时间点获取的 Ubuntu 镜像是：

```
20.04.1 LTS (Focal Fossa)
```

### 第三步，安装开发和使用的软件包

```
# apt-get update
# apt-get install -y git cmake g++ valgrind python3
```
注意，如果不安装g++，会出现下述错误提示：
```
gcc: fatal error: cannot execute 'cc1plus': execvp: No such file or directory
compilation terminated.
```
随着项目的进展，可能会用到其他的工具，可以用上述命令安装。

### 第四步，开发测试

例如：
```
# git clone https://github.com/HVML/purring-cat.git
# cd purring-cat/parser
```
阅读该目录下的 README.md 文件，并尝试其中的步骤。

