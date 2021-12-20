# HVML 预定义变量

Subject: HVML Predefined Variables  
Version: 1.0  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: Nov. 1, 2021  
Status: Proposal  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2021 北京飞漫软件技术有限公司  
保留所有权利

此文档不受 HVML 相关软件开源许可证的管辖。

飞漫软件公开此文档的目标，用于向开发者解释 HVML 相关设计原理或者相关规范。在未获得飞漫软件书面许可之前，任何人不得复制或者分发本文档的全部或部分内容，或利用本文档描绘的技术思路申请专利、撰写学术论文等。

本文提及的飞漫软件或其合作伙伴的注册商标或商标之详细列表，请查阅文档末尾。

**目录**

[//]:# (START OF TOC)

- [1) 背景](#1-背景)
- [2) 非动态变量](#2-非动态变量)
   + [2.1) `TIMERS`](#21-timers)
      * [2.1.1) 批量新增定时器](#211-批量新增定时器)
      * [2.1.2) 新增一个定时器](#212-新增一个定时器)
      * [2.1.3) 移除一个定时器](#213-移除一个定时器)
      * [2.1.4) 修改特定定时器的属性](#214-修改特定定时器的属性)
   + [2.2) `REQUEST`](#22-request)
- [3) 必要动态变量](#3-必要动态变量)
   + [3.1) `SESSION`](#31-session)
      * [3.1.1) `cwd` 方法](#311-cwd-方法)
      * [3.1.2) `user` 方法](#312-user-方法)
   + [3.2) `SYSTEM`](#32-system)
      * [3.2.1) `uname` 方法](#321-uname-方法)
      * [3.2.2) `uname_prt` 方法](#322-uname_prt-方法)
      * [3.2.3) `locale` 方法](#323-locale-方法)
      * [3.2.4) `random` 方法](#324-random-方法)
      * [3.2.5) `time` 方法](#325-time-方法)
      * [3.2.6) `env` 方法](#326-env-方法)
   + [3.3) `HVML`](#33-hvml)
      * [3.3.1) `base` 方法](#331-base-方法)
      * [3.3.2) `maxIterationCount` 方法](#332-maxiterationcount-方法)
      * [3.3.3) `maxRecursionDepth` 方法](#333-maxrecursiondepth-方法)
   + [3.4) `DOC`](#34-doc)
      * [3.4.1) `doctype` 方法](#341-doctype-方法)
      * [3.4.2) `query` 方法](#342-query-方法)
   + [3.5) `EJSON`](#35-ejson)
      * [3.5.1) `type` 方法](#351-type-方法)
      * [3.5.2) `count` 方法](#352-count-方法)
      * [3.5.3) `numberify` 方法](#353-numberify-方法)
      * [3.5.4) `booleanize` 方法](#354-booleanize-方法)
      * [3.5.5) `stringify` 方法](#355-stringify-方法)
      * [3.5.6) `serialize` 方法](#356-serialize-方法)
      * [3.5.7) `sort` 方法](#357-sort-方法)
      * [3.5.8) `compare` 方法](#358-compare-方法)
   + [3.6) `L`](#36-l)
      * [3.6.1) `not` 方法](#361-not-方法)
      * [3.6.2) `and` 方法](#362-and-方法)
      * [3.6.3) `or` 方法](#363-or-方法)
      * [3.6.4) `xor` 方法](#364-xor-方法)
      * [3.6.5) `eq` 方法](#365-eq-方法)
      * [3.6.6) `ne` 方法](#366-ne-方法)
      * [3.6.7) `gt` 方法](#367-gt-方法)
      * [3.6.8) `ge` 方法](#368-ge-方法)
      * [3.6.9) `lt` 方法](#369-lt-方法)
      * [3.6.10) `le` 方法](#3610-le-方法)
      * [3.6.11) `streq` 方法](#3611-streq-方法)
      * [3.6.12) `strne` 方法](#3612-strne-方法)
      * [3.6.13) `strgt` 方法](#3613-strgt-方法)
      * [3.6.14) `strge` 方法](#3614-strge-方法)
      * [3.6.15) `strlt` 方法](#3615-strlt-方法)
      * [3.6.16) `strle` 方法](#3616-strle-方法)
      * [3.6.17) `eval` 方法](#3617-eval-方法)
   + [3.7) `T`](#37-t)
      * [3.7.1) `map` 静态属性](#371-map-静态属性)
      * [3.7.2) `get` 方法](#372-get-方法)
   + [3.8) `STR`](#38-str)
      * [3.8.1) `contains` 方法](#381-contains-方法)
      * [3.8.2) `ends_with` 方法](#382-ends_with-方法)
      * [3.8.3) `explode` 方法](#383-explode-方法)
      * [3.8.4) `implode` 方法](#384-implode-方法)
      * [3.8.5) `shuffle` 方法](#385-shuffle-方法)
      * [3.8.6) `replace` 方法](#386-replace-方法)
      * [3.8.7) `format_c` 方法](#387-format_c-方法)
      * [3.8.8) `format_p` 方法](#388-format_p-方法)
      * [3.8.9) `strcat` 方法](#389-strcat-方法)
      * [3.8.10) `strlen` 方法](#3810-strlen-方法)
      * [3.8.11) `lower` 方法](#3811-lower-方法)
      * [3.8.12) `upper` 方法](#3812-upper-方法)
- [4) 可选动态变量](#4-可选动态变量)
   + [4.1) `MATH`](#41-math)
      * [4.1.1) `pi` 方法](#411-pi-方法)
      * [4.1.2) `e` 方法](#412-e-方法)
      * [4.1.3) `const` 方法](#413-const-方法)
      * [4.1.4) `add` 方法](#414-add-方法)
      * [4.1.5) `sub` 方法](#415-sub-方法)
      * [4.1.6) `mul` 方法](#416-mul-方法)
      * [4.1.7) `div` 方法](#417-div-方法)
      * [4.1.8) `eval` 和 `eval_l` 方法](#418-eval-和-eval_l-方法)
      * [4.1.9) `sin` 和 `sin_l` 方法](#419-sin-和-sin_l-方法)
      * [4.1.10) `cos` 和 `cos_l` 方法](#4110-cos-和-cos_l-方法)
      * [4.1.11) `tan` 和 `tan_l` 方法](#4111-tan-和-tan_l-方法)
      * [4.1.12) `sinh` 和 `sinh_l` 方法](#4112-sinh-和-sinh_l-方法)
      * [4.1.13) `cosh` 和 `cosh_l` 方法](#4113-cosh-和-cosh_l-方法)
      * [4.1.14) `tanh` 和 `tanh_l` 方法](#4114-tanh-和-tanh_l-方法)
      * [4.1.15) `asin` 和 `asin_l` 方法](#4115-asin-和-asin_l-方法)
      * [4.1.16) `acos` 和 `acos_l` 方法](#4116-acos-和-acos_l-方法)
      * [4.1.17) `atan` 和 `atan_l` 方法](#4117-atan-和-atan_l-方法)
      * [4.1.18) `asinh` 和 `asinh_l` 方法](#4118-asinh-和-asinh_l-方法)
      * [4.1.19) `acosh` 和 `acosh_l` 方法](#4119-acosh-和-acosh_l-方法)
      * [4.1.20) `atanh` 和 `atanh_l` 方法](#4120-atanh-和-atanh_l-方法)
      * [4.1.21) `fmod` 和 `fmod_l` 方法](#4121-fmod-和-fmod_l-方法)
      * [4.1.22) `fabs` 方法](#4122-fabs-方法)
      * [4.1.23) `log` 和 `log_l` 方法](#4123-log-和-log_l-方法)
      * [4.1.24) `log10` 和 `log10_l` 方法](#4124-log10-和-log10_l-方法)
      * [4.1.25) `pow` 和 `pow_l` 方法](#4125-pow-和-pow_l-方法)
      * [4.1.26) `exp` 和 `exp_l` 方法](#4126-exp-和-exp_l-方法)
      * [4.1.27) `floor` 和 `floor_l` 方法](#4127-floor-和-floor_l-方法)
      * [4.1.28) `ceil` 和 `ceil_l` 方法](#4128-ceil-和-ceil_l-方法)
      * [4.1.29) `sqrt` 和 `sqrt_l` 方法](#4129-sqrt-和-sqrt_l-方法)
      * [4.1.30) 错误与异常](#4130-错误与异常)
   + [4.2) `FS`](#42-fs)
      * [4.2.1) `list` 方法](#421-list-方法)
      * [4.2.2) `list_prt` 方法](#422-list_prt-方法)
      * [4.2.3) 其他](#423-其他)
   + [4.3) `FILE`](#43-file)
      * [4.3.1) 文本文件](#431-文本文件)
         - [4.3.1.1) `txt.head` 方法](#4311-txthead-方法)
         - [4.3.1.2) `txt.tail` 方法](#4312-txttail-方法)
      * [4.3.2) 二进制文件](#432-二进制文件)
         - [4.3.2.1) `bin.head` 方法](#4321-binhead-方法)
         - [4.3.2.2) `bin.tail` 方法](#4322-bintail-方法)
      * [4.3.3) 流式读写](#433-流式读写)
         - [4.3.3.1) 二进制结构表示法](#4331-二进制结构表示法)
         - [4.3.3.2) `stream.open` 方法](#4332-streamopen-方法)
         - [4.3.3.3) `stream.readstruct` 方法](#4333-streamreadstruct-方法)
         - [4.3.3.4) `stream.writestruct` 方法](#4334-streamwritestruct-方法)
         - [4.3.3.5) `stream.readlines` 方法](#4335-streamreadlines-方法)
         - [4.3.3.6) `stream.writelines` 方法](#4336-streamwritelines-方法)
         - [4.3.3.7) `stream.readbytes` 方法](#4337-streamreadbytes-方法)
         - [4.3.3.8) `stream.writebytes` 方法](#4338-streamwritebytes-方法)
         - [4.3.3.9) `stream.seek` 方法](#4339-streamseek-方法)
- [附录](#附录)
   + [附.1) 贡献者榜单](#附1-贡献者榜单)
   + [附.2) 商标声明](#附2-商标声明)
   + [附.3) 废弃或待定的内容](#附3-废弃或待定的内容)

[//]:# (END OF TOC)

## 1) 背景

本文档是 HVML 规范的一部分，用于详细定义 HVML 解释器必须支持或者可选支持的预定义变量。

本文档遵循的技术规范或术语如下所列：

- HVML（Hybrid Virtual Markup Language），是飞漫软件提出的一种数据驱动的可编程标记语言，其规范见：<https://gitlab.fmsoft.cn/hvml/hvml-docs/blob/master/zh/hvml-spec-v1.0-zh.md>。HVML 规范文档的如下部分和本文档相关：
  1. 2.1) 术语及基本原理
  1. 2.2) 规则、表达式及方法的描述语法
- 解释器（interpreter），指解析并运行 HVML 程序的计算机软件。
- 渲染器（renderer），指渲染 HVML 程序生成的目标文档并和用户交互的计算机软件。
- 文档（document），特指人类可读的文本形式保存的 HVML 程序。
- 会话（session），指一个解释器实例的上下文信息；每个解释器实例对应一个 HVML 会话，每个 HVML 会话运行多个 HVML 文档，对应渲染器中的多个窗口。
- 静态属性（static property），指一个对象上键值为普通数据的属性，其键值不是动态值。
- 方法（method），指一个对象上键值为动态值的属性，对应于非动态数据。
- 获取器（getter），指一个方法的获取器。调用获取器返回该方法的动态属性值。
- 设置器（setter），指一个方法的设置器。调用特定方法的设置器，将完成对应属性的设置工作。

按是否含有动态对象划分，HVML 程序中的预定义变量可分为：

1. 非动态变量，即变量对应的数据不提供动态方法。所有本规范定义的非动态变量都是内置（built-in）且必要的（required）。
1. 动态变量，即变量对应的数据提供动态方法。动态变量又分为必要（required）动态变量及可选（optional）动态变量。通常，动态变量可设计为可加载的（loadable）共享库或者模块。解释器应根据本文档的要求将动态变量实现为内置的或可加载的；可选动态变量是否实现为可加载的，由解释器决定。

按变量对应数据的作用域，可分为：

1. 会话级变量。指该变量对应的数据对当前实例中的所有 HVML 文档可见。也就是说，同一会话中的不同文档对应同一个数据副本。
1. 文档级变量。指该变量对应的数据仅对当前实例中的单个 HVML 文档可见。也就是说，不同的文档有一个自己的数据副本。

**约定**  
解释器可自行实现全局变量，作为约定，解释器自行实现的全局变量，其名称应以 ASCII U+005F LOW LINE（`_`）打头，使用全大写字母并添加解释器前缀。如 `_PURC_VAR`。而一般的变量，使用全小写字母。

## 2) 非动态变量

### 2.1) `TIMERS`

`TIMERS` 是一个文档级内置变量。该变量是一个对象集合（对象的 `id` 属性做唯一性键值）。

用于描述一个定时器对象的属性如下：

```
{
    id: <string: the timer identifier, the key with unique restriction>,
    interval: <string: the interval of the timer in milliseconds>,
    active: <string: activated or not>,
}
```

该变量用于定义定时器，其上不提供动态方法；程序通过 `update` 元素修改该变量对应的容器数据来操作定时器。

#### 2.1.1) 批量新增定时器

```html
    <update on="$TIMERS" to="unite">
        [
            { "id" : "foo", "interval" : 1000, "active" : "no" },
            { "id" : "bar", "interval" : 2000, "active" : "no" },
        ]
    </update>
```


#### 2.1.2) 新增一个定时器

```html
    <update on="$TIMERS" to="append">
        { "id" : "foobar", "interval" : 3000, "active" : "yes" }
    </update>
```

#### 2.1.3) 移除一个定时器

```html
    <update on="$TIMERS" to="subtract">
        { "id" : "foobar" }
    </update>
```

#### 2.1.4) 修改特定定时器的属性

```html
    <!-- activate the timer `foo` -->
    <choose on="$TIMERS" by="FILTER: AS 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>
```

或，

```html
    <update on="$TIMERS" to="overwrite">
        { "id" : "foo", "interval": 1500, "active" : "yes" }
    </update>
```

### 2.2) `REQUEST`

`REQUEST` 是一个文档级内置变量。该变量用来保存装载一个 HVML 程序时传递给该程序的请求参数，以对象形式保存。

比如下面的 Python 脚本装载一个 HVML 文档，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在 HVML 文档中，我们可使用 `$REQUEST.nrUsers` 来引用上述脚本代码传入的数值（`10`）。

## 3) 必要动态变量

### 3.1) `SESSION`

该变量是一个会话级内置变量，解释器在创建一个新的会话时，会自动创建并绑定。该变量主要用于会话相关的信息，并提供给用户在当前会话的不同 HVML 文档之间共享数据的机制。该变量提供如下接口：

#### 3.1.1) `cwd` 方法

获取或设置当前工作路径。

```php
// 原型：获取当前工作路径
$SESSION.cwd: string

// 原型：改变当前工作路径
$SESSION.cwd(! <string: new path for the current working directory> ): boolean
```

该方法可能产生的异常：

- `AccessDenied`
- `IOError`
- `TooMany`
- `TooLong`
- `NotDesiredEntity`
- `OSError`

#### 3.1.2) `user` 方法

获取或设置用户键值对。

```php
// 原型：获取指定键名对应的键值；未设置时抛出异常 `KeyError`
$SESSION.user( <string: the user defined key name> ): any

// 原型：设置指定键名的值，返回布尔数据，指明是否覆盖了已有键值。
$SESSION.user(! <string: the user defined key name>, <any: the new variant value> ): boolean

// 示例：设置 `userId` 为 `20211104-01`
$SESSION.user(! 'userId', '20211104-01' )

// 示例：获取 `userId` 对应的键值
$SESSION.user('userId')
```

该方法可能产生的异常：

- `KeyError`

### 3.2) `SYSTEM`

该变量是会话级内置变量，在初始化解释器实例之后绑定。该变量提供如下接口：

#### 3.2.1) `uname` 方法

该方法获取系统信息，返回包含有内核名称、版本号等键值对的对象：

```php
// 原型：获取系统信息
$SYSTEM.uname: object

// 示例：
$SYSTEM.uname
```

`uname` 方法返回的对象，包含如下键值对：

```javascript
{
    kernel-name:    <string: kernel name (e.g., `Linux`)>,
    kernel-release: <string: kernel release (e.g., `2.6.28`)>,
    kernel-version: <string: kernel version>,
    nodename:       <string: the network node hostname>,
    machine:        <string: machine hardware name>,
    processor:      <string: the processor type>,
    hardware-platform:  <string: the hardware platform>,
    operating-system:   <string: the operating system (e.g., `GNU/Linux`)>,
}
```

#### 3.2.2) `uname_prt` 方法

获取可打印的系统信息，返回字符串：

```php
// 原型：获取内核名称；默认行为
$SYSTEM.uname_prt: string

// 原型：获取系统指定部分的名称
$SYSTEM.uname_prt('[kernel-name || kernel-release || kernel-version || nodename || machine || processor || hardware-platform || operating-system] | all | default')

// 示例：获取内核名称及版本号
// 结果："Linux 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021"
$SYSTEM.uname_prt('kernel-name kernel-release kernel-version')
```

#### 3.2.3) `locale` 方法

获取或设置 locale。主要用法：

```php
// 原型：获得 `LC_MESSAGES` 的 locale 信息。
$SYSTEM.locale

// 原型：获取指定分类的 locale 信息
$SYSTEM.locale('ctype | numeric | time | collate | monetary | messages | paper | name | address | telephone | measurement | identification')

// 原型：设置指定分类的 locale 信息
$SYSTEM.locale(! '[ctype || numeric || time || collate || monetary || messages || paper || name || address || telephone || measurement || identification] | all', <string: locale> )
```

#### 3.2.4) `random` 方法

获取随机值。主要用法：

```php
// 原型：获取 0 到 MRAND_MAX 之间的随机值
$SYSTEM.random

// 原型：获得 0 到指定上限之间的随机数。
$SYSTEM.random(<number: the max value>)
```

#### 3.2.5) `time` 方法

获取或设置系统时间。主要用法：

```php
// 原型：获取当前系统时间（自 Epoch 以来的秒数），返回类型为 ulongint。
$SYSTEM.time

// 原型：获得当前时间的分解时间（broken-down time），返回类型为对象。
// 注：返回对象同 POSIX `struct tm` 结构（去除该结构成员的 `tm_` 前缀）。
$SYSTEM.time.tm
// 等价于
$SYSTEM.time('tm')

// 原型：获得当前时间的 ISO 8601 标准字符串（如 `2020-06-24T11:27:05+08:00`）。
$SYSTEM.time.iso8601
// 等价于
$SYSTEM.time('iso8601')

// 原型：获得指定时间在给定时区，以给定标准名称（`iso`打头）形式展示的时间字符串
$SYSTEM.time(<string: ISO/RFC standard name>[, <number | longint | ulongint | longdouble: seconds since epoch>[, <string: timezone>]])

// 示例：获取当前时间之前一个小时在上海时区（北京标准时间）的 ISO8601 标准字符串
$SYSTEM.time('ISO8601', $MATH.eval('x - 3600', { x: $SYSTEM.time }), 'Asia/Shanghai')

// 示例：获取当前时间上海时区（北京标准时间）的 RFC822 标准字符串
$SYSTEM.time('RFC822', $SYSTEM.time, 'Asia/Shanghai')

// 原型：按照给定的格式字符串格式化时间
$SYSTEM.time(<string: format string>[, <number | longint | ulongint | longdouble: seconds since epoch>[, <string: timezone>]])

// 示例：获得类似 `11:27` 的时间字符串
$SYSTEM.time("The time now is %H:%m")

// 原型：设置系统时间，成功返回 true，失败返回 false
$SYSTEM.time(! <number: seconds since epoch> )
```

参阅资料：

- Linux：`$ man 1 date`
- Linux：`$ man 3 ctime`
- Linux：`$ man 3 tzset`
- PHP: https://www.php.net/manual/en/timezones.php
- PHP: https://www.php.net/manual/en/ref.datetime.php
- PHP: https://www.php.net/manual/en/datetime.formats.php

有关时间的显示标准，除了 ISO8601 之外，还有 RFC822 等。详细列表可见：<https://www.php.net/manual/en/class.datetime.php>

#### 3.2.6) `env` 方法

获取或设置环境变量。

```php
// 原型：获取指定环境变量的值（字符串）；未设置时返回 `undefined`
$SYSTEM.env( <string: the environment name> )

// 原型：设置指定环境变量，返回布尔数据，指明是否覆盖了已有环境变量
$SYSTEM.env(! <string: the environment name>, <string: the value> )

// 示例：获取环境变量 `LOGNAME` 的值
$SYSTEM.env('LONGNAME')

// 示例：设置环境变量 `HVML_VER` 的值
$SYSTEM.env('HVML_VER', '1.0')
```

**讨论**  
该功能亦可设置为一个 `SYSTEM` 变量上的一个静态属性，初始化时从系统中获取所有环境变量构造为一个对象，程序可使用 `update` 元素修改环境变量。

### 3.3) `HVML`

`HVML` 是一个内置的文档级动态变量，该变量用于设置解释器在执行 HVML 程序时一些参数。

#### 3.3.1) `base` 方法

该方法获取或设置 HVML 程序的根 URL。

```php
// 原型，返回字符串，如 `file:///app/com.example.foo/hvml`
$HVML.base: string

// 原型，设置 HVML 程序的根 URL，返回设置后的值。
$HVML.base(! <string, new base URL> ): string

// 示例：
$HVML.base(! "https://foo.example.com/app/hvml" )
```

#### 3.3.2) `maxIterationCount` 方法

该方法获取或设置 HVML 程序在执行 `iterate` 动作元素时的最大迭代次数，用于检测可能的死循环。

默认值为 64 位无符号整数的最大值：`2 ^ 64 - 1`。

```php
// 原型，返回当前值
$HVML.maxIterationCount: ulongint

// 原型，设置文档的根 URL，返回设置后的值。
$HVML.maxIterationCount(! <ulongint, new maximal interation count> ): ulongint

// 示例：
$HVML.maxIterationCount(! 10000UL )
```

#### 3.3.3) `maxRecursionDepth` 方法

该方法获取或设置 HVML 程序在递归执行某个功能时的最大递归深度，以防止栈溢出。

默认值为 16 位无符号整数的最大值：`2 ^ 64 - 1 = 65535`。

```php
// 原型，返回当前值
$HVML.maxRecursionDepth: ulongint

// 原型，设置文档的根 URL，返回设置后的值。
$HVML.maxRecursionDepth(! <ulongint, new maximal recursion depth> ): ulongint

// 示例：
$HVML.maxRecursionDepth(! 10000UL )
```

### 3.4) `DOC`

`DOC` 是一个内置的文档级动态变量，该变量用于访问 HVML 程序生成的 eDOM 树中的元素。

#### 3.4.1) `doctype` 方法

该方法返回文档类型，字符串。

```php
// 原型，返回字符串，如 `html`
$DOC.doctype

// 原型，获取 DOCTYPE 标签定义的 SYSTEM 标志符字符串
$DOC.doctype.system
$DOC.doctype("system")

// 原型，获取 DOCTYPE 标签定义的 PUBLIC 标志符字符串
$DOC.doctype.public
$DOC.doctype("public")

// 示例：
$DOC.doctype
```

#### 3.4.2) `query` 方法

使用 CSS 选择器查询目标文档上的元素汇集（collection）。

该方法的返回值可能有如下两种情况：

1. `undefined`：错误的 CSS 选择器或者参数。
1. 一个元素实体集合，可能为空。

在元素实体上，我们可就如下键名获得对应的获取器和设置器：

1. `attr`：用于获得或者设置对应元素的特定属性值。
1. `style`：用于设置对应元素的特定样式值。`style` 不提供 `getter` 方法，因为 eDOM 不维护样式信息；仅支持 `setter` 方法，用于通知 uDOM 设置元素的样式。
1. `textContent`：用于获得或者设置对应元素（含子元素）的文本内容。
1. `jsonContent`：用于获得或者设置对应元素（含子元素）的数据内容，多个内容形成数组。
1. `content`：用于获得或者设置对应元素内部内容（按目标标记语言格式化）。

如此实现后，HVML 动作元素中通过 CSS 选择器引用元素时，如：

```html
<update on="#the-user-stats > h2 > span" at="textContent attr.class" with='["10", "text-warning"]' />
```

相当于：

```html
<update on="$DOC.query('#the-user-stats > h2 > span')" at="textContent attr.class" with='["10", "text-warning"]' />
```

通常在这些键名上会设定有相应的获取器或设置器函数，于是即可实现 HVML 规范中要求的表达式：

```php
// <div id="foo" bar="baz">

// 获取 id 为 foo 的元素上的属性 `bar` 的值：
$DOC.query("#foo")[0].attr.bar
$DOC.query("#foo")[0].attr("bar")

// 设置 id 为 foo 的元素上的属性 `bar` 的值：
$DOC.query("#foo")[0].attr(! "bar", "qux")
```

### 3.5) `EJSON`

该动态变量为会话级内置变量，用于返回数据的类型、成员个数等信息。

#### 3.5.1) `type` 方法

该方法返回数据的类型名称，字符串。

```php
// 原型
$EJSON.type( <any> ): string
```

#### 3.5.2) `count` 方法

该方法返回数据的数据项个数，数值。

```php
// 原型
$EJSON.count( <any> ): number
```

#### 3.5.3) `numberify` 方法

该方法对给定的数据做数值化处理，返回一个数值。

```php
// 原型
$EJSON.numberify( <any> ): number
```

#### 3.5.4) `booleanize` 方法

该方法对给定的数据做布尔化处理，返回布尔值（`true` 或者 `false`）。

```php
// 原型
$EJSON.booleanize( <any> ): boolean
```

#### 3.5.5) `stringify` 方法

该方法对给定的数据做字符串化处理，返回字符串。

```php
// 原型
$EJSON.stringify( <any> ): string
```

#### 3.5.6) `serialize` 方法

该方法对给定的数据做序列化处理，返回字符串。

```php
// 原型
$EJSON.serialize( <any> ): string
```

#### 3.5.7) `sort` 方法

该方法对给定的数组或者集合做排序。

```php
// 原型
$EJSON.sort(
        < array | set >,
        < 'asc | desc ': sorting ascendingly or descendingly >,
        [ 'auto | number | case | caseless':
            `auto`: comparing members automatically;
            `number`: comparing members as numbers;
            `case`: comparing members as strings case-sensitively;
            `caseless`: comparing members as strings case-insensitively.
        ]
    )
```

#### 3.5.8) `compare` 方法

该方法对给定两个数据做对比，返回数值：

- 等于 0 表示两个数据相等；
- 小于 0 表示第一个数据小于第二个数据；
- 大于 0 表示第一个数据大于第二个数据。

```php
// 原型
$EJSON.compare(
        < any: the first data >,
        < any: the second data >,
        < 'auto | number | case | caseless':
            `auto`: comparing automatically;
            `number`: comparing as numbers;
            `case`: comparing as strings case-sensitively;
            `caseless`: comparing as strings case-insensitively.
        >
    )
```

### 3.6) `L`

该变量是一个会话级内置变量，主要用于逻辑运算。

有关任何数据转换为逻辑真假值时的规则，请参阅 [任意数据类型的强制转换规则](https://gitlab.fmsoft.cn/hvml/hvml-docs/blob/master/zh/hvml-spec-v1.0-zh.md#213-%E4%BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)。

#### 3.6.1) `not` 方法

逻辑取反操作。

```php
// 原型：逻辑取反的结果，返回 true 或 false
$L.not(<any>)

// 示例：false 取反，返回 true
$L.not( false )
```

#### 3.6.2) `and` 方法

逻辑与运算。

```php
// 原型：两个或以上数据执行逻辑与操作，返回 true 或 false
$L.and(<any>, <any>[, <any>[, ...]])

// 示例：false 和 true 的与操作，返回 false
$L.and( false, true )
```

#### 3.6.3) `or` 方法

逻辑或运算。

```php
// 原型：两个或以上数据执行逻辑或操作，返回 true 或 false
$L.or(<any>, <any>[, <any>[, ...]])

// 示例：false 和 true 的或操作，返回 true
$L.or( false, true )
```

#### 3.6.4) `xor` 方法

逻辑亦或运算。

```php
// 原型：两个数据执行逻辑亦或操作，返回 true 或 false
$L.xor(<any>, <any>)

// 示例：false 和 true 的或或操作，返回 true
$L.xor( false, true )
```

#### 3.6.5) `eq` 方法

对比两个数据在数值上是否相等，返回 `true` 或 `false`。

```php
// 原型：
$L.eq(<any>, <any>)

// 示例：返回 true
$L.eq("1", 1)
```

#### 3.6.6) `ne` 方法

对比两个数据在数值上是否不相等，返回 `true` 或 `false`。

```php
// 原型
$L.ne(<any>, <any>)

// 示例：返回 true
$L.ne("1", 2)
```

#### 3.6.7) `gt` 方法

对比第一个数据在数值上是否大于第二个数据，返回 `true` 或 `false`。

```php
// 原型
$L.gt(<any>, <any>)

// 示例：返回 true
$L.gt("2", 1)
```

#### 3.6.8) `ge` 方法

对比第一个数据在数值上是否大于或等于第二个数据，返回 `true` 或 `false`。

```php
// 原型
$L.ge(<any>, <any>)

// 示例：返回 true
$L.ge("2", 2)
```

#### 3.6.9) `lt` 方法

对比第一个数据在数值上是否小于第二个数据，返回 `true` 或 `false`。

```php
// 原型：
$L.lt(<any>, <any>)

// 示例：返回 true
$L.lt("1", 2)
```

#### 3.6.10) `le` 方法

对比第一个数据在数值上是否小于或等于第二个数据，返回 `true` 或 `false`。

```php
// 原型
$L.le(<any>, <any>)

// 示例：返回 true
$L.lt("1", 2)
```

#### 3.6.11) `streq` 方法

对比两个数据的字符串形式是否相等或匹配，返回 `true` 或 `false`。

```php
// 原型
$L.streq("case | caseless | wildcard | regexp", <any>, <any>)

// 示例：返回 false
$L.streq("case", "zh_CN", "zh_CN")

// 示例：返回 true
$L.streq("wildcard", "zh_*", "zh_CN")

// 示例：返回 true
$L.streq("reg", "^zh", "zh_CN")
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写、通配符模式匹配、正则表达式匹配），其后的两个参数用来传递两个字符串。使用通配符和正则表达式时，第一个参数用于指定通配符模式字符串或者正则表达式。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.12) `strne` 方法

