# HVML 预定义变量

Subject: HVML Predefined Variables  
Version: 1.0-OR0  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: Nov. 1, 2021  
Last Modified Date: Apr. 30, 2025  
Status: Official Release  
Release Name: 丑牛  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2021, 2022, 2023, 2024, 2025 北京飞漫软件技术有限公司  
版权所有 &copy; 2021, 2022, 2023, 2024, 2025 魏永明  
保留所有权利

此文档不受 HVML 相关软件开源许可证的管辖。

版权所有人公开此文档的目标，用于向开发者解释 HVML 相关设计原理或者相关规范。在未获得版权所有人书面许可的情况下，任何人不得复制或者分发本文档的全部或部分内容，或利用本文档描绘的技术思路申请专利、撰写学术论文等。

本文提及的版权所有人相关注册商标或商标之详细列表，请查阅文档末尾。

**目录**

[TOC]

## 1) 介绍

本文档是 HVML 规范的一部分，用于详细定义 HVML 解释器必须支持或者可选支持的预定义变量。

### 1.1) 规范及术语

本文档遵循的技术规范或术语如下所列：

- HVML（Hybrid Virtual Markup Language），是[魏永明](https://github.com/VincentWei)提出的一种数据驱动的可编程标记语言。[HVML 规范](hvml-spec-v1.0-zh.md) 的如下部分和本文档相关：
  1. 2.1) 术语及基本原理
  1. 2.2) 规则、表达式及方法的描述语法
- 解释器（interpreter），指解析并运行 HVML 程序的计算机软件。
- 渲染器（renderer），指渲染 HVML 协程生成的目标文档并和用户交互的计算机软件。
- 行者（runner），每个解释器实例对应一个行者，连接到渲染器后对应一个渲染器会话。
- 静态属性（static property），指一个对象上键值为普通数据的属性，其键值不是动态生成的。我们通常使用小写开头的驼峰命名法命名这类属性，如 `myObj`。
- 动态属性（dynamic property），指一个对象上键值为动态值的属性，在动态属性上，我们通常可以提供一个获取器或者一个设置器，用于获取该属性的当前值或者改变该属性的当前值。
- 获取器（getter），指一个动态属性的获取器。调用获取器返回该方法的动态属性值。
- 设置器（setter），指一个动态属性的设置器。调用特定方法的设置器，将完成对应属性的设置工作。
- 方法（method），指动态对象提供的函数调用。我们通常使用下划线连接的全小写命名法，如 `starts_with`。

按是否含有动态对象划分，HVML 预定义变量可分为：

1. 非动态变量，即变量对应的数据不提供动态方法。所有本规范定义的非动态变量都是内置（built-in）且必要的（required）。
1. 动态变量，即变量对应的数据提供动态方法。动态变量又分为必要（required）动态变量及可选（optional）动态变量。通常，动态变量可设计为可加载的（loadable）共享库或者模块。解释器应根据本文档的要求将动态变量实现为内置的或可加载的；可选动态变量是否实现为可加载的，由解释器决定。

按变量对应数据的作用域，可分为：

1. 行者级变量。指该变量对应的数据对当前解释器实例中的所有 HVML 协程可见。也就是说，同一行者中的不同协程对应同一个数据副本。
1. 协程级变量。指该变量对应的数据仅对当前解释器实例中的单个 HVML 协程可见。也就是说，不同的 HVML 协程有一个自己的数据副本。

需要注意，行者级变量的实现应考虑多线程（当解释器以进程方式运行，每个解释器实例对应一个独立线程）情形下的线程安全和可重入性。

**约定**  
解释器可自行实现全局变量，作为约定，解释器自行实现的全局变量，其名称应以 ASCII U+005F LOW LINE（`_`）打头，使用全大写字母并添加解释器前缀。如 `_PURC_VAR`。而一般的变量，使用全小写字母。

### 1.2) 二进制格式表示法

为配合流实体要求的流式读写方法（`readstruct`、`writestruct`）以及字节序列的数值化，我们定义了一种二进制格式表示法。

我们用一个字符串表示一个二进制结构中的各个构成部分，多个构成部分之间使用空白字符（空格、制表符、换行符等）分隔，每个构成部分使用一个类型字符串表示其类型，如果是大于一个字节的整数或浮点数，其后紧跟可选的 `le` 或者 `be` 表示小头（little endian）或者大头（big endian）。

如，`i32le s128 f64`，表示一个结构，其中前 4 个字节是一个 32 位整数，小头存储，紧接着是一个 128 字节的字符串，最后 8 字节是一个 64 位浮点数。该结构一共 140 字节。

在对字节序列执行数值化操作时，我们通过单个关键词来指定字节序列的二进制格式，比如 `i32le` 表示小头存储的 32 位有符号整数。

下表给出了本表示法支持的各种结构构成部分之类型标记：

| 类型               |  表示方法                    | 对应的 HVML 数据类型         |
| ----------------   |  --------                    | ---------------------------- |
| 1 字节整数         |  `i8[:<QUANTITY>]`           | longint, longint 数组    |
| 2 字节整数         |  `i16[le/be][:<QUANTITY>]`   | longint, longint 数组    |
| 4 字节整数         |  `i32[le/be][:<QUANTITY>]`   | longint, longint 数组    |
| 8 字节整数         |  `i64[le/be][:<QUANTITY>]`   | longint, longint 数组    |
| 1 字节无符号整数   |  `u8[:<QUANTITY>]`           | ulongint, ulongint 数组  |
| 2 字节无符号整数   |  `u16[le/be][:<QUANTITY>]`   | ulongint, ulongint 数组  |
| 4 字节无符号整数   |  `u32[le/be][:<QUANTITY>]`   | ulongint, ulongint 数组  |
| 8 字节无符号整数   |  `u64[le/be][:<QUANTITY>]`   | ulongint, ulongint 数组  |
| 2 字节浮点型       |  `f16[le/be][:<QUANTITY>]`   | number, number 数组      |
| 4 字节浮点型       |  `f32[le/be][:<QUANTITY>]`   | number, number 数组      |
| 8 字节浮点型       |  `f64[le/be][:<QUANTITY>]`   | number, number 数组      |
| 12 字节浮点型      |  `f96[le/be][:<QUANTITY>]`   | longdouble, longdouble 数组 |
| 16 字节长双精度    |  `f128[le/be][:<QUANTITY>]`  | longdouble, longdouble 数组 |
| 字节序列           |  `bytes:<SIZE>`              | bsequence；SIZE 指定字节数量。 |
| UTF-8编码的字符串  |  `utf8[:<SIZE>]`             | string；SIZE 可选：指定字节数量，未指定时，到空字符（0x00）为止。|
| UTF-16编码的字符串 |  `utf16[le/be][:<SIZE>]`     | string；SIZE 可选：指定字节数量，未指定时，到空字符（连续两个 0x00 字节）为止。|
| UTF-32编码的字符串 |  `utf32[le/be][:<SIZE>]`     | string；SIZE 可选：指定字节数量，未指定时，到空字符（连续四个 0x00 字节）为止。|
| 填白               |  `padding:<SIZE>`            | 无，将跳过指定数量的字节；SIZE 指定字节数量。     |

对 8 位以上整数、浮点数以及 UTF-16、UTF-32 编码，使用如下可选后缀表示大小头：

| 类型 | 类型标志 |
| ---- | -------- |
| 小头 | le       |
| 大头 | be       |

未指定时，默认跟随当前架构。

不同类型的表示方法：

| 类型              | 表示方法              | 备注                                                                      | 举例                  |
| --------          | ------------------    | --------------------------------------------                              | -----------------     |
| 数值类型          | 类型 + 大/小头        | 如不标大、小头，则跟随当前架构                                            | u16、u32be、u64le     |
| 连续数值类型      | 类型 + 大/小头 + 个数 | 如不标大、小头，则跟随当前架构，个数指该类数值的数值，必须大于零          | u16:10、u32be:10      |
| 字节序列          | 类型 + 长度           |                                                                           | bytes:234             |
| UTF-8 编码字符串  | 类型 + 长度 / 类型    | 如不标长度，则自动计算字符串长度（数据需包含表示结尾的字节零）            | utf8、utf8:123        |
| UTF-16 编码字符串 | 类型 + 长度 / 类型    | 如不标长度，则自动计算字符串长度（数据需包含表示结尾的十六位零）          | utf16、utf16:120      |
| UTF-32 编码字符串 | 类型 + 长度 / 类型    | 如不标长度，则自动计算字符串长度（数据需包含表示结尾的三十二位零）        | utf32be、utf32be:120  |

注意：

- 二进制格式关键词区分大小写。
- 字节序列、填白以及字符串的长度均以字节为单位。
- 我们使用多个构成部分组成的字符串来表示一个结构，不同构成部分之间使用空白字符分隔。

如，`i32le utf8:128 f64`，表示一个结构的构成部分依次如下：

1. 其中前 4 个字节是一个 32 位整数，小头存储；
1. 紧接着是一个 128 字节的 UTF-8 编码字符串；
1. 最后 8 字节是一个 64 位浮点数。

该结构一共 140 字节。

### 1.3) 格式化修饰符

<https://www.php.net/manual/en/function.sprintf.php>

### 1.4) 撰写要求

对一个方法的描述应包含如下部分（section）：

- `描述`（Description；必需）：首先按 [HVML 规范 - 2.2.4) 动态对象方法的描述语法](/zh/hvml-spec-v1.0-zh.md#224-动态对象方法的描述语法) 定义的语法给出方法的原型，其中包括对参数（形参）和返回值的简短描述。然后给出对该方法用途的简短描述。
- `参数`（Parameters；可选）。必要时给出对该方法参数的完整描述。
- `返回值`（Return Value；可选）。必要时给出对该方法返回值的完整描述。
- `异常`（Exceptions；必需）。列出此方法可能抛出的异常。
- `示例`（Examples；必需）。
- `参见`（See Also；可选）。列出相关的外部链接。
- `备注`（Notes；可选）。

某些方法可返回 `false`、`undefined` 等值标记错误。此等情形仅出现在当前动作元素设置有 `silently` 副词属性，且仅遇到可忽略异常的情况下。当一个方法在设置有 `silently` 副词属性的元素中被调用时，我们称该方法被要求“静默求值（evaluate silently）”。对支持静默求值的方法，对其用途的描述参照如下形式：

> 该方法改变当前的工作路径。成功时返回 `true`；失败时抛出异常，或在静默求值时，对可忽略异常返回 `false`。

## 2) 非动态变量

### 2.1) `TIMERS`

`TIMERS` 是一个协程级内置变量。该变量是一个对象集合（对象的 `id` 属性做唯一性键值）。

用于描述一个定时器对象的属性如下：

```js
{
    'id': <string: `The timer identifier, the key with unique restriction.`>,
    'interval': <string: `The interval of the timer in milliseconds.`>,
    'active': <string: `Activated or not.`>
}
```

该变量用于定义定时器，其上不提供动态方法；程序通过 `update` 元素修改该变量对应的容器数据来操作定时器。

#### 2.1.1) 批量新增定时器

```hvml
    <update on $TIMERS to unite>
        [
            { "id" : "foo", "interval" : 1000, "active" : "no" },
            { "id" : "bar", "interval" : 2000, "active" : "no" },
        ]
    </update>
```


#### 2.1.2) 新增一个定时器

```hvml
    <update on $TIMERS to add>
        { "id" : "foobar", "interval" : 3000, "active" : "yes" }
    </update>
```

#### 2.1.3) 移除一个定时器

```hvml
    <update on $TIMERS to remove>
        { "id" : "foobar" }
    </update>
```

#### 2.1.4) 移除多个定时器

```hvml
    <update on $TIMERS to subtract>
        [
            { "id" : "foo" },
            { "id" : "bar" }
        ]
    </update>
```

#### 2.1.5) 修改特定定时器的属性

```hvml
    <!-- activate the timer `foo` -->
    <choose on $TIMERS by 'FILTER: AS "foo"'>
        <update on $?[0] at '.active' with 'yes' />
    </choose>
```

或，

```hvml
    <update on $TIMERS to overwrite>
        { "id" : "foo", "interval": 1500, "active" : "yes" }
    </update>
```

### 2.2) `REQ`

`REQ` 是一个协程级内置变量。该变量用来保存装载一个 HVML 程序时传递给该程序的请求参数，以对象形式保存。

比如下面的 Python 脚本装载一个 HVML 程序，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在程序中，我们可使用 `$REQ.nrUsers` 或 `$REQ['nrUsers']` 来引用上述脚本代码传入的数值（`10`）。

## 3) 必要动态变量

### 3.1) `SYS`

该变量是一个行者级内置变量，主要用于获得或设置系统信息。该内置变量的实现，需要考虑如下要求：

- 在某个协程中调用 `$SYS` 的设置器方法，可能产生 `change` 事件，解释器应该将该事件广播到所有行者，并进一步转发给行者中的所有协程。

#### 3.1.1) `const` 方法

获取系统常量。

**描述**

```js
$SYS.const(
        <string $name: `The constant name.`>
) any : `The constant value.`
```

该方法获取指定常量的值。成功时返回对应的数据；失败时将抛出 `NoSuchKey` 异常，或在静默求值时，返回 `undefined`。

注意，如下常量应由所有 HVML 解释器定义：

- `HVML_SPEC_RELEASE`: HVML 规范版本号，如 `硕鼠`。
- `HVML_SPEC_VERSION`: HVML 规范版本号，如 `1.0`。
- `HVML_PREDEF_VARS_SPEC_RELEASE`: HVML 预定义变量规范版本号，如 `硕鼠`。
- `HVML_PREDEF_VARS_SPEC_VERSION`: HVML 预定义变量规范版本号，如 `1.0`。
- `HVML_INTRPR_NAME`: HVML 解释器的名称，如 `PurC`。
- `HVML_INTRPR_RELEASE`: HVML 解释器的发布名称，如 `立春`。
- `HVML_INTRPR_VERSION`: HVML 解释器的版本名称，如 `0.5.0`。

**异常**

- `NoSuchKey`：可忽略异常。

**示例**

```js
// 获取常量 `HVML_SPEC_VER` 的值
$SYS.const('HVML_SPEC_VERSION')
    // string: '1.0'
```

#### 3.1.2) `uname` 方法

获取系统信息。

**描述**

```js
$SYS.uname object :
    `An object contains the following properties:`
        - 'kernel-name':        < string: `The kernel name (e.g., 'Linux').` >
        - 'kernel-release':     < string: `The kernel release (e.g., '2.6.28').` >
        - 'kernel-version':     < string: `The kernel version.` >
        - 'nodename':           < string: `The network node hostname.` >
        - 'machine':            < string: `The machine hardware name.` >
        - 'processor':          < string: `The processor type.` >
        - 'hardware-platform':  < string: `The hardware platform.` >
        - 'operating-system':   < string: `The operating system (e.g., 'GNU/Linux').` >
```

该方法获取系统信息，返回包含有内核名称、版本号等键值对的对象。注意，对某些不支持的系统特征，将返回空字符串。

**异常**

（无）

**示例**

```js
$SYS.uname
    // object: {
            'kernel-name':      'Linux',
            'kernel-release':   '5.4.0-99-generic',
            'kernel-version':   '#112-Ubuntu SMP Thu Feb 3 13:50:55 UTC 2022',
            'nodename':         'magicBook',
            'machine':          'x86_64',
            'processor':        'x86_64',
            'hardware-platform':'x86_64',
            'operating-system': 'GNU/Linux'
       }
```

#### 3.1.3) `uname_prt` 方法

获取可打印的系统信息。

**描述**

```js
$SYS.uname_prt string: `The kernel name.`
```

该方法获取内核名称，返回字符串。

```js
$SYS.uname_prt(
        <'[kernel-name || kernel-release || kernel-version || nodename || machine || processor || hardware-platform || operating-system] | all | default' $which = 'default':
            - 'kernel-name':        `Include kernel name (e.g., 'Linux').`
            - 'kernel-release':     `Include kernel release (e.g., '2.6.28').`
            - 'kernel-version':     `Include kernel version.`
            - 'nodename':           `Include the network node hostname.`
            - 'machine':            `Include machine hardware name.`
            - 'processor':          `Include the processor type.`
            - 'hardware-platform':  `Include the hardware platform.`
            - 'operating-system':   `Include the operating system (e.g., 'GNU/Linux').`
            - 'all':                `Include all parts.`
            - 'default':            `The equivalent to 'kernel-name'.`
        >
) string: `The string concatenated the desired system information parts together.`
```

该方法返回多个指定特征的特征值，用空格分隔，串接为一个字符串返回。注意，对某些不支持的系统特征，按对应的特征值为空字符串处理。

**异常**

（无）

**示例**

```js
// 获取内核名称
$SYS.uname_prt
    // string: 'Linux'

// 获取内核名称及版本号
$SYS.uname_prt('kernel-name kernel-release kernel-version')
    // string: "Linux 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021"
```

#### 3.1.4) `locale` 方法

获取或设置区域（locale）。

**描述**

```js
$SYS.locale string : `The locale for the messages category.`
```

该方法获得消息分类（messages category）的区域，返回字符串。

```js
$SYS.locale(
        < 'ctype | numeric | time | collate | monetary | messages | paper | name | address | telephone | measurement | identification' $category = 'messages':
            - 'ctype':          `Character classification`
            - 'numeric':        `Formatting of nonmonetary numeric values`
            - 'time':           `Formatting of date and time values`
            - 'collate':        `String collation`
            - 'monetary':       `Formatting of monetary values`
            - 'messsages':      `Localizable natural-language messages`
            - 'paper':          `Settings related to the standard paper size (*)`
            - 'name':           `Formatting of salutations for persons (*)`
            - 'address':        `Formatting of addresses and geography-related items (*)`
            - 'telephone':      `Formats to be used with telephone services (*)`
            - 'measurement':    `Settings related to measurements (metric versus US customary) (*)`
            - 'identification': `Metadata describing the locale (*)`
        >
) string | undefined : `The locale like 'zh_CN'.`
```

该方法获取指定分类的区域，返回字符串。某些平台可能不支持特定的区域分类，比如姓名（`name`）分类。对不支持的区域分类，该函数将抛出 `Unsupported` 异常，或静默求值时返回 `undefined`。

```js
$SYS.locale(!
        < '[ctype || numeric || time || collate || monetary || messages || paper || name || address || telephone || measurement || identification] | all' $categories:
            - 'ctype':          `Character classification`
            - 'numeric':        `Formatting of nonmonetary numeric values`
            - 'time':           `Formatting of date and time values`
            - 'collate':        `String collation`
            - 'monetary':       `Formatting of monetary values`
            - 'messsages':      `Localizable natural-language messages`
            - 'paper':          `Settings related to the standard paper size (*)`
            - 'name':           `Formatting of salutations for persons (*)`
            - 'address':        `Formatting of addresses and geography-related items (*)`
            - 'telephone':      `Formats to be used with telephone services (*)`
            - 'measurement':    `Settings related to measurements (metric versus US customary) (*)`
            - 'identification': `Metadata describing the locale (*)`
            - 'all':            `All of the locale categories`
        >,
        <string $locale: `The locale for $categories.`>
) true | false
```

该方法设置指定分类（单个或多个）的区域。成功时返回 `true`，失败时返回 `false`。某些平台可能不支持特定的区域分类，比如姓名（`name`）分类。对不支持的区域分类，该函数将抛出 `Unsupported` 异常，或在静默求值时返回 `false`。

**异常**

- `Unsupported`：不支持的区域分类。可忽略异常。

**备注**

1. 在 HVML 中，表示区域的字符串始终使用 `en_US`、`zh_CN` 这种形式。
1. 在 HVML 应用框架中，要求始终使用 UTF-8 编码。
1. 对特定区域的修改，将在 `$SYS` 变量上产生 `change:locale/<category>` 事件。

**示例**

```js
$SYS.locale
    // string: "en_US"

$SYS.locale(! 'all', 'zh_CN')
    // boolean: true

$SYS.locale
    // string: "zh_CN"
```

#### 3.1.5) `time` 方法

获取或设置日历时间（calendar time）。

**描述**

```js
$SYS.time longint: `The calendar time (seconds since Epoch)`
```

该方法获取当前日历时间（自 Epoch 以来的秒数），返回值类型为 `longint`。

```js
$SYS.time(!
        <real $seconds: `seconds since Epoch`>
) true | false
```

该方法设置系统时间，整数部分表示自 Epoch 以来的秒数，小数部分表示微秒数。成功时返回 `true`，失败时抛出 `AccessDenied` 异常，静默求值时返回 `false`。

**异常**

- `InvalidValue`：传入无效参数，如负值或者大于 100,000 或小于 0 的微秒值。
- `AccessDenied`：当前行者的所有者没有权限设置系统时间时，将抛出该异常。

**备注**

1. 对日历时间的修改，将在 `$SYS` 变量上产生 `change:time` 事件。

**示例**

```js
$SYS.time
    // longint: 123456789L
```

**参见**

- C 标准函数：`gettimeofday()`、`settimeofday()`
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime 类：<https://www.php.net/manual/en/class.datetime.php>

#### 3.1.6) `time_us` 方法

获取或设置具有微秒精度的系统时间。

**描述**

```js
$SYS.time_us longdouble :
    `A long double number representing the number of seconds (integral part) and microseconds (fractional part) since Epoch.`
```

该方法获取当前系统时间，包括自 Epoch 以来的秒数以及微秒数，返回值 longdouble 数值，小数部分为微秒值。

```js
$SYS.time_us(
        [
            < 'longdouble | object' $return_type = 'longdouble': `Indicate the return type: a long double number or an object.`>
        ]
) longdouble | object : `A long double number or an object representing the number of seconds and microseconds since Epoch:`
        - 'sec': < longint: `seconds since Epoch` >
        - 'usec': < longint: `microseconds` >
```

该方法获取当前系统时间，包括自 Epoch 以来的秒数以及微秒数，返回值类型为 longdouble 数值或包含 `sec` 和 `usec` 两个属性的对象。

```js
$SYS.time_us(!
        <real $sec_us: `Seconds with microseconds since Epoch`>
) true | false
```

该方法用一个实数（整数部分表示自 Epoch 以来的秒数，小数部分表示微秒数）设置系统时间。成功时返回 `true`，失败时抛出异常，静默求值时返回 `false`。

```js
$SYS.time_us(!
        <object $time_with_us: `An object representing the number of seconds and microseconds since Epoch`>
) true | false
```

该方法使用表示系统时间的对象设置系统时间。成功时返回 `true`，失败时抛出异常，静默求值时返回 `false`。

**异常**

- `InvalidValue`：获取器被调用时，传入错误参数时（如错误的返回类型），将抛出该异常；静默求值时，返回 `longdouble` 类型的当前事件。设置器被调用时，传入无效参数时（如负值或者大于 100,000 或小于 0 的微秒值）时，将抛出该异常。
- `AccessDenied`：设置器被调用时，当运行解释器的所有者没有权限设置系统时间时，将抛出该异常。

**备注**

1. 对系统时间的修改，将在 `$SYS` 变量上产生 `change:time` 事件。

**示例**

```js
$SYS.time_us
    // longdouble: 123456789.456789
```

**参见**

- C 标准函数：`gettimeofday()`、`settimeofday()`
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime 类：<https://www.php.net/manual/en/class.datetime.php>

#### 3.1.7) `sleep` 方法

暂停当前行者的执行。若在 HVML 程序中调用，则会休眠的当前协程。

**描述**

```js
$SYS.sleep(
        real $delay_time: `The delay time in seconds; a double or long double number representing the number of seconds (integral part) and microseconds/nanoseconds (fractional part) to delay.`
) real | false
```

该方法暂停当前行者的执行以指定的秒数。若使用浮点数指定秒数，则小数部分可指定要休眠的微秒或纳秒数。正常情况下，该方法返回 0；当休眠因为当前协程有需要处理的事件而打断时，则返回剩余的秒数（返回值的类型和参数类型一致）。

**异常**

- `ArgumentMissed`：未指定必要参数。可忽略异常；静默求值时返回 `false`。
- `WrongDataType`：非实数类参数类型。可忽略异常；静默求值时返回 `false`。
- `InvalidValue`：传入无效参数，如负值。可忽略异常；静默求值时返回 `false`。
- `SystemFault`：操作系统故障。不可忽略异常。

**示例**

```js
$SYS.sleep(1UL)
    // ulongint: 0UL

$SYS.sleep(0.3)
    // longdouble: 0.0FL
```

**参见**

- POSIX 函数：`sleep()`、`usleep()` 和 `nanosleep()`。

#### 3.1.8) `timezone` 方法

获取或设置时区。

**描述**

```js
$SYS.timezone : string | false
```

该方法返回当前时区。

```js
$SYS.timezone(!
        <string $timezone: `The new timezone`>
        [,
            < 'local | global' $permanently = 'local': `Change timezone permanently/globally or temporarily/locally.`>
        ]
) true | false
```

该方法设置当前时区。成功时返回 `true`，失败时抛出异常，静默求值时返回 `false`。

HVML 推荐使用类似 `Asia/Shanghai` 这样的字符串来表示时区。实质上，这个字符串是 POSIX 系统保存时区信息的文件路径，比如对 `Asia/Shanghai`，其时区信息通常保存在 `/usr/share/zoneinfo/Asia/Shanghai` 文件或 `/var/db/timezone/zoneinfo/Asia/Shanghai` 中。也支持如下特别的时区名称：

- `PRC`：中国标准时间，即北京时间，同 `Asia/Shanghai`。
- `Hongkong`：香港时间，同 `Asia/Hong_Kong`。
- `UTC`：协调世界时，同 `Etc/UTC`。
- `UCT`：协调世界时的另一个名称，同 `Etc/UTC`。
- `Greenwich`：格林威治时间，同 `Etc/GM`。
- `GMT`：格林威治时间的简称，同 `Etc/GMT`。
- `posixrules`：POSIX 默认时区规则，同 `America/New_York`。

**异常**

- `InvalidValue`：无效的时区字符串。对无效的选项关键词，静默求值时，将被视作 `local`。
- `AccessDenied`：当前行者的所有者没有权限持久更改系统时区。

**备注**

1. 对系统时区的修改，将在 `$SYS` 变量上产生 `change:timezone` 事件。
1. 系统时区的全局、持久修改，可能需要重新启动操作系统。

**示例**

```js
$SYS.timezone
    // string: "Asia/Shanghai"

$SYS.timezone(! 'America/New_York' )
    // true

$SYS.timezone
    // string: "America/New_York"
```

**参见**

- C 标准函数：`tzset()`
- PHP: <https://www.php.net/manual/en/timezones.php>

#### 3.1.9) `cwd` 方法

获取或设置当前工作路径。

**描述**

```js
$SYS.cwd string | false: `Return the current working directory on success, or @false on failure.`
```

该方法获取当前工作路径。成功时返回 `true`，失败时抛出异常；在静默求值时，对可忽略异常返回 `false`。

```js
$SYS.cwd(!
        <string $dir: `The new path for the current working directory.`>
) boolean: `Return @true on success or @false on failure.`
```

该方法改变当前工作路径。成功时返回 `true`，失败时抛出异常；在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常，均为可忽略异常：

- `InvalidValue`：传入的目录字符串含有底层操作系统不支持的非法字符。
- `EntityNotFound`：指定的目录不存在。
- `AccessDenied`：无访问权限。
- `TooMany`：太长的符号链接跳转。
- `TooLong`：太长的目录名。
- `IOFailure`：输入输出错误。
- `OSFailure`：其他操作系统错误。

**备注**

1. 对当前工作路径的修改，将在 `$SYS` 变量上产生 `change:cwd` 事件。

**参见**

- C 标准函数：`chdir()`, `getcwd()`

#### 3.1.10) `env` 方法

获取或设置系统环境变量。

**描述**

```js
$SYS.env(
        <string: `The environment variable name`>
) string | undefined
```

该方法获取指定环境变量的值（字符串）；未设置时抛出 `NoSuchKey` 异常，静默求值时返回 `undefined`。

```js
$SYS.env(!
        <string: `The environment variable name`>,
        <string | undefined: `The value`>
) true | false: `Return @true on success, otherwise @false if evaluated silently.`
```

该方法设置指定的环境变量，返回布尔数据，指明是否覆盖了已有环境变量。

**异常**

该方法可能产生的异常，均为可忽略异常：

- `InvalidValue`：非法的环境变量名称。
- `NoSuchKey`：不存在指定的环境变量。

**备注**

1. 新增特定的环境变量，将在 `$SYS` 变量上产生 `change:env/grown` 事件，事件参数为一个对象，包含以新增环境变量名称为键，对应值为键值的键值对。
1. 对特定环境变量的修改，将在 `$SYS` 变量上产生 `change:env` 事件，事件参数为一个对象，包含以修改的环境变量名称为键，对应值为键值的键值对。
1. 删除特定的环境变量，将在 `$SYS` 变量上产生 `change:env/shrunk` 事件，事件参数为被移除的环境变量名称。

**示例**

```js
// 设置环境变量 `LOGNAME` 的值
$SYS.env(! 'LOGNAME', 'tom' )
    // boolean: true
```

#### 3.1.11) `random_sequence` 方法

从内核获取指定的随机数据，可用于随机数发生器的种子或加密用途。

**描述**

```js
$SYS.random_sequence(
        <number $length: `The length of the random byte sequence`>
) bsequence | false
```

该方法从内核获取指定长度的随机数据，可用于随机数发生器的种子或加密用途。该方法返回指定长度的字节序列或抛出异常；静默求值时，返回 `false`。

**异常**

- `InvalidValue`：`$length` 无效的长度；长度需大于 0 小于等于 256。
- `NotSupported`：不支持。

**示例**

```js
// 从内核获得随机数据用于当前行者的随机数发生器种子。
$SYS.random(! $DATA.fetchreal($SYS.random_sequence(4), 'u32') )
    // boolean: true
```

**参见**

- Linux 特有接口：`getrandom()`

#### 3.1.12) `random` 方法

获取随机值。

**描述**

```js
$SYS.random longint: `A random between 0 and RAND_MAX.`
```

该方法获取 0 到 C 标准函数库定义的 `RAND_MAX`（至少 `32767`）之间的一个随机值（`longint`）。

```js
$SYS.random(
        <real $max: `The max value`>
) real | false: `A random real number between 0 and $max. The type of return value will be same as the type of $max.`
```

该方法获取 0 到指定的最大值之间的一个随机值。返回值的类型同参数 `$max` 的类型。

```js
$SYS.random(!
        <real $seed: `The random seed`>
        [, <number $complexity: `A number equal or greater than 8 to indicates how sophisticated the random number generator it should use - the larger, the better the random numbers will be.>
        ]
) boolean: `@true for success, @false otherwise.`
```

该方法设置随机数发生器的种子（`$seed`）和/或复杂度（`$complexity`）。该方法在成功时返回 `true`；失败时抛出异常，或在静默求值时，对可忽略异常返回 `false`。

**异常**

`InvalidValue`：传入了无效参数，比如过小的 `$complexity` 值。

**示例**

```js
// 使用当前系统日历时间设置随机数种子。
$SYS.random(! $SYS.time )
    // true

// 使用当前系统日历时间设置随机数种子，并设置随机数发生器的复杂度为最高。
$SYS.random(! $SYS.time, 256 )
    // true

$SYS.random
    // longint: 8899L

$SYS.random(1)
    // number: 0.789

$SYS.random(1000L)
    // longint: 492L

$SYS.random(-10FL)
    // longdouble: -8.96987678FL
