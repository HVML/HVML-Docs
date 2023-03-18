# 在 HVML 程序中嵌入 Python

2023 年 3 月，HVML 社区发布了 HVML 开源解释器 PurC 的 0.9.8 版本，其中增加了对 Python 的支持。

使用这一增强，我们可以非常方便地在 HVML 程序中调用 Python 模块，利用 Python 生态中的丰富软件包或模块开发自己的 HVML 应用。与此同时，由 HVML 提供的跨平台、统一 GUI/CLI 应用开发框架以及跨端运行的能力，将弥补 Python 生态和 Web 生态之间几十年来难以跨越的鸿沟，从而极大提升 Python 应用的表现力以及和用户交互的能力。

本文通过一个内嵌 Python 实现三维动画随机游走功能的 HVML 程序，介绍了这一增强的典型应用场景：科学计算可视化。

## 准备工作

截止目前，HVML 解释器 PurC 和图形渲染器 xGUI Pro 均支持在 Linux 或 macOS 桌面上运行。为执行本文提到的 Python 代码，需要提前安装好 Python 3.9+（Linux）或 Python 3.11+（macOS）运行时环境、开发时环境以及相关模块。

比如，在 Ubuntu Linux 20.04 或以上系统中，首先安装常用的开发工具，如 git、make 等，然后使用如下命令：

```console
$ sudo apt install python3 python3-pip python3-dev
$ sudo apt install libwebkit2gtk-4.0-dev
$ pip3 install numpy matplotlib
```

在 macOS 上，首先确保已安装 xCode 或者 xCode Command Line Tools，然后安装 macPorts。有关macPorts 的安装，可访问 macPorts 官网：<https://www.macports.org>。

之后，在 macOS 的终端程序中，通过 macPorts 的 `port` 命令安装 Python 的运行时环境、开发时环境以及相关模块：

```console
$ sudo port install python311 py-pip
$ sudo port install webkit2-gtk-devel
$ sudo port install xorg-server
$ sudo pip3 install numpy matplotlib
```

目前，需要开发者自行编译 HVML 的解释器 PurC 和图形渲染器 xGUI Pro。在做好以上准备工作之后，请访问如下开源代码仓库获取源代码并根据其中的描述构建这两款软件：