对比两个数据的字符串形式是否不相等或不匹配，返回 `true` 或 `false`。

```php
// 原型：
$L.strne("case | caseless | wildcard | regexp", <any>, <any>)

// 示例：返回 true
$L.strne("case", "zh_CN", "zh_cn")
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写、通配符模式匹配、正则表达式匹配），其后的两个参数用来传递两个字符串。使用通配符和正则表达式时，第一个参数用于指定通配符模式字符串或者正则表达式。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.13) `strgt` 方法

对比第一个数据的字符串形式是否大于第二个数据的字符串形式，返回 `true` 或 `false`。

```php
// 原型
$L.strgt("case | caseless", <any>, <any>)

// 示例：返回 true
$L.strgt("case", 'A', 'Z')
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个字符串。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.14) `strge` 方法

对比第一个数据的字符串形式是否大于或等于第二个数据的字符串形式，返回 `true` 或 `false`。

```php
// 原型
$L.strge("case | caseless", <any>, <any>)

// 示例：返回 true
$L.strge("caseless", "abc", "ABC")
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个字符串。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.15) `strlt` 方法

对比第一个数据的字符串形式是否小于第二个数据的字符串形式，返回 `true` 或 `false`。

```php
// 原型
$L.strlt("case | caseless", <any>, <any>)

