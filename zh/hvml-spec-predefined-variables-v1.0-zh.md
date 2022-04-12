# HVML 预定义变量

Subject: HVML Predefined Variables  
Version: 1.0-RC1  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: Nov. 1, 2021  
Last Modified Date: Apr. 1, 2022  
Status: Release Candidate  
ReleaseName: 硕鼠  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2021, 2022 北京飞漫软件技术有限公司  
保留所有权利

此文档不受 HVML 相关软件开源许可证的管辖。

飞漫软件公开此文档的目标，用于向开发者解释 HVML 相关设计原理或者相关规范。在未获得飞漫软件书面许可之前，任何人不得复制或者分发本文档的全部或部分内容，或利用本文档描绘的技术思路申请专利、撰写学术论文等。

本文提及的飞漫软件或其合作伙伴的注册商标或商标之详细列表，请查阅文档末尾。

**目录**

[//]:# (START OF TOC)

- [1) 介绍](#1-介绍)
   + [1.1) 规范及术语](#11-规范及术语)
   + [1.2) 二进制格式表示法](#12-二进制格式表示法)
   + [1.3) 格式化修饰符](#13-格式化修饰符)
   + [1.4) 撰写要求](#14-撰写要求)
- [2) 非动态变量](#2-非动态变量)
   + [2.1) `TIMERS`](#21-timers)
      * [2.1.1) 批量新增定时器](#211-批量新增定时器)
      * [2.1.2) 新增一个定时器](#212-新增一个定时器)
      * [2.1.3) 移除一个定时器](#213-移除一个定时器)
      * [2.1.4) 修改特定定时器的属性](#214-修改特定定时器的属性)
   + [2.2) `REQUEST`](#22-request)
- [3) 必要动态变量](#3-必要动态变量)
   + [3.1) `SYSTEM`](#31-system)
      * [3.1.1) `const` 方法](#311-const-方法)
      * [3.1.2) `uname` 方法](#312-uname-方法)
      * [3.1.3) `uname_prt` 方法](#313-uname_prt-方法)
      * [3.1.4) `locale` 方法](#314-locale-方法)
      * [3.1.5) `time` 方法](#315-time-方法)
      * [3.1.6) `time_us` 方法](#316-time_us-方法)
      * [3.1.7) `timezone` 方法](#317-timezone-方法)
      * [3.1.8) `cwd` 方法](#318-cwd-方法)
      * [3.1.9) `env` 方法](#319-env-方法)
      * [3.1.10) `random_sequence` 方法](#3110-random_sequence-方法)
      * [3.1.11) `random` 方法](#3111-random-方法)
   + [3.2) `SESSION`](#32-session)
      * [3.2.1) `user_obj` 静态属性](#321-user_obj-静态属性)
      * [3.2.2) `user` 方法](#322-user-方法)
   + [3.3) `DATETIME`](#33-datetime)
      * [3.3.1) `time_prt` 方法](#331-time_prt-方法)
      * [3.3.2) `utctime` 方法](#332-utctime-方法)
      * [3.3.3) `localtime` 方法](#333-localtime-方法)
      * [3.3.4) `mktime` 方法](#334-mktime-方法)
      * [3.3.5) `fmttime` 方法](#335-fmttime-方法)
      * [3.3.6) `fmtbdtime` 方法](#336-fmtbdtime-方法)
   + [3.4) `HVML`](#34-hvml)
      * [3.4.1) `base` 方法](#341-base-方法)
      * [3.4.2) `max_iteration_count` 方法](#342-max_iteration_count-方法)
      * [3.4.3) `max_recursion_depth` 方法](#343-max_recursion_depth-方法)
      * [3.4.4) `max_embedded_levels` 方法](#344-max_embedded_levels-方法)
      * [3.4.5) `timeout` 方法](#345-timeout-方法)
   + [3.5) `DOC`](#35-doc)
      * [3.5.1) `doctype` 方法](#351-doctype-方法)
      * [3.5.2) `query` 方法](#352-query-方法)
   + [3.6) `EJSON`](#36-ejson)
      * [3.6.1) `type` 方法](#361-type-方法)
      * [3.6.2) `count` 方法](#362-count-方法)
      * [3.6.3) `numberify` 方法](#363-numberify-方法)
      * [3.6.4) `booleanize` 方法](#364-booleanize-方法)
      * [3.6.5) `stringify` 方法](#365-stringify-方法)
      * [3.6.6) `serialize` 方法](#366-serialize-方法)
      * [3.6.7) `sort` 方法](#367-sort-方法)
      * [3.6.8) `shuffle` 方法](#368-shuffle-方法)
      * [3.6.9) `compare` 方法](#369-compare-方法)
      * [3.6.10) `parse` 方法](#3610-parse-方法)
      * [3.6.11) `isequal` 方法](#3611-isequal-方法)
      * [3.6.12) `fetchstr` 方法](#3612-fetchstr-方法)
      * [3.6.13) `fetchreal` 方法](#3613-fetchreal-方法)
      * [3.6.14) `crc32` 方法](#3614-crc32-方法)
      * [3.6.15) `md5` 方法](#3615-md5-方法)
      * [3.6.16) `sha1` 方法](#3616-sha1-方法)
      * [3.6.17) `pack` 方法](#3617-pack-方法)
      * [3.6.18) `unpack` 方法](#3618-unpack-方法)
      * [3.6.19) `bin2hex` 方法](#3619-bin2hex-方法)
      * [3.6.20) `hex2bin` 方法](#3620-hex2bin-方法)
      * [3.6.21) `base64_encode` 方法](#3621-base64_encode-方法)
      * [3.6.22) `base64_decode` 方法](#3622-base64_decode-方法)
   + [3.7) `L`](#37-l)
      * [3.7.1) `not` 方法](#371-not-方法)
      * [3.7.2) `and` 方法](#372-and-方法)
      * [3.7.3) `or` 方法](#373-or-方法)
      * [3.7.4) `xor` 方法](#374-xor-方法)
      * [3.7.5) `eq` 方法](#375-eq-方法)
      * [3.7.6) `ne` 方法](#376-ne-方法)
      * [3.7.7) `gt` 方法](#377-gt-方法)
      * [3.7.8) `ge` 方法](#378-ge-方法)
      * [3.7.9) `lt` 方法](#379-lt-方法)
      * [3.7.10) `le` 方法](#3710-le-方法)
      * [3.7.11) `streq` 方法](#3711-streq-方法)
      * [3.7.12) `strne` 方法](#3712-strne-方法)
      * [3.7.13) `strgt` 方法](#3713-strgt-方法)
      * [3.7.14) `strge` 方法](#3714-strge-方法)
      * [3.7.15) `strlt` 方法](#3715-strlt-方法)
      * [3.7.16) `strle` 方法](#3716-strle-方法)
      * [3.7.17) `eval` 方法](#3717-eval-方法)
   + [3.8) `T`](#38-t)
      * [3.8.1) `map` 静态属性](#381-map-静态属性)
      * [3.8.2) `get` 方法](#382-get-方法)
   + [3.9) `STR`](#39-str)
      * [3.9.1) `contains` 方法](#391-contains-方法)
      * [3.9.2) `starts_with` 方法](#392-starts_with-方法)
      * [3.9.3) `ends_with` 方法](#393-ends_with-方法)
      * [3.9.4) `explode` 方法](#394-explode-方法)
      * [3.9.5) `implode` 方法](#395-implode-方法)
      * [3.9.6) `shuffle` 方法](#396-shuffle-方法)
      * [3.9.7) `replace` 方法](#397-replace-方法)
      * [3.9.8) `format_c` 方法](#398-format_c-方法)
      * [3.9.9) `scan_c` 方法](#399-scan_c-方法)
      * [3.9.10) `format_p` 方法](#3910-format_p-方法)
      * [3.9.11) `scan_p` 方法](#3911-scan_p-方法)
      * [3.9.12) `join` 方法](#3912-join-方法)
      * [3.9.13) `nr_chars` 方法](#3913-nr_chars-方法)
      * [3.9.14) `tolower` 方法](#3914-tolower-方法)
      * [3.9.15) `toupper` 方法](#3915-toupper-方法)
      * [3.9.16) `substr` 方法](#3916-substr-方法)
      * [3.9.17) `substr_compare` 方法](#3917-substr_compare-方法)
      * [3.9.18) `substr_count` 方法](#3918-substr_count-方法)
      * [3.9.19) `substr_replace` 方法](#3919-substr_replace-方法)
      * [3.9.20) `strstr` 方法](#3920-strstr-方法)
      * [3.9.21) `strpos` 方法](#3921-strpos-方法)
      * [3.9.22) `strpbrk` 方法](#3922-strpbrk-方法)
      * [3.9.23) `split` 方法](#3923-split-方法)
      * [3.9.24) `chunk_split` 方法](#3924-chunk_split-方法)
      * [3.9.25) `trim` 方法](#3925-trim-方法)
      * [3.9.26) `pad` 方法](#3926-pad-方法)
      * [3.9.27) `repeat` 方法](#3927-repeat-方法)
      * [3.9.28) `reverse` 方法](#3928-reverse-方法)
      * [3.9.29) `tokenize` 方法](#3929-tokenize-方法)
      * [3.9.30) `translate` 方法](#3930-translate-方法)
      * [3.9.31) `htmlentities_encode` 方法](#3931-htmlentities_encode-方法)
      * [3.9.32) `htmlentities_decode` 方法](#3932-htmlentities_decode-方法)
      * [3.9.33) `nl2br` 方法](#3933-nl2br-方法)
      * [3.9.34) `rot13` 方法](#3934-rot13-方法)
      * [3.9.35) `count_chars` 方法](#3935-count_chars-方法)
      * [3.9.36) `count_bytes` 方法](#3936-count_bytes-方法)
   + [3.10) `URL`](#310-url)
      * [3.10.1) `encode` 方法](#3101-encode-方法)
      * [3.10.2) `decode` 方法](#3102-decode-方法)
      * [3.10.3) `build_query` 方法](#3103-build_query-方法)
      * [3.10.4) `parse_query` 方法](#3104-parse_query-方法)
      * [3.10.5) `parse` 方法](#3105-parse-方法)
      * [3.10.6) `assemble` 方法](#3106-assemble-方法)
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
      * [4.2.29) `file_contents` 方法](#4229-file_contents-方法)
      * [4.2.30) `opendir` 方法](#4230-opendir-方法)
      * [4.2.31) `readdir` 方法](#4231-readdir-方法)
      * [4.2.32) `rewinddir` 方法](#4232-rewinddir-方法)
   + [4.3) `FILE`](#43-file)
      * [4.3.1) 文本文件](#431-文本文件)
         - [4.3.1.1) `txt.head` 方法](#4311-txthead-方法)
         - [4.3.1.2) `txt.tail` 方法](#4312-txttail-方法)
      * [4.3.2) 二进制文件](#432-二进制文件)
         - [4.3.2.1) `bin.head` 方法](#4321-binhead-方法)
         - [4.3.2.2) `bin.tail` 方法](#4322-bintail-方法)
   + [4.4) `STREAM`](#44-stream)
      * [4.4.1) `stdin` 静态属性](#441-stdin-静态属性)
      * [4.4.2) `stdout` 静态属性](#442-stdout-静态属性)
      * [4.4.3) `stderr` 静态属性](#443-stderr-静态属性)
      * [4.4.4) `open` 方法](#444-open-方法)
      * [4.4.5) `readstruct` 方法](#445-readstruct-方法)
      * [4.4.6) `writestruct` 方法](#446-writestruct-方法)
      * [4.4.7) `readlines` 方法](#447-readlines-方法)
      * [4.4.8) `writelines` 方法](#448-writelines-方法)
      * [4.4.9) `readbytes` 方法](#449-readbytes-方法)
      * [4.4.10) `writebytes` 方法](#4410-writebytes-方法)
      * [4.4.11) `seek` 方法](#4411-seek-方法)
      * [4.4.12) 综合示例](#4412-综合示例)
- [附录](#附录)
   + [附.1) 修订记录](#附1-修订记录)
      * [RC2) 220501](#rc2-220501)
      * [RC1) 220401](#rc1-220401)
      * [BRC) 220201](#brc-220201)
   + [附.2) 贡献者榜单](#附2-贡献者榜单)
   + [附.3) 废弃的内容](#附3-废弃的内容)
      * [`const_obj` 静态属性](#const_obj-静态属性)
   + [附.3) 商标声明](#附3-商标声明)

[//]:# (END OF TOC)

## 1) 介绍

本文档是 HVML 规范的一部分，用于详细定义 HVML 解释器必须支持或者可选支持的预定义变量。

### 1.1) 规范及术语

本文档遵循的技术规范或术语如下所列：

- HVML（Hybrid Virtual Markup Language），是飞漫软件提出的一种数据驱动的可编程标记语言。[HVML 规范](hvml-spec-v1.0-zh.md) 的如下部分和本文档相关：
  1. 2.1) 术语及基本原理
  1. 2.2) 规则、表达式及方法的描述语法
- 解释器（interpreter），指解析并运行 HVML 程序的计算机软件。
- 渲染器（renderer），指渲染 HVML 程序生成的目标文档并和用户交互的计算机软件。
- 会话（session），指一个解释器实例的上下文信息；每个解释器实例对应一个 HVML 会话，每个 HVML 会话运行多个 HVML 程序，对应渲染器中的多个窗口。
- 静态属性（static property），指一个对象上键值为普通数据的属性，其键值不是动态值。
- 方法（method），指一个对象上键值为动态值的属性。
- 获取器（getter），指一个方法的获取器。调用获取器返回该方法的动态属性值。
- 设置器（setter），指一个方法的设置器。调用特定方法的设置器，将完成对应属性的设置工作。

按是否含有动态对象划分，HVML 程序中的预定义变量可分为：

1. 非动态变量，即变量对应的数据不提供动态方法。所有本规范定义的非动态变量都是内置（built-in）且必要的（required）。
1. 动态变量，即变量对应的数据提供动态方法。动态变量又分为必要（required）动态变量及可选（optional）动态变量。通常，动态变量可设计为可加载的（loadable）共享库或者模块。解释器应根据本文档的要求将动态变量实现为内置的或可加载的；可选动态变量是否实现为可加载的，由解释器决定。

按变量对应数据的作用域，可分为：

1. 全局级变量。指该变量对应的数据对当前系统中的所有解释器实例可见。也就是说，同一系统中的不同解释器实例对应同一个数据副本。
1. 会话级变量。指该变量对应的数据对当前解释器实例中的所有 HVML 程序可见。也就是说，同一会话中的不同程序对应同一个数据副本。
1. 程序级变量。指该变量对应的数据仅对当前解释器实例中的单个 HVML 程序可见。也就是说，不同的 HVML 程序有一个自己的数据副本。

**约定**  
解释器可自行实现全局变量，作为约定，解释器自行实现的全局变量，其名称应以 ASCII U+005F LOW LINE（`_`）打头，使用全大写字母并添加解释器前缀。如 `_PURC_VAR`。而一般的变量，使用全小写字母。

### 1.2) 二进制格式表示法

为配合 STREAM 要求的流式读写方法（`readstruct`、`writestruct`）以及字节序列的数值化，我们定义了一种二进制格式表示法。

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

`TIMERS` 是一个程序级内置变量。该变量是一个对象集合（对象的 `id` 属性做唯一性键值）。

用于描述一个定时器对象的属性如下：

```js
{
    'id': <string: `the timer identifier, the key with unique restriction`>,
    'interval': <string: `the interval of the timer in milliseconds`>,
    'active': <string: `activated or not`>
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

`REQUEST` 是一个程序级内置变量。该变量用来保存装载一个 HVML 程序时传递给该程序的请求参数，以对象形式保存。

比如下面的 Python 脚本装载一个 HVML 程序，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在 HVML 程序中，我们可使用 `$REQUEST.nrUsers` 或 `$REQUEST['nrUsers']` 来引用上述脚本代码传入的数值（`10`）。

## 3) 必要动态变量

### 3.1) `SYSTEM`

该变量是一个全局级内置变量，需要注意如下实现要求：

- `$SYSTEM` 的实现应考虑多线程（解释器以进程方式运行，每个解释器实例对应一个线程）情形下的公共资源访问保护。
- 在一个会话中调用 `$SYSTEM` 的设置器方法，可能产生 `change` 事件，解释器应该将该事件广播到所有会话中。

#### 3.1.1) `const` 方法

获取系统常量。

**描述**

```js
$SYSTEM.const(
        <string $name: `the constant name`>
) any : `the constant value`
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
$SYSTEM.const('HVML_SPEC_VERSION')
    // string: '1.0'
```

#### 3.1.2) `uname` 方法

获取系统信息。

**描述**

```js
$SYSTEM.uname object :
    `an object contains the following properties:`
        - 'kernel-name':        < string: `kernel name (e.g., 'Linux')` >
        - 'kernel-release':     < string: `kernel release (e.g., '2.6.28')` >
        - 'kernel-version':     < string: `kernel version` >
        - 'nodename':           < string: `the network node hostname` >
        - 'machine':            < string: `machine hardware name` >
        - 'processor':          < string: `the processor type` >
        - 'hardware-platform':  < string: `the hardware platform` >
        - 'operating-system':   < string: `the operating system (e.g., 'GNU/Linux')` >
```

该方法获取系统信息，返回包含有内核名称、版本号等键值对的对象。注意，对某些不支持的系统特征，将返回空字符串。

**异常**

（无）

**示例**

```js
$SYSTEM.uname
    /* object:
       {
            'kernel-name':      'Linux',
            'kernel-release':   '5.4.0-99-generic',
            'kernel-version':   '#112-Ubuntu SMP Thu Feb 3 13:50:55 UTC 2022',
            'nodename':         'magicBook',
            'machine':          'x86_64',
            'processor':        'x86_64',
            'hardware-platform':'x86_64',
            'operating-system': 'GNU/Linux'
       }
    */
```

#### 3.1.3) `uname_prt` 方法

获取可打印的系统信息。

**描述**

```js
$SYSTEM.uname_prt string: `the kernel name.`
```

该方法获取内核名称，返回字符串。

```js
$SYSTEM.uname_prt(
        <'[kernel-name || kernel-release || kernel-version || nodename || machine || processor || hardware-platform || operating-system] | all | default' $which = 'default':
            - 'kernel-name':        `includes kernel name (e.g., 'Linux')`
            - 'kernel-release':     `includes kernel release (e.g., '2.6.28')`
            - 'kernel-version':     `includes kernel version`
            - 'nodename':           `includes the network node hostname`
            - 'machine':            `includes machine hardware name`
            - 'processor':          `includes the processor type`
            - 'hardware-platform':  `includes the hardware platform`
            - 'operating-system':   `includes the operating system (e.g., 'GNU/Linux')`
            - 'all':                `includes all parts`
            - 'default':            `is equivalent to 'kernel-name'`
        >
) string: `the string concatenated the desired system information parts together.`
```

该方法返回多个指定特征的特征值，用空格分隔，串接为一个字符串返回。注意，对某些不支持的系统特征，按对应的特征值为空字符串处理。

**异常**

（无）

**示例**

```js
// 获取内核名称
$SYSTEM.uname_prt
    // string: 'Linux'

// 获取内核名称及版本号
$SYSTEM.uname_prt('kernel-name kernel-release kernel-version')
    // string: "Linux 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021"
```

#### 3.1.4) `locale` 方法

获取或设置区域（locale）。

**描述**

```js
$SYSTEM.locale string : `the locale for the messages category.`
```

该方法获得消息分类（messages category）的区域，返回字符串。

```js
$SYSTEM.locale(
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
) string | undefined : `the locale like 'zh_CN'.`
```

该方法获取指定分类的区域，返回字符串。某些平台可能不支持特定的区域分类，比如姓名（`name`）分类。对不支持的区域分类，该函数将抛出 `Unsupported` 异常，或静默求值时返回 `undefined`。

```js
$SYSTEM.locale(!
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
        <string $locale: `the locale for $categories`>
) true | false
```

该方法设置指定分类（单个或多个）的区域。成功时返回 `true`，失败时返回 `false`。某些平台可能不支持特定的区域分类，比如姓名（`name`）分类。对不支持的区域分类，该函数将抛出 `Unsupported` 异常，或在静默求值时返回 `false`。

**异常**

- `Unsupported`：不支持的区域分类。可忽略异常。

**备注**

1. 在 HVML 中，表示区域的字符串始终使用 `en_US`、`zh_CN` 这种形式。
1. 在 HVML 应用框架中，要求始终使用 UTF-8 编码。
1. 对特定区域的修改，将在 `$SYSTEM` 变量上产生 `change:locale/<category>` 事件。

**示例**

```js
$SYSTEM.locale
    // string: "en_US"

$SYSTEM.locale(! 'all', 'zh_CN')
    // boolean: true

$SYSTEM.locale
    // string: "zh_CN"
```

#### 3.1.5) `time` 方法

获取或设置日历时间（calendar time）。

**描述**

```js
$SYSTEM.time longint: `the calendar time (seconds since Epoch)`
```

该方法获取当前日历时间（自 Epoch 以来的秒数），返回值类型为 `longint`。

```js
$SYSTEM.time(!
        <real $seconds: `seconds since Epoch`>
) true | false
```

该方法设置系统时间，整数部分表示自 Epoch 以来的秒数，小数部分表示微秒数。成功时返回 `true`，失败时抛出 `AccessDenied` 异常，静默求值时返回 `false`。

**异常**

- `InvalidValue`：传入无效参数，如负值或者大于 100,000 或小于 0 的微秒值。
- `AccessDenied`：当前会话的所有者没有权限设置系统时间时，将抛出该异常。

**备注**

1. 对日历时间的修改，将在 `$SYSTEM` 变量上产生 `change:time` 事件。

**示例**

```js
$SYSTEM.time
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
$SYSTEM.time_us longdouble :
    `A long double number representing the number of seconds (integral part) and microseconds (fractional part) since Epoch.`
```

该方法获取当前系统时间，包括自 Epoch 以来的秒数以及微秒数，返回值 longdouble 数值，小数部分为微秒值。

```js
$SYSTEM.time_us(
        [
            < 'longdouble | object' $return_type = 'longdouble': `indicate the return type: a long double number or an object.`>
        ]
) longdouble | object : `A long double numer or an object representing the number of seconds and microseconds since Epoch:`
        - 'sec': < longint: `seconds since Epoch` >
        - 'usec': < longint: `microseconds` >
```

该方法获取当前系统时间，包括自 Epoch 以来的秒数以及微秒数，返回值类型为 longdouble 数值或包含 `sec` 和 `usec` 两个属性的对象。

```js
$SYSTEM.time_us(!
        <real $sec_us: `seconds with microseconds since Epoch`>
) true | false
```

该方法用一个实数（整数部分表示自 Epoch 以来的秒数，小数部分表示微秒数）设置系统时间。成功时返回 `true`，失败时抛出异常，静默求值时返回 `false`。

```js
$SYSTEM.time_us(!
        <object $time_with_us: `An object representing the number of seconds and microseconds since Epoch`>
) true | false
```

该方法使用表示系统时间的对象设置系统时间。成功时返回 `true`，失败时抛出异常，静默求值时返回 `false`。

**异常**

- `InvalidValue`：获取器被调用时，传入错误参数时（如错误的返回类型），将抛出该异常；静默求值时，返回 `longdouble` 类型的当前事件。设置器被调用时，传入无效参数时（如负值或者大于 100,000 或小于 0 的微秒值）时，将抛出该异常。
- `AccessDenied`：设置器被调用时，当运行解释器的所有者没有权限设置系统时间时，将抛出该异常。

**备注**

1. 对系统时间的修改，将在 `$SYSTEM` 变量上产生 `change:time` 事件。

**示例**

```js
$SYSTEM.time_us
    // longdouble: 123456789.456789
```

**参见**

- C 标准函数：`gettimeofday()`、`settimeofday()`
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime 类：<https://www.php.net/manual/en/class.datetime.php>

#### 3.1.7) `timezone` 方法

获取或设置时区。

**描述**

```js
$SYSTEM.timezone : string | false
```

该方法返回当前时区。

```js
$SYSTEM.timezone(!
        <string $timezone: `new timezone`>
        [,
            < 'local | global' $permanently = 'local': `change timezone permanently/globally or temporarily/locally.`>
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
- `AccessDenied`：当前会话的所有者没有权限持久更改系统时区。

**备注**

1. 对系统时区的修改，将在 `$SYSTEM` 变量上产生 `change:timezone` 事件。
1. 系统时区的全局、持久修改，可能需要重新启动操作系统。

**示例**

```js
$SYSTEM.timezone
    // string: "Asia/Shanghai"

$SYSTEM.timezone(! 'America/New_York' )
    // true

$SYSTEM.timezone
    // string: "America/New_York"
```

**参见**

- C 标准函数：`tzset()`
- PHP: <https://www.php.net/manual/en/timezones.php>

#### 3.1.8) `cwd` 方法

获取或设置当前工作路径。

**描述**

```js
$SYSTEM.cwd string | false: `returns the current working directory on success, or @false on failure.`
```

该方法获取当前工作路径。成功时返回 `true`，失败时抛出异常；在静默求值时，对可忽略异常返回 `false`。

```js
$SYSTEM.cwd(!
        <string $dir: `the new path for the current working directory.`>
) boolean: `returns @true on success or @false on failure.`
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

1. 对当前工作路径的修改，将在 `$SYSTEM` 变量上产生 `change:cwd` 事件。

**参见**

- C 标准函数：`chdir()`, `getcwd()`

#### 3.1.9) `env` 方法

获取或设置系统环境变量。

**描述**

```js
$SYSTEM.env(
        <string: `the environment variable name`>
) string | undefined
```

该方法获取指定环境变量的值（字符串）；未设置时抛出 `NoSuchKey` 异常，静默求值时返回 `undefined`。

```js
$SYSTEM.env(!
        <string: `the environment variable name`>,
        <string | undefined: `the value`>
) true | false: `returns @true on success, otherwise @false if evaluated silently.`
```

该方法设置指定的环境变量，返回布尔数据，指明是否覆盖了已有环境变量。

**异常**

该方法可能产生的异常，均为可忽略异常：

- `InvalidValue`：非法的环境变量名称。
- `NoSuchKey`：不存在指定的环境变量。

**备注**

1. 新增特定的环境变量，将在 `$SYSTEM` 变量上产生 `change:env/grown` 事件，事件参数为一个对象，包含以新增环境变量名称为键，对应值为键值的键值对。
1. 对特定环境变量的修改，将在 `$SYSTEM` 变量上产生 `change:env` 事件，事件参数为一个对象，包含以修改的环境变量名称为键，对应值为键值的键值对。
1. 删除特定的环境变量，将在 `$SYSTEM` 变量上产生 `change:env/shrunk` 事件，事件参数为被移除的环境变量名称。

**示例**

```js
// 设置环境变量 `LOGNAME` 的值
$SYSTEM.env(! 'LOGNAME', 'tom' )
    // boolean: true
```

#### 3.1.10) `random_sequence` 方法

从内核获取指定的随机数据，可用于随机数发生器的种子或加密用途。

**描述**

```js
$SYSTEM.random_sequence(
        <numer $length: `the length of the random byte sequence`>
) bsequence | false
```

该方法从内核获取指定长度的随机数据，可用于随机数发生器的种子或加密用途。该方法返回指定长度的字节序列或抛出异常；静默求值时，返回 `false`。

**异常**

- `InvalidValue`：`$length` 无效的长度；长度需大于 0 小于等于 256。
- `NotSupported`：不支持。

**示例**

```js
// 从内核获得随机数据用于当前会话的随机数发生器种子。
$SYSTEM.random(! $EJSON.fetchreal($SYSTEM.random_sequence(4), 'u32') )
    // boolean: true
```

**参见**

- Linux 特有接口：`getrandom()`

#### 3.1.11) `random` 方法

获取随机值。

**描述**

```js
$SYSTEM.random longint: `a random between 0 and RAND_MAX.`
```

该方法获取 0 到 C 标准函数库定义的 `RAND_MAX`（至少 `32767`）之间的一个随机值（`longint`）。

```js
$SYSTEM.random(
        <real $max: `the max value`>
) real | false: `A random real number between 0 and $max. The type of return value will be same as the type of $max.`
```

该方法获取 0 到指定的最大值之间的一个随机值。返回值的类型同参数 `$max` 的类型。

```js
$SYSTEM.random(!
        <real $seed: `the random seed`>
        [, <number $complexity: `a number equal or greater than 8 to indicates how sophisticated the random number generator it should use - the larger, the better the random numbers will be.>
        ]
) boolean: `@true for success, @false otherwise.`
```

该方法设置随机数发生器的种子（`$seed`）和/或复杂度（`$complexity`）。该方法在成功时返回 `true`；失败时抛出异常，或在静默求值时，对可忽略异常返回 `false`。

**异常**

`InvalidValue`：传入了无效参数，比如过小的 `$complexity` 值。

**示例**

```js
// 使用当前系统日历时间设置随机数种子。
$SYSTEM.randome(! $SYSTEM.time )
    // true

// 使用当前系统日历时间设置随机数种子，并设置随机数发生器的复杂度为最高。
$SYSTEM.randome(! $SYSTEM.time, 256 )
    // true

$SYSTEM.random
    // longint: 8899L

$SYSTEM.random(1)
    // number: 0.789

$SYSTEM.random(1000L)
    // longint: 492L

$SYSTEM.random(-10FL)
    // longdouble: -8.96987678FL
```

**参见**

- C 标准函数：`random_r()`
- C 标准函数：`srandom_r()`
- C 标准函数：`initstate_r()`

### 3.2) `SESSION`

该变量是一个会话级内置变量，解释器在创建一个新的会话时，会自动创建并绑定。该变量主要用于会话相关的信息，并提供给用户在当前会话的不同 HVML 程序之间共享数据的机制。

#### 3.2.1) `user_obj` 静态属性

`user_obj` 是 `SESSION` 的一个静态属性，用来定义用户自定义键值对，初始为一个空对象。程序可使用 `update` 元素设置其内容：

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$SESSION.user_obj" to="displace">
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

由于 `$SESSION` 是会话级变量，故而可以在当前会话的另一个 HVML 程序中观察该数据上的变化：

```html
    <observe on="$SESSION.user_obj" for="change:AUTHOR" in="#theStatusBar">
        ...
    </observe>
```

#### 3.2.2) `user` 方法

获取或设置用户键值对。

**描述**

```js
$SESSION.user(
        <string $key: `the user defined key name`>
) any | undefined : `the variant value corresponding to the key name $key.`
```

该方法获取指定键名对应的键值。当指定的键名未被设置时，将抛出 `NoSuchKey` 异常，或在静默求值时，返回 `undefined`。

```js
$SESSION.user(!
        <string $key: `the user defined key name`>,
        <any | undefined $value: `the new variant value`>
) boolean : `returns @true when the old value was overridden or @false when a new key-value pair was created.`
```

该方法设置指定键名的值，返回布尔数据，指明是否覆盖了已有键值。注意，传入键值为 `undefined` 会执行移除对应键值对的操作。当移除一个并不存在的键值对时，将抛出 `NoSuchKey` 异常，或在静默求值时，返回 `false`。

_注意_，`user` 的获取器和设置器本质上访问的是 `$SESSION` 的 `user_obj` 静态属性。

**异常**

该方法可能产生的异常：

- `NoSuchKey`

**示例**

```js
// 移除 `userId` 键值对
$SESSION.user(! 'userId', undefined )
    // false (assumed that `userId` was not set)

// 设置 `userId` 为 `20211104`
$SESSION.user(! 'userId', '20211104' )
    // false

// 获取 `userId` 对应的键值
$SESSION.user('userId')
    // string: '20211104-01'

// 重置 `userId` 为 `20220213`
$SESSION.user(! 'userId', '20220213' )
    // true

// 移除 `userId` 键值对
$SESSION.user(! 'userId', undefined )
    // true
```

### 3.3) `DATETIME`

#### 3.3.1) `time_prt` 方法

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
) string | false: `a date and time string in the given time format $format and the time zone $timezone for the specified calendar time $seconds.`
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
$DATETIME.time_prt('iso8601', $MATH.eval('x - 3600', { x: $SYSTEM.time }), 'Asia/Shanghai')
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

#### 3.3.2) `utctime` 方法

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
$DATETIME.utctime($MATH.sub($SYSTEM.time, 3600))
    // object
```

**参见**

- C 标准函数：`gmtime_r()`

#### 3.3.3) `localtime` 方法

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
$DATETIME.localtime($MATH.sub($SYSTEM.time, 3600), 'Asia/Shanghai')
```

**参见**

- C 标准函数：`localtime_r()`

#### 3.3.4) `mktime` 方法

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

#### 3.3.5) `fmttime` 方法

格式化日历时间。

**描述**

```js
$DATETIME.fmttime(
        <string $format: `the format string`>
        [, <null | number | longint | ulongint | longdouble: `the calendar time (seconds since Epoch); @null for the current calendar time.`>
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

#### 3.3.6) `fmtbdtime` 方法

格式化分解时间。

**描述**

```js
$DATETIME.fmtbdtime(
        <string $format: `the format string`>,
        <null | object $bdtime: `the broken-down time object returned by utctime() or localtime(); @null for the current calendar time in current timzone.`
) string | false
```

该方法按指定的格式格式化一个分解时间，返回字符串。

**示例**

```js
// 获得类似 `08:55` 的时间字符串
$DATETIME.fmtbdtime("It is %H:%M now in Asia/Shanghai", $DATETIME.localtime($MATH.sub($SYSTEM.time, 3600), 'Asia/Shanghai'))
    // string: 'It is 08:55 now in Asia/Shanghai'
```

**参见**

- C 标准函数：`strftime()`

### 3.4) `HVML`

`HVML` 是一个内置的程序级动态变量，该变量用于获取 HVML 程序的基本信息或者设置解释器在执行 HVML 程序时一些参数。

#### 3.4.1) `base` 方法

该方法获取或设置 HVML 程序的基础 URL。

```js
$HVML.base string: `the base URL.`
```

该方法返回当前的基础 URL，如 `file:///app/com.example.foo/hvml`。

```js
$HVML.base(!
        <string $new_url: `the new base URL`>
) string | false: `the new base URL normalized from $new_url or `false` for invalid $new_url.`
```

该方法设置 HVML 程序的基础 URL 为预期值，返回正规化处理后的基础 URL。若传递的 `$new_url` 不是合法的或不支持的 URL，则抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常：

- `InvalidValue`：无效的 URL 字符串。

**示例**

```js
$HVML.base(! "https://foo.example.com//app/hvml/" )
    // string: 'https://foo.example.com/app/hvml'
```

#### 3.4.2) `max_iteration_count` 方法

该方法获取或设置 HVML 程序在执行 `iterate` 动作元素时的最大迭代次数，用于检测可能的死循环。

默认值为 64 位无符号整数的最大值：`2 ^ 64 - 1`。

**描述**

```js
$HVML.max_iteration_count ulongint: `the current maximal iteration count.`
```

该方法返回当前的最大迭代次数值。

```js
$HVML.max_iteration_count(!
        <real $new_value: `the new maximal interation count`>
) ulongint | false : `the new maximal iteration count.`
```

设置最大迭代次数值并返回设置后的值。当传入无效值（比如零）时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常：

- `InvalidValue`：无效值，可忽略异常。

**示例**

```js
$HVML.max_iteration_count(! 10000UL )
```

#### 3.4.3) `max_recursion_depth` 方法

该方法获取或设置 HVML 程序在递归执行某个功能时的最大递归深度，以防止栈溢出。

默认值为 16 位无符号整数的最大值：`2 ^ 16 - 1`（65535）。

**描述**

```js
$HVML.max_recursion_depth ulongint: `the current maximal recursion depth value.`
```

该方法返回当前的最大递归深度值。

```js
$HVML.max_recursion_depth(!
        <real $new_value: `new maximal recursion depth`>
) ulongint | false: `the new maximal recursion depth value.`
```

该方法设置最大递归深度值，返回设置后的值。当传入无效值时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常：

- `InvalidValue`：无效值，可忽略异常。

**示例**

```js
$HVML.max_recursion_depth(! 10000UL )
```

#### 3.4.4) `max_embedded_levels` 方法

该方法获取或设置解析 eJSON 数据或者处理容器数据时，允许的最大嵌套层级。

默认值为 64。

**描述**

```js
$HVML.max_embedded_levels ulongint: `the current maximal embedded levels.`
```

该方法返回当前的最大容器数据嵌套层级。

```js
$HVML.max_embedded_levels(!
        <real $new_value: `new maximal embedded levels`>
) ulongint | false: `the new maximal embedded levels.`
```

该方法设置最大允许的容器数据嵌套层级，返回设置后的值。当传入无效值时抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常：

- `InvalidValue`：0 或者超过 16 位无符号整数最大值。

**示例**

```js
$HVML.max_embedded_levels(! 64UL )
```

#### 3.4.5) `timeout` 方法

该方法获取或设置 HVML 程序在通过数据获取器获取数据或者建立长连接、发送请求时的超时值（单位：秒）。

默认值为 10.0。

**描述**

```js
$HVML.timeout number : `the current timeout value (in seconds)`
```

该方法返回当前超时值。

```js
$HVML.timeout(!
        <number $new_timeout: `the new timeout value (in seconds)`>
) number | false: `the new timeout value`
```

该方法设置超时值，并返回设置后的值。当传入无效值时，抛出异常；或在静默求值时，对可忽略异常返回 `false`。

**异常**

该方法可能产生的异常，均为可忽略异常：

- `ArgumentMissed`：设置器中未指定参数。
- `WrongDataType`：设置器中指定了非实数类参数类型。
- `InvalidValue`：无效超时值。

**示例**

```js
// 设置超时值为 3.5 秒。
$HVML.timeout(! 3.5 )
    // numer: 3.5
```

### 3.5) `DOC`

`DOC` 是一个内置的程序级动态变量，该变量用于访问 HVML 程序生成的 eDOM 树中的元素。

#### 3.5.1) `doctype` 方法

该方法返回文档类型，字符串。

```js
$DOC.doctype string : `the target DOCTYPE, such as 'html'`
```

该方法返回目标文档的文档类型；字符串，如 `html`。

**示例**

```js
$DOC.doctype
    // html
```

#### 3.5.2) `query` 方法

使用 CSS 选择器查询目标文档上的元素汇集（collection）。

该方法的返回值可能有如下两种情况：

1. `undefined`：错误的 CSS 选择器或者参数。
1. 一个元素汇集实体，包含零个或多个元素。

在元素汇集实体上，我们可以就如下键名获得对应的获取器：

1. `.count()`：获取元素汇集中元素的个数。
1. `.sub( <real: offset>, <real: length )`：以偏移量及长度为依据在给定的元素汇集中选择元素，形成新的元素汇集。
1. `.select( <string: CSS selector )`：以 CSS 选择器在给定的元素汇集中的选择元素，形成一个新的元素汇集。
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

如此实现后，HVML 动作元素中通过 CSS 选择器引用元素时，如：

```html
<update on="#the-user-stats > h2 > span" at="textContent attr.class" with='["10", "text-warning"]' />
```

相当于：

```html
<update on="$DOC.query('#the-user-stats > h2 > span')" at="textContent attr.class" with='["10", "text-warning"]' />
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

### 3.6) `EJSON`

该动态变量为会话级内置变量，用于返回数据的类型、成员个数等信息。

#### 3.6.1) `type` 方法

返回数据的类型名称。

**描述**

```js
$EJSON.type(
        [ <any $data> ]
) string
```

该方法返回给定数据的类型名称，字符串。若未指定数据，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$EJSON.type
    // string: `undefined`

$EJSON.type( 3.5 )
    // string: `number`
```

#### 3.6.2) `count` 方法

返回数据的子数据项个数。

**描述**

```js
$EJSON.count(
        [ <any $data> ]
) ulongint
```

该方法返回数据的子数据项个数，返回值为数值类型。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$EJSON.count
    // ulongint: 0

$EJSON.count(! 3.5 )
    // ulongint: 1

$EJSON.count(! [ 1.0, 2.0 ] )
    // ulongint: 2
```

#### 3.6.3) `numberify` 方法

对给定数据做数值化处理。

**描述**

```js
$EJSON.numberify(
        [ <any $data> ]
) number
```

该方法对任意数据做数值化处理，返回一个数值。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$EJSON.numberify( "1.0" )
    // number: 1.0

$EJSON.numberify
    // number: 0
```

#### 3.6.4) `booleanize` 方法

对给定的数据做布尔化处理。

**描述**

```js
$EJSON.booleanize(
        [ <any $data> ]
) boolean
```

该方法对给定的数据做布尔化处理，返回布尔值。未指定数据时，按 `undefined` 处理。

**异常**

该方法不产生异常。

**示例**

```js
$EJSON.booleanize
    // boolean: false
```

#### 3.6.5) `stringify` 方法

对给定的数据做字符串化处理。

**描述**

```js
$EJSON.stringify(
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
$EJSON.stringify
    // string: 'undefined'

$EJSON.stringify(123)
    // string: '123'
```

#### 3.6.6) `serialize` 方法

对给定的数据做字符串化处理。

**描述**

```js
$EJSON.serialize(
        <any $data>
        [, < '[real-json | real-ejson] || [ runtime-null | runtime-string ] || plain || spaced || pretty || pretty_tab || [bseq-hex-string | bseq-hex | bseq-bin | bseq-bin-dots | bseq-base64] || no-trailing-zero || no-slash-escape' $options = `real-json runtime-null plain bseq-hex-string`:
            - 'real-json':          `use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
            - 'real-ejson':         `use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
            - 'runtime-null':       `treat all eJSON-specific runtime types as null, i.e., undefined, dynamic, and native values will be serialized as null.`
            - 'runtime-string':     `use string placehodlers for EJSON-specific runtime types: "<undefined>", "<dynamic>", and "<native>".`
            - 'plain':              `do not use any extra formatting characters (whitespace, newline, or tab).`
            - 'spaced':             `use minimal space characters to format the output.`
            - 'pretty':             `use two-space to beautify the output.`
            - 'pretty-tab':         `use tab instead of two-space to beautify the output.`
            - 'bseq-hex-string':    `serialize binary sequence as hexadecimal string, e.g. "A0B0C0567890".`
            - 'bseq-hex':           `use hexadecimal form to serialize binary sequence.`
            - 'bseq-bin':           `use binary form to serialize binary sequence.`
            - 'bseq-bin-dots':      `use binary form to serialize binary sequence and use dots to seperate the binary digits per four digits. e.g., b1100.1010.`
            - 'bseq-base64':        `use Base64 to serialize binary sequence.`
            - 'no-trailing-zero':   `drop trailing zero for float values.`
            - 'no-slash-escape':    `do not escape the forward slashes ('/').`
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
$EJSON.serialize
    // string: 'null'

$EJSON.serialize(undefined, 'runtime-string')
    // string: '"<undefined>"'

$EJSON.serialize("123")
    // string: '"123"'

$EJSON.serialize([1, 2])
    // string: '[1,2]'
```

#### 3.6.7) `sort` 方法

对数组或者集合执行排序。

**描述**

```js
$EJSON.sort(
        < array | set $data >,
        < 'asc | desc' $method = 'asc': sorting ascendingly or descendingly >
        [, < 'auto | number | case | caseless' $method = 'auto':
            - 'auto':       `comparing members automatically;`
            - 'number':     `comparing members as numbers;`
            - 'case':       `comparing members as strings case-sensitively;`
            - 'caseless':   `comparing members as strings case-insensitively.` >
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
$EJSON.sort([3, 4, 1, 0], 'asc')
    // array: [0, 1, 3, 4]
```

#### 3.6.8) `shuffle` 方法

随机打乱给定数组或者集合的成员顺序。

**描述**

```js
$EJSON.shuffle(
        < array | set $data >,
) $data | false
```

该方法随机打乱给定数组或者集合的成员顺序，返回数据本身。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `false`。
- `WrongDataType`：错误数据类型；可忽略异常，静默求值时返回 `false`。

**示例**

```js
$EJSON.shuffle([1, 2, 3, 4, 5])
    // array: [4, 3, 2, 5, 1]
```

#### 3.6.9) `compare` 方法

比较两个数据。

**描述**

```js
$EJSON.compare(
        < any: the first data >,
        < any: the second data >
        [, < 'auto | number | case | caseless' = 'auto':
            - 'auto':       `comparing automatically;`
            - 'number':     `comparing as numbers;`
            - 'case':       `comparing as strings case-sensitively;`
            - 'caseless':   `comparing as strings case-insensitively.` >
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
$EJSON.compare(1, "1")
    // number: 0
```

#### 3.6.10) `parse` 方法

解析 JSON/EJSON 字符串，返回 EJSON 数据。

**描述**

```js
$EJSON.parse(
        < string: $string: the JSON/EJSON string to be parsed. >
) any | undefined
```

该方法解析 JSON/EJSON 字符串，返回 EJSON 数据。

**异常**

该方法可能产生如下异常：

- `MemoryFailure`：内存分配失败；不可忽略异常。
- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。

**示例**

```js
#EJSON.parse("false")
    // boolean: false

#EJSON.parse("[]")
    // array: []
```

#### 3.6.11) `isequal` 方法

判断两个数据是否完全相等。

**描述**

```js
$EJSON.isequal(
        < any: the first data >,
        < any: the second data >
) boolean | undefined
```

该方法判断给定的两个数据是否完全相等（类型一致且值相等），返回布尔型。

**异常**

该方法可能产生如下异常：

- `ArgumentMissed`：缺少必要参数。可忽略异常，返回 `undefined`。

**示例**

```js
#EJSON.isequal(false, 0)
    // boolean: false

#EJSON.isequal(false, false)
    // boolean: true
```

#### 3.6.12) `fetchstr` 方法

从二进制字节序列中抽取指定编码的字符串。

**描述**

```js
$EJSON.fetchstr( <bsequece $bytes>,
        < 'utf8 | utf16 | utf32 | utf16le | utf32le | utf16be | utf32be' $encoding: `the encoding; see Binary Format Notation.` >
        [, < null | real $length = null: `the length to decode in bytes.` >
            [, < real $offset = 0: `the offset in the byte sequence.` > ]
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
$EJSON.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8', 6, -6 )
    // string: "上海"

// UTF8: 北京上海
$EJSON.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8:6' )
    // string: "北京"
```

#### 3.6.13) `fetchreal` 方法

该方法在给定的二进制序列的指定位置，按指定的实数类型（以及大小头顺序）提取实数，返回相应的实数类型。

```js
$EJSON.fetchreal( <bsequece $bytes>,
        <'i8 | i16 | i32 | i64 | u8 | u16 | u32 | u64 | f16 | f32 | f64 | f96 | f128 ...' $binary_format: `the binary format and/or endianness; see Binary Format Notation`>
        [, < real $offset = 0: `the offset in the byte sequence.` > ]
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
$EJSON.fetchreal( bx0a00, 'i16le', 0 )
    // longint: 10L

$EJSON.fetchreal( bx0a00, 'i8:2', 0 )
    // array: [ 10L, 00L ]
```

#### 3.6.14) `crc32` 方法

计算任意数据的 CRC32 多项式值。

**描述**

```js
$EJSON.crc32(
        < any $data>
        < 'CRC-32 | CRC-32/BZIP2 | CRC-32/MPEG-2 | CRC-32/POSIX | CRC-32/XFER | CRC-32/ISCSI | CRC-32C | CRC-32/BASE91-D | CRC-32D | CRC-32/JAMCRC | CRC-32/AIXM | CRC-32Q' $algo = 'CRC-32': `the name of CRC32 algorithm; use @null for default algorithm.`>
        < 'ulongint | binary | uppercase | lowercase' $type = 'ulongint': `the type of return data:`
            - 'ulongint': `a unsigned longint value have the CRC32 checksum.`
            - 'binary': `a byte sequence (totally 4 bytes).`
            - 'uppercase': `a 8-character hexadecimal string in uppercase letters.`
            - 'lowercase': `a 8-character hexadecimal string in lowercase letters.` >
) ulongint | bsequence | string | undefined
```

该方法计算任意数据的 CRC32 多项式值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**异常**

该方法可能抛出如下异常：

- `ArgumentMissed`：缺少必要参数；可忽略异常，静默求值时返回 `undefined`。
- `InvalidValue`：错误的 CRC32 算法名称；可忽略异常，静默求值时返回 `undefined`。

**示例**

```
$EJSON.crc32('HVML', 'CRC-32/POSIX', 'uppercase')
    // string: '7AD1CDE5'
```

**参见**

- PHP `crc32()` 函数：<https://www.php.net/manual/en/function.crc32.php>
- [CRC 在线计算]<https://crccalc.com/>
- [Catalogue of parametrised CRC algorithms](https://reveng.sourceforge.io/crc-catalogue/17plus.htm)

#### 3.6.15) `md5` 方法

计算任意数据的 MD5 散列值。

**描述**

```js
$EJSON.md5(
        < any $data >
        < 'binary | uppercase | lowercase' $type = 'binary': `the type of return data:`
            'binary'    - `the MD5 digest is returned as a binary sequence (totally 16 bytes).`
            'uppercase' - `the MD5 digest is returned as a 32-character hexadecimal number in uppercase letters.`
            'lowercase' - `the MD5 digest is returned as a 32-character hexadecimal number in lowercase letters.`
        >
) string | bsequence
```

该方法计算任意数据的 MD5 散列值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**示例**

**参见**

- PHP `md5()` 函数：<https://www.php.net/manual/en/function.md5.php>

#### 3.6.16) `sha1` 方法

计算任意数据的 SHA1 散列值。

**描述**

```js
$EJSON.sha1(
        < any $data >
        < 'binary | uppercase | lowercase' $type = 'binary': `the type of return data:`
            'binary'    - `the MD5 digest is returned as a binary sequence (totally 20 bytes).`
            'uppercase' - `the MD5 digest is returned as a 40-character hexadecimal number in uppercase letters.`
            'lowercase' - `the MD5 digest is returned as a 40-character hexadecimal number in lowercase letters.`
        >
) string | bsequence
```

该方法计算任意数据的 SHA1 散列值。对非字符串或字节序列的数据，该方法基于字符串化之后的数据进行计算。

**示例**

**参见**

- PHP `sha1()` 函数：<https://www.php.net/manual/en/function.sha1.php>

#### 3.6.17) `pack` 方法

将多个数据打包为二进制序列。

**描述**

```js
$EJSON.pack(
        <string $format: `the format string; see Binary Format Notation.` >,
        <real | string | bsequence | array $first: `the first data.` >
        [,  <real | string | bsequence | array $second: `the second data.` >
            [, <real | string | bsequence | array $third: `the third data.` >
                [, ... ]
            ]
        ]
) string
```

该函数将传入的多个实数、实数数组、字符串或字节序列按照 `$format` 指定的二进制格式打包为字节序列。

```js
$EJSON.pack(
        < string $format: `the format string; see Binary Format Notation.` >,
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
$EJSON.pack( "i16le i32le", 10, 10)
    // bsequence: bx0a000a000000

$EJSON.pack( "i16le:2 i32le", [[10, 15], 255])
    // bsequence: bx0A000F00FF000000

$EJSON.pack( "i16le:2 i32le", [10, 15], 255)
    // bsequence: bx0A000F00FF000000
```

**参见**

- [1.2) 二进制格式表示法](#12-二进制格式表示法)

#### 3.6.18) `unpack` 方法

将二进制序列分解为多个数据。

**描述**

```js
$EJSON.unpack(
        <string $format: `the format string; see Binary Format Notation.` >,
        <bsequence $data: `the data.`>
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
$EJSON.unpack( "i16le i32le", bx0a000a000000)
    // array: [10L, 10L]

$EJSON.unpack( "i16le", bx0a000a000000)
    // longint: 10L
```

**参见**

- [1.2) 二进制格式表示法](#12-二进制格式表示法)

#### 3.6.19) `bin2hex` 方法

将字符串或者字节序列转换为十六进制字符串表达。

**描述**

```js
$EJSON.bin2hex(
        <string | bsequence $data>
        [, < 'lowercase | uppercase' $options = 'lowercase':
            - 'lowercase': `use lowercase letters for hexadecimal digits.`
            - 'uppercase': `use uppercase letters for hexadecimal digits.`
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
$EJSON.bin2hex( bb0000.1111.1111.0000, 'uppercase')
    // string: '0FF0'
```

**参见**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.bin2hex.php>

#### 3.6.20) `hex2bin` 方法

十六进制字符串转换为字节序列。

**描述**

```js
$EJSON.hex2bin(
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
$EJSON.hex2bin( '0FF0' )
    // bsequence: bb0000.1111.1111.0000
```

**参见**

- PHP `bin2hex()` 函数：<https://www.php.net/manual/en/function.hex2bin.php>

#### 3.6.21) `base64_encode` 方法

使用 MIME Base64 编码字符串或者字节序列。

**描述**

```js
$EJSON.base64_encode(
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
$EJSON.base64_encode( bx48564D4C )
    // string: 'SFZNTA=='

$EJSON.base64_encode('HVML 是全球首款可编程标记语言')
    // string: 'SFZNTCDmmK/lhajnkIPpppbmrL7lj6/nvJbnqIvmoIforrDor63oqIA='
```

**参见**

- PHP `base64_encode()` 函数：<https://www.php.net/manual/en/function.base64-encode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.6.22) `base64_decode` 方法

解码使用 MIME Base64 编码的字符串。

**描述**

```js
$EJSON.base64_decode(
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
$EJSON.base64_decode( 'SFZNTA==' )
    // bsequence: bx48564D4C
```

**参见**

- PHP `base64_decode()` 函数：<https://www.php.net/manual/en/function.base64-decode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

### 3.7) `L`

该变量是一个会话级内置变量，主要用于逻辑运算。

有关任何数据转换为逻辑真假值时的规则，请参阅 [HVML 1.0 规范 - 2.1.4) 任意数据类型的强制转换规则](hvml-spec-v1.0-zh.md#214-%E4%BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%BA%E5%88%B6%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)。

#### 3.7.1) `not` 方法

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

#### 3.7.2) `and` 方法

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

#### 3.7.3) `or` 方法

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

#### 3.7.4) `xor` 方法

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

#### 3.7.5) `eq` 方法

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

#### 3.7.6) `ne` 方法

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

#### 3.7.7) `gt` 方法

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

#### 3.7.8) `ge` 方法

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

#### 3.7.9) `lt` 方法

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

#### 3.7.10) `le` 方法

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

#### 3.7.11) `streq` 方法

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

#### 3.7.12) `strne` 方法

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

#### 3.7.13) `strgt` 方法

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

#### 3.7.14) `strge` 方法

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


#### 3.7.15) `strlt` 方法

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

#### 3.7.16) `strle` 方法

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

#### 3.7.17) `eval` 方法

对参数化的逻辑运算表达式求值。

**描述**

```js
$L.eval(
        <string: `logical expression`>
        [, <object: `the parameter map`> ]
) boolean | undefined
```

该方法可对参数化的逻辑运算表达式进行求值，返回 `true` 或 `false`。

**示例**

```js
$L.eval("x > y && y > z || b", { x: 2, y: 1, z: 0, b: $L.streq("case", $a, $b) })
    // boolean: true
```

### 3.8) `T`

该变量是一个程序级内置变量，主要用于文本的本地化替代。

- `get`：一个动态方法，用于返回替代字符串。

#### 3.8.1) `map` 静态属性

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

#### 3.8.2) `get` 方法

**描述**

```js
$T.get(
        <string $text: `the original text.` >
) string : `the translated text.`
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

### 3.9) `STR`

`STR` 是一个内置的动态变量，该变量用于实现常见的字符串操作。

在调用`STR` 动态对象方法的过程中，可能产生如下异常：

- `ArgumentMissed`：缺少必要的参数，或传入的参数不足。
- `WrongDataType`：错误的参数类型。
- `BadEncoding`：错误编码。

#### 3.9.1) `contains` 方法

判断一个字符串中是否包含给定的子字符串。

**描述**

```js
$STR.contains(
        <string $haystack: `the string to search in.` >,
        <string $needle: `the substring to search for in the haystack.` >
        [, < boolean $case_insensitivity = false:
            false - `performs a case-sensitive check;`
            true - `performs a case-insensitive check.` >
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

#### 3.9.2) `starts_with` 方法

用于判断一个字符串是否以给定的字符串开头。

**描述**

```js
$STR.starts_with(
        <string $haystack: `the string to search in.`>,
        <string $needle: `the substring to search for in the haystack.`>
        [, <boolean $case_insensitivity = false:
            false - `performs a case-sensitive check;`
            true - `performs a case-insensitive check.`>
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

#### 3.9.3) `ends_with` 方法

用于判断一个字符串是否以给定的字符串结尾。

```js
$STR.ends_with(
        <string $haystack: `the string to search in.`>,
        <string $needle: `the substring to search for in the haystack.`>
        [, <boolean $case_insensitivity = false:
            false - `performs a case-sensitive check;`
            true - `performs a case-insensitive check.`>
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

#### 3.9.4) `explode` 方法

使用指定的子字符串分隔一个字符串。

**描述**

```js
$STR.explode(
        <string $string: `the input string to explode.`>
        [, <string $separator = '': `the boundary string.`>
            [, <real $limit = 0: `the limitation of members in the result array.`>]
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

#### 3.9.5) `implode` 方法

将一个数组的成员串接为一个新的字符串。使用指定的字符串串接字符串数组中的字符串。

**描述**

```js
$STR.implode(
        <array $pieces: `the array to implode.`>
        [, <string $separator = '': `the boundary string.`>]
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

#### 3.9.6) `shuffle` 方法

随机打乱一个字符串。

**描述**

```js
$STR.shuffle(
        <string $string: `the input string to shuffle.`>
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

#### 3.9.7) `replace` 方法

子字符串替换。

**描述**

```js
$STR.replace(
        <string | array $search>,
        <string | array $replace>,
        <array | string $subject>
        [, <boolean $case_insensitivity = false:
            false - `performs case-sensitive replacements;`
            true - `performs case-insensitive replacements.`>
        ]
) string | array
```

该函数返回一个字符串或者数组，该字符串或数组是将 `subject` 中全部的 `search` 都被 `replace` 替换之后的结果。

**参数**

如果 `search` 和 `replace` 为数组，那么该函数将对 `subject` 做二者的映射替换。如果 `replace` 中值的个数少于 `search` 的个数，多余的替换将使用空字符串来进行。如果 `search` 是一个数组而 `replace` 是一个字符串，那么 `search` 中每个元素的替换将始终使用这个字符串。该替换不会改变大小写。

如果 `search` 和 `replace` 都是数组，它们的值将会被依次处理。

- `search`  
查找的目标值，也就是 needle。一个数组可以指定多个目标。
- `replace`  
`search` 的替换值。一个数组可以被用来指定多重替换。
- `subject`  
执行替换的数组或者字符串，也就是常说的 `haystack`。如果 `subject` 是一个数组，替换操作将遍历整个 `subject`，返回值也将是一个数组。
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

#### 3.9.8) `format_c` 方法

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

#### 3.9.9) `scan_c` 方法

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

#### 3.9.10) `format_p` 方法

使用占位符格式化任意数据，对 EJSON 数据，使用序列化后的字符串。

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

#### 3.9.11) `scan_p` 方法

根据给定的格式解析指定的字符串，格式字符串使用占位符。

```js
$STR.scan_p(
        <string $string: `The input string being parsed.`>,
        <string $format: `string contains placeholders.`>,
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

#### 3.9.12) `join` 方法

用于串接两个或更多个字符串。

**描述**

```js
$STR.join(
        <any $data1>,
        <any $data2>
        [, <any $data3>
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

#### 3.9.13) `nr_chars` 方法

获得字符串的字符数量。

**描述**

```js
$STR.nr_chars(
        <string $string>
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

#### 3.9.14) `tolower` 方法

将字符串转换为小写。

**描述**

```js
$STR.tolower(
        <string $string>
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

#### 3.9.15) `toupper` 方法

将字符串转换为大写。

**描述**

```js
$STR.toupper(
        <string $string>
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

#### 3.9.16) `substr` 方法

返回字符串的子串。

**描述**

```js
$STR.substr(
        <string $string>,
        <real $offset>
        [, <real $length>]
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

#### 3.9.17) `substr_compare` 方法

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
            false - `performs a case-sensitive comparison;`
            true - `performs a case-insensitive comparison.`>
        ]
    ]
) number
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_compare()` 函数：<https://www.php.net/manual/en/function.substr-compare.php>

#### 3.9.18) `substr_count` 方法

计算子字符串出现的次数。

**描述**

```js
$STR.substr_count(
    <string $haystack>,
    <string $needle>
    [, <real $offset = 0>
        [, <real $length = 0>
        ]
    ]
) ulongint
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_count()` 函数：<https://www.php.net/manual/en/function.substr-count.php>

#### 3.9.19) `substr_replace` 方法

在子字符串中做替换。

**描述**

```js
$STR.substr_replace(
    <array|string $string>,
    <array|string $replace>,
    <array|real $offset>
    [,
        <array|real $length = 0>
    ]
) string|array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `substr_replace()` 函数：<https://www.php.net/manual/en/function.substr-replace.php>

#### 3.9.20) `strstr` 方法

返回在目标字符串中，以指定字符串起始或结尾的子字符串。

**描述**

```js
$STR.strstr(
        <string $haystack>,
        <string $needle>
        [, <bool $before_needle = false>
            [, <bool $case_insensitivity = false:
                false - `performs a case-sensitive check;`
                true - `performs a case-insensitive check.`>
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

#### 3.9.21) `strpos` 方法

返回在目标字符串中指定字符串第一次或者最后一次出现的位置。

**描述**

```js
$STR.strpos(
        <string $haystack>,
        <string $needle>
        [, <real $offset = 0>
            [, <bool $case_insensitivity = false:
                false - `performs a case-sensitive check;`
                true - `performs a case-insensitive check.`>
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

#### 3.9.22) `strpbrk` 方法

在目标字符串中查找从一组字符的任何一个字符开始或结尾的子字符串。

**描述**

```js
$STR.strpbrk(
        <string $string>,
        <string $characters>
        [, <bool $case_insensitivity = false:
            false - `performs a case-sensitive check;`
            true - `performs a case-insensitive check.`>
        ]
) string | false
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strpbrk()` 函数：<https://www.php.net/manual/en/function.strpbrk.php>

#### 3.9.23) `split` 方法

将字符串按给定的长度切分成子字符串数组。

**描述**

```js
$STR.split(
        <string $string>
        [, <real $length = 1> ]
) array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_split()` 函数：<https://www.php.net/manual/en/function.str-split.php>

#### 3.9.24) `chunk_split` 方法

将字符串按给定的小块长度和分隔符切分，生成一个新的字符串。

**描述**

```js
$STR.chunk_split(
        <string $string>
        [,
            <real $length = 76>
            [,
                <string $separator = "\r\n">
            ]
        ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `chunk_split()` 函数：<https://www.php.net/manual/en/function.chunk-split.php>

#### 3.9.25) `trim` 方法

删除字符串开头、结尾或两者处的空白字符（或其他字符）。

**描述**

```js
$STR.trim(
        <string $string>
        [, <string $position "left | right | both" = "both">
            [, <string $characters = " \n\r\t\v\f"> ]
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

#### 3.9.26) `pad` 方法

使用另一个字符串填充字符串为指定长度。

**描述**

```js
$STR.pad(
    <string $string>,
    <real $length>,
    [, <string $pad_string = " ">,
        [, <string $pad_type 'left | right | both' = 'right'> ]
    ]
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_pad()` 函数：<https://www.php.net/manual/en/function.str-pad.php>

#### 3.9.27) `repeat` 方法

重复一个字符串。

**描述**

```js
$STR.repeat(
        <string $string>,
        <real $times>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `str_repeat()` 函数：<https://www.php.net/manual/en/function.str-repeat.php>

#### 3.9.28) `reverse` 方法

反转一个字符串。

**描述**

```js
$STR.reverse(
        <string $string>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strrev()` 函数：<https://www.php.net/manual/en/function.strrev.php>

#### 3.9.29) `tokenize` 方法

使用给定的词元分隔符分隔字符串，返回分隔后的词元数组。

**描述**

```
$STR.tokenize(
        <string $string>,
        <string $delimiters>
) array
```

**参数**

**返回值**

**示例**

**参见**

- PHP `strtok()` 函数：<https://www.php.net/manual/en/function.strtok.php>

#### 3.9.30) `translate` 方法

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

#### 3.9.31) `htmlentities_encode` 方法

转换字符为 HTML 实体。

**描述**

```js
$STR.htmlentities_encode(
        <string $string: `The input string.`>,
        <'[compat | quotes | noquotes] || [ignore | substitute | disallowed] || [html401 | xml1 | xhtml | html5]' $flags:
            'compat'    - `Will convert double-quotes and leave single-quotes alone.`
            'quotes'    - `Will convert both double and single quotes.`
            'noquotes'  - `Will leave both double and single quotes unconverted.`
            'ignore'    - `Silently discard invalid code unit sequences instead of returning an empty string. Using this flag is discouraged.`
            'substitute' - `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
            'disallowed' - `Replace invalid code points for the given document type with a Unicode Replacement Character U+FFFD or &#FFFD.`
            'html401'   - `Handle code as HTML 4.01.`
            'xml1'      - `Handle code as XML 1.`
            'xhtml'     - `Handle code as XHTML.`
            'html5'     - `Handle code as HTML 5.`
        >
        [, <boolean $all = false:
            false- `only the certain characters have special significance in HTML are translated into these entities.`
            true - `all characters which have HTML character entity equivalents are translated into these entities.`>
            [, <boolean $double_encode = true:
                true - `will convert everything.`
                false - `will not encode existing html entities.`>
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

#### 3.9.32) `htmlentities_decode` 方法

转换 HTML 实体为对应的字符。

**描述**

```js
$STR.htmlentities_decode(
        <string $string: `The input string.`>,
        <'[compat | quotes | noquotes] || substitute || [html401 | xml1 | xhtml | html5]' $flags:
            'compat'    - `Will convert double-quotes and leave single-quotes alone.`
            'quotes'    - `Will convert both double and single quotes.`
            'noquotes'  - `Will leave both double and single quotes unconverted.`
            'substitute' - `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
            'html401'   - `Handle code as HTML 4.01.`
            'xml1'      - `Handle code as XML 1.`
            'xhtml'     - `Handle code as XHTML.`
            'html5'     - `Handle code as HTML 5.` >
        [, <boolean $all = false:
            false- `only the certain characters have special significance in HTML are translated into these entities.`
            true - `all characters which have HTML character entity equivalents are translated into these entities.` >
        ]
) string | bsequence
```

**参数**

**返回值**

**示例**

**参见**

- PHP `htmlentities()` 函数：<https://www.php.net/manual/en/function.html-entity-decode.php>
- PHP `htmlspecialchars_decode()` 函数：<https://www.php.net/manual/en/function.htmlspecialchars-decode.php>

#### 3.9.33) `nl2br` 方法

在字符串所有换行符之前插入 HTML 换行标记。

**描述**

```js
$STR.nl2br(
        < string $string: the input string. >
        [, < boolean $is_xhtml = true:
            true - `use '<br />'.`
            false - `use '<br>'.`
        ]
        [, < boolean $lowercases = true:
            true - `use 'br'.`
            false - `use 'BR'.`
        ]
) object | bsequence
```



**参数**

**返回值**

**示例**

**参见**

- PHP `nl2br()` 函数：<https://www.php.net/manual/en/function.nl2br.php>

#### 3.9.34) `rot13` 方法

对字符串执行 ROT13 转换。

**描述**

```js
$STR.rot13(
        <string $string>
) string
```



**参数**

**返回值**

**示例**

**参见**

- PHP `rot13()` 函数：<https://www.php.net/manual/en/function.rot13.php>

#### 3.9.35) `count_chars` 方法

统计字符串中的字符出现次数。

**描述**

```js
$STR.count_chars(
        < string $string: the examined string. >
        [, < 'object | string' $mode = 'object':
            'object' - returns an object with the character as key and the frequency of every character as value.
            'string' - returns a string containing all unique characters. >
        ]
) object | string
```



**参数**

**返回值**

**示例**

**参见**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

#### 3.9.36) `count_bytes` 方法

统计字符串或二进制字节序中的各个字节（0...255）出现的次数。

**描述**

```js
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
) object | bsequence
```



**参数**

**返回值**

**示例**

**参见**

- PHP `count_chars()` 函数：<https://www.php.net/manual/en/function.count-chars.php>

### 3.10) `URL`

#### 3.10.1) `encode` 方法

编码 URL 字符串。

**描述**

```js
$URL.encode(
        <string |bsequence $data: the string or the byte sequence to be encoded.>
        [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
          - 'rfc1738': encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.
          - 'rfc3986':  encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).
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

- [`$EJSON.decode` 方法](#3102-decode-方法)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urlencode()` 函数：<https://www.php.net/manual/en/function.urlencode.php>
- PHP `rawurlencode()` 函数：<https://www.php.net/manual/en/function.rawurlencode.php>

#### 3.10.2) `decode` 方法

解码经 URL 编码的字符串。

**描述**

```js
$URL.decode(
        <string $str: the string to be decoded.>
        [, < 'binary | string' $type = 'string': `the type of return data:`
            - 'binary': `the decoded data returned as a binary sequence.`
            - 'string': `the decoded data returned as a string in UTF-8 encoding.` >
            [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
              - 'rfc1738': decoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.
              - 'rfc3986':  decoding is performed according to RFC 3986, and spaces are expected being percent encoded (%20).
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

- [`$EJSON.encode` 方法](#3101-encode-方法)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urldecode()` 函数：<https://www.php.net/manual/en/function.urldecode.php>
- PHP `rawurldecode()` 函数：<https://www.php.net/manual/en/function.rawurldecode.php>

#### 3.10.3) `build_query` 方法

生成 URL 编码的查询字符串。

**描述**

```js
$URL.build_query(
    < object | array $query_data >
    [, < string $numeric_prefix = '': the numeric prefix for the argument names if `query_data` is an array. >
        [, <string $arg_separator = '&': the character used to separate the arguments. >
            [, <'[real-json | real-ejson] || [rfc1738 | rfc3986]' $opts = 'real-json rfc1738':
              - 'real-json':    `use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
              - 'real-ejson':   `use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
              - 'rfc1738':      `encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
              - 'rfc3986':      `encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).`
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

#### 3.10.4) `parse_query` 方法

解析 URL 编码的查询字符串。

**描述**

```js
$URL.parse_query(
    < string $query_string >
    [, <string $arg_separator = '&': the character used to separate the arguments. >
        [, <'[array | object] || [string | binary | auto] || [rfc1738 | rfc3986]' $opts = 'object auto rfc1738':
          - 'array':    `construct an array with the query string; this will ignore the argument names in the query string.`
          - 'object':   `construct an object with the query string.`
          - 'auto':     `the argument values will be decoded as strings first; if failed, decoded into binary sequences.`
          - 'binary':   `the argument values will be decoded as binary sequences.`
          - 'string':   `the argument values will be decoded as strings.` >
          - 'rfc1738':  `the query string is encoded per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
          - 'rfc3986':  `the query string is encoded according to RFC 3986, and spaces will be percent encoded (%20).`
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

#### 3.10.5) `parse` 方法

解析 URL，返回其组成部分。


**描述**

```js
$URL.parse(
        <string $url: the URL to parse.>,
        [,
            <'all | [scheme || host || port || user || password || path || query || fragment]' $components = 'all': the components want to parse.>
        ]
) object | string
```


**参数**

**返回值**

**示例**

**参见**

- PHP `parse_url()` 函数：<https://www.php.net/manual/en/function.parse-url.php>

#### 3.10.6) `assemble` 方法

根据分解 URL 对象组装一个完整的 URL。


**描述**

```js
$URL.assemble(
        <object $broken_down_url: `the broken-down URL object.`>
) string
```

**参数**

**返回值**

**示例**

**参见**

- PHP `parse_url()` 函数：<https://www.php.net/manual/en/function.parse-url.php>

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
        <string: `a user-defined const name`>,
        <number: the constant>
        [, <longdouble: the constant>]
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

这两个方法用于求解参数化四则运算表达式，`eval` 方法返回 `number` 类型的结果数据，`eval_l` 方法返回 `longdouble` 类型的结果数据。

```js
// 原型
$MATH.eval(<string: a four arithmetic expressions>[, <object: parameter map>]) number

// 示例1：求解 (500 + 10) * (700 + 30)
$MATH.eval("(500 + 10) * (700 + 30)")

// 示例2：求圆的周长
$MATH.eval("2 * pi * r", { pi: $MATH.pi, r: $r })

// 示例3：求圆的面积
$MATH.eval("pi * r * r", { pi: $MATH.pi, r: $MATH.sqrt(2) })

// 原型：eval_l 的 long double 版本
$MATH.eval_l(<string: a four arithmetic expressions>[, <object: parameter map>]) longdouble

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

当指定的路径以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前工作路径信息（同 `$SYSTEM.cwd`）。

#### 4.2.1) `list` 方法

该方法用于列出指定路径下的目录项，返回对象数组。原型及主要用法如下：

```js
// 原型
$FS.list(
        [ <string $path: `the path to list`>
            [, <string $filters: `the list of semicolon separated name filters.`> ]
        ]
) array
```

每个目录项的信息由如下对象表达：

```js
{
    'name': <string: `name of the file (directory entry')`>,
    'dev_major': <ulongint: `the major ID of device containing file`>,
    'dev_minor': <ulongint: `the minor ID of device containing file`>,
    'inode': <ulongint: `inode numbe`r>
    'type': <string: `file type like 'd', 'b', 's', ...`>,
    'mode_digits': <string: `file mode like `0644``>,
    'mode_alphas': <string: `file mode like `rwxrwxr-x``>,
    'nlink': <ulongint: `number of hard links`>,
    'uid': <number: `the user ID of owner`>,
    'gid': <number: `the group ID of owner`>,
    'rdev_major': <ulongint: `the major device ID if it is a special file`>,
    'rdev_minor': <ulongint: `the minor device ID if it is a special file`>,
    'size': <ulongint: `total size in bytes`>,
    'blksize': <ulongint: `block size for filesystem I/O`>,
    'blocks': <ulongint: `Number of 512B blocks allocated`>,
    'atime_sec': <ulongint: `time of last acces (seconds since Epoch)`>,
    'atime_nsec': <ulongint: `time of last acces (nanoseconds since 'atime_sec')`>,
    'mtime_sec': <ulongint: `time of last modification (seconds since Epoch)`>,
    'mtime_nsec': <ulongint: `time of last modification (nanoseconds since 'mtime_sec')`>,
    'ctime_sec': <ulongint: `time of last status change (seconds since Epoch`)>
    'ctime_nsec': <ulongint: `time of last status change (nanoseconds since 'ctime_sec'`)>
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

```js
$FS.basename(
        <string $path: a path.>
        [,
            <string $suffix = '': if the name component ends in `suffix` this will also be cut off.>
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
        <string $filename: `path to the file.`>,
        <string $permissions: `the permission string like '0644' or 'u+rwx,go+rx'.`>
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
        <string $filename: `path to the file`.>,
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
        <string $path: `a path.`>
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
    'free_blocks': <ulongint: `the number of free blocks`>,
    'free_inodes': <ulongint: `the number of free inodes`>,

    'total_blocks': <ulongint: `the number of total blocks`>,
    'total_inodes': <ulongint: `the number of total inodes`>,

    'mount_point': <string: `the mount point of the file system`>,
    'dev_majar': <ulongint: `the majar device ID`>,
    'dev_minor': <ulongint: `the minor device ID`>,
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
        <string $filename: `the path to a file or directory.`>
        <'[ dir | file | symlink | socket | pipe | block | char ] || [ executable | exe ] || [readable | read] || [writable write]' $which = 'file readable':
            'dir' - `a directory.`
            'file' - `a regular file.`
            'symlink' - `a symbolic link.`
            'socket' - `a unix socket file.`
            'pipe' - ``a named pipe file or just a pipe file.``
            'block' - `a block device file.`
            'char' - `a character device file.`
            'executable'/'exe' - `is executable.`
            'readable'/'read' - `is readable.`
            'writable'/'write' - `is writable.`
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
            'dev' - `returns ID of device containing the file.`
            'inode' - `returns inode number.`
            'type' - `returns file type like 'd', 'b', or 's'.`
            'mode_digits' - `returns file mode like '0644'.`
            'mode_alphas' - `returns file mode like 'rwxrwxr-x'.`
            'nlink' - `returns number of hard links.`
            'uid' - `returns the user ID of owner.`
            'gid' - `returns the group ID of owner.`
            'rdev' - `returns the device ID if it is a special file.`
            'size' - `returns total size in bytes.`
            'blksize' - `returns block size for filesystem I/O.`
            'blocks' - `returns number of 512B blocks allocated.`
            'atime' - `returns time of last acces.`
            'mtime' - `returns time of last modification.`
            'ctime' - `returns time of last status change.`
            'all' - `returns all above information.`
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
    'dev_major': <ulongint: `the major ID of device containing file`>,
    'dev_minor': <ulongint: `the minor ID of device containing file`>,
    'inode': <ulongint: `inode numbe`r>
    'type': <string: `file type like 'd', 'b', or 's'`>,
    'mode_digits': <string: `file mode like '0644'`>,
    'mode_alphas': <string: `file mode like 'rwxrwxr-x'`>,
    'nlink': <number: `number of hard links`>,
    'uid': <numer: `the user ID of owner`>,
    'gid': <number: `the group ID of owner`>,
    'rdev_major': <ulongint: `the major device ID if it is a special file`>,
    'rdev_minor': <ulongint: `the minor device ID if it is a special file`>,
    'size': <ulongint: `total size in bytes`>,
    'blksize': <ulongint: `block size for filesystem I/O`>,
    'blocks': <ulongint: `number of 512B blocks allocated`>,
    'atime_sec': <ulongint: `time of last acces (seconds since Epoch)`>,
    'atime_nsec': <ulongint: `time of last acces (nanoseconds since 'atime_sec')`>,
    'mtime_sec': <ulongint: `time of last modification (seconds since Epoch)`>,
    'mtime_nsec': <ulongint: `time of last modification (nanoseconds since 'mtime_sec')`>,
    'ctime_sec': <ulongint: `time of last status change (seconds since Epoch`)>
    'ctime_nsec': <ulongint: `time of last status change (nanoseconds since 'ctime_sec'`)>
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
) string | false
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
            'dev' - `returns ID of device containing the file.`
            'inode' - `returns inode number.`
            'type' - `returns file type like 'd', 'b', or 's'.`
            'mode_digits' - `returns file mode like '0644';`
            'mode_alphas' - `returns file mode like 'rwxrwxr-x';`
            'nlink' - `returns number of hard links.`
            'uid' - `returns the user ID of owner.`
            'gid' - `returns the group ID of owner.`
            'rdev' - `returns the device ID if it is a special file.`
            'size' - `returns total size in bytes.`
            'blksize' - `returns block size for filesystem I/O.`
            'blocks' - `returns number of 512B blocks allocated.`
            'atime' - `returns time of last acces.`
            'mtime' - `returns time of last modification.`
            'ctime' - `returns time of last status change.`
            'all' - `returns all above information.`
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

**参见**

- PHP `stat()` 函数：<https://www.php.net/manual/en/function.stat.php>

#### 4.2.24) `symlink` 方法

创建符号链接。

**描述**

```js
$FS.link(
        < string $target: Target of the link. >,
        < string $link: The link name. >
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
        < string $directory: The directory where the temporary filename will be created. >
        < string $prefix: The prefix of the generated temporary filename. >
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
        < string $filename: Path to the file. >
        [, <real $mtime = 0: The modification time, if it is 0 or negative, use the current system time. >
            [, <real $atime = 0: The access time, if it is 0 or negative, use `mtime`. > ]
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
        [ string $mask = '': The new umask. ]
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
        < string $filename: Path to the file. >
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
            'binary' - `reads the contents as a byte sequence.`
            'string' - `reads the contents as a string in UTF-8.`
            'strict' - `throw the `BadEncoding` exception for a bad encoded string.`
            'silent' - `stops reading for any error and returns the read data.`
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
            'append' - `if file $filename already exists, append the data to the file instead of overwriting it.`
            'lock' - `acquires an exclusive lock on the file while proceeding to the writing.`
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
        < string $pathname: Path to the directory. >
) native
```

该方法打开指定的路径，用于读取其中的目录项，返回的数据对应一个原生实体，可在随后的 `readdir` 中使用。

注意，打开的路径将在释放原生实体时自动进行，故而不需要 `closedir` 方法。

**参数**

**返回值**

一个原生实体，可用于 `readdir` 或者 `rewinddir` 方法。

**示例**

**参见**

- PHP `opendir()` 函数：<https://www.php.net/manual/en/function.opendir.php>

#### 4.2.31) `readdir` 方法

读取下一个目录项。

**描述**

```js
$FS.readdir(
        < specific $dir: an entity returned by opendir. >
) object | false
```

**参数**

**返回值**

如果正确读取了下一个目录项，则返回如下对象：

```js
{
    type: <string: file type like 'd' (directory), 'b' (block device), 'c' (character device), 'p' (named pipe, FIFO), 's' (UNIX domain socket), 'r' (regular file), 'l' (symbolic link), 'u' (unknown)>,
    name: <string: the file name>,
    inode: <ulongint: inode number>,
}
```

**示例**

**参见**

- PHP `readdir()` 函数：<https://www.php.net/manual/en/function.readdir.php>

#### 4.2.32) `rewinddir` 方法

重置目录流。

**描述**

```js
$FS.rewinddir(
        < specific $dir: an entity returned by opendir. >
) boolean
```

**参数**

**返回值**

**示例**

**参见**

- PHP `rewinddir()` 函数：<https://www.php.net/manual/en/function.rewinddir.php>

### 4.3) `FILE`

`FILE` 是一个可装载的动态变量，该变量用于实现常见的文件读写操作。

该变量被设计两级对象：

- `txt`：提供以文本文件方式读写的接口。
- `bin`：提供以二进制文件方式读写的接口。

**备注**

当指定的文件以相对路径形式（即没有前导 `/` 符号）给出时，该对象的所有方法将使用当前会话维护的当前工作路径信息（同 `$SYSTEM.cwd`）。

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

### 4.4) `STREAM`

`STREAM` 是一个可装载的动态变量，该变量用于实现常见的读写流操作。

#### 4.4.1) `stdin` 静态属性

这是一个静态属性，对应一个原生实体，其值可用于流式读写的读取接口，是 C 语言标准输入流的封装。

#### 4.4.2) `stdout` 静态属性

这是一个静态属性，对应一个原生实体，其值可用于流式读写的写入接口，是 C 语言标准输出流的封装。

**示例**

```
// 将内核名称（如 `Linux`）输出到标准输出。
$STREAM.writelines($STREAM.stdout, $SYSTEM.uname_prt('kernel-name'))
```

#### 4.4.3) `stderr` 静态属性

这是一个静态属性，其对应一个原生实体，值可用于流式读写的写入接口，是 C 语言标准错误流的封装。

#### 4.4.4) `open` 方法

打开流，返回一个代表流的原生实体值。这个原生实体可以被观察。

**描述**

```js
$STREAM.open(
        < string $uri: `the URI of the stream.` >
        [, <'[read || write || append || create || truncate || nonblock] | default' $opt = 'default':
               - 'read':            `Open for reading only`
               - 'write':           `Open for writing only`
               - 'append':          `Open in append mode.  Before each write, the offset is positioned at the end of the stream`
               - 'create':          `If $uri does not exist, create it as a regular file`
               - 'truncate':        `If $uri already  exists and is a regular file and the access mode allows writing it will be truncated to length 0`
               - 'nonblock':        `open $uri in nonblocking mode`
               - 'default':         `is equivalent to 'read write'`
           >
        ]
) native | false: `the native entitiy representing the opened stream.`

```

该方法打开一个流，返回一个代表流的原生实体值。

该方法使用 URI 指定要打开的流的类型和位置，如：

- `file:///etc/passwd`：打开 `/etc/passwd` 文件。
- `file://Documents/mydata`：打开当前工作路径下的 `Document/mydata` 文件。
- `pipe:///var/tmp/apipe`：打开一个命名管道。
- `unix:///var/run/myapp.sock`：打开一个 UNIX 套接字。
- `winsock://xxx`：打开一个 Windows 套接字。
- `ws://foo.bar.com:8877`：连接到 foo.bar.com 端口 8877 上的 WebSocket。
- `wss://foo.bar.com:8877`：使用 SSL 连接到 foo.bar.com 端口 8877 上的 WebSocket。

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**备注**

1. 流的关闭将在最终释放对应的原生实体值时自动进行，故而没有对应的 `close` 方法。
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

#### 4.4.5) `readstruct` 方法

从流中读取一个二进制结构，并转换为适当的数据。

```js
$STREAM.readstruct(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < string $format: `the format of the struct`>
) array | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js

// 示例：读取一个二进制结构
$STREAM.readstruct($stream, 'i16le i32le')
```

#### 4.4.6) `writestruct` 方法

将多个数据按照指定的结构格式写入流。

```js
$STREAM.writestruct(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        <string $format: `the format string; see Binary Format Notation.` >,
        <real | string | bsequence | array $first: `the first data.` >
        [,  <real | string | bsequence | array $second: `the second data.` >
            [, <real | string | bsequence | array $third: `the third data.` >
                [, ... ]
            ]
        ]
) number | false
```

该函数将传入的多个实数、实数数组、字符串或字节序列按照 `$format` 指定的二进制格式写入流。

```js
$STREAM.writestruct(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < string $format: `the format string; see Binary Format Notation.` >,
        < array $data >
) number | false
```

当传入三个参数，且第三个参数为数组时，该函数将传入的数组之成员依次按照 `$format` 指定的二进制格式写入流。

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js
// 示例: 写入两个数字
$STREAM.writestruct($stream,  "i16le i32le", 10, 10)

// 示例: 写入一个数组 和 一个数字 (第三个参数为数组)
$STREAM.writestruct($stream,  "i16le:2 i32le", [[10, 15], 255])

// 示例: 写入一个数组 和 一个数字 (多个参数)
$STREAM.writestruct($stream,  "i16le:2 i32le", [10, 15], 255)
```

#### 4.4.7) `readlines` 方法

从流中读取给定行数，返回字符串数组。

**描述**

```js
$STREAM.readlines(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < real $lines: `the number of lines to read`>
) string | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js

// 示例：读取10行
$STREAM.readlines($stream, 10)
```

#### 4.4.8) `writelines` 方法

将字符串写入流中。

**描述**

```js
$STREAM.writelines(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < 'string | array' $line: `the data to write`>
) number | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js
// 示例: 写入一行文字
$STREAM.writelines($STREAM.stdout, "This is the string to write")

// 示例: 写入多行文字
$STREAM.writelines($STREAM.stdout, ["This is the string to write", "Second line"])

```

#### 4.4.9) `readbytes` 方法

从流中读取一个字节序列，返回一个字节序列。

**描述**

```js
$STREAM.readbytes(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < real $length: `the length to read in bytes`>
) bsequence | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js

// 示例：读取10个字节
$STREAM.readbytes($STREAM.stdin, 10)
```


#### 4.4.10) `writebytes` 方法

将一个字节序列写入流。

**描述**

```js
$STREAM.writebytes(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < 'string | bsequence' $data: ` the data to write`>
) number | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**示例**

```js
// 示例: 写入字节序列
$STREAM.writebytes($STREAM.stdout, bx00112233445566778899AABBCCDDEEFF)

// 示例: 写入字符串
$STREAM.writebytes($STREAM.stdout, "write string")

```

#### 4.4.11) `seek` 方法

在流中执行定位操作。

**描述**

```js
$STREAM.seek(
        < native entity $stream: `the native entitiy representing the opened stream.` >,
        < number $offset: `the offset to be set`>,
        <'set | current | end' $whence :
        <'[kernel-name || kernel-release || kernel-version || nodename || machine || processor || hardware-platform || operating-system] | all | default' $which = 'default':
            - 'set':     `The $stream offset is set to offset bytes`
            - 'current': `The $stream offset is set to its current location plus offset bytes`
            - 'end':     `The $stream offset is set to the size of the file plus offset bytes.`
        >
) number | false

```

**异常**

- `ArgumentMissed`：未传入必要参数。
- `WrongDataType`：错误的数据类型。
- `InvalidValue`：传入无效数据。
- `AccessDenied`：

**备注**

1. 仅支持 `files://` 类型的流。

**示例**

```js
// 示例：定位到第10个字节的位置
$STREAM.seek($stream, 10, 'set')
```

#### 4.4.12) 综合示例

```html
    <init as="formats">
        [
            "bytes:2 padding:2 u32le u32le",
            "f64le f64le",
        ]
    </init>

    <init as="packages">
    </init>

    <choose on="$STREAM.open('mydata.txt', 'b')" to="iterate">
        <iterate on="$formats" in="$packages" by="RANGE: 0">
            <update on="$packages" to="append" with="$STREAM.readstruct($2, $?)" />
        </iterate>
    </choose>
```

## 附录

### 附.1) 修订记录

发布历史：

- 2022 年 04 月 01 日：发布 V1.0 RC1，标记为 'v1.0-rc1-220401'。

#### RC2) 220501

1. 调整接口，使用字符串选项而非布尔标志：
   - `$SYSTEM.time_us`
   - `$SYSTEM.timezone`

1. 使用 `regexp` 关键词替代 `reg`：
   - `$STR.streq`
   - `$STR.strne`

1. 新增方法
   - `$EJSON.pack`
   - `$EJSON.unpack`
   - `$STR.scan_c`
   - `$STR.scan_p`

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
1. 将 `$SYSTEM` 调整为全局级动态变量。
1. 将 `$SYSTEM` 中的 `random` 方法调整到 `SESSION` 变量，将时间格式化相关的方法调整到新的 `$DATETIME` 变量。
1. 添加 `$STREAM.stdin`, `$STREAM.stdout` 以及 `$STREAM.stderr` 三个静态属性，用于返回代表标准输入、标准输出和标准错误的流式读写实体。
1. 在 `$SYSTEM` 中增加 `random_sequence` 方法。
1. 将 `$SESSION` 中的 `env` 和 `cwd` 方法转移到 `$SYSTEM` 方法。
1. 在二进制格式表示法中增加 `utf16` 和 `utf32` 两种编码。
1. 新增 `$EJSON.fetchstr` 和 `$EJSON.fetchreal`，可使用二进制格式表示法从一个字节序列中抽取实数或者字符串。
1. 增强元素汇集原生实体的方法，使之可以生成指定元素汇集的子集。

#### BRC) 220201


### 附.2) 贡献者榜单

本榜单顺序按贡献时间由早到晚排列：


### 附.3) 废弃的内容

#### `const_obj` 静态属性

`const_obj` 是 `$SYSTEM` 的一个静态属性，用来定义系统常量值，程序只可增加但不可删除或修改已有的键值对：

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$SYSTEM.const_obj" to="merge">
            {
                "HVML_INTRPR_AUTHOR": "FMSoft",
            }
        </update>
    </head>

    <body>
        ...
    </body>
</hvml>
```

由于 `$SYSTEM` 是系统级（或会话级）变量，故而可以在当前当前系统（或当前会话）的另一个 HVML 程序中观察该数据上的变化：

```html
    <observe on="$SYSTEM.const_obj" for="change:grown" in="#theStatusBar">
        ...
    </observe>
```

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