```

**参见**

- C 标准函数：`random_r()`
- C 标准函数：`srandom_r()`
- C 标准函数：`initstate_r()`

#### 3.1.13) `remove` 方法

移除目录项。

**描述**

```js
$SYS.remove(
        <string $path: `The path of a file or an empty directory.`>
) true | false
```

该方法移除一个由 `$path` 指定的文件或者目录。

**参见**

- C 标准函数：`remove()`

#### 3.1.14) `spawn` 方法

创建子进程并在其中执行给定的程序；该方法返回子进程的标识符。

**描述**

```js
$SYS.spawn(
    <string $prog_path: `The path or the filename of the executable program.`>
    <array | tuple $file_actions: `A linear container which speicifies the file-related actions to be performed in the child between the fork(2) and exec(3) steps.`>
    <array | tuple $argv: `The arguments will be passed to the program.`>
    [, <array $env = [! ]: `The environment (*key=value* strings) will be kept for child process.`>
        [, < ['search | resetids || setsid ] $flags: `The flags for spawning.`
            - 'search': `The executable file is specified as a simple filename; the system searches for this file in the list of directories specified by PATH.
            - 'resetids': `Reset the effective UID and GID to the real UID and GID of the parent process.`
            - `setsid': `The child process shall create a new session and become the session leader.`>
            [, < object $extra_options: `The extra options are reserved for future use.` >
        ]
    ]
) longint | false
```

用于指定在执行程序之前要完成的文件操作 `$file_actions` 由一个个对象构成：

```js
{
    'action':   < '[open | close | dup2 ]': `The file action to be performed.` >
    'fd':       < longint : `The file descriptor.` >
    'path':     < sring : `The path of the file to be opened if action is 'open'.` >
    'oflags':   < '[read || write || append || create || excl || truncate || nonblock || cloexec]' : `The open flags if action is 'open'.` >
    'cmode':    < 'string: `The permission string like '0644' or 'u+rwx,go+rx' for the new file if action is 'open'.` >
    'newfd':    < longint: `The new file descriptor if action is 'dup2'.` >
}
```

**参见**

- POSIX 标准函数：`posix_spawn()`

#### 3.1.15) `waitpid` 方法

等待子进程退出。

**描述**

```js
$SYS.waitpid(
    <longint $pid: `The process identifier.`>
    [, < ['none || nohang || untraced || continued'] $options = 'none': `The options, can be one or more of the following keywords:`
        - 'none':       `No any options specified.`
        - 'nohang':     `Indicate that the call should not block if there are no processes that wish to report status.`
        - 'untraced':   `Indicate that children of the current process that are stopped due to a SIGTTIN, SIGTTOU, SIGTSTP, or SIGSTOP signal also have their status reported.`
        - 'continued':  `Indicate that children of the current process that are continued due to a SIGCONT signal also have their status reported (Linux-only).`
    ]
) false | object: `An object describes the exit status of one children:`
        - 'pid':        < longint: `The process identifier .` >
        - 'cause':      < 'exited | signaled | stopped | continued': `Indicate the manner of exit of the process.` >
        - 'exitstatus': < longint: `If the process terminated normally by a call to _exit(2) or exit(3), this property evaluates to the low-order 8 bits of the argument passed to _exit(2) or exit(3) by the child.`
        - 'termsig':    < longint: `If the process terminated due to receipt of a signal, this property evaluates to the number of the signal that caused the termination of the process.` >
        - 'stopsig':    < boolean: `if the process has not terminated, but has stopped and can be restarted, this property evaluates to the number of the signal that caused the process to stop.` >
        - 'cordump':    < boolean: `Indicate if the termination of the process was accompanied by the creation of a core file containing an image of the process when the signal was received..` >
```

**参见**

- POSIX 标准函数：`waitpid()`

#### 3.1.16) `kill` 方法

向指定的进程或进程组发送信号。

**描述**

```js
$SYS.kill(
    <longint $pid: `The process identifier.`>
    [, < ['HUP | INT | QUIT | ABRT | KILL | ALRM | TERM'] $signal = 'TERM': `The signal to send.`
        - 'HUP':  `hang up`
        - 'INT':  `interrupt`
        - 'QUIT': `quit`
        - 'ABRT': `abort`
        - 'KILL': `non-catchable, non-ignorable kill`
        - 'ALRM': `alarm clock`
        - 'TERM': `software termination signal` >
    ]
) true | false
```

**参见**

- POSIX 标准函数：`kill()`

#### 3.1.17) `access` 方法

测试文件的可访问性。

**描述**

```js
$SYS.access(
    < string $path: `The path to the file or the directory.` >
    [, < '[read || write || execute || existence]' $mode = 'existence': `Indicate the access permissions to test: `
       - 'read':        `For read permission.`
       - 'write':       `For write permission.`
       - 'execute':     `For execute/search permission.`
       - 'existence':   `For existence.` >
    ]
) true | false
```

**参见**

- POSIX 标准函数：`access()`

#### 3.1.18) `pipe` 方法

创建用于父子进程通讯的单向匿名管道。

**描述**

```js
$SYS.pipe(
    [ < '[cloexec || nonblock] | default | none' $flags = 'default': `The flags on the new file descriptors.`:
       - 'nonblock':    `Set the file descriptor in nonblocking mode.`
       - 'cloexec':     `Set the file descriptor flag close-on-exec.`
       - 'default':     `The equivalent to 'cloexec'.`
       - 'none':        `No additinal flags are specified.`  >
    ]
) tuple with two longint elements | false
```

**参见**

- POSIX 标准函数：`pipe()`

#### 3.1.19) `fdflags` 方法

获取或设置文件描述符标志、文件描述符状态标志等。

**描述**

- 获取器：

```js
$SYS.fdflags(
    <longint $fd: `The file descriptor.`>,
    <'cloexec | append | nonblock' $flags:
       - 'cloexec':     `Get the file descriptor flag close-on-exec.`
       - 'append':      `Get the file descriptor statu flag of O_APPEND.`
       - 'nonblock':    `Get the file descriptor statu flag of O_NONBLOCK.`
    >
) true | false
```

- 设置器：

```js
$SYS.fdflags(!
    <longint $fd: `The file descriptor.`>,
    <'cloexec || append || nonblock' $flags:
       - 'cloexec':     `Set the file descriptor flag close-on-exec.`
       - 'append':      `Set the file descriptor statu flag of O_APPEND.`
       - 'nonblock':    `Set the file descriptor statu flag of O_NONBLOCK.`
    >
) true | false
```

**参见**

- POSIX 标准函数：`fcntl()`

#### 3.1.20) `sockopt` 属性

获取或设置套接字的选项。

**描述**

- 获取器

```js
$SYS.sockopt(
    <longint $fd: `The file descriptor.`>,
    <'type | nread | nwrite | recv-timeout | send-timeout | recv-buffer | send-buffer' $option:
        - 'type':           `The socket type.`
        - 'nread':          `The number of bytes to be read. (macOS only)`
        - 'nwrite':         `The number of bytes written not yet sent by the protocol. (macOS only)`
        - 'recv-timeout':   `The timeout value for input.`
        - 'send-timeout':   `The timeout value for output.`
        - 'recv-buffer':    `The buffer size for input.`
        - 'send-buffer':    `The buffer size for output.`
        - 'keep-alive':     `Keep alive.`
    >
) string | number | longint | true | false
```

通过获取器获得套接字流的指定选项值。

- 设置器

```js
$SYS.sockopt(!
    <longint $fd: `The file descriptor.`>,
    <'recv-timeout | send-timeout | recv-buffer | send-buffer' $option:
        - 'recv-timeout':   `The timeout value for input.`
        - 'send-timeout':   `The timeout value for output.`
        - 'recv-buffer':    `The buffer size for input.`
        - 'send-buffer':    `The buffer size for output.`
        - 'keep-alive':     `Keep alive.`
    >,
    < number | longint | boolean $value: `The option value to be set.`>,
) true | false
```

通过设置器设置套接字流的指定选项值。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `Unsupported`：不支持该操作（非套接字文件描述符）; 可忽略异常，静默求值时返回 `false`。

**备注**

1. 仅支持套接字。

**示例**

```js
// 设置套接字流的超时时间为 1 秒。
$SYS.sockopt($stream.fd, 'recv-timeout', 1.0)
    // true
```

#### 3.1.21) `open` 方法

打开给定文件。

**描述**

```js
$SYS.open(
    <string $file_path: `The path of the file to open.`>
    [,
        <'[read || write || append || create || excl || truncate || nonblock || cloexec]' $oflags = 'read write cloexec':   < `The open flags.` >
        [,
            < 'string $cmode: `The permission string like '0644' or 'u+rwx,go+rx' when creating a new file.` >
        ]
    ]
) longint | false
```

该方法以默认方式或者指定的选项打开或创建指定的文件。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `Unsupported`：不支持该操作; 可忽略异常，静默求值时返回 `false`。

**参见**

- POSIX 标准函数：`open()`

#### 3.1.22) `seek` 方法

修改文件的读写位置。

**描述**

```js
$SYS.seek(
    <ulongint $fd: `The file descriptor.`>
    <longint $offset: `New offset.`>
    [, <'[set | current |end]' $whence = 'set':   < `The direction.` >
            - 'set':        `The offset is set to offset bytes.`>
            - 'current':    `The offset is set to its current location plus offset bytes.`>
            - 'end':        `The offset is set to the size of the file plus offset bytes.`>
       >
    ]
) longint | false
```

该方法以修改文件的读写位置。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `Unsupported`：不支持该操作; 可忽略异常，静默求值时返回 `false`。

**参见**

- POSIX 标准函数：`lseek()`

#### 3.1.23) `close` 方法

关闭给定的文件描述符。

**描述**

```js
$SYS.close(
    <longint $fd: `The file descriptor to be closed.`>
) true | false
```

**参见**

- POSIX 标准函数：`close()`

#### 3.1.24) `sendfile` 方法

在文件描述符之间复制数据。

**描述**

```js
$SYS.sendfile(
    <longint $out_fd: `The output file descriptor.`>,
    <longint $in_fd: `The input file descriptor.`>
    <ulongint $offset: `The file offset from which the method will start reading data from $in_fd. `>
    [,
        <ulongint $count = 4096UL: `The number of bytes to copy between the file descriptors. `>
    ]
) [! $bytes_sent, $new_offset ] | false
```

该方法在两个文件描述符之间复制数据。该方法借助操作系统内核提供的 `sendfile()` 系统调用完成文件内容的复制，避免了将数据读入用户空间再从用户空间写入内核的过程，从而可大幅提高性能。

**参见**

- Linux 系统调用：`sendfile()`

### 3.2) `RUNNER`

该变量是一个行者级内置变量，解释器在创建一个新的行者时，会自动创建并绑定。该变量主要用于行者相关的信息，并提供给用户在当前行者的不同协程之间共享数据的机制。

#### 3.2.1) `appName` 属性

获取当前行者的应用名称。

**描述**

```js
$RUNNER.appName
    string : `The app name of current runner.`
```

该方法获取当前行者的应用名称。

**异常**

该方法不产生异常。

**示例**

```js
$RUNNER.appName
    // string: 'cn.fmsoft.hvml.sample'
```

#### 3.2.2) `runName` 属性

获取当前行者的行者名称。

**描述**

```js
$RUNNER.runName
    string : `The runner name of current runner.`
```

该方法获取当前行者的行者名称。

**异常**

该方法不产生异常。

**示例**

```js
$RUNNER.runName
    // string: 'hello'
```

#### 3.2.3) `rid` 属性

获取当前行者的行者标识符（runner identifier，简称 `rid`）。

**描述**

```js
$RUNNER.rid
    ulongint : `The identifier of the current runner.`
```

该方法获取当前行者的行者标识符。

**异常**

该方法不产生异常。

**示例**

```js
$RUNNER.sid
    // ulongint: 3UL
```

#### 3.2.4) `uri` 属性

获取当前行者的 URI。

**描述**

```js
$RUNNER.uri
    string : `The URI of the current runner.`
```

该方法获取当前行者的 URI，形似 `edpt://localhost/cn.fmsoft.hvml.caculator/main`。

**异常**

该方法不产生异常。

**示例**

```js
$RUNNER.uri
    // string: 'edpt://localhost/cn.fmsoft.hvml.caculator/main'
```

#### 3.2.5) `autoSwitchingRdr` 属性

获取或设置当前行者是否允许自动切换渲染器。

**描述**

```js
$RUNNER.autoSwitchingRdr
    boolean : `if auto switching renderer is enabled.`
```

获取当前行者的 `autoSwitchingRdr` 属性值。

```js
$RUNNER.autoSwitchingRdr(!
        <boolean $enable: ``>,
) boolean : `Return the current value of 'autoSwitchingRdr' property.`
```

设置当前行者的 `autoSwitchingRdr` 属性值。

**异常**

该属性的获取器及设置器不产生异常。

**示例**

```js
$RUNNER.autoSwitchingRdr
    // true
$RUNNER.autoSwitchingRdr(! false )
    // false
```

#### 3.2.6) `myObj` 静态属性

`myObj` 是 `RUNNER` 的一个静态属性，用来定义用户自定义键值对，初始为一个空对象。程序可使用 `update` 元素设置其内容：

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$RUNNER.myObj" to="displace">
            {
                "AUTHOR": "Vincent Wei",
            }
        </update>
    </head>

    <body>
        ...
    </body>
</hvml>
```

由于 `$RUNNER` 是行者级变量，故而可以在当前行者的另一个 HVML 协程中观察该数据上的变化：

```hvml
    <observe on="$RUNNER.myObj" for="change:AUTHOR" in="#theStatusBar">
        ...
    </observe>
```

#### 3.2.7) `user` 方法

通过该方法获取或设置用户键值对。

**描述**

```js
$RUNNER.user(
        <string $key: `The user defined key name`>
) any | undefined : `The variant value corresponding to the key name $key.`
```

该方法获取指定键名对应的键值。当指定的键名未被设置时，将抛出 `NoSuchKey` 异常，或在静默求值时，返回 `undefined`。

```js
$RUNNER.user(!
        <string $key: `The user defined key name`>,
        <any | undefined $value: `The new variant value`>
) boolean : `Return @true when the old value was overridden or @false when a new key-value pair was created.`
```

该方法设置指定键名的值，返回布尔数据，指明是否覆盖了已有键值。注意，传入键值为 `undefined` 会执行移除对应键值对的操作。当移除一个并不存在的键值对时，将抛出 `NoSuchKey` 异常，或在静默求值时，返回 `false`。

_注意_，`user` 的获取器和设置器本质上访问的是 `$RUNNER` 的 `myObj` 静态属性。

**异常**

该方法可能产生的异常：

- `NoSuchKey`

**示例**

```js
// 移除 `userId` 键值对
$RUNNER.user(! 'userId', undefined )
    // false (assumed that `userId` was not set)

// 设置 `userId` 为 `20211104`
$RUNNER.user(! 'userId', '20211104' )
    // false

// 获取 `userId` 对应的键值
$RUNNER.user('userId')
    // string: '20211104-01'

// 重置 `userId` 为 `20220213`
$RUNNER.user(! 'userId', '20220213' )
    // true

// 移除 `userId` 键值对
$RUNNER.user(! 'userId', undefined )
    // true
```

#### 3.2.8) `enablelog` 方法

该方法设置行者的日志选项。

**描述**

```js
$RUNNER.enablelog(
    <'[ emerg || alert || crit || error || warning || notice || info || debug ] | all | default' $levels:
           - 'emerg':      `Enable the emergency messages.`
           - 'alert':      `Enable the alert messages.`
           - 'crit':       `Enable the critical messages.`
           - 'error':      `Enable the error messages.`
           - 'warning':    `Enable the warning messages.`
           - 'notice':     `Enable the notice messages.`
           - 'info':       `Enable the information messages.`
           - 'debug':      `Enable the debugging messages.`
           - 'all':        `Enable all level messages.`
           - 'default':    `Enable the notice, error, critical, alert, and emergency messages.` >
     [
        <, 'stdout | stderr | syslog | file' | string $facility = 'stdout': `The facility for logging the messsages.`:
           - 'stdout':      `Use STDOUT as the log facility.`
           - 'stderr':      `Use STDERR as the log facility.`
           - 'syslog':      `Use SYSLOG as the log facility.`
           - 'file':        `Use the logging file as the log facility.`
     ]
) true | false
```

该方法设定行者的日志选项。若 `$facility` 为 '/' 打头的字符串时，视作日志文件的绝对路径。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$RUNNER.enablelog('all', 'stderr')
    // true
```

#### 3.2.9) `logmsg` 方法

该方法记录一条日志信息。

**描述**

```js
$RUNNER.logmsg(
    < string $msg: `The message to log.` >,
    [, <'emerg | alert | crit | error | warning | notice | info | debug' $level = 'info':
            - 'emerg':      `This is an emergency messages.`
            - 'alert':      `This is an alert messages.`
            - 'crit':       `This is a critical messages.`
            - 'error':      `This is an error messages.`
            - 'warning':    `This is a warning messages.`
            - 'notice':     `This is a notice messages.`
            - 'info':       `This is an information messages.`
            - 'debug':      `This is a debugging messages.`
        [, < string | null $tag = null: `The tag to prepend to the message.`:
        ]
    ]
) true | false
```

该方法设定行者的日志选项。若 `$facility` 为 '/' 打头的字符串时，视作日志文件的绝对路径。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$RUNNER.logmsg('This is a log')
    // true
```

#### 3.2.10) `chan` 方法

获取或者创建通道。

**描述**

```js
$RUNNER.chan(
        <string $name: `The user defined channel name`>
) native/channel | undefined : `The native entity representing the channel or undefined if not found.`
```

该方法获取指定通道名称对应的原生实体。返回的数据对应一个代表通道（channel）的原生实体，称为“通道实体（channel entity）”。通道实体提供如下方法：

- `$channel.send()`：发送一个数据到通道；当通道满时，该调用将阻塞当前协程，直到数据被读取或者超时。
- `$channel.recv()`：从通道中读取数据；当通道空时，该调用将阻塞当前协程，直到有数据或者超时。

```js
$RUNNER.chan(!
        <string $name: `The user defined channel name`>
        [,
            <ulongint $cap = 1: `The capability of the channel.`>
        ]
) boolean : `@true for success or @false when error.`
```

该方法创建或关闭（容量为 0 时）一个通道；亦可用于改变已有通道的容量（仅已有数据个数小于等于待设置容量时）。

注意 `_htc` 被保留给临时通道使用，不能作为用户自定义通道名称的前缀。

**异常**

以上方法可能产生的异常：

- `ArgumentMissed`：未指定必要参数。可忽略异常；静默求值时返回 `false` 或 `undefined` 。
- `WrongDataType`：无效参数类型。可忽略异常；静默求值时返回 `false` 或 `undefined`。
- `InvalidValue`：无效容量值。可忽略异常；静默求值时返回 `false` 或 `undefined`。
- `BadName`：错误的通道名称。可忽略异常；静默求值时返回 `false` 或 `undefined`。
- `EntityNotFound`：未找到指定的通道。可忽略异常；静默求值时返回 `false` 或 `undefined`。
- `EntityExists`：指定的通道已存在。可忽略异常；静默求值时返回 `false` 或 `undefined`。

**示例**

```js
// 创建 `channel0` 通道
$RUNNER.chan(! 'channel0', 10 )
    // true (assumed that `channel0` was not created)

// 改变 `channel0` 通道的容量到 20
$RUNNER.chan(! 'channel0', 20 )
    // true

// 获取 `chan10` 通道
$RUNNER.chan( 'channel0' )
    // native/channel

// 通过设置通道容量为 0 而关闭 `channel0` 通道
$RUNNER.chan(! 'channel0', 0 )
    // true

// 获取 `channel0` 通道
$RUNNER.chan( 'channel0' )
    // undefined
```

##### 3.2.10.1) 通道实体的 `send` 方法

向通道发送数据。

**描述**

```js
$channel.send(
        <any: data>
) boolean
```

该方法向指定的通道发送数据；当通道满时，该调用将阻塞当前协程，直到数据被读取或者超时。

**异常**

该方法可能产生的异常：

- `EntityGone`：通道消失（已关闭）。可忽略异常；静默求值时返回 `false`。
- `Timeout`：超时。可忽略异常；静默求值时返回 `false`。

**示例**

##### 3.2.10.2) 通道实体的 `recv` 方法

从通道实体中接收数据。

**描述**

```js
$channel.recv() any | undefined
```

该方法从通道中读取数据；当通道空时，该调用将阻塞当前协程，直到有数据或者超时。

**异常**

该方法可能产生的异常：

- `EntityGone`：通道消失（已关闭）。可忽略异常；静默求值时返回 `undefined`。
- `Timeout`：超时。可忽略异常；静默求值时返回 `undefined`。

##### 3.2.10.3) 通道实体的 `cap` 属性

获得通道实体的容量。

**描述**

```js
$channel.cap ulongint | false
```

该属性返回通道实体的容量大小。

**异常**

该方法可能产生的异常：

- `EntityGone`：通道消失（已关闭）。可忽略异常；静默求值时返回 `false`。

##### 3.2.10.4) 通道实体的 `len` 属性

获得通道实体中的数据项个数。

**描述**

```js
$channel.len ulongint | false
```

该属性返回通道中待读取的数据数量。

**异常**

该方法可能产生的异常：

- `EntityGone`：通道消失（已关闭）。可忽略异常；静默求值时返回 `false`。

##### 3.2.10.5) 通道实体上的事件

在通道实体上，可观察如下事件：

- `sendable`：可发送数据（缓冲区有空位）。
- `receivable`：可接收数据（缓冲区有空位）。
- `closed`：被关闭。

#### 3.2.11) `mktempchan` 方法

创建唯一性临时通道。

**描述**

```js
$RUNNER.mktempchan(
    [
        <ulongint $cap = 1: `The capability of the channel.`>
    ]
) string | false: `The channel name.`
```

该方法创建一个具有全局唯一性的临时通道，返回通道名称。

**异常**

以上方法可能产生的异常：

- `WrongDataType`：无效参数类型。可忽略异常；静默求值时返回 `false` 或 `undefined`。
- `InvalidValue`：无效容量值。可忽略异常；静默求值时返回 `false` 或 `undefined`。

**示例**

```js
// 创建一个临时通道
$RUNNER.mktempchan( 10 )
    // '_htc45ECF7'

// 获取 `_htc45ECF7` 通道
$RUNNER.chan( '_htc45ECF7' )
    // native/channel

// 通过设置通道容量为 0 从而关闭临时通道
$RUNNER.chan(! '_htc45ECF7', 0 )
    // true

// 获取 `_htc45ECF7` 通道
$RUNNER.chan( '_htc45ECF7' )
    // undefined
```

### 3.3) `CRTN`

`CRTN` 是一个内置的协程级动态变量，该变量用于获取当前协程的基本信息或者设置当前协程的解释器参数等属性。

另外，在 `$CRTN` 变量上，会产生如下渲染状态相关的事件：

1. `rdrState:suppressed`：当前协程和渲染器的交互（包括页面的更新以及接受来自渲染器的交互事件）被压制。
1. `rdrState:closed`：协程对应的渲染器页面被用户强制关闭。
1. `rdrState:lost`：协程所在行者丢失渲染器的连接，比如渲染器意外终止或者异常退出。
1. `rdrState:regular`：当前协程和渲染器恢复到常规数据交换状态。

#### 3.3.1) `target` 属性

可通过该属性获取 HVML 协程的目标文档类型。

**描述**

```js
$CRTN.target string: `The target document type such as 'html'`
```

获取当前 HVML 协程的目标文档类型，也就是 `hvml` 标签的 `target` 属性值。

**异常**

该属性的获取器不产生异常。

**示例**

```js
$CRTN.target
    // string: 'html'
```

#### 3.3.2) `base` 属性

可通过该属性获取或设置 HVML 协程的基础 URL。

```js
$CRTN.base string: `The base URL.`
```

该属性获取器返回当前的基础 URL，如 `file:///app/com.example.foo/hvml`。

```js
$CRTN.base(!
        <string $new_url: `The new base URL`>
) string | false: `The new base URL normalized from $new_url or `false` for invalid $new_url.`
```

该属性设置器设置 HVML 协程的基础 URL 为预期值，返回正规化处理后的基础 URL。若传递的 `$new_url` 不是合法的或不支持的 URL，则抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性的设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定的参数类型不正确。
- `InvalidValue`：无效的 URL 字符串。

**示例**

```js
$CRTN.base(! "https://foo.example.com//app/hvml/" )
    // string: 'https://foo.example.com/app/hvml'
```

#### 3.3.3) `maxIterationCount` 属性

可通过该属性获取或设置 HVML 协程在执行 `iterate` 动作元素时的最大迭代次数，用于检测可能的死循环。

默认值为 64 位无符号整数的最大值：`2 ^ 64 - 1`。

**描述**

```js
$CRTN.maxIterationCount ulongint: `The current maximal iteration count.`
```

该属性获取器返回当前的最大迭代次数值。

```js
$CRTN.maxIterationCount(!
        <real $new_value: `The new maximal interation count`>
) ulongint | false : `The new maximal iteration count.`
```

该属性设置器设置最大迭代次数值并返回设置后的值。当传入无效值（比如零）时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性的设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定的参数类型不正确。
- `InvalidValue`：无效值，可忽略异常。

**示例**

```js
$CRTN.maxIterationCount(! 10000UL )
```

#### 3.3.4) `maxRecursionDepth` 属性

可通过该属性获取或设置 HVML 协程在递归执行某个功能时的最大递归深度，以防止栈溢出。

默认值为 16 位无符号整数的最大值：`2 ^ 16 - 1`（65535）。

**描述**

```js
$CRTN.maxRecursionDepth ulongint: `The current maximal recursion depth value.`
```

该属性获取器返回当前的最大递归深度值。

```js
$CRTN.maxRecursionDepth(!
        <real $new_value: `new maximal recursion depth`>
) ulongint | false: `The new maximal recursion depth value.`
```

该属性设置器设置最大递归深度值，返回设置后的值。当传入无效值时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性的设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定的参数类型不正确。
- `InvalidValue`：无效值，可忽略异常。

**示例**

```js
$CRTN.maxRecursionDepth(! 10000UL )
```

#### 3.3.5) `maxEmbeddedLevels` 属性

该属性获取或设置解析 eJSON 数据或者处理容器数据时，允许的最大嵌套层级。

默认值为 64。

**描述**

```js
$CRTN.maxEmbeddedLevels ulongint: `The current maximal embedded levels.`
```

该属性获取器返回当前的最大容器数据嵌套层级。

```js
$CRTN.maxEmbeddedLevels(!
        <real $new_value: `new maximal embedded levels`>
) ulongint | false: `The new maximal embedded levels.`
```

该属性设置器设置最大允许的容器数据嵌套层级，返回设置后的值。当传入无效值时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性的设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定的参数类型不正确。
- `InvalidValue`：0 或者超过 16 位无符号整数最大值。

**示例**

```js
$CRTN.maxEmbeddedLevels(! 64UL )
```

#### 3.3.6) `timeout` 属性

可通过该属性获取或设置 HVML 协程在通过数据获取器获取数据或者发送请求时的超时值（单位：秒）。

默认值为 10.0。

**描述**

```js
$CRTN.timeout number : `The current timeout value (in seconds)`
```

该属性获取器返回当前超时值。

```js
$CRTN.timeout(!
        <number $new_timeout: `The new timeout value (in seconds)`>
) number | false: `The new timeout value`
```

该属性设置器设置超时值，并返回设置后的值。当传入无效值时，抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性是设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定了非实数类参数类型。
- `InvalidValue`：无效超时值。

**示例**

```js
// 设置超时值为 3.5 秒。
$CRTN.timeout(! 3.5 )
    // number: 3.5
```

#### 3.3.7) `cid` 属性

通过该属性可获取当前 HVML 协程的标识符（coroutine identifier，简称 `cid`）。

**描述**

```js
$CRTN.cid ulongint : `The corontine identifier`
```

**异常**

该属性的获取器不产生异常。

**示例**

```js
$CRTN.cid
    // ulongint: 10UL
```

#### 3.3.8) `token` 属性

通过该属性可获取或设置当前 HVML 协程的令牌（token）。

**描述**

```js
$CRTN.token string : `The corontine token`
```

该方法获取当前 HVML 协程的令牌（token），形如 `3cd5`。

```js
$CRTN.token(!
        <string $new_token: `The new token for the coroutine`>
) string | false: `The new token`
```

该方法设置当前 HVML 协程的令牌，并返回 `true` 或 `false`。当传入无效值（如下划线打头、不符合协程令牌规范）时，抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该属性的获取器不产生异常。

该属性的设置器可产生如下异常，均为可忽略异常：

- `ArgumentMissed`：未指定必要的参数。
- `WrongDataType`：错误的参数类型。
- `InvalidValue`：不符合协程令牌规范的值或者下划线打头的令牌名称。

**示例**

```js
$CRTN.token
    // string: `7`

$CRTN.token(! 'myTask' )
    // string: `myTask`

$CRTN.token
    // string: `myTask`
```

#### 3.3.9) `uri` 属性

通过该属性可获取当前 HVML 协程的 URI。

**描述**

```js
$CRTN.uri string : `The corontine URI`
```

该方法获取当前 HVML 协程的 URI，形如 `//localhost/cn.fmsoft.hvml.calculator/main/CRTN/7`。

**异常**

该属性的获取器不产生异常。

**示例**

```js
$CRTN.uri
    // string: `//localhost/cn.fmsoft.hvml.calculator/main/CRTN/7`
```

#### 3.3.10) `curator` 属性

通过该属性获取当前 HVML 协程的监护协程标识符。

**描述**

```js
$CRTN.curator ulongint : `The corontine identifier of the curator of the current coroutine`
```

该属性获取器获取当前 HVML 协程的监护协程标识符，若该协程没有监护协程，则返回 0UL。

**异常**

该属性获取器不产生异常。

**示例**

```js
$CRTN.curator
    // ulongint: 5UL
```

#### 3.3.11) `native_crtn` 方法

该方法返回一个可被观察的原生实体，用于代表一个特定的子协程。

**描述**

```js
$CRTN.native_crtn(
    ulongint $cid: `The corontine identifier of one child coroutine`
) native/crtn | undefined
```

该方法根据给定的协程标识符返回一个代表特定子协程，且可观察的原生实体。可用于观察子协程的退出状态。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：无效参数，比如不存在指定的 `cid`；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$CRTN.native_crtn
    // native/crtn
```

#### 3.3.12) `static` 属性

该属性反映的是当前协程在当前执行栈对应的静态变量，应被实现为原生实体。通过该原生实体的属性之获取器和设置器来访问当前协程在指定命名空间中的静态变量。

**描述**

```js
$CRTN.static.<variable>(
    [,
        < string | ulongint $namspace = 1L: `The name space of the variable`.
    ]
) any | undefined
```

该属性获取器获取指定变量的值。`variable` 是变量名称；`namespace` 用于指定变量的名字空间，默认取 1L。

```js
$CRTN.static.<variable>(!
    < any $value: `The new value.` >,
    [,
        < string | ulongint $namspace = 1L: `The name space of the variable`.
    ]
) boolean
```

该属性设置器设置指定变量的值。`variable` 是变量名称；`value` 指定新的值（使用 `undefined` 表示移除该变量）；`namespace` 用于指定变量的名字空间。

**异常**

该原生实体的属性获取器可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：无效参数，如非法变量名；可忽略异常，静默求值时返回 `undefined`。

该原生实体的属性设置器可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数，如非法变量名；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$CRTN.static.x('_root')
    // undefined

$CRTN.static.x(![0, 1, 2], '_root')
    // true

$CRTN.static.x('_root')
    // array: [0, 1, 2]

$CRTN.static.x
    // array: [0, 1, 2]
```

#### 3.3.13) `temp` 属性

该属性反映的是当前协程在执行栈中对应的临时变量，应被实现为原生实体。通过该原生实体的属性获取器和设置器来访问当前协程在指定命名空间中的临时变量。

**描述**

```js
$CRTN.temp.<variable>(
    [,
        < string | ulongint $namspace = 1L: `The name space of the variable`.
    ]
) any | undefined
```

通过上述属性获取器获取指定临时变量的值。`variable` 是变量名称；`namespace` 用于指定变量的名字空间，默认取 1L。

```js
$CRTN.temp.<variable>(!
    < any $value: `The new value.` >,
    [,
        < string | ulongint $namspace = 1L: `The name space of the variable`.
    ]
) boolean
```

通过上述属性设置器设置指定临时变量的值。`variable` 是变量名称；`value` 指定新的值（使用 `undefined` 表示移除该变量）；`namespace` 用于指定变量的名字空间。

**异常**

该原生实体的属性获取器可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：无效参数，如非法变量名；可忽略异常，静默求值时返回 `undefined`。

该原生实体的属性设置器可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数，如非法变量名；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$CRTN.temp.x('_topmost')
    // undefined

$CRTN.temp.x(! [0, 1, 2], '_topmost')
    // true

$CRTN.temp.x('_topmost')
    // array: [0, 1, 2]

$CRTN.temp.x
    // array: [0, 1, 2]
```

### 3.4) `DOC`

`DOC` 是一个内置的协程级动态变量，该变量用于访问 HVML 程序生成的 eDOM 树中的元素。

当使用 `init` 从外部数据源中装载 MIME 类型为 `text/html` 等的数据时，其结果数据是代表对应结构化文档（如 HTML、XML）等的动态对象，因此，也可以使用和 `$DOC` 变量一样的接口来访问该文档及其元素。

#### 3.4.1) `doctype` 方法

该方法返回文档类型，字符串。

```js
$DOC.doctype string : `The target DOCTYPE, such as 'html'`
```

该方法返回目标文档的文档类型；字符串，如 `html`。

**示例**

```js
$DOC.doctype
    // html
```

#### 3.4.2) `select` 方法

根据元素的标识符（id）、类名、标签名称、名称属性值选择元素并生成对应的元素汇集（collection）。

```js
$DOC.select(
        < string $string: `The identifier, the class name(s), the tag name, or the value of name attribute of the element(s) to select.` >
        [, < 'id | class | tag | name' $type = `id`:
            - 'id':         `Select the element whose id property matches the specified string.`
            - 'class':      `Select all elements which have all of the given class name(s).`
            - 'tag':        `Select all elements with the given tag name.`
            - 'name':       `Select all elements with a given name attribute in the document.`
            - 'nstag':      `Select all elements with the given tag name belonging to the given namespace. Note that $string should contains the namespace and the tag name separated by a space character.`
           >
        ]
) native/elementCollection
```

该方法的返回值可能有如下两种情况：

1. `undefined`：错误的标识符或参数类型。
1. 一个元素汇集实体，包含零个或单个元素。

#### 3.4.3) `query` 方法

使用 CSS 选择器查询目标文档上的元素汇集（collection）。

```js
$DOC.query(
    < string $selector: `The CSS selector.` >
) native/elementCollection
```

该方法的返回值可能有如下两种情况：

1. `undefined`：错误的 CSS 选择器或者参数。
1. 一个元素汇集实体，包含零个或多个元素。

#### 3.4.4) `serialize` 方法

该方法串行化文档对象，字符串。

```js
$DOC.serialize(
    [, < 'compact | loose' $method = `compact`:
        - 'compact':    `Serialize the document compactly.`
        - 'loose':      `Serialize the document loosely with line-breaks and indents.`
       >
    ]
) string | false: `The serialized document, such as '<html><body></body></html>'`
```

该方法串行化目标文档；结果为字符串，如 `<html><body></body></html>`。

**示例**

```js
$DOC.serialize
    // '<html><body></body></html>'
```

#### 3.4.5) 元素汇集实体

在元素汇集实体上，我们可以就如下键名获得对应的获取器：

1. `.count()`：获取元素汇集中元素的个数。
1. `.sub( <real: offset>, <real: length )`：以偏移量及长度为依据在给定的元素汇集中选择元素，形成新的元素汇集。
1. `.select( <string: CSS selector )`：以 CSS 选择器在给定的元素汇集中选择元素，并形成一个新的元素汇集。
1. `.attr( <string: attributeName> )`：获取元素汇集中第一个元素的指定属性值。
1. `.hasClass( <string: className> )`：判断元素汇集中是否有任意元素被赋予指定的类名。
1. `.contents()`：获取元素汇集中第一个元素的内容（字符串，按目标标记语言序列化）。
1. `.textContent()`：获得元素汇集中第一个元素（含子元素）的文本内容。
1. `.dataContent()`：获得元素汇集中第一个元素（含子元素）的数据内容，多个内容形成数组。

在元素汇集实体上，我们可以就如下键名获得对应的设置器：

1. `.attr(! <string: attributeName>, <string: value> )`：设置元素汇集中所有元素的属性值。
1. `.attr(! <object: attributes> )`：使用对象信息设置元素汇集中所有元素的多个属性值。
1. `.contents(! <string: content> )`：设置元素汇集中所有元素的内容。
1. `.textContent(! <string: content> )`：设置元素汇集中所有元素的文本内容，将移除可能的子元素。
1. `.dataContent(! <any: content> )`：设置元素汇集中所有元素的数据内容，将移除可能的子元素。
1. `.addClass(! <string: className> )`：为元素汇集中所有的元素添加指定的类名。
1. `.addClass(! <array: classNames> )`：为元素汇集中所有的元素添加数组中指定的所有类名。
1. `.removeAttr(! <string: attributeName> )`：移除元素汇集中所有元素的指定属性。
1. `.removeClass(! )`：移除元素汇集中所有元素的所有类名。
1. `.removeClass(! <string: className> )`：移除元素汇集中所有元素的指定类名。
1. `.removeClass(! <array: classNames> )`：移除元素汇集中所有元素在数组中的所有类名。

在以上接口支持下，HVML 动作元素中通过 CSS 选择器引用元素时，如：

```hvml
<update on '#the-user-stats > h2 > span' at 'textContent attr.class' with ["10", "text-warning"] />
```

相当于：

```hvml
<update on $DOC.query('#the-user-stats > h2 > span') at 'textContent attr.class' with ["10", "text-warning"] />
```

通常在这些键名上会设定有相应的获取器或设置器函数，于是即可实现 HVML 规范中要求的表达式：

```js
// <div id="foo" bar="baz">

// 获取 id 为 foo 的元素上的属性 `bar` 的值：
$DOC.query("#foo").attr('bar')

// 设置 id 为 foo 的元素上的属性 `bar` 的值：
$DOC.query("#foo").attr(! "bar", "qux")
```

参阅：<https://api.jquery.com/category/attributes/>

### 3.5) `RDR`

`RDR` 是一个内置的行者级动态变量，该变量用于访问当前行者连接的渲染器。

#### 3.5.1) `info` 属性

该属性的获取器返回当前的渲染器信息对象。该属性不提供设置器。

```js
$RDR.info object : `An object describing the information of the renderer:`
        - 'name':           < string: `The name of the renderer.` >
        - 'version':        < string: `The version of the renderer.` >
        - 'locale':         < string: `The locale of the renderer.` >
        - 'html':           < string: `The HTML version supported by the renderer.` >
        - 'vendor':         < string: `The vendor of the renderer.` >
```

**异常**

（无）

**示例**

```js
$RDR.info
    // { 'name': 'Chrome', 'version': '5.0', 'locale': 'zh_CN', 'html': '5.3', 'vendor': 'FMSoft'}
```

#### 3.5.2) `state` 属性

该属性的获取器返回当前的渲染器状态对象。该属性不提供设置器。

```js
$RDR.state object : `An object describing the current state of the renderer:`
        - 'comm':               < string: `The communication method; an empty string if not connected.` >
        - 'prot':               < string: `The protocol name, such as "PURCMC".` >
        - 'prot-version':       < string: `The protocol version` >
        - 'prot-ver-code':      < ulongint: `The protocol version code` >
        - 'uri':                < string: `machine hardware name` >
```

**异常**

（无）

**示例**

```js
$RDR.state
    // { 'comm': 'socket', 'prot': 'PURCMC', 'prot-version': '110', 'prot-ver-code': 110UL, 'uri': 'unix:///var/tmp/purcmc.sock'}
```

#### 3.5.3) `stats` 属性

该属性的获取器返回解释器和渲染器之间的通讯统计信息。该属性不提供设置器。

```js
$RDR.stats object | null: `An object describing the statistics of the communication between the interpreter and the renderer:`
        - 'nrRequestsSent':         < ulongint: `The number of requests sent to the renderer.` >
        - 'nrRequestsRecv':         < ulongint: `The number of requests received from the renderer.` >
        - 'nrResponsesSent':        < ulongint: `The number of responses sent to the renderer.` >
        - 'nrResponsesRecv':        < ulongint: `The number of responses received from the renderer.` >
        - 'nrEventsSent':           < ulongint: `The number of events sent to the renderer.` >
        - 'nrEventsRecv':           < ulongint: `The number of events received from the renderer.` >
        - 'bytesSent':              < ulongint: `The total bytes sent to the renderer.` >
        - 'bytesRecv':              < ulongint: `The total bytes received from the renderer.` >
        - 'durationSeconds':        < ulongint: `The duration seconds of the connection.` >
```

**异常**

（无）

**示例**

```js
$RDR.stats
    // { 'nrRequestsSent': 5UL, 'nrResponsesRecv': 5UL, 'nrRequestsRecv': 0, 'nrResponsesSent': 0, 'nrEventsSent': 0, 'nrEventsRecv': 10UL, 'bytesSent': 2368UL, 'bytesRecv': 468UL, 'durationSeconds': 10UL }
```

#### 3.5.4) `connect` 方法

该方法断开当前的渲染器并连接到指定的渲染器。

```js
$RDR.connect( string : `A string prepresenting the communication method of the renderer`
        <'headless | thread | socket | websocket ' $comm = 'headless' >,
        [, <string $uri: `URI of the target renderer.` > ]
) true | false
```

**异常**

该方法可能产生如下可忽略异常：

- `WrongDataType`：错误的数据类型。
- `InvalidValue`：非法数据，如不正确的通讯方法和渲染器 URI 等。
- 其他由底层操作系统产生的异常。

**示例**

```js
$RDR.connect('socket', 'unix:///var/tmp/purcmc.sock')
    // true
```

#### 3.5.5) `disconn` 方法

该方法断开当前的渲染器。

```js
$RDR.disconn(
) true | false
```

**异常**

该方法可能产生如下可忽略异常：

- `EntityNotFound`：未找到指定的实体；当前未连接到任何渲染器。
- 其他由底层操作系统产生的异常。

**示例**

```js
$RDR.disconn()
    // true
```

### 3.6) `DATETIME`

#### 3.6.1) `time_prt` 方法

以给定的格式化规范/标准获得时间字符串。

**描述**

```js
$DATETIME.time_prt(
        <'atom | cookie | iso8601 | rfc822 | rfc850 | rfc1036 | rfc1036 | rfc1123 | rfc7231 | rfc2822 | rfc3339 | rfc3339-ex | rss | w3c' $format = 'iso8601':
            - 'atom':       `Atom (example: 2005-08-15T15:52:01+00:00)`
            - 'cookie':     `HTTP Cookies (example: Monday, 15-Aug-2005 15:52:01 UTC)`
            - 'iso8601':    `Same as 'ATOM' (example: 2005-08-15T15:52:01+00:00)`
            - 'rfc822':     `RFC 822 (example: Mon, 15 Aug 05 15:52:01 +0000)`
            - 'rfc850':     `RFC 850 (example: Monday, 15-Aug-05 15:52:01 UTC)`
            - 'rfc1036':    `RFC 1036 (example: Mon, 15 Aug 05 15:52:01 +0000)`
            - 'rfc1123':    `RFC 1123 (example: Mon, 15 Aug 2005 15:52:01 +0000)`
            - 'rfc7231':    `RFC 7231 (since PHP 7.0.19 and 7.1.5) (example: Sat, 30 Apr 2016 17:52:13 GMT)`
            - 'rfc2822':    `RFC 2822 (example: Mon, 15 Aug 2005 15:52:01 +0000)`
            - 'rfc3339':    `Same as 'ATOM'`
            - 'rfc3339-ex': `RFC 3339 EXTENDED format (example: 2005-08-15T15:52:01.000+00:00)`
            - 'rss':        `RSS (example: Mon, 15 Aug 2005 15:52:01 +0000)`
            - 'w3c':        `World Wide Web Consortium (example: 2005-08-15T15:52:01+00:00)`
        >
        [, <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for current calendar time.`>
            [, <string $timezone>
            ]
        ]
) string | false: `A date and time string in the given time format $format and the time zone $timezone for the specified calendar time $seconds.`
```

该方法获得指定日历时间在给定时区，以给定格式化标准/规范名称（如 ISO8601、RFC850）形式展示的时间字符串。

**异常**

该方法可能产生如下可忽略异常：

- `WrongDataType`：错误的数据类型。
- `InvalidValue`：非法数据，如不正确的格式规范名称、时间或者时区名称等。

**示例**

```js
$DATETIME.time_prt
    // string: '2020-06-24T11:27:05+08:00'