// 示例：返回 false
$L.strlt("case", "Z", "A")
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个字符串。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.16) `strle` 方法

对比第一个数据的字符串形式是否小于或等于第二个数据的字符串形式，返回 `true` 或 `false`。

```php
// 原型
$L.strle("case | caseless", <any>, <any>)

// 示例：返回 true
$L.strle("caseless", "abc", "ABC")
```

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个字符串。

对非字符串类型的数据，字符串化后做对比。

#### 3.6.17) `eval` 方法

对参数化的逻辑运算表达式求值。

```php
// 原型：
$L.eval(<string: logical expression>, <object: the parameter map>)

// 示例
$L.eval("x > y && y > z || b", { x: 2, y: 1, z: 0, b: $L.streq("case", $a, $b) })
```

### 3.7) `T`

该变量是一个文档级内置变量，主要用于文本的本地化替代。

- `get`：一个动态方法，用于返回替代字符串。

#### 3.7.1) `map` 静态属性

`map` 是 `T` 的一个静态属性，用来定义字符串映射表，初始为空对象。程序可使用 `update` 元素设置其内容：

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$T.map" to="displace">
            {
                "Hello, world!": "世界，您好！",
                "Hello, HVML!": "HVML，您好！",
            }
        </update>

        <title>$T.get('Hello, world!')</title>
    </head>

    <body>
        <p>$T.get('Hello, HVML!')</p>
    </body>

