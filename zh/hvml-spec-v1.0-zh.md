# HVML 规范

Subject: HVML Specification  
Version: 1.0-RCc  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: July, 2020  
Last Modified Date: May 31, 2023  
Status: Release Candidate  
Release Name: 硕鼠  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2020, 2021, 2022, 2023 魏永明  
版权所有 &copy; 2021, 2022, 2023 北京飞漫软件技术有限公司  
保留所有权利

此文档不受 HVML 相关软件开源许可证的管辖。

版权所有人公开此文档的目标，用于向开发者解释 HVML 相关设计原理或者相关规范。在未获得版权所有人书面许可的情况下，任何人不得复制或者分发本文档的全部或部分内容，或利用本文档描绘的技术思路申请专利、撰写学术论文等。

本文提及的版权所有人相关注册商标或商标之详细列表，请查阅文档末尾。

**目录**

[//]:# (START OF TOC)

- [1) 介绍](#1-介绍)
   + [1.1) 背景技术](#11-背景技术)
   + [1.2) 问题](#12-问题)
   + [1.3) 目的](#13-目的)
   + [1.4) 应用框架](#14-应用框架)
- [2) HVML 详解](#2-hvml-详解)
   + [2.1) 基本原理](#21-基本原理)
      * [2.1.1) 程序结构](#211-程序结构)
      * [2.1.2) 基本数据类型](#212-基本数据类型)
      * [2.1.3) 扩展数据类型](#213-扩展数据类型)
      * [2.1.4) 任意数据类型的强制转换规则](#214-任意数据类型的强制转换规则)
         - [2.1.4.1) 数值化](#2141-数值化)
         - [2.1.4.2) 布尔化](#2142-布尔化)
         - [2.1.4.3) 字符串化](#2143-字符串化)
         - [2.1.4.4) 序列化](#2144-序列化)
         - [2.1.4.5) 键值对象](#2145-键值对象)
      * [2.1.5) 可变数据和不可变数据](#215-可变数据和不可变数据)
      * [2.1.6) 变量](#216-变量)
         - [2.1.6.1) 变量的类型](#2161-变量的类型)
         - [2.1.6.2) 上下文变量](#2162-上下文变量)
         - [2.1.6.3) 预定义变量](#2163-预定义变量)
         - [2.1.6.4) 集合变量](#2164-集合变量)
         - [2.1.6.5) 变量名约定](#2165-变量名约定)
      * [2.1.7) 求值表达式及参数化数据](#217-求值表达式及参数化数据)
         - [2.1.7.1) 复合求值表达式](#2171-复合求值表达式)
         - [2.1.7.2) 表达式变量和替身表达式](#2172-表达式变量和替身表达式)
      * [2.1.8) 栈式虚拟机](#218-栈式虚拟机)
      * [2.1.9) 框架元素](#219-框架元素)
      * [2.1.10) 模板元素](#2110-模板元素)
      * [2.1.11) 动作元素](#2111-动作元素)
         - [2.1.11.1) 用来操作数据的动作元素](#21111-用来操作数据的动作元素)
         - [2.1.11.2) 用于操控执行栈的动作元素](#21112-用于操控执行栈的动作元素)
         - [2.1.11.3) 其他动作元素](#21113-其他动作元素)
      * [2.1.12) 错误和异常的处理](#2112-错误和异常的处理)
      * [2.1.13) 介词属性](#2113-介词属性)
      * [2.1.14) 副词属性](#2114-副词属性)
      * [2.1.15) 引用元素或数据](#2115-引用元素或数据)
      * [2.1.16) 协程和虚拟机状态](#2116-协程和虚拟机状态)
      * [2.1.17) 文档片段的结构化数据表达](#2117-文档片段的结构化数据表达)
      * [2.1.18) MIME 类型](#2118-mime-类型)
      * [2.1.19) HVML URI 图式](#2119-hvml-uri-图式)
         - [2.1.19.1) `hvml` 图式](#21191-hvml-图式)
         - [2.1.19.2) `hvml+run` 图式](#21192-hvmlrun-图式)
   + [2.2) 规则、表达式及方法的描述语法](#22-规则表达式及方法的描述语法)
      * [2.2.1) 规则描述语法](#221-规则描述语法)
      * [2.2.2) 求值表达式的语法](#222-求值表达式的语法)
      * [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)
      * [2.2.4) 动态对象方法的描述语法](#224-动态对象方法的描述语法)
      * [2.2.5) eJSON 语法](#225-ejson-语法)
   + [2.3) 框架标签详解](#23-框架标签详解)
      * [2.3.1) `hvml` 标签](#231-hvml-标签)
      * [2.3.2) `head` 标签](#232-head-标签)
      * [2.3.3) `body` 标签](#233-body-标签)
      * [2.3.4) `hvml` 标签的内容](#234-hvml-标签的内容)
   + [2.4) 模板标签详解](#24-模板标签详解)
      * [2.4.1) `archetype` 标签](#241-archetype-标签)
      * [2.4.2) `archedata` 标签](#242-archedata-标签)
      * [2.4.3) `error` 标签](#243-error-标签)
      * [2.4.4) `except` 标签](#244-except-标签)
   + [2.5) 动作标签详解](#25-动作标签详解)
      * [2.5.1) `init` 标签](#251-init-标签)
      * [2.5.2) `update` 标签](#252-update-标签)
         - [2.5.2.1) 指定目标位置](#2521-指定目标位置)
         - [2.5.2.2) 更新集合](#2522-更新集合)
      * [2.5.3) `erase` 标签](#253-erase-标签)
      * [2.5.4) `clear` 标签](#254-clear-标签)
      * [2.5.5) `test`、 `match` 和 `differ` 标签](#255-test-match-和-differ-标签)
         - [2.5.5.1) 多分支处理](#2551-多分支处理)
         - [2.5.5.2) 二选一处理](#2552-二选一处理)
      * [2.5.6) `choose` 标签](#256-choose-标签)
      * [2.5.7) `iterate` 标签](#257-iterate-标签)
         - [2.5.7.1) 使用迭代执行器](#2571-使用迭代执行器)
         - [2.5.7.2) 不使用迭代执行器](#2572-不使用迭代执行器)
      * [2.5.8) `reduce` 标签](#258-reduce-标签)
      * [2.5.9) `sort` 标签](#259-sort-标签)
      * [2.5.10) `define` 和 `include` 标签](#2510-define-和-include-标签)
      * [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签)
      * [2.5.12) `call` 和 `return` 标签](#2512-call-和-return-标签)
      * [2.5.13) `bind` 标签](#2513-bind-标签)
      * [2.5.14) `catch` 标签](#2514-catch-标签)
      * [2.5.15) `back` 标签](#2515-back-标签)
      * [2.5.16) `request` 标签](#2516-request-标签)
      * [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)
      * [2.5.18) `inherit` 标签](#2518-inherit-标签)
      * [2.5.19) `sleep` 标签](#2519-sleep-标签)
   + [2.6) 执行器](#26-执行器)
      * [2.6.1) 内建执行器](#261-内建执行器)
         - [2.6.1.1) `KEY` 执行器](#2611-key-执行器)
         - [2.6.1.2) `RANGE` 执行器](#2612-range-执行器)
         - [2.6.1.3) `FILTER` 执行器](#2613-filter-执行器)
         - [2.6.1.4) 用于字符串的内建执行器](#2614-用于字符串的内建执行器)
         - [2.6.1.5) 用于数值的内建执行器](#2615-用于数值的内建执行器)
         - [2.6.1.6) `SQL` 执行器](#2616-sql-执行器)
         - [2.6.1.7) `TRAVEL` 执行器](#2617-travel-执行器)
         - [2.6.1.8) 内建执行器的使用](#2618-内建执行器的使用)
      * [2.6.2) 外部执行器](#262-外部执行器)
         - [2.6.2.1) 外部函数执行器](#2621-外部函数执行器)
         - [2.6.2.2) 外部类执行器](#2622-外部类执行器)
      * [2.6.3) 执行器规则表达式的处理](#263-执行器规则表达式的处理)
   + [2.7) 响应式更新](#27-响应式更新)
- [3) HVML 语法](#3-hvml-语法)
   + [3.1) 书写 HVML 文档](#31-书写-hvml-文档)
      * [3.1.1) DOCTYPE](#311-doctype)
      * [3.1.2) 元素](#312-元素)
         - [3.1.2.1) 起始标签](#3121-起始标签)
         - [3.1.2.2) 终止标签](#3122-终止标签)
         - [3.1.2.3) 属性](#3123-属性)
         - [3.1.2.4) 动作元素属性](#3124-动作元素属性)
         - [3.1.2.5) 可选标签](#3125-可选标签)
         - [3.1.2.6) 裸文本元素和可转义裸文本元素的内容限制](#3126-裸文本元素和可转义裸文本元素的内容限制)
         - [3.1.2.7) 数据内容和数据属性](#3127-数据内容和数据属性)
      * [3.1.3) 文本](#313-文本)
         - [3.1.3.1) 新行](#3131-新行)
      * [3.1.4) 字符引用](#314-字符引用)
      * [3.1.5) CDATA 段落](#315-cdata-段落)
      * [3.1.6) 注释](#316-注释)
   + [3.2) 解析 HVML 文档](#32-解析-hvml-文档)
- [4) 应用示例](#4-应用示例)
   + [4.1) 使用 HVML 开发传统 GUI 应用](#41-使用-hvml-开发传统-gui-应用)
   + [4.2) 云应用](#42-云应用)
- [5) 总结](#5-总结)
- [附录](#附录)
   + [附.1) 修订记录](#附1-修订记录)
      * [RCc) 230531](#rcc-230531)
         - [RCc.1) 新增渲染器事件](#rcc1-新增渲染器事件)
      * [RCb) 230430](#rcb-230430)
         - [RCb.1) 调整页面及工作区的名称规范](#rcb1-调整页面及工作区的名称规范)
         - [RCb.2) 调整渲染器相关事件](#rcb2-调整渲染器相关事件)
         - [RCb.3) 指定 HTTP 自定义请求头部的方法](#rcb3-指定-http-自定义请求头部的方法)
         - [RCb.4) 调整 `hvml:` 图式](#rcb4-调整-hvml-图式)
      * [RCa) 230331](#rca-230331)
         - [RCa.1) 调整 `DOCTYPE` 的 `SYSTEM` 标识符规则](#rca1-调整-doctype-的-system-标识符规则)
         - [RCa.2) 调整 `catch` 动作元素的结果](#rca2-调整-catch-动作元素的结果)
         - [RCa.3) 微调 `update` 动作元素](#rca3-微调-update-动作元素)
      * [RC9) 221231](#rc9-221231)
         - [RC9.1) 定义骨架元素属性的响应式处理语法](#rc91-定义骨架元素属性的响应式处理语法)
         - [RC9.2) 文档片段的结构化数据表达](#rc92-文档片段的结构化数据表达)
         - [RC9.3) 调整 `update` 元素相关细节](#rc93-调整-update-元素相关细节)
         - [RC9.4) 调整 `request` 元素相关细节](#rc94-调整-request-元素相关细节)
      * [RC8) 221130](#rc8-221130)
         - [RC8.1) 反引号属性值语法](#rc81-反引号属性值语法)
         - [RC8.2) 新的数据类型别名](#rc82-新的数据类型别名)
         - [RC8.3) 框架元素中的副词属性](#rc83-框架元素中的副词属性)
         - [RC8.4) 杂项](#rc84-杂项)
      * [RC7) 221031](#rc7-221031)
         - [RC7.1) 替身表达式](#rc71-替身表达式)
         - [RC7.2) 调整变量一节](#rc72-调整变量一节)
         - [RC7.3) 调整定义元组的 eJSON 语法](#rc73-调整定义元组的-ejson-语法)
         - [RC7.4) 调整副词属性的名称](#rc74-调整副词属性的名称)
         - [RC7.5) 介词属性的增强](#rc75-介词属性的增强)
      * [RC6) 220901](#rc6-220901)
         - [RC6.1) 增强变量名](#rc61-增强变量名)
         - [RC6.2) 增强 `request` 标签](#rc62-增强-request-标签)
         - [RC6.3) 调整 HVML URI 图式](#rc63-调整-hvml-uri-图式)
         - [RC6.4) 新增元组容器类型](#rc64-新增元组容器类型)
         - [RC6.5) 重新求值](#rc65-重新求值)
      * [RC5) 220701](#rc5-220701)
         - [RC5.1) 调整对 `include` 标签的描述](#rc51-调整对-include-标签的描述)
         - [RC5.2) 调整 `request` 标签](#rc52-调整-request-标签)
         - [RC5.3) 调整 `load` 和 `call` 标签](#rc53-调整-load-和-call-标签)
         - [RC5.4) HVML URI 图式及协程描述符](#rc54-hvml-uri-图式及协程描述符)
         - [RC5.5) 增强 `sort` 标签](#rc55-增强-sort-标签)
         - [RC5.6) 调整 `observe` 标签](#rc56-调整-observe-标签)
         - [RC5.7) 框架标签的内容](#rc57-框架标签的内容)
         - [RC5.8) 其他修订](#rc58-其他修订)
      * [RC4) 220601](#rc4-220601)
         - [RC4.1) 重构`基本原理`一节](#rc41-重构基本原理一节)
         - [RC4.2) MIME 类型和数据](#rc42-mime-类型和数据)
         - [RC4.3) `inherit` 标签](#rc43-inherit-标签)
         - [RC4.4) `sleep` 标签](#rc44-sleep-标签)
         - [RC4.5) 调整上下文变量](#rc45-调整上下文变量)
         - [RC4.6) 元素及属性的调整](#rc46-元素及属性的调整)
         - [RC4.7) `differ` 标签](#rc47-differ-标签)
      * [RC3) 220501](#rc3-220501)
         - [RC3.1) 调整动作标签](#rc31-调整动作标签)
         - [RC3.2) HVML 程序的运行状态](#rc32-hvml-程序的运行状态)
         - [RC3.3) 可使用元素的锚点名称定位前置栈帧](#rc33-可使用元素的锚点名称定位前置栈帧)
         - [RC3.5) eJSON 语法增强](#rc35-ejson-语法增强)
         - [RC3.6) `$STREAM` 预定义变量](#rc36-stream-预定义变量)
         - [RC3.7) 调整动态对象方法的描述语法](#rc37-调整动态对象方法的描述语法)
         - [RC3.8) 事件名称的命名规则](#rc38-事件名称的命名规则)
         - [RC3.9) 简化外部执行器](#rc39-简化外部执行器)
         - [RC3.10) 协程及其状态](#rc310-协程及其状态)
      * [RC2) 220401](#rc2-220401)
         - [RC2.1) 用户自定义临时变量的初始化和重置方法](#rc21-用户自定义临时变量的初始化和重置方法)
         - [RC2.2) 调整动态对象方法的描述语法](#rc22-调整动态对象方法的描述语法)
         - [RC2.3) 上下文变量的增强和调整](#rc23-上下文变量的增强和调整)
         - [RC2.4) `iterate` 元素的增强](#rc24-iterate-元素的增强)
         - [RC2.5) 调整第一章的内容](#rc25-调整第一章的内容)
         - [RC2.6) 异常相关增强](#rc26-异常相关增强)
         - [RC2.7) 可命名一个 `observe`](#rc27-可命名一个-observe)
         - [RC2.8) 增强 `request`](#rc28-增强-request)
         - [RC2.9) 调整介词属性](#rc29-调整介词属性)
         - [RC2.10) 调整响应式处理的语法](#rc210-调整响应式处理的语法)
         - [RC2.11) 增强 `bind` 标签](#rc211-增强-bind-标签)
         - [RC2.12) 复合求值表达式](#rc212-复合求值表达式)
         - [RC2.13) 调整布尔化规则](#rc213-调整布尔化规则)
      * [RC1) 220209](#rc1-220209)
         - [RC1.1) 上下文变量的调整](#rc11-上下文变量的调整)
         - [RC1.2) `init` 标签的增强](#rc12-init-标签的增强)
         - [RC1.3) 针对数值执行器的附加说明](#rc13-针对数值执行器的附加说明)
         - [RC1.4) `observe` 标签的增强](#rc14-observe-标签的增强)
         - [RC1.5) 骨架元素的增强](#rc15-骨架元素的增强)
         - [RC1.6) 属性值操作符的增强](#rc16-属性值操作符的增强)
      * [BRC) 其他](#brc-其他)
   + [附.2) 待定内容](#附2-待定内容)
      * [TBD 1) 扩展数据类型](#tbd-1-扩展数据类型)
         - [TBD 1.1) 扩展数据类型](#tbd-11-扩展数据类型)
      * [TBD2) 动作元素](#tbd2-动作元素)
         - [TBD2.1) `pipe` 标签](#tbd21-pipe-标签)
         - [TBD2.2) `connect`、 `send` 和 `disconnect` 标签](#tbd22-connect-send-和-disconnect-标签)
         - [TBD2.3) 外部函数更新器](#tbd23-外部函数更新器)
         - [TBD2.4) 杂项](#tbd24-杂项)
   + [附.3) 贡献者榜单](#附3-贡献者榜单)
   + [附.4) 商标声明](#附4-商标声明)

[//]:# (END OF TOC)

## 1) 介绍

### 1.1) 背景技术

本文涉及的背景技术及其最新规范如下：

- HTML 及其规范。HTML 和 CSS 等规范和标准是由 W3C <https://www.w3.org> 组织制定的，用来规范 Web 页面内容的编写和渲染行为。关键规范如下：
   * HTML：超文本标记语言（HyperText Markup Language），用于表述网页内容结构的标准。HTML 最新规范：<https://html.spec.whatwg.org/>。
   * CSS：级联样式表（Cascading Style Sheets），用于定义 HTML 页面元素布局、渲染效果等的规范。在 CSS 2.2 <https://www.w3.org/TR/CSS22/> 之后，CSS 规范开始按照模块划分，各模块分头演进，目前普遍支持到 Level 3。在如下网页中可以看到 CSS 各模块的规范进展情况：<https://drafts.csswg.org>。
   * JavaScript/ECMAScript：一种符合 ECMAScript 规范的脚本编程语言，最初由网景公司设计给浏览器使用，用于操控 HTML 页面中的内容和渲染行为，现在由欧洲计算机制造商协会和国际标准化组织负责制定相关标准，最新的标准为 ECMA-262：<http://www.ecma-international.org/publications/standards/Ecma-262.htm>。
   * DOM：文档对象模型（Document Object Model），用于 XML/HTML 文档结构的内部表达。一个 XML/HTML 文档，会被 XML/HTML 解析器解析并生成一个 DOM 树，XML/HTML 文档中的每个元素构成 DOM 树上的元素结点，而每个元素的子元素、属性、文本内容等，又构成了这个元素节点的子节点。有关 DOM 的最新的规范可见：<https://dom.spec.whatwg.org/>。
   * JSON：JavaScript 对象表述法（JavaScript Object Notation）是一种轻量级的信息互换格式。最初被用于 JavaScript 对象的字符串表达，易于被 JavaScript 脚本代码使用，现在被广泛使用在不同编程语言或软件模块之间的数据交换。有关 JSON 的描述，可见：<https://json.org/>。
- 用户代理（User Agent）是 HTML 规范的一个术语，用来指代可以解析 HTML、CSS 等 W3C 规范，并对 HTML 文档内容进行渲染，进而呈现给用户并实现用户交互的计算机程序。我们熟知的浏览器就是用户代理。但用户代理不限于浏览器，可以是一个软件组件，也可以是一个应用框架。比如，内嵌到电子邮件客户端程序中，用以解析和渲染 HTML 格式邮件的软件组件，本质上也是 HTML 用户代理。
- XML：可扩展标记语言（The Extensible Markup Language）是由 W3C 组织制定的，用来表述结构化信息的一种简单文本格式。和 HTML 相比，XML 使用类似的结构，但更加严格且更为通用。XML 是当今共享结构化信息的最广泛使用的格式之一，不论是在程序之间，人与人之间，计算机与人之间，也不论是在本地还是跨网络共享信息。有关 XML 的介绍和规范可参阅：<https://www.w3.org/standards/xml/>。
- 脚本编程语言。指类似 JavaScript 的计算机编程语言，通常解释执行，具有动态特征。除 JavaScript 之外，常见的脚本语言有 Python、Lua、PHP 等。
- 高级编程语言。类似 C、C++、Java、C# 的编程语言，通常编译执行，直接运行在计算机硬件之上或者虚拟机之上。
- SQL：结构化查询语言（Structured Query Language），用于关系型数据库的数据操作语言，目前几乎所有的关系数据库均支持 SQL。和一般的编程语言不同，SQL 具有非过程性特征，基本的 SQL 代码中不包括 if-else 这种流程控制语句。

### 1.2) 问题

随着互联网技术和应用的发展，围绕 HTML/CSS/JavaScript 发展的 Web 前端开发技术发展迅猛，甚至可以用“一日千里”来形容。五年前，基于 jQuery 和 Bootstrap 的前端框架大行其道，而从 2019 年开始，基于虚拟 DOM 技术的框架又受到前端开发者的青睐，比如著名的 [React.js]、[Vue.js] 等。值得注意的是，微信小程序、快应用等，也不约而同使用了这种虚拟 DOM 技术来构建应用框架。

所谓“虚拟 DOM”是指前端应用程序通过 JavaScript 来创建和维护一个虚拟的文档对象树，程序脚本并不直接操作真实的 DOM 树。在虚拟 DOM 树中，通过一些特别的属性实现了基于数据的一些流程控制，如条件、循环等。

另一方面，大量图形用户界面（GUI）应用，仍然在使用 C、C++、Java、C# 等编程语言开发。这些传统的 GUI 应用，其程序框架无外乎直接调用 C/C++ 或其他编程语言提供的接口，在一个事件循环中完成创建 GUI 元素，响应用户交互的工作。为了方便 GUI 应用的开发，业界存在诸多大同小异的 GUI Toolkit 库，比如早期运行在 Unix 图形工作站上的 Motif，Windows 上的 Win32、MFC，Linux 桌面发展出的 Gtk+，跨平台的 Qt，针对嵌入式的 MiniGUI 等等。

这些 GUI Toolkit 库，为提高图形用户界面应用的开发效率提供了一定的帮助，但限于编程语言的表达能力，开发者经常会陷入到操控 GUI 元素及其属性的大量细节当中。就算有可视化的界面设计器帮助开发者，其开发效率也很难和上面提到的 Web 前端技术相比。

那么，我们能否将 Web 前端技术带到浏览器之外？比如可以让 C、C++、Java 程序，甚至 Python 这类脚本语言也能轻松地使用 Web 前端技术来开发 GUI 应用？

为了将 Web 前端技术引入到通用的 GUI 应用的开发中，开源社区也做了一些探索性工作，比如 Electron 开源项目，将 Chromium + Node.js 打包在一起，让 Web 后端跑在本机上，从而方便本地 GUI 应用的开发。但 Electron 的软件栈过于复杂，限制了其应用领域。

另外，以 React.js、Vue.js 为代表的前端框架取得了巨大成功，但存在如下缺陷和不足：

1. 这些技术建立在已有成熟的 Web 标准之上，需要完整支持相关前端规范的浏览器才能运行（或者说，只能运行在浏览器之内），很难和已有基于 C/C++ 等编程语言开发的功能模块整合。
1. 由于先天局限性，在网页中使用 JavaScript 语言，一直存在开发者诟病的如下问题：
   - 安全性差。一方面业务逻辑有关的代码在最终用户的浏览器上执行，任何人都可以看到 JavaScript 程序的源代码，从而可能泄露敏感信息；另一方面，恶意代码可能在最终用户的浏览器上执行，从而导致用户敏感数据的泄露。
   - 对性能的负面影响。在浏览器中运行大量业务逻辑相关的 JavaScript 代码，会引发页面渲染和业务逻辑竞争处理器资源的问题，这是浏览器页面渲染能力和传统 GUI 开发的界面存在显著差异的一个原因。
   - 较低的代码可维护性。开发者经常会在网页的不同地方随意嵌入零散的 JavaScript 代码，这降低了整个应用系统代码的可维护性。
1. 这些技术通过引入 `v-if`、 `v-else`、 `v-for` 等虚拟属性实现了基于数据的条件和循环流程控制，割裂了代码的逻辑，破坏了代码的可读性。如下面的一个示例：

```html
<div v-if="Math.random() > 0.5">
  Now you see "{{ name }}"
</div>
<div v-else>
  Now you don't
</div>
```

### 1.3) 目的

在 [HybridOS]（合璧操作系统）的开发过程中，[魏永明](https://github.com/VincentWei)提出了一套完备、通用、易学的新式编程语言，称为 HVML。HVML 是 Hybrid Virtual Markup Language（混合虚拟标记语言）的缩写，中文名称“呼噜猫”。HVML 读作 /'huːmeil/，音似普通话读“虎妹儿”。

我们将 HVML 定义为一种可编程标记语言（Programmable Markup Language）。和 HTML 类似，HVML 使用标记语言来定义程序的结构和数据，但和 HTML 不同的是，HVML 是可编程的、动态的。HVML 通过有限的几个动作标签以及可用于定义属性和内容的表达式，实现了 XML/HTML 文档的动态生成和更新功能；HVML 还提供了和已有编程语言，如 C/C++、Rust 等进行结合的方法，从而为这些编程语言在浏览器之外利用 Web 前端技术提供了强有力的技术支撑。从这个角度讲，HVML 也可以视作是一种胶水语言。

本质上，HVML 提供了一种新的思路来解决前面的那个问题：第一，将 Web 前端技术（主要是 DOM、CSS 等）引入到其他编程语言中，而不是用 JavaScript 替代其他编程语言。第二，采用类似 HTML 的标记语言来操控文档中的元素、属性和样式，而非 JavaScript。另外，在设计 HVML 的过程中，我们有意地使用了数据驱动的概念，使得 HVML 可以非常方便地和其他编程语言以及各种网络连接协议，如数据总线、消息协议等结合在一起。这样，开发者熟悉哪种编程语言，就使用这种编程语言来开发应用的非展现和交互部分，而所有和展现及交互相关的功能，交给 HVML 来完成处理，它们之间，通过模块间流转的数据来驱动，而 HVML 提供了对数据流转过程的抽象处理能力。

尽管设计 HVML 的最初目标是为了提高图形用户界面（GUI）应用程序开发效率，但其实可用于更加通用的场景——只要程序的输出可被抽象为使用一个或者多个树状结构来表达，就可以使用 HVML；甚至我们可以像普通脚本语言那样来使用 HVML，并利用 HTML 和 CSS 来描述面向字符终端（terminal）的命令行应用程序的交互界面。

HVML 的主要特点有：

1. 描述式语法。通过符合自然语言表达习惯的动词标签以及介词属性、副词属性，HVML 让每一行代码都具有清晰的语义，可帮助开发者编写具有更好可读性的程序代码。
1. 极简设计。HVML 仅仅使用二十多个特有的标签，定义了用于操作文档、数据以及抽象的栈式虚拟机的完备指令。
1. 更高的抽象层次。开发者可以使用 HVML 以更少的代码完成更多的工作，无需过多关心技术细节。
1. 数据驱动。一方面，HVML 提供了通过操控数据来实现功能的方法。比如，我们使用更新动作操控定时器数组中的某个字段就可以开启或者关闭一个定时器，而无需调用对应的接口。另一方面，HVML 语言致力于通过统一的数据表达方式将系统中的不同模块串接起来，而不是通过复杂的接口调用来实现模块间的互操作。这两个手段可有效避免传统编程语言存在的接口爆炸问题。为了实现以上目标，HVML 在 JSON 这一广泛使用的抽象数据表达方式之上，提供了扩展的数据类型以及灵活的表达式处理能力。
1. 事件驱动。和其他编程语言不同，HVML 语言提供了观察特定事件甚至观察一个表达式结果发生变化的语言级机制。在此基础上，开发者无需关心底层的实现细节便可以轻松实现其他编程语言中难以管理的异步或并发编程。与此同时，HVML 支持协程、闭包等现代编程技术。
1. 灵活的应用框架。通过 HVML，开发者可以将性能关键的数据处理交由外部程序模块或服务器实现，和用户的交互由独立的渲染器负责，HVML 程序则负责粘合这些不同的系统组件。一方面，HVML 解决了使用不同编程语言开发的系统组件之间难以高效互操作的问题，从而可以充分发挥各个组件的优势，保护已有软件资产的价值；另一方面，采用 HVML 提供的应用框架开发应用，可最大程度地解除不同组件之间的耦合问题。

总之，HVML 提供了不同于传统编程语言的编程模式，在数据驱动的思想基础之上，HVML 提供了更加系统和完备的低代码（low code，指使用更少的代码来编写程序）编程方法。

HVML 是 HybridOS（合璧操作系统）的首选应用编程语言。

### 1.4) 应用框架

围绕 HVML 形成的应用框架，和传统的 GUI 应用框架以及 Web 前端技术都有显著的不同。传统的 GUI 应用，代码设计模式无外乎直接调用 C/C++ 或其他编程语言提供的接口，在一个事件循环中完成创建界面元素、响应用户交互的工作。Web 前端技术和传统 GUI 应用的最大区别在于描述式的 HTML 和 CSS 语言，但程序框架在本质上是一样的——事件循环，而且必须使用 JavaScript 语言。

但 HVML 提供了一个完全不一样的应用框架。

在完整的基于 HVML 的应用框架中，通常包含一个独立运行的用户界面渲染器（UI renderer）。开发者通过编写 HVML 程序来操控描述用户界面的页面内容，而页面内容最终由渲染器处理并展示到屏幕上。HVML 程序在 HVML 解释器中运行，可以和其他已有的编程语言的运行时环境结合在一起，接收由其他编程语言程序生成的数据，并按照 HVML 程序的指令，将其转换为户界面的描述信息或者变更信息。通过这样的设计，我们将所有涉及到图形用户界面的应用程序分开成两个松散的模块：

第一，一个和用户界面无关的数据处理模块，开发者可以使用任何其熟悉的编程语言和开发工具开发这个模块。比如，涉及到人工智能处理时，开发者选择 Python；在 Python 代码中，除了装载 HVML 程序之外，开发者无需考虑任何和界面渲染及交互相关的东西，比如创建一个按钮或者点击一个菜单后完成某项工作等的这类工作，开发者只需要在 Python 代码中准备好渲染用户界面所需要的数据即可，而这些数据通常使用 HTML/XML/CSS 等描述式语言来表示。我们将这些数据处理模块统称为“外部程序（external program）”。

第二，一个或者多个使用 HVML 语言编写的程序（HVML 程序），用来完成对用户界面的操控。HVML 程序根据数据处理模块提供的数据生成用户界面的描述信息，并根据用户的交互或者从数据处理模块中获得的计算结果来更新用户界面，或者根据用户的交互驱动数据处理模块完成某些工作。

如此，HVML 应用框架将操控界面元素的代码从原先调用 C、C++、Java、C# 等接口的设计模式中解放了出来，转而使用 HVML 代码来处理。而 HVML 使用类似 HTML 的标签语言来操控界面元素，通过隐藏大量细节，降低了直接使用高级编程语言操控界面元素导致的程序复杂度。

通常，我们将界面渲染器设计为类似字符控制台的哑设备，这样，我们就可以将 HVML 程序和应用的其他模块从控制界面元素展现行为的细节中解放出来。举个例子。我们在字符终端程序的开发中，可以使用一些转义控制指令来设置字符的颜色、是否闪烁等，而字符终端程序无需包含任何处理字符颜色以及闪烁的代码——因为这些细节字符控制台（可能是硬件，也可能是一个伪终端程序）帮我们默默处理了。HVML 的界面渲染器也遵循同样的设计思路，HVML 程序创建好一个按钮，至于这个按钮显示出来是什么样子的，用户如何跟它交互，这些统统无需 HVML 程序来操心——一切由渲染器在给定的描述式语言（如 HTML、CSS）的控制下运转。这带来另一个好处，由于在界面渲染器中不包含任何的应用运行逻辑代码和敏感的数据，从某种程度上讲，这带来了安全性的提高。

在 HVML 应用框架中，一个应用可以同时启动多个并行的任务，我们将这些并行的任务称为“行者（runner）”（注：不同的行者可能使用不同的编程语言开发）。使用 HVML 语言开发的行者在一个独立的 HVML 解释器实例中运行。一个解释器实例可以是一个独立运行的系统进程，也可以是解释器进程中的独立线程；这取决于解释器的具体实现方式。但不论解释器如何实现，HVML 要求单个行者可以同时装载多个 HVML 程序运行，而且解释器应该始终以独立的协程（coroutine）形式执行同一行者装载的这些 HVML 程序实例。因此，我们在本文档中使用“协程（coroutine）”一词来指代一个运行中的 HVML 程序实例。

这种设计带来了如下好处：

1. 相比线程或进程提供的并发机制，协程提供了一种低成本实现并发的机制。同一行者创建的多个协程属于同一个操作系统任务，在独立的解释器实例中运行；这些协程在解释器的协调下在单个操作系统任务（线程或者进程）中轮换执行，因此协程间的数据交换不需要考虑竞态（race-condition）问题，几乎都是无锁（lock-free）操作，这减低了处理并发的成本，从而提升了整体性能。
1. 通过将负责不同业务逻辑的代码分离到不同的协程当中实现，我们可以提高整个项目的模块化程度，从而提升项目的可测试性以及可维护性，进而提升整个项目的软件质量。

有了这样的应用框架设计，HVML 可以让几乎所有的编程语言，不论是 C/C++ 这类传统编程语言，还是 Python 这类脚本语言，都可以使用统一的模式来开发 GUI 应用。

## 2) HVML 详解

为方便描述，本文档使用如下术语：

1. `数据（data）`。指可使用 JSON 这类记法描述的数据，可用来描述如文本、数值这类基本的数据，也可以用来描述数组、键值对、树形等抽象的数据。
1. `数据项（data item 或 datum）`或`数据成员（data member）`。对数组而言，每个数组单元就是一个数据项；对对象数据而言，其中的某个键值对就是一个数据项。为防止混淆，我们避免使用 `元素（element）` 一词来指代数据项或者数据成员。
1. `标签（tag）`。在 HTML/XML/HVML 文档中，用来定义一个元素节点的元素类型名称。
1. `目标文档（destination document）`。指 HVML 程序生成的 XML/HTML 文档。
1. `元素（element）`。指文档对象模型中，使用某个标签（tag）定义的元素节点；一个文档元素可包含一个或多个属性（attribute）以及属性值，还可以包含内容（content）；一个元素可包含文本内容、数据内容或者使用标签定义的单个或多个子元素。
1. `文档片段（document fragment）`。指 XML/HTML 文档中的一个片段，可作为模板被克隆（clone）到目标文档的指定位置。
1. `文本内容（text content）`。指使用文本定义的元素内容。
1. `数据内容（data content）`。指使用抽象数据表达定义的元素内容。
1. `元素汇集（element collection）`。指使用选择器选择的零个或者多个元素。这里避免使用“集合”这个术语，是为了防止和`集合（set）`数据类型混淆。
1. `程序（program）`。一段或者一组可执行的代码集合。若无特别说明，本文档中特指 HVML 程序。
1. `解释器（interpreter）`。若无特别说明，本文档中特指用来解析并执行 HVML 程序的程序。
1. `协程（coroutine）`。若无特别说明，本文档中特指一个运行中的 HVML 程序实例。
1. `码点（code point）`。指一个表述为 `U+` 和四到六个 ASCII 大写十六进制数字形式的 Unicode 码点，范围在 U+0000 到 U+10FFFF（含）。有时候，我们会在码点之后包含码点的名称以及包含在小括号中的该码点的渲染形式，且高亮或加粗显示该码点的渲染形式。对无法渲染的码点，本文档会给出其码点名称。有关 Unicode 字符的更多术语解释如下：
   - 码点的名称由 Unicode 标准定义并以 ASCII 大写形式表述，如 `CR` 指 Carriage Return（回车）。
   - `替代符（surrogate）`是范围在 U+D800 到 U+DFFF（含）的码点。
   - 不是替代符的码点被称为`标量值（scalar value）`。
   - U+FDD0 到 U+FDEF（含）范围内的码点，以及如下码点被称为`非字符（noncharacter）`：
      + U+FFFE、 U+FFFF
      + U+1FFFE、 U+1FFFF
      + U+2FFFE、 U+2FFFF
      + U+3FFFE、 U+3FFFF
      + U+4FFFE、 U+4FFFF
      + U+5FFFE、 U+5FFFF
      + U+6FFFE、 U+6FFFF
      + U+7FFFE、 U+7FFFF
      + U+8FFFE、 U+8FFFF
      + U+9FFFE、 U+9FFFF
      + U+AFFFE、 U+AFFFF
      + U+BFFFE、 U+BFFFF
      + U+CFFFE、 U+CFFFF
      + U+DFFFE、 U+DFFFF
      + U+EFFFE、 U+EFFFF
      + U+FFFFE、 U+FFFFF
      + U+10FFFE、 U+10FFFF.
   - `ASCII 码点`是指范围在 U+0000 NULL 到 U+007F DELETE（含）的码点。
   - `ASCII 制表符或者新行符`指 U+0009 TAB、 U+000A LF 或 U+000D CR。
   - `ASCII 空白字符`是指 U+0009 TAB、 U+000A LF、 U+000C FF、 U+000D CR、或 U+0020 SPACE。也常常简称为`空白字符`。
   - `C0 控制字符`是范围在 U+0000 NULL 到 U+001F INFORMATION SEPARATOR ONE（含）的码点。
   - `C0 控制字符或空格`指 C0 控制字符或 U+0020 SPACE。
   - `控制字符`是指一个`C0 控制字符`或者范围在 U+007F DELETE 到 U+009F APPLICATION PROGRAM COMMAND（含）的码点。
   - `ASCII 数字`是范围在 U+0030（`0`）到 U+0039（`9`）（含）的字符。
   - `ASCII 大写十六进制数字`要么是一个 ASCII 数字，要么是一个范围在 U+0041（`A`）到 U+0046（`F`）（含）的码点。
   - `ASCII 小写十六进制数字`要么是一个 ASCII 数字，要么是一个范围在 U+0061（`a`）到 U+0066（`f`）（含）的码点。
   - `ASCII 十六进制数字`要么是一个 ASCII 大写十六进制数字，要么是一个 ASCII 小写十六进制数字。
   - `ASCII 大写字母`是一个范围在 U+0041（`A`）到 U+005A（`Z`）（含）的码点。
   - `ASCII 小写字母`是一个范围在 U+0061（`a`）到 U+007A（`z`）（含）的码点。
   - `ASCII 字母`要么是一个 ASCII 大写字母，要么是一个 ASCII 小写字母。
   - `ASCII 字母数字`要么是一个 ASCII 数字，要么是一个 ASCII 字母。
   - `Unihan 表意字符` 是如下范围的码点：
      + U+4E00 到 U+9FFC（含）
      + U+F900 到 U+FAD9（含）
      + U+3400 到 U+4DBF（含）
      + U+20000 到 U+2A6DD（含）
      + U+2A700 到 U+2B734（含）
      + U+2B740 到 U+2B81D（含）
      + U+2B820 到 U+2CEA1（含）
      + U+2CEB0 到 U+2EBE0（含）
      + U+2F800 到 U+2FA1D（含）
      + U+30000 到 U+3134A（含）

比如，表情符号 🤔 的码点是 U+1F914，可表述为 U+1F914（🤔），也可以表述为 U+1F914 THINKING FACE（🤔）。

### 2.1) 基本原理

在详细了解 HVML 的设计细节之前，我们通过一些代码片段描述 HVML 的关键技术特征，以期读者可以快速一览其概貌。

第一，描述式（descriptive）语法。

HVML 使用类似 XML 的语法来定义程序结构和书写代码。HVML 定义了为数不多的十多个动作标签，可用来定义变量，操作数据或者控制程序的执行路径。和这些动作标签配合，HVML 使用介词属性和副词属性来定义动作依赖的源数据、目标数据以及执行条件，从而获得更加贴近自然语言的程序表达和书写效果。这一方面降低了开发者的学习门槛，另一方面提高了代码的可读性。

比如下面的 HVML 代码片段使用 `init` 标签定义了一个名为 `emptyArray` 的空数组以及一个名为 `emptyObject` 的空对象：

```hvml
<init as 'emptyArray' with [] />
<init as 'emptyObject' with { } />
```

下面的 HVML 代码片段仍然使用 `init` 标签，但通过使用额外的属性定义了一个集合，该集合的成员来自由 `init` 元素之内容定义的一个对象数组（JSON 表达），但加入到集合中的成员将保持 `id` 键值的唯一性；也就是说，内容定义的对象数组中，已有的具有重复的 `id` 键值的成员，将被新成员覆盖。这通过副词属性 `uniquely` 和介词属性 `against` 指定的键名 `id` 来实现。

```hvml
<init as 'users' uniquely against 'id'>
    [
        { "id": "1", "avatar": "/img/avatars/1.png",
            "name": "Tom", "region": "en_US" },
        { "id": "2", "avatar": "/img/avatars/2.png",
            "name": "Jerry", "region": "zh_CN" }
        { "id": "2", "avatar": "/img/avatars/2.png",
            "name": "David", "region": "zh_CN" }
    ]
</init>
```

在上述 `init` 元素中，我们还可以使用 `from` 属性指定一个外部的 URL，从而从外部数据源中获取数据而不是硬编码数据到代码中：

```hvml
<init as 'users' from 'https://foo.bar.com/users/$SYS.locale' uniquely against 'id' />
```

假如开发者希望从外部数据源中装载数据的过程异步完成，我们只需要再增加一个副词属性 `async` 即可：

```hvml
<init as 'users' from 'https://foo.bar.com/users/$SYS.locale' uniquely against 'id' async />
```

这种语法还允许该我们混合使用外部标签来定义 HVML 程序的结构，这通过赋予未知的非 HVML 标签一个统一的动作而实现。比如下面的代码，通过 `iterate` 元素生成了由 HTML 的 `ul` 和 `li` 标签定义的偶数列表：

```hvml
<ul>
    <init as "evenNumbers" with [ ] temp >
        <iterate on 0 onlyif $L.lt($0<, 100) with $DATA.arith('+', $0<, 2L) nosetotail >
            <li>$?</li>
        </iterate>
    </init>
</ul>
```

第二，灵活的表达式。

在广泛使用的 JSON 表述方法之上，HVML 使其具有了动态处理能力以及参数化表述数据的能力。HVML 扩展了 JSON 表述方法，使之支持更多数据类型，并通过使用动态值和原生实体这两类动态数据，定义了从底层系统获得数据或者实现某种功能的方法，并在此基础上实现了灵活的表达式求值能力。这可以帮助我们利用已有的系统能力，也可以帮助开发者快速扩展 HVML 程序的功能和能力。

比如下面的 HVML 代码片段，通过表达式 `$STR.substr($SYS.locale, 0, 2)` 取系统区域字符串（如 `zh_CN`）的前两个字符作为结果，设置了 `lang` 这个属性的属性值（`zh`）：

```hvml
<hvml target="html"
        lang="$STR.substr($SYS.locale, 0, 2)">
    ...
</hvml>
```

HVML 还支持具有简单逻辑处理能力的复合表达式（使用 `{{ ... }}` 包围）。比如就上面设置目标文档语言属性的功能，若通过请求参数的 `lang` 传入，则优先使用请求参数中指定的语言：

```hvml
<hvml target="html"
        lang="{{ $REQ.lang || $STR.substr($SYS.locale, 0, 2) }}" silently>
    ...
</hvml>
```

再比如，如下的代码实现了类似 C 语言 `(x > y) ? big = x : big = y` 语句的功能：

```hvml
<init as "big" with {{ $L.gt($x, $y) && $x || $y }} temp />
<init as "small" with {{ $L.lt($x, $y) && $x || $y }} temp />
```

第三，数据驱动编程。

在 HVML 中，我们倡导围绕要处理的数据组织程序的结构，比如选择数据，在数据上迭代，执行排序或规约操作，观察数据的变化等等，甚至我们通过更改数据来操控某个功能的实现。比如增加一个定时器，我们不需要调用某个编程接口，而是在一个集合中新增一个数据项。我们将这种编程方式称为数据驱动的编程（data-driven programming）。

比如下面的 HVML 代码片段，使用 `update` 动作标签，添加了一个激活的定时器，随后使用 `choose` 和 `update` 使之无效：

```hvml
    <!-- 新增标识符为 `foo` 的定时器，间隔 3000 ms，激活状态 -->
    <update on $TIMERS to 'append'>
        { "id" : "foo", "interval" : 3000, "active" : "yes" }
    </update>

    ...

    <!-- 使标识符为 `foo` 的定时器失效 -->
    <choose on $TIMERS by "FILTER: AS 'foo'">
        <update on $? at '.active' with 'no' />
    </choose>
```

第四，模板应用和统一的文档或数据表达。

通过使用参数化的 eJSON 语法描述的模板，用于表述树状结构的目标文档内容可由 HVML 程序生成和更新，这避免了在程序代码中调用特定接口来修改目标文档，HVML 程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。另外，HVML 对文档和数据的操作提供了一致的操作动作，因此，HVML 用于操作数据的动作元素，不仅可用于操作数据，也可以可用来操作目标文档。

比如，下面的 HVML 程序片段，使用 `archetype` 元素定义了一个模板，然后使用 `iterate` 和 `update` 元素，将 `users` 数组中的数据通过模板置换处理为目标文档的片段，然后追加到目标文档中：

```hvml
<init as "users">
    [
        { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom",
            "region": "en_US", "age": 2 },
        { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry",
            "region": "zh_CN", "age": 3 }
    ]
</init>

<archetype name="user_item">
    <li class="user-item" id="user-$?.id"
            data-value="$?.id" data-region="$?.region">
        <img class="avatar" src="$?.avatar" />
        <span>$?.name</span>
    </li>
</archetype>

<ul class="user-list">
    <iterate on "$users" by "RANGE: FROM 0">
        <update on $@ to "append" with $user_item />
    </iterate>
</ul>
```

第五，独特的栈式虚拟机。

HVML 程序在一个抽象的栈式虚拟机上执行。一个 HVML 程序被解析后，会生成代表该程序结构的 vDOM（即虚拟 DOM）树，解释器从根元素开始以深度优先的顺序执行 vDOM 上的每个元素。每执行一个子孙元素，虚拟机的执行栈上会压入（push）一个新的栈帧（stack frame），直到 vDOM 的叶子元素为止，此时，解释器执行完叶子元素之后，会弹出（pop）最后的栈帧，上一个栈帧变为最后的栈帧，然后尝试执行该栈帧对应元素的下个兄弟元素。在 HVML 的栈式虚拟机上，我们可实现高效的数据管理模型，一部分数据在执行操作时作为中间数据存在，将被自动释放，另外一部分数据在栈帧中维护，从而可以自动分配和释放这些数据，只有少部分数据以静态形式存在。通过这样的管理机制，我们不需要在解释器中使用昂贵的垃圾收集器。另外，基于可动态替换的操作组，HVML 提供了就地执行或调用操作组的功能，并实现了类似闭包的特性。

比如下面的 HVML 代码片段，展示了根据当前的目标文档类型就地执行不同操作组的能力：

```hvml
<!-- 该元素定义了一个操作组，该操作组输出 HTML 片段。-->
<define as "output_html">
    <h1>HVML</h1>
    <p>$?</p>
</define>

<!-- 该元素定义了一个操作组，该操作组向系统的标准输出打印文本。-->
<define as "output_void">
    <inherit>
        $STREAM.stdout.writelines($?)
    </inherit>
</define>

<!-- 该元素根据当前 `hvml` 元素的 `target` 属性值就地执行不同的操作组。-->
<include with ${output_$CRTN.target} on $T.get('Hello, world!') />
```

第六，内置事件驱动。

HVML 在语言层面提供了对数据、变量和表达式的观察能力。只需要一个 `observe` 元素，我们就可以观察一个数据上的特定事件，变量状态的变化，甚至一个表达式值的变化。

比如，下面的代码片段观察标识符为 `foo` 的定时器的到期事件：

```hvml
<observe on $TIMERS for 'expired:foo' >
    ...
</observe>
```

再比如，下面的代码片段将一个表达式绑定为一个变量，从而可以观察这个表达式值的变化：

```hvml
<bind on $SYS.time as "rtClock" />

<observe on $rtClock for 'change'>
   ...
</observe>
```

由于 `$SYS.time` 返回的是以秒为单位的 Unix 时间戳数值，故而 `observe` 元素定义的操作组，将每秒执行一次。

第七，轻松实现异步及并发编程。

如前所述，从外部数据源中装载数据，启动子协程，发起请求等，均可异步进行。发起异步操作，只需要在 `init` 等元素中使用 `async` 副词属性并使用 `observe` 元素观察变量上的事件即可实现。如下面的代码所示：

```hvml
<init as "users" from "http://foo.bar.com/get_all_users" async />

<archetype name="user_item">
    <li class="user-item">
        <img class="avatar" src="" />
        <span></span>
    </li>
</archetype>

<ul class="user-list">
    <img src="wait.png" />
</ul>

<!-- 当我们在 users 变量上获得 `change:attached` 事件时，
     说明异步操作已完成，其数据已绑定到 users 变量上了。 -->
<observe against "users" for "change:attached" in "#user-list">
    <clear on $@ />
    <iterate on $users>
        <update on $@ to 'append' with $user_item />
    </iterate>
</observe>
```

在栈式虚拟机基础上，HVML 允许在一个虚拟机之上同时运行多个 HVML 程序，并要求解释器使用协程管理同一个虚拟机上同时运行的多个 HVML 程序实例。同时，HVML 允许并发调用操作组，从而在另一个虚拟机实例上执行一段代码。这些机制可以帮助开发者轻松实现异步及并发编程，而在其他编程语言中，异步和并发编程通常需要足够的技巧才能良好驾驭。

比如下面的代码片段，异步地并发调用了 `collectAllDirEntriesRecursively` 操作组，该操作组递归遍历指定的目录，收集其下的所有目录项，然后使用 `observe` 来观察这个并发调用的状态。显然，这个操作组是一项耗时操作。在该操作组返回结果之前，调用者可以继续执行完成其他的工作。

```hvml
    <call as "my_task" on $collectAllDirEntriesRecursively with "/" within "myRunner" concurrently asynchronously />
    <observe on "$my_task" for "callState:success">
        <iterate on $? in "#entries" by "RANGE: FROM 0">
            <update on $@ to "append" with "$dir_entry" />
        </iterate>
    </observe>
```

HVML 还允许两个协程之间互相发送请求，且两个协程可以处于不同的虚拟机实例，这提供了一种统一和高效的跨协程及虚拟机的通讯机制。

除此之外，HVML 要求解释器提供对表达式的重新求值（evaluating again）能力，从而可以在对表达式求值时，可根据需要阻塞当前协程的执行，并在相应的条件到达时唤醒该协程，之后再次对该表达式进行求值，以获得期望的结果。这有助于实现更细粒度的协程调度能力，并提供对通道（channel，类似 Go 语言）等机制的支持，从而可实现简单高效的协程间通讯机制。

比如下面的 HVML 程序，在对其中两个复合表达式求值时，`$SYS.sleep` 方法将阻塞当前的协程，从而可让出虚拟机并让其他协程继续执行：

```hvml
<hvml target="void">
    <body>

        <load from "#repeater" onto 'null:' async />

        <inherit>
            {{
                 $STREAM.stdout.writelines("COROUTINE-$CRTN.cid: $DATETIME.time_prt: I will sleep 5 seconds");
                 $SYS.sleep(5);
                 $STREAM.stdout.writelines("COROUTINE-$CRTN.cid: $DATETIME.time_prt: I am awake.");
            }}
        </inherit>

    </body>

    <body id="repeater">

        <iterate on 0 onlyif $L.lt($0<, 5) with $DATA.arith('+', $0<, 1) nosetotail >
            $STREAM.stdout.writelines("COROUTINE-$CRTN.cid: $DATETIME.time_prt")

            <sleep for '1s' />
        </iterate>

    </body>
</hvml>
```

该程序首先会异步装载另一个本体在子协程中执行，该子协程间隔一秒输出一行信息，而主协程则会在输出 `I will sleep 5 seconds` 之后立即被 `$SYS.sleep(5)` 阻塞。当五秒时间到期后，主协程将被调度器唤醒，并继续执行。此时，上述表达式将被重新求值，但会从 `$SYS.sleep(5)` 处继续。因此，上述程序的输出大致为：

```
COROUTINE-3: 2022-09-01T14:50:40+0800: I will sleep 5 seconds
COROUTINE-4: 2022-09-01T14:50:40+0800
COROUTINE-4: 2022-09-01T14:50:41+0800
COROUTINE-4: 2022-09-01T14:50:42+0800
COROUTINE-4: 2022-09-01T14:50:43+0800
COROUTINE-4: 2022-09-01T14:50:44+0800
COROUTINE-3: 2022-09-01T14:50:45+0800: I am awake.
```

第八，动态性。

在 HVML 程序中，变量名、表达式、操作组、程序等，皆可动态生成，我们甚至可以移除一个变量。

如下的代码，使用 `load` 元素装载了一个动态生成的 HVML 程序：

```hvml
<init as 'request'>
    {
        hvml: '<hvml target="html"><body><h1>$REQ.text</h1><p>$REQ.hvml</p></body></hvml>',
        text: "Hello, world!",
    }
</init>

<load on "$request.hvml" onto "hello@main" >
    $request
</load>
```

当我们不需要使用一个变量时，使用 `undefined` 重置该变量即可移除该变量：

```hvml
<init as 'request' with undefined />
```

HVML 还提供一个称为替身表达式的功能，可以让我们将一个表达式（包括复合表达式）定义为一个变量或者其上的一个方法：

```hvml
<bind on $STREAM.stdout.writelines($_ARGS[0]) as 'console' against 'puts' />

<inherit>
    $console.puts('Hello, world!')
</inherit>
```

上面 `bind` 元素，将 `on` 属性给定的表达式绑定到了 `console` 变量的 `puts` 方法上。之后，我们可以使用 `$console.puts` 来引用原始的表达式。

#### 2.1.1) 程序结构

下面用一个简单的例子来说明 HVML 的程序结构。这个 HVML 程序生成一个 HTML 页面并根据用户的交互更新这个 HTML 页面；这个 HTML 页面，将在屏幕上展示三组信息：

1. 在页面顶端显示的系统状态栏，用于展示当前时间、WiFi 信号强度、电池电量信息等。这些信息将动态更新。
1. 在页面中间位置展示用户列表，每个用户项包括用户名称、头像等信息。这些信息来自 JSON 表达的一个字典数组。
1. 在页面底部展示一个搜索引擎连接。具体的搜索引擎根据系统所在的语言地区（locale）信息确定。

```hvml
<!DOCTYPE hvml SYSTEM "f: MATH">
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">
    <head>
    </head>

    <body>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN", "age": 3 }
            ]
        </init>

        <init as="databus" with=$STREAM.open('unix:///var/tmp/hbdbus.sock','default','HBDBus') >

        <archetype name="user_item">
            <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
                <img class="avatar" src="$?.avatar" />
                <span>$?.name</span>
            </li>
        </archetype>

        <archedata name="item_user">
            {
                "id": "$?.attr[data-value]", "avatar": "$?.content[0].attr.src",
                "name": "$?.children[1].textContent", "region": "$?.attr[data-region]"
            },
        </archedata>

        <header id="theStatusBar">
            <img class="mobile-status" src="" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="" />
            <span class="local-time">12:00</span>
            <img class="battery-status" />
        </header>

        <ul class="user-list">
            <iterate on="$users" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <except type=`NoData`>
                    <img src="wait.png" />
                </except>
                <except type=`NotIterable`>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>

        <archetype name="footer_cn">
            <p><a href="http://www.baidu.com">Baidu</a></p>
        </archetype>

        <archetype name="footer_tw">
            <p><a href="http://www.bing.com">Bing</a></p>
        </archetype>

        <archetype name="footer_def">
            <p><a href="http://www.google.com">Google</a></p>
        </archetype>

        <footer id="the-footer">
            <test on="$global.locale" in='the-footer'>
                <match for="AS 'zh_CN'" exclusively>
                    <update on="$@" to="displace" with="$footer_cn" />
                </match>
                <match for="AS 'zh_TW'" exclusively>
                    <update on="$@" to="displace" with="$footer_tw" />
                </match>
                <match for="ANY">
                    <update on="$@" with="$footer_def" />
                </match>
                <except type=`NoData` raw>
                    <p>You forget to define the $global variable!</p>
                </except>
                <except type=`NoSuchKey`>
                    <p>Bad global data!</p>
                </except>
                <except type=`IdentifierError`>
                    <p>Bad archetype data!</p>
                </except>
            </test>
        </footer>

        <define as="onBatteryChanged">
            <test on="$?.level">
                <match for="GE 100" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-full.png" />
                </match>
                <match for="GT 90" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-90.png" />
                </match>
                <match for="GT 70" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-70.png" />
                </match>
                <match for="GT 50" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-50.png" />
                </match>
                <match for="GT 30" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-30.png" />
                </match>
                <match for="GT 10" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-10.png" />
                </match>
                <match for="ANY">
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-low.png" />
                </match>
            </test>
        </define>

        <choose on=$databus.subscribe('@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED')>
            <observe on="$databus" for="event:$?" in="#theStatusBar" with=$onBatteryChanged />
        </choose>

        <observe on=".avatar" for="click">
            <load from="user.hvml" as="userProfile" onto="user" async />
                {'id': $@.attr[data-value]}
            </load>
        </observe>
    </body>
</hvml>
```

首先，HVML 采用了类似 HTML 的标签来定义文档的整体结构：

- 在文档的开头，我们使用 `<!DOCTYPE hvml>` 来标记文档类型为 `hvml`。我们还使用了 `DOCTYPE` 的 `SYSTEM` 标识符来定义该 HVML 程序使用的外部标签前缀以及需要预先装载的外部模块。
- `hvml` 标签用于定义整个 HVML 程序。可包含如下属性：
   1. `target`：定义 HVML 程序的目标标记语言，取 `html`、 `xml`、 `void` 等值。
   1. 其他属性（如 `lang` 属性，用来定义语言，取值如 `en`、 `zh` 等），将被解释器在求值后克隆到目标文档的根元素。
- `head` 标签用于定义头部信息，其中可包含：
   1. 可被原样保留到目标文档的标签，如 HTML 文档的 `<meta>`、 `<link>` 标签。
   1. 全局数据的初始化或重置；使用 `init` 标签定义。
   1. 全局动态对象；使用 `init` 标签定义。
   1. 全局模板；使用 `archedata` 或 `archetype` 标签定义。
- `body` 标签用于定义文档的本体内容。在 HVML 程序中，可以定义零个或多个 `body` 本地内容，使用 `id` 属性区别不同的本体内容。在执行过程中，可通过 `load` 元素装载不同的本体内容。

其次，从上面的 HVML 程序看出，HVML 使用了类似 HTML 的标签（tag），同时也可混用 HTML 的标签。两者的区别在于：

1. HVML 是动态的，表述的是程序，而 HTML 是静态的，表述的是文档。
1. HVML 的大部分标签用来定义动作元素。每个动作元素执行一个或者一组操作，所以这些标签使用英文中的动词；而 HTML 标准通常使用名词或其简写作为标签名称，如 HTML 的常见标签 `p` 是 paragraph（段落）的简写。
1. HVML 的其他标签用来定义程序的框架或者一个模板，所以使用名词作为标签名称，如 `head` 和 `archetype`，分别用来定义一个框架元素和模板元素。
1. HVML 可混合使用 HTML、XML 等目标标记语言的标签，使用非 HVML 的标签用于定义一个外部元素。HVML 赋予所有的外部元素一个统一的操作：克隆该元素的属性和内容到当前的目标文档位置并隐式调整 HVML 程序的上下文数据。
1. HVML 的标签名称、属性名称、变量名称和规则关键词是区分大小写的，这主要是为了和 XML 相关规范保持一致。
1. HVML 元素支持如下几类属性：
   - 通用属性。目前只有 `id` 一个通用属性；该属性用来指定元素的标识符。在 HVML 中，元素的标识符主要用于定位元素或者栈帧的位置。在外部元素中使用该属性时，则该属性及其属性值将被克隆到目标文档中。
   - 名词属性。如 `name` 等，通常在模板元素中使用。
   - 介词属性。如 `on`、`with` 等，在动词元素中使用。
   - 副词属性。如 `uniquely` 等，在动词元素中使用。

现在对照上面的例子介绍 HVML 的一些特点。本文档其他章节也会引用这个例子的片段。

首先是数据驱动编程（data-driven programming）。通过基于数据的迭代、插入、更新、清除等操作，开发者不需要编写程序或者只要少量编写程序即可动态生成最终的 XML/HTML 文档。比如上面示例代码中的 `iterate` 标签，就在`$users` 变量代表的数据（在 `head` 中使用 `init` 标签定义）上做迭代，然后在目标文档的 `ul` 元素中插入了若干 `li` 元素。而 `li` 元素的属性（包括子元素）由一个 `archetype` 标签定义，其中使用 `$？` 来指代被迭代的 `$users` 中的一个数据成员。

在上面的示例代码中，我们使用了系统内置变量 `$TIMERS` 来定义定时器，每个定时器有一个全局的标识符、间隔时间以及是否激活的标志。如果要激活一个定时器，我们只需要使用 HVML 的 `update` 标签来修改对应的键值，而不需要调用某个特定的编程接口。这是数据驱动编程的另一个用法——我们不需要为定时器或者其他的类似模块的操作提供额外的应用编程接口（API）。

另外，在上面的示例代码中，我们通过 `observe` 标签观察新的数据或文档本身的变化以及用户交互事件，可实现 XML/HTML 文档或数据的动态更新。比如在最后一个 `observe` 标签中，通过监听用户头像上的点击事件来装载一个新的 `user.hvml` 程序，在新的渲染器页面展示对应用户的详细信息。

其次是彻底解除界面、交互和数据之间的耦合。通过 HVML 引入的编程模型和方法，用于表述界面的 XML/HTML 文档内容可完全由 HVML 生成和动态调整，这避免了在程序代码中直接操作文档的数据结构（即文档对象树，或简称 DOM 树），而程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。比如：

- HVML 可在文档片段模板或者数据模板中定义数据和 DOM 元素之间的映射关系（如示例代码中的 `archetype` 或 `archedata` 元素），而无需编写额外的代码完成数据到 DOM 元素属性、内容等的赋值操作。
- HVML 将错误和异常的展现和程序代码分离了开来，程序只要定义适当的错误或者异常模板（如示例代码中的 `error` 和 `except` 元素），即可定义好错误或者异常情形下要展示的内容，而无需更多的程序处理。

再次，HVML 对文档和数据的操作提供了一致的接口，这降低了接口的复杂性，有效避免了接口爆炸。在 HVML 中，我们还提供了对动态对象的支持，我们可以使用外部程序来实现自己的动态对象，且可以在这些动态对象上执行类似函数调用一样的功能。

最后，HVML 通过动作标签（通常都是一些英文的动词，如 `init`、`update`、`iterate` 等）以及与之配合的介词或副词属性来定义动作标签所依赖的数据、目标操作位置以及执行条件来完成特定的操作。这和常见的编程语言有很大不同，HVML 的描述方式更加贴近自然语言，从而可以大幅降低学习门槛。

为方便区分，我们将解析 HVML 程序之后生成的 DOM 树称为 vDOM（虚拟 DOM），而目标文档对应的 DOM 树，称为 eDOM（有效 DOM）。

#### 2.1.2) 基本数据类型

HVML 定义如下基本数据项（basic datum）类型：

- 空值（null）。
- 布尔值（boolean）。用于表示真假逻辑值，可取 `true` 或 `false` 两种值。
- 数值（number）。用于表达整数或浮点数，一般情况下，等价于 C 语言的 `double` 类型（双精度浮点数）。
- 字符串（string）。用于表达文本，始终使用 UTF-8 编码。

HVML 定义如下基本容器（basic container）类型：

- 数组（array）。可使用索引引用的多个数据项，容量可变。
- 对象（object）。用单个或多个键值对（key-value pair）表示，亦称字典、关联数组等；键值对也常被称作属性（property）。

基本数据项类型和基本容器类型统称为基本数据类型，其表达方式兼容 [JSON]。

#### 2.1.3) 扩展数据类型

本规范要求 HVML 解释器要实现如下扩展的数据类型以及两种特殊数据类型：

- 未定义（undefined）。该数据仅在内部使用，用来表示数据尚未就绪，或在更新容器数据时移除一个成员。
- 异常（exception）。该数据仅在内部使用，用来表示异常。
- 有符号长整数（longint），应实现为 64 位有符号整数。
- 无符号长整数（ulongint），应实现为 64 位无符号整数。
- 长浮点数（longdouble），对应 C 语言 long double 类型。
- 字节序列（bsequence）。
- 元组（tuple），可使用索引引用的多个数据项，一旦创建，其容量不可变，其成员不可移除，仅可置空。
- 集合（set），特殊的数组，其中的成员可根据其值或者对象数组上的唯一性键值确保唯一性。

以上扩展数据类型的表达方式使用本文档定义的 [2.2.5) eJSON 语法](#225-ejson-语法)。在本文中，“eJSON” 是 `extended JSON（扩展 JSON）` 的缩写。

HVML 还定义有如下两种特殊数据类型：

- 动态值（dynamic value）。动态值本质上由 `获取器（getter）` 和 `设置器（setter）` 方法构成，读取时，由获取器返回对应的值，设置时，由设置器完成对应的工作。
- 原生实体（native entity）。由底层实现的原生实体，通常用于代表一些可执行复杂操作的抽象数据，如读写流、长连接等。这些复杂操作包括实现虚拟属性上的获取器或设置器方法，实现对原生对象的观察（observe）等。

上述特殊数据类型属于内部数据类型，仅在运行时有效，在 HVML 代码中可通过变量和表达式访问。

动态值或者原生实体均可以作为对象的属性值存在，从而构成我们常说的动态对象。

在 HVML 中，我们扩展了对象的属性使之具有动态特性。一个动态属性，通常由 HVML 解释器或者外部程序定义或实现，要么是一个动态值，要么是一个原生实体。

从 HVML 程序的角度看，访问一个动态属性的方法和访问一个常规属性的方法并无二致。比如，我们通过访问 `$SYS.time` 可获得当前的 UNIX 时间戳。但是，在不同的时刻访问 `$SYS.time`，获得的值将会不同。这是因为这里的 `time` 就是一个动态属性。

作为动态属性的另一个特性，我们可以将某个特定的属性视作对象而在其上提供虚拟的属性，比如当我们访问 `$SYS.uname_prt.default` 时，将获得当前的操作系统内核名称（如 `Linux`）。

更进一步，我们还可以将某个特定的属性当作函数使用，通过传递参数来获得不同的返回值，或者对该属性设置特定的值。比如在 `$SYS` 对象上，如果我们要获取当前操作系统的内核名称以及发布版本号，则可以使用 `$SYS.uname_prt('kernel-name kernel-release')`，这时，我们将获得类似 `Linux 5.4.0-107-generic` 的字符串。

除了使用 `( )` 这种类似函数调用的方式之外，我们还可以使用 `(! )`，后者用于设置某个属性。比如，使用 `$SYS.cwd` 可以获得当前工作目录，而使用 `$SYS.cwd(! '/tmp' )` 可设置当前工作目录。

这里，我们引入了两种运算符：`( )` 和 `(! )`。本质上，前者对应于动态属性的获取器方法，后者对应于动态属性的设置器方法。

除了内置的 `$SYS` 动态对象或者通过 `DOCTYPE` 预先装载的动态对象之外，我们也可以通过外部程序模块实现自定义的动态对象，并通过 `init` 标签将这个动态对象和某个变量绑定在一起，如：

```hvml
    <init as="math" from="purc_dvobj_math" via="LOAD" />
```

之后，当我们访问 `$math.pi` 时，将返回 PI 的值，如果访问 `$math.sin($math.pi)` 将返回 `0.0`。

当我们引用一个动态对象上并不存在的动态属性，或者不存在的虚拟子属性，或者无法在该属性上执行函数操作时，HVML 解释器将抛出异常。

通过这样的设计，我们可以方便有效地扩展 HVML 的功能，并通过动态对象和外部模块交换数据，或者调用外部模块的功能。

#### 2.1.4) 任意数据类型的强制转换规则

##### 2.1.4.1) 数值化

在需要将任意数据强制转换为数值的情形下，按如下规则转换为数值：

1. `null`、 `undefined`、 `false` 值转换为 0。
1. `true` 值转换为 1。
1. 空字符串按 0 处理；非空字符串按照 eJSON 数值的规则进行转换，比如 `123.34` 将转换为实数，`abcd` 转换为 0。
1. 空字节序列按 0 处理；非空字节序列取最高 64 位（最长 8 字节）按小端字节序转为有符号的长整数，再转为数值。
1. 动态值，若不存在获取器方法，则按 0 处理；若存在获取器方法，则不传递任何参数调用获取器方法，若返回值为无效值则取 0，若返回值为数值型，则取其数值，若返回值为非数值型，按本规则递归处理。
1. 原生实体，尝试获取 `__number` 键名的获取器方法。若存在该方法，则不传递任何参数调用这个获取器，参考动态值处理；若不存在该方法，则取 0。
1. 数组的数值，累加所有数组单元，若数组单元不是数值型，按本规则递归处理。
1. 元组的数值，累加所有元组单元，若元组单元不是数值型，按本规则递归处理。
1. 字典的数值，累加所有键值，若某键值不是数值型，按本规则递归处理。

以上操作称为“数值化（numerify）”。

##### 2.1.4.2) 布尔化

当需要获得任何数据的布尔逻辑真假值时，按如下规则转换为布尔值：

1. 对如下情形始终视作 `false`：
   - `null`、 `undefined`、 `false`。
   - 数值: 0。
   - 空字符串。
   - 空数组。
   - 空元组。
   - 空对象。
   - 空集合。
   - 长度为零的字节序列。
1. 动态值：若不存在获取器方法，则按 `false` 处理；若存在，则不传递任何参数调用获取器方法，按本规则判断返回值。
1. 原生实体：尝试获取 `__boolean` 键名的获取器方法，若存在该方法，则不传递任何参数调用这个获取器，按本规则递归判断返回值；若不存在该方法，则取 `false`。
1. 其他情形始终视作 `true`，包括：
   - `true`。
   - 非零数值。
   - 非空字符串。
   - 非空数组。
   - 非空元组。
   - 非空对象。
   - 非空集合。
   - 长度不为零的字节序列。

以上操作称为“布尔化（booleanize）”。

##### 2.1.4.3) 字符串化

在需要将任意数据强制转换为字符串的情形下，按如下规则转换：

1. `null`、 `undefined`、 `true`、 `false` 等，使用对应的关键词字符串输出。
1. 数值（包括长整形等），格式化输出，具体输出形式，由解释器确定。
1. 字符串，使用 UTF-8 编码输出。
1. 字节序列，使用字节序列的十六进制表达方式，全大写。
1. 动态值，统一输出为 `<dynamic: %getter, %setter>`，其中 `%getter` 和 `%setter` 分别表示对动态值两个方法的格式化输出，具体形式，由解释器确定。
1. 原生实体，统一输出为 `<native: %entity>`，其中 `%entity` 表示对原生实体的格式化输出，具体形式，由解释器确定。
1. 数组：连接所有成员字符串化之后的字符串，每个成员之后追加分号（+U003B SEMICOLON）字符。
1. 元组：连接所有成员字符串化之后的字符串，每个成员之后追加分号（+U003B SEMICOLON）字符。
1. 字典：连接所有属性键名对应的字符传以及键值对应的字符串，两者之间使用冒号（+U003A COLON）分隔，每个属性之后追加逗号（+U002C COMMA）字符。

以上操作称为“字符串化（stringify）”。

比如，下面的 JSON 数据，

```json
    [
        { "id": "1", "name": "Tom", "age": 2, "male": true },
        { "id": "2", "name": "Jerry", "age": 3, "male": true }
    ]
```

将被字符串化为：

```
id:1,name:Tom,age:2,male:true,;id:2,name:Jerry,age:3,male:true,

```

字符串化数据的目的，是为了按照字符串对多个数据进行对比、排序等操作，亦用于对参数化字符串的求值结果做处理，用于和字符串的其他部分进行串接。

注意，“字符串化”不同于“序列化”，后者指按照 JSON 或 eJSON 格式化数据。

##### 2.1.4.4) 序列化

“序列化（serialize）”指按照 JSON 或者 eJSON 格式化任意数据。eJSON 格式，可见本文档 [2.2.5) eJSON 语法](#225-ejson-语法)。

序列化时，若按照 JSON 格式输出，则对 eJSON 扩展类型的数据，应统一输出为 `null` 或特定格式的字符串。

1. `undefined`。
1. 动态值。
1. 原生实体。

##### 2.1.4.5) 键值对象

在 HVML 中，我们可以将对象中的一个键值对，使用一个新的对象表示，如：

```json
{
    "nrUsers" : 2,
    "names" : [ "Tom", "Jerry" ],
}
```

这个对象中的键值对 `"nrUsers" : 2` 可表达为一个新的对象：

```json
{
    "k": "nrUsers",
    "v": 2
}
```

我们将上面这种对象称为 `键值对象`（key-value object）。

而上面的对象可以转换为一个键值对象数组：

```json
[
    { "k": "nrUsers", "v": 2 },
    { "k": "names", "v": [ "Tom", "Jerry" ] }
]
```

键值对象数组本质上形成了一个以 `k` 为唯一性键的集合。

需要说明的是，HVML 解释器会根据要求隐式地将对象的一个属性转换为键值对象，我们通常不需要显式执行这种转换。

#### 2.1.5) 可变数据和不可变数据

在 HVML 中，我们将如下数据类型称为不可变数据（immutable data）：

- 未定义（undefined）。
- 空值（null）。
- 真值（true）。
- 假值（false）。
- 数值（number）。
- 字符串（string）。
- 字节序列（byte sequence）。
- 动态值（dynamic value）。
- 原生实体（native entity）。

不可变数据的含义是，我们不能在运行时改变这个数据的值，而只能构造一个新的数据来表示新的值。

我们将如下数据类型称为可变数据（mutable data）：

- 数组（array）。
- 元组（tuple）。
- 对象（object）。
- 集合（set）。

和不可变数据相反，可变数据的含义是，我们可以在运行时改变这个数据的值。本质上，可变数据都是容器类数据，也就是数组、元组、对象和集合。我们改变这些数据的值，本质上改变的是这些数据所包含的内容，比如删除或者修改其中的一个数据项。

在 HVML 中，我们可以在可变数据上使用 `update`、 `clear`、 `erase` 等标签执行更新、清空或移除操作，这些操作本质上修改的是其中的数据项。

我们也可以在原生实体上执行更新、清空或者移除操作，但这种情况下，操作的是原生实体代表的内部数据，而不是原生实体本身。比如，对一个代表目录项的原生实体，在其上执行 `clear` 操作，将清空该目录项中的所有的文件和子目录，而在其上执行 `erase` 操作，将移除这个目录项。

HVML 不提供任何操作可以用来改变不可变数据，但开发者可以使用 `init` 标签重置一个变量为其他数据。

#### 2.1.6) 变量

除了上述用于定义文档整体结构的标签外，HVML 提供了如下用于定义数据的标签：

- `init`：该标签初始化一个变量；我们将有名字的数据称为变量。在 HVML 程序的头部（由 `head` 标签定义）使用 `init` 标签，将默认初始化一个全局变量。在 HVML 程序的正文（由 `body` 标签定义）内使用 `init` 标签，将定义一个仅在其所在父元素定义的子树中有效的局部变量。我们可以直接将 JSON 数据嵌入到 `init` 标签内，亦可通过 HTTP 等协议加载外部内容而获得。若通过 HTTP 请求时，使用 `from` 属性定义请求的 URL，`with` 属性定义请求的参数，`via` 属性定义请求的方法（如 `GET` 或 `POST`）。
- `bind`：该标签用于定义一个表达式变量。

##### 2.1.6.1) 变量的类型

在 HVML 中，当我们引用变量时，我们使用 `$` 前缀，比如 `$global`、 `$users`、 `$?` 等。当我们要指代普通的 `$` 字符时，我们使用 `\` 做转义字符。

`$global`、 `$users` 这种变量称为命名变量（named variables），又分为静态（static）命名变量和临时（temporary）命名变量；`$?` 这类使用特殊字符的变量称为上下文变量（context variables），根据 HVML 解释器的运行上下文（执行栈）确定其值。需要说明的是，在 HVML 相关文档中，程序的执行栈是从顶向下延伸的，第一个被压入的栈帧（stack frame）称为最顶（topmost）栈帧。

在 HVML 中，上下文变量和静态变量的管理机制不同：

1. 上下文变量存在于 HVML 程序的执行栈上，随着相应栈帧的弹出而自动销毁，本质上是临时变量。
1. 静态命名变量是静态的，全局存在的，和 vDOM 树中的某个元素节点关联。除非在 `init` 动作中使用 `undefined` 值重置一个静态命名变量，否则该变量会一直存在。
1. 临时命名变量本质上就是一个特殊的上下文变量。
1. 若在程序中不使用上下文变量特有的符号而使用命名变量的名称引用一个变量时，解释器将优先在当前执行栈中查找匹配该名称的临时变量，然后再在当前 vDOM 位置的父元素以及祖先元素中查找匹配该名称的静态变量。

##### 2.1.6.2) 上下文变量

HVML 定义的上下文变量罗列如下：

- `@`：指当前文档操作位置，由 eDOM 元素汇集（target element collection）表达，通常由前置操作中的介词属性 `in` 定义。
- `?`：指前置操作的结果数据（result data）。
- `!`：指用户自定义数据（user data），可用于引用临时变量。
- `^`：指前置操作的内容数据（content data），仅针对动作元素和框架元素，其他情形下为未确定。
- `:`：若前置操作的结果数据是一个键值对象，则该变量表示键名，其他情形下为未确定。
- `=`：若前置操作的结果数据是一个键值对象，则该变量表示键值，其他情形下为未确定。

以下上下文变量专用于迭代时（其他情形下为未定义）：

- `%`：当前迭代索引值（iteration index），比如第一次迭代，该变量的值为 0，第二次迭代，该变量的值为 1，以此类推。
- `~` 或 `<`：当前迭代的输入数据（iteration data），初始由介词属性 `on` 定义并可能在每次迭代后更新。

我们还可以在上下文变量的符号之前添加一个正整数来引用从当前向上回溯 `<N>` 级的上下文数据：

- `$<N><SYMB>`，如 `$1<`、 `$1?` 等：指从当前上下文向上回溯 `<N>` 级的上下文数据；这里的 `<N>` 必须是零或者正整数。这个上下文变量主要用于访问执行栈上前置栈帧中的上下文数据。当 `<N>` 为零时，指访问当前栈帧中的上下文变量。

有关当前栈帧中的上下文变量，说明如下：

1. 所有上下文变量初始定义为未确定。访问未确定的上下文变量，会产生 `NoData` 异常。
1. 上下文变量的设置和某些属性有关，比如 `$0<` 初始来自 `on` 属性值，`$0@` 来自 `in` 属性值或者继承自前一个栈帧。因此，引用这些上下文变量时，要注意动作元素规定的属性值求值顺序。

为提高代码的可读性，我们还可以使用元素的 `id` 属性定义的锚点（anchor）来定义要引用的上下文变量：

- `$#<ANCHOR><SYMB>`，如 `$#theAnchor~`、 `$#theAnchor?` 等：指从当前栈帧沿执行栈向上回溯并使用 `<ANCHOR>` 匹配对应 vDOM 元素的 `id` 属性值，从而定位到执行栈上某个栈帧的上下文数据。

##### 2.1.6.3) 预定义变量

在 HVML 中，我们通常使用 `as` 属性来给数据命名，但 HVML 保留若干变量名称用于预定义场合，我们称为预定义全局变量，习惯上全部使用大写形式。

按是否含有动态对象划分，HVML 的预定义变量可分为：

1. 动态变量，即变量对应的数据提供动态方法。
1. 非动态变量，即变量对应的数据不提供动态方法。

按变量对应数据的作用域，HVML 的预定义变量可分为：

1. 行者级变量。指该变量对应的数据对当前解释器实例中的所有 HVML 协程可见。也就是说，同一行者中的不同协程对应同一个数据副本。
1. 协程级变量。指该变量对应的数据仅对当前解释器实例中的单个 HVML 协程可见。也就是说，不同的 HVML 协程有一个自己的数据副本。

按变量是否必须提供，HVML 的预定义变量可分为：

1. 必要（required）变量。解释器必须实现该变量。
1. 可选（optional）变量。该变量的实现是可选的。

作为 HVML 规范集合的一部分，文档 [HVML 预定义变量](hvml-spec-predefined-variables-v1.0-zh.md) 详细规定了所有的预定义变量及其接口，解释器应根据规范要求做相应的实现。

下面简单介绍一些关键的预定义变量。

1) `$REQ`

`$REQ`：主要用来表述装载程序时，由其他模块提供的请求数据，一般由 HVML 解释器在装载 HVML 程序时生成。比如下面的 Python 脚本装载一个 HVML 程序，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在 HVML 程序中，我们可使用 `$REQ.nrUsers` 来引用上述脚本代码传入的值（`10`）。

`$REQ` 变量本质上是一个必要的协程级非动态对象。

2) `$SYS`

`$SYS`：一个用于访问系统基本功能的动态对象，可用于提供系统时间、当前语言地区（区域）、时区、随机序列、机器名称等。比如，我们要获得当前的 Unix 时间戳，可直接使用 `$SYS.time`，如果要获得一个随机序列，可使用 `$SYS.random_sequence`，如果我们要获得当前的机器名称，可使用 `$SYS.uname`，如果要获取当前语言地区信息，可使用 `$SYS.locale`。

`$SYS` 变量本质上是一个必要的行者级动态对象。

3) `$RUNNER`

`$RUNNER` 是一个必要的行者级动态变量，主要用于获取行者相关的信息，并提供给用户在当前行者的不同协程之间共享数据的机制。比如：

1. `$RUNNER.app_name`：获取当前行者的应用名。
1. `$RUNNER.run_name`：获取当前行者的行者名。
1. `$RUNNER.rid`：获取当前行者的行者标识符。
1. `$RUNNER.uri`：获取当前行者的统一资源标识符（URI）。
1. `$RUNNER.myObj`：静态属性，用户自定义对象。
1. `$RUNNER.user`：获取或设置 `$RUNNER.myObj` 对象的属性。
1. `$RUNNER.chan`：创建通道。

通道（channel）是一项重要的协程间通讯机制。

通道的运行机制非常简单：当某个协程要从一个没有数据的通道中接收数据时，该协程将被阻塞，而当其他协程向该通道写入数据后，该协程将被自动唤醒。下面的程序创建了两个子协程分别充当发送者和接收者，并通过通道实现了协程间的通讯：

```hvml
<hvml target="void">
    <body>

        <!-- open a channel named `myChannel` -->
        <init as chan with $RUNNER.chan(! 'myChannel' ) />

        <!-- start the writer coroutine asynchronously -->
        <load from "#writer" asynchronously />

        <!-- start the reader coroutine and wait for the result -->
        <load from "#reader">
            $STREAM.stdout.writelines("The result got from the reader: `$?`")
        </load>

    </body>

    <body id="writer">
        <init as chan with $RUNNER.chan('myChannel') />

        <iterate on [ 'H', 'V', 'M', 'L' ]>
            $chan.send($?)

            <sleep for '1s' />

        </iterate>

        <!-- close the channel -->
        <inherit>
            $RUNNER.chan(! 'myChannel', 0)
        </inherit>

    </body>

    <body id="reader">
        <choose on $RUNNER.chan('myChannel')>

            <init as result with '' />

            <!-- the channel has been closed if $chan.recv() returns false -->
            <iterate with $?.recv() silently>
                $STREAM.stdout.writelines("$DATETIME.time_prt: the data received: $?");

                <init as result at '_grandparent' with "$result$?" />
            </iterate>

            <exit with $result />
        </choose>

    </body>

</hvml>
```

以上代码，最终会的输出结果将大致如下：

```
2022-08-24T12:27:00+08:00: the data received: H
2022-08-24T12:27:01+08:00: the data received: V
2022-08-24T12:27:02+08:00: the data received: M
2022-08-24T12:27:03+08:00: the data received: L
2022-08-24T12:27:03+08:00: The result got from the reader: HVML
```

4) `$CRTN`

`$CRTN` 是一个动态对象，该对象表述的是当前正在执行的 HVML 程序实例（协程）本身，用以设置当前协程相关的参数。比如：

1. `$CRTN.base`：获取或设置 HVML 程序的默认 URL 位置（类似 HTML 的 `base` 标签）。
1. `$CRTN.max_iteration_count`：获取或设置 HVML 程序在执行 `iteration` 元素时的最大迭代次数；用于检测可能的死循环。
1. `$CRTN.max_recursion_depth`：获取或设置 HVML 程序在递归执行某个功能时的最大递归深度，以防止栈溢出。
1. `$CRTN.max_embedded_levels`：获取或设置 HVML 程序在解析或者处理嵌套的容器数据时，允许的最大嵌套层级。
1. `$CRTN.timeout`：获取或设置获取外部数据时的超时值。
1. `$CRTN.cid`：获取当前协程的协程标识符。
1. `$CRTN.uri`：获取当前协程的 URI。
1. `$CRTN.token`：获取或设置当前协程的令牌（token）。

其中，协程令牌是由解释器自动分配的行者内唯一的标识符，可用来标识一个协程。解释器可以取行者维护的新建协程之序号或者协程标志符对应的十进制字符串作为默认的令牌。协程可以通过调用 `$CRTN.token` 属性的设置器来覆盖这个自动分配的令牌。注意，我们保留下划线打头的令牌名称做特殊用途使用。比如 `_main` 表示行者创建的第一个协程。

另外，我们还可以通过 `$CRTN` 对象观察一些全局事件以及当前协程渲染状态的变化，从而优雅地处理渲染器页面被用户关闭或者渲染器丢失等的情形。这些事件有：

- `idle`：当前 HVML 协程正在监听 `$CRTN` 上的 `idle` 事件，且由于未收到任何事件而触发 `idle` 事件。
- `rdrState:pageLoaded`：当前协程的文档内容初次装载到渲染器。
- `rdrState:pageActivated`：当前协程对应的渲染器页面获得焦点。
- `rdrState:pageDeactivated`：当前协程对应的渲染器页面失去焦点。
- `rdrState:pageSuppressed`：协程和渲染器的交互（包括页面的更新以及接受来自渲染器的交互事件）被压制。
- `rdrState:pageReloaded`：当前协程的文档内容重新装载到渲染器。
- `rdrState:pageClosed`：协程对应的渲染器页面被用户关闭。
- `rdrState:connLost`：协程所在行者丢失渲染器的连接。

`$CRTN` 变量本质上是一个必要的协程级动态对象。

5) `$DOC`

`$DOC` 是一个动态对象，该对象表述的是 HVML 生成的目标文档。我们可以使用该对象上的特定键名以及 `query` 方法通过 CSS 选择器获取目标文档上的元素汇集，如：

1. `$DOC.doctype`：获取该目标文档的 `doctype` 节点内容。
1. `$DOC.query("#foo")`：获取该目标文档中 `id` 属性值为 `foo` 的元素形成的元素汇集。
1. `$DOC.query(".bar")`：获取该目标文档中 `class` 属性值为 `bar` 的所有元素形成的元素汇集。

`$DOC` 变量本质上是一个必要的协程级动态对象。

6) `$TIMERS`

`$TIMERS` 用于当前 HVML 程序的定时器，具有固定的格式，初始为一个空的集合。可使用 `update` 等元素修改它的值，如：

```hvml
<head>
    <update on="$TIMERS" to="unite">
        [
            { "id" : "foo", "interval" : 1000, "active" : "no" },
            { "id" : "bar", "interval" : 2000, "active" : "no" },
        ]
    </update>
</head>
```

上述包含在 `head` 元素中的 `update` 元素定义了两个定时器（标识符分别为 `foo` 和 `bar`），间隔分别为 1 秒和 2 秒（使用毫秒为单位定义定时器）。这两个定时器均未激活（`active` 为 `no`）。

只要在 HVML 中修改某个定时器的 `active` 参数即可激活这个定时器，然后使用 `observe` 标签即可监听定时器到期时间：

```hvml
    <choose on="$TIMERS" by="FILTER: AS 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>

    ...

    <observe on="$TIMERS" for="expired:foo" in="#the-header" >
        <update on="> span.local-time" at="textContent" with="$SYS.time('%H:%m')" />
    </observe>
```

`$TIMERS` 变量本质上是一个必要的协程级非动态对象。

7) `$L`

`$L` 是一个动态对象，该对象完成数值对比、字符串对比以及逻辑与、或、异或、取反等逻辑操作，比如：

1. `$L.not(<any>)`：用于逻辑取反操作。
1. `$L.and(<any>, <any>, ...)`：用于逻辑与运算。
1. `$L.or(<any>, <any>, ...)`：用于逻辑或运算。
1. `$L.xor(<any>, <any>)`：用于逻辑异或运算。
1. `$L.eq(<any>, <any>)`：用于比较两个参数是否在数值上相等。
1. `$L.ne(<any>, <any>)`：用于比较两个参数是否在数值上不相等。
1. `$L.gt(<any>, <any>)`：用于比较第一个参数在数值上大于第二个参数。
1. `$L.ge(<any>, <any>)`：用于比较第一个参数在数值上大于或等于第二个参数。
1. `$L.lt(<any>, <any>)`：用于比较第一个参数在数值上小于第二个参数。
1. `$L.le(<any>, <any>)`：用于比较第一个参数在数值上小于或等于第二个参数。
1. `$L.streq(<'caseless | case | wildcard | reg'>, <any>, <any>)`：用于对比两个字符串是否相等；第一个参数用来表示字符串的匹配方式（区分大小写、通配符、正则表达式），其后的两个参数用来传递两个字符串。

比如 `$L.not($L.gt(5, 3))` 的结果是假值（`false`）。

`$L` 变量本质上是一个必要的行者级动态对象。

8) `$T`

该变量主要用于文本的本地化，包含两个属性：

1. `map`：用于保存本地化字符串映射关系的对象，初始为空对象。
1. `get`：用于字符串的本地化，若未在 `map` 中定义映射关系，则返回原字符串。

常用用法如下：

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$T.map" from="https://foo.bar/messages/$SYS.locale" to="merge" />

        <title>$T.get('Hello, world!')</title>
    </head>

    <body>
        <p>$T.get('Hello, HVML!')</p>
    </body>

</hvml>
```

在上面的 HVML 代码中，我们在头部使用 `update` 标签设置了 `$T.map`，该变量的内容来自包含有 `$SYS.locale` 的一个 URL。注意其中的 `$SYS.locale` 是一个求值表达式，会返回当前系统的语言地区标识符（如 `zh_CN`），HVML 解释器求值并替代后的最终 URL 为：`https://foo.bar/messages/zh_CN`。从该 URL 获得的文件内容可能为：

```json
{
    "Hello, world!": "世界，您好！",
    "Hello, HVML!": "HVML，您好！",
}
```

以上代码最终会被解释为如下的 HTML 文档：

```hvml
<html>
    <head>
        <title>世界，您好！</title>
    </head>

    <body>
        <p>HVML，您好！</p>
    </body>
</html>
```

`$T` 变量本质上是一个必要的协程级动态对象。

9) `$DATA`

该变量主要用于获得指定数据相关的信息，比如类型、数据项个数，并完成数据的数值化、字符串化、序列化等。

1. `$DATA.type(<any>)`：获取数据的类型，如 `null`、 `boolean`、 `longdouble` 等，返回表示数据类型的字符串。
1. `$DATA.count(<any>)`：获取给定数据的数据项个数。
1. `$DATA.numerify(<any>, ["number | longint | ulongint | longdouble": the number subtype to return])`：对给定的数据执行数值化，结果数据的类型为指定的实数类型，默认为 `number`。
1. `$DATA.stringify(<any>)`：对给定数据执行字符串化，结果数据的类型为字符串。
1. `$DATA.serilize(<any>, <string: options>)`：对给定数据执行 eJSON 序列化，结果数据的类型为字符串。
1. `$DATA.arith(<arithmetic operation>, <any: operand>, <any: operand>)`：将给定的两项数据强制转换为 `longint`，然后执行指定的四则运算（加、减等）并返回结果。
1. `$DATA.bitwise(<bitwise operation>, <any: operand>[, <any: operand>])`：将给定的一项或两项数据强制转换为 `ulongint`，然后执行指定的位运算（与、或等）并返回结果。
1. `$DATA.select(<container>, <string: selector>[, <boolean: recursively])`：按照给定的选择器返回给定容器数据中符合条件的数据项或一个数据汇集。

各数据类型的数据项个数规则如下：

- 数组、元组或集合：数据项个数指数组、元组或集合中的成员数量。
- 对象：数据项个数指键值对数量。
- 其他数据类型，如字符串、数值、 `true`、 `false` 或 `null` 等：数据项个数为 1。
- `undefined`：数据项个数为 0。

在 `select` 方法中，我们对第二个参数（`selector`）使用类似 CSS 选择器的方式来返回某个数据项或者某些数据项的汇集，比如：

- 在针对基于字典数据的树形结构、数组或者元组中：
   - `[<key_name>]`：表示定义有 `<key_name>` 键名的数据项。
   - `[<key_name> = <value>]`：表示所有 `<key_name>` 的键值等于 `<value>` 的数据项。
   - `[<key_name> ~= <value>]`：表示所有 `<key_name>` 的键值包含以 `<value>` 作为空白字符分隔的完整词元的数据项。
   - `[<key_name> *= <value>]`：表示所有 `<key_name>` 的键值包含以 `<value>` 为子字符串的数据项。
   - `[<key_name> ^= <value>]`：表示所有 `<key_name>` 的键值以 `<value>` 打头的数据项。
   - `[<key_name> $= <value>]`：表示所有 `<key_name>` 的键值以 `<value>` 结尾的数据项。
- 针对数组或者元组：
   - `:nth-child(<n>)`：表示当前数组或元组中第 `<n>` 个数据项；`<n>` 可以是数字、关键词或者公式。
   - `<type>:nth-of-type(<n>)`：表示当前数组或元组中所有类型为 `<type>` 的第 `<n>` 个数据项；`<n>` 可以是数字、关键词或者公式。

使用上述选择器之后，相当于对原有的单个数据项做了一些过滤。比如 `<choose on="$users" ... />` 选择了整个 `$users` 数组或元组内容做后续处理，但如果使用 `<choose on="$DATA.select($users, ":nth-child(even)")` 则仅选择下标为偶数的数组或元组成员。

`$DATA` 变量本质上是一个必要的行者级动态对象。

10) `$STREAM`

`$STREAM` 用于实现基于读写流的操作。和 `$DOC` 变量的 `query` 方法类似，该变量上提供的 `open` 方法返回一个原生实体，在该原生实体上，我们提供用于从流中读取或者向流中写入的接口。

`$STREAM.open` 方法返回的原生实体，称为“流实体（stream entity）”。流实体提供如下基本接口：

- `readbytes` 和 `writebytes` 方法：读写字节序列。
- `readstruct` 和 `writestruct` 方法：读写二进制数据结构。
- `readlines` 和 `writelines` 方法：读写文本行。
- `seek`：在可定位流中重新定位流的读写位置。

为方便使用，我们在 `$STREAM` 变量上提供如下静态属性：

- `stdin`、 `stdout` 和 `stderr` 静态属性：C 语言标准输入、标准输出和标准错误的流实体封装。

流实体应该是可被观察的，从而可以监听读取流上是否有数据等待读取，或者是否可向写入流中写入数据。比如，我们可以观察 `$STREAM.stdin`，以便监听用户的输入：

```hvml
    <observe on="$STREAM.stdin" for="read">
        <choose on="$?.readlines(1)">
            ...
        </choose>
    </observe>
```

另外，`STREAM` 变量应使用可扩展的实现，一方面，我们可以扩展流实体的类型，比如从文件、匿名管道、命名管道到 Unix 套接字、TCP 连接，另一方面，我们可以通过支持不同的协议来扩展流实体提供的操作方法，从而在流实体上提供额外的读写方法。比如，当某个解释器实现的 `$STREAM` 方法支持发送 HTTP 协议时，即可实现发送 HTTP 请求以及处理 HTTP 协议的方法：

```hvml
    <init as="myFetcher" on="$STREAM.open('tcp://foo.com:80','default','http')">
        <choose on="$myFetcher.http_send_request('GET','/')" />
        <choose on="$myFetcher.http_read_response_header()" />
    </init>
```

作为一个有价值的设计，我们可以将传统 Unix 系统中通过匿名管道管接两个进程的行为抽象为一个流实体，比如，我们将标准输出上的内容管接（pipe）给 `/usr/bin/wc` 命令处理：

```hvml
    <init as="myStreams">
        {
            in: $STREAM.stdin,
            out: $STREAM.open('pipe:///usr/bin/wc')
        }
    </init>

    <observe on="$mySteams.in" for="read">
        <choose on="$?.out.writelines($myStreams.in.readlines(1))" />
    </observe>

    <observe on="$mySteams.out" for="read">
        <choose on="$STREAM.stdout.writelines($myStreams.out.readlines(1))" />
    </observe>
```

`$STREAM` 变量本质上是一个必要的行者级动态对象。

11) `$SOCK`

`$SOCK` 是一个用于创建流套接字或数据报套接字的原生实体对象。该变量是一个必要的行者级动态对象。

1. `$SOCK.stream()`：创建流套接字并在其上监听来自客户端的连接请求。该方法返回一个流套接字实体，可观察流套接字实体上的 `connRequest` 事件，并调用 `accept()` 方法接受连接请求。流套接字实体上的 `accept()` 方法将返回一个流实体。
1. `$SOCK.dgram()`：创建数据报套接字。

12) `$RDR`

`$RDR` 是一个代表当前行者对应的渲染器的原生实体对象，可用于获取当前的渲染器信息，如协议，URI 等。该变量是一个必要的行者级动态对象。

1. `$RDR.state`：通过该属性可获取当前的渲染器状态对象，其中包括通讯方法、渲染器 URI、协议名称、协议版本等。
1. `$RDR.connect(<comm>, <uri>)`：连接到指定的渲染器；若当前已连接到某个渲染器，则会断开该连接。
1. `$RDR.disconn()`：断开当前的渲染器连接。

##### 2.1.6.4) 集合变量

在 HVML 中，我们可以使用 JSON 数组来初始化包含在一个集合中的数据，但 JSON 本身并不具有集合的概念。因此，HVML 提供了使用数组来初始化一个集合变量的能力。也就是说，集合是具有某些特征的数组的一种内部表达，我们需要通过变量来访问集合数据。

集合有如下特征：

- 按照指定的数据项唯一性判断条件，具有唯一值的元素在集合中只能有一项。
- 我们可以在集合上执行合并、相交、相减等集合特有的操作。

当我们需要定义集合时，使用 `init` 标签的 `uniquely` 副词属性，必要时，通过 `against` 属性值指定唯一性判断条件。

我们按如下规则判断两个数据项是否相等：

- `number`、 `longint`、 `ulongint` 和 `longdouble` 视作同一种类型，强制转换为解释器可支持的最高精度实数类型后做对比；当转换后的两个实数的值相等时，这两个数据项相等。
- 两个布尔值相同时，相等。
- 两个字符串（可施加是否对大小写敏感的匹配策略）相同时，相等。
- 两个字节序列逐字节相同时，相等。
- 两个动态值的获取器和设置器相等时，相等。
- 两个原生实体指向同一原生实体对象时，相等。
- 两个不同类型的数据做对比时，执行字符串化后的字符串（可施加是否对大小写敏感的匹配策略）相同时，相等。
- 两个数组的成员逐次对比，所有成员一对一相同时，相等。
- 两个元组的成员逐次对比，所有成员一对一相同时，相等。
- 两个字典字符串化后的字符串相同时，相等。

以上有两种情况使用字符串对比。为此，在使用 `init` 标签初始化集合时，我们可使用 `casesensitively` 或者 `caseinsensitively` 两个副词属性来指定字符串对比是否对大小写敏感；默认对大小写敏感。

比如，我们使用下面的 `init` 标签定义一个字符串集合：

```hvml
    <init as="locales" uniquely>
        [ "zh_CN", 100, "zh_HK", 90, "zh_TW", 60, "en_US", 50, "en_UK", 50, "en_US", 30 ]
    </init>
```

上述用来初始化字符串集合的数组中包含有重复的 `en_US` 以及 `50`，因此，在最终的结果中只会保留一项：

```json
        [ "zh_CN", 100, "zh_HK", 90, "zh_TW", 60, "en_US", 50, "en_UK", 30 ]
```

针对字典，我们可以定义使用某个特定的键值作为唯一性判断条件。比如我们通常使用 `id` 来表示数据项的唯一标识符。这个定义类似关系数据库中的主键（primary key）。

我们使用 `init` 标签的 `against` 属性值来定义字典的唯一性键名。当使用多个键名作为唯一性条件时，使用空格分隔。比如：

```hvml
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>
```

上面的示例代码定义了一个使用 `id` 键名作为唯一性判断条件的集合。假如用来初始化这个集合的字典数组中多一项 `id` 为 `2` 的数据项，则之前 `id` 为 `2` 的数据项会被后来 `id` 为 `2` 的数据项覆盖。比如，

```hvml
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "David", "region": "zh_CN" }
        ]
    </init>
```

上述代码初始化后的 `$users` 中，`id` 为 `2` 的用户姓名将为 `David`。

需要说明的是，必要全局变量 `$TIMERS` 本质上就是一个使用键名 `id` 的键值作为唯一性判断条件的字典集合。

在向集合中添加新的数据成员时，有如下约定：

1. 不使用唯一性键名时，集合中的数据可以是任意类型，根据上述判断两个数据是否相等的规则确定唯一性。
1. 使用唯一性键名时，集合中的数据必须是字典，通过对比唯一性键名对应的键值来确定成员的唯一性。当预添加到集合中的字典缺少指定的唯一性键名时，视同其键值为 `undefined`。

HVML 为集合类数据提供了若干抽象的数据操作方法，比如求并集、交集、差集、异或集等。详情见 `update` 标签的描述。

##### 2.1.6.5) 变量名约定

解释器可自行实现一些预定义的行者级变量或者协程级变量，作为约定，解释器自行实现的全局变量，其名称应以 ASCII U+005F LOW LINE（`_`）打头，使用全大写字母并添加解释器前缀。如 `_PURC_VAR`。而一般的变量，使用全小写字母。

另外，如下的变量名被保留用于特定场合：

- `_ARGS`：用于指代传入替身表达式的所有参数（通常使用数组或者元组实现）。

开发者应该避免在 HVML 程序中使用被保留的变量名。

#### 2.1.7) 求值表达式及参数化数据

在上面的例子中，我们在文档片段模板或者数据模板中使用 `$` 前缀指定一个求值表达式。该求值表达式需要符合如下规则：

- 求值表达式可嵌套使用已绑定的动态对象，如上述示例中使用 `$string` 变量一样。
- 除上下文变量之外，变量名须符合一般的编程语言所定义的变量名规则；若使用正则表达式表示该规则，可表达为：`/^[A-Za-z_][A-Za-z0-9_]*$/`。
- 我们还可以使用 ``{{`` 和 ``}}`` 包围多个求值表达式从而构成一个复合表达式（compound hybrid evaluation expression）。在复合表达式中，我们可以利用单个求值表达式的结果来控制后续的求值行为，使之具备简单的逻辑控制功能。

在本文档中，求值表达式被简称为 `HEE`，是 `Hybrid Evaluation Expression（混合求值表达式）` 的缩写。求值表达式的语法，见本文档 [2.2.2) 求值表达式的语法](#222-求值表达式的语法) 一节。

- 求值表达式可嵌入到使用 eJSON 语法描述的结构化数据中，从而构成一个参数化数据（parameterized data），如 `[$SYS.time, $SYS.locale, null, true, 2022]`。
- 求值表达式可嵌入到双引号（或者三双引号）包围的字符串中，从而构成一个参数化字符串（parameterized string），如 `"The system time is: $SYS.time"`。本质上，参数化字符串是参数化数据的一种特例。
- 在参数化字符串中，可使用一对 `{}` 包围单个求值表达式，防止出现混淆，比如：`"user-$?.id"` 和 `"user-{$?.id}"` 是一样的，但 `"$user_item"` 和 `"{$user}_item"` 是不一样的。
- 在参数化字符串中，可使用 `\`（反斜杠）字符用于 `$` 、 `{`、 `}`、 `[`、 `]`、 `(`、 `)` 等字符的转义。
- 在求值表达式的参数中，可使用参数化数据或者参数化字符串，如：`$DATA.count([1, 2, true, $SYS.time, "$user.id"])`

参数化数据通常用于指定可接受数据的介词属性（`on` 和 `with`）的属性值以及动作元素的数据内容，而参数化字符串通常用于指定属性值以及文档片段模板。有关属性值的指定语法，见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性) 一节。

有关 eJSON 语法，见本文档 [2.2.5) eJSON 语法](#225-ejson-语法)。

##### 2.1.7.1) 复合求值表达式

复合求值表达式（compound hybrid evaluation expression，缩写为 CHEE）是一项重要特性。CHEE 本质上由一个或多个 HEE 组成，但带有一定的逻辑控制能力。其效果类似 Unix Shell 命令行中一次执行多条命令时使用分号或者 `&&`、`||` 的效果。如下是一些例子：

```js
{{
    // 调用 $SYS.cwd 将当前工作路径切换到 `/etc` 目录下，然后调用 $FS.list
    // 获得所有目录项对象数组。
    $SYS.cwd(! '/etc'); $FS.list
}}

{{
    // 尝试改变工作路径到 `/root` 目录下
    $SYS.cwd(! '/root') &&
        // 如果成功则调用 $FS.list 获得该目录下的所有目录项对象数组
        $FS.list ||
            // 否则向标准输出（$STREAM.stdout）打印提示信息
            $STREAM.stdout.writelines('Cannot change directory to "/root"');
            // 并改变工作路径到 `/` 下
            $SYS.cwd(! '/' ) &&
                // 若成功，则获得该目录下所有目录项对象数组
                $FS.list ||
                    // 否则将 `false` 作为该 CHEE 的最终求值结果
                    false
}}

{{
# 尝试改变工作路径到 `/root` 目录下，如果成功则调用 $FS.list_prt 获得该目录下
# 所有目录项清单（字符串），否则返回提示信息。最终将目录项清单或者错误信息
# 输出到标准输出。
    $STREAM.stdout.writelines({{
                $SYS.cwd(! '/root') && $FS.list_prt ||
                    'Cannot change directory to "/root"'
            }})
}}
```

##### 2.1.7.2) 表达式变量和替身表达式

HVML 允许使用 `bind` 标签将一个求值表达式（或参数化数据）绑定到一个变量：

```hvml
    <bind on $users[$MATH.random(10)] as "me" />
```

这个变量对应的并不是上述标签定义的元素被执行时 `$users[$MATH.random(10)]` 的值，而是 `$users[$MATH.random(10)]` 这个求值表达式；我们将这种变量称为“表达式变量（expression variable）”

当我们需要对绑定的表达式求值时，使用 `$me.eval`；我们将 `$me.eval` 这类表达式称为替身表达式（substitue expression）。由于上面的示例表达式使用了 `$MATH` 的 `random` 方法，所以每次求值将获得不同的结果。

我们可以使用 `observe` 标签观察一个绑定了表达式的变量，从而根据变量值的变化做出一些相应的处理。

比如，我们可以将某个目标文档元素的属性或者内容绑定到某个变量上，然后使用 `observe` 元素处理其上的 `change` 事件：

```hvml
<input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />
<bind on="$DOC.query('#the-user-name')[0].attr.value" as="user_name">
    <observe on $user_name for "change">
        ...
    </observe>
</bind>
```

#### 2.1.8) 栈式虚拟机

理论上看，每个 HVML 程序在一个假想的栈式虚拟机（stack-based virtual machine）上运行。HVML 解释器首先解析 HVML 程序，生成对应的 vDOM 树，然后从 vDOM 的根元素开始，以深度优先的顺序处理每个元素。习惯上，HVML 程序的执行栈从上往下增长，每执行一个子孙元素，执行栈上压入（push）一个新的栈帧（stack frame），直到 vDOM 的叶子元素为止，此时，解释器会弹出（pop）最后的栈帧，然后尝试执行新的最后栈帧对应元素的下个兄弟元素。

前述的上下文变量在执行栈中维护，每个栈帧中保留有一份上下文变量对应的值；而静态变量和特定的 vDOM 元素关联，其名字空间就是该元素定义的子树。

比如下面的 HVML 程序，将打印小于 10 的斐波那契数列：

```hvml
<!DOCTYPE hvml>
<hvml target="void">
    <head>
        $STREAM.stdout.writelines("# Fibonacci Numbers")
    </head>

    <body id="theBody">
        <inherit>
            {{
                $STREAM.stdout.writelines("## Fibonacci Numbers less than 10");
                $STREAM.stdout.writelines('')
            }}
        </inherit>

        <init as "count" at "_topmost" with 2 temp />
        <init as "last_one" with 0L temp />
        <init as "last_two" with 1L temp />

        <inherit>
            {{
                $STREAM.stdout.writelines($STR.join('    0: ', $last_one));
                $STREAM.stdout.writelines($STR.join('    1: ', $last_two));
            }}
        </inherit>

        <iterate on $last_two onlyif $L.lt($0<, 10L) with $DATA.arith('+', $0<, $last_one) nosetotail >
            <init as "last_one" at "2" with $last_two temp />
            <init as "last_two" at "2" with $? temp />

            <update on "$3!" at ".count" to "displace" with += 1 />

            <inherit>
                $STREAM.stdout.writelines(
                    $STR.join('    ', $DATA.arith('+', $%, 2), ': ', $?))
            </inherit>
        </iterate>

        <inherit>
            {{
                $STREAM.stdout.writelines('');
                $STREAM.stdout.writelines($STR.format_c("Totally %d numbers", $count))
            }}
        </inherit>

        <exit with [$count, $last_two] />
    </body>

    $0!.count
</hvml>
```

其执行路径描述如下：

1. 解释器初始化一个执行栈，压入一个表示栈顶的特殊栈帧。
1. 解释器执行 `hvml` 元素规定的动作，在执行栈压入一个新的栈帧。通常，`hvml` 元素将根据`target` 属性的值创建一个空的目标文档。在本例中，我们设置 `target` 为 `void`，故而将创建一个虚无的目标文档。
1. 解释器执行 `hvml` 元素的第一个子元素 `head` 元素规定的动作，在执行栈压入一个新的栈帧。对于本例，目标文档类型为虚无，故而除了处理 `head` 元素的属性、内容及其子元素之外，不做其他操作。该 `head` 元素不包含子元素，而定义有内容。其内容是一个求值表达式，对该表达式求值，将在标准输出上打印 `Fibonacci Numbers`。
1. 由于 `head` 元素不包含子元素，故而解释器在执行完 `head` 元素的动作后，将弹出最下面的栈帧，然后开始执行 `head` 元素的下个兄弟元素。
1. 解释器执行 `hvml` 元素的第二个子元素 `body` 元素规定的动作，在执行栈上压入一个新的栈帧。对于本例，目标文档类型为虚无，故而除了处理 `body` 元素的属性、内容及其子元素之外，不做其他操作。`body` 元素定义有属性，未定义内容，包含有多个子元素，故而将继续处理其子元素。
1. 解释器执行 `body` 元素的第一个子元素 `inherit`。该元素将继承上个栈帧中的上下文变量，然后处理其内容及子元素。在本例中，该元素只定义有内容。其内容是一个求值表达式，对该表达式求值，将在标准输出上打印另外两行文本。
1. 以此类推，解释器将依次执行 `body` 元素其他几个子元素，包括三个 `init` 元素和一个 `inherit` 元素。
1. 解释器执行 `iterate` 元素，该元素执行迭代操作，故而会多次重复执行其中所有的子孙元素。在本例中，`iterate` 元素将执行 5 次，而其中的三个 `init` 子元素和一个 `inherit` 子元素，也会被执行 5 次。
1. 解释器执行 `body` 的最后一个 `inherit` 子元素。类似前述的 `inherit` 子元素，该元素的执行效果是输出两行文本。
1. 解释器弹出 `body` 的最后一个 `inherit` 子元素对应的栈帧。
1. 解释器弹出 `body` 元素对应的栈帧。
1. 解释器弹出 `hvml` 元素对应的栈帧，到达栈顶。
1. 该 HVML 程序的执行结束。

最终该 HVML 程序的输出结果为：

    # Fibonacci Numbers
    ## Fibonacci Numbers less than 10

        0: 0
        1: 1
        2: 1
        3: 2
        4: 3
        5: 5
        6: 8

    Totally 7 numbers.

通常，一个解释器实例对应一个虚拟机实例。理论上，前述虚拟机可同时运行多个 HVML 程序，此时，每个 HVML 程序对应一个执行栈，通过某种机制切换当前执行栈就可以实现多个 HVML 程序的并发执行。这和真实的物理计算实现多任务的机制是类似的。在实践中，解释器通常以独立的协程（coroutine）形式执行同一虚拟机实例中装载的多个 HVML 程序实例，并在如下时机切换协程：

1. 每执行完一次元素动作后，解释器将强制当前协程让出（yield）对虚拟机的使用，使得其他就绪状态的协程可获得执行的机会。
1. 在调用动态对象的方法时，若对应的方法返回表示重试的错误值，表明该方法阻塞了当前协程，解释器可调度其他就绪状态的协程工作，直到该协程的执行状态被重新设置为就绪状态。此时，解释器将对被阻塞的表达式执行重新求值。

#### 2.1.9) 框架元素

在 HVML 中，框架元素用于定义一个 HVML 程序的整体框架。我们可以在框架元素中定义文本内容。

HVML 定义了如下几种框架元素：

- `hvml`：该元素定义 HVML 程序的根元素，除 `target` 属性之外，其属性及内容，将被克隆到目标文档的根元素。
- `head`：该元素定义 HVML 程序中的公共部分，通常用来创建全局静态变量。另外，若目标文档支持 `head` 元素，则其属性和内容将被克隆到目标文档的 `head` 元素中。
- `body`：该元素定义一个程序本体；HVML 程序中可包含零个或者多个程序本体，但每次执行只会执行一个指定的本体。另外，若目标文档支持 `body` 元素，则其属性和内容将被克隆到目标文档的 `body` 元素中。

详情见本文档 [2.3) 框架标签详解](#23-框架标签详解) 小节。

#### 2.1.10) 模板元素

在 HVML 中，模板元素用于定义可被置换的文档片段模板或者参数化的数据模板。模板元素使用内容来定义模板，故而不能定义任何子元素。

HVML 定义了如下几种模板元素：

- `archedata`：该元素用于定义一个使用 eJSON 格式描述的数据构造模板。
- `archetype`：该元素用于定义一个使用目标标记语言定义的文档片段模板。
- `error`：该元素定义一个用于指定错误类型的文档片段模板。
- `except`：该元素定义一个用于指定异常类型的文档片段模板。

详情见本文档 [2.4) 模板标签详解](#24-模板标签详解) 小节。

#### 2.1.11) 动作元素

在 HVML 中，动作元素具有如下的特点：

1. 在动作元素中，我们可使用参数化数据定义内容，为区别目标文档元素的文本内容，我们称动作元素的内容为“数据内容”。通常，一个动作元素的数据内容必须在其任何子元素前定义，且只能定义一项。由动作元素的内容定义的数据，将绑定到对应栈帧的 `$^` 上下文变量上。
1. 每个动作元素会产生一个执行结果数据，绑定到对应栈帧的 `$?` 上下文变量上。
1. 每个动作元素对应栈帧中表示目标文档位置的上下文变量 `$@`，可使用 `in` 属性定义，若未定义，则继承自其父元素。

我们将动作元素定义的内容视作附加数据。在某些使用 `with` 属性的动作元素中，如 `init` 中，当数据的表述过于复杂不适合通过 `with` 的属性值定义时，我们可使用内容来定义该项数据。

我们将一个动作元素及其子孙（descendant）元素形成的树形结构称为动作子树。

在 HVML 中使用目标标记语言的标签定义的元素（如示例代码中的 `ul`、 `li` 等），通常形成目标文档的结构骨架（skeleton），因此，我们将这类元素称为 `骨架` 元素。在 HVML 解释器中，我们将骨架元素视作一种特殊的动作元素：

- 其默认动作为在当前目标文档位置上插入（追加）该元素的一个克隆。
- 骨架元素隐含指定了可继承给后继子元素的目标文档位置（对应上下文变量 `$@`），即该骨架元素在 eDOM 树中对应的元素。
- 除 `$@` 之外，骨架元素对应的其他上下文变量初始均为 `undefined`。

我们通过 HVML 动作标签定义动作元素，我们将在本文档 [2.5) 动作标签详解](#25-动作标签详解) 中详细讲述这些动作标签。

##### 2.1.11.1) 用来操作数据的动作元素

HVML 定义有如下几个基本的动作元素，用于操作数据或者元素：

- `init` 元素用来初始化或重置一个变量。
- `update` 元素用来在指定的元素、元素汇集或者容器数据上执行更新操作。
- `clear` 元素用来在指定元素或者容器数据上执行清空操作，通常意味者删除当前元素或者数据的所有子元素或者数据项。
- `erase` 元素用来移除指定的元素、元素属性或容器中的数据项。
- `choose` 元素用于从给定的数据中选择（或产生）另外一个数据。
- `reduce` 元素用来定义在一个可迭代数据或者元素上执行归约（reduce）动作。

##### 2.1.11.2) 用于操控执行栈的动作元素

如下动作元素用于操控虚拟机，包括执行栈、事件循环等：

- `test` 元素在一个元素节点或者数据项上执行测试动作，用于实现依赖数据值的条件操作。
- `match` 元素作为 `test` 元素的直接子元素，定义一个匹配分支。
- `differ` 元素作为 `test` 元素的直接子元素，定义测试失败时的程序分支。
- `iterate` 元素用来定义在一个可迭代数据或者元素上的迭代动作，从而实现循环。
- `define` 元素用来定义一个可供重用的操作组。
- `return` 元素用来定义一个操作组的返回值。
- `back` 元素用来弹出栈帧到指定的执行栈位置，相当于打断（break）默认的执行路径。
- `include` 元素用来就地（in place）执行一个操作组。
- `call` 元素用来调用一个操作组。
- `catch` 元素用于捕获一个异常。

##### 2.1.11.3) 其他动作元素

HVML 还定义有如下一些动作元素用于操控事件循环、渲染器、操作组等：

- `observe` 元素用来定义针对特定数据或者元素上的观察动作。
- `fire` 元素用来显式激发一个事件。
- `forget` 元素用来撤销对某个数据或者元素上的观察动作。
- `request` 标签用于向渲染器、其他协程等发出一个请求并获得结果数据。
- `load` 元素用来装载并执行一个指定的 HVML 程序（或代码），相当于创建一个新的协程。
- `exit` 元素用于主动退出一个 HVML 程序的执行，即终止一个 HVML 协程。
- `sleep` 元素用于主动休眠当前协程。

#### 2.1.12) 错误和异常的处理

在 HVML 中，错误指无法恢复的致命问题，比如段故障、总线错误等；而异常指可以被捕获或者处理的问题。

为了方便处理错误和异常情形，可使用如下错误或异常模板元素：

- `error`：出现错误时，尝试用其中包含的内容插入到目标文档的当前位置。`error` 元素支持 `type` 属性，用来指定对应的错误类型。如：
   - `BusError`：表示总线错误（错误内存访问）。
   - `SegFault`：表示段故障（无效内存引用）。
   - `Terminated`：表示解释器实例被人为终止。
   - `CPUTimeLimitExceeded`：表示达到 CPU 时间上限。
   - `FileSizeLimitExceeded`：表示达到文件大小上限。
- `except`：出现未被捕获的异常时，插入其中包含的内容到目标文档的当前位置。`except` 元素支持 `type` 属性，用来指定对应的异常类型。

HVML 定义的异常如下：

- 通用：
   - `Conflict`：表示指定的操作条件互相冲突。
   - `Gone`：表示指定的数据或实体已消失。
   - `Incompleted`：表示未完成的调用，比如被信号打断的系统调用。
   - `MismatchedVersion`：版本不匹配，比如使用低版本的外部执行器或者动态对象。
   - `NotReady`：表示未就绪，比如指定的命名变量对应的数据尚未就绪。
   - `NotImplemented`：表示某个特性尚未实现。
   - `NotFound`：表示未找到，如找不到指定的变量名字空间。
   - `NotAllowed`：表示不允许的操作，如执行器的数据类型不正确。
   - `NotAcceptable`：表示不可接受的条件，比如错误的介词属性值。
   - `Timeout`：超时。
   - `TooEarly`：表示太早（如指定的数据尚未准备就绪）。
   - `TooLarge`：表示太大（如数据包大小）。
   - `TooLong`：表示太长（如路径名称）。
   - `TooMany`：表示太多（如符号链接）。
   - `TooSmall`：表示太小（如缓冲区大小）。
   - `Unauthorized`：表示未经身份验证。
   - `UnavailableLegally`：由于法律原因而不可用。
   - `UnmetPrecondition`：未满足前置条件。
   - `Unsupported`：表示不支持某个特性或者某个要求的信息，比如某些区域（locale）分类。
- 解析相关：
   - `BadEncoding`：表示错误的字符编码。
   - `BadHVMLTag`：表示错误的、不适合的标签，或者不匹配的 HVML 关闭标签。
   - `BadHVMLAttrName`：表示错误的 HVML 元素属性名称，如未知的属性名称，不符合规范的属性名称等。
   - `BadHVMLAttrValue`：表示无法解析的 HVML 元素属性值。
   - `BadHVMLContent`：表示无法解析的 HVML 元素内容。
   - `BadTargetHTML`：表示解析目标标签文档（HTML）时出现错误。
   - `BadTargetXGML`：表示解析目标标签文档（XGML）时出现错误。
   - `BadTargetXML`：表示解析目标标签文档（XML）时出现错误。
- 解释器相关：
   - `ArgumentMissed`：缺少必要参数。
   - `BadExpression`：表示错误的表达式，在对表达式求值时产生。
   - `BadExecutor`：表示错误的执行器，在解析执行器时产生。
   - `BadIndex`：索引错误，发生在引用数组或元组元素时，通常指索引值超出了数组或元组范围。
   - `BadName`：表示错误的变量名称。通常发生在对求值表达式进行求值时，当指定的变量名不符合规范要求的情况。
   - `ChildTerminated`：子协程被强制终止。
   - `DuplicateName`：重复名称，当要初始化的变量名称已经被占用时。
   - `DuplicateKey`：重复键，通常发生在合并对象或集合时。
   - `eDOMFailure`：表示在构建 eDOM 时遇到问题。
   - `InternalFailure`：解释器内部错误。
   - `InvalidValue`：表示错误的、无法接受的值。通常发生在传入了不可接受的数值时。
   - `LostRenderer`：丢失到渲染器的连接。
   - `MaxIterationCount`：表示达到最大迭代次数。
   - `MaxRecursionDepth`：表示达到最大递归深度。
   - `MemoryFailure`：内存错误，如内部堆太小，内存分配失败。
   - `NoData`：表示不存在指定的数据，或者指定的变量名未绑定到任何数据。
   - `NoSuchKey`：字典中的键值错误，通常指引用了一个不存在的键值。
   - `NotIterable`：表示指定的元素或数据不是可迭代的。
   - `WrongDataType`：表示错误的数据类型。
- 浮点数相关：
   - `InvalidFloat`：表示传入了无效的浮点数。比如在调用 `$MATH.asin` 时，传入了不在 `[-1, 1]` 范围内的实数。
   - `Overflow`：表示浮点数运算时出现向上溢出错误。
   - `Underflow`：表示浮点数运算时出现向下溢出错误。
   - `ZeroDivision`：表示遇到被零除错误。
- 操作系统相关：
   - `AccessDenied`：表示拒绝访问或者权限不足。
   - `BrokenPipe`：管道的另一端已经关闭。
   - `ConnectionAborted`：连接中断。
   - `ConnectionRefused`：连接被拒绝。
   - `ConnectionReset`：连接被重置。
   - `EntityNotFound`：未找到指定的实体（如文件）。
   - `EntityExists`：创建新实体（如文件）时，该实体已存在。
   - `EntityGone`：实体已消失。
   - `IOFailure`：表示输入输出错误。
   - `NotDesiredEntity`：表示传递了一个未预期的实体。
   - `NoStorageSpace`：表示存储空间不足（如写入文件）时。
   - `NameResolutionFailed`：名称解析失败。该异常应定义额外信息以便应用程序可以知晓解析失败的具体名称。
   - `OSFailure`：表示遇到未明确定义为异常的一般性操作系统错误。该异常应定义额外信息以便应用程序可以获得具体的错误信息，如 Unix 类系统中的 `errno`。
   - `RequestFailed`：请求失败。该异常应定义额外信息以便应用程序可以获得具体的请求失败信息，如 HTTP 协议状态码。
   - `SysFault`：不可恢复的操作系统故障，通常对应系统的 `EFAULT`。

另外，HVML 提供了 `catch` 动作标签，可用来捕获特定的异常并进行处理。

在 `catch`、`except` 和 `error` 标签中，我们必须使用反引号 U+0060 GRAVE ACCENT 字符（\`）包围异常或者错误的名称。`ANY` 用于任意的错误或异常，是一个保留字。

错误和异常的处理说明如下：

1. 在 `error` 和 `except` 标签中，我们一般使用目标标记语言的标签定义一个文档片段，也称为错误和异常模板。
1. 当发生异常时，首先看当前元素是否含有对应的 `catch` 动作元素。若有，则执行该 `catch` 元素定义的操作组；若没有，则检查是否有对应的 `except` 子元素，若有，则克隆其中定义的文档片段并追加到目标文档的当前位置，弹出当前栈帧继续执行。如果异常未被当前元素处理，则弹出当前栈帧，在前置栈帧中重复该步骤直到栈顶。
1. 当发生错误时，首先看当前元素是否含有对应的 `error` 子元素。若有，则克隆其中定义的文档片段并追加到目标文档的当前位置，然后直接弹出当前执行栈中的所有栈帧到栈顶。如果错误未被当前元素处理，则弹出当前栈帧，在前置栈帧中重复该步骤直到栈顶。

异常和错误通常发生在如下几种情形：

1. 对元素的属性值、内容求值，或者调用执行器时。
1. 执行动作元素对应的操作时遇到的异常，比如非法的属性值，数据一致性错误等。
1. 其他情形，如分配栈帧、创建新协程失败等。

通常，当某个动作元素、框架元素或模板元素被设置有 `silently` 副词属性，或者外部元素设置有 `hvml:silently` 属性时，在对其属性值或内容求值时，或调用执行器时，若遇到可忽略的异常，应返回一个合理的返回值，而不抛出异常。比如调用 `$SYS.time(! <number $seconds: seconds since Epoch> )` 设置系统时间时，如果当前用户没有权限修改系统时间，通常应该产生 `AccessDenied` 异常。但如果在调用该方法的元素中，设置有 `silently` 副词属性，则不会产生异常，而是返回 `false` 表明执行错误。

`silently` 属性主要作用于以上所指的前两种情形；哪些异常可忽略，哪些异常不可忽略，通常由解释器的实现者确定。第三种情形下产生的异常，会被认为是致命的而不能被忽略，也就是说，`silently` 属性对第三种情形无效，比如因为分配栈帧失败而导致的 `MemoryFailure` 异常。

下面给出了错误和异常处理的示例代码：

```hvml
    <head>
        ...
        <error raw>
            <p class="text-danger">There is an unrecoverable error.</p>
        </error>

        <except>
            <p class="text-warning">There is an uncaught exception: {$?.messages}</p>
        </except>
    </head>

    <body>
        <footer id="the-footer">
            <test on="$global.locale" in="#the-footer">
                <match for="AS 'zh_CN'" exclusively>
                    <update on="$@" to="displace" with="$footer_cn" />
                </match>
                <match for="AS 'zh_TW'" exclusively>
                    <update on="$@" to="displace" with="$footer_tw" />
                </match>
                <match for="ANY">
                    <update on="$@" to="displace" with="$footer_def" />
                </match>

                <except type=`NoData` raw>
                    <p>You forget to define the $global variable!</p>
                </except>
                <except type=`NoSuchKey`>
                    <p>Bad global data!</p>
                </except>
            </test>
        </footer>
    </body>
```

#### 2.1.13) 介词属性

针对动作标签，HVML 定义了如下几个介词（如 `on`、 `in`、 `to` 等）属性，用于定义执行动作时依赖的数据（或元素）及其集合。如：

- `in`：该属性适用所有动作元素，用于定义执行操作的目标文档位置。该属性通常使用 CSS 选择器定义目标文档的一个元素汇集，之后的操作会在这个元素汇集上进行。如果没有定义该属性值，则继承前置栈帧的相应值，若前置栈帧对应的元素是骨架元素，则取该骨架元素在目标文档中对应的位置。
- `on`：在 `choose`、`iterate` 等操作数据的标签中，用于定义执行动作所依赖的数据、元素或元素汇集。
- `from`：在 `init`、 `update`、 `define`、 `load` 等支持外部资源的元素中，用于定义执行动作所依赖的外部资源，其属性值通常是一个 URL。
- `via`：和 `from` 属性配合适用，用于指定请求方法（如 `GET`、 `POST`、 `DELETE` 等）以及请求头部信息。若附加使用 `RAW-HEADER` 关键词，表明请求参数为自定义的 HTTP 请求头部。
- `for`：在 `observe`、 `forget` 标签中，用于定义观察（observe）或解除观察（forget）操作对应的事件名称；在 `match` 标签中，用于定义匹配条件。
- `as`：在 `init`、 `define`、 `bind`、 `load` 等元素中定义变量名。
- `at`：和 `as` 属性配合使用时，用于变量名的作用范围（scope）；在 `update` 元素中指定目标数据上的目标位置。
- `with`：在 `init`、 `update`、 `define`、 `load` 等支持外部资源的元素中，配合 `from` 属性使用时，用来定义请求参数；在 `request` 元素中定义请求参数；在 `iterate` 元素中定义不使用执行器时迭代结果的求值表达式；在 `include` 元素中定义要引用的操作组；在 `test` 元素中定义测试条件。
- `to`：在 `update` 标签中定义具体的更新动作，比如表示追加的 `append`，表示替换的 `displace` 等；在 `back` 标签中定义回退到的栈帧。
- `by`：用于定义执行测试、选择、迭代、归约操作时的选择器、迭代器或归约器，统称为执行器（executor）。HVML 允许解释器支持内建（built-in）执行器。对简单的数据处理，可直接使用内置执行器，在复杂的数据处理情形中，可使用外部程序定义的类或者函数。在 HVML 中，我们使用如下前缀来表示不同的执行器类型：
   - `CLASS: ` 表示使用外部程序定义的类作为执行器。
   - `FUNC: ` 表示使用外部程序定义的函数作为执行器。
   - `KEY: ` 表示使用某个键名或多个指定的键名返回对应的键值数据项，是一种内建的迭代器或选择器。
   - `RANGE: ` 表示使用指定的索引范围返回数据项，是一种内建的迭代器或选择器。
   - `TRAVEL: ` 表示使用指定的遍历方式遍历树状结构，是一种内建的迭代器或选择器。
   - `SQL: ` 表示在结构化数据上执行 SQL 查询，从而实现复杂的选择、迭代以及归约操作。
   - 其他针对字符串和数值的内建执行器，见本文档 [2.6.1) 内建执行器](#261-内建执行器) 小节。
- `against`：在 `init` 元素中用于指定集合的唯一性键值；在 `sort` 元素中用于指定排序依据；在 `bind` 元素中用于指定绑定表达式的方法名称。
- `within`：在 `load` 元素和 `call` 元素中用于指定目标行者的名称。
- `onto`：在 `load` 元素中用于指定渲染器的窗口或页面名称。
- `onlyif` 和 `while`：在 `iterate` 中，用于定义在产生迭代结果前和产生迭代结果后判断是否继续迭代的条件表达式。
- `idd-by`：在动词元素中，用于定义该元素的标识符（作用同名词元素中的 `id` 属性）。

#### 2.1.14) 副词属性

针对某些动作标签，HVML 定义了如下副词属性，用于修饰操作行为。如：

- `synchronously`：在 `init`、 `request`、 `call`、 `load` 等元素中，用于定义从外部数据源（或操作组）获取数据时采用同步请求方式；默认值；可简写为 `sync`。
- `asynchronously`：在 `init`、 `request`、 `call`、 `load` 等元素中，用于定义从外部数据源（或操作组）获取数据时采用异步请求方式；可简写为 `async`。
- `exclusively`：在 `match` 元素中，用于定义排他性；具有这一属性时，匹配当前动作时，将不再处理同级其他 `match` 元素；可简写为 `excl`。
- `uniquely`：在 `init` 元素中，用于定义集合；具有这一属性时，`init` 定义的变量将具有唯一性条件；可简写为 `uniq`。
- `individually`：在 `update` 元素中，用于定义更新动作作用于数组、元组、对象或者集合的每个数据项上；可简写为 `indv`。
- `once`：在 `observe` 动作元素中，用于指定仅观察一次，之后该观察将被自动解除。
- `casesensitively`：在 `init` 动作元素中初始化一个集合时，用于指定唯一性值的对比对大小写敏感，亦可用在 `sort` 元素；可简写为 `case`。
- `caseinsensitively`：在 `init` 动作元素中初始化一个集合时，用于指定唯一性值的对比对大小写不敏感，亦可用在 `sort` 元素；可简写为 `caseless`。
- `ascendingly`：在 `sort` 元素中，用于指定数据项的排列顺序为升序；可简写为 `asc`。
- `descendingly`：在 `sort` 元素中，用于指定数据项的排列顺序为降序；可简写为 `desc`。
- `silently`：用于指示解释器执行静默求值和操作，以忽略对当前元素属性、内容进行求值，或者执行元素定义的操作时遇到的可忽略异常；在外部元素中使用 `hvml:silently` 这一写法。
- `temporarily`：在 `init` 等定义变量的动作元素中，用于指定变量是临时的而非静态的；所有临时变量，在上下文变量（`$!`）中维护；可简写为 `temp`。
- `nosetotail`：在 `iterate` 动作元素中，用于将上次迭代的结果作为下次迭代的输入数据；等价写法：“nose-to-tail”
- `responsively`：在骨架元素中，用于定义其文本内容是响应式的；可简写为 `resp`。
- `noreturn`：在 `request` 元素中，用于定义忽略该请求的返回值；等价写法：“no-return”。
- `concurrently`：在 `call` 元素中，用于定义一个并发调用；可简写为 `conc`。
- `constantly`：在 `bind` 元素中，用于说明被绑定的表达式将对同一参数返回不变的值；可简写为“const”
- `must-yield`：表明每执行一次具有该属性的元素，应强制当前协程出让（yield）处理器；在外部元素中使用 `hvml:must-yield` 这一写法。

注意：在 HVML 中，我们无需为副词属性赋值。

#### 2.1.15) 引用元素或数据

当我们需要引用某个元素时，我们使用 CSS 选择器。如：

- `.avatar` 表示所有 `class` 属性包含 `avatar` 的元素（集合）。
- `#the-user-list` 表示 `id` 属性为 `the-user-list` 的元素。
- `:root` 表示文档的根元素。
- `*` 表示文档中的所有元素。

然后使用 `$DOC.query()` 方法获得对应的元素汇集：

```hvml
    <update on="$DOC.query('#the-user-list > li')" at="attr.class" with="text-info" />
```

由于 `update` 标签的 `on` 属性值不允许使用整数、字符串等不可变数据，而 `observe` 标签的 `on` 属性值只能为可观察的原生实体或容器数据，因此，我们也可以在 `update` 和 `observe` 标签的 `on` 属性值中直接使用 CSS 选择器（字符串）。比如：

```hvml
    <update on="#the-user-list > li" at="attr.class" with="text-info" />
```

本质上，我们在上述两种标签的 `on` 属性值中使用 CSS 选择器选择目标文档的元素汇集时，解释器实质调用的是 `$DOC.query(<selector>)`方法。

由于通过 CSS 选择器指定的元素汇集通常指目标文档中的单个或者多个位置，故而我们使用“目标文档位置”一词来统称元素或元素汇集。

如果要在 `update` 标签的 `on` 属性中使用参数化数据，则必定使用 `$`、 `[` 或 `{` 作为前导字符：

- `$` 用来定义一个求值表达式，如 `$TIMERS[0]`。
- `[` 用来定义一个参数化数组，如 `[ $foo, $bar, true, false ]`。
- `[!` 用来定义一个参数化元组，如 `[! $foo, $bar, true, false ]`。
- `{` 用来定义一个参数化对象，如 `{ "$foo" : $bar, "foo": "bar" }`。

在其他可能导致混淆的动作标签中，可使用无等号的属性值表述语法，此时可或者使用字面的数值（number）、 `true`、 `false`、 `null` 等关键词：

```hvml
    <choose on 12345 by="ADD: LE 9999 BY 1000">
        ...
    </choose>
```

类似地，动作标签的 `with` 属性也使用这类规则来引用数据。详情见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性) 一节。

在 HVML 中，`on` 或者 `in` 介词属性在引用目标文档中的元素时，若使用前导字符 `>`，则将被限定在父元素 `in` 介词指定的范围内。如下面例子中，

```hvml
    <reduce on="$?" in="#the-user-statistics" by="FUNC: StatsUserRegion">
        <choose on="$?.count" to="update" in="> h2 > span">
            <update on="$@" at="textContent" with="$?" />
        </choose>
        <clear on="#the-user-statistics > dl" />
        <iterate on="$?.regions" in="> dl" by="CLASS: IUserRegions">
            <update on="$@" to="append" with="$region_to_users" />
        </iterate>
    </reduce>
```

`choose` 标签的 `in` 属性所指定的 `> h2 > span` 和 `#the-user-statistics > h2 > span` 等价；`iterate` 标签的 `in` 属性 `> dl` 和 `#the-user-statistics > dl` 等价。

变量的引用规则如下：

- 在 `archetype` 以及 `archedata` 标签定义的文档片段模板或者数据模板中，我们可以就属性值、文本内容引用上下文变量以及命名变量。此时，上下文变量由引用该模板的动作标签定义。
- 在 HVML 动作标签中，我们可以就属性值、文本内容引用上下文变量以及命名变量。此时，上下文变量由引用该模板的动作标签定义。
- 在使用目标标签语言定义的元素中，可以使用命名变量定义其属性值以及文本或数据内容。

#### 2.1.16) 协程和虚拟机状态

一个正确解析并装载的 HVML 程序以协程的形式运行。HVML 定义协程有如下四种执行阶段（execution stage）：

- 已排（scheduled）：已安排阶段。当调度器选择处于该阶段的协程进入就绪状态时，进入首轮执行阶段。
- 首轮（first-run）：首轮执行阶段。当首轮执行阶段完成后，若该协程没有观察任何事件，则进入清理阶段；若注册有观察者，则进入事件循环执行阶段。
- 观察（observing）：事件循环执行阶段。
- 清理（cleanup）：清理阶段。在清理阶段，调度器将协程的退出或终止状态发送给父协程（若有）。

除了协程正常执行进入清理阶段之外，一个 HVML 协程可能由于异常而终止。故而我们使用如下术语区分一个协程的退出或终止状态：

- 退出（exited）：隐式退出或者主动退出；自然执行完所有的元素，且没有注册任何观察者；或者执行 `exit` 动作元素主动退出。协程退出时，最顶栈帧中保存的结果数据将被作为协程的结果数据。
- 终止（terminated）：由于错误或者未捕获的异常而终止。协程被终止时，结果数据为异常名称。

在正常调度过程中，一个 HVML 协程有如下三种执行状态（execution state）：

- 就绪（ready）：该协程正在等待执行，调度器将按次序选择执行该协程。
- 执行（running）：该协程正在执行。
- 暂停（stopped）：该协程被停止等待特定唤醒条件的到来，比如子协程退出、主动休眠到期、异步数据获取器返回数据、并发调用返回结果、调试器要求继续执行等。当设定的唤醒条件到来时，调度器设置该协程的状态为就绪（ready）。

当我们异步装载另外一个 HVML 程序时，就可以在当前 HVML 协程中观察子协程的运行状态变化。和协程运行状态相关的事件具有 `corState:` 前缀，如 `corState:exited` 或 `corState:terminated`；事件附加数据中包含有结果数据。

通常在下面几种情况下，协程将被解释器设置为被暂停状态：

- 采用独立运行的外部资源加载器的情形下，`init`、`load`、`define`、`archetype`、`archedata`、`error`、`except` 等元素在装载外部资源时，解释器可设置该协程进入停止状态。当解释器获得来自外部资源加载器的结果后，唤醒该协程继续处理后续的操作。注意，上述某些元素支持 `asynchronously` 副词属性，若使用该副词属性时，解释器不需要做上述处理。
- 当 `load`、`call` 等元素同步等待其他协程返回结果时，解释器应设置该协程进入停止状态。当解释器获得来自其他协程的结果后，唤醒该协程继续处理后续操作。
- 执行 `sleep` 元素时，解释器应设置该协程进入停止状态。当解释器观察到休眠到期，或者有需要该协程处理的事件时，唤醒该协程继续后续处理。

除以上运行状态外，HVML 规定一个协程有如下几种渲染状态：

- 常规（regular）：协程和渲染器进行正常的数据交换。
- 被关闭（closed）：协程对应的渲染器页面被用户强制关闭。
- 丢失（lost）：协程所在行者丢失渲染器的连接。
- 被压制（suppressed）：协程和渲染器的交互（包括页面的更新以及接受来自渲染器的交互事件）被压制。

HVML 协程可通过观察内置 `$CRTN` 变量上的渲染器事件来判断自身渲染状态的变化。渲染状态相关的事件对应的名称具有 `rdrState:` 前缀，如 `rdrState:pageSuppressed`。

每个 HVML 协程运行在特定的 HVML 虚拟机实例上，而每个 HVML 虚拟机实例对应 HVML 应用框架中的一个行者。HVML 行者对应的虚拟机实例有如下状态：

- 启动（boot）：启动中。
- 空闲（idle）：空闲中；表明其上没有任何协程。
- 忙（busy）：工作中。
- 关机（shutdown）：关机中。

#### 2.1.17) 文档片段的结构化数据表达

HVML 解释器按照固定的策略将目标文档子树（文档片段）视作一个结构化数据来访问。比如对下面的 HTML 片段：

```hvml
    <li class="user-item">
        <img class="avatar" src="foo/bar.png" />
        <span>foo</span>（中国大陆）
    </li>
```

和下面的 JSON 数据等价：

```json
    {
        "tag": "li",
        "attr": {
            "class": "user-item",
            "data-value": "0",
            "data-region": "zh_CN",
        },
        "children": [
            {
                "tag": "img",
                "attr": {
                    "class": "avatar",
                    "src": "foo/bar.png",
                },
                "children": []
            },

            {
                "tag": "span",
                "attr": {},
                "children": [
                    {
                         "tag": "txt",
                         "attr": {},
                         "content": "foo",
                         "children": []
                    }
                ]
            },

            {
                "tag": "txt",
                "attr": {},
                "content": "（中国大陆）",
                "children": []
            }
        ]
    }
```

需要注意的是，将 DOM 文档结构用结构化数据表达时，可以有多种不同的转换策略。但 HVML 解释器会采用固定的结构来进行转换，以方便在其上执行结构化查询。具体来讲：

1. 每个元素使用一个字典数据来表述，用 `tag` 键值对来描述元素的标签，用 `attr` 键值对来描述元素的属性，用 `children` 键值对来描述该元素的子元素或者内容。
1. 元素的所有属性构成了一个字典数据。
1. 所有元素的文本内容被视为一个虚拟的子元素，其标签名为 `txt`，其属性 `content` 定义了真正的文本内容。
1. 所有元素的数据内容被视为一个虚拟的子元素，其标签名为 `json`，其属性 `content` 使用 eJSON 格式定义了真正的数据内容。
1. 每个元素的子元素（包括文本内容和数据内容在内），用数组来描述，每个数组单元是一个字典数据，用于定义子元素。

在引用元素的属性或者文本内容时，我们使用如下约定：

- 当我们在一个元素上获取 `textContent` 键名的键值时，相当于引用这个元素的文本内容，包括所有子孙元素的文本内容，按照深度优先遍历路径连接起来的字符串。
- 当我们在一个元素上设置 `textContent` 键值时，相当于移除该元素的所有子孙节点（若有），并设置该元素的文本内容为对应的键值。
- 当我们在一个元素上获取 `dataContent` 键名的键值时，相当于引用这个元素的所有数据内容，包括所有子孙元素的数据内容按照深度优先遍历路径形成的数组。
- 当我们在一个元素上设置 `dataContent` 键值时，相当于移除该元素的所有子孙节点（若有），并设置该元素的数据内容为对应的键值。
- 当我们在一个元素上获得 `content` 键名的键值时，相当于获得这个元素所有子孙节点（包括内容和子孙元素）在内的文档片段的文本表达；在设置该键名的键值时，相当于使用文本表达来创建该元素的子孙节点（替换掉原有子孙节点）。
- 我们可以使用 `attr.class` 这样的复合键名来引用一个元素的静态属性。引用一个未定义的静态属性时，按属性值为 `undefined` 值对待。
- 使用 `prop.selectedIndex` 或 `prop.style.width`、`prop.style[width]` 这样的属性名来引用一个元素的动态属性（property）。引用一个未定义的动态属性时，按属性值为 `undefined` 对待。

通常，我们通过 `update` 元素修改元素的静态属性（attribute）和内容（content）；而对动态属性（property），比如 `input` 框中输入的内容，则需要使用 `request` 元素来获取或者设置。

注：目前只有规划中的 SGML 支持使用数据作为元素的内容，即 `dataContent`。

#### 2.1.18) MIME 类型

`init` 以及其他从外部资源装载数据的元素，会根据资源的 MIME 来确定装载后的数据类型：

- `text/html`：用于代表一个 DOM 文档的原生实体
- `text/css`：字符串
- `text/javascript`：字符串
- `text/plain`：字符串
- `text/*`：字符串
- `application/xml`：用于代表一个 DOM 文档的原生实体
- `application/json`：数据
- `application/octet-stream`：字节序列
- `application/*`：字节序列
- `image/*`：字节序列
- `audio/*`：字节序列
- `video/*`：字节序列
- `font/*`：字节序列

#### 2.1.19) HVML URI 图式

我们引入 `hvml` 和 `hvml+run` 两种 URI 图式（Schema）用于 HVML 应用框架。

##### 2.1.19.1) `hvml` 图式

该图式主要用于 HVML 渲染器，有两种用途：

1) 定义 HVML 渲染器中的页面

和 `http` 图式类似，完整的 `hvml` 图式包括主机名、应用名、行者名、页面组名称和页面名称以及查询（query）组件，如：

`hvml://<host_name>/<app_name>/<runner_name/<page_group_name>/<page_name>/?irId=<the_initial_request_identifier>`

如其中各部分的名称所暗示，其中包含了一个 HVML 渲染器页面的如下信息：

- 主机名。
- 应用名称。
- 行者名称。
- 页面组名称。当页面不属于任何页面组时，我们使用 `-` 这一特殊名称。
- 页面名称。普通窗口或者页面的名称。
- `irId` 查询参数。用于传递来自 HVML 解释器的初始请求参数。

2) 定义渲染器可直接访问的公共资源

此时，`hvml` 用来表述一个应用对外提供的公共资源（assets），比如图片和样式文件。此时，我们可使用如下保留名称：

- 应用名称：
   - 使用 `_self` 这一保留名称指代当前应用。
   - 使用 `_renderer` 这一保留名称指代渲染器。
   - 使用 `_system` 保留名称指代操作系统。
- 行者名称：
   - 使用 `_builtin` 这一保留名称指代（渲染器的）内建资源。
   - 使用 `_self` 这一保留名称指代当前行者。
   - 使用 `_shared` 这一保留名称指代共享的公开资源。
   - 使用 `_filesystem` 这一保留名称指代文件系统。
- 页面组名称：始终使用 `-`。
- 页面名称：指代正在定位的资源相对存储路径。

比如使用下面的 URL 可从当前应用的内建资源中装载一个 PNG 文件：

`hvml://localhost/_self/_shared/-/assets/logo.png`

若当前应用名称为 `cn.fmsoft.hvml.test`，按 HybridOS 的应用安装规范，以上 URI 相当于：

`file://app/cn.fmsoft.hvml.test/_shared/assets/logo.png`

类似地，使用 `_renderer` 保留名称可指代渲染器本身，从而可通过下面的 URI 可从渲染器的内建资源中装载指定，如，

`hvml://localhost/_renderer/_builtin/-/assets/bootstrap-5.1.3-dist/css/bootstrap.min.css`

再如，使用 `_system` 这一保留的应用名称以及 `_filesystem` 这一保留的行者名称，可从文件系统的指定目录中装载资源，如：

`hvml://localhost/_system/_filesystem/-/usr/shared/hvml-log.svg`

##### 2.1.19.2) `hvml+run` 图式

该图式主要用于定义属于特定行者的协程或者通道，和 `ftp` 图式类似，完整的 `hvml+run` 图式包括主机名、应用名、行者名、资源类型（表示协程的 `CRTN` 或者表示通道的 `CHAN`）及资源标志符，如协程令牌或通道名称，如：

`hvml+run://localhost/appName/myRunner/CRTN/7`

在 HVML 程序中，我们可以通过 `request` 等动作元素和当前应用的其他行者交互。方便起见，我们无需指定图式名称和主机名称，并可使用 `-` 指代当前应用，这样就可以使用如下简写方式引用当前主机、当前应用中属于指定行者的协程或通道，如：

- 引用指定协程：`/-/otherRunner/CRTN/7`
- 引用指定通道：`/-/otherRunner/CHAN/channel0`

类似地，我们也可以使用 `-` 指代当前行者，即可引用当前主机、当前应用、当前行者中的指定协程，如：

`/-/-/CRTN/7`

当我们需要引用另外一个主机上的协程时，可使用如下的写法：

`//otherhost/otherAppName/otherRunner/CRTN/dispatcher`

在 `hvml+run` 图式中，我们保留如下的特殊协程令牌（相当于别名）：

- `_main`：表示主协程，即指定行者创建的第一个协程。
- `_first`：表示现有协程中的第一个协程。注意，当行者创建的第一个协程退出后，`_main` 将不可用，但 `_first` 是始终可用的。
- `_last`：表示现有协程中的最后一个协程。注意，当协程中只有一个协程时，`_first` 和 `_last` 指向同一个协程。

### 2.2) 规则、表达式及方法的描述语法

在 HVML 中，我们经常会使用属性中的表达式或者规则字符串来表示一个求值行为，比如：

```hvml
    <init as="locales">
      {
          "en_US" : "英语（美国）",
          "en_UK" : "英语（英国）",
          "zh_CN" : "中文（中国大陆）",
          "zh_TW" : "中文（中国台湾）",
          "zh_HK" : "中文（中国香港）",
          "zh_MO" : "中文（中国澳门）",
      }
    </init>

    <test on="$locales" in='#the-footer' by="KEY: AS '$global.locale' FOR VALUE">
        <match for="AS '中文（中国大陆）'" exclusively>
            <update on="$@" to="displace" with="$footer_cn" />
        </match>
        <match for="AS '中文（中国台湾）'" exclusively>
            <update on="$@" to="displace" with="$footer_tw" />
        </match>
        <match for="LIKE /^英语/" exclusively>
            <update on="$@" to="displace" with="$footer_en" />
        </match>
        <match for="ANY">
            <update on="$@" to="displace" with="$footer_def" />
        </match>

        <except type=`NoData` raw>
            <p>You forget to define the $global variable!</p>
        </except>
        <except type=`NoSuchKey`>
            <p>Bad global data!</p>
        </except>
    </test>
```

`test` 标签中的 `by` 属性定义了 `KEY` 执行器的规则，而 `match` 标签中的 `for` 属性定义了一个可用来判断字符串是否匹配的逻辑表达式，如 `LIKE /^英语/` 表示前置操作结果数据是否以 `英语` 打头。注意此处使用了正则表达式表示开头的 `^` 符号；如果使用正则表达式中表示结尾的 `$` 符号，则必须转义，以避免被 HVML 解析器将 `$` 作为求值表达式的前导字符处理。

#### 2.2.1) 规则描述语法

对此类规则，我们使用统一的描述语法，该语法也用来描述求值表达式：

1. 一条规则由单个或者多个词法单元（lexical unit）组成。
1. 词法单元分如下几类：
   1. 应原样使用的字面特殊字符（literal special characters），如冒号（`:`）和逗号（`,`）；通常用来分隔不同意义的词法单元（组），使用单引号（`'`）包围。
   1. 应原样使用的字面标志字符（literal flag characters），一般使用 ASCII 大写或小写字母，使用单引号（`'`）包围。
   1. 应原样出现的字面关键词（literal key words），使用双引号（`"`）包围。
   1. 正则表达式，一般使用前后两个斜杠符（`/`）包围。
   1. 不使用单引号、双引号或斜杠符包围的英文单词或者使用下划线相连的英文短语，如 `ws`、 `literal_integer` 用来表示一个被指名的词法单元。
   1. `...` 表示重复前一个词法单元。
1. 若一条规则中包含有被指名的词法单元，将另起一行定义该词法单元的语法，直到所有被指名的词法单元均被完整定义或说明为止。
1. 定义被指名的词法单元之语法时，在该词法单元名称之后使用冒号（`:`），冒号后可换行，但第二行通常会缩进书写。
1. 当某个被指名的词法单元之解释有多个缩进的行描述时，每一行表示一种并列（单选）的描述。
1. 通常使用一行来描述一个词法单元，若太长，可使用反斜杠（`\`）表示续行。
1. 使用一对尖括号（`< >`）表示一个必须存在的词法单元（组）。
1. 使用一对中括号（`[ ]`）包围的词法单元（组）表示可选。
1. 多个词法单元形成词法单元组；使用一对大括号（`{ }`）对多个词法单元进行分组。
1. 若多个词法单元之间没有空格，表示这些词法单元形成一个不可分隔的词法单元组。
1. 当某个词法单元由单个或者多个词法单元表示时，或者可从多个词法单元（组）中选择时，我们使用 `||`、 `&&`、 `|` 等符号表示这些单元是否可以同时出现，其规则如下：
   1. 并置的单元表示所有的词法单元（组）都要以给定的顺序传递。
   1. `&&` 分隔的两个或多个词法单元（组），表示必须传递所有这些词法单元（组），顺序任意。
   1. `||` 分隔的两个或多个词法单元（组），表示必须传递这些词法单元（组）的一个或多个，顺序任意。
   1. `|` 分隔两个或者多个词法单元（组），表示必须传递其中一个。
1. 井号（`#`）后的文字被视作注释。
1. 额外说明：
   1. 规则语法描述中的空格，不代表实际规则中应该包含空格，而仅仅为了分隔不同的词法单元，便于阅读。
   1. 当某个词法单元由单个或者多个字面标志字符表示时，实际编码时不使用空格分隔这些字符。
   1. 当某个词法单元由单个或者多个字面关键词表示时，我们用一个或者多个水平空白字符（即空格或水平制表符）分隔这些关键词。

比如，下面是一个假定的规则，其语法描述中，我们经常会使用正则表达式，相关的语法描述为：

```
    "FOO" [ws] ':' [ws] "ALL" | { "LIKE" [ws] <pattern_expression> }

    pattern_expression: <quoted_wildcard_expression>[<matching_flags>][<max_matching_length] | '/'<regular_expression>'/'[<regexp_flags>]
    wildcard_expression: A sequence of zero or more Unicode characters in UTF-8 encoding, using backslash escapes like C language \
        and `*` or `?` as the wildcard characters.
    regular_expression: A regular expression conforms to POSIX.1-2001.

    quoted_wildcard_expression: '''<wildcard_expression>''' | '"'<wildcard_expression>'"'
    regexp_flags: 'g' || 'i' || 'm' || 's' || 'u' || 'y'
    matching_flags: 'i' || 's' || 'c'
    max_matching_length: <literal_positive_integer>

    literal_integer: /^-?[0-9]*[1-9][0-9]*$/
    literal_positive_integer: /^[0-9]*[1-9][0-9]*$/

    ws: /[ \t\f\n\r]+/  # white space
    hws: /[ \t]+/       # horizontal white space
```

根据以上语法，如下的规则字符串是合法的：

```
    FOO: ALL
    FOO :ALL
    FOO: LIKE   'a wildcard card such as *.md'
    FOO: LIKE "a wildcard card such as *.md"
    FOO: LIKE /a regular expression like ^[0-9]*[1-9][0-9]*$/
    FOO: LIKE 'zh_??'i5
    FOO: LIKE "zh_??"i5
```

而如下的规则字符串不符合语法要求：

```
    FOO:
    FOO: ALL 'a literal string'
    FOO: LIKE
    FOO: ALL LIKE 'a literal string'
    FOO: LIKE 'zh_??"i5
```

另外，我们经常会在规则中使用正则表达式，所以需要注意如下几点：

- 包含在 `//` 中的正则表达式应符合 POSIX.1-2001 标准。
- 因使用 `//` 定义一个正则表达式，故而当正则表达式中包含有字面的 `/` 字符时，需转义。
- 当正则表达式中使用表示结尾的 `$` 字符时，需对该符号转义。
- 当正则表达式中使用 `\t`、 `\w`、 `\s` 等表达特定字符时，需对 `\` 符号做转义。

正则表达式之后的 `regexp_flags` 指定匹配标志（可选），可选如下标志字符中的单个或者多个：

- `g`：全局匹配。
- `i`：不区分大小写搜索。
- `m`：多行搜索。
- `s`：允许 `.` 匹配换行符。
- `u`：使用 UNICODE。
- `y`：执行粘性（sticky）搜索，匹配从目标字符串的当前位置开始。

也就是说，如下的正则表达式表示法是正确的：

```
/^head/
/tail\$/im
```

而如下的正则表达式是错误的：

```
/^head/tail/
/tail\$/ima sf
```

更多信息，可参阅：

- `man regex` on Linux
- Python 3 re module: <https://docs.python.org/3/library/re.html>
- JavaScript Regular Expressions: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags>

在字符串匹配的另外两种模式（一般匹配和通配符匹配下），亦可使用类似正则表达式的标志字符，并额外指定最大的匹配长度。

- `matching_flags`: 表示一般匹配和通配符匹配模式下的标志字符，可取如下关键字符之一或多个：
   - `i`：忽略大小写。
   - `s`：将所有空白字符（U+0009 TAB、U+000A LF、U+000C FF、U+000D CR 或 U+0020 SPACE 字符）视作空格（U+0020 SPACE 字符）。
   - `c`：压缩连续相同空白字符为单个空白字符。
- `max_matching_length`: 表示最大的匹配长度（字符为单位）。

如 `LIKE 'zh_??'i5` 表示仅匹配五个字符，不区分大小写。对这个匹配条件，如下这些字符串将正确匹配：

- `zh_CN`
- `ZH_TW台湾是中国领土不可分割的一部分`
- `zH_Hongkong`

而如下字符串无法正确匹配：

- `zh-C`
- `xx_CH`

#### 2.2.2) 求值表达式的语法

一个合法的求值表达式（`hybrid_evaluation_expression`）需要符合如下的语法规则，且可递归使用：

```
    <hybrid_evaluation_expression>:
        '$'<hybrid_variable_addressing_expression>
        '{$'<hybrid_variable_addressing_expression>'}'
        '${'<hybrid_variable_name_evaluation_expression>'}'
        '{{' [ws] <compound_hybrid_evaluation_expression> [ws] '}}'

    <extended_json>: 见本文档“2.2.5) eJSON 语法”一节，其中的 JSON value 可以是一个求值表达式。

    <compound_hybrid_evaluation_expression>:
        <hybrid_evaluation_expression> | <extended_json> [[ws] < ';' | '&&' | '||' > [ws] <hybrid_evaluation_expression> | <extended_json>, ...]

    <hybrid_variable_name_evaluation_expression>:
        [ <literal_variable_token> ]<hybrid_evaluation_expression>[<literal_variable_token_other_char>, ...]

    <hybrid_variable_addressing_expression>: <literal_variable_name>[<hybrid_addressing_expression>, ...]
       <literal_variable_name>: 用于直接引用一个已命名的数据。
       <hybrid_addressing_expression>：用于引用一个容器的成员。

    <hybrid_expression>: <hybrid_evaluation_expression> | <extended_json>

    <hybrid_addressing_expression>:
       '.'<literal_key_name>'(' [ws] <hybrid_expression>[<',' [ws] <hybrid_expression> [ws]>, ...] [ws] ')': 用于在动态对象上调用特定键名的获取器方法。
       '.'<literal_key_name>'(!' [ws] <hybrid_expression>[<',' [ws] <hybrid_expression> [ws]>, ...] [ws] ')': 用于在动态对象上调用特定键名的设置器方法。
       '.'<literal_key_name>: 用于引用一个对象的键值。
       '[' [ws] <hybrid_evaluation_expression> | <quoted_key_name> | <literal_integer> [ws] ']': 用于引用一个数组、元组的特定单元或者用于引用一个对象的键值，尤其当对应的键名不符合上面所说的变量名规则时。

    <literal_variable_name>: ['#' <literal_anchor_name> | <literal_positive_integer> ]< '?' | '@' | '!' | '^' | ':' | '=' | '<' | '%' > | <literal_variable_token>

    <literal_anchor_name>: <literal_variable_token>

    <literal_key_name>: <literal_variable_token>

    <literal_integer>: /^-?\d+$/

    <literal_positive_integer>: /^[0-9]*[1-9][0-9]*$/

    <literal_variable_token>: <literal_variable_token_first_char>[<literal_variable_token_other_char>, ...]

    <literal_variable_token_first_char>: [ '_' | ascii_letter | unihan_ideograph ]
    <literal_variable_token_other_char>: [ '_' | ascii_letter | ascii_digit | unihan_ideograph]

    <quoted_key_name>: '''<literal_char_sequence>''' | '"'<literal_char_sequence>'"'

    <ascii_letter>: /A-Za-z/
    <ascii_digit>: /0-9/
    <unihan_ideograph>: /\u{4E00}-\u{9FFC}\u{F900}-\u{FAD9}\u{3400}-\u{4DBF}\u{20000}-\u{2A6DD}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}/

    <ws>: /[ \t\f\n\r]+/    # white space
    <hws>: /[ \t]+/         # horinzontal white space
```

需要说明的是，我们允许在使用 `[ ]` 引用数组、元组或者集合的成员时，使用负数作为索引值。当使用负数作为索引值时，其范围是 -1 到数组或集合的成员个数，以最后一个成员为起点。

对复合求值表达式，我们定义如下规则：

1. 对一个 CHEE 的求值结果，指该 CHEE 中执行求值的最后一个求值表达式的结果；所有中间结果将被废弃。
1. 一个 CHEE 中可嵌套另一个 CHEE。
1. 可使用 `//` 或者 `#` 在表达式之间定义行注释。

处理步骤如下：

1) 将 CHEE 中的第一个 CHEE 设定为当前 HEE。
2) 对当前 HEE 求值，形成当前求值结果，然后，
   - 若其后是 `;`，若存在下个 HEE，则将下个 HEE 调整为当前 HEE 并跳转到第二步；若没有下个 HEE，则跳转到第三步。
   - 若其后是 `&&`，则首先对当前求值结果做布尔化处理，如果是 `true`，则将下个 HEE（若有）调整为当前 HEE 并跳转到第二步；否则跳过下个 HEE（若有）的求值，将下下个 HEE（若有）调整为当前 HEE 并跳转到第二步。在以上过程中，若没有可求值的 HEE，则跳转到第三步。
   - 若其后是 `||`，则首先对当前求值结果做布尔化处理，如果是 `false`，则将下个 HEE（若有）调整为当前 HEE 并跳转到第二步，否则跳过下个 HEE（若有）的求值 ，将下下个 HEE（若有）调整为当前 HEE 并跳转到第二步。在以上过程中，若没有可求值的 HEE，则跳转到第三步。
3) 将整个 CHEE 的求值结果设定为最后执行求值的 HEE 的求值结果，废弃其他中间结果。

#### 2.2.3) 常见的被指名词法单元

如下被指名的词法单元在后文中不再重复描述：

```
    quoted_literal_char: '''<literal_char>''' | '"'<literal_char>'"'
    quoted_literal_char_sequence: '''<literal_char_sequence>''' | '"'<literal_char_sequence>'"'
    quoted_wildcard_expression: '''<wildcard_expression>''' | '"'<wildcard_expression>'"'
    quoted_regular_expression: '/'<regular_expression>'/'

    literal_char: A Unicode characters in UTF-8 encoding, using backslash escapes like C language.
    literal_char_sequence: A sequence of zero or more Unicode characters in UTF-8 encoding, using backslash escapes like C language.
    wildcard_expression: A sequence of zero or more Unicode characters in UTF-8 encoding, using backslash escapes like C language \
        and `*` or `?` as the wildcard characters.
    regular_expression: A regular expression conforms to POSIX.1-2001.

    event_name: <literal_limited_alnum_token>[':'<literal_alnum_token>['/'<literal_alnum_token>]]
    page_identifier: [ 'widget:' | 'plainwin:' ]<literal_limited_alnum_token>['@' [ <literal_limited_alnum_token> '/' ] <literal_alnum_token> ]

    coroutine_identifier: <cross_host_coroutine_identifier> | <local_host_coroutine_identifier>
    cross_host_coroutine_identifier: '//' <host_name> '/' <app_name> '/' <runner_name> '/CRTN/' <coroutine_token>
    local_host_coroutine_identifier: '/' <app_name> '/' <runner_name> '/CRTN/' <coroutine_token>

    channel_identifier: <cross_host_channel_identifier> | <local_host_channel_identifier>
    cross_host_channel_identifier: '//' <host_name> '/' <app_name> '/' <runner_name> '/CHAN/' <channel_name>
    local_host_channel_identifier: '/' <app_name> '/' <runner_name> '/CHAN/' <channel_name>

    host_name: <ip_literal> | <ipv4_address> | <reg_host_name>
    app_name: <literal_limited_alnum_token>[['.'<literal_limited_alnum_token>], ...]
    runner_name: <literal_limited_alnum_token>
    coroutine_token: <literal_alnum_token>
    channel_name: <literal_variable_token>

    literal_alnum_token: /[A-Za-z0-9_][A-Za-z0-9_]*$/
    literal_limited_alnum_token: /^[A-Za-z_][A-Za-z0-9_]*$/
    literal_integer: /^-?[0-9]*[1-9][0-9]*$/
    literal_positive_integer: /^[0-9]*[1-9][0-9]*$/
    literal_non_negative_integer: /^[0-9]+$/

    ws: /[ \t\f\n\r]/   # white space
    hws: /[ \t]/        # horizontal white space
```

除此之外，

1. `literal_number` 遵循 [JSON] 语法。
1. `literal_integer` 本质上同 `literal_number`，只是在执行器的内部实现当中，应转换为最接近的整数使用。
1. `ip_literal`、 `ipv4_address` 和 `reg_host_name`，参阅 [RFC 3986] 之 `Section 3.2.2`。

另外，由于执行器的规则字符串通常作为属性值使用，考虑到属性值可使用单引号及双引号包围，因此，规则中的字符串字面值（string literal）可使用单引号（`'`）或双引号（`"`）包围：

- 当属性值本身使用双引号（`"`）包围时，规则中的字符串应使用单引号（`'`）包围。
- 当属性值本身使用单引号（`'`）包围时，规则中的字符串应使用双引号（`"`）包围。注意，此种情况下，属性值中的 `$` 将被当做字面值处理，不用于定义一个求值表达式。

所有规则中的字符串字面值，故而在这些字符串中包含字面的单引号（`'`）或双引号时（`"`）时，需使用转义，其他特殊字符，如 +U0009 TAB 等，参照 [JSON] 语法：

1. 需转义的特殊字符包括：`\\`、 `\/`（非强制）、 `\b`、 `\f`、 `\n`、 `\r`、 `\t`。
1. 当规则中的字符串使用单引号（`'`）包围时，字符串中包含的字面单引号（`'`）应使用转义表达：`\'`。
1. 当规则中的字符串使用双引号（`"`）包围时，字符串中包含的字面双引号（`"`）应使用转义表达：`\"`。
1. 当规则中的字符串使用双引号（`"`）包围时，字符串中包含的字面美元符号（`$`）应使用转义表达：`\$`。
1. `\uHHHH` 用四个十六进制数字表示一个 Unicode 字符，如 `\uA0A0`；不支持 C 语言十六进制或八进制（如 `\xA0\xA0`）这种写法。

以上说明适用 `literal_char` 和 `literal_char_sequence`。

注意，因 HVML 要求使用 UTF-8 编码，`literal_char` 本质上是一个多字节序列，对应字符串类型。当实际的 `literal_char` 中包含多个 Unicode 字符时，仅第一个字符生效。

#### 2.2.4) 动态对象方法的描述语法

在描述动态对象的获取器、设置器方法的参数及返回值时，我们使用如下语法：

1. 描述参数时，必须指定参数的类型，外加可选的形参名称；若参数是可选的，则可使用 `=` 给出该形参的默认值。如：
   - `number $seconds`。
   - `boolean $case_insensitivity = false`。
   - `string`。
   - `string = 'auto'`。
1. 可选地，在参数类型（及形参名称）之后添加冒号 U+003A（`:`）并在反引号 U+0060（\`）包围中（或使用 C 语言注释符号）描述其用途。如：
   - number $seconds: /\* seconds since epoch \*/
   - boolean $case\_insensitivity = false: \`performs a case-sensitive (@false) or a case-insensitive (@true) check.\`
   - string: locale category
1. 若在描述中包含 `true`、`null`、`undefined` 等关键词，使用 U+0040（@ ）前导符号。
1. 使用 `native/<entityName>` 的形式描述原生实体类型，其中 `<entityName>` 是这种原生实体类型的名称。
1. 可使用如下类型别名：
   1. `any`：任意类型。
   1. `real`：任意实数类型，即 `number`、 `longint`、 `ulongint` 或 `longdouble` 之一。
   1. `linctnr`：线性容器，即 `array`、 `tuple` 或 `set`。
   1. `container`：容器，即 `array`、 `tuple`、 `object` 或 `set`。
1. 参数可传递多个类型时，使用 `|` 分隔，如：`string | number`。
1. 当字符串参数中使用多个或者单个关键词表示单个或者多个选项时，我们用空格分隔这些关键词，使用 `||` `&&` 等符号表示这些关键词是否可以同时出现，然后将整个字符串参数用单引号（`'`）或双引号（`"`）包围，如 `"kernel-name || machine"` 或 `'kernel-name && machine'`。具体规则描述如下：
   1. 并置的关键词表示所有的关键词（组）都要以给定的顺序传递。
   1. `&&` 分隔的两个或多个关键词（组），表示必须传递所有这些关键词，顺序任意。
   1. `||` 分隔的两个或多个关键词（组），表示必须传递这些关键词中的一个或多个，顺序任意。
   1. `|` 分隔两个或者多个关键词（组），表示必须传递其中一个。
   1. 使用一对中括号（`[ ]`）对多个关键词进行分组。
   1. 不使用前置的参数类型 `string`。
1. 参数中使用的关键词由不包含空格和控制字符的可打印字符组成；参数中需要传递多个关键词时，使用单个或者多个 ASCII 空白字符分隔。
1. 枚举说明关键词用途时，一行描述一个关键词，并使用前导字符 `-`。
1. 方法的返回值类型，在右括号 U+0029（`)`）之后描述；可能返回多种类型时，使用 `|` 符号分隔。可选地，在类型名称后添加冒号（`:`）以及对返回值的简要描述信息。
1. 可选地，我们对必须包含的参数或语法单元，包含在一对尖括号（`< >`）中描述；对可选的参数或语法单元，包含在一对中括号（`[ ]`）中描述。

上述语法中使用关键词表示选项的情形，示例如下：

- `'kernel-name | kernel-release | kernel-version | machine | all'`：表示只能传递这些关键词中的一个。
- `'[kernel-name || kernel-release || kernel-version || machine] | all'`：表示要么传递 `all` 要么传递前面可选关键词中一个或多个，顺序任意。

比如我们使用如下的语法描述 `$DATA.numerify` 方法的接口：

```javascript
// 对给定的数据做数值化，返回指定的实数类型，默认为 `number`。
$DATA.numerify(
        any $data,
        'number | longint | ulongint | longdouble' $subtype = 'number': `the number subtype to return.`
) number | longint | ulongint | longdouble : `the numberified data.`
```

或，

```javascript
// 对给定的数据做数值化，返回指定的实数类型，默认为 `number`。
$DATA.numerify(
        <any $data>
        [,
            <'number | longint | ulongint | longdouble' $subtype = 'number': `the number subtype to return.`>
        ]
) number | longint | ulongint | longdouble : `the numberified data.`
```

以上语法亦可用于描述对象的属性，如：

```javascript
    {
        "messageType": <string: `the type of this message, such as 'event', 'result', 'change', and an implementation defined message type.`>,
        "messageSubType": <string: `the sub type of this message, optional`>,
        "source": <any: `the variant generating this message`>,
        "time": <number: `the time when this message fired`>,
        "signature": <string: `optional signature`>,
        "payload" : <object: `the payload of this message`>
    }
```

#### 2.2.5) eJSON 语法

当 HVML 元素的内容是数据内容时，我们可混合使用扩展的 JSON 语法来描述某个结构化的数据，并嵌套使用求值表达式。本节描述扩展 JSON 语法。

1) 当内容不以换行字符（U+000A LF 或 U+000D CR 字符）开头时，则按普通 HTML 元素的文本内容进行解析，并支持 HTML 字符引用，否则将按照扩展 JSON 语法处理。如：

```hvml
<foo id=text> 123456&amp;</foo>

<foo id=number>
123456
</foo>
```

`id` 为 `text` 的 `foo` 元素，其内容为字符串 ` 123456&`；另一个 `foo` 元素的内容为数值 `123456`。

2) 当对象（object）的键名由 ASCII 字母打头，且仅包含 ASCII 字母、数字、减号、下划线时，可省略键名两边的双引号，其他情形，必须使用双引号包围。如：

```javascript
{
    width: "device-width",
    initial-scale: 1.0,
    minimum-scale: 0.5,
    maximum-scale: 2.0,
    user-scalable: true,
    "地区": "zh-CN"
}
```

3) 对象（object）中的最后一个键值对，数组（array）的最后一个单元之后，可包含逗号 (,)。如：

```javascript
{
    age: 10,
    weight: 30,
    height: 150,
}
```

或，

```javascript
[
        { age: 10, weight: 30, height: 150, },
        { age: 11, weight: 32, height: 145, },
]
```

4) 使用如下后缀来明确表示数值（number）的类型：
   - 有符号长整型（64 位）：1234567890L
   - 无符号长整型（64 位）：1234567890UL
   - 可使用 `0x` 前缀表示十六进制表达的有符号长整型，此时可忽略 `L` 后缀：0x1122AABBCCDDEEFF
   - 可使用 `0x` 前缀表示十六进制表达的有符号长整型，此时可忽略 `L` 后缀：0x8899AABBCCDDEEFFU
   - 长双精度浮点数：1234567890FL

未显式指定类型的数值，全部视作双精度浮点数处理。

5) 对象键名或字符串，可使用单引号（`'`）或者双引号（`"`）包围。单引号和双引号的区别在于，使用双引号时，其中的单引号不需要做转义处理，并对包含其中的表达式进行求值，将求值结果字符串化之后和其他部分串接在一起作为最终结果使用；当使用单引号时，其中的双引号不需要做转义处理，且忽略其中可能存在的表达式。如：

```js
{
    'Title': "David's Book",
    "Description": 'Daivd says: "This is my book"',
}
```

注意，在双引号和单引号定义的字符串中，不允许出现未经转义的 C0 控制字符。

6) 可使用 `"""`（三双引号，triple-double-quote）定义多行文本字符串，将原样保留其中的 ASCII 制表符或者新行符（U+0009 TAB、U+000A LF、U+000D CR），单引号（`'`）以及不连续出现三次的双引号（`"`）无需使用转义符号。类似地，可使用 `'''`（三单引号，triple-single-quote）定义多行文本字符串，将原样保留其中的 ASCII 制表符或者新行符，双引号（`"`）以及不连续出现三次的单引号（`'`）无需使用转义符号。

如：

```js
{
    id:         1234567890UL,
    nickname:   "David",
    signature:
"""
一个

    被'程序'耽误的

        "文艺"青年。
""",
}
```

三单引号和三双引号的区别在于，使用三双引号时，将对包含其中的表达式进行求值，并将结果做字符串化之后和其他部分串接在一起作为最终结果，当使用三单引号时，将忽略其中的求值表达式。

注意，在三双引号和三单引号定义的字符串中，不允许出现未经转义的除了 ASCII 制表符或者新行符（U+0007 TAB、U+000A LF、U+000D CR）之外的 C0 控制字符。

7) 对字节序列类型，使用 `bx`、 `bb`、 `b64` 等前缀，分别表示十六进制表达、二进制表达和 Base64 编码。如：

```js
{
    hex:     bx00112233445566778899AABBCCDDEEFF,
    binary:  bb0011.1100.0011.0011,
    base64:  b64UHVyQyBpcyBhbiBIVk1MIHBhcnNlciBhbmQgaW50ZXJwcmV0ZXIuCiA=,
}
```

若 `bx`、`bb`、`b64` 前缀之后不跟任何字符，则表示一个空的字节序列。

使用二进制表达时，中间的句点是可选的，只用于方便阅读，解析时忽略。

8) 使用 `[!` 和 `]` 包围定义元组。如：

```js
[! 'Title', "David's Book", "Description", 'Daivd says: "This is my book"' ]
```

### 2.3) 框架标签详解

框架标签用于定义一个 HVML 程序的框架结构，有 `hvml`、`head` 和 `body` 三个标签。

注意，在框架标签中，我们可以使用 HVML 定义的副词属性，比如 `silently`，表示在对其属性值和内容求值时，执行静默求值。

除副词属性以及指定的属性外，在框架标签中定义的其他属性（比如 `hvml` 标签中定义的 `lang` 属性），将在被求值后被克隆（clone）到目标文档的对应元素中。

#### 2.3.1) `hvml` 标签

`hvml` 标签定义一个 HVML 程序（或 HVML 文档）。`hvml` 标签支持如下属性：

- `target`：定义 HVML 程序的目标标记语言，取 `void`、 `html`、 `xml` 等值，通常是某种目标标记语言（或目标文档类型）的名称。HVML 解释器应至少支持 `void` 这一特殊的目标标记语言；顾名思义，`void` 类型不产生任何实际的目标文档内容，故而无需渲染器即可正常运行，此时，HVML 程序和一般的脚本程序并无本质区别。当目标标记语言定义为 `void` 时，解释器将维护一个特殊的 eDOM 树，对这个 eDOM 树的任何更新都将被完全忽略，而在其上执行 `$DOC.query` 将始终返回空的元素汇集。

注意，`target` 属性和所有 HVML 副词属性，都不应该被克隆到目标文档的根元素中。

除了注释之外，`hvml` 元素中可包含如下两种标签定义的子元素：

- 零个或一个由 `head` 标签定义的头部元素，若有则必须定义为 `hvml` 元素的第一个子元素。
- 零个或多个由 `body` 标签定义的本体元素。

#### 2.3.2) `head` 标签

`head` 标签用于定义 HVML 代码的头部信息，其中可包含如下标签定义的子元素：

- 可被原样保留到目标文档的标签，如 HTML 文档的 `<meta>`、 `<link>` 等标签。
- 全局数据的初始化；使用 `init` 标签定义。
- 全局动态对象；使用 `init` 标签定义。
- 全局长连接数据源；使用 `init` 标签和 `$STREAM` 预定义变量初始化。
- 全局模板；使用 `archedata`、 `archetype`、 `error`、 `except` 等标签定义。

HVML 程序中，`head` 标签是可选的，无预定义属性。

当目标标记语言支持 `head` 标签时，其属性和内容以及所有使用非 HVML 标签定义的元素将被克隆到目标文档的 `head` 元素中。当目标标记语言不支持 `head` 标签时，其属性将被丢弃，而其内容以及所有使用非 HVML 标签定义的子元素将被置于目标文档的根元素之下。

#### 2.3.3) `body` 标签

`body` 标签用于定义 HVML 程序的本体内容。在 HVML 程序中，可以定义多个 `body` 本地内容，使用 `id` 属性区别不同的本体内容。在执行过程中，可通过 `load` 元素装载不同的本体内容。

当目标标记语言支持 `body` 标签时，其属性将被克隆到目标文档的 `body` 元素中。若目标标记语言不支持 `body`，其属性将被丢弃。

#### 2.3.4) `hvml` 标签的内容

在 `hvml` 标签内部，我们可使用求值表达式，这些表达式将在执行过程中被求值，其结果将被设置为 `hvml` 元素的执行结果，而 `hvml` 元素对应的栈帧始终为最顶栈帧，因此，`hvml` 元素的结果数据也将作为整个 HVML 协程的执行结果。在 `hvml` 标签内，我们可以定义多个表达式，后一个表达式的求值结果将覆盖 `hvml` 元素的结果数据。如：

```hvml
<hvml target="void" lang="$STR.substr($SYS.locale, 0, 2)">
    {{
        $STREAM.stdout.writelines('Start of `Hello, world!`');
        $STREAM.stdout.writelines("$DATETIME.fmttime('%H:%m')")
    }}

    <head>
        <title>$T.get('Hello, world!')</title>
    </head>

    <body>
        <p>$T.get('Hello, HVML!')</p>
    </body>

    {{
        $STREAM.stdout.writelines('End of `Hello, world!`');
        $STREAM.stdout.writelines("$DATETIME.fmttime('%H:%M')")
    }}
</hvml>
```

就上述 HVML 程序，`hvml` 元素的结果数据将作为整个 HVML 协程的执行结果。因此，以上程序的正常执行结果为最后一个求值表达式的求值结果：6（写入 "11:00" 字符串以及额外的新行符到标准输入的字节数）。

### 2.4) 模板标签详解

模板标签本质上定义的是一个文档片段模板或者数据模板，可视作一个包含参数化字符串或者参数化数据，因此，我们实际上可以使用 `init` 标签来获得和模板标签一样的功能。

所有模板标签可使用其内容来定义一个模板，也可以使用 `src` 属性定义的 URL 从外部数据源中获得模板数据。当同时使用 `src` 属性和内容来定义模板数据时，将尝试装载指定的外部资源作为模板数据，如果装载失败，则转而使用内容。如：

```hvml
    <archetype name="user_item" src="foo:///nonexistent_dir/templates/user_item">
        <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.name</span>
        </li>
    </archetype>
```

上述代码指定的 `src` 属性值使用了错误的协议名称，请求将失败，因此，最终将使用内容定义的模板数据。

当我们从外部 URL 中获得模板数据时，可使用如下属性：

- `src`：用于指定外部数据源 URL。
- `param`：形如 `a=10&b=20` 的请求参数，需按照 [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986) 进行编码。
- `method`：方法，如 `GET`、`POST`、`POST RAW-HEADHER` 等。

所有模板标签支持如下属性：

- `silently` 属性。当定义有这个属性时，对属性值的求值将执行静默求值。
- `raw` 属性。当定义有这个属性时，模板数据中 `$` 将被视作一个字面字符，而不执行表达式的求值处理。

#### 2.4.1) `archetype` 标签

`archetype` 标签用于定义一个文档片段模板。

```hvml
    <archetype name="user_item">
        <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.name</span>
        </li>
    </archetype>

    <archetype name="unknown_user_item" raw>
        <li class="user-item">
            <img class="avatar" src="/def-avatar.png">
            <span>Unknown</span>
        </li>
    </archetype>
```

在上面的例子中，第一个 `archetype` 标签定义了一个文档片段模板，可用于生成最终的目标文档片段并插入到目标文档的指定位置。HVML 解释器在将该模板克隆并插入到真实的文档时，会将当前上下文中的数据按照给定的映射关系进行替换。在 HVML 中，`$?` 是一个特殊的上下文变量，用来指代动作标签执行时的前置操作结果数据。类似 `$?.id`、 `$?.name` 这样的字符串将被视为求值表达式进行求值，最终使用当前上下文的数据来替代。

在上面的例子中，第二个 `archetype` 标签定义了一个裸文本模板，其中包含一段 XML/HTML 文档片段，可克隆到目标位置，但不做任何求值表达式的处理，即使包含合法的求值表达式。

另外，在 `archetype` 标签中，我们还可以使用 `type` 属性定义模板片段的文本类型，可以取如下值：

- `plain`：视作普通文本。
- `html`：视作 HTML 片段。
- `svg`：视作 SVG 片段。
- `mathml`：视作 MathML 片段。
- `xgml`：视作 XGML 片段。
- `xml`：视作通用 XML 片段。

如果不指定 `type` 属性值，则取目标文档的默认文本类型。比如当目标文档类型为 `html` 时，`archetype` 标签定义的文档片段将默认按照 HTML 片段处理。

本质上，`archetype` 定义的模板内容是一个字符串变量，其变量名由 `name` 属性定义。

注意，用于引用特定的 `archetype` 模板的变量名，和 HTML/XML 不同，HVML 不要求该标识符是全局唯一的，而只要求在 HVML 的同一级兄弟元素中唯一，这带来了一定的便利。比如：

```hvml
    <body>
        <archetype name="user_item">
            <p>$?</p>
        </archetype>

        <ul>
            <archetype name="user_item">
                <li>$?</li>
            </archetype>

            ...
        </ul>
    </body>
```

在上述 HVML 代码中，当我们在 `ul` 元素中引用 `$user_item` 时，对应的文档模板是 `<li>$?</li>`，而在 `ul` 元素之外引用 `$user_item` 时，得到的文档模板是 `<p>$?</p>`。

#### 2.4.2) `archedata` 标签

`archedata` 标签用于定义一个数据模板。

```hvml
    <archedata name="item_user">
        {
            "id": "$?.attr[data-value]", "avatar": "$?.children[0].attr.src",
            "name": "$?.children[1].children[0].textContent", "region": "$?.attr[data-region]"
        }
    </archedata>
```

在上面的例子中，`archedata` 标签定义了一个数据模板，其处理类似 `archetype`，但通常用于将一个数据映射到另一个结构不同的数据。

本质上，`archedata` 定义了一个参数化数据，可通过 `name` 属性定义的变量名引用。

#### 2.4.3) `error` 标签

`error` 标签用于定义一个针对错误的文档片段模板，可使用 `type` 属性指定对应的错误名称，但无需指定 `name` 属性。定义错误名称时，必须使用反引号属性值语法。

当未指定 `type` 属性时，或使用 `ANY` 值时，表示默认的错误模板，可匹配任意错误。

本质上，`error` 标签定义的内容设置了 `ERROR` 变量对应 `type` 键名的键值，故而如下两个标签的功能是一样的：

```hvml
    <error type=`SegFault`>
        <p>Memory error!</p>
    </error>

    <update on="$ERROR" at=".SegFault">
        "<p>Out of memory!</p>"
    </update>
```

#### 2.4.4) `except` 标签

`except` 标签用于定义一个针对异常的文档片段模板，可使用 `type` 属性指定对应的异常名称，但无需指定 `name` 属性。定义异常名称时，必须使用反引号属性值语法。

当未指定 `type` 属性时，或使用 `ANY` 值时，表示默认的异常模板，可匹配任意异常。

本质上，`except` 标签定义的内容设置了 `EXCEPT` 变量对应 `type` 键名的键值，故而如下两个标签的功能是一样的：

```hvml
    <except>
        <p>There is an uncaught exception.</p>
    </except>

    <update on="$EXCEPT" at=".ANY">
        "<p>There is an uncaught exception.</p>"
    </update>
```

注意在上面定义异常模板时，我们未指定 `type` 属性，表示默认的异常模板。在 `update` 标签，我们改变的是 `$EXCEPT` 数据上的键名 `ANY` 的键值，这表示我们使用 `ANY` 键名保存默认的异常模板。

### 2.5) 动作标签详解

#### 2.5.1) `init` 标签

`init` 标签定义一个执行初始化或者重置变量操作的元素。在 HVML 程序的头部（由 `head` 标签定义）使用 `init` 标签，将初始化一个全局变量。在 HVML 程序的正文（由 `body` 标签定义）内使用 `init` 标签，默认将定义一个仅在其所在父元素定义的子树中有效的局部变量。

默认情况下，我们使用 `init` 标签初始化或者覆盖一个静态变量，但如果我们在 `init` 标签中使用 `temporarily` 副词属性，则会创建一个临时变量。

通常，我们使用 `as` 属性指定要初始化的变量之名称，我们可使用 `at` 属性指定变量的名字空间（name space）或者在创建临时变量的情况下，指定变量所在的栈帧：

- 若初始化静态变量，当我们使用下划线（\_）打头的预定义名称 `_parent`、`_grandparent`、 `_root` 时，将分别在父元素、祖父元素或根元素上定义变量。
- 若初始化静态变量，当我们使用下划线（\_）打头的预定义名称 `_runner` 时，将创建行者级变量，该变量将对本行者所有的协程可见。
- 若初始化临时变量，当我们使用下划线（\_）打头的预定义名称 `_last`、`_nexttolast`、 `_topmost` 时，则分别在上一个栈帧、上上一个栈帧和最顶栈帧上定义临时变量。
- 使用井号（#）打头的元素标识符，如 `#myAnchor`，将在其祖先元素（或前置栈帧）中搜索指定的元素标识符（由元素的 `id` 属性指定），将在第一个匹配的祖先元素（或前置栈帧）上初始化变量。
- 使用正整数 N（如 `2`、`3`）时，若初始化静态变量，将沿 vDOM 树向祖先元素方向回溯 N 个祖先元素，在该祖先元素上初始化变量；若初始化临时变量，将沿执行栈向上回溯 N 个栈帧，在该栈帧上初始化变量。
- 静默求值情形下，若未找到匹配的祖先元素或者前置栈帧，则按未定义 `at` 属性做默认处理。

我们通常使用 `with` 属性定义一个求值表达式（或参数化数据）来指定变量的值。我们也可以直接将求值表达式嵌入到 `init` 标签内，从而使用其数据内容来定义这个变量的值。我们还可通过 HTTP 等协议加载外部资源而获得，比如通过 HTTP 请求，此时，使用 `from` 属性定义该请求的 URL，使用 `with` 参数定义请求参数，使用 `via` 属性定义请求方法（如 `GET`、 `POST`、 `DELETE` 等）。

在使用 `with` 属性指定 `HTTP` 等请求的参数时，默认使用 `application/x-www-form-urlencoded` 类型。若需要使用自定义的 HTTP 请求头部，可在 `via` 属性值中指定 `RAW-HEADER` 关键词（如 `POST RAW-HEADER`），并使用 `with` 指定自定义的 HTTP 请求头部内容。

我们也可以使用 `init` 标签从共享库中初始化一个自定义的动态对象，此时，给定 `via` 的属性值为 `LOAD`，表示装载一个外部程序模块。使用 `init` 元素装载动态对象时，我们通过 `from` 属性指定的是要装载的外部程序模块的名称。根据该模块名称确定具体的文件名以及模块文件的存储位置，取决于具体的解释器实现。若外部程序模块（如 C/C++ 语言共享库）中定义有多个动态对象，使用 `for` 属性指定要装载的动态对象名称。

当我们在 `init` 标签中使用 `from` 属性，`via` 属性不为 `LOAD`，且使用 `asynchronously` 副词属性时，将异步地从外部资源中获取数据作为变量的值。程序可通过观察变量上的 `change:attached` 做进一步的处理。具体可参阅 [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签) 一节。

需要注意的是，当使用异步加载方式初始化一个变量时，当外部资源的数据返回时，程序已经脱离了 `init` 元素所在的上下文（执行栈），故而无法处理数据中含有上下文变量的情形。解释器可以限制此种情况下的数据只能是原始的数据（raw data）。

在一个已经初始化的变量上使用 `init` 标签时，将使用新的数据重置这个变量，而如果使用 `undefine` 重置变量，其效果相当于删除这个变量。

解释器按如下规则确定使用哪个数据来初始化或重置变量：

1. 指定 `from` 属性且未指定 `asynchronously` 副词属性时，将同步地从指定的外部资源获取数据。此种情况下，`with` 属性值用于指定请求参数；当同步请求失败时（注：此时可能抛出异常），若定义有内容，则使用内容数据作为源数据。
1. 指定 `from` 属性且未指定 `asynchronously` 副词属性时，将异步地从指定的外部资源获取数据。此种情况下，若定义有内容，则会首先使用内容数据作为源数据，当异步装载成功后，该变量的值重置为装载后的数据。
1. 未指定 `from` 属性时，若定义有 `with` 属性，则优先使用 `with` 属性值初始化或重置变量，这种情况下忽略内容；若没有定义 `with` 属性但定义有内容，则使用内容作为初始化或重置变量；若两者皆未定义，则抛出 `NoData` 异常。

在使用 `init` 标签初始化集合时，我们可使用 `casesensitively` 或者 `caseinsensitively` 两个副词属性来指定字符串对比是否对大小写敏感；默认对大小写敏感。

该标签的常见用法如下：

```hvml
    <!-- 使用对象数组初始化一个集合 -->
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <!-- 使用字符串（大小写不敏感）数组初始化一个集合 -->
    <init as="locales" uniquely caseinsensitively>
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK", "en_us" ]
    </init>
    <!-- 结果为：
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK" ]
    -->

    <!-- 从共享库中装载动态对象 $math  -->
    <init as="math" from="purc_dvobj_math" via="LOAD" />

    <!-- 使用 POST 方法以及 from=foo 查询参数从 http://foo.bar.com/locales 获取数据并初始化 $locales  -->
    <init as="locales" from="http://foo.bar.com/locales" with="{ from: 'foo' }" via="POST" />

    <!-- 使用 POST 方法以及自定义 HTTP 头部获取数据并初始化 $locales -->
    <init as="locales" from="http://foo.bar.com/locales" via="POST RAW-HEADER" >
        '''
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

-----------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"

some text
-----------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)
-----------------------------974767299852498929531610575--
        '''
    </init>

    <!-- 覆盖 $users 变量 -->
    <init as="users">
        [
            { "id": "1", "avatar": "/img/avatars/101.png", "name": "Jerry", "region": "en_US" }
            { "id": "2", "avatar": "/img/avatars/102.png", "name": "Tom", "region": "en_US" }
            { "id": "3", "avatar": "/img/avatars/103.png", "name": "Mike", "region": "en_US" }
        ]
    </init>

    <!-- 使用空数组重置 `users` 变量 -->
    <init as="users" with="[]" />
```

我们也可以在 `init` 标签中使用 `at` 属性指定变量名所在的元素位置。如：

```hvml
<body>
    <!-- 在 `body` 元素上使用对象数组初始化一个集合（唯一性键名是 id） -->
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <div>
        <!-- 使用 `at` 属性覆盖 `body` 元素上的 `users` 变量 -->
        <init as="users" at="_grandparent">
            [
                { "id": "3", "avatar": "/img/avatars/3.png", "name": "Vincent", "region": "zh_CN" },
                { "id": "4", "avatar": "/img/avatars/4.png", "name": "David", "region": "en_US" }
            ]
        </init>

        <!-- 在 `div` 元素上创建一个 `users` 变量，初始化为空数组 -->
        <init as="users" with="[]" />

        <section id="myAnchor">
            <div>
                <!-- 在 `section` 元素上创建一个 `users` 变量，初始化为空数组 -->
                <init as="users" with="[]" at="#myAnchor" />

                <!-- 在 `section` 元素上创建一个 `emptyUser` 变量，初始化为空对象 -->
                <init as="emptyUser" with="{}" at="_grandparent" />
            </div>
        </section>
    </div>

    <!-- 移除 `body` 元素上的 users 变量 -->
    <init as="users" with=undefined />
</body>
```

`init` 元素的执行结果（`$?`），同变量对应的数据。

我们也可以不指定 `init` 的 `as` 属性，从而仅仅利用 `init` 标签初始化一项数据，然后使用 `init` 元素的结果数据（$?）来完成相应的工作。此种情况下，我们通常不使用异步初始化模式。

```hvml
    <init from="http://foo.bar.com/locales" with="{ from: 'foo' }" via="POST" >

        <!-- do something here by using `$?` -->
    </init>
```

`init` 元素可能抛出的异常有：

- 当 `as` 属性指定的变量名不符合要求时，将抛出 `BadName` 异常。
- 当 `at` 属性指定的祖先元素或前置栈帧名称不符合要求或者不存在时，将分别抛出 `BadName` 异常或 `EntityNotFound` 异常。

当我们在 `init` 标签中使用 `temporarily` 副词属性时，将操作或者前置栈帧中用户自定义的上下文变量 `$!`，从而创建一个临时变量：

- 初始时，`$!` 应被定义一个空对象。新增用户自定义的临时变量，意味着在这个对象中增加一个新的键值对，键名为该临时变量的名称，而键值为该临时变量的值。
- 使用 `as` 属性时，默认将初始化或覆盖中用户自定义的上下文变量 `$!` 中指定的键值对，但我们可以使用 `at` 属性通过元素标识符等指定目标栈帧。
- 访问当前或者前置栈帧中的临时变量时，可使用 `$[N]!.<name of the temp. variable>` 表达式。
- 为使用方便，也可以用 `$<name of the temp. variable>` 表达式来访问临时变量。
- 作为一个限制，临时变量不能异步初始化，也就是说，`temporarily` 副词属性不能和 `asynchronously` 副词属性同时使用。若同时指定这两个副词属性，应忽略 `asynchronously`。

当我们仅仅基于名称查找命名变量时，则按如下规则处理：

1. 基于名称查询命名变量时，将执行栈向上遍历前置栈帧，找到第一个匹配的临时变量；
1. 若没有找到，从当前栈帧对应的 vDOM 元素位置的父元素开始，在祖先元素节点中查找对应的静态命名变量。

#### 2.5.2) `update` 标签

`update` 标签定义一个执行数据更新操作的动作元素，该元素可使用一个源数据（source data）修改一个目标数据（destination data）。目标数据应该是可变数据或者一个可在其上执行更新动作的原生实体数据，比如一个数组、一个元组、一个对象，或者一个数组、元组或对象的一个特定数据项，一个集合或者一个目标文档位置（即一个元素汇集）。

该标签支持如下属性：

1. `on` 属性用于指定要修改的数组、元组、对象、集合或者目标文档位置，即目标数据。
1. `at` 属性指定在目标数据上做修改的具体位置，比如键名、索引值等，称为目标位置（destination position）。目标数据在目标位置上的数据，称为最终数据（ultimate data）。当要修改的数据是目标数据本身时，不指定此属性，此时最终数据就是目标数据本身。
1. `to` 属性指定具体的修改动作（action），可取如下值之一：
   - `displace`：表示整个替换目标位置上的数据，是默认动作。
   - `append`：表示在目标数据或目标位置中执行追加操作；最终数据必须是数组或者目标文档位置。
   - `prepend`：表示在目标数据或目标位置中执行前置操作；最终数据必须是数组或者目标文档位置。
   - `insertBefore`：表示在目标数据或者目标位置之前插入一个数据；最终数据必须是数组或者目标文档位置。
   - `insertAfter`：表示在目标数据或者目标位置之后插入一个数据；最终数据必须是数组或者目标文档位置。
   - `add`：当最终数据是数组或者目标文档位置时，等同于 `append` 操作。当最终数据是集合时，将源数据添加到给定的集合中。
   - `remove`：当最终数据是数组或者目标文档位置时，表示移除目标位置上的数据。当最终数据是集合时，表示从集合中移除一个和源数据匹配的数据项。
   - `overwrite`：表示在目标数据或目标位置上执行对象或集合的覆盖操作。当最终数据为对象时，源数据必须为对象；该动作将使用源数据中的键值对替代最终数据对象中具有相同键名的键值对。当最终数据为集合时，则最终数据必须为基于唯一性键值的对象集合，源数据可以是单个对象或线性容器（数组、元组或集合），该动作将覆盖最终数据中匹配源数据数据项的对象。
   - `merge` 或 `unite`：表示在目标数据或目标位置上执行对象或集合的合并操作。当最终数据为对象时，源数据必须为对象；合并后的最终数据（对象）中包含原始键值对以及源数据中的键值对，对重复的键名，使用源数据中的值替代。当最终数据为集合时，源数据必须为线性容器（数组、元组或集合），该动作将把源数据（数组、元组或集合）中的数据项合并到最终数据（集合）中，当出现唯一性条件冲突时，使用源数据替代。
   - `intersect`：表示在目标数据或目标位置上执行对象或集合的求交操作。当最终数据为对象时，源数据必须为对象；操作后的最终数据（对象）中仅保留最终数据和源数据中均存在的键对应的键值对，移除其他键值对。当最终数据为集合时，源数据必须为线性容器（数组、元组或集合）；该动作将在最终数据中仅保留在最终集合和源数据均存在的数据项（使用集合的唯一性条件确定）。
   - `subtract`：表示在目标数据或目标位置上执行对象或集合的求差操作。当最终数据为对象时，源数据必须为对象；操作后的最终数据（对象）中移除源数据中存在的键对应的键值对。当最终数据为集合时，源数据可以是线性容器（数组、元组或集合）；该动作将在最终数据中移除源数据根据集合的唯一性条件确定的数据项。
   - `xor`：表示在目标数据或目标位置上执行对象或集合的亦或操作。当最终数据为对象时，源数据必须为对象；操作后的最终数据（对象）中保留只在最终数据或者源数据中存在的键对应的键值对。当最终数据为集合时，源数据必须为线性容器（数组、元组或集合）；该动作相当于求并集和交集之差。
1. `from` 属性指定修改操作源数据的外部数据源，如 URL；此时，使用 `with` 属性指定请求参数，使用 `via` 属性指定请求方法和请求头部信息。
1. 当未定义 `from` 属性时，`with` 属性指定修改操作使用的源数据；当定义有 `from` 属性时，`with` 属性指定请求参数。
1. `via` 属性指定获得外部数据源的方法，如 `GET`、`POST` 等，仅在指定 `from` 时有效。

在指定源数据时，当源数据必须为线性容器（数组、元组或集合）时，亦可将单个数据视作仅包含一个成员的数组对待，以方便编程。

在指定源数据时，除了 `with` 属性和 `from` 属性之外，我们还可以使用 `update` 元素的内容数据。三种源数据指定方式的优先级为：

1. 指定 `from` 属性时，将尝试同步地从指定的外部资源获取数据。此种情况下，`with` 属性值用于指定请求参数；当同步请求失败时（注：此时可能抛出异常），若定义有内容，则使用内容数据作为源数据。
1. 未指定 `from` 属性时，若定义有 `with` 属性，则优先使用 `with` 属性值作为源数据，这种情况下忽略内容；若没有定义 `with` 属性但定义有内容，则使用内容作为源数据；若两者皆未定义，则抛出 `NoData` 异常。

当执行成功时，`update` 元素的结果数据为修改后的目标数据。

##### 2.5.2.1) 指定目标位置

对下面的文档片段：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none">0</span> users):</h2>
    </div>
```

我们通过下面的 `update` 标签来设置用户数量并修改其 `class` 属性：

```hvml
    <update on="#the-user-stats > h2 > span" at="textContent" with="10" />
    <update on="#the-user-stats > h2 > span" at="attr.class" with="text-warning" />
```

执行上述 `update` 动作后，上面的 HTML 代码片段将变为：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="text-warning">10</span> users):</h2>
    </div>
```

类似地，我们在数组、元组、对象等数据上执行 `update` 动作。比如更新 `$users` 的第二个用户的名称（`name`）：

```hvml
    <init as="users">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN", "age": 3 }
        ]
    </init>

    ...

    <update on="$users[1]" at=".name" with="Richard" />
```

当目标数据是目标文档位置（元素或者元素汇集）、数组、元组或对象时，我们使用 `at` 的属性值指定要更改的数据成员位置或名称，如上面的 `textContent`、 `attr.class` 以及 `.name` 等。其规则如下：

- 如果目标数据是元素，我们使用 `textContent` 这一虚拟数据成员名称来表示元素的文本内容。
- 如果目标数据是元素，我们使用 `dataContent` 这一虚拟数据成员名称来表示元素的数据内容。
- 如果目标数据是元素，我们使用 `content` 来表示使用目标文档的片段来作为其内容（这可能改变 DOM 子树的结构）。
- 如果目标数据是元素，我们使用 `attr.<attr_name>`、 `attr[attr_name]` 来表示元素的静态属性名称，如 `attr.value` 或 `attr[value]` 表示元素的 `value` 属性值。
- 如果目标数据是对象，我们使用 `.<key_name>` 或 `[<key_name>]` 来表示数据项的键名。
- 如果目标数据是数组，我们使用 `[<index_num>]` 来表示数组中的第 `<index_num>` 个数据项。
- 如果目标数据是元组，我们使用 `[<index_num>]` 来表示元组中的第 `<index_num>` 个数据项。

我们可以使用不含等号的介词属性值指定语法，如：

```hvml
    <update on $users[0] at '.age' with 3 >
        <update on $users[1] at '.age' with $math.add($?.age, 1) />
    </update>
```

上例中，我们针对目标数据 `$users[0]` 和 `$users[1]` 的 `age` 属性，使用了不含等号的属性值指定语法。第一个 `update` 元素使用了常数 `3`；第二个 `update` 元素使用了求值表达式和上下文变量 `$?`（即前一个 `update` 的结果，也就是 `$users[0]`），因此其求值结果为 `4`。

当我们使用 `undefined` 赋值给数组或者对象的某个数据项时，该数值项将被删除（同 `erase` 标签的效果），如：

```hvml
    <update on $users[1] at=".age" with undefined />
```

亦可用 `remove` 动作：

```hvml
    <update on $users[1] at=".age" to="remove" />
```

当上述 `update` 标签作用于上面的 `$users` 之后，结果为：

```json
    [
        { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
        { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
    ]
```

当我们需要在一个 `update` 标签中同时修改多个数据项时，我们在 `at` 属性值中使用空格表示多个数据项位置，在 `with` 属性值中使用数组对应这些位置上要做的修改。如下面的三个 `update` 标签：

```hvml
    <update on="p > a" at="textContent" with="$?.se_name" />
    <update on="p > a" at="attr.href" with="$?.se_url" />
    <update on="p > a" at="attr.title" with="$?.se_title" />
```

可组合成一个 `update` 标签：

```
    <update on="p > a" at "textContent attr.href attr.title" with ["$?.se_name", "$?.se_url", "$?.se_title"] />
```

当 `at` 指定多个目标位置，其数量和 `with` 属性值的数组数据项数量不匹配时，未指定值的位置，取 `with` 属性最后一个值。

当 `at` 指定多个目标位置，而 `with` 属性值不是一个数组时，`with` 属性值作用于所有的目标位置。

当我们直接在目标数据上执行更新动作时，我们不指定 `at` 属性：

```hvml
    <init as="newUser">
        { "id": "0", "avatar": "/img/avatars/0.png", "name": "Annoymous", "region": "en_US", "age": 2 },
    </init>

    <update on="$users" to="prepend" with $newUser />
```

以上代码将把 `$newUser` 追加到 `$users` 的开头，从而成为用户数组的第一个成员。

另外，当属性值的求值结果为字符串时，我们还可以使用除 `=` 之外的属性修改操作符修改最终数据，详情见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性)。

除此之外，当属性值是数值型数据，我们还可以使用除 `=` 之外的属性修改操作符修改最终数据，详情见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性)。

当目标数据是元素汇集时，`update` 标签设定的更新动作，将作用于汇集中所有的元素在指定位置上的数据。比如，

```hvml
    <update on="span" at="attr.class" with="text-danger" />
```

将修改目标文档中所有类型为 `span` 的元素之类名为 `text-danger`。

当目标数据是对象、元组、数组、集合，且具有 `individually` 副词属性时，`update` 标签设定的更新动作，将作用于数组中所有的数据项在指定位置上的数据。如，

```hvml
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <update on="$users" at=".region" with="zh_CN" individually />

    <init as="localeNames">
        {
            "locales": [ "zh_CN", "zh_TW", "en_US" ],
            "nameEN": [ "Chines (mainland of China)", "Chinese (Taiwan, China)", "English (USA)"],
            "nameZH": [ "中文（中国大陆）", "中文（中国台湾）", "英文（美国）"],
        }
    </init>

    <update on="$localeNames" at="[2]" to="remove" individually />
```

上述代码中的第一个 `update` 标签把 `$users` 集合中所有用户的 `region` 更改为 `zh_CN`；第二个 `update` 标签把 `$localeNames` 中所有键值的第二个数据项删除。分别得到如下结果：

```json
    [
        { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "zh_CN" },
        { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" },
    ]
```

和

```json
    {
        "locales": [ "zh_CN", "zh_TW" ],
        "nameEN": [ "Chines (mainland of China)", "Chinese (Taiwan, China)"],
        "nameZH": [ "中文（中国大陆）", "中文（中国台湾）"],
    }
```

如果更新操作破坏了集合的唯一性条件，将抛出异常。

##### 2.5.2.2) 更新集合

当目标数据是集合时，将忽略 `at` 属性值，且只能执行针对集合的 `unite` 等动作。如果更新操作破坏了集合的唯一性条件，将抛出异常。

下面的代码定义了一个 `$users` 变量作为集合（使用 `id` 作为唯一性键名），并定义了一个 `$new_users` 对象数组：

```hvml
    <init as="users" uniquely against="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <init as="new_users">
        [
            { "id": "3", "avatar": "/img/avatars/3.png", "name": "David", "region": "zh_CN" }
        ]
    </init>
```

注意，我们使用 `id` 作为唯一性键名，故而该键名对应的值，在集合中将保持唯一。

我们使用如下的 `update` 标签以 `$new_users` 作为源数据，使用 `unite` 动作：

```hvml
    <update on="$users" to="unite" with="$new_users" />
```

得到如下结果：

```json
    [
        { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
        { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" },
        { "id": "3", "avatar": "/img/avatars/3.png", "name": "David", "region": "zh_CN" }
    ]
```

类似地，我们要添加一个新的定时器时，使用如下的 `update` 标签修改 `$TIMERS`：

```hvml
    <update on="$TIMERS" to="unite">
        [
            { "id" : "foobar", "interval" : 3000, "active" : "yes" },
        ]
    </update>
```

又如，当我们需要覆盖全局定时器中某个特定的数据项时，我们可以使用 `overwrite` 动作：

```hvml
    <update on="$TIMERS" to="overwrite">
        { "id" : "foo", "active" : "yes" }
    </update>
```

当我们要删除定时器 `foo` 时，可使用 `subtract` 动作：

```hvml
    <update on="$TIMERS" to="subtract">
        { "id" : "foo" }
    </update>
```

#### 2.5.3) `erase` 标签

`erase` 标签定义一个执行移除操作的动作元素，用于从目标数据移除一个指定的数据项，支持 `on` 和 `at` 介词属性。`on` 属性用于指定目标数据，可以是数组、元组、对象、元素汇集或者支持移除操作的原生实体；`at` 用于要移除的数据子项，不指定时表示所有数据项。`erase` 元素的结果数据为移除的数据项个数。

如针对如下的 HTML 代码片段：

```hvml
    <div id="the-user-statistics">
        <h2 class="text-info">User regions (totally <span class="none"></span> users):</h2>
    </div>
```

我们通过下面的 `erase` 标签来删除 `h2` 元素：

```hvml
    <erase on="#the-user-stats > h2" />
```

执行上述 `erase` 动作后，上面的 HTML 代码片段将变为：

```hvml
    <div id="the-user-statistics">
    </div>
```

我们通过下面的 `erase` 标签来删除 `h2` 元素中的 `class` 属性：

```hvml
    <erase on="#the-user-stats > h2" at="attr.class" />
```

执行上述 `erase` 动作后，上面的 HTML 代码片段将变为：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
    </div>
```

注意，当 `on` 属性值指定的是一个元素汇集时，`erase` 标签将移除该集合中所有的元素，或者所有元素的指定属性或内容。

类似地，我们也可以在数组上执行 `erase` 动作。比如清除 `$users` 的第二个成员：

```hvml
    <erase on="$users" at="[1]" />
```

注意，当我们在元组上执行 `erase` 动作时，对应的成员将被置为空值。

我们也可以在对象上执行 `erase` 动作。比如清除 `$users[0]` 的 `name` 属性：

```hvml
    <erase on="$users[0]" at=".name" />
```

`at` 属性值可以是数组的索引值或者对象的属性名称（可指定多个，用空格分割）：

```hvml
    <erase on="$users[0]" at=".name .age" />
```

作为示例，下面的代码在 `iterate` 标签中使用 `erase` 标签，间隔删除数组中成员：

```hvml
    <iterate on="$DATA.count($users)" by="SUB: GE 0 BY 2">
        <erase on="$users" at="[$?]" />
    </iterate>
```

#### 2.5.4) `clear` 标签

`clear` 标签定义一个执行清空操作的元素，该元素清空一个数组、对象、元素汇集或者一个支持清空操作的原生实体对象。该元素仅支持 `on` 介词属性，用于指定目标数据，产生 `true` 或 `false` 两种结果数据，分别表示成功或失败。

如针对如下的 HTML 代码片段：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
        <dl>
            <dt>zh_CN</dt>
            <dd>1</dd>
            <dt>en_US</dt>
            <dd>2</dd>
        </dl>
    </div>
```

我们通过下面的 `clear` 标签来清空用来 `dl` 节点的所有子节点：

```hvml
    <clear on="#the-user-stats > dl" />
```

执行上述 `clear` 动作后，上面的 HTML 代码片段将变为：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
        <dl>
        </dl>
    </div>
```

类似地，我们也可以在数据项上执行 `clear` 动作。比如清空 `$users` 第二个用户信息：

```hvml
    <clear on="$users[1]" />
```

执行上述清空指令后，`$users` 的第二个用户数据项仍然存在，但该数据项将变为空值。

注意，当 `on` 属性值指定的是一个元素汇集时，`clear` 标签将对中的每个元素执行清空操作。

#### 2.5.5) `test`、 `match` 和 `differ` 标签

##### 2.5.5.1) 多分支处理

`test` 标签和 `match` 标签配合使用，主要用于实现分支处理。`test` 元素通过 `on` 属性定义在哪个数据项上执行测试，而 `match` 作为 `test` 元素的子元素，每个 `match` 子元素定义一个匹配分支。

`test` 元素可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值；而 `match` 元素始终产生真值（`true`）作为其结果数据。注意，不满足匹配条件的 `match` 元素定义的分支是不会被执行的。

注意，当使用 `by` 属性时，`test` 元素对执行器的处理同 `choose` 元素。

看如下的示例代码：

```hvml
    <archetype name="footer_cn">
        <p><a href="http://www.baidu.com" title="百度">Baidu</a></p>
    </archetype>

    <archetype name="footer_tw">
        <p><a href="http://www.bing.com" title="必應">Bing</a></p>
    </archetype>

    <archetype name="footer_en">
        <p><a href="http://www.google.com" title="Google">Google</a></p>
    </archetype>

    <archetype name="footer_def">
        <p><a href="http://www.google.com" title="Google">Google</a></p>
    </archetype>

    <footer id="the-footer">
        <test on="$global.locale" in='#the-footer'>
            <match for="AS 'zh_CN'" exclusively>
                <update on="$@" to="displace" with="$footer_cn" />
            </match>
            <match for="AS 'zh_TW'" to="displace" with="$footer_tw" exclusively>
                <update on="$@" to="displace" with="$footer_tw" />
            </match>
            <match for="LIKE '*'" to="displace" with="$footer_def">
                <update on="$@" to="displace" with="$footer_def" />
            </match>

            <except type=`NoData` raw>
                <p>You forget to define the $global variable!</p>
            </except>
            <except type=`NoSuchKey`>
                <p>Bad global data!</p>
            </except>
        </test>
    </footer>
```

上面的示例在 `$global.locale` 数据项（由 `on` 属性指定）上执行测试，操作被限定在 `#the-footer`（由 `in` 属性指定）所在的目标文档位置。在 `test` 标签定义的元素内，使用 `match` 标签定义了若干子元素，分别用来定义匹配条件 `AS 'zh_CN'`、 `AS 'zh_TW'` 以及 `LIKE '*'` 情况下的动作。

解释器在选择了某个匹配的 `match` 子元素后，若该 `match` 子元素定义了 `exclusively` 副词属性，则将不再检查其他 `match` 子元素定义的分支。另外，除 `catch` 子元素之外，`test` 元素中的其他非 `match` 子元素（包括外部元素）将被忽略。

就上述示例代码而言，假定 `$global` 所指代的数据之 `locale` 定义为 `zh_CN`，则最终生成的 HTML 片段如下：

```hvml
<footer id="the-footer">
    <p><a href="http://www.baidu.com" title="百度">Baidu</a></p>
</footer>
```

需要注意的是，`test` 动作始终确定一个动作结果，将成为子元素的上下文变量 `$?` 之值，该值一般是一个字符串或数值。使用 `by` 属性时，可通过该属性指定的内置执行器或者外部执行器从 `on` 指定的数据中获得一个可供匹配的数据，此种情况下，执行器的工作方式和 `choose` 元素相同。

对于匹配条件，我们可以在 `match` 元素中使用 `on` 介词属性来定义一个表达式，通过对该表达式求值的结果做布尔化处理来判断是否匹配，也可以使用 `for` 介词属性定义基于 `test` 元素执行结果的匹配条件，两者选一，但 `for` 属性具有更高优先级。

使用 `on` 介词属性时，我们可以使用一个求值表达式来确定匹配条件；当求值结果做布尔化处理后，若结果为 `true`，则视作匹配，反之视作不匹配。比如就上述 HVML 代码中的匹配 `zh_CN` 的 `match` 元素，可以如下书写：

```hvml
        <match on="$L.streq('case', 'zh_CN', $?)" exclusively>
            <update on="$@" to="displace" with="$footer_cn" />
        </match>
```

使用 `for` 介词属性时，可以使用简单的逻辑表达式来定义匹配条件。其规则描述如下：

```
    "ANY" | <number_comparing_logical_expression>  | <string_matching_logical_expression>

    number_comparing_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, and <number_comparing_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    number_comparing_condition: < "LE" | "LT" | "GT" | "GE" | "NE" | "EQ" > <ws> <number_expression>
    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions composed of literal real numbers, such as `(3.14 * 6 * 6) / 5`

    string_matching_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, <string_matching_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    string_matching_condition: "LIKE"<ws><string_pattern_list> | "AS"<ws><string_literal_list>
    string_pattern_list: <string_pattern_expression>[ [ws] ',' [ws] <string_pattern_expression>[ [ws] ',' [ws] ...]]
    string_literal_list: <string_literal_expression>[ [ws] ',' [ws] <string_literal_expression>[ [ws] ',' [ws] ...]]

    string_literal_expression: <quoted_literal_char_sequence>[<matching_flags>][<max_matching_length>]
    string_pattern_expression: <quoted_wildcard_expression>[<matching_flags>][<max_matching_length>] | <quoted_regular_expression>[<regexp_flags>]

    regexp_flags: 'g' || 'i' || 'm' || 's' || 'u' || 'y'
    matching_flags: 'i' || 's' || 'c'
    max_matching_length: <literal_positive_integer>
```

比如，我们可以如下书写一个匹配规则：

```hvml
    <match for="GT 10 AND LT 100">
        ...
    </match>
```

需要说明的是，`match` 标签的 `for` 属性指定的匹配规则不是 `ANY` 时：

1. 若 `match` 元素的 `for` 属性指定的匹配规则是数值比较表达式（如 `GT`、`LT`），则对 `test` 元素的结果数据做数值化处理后再行匹配。
1. 若 `match` 元素的 `for` 属性指定的匹配规则是字符串匹配表达式（如 `AS`、`LIKE`），则对 `test` 元素的结果数据做字符串化处理后再行匹配。

##### 2.5.5.2) 二选一处理

作为一种简化处理方案，我们可以使用 `test` 元素的 `with` 属性的值来确定如何处理 `test` 元素定义的操作子树：

```hvml
    <test with="$STR.stars_with($CRTN.app, 'cn.fmsoft.hvml')">
        ...

        <!-- when the value of `with` attribute of `test` element is false -->
        <differ>
            ...
        </differ>
    </test>
```

以上的代码，当 `with` 属性的值为 `true` 时，继续执行该元素的操作子树，但忽略 `differ` 子元素定义的操作子树；如果属性值求值后的结果为 `false`，则仅处理 `differ` 子元素定义的操作子树。这种场景下，`differ` 元素是可选的。`differ` 元素不使用除 `in` 之外的任何介词属性和副词属性。和 `inherit` 类似，该元素会默认继承前置操作的上下文变量，若定义有数据内容，则使用数据内容覆盖对应栈帧的 `$^` 上下文变量。

当同时指定 `with` 和 `on` 属性时，优先按 `on` 属性处理。也就是说，要采用这一简化方案，就不能指定 `on` 属性。

#### 2.5.6) `choose` 标签

`choose` 标签定义一个执行选择操作的动作元素，该元素在 `on` 属性指定的数据上产生一个可供后续动作元素处理的数据项。

`choose` 元素可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果数据。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值。

比如要实现根据当前 `locale` 动态生成搜索链接的功能，我们也可以使用嵌套在 `choose` 元素中的 `update` 元素完成相关功能，如：

```hvml
  <head>
      ...
  </head>

  <body>
    <init as="global">
        { "locale" : "zh_CN" }
    </init>

    <init as="locales">
      {
          "zh_CN" : {"se_name" : "Baidu", "se_url": "https://www.baidu.com", "se_title": "百度" },
          "zh_TW" : {"se_name" : "Bing", "se_url": "https://www.bing.com", "se_title": "必应" }
      }
    </init>

    <footer id="the-footer">
        <p><a href="" title=""></a></p>
    </footer>

    <choose on="$locales" in="#the-footer" by="KEY: AS '$global.locale'">
        <update on="p > a" at "textContent attr.href attr.title" with ["$?.se_name", "$?.se_url", "$?.se_title"] />
        <catch for `NoData`>
            <update on="p" at="textContent" with='You forget to define the $locales/$global variables!' />
        </catch>
        <catch for `NoSuchKey`>
            <update on="p > a" at="textContent attr.href attr.title" with ["Google", "https://www.google.com", "Google"] />
        </catch>
        <catch for `ANY`>
            <update on="p" at="textContent" with='Bad $locales/$global data!' />
        </catch>
    </choose>
  </body>
```

在上面的例子中，我们在 `choose` 元素的 `by` 介词属性中指定了一个内置的 KEY 执行器，该执行器将 `$global.locale` 的值作为键名，返回了 `on` 介词属性指定的 `$locales` 字典数组上对应的键值，使用该键值通过其后的 `update` 子元素实现了 `in` 介词属性指定的目标文档片段中的元素更新操作。

在复杂情形下，我们也可以在 `by` 属性中指定外部执行器来完成选择动作。详情可见本文 [2.6.2) 外部执行器](#262-外部执行器)。

#### 2.5.7) `iterate` 标签

##### 2.5.7.1) 使用迭代执行器

`iterate` 标签用于定义一个执行迭代操作的动作元素，该元素在指定的可迭代数据上执行迭代操作。比如我们可以迭代处理一个数组，将迭代得到的每个数据项使用 `update` 子元素将指定的文档片段模板使用迭代得到的数据项置换后插入到目标文档。如下面的 HVML 代码片段：

```hvml
    <head>
    </head>

    <body>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <archetype name="user_item">
            <li class="user-item">
                <img class="avatar" src="" />
                <span></span>
            </li>
        </archetype>

        <ul id="the-user-list" class="user-list">
            <iterate on="$users" in="#the-user-list" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <except type=`BadData`>
                    <img src="wait.gif" />
                </except>
                <except type=`NotIterable`>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>
    </body>
```

上述 HVML 代码在 `head` 元素中定义了 `users` 数据，是一个由字典结构组成的数组。在 `body` 元素中，该程序迭代 `$users` 数组，并克隆 `$user_item` 这一模板定义的文档片段并追加（`append`）到 `#the-user-list` 所在的位置。在迭代过程中，该标签使用外部程序定义的 `IUser` 类来获取每次迭代得到的数据项。

使用外部执行器定义的类，可用于实现较为复杂的迭代逻辑和操作。但在一些简单的场合，我们也可以使用内置执行器完成迭代操作：

```
    <iterate on="$users" in="#the-user-list" by="RANGE: FROM 0 ADVANCE 2">
        <update on="> [id=user-$?.id] span" at="attr.class" with ~= "text-* text-info" />
    </iterate>
```

上述 HVML 代码，在 `$users` 数据上执行迭代，但未使用外部执行器，而使用了 `RANGE` 关键词来定义迭代范围。`RANGE: FROM 0 ADVANCE 2` 表示取 `$users` 数组中索引下标为偶数的所有数组项，之后，针对这些数据项执行 `update` 标签定义的更新操作。在 `update` 标签中，首先使用 `on` 介词属性定义了目标元素：`[id=user-$?.id] span`。该表达式使用了 CSS 选择器在 `#the-user-list` 定义的 eDOM 子树中查找子元素，其中 `$?.id` 表示的是当前迭代得到的用户标识符。若存在这个子元素，则将其 `class` 属性设置为 `text-info`。这样，所有索引值为偶数的用户条目将使用由 `text-info` 类定义的样式来展现。

##### 2.5.7.2) 不使用迭代执行器

我们也可以使用 `with` 属性直接定义迭代结果的求值表达式，而不使用 `by` 属性定义的迭代执行器。此时，我们可使用 `onlyif` 属性和/或 `while` 属性定义在获得迭代结果之前判断是否开始新的迭代的条件表达式，或者在获得迭代结果后判断是否终止迭代的条件表达式。

在不使用迭代执行器时，`iterate` 元素的属性或者上下文变量，应该按照如下步骤处理。

当定义有 `on` 属性时，我们将 `on` 属性的值视作每次迭代的输入值，后用 `with` 属性求下一个值：

1. 第一次迭代前：
   - 使用 0 初始化 `$0%` 。
   - 使用 `on` 属性值初始化 `$0<`。
   - 使用 `in` 属性值或者继承 `$@` 初始化 `$0@`。
1. 每次迭代前：
   - 对 `onlyif` 属性定义的表达式求值，若对结果做布尔化处理后为 `false`，则终止迭代，否则继续迭代。若未定义 `onlyif`，视其值为 `true`。
1. 每次迭代中：
   - 将 `$0<` 设置到 `$0?` 上；对内容表达式求值（结果设置到 `$0^`）；处理子元素。
1. 每次迭代后：
   - 对 `with` 属性定义的表达式求值，若求值结果为 `false`、`null` 或者 `undefined` 之一（此处不做布尔化处理），则终止迭代，否则，若具有副词属性 `nosetotail`，则使用 `with` 属性的求值结果重置 `$0<`。若未定义 `with`，视其值为 `undefined`。
   - 若定义有 `while` 属性，则对 `while` 属性定义的表达式求值，若对结果做布尔化处理后为 `false`，则终止迭代。若未定义 `while` 属性，视其值为 `true`。
   - 若以上步骤未导致迭代终止，则 `$0%` 增加 1，开始新的迭代。

如下示例生成小于 100 的偶数数列：

```hvml
    <init as "evenNumbers" with [] >
        <iterate on 0 onlyif $L.lt($0<, 100L) with $DATA.arith('+', $0<, 2) nosetotail>
            <update on="$evenNumbers" to="append" with="$?" />
        </iterate>
    </init>
```

当未定义 `on` 属性时，我们将 `with` 属性作为输入及迭代结果：

1. 第一次迭代前：
   - 使用 0 初始化 `$0%` 。
   - 使用 `in` 属性值或者继承 `$@` 初始化 `$0@`。
1. 每次迭代前：
   - 对 `onlyif` 属性定义的表达式求值，若对结果做布尔化处理后为 `false`，则终止迭代，否则继续迭代。若未定义 `onlyif`，视其值为 `true`。
1. 每次迭代中：
   - 对 `with` 属性定义的表达式求值，若求值结果为 `false`、`null` 或者 `undefined` 之一（此处不做布尔化处理），则终止迭代，否则，则使用 `with` 属性的求值结果重置 `$0<`。若未定义 `with`，视其值为 `undefined`。
   - 将 `$0<` 设置到 `$0?` 上；对内容表达式求值（结果设置到 `$0^`）；处理子元素。
1. 每次迭代后：
   - 若定义有 `while` 属性，则对 `while` 属性定义的表达式求值，若对结果做布尔化处理后为 `false`，则终止迭代。若未定义 `while` 属性，视其值为 `true`。
   - 若以上步骤未导致迭代终止，则 `$0%` 增加 1，开始新的迭代。

如下示例读取特定目录下的全部目录项：

```hvml
    <choose on $FS.opendir($REQ.dir) >
        <except raw>
            <li>Exception when calling '$FS.opendir($REQ.dir)'</li>
        </except>

        <!-- no directory entry if $?.read() returns false -->
        <iterate with $?.read() >
            <li>$?.type: $?.name</li>
        </iterate>
    </choose>
```

#### 2.5.8) `reduce` 标签

`reduce` 标签定义一个执行归约（Reduce）操作的元素。和 `choose` 元素类似，`reduce` 元素支持 `on` 属性和 `by` 属性，其结果数据为规约操作的结果。

我们可以在 `reduce` 标签中使用 `by` 属性指定一个内建执行器，则将在内建执行器生成的数据基础上执行隐含的规约操作。比如，如下的代码：

```hvml
    <init as="regionStats">
        { "zh_CN" : 100, "zh_TW" : 90，"zh_HK": 90, "zh_SG": 90, "zh_MO": 80, "en_US": 70, "en_UK": 80 }
    </init>

    <reduce on=$regionStats by="KEY: ALL">
        ...
    </reduce>
```

将在如下数组基础上执行隐含的规约计算：

```json
[ 100, 90, 90, 90, 80, 70, 80 ]
```

规约结果为：

```json
{
    "count": 7,
    "sum": 600,
    "avg": 85.71,
    "max": 100,
    "min": 70,
}
```

有关隐含的规约操作，详情可见本规范 [2.6.1.8) 内建执行器的使用](#2618-内建执行器的使用)。

当隐含规约操作无法满足我们的要求时，我们可通过外部执行器实现需要的规约操作。比如，上面的例子中我们使用外部的函数执行器（`StatsUserRegion`）统计来自不同区域用户的人数，最终形成一个类似下面这样的数据：

```json
    {
        "count": 19,
        "regions": { "中国大陆": 10, "中国台湾": 7, "其他": 2 }
    }
```

通常 `reduce` 元素会形成另外一个可迭代数据，然后我们可以嵌套 `iterate` 等元素执行后续动作。比如下面的 HVML 代码片段：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span></span> users):</h2>
        <dl>
        </dl>
    </div>

    <archetype name="region_to_users">
        <div>
            <dt>$?.k</dt>
            <dd>$?.v</dd>
        </div>
    </archetype>

    <reduce on="$users" in="#the-user-statistics" by="FUNC: StatsUserRegion">
        <update on="> h2 > span" at="textContent" with="$?.count" />
        <clear on="> dl" />
        <choose on="$?.regions" by="KEY: ALL FOR KV">
            <sort on="$?" against="v" descendingly>
                <iterate on="$?" in="> dl" by="RANGE: ALL">
                    <update on="$@" to="append" with="$region_to_users" />
                </iterate>
            </sort>
        </choose>
    </reduce>
```

上述代码使用外部函数执行器 `StatsUserRegion` 在 `$users` 上执行归约操作，之后形成一个如上面 JSON 格式描述的统计结果，其中包括整个用户的个数，以及所有区域的用户个数。然后使用了 `update` 标签、 `clear` 标签以及 `iterate` 标签执行了三个后续动作：

- `update` 标签：用于更新 `#the-user-statistics > h2 > span` 元素的内容为用户总数。
- `clear` 标签：用于清除 `#the-user-statistics > dl` 元素的所有子元素。
- `choose` 标签：用于将 `$?.regions` 对象转换为键值对象数组。
- `sort` 标签：用于将 `choose` 动作的结果（键值对象数组）按照 `v`（区域人数）执行降序排序操作。
- `iterate` 标签：用于在 `#the-user-statistics > dl` 元素中追加用户按区域统计的信息。

假设执行归约操作后的结果同前述 JSON 格式给出的数据，则执行上述操作后获得的文档片段为：

```hvml
    <div id="the-user-statistics">
        <h2>User regions (totally <span>19</span> users):</h2>
        <dl>
            <dt>中国大陆</dt>
            <dd>10</dd>
            <dt>中国台湾</dt>
            <dd>7</dd>
            <dt>其他</dt>
            <dd>2</dd>
        </dl>
    </div>
```

#### 2.5.9) `sort` 标签

`sort` 标签定义一个执行排序操作的动作元素，该元素对指定的数组执行排序操作。该元素支持如下属性：

- `on` 属性指定要排序的数据。
- `by` 属性指定一个可将 `on` 数据转换成数组的内建执行器，或者一个可对 `on` 数据直接进行排序的外部函数执行器。若未指定，则执行默认排序；此时，将 `on` 属性指定的数据必须为数组或者集合。
- `with` 属性指定使用外部执行器时的额外参数。
- `against` 属性指定排序的依据；当要排序的数组由对象组成时，该属性指定参与排序的单个或者多个键名。
- 使用 `ascendingly`（默认） 和 `descendingly` 副词属性指定使用升序还是降序排列。
- 使用 `casesensitively`（默认） 和 `caseinsensitively` 副词属性指定按照字符串排序时是否对大小写敏感。

如下代码对 `$users` 执行排序：

```hvml
    <init as="users">
        [
            { "id": 3, "avatar": "/img/avatars/3.png", "name": "David", "region": "en_US" }
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <sort on="$users" ascendingly against="id" />
```

结果为：

```json
    [
        { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
        { "id": 2, "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        { "id": 3, "avatar": "/img/avatars/3.png", "name": "David", "region": "en_US" }
    ]
```

`sort` 动作元素支持按照字符串或数值两种类型执行排序，这取决于从数组中获得的第一个排序数据的类型。若第一个参与排序的数据类型是 `number`、 `longint`、 `ulongint` 或者 `longdouble` 时，使用数值排序，否则使用字符串排序。当使用数值时，所有数据数值化之后进行排序，而使用字符串时，所有数据字符串化之后进行排序。

当使用 `against` 指定了键名，但数组成员并不是对象，或者不存在指定的键名时，则按对应的键值为 `undefined` 处理。

我们可以用 `by` 属性指定一个执行排序的外部函数执行器。如：

```hvml
    <sort on="$?.regions" by="FUNC: mySort">
        ...
    </sort>
```

我们还可以使用内建执行器，首先在 `on` 属性指定的数据生成一个对象，然后再对结果数据执行默认排序。比如如下代码：

```hvml
    <init as="regions">
        { "中国大陆": 10, "其他": 2, "中国台湾": 7, }
    </init>

    <sort on="$regions" by="KEY: ALL FOR KV" against="v" descendingly>
        <iterate on="$?" in="> dl" by="RANGE: ALL">
            <update on="$@" to="append" with="$region_to_users" />
        </iterate>
    </sort>
```

首先用 by 指定的内建执行器完成了对象到键值对象数组的转换，转换结果为：

```json
    [
        { "k": "中国大陆", "v": 10 },
        { "k": "其他",     "v": 2  },
        { "k": "中国台湾", "v": 7  }
    ]
```

之后对以上数组针对 `v` 键值进行降序排序，其结果为：

```json
    [
        { "k": "中国大陆", "v": 10 },
        { "k": "中国台湾", "v": 7  },
        { "k": "其他",     "v": 2  }
    ]
```

本质上，以上 HVML 代码和下面使用 `choose` 然后使用 `sort` 的结果一致：

```hvml
    <choose on="$regions" by="KEY: ALL FOR KV">
        <sort on="$?" against="v" descendingly>
            <iterate on="$?" in="> dl" by="RANGE: ALL">
                <update on="$@" to="append" with="$region_to_users" />
            </iterate>
        </sort>
    </choose>
```

当我们不使用外置执行器时，`on` 属性或者 `by` 属性指定的内建执行器，必须给出一个数组供排序使用；而当使用外置执行器时，`on` 属性指定的数据类型由外部执行器确定。比如，我们可以对一个字符串执行排序操作，执行的结果可能是，将字符串中所有的单词按照字典顺序排列。

#### 2.5.10) `define` 和 `include` 标签

`define` 标签用于定义一组可重用的操作组。我们可以通过 `define` 定义一组操作，然后在代码的其他位置通过 `include` 标签包含这组操作，或者通过 `call` 标签调用这组操作并期待返回一个结果。在 HVML 中，我们将 `define` 标签定义的一组操作简称为操作组（operation group）。

`define` 元素通过 `as` 属性定义操作组的名称，其中包含了一组动作标签定义的子元素。`include` 元素将切换执行上下文到 `with` 属性指定的操作组中，`on` 属性传入的参数将作为结果数据（即 `$?` 变量的值）供操作组使用，而 `include` 元素通过内容定义的数据，将成为 `$^` 变量的值。如：

```hvml
        <archetype name="dir_entry">
            <item class="$?.type">$?.name</item>
        </archetype>

        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <include with="$fillDirEntries" on="/home" in="#entries" />
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <include with="$fillDirEntries" on="/" in="#entries" />
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <include with="$fillDirEntries" on="/home" in="#entries" />
        </observe>
```

上面的 HVML 代码，在初始化 `listbox` 时，以及用户点击了 `#goRoot` 或者 `#goHome` 按钮时，使用了 `$fillDirEntries` 定义的操作组。注意，在使用 `include` 标签的三处地方，通过 `on` 属性传入了不同的参数，并使用 `in` 属性指定了目标文档位置。

本质上，`include` 元素完成的工作相当于复制指定的操作组到当前的位置执行，我们称之为就地执行（execute in place）。比如以上代码，若不使用 `define` 和 `include`，则相当于：

```hvml
        <archetype name="dir_entry">
            <item class="$?.type">$?.name</item>
        </archetype>

        <listbox id="entries">
            <choose on="/home" in="#entries">
                <choose on="$?" by="CLASS: CDirEntries">
                    <iterate on="$?" by="RANGE: FROM 0">
                        <update on="$@" to="append" with="$dir_entry" />
                    </iterate>
                </choose>
            </choose>
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <choose on="/" in="#entries">
                <choose on="$?" by="CLASS: CDirEntries">
                    <iterate on="$?" by="RANGE: FROM 0">
                        <update on="$@" to="append" with="$dir_entry" />
                    </iterate>
                </choose>
            </choose>
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <choose on="/home" in="#entries">
                <choose on="$?" by="CLASS: CDirEntries">
                    <iterate on="$?" by="RANGE: FROM 0">
                        <update on="$@" to="append" with="$dir_entry" />
                    </iterate>
                </choose>
            </choose>
        </observe>
```

`include` 就地执行操作组的效果类似于其他编程语言的闭包（closure）。比如以上的 `fillDirEntries` 操作组中使用了 `dir_entry` 这个模板，而该模板只定义了一次。但如果稍作修改，就可以在包含操作组之前，通过定义一个新的名为 `dir_entry` 的模板，即可覆盖默认的 `dir_entry` 模板。请注意其中的注释：

```hvml
        <archetype name="dir_entry">
            <item class="$?.type">Name: $?.name</item>
        </archetype>

        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <!-- 定义一个新的 `dir_entry` 模板，该模板在文件名之前显示 `/home/`（路径）前缀 -->
            <archetype name="dir_entry">
                <item class="$?.type">/home/$?.name</item>
            </archetype>

            <!-- `fillDirEntries` 操作组将使用上面这个新的 `dir_entry` 模板 -->
            <include with="$fillDirEntries" on="/home" in="#entries" />
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <include with="$fillDirEntries" on="/" in="#entries" />
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <include with="$fillDirEntries" on="/home" in="#entries" />
        </observe>
```

`define` 元素可使用 `from` 属性从指定的 URL 中装载 HVML 片段。借助此功能，我们可以将具有不同功能的操作组作为公共模块供不同的 HTML 程序使用。另外，当同时使用 `define` 元素的内容和 `from` 属性指定的 HVML 片段定义一个操作组时，该操作组将首先使用内容定义，当正确装载由 `from` 属性定义的 HVML 片段后，使用装载后的 HVML 片段绑定到操作组名称上。

比如，我们在 `/module/html/listitems.hvml` 中定义了一个展示数组成员的操作组：

```hvml
    <ol>
        <iterate on="$?" by="RANGE: FROM 0">
            <li>$?</li>
        </iterate>
    </ol>
```

而默认的操作组向标准输出流写入数组成员：

```hvml
    <define as="listitems" from="/module/$CRTN.target/listitems.hvml">
        <inherit>
            $STREAM.stdout.writelines($?)
        </inherit>
    </define>

    <include with="$listitems" on=['Line #1', 'Line #2'] />
```

以上代码，当 `define` 元素的 `from` 属性指定的 HVML 片段装载或解析失败时，程序仍然可以正常运行，只是实际的操作效果有所不同。这一能力为我们提供了一项非常灵活的特性：

1. HVML 程序的正常运行，可不依赖于特定的目标文档类型。
1. 我们可以根据不同的目标文档类型让同一 HVML 程序生成不同的目标文档片段。

当使用 `from` 属性时，`define` 的行为如下：

1. 尝试同步装载 `from` 指定的 HVML 片段，若不成功，则停止装载，抛出异常，保留内容定义的操作组。若成功，则，
1. 尝试解析已装载的 HVML 片段，若不成功，则停止装载，抛出异常，保留内容定义的操作组。若成功，则，
1. 若解析后的 vDOM 片段树不包含任何有效子元素，则停止装载，抛出异常，保留内容定义的操作组。若成功，则，
1. 对应的变量（由 `as` 属性值指定）指向解析后的 vDOM 片段树。

和 `init` 标签类似，使用 `define` 标签从外部资源装载 HVML 片段时，可使用 `with` 和 `via` 等属性指定查询参数和请求方法。

本质上，我们可以将操作组视为一种特殊的数据，使用 `define` 定义一个命名操作组和使用 `init` 初始化一个变量并无本质区别。因此，我们也可以使用 `at` 属性指定操作组名称的作用域，也可以使用 `async` 副词属性异步装载和解析操作组，并使用 `observe` 元素观察变量的状态。

下面的代码通过 `iterate` 动作元素装载多个 HVML 片段：

```hvml
<hvml target="html" lang="en">
    <head>
        <base href="$CRTN.base(! 'file:///' )" />

        <iterate on=$FS.list_prt('/module/$CRTN.target/','*.hvml','name') by="RANGE: 0">
            <define as="ops$FS.basename($?,'hvml')" from="/module/$CRTN.target/$?">
                <choose on=true />
            </define>
        </iterate>
    </head>

    <body>

        ...

    </body>

</hvml>
```

以上代码，若在 `/module/html/` 目录下存在两个 HVML 片段文件：`A.hvml` 和 `B.hvml`，则会创建两个操作组：`opsA` 和 `opsB`，分别指向两个独立的 vDOM 片段树。当我们在 HVML 程序中使用 `include`、`call` 或者 `observe` 引用 `opsA` 和 `opsB` 时，将执行对应的 vDOM 片段树，而非原始的默认值操作组。

和 `init` 类似，在 `head` 元素定义的 `define`，将创建全局可见的操作组，也就是说，上述代码中定义的 `opsA` 和 `opsB` 的操作组是全局可见的。在 `body` 中使用 `define`，默认将在其父元素上绑定操作组名称，从而让该操作组在父元素为根的 vDOM 子树中可见。但我们可使用 `at` 属性指定操作组的名字空间（name space）：

- 使用下划线（\_）打头的预定义名称 `_parent`、`_grandparent`、 `_root`，将分别在父元素、祖父元素、根元素上定义操作组的名称。
- 使用井号（#）打头的元素标识符，如 `#myAnchor`，将在其祖先元素中搜索指定的元素标识符（由 `id` 属性指定），将在第一个匹配的祖先元素上定义操作组的名称。
- 使用正整数 N（如 `2`、`3`）时，将沿 vDOM 树向祖先元素方向回溯 N 个祖先元素，在该祖先元素上定义操作组名称。
- 静默求值情况下，若未找到匹配的祖先元素，则按未定义 `at` 属性做默认处理；否则应该抛出 `EntityNotFound` 异常。

按照以上规则，上述定义多个操作组的方法，亦可按以下方式编码：

```hvml
<hvml target="html" lang="en">
    <head>
        <base href="$CRTN.base(! 'file:///' )" />
    </head>

    <body>

        <iterate on=$FS.list_prt('/module/$CRTN.target/','*.hvml','name') by="RANGE: 0">
            <define as="ops$FS.basename($?,'hvml')" at="_grandparent" from="/module/$CRTN.target/$?" >
                <choose on=true />
            </define>
        </iterate>

        ...

    </body>

</hvml>
```

若 `define` 定义的操作组为空，则使用 `include` 或者 `call` 元素引用该操作组时，应抛出 `NoData` 异常。

`include` 元素的 `on` 属性定义的值，将成为 `define` 对应栈帧的结果数据；类似地，`call` 元素的 `with` 属性定义的值，将成为 `define` 对应栈帧的果数据。为书写方便，当传递给操作组的数据是 `object` 时，解释器应将该对象中所有键名符合 HVML `literal_variable_token` 词法单元的属性，设置为 `define` 对应栈帧中的临时命名变量，从而获得类似函数形参的效果。比如如下代码计算两个正整数的最大公约数（greatest common divisor）：

```hvml
    <define as "calcGreatestCommonDivisor">
        <test with $L.or($L.le($x, 0), $L.le($y, 0)) >
            <return with undefined />
        </test>

        <init as "big" with {{ $L.gt($x, $y) && $x || $y }} temp />
        <init as "small" with {{ $L.lt($x, $y) && $x || $y }} temp />

        <test with $L.eq($DATA.arith('%', $big, $small), 0) >
            <return with $small />
        </test>

        <iterate on $DATA.arith('/', $small, 2) onlyif $L.gt($0<, 0)
                with $DATA.arith('-', $0<, 1) nosetotail >

            <test with $L.eval('a == 0 && b == 0',
                    { a: $DATA.arith('%', $big, $?),
                      b: $DATA.arith('%', $small, $?) } >
                <return with $? />
            </test>

        </iterate>

        <return with 1L />

    </define>

    <include with $calcGreatestCommonDivisor on {x: 3, y: 6} >

        $STREAM.stdout.writelines($STR.format_c("GCD of 3 and 6 is %d", $?))

    </include>
```

另外，我们可以在 `include` 元素或者 `call` 元素中使用 `in` 属性定义目标文档的位置，因此，该属性值将影响操作组的行为。

我们可以在 `include` 元素中定义子元素，这些子元素会在 `define` 定义的操作组执行完毕后执行。

#### 2.5.11) `observe`、 `forget` 和 `fire` 标签

`observe` 标签用于定义一个执行观察操作的动作元素，该元素将观察特定变量或数据上的状态变化，并在指定的事件到来时，若其 `with` 属性指定了有效的操作组，则执行该操作组，否则执行该标签定义的操作组。

我们使用 `observe` 的 `against` 属性指定一个要观察的静态命名变量之名称，使用 `on` 属性指定一项要观察的数据。`against` 属性的优先级高于 `on` 属性。注意，我们不能观察一个临时命名变量或上下文变量。

当我们观察一个静态命名变量时，我们可以观察这个命名变量对应的数据是否已经就绪，或者在获取数据的过程是否发生了错误，或者这个命名变量上的数据是否已经被销毁等等。

下面的代码从远程服务器上获得当前的用户信息，但使用异步请求：

```hvml
    <init as="users" from="http://foo.bar.com/get_all_users" async />

    <archetype name="user_item">
        <li class="user-item">
            <img class="avatar" src="" />
            <span></span>
        </li>
    </archetype>

    <ul class="user-list">
        <img src="wait.png" />
    </ul>

    <observe against="users" for="change:attached" in="#user-list">
        <clear on="$@" />
        <iterate on="$users" by="RANGE: FROM 0">
            <update on="$@" to="append" with="$user_item" />
        </iterate>
    </observe>
```

当我们观察到 `users` 变量上的 `change:attached` 事件之后，表明数据已经就绪，此时，即可执行 `observe` 定义的操作组：清空 `#user-list` 中的内容，然后迭代 `$users` 数组的成员，使用模板 `$user_item` 生成文档片段追加到 `#user-list` 当中。

我们可以跟踪处理静态命名变量上的如下事件：

- `change:progress`：表示为静态命名变量异步地获取数据时，进度有更新。
- `change:attached`：表示静态命名变量上的数据从初始的 `undefined` 变化为有效数据。
- `change:displaced`：表示先前关联到该变量上的数据被置换为新的数据，比如使用 `init` 重置该变量，或者先前发起的异步请求操作成功获得了有效数据。
- `change:detached`：表示先前关联到该变量上的有效数据被取消关联，其值被重置为 `undefined`，比如先前发起的异步请求操作失败，未能获得有效数据的情形。
- `except:<exceptionName>`：表示在获取该变量对应的数据时出现异常，可能是请求出错，也可能是解析出错。具体信息，由事件的子类型给出。

当 `observe` 观察的事件到来时，解释器应切换到 `observe` 自身定义的操作组或者其 `with` 属性引用的由 `define` 定义的操作组中执行 HVML 程序。此时，对应操作组的前置栈帧中，应定义如下的上下文变量：

- `$?`：事件的负载（payload）数据；若被观察的是变量，则就是被观察变量对应的数据。
- `$!`：在用户数据中，预定义两个临时变量，用于表示完整的事件名称和事件源，名称分别为 `_eventName` 和 `_eventSource`。
- `$@`：`observe` 的 `in` 属性定义的目标文档位置，或者 `observe` 继承自其的目标文档位置。

当我们在 `observe` 元素中使用 `with` 属性定义要引用的操作组时，HVML 程序的执行效果等同于 `include` 动作元素的效果，也就是说，应做就地执行而不是调用由 `with` 属性指定的操作组。

当我们观察一项数据时，我们可获得该数据产生的事件或者数据本身上的变化。比如，我们可监听来自长连接的事件，异步请求的返回值，或者获得长连接上调用远程过程后返回的结果，亦可用来监听某些内部数据产生的事件，比如 `$TIMERS` 数据产生的定时器到期事件，等等。

假设文档通过本地总线机制（本例中是 `HBDBus`）监听来自系统的状态改变事件，如电池电量、WiFi 信号强度、移动网络信号强度等信息，并在文档使用相应的图标来表示这些状态的改变。为此，我们可以编写如下的 HVML 程序：

```hvml
<hvml>
    <head>
        <init as="databus" with="$STREAM.open('unix:///var/run/hbdbus.sock','default','hbdbus')"/>
    </head>

    <body>
        <header id="the-header">
            <img class="mobile-status" src="/placeholder.png" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="/placeholder.png" />
            <span class="local-time">12:00</span>
            <img class="battery-status" src="/placeholder.png" />
        </header>

        <define as="onBatteryChanged">
            <test on="$?.level">
                <match for="GE 100" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-full.png" />
                </match>
                <match for="GT 90" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-90.png" />
                </match>
                <match for="GT 70" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-70.png" />
                </match>
                <match for="GT 50" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-50.png" />
                </match>
                <match for="GT 30" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-30.png" />
                </match>
                <match for="GT 10" exclusively>
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-10.png" />
                </match>
                <match for="ANY">
                    <update on="> img.mobile-status" at="attr.src" with="/battery-level-low.png" />
                </match>
            </test>
        </define>

        <choose on=$databus.subscribe('@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED')>
            <observe on="$databus" for="event:$?" in="#the-header" with=$onBatteryChanged />
        </choose>
    </body>
```

在上例中，我们使用 `define` 定义的 `onBatteryChanged` 操作组实现了目标文档的更新操作。

另外一个 `observe` 标签的使用例子描述如下。

在 `head` 元素中，我们通过 `init` 标签，使用 `$STREAM` 预定义变量连接到了 `unix:///var/run/hbdbus.sock`。`$STREAM` 的 `open` 方法返回一个流实体，并被命名为 `databus`（`as` 属性）。然后在 `body` 元素中，我们使用 `choose` 标签通过 `$databus.subscribe` 方法订阅（`subscribe`）指定的事件，然后用 `observe` 元素定义了对 `$databus` 上特定事件的观察。每当电池状态发生变化时，就会从这个数据源获得相应的数据包。为方便说明，我们假定数据包以 JSON 格式描述：

```json
    {
        "messageType": "event",
        "eventName": "XXXXXX",
        "source": <source data>,
        "time": 20200616100207.567,
        "signature": "XXXXX",
        "payload" : {
            "level": 80,
            "charging": false,
        },
    }
```

其中，`messageType` 字段表示数据包类型；`eventName` 字段表示事件名称；`source` 表示产生此事件的来源数据；`time` 表示此事件产生的系统时间；`signature` 是此事件的内容的签名，可用来验证数据来源的合法性；`payload` 中包含事件关联的数据。在上面这个例子中，事件包含两个信息，一个信息用来表示当前电量百分比，另一个信息表示是否在充电状态。

事件名称必须符合本规范定义的 `event_name` 词法单元要求，详情见 [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)。如下是一些合法事件名称的样例：

- `click`
- `change:attached`
- `event:3cc8f9e2ff74f872f09518ffd3db6f29`
- `corState:except/BadName`

当 HVML 代理观察到来自 `$databus` 上的电池变化事件数据包之后，将根据 `observe` 标签定义的观察动作执行相应的操作。在上面的例子中，`observe` 标签所定义的操作及条件解释如下：

- 当来自`$databus`（由 `on` 属性值指定）上的数据包类型为 `event:$?`（由 `for` 属性值指定），这里的 `$?` 是 `choose` 元素的执行结果，表示被订阅事件的唯一性标识字符串（相当于事件标识符），执行 `observe` 定义的操作组。
- `observe` 元素的 `with` 属性指定了执行更新操作的操作组（`$onBatteryChanged`），其中的更新操作限定在 `in` 介词属性定义的 `#the-header` 目标元素中。

注意，当 `observe` 观察到了来自特定数据源上的数据包时，其结果数据为该事件数据包中的 `payload` 数据。

类似地，我们要在状态栏上显示当前的 WiFi 名称或者移动网络的运营商名称时：

```hvml
    <choose on=$databus.subscribe('@localhost/cn.fmsoft.hybridos.settings/inetd/NETWORKCHANGED')>
        <observe on="$databus" for="event:$?" in="#the-header">
            <update on="span.mobile-operator" at="textContent" with="$?.name">
                <except>
                    <p>Failed to update mobile operator</p>
                </except>
            </update>
        </observe>
    </choose>
```

我们还可以使用 `observe` 标签观察文档某个节点上的变化或者用户交互事件。下面的例子展示了 `observe` 的多种用法：

- 通过监听 `MQTT` 数据包获得后台用户的新增或者删除时间，从而动态更改用户列表。
- 通过监听用户列表的父元素（容器元素）上的变化事件，动态更新用户统计信息。

```hvml
<hvml lang="en">
    <head>
        <init as="mqtt" with=$STREAM.open('tcp://foo.bar.com:1366','default','mqtt') />
    </head>

    <body>
        <choose on=$mqtt.subscribe('newUser') >
            <observe on="$mqtt" for="event:$?" in="#the-user-list" >
                <iterate on="$?" by="CLASS: IUser">
                    <update on="$@" to="append" with="$user_item" />
                </iterate>
            </observe>
        </choose>

        <choose on=$mqtt.subscribe('deleteUser') >
            <observe on="$mqtt" for="event:userDeleted" in="#the-user-list" >
                <iterate on="$?" by="RANGE: FROM 0">
                    <erase on="#user-$?.id" />
                </iterate>
            </observe>
        </choose>

        <div id="the-user-statistics">
            <h2>User regions (totally <span></span> users):</h2>
            <dl>
            </dl>
        </div>

        <archetype name="region_to_users">
            <div>
                <dt>$?.k</dt>
                <dd>$?.v</dd>
            </div>
        </archetype>

        <archedata name="item_user">
            {
                "id": "$?.attr[data-value]", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr[data-region]"
            }
        </archedata>

        <define as="onChangeContent">
            <init as="users" temporarily>
                [ ]
            </init>

            <iterate on="$@" by="TRAVEL: BREADTH">
                <update on="$users" to="append" with="$item_user" />
            </iterate>

            <reduce on="$users" in="#the-user-statistics" by="FUNC: StatsUserRegion">
                <choose on="$?" in="> h2 > span" by="KEY: AS 'count'">
                    <update on="$@" at="textContent" with="$?" />
                </choose>
                <clear on="#the-user-statistics > dl" />
                <choose on="$?.regions" by="KEY: ALL FOR KV">
                    <sort on="$?.regions" agianst="v" ascendingly>
                        <iterate on="$?" in="> dl" by="RANGE: FROM 0">
                            <update on="$@" to="append" with="$region_to_users" />
                        </iterate>
                    </sort>
                </choose>
            </reduce>
        </define>

        <observe on="#the-user-list" for="change:content" in="#the-user-list"
                with="$onChangeContent">
        </observe>

    </body>
</hvml>
```

在上面的例子中，我们使用 `define` 标签定义了一个操作组，然后在 `observe` 标签中使用 `with` 属性指定了这个操作组，当 `change:content` 事件到达时，将执行 `$onChangeContent` 操作组。我们还使用 `observe` 标签的 `in` 属性指定了执行 `$onChangeContent` 操作组时的目标文档位置。

当我们要解除在某个特定数据或者元素之上对某个事件的观察时，使用 `forget` 标签。也就是说，`forget` 是 `observe` 的反操作。

```hvml
    <forget on="#the-user-list" for="change:content" />
```

需要注意的是，我们可以在 HVML 程序多个不同位置使用 `observe` 观察同一事件，而 `forget` 将移除所有匹配的观察。

在 HVML 代码中，除了被动等待事件的发生之外，代码也可以直接使用 `fire` 标签主动地激发一个事件：

```hvml
    <init as="new_user">
        { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "zh_CN" }
    </init>

    <fire on="#user-list" for="newUser" with="$new_user" />

    ...

    <observe on="#user-list" for="newUser">
        ...
    </observe>
```

`fire` 元素将把 `with` 属性指定的数据作为事件数据包的 `payload` 进行处理，并根据 `on` 属性指定的元素或者数据确定事件的源，`for` 属性值作为事件名称打包事件数据包，并将事件加入到事件队列中。

对同一个事件，我们可以在 HVML 程序的多个地方进行观察并执行不同的动作。当我们需要撤销特定的观察时，可以在 `observe` 标签中使用 `as` 属性为这个观察命名，之后使用 `init` 将该变量重置为 `undefine` 即可移除这个观察：

```hvml
    <choose on="$TIMERS" by="FILTER: AS 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>

    ...

    <init as="updateTimes">
        0
    </init>

    <observe as="opsPerSecond" on="$TIMERS" for="expired:foo" in="#the-header" >
        <update on="$updateTimes" with+="1" />
        <test on="$updateTimes">
            <match for="GE 10">
                <!-- remove the observer -->
                <init as="opsPerSecond" with="undefined" />

                <!-- remove the variable -->
                <init as="updateTimes" with="undefined" />
            </match>

            <match for="ANY">
                <update on="> span.local-time" at="textContent" with="$SYS.time('%H:%m')" />
            </match>
        </test>
    </observe>
```

和 `init` 类似，在 `observe` 元素中使用 `as` 属性命名一个观察时，我们也可以使用 `at` 属性指定名称的绑定位置（也就是名字空间）。

我们可以使用 `observe` 和 `forget` 的 `for` 属性指定一个要观察的确切的事件名称，也可以使用通配符或者正则表达式来表示一组符合条件的事件：

- 当 `for` 属性值中包含有 `?` 或者 `*` 时，表示一个通配符匹配。
- 当 `for` 属性值以 `/` 打头时，表示一个正则表达式匹配。

比如：

```hvml
    <forget on="$TIMERS" for="expired:*" />
```

将移除对所有定时器的到期事件观察。

最后，`observe` 支持 `once` 副词属性，具有该副词属性的观察，将在执行一次后由解释器自动解除。

#### 2.5.12) `call` 和 `return` 标签

`include` 元素完成的工作相当于复制指定的操作组到当前的位置执行（就地执行，execute in place），所以和传统编程语言中的函数调用并不相同。如果要获得和函数调用相同的效果，使用 `call` 和 `return` 标签：

```hvml
        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
                <return with="$DATA.count($?)" />
            </choose>
        </define>

        <listbox id="entries">
            <call on="$fillDirEntries" in="#entries" with="/home" />
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <call on="$fillDirEntries" in="#entries" with="/" />
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <call on="$fillDirEntries" in="#entries" with="/home" />
        </observe>
```

在上述 HVML 代码中，`fillDirEntries` 使用 `return` 元素的 `with` 属性返回了目录项的个数，使之从一个操作组变成了一个带有返回值的函数。在使用这个函数时，使用 `call` 标签定义一个执行调用操作的动作元素，以便获得结果数据。

`call` 元素和 `include` 元素有如下不同：

- `call` 元素对应栈帧中的结果数据可被操作组中的 `return` 元素或者操作组中的 `back` 元素覆盖。若操作组中没有 `return` 或者 `back` 元素来修改结果数据，则 `call` 元素对应栈帧中的结果数据将保持为 `undefined` 不变。
- `include` 元素对应的栈帧中，初始的结果数据由其本身的 `on` 属性值或内容确定，可被操作组中的 `back` 元素覆盖，而操作组中的 `return` 元素仅用于回退到最近一个 `include` 所在栈帧，而不修改该 `include` 对应栈帧中的结果数据。

也就是说，`call` 和 `include` 的主要区别在于如何处理操作组中 `return` 元素定义的返回值：前者关心返回值，后者不关心返回值。在实践当中，`include` 一般用于操作目标文档，`call` 一般用作获取一个结果数据。

我们可以在 `call` 元素中使用 `within` 属性指定不同于当前行者的名称。此时，我们可在另一个行者中执行指定的操作组。由于每个 HVML 行者对应有自己的虚拟机实例，而不同的虚拟机实例通常运行在操作系统的不同线程或者不同进程当中，故而我们可通过这种方式实现基于线程或进程的并发处理。当我们在当前行者使用 `concurrently` 属性，则会在当前虚拟机实例中创建一个新的协程来执行指定的操作组。我们将上述两种调用行为称之为 `并发调用（call concurrently）`。此时，如果使用 `asynchronously` 副词属性，`call` 元素将在创建新的协程（以及可能的新虚拟机实例）之后立即返回，然后使用 `observe` 观察其结果，否则将等待并发调用的结果返回。如：

```hvml
    <define as="collectAllDirEntriesRecursively">
        <init as="allEntries" with=[] temporarily />

        <define as="collectAllDirEntries" >
            <choose on=$FS.opendir($?) >
                <catch for `ANY`>
                    <return with=false />
                </catch>

                <!-- no more directory entry if $?.read() returns false -->
                <iterate with=$?.read() >
                    <catch for `ANY`>
                        <return with=false />
                    </catch>

                    <update on="$allEntries" to="append" with="$3?/$1?.name" />

                    <test with=$L.streq($?.type,'dir')>
                        <call on="$collectAllDirEntries" with="$4?/$2?.name" />
                    </test>
                </iterate>

                <return with=$FS.closedir($?) />
            </choose>
        </define>

        <call on="$collectAllDirEntries" with="$?" />
        <return with="$allEntries" />
    </define>

    <listbox id="entries">
        <call as="my_task" on="$collectAllDirEntriesRecursively" with="/"
                within="myRunner" concurrently asynchronously />
        <observe on="$my_task" for="callState:success">
            <iterate on="$?" in="#entries" by="RANGE: FROM 0">
                <update on="$@" to="append" with="$dir_entry" />
            </iterate>
        </observe>
    </listbox>
```

在上面的 HVML 代码中，我们并发调用了 `collectAllDirEntriesRecursively` 操作组，该操作组递归获取当前路径下的所有文件系统目录项（这是一个典型的耗时操作）。HVML 解释器应在 `within` 属性指定的行者中创建一个新的协程来执行该操作组；如果指定的行者不存在，则创建一个新的行者，而新的行者意味着一个新的虚拟机实例。使用 `asynchronously` 副词属性时，`as` 属性用于指定跟踪该任务的变量名称（`my_task`），之后，代码使用 `observe` 元素来观察 `my_task` 变量的 `callState:success` 事件，并做后续的处理。

注意上述副词属性的使用：

- 当我们在 `within` 属性中指定了不同于当前行者的行者名称时，必定会执行并发调用；而如果未指定 `within` 属性或者在 `within` 属性中指定了 `_self` 时，如果不使用 `concurrently` 副词属性，则 `call` 元素的行为和普通的函数调用没有任何差别，且忽略 `asynchronously` 或 `synchronously` 副词属性。
- 使用 `concurrently` 时，`call` 元素将在指定的行者中创建新的协程执行指定的操作组，默认会同步等待执行的结果，相当于指定了 `synchronously` 副词属性；如果指定 `asynchronously` 副词属性，则会立即返回，此时，需要使用一个变量来观察并发调用相关的事件。

并发调用一个操作组时，解释器在指定的行者中创建一个新的协程来执行操作组定义的 vDOM 子树。解释器可参考如下步骤做相应的实现：

1. 若指定的行者名称就是当前行者，设定当前行者为目标行者，跳转到第 4 步。
2. 若指定的行者已存在，设定该行者为目标行者，跳转到第 4 步。
3. 若指定的行者不存在，则创建一个新行者及其对应的虚拟机实例，创建当前虚拟机实例中所有必要的行者级全局变量（如 `$SYS`、 `$RUNNER`、 `$DATA`、 `$STREAM`、 `$RDR` 等）。设定新行者为目标行者，跳转到第 4 步。
4. 克隆当前 vDOM 的 `DOCTYPE` 节点并构建一个空的 `hvml` 根节点，设置其 `target` 属性为 `void`，然后克隆操作组定义的 vDOM 子树并将其作为 `hvml` 根元素的子树，并构建一个 `call` 元素调用该操作组，构成一个完整的 vDOM 树。
5. 在目标行者对应的虚拟机实例上创建一个协程，构建所有必要的协程级全局变量，如 `$T`、 `$TIMERS`、 `$CRTN` 等，并关联到 vDOM 树上。
6. 调度执行新构建的 vDOM 树，将 `call` 元素的 `with` 属性定义的值以及 `call` 元素的内容数据通过请求数据传递，分别为：`$REQ._args` 和 `$REQ._content`。
7. 当该协程正常退出时，或者遇到错误或未捕获的异常时，将结果或异常信息通过 `callState` 事件返回给调用者。

按上述步骤，相当于动态构建一个下面的 HVML 程序，并在新行者或新协程中运行该程序：

```
<!DOCTYPE hvml SYSTEM "f: FILE:FS">
<hvml target="void">
    <!-- this is the cloned operation group -->
    <define as "theOpGroup">
        ...
    </define>

    <call on $theOpGroup with $REQ._args >
        $REQ._content

        <exit with $? />
    </call>
</hvml>
```

由于并发调用通常用来执行一些耗时的计算任务，故而我们将对应协程的目标文档类型设定为 `void`，从而可避免新创建的行者以及协程关联到渲染器上。但通过并发调用操作组，我们也可用来创建一个关联到渲染器的普通行者。比如：

```hvml
        <define as="newRunner">
            <test with="$RDR.connect('socket', 'unix:///var/tmp/purcmc.sock')" >

                <request on="$RDR" to="setPageGroups">
                    '...'
                </request>

                <load from="new_user.hvml" onto="user@main" asynchronously >
                    $2^
                </load>

                <return with="ok">

                <differ>
                    <return with="Failed to connect to the renderer.">
                </differ>
            </test>
        </define>

        <call as="my_task" on="$newRunner"
                within="newRunner" concurrently asynchronously>
            { ... }
        </call>

        <observe on="$my_task" for="callState:success">
            ...
        </observe>
```

以上的代码在并发执行的操作组中异步装载了一个 HVML 程序，这将在该虚拟机实例中创建一个新的协程。当前协程退出时，新创建的协程仍然在执行，故而对应的虚拟机实例也将继续运行。

如前所述，我们将并发执行的操作组的目标文档类型限制成了 `void`，从而无需将对应的协程关联到渲染器，但可以在操作组中使用 `load` 标签装载其他需要渲染器的 HVML 程序。针对这种情况，上述代码使用了 `request` 元素向渲染器发送请求，比如连接到渲染器，启动新的渲染器会话并做相应设置等。此时，我们可以使用 `call` 元素的内容数据将相关参数传递给渲染器。

异步地并发调用操作组时，`call` 元素的结果数据是代表新协程的原生实体，该原生实体应该至少提供一个 `id` 属性，用来返回新协程的标识符。

协程标识符的格式为 `[//hostname]/<appName>/<runnerName>/CRTN/<coroutineToken>`，必须符合本规范定义的 `coroutine_identifier` 词法单元要求，详情见 [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)。如下是一些合法的协程标识符样例：

- `//localhost/cn.fmsoft.hvml.sample/Runner0/CRTN/7`
- `/cn.fmsoft.hvml.sample/Runner0/CRTN/foo`
- `/cn.fmsoft.hvml.sample/myRunner/CRTN/3cc8f`

这里，我们使用协程令牌来标识一个协程。我们不使用协程名称这一术语，是因为通过 `load` 元素，我们可以创建单个 HVML 程序的多个协程实例。另外，我们可以一些预定义协程令牌（通常使用下划线打头）来指定一个协程， 比如：

- `_main`：表示主协程，即指定行者创建的第一个协程。
- `_first`：表示现有协程中的第一个协程。注意，当行者创建的第一个协程退出后，`_main` 将不可用，但 `_first` 是始终可用的。
- `_last`：表示现有协程中的最后一个协程。注意，当协程中只有一个协程时，`_first` 和 `_last` 指向同一个协程。

针对 `within` 的属性值，我们保留 `_self` 作为预定义行者名称，特指当前行者。

并发调用操作组对应的事件有：

- `callState:success`：操作组对应的协程成功返回数据。
- `callState:error/<errorName>`：操作组对应的协程出现错误。
- `callState:except/<exceptName>`：操作组对应的协程遇到未捕获的异常。

并发调用操作组时，由于我们将对应的 HVML 程序限制在了一个 vDOM 子树上，故而无法访问在原 HVML 程序中操作组所在闭包中的变量。这点和常规的调用存在较大的差别。比如如下的代码：

```hvml
    <body>
        <init as="allEntries" with=[] >
            <define as="collectAllDirEntriesRecursively" at="_grandparent">
                <clear on="$allEntries" />

                <define as="collectAllDirEntries" >
                    <choose on=$FS.opendir($?) >
                        <catch for `ANY`>
                            <return with=false />
                        </catch>

                        <!-- no more directory entry if $?.read() returns false -->
                        <iterate with=$?.read() >
                            <catch for `ANY`>
                                <return with=false />
                            </catch>

                            <update on="$allEntries" to="append" with="$3?/$1?.name" />

                            <test with=$L.streq($?.type,'dir')>
                                <call on="$collectAllDirEntries" with="$4?/$2?.name" />
                            </test>
                        </iterate>

                        <return with=$FS.closedir($?) />
                    </choose>
                </define>

                <call on="$collectAllDirEntries" with="$?" />
                <return with="$allEntries" />
            </define>
        </init>

        ...

    </body>
```

定义了一个操作组，该操作组使用了其所在闭包中的静态变量 `$allEntries`。因此，如果不使用并发调用，该操作组可正常工作：

```hvml
        <call on="$collectAllDirEntriesRecursively" with="/" />
```

但如果使用并发调用，则该操作组将因为找不到 `$allEntries` 变量而抛出异常：

```hvml
        <call on="$collectAllDirEntriesRecursively" with="/"
                within="newRunner" concurrently asynchronously />
```

因此，我们需要使用局部变量，并在最后返回局部变量：

```hvml
    <define as="collectAllDirEntriesRecursively">
        <init as="allEntries" with=[] temporarily />

        <define as="collectAllDirEntries" >
            ...
        </define>

        <call on="$collectAllDirEntries" with="$?" />
        <return with="$allEntries" />
    </define>

    ...

    <call as="my_task" on="$collectAllDirEntriesRecursively" with="/"
            within="newRunner" concurrently asynchronously />

```

上面的代码，也展示了递归调用操作组的功能。

#### 2.5.13) `bind` 标签

`bind` 标签定义一个执行绑定表达式操作的动作元素，该元素会创建一个表达式变量，故而可使用 `as` 属性和 `at` 属性指定该变量的名称以及变量作用域。通常，表达式变量对应的是一个可求值的表达式，该表达式可使用 `on` 属性指定，也可以使用 `bind` 元素的内容来定义。如：

```hvml
    <bind on="$users[0]" as="me" />
```

或，

```hvml
    <bind as="me">
        {
            "id": "$currUser.id",
            "avatar": "/img/avatars/{$currUser.id}.png",
            "name": "$currUser.name",
            "region": "$currUser.locale"
        }
    </bind>

    <bind as="greeting" >Hello, $user_name</bind>

    <bind as="greeting" >
        "Hello, $user_name"
    </bind>
```

当我们使用这个变量时，我们调用其上的 `eval` 方法获得该表达式对应的具体数据。因此，下面的 `init` 和 `bind` 元素的执行效果是不一样的：

```hvml
    <init as="sysClock">
        $SYS.time
    </init>

    ...

    <bind on="$SYS.time" as="rtClock" />

    <p>The initial system time: $sysClock</p>

    ...

    <p>The current system time: $rtClock.eval</p>
```

另外，若在该变量上执行 `observe` 动作，将在 HVML 程序运行进入消息循环时该变量对应的表达式将被重新求值，若前后发生变化，则将产生一个 `change` 消息，从而可以在 `observe` 动作元素定义的操作组中做相应的处理：

比如，

```hvml
    <bind on $SYS.time as 'rtClock' />

    <observe on $rtClock for "change">
       ...
    </observe>
```

上述代码中 `observe` 元素定义的操作组，将每一秒钟执行一次。

另外，我们可以将某个目标文档元素的属性或者内容绑定到某个变量上，然后使用 `observe` 元素处理其上的 `change` 事件：

```hvml
    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />

    <bind on $DOC.query('#the-user-name')[0].attr.value as 'user_name'>
        <observe on $user_name for 'change'>
            ...
        </observe>
    </bind>
```

我们还可以在被绑定变量的 `eval` 方法中使用参数，并在原始表达式中使用变量名 `$_ARGS` 来引用传入的参数，从而实现替身表达式（substitue expression）的功能。其中，`$_ARGS` 表示传入 `eval` 的所有参数之列表（使用元组或数组表达），而使用 `$_ARGS[<N>]` 可引用参数列表的第 `<N>` 个参数。

更进一步，我们还可以将一个表达式绑定到表达式变量不同于 `eval` 的方法上，此时我们使用 `against` 属性指定方法名称；若不使用 `against` 属性，则使用默认的 `eval` 方法名称。

比如在下面的代码片段中，我们将输出字符串到标准输出的表达式，绑定为一个表达式变量 `console`，并使用 `against` 属性指定了对应的方法名称 `puts`：

```hvml
    <bind on "$STREAM.stdout.writelines($_ARGS[0])" as "console" against 'puts' />
    <inherit>
        $console.puts('Hello, world!')
    </inherit>
```

当我们使用 `$console.puts('Hello, world!')` 这个替身表达式时，对应的最终表达式为 `$STREAM.stdout.writelines('Hello, world!')`。如此，我们可以为一些常用的表达式创建对应的简洁别名，从而方便我们的使用。

注意，当表达式在不同的上下文环境中执行时，由于所引用变量的作用域发生了变化，所得到的结果可能会出现不同。另外，当我们使用 `observe` 元素观察某个表达式变量的变化时，将无法传递参数。

在实现时，解释器可将被绑定的表达式使用一个原生实体来表示，并在其上提供 `eval` 属性或者通过 `against` 属性指定的替代属性名称之获取器。在调用该原生实体的 `eval` 获取器时，可在当前求值栈帧中创建临时变量 `_ARGS`，对应一个由所有传入的参数构建成的元组，之后对该原生实体对应的表达式执行正常的求值，求值结束后移除这些临时变量。

当我们在绑定一个表达式时使用 `constantly` 副词属性，则说明被绑定的表达式将对同一参数返回始终不变的值。这种情况下，解释器应额外实现一个带有 `_const` 后缀的方法，该方法对相同的参数只求值一次，其后使用相同的参数调用时将返回第一次求值的结果。在实际应用中，该方法可以用来定义一个特定表达式产生的常量。

若不指定方法名称，解释器应实现 `eval` 方法，对应的常量方法名称为 `eval_const`。

下面的代码绑定了一个可产生恒定结果的表达式：

```hvml
    <bind on $MATH.div(1.0, $MATH.sqrt($_ARGS[0])) as 'myConst' against 'reciprocal_of_sqrt' constantly />
```

之后，我们就可以使用 `$myConst.reciprocal_of_sqrt_const(2.0)` 这一替身表达式来获得 2.0 的平方根之倒数。当我们使用这个替身表达式时，只有第一次调用会执行真正的求值过程，其后对该表达式以及参数 2.0 的求值将直接返回第一次求值的结果，而无需执行重复的真实求值过程。

#### 2.5.14) `catch` 标签

`catch` 标签定义一个执行异常捕获操作的动作元素，该元素可作为任意动作元素的子元素，定义该执行该动作的过程中出现异常时要执行的操作。和 `except` 元素不同，`catch` 元素定义了出现异常时的程序分支。如：

```hvml
    <choose on="$locales" in="#the-footer" by="KEY: AS '$global.locale'">
        <update on="p > a" at="textContent attr.href attr.title" with ["$?.se_name", "$?.se_url", "$?.se_title"] />
        <catch for `NoData` raw>
            <update on="p" at="textContent" with='You forget to define the $locales/$global variables!' />
        </catch>
        <catch for `NoSuchKey`>
            <update on="p > a" at="textContent attr.href attr.title" with ["Google", "https://www.google.com", "Google"] />
        </catch>
        <catch>
            <update on="p" at="textContent" with='Bad $locales/$global data!' />
        </catch>
    </choose>
```

我们使用 `for` 介词属性来定义要捕获的异常具体名称，必须使用反引号属性值语法。

`for` 属性值的取值有如下规则：

- 若未定义 `for` 属性，或 `for` 的属性值为 `ANY`，则相当于匹配任意异常。
- 多个异常，可使用空白字符分隔。

`catch` 标签定义的动作原始之执行结果，应是一个表示异常信息的对象，其中需包含如下必要属性：

- `name`：表示异常名称，字符串。
- `info`：异常的附加信息，字符串。

其他属性，可由解释器决定。用法如下所示：

```hvml
    <catch for `ANY`>
        <exit with "Exception raised: $?.name" />
    </catch>
```

#### 2.5.15) `back` 标签

`back` 标签定义一个回退执行栈操作的动作元素，该元素用于控制当前的执行栈，以便回退到指定的前置栈帧。回退后，将从目标栈帧定义的下个执行位置开始执行程序。

`back` 元素只支持如下两种介词属性：

- `to`：用于指定回退位置，支持三种指定方式：
   - 以下划线（U+005F `_` ）打头的三个预定义相对栈帧名称：`_last`、`_nexttolast` 和 `_topmost`，分别表示上一个栈帧、上上一个栈帧和最顶栈帧。
   - 以井字符（U+0023 `#` ）打头的目标栈帧对应元素的标识符，如 `#myAnchor`。
   - 正整数表示的回退栈帧数量。
- `with`：用于指定一个值，这个值将取代回退后的上下文变量对应的结果数据。我们也可以使用该元素的内容来定义这个数据。

比如我们使用 `iterate` 生成小于 100 的偶数数列时，如果使用 `back` 标签，则可如下编码：

```hvml
    <init as="evenNumbers" with=[0,] >
        <iterate on=$?[0] with=$MATH.add($0<,2) nosetotail>
            <test on=$?>
                <match on=$L.gt($?,100) exclusively>
                    <back to="3" />
                </match>
                <match>
                    <update on="$evenNumbers" to="append" with="$?">
                </match>
            </test>
        </iterate>

        <ol>
            <iterate on=$evenNumbers by="RANGE: FROM 0">
                <li>$?</li>
            </iterate>
        </ol>

    </init>
```

以上的代码，当计算出来的偶数大于 `100` 时，将回退到第四个栈帧（总共回退 3 个栈帧），到达 `init` 元素对应的栈帧，然后从该栈帧对应元素的下个子动作元素开始执行，亦即 `ol` 外部元素定义的动作。

`back` 元素使用 `silently` 副词属性时，将不产生任何异常，按如下规则处理：

- 不可识别的 `to` 属性值或者求值失败或者无效的栈帧，一律按回退到最顶栈帧处理。
- 未指定 `with` 属性值时，按 `undefined` 处理，不改变回退后的上下文变量。
- 若 `with` 属性求值失败，按 `undefined` 处理，不改变回退后的上下文变量。

使用 `with` 属性值定义可替代回退后上下文变量之结果数据的操作，给程序控制执行逻辑带来了帮助。比如，捕捉到异常时：

```hvml
<body>
    <init as="dirEntries" with=[] />

    <ul id="theUL">
        <choose on=$FS.opendir($REQ.dir) >
            <catch for `ANY`>
                <back to="3">
                    "Exception when calling '$FS.opendir($REQ.dir)': $?"
                </back>
            </catch>

            <!-- no directory entry if $?.read() returns false -->
            <iterate with=$?.read() >
                <catch for `ANY`>
                    <back to="#theUL">
                        "Exception when calling '$FS.opendir($REQ.dir).read($REQ.dir)': $?"
                    </back>
                </catch>
                <li>$?.type: $?.name</li>
            </iterate>
        </choose>

        <test on='$DATA.type($?)'>
            <match for="AS 'string'">
                <li>$2?</li>
            </match>
        </test>
    </ul>

    ...

</body>
```

上述代码读取指定目录下的目录项，并捕获可能的异常。当发生异常时，使用 `back` 标签回退到`ul` 对应的栈帧，并修改 `ul` 栈帧的结果数据（`$?`）为一个字符串。回退后，程序开始执行 `test` 标签，判断结果数据的类型。注意 `ul` 作为外部元素，其最初的结果数据为 `null`。如果其类型为 `string` 则说明发生了异常，其后的操作将一个 `li` 元素插入目标文档，其中包含异常信息。

#### 2.5.16) `request` 标签

`request` 标签定义一个执行文档请求、行者请求或者渲染器请求操作的动作元素。

我们可以使用 `request` 元素在一个目标文档位置上发起一个方法调用请求，比如，操控 HTML 的 `video` 元素快速跳转到指定的位置：

```hvml
    <video id="my-video" width="320" height="240" autoplay muted>
        <source src="movie.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
    </video>

    <!-- request on="$DOC.query('#my-video')" to="fastSeek" with="5.30" -->
    <request on="#my-video" to="fastSeek" with="5.30" />
```

此时，我们使用如下三个属性：

- `on` 属性，指定目标文档位置。
- `to` 属性，指定要调用的方法或函数。
- `with` 属性，指定调用参数。我们也可以使用 `request` 的内容来定义调用参数。

为了异步观察请求的执行结果，我们可使用 `as` 属性为该请求定义一个静态命名变量，并使用 `observe` 标签观察其结果。因此，我们在该标签中可使用如下副词属性：

- `synchronously` 属性，用来指定同步等待请求的执行结果，是默认值，一般无需显式指定。
- `asynchronously` 属性，用来指定异步等待执行结果。
- `noreturn` 属性，用来指定不要求请求的处理侧发送对应的响应消息。

和 `init` 类似，在 `request` 标签中使用 `as` 属性命名一个请求时，我们也可以使用 `at` 属性指定名称的绑定位置（也就是名字空间）。

当我们使用 `to` 属性指定一个简单的方法时，`with` 属性的值将作为参数传递给这个方法。如下面的例子：

```hvml
    <request on="#my-video" to="doSomething" with="['value for foo', 'value for bar']" />
```

在支持 JavaScript 的渲染器中，以上请求将最终解释为如下 JavaScript 代码：

```js
    document.getElementById('#my-video').doSomething(['value for foo', 'value for bar']);
```

我们在 `to` 属性中使用具有 `get:` 或者 `set:` 前缀的方法名，可用来获取或者设置特定文档元素的动态属性值。比如下面的代码将 `#myInput` 元素设置为禁止，并使用 `noreturn` 副词属性，忽略响应。

```hvml
    <request on="#myInput" to="set:disabled" with=true noreturn />
```

下面的代码获取输入框中的内容：

```hvml
    <request on="#myInput" to="get:value" />
```


我们还可以使用 `request` 在指定的元素上执行一段渲染器支持的函数调用代码，并在函数调用代码中使用渲染器设定的如下预定义变量：

- `ELEMENT`：由 `on` 属性指定的目标文档元素汇集中的每个元素。
- `ARG`：由 `with` 属性或者内容定义的参数。

此时，我们在 `to` 属性值中使用 `call:` 前缀：

```hvml
    <request on="#myModal" to="call:bootstrap.Carousel.getInstance(ELEMENT).to(ARG)" with=0 />
```

在上面的 `to` 属性值中，我们使用了 `ELEMENT` 和 `ARG` 指代当前元素对象以及通过 `with` 属性或者内容传递给方法的参数。这些特殊关键词由渲染器处理并替代。比如上面的函数调用，最终会被渲染器解释为如下 JavaScript 代码：

```js
const method = new Function('ELEMENT', 'ARG', 'return bootstrap.Carousel.getInstance(ELEMENT).to(ARG)');
const result = method(document.getElementByHVMLHandle('4567834'), 0);
```

使用这种方法时，当参数为数组时，可使用渲染器脚本语言支持的方式引用其中的成员，如 `ARG[0]`、`ARG[1]`。

我们也可以使用上面这种方法获取或者设置特定文档元素的动态属性值。比如下面的代码将 `#myInput` 元素设置为禁止，并使用 `noreturn` 副词属性，忽略响应。

```hvml
    <request on "#myInput" to "call:ELEMENT.disabled=true" with 0 noreturn />
```

我们使用 `request` 标签，可以向本行者中的另一个协程发送一个请求，此时，我们指定 `on` 属性值为目标协程的标识符或者代表目标协程的原生实体，`to` 属性值构成请求的操作名称，`with` 属性或者元素内容为请求的参数。通过 `request` 标签提供的这一功能，我们可以让目标协程在它的执行上下文环境中调用指定的操作组，然后返回结果给调用者。由于该请求可以跨行者发送，故而相当于执行远程过程调用。

注意，我们不能使用 `request` 向当前协程发送请求，也不允许跨应用发送请求。但我们可以向当前应用的另一个行者发送请求。

比如，我们也可以向当前应用的另一个行者创建的通道发送数据，此时，我们使用目标通道标识符：`[//hostName]/appName/<runnerName>/CHAN/<channelName>`。对应本规范定义的被指名词法单元 `channel_identifier`，详情见 [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)。此处，我们可以使用 `-` 指代当前主机或当前应用，如：

- `//-/-/AnotherRunner/CHAN/channel0`：指当前主机、当前应用中名为 `AnotherRunner` 行者的 `channel0` 通道。
- `/-/AnotherRunner/CHAN/channel1`：指当前主机、当前应用中名为 `AnotherRunner` 行者的 `channel1` 通道。

向另一个行者的通道发送请求时，我们只能执行 `post` 操作，该操作会在目标通道满时立即返回一个错误响应，如：

```hvml
    <request on "/-/AnotherRunner/CHAN/channel0" to "post" with { data: 'I am here', channel: 'got' } noreturn />
```

另外，我们也可以向当前应用的另一个行者创建的指定协程发送请求。通常的应用场景下，作为请求处理的行者会在主协程中接收请求并分发给其他协程处理，然后将子协程的处理结果作为响应转发给请求方。这种情况下，发起请求的一方无需知悉具体的协程令牌，而使用 `_main` 作为协程令牌即可。

目标协程的标识符格式为 `[//hostName]/appName/<runnerName>/CRTN/<coroutineToken>`。对应本规范定义的被指名词法单元 `coroutine_identifier`，详情见 [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)。此处，我们可以使用 `-` 指代当前主机或当前应用，如：

- `//-/-/AnotherRunner/CRTN/3dfedf`：指当前主机、当前应用中名为 `AnotherRunner` 行者的 `3dfedf` 号协程。
- `/-/AnotherRunner/CRTN/3dfedf`：指当前主机、当前应用中名为 `AnotherRunner` 行者的 `3dfedf` 号协程。
- `/-/AnotherRunner/CRTN/_main`：指当前主机、当前应用中名为 `AnotherRunner` 行者的主协程。

通常，用于完成请求的目标协程的运行状态在进入到事件轮询阶段之后，才能响应来自其他协程的请求并在执行对应的操作组后返回结果给发起请求的协程。为此，协程应在 `$CRTN` 变量上观察 `request:<operationName>` 事件。

如下面的代码所示，一个协程定义了一个操作组 `echo`，将传入的参数追加一个前缀后原样返回：

```hvml
<!DOCTYPE hvml>
<hvml>
  <doby>

    <define as="echo">
        <return with="$STR.join($name,': ',$?)" />
    </define>

    <div>
        <init as="name" with="foo" />
        <observe on="$CRTN" for="request:echo1" with="$echo" />
        <div>
            <init as="name" with="bar" />
            <observe on="$CRTN" for="request:echo2" with="$echo" />
        </div>
    </div>

  </body>
</hvml>
```

假如保存该 HVML 程序的文件名为 `myrepeater.hvml`。我们在某个协程（父协程）中通过 `load` 元素在指定的行者中创建一个新协程（子协程）执行这个 HVML 程序，并在父协程中向子协程发送请求。当父协程收到来自子协程的 `corState:observing` 事件后，我们向子协程发送 `echo1` 请求：

```
    <load as="myRepeater" from="myrepeater.hvml" within="myRunner" asynchronously>
        <observe on="$myRepeater" for="corState:observing">
            <request on="$myRepeater.uri" to="echo1" >
                "How are you?"
            </request>
        </observe>
    </load>
```

显然，子协程在使用 `observe` 标签定义的针对 `request:echo1` 事件的观察者中处理针对 `echo1` 的请求。当子协程创建有多个针对 `echo1` 请求的观察者时，所有的观察者都将被安排执行，其结果将形成一个数组作为响应发送回请求者。

需要说明是，在上面的例子中，如果父协程指定的请求名称为 `echo1`，则得到结果为：`foo: How are you?`；而如果请求名称为 `echo2`，则结果应该为：`bar: How are you?`。

我们使用 `request` 标签，还可以向渲染器发送一个请求，比如新建窗口组，移除一个窗口组等。此时，指定 `on` 属性值为预定义变量 `$RDR`。至于具体要执行的请求操作以及参数，通过 `to` 属性和 `with` 属性传递，其含义和要求和具体的渲染器协议有关。比如在使用 PURCMC 协议时，我们可以向渲染器发送如下的请求向指定的工作区添加窗口组：

```hvml
    <request on '$RDR' to 'addPageGroups' >
        {
             dataType: 'html',
             data: '<section id="newGroup1"></section><section id="newGroup2"><article id="newGroupBody2" class="tabbedwindow"></article></section>'
        }
    </request>
```

再如，我们请求渲染器转储当前行者所属协程创建的页面内容时：

```hvml
    <request on $RDR to 'callMethod' >
        {
             name: "plainwin:hello@main",
             data: {
                    method: 'dumpContents',
                    arg: 'screenshot.png'
             },
        }
    </request>
```

#### 2.5.17) `load` 和 `exit` 标签

`load` 标签定义一个执行装载程序操作的动作元素，该元素在指定的行者（虚拟机实例）中启动一个新的协程装载并执行指定的 HVML 程序。由 `load` 装载的新 HVML 代码或者程序实例，称为子协程（child coroutine），执行 `load` 元素动作的协程称为父协程（parent coroutine）。

`load` 元素用来装载并执行一个由 `on` 属性指定的 HVML 代码（字符串）或者 `from` 属性指定的新 HVML 程序，并可将 `with` 属性指定的对象数据作为参数（对应 `$REQ` 变量）传递给子协程。如：

```hvml
    <load from="b.hvml" as="userProfile" onto="user@main" />
        $user
    </load>
```

`load` 元素支持如下介词属性：

- `on`：指定 HVML 代码（字符串）。
- `from`：指定的 HVML 程序的 URL（`$CRTN.base` 起效）。若 URL 使用 `#` 指定了定位锚（anchor），则用于指定作为程序入口的 `body` 标识符。若为空，表示使用和当前 HVML 协程相同的 HVML 程序来启动新协程；若以 `#` 打头，则表示使用和当前协程相同的 HVML 程序启动新协程，但通过 `#` 指定了作为入口的 `body` 标识符。
- `with`：若 `from` 属性指定了一个合法的 URL 字符串，指定从外部资源中装载 HVML 程序时的请求参数。
- `via`：若 `from` 属性指定了一个合法的 URL 字符串，则该属性指定从外部资源中装载 HVML 程序时的请求方法，默认为 `GET`。
- `as`：当我们异步装载新的 HVML 程序时，我们使用该属性将新的 HVML 协程和一个变量名称绑定，从而可观察该协程的状态。
- `at`：和 `init` 类似，在 `load` 标签中使用 `as` 属性命名一个 HVML 程序时，我们也可以使用 `at` 属性指定名称的绑定位置（也就是名字空间）。
- `within` 属性指定行者名称。不指定该属性或者使用保留字 `_self` 作为行者名称，表示当前行者。和 `call` 元素不同，`load` 元素指定的行者必须已经存在，也就是说，`load` 元素不会主动创建新的行者。
- `onto`：指定用于渲染目标文档的渲染器页面标识符，使用 `<page_type>:[<page_name>[@[<workspace_name>/]<group_name>]]` 这样的形式，用于指定页面类型、页面名称和所在的页面组。其中 `<page_type>` 指定页面的类型；`workspace_name` 和 `group_name` 分别表示页面所在的工作区名称以及页面组名称，`page_name` 是页面在指定页面组中的唯一性名称。

指定页面类型时，使用如下预定页面类型：

- `null`：表示空页面。此时，新创建的协程所生成的文档内容及其变更信息将不会同步到渲染器。当不指定 `onto` 属性时，视作创建空页面。使用该页面类型时，不需要指定页面组和页面名称。为防止混淆，`onto` 属性值应该具有 `null:` 这一形式。
- `inherit`：若新创建的子协程和当前协程属于同一行者，则表示该协程将继承父协程的文档内容，且使用相同的渲染器页面。此时，子协程和父协程可同时更新该文档，且其更新将同时反映到当前页面上。使用该页面类型时，不需要指定页面组和页面名称。为防止混淆，`onto` 属性值应该具有 `inherit:` 这一形式。
- `self`：表示当前协程使用的页面。在当前协程使用的页面中渲染新的 HVML 程序，通常意味着当前协程将被压制（suppressed），页面中的文档内容将被新的 HVML 协程覆盖。使用该页面类型时，不需要指定页面组和页面名称。为防止混淆，`onto` 属性值应该具有 `self:` 这一形式。
- `plainwin`，表示创建一个普通窗口作为页面。
- `widget`，表示创建一个小构件作为页面。

在指定页面标识符时，若整个忽略页面类型，则视作默认的 `plainwin` 类型。

指定页面名称时，我们可以使用如下保留名称（保留名称通常以下划线打头）指代特定的页面：

- `_active`：表示当前 HVML 程序对应分组中的当前活动页面；当前活动页面对应的 HVML 协程将被压制。
- `_first`：表示当前 HVML 程序对应分组中的第一个页面；第一个页面对应的 HVML 协程将被压制。
- `_last`：表示当前 HVML 程序对应分组中的最后一个页面；最后一个页面对应的 HVML 协程将被压制。

指定工作区名称时，我们可以使用如下保留名称（保留名称通常以下划线打头）指代特定的工作区：

- `_default`：表示默认工作区。
- `_active`：表示当前活动工作区。
- `_first`：表示第一个工作区。
- `_last`：表示最后一个工作区。

当 `from` 属性值指定的 URL 定义有片段（使用 `#` 符号）时，`load` 元素将尝试执行该 HVML 程序中的指定的本体，即另一个 `body` 子树定义的操作组。

当同时指定 `on` 属性和 `from` 属性时，按如下规则处理：

1. 若未指定 `from` 属性或者 `from` 属性值不是一个合法的 URL 字符串，则尝试装载 `on` 属性指定的字符串，称为字符串内容。
1. 若 `from` 属性指定了一个合法的 URL 字符串，则优先从外部资源中装载 HVML 程序。此时，使用 `with` 属性值用来指定请求参数，`via` 属性值指定请求方法。
1. 同时使用字符串内容和外部资源时，若装载和解析外部资源的过程中出现异常，且设置有 `silently` 属性时，则转而使用字符串内容作为 HVML 程序；若一切正常，则使用外部资源。也就是说，字符串内容作为垫底（fallback）程序使用。
1. 若字符串内容或者外部资源均不可用，则抛出异常 `NoData`。

除保留名称之外，`onto` 属性指定的页面标识符必须符合本规范定义的 `page_identifier` 词法单元要求，详情见 [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)。如下是一些合法的页面标识符样例：

- `user`：指一个名为 `user` 的普通窗口。
- `user@Users`：指默认工作区的 `Users` 页面组中名为 `user` 的普通窗口。
- `user@main/Users`：指 `main` 工作区的 `Users` 页面组中一个名为 `user` 的普通窗口。
- `plainwin:user@main/Users`：指 `main` 工作区的 `Users` 页面组中创建一个名为 `user` 的普通窗口。
- `plainwin:_active@_default`：指默认工作区的活动普通窗口。
- `widget:user@main/Users`：指 `main` 工作区的 `Users` 页面组中一个名为 `user` 的构件。
- `widget:_active@main/Users`：指 `main` 工作区的 `Users` 页面组中的活动构件。

当给定的页面名称不存在时，意味着在指定分组中创建一个新的页面，并赋予该页面给定的名称；若指定的页面分组不存在时，将使用第一个分组。当我们创建一个新的渲染器页面时，可通过其 `with` 属性值的 `_renderer` 键名指定传递给渲染器的页面参数，如类名、标题和样式等。

`load` 元素的内容数据，将作为参数传递给新的协程，在新的协程中，可使用 `$REQ` 变量访问。

```hvml
    <init as="request">
        {
            hvml: '<hvml target="html"><body><h1>$REQ.text</h1><p>$REQ.hvml</p></body></hvml>',
            text: "Hello, world!",
            _renderer: {
                title: 'Hello, world!',
                class: 'hello',
                layoutStyle: 'with:200px;height:100px',
                toolkitStyle: { 'darkMode': false, 'fullScreen': false, 'backgroundColor': 0xFF0000 },
            },
        }
    </init>

    <load on="$request.hvml" onto="hello@main" >
        $request
    </load>
```

上面的代码，使用 `on` 属性指定了一段要装载执行的 HVML 程序（`$request.hvml`），并将 `$request` 数据作为该程序的请求数据传递给新的协程。注意 `on` 属性指定的 HVML 程序，该程序使用了 `$REQ` 预定义变量的 `text` 作为 `h1` 元素的内容，将程序代码本身作为 `p` 元素的内容。同时，该程序使用 `_renderer` 键名定义了需要传递给渲染器的参数，其中包括页面的类名及样式信息。

该程序最终生成的 HTML 文档内容如下：

```hvml
<html>
    <body>
        <h1>Hello, world!</h1>
        <p>&lt;hvml target="html"&gt;&lt;body&gt;&lt;h1&gt;$REQ.text&lt;/h1&gt;&lt;p&gt;$REQ.hvml&lt;/p&gt;&lt;/body>&lt;/hvml&gt;</p>
    </body>
</html>
```

`load` 标签支持如下副词属性：

- `synchronously`：同步装载，默认行为。`load` 元素将同步等待子协程退出。
- `asynchronously`：异步装载。`load` 元素不等待子协程退出。

假定我们使用 `load` 标签装载一个用来创建新用户的 HVML 程序，如果使用同步装载方式：

```hvml
    <load from="new_user.hvml" onto="newUser@mainBody" synchronously>
        <update on="#the-user-list" to="append" with="$?" />

        <!-- 对子协程非正常退出的情形，通过捕获相应的异常进行处理 -->
        <catch for `ChildTerminated`>
            ...
        </catch>
    </load>
```

如果使用异步装载方式，则需要 `as` 属性并使用 `observe` 标签创建一个观察者，用于观察子协程的 `corState:exited`（退出）事件：

```hvml
    <load from="new_user.hvml" as="newUser" onto="newUser@mainBody" asynchronously>
        <observe on="$newUser" for="corState:exited">
            <update on="#the-user-list" to="append" with="$user_item" />
        </observe>
    </load>
```

以上两种实现方式，均会在当前目标文档的 `#the-user-list` 中插入一条新的用户条目。

使用异步装载方式时，`load` 元素的正常结果数据应该是一个用来标识新协程的原生实体，该原生实体至少应该提供一个 `id` 属性，可用来返回新协程的标识符。

和 `load` 元素配合，我们通常在被装载的程序中使用 `exit` 标签主动退出协程的运行并定义协程的返回数据。如：

```hvml
    <init as="user_info">
        { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "en_US" },
    </init>

    <exit with="$user_info" />
```

上面的代码，使用 `exit` 标签的 `with` 属性定义了一项数据，解释器应将该数据作为当前 HVML 协程的结果数据处理。

当我们在当前行者中创建子协程，并在一个已有的渲染器页面（比如将 `onto` 属性值设置为 `self:`）中渲染子协程的文档内容时，该页面对应的协程之渲染状态将因为渲染器页面被占用而被设置为被压制（suppressed）。如下面的代码：

```hvml
<hvml>
    <body>
        ...

        <load from="#errorPage" onto="self:" asynchronously />

        ...
    </body>

    <body id="errorPage">
        <p>We encountered a fatal error!</p>
    </body>
</hvml>
```

上述代码中的 `load` 元素对应如下几个步骤：

1. 装载 HVML 程序（或者克隆当前程序的 vDOM）并在新建的新子协程中执行该程序，其入口为 `#errorPage` 本体。
1. 子协程将使用其父协程使用的渲染器页面（由 `onto` 属性值 `self:` 指定），故父协程将被解释器压制（渲染状态为 `suppressed`）。由于使用了 `asynchronously` 副词属性，故父协程会继续运行，但不会和渲染器做任何数据交换。
1. 子协程清空父协程使用的渲染器页面并装载自己的目标文档内容。
1. 子协程终止运行后释放渲染器页面，解释器设置父协程的渲染状态为 `regular`，并使用其完整的目标文档内容覆盖渲染器页面内容。
1. 父协程恢复正常的渲染器数据交换。

#### 2.5.18) `inherit` 标签

`inherit` 标签用于定义一个执行继承操作的动作元素，除 `in` 之外，该元素不使用任何介词和副词属性，默认继承其前置栈帧的上下文变量。若定义有数据内容，则使用数据内容覆盖对应栈帧的 `$^` 上下文变量。

通常，我们使用 `inherit` 元素分隔具有不同逻辑功能的代码，也经常利用其内容来执行由动态对象提供的功能。下面的代码展示了 `inherit` 标签的多种使用场景：

```hvml
<!DOCTYPE hvml>

<!-- $REQ contains the startup options -->
<hvml target="$REQ.target">
  <body>

    <inherit>
        $STREAM.stdout.writelines("Start of 'Hello, world!'");
    </inherit>

    <!--
        $SYS.locale returns the current system locale like `zh_CN'.
        This statement loads a JSON file which defined the map of
        localization messages, like:
        {
            "Hello, world!": "世界，您好！"
        }
    -->
    <update on="$T.map" from="messages/$SYS.locale" to="merge" />

    <!--
        This statement defines an operation set, which output
        an HTML fragment.

        An operation set of HVML is similiar to a function or a closure
        in other languages.
    -->
    <define as="output_html">
        <h1>HVML</h1>
        <p>$?</p>
    </define>

    <!--
        This statement defines an operation set, which output
        a text line to STDOUT.
    -->
    <define as="output_void">
        <inherit>
            $STREAM.stdout.writelines($?)
        </inherit>
    </define>

    <!--
        This statement includes one of the operation sets defined above
        according to the value of `target` attribute of `hvml` element,
        and pass the result returned by `$T.get('Hello, world!')`.
    -->
    <include with=${output_$CRTN.target} on="$T.get('Hello, world!')" />

    <inherit>
        $STREAM.stdout.writelines("End of 'Hello, world!'");
    </inherit>

  </body>
</hvml>
```

#### 2.5.19) `sleep` 标签

`sleep` 标签用于定义一个执行休眠操作的动作元素，该元素可让当前协程进入停止状态，从而休眠指定的时间。

该元素使用如下属性：

- `with`：指定休眠秒数（注：小数有效）。
- `for`：使用时间单位来指定要休眠的时间，比如 `1m` 表示一分钟，支持如下单位：
   - `ns`：纳秒。
   - `us`：微秒。
   - `ms`：毫秒。
   - `s`：秒。
   - `m`：分。
   - `h`：时。
   - `d`：天。

同时指定 `with` 和 `for` 属性时，`with` 优先。

如下面的示例代码：

```hvml
    <!-- 休眠 0 ~ 10.0 秒中的随机时间 -->
    <sleep with="$SYS.random(10.0)" />

    <!-- 休眠 0.5 秒 -->
    <sleep for="0.5s" />

    <!-- 休眠 1 天 12 小时 -->
    <sleep for="1d 12h" />
```

解释器在执行 `sleep` 元素时，应将当前协程设置为停止状态，并在休眠时间到期后，唤醒当前协程。在因 `sleep` 元素休眠某协程期间，解释器检查到发送给该协程的任何事件，则解释器应立即唤醒该协程。

`sleep` 的结果数据是剩余的休眠时间（秒数，数值类型），若未被打断，则为 0。

### 2.6) 执行器

在 `choose`、 `iterate` 以及 `reduce` 等动作标签中，我们通常要使用 `by` 介词属性来定义如何执行选择、迭代或者归约操作，我们称之为规则，而实现相应的规则的代码或者功能模块被称为选择器、迭代器或归约器，统称为执行器（executor）。HVML 解释器可实现内置（built-in）执行器，通过简单的语法来指定在选择、迭代、归约数据时遵循什么样的规则。在复杂情形下，HVML 允许开发者调用外部程序（比如可动态加载的模块）来实现执行器。HVML 使用 `CLASS` 或 `FUNC` 前缀来表示使用外部定义的执行器。

需要说明的是，在 `test` 和 `sort` 标签中也可以使用执行器。`test` 标签中使用执行器的情形同 `choose` 标签。`sort` 标签中使用内建执行器时，将对内建执行器返回的结果执行排序操作，而使用外部执行器时，直接在 `on` 属性指定的数据基础上执行排序操作。

#### 2.6.1) 内建执行器

在 HVML 代码中，内置执行器的规则中可包含求值表达式（本质上属于参数化字符串）。但在调用执行器之前，HVML 解释器会完成求值表达式的求值，将最终的规则字符串传递给执行器，因此，我们在描述内建执行器的规则时，假定已完成相应的求值。

##### 2.6.1.1) `KEY` 执行器

该执行器作用于字典数据上，使用给定的键名或键名列表返回键名、键值或键值对象列表，或者使用匹配某个规则的键名列表，返回键名、键值或者键值对象列表。比如对下面的数据：

```hvml
    <init as="regionStats">
        { "zh_CN" : 100, "zh_TW" : 90，"zh_HK": 90, "zh_SG": 90, "zh_MO": 80, "en_US": 70, "en_UK": 80 }
    </init>
```

上面字典数据使用语言地区信息（locale）作为键名，一个整数作为对应的键值。

如果我们要获得所有的键值，则使用 `KEY: ALL`。

如果我们要获得其中几个键名对应的键值，则使用 `KEY: AS 'zh_CN', 'zh_HK'`。

如果我们要获得所有汉语地区的键值，则使用模式匹配 `KEY: LIKE 'zh_*'`，或使用正则表达式 `KEY: LIKE /zh_[A-Z][A-Z]/i`。

如果我们要获得所有中国大陆地区和所有英语地区对应的键值对，可使用 `KEY: AS 'zh_CN' LIKE 'zh_*'`。

我们还可以使用逻辑运算符描述更加复杂的键名匹配条件，如：`KEY: AS 'zh_CN', 'zh_TW' OR NOT LIKE 'en_*'`

当给定的键名不存在匹配项时，则结果中不包含对应的信息。

`KEY` 执行器的语法如下：

```
    "KEY" [ws] ':' [ws] { "ALL" | <string_matching_logical_expression> } [ <ws> "FOR" <ws> < "VALUE" | "KEY" | "KV" > ]

    string_matching_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, <string_matching_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    string_matching_condition: "LIKE"<ws><string_pattern_list> | "AS"<ws><string_literal_list>
    string_pattern_list: <string_pattern_expression>[ [ws] ',' [ws] <string_pattern_expression>[ [ws] ',' [ws] ...]]
    string_literal_list: <string_literal_expression>[ [ws] ',' [ws] <string_literal_expression>[ [ws] ',' [ws] ...]]

    string_literal_expression: <quoted_literal_char_sequence>[<matching_flags>][<max_matching_length>]
    string_pattern_expression: <quoted_wildcard_expression>[<matching_flags>][<max_matching_length>] | <quoted_regular_expression>[<regexp_flags>]

    regexp_flags: 'g' || 'i' || 'm' || 's' || 'u' || 'y'
    matching_flags: 'i' || 's' || 'c'
    max_matching_length: <literal_positive_integer>
```

`KEY` 执行器中的 `FOR` 分句指定了数据的返回形式：

- 取 `VALUE` 时，返回键值（默认行为）。
- 取 `KEY` 时，返回键名。
- 取 `KV` 时，会将键值对转换为一个含有两个属性的对象，其中属性 `k` 表示键名，属性 `v` 表示键值，即键值对象。如针对上面的数据，规则 `KEY: AS 'zh_CN', 'zh_HK' FOR KV` 对应的结果数据为：

```json
    [ { "k": "zh_CN", "v": 100 }, { "k": "zh_TW", "v": 90 } ]
```

对于字典数据，不指定 `by` 属性时，默认使用 `KEY: ALL` 执行器。

##### 2.6.1.2) `RANGE` 执行器

该执行器作用于数组和集合数据上，使用下标范围来返回对应的数组单元列表（集合可视为不包含重复数据单元的数组）。比如对下面的数据：

```hvml
    <init as="regionStats">
        [ "zh_CN", 100, "zh_TW", 90, "zh_HK", 90, "zh_SG", 90, "zh_MO", 80, "en_US", 30, "en_UK", 20 ]
    </init>
```

如果我们要获得所有的数组单元，则使用 `RANGE: FROM 0`。

如果我们要获得前四个数组单元，则使用 `RANGE: FROM 0 TO 3`，返回的数据为：

```json
    [ "zh_CN", 100, "zh_TW", 90 ]
```

如果我们要获得索引下标为偶数的数组单元，则使用 `RANGE: FROM 0 ADVANCE 2`，返回的数据为：

```json
    [ "zh_CN", "zh_TW", "zh_HK", "zh_SG", "zh_MO", "en_US", "en_UK" ]
```

如果我们要获得索引下标为奇数的数组单元，则使用 `RANGE: FROM 1 ADVANCE 2`，返回的数据为：

```json
    [ 100, 90, 90, 90, 80, 30, 20 ]
```

`RANGE` 执行器的语法如下：

```
    "RANGE" [ws] ':' [ws] "FROM" <ws> <integer_expression> ["TO" <ws> <integer_expression>][ <ws> "ADVANCE" <ws> <integer_expression>]

    integer_expression: <literal_integer> | <integer_evaluation_expression>
    integer_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions like C language, such as `(3.14 * 6 * 6) / 5`

```

对于数组数据，不指定 `by` 属性时，默认使用 `RANGE: FROM 0` 执行器。

注意，执行器应检查无效索引值。

##### 2.6.1.3) `FILTER` 执行器

该执行器作用于数组、对象和集合上，使用特定的条件过滤容器中的元素。比如对下面的数据：

```hvml
    <init as="myArray" uniquely>
        [ 100, 95, 95, 95, 80, 30, 55, 20 ]
    </init>
```

如果我们要获得所有的集合元素，则使用 `FILTER: ALL`，返回的数据为：

```json
    [ 100, 95, 80, 30, 55, 20 ]
```

如果我们要获得数值大于 30 的元素，则使用 `FILTER: GT 30`，返回的数据为：

```json
    [ 100, 95, 80, 55 ]
```

如果我们要获得以 0 结尾的元素，则使用 `FILTER: LIKE /0\$/`，返回的数据为：

```json
    [ 100, 80, 30, 20 ]
```

`FILTER` 执行器的语法如下：

```
    "FILTER" [ws] ':' [ws] { "ALL" | <number_comparing_logical_expression>  | <string_matching_logical_expression> } \
        [ <ws> "FOR" <ws> < "VALUE" | "KEY" | "KV" > ]

    number_comparing_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, and <number_comparing_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    number_comparing_condition: < "LE" | "LT" | "GT" | "GE" | "NE" | "EQ" > <ws> <number_expression>
    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions composed of literal real numbers, such as `(3.14 * 6 * 6) / 5`

    string_matching_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, <string_matching_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    string_matching_condition: "LIKE"<ws><string_pattern_list> | "AS"<ws><string_literal_list>
    string_pattern_list: <string_pattern_expression>[ [ws] ',' [ws] <string_pattern_expression>[ [ws] ',' [ws] ...]]
    string_literal_list: <string_literal_expression>[ [ws] ',' [ws] <string_literal_expression>[ [ws] ',' [ws] ...]]

    string_literal_expression: <quoted_literal_char_sequence>[<matching_flags>][<max_matching_length>]
    string_pattern_expression: <quoted_wildcard_expression>[<matching_flags>][<max_matching_length>] | <quoted_regular_expression>[<regexp_flags>]

    regexp_flags: 'g' || 'i' || 'm' || 's' || 'u' || 'y'
    matching_flags: 'i' || 's' || 'c'
    max_matching_length: <literal_positive_integer>
```

注意：

1. 当使用数值对比分句时，则数据将被强制转换为数值进行处理。
1. 当使用字符串匹配分句时，则数据会首先被序列化为字符串，然后进行匹配处理。
1. 当集合中的元素使用额外的唯一性键名来判断唯一性时，`FILTER` 指定的匹配条件，仅和唯一性键名对应的值相关。
1. 当该执行器用于集合时，使用键值做过滤条件，并可使用类似 `KEY` 执行器一样的 `FOR` 分句指定返回的数据形式。

对于集合数据，不指定 `by` 属性时，默认使用 `FILTER: ALL` 执行器。

作为示例，本文档 [2.1.6.3) 预定义变量](#2163-预定义变量) 小节中激活某个特定定时器时使用了 `FILTER` 执行器。

##### 2.6.1.4) 用于字符串的内建执行器

针对字符串数据，HVML 提供如下内建执行器，可分别用于遍历字符串中的字符列表和词元（token）列表：

- `CHAR:`：将字符串分割为字符列表。语法和 `RANGE` 执行器类似。
- `TOKEN:`：将字符串按照指定的分隔符分割为词元列表。

`CHAR` 执行器的语法如下：

```
    "CHAR" [ws] ':' [ws] "FROM" <ws> <integer_expression> [ <ws> "TO" <ws> <integer_expression>] \
        [ <ws> "ADVANCE" <ws> <integer_expression>] \
        [ <ws> "UNTIL" <ws> <quoted_literal_char>]

    integer_expression: <literal_integer> | <integer_evaluation_expression>
    integer_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`
```

比如，当我们使用 `CHAR: FROM 0 TO 10 ADVANCE 2 UNTIL 'f'` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

```json
    [ "A", "b", "o", "n" ]
```

`TOKEN` 执行器的语法如下：

```
    "TOKEN" [ws] ':' [ws] "FROM" <ws> <integer_expression> [<ws> "TO" <ws> <integer_expression>] \
        [ <ws> "ADVANCE" <ws> <integer_expression>] \
        [ <ws> "DELIMETERS" <ws> <quoted_literal_char_sequence>] \
        [ <ws> "UNTIL" <ws> <string_matching_logical_expression>]

    integer_expression: <literal_integer> | <integer_evaluation_expression>
    integer_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`

    string_matching_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, <string_matching_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    string_matching_condition: "LIKE"<ws><string_pattern_list> | "AS"<ws><string_literal_list>
    string_pattern_list: <string_pattern_expression>[ [ws] ',' [ws] <string_pattern_expression>[ [ws] ',' [ws] ...]]
    string_literal_list: <string_literal_expression>[ [ws] ',' [ws] <string_literal_expression>[ [ws] ',' [ws] ...]]

    string_literal_expression: <quoted_literal_char_sequence>[<matching_flags>][<max_matching_length>]
    string_pattern_expression: <quoted_wildcard_expression>[<matching_flags>][<max_matching_length>] | <quoted_regular_expression>[<regexp_flags>]

    regexp_flags: 'g' || 'i' || 'm' || 's' || 'u' || 'y'
    matching_flags: 'i' || 's' || 'c'
    max_matching_length: <literal_positive_integer>
```

比如，当我们使用 `TOKEN: FROM 0 TO 2 DELIMETERS ' '` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

```json
    [ "A", "brown", "fox" ]
```

对于字符串数据，若不指定 `by` 属性时，默认使用 `CHAR: FROM 0` 执行器。

更进一步，HVML 解释器可提供基于特定自然语言的单词和句子执行器：`WORD` 和 `SENTENCE`。

##### 2.6.1.5) 用于数值的内建执行器

针对数值数据，HVML 提供如下内建执行器，可用于产生数值列表或简称“数列”：

- `ADD`：满足给定条件时，在给定数值基础上执行加法操作。
- `SUB`：满足给定条件时，在给定数值基础上执行减法操作。
- `MUL`：满足给定条件时，在给定数值基础上执行乘法操作。
- `DIV:`：满足给定条件时，在给定的数值基础上执行除法操作。
- `FORMULA:`：满足给定条件时，使用给定的迭代公式求值。
- `OBJFORMULA:`：满足给定条件时，使用给定的多个迭代公式在对象上求值。

`ADD`、 `SUB`、 `MUL`、 `DIV` 执行器的语法如下：

```
    < "ADD" | "SUB" | "MUL" | "DIV" > [ws] ':' [ws] <number_comparing_logical_expression> <ws> "BY" <ws> <number_expression>

    number_comparing_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, and <number_comparing_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    number_comparing_condition: < "LE" | "LT" | "GT" | "GE" | "NE" | "EQ" > <ws> <number_expression>
    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions composed of literal real numbers, such as `(3.14 * 6 * 6) / 5`

    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`
```

比如，当我们使用 `ADD: GT 90 BY -3` 执行器作用于数值 `100` 时，返回的数列为：

```json
    [ 100, 97, 94, 91 ]
```

`FORMULA` 执行器的语法如下：

```
    "FORMULA" [ws] ':' [ws] <number_comparing_logical_expression> <ws> "BY" <ws> <iterative_formula_expression>

    number_comparing_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, and <number_comparing_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    number_comparing_condition: < "LE" | "LT" | "GT" | "GE" | "NE" | "EQ" > <ws> <number_expression>
    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions composed of literal real numbers, such as `(3.14 * 6 * 6) / 5`

    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`
    iterative_formula_expression: a four arithmetic expressions containing `X` as the iterative value, such as `(3.14 * X * X) / 5`
```

比如，当我们使用 `FORMULA: LT 500 BY (X * 2 - 50)` 执行器作用于数值 `100` 时，返回的数列为：

```json
    [ 100, 150, 250, 450 ]
```

对于数值数据，若不指定 `by` 属性时，默认使用 `ADD: LE $? BY 1` 执行器；该执行器将产生只包含一个数值的数列，这个数值就是当前操作数据。

`OBJFORMULA` 执行器的语法如下：

```
    "OBJFORMULA" [ws] ':' [ws] <value_number_comparing_logical_expression> <ws> "BY" <ws> <iterative_assignment_list>

    value_number_comparing_logical_expression: a logical expression using `NOT`, `AND`, `OR`, `XOR` as the logical operators, \
        `( )` as the precedence operators, and <value_number_comparing_condition> as the basic/minimal logical expression \
        which can be evaluated as `true` or `false`.

    value_number_comparing_condition: <key_name> <ws> < "LE" | "LT" | "GT" | "GE" | "NE" | "EQ" > <ws> <number_expression>

    key_name: /^[A-Za-z_][A-Za-z0-9_]*$/

    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions composed of literal real numbers, such as `(3.14 * 6 * 6) / 5`

    number_expression: <literal_number> | <number_evaluation_expression>
    number_evaluation_expression: <four_arithmetic_expressions>
    four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`

    iterative_assignment_list: <iterative_assignment_expression>[ [ws] ',' [ws] <iterative_assignment_expression>[ [ws] ',' [ws] ...]]
    iterative_assignment_expression: an assignment expression using `=` as the operator, the left operand is one of the key name of \
        the current object and the right operand is a four arithmetic expressions containing the key names as the iterative values, \
        such as `x = (3.14 * y * y) / 5`
```

比如，当我们使用 `OBJFORMULA: x LT 500 AND y LT 600 BY x = (x * 2 - 50), y = y + x` 执行器作用于对象 `{ x: 100, y: 0 }` 时，返回的数列为：

```json
    [
        { "x": 100, "y", 100 },
        { "x": 150, "y", 250 },
        { "x": 250, "y", 500 },
    ]
```

注意，使用数值执行器用于迭代时：

1. 初始迭代数据（也就是上下文变量 `$<` 的值）来自 `on` 属性，而在执行下次迭代之前，上下文变量 `$<` 的值将会用上次迭代的结果数据替代。
1. 数值执行器的 `by` 属性定义的规则字符串，应在每次迭代时重新求值。
1. 当迭代次数超出最大设置值时，会抛出 `MaxIterationCount` 异常。

##### 2.6.1.6) `SQL` 执行器

SQL（structured query language）是关系型数据库管理系统用来查询结构化数据的语言。考虑到 HVML 中大部分数据使用字典数据形成的数组表达，所以，HVML 引入了内建的 SQL 执行器。通过 SQL 执行器，我们可以非常方便地从 `on` 属性指定的数据集中查询获得特定的数据子集，且能够很容易地指定查询的匹配条件。比如针对下面的数据：

```hvml
    <init as="regionStats">
        [
            { "locale" : "zh_CN", "rank" : 100 },
            { "locale" : "zh_TW", "rank" : 90 },
            { "locale" : "zh_HK", "rank" : 90 },
            { "locale" : "zh_SG", "rank" : 90 },
            { "locale" : "zh_MO", "rank" : 80 },
            { "locale" : "en_US", "rank" : 30 },
            { "locale" : "en_UK", "rank" : 20 },
        ]
    </init>
```

我们可以直接使用 `SQL` 执行器来获得上述数据的子集，比如：

- 如果我们要获得所有汉语地区的数据子集，则使用 `SQL: SELECT * WHERE locale LIKE 'zh_*'`。
- 如果我们要获得其中几个特定地区的数据子集，则使用 `SQL: SELECT * WHERE locale IN ('zh_CN', 'zh_TW')`。
- 如果我们要获得其中 `rank` 键值大于 70 的记录，则使用 `SQL: SELECT locale WHERE rank > 70`。
- 如果我们要获得其中 `rank` 键值大于 70 汉语地区记录，则使用 `SQL: SELECT locale WHERE locale LIKE 'zh_*' AND rank > 70`。

和用于数据库的 SQL 语言不同，我们并没有使用标准 SQL 语句的 `FROM` 分句来指定数据库表，因为在 HVML 中我们已经使用了`on` 介词属性来指定了数据集。因此，可以说 HVML 的 SQL 执行器是一种简化的 SQL 实现，主要借助 SQL 的 `SELECT` 语句实现了选择、迭代和归约操作。具体而言，HVML 的 SQL 语句主要支持如下分句（不同的 HVML 解释器实现可以支持更多的 SQL 分句）。

- `WHERE`: 用于指定筛选条件。
- `GROUP BY`：用于指定分组（归约）条件。
- `ORDER BY`：用于指定排序操作。

另外，在 HVML 内置 SQL 解释器的 `SELECT` 语句中，除了使用 `*` 表示返回所有可能字段之外，还可以使用 `&` 返回符合给定条件的整个数据；当数据是数组、字典或者原生实体对象时，可使用 `update` 语句操作修改其内容。如：

```hvml
    <choose on="$TIMERS" by="SQL: SELECT & WHERE id = 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>
```

在 HVML 中，SQL 执行器也可以作用于 DOM 文档子树或者嵌套结构化字典数据。为此，我们引入了一个新的 SQL SELECT 分句 `TRAVEL IN`，可选 `SLIBLINGS`、 `DEPTH`、 `BREADTH` 或者 `LEAVES`，分别表示使用兄弟节点遍历、深度优先（depth-first）遍历、广度优先（breadth-first）遍历和叶子节点遍历，其语法为：

- `"TRAVEL" <ws> "IN" <ws> [ "SIBLINGS" | "DEPTH" | "BREADTH" | "LEAVES" ]`：用于指定在树形数据上的遍历方式。

如针对下面的 DOM 树：

```hvml
<ul>
    <li id="user-1" class="user-item" data-value="1" data-region="zh_CN">
        <img class="avatar" src="/avatars/foo.png" />
        <span>foo</span>（中国大陆）
    </li>
    <li id="user-2" class="user-item" data-value="2" data-region="zh_TW">
        <img class="avatar" src="/avatars/bar.png" />
        <span>bar</span>（中国台湾）
    </li>
</ul>
```

按本文档 [2.1.17) 文档片段的结构化数据表达](#2117-文档片段的结构化数据表达) 小节中描述的规则，上述 DOM 文档片段对应的结构化数据表达为：

```json
{
    "tag": "ul",
    "attr": {},
    "children": [
        {
            "tag": "li",
            "attr": {
                "id": "user-1",
                "class": "user-item",
                "data-value": "1",
                "data-region": "zh_CN",
            },
            "children": [
                {
                    "tag": "img",
                    "attr": {
                        "class": "avatar",
                        "src": "/avatar/foo.png"
                    },
                    "children": []
                },

                {
                    "tag": "span",
                    "attr": {},
                    "children": [
                        {
                            "tag": "txt",
                            "content": "foo",
                            "children": []
                        },
                    ]
                },

                {
                    "tag": "txt",
                    "attr": {},
                    "content": "（中国大陆）",
                    "children": []
                }
            ]
        },

        {
            "tag": "li",
            "attr": {
                "id": "user-2",
                "class": "user-item",
                "data-value": "2",
                "data-region": "zh_TW",
            },
            "children": [
                {
                    "tag": "img",
                    "attr": {
                        "class": "avatar",
                        "src": "/avatar/bar.png"
                    },
                    "children": []
                },

                {
                    "tag": "span",
                    "attr": {},
                    "children": [
                        {
                            "tag": "txt",
                            "attr": {},
                            "content": "foo",
                            "children": []
                        },
                    ]
                },

                {
                    "tag": "txt",
                    "attr": {},
                    "content": "（中国台湾）",
                    "children": []
                }
            ]
        },
    ]
}
```

如果我们在上述 DOM 文档片段（或等价的结构化数据）上执行深度优先遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN DEPTH` 语句的执行结果为：

```json
[
    { "tag": "ul", "attr.id": null, "textContent": null },
    { "tag": "li", "attr.id": "user-1", "textContent": null },
    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "span", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国大陆）" },

    { "tag": "li", "attr.id": "user-2", "textContent": null },
    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "span", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国台湾）" },
]
```

如果我们在上述 DOM 文档片段（或等价的结构化数据）上执行广度优先遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN BREADTH` 语句的执行结果为：

```json
[
    { "tag": "ul", "attr.id": null, "textContent": null },

    { "tag": "li", "attr.id": "user-1", "textContent": null },
    { "tag": "li", "attr.id": "user-2", "textContent": null },

    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "span", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国大陆）" },

    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "span", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国台湾）" },
]
```

如果我们在上述 DOM 文档片段（或等价的结构化数据）上执行叶子节点遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN LEAVES` 语句的执行结果为：

```json
[
    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国大陆）" },

    { "tag": "img", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": null },
    { "tag": "txt", "attr.id": null, "textContent": "（中国台湾）" },
]
```

注意，在基于字典数据的数组或者树状结构上执行 SQL 语句时，可选的字段（如 `tag`、 `attr.id` 等）为所有字典数据的键名之并集。对所有未定义的键值对，相应的键值为 `null`。

在使用 `TRAVEL IN` 分句时，可使用内置变量，如 `@__depth` 作为当前的遍历深度，`@__index` 作为在当前深度上的索引值，从而可以复用 `WHERE` 条件分句来限定遍历的深度或者数量。如 `SELECT tag, attr.id, textContent WHERE @__depth > 0 AND @__depth < 3 TRAVEL IN DEPTH` 将给出如下结果：

```json
[
    { "tag": "li", "attr.id": "user-1", "textContent": null },
    { "tag": "li", "attr.id": "user-2", "textContent": null },
]
```

##### 2.6.1.7) `TRAVEL` 执行器

作为一种对 `SQL` 执行器的简单替代，我们可以在树状结构上使用 `TRAVEL` 执行器。

`TRAVEL` 执行器的语法如下：

```
    "TRAVEL" [ws] ':' [ws] <"SIBLINGS" | "DEPTH" | "BREADTH" | "LEAVES">
```

说明如下：

- 使用 `TRAVEL: SIBLINGS` 时，遍历和当前节点同级的所有兄弟节点。
- 使用 `TRAVEL: DEPTH` 时，从第一级子节点开始执行一次深度遍历，直到叶子节点为止。
- 使用 `TRAVEL: BREADTH` 时，在第一级子节点中执行一次广度遍历，直到遍历完所有第一级子节点为止。
- 使用 `TRAVEL: LEAVES` 时，遍历所有的叶子节点。

当我们需要将 DOM 子树中的部分元素之属性或内容映射到目标数据或者目标元素时，我们使用这一内建执行器。如：

```hvml
        <archedata name="item_user">
            {
                "id": "$?.attr[data-value]", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr[data-region]"
            },
        </archedata>

        <observe on="#the-user-list" for="change">

            <init as="users">
                [ ]
            </init>

            <iterate on="$@" by="TRAVEL: BREADTH">
                <update on="$users" to="append" with="$item_user" />
            </iterate>
        </observe>
```

上述 HVML 代码在用户清单列表上遍历用户，使用 `item_user` 作为数据模板进行映射，然后将其追加到 `$users` 所在的数组中。

##### 2.6.1.8) 内建执行器的使用

以上描述的内建执行器主要用于选择和迭代。

当内建执行器不生成任何数据项时，
- 用于选择时，结果数据为 `undefined`；
- 用于迭代时，将当前迭代操作出栈。

用于选择时，
- 若执行器仅返回单个数据项，则结果为该数据项；
- 若执行器返回多个数据项，则结果为数组。

SQL 执行器通过 `GROUP BY` 分句，可用于归约。

当我们在归约操作中使用不直接实现归约操作的内建执行器时，通过返回一些隐含的归约信息来应对归约操作。比如，

1. 计数：符合执行语句条件的数据项数目，对应键名为 `count`。
1. 总和：符合执行语句条件的数据项之和），对应键名为 `sum`。
1. 均值：符合执行语句条件的数据项之均值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `avg`。
1. 最大值：符合执行语句条件的数据项之最大值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `max`。
1. 最小值：符合执行语句条件的数据项之最小值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `min`。

此种情况下，归约操作的返回数据将形如：

```json
{
    "count": 5,
    "sum": 400,
    "avg": 90,
    "max": 100,
    "min": 80,
}
```

#### 2.6.2) 外部执行器

外部执行器是由外部程序实现的符合所在动作标签要求的类或者函数，通常用于执行复杂的选择、迭代、归约和排序操作，尤其是无法通过内建执行器实现的某些特殊选择、过滤、归约和排序操作时。

使用外部执行器时，HVML 解释器将根据执行器的类型前缀和当前的动作标签来动态调用对应的函数或者创建对应的类对象来执行相应的操作。HVML 解释器至少应支持如下两类外部执行器：

- `CLASS: <className>@[<moduleName>]`：表示使用模块 `<moduleName>` 中的 `<className>` 类作为执行器，主要用于 `iterate` 动作元素。
- `FUNC: <funcName>@[<moduleName>]`：表示使用模块 `<moduleName>` 中的 `<funcName>` 函数作为执行器，可用于 `choose`、 `iterate`、 `reduce`、 `sort` 和 `update` 动作元素。

HVML 解释器可自行定义上述外部执行器的接口规范，比如对 C/C++ 语言来讲，`<moduleName>` 指共享库，对 Python 语言来讲，`<moduleName>` 指一个可装载模块名。

另外，使用外部执行器时，可使用 `with` 属性指定一个额外的参数。

使用外部执行器时，应用需要在主程序或者外部模块中实现相应的类或者函数。本文档以 Python 语言为例，说明各个外部执行器的实现方法。对于不同于 Python 的脚本语言，比如 C/C++、JavaScript、Lua 等，可参考 Python 的实现进行处理。

##### 2.6.2.1) 外部函数执行器

我们可以使用函数实现所有的外部执行器。以 `Python` 为例，当使用 `by` 介词属性指定一个外部的函数执行器作为选择器、迭代器或规约器时，该执行器必须实现为具有如下原型的函数：

```python
def chooser(on_value, with_value):
```

对应的功能如下所述：

- 作为选择器，源数据（`on` 属性值）应该是一个容器，该函数应该返回源数据中的某项数据。
- 作为迭代器，该函数应该返回基于源数据生成的一个数组，之后的迭代发生在这个数组上。
- 作为规约器，源数据应该是一个容器，该函数应该返回对源数据经过特定的规约处理后的数据，通常是一个对象。

当使用 `by` 介词属性指定一个外部的函数执行器作为排序器时，该执行器必须实现为具有如下原型的函数：

```python
def sorter(on_value, with_value,
        against_value = None, desc = False, caseless = False):
```

也就说，`sort` 元素指定的 `against` 属性之以及 `ascendingly`/`descendingly`、 `casesensitively`/`caseinsensitively` 等副词属性值，通过 `against_value`、`desc` 和 `caseless` 参数传递。

当作为排序器，源数据应该是一个数组或集合，该函数对源数据进行特定的排序处理并返回源数据本身。

比如我们要从全局 `$TIMERS` 变量定义的数据中选择指定的定时器，我们可以使用内建的 SQL 执行器，也可以使用一个外部执行器 `FUNC: ChooseTimer`。

```hvml
    <head>
        <update on="$TIMERS" to="unite">
            [
                { "id" : "foo", "interval" : 1000, "active" : "no" },
                { "id" : "bar", "interval" : 2000, "active" : "no" },
            ]
        </update>
    </head>

    <body>
        ...

        <choose on='$TIMERS' by="FUNC:ChooseTimer" with="foo">
            <update on="$?" at=".active" with="yes" />
        </choose>

        ...

    </body>
```

则 `ChooseTimer` 的实现非常简单——从 `on` 属性指定的数组中查找 `id` 为 `with` 属性值（这里是 `foo`）数组单元，若有，则返回这个数组单元，否则返回 `None`。

```python
def ChooseTimer(on_value, with_value):
    for t in on_value:
        if with_value == t['id']
            return t
    return None
```

再如使用 `reduce` 统计用户分布的示例，对应的外部 `StatsUser` 函数实现如下：

```python
def StatsUser(on_value, with_value):
    stats = {}
    stats.count = 0
    stats.regions = { '中国大陆': 0, '中国台湾': 0, '其他': 0 }

    for item in on_value:
        if item.locale == 'zh_CN':
            stats.regions ['中国大陆'] += 1
        elif item.locale == 'zh_TW':
            stats.regions ['中国台湾'] += 1
        else:
            stats.regions ['其他'] += 1

        count += 1

   return stats
```

##### 2.6.2.2) 外部类执行器

在 `iterate` 动作标签中，除了使用外部函数作为迭代器之外，我们也可以使用由外部类定义的迭代执行器。函数实现的迭代器，需要一次性返回所有待迭代的数据，而类实现的迭代器在每次迭代时被调用获得当前迭代的数据，因此具有更好的灵活性，且在待迭代数据较多时，占用更小的系统资源。

以 Python 语言为例，使用类作为外部迭代器时，必须实现为 `HVMLIterator` 的子类，该类的实现如下：

```python
class HVMLIterator:
    def __init__ (self, on_value, with_value):
        pass

    # implement this method to iterate the data.
    def iterate (self):
        return None

    # implement this method to filter an item.
    def filter (self, curr_item):
        return True
```

`HVMLIterator` 定义了两个方法：

- `iterate`：用于迭代数据，子类必须重载该方法。第一次调用时，该方法返回第一个数据项，之后每调用一次，该方法返回下一个数据项，直到返回 `None` 为止。
- `filter`：用于过滤某些数据项；当 `iterate` 方法产生一个数据项之后，会调用该方法，若返回 `False`，则丢弃当前数据，继续获取下个数据项。子类可不用实现该方法。

比如对下面迭代并克隆模板插入到指定位置的操作：

```hvml
    <archetype name="user_item">
        <li class="user-item">
            <img class="avatar" />
            <span></span>
        </li>
    </archetype>

    ...

        <ul id="the-user-list" class="user-list">
            <iterate on="$users" in="#the-user-list" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <except type=`BadData`>
                    <img src="wait.gif" />
                </except>
                <except type=`NotIterable`>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>

    ...
```

我们可以如下实现 `IUser` 类：

```python
class IUser (HVMLIterator):
    def __init__ (self, on_data, with_value):
        self.on_data = on_data
        self.i = 0;
        self.n = len (on_data)
        pass

    # implement this method to return the next item.
    def iterate (self):
        if self.i < self.n:
            item = self.on_data[i]
            i++
        else:
            item = None

        return item

    # implement this method to filter an item.
    def filter (self, item):
        return True
```

#### 2.6.3) 执行器规则表达式的处理

根据以上描述，我们可以在执行器的规则表达式中使用变量，如下所示：

```hvml
        <init as="fibonacci">
            [0, 1, ]
        </init>

        <iterate on="1" by="ADD: LT 20 BY $fibonacci[-2]">
            <update on="$fibonacci" to="append" with="$?" />
        </iterate>
```

以上 HVML 代码将获得一个斐波那契（Fibonacci）数列：

```json
[0, 1, 1, 2, 3, 5, 8, 13]
```

解释如下：

1. 第一次迭代时，`$fibonacci` 只有初始的两个数值，`$fibonacci[-2]` 的值为 0，所以 `ADD` 执行器的规则为：`LT 20 BY 0`。由于迭代结果的初始值为 1（`on` 属性指定），所以本次迭代的结果为 1。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第二次迭代时，`$fibonacci` 中有三个数值，`$fibonacci[-2]` 的值为 1，所以 `ADD` 执行器的规则为：`LT 20 BY 1`，由于上次迭代的结果是 1，所以求值后的结果为 2。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第三次迭代时，`$fibonacci` 中有四个数值，`$fibonacci[-2]` 的值为 1，所以 `ADD` 执行器的规则为：`LT 20 BY 1`，由于上次的结果是 2，所以求值后的结果为 3。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第四次迭代时，`$fibonacci` 中有五个数值，`$fibonacci[-2]` 的值为 2，所以 `ADD` 执行器的规则为：`LT 20 BY 2`，由于上次的结果是 3，所以求值后的结果为 5。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第五次迭代时，`$fibonacci` 中有六个数值，`$fibonacci[-2]` 的值为 3，所以 `ADD` 执行器的规则为：`LT 20 BY 3`，由于上次的结果是 5，所以求值后的结果为 8。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第六次迭代时，`$fibonacci` 中有七个数值，`$fibonacci[-1]` 的值为 5，所以 `ADD` 执行器的规则为：`LT 20 BY 5`，由于上次的结果是 8，所以求值后的结果为 13。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第七次迭代时，`$fibonacci` 中有八个数值，`$fibonacci[-1]` 的值为 8，所以 `ADD` 执行器的规则为：`LT 20 BY 8`，由于上次的结果是 13，所以求值后的结果为 21。由于该结果不满足 `LT 20` 的条件，所以迭代终止。

需要注意的是，对执行器规则字符串的处理，大致有如下两个阶段：

1. 若规则字符串中包含有求值表达式，则由 HVML 解释器在将规则字符串传递给执行器之前做处理。也就是说，规则字符串中不会包含任何变量信息，但仍然可能包含规则支持的表达式，如四则运算表达式。
1. 执行器要根据情况处理可能的规则变化情况，如上述例子中的规则字符串在不同的迭代中有不一样的值。

另外，某些执行器无法处理规则动态变化的情形，比如 SQL 和 TRAVEL 执行器。

### 2.7) 响应式更新

所谓响应式（responsive）更新，是指对如下的 HVML 代码：

```hvml
    <init as="message">
        "hello, world"
    </init>

    <p>
        $message
    </p>
```

当变量 `$message` 的值被其他 HVML 代码修改时，对应的 HTML 文档将自动更新，而无需使用 `observe` 等元素。

在 HVML 提供的表达式绑定能力支持下，响应式处理的支持变得异常简单。我们只需在外部标签中使用 `hvml:responsively` 副词属性，即可标记该元素的文本内容是响应式的：

```hvml
    <init as="user_name">
        "Tom"
    </init>

    <init as="hello">
        "hello, "
    </init>

    <p hvml:responsively>
        $hello$user_name
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <init as="user_name" with="$?.attr.value" />
    </observe>
```

以上 HVML 代码在运行时，只要用户修改输入框中的内容，将：

1. 输入框中的内容将自动同步到 `$user_name` 变量。
1. `$user_name` 的内容变化，将自动触发输入框之上段落内容的变化。

HVML 解释器通过为需要响应式处理的表达式隐式添加绑定关系，并观察绑定后的变量来实现。比如，以上代码相当于：

```hvml
    <p>
        $hello$user_name

        <bind as="__p_textContent">$hello$user_name</bind>
        <observe on="$__p_textContent" for="change">
            <update on="$@" at="textContent" with="$__p_textContent.eval">
        </observe>
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <init as="user_name" with="$?.attr.value" />
    </observe>
```

使用响应式处理后，开发者不需要显式书写 `bind` 和 `observe` 标签即可获得相同的响应式处理效果，只需要在外部标签中增加 `hvml:responsively` 副词属性即可。

下面的例子，将用户名称和输入框中输入的姓名绑定在一起；通过响应式处理，当用户改变输入框中的内容时，`p` 元素的文本内容将自动改变。

```hvml
    <init as="user_name">
        "Tom"
    </init>

    <p hvml:responsively>
        Hello, $user_name
    </p>

    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="$user_name" />
    <bind on="$DOC.query('#the-user-name')[0].attr.value" as="user_name" />
```

当我们需要针对骨架元素的属性使用响应式更新时，我们使用 `&=` 运算符。如：

```hvml
    <p style &= 'display:$display' hvml:responsively>
        Hello, $user_name
    </p>
```

## 3) HVML 语法

注：本小节内容参考了 HTML 规范：<https://html.spec.whatwg.org/#syntax>。

### 3.1) 书写 HVML 文档

HVML 本质上采用 XML 语法描述程序中的各个元素。HVML 文档的书写需满足如下要点：

1. 始终使用 UTF-8 编码。
1. 使用 XML 语法。
1. 区分大小写。
1. 使用 XHTML 语法书写 HTML 片段或模板。

一个 HVML 程序由如下几个部分组成：

1. 任意数量的注释和 ASCII 空白字符。
1. 一个 `DOCTYPE`。
1. 任意数量的注释和 ASCII 空白字符。
1. 一个以 `hvml` 元素形式定义的文档元素。
1. 任意数量的注释和 ASCII 空白字符。

HVML 程序中的注释有两种形式，一种是 `<!-- 注释内容 -->` 形式的常规注释，一种是脚本语言常用的井号（`#` ）注释。其区别在于：

1. 解析器会解析常规注释，并在最终的 vDOM 树中构造出一个注释节点。
1. 井号注释只能出现在常规注释或者 `DOCTYPE` 之前。任意数量的空白字符加 `#` 字符可定义一个井号注释行，注释行中的所有字符（包括行尾），将被解析器整个忽略。因此，井号注释的内容不会出现在 vDOM 树中。

```
#!/usr/bin/purc
# The above line makes the HVML program can be marked as an executable to
# run it directly on the command line if you installed a correct
# HVML interpreter, e.g., `/usr/bin/purc` in you system.

# This is a comment line
    # This is another comment line

<hvml target="void" lang="$STR.substr($SYS.locale, 0, 2)" >
    {{
        $STREAM.stdout.writelines('Start of `Hello, world!`');
        $STREAM.stdout.writelines($SYS.time('%H:%m'))
    }}

    <!-- This is a multiple-line comments, which will be parsed and form
        a comment node in the ultimate vDOM tree -->
    <head>
        $STREAM.stdout.writelines('Start of `head`')

        <title>$T.get('Hello, world!')</title>

        $STREAM.stdout.writelines('End of `head`')
    </head>

    <body>
        $STREAM.stdout.writelines('Start of `body`')

        <p>$T.get('Hello, HVML!')</p>

        $STREAM.stdout.writelines('End of `body`')
    </body>

    {{
        $STREAM.stdout.writelines('End of `Hello, world!`');
        $STREAM.stdout.writelines($SYS.time('%H:%m'))
    }}
</hvml>
```

#### 3.1.1) DOCTYPE

DOCTYPE 定义了文档格式以及 HVML 标签使用的前缀。

```hvml
<!DOCTYPE hvml>
```

一个 `DOCTYPE` 必须按顺序由如下几个部分组成：

1. 一个由 ASCII 字符组成，且匹配 `<!DOCTYPE` 的字符串，大小写敏感。
1. 一个或多个 ASCII 空白字符。
1. 一个由 ASCII 字符组成，且匹配 `hvml` 的字符串，大小写敏感。
1. 一个可选的 DOCTYPE 系统信息字符串。
1. 零个或多个 ASCII 空白字符。
1. 一个 U+003E GREATER-THAN SIGN 字符（`>`）。

通常书写为`<!DOCTYPE hvml>`，大小写敏感。

在 HVML 文档中，当某个 HVML 标签可能和目标标记语言的标签冲突时，我们可以使用预定义前缀来标记 HVML 的标签，默认使用 `v:` 作为前缀，但我们也可以在 DOCTYPE 中自定义这个前缀。前缀字符串必须以字母打头，以冒号（`:`）结尾。

SYSTEM 标识符字符串的格式如下：

1. 一个或多个 ASCII 空白字符。
1. 一个由 ASCII 字符组成，且匹配 `SYSTEM` 的字符串，大小写敏感。
1. 一个或多个 ASCII 空白字符。
1. 一个 U+0022 QUOTATION MARK 字符（双引号，`"`）或 U+0027 APOSTROPHE 字符（单引号，`'`）。
1. 一个指定系统标识符的字面字符串，由一个或者多个被 U+0020 SPACE 字符（空格，` `）分隔的词元组成，比如 `f: MATH`。第一个词元必须由 ASCII 字母打头并以 U+003A COLON MARK（冒号，`:`）结尾；该词元定义了当前 HVML 文档中使用的外部标签的前缀。其他的词元定义了应该为当前文档装载并绑定的全局变量，比如 `MATH`、 `FILE.FS`、 `FILE.FILE:F` 等。
1. 一个 U+0022 QUOTATION MARK 字符（双引号）或 U+0027 APOSTROPHE 字符（单引号），需匹配先前使用的引号。

比如，如果 DOCTYPE 元素被书写为 `<!DOCTYPE hvml SYSTEM "ext: MATH FILE.FS FILE.FILE:F">`，则可在外部标签之前添加指定的前缀，以免和 HVML 标签名称发生冲突：

```hvml
<!DOCTYPE hvml SYSTEM "ext: MATH FILE:FS FILE:FILE">
<hvml target="html" lang="en">
    <head>
    </head>

    <body>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <init as="databus" with=$STREAM.open('unix:///var/run/hbdbus.sock','default','HBDBus') />

        <header id="theStatusBar">
            <img class="mobile-status" src="" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="" />
            <span class="local-time">12:00</span>
            <img class="battery-status" />
        </header>

        <ext:ul class="user-list">
            <iterate on="$users" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <except type=`NoData`>
                    <img src="wait.png" />
                </except>
                <except type=`NotIterable`>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ext:ul>
     </body>
</hvml>
```

注意，我们通常在目标标记语言定义的标签和 HVML 标签冲突时才使用前缀。

当我们使用 `DOCTYPE` 的 `SYSTEM` 标志符定义需要预先装载的行者级动态对象时，使用 `<pkg_name>`、 `<pkg_name>:<var_name>`、 `<pkg_name>.<obj_name>` 或者 `<pkg_name>.<obj_name>:<var_name>` 这样的表示法。以上四种表示法的含义分别解释如下：

1. 表示从 `<pkg_name>` 对应的共享库中装载名称同包名 `<pkg_name>` 的动态对象，并绑定为名称是 `<pkg_name>` 的行者级变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称同包名 `<pkg_name>` 的动态对象，并绑定为名称是 `<var_name>` 的行者级变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称为 `<obj_name>` 的动态对象，并绑定为名称是 `<obj_name>` 的行者级变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称为 `<obj_name>` 的动态对象，并绑定为行者级变量 `<var_name>`。

如 `DATETIME math:MATH FILE.FS FILE.FILE:F`，表示从：

1. 从 `DATETIME` 库中装载动态对象 `DATETIME` 并绑定到行者级 `DATETIME` 变量。
1. 从 `math` 库中装载动态对象 `MATH` 并绑定到行者级 `MATH` 变量。
1. 从 `FILE` 库中装载动态对象 `FS` 并绑定到行者级 `FS` 变量。
1. 从 `FILE` 库中装载动态对象 `FILE` 并绑定到行者级 `F` 变量。

#### 3.1.2) 元素

根据其功能及用途，HVML 元素可划分为如下几类：

1. 框架元素（framework elements）  
`hvml`、 `head` 和 `body` 元素。此类元素用于定义 HVML 文档的框架结构。
2. 普通元素（normal elements）  
除框架元素之外的其他 HVML 元素，被称为普通元素。普通元素可进一步划分为如下子类：
   1. 数据动作元素（data operation elements）  
      `init` 和 `update` 元素。其内容必须是一个合法的参数化数据。
   1. 一般动作元素（ordinary operation elements）  
       `erase`、 `clear`、 `test`、 `match`、 `choose`、 `iterate`、 `reduce`、 `observe`、 `fire`、 `load`、 `back`、 `define`、 `include`、 `call`、 `return` 和 `catch` 元素。
   1. 片段模板元素（fragment template elements）  
      `archetype`、 `error` 和 `except` 元素。片段模板元素的内容通常是使用目标标记语言书写的文档片段。简称模板元素（template elements）。
   1. 数据模板元素（data template elements）  
      `archedata` 元素。其内容必须是一个合法的参数化数据。
3. 外部元素（foreign elements）  
所有不属于 HVML 标签定义的元素，被视为外部元素。所有可合法插入到 HVML 文档树中的外部元素，可被称为骨架元素（skeleton element）。此类元素中可包含文本内容、其他外部元素以及其他 HVML 普通元素。

根据其语法特点，HVML 元素可划分为如下两类：

1. 名词元素（noun elements）  
包括框架元素、模板元素和数据模板元素。
2. 动作元素（operation elements）  
包括一般动作元素、骨架元素和数据动作元素。

一般动作元素用于定义对数据或文档的操作，可包含其他普通元素以及可作为骨架元素使用的外部元素，但不能定义其文本内容。

数据动作元素用于定义数据内容，可包含其他普通元素以及可作为骨架元素使用的外部元素。当包含有子元素时，其数据内容只能出现一次，且前置于任何子元素之前。如下例所示：

```hvml
    <init as="breakingNews" from="assets/breaking-news-{$SYS.locale}.json" async>
        {
            "title": "This is an absolute breaking news!",
            "shortDesc": "The Zhang family's rooster has laid eggs!",
            "longDesc": 'Yesterday, the second son of the Zhang family came to me and said, "My rooster has laid eggs!"',
            "detailedUrl": "#",
            "time": $SYS.time.iso8601
        }

        <update on="#breaking-news" to="displace" with="$realCardBody" />

        <observe against="breakingNews" for="change:displaced" in="#breaking-news">
            <update on="$@" to="displace" with="$realCardBody" />
        </observe>
    </init>
```

一个模板元素的内容位于该模板元素的起始标签之后，终止标签之前，可包含任意的文本、字符引用、外部元素以及注释，但文本不能包含 U+003C LESS-THAN SIGN (`<`) 或者含糊的 `＆` 符号。

数据模板元素用于定义一个 eJSON 格式的数据模板，其内容定义在该元素的起始标签之后，终止标签之前。

外部元素必须要么同时包含起始标签和终止标签，要么起始标签被标记为自终止。后者情形下，不能包含终止标签。

比如，HTML 的 `<br>` 元素，在 HVML 中作为外部元素使用时，必须书写为：`<br />`。

当一个外部元素的起始标签被标记为自终止时，该元素不能包含任何内容（显然，没有终止标签就无法在起始标签和终止标签之间放置任何内容）。当一个外部元素的起始标签没有被标记为自终止时，该元素中可包含文本、字符引用、HEE、CDATA 段、注释以及其他外部元素或动作元素，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

当一个外部元素包含 `hvml:raw` 属性时，该外部元素中只能包含可转义裸文本，此类元素统称为可转移文本元素（escapable raw text elements）。

可转义裸文本元素中可包含文本和字符引用，但文本中不可包含任何含糊的 & 符号，另有后面所述之限制。

框架和外部元素可包含文本、字符引用、其他普通元素或外部元素以及注释，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

标签包含标签名称，给定了元素的名称。HVML 元素允许使用指定的前缀来避免出现标签名称的冲突。除该前缀中包含的冒号（:）字符之外，标签名称中仅使用 ASCII 字母及数字，且仅使用字母开头。

注意，HVML 标签名称区别大小写。对于外部元素的标签，将保留其大小写形式。

##### 3.1.2.1) 起始标签

起始标签必须具有如下格式：

1. 一个起始标签的第一个字符必须是 U+003C LESS-THAN SIGN 字符（`<`）。
1. 该起始标签其后的几个字符必须是该元素的标签名称。
1. 如果在接下来的步骤中存在任意一个属性，则必须有一个或多个 ASCII 空白字符。
1. 然后，起始标签中可包括一些属性，属性的语法会在后面描述。属性之间必须使用一个或者多个 ASCII 空白字符分隔。
1. 在属性之后，或者没有属性的情况下在标签名称之后，可以包含一个或者多个 ASCII 空白字符。（某些属性要求必须跟随一个空白字符；见后面的属性小节。）
1. 然后，如果该元素是一个空白（void）元素，或者该元素是一个外部元素，则可包含一个 U+002F SOLIDUS 字符（`/`）。该字符对空白元素无效，但对外部元素来讲，表明该起始标签是自关闭的（self-closing）。
1. 最后，起始标签必须由一个 U+003E GREATER-THAN SIGN 字符（`>`）关闭.

##### 3.1.2.2) 终止标签

终止标签必须具有如下格式：

1. 一个终止标签的第一个字符必须是 U+003C LESS-THAN SIGN 字符（`<`）。
1. 一个终止标签的第二个字符必须是 U+002F SOLIDUS 字符（`/`）。
1. 该起始标签其后的几个字符必须是该元素的标签名称。
1. 在标签名称之后，可以有一个或多个 ASCII 空白字符。
1. 最后，终止标签必须由一个 U+003E GREATER-THAN SIGN 字符（`>`）关闭.

##### 3.1.2.3) 属性

一个元素的属性在元素的起始标签中表达。

属性有一个名称和一个值。属性名称必须由一个或者多个不是控制字符、U+0020 SPACE、 U+0022（`"`）、 U+0027（`'`）、 U+003E（`>`）、 U+002F（`/`）、  U+003D（`=`）以及非字符（noncharacter）的字符组成。

属性值一般是文本和字符引用的混合体，且具有额外限制：文本中不能包含含糊的 `&` 符号。

属性可以如下五种方式指定：

1) 空属性语法/Empty attribute syntax

仅仅一个属性名，属性值被隐式指定为空字符串。

在下面的例子中，`uniquely` 属性以空属性语法的形式给定：

```hvml
    <init as="foo" uniquely against="id">
```

如果一个使用空属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

2) 无引号属性值语法/Unquoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 ASCII 空白字符、 U+0022 QUOTATION MARK 字符（`"`）、 U+0027 APOSTROPHE 字符（`'`）、 U+003D EQUALS SIGN 字符（`=`）、 U+003C LESS-THAN SIGN 字符（`<`）、 U+003E GREATER-THAN SIGN 字符（`>`）或者 U+0060 GRAVE ACCENT 字符（`\``），而且不能是一个空字符串。

在下面的例子中，属性由无引号属性值语法的形式给定：

```hvml
    <init as=foo uniquely against=id>
```

如果一个使用无引号属性语法的属性之后跟随另一个属性，或者随后是起始标签语法第 6 步中提到的可选 U+002F SOLIDUS 字符（`/`），则必须使用 ASCII 空白字符来分隔这两个东西。

3) 单引号属性值语法/Single-quoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是单个 U+0027 APOSTROPHE 字符（`'`），随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 U+0027 APOSTROPHE 字符（`'`），最后由第二个单独的 U+0027 APOSTROPHE 字符（`'`）结尾。

在下面的例子中，属性由单引号属性值语法的形式给定：

```hvml
    <init as='foo' uniquely against='id'>
```

如果一个使用单引号属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

4) 双引号属性值语法/Double-quoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是单个 U+0022 QUOTATION MARK 字符（`"`），随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 U+0022 QUOTATION MARK 字符（`"`），最后由第二个单独的 U+0022 QUOTATION MARK 字符（`"`）结尾。

在下面的例子中，属性由双引号属性值语法的形式给定：

```hvml
    <choose on="$2.payload" in="#the-user-list" with="$user_item">
```

如果一个使用双引号属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

5) 反引号属性值语法/Grave-quoted attribute value syntax

反引号属性值语法，通常用于必须使用系统预定义关键词的场合，比如引用某个错误或者异常的名称。此时，

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是单个 U+0060 GRAVE ACCENT 字符（\`），随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 U+0060 GRAVE ACCENT 字符（\`），最后由第二个单独的 U+0060 GRAVE ACCENT 字符（\`）结尾。

在动词标签中，介词属性名之后的 U+003D EQUALS SIGN 字符（`=`）可以省略。

在下面的例子中，属性由反引号属性值语法的形式给定：

```hvml
    <catch for `NoData`>
        ...
    </catch>

    <except type=`NoData`>
        ...
    </except>
```

注意，当使用反引号定义属性值时，必须使用字面的预定义常量，且不做任何求值处理。

如果一个使用反引号属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

---

注意，在动词标签中，介词属性名之后的 U+003D EQUALS SIGN 字符（`=`）可以省略。

在同一起始标签内，不能有两个或更多属性具有相同的属性名。

##### 3.1.2.4) 动作元素属性

在 HVML 中，动作元素的属性值存在如下特殊之处：

1. 动作元素的属性值可分为介词属性（preposition attribute）和副词属性（adverb attribute），这些属性是固有属性。
1. 所有介词属性均需定义对应的属性值，可省略其赋值操作符（U+003D EQUALS SIGN `=`）。
1. 所有副词属性按上述（Empty attribute syntax/空属性语法）表述。
1. 除固有的介词属性及副词属性之外，`update` 标签的 `with` 属性可使用额外的赋值运算符。

所有介词属性（仅在动作元素中）的赋值操作符（`=`）可以被忽略：

```hvml
    <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
        <update at = "textContent" with = "foo" />
    </choose>
```

除了上面所述无引号属性值语法之外，我们还可以在如下情形下省略介词属性值周围的单引号（U+0027 APOSTROPHE `'`）或者双引号（U+0022 QUOTATION MARK `"`）：

1. 当使用参数化数据定义数组或对象作为介词属性值时。如，

```hvml
    <choose on ["zh_CN", "en_US"] to "append update" in #the-user-list with $user_item>
    </choose>
```

或，

```hvml
    <choose on {"zh_CN": 100, "en_US": 50} to "append update" in #the-user-list with $user_item>
    </choose>
```

另外，当使用单引号时，将忽略整个属性值字符串中的所有求值表达式，当做普通字符串处理。

在 `update` 元素中，我们可以针对 `with` 属性使用除 `=` 之外的属性值操作符来改变最终数据：

1. 当 `with` 属性的属性值是字符串类型，且修改动作为 `displace` 时：
   - `+=`：在最终数据中添加一个新的词元（token），若已有该词元，则不做修改。比如，原有的 `attr.class` 的属性值为 `foo`，使用 `at="attr.class" with += "text-warning"` 后，将修改为：`foo text-warning`；若原有属性值为 `foo text-warning`，则会保持不变。
   - `-=`：在最终数据中移除一个词元，若没有该词元，则不做修改。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with -= "text-warning"` 后，将修改为 `foo`。
   - `*=`：在最终数据的每个词元之后（默认）或之前（使用 `^` 前缀字符）追加指定的子字符串。比如，原有的 `attr.class` 的属性值为 `info warning`，使用 `at="attr.class" with *= "^text-"` 后，将修改为：`text-info text-warning`。
   - `/=`：在最终数据中按正则表达式匹配一个词元，并使用第二个词元替换。原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with /= "/^text/ text-info"` 后，将修改为 `foo text-info`。
   - `%=`：在最终数据中精确匹配一个词元，并使用第二个词元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with %= "text-warning text-info"` 后，将修改为 `foo text-info`。
   - `~=`：在最终数据中按指定的通配符模式匹配一个词元，并使用第二个词元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with ~= "text-* text-info"` 后，将修改为 `foo text-info`。
   - `^=`：在最终数据的头部添加指定的属性值。比如，原有的 `attr[data-value]` 的属性值为 `ab`，使用 `at="attr[data-value]" with ^= "C"` 后，将修改为：`Cab`。
   - `$=`：在最终数据的尾部添加指定的属性值。比如，原有的 `attr[data-value]` 的属性值为 `ab`，使用 `at="attr[data-value]" with $= "C"` 后，将修改为：`abC`。
1. 当 `with` 属性的属性值是数值型数据，且修改动作为 `displace` 时：
   - `+=`：将初始的最终数据做数值化处理，然后加上指定的属性值并用结果替代最终数据。
   - `-=`：将初始的最终数据做数值化处理，然后减去指定的属性值并用结果替代最终数据。
   - `*=`：将初始的最终数据做数值化处理，然后乘以指定的属性值并用结果替代最终数据。
   - `/=`：将初始的最终数据做数值化处理，然后除以指定的属性值并用结果替代最终数据。
   - `%=`：将指定的属性值强制转换为无符号整数：若值为零，用零取代最终数据；若值不为零，则将初始的最终数据做数值化处理，然后用该无符号整数值对最终数据作取模操作并用结果替代最终数据。
   - `~=`：将初始的最终数据（x）做数值化处理，对指定的属性值（y）做数值化处理，对 x 做四舍五入处理，保留 y 位小数，用结果替代最终数据。当 y 是零或者负数时，相当于浮点数的 `round` 操作。
   - `^=`：对初始最终数据（x）和指定的属性值（y）做数值化处理，求 x 的 y 次幂，用结果替代最终数据。
   - `$=`：对初始最终数据（x）和指定的属性值（y）做数值化处理，求 x / y 的余数，用结果替代最终数据。

上述说明中所指词元（token），通常指一个长度不为零的字符序列，其中的字符为 ASCII 字母、ASCII 数字、或者减号（`-`）、连字符（`_`），词元之间由一个或多个空白字符分隔。但在具体的实现中，不包含任何空白字符的可打印字符串视作一个完整的词元。

如，

```hvml
    <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
        <update at="attr.class" with %= "text-* text-info" />
    </choose>
```

注意，动作元素的介词属性，通常会被解释器视作字符串或参数化字符串并在求值后使用，但存在如下例外：

- 所有动作元素的 `on` 和 `with` 属性，若赋值操作符（=）被忽略且使用无引号属性值语法时，或者使用其他语法情形下且以 `[`、 `{` 或以求值表达式打头时，将被视作一个参数化数据处理；否则按字符串或参数化字符串处理。
- `iterate` 元素的 `onlyif` 和 `while` 属性，若赋值操作符（=）被忽略且使用无引号属性值语法时，或者使用其他语法情形下，以 `[`、 `{` 或以求值表达式打头时，将被视作一个参数化数据处理；否则按字符串或参数化字符串处理。

如下是省略赋值操作符的情形：

```hvml
    <!-- 将 $i 初始化为布尔值 true -->
    <init as i with true />

    <!-- 将 $i 初始化为长整型 100L -->
    <init as i with 100L />

    <!-- 将 $i 初始化为字符串 `false` -->
    <init as i with 'false' />

    <!-- 将 $i 初始化为字符串 "100L-zh_CN" -->
    <init as i with "100L-$SYS.locale" />

    <!-- 使用复合求值表达式的结果初始化 $i，如字符串 "zh_CN" -->
    <init as i with {{ $REQ.locale || $SYS.locale }} />

    <!-- 使用复合求值表达式的结果初始化 $i，如字符串 "zh_CN" -->
    <init as i with "{{ $REQ.locale || $SYS.locale }}" />

    <!-- 使用参数化数据，将 $i 初始化为数组 -->
    <init as i with [0, 1, true, false] />

    <!-- 使用参数化数据，将 $i 初始化为数组 -->
    <init as i with "[0, 1, true, false]" />

    <!-- 使用参数化数据，将 $i 初始化为对象 -->
    <init as i with '{ a: 1, b: 2 }' />

    <!-- 使用参数化数据，将 $i 初始化为对象 -->
    <init as i with { a: 1, b: 2 } />

    <!-- 非指定字符打头，将 $i 初始化为参数化字符串，结果为 " [0, 1, true, false]" -->
    <init as i with " [0, 1, true, false]" />
```

如下是不省略赋值操作符的情形：

```hvml
    <!-- 将 $i 初始化为字符串 "true" -->
    <init as i with=true />

    <!-- 将 $i 初始化为字符串 "100L" -->
    <init as i with=100L />

    <!-- 将 $i 初始化为字符串 `false` -->
    <init as i with='false' />

    <!-- 将 $i 初始化为字符串 "100L-zh_CN" -->
    <init as i with="100L-$SYS.locale" />

    <!-- 使用参数化数据，将 $i 初始化为数组 -->
    <init as i with=[0, 1, true, false] />

    <!-- 使用参数化数据，将 $i 初始化为数组 -->
    <init as i with="[0, 1, true, false]" />

    <!-- 使用参数化数据，将 $i 初始化为对象 -->
    <init as i with='{ a: 1, b: 2 }' />

    <!-- 使用参数化数据，将 $i 初始化为对象 -->
    <init as i with={ a: 1, b: 2 } />

    <!-- 非指定字符打头，将 $i 初始化为参数化字符串，结果为 " [0, 1, true, false]" -->
    <init as i with=" [0, 1, true, false]" />
```

注意，所有动作元素的一般属性（既非介词属性，也非副词属性），均被解释器视作字符串或参数化字符串；所有名词元素和外部元素的属性，均被解释器视作字符串或参数化字符串。

##### 3.1.2.5) 可选标签

要求使用严格的 XML 语法，所以，原则上不能省略任何标签，但有如下所述的特殊情形。

1) 整个省略 `DOCTYPE`

我们可以整个省略 `DOCTYPE` 元素。此种情况下，解析器按如下默认的 `DOCTYPE` 处理：

```
<!DOCTYPE hvml SYSTEM "f:">
```

2) 整个省略 `head` 元素

我们可以整个省略 `head` 元素。此种情况下，若目标文档支持 `head` 元素，将在目标文档中创建一个空的 `head` 元素。

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <body>
        ...
    </body>
</hvml>
```

3) 整个省略 `body` 元素

我们可以整个省略 `body` 元素。此种情况下，我们无法通过指定 `body` 的 `id` 属性来执行不同的本体代码。若目标文档支持 `body` 元素，则将在目标文档中创建一个空的 `body` 元素，且 HVML 程序生成的目标文档内容，将插入到 `body` 元素内。若目标文档不支持 `body` 元素，则生成的内容将插入到目标文档的根元素内。

```hvml
<!DOCTYPE hvml SYSTEM 'f: MATH'>
<hvml target="void">
    <iterate on 0 onlyif $L.lt($0<, 10) with $MATH.add($0<, 1) >
        $STREAM.stdout.writelines(
                $STR.join($0<, ") Hello, world! --from COROUTINE-", $CRTN.cid))
    </iterate>
</hvml>
```

4) 自动关闭外部元素

如下所示由外部元素定义的 HVML 片段：

```hvml
    <div>
        <p>台湾是中国领土<strong>不可分割的一部分！
    </div>
```

我们省略了 `</strong>` 和 `</p>` 终止标签，上述片段将被解析为：


```hvml
    <div>
        <p>台湾是中国领土<strong>不可分割的一部分！</strong></p>
    </div>
```

注意，HVML 解析器不能处理 HTML 规范定义的可选标签处理规则。如：

```hvml
    <ul>
        <li>苹果
        <li>菠萝
        <li>香蕉
    </ul>
```

按照 HTML 规范，应被解析为：

```hvml
    <ul>
        <li>苹果</li>
        <li>菠萝</li>
        <li>香蕉</li>
    </ul>
```

但会被 HVML 解析器解析为：

```hvml
    <ul>
        <li>苹果
            <li>菠萝
                <li>香蕉</li>
            </li>
        </li>
    </ul>
```

##### 3.1.2.6) 裸文本元素和可转义裸文本元素的内容限制

裸文本元素和可转义裸文本元素中的文本不能包含任何以 `</`（U+003C LESS-THAN SIGN, U+002F SOLIDUS）打头，且跟随以 ASCII 字母打头的标签名称以及 U+0009 CHARACTER TABULATION (tab)、U+000A LINE FEED (LF)、U+000C FORM FEED (FF)、U+000D CARRIAGE RETURN (CR)、U+0020 SPACE、U+003E GREATER-THAN SIGN (`>`)，或者 U+002F SOLIDUS (`/`) 字符之一的字符串。

##### 3.1.2.7) 数据内容和数据属性

HVML 的 `init` 和 `archedata` 元素中包含的文本内容必须为一个合法的参数化数据。如：

```hvml
<init as="foo">
    [
        "<p>There is an unrecoverable error!</p>",
        "<p>The exception message: $?.messages</p>"
    ]
</init>
```

对这类元素的内容，我们称为数据内容。需要说明的是，我们需要使用自包含的语法来描述数据内容，不会像裸文本那么随意，故而可包含 `</` 等字符，因为这些字符通常包含在引号包裹的字符串中，而不会出现在其他位置。

另外，在动作元素的 `on`、 `with` 等属性值中指定操作数据时，我们也可直接使用参数化数据，如：

```hvml
<choose on='[$foo, $bar, true, false, null]'>
</choose>
```

对这类属性，我们称为数据属性，数据属性的值使用合法的参数化数据表述。

在其他的属性值中，使用参数化字符串，如：

```hvml
<init as='foo' with="foo-$bar" />
```

在定义文档片段模板时，其内容将被整个视作一个参数化字符串，如：

```hvml
<archetype name="foo">
    <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
        <img class="avatar" src="$?.avatar" />
        <span>$?.name</span>
    </li>
</archetype>
```

#### 3.1.3) 文本

在元素内部、属性值和注释中允许使用文本。有关文本使用的限制和使用文本的地方有关，并在其他小节中描述。

##### 3.1.3.1) 新行

HVML 中的新行必须表达为 U+000D CARRIAGE RETURN（CR）字符、U+000A LINE FEED（LF）字符，或者成对出现的 U+000D CARRIAGE RETURN（CR）和 U+000A LINE FEED（LF）字符。

在允许字符引用的情况下，U+000A LINE FEED 字符（但非 U+000D CARRIAGE RETURN 字符）的字符引用亦可表达一个新行。

#### 3.1.4) 字符引用

在其他小节描述的特定情况下，文本中可混有字符应用。当文本中不能合法地包含某些字符时，字符引用可用于转义。

字符引用必须由一个 U+0026 AMPERSAND 字符（`&`）起始，之后是三种可能的字符引用类型：

1) 被指名的字符引用/Named character references

`&` 字符之后必须跟随 [HTML Specification] 中“被指名的字符引用”一节中给定的名称，且必须使用相同的大小写形式。名称必须是被 U+003B SEMICOLON 字符（`;`）终止的。

2) 十进制编号的字符引用/Decimal numeric character reference

`&` 字符之后必须跟随一个 U+0023 NUMBER SIGN 字符（`#`），随后是一个或者多个 ASCII 数字，这些数字表示一个十进制的整数，对应于 下面的定义被允许的码点。数字之后必须由一个 U+003B SEMICOLON 字符（`;`）终止。

3) 十六进制编号的字符引用/Hexadecimal numeric character reference

`&` 字符之后必须跟随一个 U+0023 NUMBER SIGN 字符（`#`），随后是一个 U+0078 LATIN SMALL LETTER X 字符（`x`）或一个 U+0058 LATIN CAPITAL LETTER X 字符（`X`），随后是一个或多个 ASCII 十六进制数字，这些数字表示一个十六进制的整数，对应于 下面的定义被允许的码点。数字之后必须由一个 U+003B SEMICOLON 字符（`;`）终止。

上面描述的两种编号的字符引用形式，不允许引用 U+000D CR、非字符（noncharacter）以及除 ASCII 空白字符之外的控制字符，其他任意码点均可引用。

一个含糊的 `&` 字符是指，一个 U+0026 AMPERSAND 字符（`&`）之后跟随一个或多个 ASCII 字母及数字，随后是一个 U+003B SEMICOLON 字符（`;`），但这些字符并不能匹配 [HTML Specification] “被指名的字符引用”一节中给定的名称。

#### 3.1.5) CDATA 段落

CDATA 段落必须按给定的顺序包含如下组件：

1. 字符串 `<![CDATA[`。
1. 可选的文本，但文本中不能包含字符串 `]]>`。
1. 字符串 `]]>`。

CDATA 段落只能用于外部内容。在下面的例子中，CDATA 段落被用于转义 MathML `ms` 元素的内容：

```hvml
<p>You can add a string to a number, but this stringifies the number:</p>
<math>
 <ms><![CDATA[x<y]]></ms>
 <mo>+</mo>
 <mn>3</mn>
 <mo>=</mo>
 <ms><![CDATA[x<y3]]></ms>
</math>
```

#### 3.1.6) 注释

注释必须具有如下的格式：

1. 字符串 `<!--`。
1. 可选文本，但文本中不能以字符串 `>` 打头，也不能以字符串 `->` 打头，也不能包含 `<!--`、 `-->` 或者 `--!>` 字符串，也不能以字符串 `<!-` 结尾。
1. 字符串 `-->`。

### 3.2) 解析 HVML 文档

（待公开文档）。

## 4) 应用示例

本文档所有示例是针对 Web 应用的。在这种应用场景中，我们可以使用 Python 或者其他任意的脚本程序来替代 JavaScript 开发 Web 前端应用。本节我们介绍 HVML 的其他一些应用场景。

### 4.1) 使用 HVML 开发传统 GUI 应用

我们假设有一个 GUI 系统，使用 XML 来描述界面上的构件（widget）。现在，我们要使用这个 GUI 系统开发一个简单的文件打开对话框，大致的界面需求如下：

1. 有一个列表框（Listbox），其中列出了当前路径下的目录及文件（统称为目录项）。用户可使用鼠标或者键盘切换列表框中的当前选中项，并产生一个选中项改变的事件。
1. 在该列表框的顶部，有一个文本标签（Label），其中显示了当前的路径。
1. 当用户点击列表框下面的“Open"按钮（Button）时，若列表框的当前选中项是目录，则进入这个目录，修改用于显示当前路径的文本标签内容，并使用新路径下的目录项填充列表框，若当前选中项是一个文件，则返回选中的这个文件。

对上述界面和交互需求，我们通常可以使用如下的 XML 文件描述：

```xml
<ui>
    <label id="path">
        /home
    </label>

    <listbox id="entries">
        <item class="dir">..</item>
        <item class="dir">vincent</item>
        <item class="dir">david</item>
        <item class="file">README.txt</item>
    </listbox>

    <button id="open">
        Open
    </button>
</ui>
```

注意，为简单起见，我们没有引入有关构件布局的描述信息。

为满足以上的交互处理需求，我们使用 HVML 来描述这个界面的动态生成以及交互过程：

```hvml
<!DOCTYPE hvml>
<hvml target="xml">

    <body>
        <init as="fileInfo">
            {
                "curr_path": "/home/",
                "selected_type": "dir",
                "selected_name": "..",
            }
        </init>

        <label id="path">
            $fileInfo.curr_path
        </label>

        <archetype name="dir_entry">
            <item class="$?.type">$?.name</item>
        </archetype>

        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" in="#entries" by="RANGE: 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <call on="$fillDirEntries" with="$fileInfo.curr_path" />
        </listbox>

        <button id="open">
            Open
        </button>

        <observe on="#entries" for="selected-item-changed">
            <update on="$fileInfo" at=".selected_type .selected_name" with ["$?.type", "$?.name"] />
        </observe>

        <observe on="#open" for="click">
            <test on="$fileInfo.selected_type">
                <match for="AS 'dir'" exclusively>
                    <init as="new_path">
                        "$fileInfo.curr_path{$2.name}/"
                    </init>

                    <clear on="#entries" />
                    <call on="$fillDirEntries" with="$new_path" />
                    <update on="$fileInfo" at=".curr_path" with="$new_path" />
                    <update on="#path" at="textContent" with="$new_path" />
                </match>
                <match for="AS 'file'" exclusively>
                    <back to="_last" with="$fileInfo" />
                </match>
            </test>
        </observe>
    </body>
</hvml>
```

下面对上述 HVML 代码的重点部分做一些说明。

首先，该代码使用了一个全局的 `$fileInfo` 变量来记录当前路径（初始为 `/home/`）以及当前选中目录项的类型（初始为 `dir`）和名称（初始为 `..`）。当用户在列表框中选择新的目录项时，会观察到 `selected-item-changed` 事件，并更新 `$fileInfo` 中的 `selected_type` 和 `selected_name` 键值。该事件的 `payload` 键值示例如下：

```json
    {
        "type": "dir",
        "name": "david",
    }
```

其次，该代码使用了 `choose` 元素以及一个外部执行器（`CLASS: CDirEntries`）来获得当前路径中的所有目录项。返回的结果数据大致为：

```json
    [
        { "type": "dir", "name": "david" },
        { "type": "dir", "name": "vincent" },
        { "type": "file", "name": "README.txt" },
    ]
```

在上述结果之上，使用 `iterate` 元素填充列表框。

最后，当用户点击 `Open` 按钮时，上述代码会观察到 `clicked` 事件。在处理该事件时，通过检查 `$fileInfo.selected_type` 来完成相应的工作：

- 如果当前选中的目录项类型是目录，则切换到该目录。此时，会首先清空列表框，然后再使用新路径下的目录项填充列表框。
- 如果当前选中的目录项类型是文件，则使用 `back` 标签返回上个 HVML 程序，同时返回 `fileInfo` 数据。

在上述代码中，外部选择器 `CDirEntries` 的实现非常简单，就是列出给定路径下的目录项，并按照要求返回一个字典数组。使用 Python 实现时非常简单，所以这里略去不谈。

如果我们使用 HybridOS 中提到的直接执行本地系统命令的扩展图式（lcmd），我们甚至都不需要编写任何代码，而只需要使用 `init`：

```hvml
    <init as="lcmdParams">
        { "cmdLine": "ls $fileInfo.curr_path" }
    <init>

    <init from="lcmd:///bin/ls" with="$lcmdParams" via="GET" as="files" temporarily>
        <iterate on="$files" in="#entries" by="RANGE: 0">
            <update on="$@" to="append" with="$dir_entry" />
        </iterate>
    </init>
```

如此，开发者不需要做编写任何程序，即可实现一个简单的文件浏览和打开对话框。

### 4.2) 云应用

HVML 的潜力绝对不止上述示例所说的那样。在未来，我们甚至可以将 HVML 代码运行在云端，通过云端控制设备上的界面显示，从而形成一个新的云应用解决方案。

我们假设一个智能手环上显示当前时间、当地气温、佩戴者的心跳信息和步数信息等信息，而这个智能手环通过 MQTT（一种轻量级消息通讯协议）和云端服务器交换信息，比如向云端服务器发送佩戴者的心跳和步数信息、地理位置信息，获得时间以及当前位置的气象条件等信息。在传统的实现方式中，我们一般需要开发一个在智能手环上运行的 GUI 系统，然后和云端通讯获得数据，界面的修改完全由设备端代码负责。如果要改变界面的样式，大部分情况下需要升级整个智能手环的固件（firmware）。

但如果我们使用 HVML，则可以通过云端来控制设备的界面显示。运行在云端的 HVML 代码如下所示：

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <init as="braceletInfo" with=$STREAM.open('tcp://foo.bar:1300','default','mqtt') />

        <update on="$TIMERS" to="unite">
            [
                { "id" : "clock", "interval" : 1000, "active" : "yes" },
            ]
        </update>

        <link rel="stylesheet" type="text/css" href="/foo/bar/bracelet.css">
    </head>

    <body>
        <div class="clock" id="clock">
            <observe on="$TIMERS" for="expired:clock">
                <update on="#clock" at="textContent" with="$SYS.time('%H:%m')" />
            </observe>
        </div>

        <div class="temperature" id="temperature">
            <choose on=$braceletInfo.subscribe('temperature')>
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#temperature" at="textContent" with="$?.value ℃" />
                </observe>
            </choose>
        </div>

        <div class="heartbeat" id="heartbeat">
            <choose on=$braceletInfo.subscribe('heartbeat')>
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#heartbeat" at="textContent" with="$?.value BPM" />
                </observe>
            </choose>
        </div>

        <div class="steps" id="steps">
            <choose on=$braceletInfo.subscribe('steps')>
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#steps" at="textContent" with="$?.value" />
                </observe>
            </choose>
        </div>

        <observe on="$braceletInfo">
            <choose on="$?" by="CLASS: CDumpEvent" />
        </observe>
    </body>
</hvml>
```

其要点如下：

1. 该代码生成的 HTML 文档或者对 HTML 文档的改变，将通过类似 WebSocket 的长连接发送给设备，设备根据此信息重新渲染用户界面。
1. 该代码监听智能手环（设备）通过 MQTT 发送给云端的数据，包括心跳、气温、步数等信息，并更新相应的标签内容。
1. 该代码设定了一个定时器，每隔 1 秒运行一次，并更新时钟对应的标签内容。
1. 该代码使用了一个外部选择执行器 `CDumpEvent` 将所有来自 `mqtt` 的事件转储到了云端数据库中。

这带来了如下显著的改变：

1. 复杂的逻辑代码将全部运行在云端，设备端只要有一个足够功能的 HTML/XML 用户代理即可，通常只需要包含一个根据 DOM 树和 CSS 来渲染最终用户界面的渲染器。
1. 当我们需要调整设备端的显示效果或者功能时，我们只需要修改 HVML 代码，而不需要更新设备端的固件。
1. 我们还可以通过外部程序，将运行在云端的其他功能，如数据库存储、数据的分析以及人工智能等要素有机整合在一起。

## 5) 总结

本文所描述的 HVML，是一种通用、完备、优雅的数据驱动动态标记语言。其主要优点可总结如下：

1. 通过为数不多的动作标签定义了数据驱动的 HTML/XML 文档生成规则，避免使用基于流程控制的传统编程方法，开启了一种新的低代码编程模式。
1. 通过动作标签的介词属性和副词属性，规定了执行动作所需要的数据和动作类型以及规则，便于开发者理解和掌握，从而降低了学习门槛。
1. 为除了 JavaScript 脚本语言之外的其他脚本语言（或编程语言），提供了利用 Web 技术（HTML、CSS、HTTP、WebSocket 等）开发应用程序的框架和设施。
1. 通过丰富的内建执行器，通过诸如 KEY、RANGE、TRAVEL、SQL 等语句在元素和数据上执行迭代、过滤、排序、归约等操作，使开发者可以专心于业务逻辑的实现，而非具体的算法。
1. 通过外部执行器，为复杂数据的处理提供了使用外部程序实现相应功能的方法，提高了可扩展性。
1. 通过绑定外部程序模块，提供了可扩展、灵活的动态对象实现方法，结合本文定义的参数化数据表达方法，可用于满足各种基于函数调用的计算需求。
1. 解决了构建在现有 Web 技术之上的虚拟 DOM 技术存在的打补丁式解决方案引入的问题，比如代码的可读性降低，结构不清晰等问题。

## 附录

### 附.1) 修订记录

发布历史：

- 2023 年 05 月 31 日：发布 V1.0 RCc，标记为 'v1.0-rcc-230531'。
- 2023 年 04 月 30 日：发布 V1.0 RCb，标记为 'v1.0-rcb-230430'。
- 2023 年 03 月 31 日：发布 V1.0 RCa，标记为 'v1.0-rca-230331'。
- 2022 年 12 月 31 日：发布 V1.0 RC9，标记为 'v1.0-rc9-221231'。
- 2022 年 11 月 30 日：发布 V1.0 RC8，标记为 'v1.0-rc8-221130'。
- 2022 年 10 月 31 日：发布 V1.0 RC7，标记为 'v1.0-rc7-221031'。
- 2022 年 09 月 01 日：发布 V1.0 RC6，标记为 'v1.0-rc6-220901'。
- 2022 年 07 月 01 日：发布 V1.0 RC5，标记为 'v1.0-rc5-220701'。
- 2022 年 06 月 01 日：发布 V1.0 RC4，标记为 'v1.0-rc4-220601'。
- 2022 年 05 月 01 日：发布 V1.0 RC3，标记为 'v1.0-rc3-220501'。
- 2022 年 04 月 01 日：发布 V1.0 RC2，标记为 'v1.0-rc2-220401'。
- 2022 年 02 月 09 日：发布 V1.0 RC1，标记为 'v1.0-rc1-220209'。

#### RCc) 230531

##### RCc.1) 新增渲染器事件

主要修订内容如下：

1. 新增 `rdrState:pageActivated` 事件。
1. 新增 `rdrState:pageDeactivated` 事件。

相关章节：

- [2.1.6.3) 预定义变量](#2163-预定义变量)

#### RCb) 230430

##### RCb.1) 调整页面及工作区的名称规范

主要修订内容如下：

1. 新增 `_default`、`_active` 等工作区保留名称。
1. 将 `_null`、`_inherit`、`_self` 等页面名称调整为页面类型，并不再使用下划线前缀。

相关章节：

- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)

##### RCb.2) 调整渲染器相关事件

主要修订内容如下：

1. 新增 `rdrState:pageLoaded` 事件。

相关章节：

- [2.1.6.3) 预定义变量](#2163-预定义变量)

##### RCb.3) 指定 HTTP 自定义请求头部的方法

主要修订内容如下：

1. 使用 `RAW-HEADER` 来声明请求参数为自定义的 HTTP 请求头部

相关章节：

- [2.5.1) `init` 标签](#251-init-标签)

##### RCb.4) 调整 `hvml:` 图式

主要修订内容如下：

1. 细化 `hvml:` 图式的翻译规则。

相关章节：

- [2.1.19.1) `hvml` 图式](#21191-hvml-图式)

#### RCa) 230331

##### RCa.1) 调整 `DOCTYPE` 的 `SYSTEM` 标识符规则

主要修订内容如下：

1. 当使用 `DOCTYPE` 的 `SYSTEM` 标识符规则装载外部模块时，将对应的动态对象绑定到行者级变量上。

相关章节：

- [3.1.1) DOCTYPE](#311-doctype)

##### RCa.2) 调整 `catch` 动作元素的结果

主要修订内容如下：

1. `catch` 动作元素的结果，需定义为一个描述异常信息的对象。

相关章节：

- [2.5.14) `catch` 标签](#2514-catch-标签)

##### RCa.3) 微调 `update` 动作元素

主要修订内容如下：

在指定源数据时，当源数据必须为线性容器（数组、元组或集合）时，亦可将单个数据视作仅包含一个成员的数组对待，以方便编程。

相关章节：

- [2.5.2) `update` 标签](#252-update-标签)

#### RC9) 221231

##### RC9.1) 定义骨架元素属性的响应式处理语法

主要修订内容如下：

1. 使用 `&=` 运算符，用于指定骨架元素的特定属性是响应式的。

相关章节：

- [2.7) 响应式更新](#27-响应式更新)

##### RC9.2) 文档片段的结构化数据表达

主要修订内容如下：

1. 使用 `dataContent` 替代 `jsonContent`。
1. 移除 `style.width` 这类虚拟键名。
1. 移除 `content[<index>]` 这类虚拟键名。

相关章节：

- [2.1.17) 文档片段的结构化数据表达](#2117-文档片段的结构化数据表达)

##### RC9.3) 调整 `update` 元素相关细节

主要修订内容如下：

1. 增加了 `add` 动作，可用于集合。
1. 调整 `remove` 动作，可用于集合。
1. 调整 `merge`、`unite`、`overwrite`、`intersect`、`subtract`、`xor` 等动作，可用于对象。

相关章节：

- [2.5.2) `update` 标签](#252-update-标签)

##### RC9.4) 调整 `request` 元素相关细节

主要修订内容如下：

1. 调整了协程令牌相关的描述。
1. 调整了 `$RDR` 预定义变量的描述。

相关章节：

- [2.5.16) `request` 标签](#2516-request-标签)
- [2.1.6.3) 预定义变量](#2163-预定义变量)

#### RC8) 221130

##### RC8.1) 反引号属性值语法

主要修订内容如下：

1. 使用反引号属性值语法定义异常或错误名称。

相关章节：

- [2.1.12) 错误和异常的处理](#2112-错误和异常的处理)
- [2.4.3) `error` 标签](#243-error-标签)
- [2.4.4) `except` 标签](#244-except-标签)
- [2.5.14) `catch` 标签](#2514-catch-标签)
- [3.1.2.3) 属性](#3123-属性)

##### RC8.2) 新的数据类型别名

主要修订内容如下：

1. 新增 `linctnr` 作为线性容器类型的别名。

相关章节：

- [2.2.4) 动态对象方法的描述语法](#224-动态对象方法的描述语法)

##### RC8.3) 框架元素中的副词属性

主要修订内容如下：

1. 框架元素（`hvml`、`head`、`body`）中使用的所有 HVML 副词属性，均不应该克隆到目标文档中。
1. `hvml` 标签中的 `target` 属性，也不应该克隆到目标文档中。

相关章节：

- [2.3) 框架标签详解](#23-框架标签详解)

##### RC8.4) 杂项

主要修订内容如下：

1. 扩展 JSON 语法，支持三单引号（`'''`）。
1. 微调字符串化处理规则，避免使用新行符，转而使用逗号和分号。
1. 规范术语：
   - 求值表达式：Hybrid evaluation expression (HEE)。
   - 复合求值表达式：Compound hybrid evaluation expression（CHEE）。
   - 参数化数据：Parameterized Data。
   - 参数化字符串：Parameterized String。
1. `$EJSON` 重命名为 `$DATA`。
1. `$DATA.numberify` 重命名为 `$DATA.numerify`。
1. 调整有关求值表达式语法、eJSON 语法的章节。

相关章节：

- [2.1.4.3) 字符串化](#2143-字符串化)
- [2.2.5) eJSON 语法](#225-ejson-语法)

#### RC7) 221031

##### RC7.1) 替身表达式

主要修订内容如下：

1. 引入替身表达式（substitute expression）术语
1. 增强 `bind` 标签以支持替身表达式
1. 新增 `constantly` 副词属性
1. 新增变量名约定一节

相关章节：

- [2.1.6.13) 表达式变量和替身表达式](#21613-表达式变量和替身表达式)
- [2.1.6.14) 变量名约定](#21614-变量名约定)
- [2.5.13) `bind` 标签](#2513-bind-标签)
- [2.1.14) 副词属性](#2114-副词属性)

##### RC7.2) 调整变量一节

主要修订内容如下：

1. 重新划分子小节内容。
1. 允许在需要避免使用尖括号作为上下文变量的情形下，可使用 `$~` 替代 `$<`。
1. 使用术语 `未确定`（取代`未定义`），用于说明上下文变量未被赋值时的初始状态。

相关章节：

- [2.1.6) 变量](#216-变量)

##### RC7.3) 调整定义元组的 eJSON 语法

主要修订内容如下：

1. 使用 `[!` 和 `]` 包围定义元组；保留 `( ... )` 用于定义常见的数学或者逻辑表达式。

相关章节：

- [2.1.15) 引用元素或数据](#2115-引用元素或数据)
- [2.2.5) eJSON 语法](#225-ejson-语法)

##### RC7.4) 调整副词属性的名称

主要修订内容如下：

1. 增加了 `constantly`、`concurrently`、`responsively` 等副词属性的简写形式。
1. 增加了 `noreturn`、`nosetotail` 的等价书写形式。

相关章节：

- [2.1.14) 副词属性](#2114-副词属性)

##### RC7.5) 介词属性的增强

主要修订内容如下：

1. 增加了 `idd-by` 介词属性，用于设定动词元素的标识符，以避免在动词元素中使用名词属性 `id`。

相关章节：

- [2.1.13) 介词属性](#2113-介词属性)

#### RC6) 220901

##### RC6.1) 增强变量名

主要修订内容如下：

1. 允许在变量名中使用 Unihan 表意字符

相关章节：

- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)

##### RC6.2) 增强 `request` 标签

主要修订内容如下：

1. 增强 `request` 标签，允许向其他行者的主协程发送请求。
1. 增强 `request` 标签，允许向其他行者的指定通道发送数据。

相关章节：

- [2.5.16) `request` 标签](#2516-request-标签)

##### RC6.3) 调整 HVML URI 图式

主要修订内容如下：

1. 调整 `hvml+cor` 图式为 `hvml+run` 图式。
1. 增强 `hvml+run` 图式，使之可以用来指定协程或者通道。

相关章节：

- [2.1.19.2) `hvml+run` 图式](#21192-hvmlrun-图式)
- [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)

##### RC6.4) 新增元组容器类型

主要修订内容如下：

1. 使用元组定义容量固定的线性容器。

相关章节：

- [2.1.3) 扩展数据类型](#213-扩展数据类型)
- [2.2.5) eJSON 语法](#225-ejson-语法)

##### RC6.5) 重新求值

主要修订内容如下：

1. 增加对重新求值的描述
1. 增加对协程调度时机的描述

相关章节：

- [2.1) 基本原理](#21-基本原理)
- [2.1.8) 栈式虚拟机](#218-栈式虚拟机)
- [2.1.6.3) 预定义变量](#2163-预定义变量)

#### RC5) 220701

##### RC5.1) 调整对 `include` 标签的描述

主要修订内容如下：

1. 补充针对就地执行的描述。

相关章节：

- [2.5.10) `define` 和 `include` 标签](#2510-define-和-include-标签)

##### RC5.2) 调整 `request` 标签

主要修订内容如下：

1. 调整了使用 `request` 标签向其他协程发送请求的处理模型。
1. 在 `to` 属性值中，可使用 `get:` 和 `set:` 前缀用来获取或者设置元素的动态属性值。
1. 向渲染器发送请求时，使用预定义变量 `$RDR`。

相关章节：

- [2.5.16) `request` 标签](#2516-request-标签)
- [2.1.6.3) 预定义变量](#2163-预定义变量)

##### RC5.3) 调整 `load` 和 `call` 标签

主要修订内容如下：

1. `load` 支持在指定的行者中创建新的协程来执行指定的 HVML 程序。
1. `load` 和 `call` 标签统一使用 `within` 属性指定新的行者名称。
1. `load` 标签中，使用新增的 `onto` 属性指定渲染器页面信息。
1. `$CRTN` 预定义变量上的 `idle` 以及渲染器事件。
1. `load` 和 `call` 异步执行时，返回值为代表新协程的原生实体，该原生实体应提供 `id` 属性，用于返回新协程的标识符。

相关章节：

- [2.1.13) 介词属性](#2113-介词属性)
- [2.5.12) `call` 和 `return` 标签](#2512-call-和-return-标签)
- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)
- [2.1.6.3) 预定义变量](#2163-预定义变量)

##### RC5.4) HVML URI 图式及协程描述符

主要修订内容如下：

1. `hvml` 图式
1. `hvml+cor` 图式
1. 协程描述符

相关章节：

- [2.1.19) HVML URI 图式](#2119-hvml-uri-图式)
- [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)

##### RC5.5) 增强 `sort` 标签

主要修订内容如下：

1. 可使用内建执行器将 `on` 属性指定的数据转换为数组。

相关章节：

- [2.5.9) `sort` 标签](#259-sort-标签)

##### RC5.6) 调整 `observe` 标签

主要修订内容如下：

1. 使用 `against` 介词属性定义针对变量的观察，而不是 `at` 属性。

相关章节：

- [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签)

##### RC5.7) 框架标签的内容

主要修订内容如下：

1. `hvml` 标签中定义的内容被视作表达式进行求值，并设置为对应栈帧的结果数据。

相关章节：

- [2.3.4) `hvml` 标签的内容](#234-hvml-标签的内容)

##### RC5.8) 其他修订

主要修订内容如下：

1. `load` 标签支持预定义页面类型 `inherit`，表示继承父协程的文档及渲染器页面（仅同一行者）。
1. 调整普通窗口前缀为 `plainwin:`。
1. 允许井号注释。
1. 允许 `head` 和 `body` 为可选标签。
1. 允许 `init` 标签不绑定变量而仅仅初始化数据作为 `init` 元素的执行结果。
1. 允许 `init` 标签 `_runner` 作为 `at` 属性值，以便初始化一个行者级变量。
1. 使用“行者”替代“会话”。
1. `$SESSION` 更名为 `$RUNNER`；`$HVML` 更名为 `$CRTN`；`$SYSTEM` 更名为 `$SYS`；`$REQUEST` 更名为 `$REQ`。
1. 调整 `iterate` 不使用迭代执行器时的处理规则。
1. `archetype` 标签增加 `type` 属性用于定义文本类型。
1. `include` 或者 `call` 元素应用操作组时，若传递的实参为对象，可利用临时变量处理为多个形参，方便代码书写。
1. 增加对表达式 `${...}` 的描述：用于构建一个有效变量名。
1. 修正 DOCTYPE 中 SYSTEM 标识符所定义的前缀的用途：用在可能和 HVML 标签冲突的外部标签上，而不是 HVML 标签上。

相关章节：

- [2.3.4) `hvml` 标签的内容](#234-hvml-标签的内容)
- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)
- [3.1) 书写 HVML 文档](#31-书写-hvml-文档)
- [3.1.2.5) 可选标签](#3125-可选标签)
- [2.5.1) `init` 标签](#251-init-标签)
- [2.5.7.2) 不使用迭代执行器](#2572-不使用迭代执行器)
- [2.4.1) `archetype` 标签](#241-archetype-标签)
- [2.5.10) `define` 和 `include` 标签](#2510-define-和-include-标签)
- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)
- [3.1.1) DOCTYPE](#311-doctype)

#### RC4) 220601

##### RC4.1) 重构`基本原理`一节

主要修订内容如下：

1. 增加若干术语。
1. 增加对 HVML 栈式虚拟机的描述。
1. 增加对各类元素的概要介绍，补充了各种元素和虚拟机栈帧及上下文变量的关系。
1. 增加对协程状态的描述。

相关章节：

- [2.1) 基本原理](#21-基本原理)
- [2.1.16) HVML 协程状态](#2116-hvml-协程状态)

##### RC4.2) MIME 类型和数据

主要修订内容如下：

1. 阐述了从外部资源装载数据时，如何根据资源的 MIME 类型来确定装载后的数据类型。

相关章节：

- [2.1.18) MIME 类型](#2118-mime-类型)

##### RC4.3) `inherit` 标签

主要修订内容如下：

1. 为方便代码块的分组书写，新增 `inherit` 标签。`inherit` 标签创建的动作元素不使用任何介词和副词属性，继承前置栈帧的上下文变量。

相关章节：

- [2.5.18) `inherit` 标签](#2518-inherit-标签)

##### RC4.4) `sleep` 标签

主要修订内容如下：

1. 新增 `sleep` 标签用于休眠当前协程。

相关章节：

- [2.5.19) `sleep` 标签](#2519-sleep-标签)

##### RC4.5) 调整上下文变量

主要修订内容如下：

1. 新增 `$^` 上下文变量，用于表示动作元素中使用内容定义的数据。
1. 调整 `$<` 的用途，仅用于迭代，名称为迭代数据。
1. 当被观察的事件来临而执行 `observe` 定义的操作组时，对应操作组的前置栈帧中，使用用户数据传递事件名称、事件源等信息：
   - `$!`：在用户数据中，预定义两个临时变量，用于表示完整的事件名称和事件源，名称分别为 `_eventName` 和 `_eventSource`。

相关章节：

- [2.1.6) 变量](#216-变量)
- [2.5.7.2) 不使用迭代执行器](#2572-不使用迭代执行器)
- [2.6.1.5) 用于数值的内建执行器](#2615-用于数值的内建执行器)
- [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签)

##### RC4.6) 元素及属性的调整

主要修订内容如下：

1. 详细描述了 `call` 元素并发调用操作组的实现机制，并使用 `concurrently` 副词属性表示并发调用，使用 `within` 属性设定行者名称。
1. 新增 `within` 属性，用于在 `load` 元素中指定渲染器页面信息，在 `call` 中指定行者名称，以避免使用 `in` 属性。
1. 增强 `request` 元素，使之可用于发送事件到其他协程。
1. 补充 `load` 和 `call` 元素异步执行情况下的结果数据：协程标识符。

相关章节：

- [2.1.13) 介词属性](#2113-介词属性)
- [2.1.14) 副词属性](#2114-副词属性)
- [2.5.12) `call` 和 `return` 标签](#2512-call-和-return-标签)
- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)
- [2.5.16) `request` 标签](#2516-request-标签)

##### RC4.7) `differ` 标签

主要修订内容如下：

1. 增强 `test` 标签使用 `with` 属性简化分支处理。
1. 新增 `differ` 标签定义其他分支。

相关章节：

- [2.5.5) `test`、 `match` 和 `differ` 标签](#255-test-match-和-differ-标签)

#### RC3) 220501

##### RC3.1) 调整动作标签

移除 `connect`、`send` 和 `disconnect` 标签，相关功能调整为使用 `$STREAM` 实现。

使用 `exit` 标签退出程序的执行，并定义程序的返回数据。

调整 `back` 标签的功能，用于回退栈帧。

补充了 `define` 元素的 `from` 属性的处理细节。

`observe` 标签中可使用 `with` 属性指定操作组。

`request` 标签仅用于向渲染器发出请求。

在上下文变量中维护的命名变量，称为“临时变量”，不再和“局部变量”混淆使用。使用 `temporarily` 副词属性（可简写为 `temp`）定义临时变量，不再使用 `locally` 属性。

调整 `init` 和 `define` 标签中 `at` 属性的作用：`at` 属性现在用于定义变量或者操作组名称的名字空间。

`request`、 `bind` 和 `load` 标签中，异步执行情况下，若使用 `as` 属性命名，则可使用 `at` 属性定义名称的名字空间。

`observe` 和 `forget` 标签的 `for` 属性值中，可使用通配符或者正则表达式。

定义了 `observe` 操作组的上下文变量之内容。

调整了动作标签的描述顺序。

相关章节：

- [2.5.10) `define` 和 `include` 标签](#2510-define-和-include-标签)
- [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签)
- [2.5.15) `back` 标签](#2515-back-标签)
- [2.5.16) `request` 标签](#2516-request-标签)
- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)

##### RC3.2) HVML 程序的运行状态

定义了 HVML 程序的运行状态：

相关章节：

- [2.1.16) HVML 程序的运行状态](#2116-hvml-程序的运行状态)

##### RC3.3) 可使用元素的锚点名称定位前置栈帧

可使用元素的锚点名称定位前置栈帧，从而可在求值表达式中指定前置栈帧中的上下文变量。

相关章节：

- [2.1.6) 变量](#216-变量)
- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)

##### RC3.5) eJSON 语法增强

可使用 `0x` 前缀，用十六进制表达有符号长整数和无符号长整数。

可定义空字节序列。

相关章节：

- [2.2.5) eJSON 语法](#225-ejson-语法)

##### RC3.6) `$STREAM` 预定义变量

对内置动态变量 `$STREAM` 的基本描述。

相关章节：

- [2.1.6.3) 预定义变量](#2163-预定义变量)

##### RC3.7) 调整动态对象方法的描述语法

使用 `native/<entityName>` 的形式描述原生实体类型，其中 `<entityName>` 是这种原生实体类型的名称。不再使用 `specific` 的别名。

相关章节：

- [2.2.4) 动态对象方法的描述语法](#224-动态对象方法的描述语法)

##### RC3.8) 事件名称的命名规则

定义了事件名称的词法单元。

相关章节：

- [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)
- [2.5.11) `observe`、 `forget` 和 `fire` 标签](#2511-observe-forget-和-fire-标签)

##### RC3.9) 简化外部执行器

`init`、`update` 等标签不再支持外部执行器。

仅 `iterate` 标签支持基于类的外部执行器。

`sort` 标签支持外部函数作为排序器。

相关章节：

- [2.5.9) `sort` 标签](#259-sort-标签)
- [2.6.2) 外部执行器](#262-外部执行器)

##### RC3.10) 协程及其状态

补充了解释器实例、渲染器会话、应用及行者之间的关系，并定义了协程相关的运行状态和渲染状态。

相关章节：

- [1.4) 应用框架](#14-应用框架)
- [2.1.16) HVML 协程状态](#2116-hvml-协程状态)
- [2.5.17) `load` 和 `exit` 标签](#2517-load-和-exit-标签)

#### RC2) 220401

##### RC2.1) 用户自定义临时变量的初始化和重置方法

使用 `temporarily` 表示创建或重置一个临时变量。

可在 `init` 标签的 `as` 或者 `at` 中指定临时变量的名称。

局部命名变量可直接使用其名称来引用，相比静态变量，具有较高的名称查找优先级。

明确区分静态命名变量和局部命名变量。

相关章节：

- [2.1.6) 变量](#216-变量)
- [2.5.1) `init` 标签](#251-init-标签)
- [2.1.14) 副词属性](#2114-副词属性)

##### RC2.2) 调整动态对象方法的描述语法

调整了动态对象方法的描述语法，使之更加严谨。

相关章节：

- [2.2.4) 动态对象方法的描述语法](#224-动态对象方法的描述语法)

##### RC2.3) 上下文变量的增强和调整

移除 `$&`：指前置操作的辅助数据（auxiliary data），初始就是对介词属性 with 的属性值求值后的数据；迭代执行器可能会修改这个数据。

上下文变量 `$^` 更改为 `$<`，更易识别：

可使用 0 作为前缀访问当前栈帧中的上下文变量，如 `$0<`、`$0%` 等。

相关章节：

- [2.1.6) 变量](#216-变量)
- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)

##### RC2.4) `iterate` 元素的增强

支持直接使用 `with` 属性定义产生迭代结果的表达式。

支持使用 `onlyif` 和 `while` 属性分别在产生迭代结果前和产生迭代结果后判断是否终止迭代。这两个属性的属性值处理，类似 `on` 和 `with` 属性，亦即，优先按表达式处理。

支持使用 `nosetotail` 副词属性，将上次迭代的结果作为下次迭代的输入。

相关章节：

- [2.1.13) 介词属性](#2113-介词属性)
- [2.1.14) 副词属性](#2114-副词属性)
- [2.5.7.2) 不使用迭代执行器](#2572-不使用迭代执行器)
- [3.1.2.4) 动作元素属性](#3124-动作元素属性)

##### RC2.5) 调整第一章的内容

将第一章标题从“背景”调整为“介绍”，并重新整理了其中的内容。

相关章节：

- [1) 介绍](#1-介绍)

##### RC2.6) 异常相关增强

新增 `Unsupported` 异常。

明确了可忽略异常和不可忽略异常，以及如何处理 `silently` 副词属性。

相关章节：

- [2.1.12) 错误和异常的处理](#2112-错误和异常的处理)

##### RC2.7) 可命名一个 `observe`

可使用 `observe` 命名一个观察，以便可以移除一个特定的观察。

相关章节：

- [2.5.10) `observe`、 `forget` 和 `fire` 标签](#2510-observe-forget-和-fire-标签)

##### RC2.8) 增强 `request`

可使用 `request` 要求目标文档位置（元素汇集）执行一个方法。

相关章节：

- [2.5.11) `request` 标签](#2511-request-标签)

##### RC2.9) 调整介词属性

使用 `against` 定义 `init` 中集合的唯一性键值以及 `sort` 中的排序依据。`via` 属性只用于定义请求的方法。

使用 `with` 属性定义针对外部执行器的过滤数据，不再使用 `via` 属性。

相关章节：

- [2.1.13) 介词属性](#2113-介词属性)
- [2.5.1) `init` 标签](#251-init-标签)
- [2.5.9) `sort` 标签](#259-sort-标签)
- [2.6.2) 外部执行器](#262-外部执行器)

##### RC2.10) 调整响应式处理的语法

使用 `responsively` 副词属性定义骨架元素的文本内容为响应式的，不再使用 `{{$...}}` 语法。

使用 `<p style &= 'display: $display;' >` 定义骨架元素的属性为响应式的。

相关章节：

- [2.7) 响应式处理](#27-响应式处理)
- [2.1.14) 副词属性](#2114-副词属性)

##### RC2.11) 增强 `bind` 标签

增强 `bind` 标签，使之支持使用内容来定义要绑定的表达式。

相关章节：

- [2.5.13) `bind` 标签](#2513-bind-标签)

##### RC2.12) 复合求值表达式

支持复合求值表达式（CHEE，compound evaluation expression）。

相关章节：

- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)

##### RC2.13) 调整布尔化规则

布尔化时，不再执行数值化处理。

相关章节：

- [2.1.4.2) 布尔化](#2142-布尔化)

#### RC1) 220209

##### RC1.1) 上下文变量的调整

移除如下上下文变量：

- `$*`：指前置操作结果数据的类型，用字符串表示，同 `$DATA.type($?)` 的返回值。
- `$#`：指前置操作结果数据所包含的数据项个数，同 `$DATA.count($?)` 的返回值。
- `$&`：作为当前迭代的迭代子（iterator），本质上是迭代子对应的原生实体。

上下文变量 `$~` 更改为 `$^`，更易识别：

- `$^`：指前置操作的输入数据，初始就是对介词属性 `on` 的属性值求值后的数据；迭代执行器可能会修改这个值。

新增如下上下文变量：

- `$&`：指前置操作的辅助数据，初始就是对介词属性 `with` 的属性值求值后的数据；迭代执行器可能会修改这个值。
- `$!`：前置操作执行栈中保存的用户自定义数据，用于定义临时数据。

新增描述：命名变量和上下文变量的不同。

相关章节：

- [2.1.6) 变量](#216-变量)
- [2.2.2) 求值表达式的语法](#222-求值表达式的语法)

##### RC1.2) `init` 标签的增强

在 `init` 标签中使用 `at` 属性，用于覆盖当前命名空间中已有的命名变量。

在 `init` 标签中不指定 `as` 或者 `at` 属性时，则定义或者覆盖中的用户自定义数据。

相关章节：

- [2.5.1) `init` 标签](#251-init-标签)

##### RC1.3) 针对数值执行器的附加说明

增加针对数值执行器初始数据的说明。

相关章节：

- [2.6.1.5) 用于数值的内建执行器](#2615-用于数值的内建执行器)

##### RC1.4) `observe` 标签的增强

在 `observe` 标签中使用 `at` 属性，可观察命名变量对应的数据变化。

为观察异步初始化命名变量时的异常状态，新增异常数据类型。

相关章节：

- [2.5.10) `observe`、 `forget` 和 `fire` 标签](#2510-observe-forget-和-fire-标签)
- [2.1.3) 扩展数据类型](#213-扩展数据类型)

##### RC1.5) 骨架元素的增强

骨架元素被定义为具有默认动作的一般动作元素，因而可以和 HVML 动作元素互相嵌套。

相关章节：

- [2.1.11.1) 用来操作数据的动作元素](#21111-用来操作数据的动作元素)
- [3.1.2) 元素](#312-元素)

##### RC1.6) 属性值操作符的增强

在 `update` 动作元素中，当 `with` 属性指定的数据是字符串类型，且修改动作为 `displace` 时，增加了 `*=` 属性值操作符。

在 `update` 动作元素中，当 `with` 属性指定的数据是数值型数据，且修改动作为 `displace` 时，可使用 `+=`、`-=`、`*=`、`/=`、`%=` 等属性值操作符。

相关章节：

- [3.1.2.4) 动作元素属性](#3124-动作元素属性)

#### BRC) 其他

老的匹配规则：

- 若 `for` 属性值为 `*` 或空字符串，则相当于匹配任意值。
- 若属性值未使用后面描述的前缀，或前缀为 `\` 字符，则执行精确匹配。若当前值为字符串，则将 `for` 属性值视作字符串执行字符串的匹配；若当前值为数值，则将 `for` 属性值视作数值执行匹配。

若当前值是字符串，可使用如下前缀表示精确匹配之外的匹配条件：

- `~`：表示一个字符串的通配符（wildcard）匹配，可支持通配符并忽略大小写；如 `~zh*`，表示匹配所有使用 `zh` 打头的字符串。
- `/`：表示一个字符串的正则表达式匹配。比如 `/[1-9][0-9]?/`，表示匹配 11 ～ 99 的正整数形式的字符串。

若当前值是数值，可使用如下前缀表示精确匹配之外的匹配条件：

- `>`：表示当前值大于前缀之后给定的数值，如 `> 30`。
- `>=`：表示当前值大于或等于前缀之后给定的数值，如 `>= 30`。
- `<=`：表示当前值小于等于前缀之后给定的数值，如 `<= 30`。
- `<`：表示当前值小于前缀之后给定的数值，如 `< 30`。
- `!`：表示当前值不等于前缀之后给定的数值，如 `! 30`。

### 附.2) 待定内容

#### TBD 1) 扩展数据类型

##### TBD 1.1) 扩展数据类型

1) 复数及其运算

2) 矩阵及其运算

#### TBD2) 动作元素

##### TBD2.1) `pipe` 标签

`pipe` 标签用于将一个字节序列、字符串或者输出流管接（pipe）到另外一个可接收输入流的东西上。

比如，如下代码的实际效果是将文件 `src.txt` 中的内容追加到 `dst.txt` 中。

```hvml
    <pipe   on="$STREAM.open('file://src.txt', 'read')"
            with="$STREAM.open('file://dst.txt', 'write append')">
    </pipe>
```

我们还可以将输出流管接到一个执行特定程序的子进程上，然后再将子进程的输出流管接到标准输出上：

```hvml
    <pipe   on="HVML" with="$STREAM.open('exe:///usr/bin/wc')">
        <pipe on="$?" with="$STREAM.stdout" />
    </pipe>
```

`pipe` 标签将一直从 `on` 属性指定的流实体中读取数据，并将结果写入到 `with` 属性指定的流实体中。默认情况下，当 `on` 属性指定的流实体被关闭时，`pipe` 结束执行，其结果数据为 `with` 属性指定的流实体。

当 `on` 属性指定的数据是字节序列或者字符串时，将对应一个虚拟的流实体，该实体的内容就是指定的字节序列或者字符串，并在读取完这些内容后收到文件尾的标志，表示该流实体已被关闭。

我们可以使用 `asynchronously` 副词属性，从而异步执行 `pipe` 操作：

```hvml
    <pipe   on="$STREAM.in" with="$STREAM.open('exe:///usr/bin/wc')"
            as="myPipe" async>
        <observe on="myPipe" for="pipe:done" >
            <choose on="$STREAM.stdout.writelines($myPipe.out.readlines(1))" />
        </observe>
    </pipe>
```

##### TBD2.2) `connect`、 `send` 和 `disconnect` 标签

如前所述，`connect` 标签定义一个对外部数据源的长连接，比如来自 MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包；而 `disconnect` 标签关闭先前建立的一个长连接数据源。

`send` 标签用于在一个已连接的长连接数据源上发出一个同步或者异步的消息。比如在通过 MQTT 或者本地数据总线发送请求到外部模块或者远程计算机时，我们使用 `send` 元素发出一个异步消息，然后在另外一个 `observe` 标签定义的 HVML 元素中做相应的处理。比如，我们要通过 hiDataBus 协议向系统守护进程发出一个获得当前可用 WiFi 热点列表的远程过程调用：

```hvml
</hvml>
    <head>
        <connect at="unix:///var/run/hbdbus.sock" as="hbdbus" for="HBDBus"/>
    </head>

    <body>
        ...

        <send on="$hbdbus" to="call" at="@localhost/cn.fmsoft.hybridos.settings/inetd/wifiGetHotspots" as="wifilist" asynchronously>
            <observe on="$hbdbus" for="result:$wifilist">
                ...
            </observe>
        </send>

        <send on="$hbdbus" to="subscribe" at="@localhost/cn.fmsoft.hybridos.settings/inetd/NETWORKCHANGED" as="networkchanged">
            <observe on="$hbdbus" for="event:$networkchanged">
                ...
            </observe>
        </send>
        ...
    </body>
</hvml>
```

正常情况下，使用同步请求时，`send` 元素的执行结果数据就是请求的返回结果；如果使用异步请求，`send` 元素的操作结果数据为字符串 `ok`。异步请求时，一般应该在对应的 `observe` 元素中做后续处理。

```hvml
    <body>
        <button id="theBtnWifiList">Click to fetch WiFi List</button>

        <archetype name="wifi_item">
            <li>@?.name</li>
        </archetype>

        <ul id="theWifiList">
        </ul>

        <observe on="#theBtnWifiList" for="click">

            <init as="paramWifiList">
                { "action": "get_list" }
            </init>

            <connect at="unix:///var/run/hbdbus.sock" as="hbdbus" for="HBDBus" />

            <send on="$hbdbus" to="call" at="@localhost/cn.fmsoft.hybridos.settings/inetd/wifiScanHotspots" with="$paramWifiList" as="hotspots_list" asynchronously>
                <observe on="$hbdbus" for="result:$hotspots_list">
                    <disconnect on="$hbdbus" />

                    <!-- fill the Wifi list with the response data -->
                    <iterate on="$?" in="#theWifiList">
                        <update on="$@" to="append" with="$wifi_item" />
                    </iterate>

                </observe>
            </send>

        </observe>
    </body>
```

##### TBD2.3) 外部函数更新器

在 `update` 标签中，`by` 指定一个外部函数执行器；当 `to` 属性给定的修改动作无法完成预期的修改操作时，可使用外部函数执行器。指定 `by` 属性时，将忽略 `to` 属性值。

外部函数主要用于 `update` 标签以完成复杂的更新操作，所有的事件处理函数之原型为：

```python
def event_handler (on_value, with_value, root_in_scope):
```

其中，

- `on_value` 是 `update` 元素之 `on` 属性的值。
- `with_value` 是 `update` 元素之 `with` 属性的值。
- `root_in_scope` 是 `update` 元素之 `in` 属性确定的当前操作范围。

比如针对电池电量的改变事件，其 `payload` 如 2.8) 所示包含 `level` 和 `charging` 两个键值对，分别表示当前电量百分比以及是否在充电中。因此，其对应的执行器可实现为：

```python
def on_battery_changed (on_value, with_value, root_in_scope):
    if on_value.level == 100:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-full.png'
    elif on_value.level > 90:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-90.png'
    elif on_value.level > 70:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-70.png'
    elif on_value.level > 50:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-50.png'
    elif on_value.level > 30:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-30.png'
    elif on_value.level > 10:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-10.png'
    else:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-low.png'
```

上面的脚本，针对不同的电量范围设置了不同的电池图标，从而向用户展示了当前电池的剩余电量信息。

##### TBD2.4) 杂项

虚拟 DOM 技术提供如下一些好处：

1. 由于脚本程序并不直接操作真实的 DOM 树，故而一方面通过现有的框架简化了前端开发的复杂性，另一方面通过优化对真实 DOM 树的操作而减少了由于动态修改页面内容而对 DOM 树的频繁操作，从而提高页面的渲染效率和用户体验。
1. 通过虚拟 DOM 技术，程序对某个数据的修改，可以直接反应到该数据绑定的页面内容上，开发者无需主动或直接地调用相关接口来操作 DOM 树。这种技术提供了所谓的“响应式”编程，极大降低了开发者的工作量。

另外，我们还可以使用 `init` 元素的 `by` 属性指定用于对比两个数据是否相等的外部执行器。

- `connect`：该标签定义对一个外部数据源的连接，比如来自 MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包。
- `disconnect`：该标签关闭先前建立的外部数据源连接。

- `connect` 标签用于连接到一个指定的外部数据源，并绑定一个变量名。
- `send` 标签用来在指定的长连接上发出一个消息。
- `disconnect` 标签用于显式关闭一个先前建立的外部数据源连接。

- `at`：在 `connect` 动作元素中，用于定义执行动作所依赖的外部数据源，其属性值通常是一个 URL，如 `tcp://foo.com:2345`、 `unix:///var/run/hbdbus.sock`。
- `for`：在 `connect` 标签中，用于定义协议或用途。
- `with`：在 `send` 元素中定义发送请求或消息时的参数。

`request` 标签在外部数据源上发出一个同步或者异步的请求。

从外部数据源中获取数据时，我们使用 `at` 属性指定 URL，使用 `with` 属性指定请求参数，使用 `via` 属性指定请求方法（如 `GET`、 `POST`、 `DELETE` 等）：

```hvml
    <request at="http://foo.bar.com/foo" with="$params" via="POST" as="foo" async>
        <observe on="$foo" for="result:success">
            ...
        </observe>
    </request>
```

以上用法和 `init` 类似，但 `request` 可以通过 `to` 属性指定请求结果的处理方法，比如将请求结果保存到指定的文件当中：

```hvml
    <request at="http://foo.bar.com/foo" with="$params" via="POST" to="save:/tmp/foo.tmp" as="foo" async>
        <observe on="$foo" for="result:success">
            ...
        </observe>
    </request>
```

此种情况下，我们可以使用如下几种结果处理方法：

- `save:` 保存到本地文件。该操作的执行结果是保存后的完整文件路径。
- `filter:` 创建子进程和管道并将管道作为子进程的标准输入，然后在子进程中执行指定的程序，将请求结果写入管道。该操作的执行结果是子进程的标准输出（字节序列）。

当前 HVML 程序在模态窗口中渲染时，可观察该程序的 `terminated:success` 事件，然后进行处理。如果当前 HVML 程序不在模态对话框中渲染，则该数据将做为请求数据（对应 `$REQ` 内置全局变量）提供给目标返回对应的 HVML 程序，此时，该 HVML 程序会执行一次重新装载操作（类似浏览器刷新页面的功能）。

`exit` 元素不产生任何结果数据，故而不能包含子动作元素。

正常情况下，`load` 元素装载一个 HVML 程序在一个模态窗口中渲染时，其执行结果数据就是新 HVML 程序中 `exit` 元素的 `with` 属性值；如果在一个新建的普通窗口中渲染，则正常情况下 `load` 元素的操作结果数据为字符串 `ok`；如果在其他已有的窗口中渲染，则将终止该窗口中运行的 HVML 程序，并在当前窗口中渲染新的 HVML 程序内容。

`exit` 标签用于终止当前的 HVML 程序，并将返回值返回到指定的目标 HVML 程序。

`load` 标签支持如下副词属性：

- `synchronously`：同步装载，默认行为。`load` 元素将等待新的 HVML 程序退出，相当于创建一个模态窗口。
- `asynchronously`：异步装载。`load` 元素不等待新的 HVML 程序退出。
- `concurrently`：并行执行 HVML 程序。若解释器支持行者（runner），则 `as` 属性的值用于标识一个行者。

### 附.3) 贡献者榜单

本榜单顺序按贡献时间由早到晚排列：

1. Tian Siyuan：资深软件工程师；一些文档细节的建议。
1. Hax：Web 前端技术专家；一些文档细节的建议。

### 附.4) 商标声明

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
[RFC 3986]: https://datatracker.ietf.org/doc/html/rfc3986

[React.js]: https://reactjs.org
[Vue.js]: https://cn.vuejs.org

