# 30 分钟学会 HVML 编程

注：本文翻译自 [Learn HVML Programming in 30 Minutes](/en/learn-hvml-programming-in-30-minutes-en.md)

**目录**

[//]:# (START OF TOC)

- [介绍](#介绍)
- [基本原理](#基本原理)
   + [准备工作](#准备工作)
- [目标文档类型和表达式](#目标文档类型和表达式)
- [控制流](#控制流)
   + [二选一分支和介词属性](#二选一分支和介词属性)
   + [多分支和副词属性](#多分支和副词属性)
   + [循环和上下文变量](#循环和上下文变量)
- [数据/事件驱动编程](#数据事件驱动编程)
- [模板和置换](#模板和置换)
- [变量和闭包](#变量和闭包)
   + [静态变量与临时变量](#静态变量与临时变量)
   + [集合](#集合)
   + [变量范围](#变量范围)
   + [就地执行或调用](#就地执行或调用)
- [协程和并发](#协程和并发)

[//]:# (END OF TOC)

## 介绍

HVML 是 `Hybrid Virtual Markup Language` 的缩写。它是由中国首个开源项目 [MiniGUI](https://github.com/VincentWei/minigui) 的作者[魏永明](https://github.com/VincentWei)提出并设计的一种通用且易学的编程语言。

魏永明表示，HVML 是一种具有新结构、新原理和新设计模式的可编程标记语言，它和您熟悉的任何编程语言有显著的不同：

- 它使用标记来定义程序结构和控制流；这大大提高了程序的可读性，降低了学习门槛。
- 它使用具有动态能力的扩展 JSON 来定义数据；这使其成为粘合不同系统组件的理想胶水。
- 它引入了数据驱动的编程模型；这允许开发人员更多地关注数据的生成和处理，而不是控制流。
- 它是动态的；开发人员不仅可以从远程数据源获取数据、模板、程序片段，还可以删除现有变量。
- 它提供了一种独特的方式来支持协程、线程、闭包等等——这些都是您在现代编程语言中看到的那些特性。
- 它非常灵活；开发人员可以使用 HVML 编写简单的脚本工具，也可以使用它来开发复杂的 GUI 应用程序，甚至可以编写高并发的服务器端程序。
- 它运行飞快；HVML 使用简单高效的栈式虚拟机，并且不使用影响性能的任何垃圾收集器。
- 它提供了比其他脚本语言更高级别的抽象，因此我们可以用更少的代码做更多的事情。

在本教程中，我们将向您展示 HVML 最令人兴奋的特性，尤其是那些不同于普通编程语言的特性。如果您熟悉 C/C++、Python 或 JavaScript 等编程语言，您会发现您可以在很短的时间，比如 30 分钟内掌握 HVML 编程的基本原理和方法。

让我们尽情享受吧。

## 基本原理

如前所述，HVML 是一种可编程标记语言。您知道 HTML 使用标记来定义静态文档和文档中的文本内容，而 HVML 使用标记来定义程序的结构和数据。换句话说，HTML 是静态的，而 HVML 是可编程和动态的。

例如，下面的 HTML 文件定义了一个包含 `Hello, world!` 段落的文档：

```hvml
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

如您把上述 HTML 文件中所有的 `html` 改成 `hvml` ，并向根元素添加一个新属性 `target="html"`，您就可以获得您的第一个 HVML 程序：

```hvml
<hvml target="html">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

就像 Python、PHP 或 JavaScript 脚本一样，我们需要一个解释器来运行这个 HVML 程序。从 HVML 解释器的角度来看，HVML 程序中的每个元素定义了一个要执行的操作。您知道有效的 HTML 文档定义了一个 DOM（文档对象模型）树，而 Web 浏览器可以在窗口中渲染并呈现 DOM 树。同样，一个有效的 HVML 程序也定义了一棵 DOM 树，解释器执行 DOM 树。换句话说，浏览器呈现 HTML 文档，而 HVML 解释器执行 HVML 程序。

解释器从根元素（即 `hvml` 元素）开始，以深度优先的顺序执行 DOM 树。在执行 `hvml` 元素时，由于 `target` 属性的值为 `html`，解释器将生成一个  HTML 文档。就 HVML 而言，此 HTML 文档称为 `目标文档（the target document）`。执行完 `hvml` 元素后，迭代器继续依次执行 `body` 元素和 `p` 元素。解释器执行完 `p` 元素后，由于 DOM 树中没有任何元素，解释器将停止执行这个 DOM 树。

解释器根据标签名称、属性和内容执行每个元素。标签名称定义了要执行的操作，属性和内容定义了执行操作时的参数。为了便于理解，您可以将 HVML 元素视为一个函数，将属性和内容视为在调用该函数时传递给它的参数。

HVML 为不同的操作引入了大约 20 个标签：

- `hvml`, `head` 和 `body` 被称为 `框架标签（frame tag）`; 它们用于定义 HVML 程序的框架或者整体结构。
- `archetype`, `achedata`, `error` 和 `except` 被称为 `模板标签（template tag）`; 它们用于定义参数化模板。
- `init`, `test`, `iterate`, `define`, `call`, `include`, `load`, `exit`, `return`, `update`, `back` 和其他使用动词的标签被称为 `动词标签（verb tag）`，它们用于定义操作数据、更新目标文档或控制虚拟机的动作。

上述标签以外的标签称为 `外部标签（foreign tag）`。对于由外部标签定义的元素，HVML 赋予一个默认且统一的操作：对属性值和内容求值，然后将它们复制到目标文档。

您可能有一个问题：如果外部标签名称与 HVML 标签名称冲突怎么办？答案是使用外部标签的前缀。

在 HVML 程序的头部，可以使用一个可选的 `DOCTYPE` 节点来定义文档类型和用于外部标签的前缀：

```hvml
<!DOCTYPE hvml SYSTEM "f:">
```

这样，任何带有前缀 `f:` 的标签都将被视为外部标签。例如：

```
<!DOCTYPE hvml SYSTEM "f:">

<hvml target="html">
    <body>
        <f:error>Hello, world!</f:error>
    </body>
</hvml>
```

在上面的代码中，我们对 `error` 元素使用了 `f:` 前缀。如前所述，`error` 是 HVML 定义的模板标签。当您需要引用与 HVML 具有相同标签名称的外部元素时，通过使用此前缀来区别两者。

幸运的是，在大多数情况下我们不需要使用这个前缀，因为 HVML 的标签名称与 HTML 定义的标签名称有很大不同。

对于您的第一个 HVML 程序，解释器将生成一个空的 HTML 文档，并将 `p` 元素的内容复制到目标 HTML 文档的 `body` 中。结果，HVML 程序生成了一个 HTML 文档，它与前面给出的 HTML 文件相同。

注意，`body` 标签不是外部标签，它是 HVML 的框架标签。用于定义一个 HVML 程序的入口体。实际上，您可以在 HVML 程序中定义多个 `body` 元素，并告诉解释器使用特定的主体作为程序的主入口。

HVML 还使用 `head` 标签来定义一个执行任何 `body` 入口的操作组。这可用于为每个 `body` 入口初始化一些全局数据。

HVML 的伟大之处在于，您可以使用标签来定义一个具有复杂控制流的程序，您还可以使用灵活的表达式为目标文档生成动态内容。

### 准备工作

在深入了解 HVML 的基本编程方法之前，我们先搭建一个实践环境。如果已经搭建好该环境，可以跳过本节。

HVML 社区发布了一个开源的 HVML 解释器 `PurC`。有关构建和安装它的详细说明，请参阅公开的代码仓库：

<https://github.com/HVML/PurC>

假设您已将 PurC 安装到您的系统，您可以将您的第一个 HVML 程序的内容保存到一个名为 `hello-world.hvml` 的文件中：

```hvml
<hvml target="html">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

并使用以下命令运行 HVML 程序：

```
$ purc -b hello-world.hvml
```

上面的命令行将输出如下文本到您的终端屏幕或者窗口中：

```
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hello-world.hvml`...

>> The document generated:
<html>
  <head>
  </head>
  <body>
    <p>
      Hello, world!
    </p>
  </body>
</html>


>> The executed result:
null
```

您看到该程序生成了一个 HTML 文档，与我们之前讨论的相同。

在类 Unix 操作系统上，您可以直接从命令行执行您的第一个 HVML 程序。为此，添加以下行作为您的第一个 HVML 程序的第一行：

```
#!/usr/local/bin/purc -b
```

并使文件具有执行权限，然后尝试运行程序：

```
$ chmod +x hello-world.hvml
$ ./hello-world.hvml
```

您会得到和以前一样的结果。

## 目标文档类型和表达式

当您阅读到这里，您可能会有一个新问题：HVML 程序是否必须生成 HTML 文档？答案是“不”。

事实上，HVML 支持多种文档类型：

- `void`: 所有外部元素都将被忽略。
- `html`: 生成 HTML 文档。
- `xml`: 生成一个 XML 文档（目前的 PurC 版本尚不支持）。
- `plain`：只有文本内容会被保存为纯文本（目前的 PurC 版本尚不支持）。

所以如果将 hvml 元素的 `target` 的值更改为 `void`，HVML 程序将生成一个空文档，也就是说，HVML 程序中的所有外部元素都将被忽略。

```hvml
<hvml target="void">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

如果您将修改后的版本保存到 `hello-world-void.hvml` 并使用 `purc` 运行它，您将获得以下输出：

```
$ purc -b hello-world-void.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-world-0.hvml`...

>> The document generated:


>> The executed result:
null
```

此外，如果您在没有 `-b` 标志的情况下运行 HVML 程序，您将一无所获：

```
$ purc hello-world.hvml
$
```

该 `-b` 标志（或相应的长选项 `--verbose`）告诉解释器在执行程序时打印详细信息。HVML 程序生成一个 HTML 文档，但不做任何事情来将信息输出到您的终端。因此，如果您不加 `-b` 标志运行 `purc`，您什么也看不到。

那么，如果您想在终端打印一些文本，如何在 HVML 中编程呢？

您可以修改您的第一个 HVML 程序，如下所示：

```hvml
<!-- Version 1 -->
<hvml target="html">

    $STREAM.stdout.writelines('Hello, world!')

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

我们将第一个 HVML 程序的初始版本称为 Version 0，将这个修改后的版本称为 Version 1。当您使用 `purc` 运行 Version 1 时，您将得到以下输出：

```
$ purc hello-world.hvml
Hello, world!
```

显然，新添加的语句 `$STREAM.stdout.writelines('Hello, world!')` 输出了 `Hello, world!` 到您的终端。

此外，如果您使用 `-b` 标志执行此 HVML 程序：

```
$ purc -b hello-world.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hello-world.hvml`...
Hello, world!

>> The document generated:
<html>
  <head>
  </head>
  <body>
    <p>
      Hello, world!
    </p>
  </body>
</html>


>> The executed result:
14
```

将此输出与 Version 0 的输出进行比较，您会发现后者显示的是执行结果 `14`，而不是 `null`。

类似 `$STREAM.stdout.writelines('Hello, world!')` 的语句是 HVML 中的 EJSON 表达式。我们可以使用 EJSON 表达式来访问对象的属性或者调用对象的方法。每个表达式都会有一个求值结果，结果可用于定义元素的属性或内容。请注意，即使您将目标文档的类型设置为 `void`，在执行期间仍会对外部元素的属性或内容求值。

让我们仔细看看表达式中的各个组成部分。

`$STREAM` 指的是一个名为 `STREAM` 的对象。也就是说，`STREAM` 是一个变量，HVML 在引用变量时使用 `$` 作为前缀。因为我们可以在字符串中嵌入 EJSON 表达式，所以 HVML 用 `$` 将 EJSON 表达式与字符串中的其他字面文本区分开来。按照惯例，像 `STREAM` 这样的大写的变量是预定义变量。您可以使用预定义的变量来访问系统功能或执行常见任务。目前，HVML 定义了以下预定义变量：

- `SYS`：您可以用 `SYS` 来获取或设置有关您的系统的信息。例如，当前语言环境、时间、工作目录等。
- `STR`: 可以用 `STR` 来操作字符串。例如，连接多个字符串或提取一个子字符串等等。
- `STREAM`：您可以使用 `STREAM` 打开流并从流中读取/写入数据。
- `MATH`：顾名思义，可以用 `MATH` 来进行基于浮点数的数学计算。
- `FS` 和 `FILE`：您可以使用 `FS` 和 `FILE` 对文件系统和文件执行操作。
- `EJSON`：您可以使用 `EJSON` 在各种数据类型之间进行转换。
- `L`：您可以使用 `L` 来执行基于一个或多个数据的逻辑操作。
- `DATETIME`：您可以使用 `DATETIME` 来执行基于日期和时间的操作。
- `URL`：您可以使用 `URL` 来执行针对 URL 和查询的操作。

根据表达式 `$STREAM.stdout.writelines('Hello, world!')`，它调用预定义变量 `STREAM` 的 `stdout` 对象的 `writelines` 方法。`writelines` 方法打印 `Hello, world!` 到指定的流对象中，并完全返回写入流（`stdout`）的字节。这里应该是 14：字符串 `Hello, world!` 的长度，加上写入终端的换行符 (`\n`)。

因为表达式作为 `hvml` 元素的内容出现，所以这个表达式的结果将被记录为执行 `hvml` 元素的结果。并且由于 `hvml` 元素是根元素，`hvml` 元素的执行结果将成为整个 HVML 程序的结果。因此，`purc` 给出 HVML 程序的执行结果为 `14`。

我们将表达式的返回值称为 `求值结果（evaluated result）`。

在 HVML 中，您可以使用类似 JSON 的语法来定义简单的数据，例如 undefined、null、boolean（布尔值）、数值（number）、字符串（string）或容器（例如数组或对象），并且可以在定义字符串或对象时使用表达式。我们增强了 JSON 的语法以支持更多的数据类型，例如长整数、无符号长整数、长双精度数等。无论是普通的 JSON 还是 EJSON 表达式，我们统称为 EJSON 表达式。这里有些例子：

- 单引号字符串：`'这是一个文字文本，$SYS.locale 不会被求值。'`
- 双引号字符串：`"$SYS.locale 将在此文本中进行求值。"`
- 长整数（64 位）：`5L`
- 无符号长整数（64 位）：`-1UL`（在 C 中即 0xFFFFFFFFFFFFFFFF）
- 一个随机数数组：`[ $SYS.random(1.0), $SYS.random(2.0), $SYS.random(3.0) ]`
- 一个对象：`{ locale: $SYS.locale, timezone: $SYS.timezone }`

例如，您可以使用以下表达式将 HVML 程序的执行结果定义为数组：

```
<!-- Version 2 -->
<hvml target="html">

    [ $STREAM.stdout.writelines('Hello, world!'), $STREAM.stdout.writelines($DATETIME.fmttime('%H:%M')) ]

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

Version 2 的执行结果将是一个数组：`[ 14UL, 6UL ]`。带有后缀 `UL` 的数字表示它是无符号长整数。

再举一个例子，您可以使用以下表达式来计算圆的面积：

```
$MATH.eval('PI * r * r', { r: 3 })
```

`$MATH` 的 `eval` 方法计算一个参数化的数学公式（在这个例子中是 `PI * r * r`），而 `r` 作为 `eval` 方法的第二个参数由一个对象 `{r: 3}` 给出。因此，该表达式的执行结果约为 `28.26`。

此外，HVML 定义了复合 EJSON 表达式以具有简单的逻辑控制能力。复合 EJSON 表达式由多个 EJSON 表达式组成。它由 `{{` 和 `}}` 包围，由 `;`、`&&` 或 `||` 分隔。就像在一个 Shell 命令行中执行多个命令一样，可以使用复合 EJSON 表达式来实现简单的 `if-then-else` 逻辑控制。

例如，以下复合表达式尝试将当前工作目录更改为 `/root`。如果成功，它将调用 `$FS.List_ptr` 获取 `/root` 中的目录入口列表（一个字符串数组）。如果失败，则返回一个失败提示。不管成功还是失败，最终表达式都会调用 `$STREAM.stdout.writelines` 来打印目录项列表或失败提示。

```
{{
    $STREAM.stdout.writelines({{
                $SYS.cwd(! '/root') && $FS.list_prt ||
                    'Cannot change directory to "/root"'
            }})
}}
```

## 控制流

如前所述，您可以将一个表达式的求值结果用作属性值或元素的文本内容。现在，让我们根据当前系统的语言区域尝试增强 HVML 程序以生成不同的内容。

### 二选一分支和介词属性

请参阅 HVML 程序的 Version 3：

```hvml
<!-- Version 3 -->

<!--
    $SYS.locale 返回当前系统语言区域，如' en_US '或' zh_CN '
    $STR.substr 返回给定字符串的子字符串。
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <!-- 'test' 元素检查系统区域是否以 'zh' 开头 -->
        <test with = $STR.starts_with($SYS.locale, 'zh') >

            <h1>我的第一个 HVML 程序</h1>
            <p>世界，您好！</p>

            <!-- 如果系统区域不是以 'zh' 开头 -->
            <differ>
                <h1>My First HVML Program</h1>
                <p>Hello, world!</p>
            </differ>
        </test>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

您可以很容易地发现 Version 3 中的代码引入了一些有趣的东西：

1. 定义 `lang` 属性的值的表达式： `$STR.substr($SYS.locale, 0, 2)`。
2. 使用动词作为标签名称的元素，例如 `test` 和 `differ`。
3. `test` 元素中一个特殊的属性，其名称为 `with`，其值由表达式 `$STR.starts_with($SYS.locale, 'zh')` 定义。

除了上面的东西，代码看起来仍然像 HTML：

1. 该代码用 `<` 定义打开标签并且用 `</`  定义关闭标签。
2. 它使用与 HTML 相同的语法来定义属性，例如 `target="html"`.
3. 它使用 `<!--` 和 `-->` 来定义注释，等等。

该表达式 `$STR.substr($SYS.locale, 0, 2)` 生成系统语言环境的子字符串（类似 `zh_CN` 或 `en_US` 的字符串），并将结果用作 `lang` 属性的值。

元素 `test` 和 `differ` 的行为类似于条件控制语句，例如 C 或 JavaScript 此类传统编程语言中的 `if` 和 `else`。但是，HVML 不使用语句来编写程序。相反，我们使用元素和表达式来编写程序。通常，元素根据属性值执行特定的操作并选择子元素继续。当没有子元素时，它会返回父元素，直到根（`hvml`）元素为止。

例如，在 Version 3 中，`test` 元素使用 `with` 属性定义的表达式，即 `$STR.starts_with($SYS.locale, 'zh')` 作为条件。如果表达式的计算结果为真（true），即系统语言环境以 `zh` 开头，则此 HVML 程序会将 `test` 元素中的 `h1` 和 `p` 元素克隆到目标文档中，并忽略该 `differ` 元素。如果求值结果为假（false），则  `differ` 元素中的这些元素将被克隆到目标文档中。

与 `test` 元素中的 `with` 属性一样，HVML 还使用其他一些介词作为动词元素的属性名，如 `on`, `with`, `for`, `via`,`against` 等。通过使用动词标签和介词属性，您可以轻松理解元素定义的操作。在 Version 3 中，`test with $STR.starts_with($SYS.locale, 'zh')` 意味着检查 `$STR.starts_with($SYS.locale, 'zh')` 的求值结果，以查看它是真还是假。请注意，HVML 允许省略介词属性名称和表达式之间的等号 (`=`) 作为属性值。这使 HVML 代码具有更好的可读性。

因此，当您执行 HVML 程序时，如果系统语言环境是 `zh_CN` 或 `zh_TW`，程序生成的目标文档将如下所示：

```html
<html lang="zh">
    <head>
    </head>
    <body>
        <h1>我的第一个 HVML 程序</h1>
        <p>世界，您好！</p>
    </body>
</html>
```

但如果系统语言环境是 `en_US` 或其他不以 `zh` 开头的东西，程序生成的目标文档将如下所示：

```html
<html lang="en">
    <head>
    </head>
    <body>
        <h1>My First HVML Program</h1>
        <p>Hello, world!</p>
    </body>
</html>
```

### 多分支和副词属性

如果要支持更多语言，可以使用 `match` 元素作为 `test` 元素的子元素。例如：

```hvml
<!-- Version 4 -->

<!--
    $SYS.locale 返回当前系统语言环境，如' en_US '或' zh_CN '
    $STR.substr 返回给定字符串的子字符串。
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <!-- 像 'zh' 或 'en' 这样的语言标识符将成为 'test' 元素的执行结果 -->
        <test on $STR.substr($SYS.locale, 0, 2) >

            <!--
                这个 'match' 元素检查父元素的计算结果是否与 'zh'（中文）相同。
            -->
            <match for "AS 'zh'" exclusively>
                <h1>我的第一个 HVML 程序</h1>
                <p>世界，您好！</p>
            </match>

            <!--
                这个 'match' 元素检查父元素的计算结果是否与 'en'（英语）相同。
            -->
            <match for "AS 'en'" exclusively>
                <h1>My First HVML Program</h1>
                <p>Hello, world!</p>
            </match>

            <!--
                这个 'match' 元素检查父元素的计算结果是否与 'fr'（法语）相同。
            -->
            <match for "AS 'fr'" exclusively>
                <h1>Mon premier programme HVML</h1>
                <p>Bonjour le monde!</p>
            </match>

            <!-- 其他的，就当拉丁语吧。 -->
            <match for "ANY">
                <h1>Primum mihi HVML Programma</h1>
                <p>Salve, mundi!</p>
            </match>
        </test>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')
</hvml>
```

在 Version 4 中，我们在 `test` 元素中使用 `on` 属性，并使用多个具有不同 `for` 属性值的 `match` 元素。当 `on` 属性与动词元素一起使用时，`on` 属性值的求值结果将成为动词元素的执行结果。这里，测试元素的执行结果将是一个只有两个字母的字符串，如 `zh`、`en`、`fr` 等。

显然，您可以很容易地看到 `test` 元素及其子元素 `match` 定义了一个多分支控制流，就像其他编程语言中 `if-else if-else if-else` 或 `switch-case`。

您可能会注意到我们在一些 `match` 元素中使用了一个特殊的属性 `exclusively`。该属性使用副词并且不定义任何值。它被称为副词属性（adverb attribute），总是用来修饰一个动作。这里的 `exclusively` 属性表示分支是独占的，即如果父元素 `test` 的执行结果符合 `match` 元素给定的条件，则其他 `match` 元素会被直接跳过。

其他常用副词属性如下所示：

- `uniquely`：用于定义 `init` 元素中的集合。
- `temporarily`：用于在 `init` 元素中定义一个临时变量。
- `asynchronously`：用于定义异步操作或异步启动协程。
- `concurrently`：在 `call` 元素中，用于定义一个并发调用。
- `nosetotail`：在 `iterate` 元素中，用于重置最后的结果的输入数据。
- `ascendingly` 和 `descendingly`: 在 `sort` 元素，用于定义排序顺序。
- `silently`: 执行静默求值，也就是在对元素的属性或者内容求值时遇到错误，将返回一个代表失败的错误值，而不是产生异常。

### 循环和上下文变量

现在，您希望生成包含有各种语言的 `Hello, world!` 文档，您可以使用 `iterate` 元素。这是您的第一个 HVML 程序的 Version 5 ：

```hvml
<!-- Version 5 -->

<!--
    $SYS.locale 返回当前系统语言环境，如 'en_US' 或 'zh_CN'
    $STR.substr 返回给定字符串的子字符串。
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <!-- 初始化一个字符串数组变量 -->
        <init as "helloInVarLangs">
            [
                "世界，您好！",
                "Hello, world!",
                "Bonjour le monde!",
                "Salve, mundi!",
            ]
        </init>

        <!-- 在这个数组上执行迭代，也就是遍历其中所有的成员 -->
        <iterate on $helloInVarLangs >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

我们在 Version 5 中使用了两个新的动词元素：`init` 和 `iterate`。根据这两个动词的含义，您可以立即猜出它们的作用。使用 `purc` 运行 Version 5，HVML 程序会为您提供预期的结果：

```
$ purc -b hello-world-5.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hello-world-5.hvml`...
Start of `Hello, world!`
End of `Hello, world!`

>> The document generated:
<html lang="en">
  <head>
  </head>
  <body>
    <h1>
      我的第一个 HVML 程序
    </h1>
    <p>
      世界，您好！
    </p>
    <p>
      Hello, world!
    </p>
    <p>
      Bonjour le monde!
    </p>
    <p>
      Salve, mundi!
    </p>
  </body>
</html>


>> The executed result:
23
```

显然，我们很容易理解 Version 5 中引入的动词元素所执行的操作：

1. `init` 元素使用其内容中定义的字符串数组，初始化名为 `helloInVarLangs` 的变量。
2. `iterate` 元素迭代 `on` 属性指定的数据：也就是刚刚初始化的数组。

但 `$?` 是什么意思？

您一定记得，HVML 引用变量用 `$` 作前缀。因此，`$?` 肯定是一个变量。在 HVML 中，以类似 `?` 这样的特殊符号命名的变量称为 `上下文变量（context variable）`. 这里 `$?` 指的是前置运算的执行结果。父元素是 `iterate`，它迭代数组中的每个成员，并将数组的一个成员设置为每次迭代的执行结果。因此，这个 HVML 程序将为 `Hello, world!` 用不同的语言生成四个段落，正如您在结果中看到的那样。

与其他编程语言不同，HVML 大量使用上下文变量：

- 本质上，上下文变量是临时的，并且寿命很短。这将帮助我们避免不必要的静态变量并节省内存使用。
- 上下文变量可以将程序员从命名困难中解救出来。

除了 `?`，HVML 还定义了其他上下文变量：

- `@`：目标文档的当前位置；通常由 `in` 属性定义。
- `^`：在前置操作中求值后的内容数据。
- `:`：如果执行结果是一个对象的属性，这个变量代表属性名。
- `=`：如果执行结果是一个对象的属性，这个变量代表属性值。
- `%`：当前置运算为迭代时，该变量代表当前迭代的索引（一个从 0 开始的整数）。
- `<`：当前置运算为迭代时，该变量代表当前迭代的输入数据。

（未完待续）

点击下方阅读原文，访问 HVML 解释器 PurC 的源代码仓库 <https://github.com/HVML/PurC>，并按照 `README.md` 文件中描述的步骤，即可自行构建 PurC 以及相关软件。

一定要点亮每个 HVML 代码仓库的 Star 给予我们鼓励！

# 30 分钟学会 HVML 编程（上）

注：本文翻译自 HVML 社区发表的 Learn HVML Programming in 30 Minutes。本公众号将分上、中、下三篇发布对应的中文版，希望可以帮助任何对 HVML 感兴趣的人能够快速掌握 HVML 编程的一些基础知识。

在本文中，您将了解 HVML 与众不同的那些特性，包括：

- 数据/事件驱动编程
- 模板和置换
- 变量和闭包，包括对集合的支持以及就地执行
- 堪称史上最简单的对协程和并发的支持

## 数据/事件驱动编程

事实上，Version 5 中的 `init` 元素是多余的。修改后如下：

```hvml
<!-- Version 6 -->

<!--
    $SYS.locale 返回当前系统语言环境，如' en_US '或' zh_CN '
    $STR.substr 返回给定字符串的子字符串
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <iterate on [ "世界，您好！", "Hello, world!", "Bonjour le monde!", "Salve, mundi!", ] >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

Version 6 展示了 HVML 的一个非常重要的编程理念：较少使用或不使用变量。

在 Version 5 和 Version 6 中，我们将数组硬编码在 `init` 或者 `iterate` 中。这通常与实际情况不符。在实践中，数据一般会来自外部源，比如一个本地文件或者远程 URL。

大多数编程语言不提供直接从 URL 获取数据的方法，但 HVML 提供。您可以使用 `init` 从文件或远程 URL 获取数据：

```hvml
<!-- Version 7 -->

<!--
    $SYS.locale 返回当前系统语言环境，如' en_US '或' zh_CN '
    $STR.substr 返回给定字符串的子字符串。
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <init as "helloInVarLangs" from "file://{$SYS.cwd}/hello-world.json" />

        <iterate on $helloInVarLangs >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

在运行 Version 7 之前，请在您当前的工作目录中准备一个名为 `hello-world.json` 的文件：

```
[ "世界，您好！", "Hello, world!", "Bonjour le monde!", "Salve, mundi!" ]
```

如果您运行  Version 7，通过在 `init` 元素中使用 `from` 属性，您将获得相同的结果。HVML 程序可以从指定的 URL 获取数据。在这里，它是当前工作目录中的本地文件。

与其他编程语言相比，HVML 提供了直接从特定 URL 获取数据的能力。这为开发者提供了极大的便利，并将开发者从复杂的网络协议细节中解放出来。不仅如此，解释器将获取操作作为异步任务执行。这可以帮助开发人员使用 HVML 开发具有高并发能力的程序。

Version 6 和 Version 7 还揭示了 HVML 的另一种编程理念：数据驱动编程。在 HVML 程序中，您更多地关注数据的来源和处理，而不是如何命名和管理它们。

数据驱动编程的另一个示例，请移步到您的第一个 HVML 程序的 Version 8：

```hvml
<!-- Version 8 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines("Start of `Hello, world!`")

    <head>
        <update on "$TIMERS" to "unite">
            [
                { "id" : "foobar", "interval" : 500, "active" : "yes" },
            ]
        </update>
    </head>

    <body>

        <h1>我的第一个 HVML 程序</h1>
        <p>世界，您好！</p>

        <observe on $TIMERS for 'expired:foobar' >
            $STREAM.stdout.writelines('Timer foobar observed')

            <inherit>
                $STREAM.stdout.writelines($STR.join('Timer foobar expired: ', $DATETIME.fmttime('%H:%M:%S')))
            </inherit>
        </observe>
    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

如果您使用 `purc`  运行 Version 8，将获得以下输出：

```
$ purc hello-world-8.hvml
Start of `Hello, world!`
Timer foobar observed
End of `Hello, world!`
Timer foobar expired: 13:21:00
Timer foobar expired: 13:21:00
Timer foobar expired: 13:21:01
Timer foobar expired: 13:21:01
Timer foobar expired: 13:21:02
Timer foobar expired: 13:21:02
Timer foobar expired: 13:21:03
Timer foobar expired: 13:21:03
...
```

如果您没有使用 `Ctrl+C` 中断 HVML 程序的执行，该程序将不断打印带有当前时间的提示。

显然，这个版本激活了一个时间间隔约为 0.5 秒（500 毫秒）的定时器。

让我们更深入地研究这个版本的代码。在 Version 8 中，代码使用了两个新的动词元素。根据标签名和属性名，您可能有以下猜想：

1. 该 `update` 元素似乎用其内容中定义的数据更改了一个名为 `TIMERS` 的预定义变量。
2. 该 `observe` 元素似乎创建了一个监听器来监视名为 `expired:foobar` 的事件。

如果您更深入地查看代码，不难发现：

1. 该 `update` 元素会将内容（仅包含一个对象的数组）与现有数据 `TIMERS` 结合。
2. 数组中的对象似乎定义了一个标识符为 `foobar`，间隔为 `500` 的定时器。
3. 被 `observe` 元素监视的事件包含定时器的标识符(`foobar`)。

但是，您没有编写任何代码来创建和激活名为 `foobar` 的定时器。

实际上，在 HVML 中，您可以通过更改 `TIMERS` 表示的数据来创建、激活、停用或销毁定时器。您不需要调用方法来管理定时器。例如，如果您要删除定时器，只需删减 `TIMERS` 表示的数组中的成员：

```
<update on $TIMERS to "subtract" with { id : "foobar" } />
```

这再次体现了数据驱动编程的思想：直接更改数据，而不是调用方法来管理它们。

该版本还阐明了 HVML 中的事件驱动编程：我们在某个数据上监视特定的事件，然后通过一组通过 `observe` 元素定义的操作来处理该事件。

在 HVML 中，执行一个 HVML 程序可以分为两个阶段：

1. 第一阶段称为 `首轮执行阶段（the first round of run）`。在此阶段，程序以深度优先的顺序执行每个元素。对于任何 `observe` 元素，解释器都会为特定事件创建一个监听器，但会延迟 `observe` 元素定义的操作的执行。如果没有可监听的事件，程序将在第一轮运行后退出。

2. 第二阶段称为 `事件驱动阶段（the event-driven stage）`。在执行第一阶段之后，一旦被监听的事件到达，解释器将继续执行由相应的 `observe` 元素定义的操作组。HVML 程序一直在这个阶段运行，直到遇到未捕获的异常或 `exit` 元素为止。

因此，如果您没有中断执行，Version 8 将继续以当前的时间打印提示。

如果您想让程序优雅地退出，你可以这样修改：

```hvml
<!-- Version 9 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines("Start of `Hello, world!`")

    <head>
        <update on "$TIMERS" to "unite">
            [
                { "id" : "foobar", "interval" : 500, "active" : "yes" },
            ]
        </update>
    </head>

    <body>

        <h1>我的第一个 HVML 程序</h1>
        <p>世界，您好！</p>

        <init as "startTime" with $SYS.time />

        <observe on $TIMERS for 'expired:foobar' >
            $STREAM.stdout.writelines('Timer foobar observed')

            <inherit>
                $STREAM.stdout.writelines($STR.join('Timer foobar expired: ', $DATETIME.fmttime('%H:%M:%S')))
            </inherit>

            <test with $L.gt($EJSON.arith('-', $SYS.time, $startTime), 10) >
                <exit with "Ok" />
            </test>

        </observe>
    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

在此版本中，程序将当前时间与开始时间进行比较。当程序的执行时间（`$EJSON.arith('-', $SYS.time, $startTime)`）超过 10 秒（`$L.gt(..., 10)`）时，程序退出并返回结果 “Ok”。

如果您的 HVML 程序已连接到 HVML 渲染器，您可以观察 `$CRTN` 变量上的事件 `rdrState:pageClosed`。`$CRTN` 这一预定义变量代表了当前运行的 HVML 程序实例，也就是协程。这个事件意味着用户已经关闭了 HVML 渲染器为您的 HVML 协程创建的窗口，所以收到这个事件的时刻便是程序安全退出的最佳时机。

```hvml
    <observe on $CRTN for 'rdrState:pageClosed'>
        <exit with "Ok" />
    </observe>
```

有关详细信息，请参阅后续的 `连接到渲染器` 小节。

另外，HVML 提供了一个很有趣的功能：您可以观察表达式以了解求值结果的变化。例如，以下程序片段将一个表达式与名为 `rtClock` 的变量捆绑。在此之后，我们可以观察变量求值结果的变化。

```hvml
<bind on $SYS.time as "rtClock" />

<observe on "$rtClock" for "change">
   ...
</observe>
```

因为 `$SYS.time` 的求值结果是以秒为单位的 Unix 时间戳，所以 `observe` 元素中的操作将每秒执行一次。

## 模板和置换

现在，让我们考虑一个稍微复杂一点的示例，它会生成一个列出您的朋友的 HTML 文档。朋友由对象数组给出。数组中的每个对象都给出了一个朋友的一些属性，包括标识符、头像 URL、昵称、地区和年龄。

您可以使用一个 `init` 元素来准备朋友信息：

```hvml
    <init as "myFriends">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 }
        ]
</init>
```

如果您想根据朋友所在的地区显示不同的问候语。您可以通过以下方式编写生成显示您的朋友列表的代码：

```hvml
    <ul>
        <iterate on "$myFriends">
            <init as oneFriend with $? temp />

            <test on $?.region >

                <match for 'LIKE "zh*"' exclusively>
                    <li class="user-item" id="user-$oneFriend.id"
                            data-value="$oneFriend.id" data-region="$oneFriend.region">
                        <img class="avatar" src="$oneFriend.avatar" />
                        <span>您好，$oneFriend.name</span>
                    </li>
                </match>

                <match for 'ANY'>
                    <li class="user-item" id="user-$oneFriend.id"
                            data-value="$oneFriend.id" data-region="$oneFriend.region">
                        <img class="avatar" src="$oneFriend.avatar" />
                        <span>Hello, $oneFriend.name</span>
                    </li>
                </match>
            </test>

        </iterate>
</ul>
```

显然，这段代码很尴尬，尤其是当您的朋友来自世界各地时，因为您需要针对不同的语言进行多次复制和粘贴。

针对这种情况，HVML 为您提供了一种高效的方法：使用模板。

Version 10 提供了使用模板的完整 HVML 程序：

```hvml
<!-- Version 10 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">
  <body>

    <init as "myFriends">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 }
        ]
    </init>

    <init as "greetings">
        { "zh": "您好，", "en": "Hello, " }
    </init>

    <archetype name="friendItem">
        <li class="friend-item" id="friend-$?.id"
                data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.greeting$?.name</span>
        </li>
    </archetype>

    <ul class="friend-list">
        <iterate on "$myFriends">
            <init as oneFriend with $? temp />
            <update on $oneFriend to "merge" with { greeting: $greetings[$STR.substr($oneFriend.region, 0, 2)] } />

            <choose on $oneFriend>
                <update on $@ to "append" with $friendItem />
            </choose>
        </iterate>
    </ul>

  </body>
</hvml>
```

如果您使用 `purc` 运行 Version 10，您将获得以下结果：

```
$ purc -b hvml/hello-world-a.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-world-a.hvml`...

>> The document generated:
<html lang="en">
  <head>
  </head>
  <body>
    <ul class="friend-list">
      <li class="friend-item" id="friend-1" data-value="1" data-region="en_US">
        <img class="avatar" src="/img/avatars/1.png">
        <span>
          Hello, Tom
        </span>
      </li>

      <li class="friend-item" id="friend-2" data-value="2" data-region="zh_CN">
        <img class="avatar" src="/img/avatars/2.png">
        <span>
          您好，呼噜猫
        </span>
      </li>
    </ul>
  </body>
</html>

>> The executed result:
null
```

该版本展示了模板的使用方法。该 `archetype` 元素定义了一个模板，其中嵌入了一些 EJSON 表达式。解释器在使用模板时，会参考前置运算的执行结果，将其置换为求值结果。这里，前置运算的执行结果由 `choose` 元素的 `on` 属性给出。临时变量 `oneFriend` 表示的数据由 `init` 元素初始化，使用了一次迭代的执行结果，然后通过后续的 `update` 元素合并了一个新的属性 `greeting`。该属性的值又来自第二个 `init` 元素初始化的变量 `greetings`。

本质上，一个 `archetype` 元素定义了一个包含元素内容的变量。元素定义的内容将被置换，并且总是将字符串作为结果。然后 `update` 可以使用该字符串插入目标文档。

同样，HVML 也提供 `archedate` 标签来定义数据模板。当 `archedata` 模板被置换时，结果将是任何类型的数据而不是字符串。您可以使用结果数据插入容器或使用 `update` 元素替换容器的成员。

Version 11 提供了一个使用 `archedata` 元素的示例。它将对象数组转换为字符串数组：

```hvml
<!-- Version 11 -->

<hvml target="void" lang="$STR.substr($SYS.locale, 0, 2)">
  <body>

    <init as "myFriends">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 }
        ]
    </init>

    <init as "greetings">
        { "zh": "您好，", "en": "Hello, " }
    </init>

    <init as "countries">
        { "CN": "中国", "US": "美国" }
    </init>

    <archedata name="friendLine">
        "$?.greeting $?.name: you come from $?.country"
    </archedata>

    <init as "friendList" with [] />

    <iterate on $myFriends>
        <init as oneFriend with $? temp />
        <update on $oneFriend to "merge" with { greeting: $greetings[$STR.substr($oneFriend.region, 0, 2)] } />
        <update on $oneFriend to "merge" with { country: $countries[$STR.substr($oneFriend.region, 3, 2)] } />

        <choose on $oneFriend>
            <update on $friendList to "append" with $friendLine />
        </choose>
    </iterate>

    <!-- output the friend list to stdout -->
    $STREAM.stdout.writelines("My Friends:")
    <iterate on $friendList >
        $STREAM.stdout.writelines($?)
    </iterate>

  </body>
</hvml>
```

这是您使用 `purc` 运行时 Version 11 的输出：

```
$ purc -b hvml/hello-world-b.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-world-b.hvml`...
My Friends:
Hello,  Tom: you come from 美国
您好， 呼噜猫: you come from 中国

>> The document generated:


>> The executed result:
null
```

## 变量和闭包

### 静态变量与临时变量

您已多次使用该 `init` 标签。正如标签名称所暗示的那样，`init` 元素初始化数据并用名称绑定数据。您可以使用 `init` 元素的 `with` 属性来指定表达式，表达式的计算结果将是绑定到变量的数据。您还可以使用 `init` 元素的内容来指定复杂的 EJSON 表达式。您还看到我们在 `init` 元素中使用了称为 `temporarily` 或 `temp` 的副词属性：

```hvml
    <init as "friendList" with [] />

    <iterate on $myFriends>
        <init as oneFriend with $? temp />
        <update on $oneFriend to "merge" with { greeting: $greetings[$STR.substr($oneFriend.region, 0, 2)] } />
        <update on $oneFriend to "merge" with { country: $countries[$STR.substr($oneFriend.region, 3, 2)] } />

        <choose on $oneFriend>
            <update on $friendList to "append" with $friendLine />
        </choose>
</iterate>
```

您可以很容易地理解，通过使用副词属性 `temp`，您将创建一个临时变量。在执行了 `init` 元素所在的子树中的所有操作后，该变量将自动删除。也就是说，在上面的 HVML 片段中，临时变量 `oneFrind` 仅可用于 `iterate` 元素中的操作。

相反，在 HVML 程序退出之前，`friendList` 变量始终可用。我们称这些变量为 `静态变量（static variables）`。

但是，与其他编程语言不同，HVML 允许您删除变量。为此，您可以使用 `undefined` 重置变量。

请看以下 HVML 片段和注释：

```hvml
...
    <body id='theBody' >

        <!-- 这将使用数组 $users 初始化 -->
        <init as 'users'>
            [
                { "id": "1", "avatar": "/img/avatars/101.png", "name": "Jerry", "region": "en_US" }
                { "id": "2", "avatar": "/img/avatars/102.png", "name": "Tom", "region": "en_US" }
                { "id": "3", "avatar": "/img/avatars/103.png", "name": "Mike", "region": "en_US" }
            ]
        </init>

        <!-- 这重置 $users 为一个空数组 -->
        <init as 'users' with [] />

        <!-- 这移除 $users 这一变量 -->
        <init as 'users' with undefined />

     </body>
...
```

### 集合

如果您熟悉 Python，那您一定知道我们可以在 Python 中创建一个集合来管理具有唯一值的成员。

HVML 也提供对集合的支持，但比其他语言有更多的特性。在 HVML 中，以类似 Python 的方式创建的集合称为一般集合。但您可以基于对象创建集合，并在对象的某些属性上指定唯一性条件。这个特性给了我们一个惊人的能力：我们可以像管理数据库表一样的管理数据，比如设置一个或多个列作为表的主键。

要初始化一个集合，请使用 `init` 标签称为 `uniquely` 的副词属性。如果要为集合指定唯一键，请使用称为 `against` 的介词属性。例如，下面的 HVML 代码初始化一个静态变量 `myFriends`，它是一个具有唯一键的集合，称为 `id`：

```hvml
    <init as "myFriends" uniquely against "id">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 4 }
        ]
    </init>
```

该 `init` 元素将使用在内容中定义的数组中的成员来创建集合。您应该注意到了，数组中有一个具有相同 `id` 值的重复成员。因此，使用这个数组初始化一个集合会导致失败，因为来源数据破坏了集合的一致性约束，结果就会出现异常。

但是，在大多数情况下，您可能只想忽略该异常，并用新数据置换旧数据。为此，可以使用副词属性 `silently`。

```hvml
    <init as "myFriends" uniquely against "id" silently>
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 4 }
        ]
</init>
```

执行 `init` 元素后，`$myFriends` 集合中的成员将是：

```hvml
    [
        { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
            "region": "en_US", "age": 2 },
        { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
            "region": "zh_CN", "age": 4 }
]
```

也就是说，数组中的第二个成员将被第三个成员替换。所以，最终集合中只有两个成员。

### 变量范围

在 HVML 中，当您使用 `init` 元素创建静态变量时，它将对该 `init` 元素的父元素定义的子树中的任何元素可见。实际上，解释器将变量绑定到父元素。所以当元素后面的 `init` 元素引用变量时，解释器可以立即找到它。

请看以下代码片段和其中的注释：

```hvml
...
    <body id='theBody' >

        <!-- 这将在父元素 'body' 处初始化 $users -->
        <init as 'users' uniquely against 'id'>
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <div>
            <!-- 这个元素引用 'body' 元素作用域的 $users -->
            <choose on $users>
                ...
            </choose>

            <!-- 这将在父元素 'div' 处初始化 $users -->
            <init as 'users'>
                [
                    { "id": "1", "avatar": "/img/avatars/101.png", "name": "Jerry", "region": "en_US" }
                    { "id": "2", "avatar": "/img/avatars/102.png", "name": "Tom", "region": "en_US" }
                    { "id": "3", "avatar": "/img/avatars/103.png", "name": "Mike", "region": "en_US" }
                ]
            </init>

            <!-- 这个元素将应用父元素 'div' 上的 $users，而不是 `body` 元素上的同名变量 -->
            <iterate on $users>
                ...
            </iterate>

            <!-- 这会将祖先 'body' 元素上的 $users 重置为 'null' -->
            <init as 'users' at '#theBody' with null />

        </div>


        <!-- 这会将父元素 'body' 的 $users 重置为一个空数组 -->
        <init as 'users' with [] />

        <!-- 这将删除父元素 'body' 中的 $users -->
        <init as 'users' with undefined />

     </body>
...
```

我们使用父元素来定义变量的范围。我们经常说变量的作用域是特定元素。事实上，如果解释器没有在父元素中找到变量，它会一直在祖先元素中寻找它，直到根元素。

例如，上面代码中的 `iterate` 元素将使用 `$users`，它的作用域是父元素 `div`，而不是具有相同名称的 `body` 元素。

如果要初始化或重置作用域为祖先元素的 `$users`，可以使用 `init` 元素中的 `at` 属性。在上面的代码中，我们使用 `at '#theBody'` 明确指定 `$users` 的作用域。

在 HVML 程序中，您还可以引用由前置操作定义的临时变量。解释器会首先将根元素 ( `hvml`) 压入栈，因此根元素始终对应最顶层的栈帧，并在执行子元素时将其压入新的栈帧。如果没有子元素可以执行，解释器将弹出当前元素对应的栈帧，并尝试执行当前元素的一个兄弟元素。

所有临时变量都驻留在其相应的栈帧中。当解释器执行一个元素时，该元素定义的表达式可以引用驻留在前置栈帧中的任何临时变量。一般在使用 `$?` 时，您引用的是上一个栈帧的执行结果，并且可以通过在 `$` 和 `?` 之间插入数字 `2`（`$2?`）来访问上上一个栈帧的执行结果。

对于前置栈帧中的任何已命名的临时变量，我们可以使用 `$<N>!.<var_name>` 模式来引用它们。您甚至可以使用数字 `0` 访问在执行当前元素时对上下文变量的求值结果。实际上，上下文变量的默认用法，例如 `$?` 相当于 `$1?`：我们只是省略了 `$` 和 `?` 之间的数字 `1`。

### 就地执行或调用

与其他编程语言一样，HVML 也支持调用函数之类的操作。但是，在 HVML 中，我们从不使用 `函数（function）` 这个术语，而是使用术语 `操作组（operation group）`。在 HVML 中，我们可以引用 DOM 树中的任何子树当作操作组。比如稍早前提到的 `observe` 标签定义了一个操作组，它将在解释器得到指定的事件后执行。您可以使用动词标签 `define` 来定义一个已命名的操作组。同样，您可以使用该 `as` 属性来命名操作组。此外，HVML 提供了两种使用已命名操作组的方法： `include` 或 `call`。

下面的 HVML 程序（最大公约数）给出了一个示例，它定义了一组运算来计算两个正整数的最大公约数：

```hvml
<!-- Greatest Common Divisor -->

<!DOCTYPE hvml>
<hvml target="void">

    <define as "calcGreatestCommonDivisor">
        <test with $L.or($L.le($x, 0), $L.le($y, 0)) >
            <return with undefined />
        </test>

        <!-- 我们使用复合 EJSON 表达式来获得类似 C 语言表达式 `(x > y) ? x : y` 的效果 -->
        <init as "big" with {{ $L.gt($x, $y) && $x || $y }} temp />
        <init as "small" with {{ $L.lt($x, $y) && $x || $y }} temp />

        <test with $L.eq($EJSON.arith('%', $big, $small), 0) >
            <return with $small />
        </test>

        <!-- 注意，'$0<'  指的是在当前栈帧中的上下文变量 '<' -->
        <iterate on $EJSON.arith('/', $small, 2) onlyif $L.gt($0<, 0)
                with $EJSON.arith('-', $0<, 1) nosetotail >

            <test with $L.eval('a == 0 && b == 0',
                    { a: $EJSON.arith('%', $big, $?),
                      b: $EJSON.arith('%', $small, $?) }) >
                <return with $? />
            </test>

        </iterate>

        <return with 1L />

    </define>

    <call on $calcGreatestCommonDivisor with { x: 3L, y: 6L } >
        <exit with $? />
    </call>

</hvml>
```

上面的程序说明了类似其他传统编程语言调用一个函数的经典实现。

很明显，您可以使用 `call` 元素的 `with` 属性来定义参数，这些参数将传递给操作组。在这里，我们使用一个对象指定了两个整数。

与传统的函数调用一样，HVML 解释器会将通过 `with` 属性传递的数据压入执行栈。然后，该数据将成为已命名操作组中第一个元素的结果数据。在执行已命名操作组中的第一个元素时，我们可以通过上下文变量 `?` 引用这个数据。

因此，在求解最大公约数的示例中，我们可以通过表达式 `$?.x` 和 `$?.y` 来引用操作组中的参数。但是，代码使用了 `$x` 和 `$y`。这是因为如果您将对象作为参数传递，如果属性名称是有效的变量名称，解释器将自动为对象中的每个属性设置一个命名的临时变量。这为开发者提供了一定的便利。

除了传统的类函数调用之外，HVML 还提供了一种称为 `就地执行（execute in place）` 的特殊编程模式来使用操作组。例如：

```hvml
    <!-- 该操作组生成 HTML 片段 -->
    <define as "output_html">
        <h1>HVML</h1>
        <p>$?</p>
    </define>

    <!-- 此操作组将文本打印到终端 -->
    <define as "output_void">
        <inherit>
            $STREAM.stdout.writelines($?)
        </inherit>
    </define>

    <!-- 根据当前 HVML 协程的目标文档类型，
        使用 `include` 元素就地执行上述操作组之一 -->
<include with ${output_$CRTN.target} on 'Hello, world!' />
```

这里，根据表达式 `${output_$CRTN.target}` 的求值结果，`include` 元素使用操作组 `output_html` 或 `output_void`。

如果这个 HVML 程序的目标文档类型为 `hvml`，则上面的 `include` 元素等价于以下元素：

```hvml
    <choose on 'Hello, world!' >
        <h1>HVML</h1>
        <p>$?</p>
    </choose>
```

如果此 HVML 程序的目标文档类型为 `void`，则上述 `include` 元素等价于以下元素：

```hvml
    <choose on 'Hello, world!' >
        <inherit>
            $STREAM.stdout.writelines($?)
        </inherit>
    </choose>
```

如果我们在命名操作组中使用命名变量，变量所引用的实际数据取决于调用或包含操作组的位置。因此，操作组和它被使用时可见的不同变量集合组成了不同的闭包。

请参阅以下 HVML 代码片段和其中的注释：

```hvml
        <archetype name="dir_entry">
            <item class="$?.type">Name: $?.name</item>
        </archetype>

        <define as "fillDirEntries">
            <!-- 打开目录 -->
            <choose on $FS.opendir($?) >

                <!-- 使用表达式 `$?.read()` 进行迭代，
                    该表达式将在到达目录流的末尾时返回 `false`. -->
                <iterate with $?.read() >
                    <!-- `update` 元素使用的实际模板
                         取决于调用或包含此操作组的时的执行位置 -->
                    <update on $@ to "append" with $dir_entry />
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <!-- 此 `dir_entry` 模板在目录条目名称之前添加 `/home/` 前缀。 -->
            <archetype name="dir_entry">
                <item class="$?.type">/home/$?.name</item>
            </archetype>

            <!-- 操作组 $fillDirEntries 将使用兄弟 `archetype` 定义的模板 -->
            <include with $fillDirEntries on "/home" in "#entries" />
        </listbox>

        <observe on "#goRoot" for "click">
            <clear on "#entries" />

            <!-- 操作组 $fillDirEntries 将使用此片段中
                 第一个 `archetype` 元素定义的模板 -->
            <include with $fillDirEntries on "/" in "#entries" />
        </observe>
```

## 协程和并发

与其他编程语言不同，HVML 提供了对协程的更简单支持。

例如，Versoin 12 是经过修订的 `Hello, world!` 程序。它打印 10 次 `您好，世界：台湾是中国不可分割的一部分`。

```hvml
<!-- Versoin 12 -->

<!DOCTYPE hvml>
<hvml target="void">
    <iterate on 0 onlyif $L.lt($0<, 10) with $EJSON.arith('+', $0<, 1) nosetotail >
        $STREAM.stdout.writelines("$0<) 您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE-$CRTN.cid")
    </iterate>
</hvml>
```

假设您将此版本命名为 `hello-world-c.hvml`，我们可以通过指定命令行标志 `-l` 将程序作为两个协程并行运行：

```
$ purc -l hello-world-c.hvml hello-world-c.hvml
```

您将在终端上看到以下输出：

```
0)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
0)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
1)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
1)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
2)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
2)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
3)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
3)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
4)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
4)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
5)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
5)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
6)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
6)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
7)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
7)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
8)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
8)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
9)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #3
9)您好，世界：台湾是中国不可分割的一部分——来自 HVML COROUTINE #4
```

在上面的输出中，`HVML COROUTINE #3` 和 `HVML COROUTINE #4` 包含解释器为两个正在运行的程序实例分配的协程标识符。您可以看到，PurC 会调度正在运行的实例轮流执行，即以协程的方式。您不需要显式使用任何 `yield` 元素。事实上，HVML 中根本没有 `yield` 标签。

在 HVML 程序中，您可以轻松地创建一个新的并行执行的协程。为此，您可以使用 `load` 标签或 `call` 标签。

以下名为 `Load String HVML` 的程序异步加载由字符串指定的 HVML 程序。之后，它会观察 `$newCrtn` 上的事件 `corState:exited` 以等待新协程的退出。当事件到达时，程序以事件的附加数据退出。实际上，事件的附加数据 `corState:exited` 是新协程的执行结果。

```
<!-- Load String HVML -->

<hvml target="void">

    <init as "request">
        {
            hvml: '<hvml target="html"><body><h1>$REQ.text</h1><p>$REQ.hvml</p></body>"success"</hvml>',
            text: "Hello, world!",
        }
    </init>

    <!-- 我们使用内容数据而不是 ' with ' 属性 -->
    <load on "$request.hvml" as "newCrtn" onto="_null" async >
        $request
    </load>

    <!-- 我们观察到corState:exited事件 -->
    <observe on $newCrtn for="corState:exited">
        <exit with $? />
    </observe>

</hvml>
```

这是字符串定义的 HVML 程序对应的美化版本，以方便您阅读：

```hvml
<hvml target="html">
    <body>
        <h1>$REQ.text</h1>
        <p>$REQ.hvml</p>
    </body>

    "success"
</hvml>
```

上面的程序生成了一个简单的 HTML 文档，其执行结果是 `success` 字符串。

如果您使用 `purc` 运行加载字符串 HVML，您会得到以下结果:

```
$ purc -b hvml/load-string-hvml.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/load-string-hvml.hvml`...

A child coroutine exited.
>> The document generated:
<html>
  <head>
  </head>
  <body>
    <h1>
      Hello, world!
    </h1>
    <p>
      &lt;hvml target=&quot;html&quot;&gt;&lt;body&gt;&lt;h1&gt;$REQ.text&lt;/h1&gt;&lt;p&gt;$REQ.hvml&lt;/p&gt;&lt;/body&gt;&quot;success&quot;&lt;/hvml&gt;
    </p>
  </body>
</html>

>> The executed result:
"success"

The main coroutine exited.
>> The document generated:

>> The executed result:
"success"
```

您可以看到，子协程与生成的简单 HTML 文档一起退出，然后子协程的执行结果被传递给了主协程，随后主协程输出同样的结果。

您可以使用 `load` 元素创建当前 HVML 程序的另一个协程。请参阅以下名为 `Load Another Body`.

在这个程序中，我们同步加载当前 HVML 程序的另一个主体。

```
<!-- Load Another Body -->

# RESULT: 'failure'

<hvml target="void">
    <body>

        <load from "#errorPage" onto "_null">
            <exit with $? />
        </load>

    </body>

    <body id="errorPage">

        <p>We encountered a fatal error!</p>
        <exit with "failure" />

    </body>
</hvml>
```

另一种创建新协程的方法是使用 `call` 元素。在 HVML 中，我们赋予 `call` 元素更多的功能。我们不仅可以创建一个协程来执行操作组，还可以创建一个新的解释器实例（对于 PurC，它是一个线程）来执行操作组。在 HVML 中，我们将这一方式命名为`并发调用（call concurrently）`。

以下名为 `Call Concurrently` 的程序同时异步调用操作组。请注意，我们使用 `within `属性来指定一个新的行者（对应一个解释器实例）。如果不存在这样的行者来执行操作组，解释器将在新的系统线程中创建一个新的解释器实例。

操作组通过一个 `sleep` 元素模拟耗时任务，并在唤醒后对数学表达式求值。最后，它返回数学表达式的求值结果作为操作组的返回值。

为了让大家看到并发的效果，主协程观察 `$CRTN` 上的 `idle` 事件，并连续打印当前时间。主协程还在一个变量上观察 `callState:success` 事件，该变量表示在另一个解释器实例中运行的子协程。一旦事件到达，主协程用并发调用的返回值作为结果退出。

```
# RESULT: 15

<!-- Call Concurrently -->
<!DOCTYPE hvml SYSTEM "v: MATH">
<hvml target="void">

    <define as "aTimeConsumingTask">
        <sleep for "5s" />
        <return with $MATH.eval($?) />
    </define>

    <call on $aTimeConsumingTask as "myTask" within "newRunner" with "5 * 3" concurrently asynchronously />

    <observe on $CRTN for "idle">

        <inherit>
            $STREAM.stdout.writelines($DATETIME.fmttime('%H:%M:%S'))
        </inherit>
    </observe>

    <observe on $myTask for "callState:success">
        <exit with $? />
    </observe>
</hvml>
```

当您使用 `purc` 运行这个程序时，您会得到以下输出：

```
$ purc -b hvml/call-concurrently.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/call-concurrently.hvml`...
17:45:48
17:45:48
17:45:48

...

17:45:53
17:45:53
17:45:53
17:45:53
17:45:53

The main coroutine exited.
>> The document generated:

>> The executed result:
15
````