</hvml>
```

#### 3.7.2) `get` 方法

```php
// 原型
$T.get(<string: original text>)

// 示例：
// 返回值：`世界，您好！`
$T.get('Hello, world!')
```

### 3.8) `STR`

`STR` 是一个内置的动态变量，该变量用于实现常见的字符串操作。

该变量提供的接口，类似 PHP 的字符串函数：<https://www.php.net/manual/en/ref.strings.php>

#### 3.8.1) `contains` 方法

用于判断一个字符串中是否包含给定的子字符串。

```php
// 原型：判断字符串 `s1` 是否包含字符串 `s2`；返回值为 `boolean` 类型
$STR.contains(<string: C format string> s1, <string: C format string> s2) : boolean

// 示例：判断字符串 `hello world` 是否包含字符串 `world`；返回 `boolean` 类型，结果为 `true`。
$STR.contains('hello world', 'world')
```

#### 3.8.2) `ends_with` 方法

用于判断一个字符串是否以给定的字符串结尾。

```php
// 原型：判断字符串 `s1` 是否以字符串 `s2` 结尾；返回值为 `boolean` 类型
$STR.ends_with(<string: C format string> s1, <string: C format string> s2) : boolean

// 示例：判断字符串 `hello world` 是否以字符串 `world`结尾；返回 `boolean` 类型，结果为 `true`。
$STR.ends_with('hello world', 'world')
```

#### 3.8.3) `explode` 方法

使用指定的字符串分隔一个字符串。

```php
// 原型：将字符串 `s1` 用字符串 `s2` 进行分隔；返回值为 `array` 类型
$STR.explode(<string: C format string> s1, <string: C format string> s2) : array

// 示例：将字符串 `beijing:shanghai:guangzhou` 用字符串 `:` 分隔；返回 `array` 类型，结果为 `['beijing', 'shanghai', 'guangzhou']`。
$STR.explode('beijing:shanghai:guangzhou', ':')
```

#### 3.8.4) `implode` 方法

使用指定的字符串连接字符串数组中的字符串。

```php
// 原型：使用字符串 `s1` ，连接字符串数组 `a1` 中的每个字符串；返回值为 `string` 类型
$STR.implode(<string: C format string> s1, <array: string array> a1) : string