$DATETIME.time_prt.iso8601
    // string: '2020-06-24T11:27:05+08:00'

$DATETIME.time_prt('iso8601')
    // string: '2020-06-24T11:27:05+08:00'

// 获取当前时间之前一个小时在上海时区（北京标准时间）的 ISO8601 标准字符串
$DATETIME.time_prt('iso8601', $MATH.eval('x - 3600', { x: $SYS.time }), 'Asia/Shanghai')
    // string: '2020-06-24T11:27:05+08:00'

// 获取当前时间上海时区（北京标准时间）的 RFC822 标准字符串
$DATETIME.time_prt('rfc822', null, 'Asia/Shanghai')
    // string: 'Mon, 15 Aug 05 15:52:01 +0000'
```

**参见**

- PHP: <https://www.php.net/manual/en/timezones.php>
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime 类：<https://www.php.net/manual/en/class.datetime.php>

#### 3.6.2) `utctime` 方法

获取当前系统时间的 UTC 分解时间。

**描述**

```js
$DATETIME.utctime object : `An object representing the current broken-down time in UTC.`
```

获取当前日历时间的 UTC（协调世界时）分解时间（broken-down time），返回类型为对象。

```js
$DATETIME.utctime(
        <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for the current calendar time.`>
) object
```

获得给定日历时间的 UTC 分解时间（broken-down time），返回类型为对象。

上述方法返回的分解时间对象包含如下属性：

```js
{
   'usec':  <number: `The number of microseconds after the second, in the range 0 to 999,999.`>
   'sec':   <number: `The number of seconds after the minute, normally in the range 0 to 59, but can be up to 60 to allow for leap seconds.`>
   'min':   <number: `The number of minutes after the hour, in the range 0 to 59.`>
   'hour':  <number: `The number of hours past midnight, in the range 0 to 23.`>
   'mday':  <number: `The day of the month, in the range 1 to 31.`>
   'mon':   <number: `The number of months since January, in the range 0 to 11.`>
   'year':  <number: `The number of years since 1900.`>
   'wday':  <number: `The number of days since Sunday, in the range 0 to 6.`>
   'yday':  <number: `The number of days since January 1, in the range 0 to 365.`>
   'isdst': <number: `A flag that indicates whether daylight saving time is in effect at the time described. The value is positive if daylight saving time is in effect, zero if it is not, and negative if the information is not available.`>
   'tz':    <string: `The timezone name.`>
}
```

**示例**

```js
// 获取当前时间在当前时区的分解时间
$DATETIME.utctime
    // object

// 获取当前时间之前一个小时的分解时间
$DATETIME.utctime($MATH.sub($SYS.time, 3600))
    // object
```

**参见**

- C 标准函数：`gmtime_r()`

#### 3.6.3) `localtime` 方法

获取指定时区的分解时间。

**描述**

```js
$DATETIME.localtime object : `An object representing the current broken-down time in the current timezone.`
```

获得当前时间在当前时区的分解时间（broken-down time），返回类型为对象。


```js
$DATETIME.localtime(
        [, <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for the current calendar time.`>
            [, <string $timezone>
            ]
        ]
) object
```

获得给定时间在指定时区的分解时间（broken-down time），返回类型为对象。

上述方法返回的分解时间对象包含如下属性：

```js
{
   'usec':  <number: `The number of microseconds after the second, in the range 0 to 999,999.`>
   'sec':   <number: `The number of seconds after the minute, normally in the range 0 to 59, but can be up to 60 to allow for leap seconds.`>
   'min':   <number: `The number of minutes after the hour, in the range 0 to 59.`>
   'hour':  <number: `The number of hours past midnight, in the range 0 to 23.`>
   'mday':  <number: `The day of the month, in the range 1 to 31.`>
   'mon':   <number: `The number of months since January, in the range 0 to 11.`>
   'year':  <number: `The number of years since 1900.`>
   'wday':  <number: `The number of days since Sunday, in the range 0 to 6.`>
   'yday':  <number: `The number of days since January 1, in the range 0 to 365.`>
   'isdst': <number: `A flag that indicates whether daylight saving time is in effect at the time described. The value is positive if daylight saving time is in effect, zero if it is not, and negative if the information is not available.`>
   'tz':    <string: `The timezone name.`>
}
```

**示例**

```js
// 获取当前时间在当前时区的分解时间
$DATETIME.localtime
    // object

// 获取当前时间之前一个小时在上海时区（北京标准时间）的分解时间
$DATETIME.localtime($MATH.sub($SYS.time, 3600), 'Asia/Shanghai')
```

**参见**

- C 标准函数：`localtime_r()`

#### 3.6.4) `mktime` 方法

将分解时间转换为日历时间（Epoch 以来的秒数）。

**描述**

```js
$DATETIME.mktime(
        <object $tm>
) longdouble : `seconds (including microseconds) since Epoch.`
```

转换分解时间为日历时间（Epoch 以来的秒数），返回值类型为 longdouble。

**示例**

**参见**

- C 标准函数：`mktime_r()`

#### 3.6.5) `fmttime` 方法

格式化日历时间。

**描述**

```js
$DATETIME.fmttime(
        <string $format: `The format string`>
        [, <null | number | longint | ulongint | longdouble: `The calendar time (seconds since Epoch); @null for the current calendar time.`>
            [, <string $timezone>
            ]
        ]
) string | false
```

该方法按指定的格式格式化一个日历时间，返回字符串。

该方法使用的格式化修饰符同 C 标准函数 `strftime()`，但有如下例外或增强：

1. 不支持 GNU 的扩展修饰符，如 `_` 等。
1. `strftime()` 表示时区差异时，仅支持 `+0200` 这种输出形式，为支持 `+02:00` 这种形式，可在格式化字符串中使用 `{%z:}`。
1. `strftime()` 不支持毫秒，为支持毫秒，可使用 `{m}`。
1. 当格式字符串以 `{UTC}` 打头时，表示使用不将日历时间按当前时区转换为本地时间，而始终以协调世界时（UTC）格式化。
1. 当格式字符串中需要表示字面的 `{` 和 `}` 符号时，前置转义字符 `\`。

**示例**

```js
// 获得类似 `11:27` 的时间字符串
$DATETIME.fmttime("It is %H:%M now")
    // string: 'It is 11:27 now'

// 获得类似 `11:27` 的时间字符串
$DATETIME.fmttime("现在是中国标准时间 %H:%M", null, 'Asia/Shanghai')
    // string: '现在是中国标准时间 11:27'
```

**参见**

- C 标准函数：`strftime()`

#### 3.6.6) `fmtbdtime` 方法

格式化分解时间。

**描述**

```js
$DATETIME.fmtbdtime(
        <string $format: `The format string`>,
        <null | object $bdtime: `The broken-down time object returned by utctime() or localtime(); @null for the current calendar time in current timzone.`
) string | false
```

该方法按指定的格式格式化一个分解时间，返回字符串。

**示例**

```js
// 获得类似 `08:55` 的时间字符串
$DATETIME.fmtbdtime("It is %H:%M now in Asia/Shanghai", $DATETIME.localtime($MATH.sub($SYS.time, 3600), 'Asia/Shanghai'))
    // string: 'It is 08:55 now in Asia/Shanghai'
```

**参见**

- C 标准函数：`strftime()`

### 3.7) `DATA`

该动态变量为行者级内置变量，用于返回数据的类型、成员个数等信息。

#### 3.7.1) `type` 方法

返回数据的类型名称。

**描述**

```js
$DATA.type(
        [ <any $data> ]
) string
```

该方法返回给定数据的类型名称，字符串。若未指定数据，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.type
    // string: `undefined`

$DATA.type( 3.5 )
    // string: `number`
```

#### 3.7.2) `memsize` 方法

返回数据占用的内存大小。

**描述**

```js
$DATA.memsize(
        [ <any $data> ]
) ulongint
```

该方法返回数据占用的内存空间大小，返回值为 `ulongint` 类型。未指定数据时，将返回变体包装器的大小。

注意：该函数的返回值和解释器的实现有关。开发者不应该期望不同的解释器针对同一数据返回同样的结果。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.memsize
    // ulongint: 32UL

$DATA.memsize( "HVML" )
    // ulongint: 32UL
```

#### 3.7.3) `count` 方法

返回数据的数据项个数。

**描述**

```js
$DATA.count(
        [ <any $data> ]
) ulongint
```

该方法返回数据的数据项个数，返回值为 `ulongint` 类型。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.count
    // ulongint: 0

$DATA.count( 3.5 )
    // ulongint: 1UL

$DATA.count( [ 1.0, 2.0 ] )
    // ulongint: 2UL
```

#### 3.7.4) `nr_children` 方法

返回数据的子数据项个数；对非容器类数据，始终返回 0。

**描述**

```js
$DATA.nr_children(
        [ <any $data> ]
) ulongint
```

该方法返回数据的子数据项个数，返回值为 `ulongint` 类型。未指定数据时，按 `undefined` 处理。和 `$DATA.count` 不同，该方法针对非容器类数据始终返回 0。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.nr_children
    // ulongint: 0

$DATA.nr_children( 3.5 )
    // ulongint: 0

$DATA.nr_children( [ 1.0, 2.0 ] )
    // ulongint: 2UL
```

#### 3.7.5) `numerify` 方法

对给定数据做数值化处理。

**描述**

```js
$DATA.numerify(
        [ <any $data> ]
) number
```

该方法对任意数据做数值化处理，返回一个数值。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.numerify( "1.0" )
    // number: 1.0

$DATA.numerify
    // number: 0
```

#### 3.7.6) `booleanize` 方法

对给定的数据做布尔化处理。

**描述**

```js
$DATA.booleanize(
        [ <any $data> ]
) boolean
```

该方法对给定的数据做布尔化处理，返回布尔值。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.booleanize
    // boolean: false
```

#### 3.7.7) `stringify` 方法

对给定的数据做字符串化处理。

**描述**

```js
$DATA.stringify(
        <any $data>
) string
```

该方法对任意数据做字符串化处理，返回字符串。未指定数据时，按 `undefined` 处理。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `TooSmall`：过小的缓冲区。不可忽略异常。

**示例**

```js
$DATA.stringify
    // string: 'undefined'

$DATA.stringify(123)
    // string: '123'
```

#### 3.7.8) `serialize` 方法

对给定的数据做字符串化处理。

**描述**

```js
$DATA.serialize(
        <any $data>
        [, < '[real-json | real-ejson] || [ runtime-null | runtime-string ] || plain || spaced || pretty || pretty_tab || [bseq-hex-string | bseq-hex | bseq-bin | bseq-bin-dots | bseq-base64] || no-trailing-zero || no-slash-escape' $options = `real-json runtime-string plain bseq-hex-string no-slash-escape`:
            - 'real-json':          `Use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
            - 'real-ejson':         `Use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
            - 'runtime-null':       `Treat all HVML-specific runtime types as null, i.e., undefined, dynamic, and native values will be serialized as null.`
            - 'runtime-string':     `Use string placehodlers for HVML-specific runtime types: "<undefined>", "<dynamic>", and "<native>".`
            - 'plain':              `Do not use any extra formatting characters (whitespace, newline, or tab).`
            - 'spaced':             `Use minimal space characters to format the output.`
            - 'pretty':             `Use two-space to beautify the output.`
            - 'pretty-tab':         `Use tab instead of two-space to beautify the output.`
            - 'bseq-hex-string':    `Serialize binary sequence as hexadecimal string, e.g. "A0B0C0567890".`
            - 'bseq-hex':           `Use hexadecimal form to serialize binary sequence.`
            - 'bseq-bin':           `Use binary form to serialize binary sequence.`
            - 'bseq-bin-dots':      `Use binary form to serialize binary sequence and use dots to seperate the binary digits per four digits. e.g., b1100.1010.`
            - 'bseq-base64':        `Use Base64 to serialize binary sequence.`
            - 'no-trailing-zero':   `Drop trailing zero for float values.`
            - 'no-slash-escape':    `Do not escape the forward slashes ('/').`
           >
        ]
) string
```

该方法对给定的数据做序列化处理，返回字符串。未指定数据时，按 `undefined` 以及默认的格式化要求处理。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。

**示例**

```js
$DATA.serialize
    // string: 'null'

$DATA.serialize(undefined, 'runtime-string')
    // string: '"<undefined>"'

$DATA.serialize("123")
    // string: '"123"'

$DATA.serialize([1, 2])
    // string: '[1,2]'
```

#### 3.7.9) `sort` 方法

对数组或者集合执行排序。

**描述**

```js
$DATA.sort(
        < array | set $data: `An array or set to sort.` >,
        < 'asc | desc' $method = 'asc': `Indicate sorting ascendingly or descendingly.` >
        [, < 'auto | number | case | caseless' $method = 'auto':
            - 'auto':       `Compare members automatically.`
            - 'number':     `Compare members as numbers.`
            - 'case':       `Compare members as strings case-sensitively.`
            - 'caseless':   `Compare members as strings case-insensitively.` >
        ]
) $data | false
```

该方法对给定的数组或者集合做排序，返回数据本身。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$DATA.sort([3, 4, 1, 0], 'asc')
    // array: [0, 1, 3, 4]
```

#### 3.7.10) `shuffle` 方法

随机打乱给定数组或者集合的成员顺序。

**描述**

```js
$DATA.shuffle(
        < array | set $data: `An array or set to shuffle.` >
) $data | false
```

该方法随机打乱给定数组或者集合的成员顺序，返回数据本身。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$DATA.shuffle([1, 2, 3, 4, 5])
    // array: [4, 3, 2, 5, 1]
```

#### 3.7.11) `compare` 方法

比较两个数据。

**描述**

```js
$DATA.compare(
        < any: `The first data.` >,
        < any: `The second data.` >
        [, < 'auto | number | case | caseless' = 'auto':
            - 'auto':       `Compare automatically.`
            - 'number':     `Compare two items as numbers.`
            - 'case':       `Compare two items as strings case-sensitively.`
            - 'caseless':   `Compare two items as strings case-insensitively.` >
        ]
) number | undefined
```

该方法对给定两个数据做对比，返回数值：

- 等于 0 表示两个数据相等；
- 小于 0 表示第一个数据小于第二个数据；
- 大于 0 表示第一个数据大于第二个数据。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$DATA.compare(1, "1")
    // number: 0
```

#### 3.7.12) `parse` 方法

解析 JSON/eJSON 字符串，返回数据。

**描述**

```js
$DATA.parse(
        < string: $string: `The JSON/EJSON string to be parsed.` >
) any | undefined
```

该方法解析 JSON/EJSON 字符串，返回数据。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
#DATA.parse("false")
    // boolean: false

#DATA.parse("[]")
    // array: []
```

#### 3.7.13) `isequal` 方法

判断两个数据是否完全相等。

**描述**

```js
$DATA.isequal(
        < any: `The first data.` >,
        < any: `The second data.` >
) boolean | undefined
```

该方法判断给定的两个数据是否完全相等（类型一致且值相等），返回布尔型。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数。可忽略异常，返回 `undefined`。

**示例**

```js
#DATA.isequal(false, 0)
    // boolean: false

#DATA.isequal(false, false)
    // boolean: true
```

#### 3.7.14) `fetchstr` 方法

从二进制字节序列中抽取指定编码的字符串。

**描述**

```js
$DATA.fetchstr( < bsequece $bytes: `The byte squence to fetch string.` >,
        < 'utf8 | utf16 | utf32 | utf16le | utf32le | utf16be | utf32be' $encoding: `The encoding; see Binary Format Notation.` >
        [, < null | real $length = null: `The length to decode in bytes.` >
            [, < real $offset = 0: `The offset in the byte sequence.` > ]
        ]
) string
```

该方法将给定的二进制字节序列按指定的编码及长度转换为对应的字符串，返回字符串。包含错误编码时，将抛出 `BadEncoding` 异常；或者在静默求值时，返回已正确转换的字符串。

**参数**

- `bytes`  
待处理的二进制字节序列。
- `encoding`  
指定字符编码。
- `length`  
指定解码长度（字节为单位）。取 `null` 时表示遇到终止字符为止：对 UTF-8 编码，遇到 `\0` 字节为止；对 UTF-16 编码，遇到两个连续的 `\0` 字节为止；对 UTF-32 编码，遇到四个连续的 `\0` 字节为止。
- `offset`  
指定解码起始位置（字节为单位）。可为负值，-1 表示最后一个字节，-2 表示倒数第二个字节，以此类推。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数。静默求值时返回空字符串。
- `WrongDataType`：错误的参数类型。静默求值时返回空字符串。
- `BadEncoding`：错误编码。静默求值时返回空字符串。
- `InvalidValue`：错误的长度或者偏移量值。静默求值时返回空字符串。

**示例**

```js
// UTF8: 北京上海
$DATA.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8', 6, -6 )
    // string: "上海"

// UTF8: 北京上海
$DATA.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8:6' )
    // string: "北京"
```

#### 3.7.15) `fetchreal` 方法

该方法在给定的二进制序列的指定位置，按指定的实数类型（以及大小头顺序）提取实数，返回相应的实数类型。

```js
$DATA.fetchreal(
        < bsequece $bytes: `The byte sequence to fetcher a real number.` >,
        <'i8 | i16 | i32 | i64 | u8 | u16 | u32 | u64 | f16 | f32 | f64 | f96 | f128 ...' $binary_format: `The binary format and/or endianness; see Binary Format Notation`>
        [,
            < real $offset = 0: `The offset in the byte sequence.` >
        ]
) real | array | undefined
```

该方法将给定的二进制字节序列按指定的格式转换为对应的实数类型。

该方法支持 `i16[le|be][:<QUANTITY>]` 记法，用于表示实数的大小头以及个数。当指定有效个数时，返回数组。

**异常**

该方法可能抛出如下异常：

- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：错误的偏移量值或超过二进制字节序长度的个数等；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$DATA.fetchreal( bx0a00, 'i16le', 0 )
    // longint: 10L

$DATA.fetchreal( bx0a00, 'i8:2', 0 )
    // array: [ 10L, 00L ]
```

#### 3.7.16) `crc32` 方法

计算任意数据的 CRC32 多项式值。

**描述**

```js
$DATA.crc32(
        < any $data: `The data.`>
        < 'CRC-32 | CRC-32/BZIP2 | CRC-32/MPEG-2 | CRC-32/POSIX | CRC-32/XFER | CRC-32/ISCSI | CRC-32C | CRC-32/BASE91-D | CRC-32D | CRC-32/JAMCRC | CRC-32/AIXM | CRC-32Q' $algo = 'CRC-32': `The name of CRC32 algorithm; use @null for default algorithm.`>
        < 'ulongint | binary | uppercase | lowercase' $type = 'ulongint': `The type of return data:`
            - 'ulongint': `A unsigned longint value have the CRC32 checksum.`
            - 'binary': `A byte sequence (totally 4 bytes).`
            - 'uppercase': `A 8-character hexadecimal string in uppercase letters.`
            - 'lowercase': `A 8-character hexadecimal string in lowercase letters.` >
) ulongint | bsequence | string | undefined
```

该方法计算任意数据的 CRC32 多项式值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：错误的 CRC32 算法名称；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$DATA.crc32('HVML', 'CRC-32/POSIX', 'uppercase')
    // string: '7AD1CDE5'
```

**参见**

- PHP `crc32()` 函数：<https://www.php.net/manual/en/function.crc32.php>
- [CRC 在线计算]<https://crccalc.com/>
- [Catalogue of parametrised CRC algorithms](https://reveng.sourceforge.io/crc-catalogue/17plus.htm)

#### 3.7.17) `md5` 方法

计算任意数据的 MD5 散列值。

**描述**

```js
$DATA.md5(
        < any $data >
        < 'binary | uppercase | lowercase' $type = 'binary': `The type of return data:`
            - 'binary':     `The MD5 digest is returned as a binary sequence (totally 16 bytes).`
            - 'uppercase':  `The MD5 digest is returned as a 32-character hexadecimal number in uppercase letters.`
            - 'lowercase':  `The MD5 digest is returned as a 32-character hexadecimal number in lowercase letters.`
        >
) string | bsequence
```

该方法计算任意数据的 MD5 散列值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**示例**

**参见**

- PHP `md5()` 函数：<https://www.php.net/manual/en/function.md5.php>

#### 3.7.18) `sha1` 方法

计算任意数据的 SHA1 散列值。

**描述**

```js
$DATA.sha1(
        < any $data >
        < 'binary | uppercase | lowercase' $type = 'binary': `The type of return data:`
            - 'binary':     `The MD5 digest is returned as a binary sequence (totally 20 bytes).`
            - 'uppercase':  `The MD5 digest is returned as a 40-character hexadecimal number in uppercase letters.`
            - 'lowercase':  `The MD5 digest is returned as a 40-character hexadecimal number in lowercase letters.`
        >
) string | bsequence
```

该方法计算任意数据的 SHA1 散列值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**示例**

**参见**

- PHP `sha1()` 函数：<https://www.php.net/manual/en/function.sha1.php>

#### 3.7.19) `pack` 方法

将多个数据打包为二进制序列。

**描述**

```js
$DATA.pack(
        <string $format: `The format string; see Binary Format Notation.` >,
        <real | string | bsequence | array $first: `The first data.` >
        [,  <real | string | bsequence | array $second: `The second data.` >
            [, <real | string | bsequence | array $third: `The third data.` >
                [, ... ]
            ]
        ]
) string
```

该函数将传入的多个实数、实数数组、字符串或字节序列按照 `$format` 指定的二进制格式打包为字节序列。

```js
$DATA.pack(
        < string $format: `The format string; see Binary Format Notation.` >,
        < array $data >
) string
```

当传入两个参数，且第二个参数为数组时，该函数将传入的数组之成员依次按照 `$format` 指定的二进制格式转换为字节序列。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回已打包数据。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回已打包数据。
- `BadEncoding`：错误编码；可忽略异常，静默求值时返回已打包数据。
- `InvalidValue`：给定数据超过格式指定的实数范围；可忽略异常，静默求值时返回已打包数据。

**备注**

为防止混淆，当使用第一种原型时，应确保第一个参数不是数组，或者传入三个或以上参数。

**示例**

```js
$DATA.pack( "i16le i32le", 10, 10)
    // bsequence: bx0a000a000000

$DATA.pack( "i16le:2 i32le", [[10, 15], 255])
    // bsequence: bx0A000F00FF000000

$DATA.pack( "i16le:2 i32le", [10, 15], 255)
    // bsequence: bx0A000F00FF000000
```

**参见**

- [1.2) 二进制格式表示法](#12-二进制格式表示法)

#### 3.7.20) `unpack` 方法

将二进制序列分解为多个数据。

**描述**

```js
$DATA.unpack(
        <string $format: `The format string; see Binary Format Notation.` >,
        <bsequence $data: `The data.`>
) array | real | string | bsequenc
```

该函数将传入字节序列按照 `$format` 指定的二进制格式分解为多个数据构成的数组。

当 `$format` 指定的格式字符串包含多个基本数据类型时，该函数返回数组；否则返回单个数据。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回已分解数据。
- `InvalidValue`：格式和字节序列不匹配；可忽略异常，静默求值时返回已分解数据。

**示例**

```js
$DATA.unpack( "i16le i32le", bx0a000a000000)
    // array: [10L, 10L]

$DATA.unpack( "i16le", bx0a000a000000)
    // longint: 10L
```

**参见**

- [1.2) 二进制格式表示法](#12-二进制格式表示法)

#### 3.7.21) `bin2hex` 方法

将字符串或者字节序列转换为十六进制字符串表达。

**描述**

```js
$DATA.bin2hex(
        <string | bsequence $data>
        [, < 'lowercase | uppercase' $options = 'lowercase':
            - 'lowercase': `Use lowercase letters for hexadecimal digits.`
            - 'uppercase': `Use uppercase letters for hexadecimal digits.`
            >
        ]
) string
```

该函数将一个字节序列 `data` 转换为十六进制表述的字符串。转换以字节为单位，高四位字节优先。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回空字符串。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回空字符串。

**示例**

```js
$DATA.bin2hex( bb0000.1111.1111.0000, 'uppercase')
    // string: '0FF0'
```

**参见**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.bin2hex.php>

#### 3.7.22) `hex2bin` 方法

十六进制字符串转换为字节序列。

**描述**

```js
$DATA.hex2bin(
        < string $data >
) bsequence
```

该函数将十六进制字符串 `data` 转换为二进制字节序列。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回空字节序列。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回空字节序列。
- `BadEncoding`：不可识别的十六进制字符串；可忽略异常，静默求值时返回空字节序列。

**示例**

```js
$DATA.hex2bin( '0FF0' )
    // bsequence: bb0000.1111.1111.0000
```

**参见**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.hex2bin.php>

#### 3.7.23) `base64_encode` 方法

使用 MIME Base64 编码字符串或者字节序列。

**描述**

```js
$DATA.base64_encode(
        < string | bsequence $data >
) string
```

该函数将给定的字符串或者二进制序列 `data` 按照 Base64 进行编码。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回空字符串。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回空字符串。

**示例**

```js
$DATA.base64_encode( bx48564D4C )
    // string: 'SFZNTA=='

$DATA.base64_encode('HVML 是全球首款可编程标记语言')
    // string: 'SFZNTCDmmK/lhajnkIPpppbmrL7lj6/nvJbnqIvmoIforrDor63oqIA='
```

**参见**

- PHP `base64_encode()` 函数：<https://www.php.net/manual/en/function.base64-encode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.7.24) `base64_decode` 方法

解码使用 MIME Base64 编码的字符串。

**描述**

```js
$DATA.base64_decode(
        <string $data>,
) bsequence
```

该函数将输入字符串 `data` 按照 Base64 进行解码，返回解码后的字节序列。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回空字节序列。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回空字节序列。
- `BadEncoding`：错误的 Base64 编码；可忽略异常，静默求值时返回空字节序列。

**示例**

```js
$DATA.base64_decode( 'SFZNTA==' )
    // bsequence: bx48564D4C
```

**参见**

- PHP `base64_decode()` 函数：<https://www.php.net/manual/en/function.base64-decode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.7.25) `arith` 方法

基于两个数值做简单整数算术运算。

**描述**

```js
$DATA.arith(
        <' + | - | * | / | % | ^ ' $arithmetic_operation>,
        <any $data1>,
        <any $data2>
) longint | undefined
```

该函数将对输入的两个数值做基于整数的加、减、乘、除、取模、次幂等的算术计算，始终返回 `longint` 类型的结果。两个数值将首先被强制转换为 `longint` 类型的数值，然后进行相应的运算。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误数据类型，即无法转换为 `longint` 类型数值的数据；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：错误值，比如除数为零的情况，或者不正确的位元操作符；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$DATA.arith( '+', 3, 2 )
    // longint: 5L
```

#### 3.7.26) `bitwise` 方法

基于两项数值的位元计算。

**描述**

```js
$DATA.bitwise(
        <' & | "|" | ~ | ^ | < | > ' $bitwise_operation>,
        <any $data1>
        [, <any $data2> ]
) ulongint | undefined
```

该函数将输入的两项数值（或一项数值）做基于无符号整数的与、或、反、亦或、左移、右移等的位元运算，始终返回 `ulongint` 类型结果。参与计算的数值，将首先被强制转换为 `ulongint` 类型，然后进行相应的运算。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误数据类型，即无法转换为 `ulongint` 类型数值的数据；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：错误值，比如不正确的位元操作符；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$DATA.bitwise( '|', 0, 15 )
    // ulongint: 15UL
```

#### 3.7.27) `isdivisible` 方法

判断一个数是否可以整除另一个数。

**描述**

```js
$DATA.isdivisible(
        < any $dividend: `The number as dividend >,
        < any $divisor: `The number as divisor >
) boolean | undefined
```

该方法判断给定的除数（`$divisor`）是否可以整除被除数（`$dividend`），返回布尔型。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数。可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的数据类型（被除数或除数无法转换为 `longint` 类型）。可忽略异常，静默求值时返回 `undefined`。
- `ZeroDivision`：除数为零。可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
#DATA.isdivisiable(6, 3)
    // boolean: true

#DATA.isdivisiable(5, 2)
    // boolean: false
```

#### 3.7.28) `match_members` 方法

返回一个线性容器（如数组、元组、集合）中和给定值匹配的所有成员之索引或值。

**描述**

```js
$DATA.match_members(
        <linctnr $haystack: `The linear container to search in.` >,
        <any | string $needle: `The variant to search for in the haystack.` >
        [, < '[exact | auto | number | case | caseless | wildcard | regexp] || [indexes | values | iv-pairs]' $method = 'exact indexes': `The search method:`
            - 'exact':      `Compare two variants exactly.`
            - 'auto':       `Compare two variants automatically.`
            - 'number':     `Compare two variants as numbers.`
            - 'case':       `Compare two variants as strings case-sensitively.`
            - 'caseless':   `Compare two variants as strings case-insensitively.`
            - 'wildcard':   `Compare two variants as strings and @needle (must be a string) as a whildcard.`
            - 'regexp':     `Compare two variants as strings and @needle (must be a string) as a regular expression.`
            - 'indexes':    `Return the indexes of the matched members.`
            - 'values':     `Return the values of the matched members.`
            - 'iv-pairs':   `Return the index-value pairs (tuples) of the matched members.`
        > ]
) array | undefined
```

根据给定的匹配方法，以数组形式返回线性容器 `haystack` 中所有和 `needle` 匹配的成员（索引或值）。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `undefined`。
- `WrongDataType`：可忽略异常；静默求值时返回 `undefined`。

**参数**

- `haystack`  
被搜索的线性容器。
- `needle`  
要搜索的变体。
- `method`  
指定匹配方法，可选精确（exact）、数值（numeric）、区分大小写（case）、不区分大小写（caseless）、通配符（wildcard）、正则表达式（regexp）六种方法；并可指定返回值类型：索引（indexes）或值（values）。

**返回值**

在 `haystack` 当中所有匹配 `needle` 的成员之索引或者其值构成的数组。

**示例**

```js
$DATA.match_members([1, 2, 3, 4, 3], 3)
    // [2, 4]

$DATA.match_members([1, 2, 3, 4, 3], 3, 'values')
    // [3, 3]

$DATA.match_members(['a', 'b'], 'c', 'exact')
    // []

$DATA.match_members(['a', 'b', 'A', 'C'], 'a', 'caseless values')
    // ['a', 'A']

$DATA.match_members(['a1', 'a2', 'a3', 'b1'], 'a*', 'wildcard values')
    // ['a1', 'a2', 'a3']

$DATA.match_members(['a1', 'a2', 'a3', 'b1'], 'a*', 'wildcard indexes')
    // [0, 1, 2]

$DATA.match_members(['a1', 'a2', 'b1', 'a3'], 'a*', 'wildcard iv-pairs')
    // [ [!0, 'a1'], [!1, 'a2'], [! 3, 'a3'] ]

$DATA.match_members(['zh_CN', 'zh_TW', 'zh_HK', 'zh_MO'], '^zh', 'regexp values')
    // ['zh_CN', 'zh_TW', 'zh_HK', 'zh_MO']
```

#### 3.7.29) `match_properties` 方法

返回一个对象中属性名匹配给定条件的所有属性名、属性值或者键值对。

**描述**

```js
$DATA.match_properties(
        <object $haystack: `The object to search in.` >,
        <string $needle: `The key to search for in the haystack.` >
        [, < '[exact | auto | number | case | caseless | wildcard | regexp] || [keys | values | kv-pairs]' $method = 'exact keys': `The search method:`
            - 'exact':      `Compare the needle and the key exactly.`
            - 'auto':       `Compare the needle and the key automatically.`
            - 'number':     `Compare the needle and the key as numbers.`
            - 'case':       `Compare the needle and the key as strings case-sensitively.`
            - 'caseless':   `Compare the needle and the key as strings case-insensitively.`
            - 'wildcard':   `Compare the needle and the key as strings and @needle as a whildcard.`
            - 'regexp':     `Compare the needle and the key as strings and @needle as a regular expression.`
            - 'keys':       `Return the matched keys`
            - 'values':     `Return the matched values.`
            - 'kv-pairs':   `Return the matched key-value pairs as tuples.`
        > ]
) array | undefined
```

查找对象 `haystack` 中所有属性名匹配 `needle` 的属性，返回对应的数组。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `undefined`。
- `WrongDataType`：可忽略异常；静默求值时返回 `undefined`。

**参数**

