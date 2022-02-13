# HVML 预定义变量

Subject: HVML Predefined Variables  
Version: 1.0  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: Nov. 1, 2021  
Last Modified Date: Feb. 9, 2022  
Status: Proposal  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2021, 2022 北京飞漫软件技术有限公司  
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
      * [3.2.6) `gmtime` 方法](#326-gmtime-方法)
      * [3.2.7) `mktime` 方法](#327-mktime-方法)
      * [3.2.8) `timezone` 方法](#328-timezone-方法)
      * [3.2.9) `fmttime` 方法](#329-fmttime-方法)
      * [3.2.10) `env` 方法](#3210-env-方法)
   + [3.3) `HVML`](#33-hvml)
      * [3.3.1) `base` 方法](#331-base-方法)
      * [3.3.2) `maxIterationCount` 方法](#332-maxiterationcount-方法)
      * [3.3.3) `maxRecursionDepth` 方法](#333-maxrecursiondepth-方法)
      * [3.3.4) `timeout` 方法](#334-timeout-方法)
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
      * [3.5.8) `shuffle` 方法](#358-shuffle-方法)
      * [3.5.9) `compare` 方法](#359-compare-方法)
      * [3.5.10) `parse` 方法](#3510-parse-方法)
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
      * [3.8.2) `starts_with` 方法](#382-starts_with-方法)
      * [3.8.3) `ends_with` 方法](#383-ends_with-方法)
      * [3.8.4) `explode` 方法](#384-explode-方法)
      * [3.8.5) `implode` 方法](#385-implode-方法)
      * [3.8.6) `shuffle` 方法](#386-shuffle-方法)
      * [3.8.7) `replace` 方法](#387-replace-方法)
      * [3.8.8) `format_c` 方法](#388-format_c-方法)
      * [3.8.9) `format_p` 方法](#389-format_p-方法)
      * [3.8.10) `join` 方法](#3810-join-方法)
      * [3.8.11) `length` 方法](#3811-length-方法)
      * [3.8.12) `tolower` 方法](#3812-tolower-方法)
      * [3.8.13) `toupper` 方法](#3813-toupper-方法)
      * [3.8.14) `substr` 方法](#3814-substr-方法)
      * [3.8.15) `substr_compare` 方法](#3815-substr_compare-方法)
      * [3.8.16) `substr_count` 方法](#3816-substr_count-方法)
      * [3.8.17) `substr_replace` 方法](#3817-substr_replace-方法)
      * [3.8.18) `strstr` 方法](#3818-strstr-方法)
      * [3.8.19) `strpos` 方法](#3819-strpos-方法)
      * [3.8.20) `strpbrk` 方法](#3820-strpbrk-方法)
      * [3.8.21) `split` 方法](#3821-split-方法)
      * [3.8.22) `chunk_split` 方法](#3822-chunk_split-方法)
      * [3.8.23) `trim` 方法](#3823-trim-方法)
      * [3.8.24) `pad` 方法](#3824-pad-方法)
      * [3.8.25) `repeat` 方法](#3825-repeat-方法)
      * [3.8.26) `reverse` 方法](#3826-reverse-方法)
      * [3.8.27) `tokenize` 方法](#3827-tokenize-方法)
      * [3.8.28) `translate` 方法](#3828-translate-方法)
      * [3.8.29) `bin2hex` 方法](#3829-bin2hex-方法)
      * [3.8.30) `hex2bin` 方法](#3830-hex2bin-方法)
      * [3.8.31) `htmlentities_encode` 方法](#3831-htmlentities_encode-方法)
      * [3.8.32) `htmlentities_decode` 方法](#3832-htmlentities_decode-方法)
      * [3.8.33) `crc32` 方法](#3833-crc32-方法)
      * [3.8.34) `md5` 方法](#3834-md5-方法)
      * [3.8.35) `sha1` 方法](#3835-sha1-方法)
      * [3.8.36) `rot13` 方法](#3836-rot13-方法)
      * [3.8.37) `count_chars` 方法](#3837-count_chars-方法)
      * [3.8.38) `count_bytes` 方法](#3838-count_bytes-方法)
      * [3.8.39) `nl2br` 方法](#3839-nl2br-方法)
      * [3.8.40) 错误与异常](#3840-错误与异常)
   + [3.9) `URL`](#39-url)
      * [3.9.1) `base64_encode` 方法](#391-base64_encode-方法)
      * [3.9.2) `base64_decode` 方法](#392-base64_decode-方法)
      * [3.9.3) `urlencode` 方法](#393-urlencode-方法)
      * [3.9.4) `urldecode` 方法](#394-urldecode-方法)
      * [3.9.5) `rawurlencode` 方法](#395-rawurlencode-方法)
      * [3.9.6) `rawurldecode` 方法](#396-rawurldecode-方法)
      * [3.9.7) `parse` 方法](#397-parse-方法)
      * [3.9.8) `http_build_query` 方法](#398-http_build_query-方法)
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
      * [4.2.3) `basename` 方法](#423-basename-方法)
      * [4.2.4) `chgrp` 方法](#424-chgrp-方法)
      * [4.2.5) `chmod` 方法](#425-chmod-方法)
      * [4.2.6) `chown` 方法](#426-chown-方法)
      * [4.2.7) `copy` 方法](#427-copy-方法)
      * [4.2.8) `dirname` 方法](#428-dirname-方法)
      * [4.2.9) `disk_usage` 方法](#429-disk_usage-方法)
      * [4.2.10) `file_exists` 方法](#4210-file_exists-方法)
      * [4.2.11) `file_is` 方法](#4211-file_is-方法)
      * [4.2.12) `lchgrp` 方法](#4212-lchgrp-方法)
      * [4.2.13) `lchown` 方法](#4213-lchown-方法)
      * [4.2.14) `linkinfo` 方法](#4214-linkinfo-方法)
      * [4.2.15) `lstat` 方法](#4215-lstat-方法)
      * [4.2.16) `link` 方法](#4216-link-方法)
      * [4.2.17) `mkdir` 方法](#4217-mkdir-方法)
      * [4.2.18) `pathinfo` 方法](#4218-pathinfo-方法)
      * [4.2.19) `readlink` 方法](#4219-readlink-方法)
      * [4.2.20) `realpath` 方法](#4220-realpath-方法)
      * [4.2.21) `rename` 方法](#4221-rename-方法)
      * [4.2.22) `rmdir` 方法](#4222-rmdir-方法)
      * [4.2.23) `stat` 方法](#4223-stat-方法)
      * [4.2.24) `symlink` 方法](#4224-symlink-方法)
      * [4.2.25) `tempname` 方法](#4225-tempname-方法)
      * [4.2.26) `touch` 方法](#4226-touch-方法)
      * [4.2.27) `umask` 方法](#4227-umask-方法)
      * [4.2.28) `unlink` 方法](#4228-unlink-方法)
      * [4.2.29) `file_get_contents` 方法](#4229-file_get_contents-方法)
      * [4.2.30) `file_put_contents` 方法](#4230-file_put_contents-方法)
      * [4.2.31) `opendir` 方法](#4231-opendir-方法)
      * [4.2.32) `readdir` 方法](#4232-readdir-方法)
      * [4.2.33) `rewinddir` 方法](#4233-rewinddir-方法)
      * [4.2.34) `closedir` 方法](#4234-closedir-方法)
      * [4.2.35) 错误与异常](#4235-错误与异常)
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
   + [附.1) 修订记录](#附1-修订记录)
      * [RC1) 220301](#rc1-220301)
      * [BRC) 220201](#brc-220201)
   + [附.2) 贡献者榜单](#附2-贡献者榜单)
   + [附.3) 商标声明](#附3-商标声明)

[//]:# (END OF TOC)

## 1) 背景

本文档是 HVML 规范的一部分，用于详细定义 HVML 解释器必须支持或者可选支持的预定义变量。

本文档遵循的技术规范或术语如下所列：

- HVML（Hybrid Virtual Markup Language），是飞漫软件提出的一种数据驱动的可编程标记语言。[HVML 规范文档](hvml-spec-v1.0-zh.md) 的如下部分和本文档相关：
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

**描述**

```php
$SESSION.cwd string | false: Returns the current working directory on success, or `false` on failure.
```

该方法获取当前工作路径。

```php
$SESSION.cwd(!
        <string $dir: new path for the current working directory>
) boolean: returns `true` on success or `false` on failure.
```

该方法改变当前工作路径。

**错误或异常**

该方法可能产生的异常：

- `AccessDenied`
- `IOFailure`
- `TooMany`
- `TooLong`
- `NotDesiredEntity`
- `OSFailure`

#### 3.1.2) `user` 方法

获取或设置用户键值对。

**描述**

```php
$SESSION.user(
        <string $key: the user defined key name>
) any | undefined : the variant value corresponding to the key name $key.
```

该方法获取指定键名对应的键值；未设置时抛出异常 `NoSuchKey`。

```php
$SESSION.user(!
        <string $key: the user defined key name>,
        <any $value: the new variant value>
) boolean : returns `true` when the old value was overridden or `false` when a new key-value pair was created.
```

该方法设置指定键名的值，返回布尔数据，指明是否覆盖了已有键值。

**示例**

```php
// 示例：设置 `userId` 为 `20211104-01`
$SESSION.user(! 'userId', '20211104-01' )

// 示例：获取 `userId` 对应的键值
$SESSION.user('userId')
```

**错误或异常**

该方法可能产生的异常：

- `NoSuchKey`

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

获取或设置系统时间。

**描述**

```php
$SYSTEM.time : ulongint
```

该方法获取当前系统时间（自 Epoch 以来的秒数），返回类型为 ulongint。

```php
$SYSTEM.time(
        <'atom | cookie | iso8601 | rfc822 | rfc850 | rfc1036 | rfc1036 | rfc1123 | rfc7231 | rfc2822 | rfc3339 | rfc3339-ex | rss | w3c' $format:
            - `atom` - Atom (example: 2005-08-15T15:52:01+00:00)
            - `cookie` - HTTP Cookies (example: Monday, 15-Aug-2005 15:52:01 UTC)
            - `iso8601` - Same as 'ATOM' (example: 2005-08-15T15:52:01+00:00)
            - `rfc822` - RFC 822 (example: Mon, 15 Aug 05 15:52:01 +0000)
            - `rfc850` - RFC 850 (example: Monday, 15-Aug-05 15:52:01 UTC)
            - `rfc1036` - RFC 1036 (example: Mon, 15 Aug 05 15:52:01 +0000)
            - `rfc1123` - RFC 1123 (example: Mon, 15 Aug 2005 15:52:01 +0000)
            - `rfc7231` - RFC 7231 (since PHP 7.0.19 and 7.1.5) (example: Sat, 30 Apr 2016 17:52:13 GMT)
            - `rfc2822` - RFC 2822 (example: Mon, 15 Aug 2005 15:52:01 +0000)
            - `rfc3339` - Same as 'ATOM'
            - `rfc3339-ex` - RFC 3339 EXTENDED format (example: 2005-08-15T15:52:01.000+00:00)
            - `rss` - RSS (example: Mon, 15 Aug 2005 15:52:01 +0000)
            - `w3c` - World Wide Web Consortium (example: 2005-08-15T15:52:01+00:00)
        >
        [, <number | longint | ulongint | longdouble $seconds: seconds since Epoch>
            [, <string $timezone>
            ]
        ]
) : string
```

该方法获得指定时间在给定时区，以给定格式化标准/规范名称（如 ISO8601、RFC850）形式展示的时间字符串。

```php
$SYSTEM.time(! <number: seconds since Epoch> ) : true | false
```

该方法设置系统时间，成功返回 true，失败返回 false。

**示例**

```php
$SYSTEM.time
    // ulongint: 123456789UL

$SYSTEM.time.iso8601
    // string: '2020-06-24T11:27:05+08:00'

$SYSTEM.time('iso8601')
    // string: '2020-06-24T11:27:05+08:00'

// 获取当前时间之前一个小时在上海时区（北京标准时间）的 ISO8601 标准字符串
$SYSTEM.time('iso8601', $MATH.eval('x - 3600', { x: $SYSTEM.time }), 'Asia/Shanghai')
    // string: '2020-06-24T11:27:05+08:00'

// 获取当前时间上海时区（北京标准时间）的 RFC822 标准字符串
$SYSTEM.time('rfc822', $SYSTEM.time, 'Asia/Shanghai')
    // string: 'Mon, 15 Aug 05 15:52:01 +0000'
```

**参考链接**

- PHP: <https://www.php.net/manual/en/timezones.php>
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime 类：<https://www.php.net/manual/en/class.datetime.php>

#### 3.2.6) `gmtime` 方法

获取分解时间。

**描述**

```php
$SYSTEM.gmtime: object
```

获得当前时间当前时区的分解时间（broken-down time），返回类型为对象。

```php
$SYSTEM.gmtime(
        [, <number | longint | ulongint | longdouble $seconds: seconds since Epoch>
            [, <string $timezone>
            ]
        ]
) : object
```

获得给定时间在指定时区的分解时间（broken-down time），返回类型为对象。

该函数返回的分解时间对象包含如下属性：

```php
{
   'sec'    The number of seconds after the minute, normally in the range 0 to 59, but can be up to 60 to allow for leap seconds.
   'min'    The number of minutes after the hour, in the range 0 to 59.
   'hour'   The number of hours past midnight, in the range 0 to 23.
   'mday'   The day of the month, in the range 1 to 31.
   'mon'    The number of months since January, in the range 0 to 11.
   'year'   The number of years since 1900.
   'wday'   The number of days since Sunday, in the range 0 to 6.
   'yday'   The number of days since January 1, in the range 0 to 365.
   'isdst'  A flag that indicates whether daylight saving time is in effect at the time described. The value is positive if daylight saving  time  is  in  effect, zero if it is not, and negative if the information is not available.
}
```

**示例**

```php
// 获取当前时间在当前时区的分解时间
$SYSTEM.gmtime

// 获取当前时间之前一个小时在上海时区（北京标准时间）的分解时间
$SYSTEM.gmtime($MATH.sub($SYSTEM.time, 3600), 'Asia/Shanghai')
```

#### 3.2.7) `mktime` 方法

将分解时间转换为日历时间（Epoch 以来的秒数）。

**描述**

```php
$SYSTEM.mktime(
        <object $tm>
        [, <string $timezone>
        ]
)
```

转换指定时区（默认为当前时区）的分解时间为日历时间（Epoch 以来的秒数）。

**示例**

#### 3.2.8) `timezone` 方法

获取或设置时区。

**描述**

```php
$SYSTEM.timezone : string
```

该方法返回当前时区。

```php
$SYSTEM.timezone(! <string $timezone> ) : true | false
```

该方法设置当前时区。

**示例**

#### 3.2.9) `fmttime` 方法

获取或设置时区。

**描述**

```php
$SYSTEM.fmttime(
        <string $format: the format string>
        [, <number | longint | ulongint | longdouble: the calendar time (seconds since Epoch)>
            [, <string $timezone>
            ]
        ]
) : string | false
```

该方法按指定的格式格式化一个日历时间。

**示例**

```php
// 获得类似 `11:27` 的时间字符串
$SYSTEM.time("It now is %H:%m")
    // string: 'It now is 11:27'
```

#### 3.2.10) `env` 方法

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
该功能亦可设计为一个 `SYSTEM` 变量上的一个静态属性，初始化时从系统中获取所有环境变量构造为一个对象，程序可使用 `update` 元素修改环境变量。

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

// 原型，设置最大迭代次数值，返回设置后的值。当传入无效值（如零）时，不做改变。
$HVML.maxIterationCount(! <ulongint, new maximal interation count> ): ulongint

// 示例：
$HVML.maxIterationCount(! 10000UL )
```

#### 3.3.3) `maxRecursionDepth` 方法

该方法获取或设置 HVML 程序在递归执行某个功能时的最大递归深度，以防止栈溢出。

默认值为 16 位无符号整数的最大值：`2 ^ 16 - 1`（65535）。

```php
// 原型，返回当前值
$HVML.maxRecursionDepth: ulongint

// 原型，设置最大递归深度值，返回设置后的值。当传入无效值（如零）时，不做改变。
$HVML.maxRecursionDepth(! <ulongint, new maximal recursion depth> ): ulongint

// 示例：
$HVML.maxRecursionDepth(! 10000UL )
```

#### 3.3.4) `timeout` 方法

该方法获取或设置 HVML 程序在通过数据获取器获取数据或者建立长串接、发送请求时的超时值（单位：秒）。

默认值为 10.0。

```php
// 原型，返回当前超时值
$HVML.timeout: number

// 原型，设置超时值，返回设置后的值。当传入无效值（如零或者负数）时，不做改变。
$HVML.timeout(! <number, new timeout value> ): number

// 示例：设置超时值魏 3.5 秒。
$HVML.timeout(! 3.5 )
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
1. 一个元素汇集实体，包含零个或多个元素。

在元素汇集实体上，我们可以就如下键名获得对应的获取器：

1. `.count()`：获取元素汇集中元素的个数。
1. `.at( <real: index> )`：获取指定索引值上的元素实体。
1. `.attr( <string: attributeName> )`：获取元素汇集中第一个元素的指定属性值。
1. `.prop( <string: propertyName> )`：获取元素汇集中第一个元素的指定状态值。
1. `.style( <string: styleName> )`：获取元素汇集中第一个元素的指定样式值。
1. `.content()`：获取元素汇集中第一个元素的内容（字符串，按目标标记语言序列化）。
1. `.textContent()`：获得元素汇集中第一个元素（含子元素）的文本内容。
1. `.jsonContent()`：获得元素汇集中第一个元素（含子元素）的数据内容，多个内容形成数组。
1. `.val()`：获得元素汇集中第一个元素的当前值。
1. `.hasClass( <string: className> )`：判断元素汇集中是否有任意元素被赋予指定的类名。

在元素汇集实体上，我们可以就如下键名获得对应的设置器：

1. `.attr(! <string: attributeName>, <string: value> )`：设置元素汇集中所有元素的属性值。
1. `.attr(! <object: attributes> )`：使用对象信息设置元素汇集中所有元素的多个属性值。
1. `.prop(! <string: propertyName>, <any: value> )`：设置元素汇集中所有元素的状态值。
1. `.prop(! <object: properties> )`：使用对象信息设置元素汇集中所有元素的多个状态值。
1. `.style(! <string: styleName>, <string: value> )`：设置元素汇集中所有元素的样式值。
1. `.style(! <object: styles> )`：使用对象信息设置元素汇集中所有元素的多个样式值。
1. `.content(! <string: content> )`：设置元素汇集中所有元素的内容。
1. `.textContent(! <string: content> )`：设置元素汇集中所有元素的文本内容，将移除可能的子元素。
1. `.jsonContent(! <any: content> )`：设置元素汇集中所有元素的数据内容，将移除可能的子元素。
1. `.val(! newValue)`：设置元素汇集中所有元素的当前值。
1. `.addClass(! <string: className> )`：为元素汇集中所有的元素添加指定的类名。
1. `.addClass(! <array: classNames> )`：为元素汇集中所有的元素添加数组中指定的所有类名。
1. `.removeAttr(! <string: attributeName> )`：移除元素汇集中所有元素的指定属性。
1. `.removeClass(! )`：移除元素汇集中所有元素的所有类名。
1. `.removeClass(! <string: className> )`：移除元素汇集中所有元素的指定类名。
1. `.removeClass(! <array: classNames> )`：移除元素汇集中所有元素在数组中的所有类名。

类似地，在单个元素实体上，我们可就如下键名获得对应的获取器：

1. `.attr( <string: attributeName> )`：获取元素的指定属性值。
1. `.prop( <string: propertyName> )`：获取元素的指定状态值。
1. `.style( <string: styleName> )`：获取元素的指定样式值。
1. `.content()`：获取元素的内容（字符串，按目标标记语言序列化）。
1. `.textContent()`：获得元素（含子元素）的文本内容。
1. `.jsonContent()`：获得元素（含子元素）的数据内容，多个内容形成数组。
1. `.val()`：获得元素的当前值。
1. `.hasClass( <string: className> )`：判断元素是否被赋予指定的类名。

在单个元素实体上，我们可就如下键名获得对应的设置器：

1. `.attr(! <string: attributeName>, <string: value> )`：设置元素的属性值。
1. `.attr(! <object: attributes> )`：使用对象信息设置元素的多个属性值。
1. `.prop(! <string: propertyName>, <any: value> )`：设置元素的状态值。
1. `.prop(! <object: properties> )`：使用对象信息设置元素的多个状态值。
1. `.style(! <string: styleName>, <string: value> )`：设置元素的样式值。
1. `.style(! <object: styles> )`：使用对象信息设置元素的样式值。
1. `.content(! <string: content> )`：设置元素的内容。
1. `.textContent(! <string: content> )`：用于设置元素的文本内容，将移除可能的子元素。
1. `.jsonContent(! <any: content> )`：用于设置元素的数据内容，将移除可能的子元素。
1. `.val(! <string: newValue>)`：设置元素的当前值。
1. `.addClass(! <string: className> )`：添加指定的类名。
1. `.addClass(! <array: classNames> )`：从数组中添加指定的类名。
1. `.removeAttr(! <string: attributeName> )`：移除元素的指定属性。
1. `.removeClass(! )`：移除元素的所有类名。
1. `.removeClass(! <string: className> )`：移除元素的指定类名。
1. `.removeClass(! <array: classNames> )`：移除元素在数组中的所有类名。

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
$DOC.query("#foo").attr('bar')

// 设置 id 为 foo 的元素上的属性 `bar` 的值：
$DOC.query("#foo").attr(! "bar", "qux")
```

参阅：<https://api.jquery.com/category/attributes/>

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
$EJSON.serialize(
        <any $data>
        [, < '[json | ejson] || [ ignore | placeholder ] || [ plain | spaced | pretty | pretty_tab] || [bseq-hex | bseq-bin | bseq-bin-dots | bseq-base64]' $options = `json ignore spaced bseq-hex`:
            'json' -
            'ejson' -
            'ignore' -
            'placeholder' -
            'plain' -
            'spaced' -
            'pretty' -
            'pretty-tab' -
            'bseq-hex' -
            'bseq-bin' -
            'bseq-bin-dots' -
            'bseq-base64' -
           >
        ]
): string
```

#### 3.5.7) `sort` 方法

该方法对给定的数组或者集合做排序。

```php
// 原型
$EJSON.sort(
        < array | set >,
        < 'asc | desc' = 'asc': sorting ascendingly or descendingly >
        [, < 'auto | number | case | caseless' = 'auto':
            `auto` - comparing members automatically;
            `number` - comparing members as numbers;
            `case` - comparing members as strings case-sensitively;
            `caseless` - comparing members as strings case-insensitively. >
        ]
) : boolean
```

#### 3.5.8) `shuffle` 方法

该方法随机打乱给定数组或者集合的成员顺序。

```php
// 原型
$EJSON.shuffle(
        < array | set >,
        < 'asc | desc ' = 'asc': sorting ascendingly or descendingly >
        [, < 'auto | number | case | caseless' = 'auto':
            `auto` - comparing members automatically;
            `number` - comparing members as numbers;
            `case` - comparing members as strings case-sensitively;
            `caseless` - comparing members as strings case-insensitively. >
        ]
) : boolean
```

#### 3.5.9) `compare` 方法

该方法对给定两个数据做对比，返回数值：

- 等于 0 表示两个数据相等；
- 小于 0 表示第一个数据小于第二个数据；
- 大于 0 表示第一个数据大于第二个数据。

```php
// 原型
$EJSON.compare(
        < any: the first data >,
        < any: the second data >
        [, < 'auto | number | case | caseless' = 'auto':
            `auto`: comparing automatically;
            `number`: comparing as numbers;
            `case`: comparing as strings case-sensitively;
            `caseless`: comparing as strings case-insensitively. >
        ]
) : number
```

#### 3.5.10) `parse` 方法

解析 JSON/EJSON 字符串，返回 EJSON 数据。

**描述**

```php
$EJSON.parse(
        < string: $string: the string to be parsed. >
        [, < boolean $strict_json = `false`:
           `true` - the string to be parsed should be in strict JSON format.
           `false` - the string to be parsed should be in EJSON format. >
            [, < boolean $evalute_expressions = `false`:
               `true` - will evaluate the EJSON expressions when parsing the string.
               `false` - all EJSON expressions will be ignored. >
            ]
        ]
) : any
```

### 3.6) `L`

该变量是一个会话级内置变量，主要用于逻辑运算。

有关任何数据转换为逻辑真假值时的规则，请参阅 [HVML 1.0 规范 - 2.1.4) 任意数据类型的强制转换规则](hvml-spec-v1.0-zh.md#214-%E4%BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)。

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

#### 3.8.1) `contains` 方法

判断一个字符串中是否包含给定的子字符串。

**描述**

```php
$STR.contains(
        <string $haystack: the string to search in>,
        <string $needle: the substring to search for in the haystack>
        [, <boolean $case_insensitivity = `false`:
            `false` - performs a case-sensitive check;
            `true` - performs a case-insensitive check.>
        ]
) : boolean
```

判断字符串 `haystack` 中是否包含字符串 `needle`，执行

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

```php
$STR.contains('Hello, world!', 'world')
    // boolean: true

$STR.contains('Hello, world!', '')
    // boolean: true
```

**参考链接**

- PHP `str_contains()` 函数：<https://www.php.net/manual/en/function.str-contains.php>

#### 3.8.2) `starts_with` 方法

用于判断一个字符串是否以给定的字符串开头。

**描述**

```php
$STR.starts_with(
        <string haystack: the string to search in.>,
        <string needle: the substring to search for in the haystack.>
        [, <boolean $case_insensitivity = `false`:
            `false` - performs a case-sensitive check;
            `true` - performs a case-insensitive check.>
        ]
) : boolean
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

**示例**

```php
$STR.starts_with('Hello, world', 'hello', true)
    // boolean: true

$STR.starts_with('Hello, world', '')
    // boolean: true
```

**参考链接**

- PHP `str_starts_with()` 函数：<https://www.php.net/manual/en/function.str-starts-with.php>

#### 3.8.3) `ends_with` 方法

用于判断一个字符串是否以给定的字符串结尾。

```php
$STR.ends_with(
        <string haystack: the string to search in>,
        <string needle: the substring to search for in the haystack>
        [, <boolean $case_insensitivity = `false`:
            `false` - performs a case-sensitive check;
            `true` - performs a case-insensitive check.>
        ]
) : boolean
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

**示例**

```php
$STR.ends_with('Hello, world', 'World', true)
    // boolean: true

$STR.ends_with('Hello, world', '')
    // boolean: true
```

**参考链接**

- PHP `str_ends_with()` 函数：<https://www.php.net/manual/en/function.str-ends-with.php>

#### 3.8.4) `explode` 方法

使用指定的子字符串分隔一个字符串。

**描述**

```php
$STR.explode(
        <string $string: the input string to explode>
        [, <string $separator: the boundary string = ''>
            [, <longint $limit = 0>]
        ]
) : array
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

**示例**

```php
$STR.explode('beijing:shanghai:guangzhou', ':')
    // array: ['beijing', 'shanghai', 'guangzhou']

$STR.explode('1, 2, 3, ', ', ')
    // array: ['1', '2', '3', ''],

$STR.explode('汉字')
    // array: ['汉', '字']

$STR.explode('中华人民共和国', 2)
    // array: ['中', '华']
```

**参考链接**

- PHP `explode()` 函数：<https://www.php.net/manual/en/function.explode.php>

#### 3.8.5) `implode` 方法

将一个数组的成员串接为一个新的字符串。使用指定的字符串串接字符串数组中的字符串。

**描述**

```php
$STR.implode(
        <array $pieces: The array to implode>
        [, <string $separator: the boundary string = ''>]
) : string
```

使用 `separator` 将数组 `pieces` 的成员字符串化后串接为新的字符串。

**参数**

- `pieces`  
数组；如果数组中某个成员不是字符串，则首先做字符串化处理。
- `seperator`  
分隔字符串；未传递时，视同空字符串

**返回值**

返回串接后的新字符串。如果数组为空，则返回空字符串。如果 `separator` 为空字符串，则该方法直接串接数组中的各个字符串，各个字符串之间没有分隔符。

**示例**

```php
$STR.implode(['beijing', 'shanghai', 'guangzhou'], ', ')
    // string: 'beijing, shanghai, guangzhou'

$STR.implode([1, 2, 3, ''], ', ')
    // string: '1, 2, 3, '

$STR.implode(["root", 'x', 0, 0, 'root', "/root", "/bin/bash"], ':')
    // string: 'root:x:0:0:root:/root:/bin/bash'

$STR.implode(['汉', '字'])
    // string: '汉字'
```

**参考链接**

- PHP `implode()` 函数：<https://www.php.net/manual/en/function.implode.php>

#### 3.8.6) `shuffle` 方法

随机打乱一个字符串。

**描述**

```php
$STR.shuffle(<string $string: the input string to shuffle>) : string
```

该函数在输入字符串 `string` 的基础上，返回一个新的随机排列的字符串。

**参数**

- `string`  
输入字符串

**返回值**

该函数返回随机排列后的新字符串。

**示例**

```php
$STR.shuffle('beijing') // string: 'jbienig'
```

**参考链接**

- PHP `str_shuffle()` 函数：<https://www.php.net/manual/en/function.str-shuffle.php>

#### 3.8.7) `replace` 方法

子字符串替换。

**描述**

```php
$STR.replace(
        <string | array $search>,
        <string | array $replace>,
        <array | string $subject>
        [, <boolean $case_insensitivity = `false`:
            `false` - performs case-sensitive replacements;
            `true` - performs case-insensitive replacements.>
        ]
) : string | array
```

该函数返回一个字符串或者数组，该字符串或数组是将 `subject` 中全部的 `search` 都被 `replace` 替换之后的结果。

**参数**

如果 `search` 和 `replace` 为数组，那么该函数将对 `subject` 做二者的映射替换。如果 `replace` 中值的个数少于 `search` 的个数，多余的替换将使用空字符串来进行。如果 `search` 是一个数组而 `replace` 是一个字符串，那么 `search` 中每个元素的替换将始终使用这个字符串。该替换不会改变大小写。

如果 `search` 和 `replace` 都是数组，它们的值将会被依次处理。

- `search`  
查找的目标值，也就是 needle。一个数组可以指定多个目标。
- `replace`  
search 的替换值。一个数组可以被用来指定多重替换。
- `subject`  
执行替换的数组或者字符串，也就是常说的 `haystack`。 如果 `subject` 是一个数组，替换操作将遍历整个 `subject`，返回值也将是一个数组。
- `case_insensitivity`  
指定是否忽略大小写（可选）；默认为忽略大小写。

**返回值**

该函数返回替换后的数组或者字符串。

**示例**

```php
$STR.replace("%BODY%", "black", "<body text=%BODY%>");
    // string: '<body text=black>'

$STR.replace("%body%", "black", "<body text=%BODY%>", true);
    // string: '<body text=black>'
```

**参考链接**

- PHP `str_replace()` 函数：<https://www.php.net/manual/en/function.str-replace.php>
- PHP `str_ireplace()` 函数：<https://www.php.net/manual/en/function.str-ireplace.php>

#### 3.8.8) `format_c` 方法

格式化数值及字符串数据，使用 C 格式化字符表述方法。

```php
// 原型
$STR.format_c(
        <string: C format string>
        [, <boolean | number | longint | ulongint | longdouble | string>
            [, ...]
        ]
) : string

// 原型
$STR.format_c(
        <string: C format string>,
        <array>
) : string

// 示例
$STR.format_c('Tom is %d years old, while Jerry is %d years old.', 9, 7)
```

#### 3.8.9) `format_p` 方法

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
$STR.format_p('There are two boys: {name0} and {name1}', { name0: 'Tom', name1: 'Jerry' })
```

#### 3.8.10) `join` 方法

用于串接两个或更多个字符串。

**描述**

```php
$STR.join(
        <string $str1>,
        <string $str2>
        [, <string $str3>
            [, ...]
        ]
) : string
```

将所有参数（至少两个）做字符串化处理后串接成新的字符串。

**参数**

- `str1`  
第一个输入字符串。
- `str2`  
第二个输入字符串。
- `str3`  
第三个输入字符串。

**返回值**

依次串接后的字符串。

**示例**

```php
$STR.join('hello', ' ', 'world')    // string: 'hello world'
```

**参考链接**

#### 3.8.11) `length` 方法

用于获得字符串的长度（字符为单位）。

**描述**

```php
$STR.length(<string $string>) : ulongint
```

获得字符串 `string` 中字符的个数。

**参数**

- `string`  
输入字符串。

**返回值**

返回值为 `ulongint` 类型，表示字符个数。

**示例**

```php
// 获得字符串 `中国` 的长度
$STR.length('中国')
    // ulongint: 2
```

**参考链接**


#### 3.8.12) `tolower` 方法

将字符串转换为小写。

**描述**

```php
// 原型：将字符串 `s` 全部转换为小写，并返回转换后的字符串；返回值为 `string` 类型
$STR.tolower(<string $string>) : string
```

将字符串 `string` 中的所有字符转换为小写，并返回转换后的字符串。

**参数**

- `string`  
输入字符串。

**返回值**

转换为小写的字符串。

**示例**

```php
$STR.tolower('Hello, world')
    // string: 'hello, world'
```

**参考链接**

- PHP `strtolower()` 函数：<https://www.php.net/manual/en/function.strtolower.php>

#### 3.8.13) `toupper` 方法

将字符串转换为大写。

**描述**

```php
$STR.toupper(<string $string>) : string
```

将字符串 `string` 中的所有字符转换为大写，并返回转换后的字符串。

**参数**

- `string`  
输入字符串。

**返回值**

转换为大写的字符串。

**示例**

```php
$STR.toupper('Hello, world')
    // string: 'HELLO, WORLD'
```

**参考链接**

- PHP `strtoupper()` 函数：<https://www.php.net/manual/en/function.strtoupper.php>

#### 3.8.14) `substr` 方法

返回字符串的子串。

**描述**

```php
$STR.substr(<string $string>, <real $offset>[, <real $length>]) : string
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

```php
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

**参考链接**

- PHP `substr()` 函数：<https://www.php.net/manual/en/function.substr.php>

#### 3.8.15) `substr_compare` 方法

安全比较字符串（从指定的偏移位置开始比较指定的长度）

**描述**

```php
$STR.substr_compare(
    <string $str1>,
    <string $str2>,
    <real $offset1>,
    <real $offset2>,
    [, <real $length = 0>
        [, <boolean $case_insensitivity = `false`:
            `false` - performs a case-sensitive comparison;
            `true` - performs a case-insensitive comparison.>
        ]
    ]
) : number
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `substr_compare()` 函数：<https://www.php.net/manual/en/function.substr-compare.php>

#### 3.8.16) `substr_count` 方法

计算子字符串出现的次数。

**描述**

```php
$STR.substr_count(
    <string $haystack>,
    <string $needle>
    [, <real $offset = 0>
        [, <real $length = 0>
        ]
    ]
): ulongint
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `substr_count()` 函数：<https://www.php.net/manual/en/function.substr-count.php>

#### 3.8.17) `substr_replace` 方法

在子字符串中做替换。

**描述**

```php
$STR.substr_replace(
    <array|string $string>,
    <array|string $replace>,
    <array|real $offset>
    [,
        <array|real $length = 0>
    ]
): string|array
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `substr_replace()` 函数：<https://www.php.net/manual/en/function.substr-replace.php>

#### 3.8.18) `strstr` 方法

返回在目标字符串中，以指定字符串起始或结尾的子字符串。

**描述**

```php
$STR.strstr(
        <string $haystack>,
        <string $needle>
        [, <bool $before_needle = false>
            [, <bool $case_insensitivity = false:
                `false` - performs a case-sensitive check;
                `true` - performs a case-insensitive check.>
            ]
        ]
) : string|false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strstr()` 函数：<https://www.php.net/manual/en/function.strstr.php>
- PHP `stristr()` 函数：<https://www.php.net/manual/en/function.stristr.php>

#### 3.8.19) `strpos` 方法

返回在目标字符串中指定字符串第一次或者最后一次出现的位置。

**描述**

```php
$STR.strpos(
        <string $haystack>,
        <string $needle>
        [, <real $offset = 0>
            [, <bool $case_insensitivity = false:
                `false` - performs a case-sensitive check;
                `true` - performs a case-insensitive check.>
            ]
        ]
) : ulongint|false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strpos()` 函数：<https://www.php.net/manual/en/function.strpos.php>
- PHP `stripos()` 函数：<https://www.php.net/manual/en/function.stripos.php>

#### 3.8.20) `strpbrk` 方法

在目标字符串中查找从一组字符的任何一个字符开始或结尾的子字符串。

**描述**

```php
$STR.strpbrk(
        <string $string>,
        <string $characters>
        [, <bool $case_insensitivity = false:
            `false` - performs a case-sensitive check;
            `true` - performs a case-insensitive check.>
        ]
) : string|false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strpbrk()` 函数：<https://www.php.net/manual/en/function.strpbrk.php>

#### 3.8.21) `split` 方法

将字符串按给定的长度切分成子字符串数组。

**描述**

```php
$STR.split(
        <string $string>
        [,
            <real $length = 1>
        ]
) : array
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `str_split()` 函数：<https://www.php.net/manual/en/function.str-split.php>

#### 3.8.22) `chunk_split` 方法

将字符串按给定的小块长度和分隔符切分，生成一个新的字符串。

**描述**

```php
$STR.chunk_split(
        <string $string>
        [,
            <real $length = 76>
            [,
                <string $separator = "\r\n">
            ]
        ]
) : string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `chunk_split()` 函数：<https://www.php.net/manual/en/function.chunk-split.php>

#### 3.8.23) `trim` 方法

删除字符串开头、结尾或两者处的空白字符（或其他字符）。

**描述**

```php
$STR.trim(
        <string $string>
        [,
            <string $position "left | right | both" = "both">
            [,
                <string $characters = " \n\r\t\v\x00">
            ]
        ]
): string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `trim()` 函数：<https://www.php.net/manual/en/function.trim.php>
- PHP `ltrim()` 函数：<https://www.php.net/manual/en/function.ltrim.php>
- PHP `rtrim()` 函数：<https://www.php.net/manual/en/function.rtrim.php>

#### 3.8.24) `pad` 方法

使用另一个字符串填充字符串为指定长度。

**描述**

```php
$STR.pad(
    <string $string>,
    <real $length>,
    [,
        <string $pad_string = " ">,
        [,
            <string $pad_type 'left | right | both' = 'right'>
        ]
    ]
): string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `str_pad()` 函数：<https://www.php.net/manual/en/function.str-pad.php>

#### 3.8.25) `repeat` 方法

重复一个字符串。

**描述**

```php
$STR.str_repeat(
        <string $string>,
        <real $times>
): string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `str_repeat()` 函数：<https://www.php.net/manual/en/function.str-repeat.php>

#### 3.8.26) `reverse` 方法

反转一个字符串。

**描述**

```php
$STR.strrev(
        <string $string>
): string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strrev()` 函数：<https://www.php.net/manual/en/function.strrev.php>

#### 3.8.27) `tokenize` 方法

使用给定的词元分隔符分隔字符串，返回分隔后的词元数组。

**描述**

```
$STR.tokenize(
        <string $string>,
        <string $delimiters>
): array
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strtok()` 函数：<https://www.php.net/manual/en/function.strtok.php>

#### 3.8.28) `translate` 方法

转换指定子字符串。

**描述**

```
$STR.translate(
    <string $string>,
    <string $from>,
    <string $to>
): string

$STR.translate(
    <string $string>,
    <object $from_to_pairs>,
): string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `strtr()` 函数：<https://www.php.net/manual/en/function.strtr.php>

#### 3.8.29) `bin2hex` 方法

二进制字符串转换为十六进制。

<https://www.php.net/manual/en/function.bin2hex.php>

**描述**

```php
$STR.bin2hex(
        <string $data>,
        <boolean $uppercase:
            `true` - use A...F;
            `false` - use a...f.
        >,
        <boolean $strict:
            `true` - throw the `BadEncoding` exception for a bad encoded string;
            `false` - stops conversion for any error and returns the converted string.
        >
): string
```

该函数将输入的二进制字符串 `data` 转换为十六进制字符串。

**参数**

**返回值**

**示例**

**参考链接**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.bin2hex.php>

#### 3.8.30) `hex2bin` 方法

十六进制字符串转换为二进制。

**描述**

```php
$STR.hex2bin(
        <string $data>,
        <boolean $strict:
            `true` - throw the `BadEncoding` exception for a bad encoded string;
            `false` - stops conversion for any error and returns the converted string.
        >
): string
```

该函数将输入的十六进制字符串 `data` 转换为二进制字符串。

**参数**

**返回值**

**示例**

**参考链接**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.hex2bin.php>

#### 3.8.31) `htmlentities_encode` 方法

转换字符为 HTML 实体。

**描述**

```php
$STR.htmlentities_encode(
        <string $string: The input string.>,
        <'[compat | quotes | noquotes] || [ignore | substitute | disallowed] || [html401 | xml1 | xhtml | html5]' $flags:
            'compat' - Will convert double-quotes and leave single-quotes alone.
            'quotes' - Will convert both double and single quotes.
            'noquotes' - Will leave both double and single quotes unconverted.
            'ignore' - Silently discard invalid code unit sequences instead of returning an empty string. Using this flag is discouraged.
            'substitute' - Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.
            'disallowed' - Replace invalid code points for the given document type with a Unicode Replacement Character U+FFFD or &#FFFD.
            'html401' - Handle code as HTML 4.01.
            'xml1' - Handle code as XML 1.
            'xhtml' - Handle code as XHTML.
            'html5' - Handle code as HTML 5.
        >
        [, <boolean $all = `false`:
            `false`- only the certain characters have special significance in HTML are translated into these entities.
            `true` - all characters which have HTML character entity equivalents are translated into these entities. >
            [, <boolean $double_encode = `true`:
                `true` - will convert everything.
                `false` - will not encode existing html entities.
            ]
        ]
) : string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `htmlentities()` 函数：<https://www.php.net/manual/en/function.htmlentities.php>
- PHP `htmlspecialchars()` 函数：<https://www.php.net/manual/en/function.htmlspecialchars.php>

#### 3.8.32) `htmlentities_decode` 方法

转换 HTML 实体为对应的字符。

**描述**

```php
$STR.htmlentities_decode(
        <string $string: The input string.>,
        <'[compat | quotes | noquotes] || substitute || [html401 | xml1 | xhtml | html5]' $flags:
            'compat' - Will convert double-quotes and leave single-quotes alone.
            'quotes' - Will convert both double and single quotes.
            'noquotes' - Will leave both double and single quotes unconverted.
            'substitute' - Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.
            'html401' - Handle code as HTML 4.01.
            'xml1' - Handle code as XML 1.
            'xhtml' - Handle code as XHTML.
            'html5' - Handle code as HTML 5.
        >
        [, <boolean $all = `false`:
            `false`- only the certain characters have special significance in HTML are translated into these entities.
            `true` - all characters which have HTML character entity equivalents are translated into these entities. >
        ]
): string | bseqence
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `htmlentities()` 函数：<https://www.php.net/manual/en/function.html-entity-decode.php>
- PHP `htmlspecialchars_decode()` 函数：<https://www.php.net/manual/en/function.htmlspecialchars-decode.php>

#### 3.8.33) `crc32` 方法

计算一个字符串或二进制序列的 CRC32 多项式。

**描述**

```php
$STR.crc32(
        < string | bsequence $data>
): ulongint
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `crc32()` 函数：<https://www.php.net/manual/en/function.crc32.php>

#### 3.8.34) `md5` 方法

计算一个字符串或者二进制序列的 MD5 散列值。

**描述**

```php
$STR.md5(
        < string | bsequence $data >,
        < boolean $binary = `false`:
            `true` - the md5 digest is returned as a binary sequence with a length of 16.
            `false` - the md5 digest is returned as a 32-character hexadecimal number.
        >
): string | bsequence
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `md5()` 函数：<https://www.php.net/manual/en/function.md5.php>

#### 3.8.35) `sha1` 方法

计算一个字符串或者二进制序列的 SHA1 散列值。

**描述**

```php
$STR.sha1(
        < string | bsequence $data >,
        < boolean $binary = `false`:
            `true` - the sha1 digest is returned in a raw binary sequence with a length of 20.
            `false` - the sha1 digest is returned as a 40-character hexadecimal number.
        >
): string | bsequence
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `sha1()` 函数：<https://www.php.net/manual/en/function.sha1.php>


#### 3.8.36) `rot13` 方法

对字符串执行 ROT13 转换。

**描述**

```php
$STR.rot13(
        <string $string>
): string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `rot13()` 函数：<https://www.php.net/manual/en/function.rot13.php>

#### 3.8.37) `count_chars` 方法

统计字符串中的字符出现次数。

**描述**

```php
$STR.count_chars(
        < string $string: the examined string. >
        [, < 'object | string' $mode = 'object':
            'object' - returns an object with the character as key and the frequency of every character as value.
            'string' - returns a string containing all unique characters. >
        ]
): object | string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

#### 3.8.38) `count_bytes` 方法

统计字符串或二进制字节序中的各个字节（0...255）出现的次数。

**描述**

```php
$STR.count_bytes(
        < string | bsequence $data: the examined data. >
        [, < 'object-all | object-appeared | object-not-appeared | string-appeared | string-not-appeared' $mode = 'object-all':
            'object-all' - returns an object with the byte-value as key and the frequency of every byte as value.
            'object-appeared' - same as 0 but only byte-values with a frequency greater than zero are listed.
            'object-not-appeared' - same as 0 but only byte-values with a frequency equal to zero are listed.
            'bytes-appeared' - a binary sequence containing all unique bytes is returned.
            'bytes-not-appeared' - a binary sequence containing all not used bytes is returned.
            >
        ]
) : object | bsequence
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

#### 3.8.39) `nl2br` 方法

在字符串所有换行符之前插入 HTML 换行标记。

**描述**

```php
$STR.nl2br(
        < string $string: the input string. >
        [, < boolean $is_xhtml = `true`:
            `true` - use '<br />'.
            `false` - use '<br>'.
        ]
        [, < boolean $lowercases = `true`:
            `true` - use 'br'.
            `false` - use 'BR'.
        ]
) : object | bsequence
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `nl2br()` 函数：<https://www.php.net/manual/en/function.nl2br.php>

#### 3.8.40) 错误与异常

在调用`STR` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `BadEncoding`：错误编码。

### 3.9) `URL`

#### 3.9.1) `base64_encode` 方法

使用 MIME base64 编码字符串或者字节序列。

<https://www.php.net/manual/en/function.base64-encode.php>

**描述**

```php
$URL.base64_encode(
        <string|bsequence $data>
): string
```

该函数将输入字符串或者二进制序列 `data` 按照 Base64 进行编码。

**参数**

**返回值**

**示例**

**参考链接**

- PHP `base64_encode()` 函数：<https://www.php.net/manual/en/function.base64-encode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.9.2) `base64_decode` 方法

解码使用 MIME base64 编码的字符串。

**描述**

```php
$URL.base64_decode(
        <string $data>,
        <boolean $utf8:
            `true` - decode the input Base64 string to a string.
            `false` - decode the input Base64 string to a binary sequence.
        >
        <boolean $strict:
            `true` - throw the `BadEncoding` exception for a bad encoded string;
            `false` - stops conversion for any error and returns the converted string.
        >
): string | bseqence
```

该函数将输入字符串 `data` 按照 Base64 进行解码。若 `utf8` 为 `true`，则按照 UTF-8 编码字符串进行解码，否则解码为一个二进制序列。若 `strict` 为 `true`，则遇到错误编码或者不正确的 UTF-8 字符时，会抛出 `BadEncoding` 异常；若 `strict` 为 `false`，将忽略错误停止解码并返回已经解码的字符串或二进制序列。

**参数**

**返回值**

**示例**

**参考链接**

- PHP `base64_decode()` 函数：<https://www.php.net/manual/en/function.base64-decode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.9.3) `urlencode` 方法

编码 URL 字符串。

**描述**

```php
$URL.urlencode(
        <string $str: the string to be encoded>
) : string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `urlencode()` 函数：<https://www.php.net/manual/en/function.urlencode.php>

#### 3.9.4) `urldecode` 方法

解码已编码的 URL 字符串。

**描述**

```php
$URL.urldecode(
        <string $str: the string to be decoded.>
): string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `urldecode()` 函数：<https://www.php.net/manual/en/function.urldecode.php>

#### 3.9.5) `rawurlencode` 方法

按照 RFC 3986 对 URL 进行编码。

**描述**

```php
$URL.rawurlencode(
        <string $str: the string to be encoded>
): string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `rawurlencode()` 函数：<https://www.php.net/manual/en/function.rawurlencode.php>

#### 3.9.6) `rawurldecode` 方法

对已编码的 URL 字符串进行解码。

**描述**

```php
$URL.rawurldecode(
        <string $str: the string to be decoded>
): string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `rawurldecode()` 函数：<https://www.php.net/manual/en/function.rawurldecode.php>

#### 3.9.7) `parse` 方法

解析 URL，返回其组成部分。


**描述**

```php
$URL.parse(
        <string $url: the URL to parse.>,
        [,
            <'all | [scheme || host || port || user || password || path || query || fragment]' $components = 'all': the components want to parse.>
        ]
) : object | string
```


**参数**

**返回值**

**示例**

**参考链接**

- PHP `parse()` 函数：<https://www.php.net/manual/en/function.parse-url.php>

#### 3.9.8) `http_build_query` 方法

生成 URL 编码的查询字符串。

**描述**

```php
$URL.http_build_query(
    < object | array $query_data >
    [, < string $numeric_prefix = '': the numeric prefix for the argument names if `query_data` is an array. >
        [, <string $arg_separator = '&': the character used to separate arguments. >
            [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
              'rfc1738' - encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.
              'rfc3986' - encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).
            ]
        ]
    ]
) : string
```



**参数**

**返回值**

**示例**

**参考链接**

- PHP `http_build_query()` 函数：<https://www.php.net/manual/en/function.http-build-query.php>
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)

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

在调用`MATH` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `ZeroDivision`：被零除错误。
- `Overflow`：计算时产生向上溢出错误。
- `Underflow`：计算时产生向下溢出错误。
- `InvalidFloat`：无效浮点数。

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
    dev_major: <ulongint: the major ID of device containing file>,
    dev_minor: <ulongint: the minor ID of device containing file>,
    inode: <ulongint: inode number>
    type: <string: file type like 'd', 'b', 's', ...>,
    mode_digits: <string: file mode like `0644`>,
    mode_alphas: <string: file mode like `rwxrwxr-x`>,
    nlink: <ulongint: number of hard links>,
    uid: <number: the user ID of owner>,
    gid: <number: the group ID of owner>,
    rdev_major: <ulongint: the major device ID if it is a special file>,
    rdev_minor: <ulongint: the minor device ID if it is a special file>,
    size: <ulongint: total size in bytes>,
    blksize: <ulongint: block size for filesystem I/O>,
    blocks: <ulongint: Number of 512B blocks allocated>,
    atime_sec: <ulongint: time of last acces (seconds since Epoch)>,
    atime_nsec: <ulongint: time of last acces (nanoseconds since `atime_sec`)>,
    mtime_sec: <ulongint: time of last modification (seconds since Epoch)>,
    mtime_nsec: <ulongint: time of last modification (nanoseconds since `mtime_sec`)>,
    ctime_sec: <ulongint: time of last status change (seconds since Epoch)>
    ctime_nsec: <ulongint: time of last status change (nanoseconds since `ctime_sec`)>
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

#### 4.2.3) `basename` 方法

返回路径中的尾部名称。

**描述**

```php
$FS.basename(
        <string $path: a path.>
        [,
            <string $suffix = '': if the name component ends in `suffix` this will also be cut off.>
        ]
) : string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `basename()` 函数：<https://www.php.net/manual/en/function.basename.php>

#### 4.2.4) `chgrp` 方法

改变文件的所有者组。

**描述**

```php
$FS.chgrp(
        <string $filename: path to the file.>,
        <string | number $group: A group name or a group identifier.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `chgrp()` 函数：<https://www.php.net/manual/en/function.chgrp.php>

#### 4.2.5) `chmod` 方法

改变文件的访问许可。

**描述**

```php
$FS.chmod(
        <string $filename: path to the file.>,
        <string $permissions: the permission string like '0644' or 'u+rwx,go+rx'.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `chmod()` 函数：<https://www.php.net/manual/en/function.chmod.php>

#### 4.2.6) `chown` 方法

改变文件的所有者用户。

**描述**

```php
$FS.chown(
        <string $filename: path to the file.>,
        <string | number $user: A user name or a user identifier.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `chown()` 函数：<https://www.php.net/manual/en/function.chown.php>

#### 4.2.7) `copy` 方法

复制文件。

**描述**

```php
$FS.copy(
        <string $from: path to the source file.>,
        <string $to: The destination path.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `copy()` 函数：<https://www.php.net/manual/en/function.copy.php>

#### 4.2.8) `dirname` 方法

返回父目录的路径。

**描述**

```php
$FS.dirname(
        <string $path: a path.>
        [,
            <real $levels = 1: The number of parent directories to go up.>
        ]
) : string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `dirname()` 函数：<https://www.php.net/manual/en/function.dirname.php>

#### 4.2.9) `disk_usage` 方法

返回文件系统的磁盘使用情况。

**描述**

```php
$FS.disk_usage(
        <string $directory: A directory of the filesystem or disk partition.>
) : object
```

**参数**

**返回值**

返回值为如下所示对象：

```php
{
    free_blocks: <ulongint>,
    free_inodes: <ulongint>,

    total_blocks: <ulongint>,
    total_inodes: <ulongint>,

    mount_point: <string: the mount point of the file system>,
    dev_majar: <ulongint: the majar device ID>,
    dev_minor: <ulongint: the minor device ID>,
}
```

**示例**

**参考链接**

- PHP `disk_free_space()` 函数：<https://www.php.net/manual/en/function.disk-free-space.php>
- PHP `disk_total_space()` 函数：<https://www.php.net/manual/en/function.disk-total-space.php>

#### 4.2.10) `file_exists` 方法

判断一个文件或目录是否存在。

**描述**

```php
$FS.file_exists(
        <string $filename: path to the file or directory.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `file_exists()` 函数：<https://www.php.net/manual/en/function.file-exists.php>

#### 4.2.11) `file_is` 方法

判断一个文件名是否为指定的类型。

**描述**

```php
$FS.file_is(
        <string $filename: the path to a file or directory.>
        <'[ dir | file | symlink | socket | pipe | block | char ] || [ executable | exe ] || [readable | read] || [writable write]' $which = 'file readable':
            'dir' - a directory.
            'file' - a regular file.
            'symlink' - a symbolic link.
            'socket' - a unix socket file.
            'pipe' - a named pipe file or just a pipe file.
            'block' - a block device file.
            'char' - a character device file.
            'executable'/'exe' - is executable.
            'readable'/'read' - is readable.
            'writable'/'write' - is writable. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `is_dir()` 函数：<https://www.php.net/manual/en/function.is_dir.php>
- PHP `is_file()` 函数：<https://www.php.net/manual/en/function.is_file.php>
- PHP `is_link()` 函数：<https://www.php.net/manual/en/function.is_link.php>
- PHP `is_executable()` 函数：<https://www.php.net/manual/en/function.is_executable.php>
- PHP `is_readable()` 函数：<https://www.php.net/manual/en/function.is_readable.php>
- PHP `is_writable()` 函数：<https://www.php.net/manual/en/function.is_writable.php>

#### 4.2.12) `lchgrp` 方法

改变符号链接的所有者组。

**描述**

```php
$FS.lchgrp(
        <string $filename: path to the symlink.>,
        <string | number $group: A group name or a group identifier.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `lchgrp()` 函数：<https://www.php.net/manual/en/function.lchgrp.php>

#### 4.2.13) `lchown` 方法

改变符号链接的所有者用户。

**描述**

```php
$FS.lchown(
        <string $filename: path to the symlink.>,
        <string | number $user: A user name or a user identifier.>
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `lchown()` 函数：<https://www.php.net/manual/en/function.lchown.php>

#### 4.2.14) `linkinfo` 方法

获取链接信息。

**描述**

```php
$FS.linkinfo(
        <string $path: path to the link.>
) : number | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `linkinfo()` 函数：<https://www.php.net/manual/en/function.linkinfo.php>

#### 4.2.15) `lstat` 方法

获取一个文件或符号链接的统计信息。

**描述**

```php
$FS.lstat(
        <string $filename: path to the file or directory.>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - returns ID of device containing the file;
            'inode' - returns inode number;
            'type' - returns file type like 'd', 'b', 's', ...;
            'mode_digits' - returns file mode like `0644`;
            'mode_alphas' - returns file mode like `rwxrwxr-x`;
            'nlink' - returns number of hard links;
            'uid' - returns the user ID of owner;
            'gid' - returns the group ID of owner;
            'rdev' - returns the device ID if it is a special file;
            'size' - returns total size in bytes;
            'blksize' - returns block size for filesystem I/O;
            'blocks' - returns number of 512B blocks allocated;
            'atime' - returns time of last acces;
            'mtime' - returns time of last modification;
            'ctime' - returns time of last status change;
            'all' - returns all above information;
            'default' - 'type mode_digits uid gid size rdev ctime';
            >
        ]
) : object
```

**参数**

**返回值**

结果由如下对象或其部分表达：

```javascript
{
    dev_major: <ulongint: the major ID of device containing file>,
    dev_minor: <ulongint: the minor ID of device containing file>,
    inode: <ulongint: inode number>
    type: <string: file type like 'd', 'b', 's', ...>,
    mode_digits: <string: file mode like `0644`>,
    mode_alphas: <string: file mode like `rwxrwxr-x`>,
    nlink: <number: number of hard links>,
    uid: <numer: the user ID of owner>,
    gid: <number: the group ID of owner>,
    rdev_major: <ulongint: the major device ID if it is a special file>,
    rdev_minor: <ulongint: the minor device ID if it is a special file>,
    size: <ulongint: total size in bytes>,
    blksize: <ulongint: block size for filesystem I/O>,
    blocks: <ulongint: number of 512B blocks allocated>,
    atime_sec: <ulongint: time of last acces (seconds since Epoch)>,
    atime_nsec: <ulongint: time of last acces (nanoseconds since `atime_sec`)>,
    mtime_sec: <ulongint: time of last modification (seconds since Epoch)>,
    mtime_nsec: <ulongint: time of last modification (nanoseconds since `mtime_sec`)>,
    ctime_sec: <ulongint: time of last status change (seconds since Epoch)>
    ctime_nsec: <ulongint: time of last status change (nanoseconds since `ctime_sec`)>
}
```

**示例**

**参考链接**

- PHP `lstat()` 函数：<https://www.php.net/manual/en/function.lstat.php>

#### 4.2.16) `link` 方法

创建硬链接。

**描述**

```php
$FS.link(
        < string $target: Target of the link. >,
        < string $link: The link name. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `link()` 函数：<https://www.php.net/manual/en/function.link.php>

#### 4.2.17) `mkdir` 方法

创建目录。

**描述**

```php
$FS.mkdir(
        < string $directory: The directory path. >
        [, < string $permissions = '0777': The permissions are '0777' by default, which means the widest possible access. >
            [, < boolean $recursive = `false`: Allows the creation of nested directories specified in `directory`. >
            ]
        ]
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `mkdir()` 函数：<https://www.php.net/manual/en/function.mkdir.php>

#### 4.2.18) `pathinfo` 方法

获取文件路径信息。

**描述**

```php
$FS.pathinfo(
        < string $path: The path to be parsed. >
        [,
            < '[dirname || basename || extension || filename] | all' $flags = 'all': Specifies the elements to be returned.
            >
        ]
) : object | string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `pathinfo()` 函数：<https://www.php.net/manual/en/function.pathinfo.php>

#### 4.2.19) `readlink` 方法

读取符号链接的内容。

**描述**

```php
$FS.readlink(
        < string $path: The symbolic link path. >
) : string | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `readlink()` 函数：<https://www.php.net/manual/en/function.readlink.php>

#### 4.2.20) `realpath` 方法

返回规范化的绝对路径名。

**描述**

```php
$FS.realpath(
        < string $path: The path being checked. >
) : string | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `realpath()` 函数：<https://www.php.net/manual/en/function.realpath.php>

#### 4.2.21) `rename` 方法

重命名文件或目录。

**描述**

```php
$FS.rename(
        < string $from: The old name. >
        < string $to: The new name. >
) : string | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `rename()` 函数：<https://www.php.net/manual/en/function.rename.php>

#### 4.2.22) `rmdir` 方法

移除目录。

**描述**

```php
$FS.rmdir(
        < string $directory: The directory path. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `rmdir()` 函数：<https://www.php.net/manual/en/function.rmdir.php>

#### 4.2.23) `stat` 方法

获取一个文件的统计信息。

**描述**

```php
$FS.stat(
        <string $filename: path to the file or directory.>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - returns ID of device containing the file;
            'inode' - returns inode number;
            'type' - returns file type like 'd', 'b', 's', ...;
            'mode_digits' - returns file mode like `0644`;
            'mode_alphas' - returns file mode like `rwxrwxr-x`;
            'nlink' - returns number of hard links;
            'uid' - returns the user ID of owner;
            'gid' - returns the group ID of owner;
            'rdev' - returns the device ID if it is a special file;
            'size' - returns total size in bytes;
            'blksize' - returns block size for filesystem I/O;
            'blocks' - returns number of 512B blocks allocated;
            'atime' - returns time of last acces;
            'mtime' - returns time of last modification;
            'ctime' - returns time of last status change;
            'all' - returns all above information;
            'default' - 'type mode_digits uid gid size rdev ctime';
            >
        ]
) : object
```

**参数**

**返回值**

结果由如下对象或其部分表达：

```javascript
{
    dev_major: <ulongint: the major ID of device containing file>,
    dev_minor: <ulongint: the minor ID of device containing file>,
    inode: <ulongint: inode number>
    type: <string: file type like 'd', 'b', 's', ...>,
    mode_digits: <string: file mode like `0644`>,
    mode_alphas: <string: file mode like `rwxrwxr-x`>,
    nlink: <ulongint: number of hard links>,
    uid: <ulongint: the user ID of owner>,
    gid: <ulongint: the group ID of owner>,
    rdev_major: <ulongint: the major device ID if it is a special file>,
    rdev_minor: <ulongint: the minor device ID if it is a special file>,
    size: <ulongint: total size in bytes>,
    blksize: <ulongint: block size for filesystem I/O>,
    blocks: <ulongint: Number of 512B blocks allocated>,
    atime_sec: <ulongint: time of last acces (seconds since Epoch)>,
    atime_nsec: <ulongint: time of last acces (nanoseconds since `atime_sec`)>,
    mtime_sec: <ulongint: time of last modification (seconds since Epoch)>,
    mtime_nsec: <ulongint: time of last modification (nanoseconds since `mtime_sec`)>,
    ctime_sec: <ulongint: time of last status change (seconds since Epoch)>
    ctime_nsec: <ulongint: time of last status change (nanoseconds since `ctime_sec`)>
}
```

**示例**

**参考链接**

- PHP `stat()` 函数：<https://www.php.net/manual/en/function.stat.php>

#### 4.2.24) `symlink` 方法

创建符号链接。

**描述**

```php
$FS.link(
        < string $target: Target of the link. >,
        < string $link: The link name. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `symlink()` 函数：<https://www.php.net/manual/en/function.symlink.php>

#### 4.2.25) `tempname` 方法

生成唯一的临时文件名称。

**描述**

```php
$FS.tempname(
        < string $directory: The directory where the temporary filename will be created. >
        < string $prefix: The prefix of the generated temporary filename. >
) : string | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `tempname()` 函数：<https://www.php.net/manual/en/function.tempname.php>


#### 4.2.26) `touch` 方法

设置文件的访问和更新时间。

**描述**

```php
$FS.touch(
        < string $filename: Path to the file. >
        [, <real $mtime = 0: The modification time, if it is 0 or negative, use the current system time. >
            [, <real $atime = 0: The access time, if it is 0 or negative, use `mtime`. > ]
        ]
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `touch()` 函数：<https://www.php.net/manual/en/function.touch.php>

#### 4.2.27) `umask` 方法

改变当前 umask 值。

**描述**

```php
$FS.umask(
        [ string $mask = '': The new umask. ]
) : string
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `umask()` 函数：<https://www.php.net/manual/en/function.umask.php>

#### 4.2.28) `unlink` 方法

移除硬链接。

**描述**

```php
$FS.unlink(
        < string $filename: Path to the file. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `unlink()` 函数：<https://www.php.net/manual/en/function.unlink.php>

#### 4.2.29) `file_get_contents` 方法

从文件中读取整个内容。

**描述**

```php
$FS.file_get_contents(
        < string $filename: Path to the file. >
        < '[binary | string] || [strict | silent]': $flags:
            `binary` - reads the contents as a byte sequence.
            `string` - reads the contents as a string in UTF-8.
            `strict` - throw the `BadEncoding` exception for a bad encoded string.
            `silent` - stops reading for any error and returns the read data.
        >
        [, <longint $offset = 0: The offset where the reading starts. Negative offsets count from the end of the file.>
            [, <ulongint $length = 0: Maximum length of data read. The default is to read until end of file is reached. >
            ]
        ]
) : string | bsequence | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `file_get_contents()` 函数：<https://www.php.net/manual/en/function.file-get-contents.php>

#### 4.2.30) `file_put_contents` 方法

从文件中读取整个内容。

**描述**

```php
$FS.file_put_contents(
        < string $filename: Path to the file. >
        < string | bsequenc $data: The data to write, can be either a string or a byte sequence.
        < '[append || lock': $flags:
            `append` - if file `filename` already exists, append the data to the file instead of overwriting it.
            `lock` - acquires an exclusive lock on the file while proceeding to the writing.
        >
) : ulongint | false
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `file_put_contents()` 函数：<https://www.php.net/manual/en/function.file-put-contents.php>

#### 4.2.31) `opendir` 方法

打开一个目录。

**描述**

```php
$FS.opendir(
        < string $pathname: Path to the directory. >
) : specific
```

**参数**

**返回值**

一个原生实体，可用于 `readdir` 或者 `rewinddir` 方法。

**示例**

**参考链接**

- PHP `opendir()` 函数：<https://www.php.net/manual/en/function.opendir.php>

#### 4.2.32) `readdir` 方法

读取下一个目录项。

**描述**

```php
$FS.readdir(
        < specific $dir: an entity returned by opendir. >
) : object | false
```

**参数**

**返回值**

如果正确读取了下一个目录项，则返回如下对象：

```php
{
    type: <string: file type like 'd' (directory), 'b' (block device), 'c' (character device), 'p' (named pipe, FIFO), 's' (UNIX domain socket), 'r' (regular file), 'l' (symbolic link), 'u' (unknown)>,
    name: <string: the file name>,
    inode: <ulongint: inode number>,
}
```

**示例**

**参考链接**

- PHP `readdir()` 函数：<https://www.php.net/manual/en/function.readdir.php>

#### 4.2.33) `rewinddir` 方法

重置目录流。

**描述**

```php
$FS.rewinddir(
        < specific $dir: an entity returned by opendir. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `rewinddir()` 函数：<https://www.php.net/manual/en/function.rewinddir.php>

#### 4.2.34) `closedir` 方法

关闭一个目录。

**描述**

```php
$FS.closedir(
        < specific $dir: an entity returned by opendir. >
) : boolean
```

**参数**

**返回值**

**示例**

**参考链接**

- PHP `closedir()` 函数：<https://www.php.net/manual/en/function.closedir.php>

#### 4.2.35) 错误与异常

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

### 附.1) 修订记录

#### RC1) 220301

#### BRC) 220201

1. 移除了 `$STR.strlen` 方法。
1. 变更了 `$STR.implode`、`$STR.explode` 方法的接口。
1. `$STR.strcat` 方法更名为 `$STR.join`，并增强了接口。
1. `$STR.upper` 方法更名为 `$STR.toupper`。
1. `$STR.lower` 方法更名为 `$STR.tolower`。
1. 为 `$STR` 新增大量方法。
1. 调整了 `$FS.list` 方法的返回对象格式。
1. 新增 `$URL` 动态对象及其方法。
1. 为 `$FS` 新增大量方法。

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