// 示例：使用字符串 `:` 连接数组中的每个字符串；返回 `string` 类型，结果为 `beijing:shanghai:guangzhou`。
$STR.implode(':', ['beijing', 'shanghai', 'guangzhou'])
```
- 如果 `s1` 为空字符串，则该方法直接连接数组中的各个字符串，各个字符串之间没有分隔；

- 如果数组为空，则返回空字符串；

- 如果数组中的某个元素为空字符串，将不会在该元素后面添加 `s1` 字符串。


#### 3.8.5) `shuffle` 方法

用于随机打乱一个字符串，返回一个新的重新排列的字符串。

```php
// 原型：将字符串 `s1` 中的字符随机打乱，重排后返回新的字符串；返回值为 `string` 类型
$STR.shuffle(<string: C format string> s1) : string

// 示例：将字符串 `beijing` 中的字母顺序打乱，产生一个新的字符串；返回 `string` 类型，结果可能是 `jbienig`。
$STR.shuffle('beijing')
```

#### 3.8.6) `replace` 方法

用于子字符串替换。

```php
// 原型：将字符串 `s1` 中的子字符串 `sub`，用字符串 `new` 替换，替换后返回新的字符串；返回值为 `string` 类型
$STR.replace(<string: C format string> s1, <string: C format string> sub, <string: C format string> new) : string

// 示例：将字符串 `hello world beijing` 中的空格 ` `，用 `-` 替换，产生一个新的字符串；返回 `string` 类型，结果可能是 `hello-world-beijing`。
$STR.replace('hello world beijing', ' ', '-')
```

#### 3.8.7) `format_c` 方法

格式化数值及字符串数据，使用 C 格式化字符表述方法。

```php
// 原型
$STR.format_c(<string: C format string>[, <boolean | number | longint | ulongint | longdouble | string>[, ...]]) : string

// 原型
$STR.format_c(<string: C format string>, <array>)
```

#### 3.8.8) `format_p` 方法

使用占位符格式化任意数据，使用 eJSON 串行化输出格式。

使用数组表达要格式化的数据时，占位符用 `{0}`、`{1}` 等表示。

使用对象表达要格式化的数据时，占位符用 `{name}`、`{id}` 等表示。

```php
// 原型
$STR.format_p(<string: string contains placeholders>, <array>) : string

// 示例
$STR.format_p('There are two boys: {0} and {1}', ['Tom', 'Jerry'])

// 原型
$STR.format_p(<string: string contains placeholders>, <object>) : string

// 示例
$STR.format_p('There are two boys: {name0} and {name1}', { name0: 'Tom', name1: 'Jerry'})
```

#### 3.8.9) `strcat` 方法

用于连接两个字符串。

```php
// 原型：将字符串 `s1` 与字符串 `s2` 连接，产生新的字符串并返回；返回值为 `string` 类型
$STR.strcat(<string: C format string> s1, <string: C format string> s2) : string

// 示例：将字符串 `hello` 与字符串 ` world` 连接，产生一个新的字符串；返回 `string` 类型，结果是 `hello world`。
$STR.strcat('hello', ' world')
```

#### 3.8.10) `strlen` 方法

用于获得字符串的长度，该长度包含字符串结尾的 `\0`。

```php
// 原型：获得字符串 `s` 的长度，该长度包含字符串结尾的 `\0`；返回值为 `ulongint` 类型
$STR.strlen(<string: C format string> s) : ulongint

// 示例：获得字符串 `hello world` 的长度；返回 `ulongint` 类型，结果是 `12`。
$STR.strlen('hello world')
```

#### 3.8.11) `lower` 方法

用于将字符串全部转换为小写，并返回转换后的字符串。

```php
// 原型：将字符串 `s` 全部转换为小写，并返回转换后的字符串；返回值为 `string` 类型
$STR.lower(<string: C format string> s) : string

// 示例：将字符串 `HELLO WORLD` 全部转换为小写，并返回转换后的字符串；返回 `string` 类型，结果是 `hello world`。
$STR.lower('HELLO WORLD')
```

#### 3.8.12) `upper` 方法

用于将字符串全部转换为大写，并返回转换后的字符串。

```php
// 原型：将字符串 `s` 全部转换为大写，并返回转换后的字符串；返回值为 `string` 类型
$STR.upper(<string: C format string> s) : string

// 示例：将字符串 `hello world` 全部转换为大写，并返回转换后的字符串；返回 `string` 类型，结果是 `HELLO WORLD`。
$STR.upper('hello world')
```

## 4) 可选动态变量

### 4.1) `MATH`

`MATH` 是一个可装载的动态变量，用于实现复杂的数学运算和函数。

该变量提供如下接口：

#### 4.1.1) `pi` 方法

该方法用于获得给定精度的 PI 值：

```php
// 原型
// 始终返回 3.14159265358979323846
$MATH.pi

// 原型
// 始终返回 3.141592653589793238462643383279502884L
$MATH.pi_l
```

#### 4.1.2) `e` 方法

该方法用于获得给定精度的 e（自然常数，欧拉数）值：

```php
// 原型
// 始终返回 2.718281828459045
$MATH.e

// 原型
// 始终返回 2.718281828459045235360287471352662498L
$MATH.e_l
```

#### 4.1.3) `const` 方法

这两个方法的获取器用于获得预定义和自定义数学常数：

```php
// 原型
// 根据传入的关键词或自定义常数名称返回指定常数，返回类型为 `number`
$MATH.const( ['e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt(2)'] | <string: a user-defined const name>) : number

// 原型
// 根据传入的关键词或自定义常数名称返回指定常数，返回类型为 `longdouble`
$MATH.const_l( ['e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt(2)'] | <string: a user-defined const name>) : longdouble

// 示例：获取 log2e 值，即：1.4426950408889634074
$MATH.const('log2e')

// 示例：获取 1/sqrt(2) 值，即：0.707106781186547524400844362104849039L。
$MATH.const_l('1/sqrt(2)')
```

注：预定义常量的值，见 C 语言标准库头文件：`<math.h>`。

这两个方法的设置器用于设置自定义的数学常数：

```php
// 原型
// 设置自定义常数
$MATH.const(! <string: a user-defined const name>, <number: the constant>[, <longdouble: the constant>] ) : boolean

// 示例：设置 c（真空光速）为 299792458
$MATH.const(! 'c', 299792458)

// 示例：设置 G0（引力常数）为 6.67e-11
$MATH.const(! 'G0', 6.67e-11)
```

实现要求：

1. 通过设置器可修改已定义常量和已设置的自定义常量的值。
1. 每个常量有有两个精度的数值，一个是一般精度数值，一个是长双精度数值。
1. 若没有传递常量对应的长双精度浮点值，则视同一般精度的数值处理。
1. 当通过设置器改变了 `pi` 和 `e` 的常量值时，`$MATH.pi` 和 `$MATH.e` 的返回值应相应改变。

#### 4.1.4) `add` 方法

求两个实数的和。

```php
// 原型：求两个实数的和，返回指定类型的数值；默认为 `number`
$MATH.add(<real>, <real>[, 'number | longint | ulongint | longdouble']) : number | longint | ulongint | longdouble

// 示例：求 (1.4 + 0.7) 默认返回 `number` 类型，结果为 `2.1`。
$MATH.add(1.4, 0.7)

// 示例：求 (1.4 + 0.7) 并转换为 `longint` 类型，结果为 `2L`。
$MATH.add(1.4, 0.7, 'longint')
```

#### 4.1.5) `sub` 方法

求两个实数的差。

```php
// 原型：求两个实数的差，返回指定类型的数值；默认为 `number`
$MATH.sub(<real>, <real>[, 'number | longint | ulongint | longdouble']) : number | longint | ulongint | longdouble

// 示例：求 (1.4 - 0.7) 默认返回 `number` 类型，结果为 `0.7`。
$MATH.sub(1.4, 0.7)

// 示例：求 (1.4 - 0.7) 返回 `longint` 类型，结果为 `0L`。
$MATH.sub(1.4, 0.7, 'longint')
```

#### 4.1.6) `mul` 方法

求两个实数的积。

```php
// 原型：求两个实数的积，返回指定类型的数值；默认为 `number`
$MATH.mul(<real>, <real>[, 'number | longint | ulongint | longdouble']) : number | longint | ulongint | longdouble

// 示例：求 (1.4 * 0.7) 默认返回 `number` 类型，结果为 `0.98`。
$MATH.mul(1.4, 0.7)

// 示例：求 (1.4 * 0.7) 返回 `longint` 类型，结果为 `0L`。
$MATH.mul(1.4, 0.7, 'longint')
```

#### 4.1.7) `div` 方法

求两个实数的商。

```php
// 原型：求两个实数的商，返回指定类型的数值；默认为 `number`
$MATH.div(<real>, <real>[, 'number | longint | ulongint | longdouble']) : number | longint | ulongint | longdouble