- [PurC](https://github.com/HVML/PurC)
- [xGUI Pro](https://github.com/HVML/xGUI-Pro)

为构建上述软件，您可能还需要安装如下开发工具或函数库：

1. 跨平台构建系统生成器：CMake 3.15 或更高版本
1. 兼容 C11 和 CXX17 的编译器：GCC 8+ 或 Clang 6+
1. Zlib 1.2.0 或更高版本
1. Glib 2.44.0 或更高版本
1. BISON 3.0 或更高版本
1. FLEX 2.6.4 或更高版本
1. Ncurses 5.0 或更高版本（可选；`purc` 中的 Foil 渲染器需要此函数库）

请使用 Linux 发行版提供的包管理工具或者 macPorts 安装以上软件，并确保使用正确的版本。

下面是针对 macOS 系统的一些补充说明：

- HVML 解释器需要 Python 3.9 以上版本来支持和 Python 代码的互操作，而在 macOS 上通过 macPorts 安装 Python 3.11 的原因，主要是为了避免和 xCode Command Line Tools 中包含的 Python 3.9 相冲突。
- 在使用 macPorts 构建 PurC 和 xGUI Pro 时，一定要通过 CMake 的 `-DCMAKE_INSTALL_PREFIX=/opt/local` 选项指定 PurC 和 xGUI Pro 的安装前缀为 `/opt/local`；若使用默认的 `/usr/local` 安装前缀，会出现找不到头文件的情形。
- 在 macOS 上，如果不使用图形渲染器 xGUI Pro，而只使用 PurC 中内建的字符渲染器 Foil，也可以使用 Homebrew 系统来构建 PurC，而无需构建 xGUI Pro。但若要构建 xGUI Pro，则必须使用 macPorts。这主要是因为 Homebrew 未提供 WebKit2Gtk3 软件包。
- 在 macOS 上使用 macPorts 安装了 `xorg-server` 后，需要重新登录才能生效。
- 在 macOS 上编译 xGUI Pro 后，您需要手工在构建目录的 `lib/webext` 子目录下，创建一个后缀名为 `.so` 的符号链接指向构建好的 WebKit 扩展库：

```console
$ ln -s libWebExtensionHVML.so libWebExtensionHVML.dylib
```

## 快速了解 HVML 和 Python 之间的差异

## 可装载动态对象 PY

在 PurC 0.9.8 版本中，对 Python 的支持被实现为 HVML 的一个外部动态变体对象 `$PY`，利用该对象提供的功能，我们可以在 HVML 程序中完成如下功能：

1. 装载指定的 Python 模块并可在其上访问或调用已装载模块提供的子模块、属性或函数。
1. 执行一段 Python 代码、一个 Python 脚本或者一个指定的模块，并获得结果。
1. 编译一段 Python 代码，之后可在编译后的 Python 代码对象上，在不同的上下文环境中对其进行求值并获得求值结果。
1. 可将 HVML 字符串、数组、元组、集合、对象等数据转换为 Python 的内部对象，然后在其上执行这些 Python 内部对象支持的方法，或使用这些对象调用其他 Python 模块或函数。
1. 将 Python 内部对象转换为对应的 HVML 数据，或者获取对应的字符串表达。

## 示例程序解析

### 原始 Python 程序及其功能

<https://matplotlib.org/stable/gallery/animation/random_walk.html#sphx-glr-gallery-animation-random-walk-py>

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Fixing random state for reproducibility
np.random.seed(19680801)


def random_walk(num_steps, max_step=0.05):
    """Return a 3D random walk as (num_steps, 3) array."""
    start_pos = np.random.random(3)
    steps = np.random.uniform(-max_step, max_step, size=(num_steps, 3))
    walk = start_pos + np.cumsum(steps, axis=0)
    return walk


def update_lines(num, walks, lines):
    for line, walk in zip(lines, walks):
        # NOTE: there is no .set_data() for 3 dim data...
        line.set_data(walk[:num, :2].T)
        line.set_3d_properties(walk[:num, 2])
    return lines


# Data: 40 random walks as (num_steps, 3) arrays
num_steps = 30
walks = [random_walk(num_steps) for index in range(40)]

# Attaching 3D axis to the figure
fig = plt.figure()
ax = fig.add_subplot(projection="3d")

# Create lines initially without data
lines = [ax.plot([], [], [])[0] for _ in walks]

# Setting the axes properties
ax.set(xlim3d=(0, 1), xlabel='X')
ax.set(ylim3d=(0, 1), ylabel='Y')
ax.set(zlim3d=(0, 1), zlabel='Z')

# Creating the Animation object
ani = animation.FuncAnimation(
    fig, update_lines, num_steps, fargs=(walks, lines), interval=100)

plt.show()
```

### 改造 Python 代码并内嵌到 HVML 程序中

### 动画和交互

### 完整代码

```hvml
<!DOCTYPE hvml SYSTEM "f: PY">
<hvml target="html">
    <head>
        <title>Embedded Python in HVML: Animated 3D Random Walk</title>

        <!-- import the Bootstrap assets built in the renderer -->
        <link rel="stylesheet" href="//localhost/_renderer/_builtin/-/assets/bootstrap-5.1.3-dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//localhost/_renderer/_builtin/-/assets/bootstrap-icons-1.8.3/bootstrap-icons.css" />

        <update on $TIMERS to 'unite'>
            [
                { "id" : "clock", "interval" : 100, "active" : "yes" },
            ]
        </update>
    </head>

    <body>
        <init as 'pyCode'>
'''
import numpy as np
import matplotlib.pyplot as plt

# Fixing random state for reproducibility
np.random.seed(myseed)

def random_walk(num_steps, max_step=0.05):
    """Return a 3D random walk as (num_steps, 3) array."""
    start_pos = np.random.random(3)
    steps = np.random.uniform(-max_step, max_step, size=(num_steps, 3))
    walk = start_pos + np.cumsum(steps, axis=0)
    return walk

def update_lines(num, walks, lines):
    for line, walk in zip(lines, walks):
        # NOTE: there is no .set_data() for 3 dim data...
        line.set_data(walk[:num, :2].T)
        line.set_3d_properties(walk[:num, 2])

def update_walks(num_steps):
    np.random.seed(myseed)
    return [random_walk(num_steps) for index in range(40)]

# Data: 40 random walks as (num_steps, 3) arrays
num_steps = 30
walks = update_walks(num_steps)

# Attaching 3D axis to the figure
fig = plt.figure()
ax = fig.add_subplot(projection="3d")

# Create lines initially without data
lines = [ax.plot([], [], [])[0] for _ in walks]

# Setting the axes properties
ax.set(xlim3d=(0, 1), xlabel='X')
ax.set(ylim3d=(0, 1), ylabel='Y')
ax.set(zlim3d=(0, 1), zlabel='Z')
'''
        </init>

        <choose on true  >
            {{
                 $PY.global(! 'myseed', $SYS.time );
                 $PY.run($pyCode, 'source')
            }}
            <catch for `ExternalFailure`>
                <exit with "A Python exception raised: $PY.except" />
            </catch>
        </choose>

        <div class="px-4 my-5 border-bottom">
            <div class="text-center">
                <h1>Embeding Python in HVML: Animated 3D Random Walk<br/>
                <small class="text-muted">Powered by NumPy and Matplotlib</small></h1>
            </div>
        </div>

        <div class="container" id='myNS'>
            <div class="border border-3 pt-3 pb-3">

                <div class="col" >
                    <div class="text-center">
                        <img id="theFigure" width="638" height="476" />
                    </div>

                    <init as 'step' at '#myNS' with 0L />
                    <observe on $TIMERS for 'expired:clock'>
                        <inherit>
                            {{
                                    $STREAM.stdout.writelines("Going to handle Frame {$step}...");
                                    $PY.global.update_lines($step, $PY.global.walks, $PY.global.lines);
                                    $PY.global.fig.canvas.draw_idle();
                                    $PY.global.fig.savefig("frame-{$step}.svg");
                                    $STREAM.stdout.writelines("File frame-{$step}.svg generated")
                            }}
                        </inherit>

                        <update on '#theFigure' at 'attr.src' with "hvml://localhost/_system/_filesystem/-$SYS.cwd/frame-{$step}.svg?once=yes" />
                        <init as 'step' at '#myNS' with $DATA.arith('+', $step, 1) />
                        <test with $L.gt($step, 30) >
                            <update on $TIMERS to 'subtract' with = [{ id : 'clock' }] />
                        </test>
                    </observe>

                    <catch for `ExternalFailure`>
                        <p>A Python exception raised: $PY.except</p>
                    </catch>
                </div>

                <div class="col">
                    <div class="d-grid gap-2 col-10 mx-auto">
                        <button class="btn btn-outline-primary btn-for-input" id="runAgain" value="Run again" hvml-events="click" type="button">Run Again</button>
                    </div>
                </div>

                <observe on '#runAgain' for 'click'>
                    <inherit>
                        {{
                            $PY.global.update_walks($DATA.arith('*', $step, 2))
                        }}
                    </inherit>
                    <init as 'step' at '#myNS' with 0L />
                    <update on $TIMERS to 'unite' with [{ "id" : "clock", "interval" : 100, "active" : "yes" }] />
                </observe>
            </div>
        </div>

        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="https://hvml.fmsoft.cn" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <img class="d-block mx-auto" src="//localhost/_renderer/_builtin/-/assets/hvml-v.png" alt="HVML logo" height="24" />
                    </a>
                    <span class="mb-3 mb-md-0 text-muted">© 2023 HVML Community</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-muted" href="https://github.com/HVML"><i class="bi bi-github"></i></a></li>
                    <li class="ms-3"><a class="text-muted" href="https://store.fmsoft.cn/campaign/denoteoss-lt"><i class="bi bi-coin"></i></a></li>
                    <li class="ms-3"><a class="text-muted" href="mailto:hvml@fmsoft.cn"><i class="bi bi-envelope-heart-fill"></i></a></li>
                </ul>
            </footer>
        </div>
        <observe on $CRTN for "rdrState:pageClosed">
            <exit with 'Ok' />
        </observe>
    </body>
</hvml>
```

## 结语