- `haystack`  
被搜索的对象。
- `needle`  
要搜索的键名。
- `method`  
指定 `$needle` 和键名的匹配方法，可选精确（exact）、数值（numeric）、区分大小写（case）、不区分大小写（caseless）、通配符（wildcard）、正则表达式（regexp）六种方法；并可指定返回值类型：键名（keys）、键值（values）或键值对（kv-pairs）。

**返回值**

在 `haystack` 中，键名和 `needle` 匹配的所有键名、键值或者键值对组成的数组。

**示例**

```js
$DATA.match_properties({ "a": 1, "b": 2, "c": 3}, "a")
    // ['a']

$DATA.match_properties({ "a": 1, "b": 2, "A": 3}, "a", 'caseless')
    // ['A', 'a' ]

$DATA.match_properties({ "a": 1, "b": 2, "A": 3}, "a", 'caseless values')
    // [1, 3]

$DATA.match_properties({ "a": 1, "b": 2, "A": 3}, "a", 'caseless kv-pairs')
    // [ [! 'A',  3 ], [! 'a', 1 ] ]
```

#### 3.7.30) `makebytesbuffer` 方法

构造一个可用作缓冲区的字节序列。

**描述**

```js
$DATA.makebytesbuffer(
        < ulongint $size: `The size of the bufer in bytes. >
) bsequence | undefined
```

该方法构造一个可用作缓冲区的字节序列。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数。可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的数据类型。可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
#DATA.makebytesbuffer(16)
    // bsequence
```

#### 3.7.31) `append2bytesbuffer` 方法

将一个字节序列或字符串追加到缓冲区。

**描述**

```js
$DATA.append2bytesbuffer(
        < bsequence $buf: `The buffer.` >,
        < bsequence | string $bytes: `The bytes will be append to the buffer.` >
        [, < '[truncate || utf8-chars] | all' $options = 'all': `The options:`
            - 'all':        `Try to copy all new data to the buffer.`
            - 'truncate':   `Truncate the data if the buffer is not enough large.`
            - 'utf8-char':  `The new data are characters in UTF-8 and this method will keep all multi-byte characters in UTF-8 are intact.`
            >
            [, < ulongint $offset = 0: `The offset in $bytes.`>
                [, < ulongint $length = 0: `The maximum length to append; 0 means all.`>
                ]
            ]
        ]
) ulongint | false
```

该方法将一个字节序列或字符串追加到缓冲区中；返回真正复制的字节数。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数。可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的数据类型。可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数。可忽略异常，静默求值时返回 `false`。
- `TooLong`：要复制的字节太长，缓冲区容不下。可忽略异常，静默求值时返回 `false`。

**示例**

```js
$DATA.append2bytesbuffer($DATA.makebytesbuffer(16), bx0011223344)
    // 5UL
```

#### 3.7.32) `rollbytesbuffer` 方法

重置字节缓冲区。

**描述**

```js
$DATA.rollbytesbuffer(
        < bsequence $buf: `The buffer.` >,
        [, < longint $offset = 0: `The offset to copy the left bytes to the buffer head.`>
        ]
) ulongint | false
```

该方法滚动一个字节序列缓冲区，将从 `$offset` 指定的偏移位置处复制剩余的字节（若有）到缓冲区的头部。该方法返回滚动后缓冲区中有效字节的长度。

当 `$offset` 指定的值小于 0 时，此方法将清除缓冲区中的内容。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数。可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的数据类型。可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数。可忽略异常，静默求值时返回 `false`。

**示例**

```js
$DATA.rollbytesbuffer($DATA.append2bytesbuffer($DATA.makebytesbuffer(16), bx0011223344))
    // 0L
```

#### 3.7.33) `key` 方法

使用数据构建一个可作唯一性键值的无符号长整数。

**描述**

```js
$DATA.key(
        < any $data: `The data.` >
) ulongint
```

该方法根据所传入的数据返回一个可作为唯一性键值的无符号长整数；若不传入参数，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$DATA.key
    // 453456UL
$DATA.key('')
    // FE456UL
```

### 3.8) `L`

该变量是一个行者级内置变量，主要用于逻辑运算。

有关任何数据转换为逻辑真假值时的规则，请参阅 [HVML 1.0 规范 - 2.1.4) 任意数据类型的强制转换规则](hvml-spec-v1.0-zh.md#214-%E4%BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)。

#### 3.8.1) `not` 方法

逻辑取反运算。

**描述**

```js
$L.not(<any>)
```

该方法对给定的数据做布尔化处理，然后执行逻辑取反运算，返回 `true` 或 `false`。若没有传递参数，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.not
    // boolean: true

$L.not( false )
    // boolean: true
```

#### 3.8.2) `and` 方法

逻辑与运算。

**描述**

```js
$L.and(<any>, <any>[, <any>[, ...]])
```

该方法对给定的两个或以上数据做布尔化处理，然后执行逻辑与运算，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.and
    // boolean: false

$L.and( true )
    // boolean: false

$L.and( false, true )
    // boolean: false

$L.and( 1, 2, 3 )
    // boolean: true
```

#### 3.8.3) `or` 方法

逻辑或运算。

**描述**

```js
$L.or(<any>, <any>[, <any>[, ...]])
```

该方法对给定的两个或以上数据做布尔化处理，然后执行逻辑或运算，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.or
    // boolean: false

$L.or( true )
    // boolean: true

$L.or( false, true )
    // boolean: true
```

#### 3.8.4) `xor` 方法

逻辑亦或运算。

**描述**

```js
$L.xor(<any>, <any>)
```

该方法对给定的两个数据做布尔化处理，然后执行逻辑亦或运算，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.xor
    // boolean: false

$L.xor( true )
    // boolean: true

$L.xor( false, true )
    // boolean: true
```

#### 3.8.5) `eq` 方法

对比两个数据在数值上是否相等。

**描述**

```js
$L.eq(<any>, <any>)
```

该方法对比两个数据在数值上是否相等，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.eq
    // boolean: true

$L.eq(false)
    // boolean: true

$L.eq("1", 1)
    // boolean: true
```

#### 3.8.6) `ne` 方法

对比两个数据在数值上是否不相等。

**描述**

```js
$L.ne(<any>, <any>)
```

该方法对比两个数据在数值上是否不相等，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.ne
    // boolean: false

$L.ne(true)
    // boolean: true

$L.ne("1", 2)
    // boolean: true
```

#### 3.8.7) `gt` 方法

对比第一个数据在数值上是否大于第二个数据。

**描述**

```js
$L.gt(<any>, <any>)
```

该方法对比第一个数据在数值上是否大于第二个数据，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.gt
    // boolean: false

$L.gt(true)
    // boolean: true

$L.gt("2", 1)
    // boolean: true
```

#### 3.8.8) `ge` 方法

对比第一个数据在数值上是否大于或等于第二个数据。

**描述**

```js
$L.ge(<any>, <any>)
```

该方法对比第一个数据在数值上是否大于或等于第二个数据，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.ge
    // boolean: true

$L.ge(true)
    // boolean: true

$L.ge(false)
    // boolean: true

$L.ge("2", 2)
    // boolean: true
```

#### 3.8.9) `lt` 方法

对比第一个数据在数值上是否小于第二个数据。

**描述**

```js
$L.lt(<any>, <any>)
```

该方法对比第一个数据在数值上是否小于第二个数据，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.lt
    // boolean: false

$L.lt(true)
    // boolean: false

$L.lt("2", 1)
    // boolean: false
```

#### 3.8.10) `le` 方法

对比第一个数据在数值上是否小于或等于第二个数据。

**描述**

```js
$L.le(<any>, <any>)
```

该方法对比第一个数据在数值上是否小于或等于第二个数据，返回 `true` 或 `false`。若缺失前两个参数或之一，则视作 `undefined`。

**异常**

该方法不产生异常。

**示例**

```js
$L.le
    // boolean: true

$L.le(true)
    // boolean: false

$L.le(false)
    // boolean: true

$L.le("1", 2)
    // boolean: true
```

#### 3.8.11) `streq` 方法

对比两个数据的字符串形式是否相等或匹配。

**描述**

```js
$L.streq("case | caseless | wildcard | regexp",
        <any>,
        <any>
) boolean | undefined
```

对比两个数据的字符串形式是否相等或匹配，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写、通配符模式匹配、正则表达式匹配），其后的两个参数用来传递两个字符串。使用通配符和正则表达式时，第一个参数用于指定通配符模式字符串或者正则表达式。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```js
$L.streq("case", "zh_cn", "zh_CN")
    // boolean: false

$L.streq("wildcard", "zh_*", "zh_CN")
    // boolean: true

$L.streq("regexp", "^zh", "zh_CN")
    // boolean: true
```

#### 3.8.12) `strne` 方法

对比两个数据的字符串形式是否不相等或不匹配。

**描述**

```js
$L.strne("case | caseless | wildcard | regexp",
        <any>,
        <any>
) boolean | undefined
```

对比两个数据的字符串形式是否不相等或不匹配，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写、通配符模式匹配、正则表达式匹配），其后的两个参数用来传递两个字符串。使用通配符和正则表达式时，第一个参数用于指定通配符模式字符串或者正则表达式。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```js
$L.strne("case", "zh_cn", "zh_CN")
    // boolean: true

$L.strne("wildcard", "zh_*", "zh_CN")
    // boolean: false

$L.strne("regexp", "^zh", "zh_CN")
    // boolean: false
```

#### 3.8.13) `strgt` 方法

对比第一个数据的字符串形式是否大于第二个数据的字符串形式。

**描述**

```js
$L.strgt("case | caseless",
        <any>,
        <any>
) boolean | undefined
```

对比第一个数据的字符串形式是否大于第二个数据的字符串形式，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个数据。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```
$L.strgt("case", 'A', 'Z')
    // boolean: false
```

#### 3.8.14) `strge` 方法

对比第一个数据的字符串形式是否大于或等于第二个数据的字符串形式。

**描述**

```js
$L.strge("case | caseless",
        <any>,
        <any>
) boolean | undefined
```

对比第一个数据的字符串形式是否大于或等于第二个数据的字符串形式，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个数据。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```js
$L.strge("case", 'A', 'A')
    // boolean: true
```


#### 3.8.15) `strlt` 方法

对比第一个数据的字符串形式是否小于第二个数据的字符串形式。

**描述**

```js
$L.strlt("case | caseless",
        <any>,
        <any>
) boolean | undefined
```

对比第一个数据的字符串形式是否小于第二个数据的字符串形式，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个数据。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```js
$L.strlt("case", 'A', 'Z')
    // boolean: true
```

#### 3.8.16) `strle` 方法

对比第一个数据的字符串形式是否小于或等于第二个数据的字符串形式。

**描述**

```js
$L.strle("case | caseless",
        <any>,
        <any>
) boolean | undefined
```

对比第一个数据的字符串形式是否小于或等于第二个数据的字符串形式，返回 `true` 或 `false`。

第一个参数用来表示字符串的匹配方式（区分大小写、不区分大小写），其后的两个参数用来传递两个数据。

对非字符串类型的数据，字符串化后做对比。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：未给定参数。可忽略；静默求值时，返回 `undefined`。
- `WrongDataType`：错误的参数类型。可忽略；静默求值时，返回 `undefined`。
- `InvalidValue`：错误的参数。可忽略；静默求值时，返回 `undefined`。

**示例**

```js
$L.strle("case", 'A', 'Z')
    // boolean: true
```

#### 3.8.17) `eval` 方法

对参数化的逻辑运算表达式求值。

**描述**

```js
$L.eval(
        <string: `logical expression`>
        [, <object: `The parameter map`> ]
) boolean | undefined
```

该方法可对参数化的逻辑运算表达式进行求值，返回 `true` 或 `false`。

**示例**

```js
$L.eval("x > y && y > z || b", { x: 2, y: 1, z: 0, b: $L.streq("case", $a, $b) })
    // boolean: true
```

### 3.9) `T`

该变量是一个协程级内置变量，主要用于文本的本地化替代。

- `get`：一个动态方法，用于返回替代字符串。

#### 3.9.1) `map` 静态属性

`map` 是 `T` 的一个静态属性，用来定义字符串映射表，初始为空对象。程序可使用 `update` 元素设置其内容：

```hvml
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

#### 3.9.2) `get` 方法

**描述**

```js
$T.get(
        <string $text: `The original text.` >
) string : `The translated text.`
```

该方法根据原始文本返回翻译的文本。若 `$T.map` 中没有匹配的文本，则返回原始文本本身。

**异常**

- `ArgumentMissed`：缺少必要的参数；可忽略异常，静默求值时返回空字符串。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回空字符串。

**示例**

```js
$T.get('Hello, world!')
    // string: '世界，您好！'
```

### 3.10) `STR`

`STR` 是一个内置的动态变量，该变量用于实现常见的字符串操作。

在调用`STR` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `BadEncoding`：错误编码。

#### 3.10.1) `contains` 方法

判断一个字符串中是否包含给定的子字符串。

**描述**

```js
$STR.contains(
        <string $haystack: `The string to search in.` >,
        <string $needle: `The substring to search for in the haystack.` >
        [, < boolean $case_insensitivity = false:
            - false:  `Perform a case-sensitive check;`
            - true:   `Perform a case-insensitive check.` >
        ]
) boolean
```

判断字符串 `haystack` 中是否包含字符串 `needle`，执行

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `false`。
- `WrongDataType`：可忽略异常；静默求值时返回 `false`。

**参数**

- `haystack`  
被搜索的字符串。
- `needle`  
要搜索的子字符串。
- `case_insensitivity`  
指定是否忽略大小写（可选）；默认为忽略大小写。

**返回值**

如果 `needle` 在 `haystack` 当中，返回 `true`，否则返回 `false`。

**示例**

```js
$STR.contains('Hello, world!', 'world')
    // boolean: true

$STR.contains('Hello, world!', '')
    // boolean: true
```

**参见**

- PHP `str_contains()` 函数：<https://www.php.net/manual/en/function.str-contains.php>

#### 3.10.2) `starts_with` 方法

用于判断一个字符串是否以给定的字符串开头。

**描述**

```js
$STR.starts_with(
        <string $haystack: `The string to search in.`>,
        <string $needle: `The substring to search for in the haystack.`>
        [, <boolean $case_insensitivity = false:
            - false:  `Perform a case-sensitive check;`
            - true:   `Perform a case-insensitive check.`>
        ]
) boolean
```

判断字符串 `haystack` 是否以子字符串 `needle` 开头。

**参数**

- `haystack`  
被搜索的字符串。
- `needle`  
要搜索的子字符串。
- `case_insensitivity`  
指定是否忽略大小写（可选）；默认为忽略大小写。

**返回值**

如果 `haystack` 以 `needle` 打头，返回 `true`，否则返回 `false`。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `false`。
- `WrongDataType`：可忽略异常；静默求值时返回 `false`。

**示例**

```js
$STR.starts_with('Hello, world', 'hello', true)
    // boolean: true

$STR.starts_with('Hello, world', '')
    // boolean: true
```

**参见**

- PHP `str_starts_with()` 函数：<https://www.php.net/manual/en/function.str-starts-with.php>

#### 3.10.3) `ends_with` 方法

用于判断一个字符串是否以给定的字符串结尾。

```js
$STR.ends_with(
        <string $haystack: `The string to search in.`>,
        <string $needle: `The substring to search for in the haystack.`>
        [, <boolean $case_insensitivity = false:
            - false:    `Perform a case-sensitive check;`
            - true:     `Perform a case-insensitive check.`>
        ]
) boolean
```

判断字符串 `haystack` 是否以子字符串 `needle` 结尾。

**参数**

- `haystack`  
被搜索的字符串。
- `needle`  
要搜索的子字符串。
- `case_insensitivity`  
指定是否忽略大小写（可选）；默认为忽略大小写。

**返回值**

如果 `haystack` 以 `needle` 结尾，返回 `true`，否则返回 `false`。

- `ArgumentMissed`：可忽略异常；静默求值时返回 `false`。
- `WrongDataType`：可忽略异常；静默求值时返回 `false`。

**示例**

```js
$STR.ends_with('Hello, world', 'World', true)
    // boolean: true

$STR.ends_with('Hello, world', '')
    // boolean: true
```

**参见**

- PHP `str_ends_with()` 函数：<https://www.php.net/manual/en/function.str-ends-with.php>

#### 3.10.4) `explode` 方法

使用指定的子字符串分隔一个字符串。

**描述**

```js
$STR.explode(
        <string $string: `The input string to explode.`>
        [, <string $separator = '': `The boundary string.`>
            [, <real $limit = 0: `The limitation of members in the result array.`>]
        ]
) array
```

此函数返回由字符串组成的数组，每个元素都是 `string` 的一个子串，它们被字符串 `separator` 作为边界点分隔出来。

**参数**

- `string`  
输入字符串。
- `seperator`  
分隔字符串。`separator` 为空时，按字符分隔输入字符串；省略 `separator` 时，视同分隔字符串为空字符串。
- `limit`  
   如果 `limit` 参数是正数，则返回的数组包含最多 `limit` 个成员，而最后那个成员将包含 `string` 的剩余部分。
   如果 `limit` 参数是负数，则返回除了最后的 `-limit` 个元素外的所有元素。
   如果 `limit` 是 0，表示不受限制。

**返回值**

此函数返回由字符串组成的数组，其每个成员都是 `string` 的一个子串，它们被字符串 `separator` 作为边界点分隔出来。

如果 `separator` 为空字符串，将按字符分隔输入字符串。 如果 `separator` 所包含的值在 `string` 中找不到，并且使用了负数的 `limit`，那么会返回一个空数组，否则返回只包含 `string` 单个成员的数组。如果 `separator` 出现在了 `string` 的开头或末尾，将在返回的数组之头部或尾部添加空字符串（`""`）为边界值。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回空数组。
- `WrongDataType`：可忽略异常；静默求值时返回空数组。

**示例**

```js
$STR.explode('beijing:shanghai:guangzhou', ':')
    // array: ['beijing', 'shanghai', 'guangzhou']

$STR.explode('1, 2, 3, ', ', ')
    // array: ['1', '2', '3', ''],

$STR.explode('汉字')
    // array: ['汉', '字']

$STR.explode('中华人民共和国', '', 2)
    // array: ['中', '华']
```

**参见**

- PHP `explode()` 函数：<https://www.php.net/manual/en/function.explode.php>

#### 3.10.5) `implode` 方法

将一个数组的成员串接为一个新的字符串。使用指定的字符串串接字符串数组中的字符串。

**描述**

```js
$STR.implode(
        <array $pieces: `The array to implode.`>
        [, <string $separator = '': `The boundary string.`>]
) string
```

使用 `separator` 将数组 `pieces` 的成员字符串化后串接为新的字符串。

**参数**

- `pieces`  
数组；如果数组中某个成员不是字符串，则首先做字符串化处理。
- `seperator`  
分隔字符串；未传递时，视同空字符串

**返回值**

返回串接后的新字符串。如果数组为空，则返回空字符串。如果 `separator` 为空字符串，则该方法直接串接数组中的各个字符串，各个字符串之间没有分隔符。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回空字符串。
- `WrongDataType`：可忽略异常；静默求值时返回空字符串。

**示例**

```js
$STR.implode(['beijing', 'shanghai', 'guangzhou'], ', ')
    // string: 'beijing, shanghai, guangzhou'

$STR.implode([1, 2, 3, ''], ', ')
    // string: '1, 2, 3, '

$STR.implode(["root", 'x', 0, 0, 'root', "/root", "/bin/bash"], ':')
    // string: 'root:x:0:0:root:/root:/bin/bash'

$STR.implode(['汉', '字'])
    // string: '汉字'
```

**参见**

- PHP `implode()` 函数：<https://www.php.net/manual/en/function.implode.php>

#### 3.10.6) `shuffle` 方法

随机打乱一个字符串。

**描述**

```js
$STR.shuffle(
        <string $string: `The input string to shuffle.`>
) string
```

该函数在输入字符串 `string` 的基础上，返回一个新的随机排列的字符串。

**参数**

- `string`  
输入字符串

**返回值**

该函数返回随机排列后的新字符串。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回空字符串。
- `WrongDataType`：可忽略异常；静默求值时返回空字符串。

**示例**

```js
$STR.shuffle('beijing') // string: 'jbienig'
```

**参见**

- PHP `str_shuffle()` 函数：<https://www.php.net/manual/en/function.str-shuffle.php>

#### 3.10.7) `replace` 方法

子字符串替换。

**描述**

```js
$STR.replace(
        <string | array $subject: `The subject to operate.`>
        <string | array $search: `The substring to search.`>,
        <string | array $replace: `The replacement string.`>,
        [, <boolean $case_insensitivity = false:
            - false:  `Perform case-sensitive replacements;`
            - true:   `Perform case-insensitive replacements.`>
        ]
) string | array
```

该函数返回一个字符串或者数组，该字符串或数组是将 `subject` 中全部的 `search` 都被 `replace` 替换之后的结果。

**参数**

如果 `search` 和 `replace` 为数组，那么该函数将对 `subject` 做二者的映射替换。如果 `replace` 中值的个数少于 `search` 的个数，多余的替换将使用空字符串来进行。如果 `search` 是一个数组而 `replace` 是一个字符串，那么 `search` 中每个元素的替换将始终使用这个字符串。该替换不会改变大小写。

如果 `search` 和 `replace` 都是数组，它们的值将会被依次处理。

- `subject`  
执行替换的数组或者字符串，也就是常说的 `haystack`。如果 `subject` 是一个数组，替换操作将遍历整个 `subject`，返回值也将是一个数组。
- `search`  
查找的目标值，也就是 needle。一个数组可以指定多个目标。
- `replace`  
`search` 的替换值。一个数组可以被用来指定多重替换。
- `case_insensitivity`  
指定是否忽略大小写（可选）；默认为忽略大小写。

**返回值**

该函数返回替换后的数组或者字符串。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回空字符串或者空数组。
- `WrongDataType`：可忽略异常；静默求值时返回空字符串或者空数组。

**示例**

```js
$STR.replace("%BODY%", "black", "<body text=%BODY%>");
    // string: '<body text=black>'

$STR.replace("%body%", "black", "<body text=%BODY%>", true);
    // string: '<body text=black>'
```

**参见**

- PHP `str_replace()` 函数：<https://www.php.net/manual/en/function.str-replace.php>
- PHP `str_ireplace()` 函数：<https://www.php.net/manual/en/function.str-ireplace.php>

#### 3.10.8) `format_c` 方法

格式化数值及字符串数据，格式字符串使用类似 C 语言的修饰符（specifier）。

**描述**

```js
$STR.format_c(
        <string $format: `C format string.`>
        [, <boolean | number | longint | ulongint | longdouble | string $data>
            [, ...]
        ]
) string
```

该方法使用指定的 C 语言格式化字符串格式化传入的单个或者多个数据。

```js
$STR.format_c(
        <string $format: `C format string.`>,
        <array $data>
) string
```

该方法使用指定的 C 语言格式化字符串格式化传入的数组中的数据。

**示例**

```js
$STR.format_c('Tom is %d years old, while Jerry is %d years old.', 9, 7)
    // string: 'Tom is 9 years old, while Jerry is 7 years old.'

$STR.format_c('Tom is %d years old, while Jerry is %d years old.', [9, 7])
    // string: 'Tom is 9 years old, while Jerry is 7 years old.'
```

**参见**

- PHP `sprintf()` 函数：<https://www.php.net/manual/en/function.sprintf.php>

#### 3.10.9) `scan_c` 方法

根据给定的格式解析指定的字符串，格式字符串使用类似 C 语言的修饰符（specifier）。

```js
$STR.scanf(
        <string $string: `The input string being parsed.`>,
        <string $format: `The interpreted format for string`>
) array
```

**示例**

```js
$STR.scan_c('Tom is 9 years old, while Jerry is 7 years old.',
        'Tom is %d years old, while Jerry is %d years old.')
    // array: [9L, 7L]
```

**参见**

- PHP `sscanf()` 函数：<https://www.php.net/manual/en/function.sscanf.php>

#### 3.10.10) `format_p` 方法

使用占位符格式化任意数据，对非字符串数据，使用序列化后的字符串。

```js
$STR.format_p(
        <string $format: `string contains placeholders.`>,
        <array | object $data>
) string
```

使用数组表达要格式化的数据时，占位符用 `[0]`、`[1]` 等表示。

使用对象表达要格式化的数据时，占位符用 `{name}`、`{id}` 等表示。

要使用多个参数表达要格式化的数据时，占位符用 `#0`、`#1` 等表示。

前置 `\` 符号表示转义。

**示例**

```js
$STR.format_p('There are two boys: [0] and [1]', ['Tom', 'Jerry'])
    // string: There are two boys: "Tom" and "Jerry"'

$STR.format_p('There are two boys: {name0} and {name1}', { name0: 'Tom', name1: 'Jerry' })
    // string: There are two boys: "Tom" and "Jerry"'

$STR.format_p('There are two boys: #0 and #1', 'Tom', 'Jerry')
    // string: There are two boys: "Tom" and "Jerry"'
```

#### 3.10.11) `scan_p` 方法

根据给定的格式解析指定的字符串，格式字符串使用占位符。

```js
$STR.scan_p(
        <string $string: `The input string being parsed.`>,
        <string $format: `The string contains placeholders.`>,
) array | object | any
```

要返回数组，占位符用 `[0]`、`[1]` 等表示。

要返回对象，占位符用 `{name}`、`{id}` 等表示。

要返回单个数据，占位符用 `#?` 表示。

前置 `\` 符号表示转义。

**示例**

```js
$STR.scan_p('There are two boys: "Tom" and "Jerry"',
        'There are two boys: [0] and [1]')
    // array: ['Tom', 'Jerry']

$STR.scan_p('There are two boys: "Tom" and "Jerry"',
        'There are two boys: {name0} and {name1}')
    // object: { name0: 'Tom', name1: 'Jerry' }

$STR.scan_p('My name is "Tom"', 'My name is #?')
    // string: 'Tom'
```

#### 3.10.12) `join` 方法

用于串接两个或更多个字符串。

**描述**

```js
$STR.join(
        <any $data1: `The first data to join.`>,
        <any $data2: `The second data to join.`>
        [, <any $data3: `The third data to join.`>
            [, ...]
        ]
) string
```

将所有参数（至少两个）做字符串化处理后串接成新的字符串。

**参数**

- `data1`  
第一项数据。
- `data2`  
第二项数据。
- `data3`  
第三项数据。

**返回值**

依次串接后的字符串。

**示例**

```js
$STR.join('hello', ' ', 'world')
    // string: 'hello world'

$STR.join(1, ', ', 2, ', ', 3)
    // string: '1, 2, 3'
```

#### 3.10.13) `nr_bytes` 方法

返回字符串或字节序列的字节长度。

**描述**

```js
$STR.nr_bytes(
        <string | bsequence $data: `The string or byte sequence to count.`>
        [,
            <boolean $count_null_byte = true: `Determine whether to count the terminating null byte.`>
        ]
) ulongint
```

该方法返回字符串或者字节序列以字节度量时的长度，返回值为 `ulongint` 类型。注意，对字符串，该函数的返回值默认包含用作字符串结尾的空字符，除非为第二个参数 `$count_null_byte` 传递 `false` 值。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `0UL`。
- `WrongDataType`：可忽略异常；静默求值时返回 `0UL`。

**示例**

```js
$STR.nr_bytes( "" )
    // ulongint: 1

$STR.nr_bytes( "HVML" )
    // ulongint: 5UL

$STR.nr_bytes( bb )
    // ulongint: 0

$STR.nr_bytes( "HVML", false )
    // ulongint: 4UL
```

#### 3.10.14) `nr_chars` 方法

获得字符串的字符数量。

**描述**

```js
$STR.nr_chars(
        <string $string: `The string to count.`>
) ulongint | false
```

获得字符串 `string` 中字符的个数。

**参数**

- `string`  
输入字符串。

**返回值**

返回值为 `ulongint` 类型，表示字符个数。

**异常**

- `ArgumentMissed`：可忽略异常；静默求值时返回 `false`。
- `WrongDataType`：可忽略异常；静默求值时返回 `false`。

**示例**

```js
// 获得字符串 `中国` 的长度
$STR.nr_chars('中国')
    // ulongint: 2
```

**参见**

#### 3.10.15) `tolower` 方法

将字符串转换为小写。

**描述**

```js
$STR.tolower(
        <string $string: `The input string.`>
) string
```

将字符串 `string` 中的所有字符转换为小写，并返回转换后的字符串。

**参数**

- `string`  
输入字符串。

**返回值**

转换为小写的字符串。

**示例**

```js
$STR.tolower('Hello, world')
    // string: 'hello, world'
```

**参见**

- PHP `strtolower()` 函数：<https://www.php.net/manual/en/function.strtolower.php>

#### 3.10.16) `toupper` 方法

将字符串转换为大写。

**描述**

```js
$STR.toupper(
        <string $string: `The input string.`>
) string
```

将字符串 `string` 中的所有字符转换为大写，并返回转换后的字符串。

**参数**

- `string`  
输入字符串。

**返回值**

转换为大写的字符串。

**示例**

```js
$STR.toupper('Hello, world')
    // string: 'HELLO, WORLD'
```

**参见**

- PHP `strtoupper()` 函数：<https://www.php.net/manual/en/function.strtoupper.php>

#### 3.10.17) `substr` 方法

返回字符串的子串。

**描述**

```js
$STR.substr(
        <string $string: `The input string.`>,
        <real $offset: `The offset of the desired substring in the input string.`>
        [, <real $length: `The length of the desired substring.`>]
) string
```

返回字符串 `string` 中由 `offset` 和 `length` 参数指定的子字符串。

**参数**

- `string`  
输入字符串。
- `offset`
   - 非负值: 返回的字符串将从字符串 `s` 的 `offset` 处开始, 从 `0` 开始计算;
   - 负值: 返回的字符串将从字符串 `s` 的结尾向前数第 `offset` 个字符开始;
   - 字符串 `s` 的长度小于 `offset`, 将返回空字符串;
- `length`
   - 0: 返回空字符串;
   - 正值: 返回的字符串将从 `offset` 开始, 最多包含 `length` 个字符 (取决于 `s` 的长度);
   - 负值: 字符串 `s` 末尾处的 `length` 个字符将被省略;
   - 不提供该参数, 则返回的字符串从 `offset` 开始到字符串 `s` 的结尾.

**返回值**

返回从 `string` 中提取的部分或者空字符串。

**示例**

```js
// 返回字符串 `abcdef` 从第 `0` 个字符开始，最多包含 `10` 个字符的子字符串
$STR.substr('abcdef', 0, 10)
    // string: 'abcdef'

// 返回字符串 `abcdef` 从最后一个字符开始的子字符串
$STR.substr('abcdef', -1)
    // string: 'f'

// 返回字符串 `abcdef` 除最后一个字符之前的子字符串
$STR.substr('abcdef', 0, -1)
    // string: 'abcde'

// 返回字符串 `abcdef` 从倒数第 3 个字符开始，到最后一个字符之前的子字符串
$STR.substr('abcdef', -3, -1)
    // string: 'de'