// 示例：求 (1.4 / 0.7) 默认返回 `number` 类型，结果为 `2.0`。
$MATH.div(1.4, 0.7)

// 示例：求 (1.4 / 0.7) 返回 `longint` 类型，结果为 `2L`。
$MATH.div(1.4, 0.7, 'longint')
```

#### 4.1.8) `eval` 和 `eval_l` 方法

这两个方法用于求解参数化四则运算表达式，`eval` 方法返回 `number` 类型的结果数据，`eval_l` 方法返回 `longdouble` 类型的结果数据。

```php
// 原型
$MATH.eval(<string: a four arithmetic expressions>[, <object: parameter map>]) : number

// 示例1：求解 (500 + 10) * (700 + 30)
$MATH.eval("(500 + 10) * (700 + 30)")

// 示例2：求圆的周长
$MATH.eval("2 * pi * r", { pi: $MATH.pi, r: $r })

// 示例3：求圆的面积
$MATH.eval("pi * r * r", { pi: $MATH.pi, r: $MATH.sqrt(2) })

// 原型：eval_l 的 long double 版本
$MATH.eval_l(<string: a four arithmetic expressions>[, <object: parameter map>]) : longdouble

```

#### 4.1.9) `sin` 和 `sin_l` 方法

用于计算角度的正弦值。原型如下：

```php
// 原型：求角度的正弦值，角度为弧度值；返回值为 `number` 类型
$MATH.sin(<number | longint | ulongint | longdouble>) : number

// 原型：求角度的正弦值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.sin_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 (pi/4) 的正弦值，返回 `number` 类型，结果为 `0.707107`。
$MATH.sin($MATH.const('pi/4'))

// 示例：求 (pi/4) 的正弦值，返回 `longdouble` 类型，结果为 `0.707107L`。
$MATH.sin_l($MATH.const('pi/4'))
```

#### 4.1.10) `cos` 和 `cos_l` 方法

用于计算角度的余弦值。原型如下：

```php
// 原型：求角度的余弦值，角度为弧度值；返回值为 `number` 类型
$MATH.cos(<number | longint | ulongint | longdouble>) : number

// 原型：求角度的余弦值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.cos_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 (pi/4) 的余弦值，返回 `number` 类型，结果为 `0.707107`。
$MATH.cos($MATH.const('pi/4'))

// 示例：求 (pi/4) 的余弦值，返回 `longdouble` 类型，结果为 `0.707107L`。
$MATH.cos_l($MATH.const('pi/4'))
```

#### 4.1.11) `tan` 和 `tan_l` 方法

用于计算角度的正切值。原型如下：

```php
// 原型：求角度的正切值，角度为弧度值；返回值为 `number` 类型
$MATH.tan(<number | longint | ulongint | longdouble>) : number

// 原型：求角度的正切值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.tan_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 (pi/4) 的正切值，返回 `number` 类型，结果为 `1.0`。
$MATH.tan($MATH.const('pi/4'))

// 示例：求 (pi/4) 的正切值，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.tan_l($MATH.const('pi/4'))
```

#### 4.1.12) `sinh` 和 `sinh_l` 方法

用于计算数值的双曲正弦值。原型如下：

```php
// 原型：求数值的双曲正弦值；返回值为 `number` 类型
$MATH.sinh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的双曲正弦值；返回值为 `longdouble` 类型
$MATH.sinh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的双曲正弦值，返回 `number` 类型，结果为 `1.175201`。
$MATH.sinh(1.0)

// 示例：求 `1.0` 的双曲正弦值，返回 `longdouble` 类型，结果为 `1.175201L`。
$MATH.sinh_l(1.0)
```

#### 4.1.13) `cosh` 和 `cosh_l` 方法

用于计算数值的双曲余弦值。原型如下：

```php
// 原型：求数值的双曲余弦值；返回值为 `number` 类型
$MATH.cosh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的双曲余弦值；返回值为 `longdouble` 类型
$MATH.cosh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的双曲余弦值，返回 `number` 类型，结果为 `1.543081`。
$MATH.cosh(1.0)

// 示例：求 `1.0` 的双曲余弦值，返回 `longdouble` 类型，结果为 `1.543081L`。
$MATH.cosh_l(1.0)
```

#### 4.1.14) `tanh` 和 `tanh_l` 方法

用于计算数值的双曲正切值。原型如下：

```php
// 原型：求数值的双曲正切值；返回值为 `number` 类型
$MATH.tanh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的双曲正切值；返回值为 `longdouble` 类型
$MATH.tanh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的双曲正切值，返回 `number` 类型，结果为 `0.761594`。
$MATH.tan(1.0)

// 示例：求 `1.0` 的双曲正切值，返回 `longdouble` 类型，结果为 `0.761594L`。
$MATH.tan_l(1.0)
```

#### 4.1.15) `asin` 和 `asin_l` 方法

用于计算数值的反正弦值。原型如下：

```php
// 原型：求数值的反正弦值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.asin(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反正弦值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.asin_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `0.707107` 的反正弦值，返回 `number` 类型，结果为 `0.785398`。
$MATH.asin(0.707107)

// 示例：求 `0.707107` 的反正弦值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.asin_l(0.707107)
```

#### 4.1.16) `acos` 和 `acos_l` 方法

用于计算数值的反余弦值。原型如下：

```php
// 原型：求数值的反余弦值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.acos(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反余弦值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.acos_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `0.707107` 的反余弦值，返回 `number` 类型，结果为 `0.785398`。
$MATH.acos(0.707107)

// 示例：求 `0.707107` 的反余弦值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.acos_l(0.707107)
```

#### 4.1.17) `atan` 和 `atan_l` 方法

用于计算数值的反正切值。原型如下：

```php
// 原型：求数值的反正切值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.atan(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反正切值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.atan_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的反正切值，返回 `number` 类型，结果为 `0.785398`。
$MATH.atan(1.0)

// 示例：求 `1.0` 的反正切值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.atan_l(1.0)
```

#### 4.1.18) `asinh` 和 `asinh_l` 方法

用于计算数值的反双曲正弦值。原型如下：

```php
// 原型：求数值的反双曲正弦值；返回值为 `number` 类型
$MATH.asinh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反双曲正弦值；返回值为 `longdouble` 类型
$MATH.asinh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的反双曲正弦值，返回 `number` 类型，结果为 `0.881374`。
$MATH.asin(1.0)

// 示例：求 `1.0` 的反双曲正弦值，返回 `longdouble` 类型，结果为 `0.881374L`。
$MATH.asin_l(1.0)
```

#### 4.1.19) `acosh` 和 `acosh_l` 方法

用于计算数值的反双曲余弦值。原型如下：

```php
// 原型：求数值的反双曲余弦值；返回值为 `number` 类型
$MATH.acosh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反双曲余弦值；返回值为 `longdouble` 类型
$MATH.acosh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `1.0` 的反双曲余弦值，返回 `number` 类型，结果为 `0.0`。
$MATH.acos(1.0)