```

**参见**

- PHP `substr()` 函数：<https://www.php.net/manual/en/function.substr.php>

#### 3.10.18) `substr_compare` 方法

比较子字符串（从指定的偏移位置开始比较指定的长度）。

**描述**

```js
$STR.substr_compare(
    <string $str1>,
    <string $str2>,
    <real $offset1>,
    <real $offset2>,
    [, <real $length = 0>
        [, <boolean $case_insensitivity = false:
            false -  `Perform a case-sensitive comparison;`
            true -  `Perform a case-insensitive comparison.`>
        ]
    ]
) number
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_compare()` 函数：<https://www.php.net/manual/en/function.substr-compare.php>

#### 3.10.19) `substr_count` 方法

计算子字符串出现的次数。

**描述**

```js
$STR.substr_count(
    <string $haystack: `The input string.`>,
    <string $needle: `The substring to search.`>
    [, <real $offset = 0: `The offset to starting search.`>
        [, <real $length = 0: `The length of searching.` >
        ]
    ]
) ulongint
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_count()` 函数：<https://www.php.net/manual/en/function.substr-count.php>

#### 3.10.20) `substr_replace` 方法

在子字符串中做替换。

**描述**

```js
$STR.substr_replace(
    <array | string $string: `The input string.`>,
    <array | string $replace: `The replacement string.`>,
    <array | real $offset: `If $offset is non-negative, the replacing will begin at the $offset'th offset into string. If offset is negative, the replacing will begin at the $offset'th character from the end of string.`>
    [,
        <array|real $length: `If given and is positive, it represents the length of the portion of string which is to be replaced. If it is negative, it represents the number of characters from the end of string at which to stop replacing. If it is not given, then it will default to strlen( string ); i.e. end the replacing at the end of string. Of course, if length is zero then this function will have the effect of inserting replace into string at the given offset offset.`>
    ]
) string|array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_replace()` 函数：<https://www.php.net/manual/en/function.substr-replace.php>

#### 3.10.21) `strstr` 方法

返回在目标字符串中，以指定字符串起始或结尾的子字符串。

**描述**

```js
$STR.strstr(
        <string $haystack: `The string in which to find the substring $needle.`>,
        <string $needle: `The substring to find in $haystack.`>
        [, <bool $before_needle = false>
            [, <bool $case_insensitivity = false:
                false -  `Perform a case-sensitive check;`
                true -  `Perform a case-insensitive check.`>
            ]
        ]
)  string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strstr()` 函数：<https://www.php.net/manual/en/function.strstr.php>
- PHP `stristr()` 函数：<https://www.php.net/manual/en/function.stristr.php>

#### 3.10.22) `strpos` 方法

返回在目标字符串中指定字符串第一次或者最后一次出现的位置。

**描述**

```js
$STR.strpos(
        <string $haystack: `The string in which to find the substring $needle.`>,
        <string $needle: `The substring to find in $haystack.`>
        [, <real $offset = 0: `The offset starting to search. If $offset is less than 0, this method will return the last occurrence of $needle.`>
            [, <bool $case_insensitivity = false:
                false -  `Perform a case-sensitive check.`
                true -  `Perform a case-insensitive check.`>
            ]
        ]
) ulongint | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strpos()` 函数：<https://www.php.net/manual/en/function.strpos.php>
- PHP `stripos()` 函数：<https://www.php.net/manual/en/function.stripos.php>

#### 3.10.23) `strpbrk` 方法

在目标字符串中查找从一组字符的任何一个字符开始或结尾的子字符串。

**描述**

```js
$STR.strpbrk(
        <string $string: `The string.`>,
        <string $characters: `The characters to search in the string.`>
        [, <bool $case_insensitivity = false:
            - false:     `Perform a case-sensitive check.`
            - true:      `Perform a case-insensitive check.`>
        ]
) string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strpbrk()` 函数：<https://www.php.net/manual/en/function.strpbrk.php>

#### 3.10.24) `split` 方法

将字符串按给定的长度切分成子字符串数组。

**描述**

```js
$STR.split(
        <string $string: `The original string to split.`>
        [, <real $length = 1: `The length of one substring.`> ]
) array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_split()` 函数：<https://www.php.net/manual/en/function.str-split.php>

#### 3.10.25) `chunk_split` 方法

将字符串按给定的小块长度和分隔符切分，生成一个新的字符串。

**描述**

```js
$STR.chunk_split(
        <string $string: `The original string to split.`>
        [, <real $length = 76: `The length of a chunk.`>
            [, <string $separator = '\r\n': `The seperator between two chunks.`>
            ]
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `chunk_split()` 函数：<https://www.php.net/manual/en/function.chunk-split.php>

#### 3.10.26) `trim` 方法

删除字符串开头、结尾或两者处的空白字符（或其他字符）。

**描述**

```js
$STR.trim(
        <string $string: `The orignal string to trim.`>
        [, < 'left | right | both' $position  = 'both': `The trimming position.`>
            [, <string $characters = " \n\r\t\v\f": `The characters to trim from the original string.`>]
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `trim()` 函数：<https://www.php.net/manual/en/function.trim.php>
- PHP `ltrim()` 函数：<https://www.php.net/manual/en/function.ltrim.php>
- PHP `rtrim()` 函数：<https://www.php.net/manual/en/function.rtrim.php>

#### 3.10.27) `pad` 方法

使用另一个字符串填充字符串为指定长度。

**描述**

```js
$STR.pad(
    <string $string: `The original string.`>,
    <real $length: `The length of the new string after padded.`>,
    [, <string $pad_string = " ": `The string use to pad.`>,
        [, <'left | right | both' $pad_type = 'right': `The padding position.`> ]
    ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_pad()` 函数：<https://www.php.net/manual/en/function.str-pad.php>

#### 3.10.28) `repeat` 方法

重复一个字符串。

**描述**

```js
$STR.repeat(
        <string $string: `The string to repeat.`>,
        <real $times: `The number of times to repeat the string.`>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_repeat()` 函数：<https://www.php.net/manual/en/function.str-repeat.php>

#### 3.10.29) `reverse` 方法

反转一个字符串。

**描述**

```js
$STR.reverse(
        <string $string: `The string to reverse.`>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strrev()` 函数：<https://www.php.net/manual/en/function.strrev.php>

#### 3.10.30) `tokenize` 方法

使用给定的词元分隔符分隔字符串，返回分隔后的词元数组。

**描述**

```js
$STR.tokenize(
        <string $string: `The string to break.`>,
        <string $delimiters: `The delimiters to sperate the tokens.`>
) array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strtok()` 函数：<https://www.php.net/manual/en/function.strtok.php>

#### 3.10.31) `translate` 方法

转换指定子字符串。

**描述**

```js
$STR.translate(
    <string $string>,
    <string $from>,
    <string $to>
) string

$STR.translate(
    <string $string>,
    <object $from_to_pairs>,
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strtr()` 函数：<https://www.php.net/manual/en/function.strtr.php>

#### 3.10.32) `htmlentities_encode` 方法

转换字符为 HTML 实体。

**描述**

```js
$STR.htmlentities_encode(
        <string $string: `The input string.`>,
        <'[compat | quotes | noquotes] || [ignore | substitute | disallowed] || [html401 | xml1 | xhtml | html5]' $flags:
            - 'compat':     `Will convert double-quotes and leave single-quotes alone.`
            - 'quotes':     `Will convert both double and single quotes.`
            - 'noquotes':   `Will leave both double and single quotes unconverted.`
            - 'ignore':     `Silently discard invalid code unit sequences instead of returning an empty string. Using this flag is discouraged.`
            - 'substitute': `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
            - 'disallowed': `Replace invalid code points for the given document type with a Unicode Replacement Character U+FFFD or &#FFFD.`
            - 'html401':    `Handle code as HTML 4.01.`
            - 'xml1':       `Handle code as XML 1.`
            - 'xhtml':      `Handle code as XHTML.`
            - 'html5':      `Handle code as HTML 5.`
        >
        [, <boolean $all = false:
                - false:    `Only the certain characters have special significance in HTML are translated into these entities.`
                - true:     `All characters which have HTML character entity equivalents are translated into these entities.`>
            [, <boolean $double_encode = true:
                - true:     `Convert everything.`
                - false:    `Do not encode existing HTML entities.`>
            ]
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `htmlentities()` 函数：<https://www.php.net/manual/en/function.htmlentities.php>
- PHP `htmlspecialchars()` 函数：<https://www.php.net/manual/en/function.htmlspecialchars.php>

#### 3.10.33) `htmlentities_decode` 方法

转换 HTML 实体为对应的字符。

**描述**

```js
$STR.htmlentities_decode(
        <string $string: `The input string.`>,
        <'[compat | quotes | noquotes] || substitute || [html401 | xml1 | xhtml | html5]' $flags:
            - 'compat':     `Will convert double-quotes and leave single-quotes alone.`
            - 'quotes':     `Will convert both double and single quotes.`
            - 'noquotes':   `Will leave both double and single quotes unconverted.`
            - 'substitute': `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
            - 'html401':    `Handle code as HTML 4.01.`
            - 'xml1':       `Handle code as XML 1.`
            - 'xhtml':      `Handle code as XHTML.`
            - 'html5':      `Handle code as HTML 5.` >
        [, <boolean $all = false:
            - false:        `Only the certain characters have special significance in HTML are translated into these entities.`
            - true:         `All characters which have HTML character entity equivalents are translated into these entities.` >
        ]
) string | bsequence
```

**参数**

**返回值**

**示例**

**参见**

- PHP `htmlentities()` 函数：<https://www.php.net/manual/en/function.html-entity-decode.php>
- PHP `htmlspecialchars_decode()` 函数：<https://www.php.net/manual/en/function.htmlspecialchars-decode.php>

#### 3.10.34) `nl2br` 方法

在字符串所有换行符之前插入 HTML 换行标记。

**描述**

```js
$STR.nl2br(
        < string $string: `The input string.` >
        [, < boolean $is_xhtml = true:
            - true: `Use '<br />'.`
            - false: `Use '<br>'.`
        ]
        [, < boolean $lowercases = true:
            - true: `Use 'br'.`
            - false: `Use 'BR'.`
        ]
) object | bsequence
```

**参数**

**返回值**

**示例**

**参见**

- PHP `nl2br()` 函数：<https://www.php.net/manual/en/function.nl2br.php>

#### 3.10.35) `rot13` 方法

对字符串执行 ROT13 转换。

**描述**

```js
$STR.rot13(
        <string $string: `The string to convert.`>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `rot13()` 函数：<https://www.php.net/manual/en/function.rot13.php>

#### 3.10.36) `count_chars` 方法

统计字符串中的字符出现次数。

**描述**

```js
$STR.count_chars(
        < string $string: `The examined string.` >
        [,
            < 'object | string' $mode = 'object':
               - 'object': `Return an object with the character as key and the frequency of every character as value.`
               - 'string': `Return a string containing all unique characters. `
            >
        ]
) object | string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

#### 3.10.37) `count_bytes` 方法

统计字符串或二进制字节序中的各个字节（0...255）出现的次数。

**描述**

```js
$STR.count_bytes(
        < string | bsequence $data: `The examined data.` >
        [, < 'tuple-all | object-all | object-appeared | object-not-appeared | bytes-appeared | bytes-not-appeared' $mode = 'tuple-all':
            - 'tuple-all':  `Return a tuple with the byte-value (0 ~ 255) as index and the frequency of every byte as value.`
            - 'object-all': `Return an object with the byte-value (decimal string) as key and the frequency of every byte as value.`
            - 'object-appeared': `Same as 'object-all' but  only byte-values with a frequency greater than zero are listed.`
            - 'object-not-appeared': `Same as 'object-all' but only byte-values with a frequency equal to zero are listed.`
            - 'bytes-appeared': `A binary sequence containing all unique bytes is returned.`
            - 'bytes-not-appeared': `A binary sequence containing all not used bytes is returned.`
            >
        ]
) tuple | object | bsequence
```

**参数**

**返回值**

**示例**

**参见**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

#### 3.10.38) `codepoints` 方法

将字符串中的字符转换为 Unicode 码点（codepoint）构成的数组或元组。

**描述**

```js
$STR.codepoints(
        < string $the_string: `The string to convert.` >
        [, < 'array | tuple' $return_type = 'array':
            - 'array': `Return an array of codepoints.`
            - 'tuple': `Return a tuple of codepoints.`
            >
        ]
) array | tuple: `The array or tuple contains all Unicode codepoints of the string.`
```

该方法将给定的字符串中的各个字符转换为 Unicode 码点（codepoint），并返回由各码点构成的数组或者元组。码点值的类型为 `number`。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：未指定必要参数；可忽略异常，静默求值时返回空数组。
- `WrongDataType`：传入了不正确的数据类型；可忽略异常，静默求值时返回空数组。

**示例**

```js
$STR.codepoints('HVML的昵称是呼噜猫')
    // array: [ 110, 126, 115, 114, 30340, 26165, 31216, 26159, 21628, 22108, 29483 ]

$STR.codepoints('HVML的昵称是呼噜猫', 'tuple')
    // tuple: [! 110, 126, 115, 114, 30340, 26165, 31216, 26159, 21628, 22108, 29483 ]
```

### 3.11) `URL`

#### 3.11.1) `encode` 方法

编码 URL 字符串。

**描述**

```js
$URL.encode(
        <string |bsequence $data: `The string or the byte sequence to be encoded.` >
        [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
          - 'rfc1738': `Encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
          - 'rfc3986': `Encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).`
        ]
) string
```

该方法用于将字符串或者字节序列中的字节执行 URL 编码，默认遵循 RFC 1738 和 'application/x-www-form-urlencoded' 媒体类型编码方式。

URL 编码以字节为单位字节处理字符串或者字节序列中的字符而忽略字符串或者字节序列的原始编码形式（如 UTF-8 或者 GB18030），除 `-_.` 之外，所有非字母数字字符都将被替换成百分号（%）后跟两位十六进制数的形式。由于历史原因，该编码有两种形式。采用 RFC 1738 和 'application/x-www-form-urlencoded' 媒体类型编码时，空格会被编码为加号（+），这种编码方式与网页中的表单使用 `POST` 方法的编码方式一样。而采用 RFC 3986 时，空格会被编码为 `%20`。

该方法返回字符串。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：未指定必要参数；可忽略异常，静默求值时返回空字符串。
- `WrongDataType`：传入了不是字符串类型也不是字节序列类型的数据；可忽略异常，静默求值时返回空字符串。

**示例**

```js
$URL.encode('HVML: 全球首款可编程标记语言!')
    // string: 'HVML%3A+%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21'

$URL.rawencode('HVML: 全球首款可编程标记语言!', 'rfc3986')
    // string: 'HVML%3A%20%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21'
```

**参见**

- [`$DATA.decode` 方法](#3102-decode-方法)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urlencode()` 函数：<https://www.php.net/manual/en/function.urlencode.php>
- PHP `rawurlencode()` 函数：<https://www.php.net/manual/en/function.rawurlencode.php>

#### 3.11.2) `decode` 方法

解码经 URL 编码的字符串。

**描述**

```js
$URL.decode(
        <string $str: `The string to be decoded.` >
        [, < 'binary | string' $type = 'string': `The type of return data:`
            - 'binary': `The decoded data returned as a binary sequence.`
            - 'string': `The decoded data returned as a string in UTF-8 encoding.` >
            [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
              - 'rfc1738': `Decoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
              - 'rfc3986':  `Decoding is performed according to RFC 3986, and spaces are expected being percent encoded (%20).`
            ]
        ]
) string | bseqence
```

该方法将使用 URL 编码的字符串解码为字符串或者字节序列。

URL 编码以字节为单位字节处理字符串或者字节序列中的字符而忽略字符串或者字节序列的原始编码形式（如 UTF-8 或者 GB18030），除 `-_.` 之外，所有非字母数字字符都将被替换成百分号（%）后跟两位十六进制数的形式。由于历史原因，该编码有两种形式。采用 RFC 1738 和 'application/x-www-form-urlencoded' 媒体类型编码时，空格会被编码为加号（+），这种编码方式与网页中的表单使用 `POST` 方法的编码方式一样。而采用 RFC 3986 时，空格会被编码为 `%20`。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：未指定必要参数；可忽略异常，静默求值时返回空字符串或者空字节序列。
- `WrongDataType`：传入了不是字符串类型的数据；可忽略异常，静默求值时返回空字符串或者空字节序列。
- `BadEncoding`：当 `$type` 为 `string` 时产生，表示解码后的数据不是合法的 UTF-8 编码字符；可忽略异常，静默求值时返回已解码的字符串。

**示例**

```js
$URL.decode('HVML%3A+%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21')
    // string: 'HVML: 全球首款可编程标记语言!'

$URL.decode('HVML%3A%20%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21', 'string', 'rfc3986')
    // string: 'HVML: 全球首款可编程标记语言!'
```

**参见**

- [`$DATA.encode` 方法](#3101-encode-方法)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urldecode()` 函数：<https://www.php.net/manual/en/function.urldecode.php>
- PHP `rawurldecode()` 函数：<https://www.php.net/manual/en/function.rawurldecode.php>

#### 3.11.3) `build_query` 方法

生成 URL 编码的查询字符串。

**描述**

```js
$URL.build_query(
    < object | array $query_data >
    [, < string $numeric_prefix = '': `The numeric prefix for the argument names if $query_data is an array.` >
        [, <string $arg_separator = '&': `The character used to separate the arguments. `>
            [, <'[real-json | real-ejson] || [rfc1738 | rfc3986]' $opts = 'real-json rfc1738':
              - 'real-json':    `Use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
              - 'real-ejson':   `Use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
              - 'rfc1738':      `Encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
              - 'rfc3986':      `Encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).`
            ]
        ]
    ]
) string
```

该方法构造一个可用于 URL 查询部分的字符串，如 `foo=bar&text=HVML%E6%98%AF%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80`。

如果第一个参数是数组，则数组成员会用来指定查询字符串中各参数的键值，对应的键名默认使用数组成员序号，因而最终会生成 `0=bar&1=foo` 这样查询字符串。

如果第一个参数是对象，则使用对象键值对来组成查询字符串中各参数的键名和键值，因而最终会生成 `foo=fou&bar=buz` 这样的查询字符串。

使用 `$arg_separator` 可指定分隔参数时使用的字符，默认为 `&`；必须为一个 ASCII 字符。

当参数为容器数据时，将使用类似 PHP `http_build_query()` 函数的处理方法。

另外，我们可通过 `$opts` 指定如何处理实数类数据，还可以通过该参数指定编码方法。

**异常**

**示例**

**参见**

- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `http_build_query()` 函数：<https://www.php.net/manual/en/function.http-build-query.php>

#### 3.11.4) `parse_query` 方法

解析 URL 编码的查询字符串。

**描述**

```js
$URL.parse_query(
    < string $query_string >
    [, <string $arg_separator = '&': `The character used to separate the arguments. >
        [, <'[array | object] || [string | binary | auto] || [rfc1738 | rfc3986]' $opts = 'object auto rfc1738':
          - 'array':    `construct an array with the query string; this will ignore the argument names in the query string.`
          - 'object':   `construct an object with the query string.`
          - 'auto':     `The argument values will be decoded as strings first; if failed, decoded into binary sequences.`
          - 'binary':   `The argument values will be decoded as binary sequences.`
          - 'string':   `The argument values will be decoded as strings.` >
          - 'rfc1738':  `The query string is encoded per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
          - 'rfc3986':  `The query string is encoded according to RFC 3986, and spaces will be percent encoded (%20).`
        ]
    ]
) object
```

该方法解析一个 URL 查询部分字符串，并使用该字符串中的参数构造一个数组或者对象。

**异常**

**示例**

**参见**

- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `http_build_query()` 函数：<https://www.php.net/manual/en/function.http-build-query.php>

#### 3.11.5) `parse` 方法

解析 URL，返回其组成部分。


**描述**

```js
$URL.parse(
        <string $url: `The URL to parse.>,
        [,
            <'all | [scheme || host || port || user || password || path || query || fragment]' $components = 'all': `The components want to parse.>
        ]
) object | string
```


**参数**

**返回值**

**示例**

**参见**

- PHP `parse_url()` 函数：<https://www.php.net/manual/en/function.parse-url.php>

#### 3.11.6) `assemble` 方法

根据分解 URL 对象组装一个完整的 URL。


**描述**

```js
$URL.assemble(
        <object $broken_down_url: `The broken-down URL object.`>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `parse_url()` 函数：<https://www.php.net/manual/en/function.parse-url.php>

### 3.12) `STREAM`

`$STREAM` 是一个行者级内置变量，该变量用于实现基于读写流的操作。和 `$DOC` 变量的 `query` 方法类似，该变量上提供的 `open` 方法返回一个原生实体，在该原生实体上，我们提供用于从流中读取数据或者将数据写入流的接口。

下面的 HVML 代码，打开了一个本地文件，然后在代表读取流的原生实体上调用 `readstruct` 方法：

```hvml
    <init as="formats">
        [
            "bytes:2 padding:2 u32le u32le",
            "f64le f64le",
        ]
    </init>

    <init as="packages">
    </init>

    <choose on="$STREAM.open('file://mydata.txt', 'read')">
        <iterate on="$formats" in="$packages" by="RANGE: 0">
            <update on="$packages" to="append" with="$?.readstruct($2, $?)" />
        </iterate>
    </choose>
```

`$STREAM.open` 方法返回的原生实体，称为“流（stream）实体”。流实体应提供如下基本接口：

- `readbytes` 和 `writebytes` 方法：读写字节序列。
- `readstruct` 和 `writestruct` 方法：读写二进制数据结构。
- `readlines` 和 `writelines` 方法：读写文本行。
- `seek` 方法：在可定位流中重新定位流的读写位置。
- `stream:readable` 事件：有可读数据。
- `stream:writable` 事件：可写入数据。
- `stream:hangup` 事件：被挂起；通常针对管道和套接字，表明连接的对端已断开。
- `stream:error` 事件：错误。

为方便使用，我们在 `$STREAM` 变量上提供如下静态属性：

- `stdin`、 `stdout` 和 `stderr` 静态属性：C 语言标准输入、标准输出和标准错误的流实体封装。

通常来讲，流实体应该是可被观察的，从而可以监听读取流上是否有数据等待读取，或者是否可向写入流中写入数据。比如，我们可以观察 `$STREAM.stdin`，以便监听用户的输入：

```hvml
    <observe on="$STREAM.stdin" for="stream:readable">
        <choose on="$?.readlines(1)">
            ...
        </choose>
    </observe>
```

另外，`STREAM` 变量应使用可扩展的实现，从而针对不同的流类型，在流实体上提供额外的读写方法或者事件，从而可以实现对某些应用层协议的支持。比如，当某个解释器实现的 `$STREAM` 方法支持 WebSocket 扩展协议时，即可通过 `message` 事件处理来自服务器的消息：

```hvml
    <init as 'wsStream' with $STREAM.open('inet://foo.com:8080/', 'default', 'websocket', ...) >
        <observe on $wsStream for 'message'>
            ...
        </observe>
    </init>
```

#### 3.12.1) `from` 方法

基于一个已有的文件描述符创建流实体。

**描述**

```js
$STREAM.from(
        < longint $fd: `The file descriptor.` >
        [, <'[append || nonblock || cloexec] | keep' $flags = 'keep':
               - 'append':      `Set the file descriptor in append mode.`
               - 'nonblock':    `Set the file descriptor in nonblocking mode.`
               - 'cloexec':     `Set the file descriptor flag close-on-exec.`
               - 'keep':        `Do not change the file descriptor (status) flags.`
           >
           [, < 'raw | message | websocket | hbdbus' $ext_protocol = 'raw': `The extended protocol will be used on the stream.`
               - 'raw':                 `No extended protocol.`
               - 'message':             `WebSocket-like message-based protocol; only for 'local://' and 'fifo://' connections.`
               - 'websocket':           `WebSocket protocol; only for 'inetN:// connections.`
               - 'hbdbus':              `HybridOS data bus protocol; only for 'local://' and 'inetN://' connections.`
              >
                [, <object $extra_options: `The extra options.` >
                ]
           ]
        ]
) native/stream | undefined
```

该方法基于一个已有的文件描述符创建一个流实体，返回一个代表流的原生实体值。

我们可以通过第三个可选参数指定流数据的更高层应用协议，通过扩展流实体提供的方法来方便程序的使用，比如：

- `message`：在 UNIX 套接字之上使用类似 WebSocket 的、基于消息的方式处理数据。
- `websocket`：在 INET 套接字之上使用 WebSocket 协议处理数据。
- `hbdbus`：使用 HBDBus 数据总线协议处理数据，方便程序通过 HBDBus 数据总线订阅事件或者发起远程过程调用并获得结果。
- `mqtt`：使用 MQTT 物联网协议处理数据，该过滤器会扩展流实体上提供的方法，从而可以通过 MQTT 数据总线订阅事件或者发起远程过程调用并获得结果。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**备注**

1. 流的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用 `$STREAM.close` 方法释放流实体占用的系统资源。

**示例**

```js
$STREAM.from(5, 'keep', 'websocket', ...)
```

#### 3.12.2) `open` 方法

打开流，返回一个代表流的原生实体值。这个原生实体可以被观察。

**描述**

```js
$STREAM.open(
        < string $uri: `The URI of the stream.` >
        [, <'[read || write || append || create || truncate || nonblock || cloexec || nameless] | default' $opt = 'default':
               - 'read':        `Open for reading only`
               - 'write':       `Open for writing only`
               - 'append':      `Open in append mode. Before each write, the offset is positioned at the end of the stream`
               - 'create':      `If $uri does not exist, create it as a regular file`
               - 'truncate':    `If $uri already exists and is a regular file and the access mode allows writing it will be truncated to length 0`
               - 'nonblock':    `Open the $uri in nonblocking mode`
               - 'cloexec':     `Set the file descriptor flag close-on-exec.`
               - 'nameless':    `Do not assign a name to the socket; only for local socket.`
               - 'default':     `The equivalent to 'read write cloexec'`
           >
           [, < 'raw | message | websocket | hbdbus' $ext_protocol = 'raw': `The extended protocol will be used on the stream.`
               - 'raw':                 `No extended protocol.`
               - 'message':             `WebSocket-like message-based protocol; only for 'local://' and 'fifo://' connections.`
               - 'websocket':           `WebSocket protocol; only for 'inetN:// connections.`
               - 'hbdbus':              `HybridOS data bus protocol; only for 'local://' and 'inetN://' connections.`
              >
                [, <object $extra_options: `The extra options.` >
                ]
           ]
        ]
) native/stream | null | undefined
```

该方法打开一个流，返回一个代表流的原生实体值；当打开一个套接字流且通过扩展选项设置了超时值（`recv-timeout`）时，该方法可能因超时而返回 `null`。

该方法使用 URI 指定要打开的流位置以及传输层类型名称，如：

- `file:///etc/passwd`：`/etc/passwd` 文件。
- `file://Documents/mydata`：当前工作路径下的 `Document/mydata` 文件。
- `pipe:///usr/bin/wc`：在子进程中执行指定的系统程序，创建匿名管道作为子进程的标准输入、输出和错误。可通过 URI 中的查询参数传递命令行所需要的选项和/或参数。
- `fifo:///var/tmp/namedpipe`：FIFO，也就是命名管道。
- `local:///var/run/myapp.sock`：裸的 UNIX 套接字。
- `inet://foo.com:1100`：裸的 Internet v4 or v6 套接字。
- `inet4://foo.com:1100`：裸的 Internet v4 套接字。
- `inet6://foo.com:1100`：裸的 Internet v6 套接字。

我们可以在 `open` 方法中指定流数据的更高层应用协议，通过扩展流实体提供的方法来方便程序的使用，比如：

- `message`：在 UNIX 套接字之上使用类似 WebSocket 的、基于消息的方式处理数据。
- `websocket`：在 TCP 套接字之上使用 WebSocket 协议处理数据。
- `hbdbus`：使用 HBDBus 数据总线协议处理数据，方便程序通过 HBDBus 数据总线订阅事件或者发起远程过程调用并获得结果。
- `mqtt`：使用 MQTT 物联网协议处理数据，该过滤器会扩展流实体上提供的方法，从而可以通过 MQTT 数据总线订阅事件或者发起远程过程调用并获得结果。

解释器最少应实现对 `file://` 的支持，其他套接字类型及扩展协议，可根据情况选择实现。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**备注**

1. 流的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用 `$STREAM.close` 方法释放流实体占用的系统资源。
1. 选项字符串随流的类型不同而不同。
1. 选项字符串与`fopen`对应关系：

| $STREAM.open                 |  fopen    |
| --------------------------   |  -------- |
| `read`                       |  `r`      |
| `write create truncate`      |  `w`      |
| `write create append`        |  `a`      |
| `read write`                 |  `r+`     |
| `read write create truncate` |  `w+`     |
| `read write create append`   |  `a+`     |

**示例**

```js
$STREAM.open("file://abc.md", "read write")
```

#### 3.12.3) `close` 方法

关闭流。

**描述**

```js
$STREAM.close(
        < stream $stream: `The stream entity to close.` >
) boolean
```

该方法关闭由 `$STREAM.open` 打开的流实体，以便释放该流实体占用的系统资源。成功时返回 `true`，若流已关闭，也视作成功。

注意，若没有调用该方法，流的关闭将在最终释放对应的原生实体值时自动进行。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。

**示例**

```js
// 创建并清空
$STREAM.close($STREAM.open("file://abc.md", "read write create truncate"))
```

#### 3.12.4) `stdin` 静态属性

这是一个静态属性，对应一个流实体，其值可用于流式读写的读取接口，是 C 语言标准输入流的封装。

#### 3.12.5) `stdout` 静态属性

这是一个静态属性，对应一个流实体，其值可用于流式读写的写入接口，是 C 语言标准输出流的封装。

**示例**

```
// 将内核名称（如 `Linux`）输出到标准输出。
$STREAM.stdout.writelines($SYS.uname_prt('kernel-name'))
```

#### 3.12.6) `stderr` 静态属性

这是一个静态属性，其对应一个流实体，值可用于流式读写的写入接口，是 C 语言标准错误流的封装。

#### 3.12.7) `listener` 属性

该属性反应的是流实体事件的监听者（协程）。默认情况下，流实体的监听者为创建流实体的协程。通过该属性的设置器，可修改监听者为新的协程。注意，作为新监听者的协程，必须必须和原监听者属于同一行者。

注：该属性仅供参考，可能被移除。

**描述**

```js
$STREAM.listener ulongint | null: `The corouting identifier of the current listener`.
```

```js
$STREAM.listener(!
        <ulongint $cid: `The new listener of the stream entity`.>
) ulongint | null | false: `The old listener of the current listener`.
```

#### 3.12.8) 流实体

##### 3.12.8.1) `readstruct` 方法

从流中读取一个二进制结构，并转换为适当的数据。

```js
$stream.readstruct(
        < string $format: `The format of the struct`>
) array | real | string | bsequence | null
```

该方法按指定的格式从流实体（`$stream`）中读取数据， 当 `$format` 指定的格式字符串包含多个基本数据类型时，该函数返回数组，否则返回单个数据。

该方法可能返回 `null`，表示可再次尝试读取数据。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `null`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `null`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时 `null`。
- `NotDesiredEntity`：表示传递了一个未预期的实体（目标可能是一个目录），静默求值时返回 `null`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `null`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `null`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `null`。

**示例**

假定文件内容如下（使用 eJSON 的字节序列描）：

```
bx0a000a000000
```

读取一个结构：

```js
$stream.readstruct('i16le i32le')
    // array: [10, 10]
```

##### 3.12.8.2) `writestruct` 方法

将多个数据按照指定的结构格式写入流。

```js
$stream.writestruct(
        <string $format: `The format string; see Binary Format Notation.` >,
        <real | string | bsequence | array $first: `The first data.` >
        [,  <real | string | bsequence | array $second: `The second data.` >
            [, <real | string | bsequence | array $third: `The third data.` >
                [, ... ]
            ]
        ]
) longint | false
```

该方法将传入的多个实数、实数数组、字符串或字节序列按照 `$format` 指定的二进制格式写入流实体（`$stream`）。

```js
$stream.writestruct(
        < string $format: `The format string; see Binary Format Notation.` >,
        < array $data >
) longint | false
```

当传入三个参数，且第三个参数为数组时，该函数将传入的数组之成员依次按照 `$format` 指定的二进制格式写入流。

上述方法按指定的格式将数据写入流，返回写入的字节数。该方法可能返回 `-1L`，表示可再次尝试写入数据。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `false`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `false`。
- `NoStorageSpace`：表示存储空间不足；可忽略异常，静默求值时返回 `false`。
- `TooLarge`：写入大小大小超过(文件)限制；可忽略异常，静默求值时返回 `false`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$stream.writestruct("i16le i32le", 10, 10)
// 写入文件(16进制)：0x0a 0x00 0x0a 0x00 0x00 0x00

$stream.writestruct("i16le:2 i32le", [[10, 15], 255])
// 写入文件(16进制)：0x0a 0x00 0x0f 0x00 0xff 0x00 0x00 0x00

$stream.writestruct("i16le:2 i32le", [10, 15], 255)
// 写入文件(16进制)：0x0a 0x00 0x0f 0x00 0xff 0x00 0x00 0x00
```

##### 3.12.8.3) `readlines` 方法

从流中读取给定行数，返回字符串数组。

**描述**

```js
$stream.readlines(
        < real $lines: `The number of lines to read; 0 means reading all lines available.`>
        [,
            < string $line_terminator = '\n': `The string terminating a line.` >
        ]
) array | null
```

该方法按指定行数读取数据，并转换为数组返回，数组的每个成员都是一行数据。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时 `null`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时 `null`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时 `null`。
- `NotDesiredEntity`：表示传递了一个未预期的实体(目标可能是一个目录)，静默求值时返回 `null`。
- `NoData`：已到达文件尾部，无数据可读入; 可忽略异常，静默求值时返回 `null`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `null`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `null`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `null`。

**示例**

假定文件内容如下:

```
This is the string to write
Second line
```

读取 10 行：

```js
$stream.readlines(10)
    // array: ["This is the string to write", "Second line"]
```

##### 3.12.8.4) `writelines` 方法

将字符串写入流中。

**描述**

```js
$stream.writelines(
        < string | array $lines: `The data to be written.`>
        [,
            <string $line_terminator = '\n': `The line terminating characters`. >
        ]
) longint | false

```

该方法将参数 `$lines` 指定的字符串或字符串数组写入流；当参数是数组时，要求数组的每个成员都是字符串类型，写入时每个数组成员是单独的一行。该方法返回写入的字节数。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `false`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `false`。
- `NoStorageSpace`：表示存储空间不足；可忽略异常，静默求值时返回 `false`。
- `TooLarge`：写入大小大小超过（配额）限制；可忽略异常，静默求值时返回 `false`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$STREAM.stdout.writelines("This is the string to write")
    // 将在 STDOUT 上输出：
    // This is the string to write

$STREAM.stdout.writelines(["This is the string to write", "Second line"])
    // 将在 STDOUT 上输出：
    // This is the string to write
    // Second line
```

##### 3.12.8.5) `readbytes` 方法

从流中读取一个字节序列，返回一个字节序列。

**描述**

```js
$stream.readbytes(
        < real $length: `The length to read in bytes`>
) bsequence | null
```

该方法从 `$stream` 流中读取指定长度的字节，并转换为字节序列返回。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `null`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `null`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `null`。
- `NotDesiredEntity`：表示传递了一个未预期的实体(目标可能是一个目录)，静默求值时返回 `null`。
- `NoData`：已到达文件尾部，无数据可读入; 可忽略异常，静默求值时返回 `null`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `null`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `null`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `null`。

**示例**

假定文件内容（共 12 字节）：

```
write string
```

读取 10 个字节：

```js
$STREAM.stdin.readbytes(10)
    // bsequence: bx77726974652073747269
```

##### 3.12.8.6) `readbytes2buffer` 方法

从流中读取数据并将其追加到用作缓冲区的字节序列中。

**描述**

```js
$stream.readbytes2bufer(
        < bsequence $buffer: `The byte seqence as a buffer.`>
        [,
            < ulongint $length = 0: `The number of bytes to read; 0 means trying to fill full of the buffer.`>
        ]
) longint | false
```

该方法从 `$stream` 流中读取指定长度的字节，并将其追加到指定的缓冲区中。当指定 `$length` 参数为 `0` 时，将尝试读取缓冲区的最大可用空间字节数。

若该方法返回 `-1` 则表明流上无数据可读，可继续尝试。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据，如只读字节序、长度过长等; 可忽略异常，静默求值时返回 `false`。
- `NoData`：已到达文件尾部，无数据可读入; 可忽略异常，静默求值时返回 `false`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时 `false`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `false`。

##### 3.12.8.7) `writebytes` 方法

将一个字节序列写入流。

**描述**

```js
$stream.writebytes(
        < 'string | bsequence' $data: `The data to be written.`>
) longint | false
```

该方法将字节序列写入 `$stream` 流，返回写入的字节数。注意该方法不会将字符串尾部的空字符写入流。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `BrokenPipe`：管道或套接字的另一端已关闭; 可忽略异常，静默求值时返回 `false`。
- `AccessDenied`：当前行者的所有者没有权限写入数据；可忽略异常，静默求值时返回 `false`。
- `NoStorageSpace`：表示存储空间不足；可忽略异常，静默求值时返回 `false`。
- `TooLarge`：写入大小大小超过（配额）限制；可忽略异常，静默求值时返回 `false`。
- `IOFailure`：输入输出错误；可忽略异常，静默求值时返回 `false`。

**示例**

```js
// 写入字节序列
$STREAM.stdout.writebytes(bx48564d4c3A202d5f2e)
    // ulongint: 9L

// 将字符串作为字节序列写入
$STREAM.stdout.writebytes("write string")
    // longint: 12L
```

注意：字符串作为字节序列写入时，应该写入结尾的空字符。

##### 3.12.8.8) `seek` 方法

在流中执行定位操作。

**描述**

```js
$stream.seek(
        < number $offset: `The offset to be set`>,
        [, <'set | current | end | default' $whence = 'default':
            - 'set':     `The $stream offset is set to offset bytes.`
            - 'current': `The $stream offset is set to its current location plus offset bytes`
            - 'end':     `The $stream offset is set to the size of the file plus offset bytes.`
            - 'default': `The equivalent to 'set'.`
           >
        ]
) ulongint | false
```

该方法进行定位操作，返回当前位置。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `false`。
- `Unsupported`：不支持该操作(管道，套接字); 可忽略异常，静默求值时返回 `false`。
- `TooLarge`：返回的偏移量太大; 可忽略异常，静默求值时返回 `false`。

**备注**

1. 仅支持 `file://` 类型的流。

**示例**

```js
// 示例：定位到第10个字节的位置
$stream.seek(10, 'set')
    // ulongint: 10L
```

##### 3.12.8.9) `fd` 属性

获取流对应的文件描述符（仅针对 POSIX 系统）。

**描述**

```js
$stream.fd longint | false
```

通过该属性的获取器获得流底层对应的文件描述符。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。

**示例**

```js
$STREAM.stdin.fd
    // 0L
```

##### 3.12.8.10) `peerAddr` 属性

获取套接字流对应的对端地址，如 UNIX 套接字另一端的套接字文件路径，网络套接字另一端的 IP 地址等。

**描述**

```js
$stream.peerAddr string | null
```

通过该属性的获取器获得套接字流对端的英特网地址。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。

**示例**

```js
$stream.peerAddr()
    // 0L
```

##### 3.12.8.11) `peerPort` 属性

获取 INET 套接字流对应的对端端口。

**描述**

```js
$stream.peerPort string | null
```

通过该属性的获取器获得套接字流对端的端口地址。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。

**示例**

```js
$stream.peerPort()
    // 0L
```

#### 3.12.9) `pipe` 流实体

**查询参数**

在 `pipe` URI 中，我们按如下规范通过查询组件（query component）传入针对命令行的选项（options）及参数（arguments）：

- 使用 `ARG0`、`ARG1`...`ARG<N>` 作为键名，表示执行命令所使用的所有命令行参数。
- 其中 `ARG0` 可选；当不传递 `ARG0` 时，表示命令行的第一个参数将使用在 `pipe` URI 的路径组件（path component）的最后部分，通常是可执行程序的文件名。
- `ARG0`、`ARG1`...`ARG<N>` 应连续给出。解析 `pipe` URI 的代码，将从 0 开始循环查找查询组件中的键值对，在找不到给定的 `ARG<n> (<n> >= 1)` 时停止。

假如我们要执行如下的命令：

```
du -BM hvml-spec-v1.0-zh.md
```

则对应的 URI 为（注意要经过 URI 编码）：

```
    pipe:///usr/bin/du?ARG0=du&ARG1=-BM&ARG2=hvml-spec-v1.0-zh.md
```

注意各个参数的值，应经过符合 RFC3986 规范的 URI 编码。

**额外方法**

`pipe` 流实体应该额外提供 `writeeof` 方法，用于父进程一侧向管道写入 EOF（文件尾）字符。此操作相当于关闭子进程的标准输入（stdin），大部分交互式命令行程序在遇到标准输入被关闭时，会选择退出。

`pipe` 流实体应该额外提供 `status` 方法，用于检查子进程的状态。该方法返回一个数组，第一个成员是表示状态的字符串，第二个成员给出状态对应的值。

### 3.13) `SOCKET`

`$SOCKET` 是一个行者级内置变量，该变量可用于创建流套接字或者数据报套接字，并监听该套接字上的连接请求，或者直接收发消息。该变量主要提供如下接口：

- 使用 `$SOCKET` 提供的 `stream()` 方法，可创建一个用于监听连接请求的流套接字（streamSocket）原生实体。
- 使用 `$SOCKET` 提供的 `dgram()` 方法，可创建一个数据报套接字（dgramSocket）原生实体。

流套接字（streamSocket）原生实体主要提供如下接口：

- `socket:connAttempt` 事件，用于通知一个新的客户端连接请求。
- `accept()` 方法：用于接受连接请求并返回一个流（stream）实体。和 `$STREAM.open()` 方法类似，可传入扩展协议以及参数。
- `close()` 方法：用于关闭流套接字。

数据报套接字（dgramSocket）原生实体主要提供如下接口：

- `socket:newDatagram` 事件，用于通知数据报套接字上有新的数据报（消息）可接收。
- `sendto()` 方法：用于通过数据报套接字向指定的目标地址发送一条消息。
- `recvfrom()` 方法：用于接收数据报套接字上收到的消息。
- `close()` 方法：用于关闭数据报套接字。

下面的 HVML 代码，在指定的 INET6 域流套接字上监听连接请求（`connAttempt` 事件），然后调用 `accept()` 方法。注意在 `accept()` 方法中，因指定了 `websocket` 协议，要继续监听 `handshake` 事件，并在处理此事件时做后续响应或者关闭请求等。

```hvml
    <init as 'streamSocket' with  $SOCKET.stream('inet6://foobar.com:8888', ...) >
        <observe on $? for 'connAttempt' >
            <init as 'wsStream' with $streamSocket.accept('default', 'websocket', ...) >
                <observe on $wsStream for 'handshake' >
                    <inherit>
                        $_observedOn.send_handshake_resp(...)
                    </inherit>
                </observe>
                <observe on $wsStream for 'message' >
                    ...
                </observe>
            </init>
        </observe>
    </init>
```