// 示例：求 `1.0` 的反双曲余弦值，返回 `longdouble` 类型，结果为 `0.0L`。
$MATH.acos_l(1.0)
```

#### 4.1.20) `atanh` 和 `atanh_l` 方法

用于计算数值的反双曲正切值。原型如下：

```php
// 原型：求数值的反双曲正切值；返回值为 `number` 类型
$MATH.atanh(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的反双曲正切值；返回值为 `longdouble` 类型
$MATH.atanh_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `0.5` 的反双曲正切值，返回 `number` 类型，结果为 `0.549306`。
$MATH.atanh(0.5)

// 示例：求 `0.5` 的反双曲正切值，返回 `longdouble` 类型，结果为 `0.549306L`。
$MATH.atanh_l(0.5)
```

#### 4.1.21) `fmod` 和 `fmod_l` 方法

用于计算两值相除的余数。原型如下：

```php
// 原型：求两值相除的余数；返回值为 `number` 类型
$MATH.fmod(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) : number

// 原型：求两值相除的余数；返回值为 `longdouble` 类型
$MATH.fmod_l(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `(4.5/2.0)` 的余数，返回 `number` 类型，结果为 `0.5`。
$MATH.fmod(4.5, 2.0)

// 示例：求 `(4.5/2.0)` 的余数，返回 `longdouble` 类型，结果为 `0.5L`。
$MATH.fmod_l(4.5, 2.0)
```

#### 4.1.22) `fabs` 方法

用于计算数值的绝对值。原型如下：

```php
// 原型：求数值的绝对值；返回值类型为传入参数值类型
$MATH.fabs(<number | longint | ulongint | longdouble>) : number | longint | ulongint | longdouble

// 示例：求 `-2.5L` 的绝对值，返回 `longdouble` 类型，结果为 `2.5L`。
$MATH.fabs(-2.5L)

```

#### 4.1.23) `log` 和 `log_l` 方法

用于计算数值的自然对数。原型如下：

```php
// 原型：求数值的自然对数；返回值为 `number` 类型
$MATH.log(<number | longint | ulongint | longdouble>) : number

// 原型：求数值的自然对数；返回值为 `longdouble` 类型
$MATH.log_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `e` 的自然对数，返回 `number` 类型，结果为 `1.0`。
$MATH.log($MATH.const('e'))

// 示例：求 `e` 的自然对数，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.log_l($MATH.const('e'))
```

#### 4.1.24) `log10` 和 `log10_l` 方法

用于计算数值以 `10` 为底的对数。原型如下：

```php
// 原型：求数值以 `10` 为底的对数；返回值为 `number` 类型
$MATH.log10(<number | longint | ulongint | longdouble>) : number

// 原型：求数值以 `10` 为底的对数；返回值为 `longdouble` 类型
$MATH.log10_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `10.0` 以 `10` 为底的对数，返回 `number` 类型，结果为 `1.0`。
$MATH.log10(10.0)

// 示例：求 `10.0` 以 `10` 为底的对数，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.log10i_l(10.0)
```

#### 4.1.25) `pow` 和 `pow_l` 方法

用于计算 `x` 的 `y` 次幂。原型如下：

```php
// 原型：求 `x` 的 `y` 次幂；返回值为 `number` 类型
$MATH.pow(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) : number

// 原型：求 `x` 的 `y` 次幂；返回值为 `longdouble` 类型
$MATH.pow_l(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) : longdouble

// 示例：求 `3.0` 的 `2.0` 次幂，返回 `number` 类型，结果为 `9.0`。
$MATH.pow(3.0, 2.0)

// 示例：求 `3.0` 的 `2.0` 次幂，返回 `longdouble` 类型，结果为 `9.0L`。
$MATH.pow_l(3.0, 2.0)
```

#### 4.1.26) `exp` 和 `exp_l` 方法

用于计算 `e` 的 `x` 次幂。原型如下：

```php
// 原型：求 `e` 的 `x` 次幂；返回值为 `number` 类型
$MATH.exp(<number | longint | ulongint | longdouble> x) : number

// 原型：求 `e` 的 `x` 次幂；返回值为 `longdouble` 类型
$MATH.exp_l(<number | longint | ulongint | longdouble> x) : longdouble

// 示例：求 `e` 的 `1.0` 次幂，返回 `number` 类型，结果为 `2.718282`。
$MATH.exp(1.0)

// 示例：求 `e` 的 `1.0` 次幂，返回 `longdouble` 类型，结果为 `2.718282L`。
$MATH.exp_l(1.0)
```

#### 4.1.27) `floor` 和 `floor_l` 方法

用于计算数值的向下取整数值。原型如下：

```php
// 原型：计算向下取整的数值；返回值为 `number` 类型
$MATH.floor(<number | longint | ulongint | longdouble>) : number

// 原型：计算向下取整的数值；返回值为 `longdouble` 类型
$MATH.floor_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `-2.3` 向下取整数值，返回 `number` 类型，结果为 `-3.0`。
$MATH.floor(-2.3)

// 示例：求 `-2.3` 向下取整数值，返回 `longdouble` 类型，结果为 `-3.0L`。
$MATH.floor_l(-2.3)
```

#### 4.1.28) `ceil` 和 `ceil_l` 方法

用于计算数值的向上取整数值。原型如下：

```php
// 原型：计算向上取整的数值；返回值为 `number` 类型
$MATH.ceil(<number | longint | ulongint | longdouble>) : number

// 原型：计算向上取整的数值；返回值为 `longdouble` 类型
$MATH.ceil_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `-2.3` 向上取整数值，返回 `number` 类型，结果为 `-2.0`。
$MATH.ceil(-2.3)

// 示例：求 `-2.3` 向上取整数值，返回 `longdouble` 类型，结果为 `-2.0L`。
$MATH.ceil_l(-2.3)
```

#### 4.1.29) `sqrt` 和 `sqrt_l` 方法

用于计算数值的平方根。原型如下：

```php
// 原型：计算数值的平方根；返回值为 `number` 类型
$MATH.sqrt(<number | longint | ulongint | longdouble>) : number

// 原型：计算数值的平方根；返回值为 `longdouble` 类型
$MATH.sqrt_l(<number | longint | ulongint | longdouble>) : longdouble

// 示例：求 `9.0` 的平方根，返回 `number` 类型，结果为 `3.0`。
$MATH.sqrt(9.0)

// 示例：求 `9.0` 的平方根，返回 `longdouble` 类型，结果为 `3.0L`。
$MATH.sqrt_l(9.0)
```
#### 4.1.30) 错误与异常

在调用`MATH`动态对象的过程中，会产生如下的错误码和异常：

| Error Code                 | Exception     | 备注                               |
| -------------------------- | ------------- | ---------------------------------- |
| PURC_ERROR_WRONG_ARGS      |               | 调用参数类型错误，或参数个数错误   |
| PURC_ERROR_DIVBYZERO       | FloatingPoint | 除零错误                           |
| PURC_ERROR_OVERFLOW        | Overflow      | 计算值超出数据类型的最大值         |
| PURC_ERROR_UNDERFLOW       | Underflow     | 计算值小与数据类型所能表示的最小值 |
| PURC_ERROR_INV_FLOATPOINT  | FloatingPoint | 其他浮点数错误                     |

参照 PHP 数学接口：<https://www.php.net/manual/en/book.math.php>

### 4.2) `FS`

`FS` 是一个可装载的动态变量，该变量用于实现常见的文件系统操作。

**注意**  
当指定的路径以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前会话维护的当前工作路径信息（同 `$SESSION.cwd`）。

该变量提供如下接口：

#### 4.2.1) `list` 方法

该方法用于列出指定路径下的目录项，返回对象数组。原型及主要用法如下：

```php
// 原型
$FS.list(<string: path>[, <string: the list of semicolon separated name filters>])

// 示例：列出指定路径下的所有目录项。
$FS.list($path)

// 示例：列出名称符合给定两种通配符的目录项
$FS.list($path, "*.txt; *.md")
```

每个目录项的信息由如下对象表达：

```javascript
{
    name: <string: name of the file (directory entry)>,
    dev: <number: ID of device containing file>,
    inode: <number: inode number>
    type: <string: file type like 'd', 'b', 's', ...>,
    mode: <bytesequece: file mode>,
    mode_str: <string: file mode like `rwxrwxr-x`>,
    nlink: <number: number of hard links>,
    uid: <number: the user ID of owner>,
    gid: <number: the group ID of owner>,
    rdev_major: <number: the major device ID if it is a special file>,
    rdev_minor: <number: the minor device ID if it is a special file>,
    size: <number: total size in bytes>,
    blksize: <number: block size for filesystem I/O>,
    blocks: <number: Number of 512B blocks allocated>,
    atime: <number: time of last acces>,
    mtime: <number: time of last modification>,
    ctime: <number: time of last status change>
}
```

#### 4.2.2) `list_prt` 方法

该方法用于列出指定路径下的目录项信息，返回经过格式化的字符串数组。原型及主要用法如下：

```php
// 原型
$FS.list_prt(<string: path>[, <string: the list of semicolon separated name filters>[, '[mode || nlink || uid || gid || size || blksize || atime || ctime || mtime || name] | all | default']])

// 示例：列出指定路径下的所有目录项，仅列出目录项名称和类型。
$FS.list_prt($path)

// 示例：列出名称符合给定通配符的目录项，但仅列出目录项名称和类型。
$FS.list_prt($path, "*.txt")

// 示例：列出名称符合给定两种通配符的目录项，且指定了列出的列及其顺序
$FS.list_prt($path, "*.txt; *.md", "mode nlink uid gid size blksize atime ctime mtime name")
```

注：`list_prt` 对每个目录项信息的格式化方法同 Linux `ls` 命令。

#### 4.2.3) 其他

参照 PHP 文件系统接口：<https://www.php.net/manual/en/book.filesystem.php>，如：

- `mkdir` 方法。该方法用于新建目录。
- `rmdir` 方法。该方法用于删除空目录。
- `touch` 方法。该方法用于新建文件或者改变文件的时间戳。
- `unlink` 方法。该方法移除指定的文件。
- `rm` 方法。该方法移除指定的文件或者目录。

### 4.3) `FILE`

`FILE` 是一个可装载的动态变量，该变量用于实现常见的文件读写操作。

该变量被设计两级对象：

- `txt`：提供以文本文件方式读写的接口。
- `bin`：提供以二进制文件方式读写的接口。
- `stream`：提供以流方式读写的接口。

**注意**  
当指定的文件以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前会话维护的当前工作路径信息（同 `$SESSION.cwd`）。

#### 4.3.1) 文本文件

##### 4.3.1.1) `txt.head` 方法

该方法读取文本文件的前几行，并返回一个字符串数组。

```php
// 原型
$FILE.txt.head(<string: file name>[, <number: number of lines>])

// 示例：读取所有行
$FILE.txt.head($file)

// 示例：读取前 5 行
$FILE.txt.head($file, 5)

// 示例：读取最后 5 行之外的所有行
$FILE.txt.head($file, -5)
```

##### 4.3.1.2) `txt.tail` 方法

该方法读取文本文件的后几行，并返回一个字符串数组。

```php
// 原型
$FILE.txt.tail(<string: file name>[, <number: number of lines>])

// 示例：读取所有行
$FILE.txt.tail($file)

// 示例：读取后 5 行
$FILE.txt.tail($file, 5)

// 示例：读取最前 5 行之外的所有行
$FILE.txt.tail($file, -5)
```

#### 4.3.2) 二进制文件

##### 4.3.2.1) `bin.head` 方法

该方法读取二进制文件的前几字节，并返回一个字节序列。

```php
// 原型
$FILE.bin.head(<string: file name>[, <number: number of bytes>])

// 示例：读取所有字节
$FILE.bin.head($file)

// 示例：读取前 5 字节
$FILE.bin.head($file, 5)

// 示例：读取最后 5 字节之外的所有字节
$FILE.bin.head($file, -5)
```

##### 4.3.2.2) `bin.tail` 方法

该方法读取二进制文件的后几字节，并返回一个字节序列。

```php
// 原型
$FILE.bin.tail(<string: file name>[, <number: number of bytes>])

// 示例：读取所有字节
$FILE.bin.tail($file)

// 示例：读取后 5 字节
$FILE.bin.tail($file, 5)

// 示例：读取最前 5 字节之外的所有字节
$FILE.bin.tail($file, -5)
```
#### 4.3.3) 流式读写

##### 4.3.3.1) 二进制结构表示法

为配合 FILE 的流式读写方法（`readstruct`、`writestruct`），我们定义了一种二进制结构表示法。

我们用一个字符串表示一个二进制结构中的各个构成部分，多个构成部分之间使用空白字符（空格、制表符、换行符等）分隔，每个构成部分使用一个类型字符串表示其类型，如果是大于一个字节的整数或浮点数，其后紧跟可选的 `le` 或者 `be` 表示小头（little endian）或者大头（big endian）。

如，`i32le s128 f64`，表示一个结构，其中前 4 个字节是一个 32 位整数，小头存储，紧接着是一个 128 字节的字符串，最后 8 字节是一个 64 位浮点数。该结构一共 140 字节。

下表给出了本表示法支持的各种结构构成部分之类型标记：

| 类型               |  表示方法   | 对应的 HVML 数据类型         |
| ----------------   |  --------   | ---------------------------- |
| 1 字节整数         |  i8         | longint    |
| 2 字节整数         |  i16        | longint    |
| 4 字节整数         |  i32        | longint    |
| 8 字节整数         |  i64        | longint    |
| 1 字节无符号整数   |  u8         | ulongint   |
| 2 字节无符号整数   |  u16        | ulongint   |
| 4 字节无符号整数   |  u32        | ulongint   |
| 8 字节无符号整数   |  u64        | ulongint   |
| 2 字节浮点型       |  f16        | number     |
| 4 字节浮点型       |  f32        | number     |
| 8 字节浮点型       |  f64        | number     |
| 12 字节浮点型      |  f96        | longdouble |
| 16 字节长双精度    |  f128       | longdouble |
| 字节序列           |  `b<SIZE>`  | bsequence；SIZE 指定字节数量。 |
| 字符串             |  `s[SIZE]`  | string；SIZE 可选：指定字节数量，未指定时，到空字符（`\0`）为止。|
| 填白               |  `p<SIZE>`  | 无，将跳过指定数量的字节；SIZE 指定字节数量。     |

对 8 位以上整数或浮点数，使用如下可选后缀表示大小头：

| 类型 | 类型标志 |
| ---- | -------- |
| 小头 | le       |
| 大头 | be       |

注：
- 未指定时，默认跟随当前架构

不同类型的表示方法：

| 类型     | 表示方法           | 备注                                         | 举例              |
| -------- | ------------------ | -------------------------------------------- | ----------------- |
| 数值类型 | 类型 + 大、小头    | 如不标大、小头，跟随当前架构                 | u16、u32be、u64le |
| 字节序列 | 类型 + 长度        |                                              | b234              |
| 字符串   | 类型 + 长度 / 类型 | 如不标长度，则自动计算字符串长度             | s、s123           |

注：
- 不区分大小写；
- 字符串仅支持 UTF-8 编码。非 UTF-8 编码的字符串，应使用字节序列处理。

我们使用多个构成部分组成的字符串来表示一个结构，不同构成部分之间使用空白字符分隔。

如，`i32le s128 f64`，表示一个结构的构成部分依次如下：

1. 其中前 4 个字节是一个 32 位整数，小头存储；
1. 紧接着是一个 128 字节的字符串；
1. 最后 8 字节是一个 64 位浮点数。

该结构一共 140 字节。

##### 4.3.3.2) `stream.open` 方法

打开文件作为流，返回一个代表流对象的原生实体值。注意，流的关闭将在最终释放对应的数据时自动进行。

##### 4.3.3.3) `stream.readstruct` 方法

从二进制流中读取一个二进制结构，并转换为适当的数据。

##### 4.3.3.4) `stream.writestruct` 方法

将多个数据按照指定的结构格式写入二进制流。

##### 4.3.3.5) `stream.readlines` 方法

从文本流中读取给定行数，返回字符串数组。

##### 4.3.3.6) `stream.writelines` 方法

将字符串写入文本流中。

##### 4.3.3.7) `stream.readbytes` 方法

从二进制或文本流中读取一个字节序列，返回一个字节序列。

##### 4.3.3.8) `stream.writebytes` 方法

将一个字节序列写入流。

##### 4.3.3.9) `stream.seek` 方法

在二进制或文本流中执行定位操作。

使用示例：

```html
    <init as="formats">
        [
            "b2 p2 u32le u32le",
            "f64le f64le",
        ]
    </init>

    <init as="packages">
    </init>

    <choose on="$FILE.stream.open('mydata.txt', 'b')" to="iterate">
        <iterate on="$formats" in="$packages" by="RANGE: 0">
            <update on="$packages" to="append" with="$FILE.stream.readstruct($2, $?)" />
        </iterate>
    </choose>
```

## 附录

### 附.1) 贡献者榜单

本榜单顺序按贡献时间由早到晚排列：


### 附.2) 商标声明

本文提到的产品、技术或者术语名称，涉及北京飞漫软件技术有限公司在中国或其他地区注册的如下商标：

1) 飛漫

![飛漫](https://www.fmsoft.cn/application/files/cache/thumbnails/87f47bb9aeef9d6ecd8e2ffa2f0e2cb6.jpg)

2) FMSoft

![FMSoft](https://www.fmsoft.cn/application/files/cache/thumbnails/44a50f4b2a07e2aef4140a23d33f164e.jpg)

3) 合璧

![合璧](https://www.fmsoft.cn/application/files/4716/1180/1904/256132.jpg)
![合璧](https://www.fmsoft.cn/application/files/cache/thumbnails/9c57dee9df8a6d93de1c6f3abe784229.jpg)
![合壁](https://www.fmsoft.cn/application/files/cache/thumbnails/f59f58830eccd57e931f3cb61c4330ed.jpg)

4) HybridOS

![HybridOS](https://www.fmsoft.cn/application/files/cache/thumbnails/5a85507f3d48cbfd0fad645b4a6622ad.jpg)

5) HybridRun

![HybridRun](https://www.fmsoft.cn/application/files/cache/thumbnails/84934542340ed662ef99963a14cf31c0.jpg)

6) MiniGUI

![MiniGUI](https://www.fmsoft.cn/application/files/cache/thumbnails/54e87b0c49d659be3380e207922fff63.jpg)

7) xGUI

![xGUI](https://www.fmsoft.cn/application/files/cache/thumbnails/7fbcb150d7d0747e702fd2d63f20017e.jpg)

8) miniStudio

![miniStudio](https://www.fmsoft.cn/application/files/cache/thumbnails/82c3be63f19c587c489deb928111bfe2.jpg)

9) HVML

![HVML](https://www.fmsoft.cn/application/files/8116/1931/8777/HVML256132.jpg)

10) 呼噜猫

![呼噜猫](https://www.fmsoft.cn/application/files/8416/1931/8781/256132.jpg)

11) Purring Cat

![Purring Cat](https://www.fmsoft.cn/application/files/2816/1931/9258/PurringCat256132.jpg)

### 附.3) 废弃或待定的内容



[Beijing FMSoft Technologies Co., Ltd.]: https://www.fmsoft.cn
[FMSoft Technologies]: https://www.fmsoft.cn
[HybridOS]: https://hybridos.fmsoft.cn

[MiniGUI]: http:/www.minigui.com
[WebKit]: https://webkit.org
[HTML Specification]: https://html.spec.whatwg.org/
[DOM Specification]: https://dom.spec.whatwg.org/
[WebIDL Specification]: https://heycam.github.io/webidl/
[CSS 2.2]: https://www.w3.org/TR/CSS22/
[CSS Box Model Module Level 3]: https://www.w3.org/TR/css-box-3/
[JSON]: https://www.json.org