`$streamSocket.accept()` 方法返回一个流（stream）实体 ，从而可利用 [流实体](#312-stream)提供的接口获取对端信息，或者发送或接收数据。

#### 3.13.1) `stream` 方法

创建并监听一个流套接字（streamSocket），返回一个代表流套接字的原生实体值。这个原生实体可以被观察。

**描述**

```js
$SOCKET.stream(
        < string $uri: `The URI of the stream socket.` >
        [, <'[global || nonblock || cloexec] | default | none' $opt = 'default':
               - 'global':      `Create a globally accessible socket.`
               - 'nonblock':    `Create the sockete in nonblocking mode.`
               - 'cloexec':     `Set the file descriptor flag close-on-exec.`
               - 'default':     `The equivalent to 'cloexec nonblock'.`
               - 'none':        `No additional flags are specified.` >
            [, <longint $backlog = 32: `The backlog.` >
                [, < object | null $ssl_opts = null: `An object describing the options for SSL; null for not using SSL.`:
                    - 'sslcert':   < string: `The SSL certification file.` >,
                    - 'sslkey':    < string: `The SSL private key file.` >,
                    - 'sslsessioncacheid':  < string: `Use the external SSL session cache to enable sharing the sessions between processes.` >
                    - 'sslsessioncacheusers': < ['group || other']: `Specify the extra users who can access the shared SSL session cache except the owner.` >
                    - 'sslsessioncachesize': < real = 256: `Specify the size of the cache: how many sessions to cache.` >
                    >
                ]
            ]
        ]
) native/streamSocket | undefined
```

该方法创建并监听一个流套接字，返回一个代表流套接字的原生实体值。

该方法使用 URI 指定要打开的流套接字位置，如：

- `local:///var/run/myapp.sock`：本地套接字。
- `unix:///var/run/myapp.sock`：本地套接字。
- `inet://foo.com:1100`：Internet v4 or v6 套接字。
- `inet4://foo.com:1100`：Internet v4 套接字。
- `inet6://foo.com:1100`：Internet v6 套接字。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**备注**

1. 流套接字的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用 `$streamSocket.close` 方法释放流套接字实体占用的系统资源。

**示例**

```js
$SOCKET.stream("local://var/run/myapp.sock")
```

#### 3.13.2) `dgram` 方法

创建一个数据报套接字（dgramSocket），返回一个代表数据报套接字的原生实体值。这个原生实体可以被观察。

**描述**

```js
$SOCKET.dgram(
        < string $uri: `The URI of the dgram socket.` >
        [, <'[global || nameless || nonblock || cloexec] | default | none' $opt = 'default':
               - 'global':      `Create a globally accessible socket; only for local socket.`
               - 'nameless':    `Do not assign a name to the socket; only for local socket.`
               - 'nonblock':    `Create the sockete in nonblocking mode.`
               - 'cloexec':     `Set the file descriptor flag close-on-exec.`
               - 'default':     `The equivalent to 'cloexec nonblock'.`
               - 'none':        `No additional flags are specified.`
           >
        ]
) native/dgramSocket | undefined
```

该方法创建一个数据报套接字，返回一个代表数据报套接字的原生实体值。

该方法使用 URI 指定要打开的流套接字位置，如：

- `local:///var/run/myapp.sock`：本地数据报套接字。
- `unix:///var/run/myapp.sock`：本地数据报套接字。
- `inet://foo.com:1100`：Internet v4 or v6 数据报套接字。
- `inet4://foo.com:1100`：Internet v4 数据报套接字。
- `inet6://foo.com:1100`：Internet v6 数据报套接字。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**备注**

1. 数据报套接字的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用 `$dgramSocket.close` 方法释放流套接字实体占用的系统资源。

**示例**

```js
$SOCKET.dgram("local://var/run/myapp.sock")
```

#### 3.13.3) `close` 方法

关闭一个流套接字（streamSocket）或者数据报套接字（dgramSocket）。

**描述**

```js
$SOCKET.close( streamSocket | dgramSocket $entity )
    true | false
```

该方法关闭一个流套接字或者数据报套接字。

**异常**

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。

**备注**

1. 流套接字或者数据报套接字的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用该方法释放套接字实体占用的系统资源。

**示例**

```js
$SOCKET.close($streamSocket)
```

#### 3.13.4) 流套接字实体

流套接字（streamSocket）实体代表一个正在指定套接字上监听客户端连接请求的流套接字，可通过该实体提供的方法接受一个连接请求。

##### 3.13.4.1) `accept`

接受来自客户端的连接请求，并创建对应的流实体。

```js
$streamSocket.accept(
    <'[nonblock || cloexec] | default | none' $flags:
           - 'nonblock':    `Set the file descriptor in nonblocking mode.`
           - 'cloexec':     `Set the file descriptor flag close-on-exec.`
           - 'default':     `Equivalent to 'cloexec nonblock'.`
           - 'none':        `No additional flags are specified.`
    >
    [, <'raw | message | websocket | hbdbus' $extended_protocol = 'raw': `The extended protocol will be used on the stream.`
           - 'raw':         `No any protocol.`
           - 'message':     `WebSocket-like, but only for UNIX socket connections.`
           - 'websocket':   `WebSocket.`
           - 'hbdbus':      `HybridOS data bus protocol.`
        >
        [, <object $extra_opts: `The extra options for extended protocols.` >
        ]
    ]
) native/stream | null | undefined
```

该方法接受流套接字上的连接请求，返回一个流实体；如下情况下返回 `null`：
   - 当套接字被标记为非阻塞，但目前无连接可接受时；
   - 当套接字以阻塞方式等待接受连接，但达到或超过 `$SYS.sockopt` 设置的超时时间时。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$streamSocket.accept('default', 'websocket', ...)
    // native/stream
```

##### 3.13.4.2) `fd` 方法

该方法获取流套接字的文件描述符。

**描述**

```js
$streamSocket.fd()
    longint
```

该获取器返回流套接字对应的文件描述符。

**异常**

该方法不产生异常。

**示例**

```js
$streamSocket.fd()
    // 3L
```

##### 3.13.4.3) `close` 方法

该方法关闭流套接字。

**描述**

```js
$streamSocket.close()
    true | false
```

该方法关闭流套接字以释放系统资源。

**异常**

该方法不产生异常。

**备注**

1. 流套接字或者数据报套接字的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用该方法释放套接字实体占用的系统资源。

**示例**

```js
$streamSocket.close()
    // true
```

#### 3.13.5) 数据报套接字实体

##### 3.13.5.1) `sendto` 方法

通过该方法发送消息。

```js
$dgramSocket.sendto(
    < string $dest: `The URI of the destination address.` >,
    < '[dontwait || confirm] | default' $flags:
           - 'dontwait':    `Enable a nonblocking operation.`
           - 'confirm':     `Tell the link layer that forward progress happened: you got a successful reply from the other side.`
           - 'default':     `No additional flags are specified.`
    >,
    < bsequence | string $bytes: `The data to send.` >
    [,
        < ulongint $offset = 0: `The offset in $bytes.`>
        [,
            < longint $length = -1: `The number of bytes to send; a value less than 0 means to send all left bytes.`>
        ]
    ]
) undefined | object: `undefined or an object described the number of bytes sent or the error.`
    - 'sent':  <longint: `The number of bytes sent, or -1 if an error occurred.`>,
    - 'errorname': <string | null: `The system error name if $sent is less than 0.`>,
```

该方法通过数据报套接字向指定的目标地址发送一条消息，返回实际发送的字节数。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**示例**

##### 3.13.5.2) `recvfrom` 方法

通过该方法接收一条消息。

```js
$dgramSocket.recvfrom(
    <'[ dontwait || nosource || trunc] | default' $flags:
           - 'dontwait':    `Enable a nonblocking operation.`
           - 'nosource':    `Not intersted in the source address.`
           - 'trunc':       `Return the real length of the message, even when it was longer than the length of desired.`
           - 'default':     `No additional flags are specified.`
    >,
    <longint $length: `The number of bytes to receive.`>
) undefined | object: `undefined or an object describing the message and the source address:`
    - 'recved':  <longint: `The number of bytes received, or -1 if an error occurred.`>,
    - 'bytes': <bsequence | null:  `null or a byte sequence storing the bytes received.`>,
    - 'errorname': <string | null: `The system error name if $recved is less than 0.`>,
    - 'source-addr': < string | null: `The source address or numeric host.`>,
    - 'source-port': < longint | null: `The optional source port.`>,
```

该方法在数据报套接字上接收一条消息，返回一个对象。

**异常**

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：不正确的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：传入无效数据; 可忽略异常，静默求值时返回 `undefined`。

**示例**

##### 3.13.5.3) `fd` 方法

该方法获取数据报套接字的文件描述符。

**描述**

```js
$dgramSocket.fd()
    longint
```

该获取器返回数据报套接字对应的文件描述符。

**异常**

该方法不产生异常。

**示例**

```js
$dgramSocket.fd()
    // 3L
```

##### 3.13.5.4) `close` 方法

该方法关闭数据报套接字。

**描述**

```js
$dgramSocket.close()
    true | false
```

该方法关闭数据报套接字以释放系统资源。

**异常**

该方法不产生异常。

**备注**

1. 流套接字或者数据报套接字的关闭将在最终释放对应的原生实体值时自动进行，也可以提前调用该方法释放套接字实体占用的系统资源。

**示例**

```js
$dgramSocket.close()
    // true
```

### 3.14) 针对流实体的扩展协议

#### 3.14.1) `message` 扩展协议

在使用 URI 方案 `fifo://`、`local://` 的流实体上，在调用 `$STREAM.open()`、`$STREAM.from()` 和 `$streamSocket.accept()` 方法时，可使用 `message` 扩展协议，从而使用基于消息的数据处理方式。对应的接口有：

- `message` 事件：收到来自对端的消息数据，其负载是表示消息的变体；若消息为文本，则对应变体类型为字符串（string），若消息为二进制数据，则对应变体类型为字节序列（bsequence）。
- `error` 事件：当产生输入输出或协议错误时，将激发此事件，其负载是一个对象，包括错误编号（`code`）以及附言（`postscript`）两个属性，如 `{ "code": 5, "postscript": "Invalid Value" }`。
- `close` 事件：当对端要求关闭时，将激发此事件，其负载是一个对象，包括错误编号（`code`）以及附言（`postscript`）两个属性，如 `{ "code": 0, "postscript": "Bye" }`。
- `send()` 方法：发送消息数据；参数为字符串时以文本方式发送，参数为字节序列时以二进制方式发送。

当使用 `message` 扩展协议时，可指定如下协议选项：

```js
{
    /* Some configuration properties. */
    'maxframepayloadsize': < ulongint | undefined: `The maximum size of a message allowed; use the default value (4K) if not defined.` >
    'maxmessagesize':    < ulongint | undefined: `The maximum size of a message allowed; use the default value (16K) if not defined.` >
    'noresptimetoping':  < real | undefined: `The maximum no response seconds to send a PING message to the peer; use the default value (30) if not defined.` >
    'noresptimetoclose': < real | undefined: `The maximum no response seconds to close the socket; use the default value (90) if not defined.` >
}
```

#### 3.14.2) `websocket` 扩展协议

在使用 URI 方案 `inet<N>://` 的流实体上，在调用 `$STREAM.open()`、`$STREAM.from()` 和 `$streamSocket.accept()` 方法时，可使用 `websocket` 扩展协议，从而使用基于消息的数据处理方式。

对应接口有：

- `handshake` 事件：收到来自客户端的握手请求或者服务器端的握手应答时激发此事件。若是服务器，则该事件的负载包含客户端通过 HTTP Headers 发送而来的握手请求信息；若是客户端，则该事件的负载包含服务器的握手应答数据（如 HTTP 请求状态、服务器端选择的协议等）。
- `message` 事件：收到来自对端的消息数据，其负载是表示消息的变体；若消息为文本，则对应变体类型为字符串（string），若消息为二进制数据，则对应变体类型为字节序列（bsequence）。
- `error` 事件：当产生输入输出或协议错误时，将激发此事件，其负载是一个对象，包括错误编号（`code`）以及附言（`postscript`）两个属性，如 `{ "code": 5, "postscript": "Invalid Value" }`。
- `close` 事件：当对端要求关闭时，将激发此事件，其负载是一个对象，包括错误编号（`code`）以及附言（`postscript`）两个属性，如 `{ "code": 0, "postscript": "Bye" }`。
- `send()` 方法：发送消息数据；参数为字符串时以文本方式发送，参数为字节序列时以二进制方式发送。
- `send_handshake_resp()` 方法：通过该方法可向客户端发送指定的握手应答（HTTP 状态码）。

当使用 `websocket` 扩展协议时，可指定如下协议选项：

```js
{
    /* The following properties are client-only. */
    'path':         < string: `The path for GET method.` >,
    'host':         < string: `The host name.` >,
    'origin':       < string: `The origin domain name.` >,
    'useragent':    < string: `The user-agent of the client.` >,
    'referer':      < string: `The referer URL.` >,
    'subprotocols': < string | undefined: `The application subprotocols desired by the client, e.g., "GameA, GameB".` >,
    'extensions':   < string | undefined: `The extensions which are supported by the client, e.g., "zip".` >,

    'secure':       < boolean | undefined: `Indicate whether or not use SSL.` >,

    /* Some configuration properties for both client and server. */
    'maxframepayloadsize': < ulongint | undefined: `The maximum size of a message allowed; use the default value (4K) if not defined.` >,
    'maxmessagesize':    < ulongint | undefined: `The maximum size of a message allowed; use the default value (16K) if not defined.` >,
    'noresptimetoping':  < real | undefined: `The maximum no response seconds to send a PING message to the peer; use the default value (30) if not defined.` >,
    'noresptimetoclose': < real | undefined: `The maximum no response seconds to close the socket; use the default value (90) if not defined.` >,

    /* The following properties are server-only ones for worker processes, after the dispacther process has been accepted the connection. */
    'sslsessioncacheid': < string | undefined: `Use the external SSL session cache to enable sharing the SSL sessions among the dispatcher process and the worker processes.` >,
    'handshake':    < boolean: `Indicate if the dispatcher has been handled the WebSocket handshake.` >,
    'subprotocol':  < string | undefined: `The sub-protocol determined by the dispatcher after the handshake.` >,
    'extension':    < string | undefined: `The extension determined by the dispatcher after the handshake.` >,
}
```

注意，在使用 `websocket` 扩展时，如果在调用 `$SOCKET.stream()` 创建流套接字实体时开启了 SSL/TLS，将在调用 `$streamSocket.accept()` 之后生成的流实体上强制启用 SSL/TLS。

#### 3.14.3) `hbdbus` 扩展协议

在使用 URI 方案 `inetN://`、`local://` 的流实体上，在调用 `$STREAM.open()`、`$STREAM.from()` 和 `$streamSocket.accept()` 方法时，可使用 `hbdbus` 扩展协议。

`hbdbus` 扩展协议基于 `message` 或者 `websocket` 扩展协议实现，提供如下方法：

1. `subscribe()`：订阅一个事件。
1. `unsubscribe()`：取消对事件的订阅。
1. `call()`：发起一个远程过程调用。
1. `send_result()`：发送被调用的过程执行结果。
1. `register_evnt()`：登记一个事件。
1. `register_proc()`：登记一个远程过程调用。
1. `revoke_evnt()`：注销一个事件。
1. `revoke_proc()`：注销一个远程过程调用。

同时提供如下可观察事件：

1. `event:<bubble-name>`：接收到一个事件，`bubble-name` 是该事件的泡泡名。
1. `result:<method-name>`：接收到调用远程过程调用的的结果，`method-name` 是该远程过程调用的方法名。
1. `call:<method-name>`：接收到针对 `method-name` 的调用请求。
1. `state:ready`：验证通过，接口就绪。
1. `state:LostEventGenerator`：丢失已订阅的事件发生者；事件负载中包含事件发生者：
   `{ "endpointName": "edpt://host.name/app.name/runner.name" }`。
1. `state:LostEventBubble`：已订阅的事件被撤销；事件负载中包含事件发生者及事件的泡泡名称：
   `{ "endpointName": "edpt://host.name/app.name/runner.name", "bubbleName": "ABubble" }`。
1. `state:SystemShuttingDown`：系统关闭中；事件负载中包含发送系统终止调用的端点名称以及终止时间（自 UNIX Epoch 以来的秒数，字符串）：
   `{ "endpointName": "edpt://host.name/app.name/runner.name", "shutdownTime": "2300000" }`。
1. `error:hbdbus`：出现 HBDBus 相关的错误；事件负载中包含错误码及错误消息：
    `{ "errCode": 5, "errMsg": "Invalid Value" }`。
1. `close`：当对端要求关闭时，将激发此事件，其负载是一个对象，包括错误编号（`code`）以及附言（`postscript`）两个属性，如 `{ "code": 0, "postscript": "Bye" }`。

前三个事件的数据，可参阅 HBDBus 相关文档：

- [合璧操作系统设备端数据总线概要设计](https://github.com/HybridOS2/Documents/blob/master/zh/hybridos-design-data-bus-zh.md)

## 4) 可选动态变量

### 4.1) `MATH`

`MATH` 是一个可装载的动态变量，用于实现复杂的数学运算和函数。

在调用`MATH` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `ZeroDivision`：被零除错误。
- `Overflow`：计算时产生向上溢出错误。
- `Underflow`：计算时产生向下溢出错误。
- `InvalidFloat`：无效浮点数。

#### 4.1.1) `pi` 方法

该方法用于获得给定精度的 PI 值：

```js
// 原型
// 始终返回 3.14159265358979323846
$MATH.pi

// 原型
// 始终返回 3.141592653589793238462643383279502884L
$MATH.pi_l
```

#### 4.1.2) `e` 方法

该方法用于获得给定精度的 e（自然常数，欧拉数）值：

```js
// 原型
// 始终返回 2.718281828459045
$MATH.e

// 原型
// 始终返回 2.718281828459045235360287471352662498L
$MATH.e_l
```

#### 4.1.3) `const` 方法

这两个方法的获取器用于获得预定义和自定义数学常数：

```js
// 原型
// 根据传入的关键词或自定义常数名称返回指定常数，返回类型为 `number`
$MATH.const( <'e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt(2)'] > <string: a user-defined const name>) number

// 原型
// 根据传入的关键词或自定义常数名称返回指定常数，返回类型为 `longdouble`
$MATH.const_l( <'e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt(2)'> | <string: a user-defined const name>) longdouble

// 示例：获取 log2e 值，即：1.4426950408889634074
$MATH.const('log2e')

// 示例：获取 1/sqrt(2) 值，即：0.707106781186547524400844362104849039L。
$MATH.const_l('1/sqrt(2)')
```

注：预定义常量的值，见 C 语言标准库头文件：`<math.h>`。

这两个方法的设置器用于设置自定义的数学常数：

```js
// 原型
// 设置自定义常数
$MATH.const(!
        <string: `A user-defined const name`>,
        <number: `The constant>
        [, <longdouble: `The constant>]
) boolean

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

```js
// 原型：求两个实数的和，返回指定类型的数值；默认为 `number`
$MATH.add(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// 示例：求 (1.4 + 0.7) 默认返回 `number` 类型，结果为 `2.1`。
$MATH.add(1.4, 0.7)

// 示例：求 (1.4 + 0.7) 并转换为 `longint` 类型，结果为 `2L`。
$MATH.add(1.4, 0.7, 'longint')
```

#### 4.1.5) `sub` 方法

求两个实数的差。

```js
// 原型：求两个实数的差，返回指定类型的数值；默认为 `number`
$MATH.sub(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// 示例：求 (1.4 - 0.7) 默认返回 `number` 类型，结果为 `0.7`。
$MATH.sub(1.4, 0.7)

// 示例：求 (1.4 - 0.7) 返回 `longint` 类型，结果为 `0L`。
$MATH.sub(1.4, 0.7, 'longint')
```

#### 4.1.6) `mul` 方法

求两个实数的积。

```js
// 原型：求两个实数的积，返回指定类型的数值；默认为 `number`
$MATH.mul(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// 示例：求 (1.4 * 0.7) 默认返回 `number` 类型，结果为 `0.98`。
$MATH.mul(1.4, 0.7)

// 示例：求 (1.4 * 0.7) 返回 `longint` 类型，结果为 `0L`。
$MATH.mul(1.4, 0.7, 'longint')
```

#### 4.1.7) `div` 方法

求两个实数的商。

```js
// 原型：求两个实数的商，返回指定类型的数值；默认为 `number`
$MATH.div(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// 示例：求 (1.4 / 0.7) 默认返回 `number` 类型，结果为 `2.0`。
$MATH.div(1.4, 0.7)

// 示例：求 (1.4 / 0.7) 返回 `longint` 类型，结果为 `2L`。
$MATH.div(1.4, 0.7, 'longint')
```

#### 4.1.8) `eval` 和 `eval_l` 方法

这两个方法用于求解参数化运算表达式，`eval` 方法返回 `number` 类型的结果数据，`eval_l` 方法返回 `longdouble` 类型的结果数据。

参数化运算表达式形似数学公式，其中可以使用四则运算符号、预定义常量、参数以及函数等，如计算圆面积的表达式为：

`PI * r * r`

在以上的表达式中，`PI` 是预定义常量，而 `r` 是这个表达式的一个参数，在求值时，我们需要要将该参数的值通过一个对象传入 `eval` 或者 `eval_l` 方法。如：

`$MATH.eval('PI * r * r', { r: 2.0 })`

将计算得到半径为 2.0 的圆面积。

我们也可以使用如下的表达式完成相同的计算：

`$MATH.eval('PI * pow(r, 2)', { r: 2.0 })`

在上面的表达式中，我们使用了 `pow(r, 2)` 替代了 `r * r`），`pow` 是用于计算一个数的指定次幂的函数。

当参数名称和常量名称冲突时，我们优先使用给定的参数值。比如下面的计算：

`$MATH.eval('PI * pow(r, 2)', { PI: 3, r: 2.0 })`

会将 `PI` 视作参数名称而非常量，故而其求值结果为 12。

在参数化运算表达式中，可以使用如下常量：

- `E`：欧拉常数，也是自然对数的底数，约等于 2.718。
- `LN2`：2 的自然对数，约等于 0.693。
- `LN10`： 10 的自然对数，约等于 2.303。
- `LOG2E`： 以 2 为底的 E 的对数，约等于 1.443。
- `LOG10E`： 以 10 为底的 E 的对数，约等于 0.434。
- `PI`： 圆周率，一个圆的周长和直径之比，约等于 3.14159。
- `SQRT1_2`： 二分之一（½）的平方根，同时也是 2 的平方根的倒数，约等于 0.707。
- `SQRT2`： 2 的平方根，约等于 1.414。

在参数化运算表达式中，可以使用如下三角函数：

- `acos(x)`： 返回一个数的反余弦值。
- `acosh(x)`： 返回一个数的反双曲余弦值。
- `asin(x)`： 返回一个数的反正弦值。
- `asinh(x)`： 返回一个数的反双曲正弦值。
- `atan(x)`： 返回一个数的反正切值。
- `atanh(x)`： 返回一个数的反双曲正切值。
- `atan2(y, x)`： 返回 y/x 的反正切值。
- `cos(x)`： 返回一个数的余弦值。
- `cosh(x)`： 返回一个数的双曲余弦值。
- `sin(x)`： 返回一个数的正弦值。
- `sinh(x)`： 返回一个数的双曲正弦值。
- `tan(x)`： 返回一个数的正切值。
- `tanh(x)`： 返回一个数的双曲正切值。

在参数化运算表达式中，可以使用如下次幂及对数函数：

- `cbrt(x)`： 返回一个数的立方根。
- `exp(x)`： 返回欧拉常数的参数次方，E^x，其中 x 为参数，E 是欧拉常数（2.718...，自然对数的底数）。
- `hypot(x, y)`： 返回两个数的平方和的平方根。
- `log(x)`： 返回一个数的自然对数（㏒e，即 ㏑）。
- `log10(x)`： 返回一个数以 10 为底数的对数。
- `log2(x)`： 返回一个数以 2 为底数的对数。
- `pow(x, y)`： 返回一个数的 y 次幂。
- `sqrt(x)`： 返回一个数的平方根。

在参数化运算表达式中，可以使用如下圆整函数：

- `ceil(x)`： 返回大于一个数的最小整数，即一个数向上取整后的值。
- `floor(x)`： 返回小于一个数的最大整数，即一个数向下取整后的值。
- `round(x)`： 返回四舍五入后的数，相当于将给定的参数圆整到最近的整数，远离 0。
- `trunc(x)`： 返回一个数的整数部分（直接去除其小数点及之后的部分），相当于趋向 0 圆整一个数为整数。

在参数化运算表达式中，可以使用如下杂项函数：

- `abs(x)`： 返回一个数的绝对值。
- `max(x, y)`： 返回两个数值中的最大值。
- `min(x, y)`： 返回两个数值中的最小值。
- `random()`： 返回一个 0 到 1 之间的伪随机数。
- `sign(x)`： 返回一个数的符号，得知一个数是正数、负数还是 0。

```js
// 原型
$MATH.eval(<string: a parameterized arithmetic expressions>[, <object: parameter map>]) number

// 示例1：求解 (500 + 10) * (700 + 30)
$MATH.eval("(500 + 10) * (700 + 30)")

// 示例2：求圆的周长
$MATH.eval("2 * pi * r", { pi: $MATH.pi, r: $r })

// 示例2a：求圆的周长（使用常量）
$MATH.eval("2 * PI * r", { r: $r })

// 示例3：求圆的面积
$MATH.eval("pi * r * r", { pi: $MATH.pi, r: 5 })

// 示例3a：求圆的面积（使用常量及函数）
$MATH.eval("PI * pow(r, 2)", { r: 5 })

// 原型：eval_l 的 long double 版本
$MATH.eval_l(<string: a parameterized arithmetic expressions>[, <object: parameter map>]) longdouble
```

#### 4.1.9) `sin` 和 `sin_l` 方法

用于计算角度的正弦值。原型如下：

```js
// 原型：求角度的正弦值，角度为弧度值；返回值为 `number` 类型
$MATH.sin(<number | longint | ulongint | longdouble>) number

// 原型：求角度的正弦值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.sin_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 (pi/4) 的正弦值，返回 `number` 类型，结果为 `0.707107`。
$MATH.sin($MATH.const('pi/4'))

// 示例：求 (pi/4) 的正弦值，返回 `longdouble` 类型，结果为 `0.707107L`。
$MATH.sin_l($MATH.const('pi/4'))
```

#### 4.1.10) `cos` 和 `cos_l` 方法

用于计算角度的余弦值。原型如下：

```js
// 原型：求角度的余弦值，角度为弧度值；返回值为 `number` 类型
$MATH.cos(<number | longint | ulongint | longdouble>) number

// 原型：求角度的余弦值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.cos_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 (pi/4) 的余弦值，返回 `number` 类型，结果为 `0.707107`。
$MATH.cos($MATH.const('pi/4'))

// 示例：求 (pi/4) 的余弦值，返回 `longdouble` 类型，结果为 `0.707107L`。
$MATH.cos_l($MATH.const('pi/4'))
```

#### 4.1.11) `tan` 和 `tan_l` 方法

用于计算角度的正切值。原型如下：

```js
// 原型：求角度的正切值，角度为弧度值；返回值为 `number` 类型
$MATH.tan(<number | longint | ulongint | longdouble>) number

// 原型：求角度的正切值，角度为弧度值；返回值为 `longdouble` 类型
$MATH.tan_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 (pi/4) 的正切值，返回 `number` 类型，结果为 `1.0`。
$MATH.tan($MATH.const('pi/4'))

// 示例：求 (pi/4) 的正切值，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.tan_l($MATH.const('pi/4'))
```

#### 4.1.12) `sinh` 和 `sinh_l` 方法

用于计算数值的双曲正弦值。原型如下：

```js
// 原型：求数值的双曲正弦值；返回值为 `number` 类型
$MATH.sinh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的双曲正弦值；返回值为 `longdouble` 类型
$MATH.sinh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的双曲正弦值，返回 `number` 类型，结果为 `1.175201`。
$MATH.sinh(1.0)

// 示例：求 `1.0` 的双曲正弦值，返回 `longdouble` 类型，结果为 `1.175201L`。
$MATH.sinh_l(1.0)
```

#### 4.1.13) `cosh` 和 `cosh_l` 方法

用于计算数值的双曲余弦值。原型如下：

```js
// 原型：求数值的双曲余弦值；返回值为 `number` 类型
$MATH.cosh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的双曲余弦值；返回值为 `longdouble` 类型
$MATH.cosh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的双曲余弦值，返回 `number` 类型，结果为 `1.543081`。
$MATH.cosh(1.0)

// 示例：求 `1.0` 的双曲余弦值，返回 `longdouble` 类型，结果为 `1.543081L`。
$MATH.cosh_l(1.0)
```

#### 4.1.14) `tanh` 和 `tanh_l` 方法

用于计算数值的双曲正切值。原型如下：

```js
// 原型：求数值的双曲正切值；返回值为 `number` 类型
$MATH.tanh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的双曲正切值；返回值为 `longdouble` 类型
$MATH.tanh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的双曲正切值，返回 `number` 类型，结果为 `0.761594`。
$MATH.tan(1.0)

// 示例：求 `1.0` 的双曲正切值，返回 `longdouble` 类型，结果为 `0.761594L`。
$MATH.tan_l(1.0)
```

#### 4.1.15) `asin` 和 `asin_l` 方法

用于计算数值的反正弦值。原型如下：

```js
// 原型：求数值的反正弦值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.asin(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反正弦值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.asin_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `0.707107` 的反正弦值，返回 `number` 类型，结果为 `0.785398`。
$MATH.asin(0.707107)

// 示例：求 `0.707107` 的反正弦值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.asin_l(0.707107)
```

#### 4.1.16) `acos` 和 `acos_l` 方法

用于计算数值的反余弦值。原型如下：

```js
// 原型：求数值的反余弦值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.acos(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反余弦值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.acos_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `0.707107` 的反余弦值，返回 `number` 类型，结果为 `0.785398`。
$MATH.acos(0.707107)

// 示例：求 `0.707107` 的反余弦值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.acos_l(0.707107)
```

#### 4.1.17) `atan` 和 `atan_l` 方法

用于计算数值的反正切值。原型如下：

```js
// 原型：求数值的反正切值，获得对应角度的弧度值；返回值为 `number` 类型
$MATH.atan(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反正切值，获得对应角度的弧度值；返回值为 `longdouble` 类型
$MATH.atan_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的反正切值，返回 `number` 类型，结果为 `0.785398`。
$MATH.atan(1.0)

// 示例：求 `1.0` 的反正切值，返回 `longdouble` 类型，结果为 `0.785398L`。
$MATH.atan_l(1.0)
```

#### 4.1.18) `asinh` 和 `asinh_l` 方法

用于计算数值的反双曲正弦值。原型如下：

```js
// 原型：求数值的反双曲正弦值；返回值为 `number` 类型
$MATH.asinh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反双曲正弦值；返回值为 `longdouble` 类型
$MATH.asinh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的反双曲正弦值，返回 `number` 类型，结果为 `0.881374`。
$MATH.asin(1.0)

// 示例：求 `1.0` 的反双曲正弦值，返回 `longdouble` 类型，结果为 `0.881374L`。
$MATH.asin_l(1.0)
```

#### 4.1.19) `acosh` 和 `acosh_l` 方法

用于计算数值的反双曲余弦值。原型如下：

```js
// 原型：求数值的反双曲余弦值；返回值为 `number` 类型
$MATH.acosh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反双曲余弦值；返回值为 `longdouble` 类型
$MATH.acosh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `1.0` 的反双曲余弦值，返回 `number` 类型，结果为 `0.0`。
$MATH.acos(1.0)

// 示例：求 `1.0` 的反双曲余弦值，返回 `longdouble` 类型，结果为 `0.0L`。
$MATH.acos_l(1.0)
```

#### 4.1.20) `atanh` 和 `atanh_l` 方法

用于计算数值的反双曲正切值。原型如下：

```js
// 原型：求数值的反双曲正切值；返回值为 `number` 类型
$MATH.atanh(<number | longint | ulongint | longdouble>) number

// 原型：求数值的反双曲正切值；返回值为 `longdouble` 类型
$MATH.atanh_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `0.5` 的反双曲正切值，返回 `number` 类型，结果为 `0.549306`。
$MATH.atanh(0.5)

// 示例：求 `0.5` 的反双曲正切值，返回 `longdouble` 类型，结果为 `0.549306L`。
$MATH.atanh_l(0.5)
```

#### 4.1.21) `fmod` 和 `fmod_l` 方法

用于计算两值相除的余数。原型如下：

```js
// 原型：求两值相除的余数；返回值为 `number` 类型
$MATH.fmod(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) number

// 原型：求两值相除的余数；返回值为 `longdouble` 类型
$MATH.fmod_l(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) longdouble

// 示例：求 `(4.5/2.0)` 的余数，返回 `number` 类型，结果为 `0.5`。
$MATH.fmod(4.5, 2.0)

// 示例：求 `(4.5/2.0)` 的余数，返回 `longdouble` 类型，结果为 `0.5L`。
$MATH.fmod_l(4.5, 2.0)
```

#### 4.1.22) `fabs` 方法

用于计算数值的绝对值。原型如下：

```js
// 原型：求数值的绝对值；返回值类型为传入参数值类型
$MATH.fabs(<number | longint | ulongint | longdouble>) number | longint | ulongint | longdouble

// 示例：求 `-2.5L` 的绝对值，返回 `longdouble` 类型，结果为 `2.5L`。
$MATH.fabs(-2.5L)

```

#### 4.1.23) `log` 和 `log_l` 方法

用于计算数值的自然对数。原型如下：

```js
// 原型：求数值的自然对数；返回值为 `number` 类型
$MATH.log(<number | longint | ulongint | longdouble>) number

// 原型：求数值的自然对数；返回值为 `longdouble` 类型
$MATH.log_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `e` 的自然对数，返回 `number` 类型，结果为 `1.0`。
$MATH.log($MATH.const('e'))

// 示例：求 `e` 的自然对数，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.log_l($MATH.const('e'))
```

#### 4.1.24) `log10` 和 `log10_l` 方法

用于计算数值以 `10` 为底的对数。原型如下：

```js
// 原型：求数值以 `10` 为底的对数；返回值为 `number` 类型
$MATH.log10(<number | longint | ulongint | longdouble>) number

// 原型：求数值以 `10` 为底的对数；返回值为 `longdouble` 类型
$MATH.log10_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `10.0` 以 `10` 为底的对数，返回 `number` 类型，结果为 `1.0`。
$MATH.log10(10.0)

// 示例：求 `10.0` 以 `10` 为底的对数，返回 `longdouble` 类型，结果为 `1.0L`。
$MATH.log10i_l(10.0)
```

#### 4.1.25) `pow` 和 `pow_l` 方法

用于计算 `x` 的 `y` 次幂。原型如下：

```js
// 原型：求 `x` 的 `y` 次幂；返回值为 `number` 类型
$MATH.pow(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) number

// 原型：求 `x` 的 `y` 次幂；返回值为 `longdouble` 类型
$MATH.pow_l(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) longdouble

// 示例：求 `3.0` 的 `2.0` 次幂，返回 `number` 类型，结果为 `9.0`。
$MATH.pow(3.0, 2.0)

// 示例：求 `3.0` 的 `2.0` 次幂，返回 `longdouble` 类型，结果为 `9.0L`。
$MATH.pow_l(3.0, 2.0)
```

#### 4.1.26) `exp` 和 `exp_l` 方法

用于计算 `e` 的 `x` 次幂。原型如下：

```js
// 原型：求 `e` 的 `x` 次幂；返回值为 `number` 类型
$MATH.exp(<number | longint | ulongint | longdouble> x) number

// 原型：求 `e` 的 `x` 次幂；返回值为 `longdouble` 类型
$MATH.exp_l(<number | longint | ulongint | longdouble> x) longdouble

// 示例：求 `e` 的 `1.0` 次幂，返回 `number` 类型，结果为 `2.718282`。
$MATH.exp(1.0)

// 示例：求 `e` 的 `1.0` 次幂，返回 `longdouble` 类型，结果为 `2.718282L`。
$MATH.exp_l(1.0)
```

#### 4.1.27) `floor` 和 `floor_l` 方法

用于计算数值的向下取整数值。原型如下：

```js
// 原型：计算向下取整的数值；返回值为 `number` 类型
$MATH.floor(<number | longint | ulongint | longdouble>) number

// 原型：计算向下取整的数值；返回值为 `longdouble` 类型
$MATH.floor_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `-2.3` 向下取整数值，返回 `number` 类型，结果为 `-3.0`。
$MATH.floor(-2.3)

// 示例：求 `-2.3` 向下取整数值，返回 `longdouble` 类型，结果为 `-3.0L`。
$MATH.floor_l(-2.3)
```

#### 4.1.28) `ceil` 和 `ceil_l` 方法

用于计算数值的向上取整数值。原型如下：

```js
// 原型：计算向上取整的数值；返回值为 `number` 类型
$MATH.ceil(<number | longint | ulongint | longdouble>) number

// 原型：计算向上取整的数值；返回值为 `longdouble` 类型
$MATH.ceil_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `-2.3` 向上取整数值，返回 `number` 类型，结果为 `-2.0`。
$MATH.ceil(-2.3)

// 示例：求 `-2.3` 向上取整数值，返回 `longdouble` 类型，结果为 `-2.0L`。
$MATH.ceil_l(-2.3)
```

#### 4.1.29) `sqrt` 和 `sqrt_l` 方法

用于计算数值的平方根。原型如下：

```js
// 原型：计算数值的平方根；返回值为 `number` 类型
$MATH.sqrt(<number | longint | ulongint | longdouble>) number

// 原型：计算数值的平方根；返回值为 `longdouble` 类型
$MATH.sqrt_l(<number | longint | ulongint | longdouble>) longdouble

// 示例：求 `9.0` 的平方根，返回 `number` 类型，结果为 `3.0`。
$MATH.sqrt(9.0)

// 示例：求 `9.0` 的平方根，返回 `longdouble` 类型，结果为 `3.0L`。
$MATH.sqrt_l(9.0)
```

### 4.2) `FS`

`FS` 是一个可装载的动态变量，该变量用于实现常见的文件系统操作。

在调用`FS` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `AccessDenied`：拒绝访问。
- `IOFailure`：输入输出错误。
- `TooMany`：表示太多（如符号链接）。
- `TooLong`：表示太长（如路径名称）。
- `NotDesiredEntity`：表示传递了一个未预期的实体。
- `EntityNotFound`：未找到指定的实体（如文件）。
- `EntityExists`：创建新实体（如文件）时，该实体已存在。
- `OSFailure`：表示遇到未明确定义的一般性操作系统错误。
- `BadEncoding`：错误编码。

**备注**

当指定的路径以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前工作路径信息（同 `$SYS.cwd`）。

#### 4.2.1) `list` 方法

该方法用于列出指定路径下的目录项，返回对象数组。原型及主要用法如下：

```js
// 原型
$FS.list(
        [ <string $path: `The path to list`>
            [, <string $filters: `The list of semicolon separated name filters.`> ]
        ]
) array
```

每个目录项的信息由如下对象表达：

```js
{
    'name': <string: `The name of the file (directory entry')`>,
    'dev_major': <ulongint: `The major ID of device containing file`>,
    'dev_minor': <ulongint: `The minor ID of device containing file`>,
    'inode': <ulongint: `The inode numbe`r>
    'type': <string: `The file type like 'd', 'b', 's', ...`>,
    'mode_digits': <string: `The file mode like `0644``>,
    'mode_alphas': <string: `The file mode like `rwxrwxr-x``>,
    'nlink': <ulongint: `The number of hard links`>,
    'uid': <number: `The user ID of owner`>,
    'gid': <number: `The group ID of owner`>,
    'rdev_major': <ulongint: `The major device ID if it is a special file`>,
    'rdev_minor': <ulongint: `The minor device ID if it is a special file`>,
    'size': <ulongint: `The total size in bytes`>,
    'blksize': <ulongint: `The block size for filesystem I/O`>,
    'blocks': <ulongint: `The number of 512B blocks allocated`>,
    'atime_sec': <ulongint: `The time of last acces (seconds since Epoch)`>,
    'atime_nsec': <ulongint: `The time of last acces (nanoseconds since 'atime_sec')`>,
    'mtime_sec': <ulongint: `The time of last modification (seconds since Epoch)`>,
    'mtime_nsec': <ulongint: `The time of last modification (nanoseconds since 'mtime_sec')`>,
    'ctime_sec': <ulongint: `The time of last status change (seconds since Epoch`)>
    'ctime_nsec': <ulongint: `The time of last status change (nanoseconds since 'ctime_sec'`)>
}
```

**示例**

```js
// 列出当前工作目录下所有目录项
$FS.list
    // array

// 列出当前工作目录下所有匹配 `*.conf` 的目录项
$FS.list("", '*.conf')
    // array

// 列出名称符合给定两种通配符的目录项
$FS.list('/etc', "*.txt; *.md")
    // array
```

#### 4.2.2) `list_prt` 方法

该方法用于列出指定路径下的目录项信息，返回经过格式化的字符串数组。原型及主要用法如下：

```js
// 原型
$FS.list_prt(<string: path>[, <string: `The list of semicolon separated name filters>[, '[mode || nlink || uid || gid || size || blksize || atime || ctime || mtime || name] | all | default']])

// 示例：列出指定路径下的所有目录项，仅列出目录项名称和类型。
$FS.list_prt($path)

// 示例：列出名称符合给定通配符的目录项，但仅列出目录项名称和类型。
$FS.list_prt($path, "*.txt")

// 示例：列出名称符合给定两种通配符的目录项，且指定了列出的列及其顺序
$FS.list_prt($path, "*.txt; *.md", "mode nlink uid gid size blksize atime ctime mtime name")
```

注：`list_prt` 对每个目录项信息的格式化方法同 Linux `ls` 命令。

#### 4.2.3) `basename` 方法

返回路径中的尾部名称。

**描述**

```js
$FS.basename(
        <string $path: `The path to the file`. >
        [,
            <string $suffix = '': `If the name component ends in `suffix` this will also be cut off.` >
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `basename()` 函数：<https://www.php.net/manual/en/function.basename.php>

#### 4.2.4) `chgrp` 方法

改变文件的所有者组。

**描述**

```js
$FS.chgrp(
        <string $filename: `path to the file.`>,
        <string | number $group: `A group name or a group identifier.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `chgrp()` 函数：<https://www.php.net/manual/en/function.chgrp.php>

#### 4.2.5) `chmod` 方法

改变文件的访问许可。

**描述**

```js
$FS.chmod(
        <string $filename: `The path to the file.`>,
        <string $permissions: `The permission string like '0644' or 'u+rwx,go+rx'.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `chmod()` 函数：<https://www.php.net/manual/en/function.chmod.php>

#### 4.2.6) `chown` 方法

改变文件的所有者用户。

**描述**

```js
$FS.chown(
        <string $filename: `The path to the file`.>,
        <string | number $user: `A user name or a user identifier.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `chown()` 函数：<https://www.php.net/manual/en/function.chown.php>

#### 4.2.7) `copy` 方法

复制文件。

**描述**

```js
$FS.copy(
        <string $from: `path to the source file.`>,
        <string $to: `The destination path.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `copy()` 函数：<https://www.php.net/manual/en/function.copy.php>

#### 4.2.8) `dirname` 方法

返回父目录的路径。

**描述**

```js
$FS.dirname(
        <string $path: `A path.`>
        [,
            <real $levels = 1: `The number of parent directories to go up.`>
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `dirname()` 函数：<https://www.php.net/manual/en/function.dirname.php>

#### 4.2.9) `disk_usage` 方法

返回文件系统的磁盘使用情况。

**描述**

```js
$FS.disk_usage(
        <string $directory: `A directory of the filesystem or disk partition.`>
) object
```

**参数**

**返回值**

返回值为如下所示对象：

```js
{
    'free_blocks': <ulongint: `The number of free blocks`>,
    'free_inodes': <ulongint: `The number of free inodes`>,

    'total_blocks': <ulongint: `The number of total blocks`>,
    'total_inodes': <ulongint: `The number of total inodes`>,

    'mount_point': <string: `The mount point of the file system`>,
    'dev_majar': <ulongint: `The majar device ID`>,
    'dev_minor': <ulongint: `The minor device ID`>,
}
```

**示例**

**参见**

- PHP `disk_free_space()` 函数：<https://www.php.net/manual/en/function.disk-free-space.php>
- PHP `disk_total_space()` 函数：<https://www.php.net/manual/en/function.disk-total-space.php>

#### 4.2.10) `file_exists` 方法

判断一个文件或目录是否存在。

**描述**

```js
$FS.file_exists(
        <string $filename: `path to the file or directory.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `file_exists()` 函数：<https://www.php.net/manual/en/function.file-exists.php>

#### 4.2.11) `file_is` 方法

判断一个文件是否为指定的类型。

**描述**

```js
$FS.file_is(
        <string $filename: `The path to a file or directory.`>
        <'[ dir | regular | symlink | socket | pipe | block | char ] || [ executable | exe ] || [readable | read] || [writable write]' $which = 'regular readable':
            'dir' - `A directory.`
            'regular' - `A regular file.`
            'symlink' - `A symbolic link.`
            'socket' - `A local/unix socket file.`
            'pipe' - `A named pipe file or just a pipe file.`
            'block' - `A block device file.`
            'char' - `A character device file.`
            'executable'/'exe' - `The file is executable.`
            'readable'/'read' - `The file is readable.`
            'writable'/'write' - `The file is writable.`
       >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `is_dir()` 函数：<https://www.php.net/manual/en/function.is_dir.php>
- PHP `is_file()` 函数：<https://www.php.net/manual/en/function.is_file.php>
- PHP `is_link()` 函数：<https://www.php.net/manual/en/function.is_link.php>
- PHP `is_executable()` 函数：<https://www.php.net/manual/en/function.is_executable.php>
- PHP `is_readable()` 函数：<https://www.php.net/manual/en/function.is_readable.php>
- PHP `is_writable()` 函数：<https://www.php.net/manual/en/function.is_writable.php>

#### 4.2.12) `lchgrp` 方法

改变符号链接的所有者组。

**描述**

```js
$FS.lchgrp(
        <string $filename: `The path to the symlink.`>,
        <string | number $group: `A group name or a group identifier.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `lchgrp()` 函数：<https://www.php.net/manual/en/function.lchgrp.php>

#### 4.2.13) `lchown` 方法

改变符号链接的所有者用户。

**描述**

```js
$FS.lchown(
        <string $filename: `The path to the symlink.`>,
        <string | number $user: `A user name or a user identifier.`>
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `lchown()` 函数：<https://www.php.net/manual/en/function.lchown.php>

#### 4.2.14) `linkinfo` 方法

获取链接信息。

**描述**

```js
$FS.linkinfo(
        <string $path: 'The path to the link.`>
) number | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `linkinfo()` 函数：<https://www.php.net/manual/en/function.linkinfo.php>

#### 4.2.15) `lstat` 方法

获取一个文件或符号链接的统计信息。

**描述**

```js
$FS.lstat(
        <string $filename: `The path to the file or directory.`>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - `Return ID of device containing the file.`
            'inode' - `Return inode number.`
            'type' - `Return file type like 'd', 'b', or 's'.`
            'mode_digits' - `Return file mode like '0644'.`
            'mode_alphas' - `Return file mode like 'rwxrwxr-x'.`
            'nlink' - `Return number of hard links.`
            'uid' - `Return the user ID of owner.`
            'gid' - `Return the group ID of owner.`
            'rdev' - `Return the device ID if it is a special file.`
            'size' - `Return total size in bytes.`
            'blksize' - `Return block size for filesystem I/O.`
            'blocks' - `Return number of 512B blocks allocated.`
            'atime' - `Return time of last acces.`
            'mtime' - `Return time of last modification.`
            'ctime' - `Return time of last status change.`
            'all' - `Return all above information.`
            'default' - 'type mode_digits uid gid size rdev ctime'
            >
        ]
) object
```

**参数**

**返回值**

结果由如下对象或其部分表达：

```js
{
    'dev_major': <ulongint: `The major ID of device containing file`>,
    'dev_minor': <ulongint: `The minor ID of device containing file`>,
    'inode': <ulongint: `inode numbe`r>
    'type': <string: `file type like 'd', 'b', or 's'`>,
    'mode_digits': <string: `file mode like '0644'`>,
    'mode_alphas': <string: `file mode like 'rwxrwxr-x'`>,
    'nlink': <number: `number of hard links`>,
    'uid': <number: `The user ID of owner`>,
    'gid': <number: `The group ID of owner`>,
    'rdev_major': <ulongint: `The major device ID if it is a special file`>,
    'rdev_minor': <ulongint: `The minor device ID if it is a special file`>,
    'size': <ulongint: `The total size in bytes`>,
    'blksize': <ulongint: `The block size for filesystem I/O`>,
    'blocks': <ulongint: `The number of 512B blocks allocated`>,
    'atime_sec': <ulongint: `The time of last acces (seconds since Epoch)`>,
    'atime_nsec': <ulongint: `The time of last acces (nanoseconds since 'atime_sec')`>,
    'mtime_sec': <ulongint: `The time of last modification (seconds since Epoch)`>,
    'mtime_nsec': <ulongint: `The time of last modification (nanoseconds since 'mtime_sec')`>,
    'ctime_sec': <ulongint: `The time of last status change (seconds since Epoch`)>
    'ctime_nsec': <ulongint: `The time of last status change (nanoseconds since 'ctime_sec'`)>
}
```

**示例**

**参见**

- PHP `lstat()` 函数：<https://www.php.net/manual/en/function.lstat.php>

#### 4.2.16) `link` 方法

创建硬链接。

**描述**

```js
$FS.link(
        < string $target: `Target of the link.` >,
        < string $link: `The link name.` >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `link()` 函数：<https://www.php.net/manual/en/function.link.php>

#### 4.2.17) `mkdir` 方法

创建目录。

**描述**

```js
$FS.mkdir(
        < string $directory: `The directory path.` >
        [, < string $permissions = '0777': `The permissions are '0777' by default, which means the widest possible access.` >
            [, < boolean $recursive = `false`: `Allows the creation of nested directories specified in $directory.` >
            ]
        ]
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `mkdir()` 函数：<https://www.php.net/manual/en/function.mkdir.php>

#### 4.2.18) `pathinfo` 方法

获取文件路径信息。

**描述**

```js
$FS.pathinfo(
        < string $path: `The path to be parsed.` >
        [,
            < '[dirname || basename || extension || filename] | all' $flags = 'all': `Specifies the elements to be returned`.
            >
        ]
) object | string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `pathinfo()` 函数：<https://www.php.net/manual/en/function.pathinfo.php>

#### 4.2.19) `readlink` 方法

读取符号链接的内容。

**描述**

```js
$FS.readlink(
        < string $path: `The symbolic link path.` >
) string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `readlink()` 函数：<https://www.php.net/manual/en/function.readlink.php>

#### 4.2.20) `realpath` 方法

返回规范化的绝对路径名。

**描述**

```js
$FS.realpath(
        < string $path: `The path being checked.` >
) string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `realpath()` 函数：<https://www.php.net/manual/en/function.realpath.php>

#### 4.2.21) `rename` 方法

重命名文件或目录。

**描述**

```js
$FS.rename(
        < string $from: `The old name.` >
        < string $to: `The new name.` >
) true | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `rename()` 函数：<https://www.php.net/manual/en/function.rename.php>

#### 4.2.22) `rmdir` 方法

移除目录。

**描述**

```js
$FS.rmdir(
        < string $directory: `The directory path.` >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `rmdir()` 函数：<https://www.php.net/manual/en/function.rmdir.php>

#### 4.2.23) `stat` 方法

获取一个文件的统计信息。

**描述**

```js
$FS.stat(
        <string $filename: `The path to the file or directory.`>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - `Return ID of device containing the file.`
            'inode' - `Return inode number.`
            'type' - `Return file type like 'd', 'b', or 's'.`
            'mode_digits' - `Return file mode like '0644';`
            'mode_alphas' - `Return file mode like 'rwxrwxr-x';`
            'nlink' - `Return number of hard links.`
            'uid' - `Return the user ID of owner.`
            'gid' - `Return the group ID of owner.`
            'rdev' - `Return the device ID if it is a special file.`
            'size' - `Return total size in bytes.`
            'blksize' - `Return block size for filesystem I/O.`
            'blocks' - `Return number of 512B blocks allocated.`
            'atime' - `Return time of last acces.`
            'mtime' - `Return time of last modification.`
            'ctime' - `Return time of last status change.`
            'all' - `Return all above information.`
            'default' - 'type mode_digits uid gid size rdev ctime'
            >
        ]
) object
```

**参数**

**返回值**

结果由如下对象或其部分表达：

```js
{
    dev_major: < ulongint: `The major ID of device containing file.` >,
    dev_minor: < ulongint: `The minor ID of device containing file.` >,
    inode: < ulongint: `The inode number.` >
    type: < string: `The file type like 'd', 'b', 's', ...` >,
    mode_digits: < string: `The file mode like '0644'` >,
    mode_alphas: < string: `The file mode like 'rwxrwxr-x'` >,
    nlink: < ulongint: `The number of hard links.` >,
    uid: <ulongint: `The user ID of owner.` >,
    gid: <ulongint: `The group ID of owner.` >,
    rdev_major: <ulongint: `The major device ID if it is a special file.` >,
    rdev_minor: <ulongint: `The minor device ID if it is a special file.` >,
    size: <ulongint: `The total size in bytes.` >,
    blksize: <ulongint: `The block size for filesystem I/O.` >,
    blocks: <ulongint: `The number of 512B blocks allocated.` >,
    atime_sec: <ulongint: `The time of last acces (seconds since Epoch).` >,
    atime_nsec: <ulongint: `The time of last acces (nanoseconds since atime_sec).` >,
    mtime_sec: <ulongint: `The time of last modification (seconds since Epoch).` >,
    mtime_nsec: <ulongint: `The time of last modification (nanoseconds since mtime_sec).` >,
    ctime_sec: <ulongint: `The time of last status change (seconds since Epoch).` >
    ctime_nsec: <ulongint: `The time of last status change (nanoseconds since `time_sec).` >
}
```

**示例**

**参见**

- PHP `stat()` 函数：<https://www.php.net/manual/en/function.stat.php>

#### 4.2.24) `symlink` 方法

创建符号链接。

**描述**

```js
$FS.link(
        < string $target: `Target of the link.` >,
        < string $link: `The link name.` >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `symlink()` 函数：<https://www.php.net/manual/en/function.symlink.php>

#### 4.2.25) `tempname` 方法

生成唯一的临时文件名称。

**描述**

```js
$FS.tempname(
        < string $directory: `The directory where the temporary filename will be created.` >
        < string $prefix: `The prefix of the generated temporary filename.` >
) string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `tempname()` 函数：<https://www.php.net/manual/en/function.tempname.php>


#### 4.2.26) `touch` 方法

设置文件的访问和更新时间。

**描述**

```js
$FS.touch(
        < string $filename: `The path to the file.` >
        [, <real $mtime = 0: `The modification time, if it is 0 or negative, use the current system time.` >
            [, <real $atime = 0: `The access time, if it is 0 or negative, use `mtime`. > ]
        ]
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `touch()` 函数：<https://www.php.net/manual/en/function.touch.php>

#### 4.2.27) `umask` 方法

改变当前 umask 值。

**描述**

```js
$FS.umask(
        [ string $mask = '': `The new umask.` ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `umask()` 函数：<https://www.php.net/manual/en/function.umask.php>

#### 4.2.28) `unlink` 方法

移除硬链接。

**描述**

```js
$FS.unlink(
        < string $filename: `Path to the file.` >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `unlink()` 函数：<https://www.php.net/manual/en/function.unlink.php>

#### 4.2.29) `file_contents` 方法

从文件中读取或者向文件中写入内容。

**描述**

```js
$FS.file_contents(
        < string $filename: `Path to the file.` >
        < '[binary | string] || [strict | silent]' $flags:
            - 'binary': `Read the contents as a byte sequence.`
            - 'string': `Read the contents as a string in UTF-8.`
            - 'strict': `Throw the `BadEncoding` exception for a bad encoded string.`
            - 'silent': `Stop reading for any error and return the read data.`
        >
        [, <longint $offset = 0: `The offset where the reading starts. Negative offsets count from the end of the file.` >
            [, <ulongint $length = 0: `Maximum length of data read. The default is to read until end of file is reached.` > ]
        ]
) string | bsequence | false
```

```js
$FS.file_contents(!
        < string $filename: `Path to the file.` >
        < string | bsequenc $data: `The data to write, can be either a string or a byte sequence.`
        < 'append || lock': $flags:
            - 'append': `If file $filename already exists, append the data to the file instead of overwriting it.`
            - 'lock':   `Acquire an exclusive lock on the file while proceeding to the writing.`
        >
) ulongint | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `file_get_contents()` 函数：<https://www.php.net/manual/en/function.file-get-contents.php>
- PHP `file_put_contents()` 函数：<https://www.php.net/manual/en/function.file-put-contents.php>

#### 4.2.30) `opendir` 方法

打开一个目录。

**描述**

```js
$FS.opendir(
        < string $pathname: `Path to the directory.` >
) native/dirStream | false
```

该方法打开指定的路径，用于读取其中的目录项，返回的数据对应一个代表目录流（directory stream）的原生实体，称为“目录流实体（dirStream）”。目录实体提供如下方法：

- `$dirStream.read()`：读取下一个目录项。
- `$dirStream.rewind()`：回卷目录流。

**参数**

**返回值**

一个原生实体，其上提供 `read` 或者 `rewind` 方法，分别用于读取一个目录项或重置目录流。

**示例**

**参见**

- PHP `opendir()` 函数：<https://www.php.net/manual/en/function.opendir.php>

##### 4.2.30.1) 目录流实体的 `stat` 方法

返回打开的目录对应的文件统计信息（对象）。

**描述**

```js
$dirStream.stat(
        < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            - 'dev':            `Return ID of device containing the file.`
            - 'inode':          `Return inode number.`
            - 'type':           `Return file type like 'd', 'b', or 's'.`
            - 'mode_digits':    `Return file mode like '0644';`
            - 'mode_alphas':    `Return file mode like 'rwxrwxr-x';`
            - 'nlink':          `Return number of hard links.`
            - 'uid':            `Return the user ID of owner.`
            - 'gid':            `Return the group ID of owner.`
            - 'rdev':           `Return the device ID if it is a special file.`
            - 'size':           `Return total size in bytes.`
            - 'blksize':        `Return block size for filesystem I/O.`
            - 'blocks':         `Return number of 512B blocks allocated.`
            - 'atime':          `Return time of last acces.`
            - 'mtime':          `Return time of last modification.`
            - 'ctime':          `Return time of last status change.`
            - 'all':            `Return all above information.`
            - 'default':        `The equivalent to 'name type mode_digits uid gid size rdev ctime'.`
        >
) object | false
```

**返回值**

返回打开的目录对应的文件统计信息（对象）。

```js
{
    dev_major:      <ulongint: `The major ID of device containing the directory entry.` >,
    dev_minor:      <ulongint: `The minor ID of device containing the directory entry.` >,
    inode:          <ulongint: `The inode number.` >
    type:           <string: `The file type like 'd', 'b', 's', ...` >,
    mode_digits:    <string: `The file mode like '0644'.` >,
    mode_alphas:    <string: The file mode like 'rwxrwxr-x'.` >,
    nlink:          <ulongint: The number of hard links.` >,
    uid:            <ulongint: `The user ID of owner.` >,
    gid:            <ulongint: `The group ID of owner.` >,
    rdev_major:     <ulongint: `The major device ID if it is a special file.` >,
    rdev_minor:     <ulongint: `The minor device ID if it is a special file.` >,
    size:           <ulongint: `The total size in bytes.` >,
    blksize:        <ulongint: `The block size for filesystem I/O.` >,
    blocks:         <ulongint: `The number of 512B blocks allocated.` >,
    atime_sec:      <ulongint: `The time of last acces (seconds since Epoch).` >,
    atime_nsec:     <ulongint: `The time of last acces (nanoseconds since atime_sec).` >,
    mtime_sec:      <ulongint: `The time of last modification (seconds since Epoch).` >,
    mtime_nsec:     <ulongint: `The time of last modification (nanoseconds since mtime_sec.).` >,
    ctime_sec:      <ulongint: `The time of last status change (seconds since Epoch).` >
    ctime_nsec:     <ulongint: `The time of last status change (nanoseconds since ctime_sec).` >
}
```

**示例**

**参见**

- POSIX `dirfd()` 函数。

##### 4.2.30.2) 目录流实体的 `read` 方法

读取下一个目录项，返回目录项名称（字符串）。

**描述**

```js
$dirStream.read string | false
```

**返回值**

返回目录流中下一个目录项的名称（字符串）；返回 `false` 表示已到达目录流的尾部。

**示例**

**参见**

- PHP `readdir()` 函数：<https://www.php.net/manual/en/function.readdir.php>

##### 4.2.30.3) 目录流实体的 `rewind` 方法

重置目录流。

**描述**

```js
$dirStream.rewind boolean
```

**示例**

**参见**

- PHP `rewinddir()` 函数：<https://www.php.net/manual/en/function.rewinddir.php>

#### 4.2.31) `closedir` 方法

关闭目录流。

**描述**

```js
$FS.closedir(
        < dirStream $dir_stream: `The dirStream entity to close.` >
) boolean
```

该方法提前关闭由 `$FS.opendir()` 打开的目录流以便释放其占用的系统资源。如果不调用这个方法，当目录流对应的变体数据被销毁时，也会自动关闭目录流。

**参数**

**返回值**

**示例**

**备注**

**参见**

- PHP `opendir()` 函数：<https://www.php.net/manual/en/function.opendir.php>

### 4.3) `FILE`

`FILE` 是一个可装载的动态变量，该变量用于实现常见的文件读写操作。

该变量被设计两级对象：

- `txt`：提供以文本文件方式读写的接口。
- `bin`：提供以二进制文件方式读写的接口。

**备注**

当指定的文件以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前行者维护的当前工作路径信息（同 `$SYS.cwd`）。

#### 4.3.1) 文本文件

##### 4.3.1.1) `txt.head` 方法

该方法读取文本文件的前几行，并返回一个字符串数组。

```js
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

```js
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

```js
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

```js
// 原型
$FILE.bin.tail(<string: file name>[, <number: number of bytes>])

// 示例：读取所有字节
$FILE.bin.tail($file)

// 示例：读取后 5 字节
$FILE.bin.tail($file, 5)

// 示例：读取最前 5 字节之外的所有字节
$FILE.bin.tail($file, -5)
```

### 4.4) `PY`

`PY` 是一个可装载的动态对象，默认绑定为行者级变量。该对象使用 CPython 完成如下功能：

1. `$PY.global` 和 `$PY.local`：使用 HVML 数据访问（包括设置） Python 环境使用的全局变量或局部变量。
1. `$PY.import`：装载指定的 Python 模块并可在其上调用（或访问）已装载模块提供的子模块、函数及属性。
1. `$PY.run`：执行一段 Python 代码、一个 Python 脚本或者一个指定的模块，并获得结果。
1. `$PY.pythonize`：将 HVML 字符串、数组、元组、集合、对象等数据转换为 Python 对象实体，然后在其上执行这些 Python 对象实体支持的方法。
1. `$PY.stringify`：获取 Python 对象实体的字符串表达。
1. `$PY.compile`：编译一段 Python 代码，之后可在结果上调用 `local` 设定局部变量或调用 `eval` 方法执行编译后的代码并获得结果。

#### 4.4.1) `impl` 属性

通过该属性获取 `$PY` 变量实现者的信息，包括开发商、作者、许可证等。

**描述**

```js
$PY.impl object:
    `an object contains the following properties:`
        - 'vendor':         < string: `The vendor name of this dynamic object, e.g., "HVML Community"` >
        - 'author':         < string: `The author name of this dynamic object, e.g., "Vincent Wei"` >
        - 'verName':        < string: `The version name of this dynamic object, e.g., "0.1.0"` >
        - 'verCode':        < string: `The version code fo this dynmaic object, e.g., "0"` >
        - 'license':        < string: `The license of this implementation fo this dynmaic objec, e.g., "LGPLv3+"` >
```

该属性返回描述当前 CPython 解释器相关信息的对象。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$PY.impl
    /* object:
       {
            'vendor':       'HVML Community',
            'author':       'Vincent Wei',
            'verName':      '0.1.0',
            'verCode':      '0',
            'license':      'LGPLv3+',
       }
    */
```

#### 4.4.2) `info` 属性

通过该属性获取 `$PY` 所使用的 CPython 库的版本号、编译器、平台、构建信息、版权等信息。

**描述**

```js
$PY.info object:
    `an object contains the following properties:`
        - 'version':        < string: `The version of this Python interpreter.` >
        - 'platform':       < string: `The platform identifier for the current platform.` >
        - 'copyright':      < string: `The official copyright string for the current Python version.` >
        - 'compiler':       < string: `An indication of the compiler used to build the current Python version, in square brackets (e.g., [GCC 2.7.2.2])` >
        - 'build-info':     < string: `information about the sequence number and build date and time of the current Python interpreter instance, e.g., "#67, Aug  1 1997, 22:34:28"` >
```

该属性返回描述当前 CPython 解释器相关信息的对象。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$PY.info
    /* object:
       {
            'version':      '3.10.9',
            'platform':     'Linux',
            'copyright':    'Copyright 1991-1995 Stichting Mathematisch Centrum, Amsterdam',
            'compiler':     '[GCC 2.7.2.2]',
            'build-info':   '#67, Aug 1 1997, 22:34:28',
       }
    */
```

#### 4.4.3) `global` 属性

该属性反映的是当前 Python 解释器 `__main__` 模块的全局变量字典。

**描述**

```js
$PY.global()
    object : `The global variables of the current __main__ module in the Python interpreter.`
```

该属性获取器返回当前 Python 解释器 `__main__` 模块的全部全局变量及其值。注意，键名具有 `__` 前缀和 `__` 后缀的键值对将被忽略。

```js
$PY.global(<string $name: `The global variable name`>) any | undefined
```

该属性获取器返回当前 Python 解释器 `__main__` 模块的指定全局变量的值。

```js
$PY.global(!
        <object $globals: `The object defined new global variables`>
) true | false
```

该属性设置器将使用给定的对象设置当前 Python 解释器 `__main__` 模块的全局变量，已有的变量可能会被覆盖。

```js
$PY.global(!
        <string $name: `The global variable name`>,
        <any $value: `The value`>
) true | false
```

该属性设置器设置当前 Python 解释器 `__main__` 模块的指定全局变量的值；当 `$value` 为 `undefined` 时，将删除该全局变量。

该属性应被实现为原生实体，从而可通过 `$PY.global.x` 来获取全局变量 `x` 的值，或者使用 `$PY.global.x(! ... )` 来设置全局变量的值。

**异常**

该属性的获取器产生如下异常：

- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `undefined`。
- `NoSuchKey`：不存在的全局变量；可忽略异常，静默求值时返回 `undefined`。

该属性的设置器产生如下异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效值，比如不支持的数据类型；可忽略异常，静默求值时返回 `false`。
- `InternalFailure`：CPython 异常；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$PY.global()
    // object: { }

$PY.global(! 'x', 'zh_CN')
    // boolean: true

$PY.global('x')
    // string: 'zh_CN'

$PY.global.x
    // string: 'zh_CN'

$PY.global.x(! undefined )
    // boolean: 'true'

$PY.global.x
    // exception: NoSuchKey
```

#### 4.4.4) `local` 属性

该属性反映的是执行 `$PY.run` 方法时的局部变量字典。

**描述**

```js
$PY.local()
    object : `The local variables used when executing $PY.run().`
```

该属性获取器返回当前的局部变量及其值。

```js
$PY.local(
        <string $name: `The local variable name`>
) any | undefined
```

该属性获取器返回指定局部变量的值。

```js
$PY.local(!
        <object $local: `The object defined new local variables`>
) true | false
```

该属性设置器将使用给定的对象设置局部变量，已有的变量可能会被覆盖。

```js
$PY.local(!
        <string $name: `The local variable name`>,
        <any $value: `The value`>
) true | false
```

该属性设置器设置指定的局部变量的值；当 `$value` 为 `undefined` 时，将删除该局部变量。

该属性应被实现为原生实体，从而可通过 `$PY.local.x` 来获取局部变量 `x` 的值，或者使用 `$PY.local.x(! ... )` 来设置局部变量的值。

**异常**

该属性的获取器产生如下异常：

- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `undefined`。
- `NoSuchKey`：不存在的全局变量；可忽略异常，静默求值时返回 `undefined`。

该属性的设置器产生如下异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效值，比如不支持的数据类型；可忽略异常，静默求值时返回 `false`。
- `InternalFailure`：CPython 异常；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$PY.local()
    // object: { }

$PY.local(! 'x', 'zh_CN')
    // boolean: true

$PY.local('x')
    // string: 'zh_CN'
```

#### 4.4.5) `except` 属性

该属性获取 `$PY` 动态变量上的最后一个 Python 异常名称。

**描述**

```js
$PY.except
    null | string : `The last exception name reported by CPython.`
```

该方法返回 `$PY` 动态变量上的最后一个 Python 内部错误对应的异常名称，初始为 `null`，可用于进一步区别 Python 异常。

**异常**

该方法不产生异常。

**示例**

```js
$PY.except
    // null
{{ $PY.run('2 / 0'); $PY.except }}
    // string: 'ZeroDivisionError'
```

#### 4.4.6) `pythonize` 方法

该方法将根据一个 HVML 字符串、对象、数组和集合构建为一个 CPython 原生实体对象，之后可在其上执行对应的方法。

**描述**

```js
$PY.pythonize(
    <string | object | array | tuple | set: $hvml_data: `An HVML string, object, array, tuple, or generic set`>
) native/pyObject::any | undefined
```

该方法将使用给定的 HVML 字符串、对象、数组和集合构建一个 CPython 原生实体对象，之后可在其上执行对应的方法。

注意，在 CPython 原生实体上对其本身调用默认获取器，将返回对应的 HVML 数据。比如，

使用空数组构造一个 CPython 原生实体：

```js
$PY.pythonize([])
    // native/pyObject::list
```

使用空数组构造一个 CPython 原生实体，并在其上执行默认获取器，将获得一个 HVML 的空数组。

```js
$PY.pythonize([])()
    // array: []
```

使用 HVML 数组构造一个 CPython 原生实体，并在其上执行 `reverse()` 方法，之后在其上执行默认获取器，将获得一个反转的 HVML 数组。

```js
$PY.pythonize([1, 2, 3]).reverse()()
    // array: [3, 2, 1]
```

**返回值**

该方法返回一个名称为 `pyObject::any` 的原生实体。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$PY.pythonize([])
    // native/pyObject::list

$PY.pythonize(['apple', 'banana', 'cherry']).add('orange')
    // native/pyObject::list

$PY.pythonize(['apple', 'banana', 'cherry']).add('orange')()
    // array: ['apple', 'banana', 'cherry', 'orange']

$PY.pythonize('Hello, World!').upper()()
    // string: 'HELLO, WORLD!'
```

#### 4.4.7) `run` 方法

该方法执行一段 Python 程序，以脚本形式执行一个模块，或者执行一个 Python 脚本文件。

**描述**

```js
$PY.run(
    <string $cmd_mod_file: `An isolated expressions, a single statement, an arbitrarily long Python source code, a module name, or a file name`>
        [, < '[command | statement | source | module | file] || skip-first-line || dont-write-byte-code' $options = 'command':
            - 'command':    `Evaluate an isolated expressions.`
            - 'statement':  `Run a single statement.`
            - 'source':     `Run an arbitrarily long Python source code.`
            - 'module':     `Run a Python library module as a script.`
            - 'file':       `Run a Python file as a script.`
            - 'skip-first-line':        `Skip first line of source, allowing use of non-Unix forms of #!cmd.`
            - 'dont-write-byte-code':   `Don't write .pyc files on import.`
            >
        ]
) any | undefined
```

该方法执行一段指定的 Python 程序（命令），或以脚本形式执行一个指定的 Python 模块，或执行一个 Python 脚本文件。`$cmd_mod_file` 指定程序内容、模块名称或者脚本文件名；`$options` 指定执行选项。

**返回值**

该方法返回执行结果。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `undefined`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `EntityNotFound`：未找到指定的模块；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：无效参数，比如不存在指定的符号；可忽略异常，静默求值时返回 `undefined`。
- `InternalFailure`：CPython 异常；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$PY.run('print("Hello from Python")')
    // null

$PY.run('pow(2,3)')
    // 8L
```

#### 4.4.8) `import` 方法

可通过该方法装载一个模块或其中的指定符号。

**描述**

```js
$PY.import(
    <string $name: `The Python module name`>
    [,
        <array $fromlist = []: `The names of objects or submodules that should be imported from the module given by $name.`>
    ]
) true | false
```

该方法导入指定的 Python 模块，或者从指定的模块中导入指定的 Python 对象或 Python 子模块，之后可在 `$PY` 变量上使用导入的模块、对象或子模块。

**备注**

1. 在使用 `$name` 参数指定模块名时，可使用 `<package>.<module>:<aliase>` 的写法，用于指定包或者模块的别名。
1. 在使用 `$fromlist` 参数中指定对象或者子模块时，可使用 `<object/submodule>:<aliase>` 的写法，用于指定对象或者子模块的别名。
1. 当导入的对象是 Python 函数对象时，可使用对应符号上的设置器以键值对的形式传递函数参数。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `DuplicateName`：重复名称，当要导入的模块、子模块或对象之名称已经被占用时；可忽略异常，静默求值时返回 `false`。
- `EntityNotFound`：未找到指定的模块、对象或子对象；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效参数，比如不存在指定的符号；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$PY.import("math")
    // boolean: true
$PY.math.pow(2, 2)
    // number: 4
// 使用 (! ) 以键值对形式传递函数参数。
$PY.math.pow(! { x: 2, y: 3 } )
    // number: 8

$PY.import('math', ['pow:power'])
    // boolean: true
$PY.power(2, 2)
    // number: 4
```

#### 4.4.9) `stringify` 方法

该方法将一个 Python 实体字符串化。

**描述**

```js
$PY.stringify(
    string $py_code: `A native entity with name prefix "pyObject::"`
) string | false
```

该方法将一个指定的 Python 原生实体执行字符串化操作。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$PY.stringify({{ $PY.import('math'); $PY.math.pi }})
    // string: '3.1415926535897931'
```

#### 4.4.10) `compile` 方法

可通过该方法编译一段指定的 Python 代码。

**描述**

```js
$PY.compile(
    string $py_code: `The Python code`
) native/pyCodeObject | undefined
```

该方法编译一段 Python 代码，返回一个代表 CPython 代码的动态对象，之后可在该动态对象之上执行 `eval` 方法或访问 `local` 属性。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- ...

**示例**

```js
$PY.compile('c = 4 + 2')
    // pyCodeObject
```

##### 4.4.10.1) CPython 代码动态对象 `entity` 属性

该属性的获取器返回 CPthon 代码动态对象对应的 CPython 对象原生实体。

**描述**

```js
$pyCodeObject.entity
    native/pyObject::code : `The pyObject::code entity of this pyCodeObject.`
```

该属性获取器返回 `$pyCodeObject` 对应的 CPython 代码对象原生实体。

**异常**

该属性的获取器不产生异常。

**示例**

```js
$pyCodeObject.entity
    // native/pyObject::code
```

##### 4.4.10.2) CPython 代码动态对象 `local` 属性

该属性反映的是 CPython 代码动态对象的局部变量字典。

**描述**

```js
$pyCodeObject.local
    object : `The local variables used when executing $pyCodeObject.eval().`
```

该属性获取器返回 `$pyCodeObject` 的局部变量及其值。

```js
$pyCodeObject.local(
        <string $name: `The local variable name`>
) any | undefined
```

该属性获取器返回 `$pyCodeObject` 的指定局部变量的值。

```js
$pyCodeObject.local(!
        <object $local: `The object defined new local variables`>
) true | false
```

该属性设置器将使用给定的对象设置 `$pyCodeObject` 的局部变量，已有的变量可能会被覆盖。

```js
$pyCodeObject.local(!
        <string $name: `The local variable name`>,
        <any $value: `The value`>
) true | false
```

该属性设置器设置指定的局部变量的值；当 `$value` 为 `undefined` 时，将删除该局部变量。

该属性应被实现为原生实体，从而可通过 `$pyCodeObject.local.x` 来获取局部变量 `x` 的值，或者使用 `$pyCodeObject.local.x(! ... )` 来设置局部变量的值。

**异常**

该属性的获取器产生如下异常：

- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `undefined`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `undefined`。
- `NoSuchKey`：不存在的全局变量；可忽略异常，静默求值时返回 `undefined`。

该属性的设置器产生如下异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `BadName`：错误的变量名；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：无效值，比如不支持的数据类型；可忽略异常，静默求值时返回 `undefined`。
- `InternalFailure`：CPython 异常；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
$pyCodeObject.local
    // object: { }

$pyCodeObject.local(! 'x', 'zh_CN')
    // boolean: true

$pyCodeObject.local('x')
    // string: 'zh_CN'
```

##### 4.4.10.3) CPython 代码动态对象的 `eval` 方法

执行 CPython 代码动态对象。

**描述**

```js
$pyCodeObject.eval(
    [
        <object $globals = null: `The global variables defined by an object`>,
        [
            <object $locals = null : `The local variables defined by an object`>
        ],
    ]
) any
```

该方法在指定的局部环境中执行 CPython 代码对象；若未指定 `$globals`，则使用 `$PY` 定义的全局变量；若未指定 `$locals`，则使用通过 `$pyCodeObject.local` 属性指定的局部变量。

**异常**

该方法可能产生的异常：

- `InternalFailure`：Python 解释器异常；可通过 `$PY.except` 获得具体的 Python 异常名称。

**示例**

```js
$PY.compile('4 + 2').eval()
    // 6

$PY.compile('x + y').eval( { x: 4, y: 5 } )
    // 9

$PY.compile('math.pow(x, y)').eval( null, { x: 2, y: 3 } )
    // 8
```

### 4.5) `SQLITE`

`SQLITE` 是一个可装载的动态对象，默认绑定为行者级变量。该对象使用 SQLite 完成数据库的增删改查功能。

大多数 SQL 数据库引擎（除了 SQLite 之外的每个 SQL 数据库引擎）都使用静态、严格的类型。 对于静态类型，值的数据类型由其容器（存储值的特定列）决定。 SQLite 使用更通用的动态类型系统。 在 SQLite 中，值的数据类型与值本身相关联，而不是与其容器相关联。

在 SQLite 数据库中，每个值都具有以下存储类（Storage Classes）之一：

  * NULL: 空值。
  * INTEGER: 有符号整型，根据值的大小存储在0, 1, 2, 3, 4, 6 或 8 个字节中。
  * REAL: 浮点数，存储 8 字节的 IEEE 浮点数。
  * TEXT: 文本字符串，使用数据库编码（UTF-8, UTF-16BE 或 UTF-16LE）存储。
  * BLOB: 用来存储二进制数据。

存储类（Storage Classes）比数据类型（Datatype）更通用。在大多数情况下，“存储类”与“数据类型”没有区别，并且这两个术语可以互换使用。

详细信息可以参看SQLite 官方文档: [Datatypes In SQLite](https://www.sqlite.org/datatype3.html)


类型对应关系：

| SQLite 类型 | SQLite C/C++ API macro  | 变体类型  |
| --------    |  -------------------    | --------- |
| `NULL`        |   `SQLITE_NULL`           | `null`      |
| `INTEGER`     |   `SQLITE_INTEGER`        | `longint`   |
| `REAL`        |   `SQLITE_FLOAT`          | `number`    |
| `TEXT`        |   `SQLITE3_TEXT`          | `string`    |
| `BLOB`        |   `SQLITE_BLOB`           | `bsequence` |

使用 fetchone/fetchmany/fetchall 获取数据时可以使用亲合类型（Affinity）关健字指定结果的数据类型，下表是亲合类型与变体类型的对应关系：

|     亲合类型            | 变体类型  |  描述 |
|     --------            | --------- | :--   |
| `int`                     | `longint`   | int: 4 字节 |
| `int2`                    | `longint`   | int2: 2 字节 |
| `int4`                    | `longint`   | int4: 4 字节 |
| `int8`                    | `longint`   | int8: 8 字节 |
| `integer`                 | `longint`   | integer: 4 字节 |
| `tinyint`                 | `longint`   | tinyint : 1 字节 |
| `smallint`                | `longint`   | smallint: 2 字节 |
| `mediumint`               | `longint`   | mediumint: 3 字节 |
| `bigint`                  | `longint`   | bitint: 8 字节 |
| `unsigned int`            | `ulongint`  | |
| `unsigned int2`           | `ulongint`  | |
| `unsigned int4`           | `ulongint`  | |
| `unsigned int8`           | `ulongint`  | |
| `unsigned integer`        | `ulongint`  | |
| `unsigned tinyint`        | `ulongint`  | |
| `unsigned smallint`       | `ulongint`  | |
| `unsigned mediumint`      | `ulongint`  | |
| `unsigned bigint`         | `ulongint`  | |
| `character`               | `string`    | |
| `varchar`                 | `string`    | |
| `varying character `      | `string`    | |
| `nchar`                   | `string`    | |
| `native character `       | `string`    | |
| `nvarchar`                | `string`    | |
| `text`                    | `string`    | |
| `clob`                    | `string`    | |
| `blob`                    | `bsequence` | |
| `binary`                  | `bsequence` | |
| `real`                    | `number`    | |
| `double`                  | `number`    | |
| `double precision`        | `number`    | |
| `float`                   | `number`    | |
| `numeric`                 | `number`    | |
| `decimal`                 | `number`    | |
| `boolean`                 | `boolean`   | |
| `bit`                     | `boolean`   | |
| `date`                    | `string`    | 以 YYYY-MM-DD 返回 |
| `datetime`                | `string`    | 以 YYYY-MM-DD HH:MM:SS 返回 |

#### 4.5.1) `impl` 属性

通过该属性获取 `$SQLITE` 变量实现者的信息，包括开发商、作者、许可证等。

**描述**

```js
$SQLITE.impl object:
    `An object contains the following properties:`
        - 'vendor':         < string: `The vendor name of this dynamic object, e.g., "HVML Community"` >
        - 'author':         < string: `The author name of this dynamic object, e.g., "Vincent Wei"` >
        - 'verName':        < string: `The version name of this dynamic object, e.g., "0.1.0"` >
        - 'verCode':        < string: `The version code fo this dynmaic object, e.g., "0"` >
        - 'license':        < string: `The license of this implementation fo this dynmaic objec, e.g., "LGPLv3+"` >
```

该属性返回描述当前 SQLite 相关信息的对象。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$SQLITE.impl
    // object: {
            'vendor':       'HVML Community',
            'author':       'Vincent Wei',
            'verName':      '0.1.0',
            'verCode':      '0',
            'license':      'LGPLv3+',
       }
```

#### 4.5.2) `info` 属性

通过该属性获取 `$SQLITE` 所使用的 SQLite 库的版本号、编译器、平台、构建信息、版权等信息。

**描述**

```js
$SQLITE.info object:
    `An object contains the following properties:`
        - 'version':        < string: `The version of this sqlite library.` >
        - 'platform':       < string: `The platform identifier for the current platform.` >
        - 'build-info':     < string: `information about the sequence number and build date and time of the current sqlite library, e.g., "#67, Aug  1 1997, 22:34:28"` >
```

该属性返回描述当前 SQLite 实现者的对象。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$SQLITE.info
    // object: {
            'version':      '3.10.9',
            'platform':     'Linux',
            'build-info':   '2022-01-06 13:25:41 872ba256cbf61d9290b571c0e6d82a20c224ca3ad82971edc46b29818d5dalt1',
       }
```


#### 4.5.3) `connect` 方法

连接到指定的 SQLite 数据库。

**描述**

```js
$SQLITE.connect(
    string $dbname: `The database name.`
) native/SQLiteConnect | undefined
```

该方法连接到指定的 SQLite 数据库，返回一个代表 SQLite 连接的动态对象。

**异常**

该方法可能产生的异常：

- `ArgumentMissed`：未指定参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误的参数类型；可忽略异常，静默求值时返回 `false`。
- `InvalidValue`：传入无效数据; 可忽略异常。
- ...

**示例**

```js
$SQLITE.connect(':memory:')
    // native/SQLiteConnect

$SQLITE.connect('/tmp/test.db')
    // native/SQLiteConnect

$SQLITE.connect('file:///tmp/test_uri.db')
    // native/SQLiteConnect
```

#### 4.5.4) SQLiteConnect 动态对象

每个打开的 SQLite 数据库都由一个 SQLiteConnect 对象表示，该对象是通过使用 $SQLITE.connect() 创建的。它的主要目的是创建 SQLiteCursor 对象，以及 Transaction 控制。

##### 4.5.4.1) `cursor` 方法

创建一个 SQLiteCursor 对象。

**描述**

```js
$sqliteConn.cursor(
) SQLiteCursor | undefined
```

该方法连接创建一个 SQLiteCursor 动态对象。

**异常**

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。

**示例**

```js
$sqliteConn.cursor()
    // SQLiteCursor
```

##### 4.5.4.2) `commit` 方法

将任何挂起的事务提交到数据库。

**描述**

```js
$sqliteConn.commit() boolean
```

该方法提交当前的事务。

**异常**

该方法可能产生的异常：

- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteConn.commit()
  // true
```

##### 4.5.4.3) `rollback` 方法

回滚待处理的事务。

**描述**

```js
$sqliteConn.rollback() boolean
```
回滚自上一次调用 commit() 以来对数据库所做的更改。

**异常**

该方法可能产生的异常：

- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteConn.rollback()
    // true
```

##### 4.5.4.4) `close` 方法

关闭数据库链接。

**描述**

```js
$sqliteConn.close() boolean
```

该方法关闭数据库连接。请注意，该方法自动调用 commit()。如果之前未调用 commit() 方法，就直接关闭数据库连接，所做的所有更改将全部丢失！

**异常**

该方法不产生异常。

**示例**

```js
$sqliteConn.close()
    // true
```

##### 4.5.4.5) `execute` 方法

执行一个 SQL 语句。

**描述**

```js
$sqliteConn.execute(
        < string $sql: `The sql.` >
        [, <array $parameters: `The sql parameters> ]
) SQLiteCursor | undefined
```

创建一个新的 SQLiteCursor 对象，并在上面执行 SQL 语句，返回该 SQLiteCursor 对象。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `InvalidValue`：传入无效数据; 可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteConn.execute('select * from users')
```

##### 4.5.4.6) `executemany` 方法

批量执行 SQL 语句。

**描述**

```js
$sqliteConn.executemany(
        <string $sql: `The sql.` >,
        <array $parameters: `The sql parameters>
) SQLiteCursor | undefined
```

创建一个新的 SQLiteCursor 对象，并在上面批量执行 SQL 语句，返回该 SQLiteCursor 对象。
$parameters 是一个包含多个数组的数组，每个子数组对应 sql 语句的参数。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `InvalidValue`：传入无效数据; 可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteConn.executemany('insert into user values(?, ?, ?)', [[1, 'zhang san', 15], [2, 'li si', 20]])
```

#### 4.5.5) SQLiteCursor 动态对象

SQLiteCursor 对象表示数据库游标，用于执行 SQL 语句并管理获取操作的上下文。
游标是使用 SQLiteConnect对象的cursor()、execute() 或 executemany() 创建的。

##### 4.5.5.1) `execute` 方法

执行一个 SQL 语句。

**描述**

```js
$sqliteCursor.execute(
        < string $sql: `The sql.` >
        [, <array $parameters: `The sql parameters> ]
)
```

在当前 SQLiteCursor 对象上面执行 SQL 语句。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `InvalidValue`：传入无效数据; 可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteCursor.execute('select * from users')
```

##### 4.5.5.2) `executemany` 方法

批量执行 SQL 语句。

**描述**

```js
$sqliteCursor.executemany(
        < string $sql: `The SQL.` >,
        < array $parameters: `The SQL parameters.` >
)
```

在当前 SQLiteCursor 对象上面批量执行 SQL 语句。
$parameters 是一个包含多个数组的数组，每个子数组对应 sql 语句的参数。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `InvalidValue`：传入无效数据; 可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteCursor.executemany('insert into user values(?, ?, ?)', [[1, 'zhang san', 15], [2, 'li si', 20]])
```

##### 4.5.5.3) `fetchone` 方法

从结果集中返回下一行数据。

**描述**

```js
$sqliteCursor.fetchone(
        [
            <'tuple | object' $result_type = 'tuple':
                - 'tuple':   `Return result set as a tuple`
                - 'object':  `Return result set as a object`
            >
            [, <object $name_mapping: `The column name mapping. Only valid when $result_type is 'object'.`
                [, <object $type_conversion: `The column type conversion. Only valid when $result_type is 'object'.`
                ]
            ]
        ]
) tuple | object | null
```

从结果集中返回下一行数据，如果没有更多的数据，则返回 null。

我们可以在 `fetchone` 方法中指定返回值的类型:

`tuple` ： 以元组的形式返回结果，元组中的每个成员都是一个字段的值。
`object` ： 以对象的形式返回结果，每个键值对表示一个字段的数据（字段名:字段值）。

当 `$result_type` 为 `object` 时，我们通过参数 `$name_mapping` 为结果设置键名的映射，通过参数 `$type_conversion` 指定类型转换。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `WrongDataType`：非实数类参数类型。可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteCursor.fetchone()
    // tuple: [! 1, 'zhang san', 15 ]

$sqliteCursor.fetchone('object')
    // object: { id:1, name:'zhang san', age:15 }

$sqliteCursor.fetchone('object', {'name':'title'}, {'age':'unsigned int'} )
    // object: { id:1, title:'zhang san', age:15UL }

$sqliteCursor.fetchone('object', null, {'age':'unsigned int'} )
    // object: { id:1, name:'zhang san', age:15UL }
```

##### 4.5.5.4) `fetchmany` 方法

从结果集中返回多行数据。

**描述**

```js
$sqliteCursor.fetchmany(
    < ulongint $size: `The number of rows to fetch.` >
    [,
        <'tuple | object' $result_row_type = 'tuple':
            - 'tuple':   `Return row data as a tuple.`
            - 'object':  `Return row data as a object.`
        >
        [, <object $name_mapping: `The column name mapping. Only valid when $result_type is 'object'.`
            [, <object $type_conversion: `The column type conversion. Only valid when $result_type is 'object'.`
            ]
        ]
    ]
) array | null
```

从结果集中以数组的行式返回指定数量的行数据，数组的每个成员表示一行数据。
如果可用行数小于 `$size`，则返回尽可能多的可用行。
如果没有更多可用行，则返回 `null`。

我们可以在 `fetchmany` 方法中指定返回的每一行数据的类型:

`tuple` ： 以元组的形式返回结果，元组中的每个成员都是一个字段的值。
`object` ： 以对象的形式返回结果，每个键值对表示一个字段的数据（字段名:字段值）。

当 `$result_row_type` 为 `object` 时，我们通过参数 `$name_mapping` 为结果设置键名的映射，通过参数 `$type_conversion` 指定类型转换。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `WrongDataType`：非实数类参数类型。可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteCursor.fethmany(2L)
    // [[! 1, 'zhang san', 15 ], [!2, 'li si', 20]]

$sqliteCursor.fethmany(2L, 'object')
    // [{ id:1, name:'zhang san', age:15 }, { id:2, name:'li si', age:20 }]

$sqliteCursor.fethmany(2L, 'object', {'name':'title'}, {'age':'unsigned int'} )
    // [{ id:1, title:'zhang san', age:15UL }, { id:2, title:'li si', age:20UL }]

$sqliteCursor.fethmany(2L, 'object', null, {'age':'unsigned int'} )
    // [{ id:1, name:'zhang san', age:15UL }, { id:2, name:'li si', age:20UL }]
```

##### 4.5.5.5) `fetchall` 方法

从结果集中返回所有（剩余）行。

**描述**

```js
$sqliteCursor.fetchall(
    [
        <'tuple | object' $result_row_type = 'tuple':
            - 'tuple':   `Return row data as a tuple`
            - 'object':  `Return row data as a object`
        >
        [, <object $name_mapping: `The column name mapping. Only valid when $result_type is 'object'.`
            [, <object $type_conversion: `The column type conversion. Only valid when $result_type is 'object'.`
            ]
        ]
    ]
) array | null
```

从结果集中以数组的行式返回剩余行。 如果没有更多可用行，则返回 `null`。

我们可以在 `fetchall` 方法中指定返回行数据的类型:

`tuple` ： 以元组的形式返回结果，元组中的每个成员都是一个字段的值。
`object` ： 以对象的形式返回结果，每个键值对表示一个字段的数据（字段名:字段值）。

当 `$result_row_type` 为 `object` 时，我们通过参数 `$name_mapping` 为结果设置键名的映射，通过参数 `$type_conversion` 指定类型转换。

该方法可能产生的异常：

- `MemoryFailure`：内存分配失败。不可忽略异常。
- `WrongDataType`：非实数类参数类型。可忽略异常。
- `ExternalFailure`：外部异常，非法操作 sqlite3时产生，比如操作已关闭的数据库链接。

**示例**

```js
$sqliteCursor.fethall()
    // [[! 1, 'zhang san', 15 ], [!2, 'li si', 20]]

$sqliteCursor.fetchall('object')
    // [{ id:1, name:'zhang san', age:15 }, { id:2, name:'li si', age:20 }]

$sqliteCursor.fetchall('object', {'name':'title'}, {'age':'unsigned int'} )
    // [{ id:1, title:'zhang san', age:15UL }, { id:2, title:'li si', age:20UL }]

$sqliteCursor.fetchall('object', null, {'age':'unsigned int'} )
    // [{ id:1, name:'zhang san', age:15UL }, { id:2, name:'li si', age:20UL }]
```

##### 4.5.5.6) `close` 方法

关闭游标。

**描述**

```js
$sqliteCursor.close() boolean
```

该方法关闭游标。请注意，关闭游标后，不能使用该游标进行任何操作。

**异常**

该方法不产生异常。

**示例**

```js
$sqliteCursor.close()
    // true
```

##### 4.5.5.7) `rowcount` 属性

通过该属性获取INSERT、UPDATE、DELETE 和 REPLACE 语句修改的行数(其它语句为 -1)。

**描述**

```js
$sqliteCursor.rowcount longint:
```

通过该属性获取 `INSERT`、`UPDATE`、`DELETE` 和 `REPLACE` 语句修改的行数(其它语句为 `-1`)，仅在语句运行完成后由 `execute()` 和 `executemany()` 方法更新。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$sqliteCursor.rowcount
    /* longint:
        10
    */
```

##### 4.5.5.8) `lastrowid` 属性

通过该属性获取最后插入行的行 ID 。

**描述**

```js
$sqliteCursor.lastrowid longint | null:
```

通过该属性获取最后插入行的行 ID，初始值为 null，仅在使用 execute() 方法成功执行 INSERT 或 REPLACE 语句后才会更新它。

注意：如果建表时使用了 `WITHOUT ROWID` 就没有该记录。

**异常**

- 访问该属性不产生异常。

**示例**

```js
$sqliteCursor.lastrowid
    /* null
    */
```

##### 4.5.5.9) `description` 属性

通过该属性可以获得最后一个查询的列名称。

**描述**

```js
$sqliteCursor.description tuple | null:
```

通过该属性可以获得最后一个查询的列名称。

它也是为没有任何匹配行的 SELECT 语句设置的。


**异常**

- 访问该属性不产生异常。

**示例**

```js
$sqliteCursor.description
    /* tuple: [!'id', 'name', 'age']
    */
```

##### 4.5.5.10) `connection` 属性

通过该属性可以获得创建该 SQLiteCursor 的 SQLiteConnect。

**描述**

```js
$sqliteCursor.connection SQLiteConnect:
```

通过该属性可以获得创建该 SQLiteCursor 的 SQLiteConnect。


**异常**

- 访问该属性不产生异常。

**示例**

```js
$sqliteCursor.connection
    // SQLiteConnect
```

## 附录

### 附.1) 修订记录

发布历史：

- 2025 年 04 月 30 日：发布 V1.0 OR0，标记为 'v1.0-or0-250430'。
- 2024 年 01 月 31 日：发布 V1.0 RCh，标记为 'v1.0-rch-240131'。
- 2023 年 11 月 30 日：发布 V1.0 RCg，标记为 'v1.0-rcg-231130'。
- 2023 年 06 月 30 日：发布 V1.0 RCd，标记为 'v1.0-rcd-230630'。
- 2023 年 05 月 31 日：发布 V1.0 RCc，标记为 'v1.0-rcc-230531'。
- 2023 年 04 月 30 日：发布 V1.0 RCb，标记为 'v1.0-rcb-230430'。
- 2023 年 03 月 31 日：发布 V1.0 RCa，标记为 'v1.0-rca-230331'。
- 2023 年 01 月 31 日：发布 V1.0 RC9，标记为 'v1.0-pv-rc9-230131'。
- 2022 年 12 月 31 日：发布 V1.0 RC8，标记为 'v1.0-pv-rc8-221231'。
- 2022 年 11 月 30 日：发布 V1.0 RC7，标记为 'v1.0-pv-rc7-221130'。
- 2022 年 10 月 31 日：发布 V1.0 RC6，标记为 'v1.0-pv-rc6-221031'。
- 2022 年 09 月 01 日：发布 V1.0 RC5，标记为 'v1.0-pv-rc5-220901'。
- 2022 年 07 月 01 日：发布 V1.0 RC4，标记为 'v1.0-pv-rc4-220701'。
- 2022 年 06 月 01 日：发布 V1.0 RC3，标记为 'v1.0-pv-rc3-220601'。
- 2022 年 05 月 01 日：发布 V1.0 RC2，标记为 'v1.0-pv-rc2-220501'。
- 2022 年 04 月 01 日：发布 V1.0 RC1，标记为 'v1.0-pv-rc1-220401'。

#### OR0) 250430

1. 重新整理 `$SOCKET` 和 `$STREAM`。
1. 用于指定流套接字位置的 URI 变更：
   - 使用 `local` 替代 `unix`（实现上可同时支持）。
   - 引入 `inet`、`inet4` 和 `inet6` 分别表示 Internet v4 或 v6 地址。
   - 移除 `tcp://` 和 `udp://`。
1. 删除 `$CRTN.sendingDocumentByURL` 属性。
1. 新增 `$SYS.access` 方法。
1. 新增 `$SYS.pipe` 方法。
1. 新增 `$SYS.open` 方法。
1. 新增 `$SYS.close` 方法。
1. 新增 `$SYS.fdflags` 方法。
1. 新增 `$SYS.sockopt` 属性。
1. 新增 `$SYS.spawn` 方法。
1. 新增 `$SYS.remove` 方法。
1. 新增 `$SYS.access` 方法。
1. 新增 `$stream.fd` 属性。
1. 新增 `$stream.peerAddr` 属性。
1. 新增 `$stream.peerPort` 属性。
1. 新增 `$DATA.makebytesbuffer` 方法。
1. 新增 `$DATA.append2bytesbuffer` 方法。
1. 新增 `$DATA.rollbytesbuffer` 方法。
1. 新增 `$STREAM.readbytes2buffer` 方法。
1. 重命名 `$DATA.size` 方法为 `$DATA.memsize` 方法。
1. 新增 `$RUNNER.enablelog` 方法。
1. 新增 `$RUNNER.logmsg` 方法。
1. 新增 `$DATA.key` 方法。
1. 新增 `$SYS.kill` 方法。
1. 新增 `$SYS.waitpid` 方法。

#### RCh) 240131

1. 新增 `$STR.codepoints` 方法。

#### RCg) 231130

1. 新增 `$RUNNER.autoSwitchingRdr` 属性。
1. 调整属性名称：
   - `$RUNNER.app_name` 为 `$RUNNER.appName`。
   - `$RUNNER.run_name` 为 `$RUNNER.runName`。
   - `$CRTN.max_iteration_count` 为 `$RUNNER.maxIterationCount`。
   - `$CRTN.max_recursion_depth` 为 `$RUNNER.maxRecursionDepth`。
   - `$CRTN.max_embedded_levels` 为 `$RUNNER.maxEmbeddedLevels`。
1. 新增 `$CRTN.sendingDocumentByURL` 属性。

#### RCd) 230630

1. 调整针对 `message` 和`hbdbus` 扩展协议的接口描述。

#### RCc) 230531

1. 调整 `$STREAM.open` 和 `$SOCK.accept` 两个方法的参数。
1. 增加 `$STREAM.listener` 属性。
1. 增加针对 `message`、`hbdbus` 扩展协议的接口描述。

#### RCb) 230430

1. 调整 `$CRTN.static` 和 `$CRTN.temp` 两个属性的用法。
1. 新增 `$DOC.serialize` 方法。
1. 移除 `$PY.info.path` 属性。
1. 新增 `native/dirStream.stat` 方法。
1. 新增 `$RDR.stat` 方法。

#### RCa) 230331

1. 新增 `$CRTN.static` 和 `$CRTN.temp` 两个动态属性。
1. 新增必要动态变量 `$SOCK`。
1. 新增可选动态变量 `$PY`。
1. 调整 `$FS.file_is` 的关键词。

#### RC9) 230131

1. 重命名元素汇集实体的 `.content()` 属性名称为 `.contents()`。
1. 重命名元素汇集实体的 `.jsonContent()` 属性名称为 `.dataContent()`。
1. 新增 `$DOC.select` 方法。
1. 整理元素汇集实体的接口。

#### RC8) 221231

1. 调整 `$CRTN.token` 属性，增加设置器。
1. 新增 `$RDR` 变量。

#### RC7) 221130

1. 重命名 `$EJSON` 为 `$DATA`。
1. 调整 `$DATA.numberify` 名称为 `$DATA.numerify`。
1. 增强 `$STREAM.stdout.writelines` 以支持多项参数。
1. 新增 `$DATA.contains` 和 `$DATA.has` 方法。

#### RC6) 221031

（无修订）

#### RC5) 220901

1. 使用“行者”替换“会话”。
1. `$SESSION` 更名为 `$RUNNER`；`$HVML` 更名为 `$CRTN`；`$SYSTEM` 更名为 `$SYS`；`$REQUEST` 更名为 `$REQ`。
1. 新增 `$CRTN.cid`、 `$CRTN.token` 以及 `$CRTN.uri` 属性获取器。
1. 新增 `$CRTN.curator`、 `$CRTN.native_crtn` 属性获取器。
1. 新增 `$RUNNER.rid`、 `$RUNNER.uri` 属性获取器。
1. 增强 `$MATH.eval` 及 `$MATH.eval_l`，使之支持常量及函数。
1. 新增 `$DATA.arith` 及 `$DATA.bitwise` 方法。
1. 新增 `$DATA.size` 方法。
1. 新增 `$STR.nr_bytes` 方法。

#### RC4) 220701

1. 描述了如何通过 `pipe` URI 的查询组件传递命令行参数。
1. 描述了 `pipe` 流实体的额外方法：`writeeof` 和 `status`。
1. `$RUNNER` 的 `user_obj` 静态属性名称调整为 `myObj`。

#### RC3) 220601

1. 新增接口：
   - `$RUNNER.appName`：返回当前行者的应用名称。
   - `$RUNNER.runName`：返回当前行者的行者名称。
1. 移除全局级动态变量的提法。
1. 将 `$SYS` 调整为行者级动态变量。
1. 调整 `$FS.rename` 方法返回值类型（boolean）。

#### RC2) 220501

1. 将 `$STREAM` 变量调整为必要变量。
1. 原设计为 `$STREAM` 方法的 `readstruct` 等，全部调整为流实体的方法。
1. 原设计为 `$FS` 方法的 `readdir` 和 `rewinddir` 方法，调整为目录流实体的方法。
1. 调整接口，使用字符串选项而非布尔标志：
   - `$SYS.time_us`
   - `$SYS.timezone`
1. 使用 `regexp` 关键词替代 `reg`：
   - `$STR.streq`
   - `$STR.strne`
1. 新增方法
   - `$SYS.sleep`
   - `$DATA.pack`
   - `$DATA.unpack`
   - `$STR.scan_c`
   - `$STR.scan_p`
1. 新增方法
   - `$CRTN.target`

#### RC1) 220401

1. 移除了单个元素实体，全部使用元素汇集实体。
1. 移除了 `$STR.strlen` 方法。
1. 变更了 `$STR.implode`、`$STR.explode` 方法的接口。
1. `$STR.strcat` 方法更名为 `$STR.join`，并增强了接口。
1. `$STR.upper` 方法更名为 `$STR.toupper`。
1. `$STR.lower` 方法更名为 `$STR.tolower`。
1. 为 `$STR` 新增大量方法。
1. 调整了 `$FS.list` 方法的返回对象格式。
1. 新增 `$URL` 动态对象及其方法。
1. 将 `$STREAM` 独立出来。
1. 为 `$FS` 新增大量方法。
1. 将 `$SYS` 调整为全局级动态变量。
1. 将 `$SYS` 中的 `random` 方法调整到 `RUNNER` 变量，将时间格式化相关的方法调整到新的 `$DATETIME` 变量。
1. 添加 `$STREAM.stdin`, `$STREAM.stdout` 以及 `$STREAM.stderr` 三个静态属性，用于返回代表标准输入、标准输出和标准错误的流式读写实体。
1. 在 `$SYS` 中增加 `random_sequence` 方法。
1. 将 `$RUNNER` 中的 `env` 和 `cwd` 方法转移到 `$SYS` 方法。
1. 在二进制格式表示法中增加 `utf16` 和 `utf32` 两种编码。
1. 新增 `$DATA.fetchstr` 和 `$DATA.fetchreal`，可使用二进制格式表示法从一个字节序列中抽取实数或者字符串。
1. 增强元素汇集原生实体的方法，使之可以生成指定元素汇集的子集。

#### BRC) 220201


### 附.2) 贡献者榜单

本榜单顺序按贡献时间由早到晚排列：


### 附.3) 商标声明

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

12) PurC

![PurC](https://www.fmsoft.cn/application/files/5716/2813/0470/PurC256132.jpg)


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

