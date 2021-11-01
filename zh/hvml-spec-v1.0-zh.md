# HVML 规范（V1.0）

HVML Specification Version 1.0  
Author: Vincent Wei  
Category: App Framework  
Date: Dec., 2021  
Status: Release Candidate  
Language: Chinese

*Copyright Notice*

版权所有 &copy; 2020, 2021 北京飞漫软件技术有限公司  
保留所有权利

此文档不受 HVML 相关软件开源许可证的管辖。

飞漫软件公开此文档的目标，用于向开发者解释 HVML 相关设计原理或者相关规范。在未获得飞漫软件书面许可之前，任何人不得复制或者分发本文档的全部或部分内容，或利用本文档描绘的技术思路申请专利、撰写学术论文等。

本文提及的飞漫软件或其合作伙伴的注册商标或商标之详细列表，请查阅文档末尾。

- [1) 背景](#1-背景)
- [2) HVML 详解](#2-hvml-详解)
   + [2.1) 术语及基本原理](#21-术语及基本原理)
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
         - [2.1.6.1) `$REQUEST`](#2161-request)
         - [2.1.6.2) `$SYSTEM`](#2162-system)
         - [2.1.6.3) `$DOC`](#2163-doc)
         - [2.1.6.4) `$TIMERS`](#2164-timers)
         - [2.1.6.5) `$L`](#2165-l)
         - [2.1.6.6) `$T`](#2166-t)
         - [2.1.6.7) `$EJSON`](#2167-ejson)
         - [2.1.6.8) 集合](#2168-集合)
         - [2.1.6.9) 表达式变量](#2169-表达式变量)
      * [2.1.7) 文档片段的 JSON 数据表达](#217-文档片段的-json-数据表达)
      * [2.1.8) 数据模板和文档片段模板](#218-数据模板和文档片段模板)
      * [2.1.9) 用来操作数据或元素的动作标签](#219-用来操作数据或元素的动作标签)
      * [2.1.10) 其他动作标签](#2110-其他动作标签)
      * [2.1.11) 错误和异常标签](#2111-错误和异常标签)
      * [2.1.12) 介词属性](#2112-介词属性)
      * [2.1.13) 副词属性](#2113-副词属性)
      * [2.1.14) 引用元素或数据](#2114-引用元素或数据)
      * [2.1.15) JSON 求值表达式](#2115-json-求值表达式)
   + [2.2) 规则、表达式及参数的描述语法](#22-规则表达式及参数的描述语法)
      * [2.2.1) 规则描述语法](#221-规则描述语法)
      * [2.2.2) JSON 求值表达式的语法](#222-json-求值表达式的语法)
      * [2.2.3) 常见的被指名词法单元](#223-常见的被指名词法单元)
      * [2.2.4) 参数描述语法](#224-参数描述语法)
   + [2.3) 框架标签](#23-框架标签)
      * [2.3.1) `hvml` 标签](#231-hvml-标签)
      * [2.3.2) `head` 标签](#232-head-标签)
      * [2.3.3) `body` 标签](#233-body-标签)
   + [2.4) 模板标签](#24-模板标签)
      * [2.4.1) `archetype` 标签](#241-archetype-标签)
      * [2.4.2) `archedata` 标签](#242-archedata-标签)
      * [2.4.3) `error` 标签](#243-error-标签)
      * [2.4.4) `except` 标签](#244-except-标签)
   + [2.5) 动作标签](#25-动作标签)
      * [2.5.1) `init` 标签](#251-init-标签)
      * [2.5.2) `update` 标签](#252-update-标签)
         - [2.5.2.1) 指定目标位置](#2521-指定目标位置)
         - [2.5.2.2) 更新集合](#2522-更新集合)
      * [2.5.3) `erase` 标签](#253-erase-标签)
      * [2.5.4) `clear` 标签](#254-clear-标签)
      * [2.5.5) `test` 标签和 `match` 标签](#255-test-标签和-match-标签)
      * [2.5.6) `choose` 标签](#256-choose-标签)
      * [2.5.7) `iterate` 标签](#257-iterate-标签)
      * [2.5.8) `reduce` 标签](#258-reduce-标签)
      * [2.5.9) `sort` 标签](#259-sort-标签)
      * [2.5.10) `observe`、 `forget` 和 `fire` 标签](#2510-observe-forget-和-fire-标签)
      * [2.5.11) `request` 标签](#2511-request-标签)
      * [2.5.12) `connect`、 `send` 和 `disconnect` 标签](#2512-connect-send-和-disconnect-标签)
      * [2.5.13) `load` 和 `back` 标签](#2513-load-和-back-标签)
      * [2.5.14) `define` 和 `include` 标签](#2514-define-和-include-标签)
      * [2.5.15) `call` 和 `return` 标签](#2515-call-和-return-标签)
      * [2.5.16) `catch` 标签](#2516-catch-标签)
      * [2.5.17) `bind` 标签](#2517-bind-标签)
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
         - [2.6.2.1) 外部选择器](#2621-外部选择器)
         - [2.6.2.2) 外部迭代器](#2622-外部迭代器)
         - [2.6.2.3) 外部归约器](#2623-外部归约器)
         - [2.6.2.4) 外部函数](#2624-外部函数)
      * [2.6.3) 执行器规则表达式的处理](#263-执行器规则表达式的处理)
   + [2.7) 响应式处理](#27-响应式处理)
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
         - [3.1.2.7) JSONTEXT 和 JSONSTR](#3127-jsontext-和-jsonstr)
      * [3.1.3) 文本](#313-文本)
         - [3.1.3.1) 新行](#3131-新行)
         - [3.1.3.2) 扩展 JSON 语法](#3132-扩展-json-语法)
      * [3.1.4) 字符引用](#314-字符引用)
      * [3.1.5) CDATA 段落](#315-cdata-段落)
      * [3.1.6) 注释](#316-注释)
   + [3.2) 解析 HVML 文档](#32-解析-hvml-文档)
- [4) 应用示例](#4-应用示例)
   + [4.1) 使用 HVML 开发传统 GUI 应用](#41-使用-hvml-开发传统-gui-应用)
   + [4.2) 云应用](#42-云应用)
- [5) 总结](#5-总结)
- [附录](#附录)
   + [附.1) 贡献者榜单](#附1-贡献者榜单)
   + [附.2) 商标声明](#附2-商标声明)
   + [附.3) 废弃或待定的内容](#附3-废弃或待定的内容)


## 1) 背景

本文涉及的背景技术、术语及其最新规范如下：

- HTML 及其规范。HTML 和 CSS 等规范和标准是由 W3C <https://www.w3.org> 组织制定的，用来规范 Web 页面内容的编写和渲染行为。关键规范如下：
   * HTML：超文本标记语言（HyperText Markup Language），用于表述网页内容结构的标准。HTML 最新规范：<https://html.spec.whatwg.org/>；
   * CSS：级联样式表（Cascading Style Sheets），用于定义 HTML 页面元素布局、渲染效果等的规范。在 CSS 2.2 <https://www.w3.org/TR/CSS22/> 之后，CSS 规范开始按照模块划分，各模块分头演进，目前普遍支持到 Level 3。在如下网页中可以看到 CSS 各模块的规范进展情况：<https://drafts.csswg.org>；
   * JavaScript/ECMAScript：一种符合 ECMAScript 规范的脚本编程语言，最初由网景公司设计给浏览器使用，用于操控 HTML 页面中的内容和渲染行为，现在由欧洲计算机制造商协会和国际标准化组织负责制定相关标准，最新的标准为 ECMA-262：<http://www.ecma-international.org/publications/standards/Ecma-262.htm>。
   * DOM：文档对象模型（Document Object Model），用于 XML/HTML 文档结构的内部表达。一个 XML/HTML 文档，会被 XML/HTML 解析器解析并生成一个 DOM 树，XML/HTML 文档中的每个元素构成 DOM 树上的元素结点，而每个元素的子元素、属性、文本内容等，又构成了这个元素节点的子节点。有关 DOM 的最新的规范可见：<https://dom.spec.whatwg.org/>。
   * JSON：JavaScript 对象表述法（JavaScript Object Notation）是一种轻量级的信息互换格式。最初被用于 JavaScript 对象的字符串表达，易于被 JavaScript 脚本代码使用，现在被广泛使用在不同编程语言之间的数据交换。有关 JSON 的描述，可见：<https://json.org/>。
- 用户代理（User Agent）是 HTML 规范的一个术语，用来指代可以解析 HTML、CSS 等 W3C 规范，并对 HTML 文档内容进行渲染，进而呈现给用户并实现用户交互的计算机程序。我们熟知的浏览器就是用户代理。但用户代理不限于浏览器，可以是一个软件组件，也可以是一个应用框架。比如，内嵌到电子邮件客户端程序中，用以解析和渲染 HTML 格式邮件的软件组件，本质上也是 HTML 用户代理。
- XML：可扩展标记语言（The Extensible Markup Language）是由 W3C 组织制定的，用来表述结构化信息的一种简单文本格式。和 HTML 相比，XML 使用类似的结构，但更加严格且更为通用。XML 是当今共享结构化信息的最广泛使用的格式之一，不论是在程序之间，人与人之间，计算机与人之间，也不论是在本地还是跨网络共享信息。有关 XML 的介绍和规范可参阅：<https://www.w3.org/standards/xml/>。
- 脚本语言。指类似 JavaScript 的高级计算机编程语言，通常解释执行，具有动态特征。除 JavaScript 之外，常见的脚本语言有 Python、Lua 等。
- SQL：结构化查询语言（Structured Query Language），用于关系型数据库的数据操作语言，目前几乎所有的关系数据库均支持 SQL。和一般的编程语言不同，SQL 具有非过程性特征，基本的 SQL 代码中不包括 if-else 这种流程控制语句。

随着互联网技术和应用的发展，围绕 HTML/CSS/JavaScript 发展出来的 Web 前端开发技术发展迅猛，甚至可以用“一日千里”来形容。五年前，基于 jQuery 和 Bootstrap 的前端框架大行其道，而从 2019 年开始，基于虚拟 DOM 技术的框架又受到前端开发者的青睐，比如著名的 React.js（<https://reactjs.org/>）、Vue.js（<https://cn.vuejs.org>）等。值得注意的是，微信小程序、快应用等，也不约而同使用了这种虚拟 DOM 技术来构建应用框架。

所谓“虚拟 DOM” 是指前端应用程序通过 JavaScript 来创建和维护一个虚拟的文档对象树，应用脚本并不直接操作真实的 DOM 树。在虚拟 DOM 树中，通过一些特别的属性实现了基于数据的一些流程控制，如条件、循环等。虚拟 DOM 技术提供如下一些好处：

1. 由于脚本并不使用脚本程序直接操作真实的 DOM 树，故而一方面通过现有的框架简化了前端开发的复杂性，另一方面通过优化对真实 DOM 树的操作而减少了由于动态修改页面内容而对 DOM 树的频繁操作，从而提高页面的渲染效率和用户体验。
1. 通过虚拟 DOM 技术，程序对某个数据的修改，可以直接反应到该数据绑定的页面内容上，开发者无需主动或直接地调用相关接口来操作 DOM 树。这种技术提供了所谓的“响应式”编程，极大降低了开发者的工作量。

以 React.js、Vue.js 为代表的前端框架取得了巨大成功，但存在如下缺陷和不足：

- 这些技术建立在已有成熟的 Web 标准之上，需要完整支持相关前端规范的浏览器才能运行，因此无法应用于其他场合。比如要在 Python 脚本中使用这类技术，目前没有任何解决方案；再比如在传统的 GUI 应用编程中，也无法使用这一技术带来的好处。
- 这些技术通过引入 `v-if`、 `v-else`、 `v-for` 等虚拟属性实现了基于数据的条件和循环流程控制，但这种方法带来代码可读性的下降，代码可读性的下降带来代码可维护性的下降。如下面 Vue.js 的一个示例：

```html
<div v-if="Math.random() > 0.5">
  Now you see "{{ name }}"
</div>
<div v-else>
  Now you don't
</div>
```

在 [HybridOS]（合璧操作系统）的开发过程中，我们在虚拟 DOM 思想的基础上，发展了一套完备、通用、优雅、易学的标记语言 HVML（Hybrid Virtual Markup Language）。HVML 通过数据驱动的动作标签、介词属性以及动态对象，实现了 XML/HTML 文档的动态生成和更新功能；HVML 还提供了和已有编程语言，如 C/C++、Python、Lua、JavaScript 等进行结合的方法，从而为这些编程语言抛开浏览器利用 Web 前端技术提供了强有力的技术支撑。

HVML 本质上是一种可编程标记语言（Programmable Markup Language）。尽管设计 HVML 的最初目标是为了降低 GUI 应用的开发难度，但其实可用于更加通用的场景——只要程序的输出可被抽象为使用一个或者多个树状结构来表达，就可以使用 HVML。

HVML 的设计思想来源于 React.js、Vue.js 等最新的 Web 前端框架。但是，相比基于虚拟 DOM 和 JavaScript 的 Web 前端技术，HVML 提供了不同于传统编程语言的编码模式，在数据驱动思想基础上，HVML 提供了更加系统和完备的低代码（low code，指使用更少的代码来编写程序）编程方法。

在未来，HVML 将成为 HybridOS 的应用开发首选编程语言。

## 2) HVML 详解

### 2.1) 术语及基本原理

和 HTML 类似，HVML 使用标记语言来定义程序的结构和数据，但和 HTML 不同的是，HVML 是可编程的、动态的。

在详细了解 HVML 的设计思想之前，我们首先给出 HVML 的如下基本原理和特点：

1. 数据驱动编程。通过基于数据的迭代、插入、更新、清除等操作，开发者不需要编写程序或者只要少量编写程序即可动态生成最终的 XML/HTML 文档。通过观察新的数据或文档本身的变化以及用户交互事件，HVML 可实现 XML/HTML 文档或数据的动态更新。我们将这种编程方式称为数据驱动的编程（data-driven programming）。
1. 通过 HVML 引入的编程模型和方法，用于表述树状结构的 XML/HTML 文档内容可完全由 HVML 生成和动态调整，这避免了在程序代码中直接操作文档的数据结构（即文档对象树，或简称 DOM 树），而程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。比如，
   * HVML 可在文档片段模板或者数据模板中定义数据和 DOM 元素之间的映射关系，而无需编写额外的代码完成数据到 DOM 元素属性、内容等的赋值操作。
   * HVML 将错误和异常的处理和程序代码分离了开来，程序只要产生适当的错误或者异常，而对应的处理则直接在 HVML 中定义，这同时提高了代码的可维护性。
1. HVML 对文档和数据的操作提供了一致接口。HVML 要求所有外部数据均使用 JSON 格式或扩展 JSON 表述。JSON 格式是一种人机共读的数据表述形式，可在数值、字符串、数组、字典等基本数据单元的基础上表述复杂对象。在 HVML 看来，由于 HTML/XML 文档或其片段和特定 JSON 格式的数据是等价的，因此，HVML 不仅可用来操作文档，亦可用于操作使用 JSON 表述的数据。
1. 通过使用动态值和原生实体这两类抽象数据，HVML 定义了从底层系统功能中获得数据或者实现某种功能的方法，且这种方法可以和 JSON 数据完美融合，从而可以帮助开发者快速扩展 HVML 程序的功能和能力。
1. 通过对数据和文档结构的一致性抽象，HVML 提供了为数不多的几种动作标签，可完成数据的定义、获取、监听、更改以及文档的生成和修改。通过这些标签的嵌套使用，可形成更为复杂的操作逻辑。
1. HVML 定义的动作标签，可使用介词和副词属性来定义动作依赖的数据、目标对象以及执行条件等，和常见的编程语言有很大不同，HVML 的描述方式更加贴近自然语言，从而可以大幅降低学习门槛。

在围绕 HVML 构成的软件系统中，主要包含如下两个模块：

1. HVML 解释器（interpreter）。HVML 解释器用来解析 HVML 文档或者 HTML/XML 文档片段，执行动作标签指定的操作，监听文档或数据的变化，并在需要的情况下，按照固定的接口调用使用脚本语言或者其他编程语言开发的功能。由于解析（parse）HVML 标记仅仅是 HVML 解释器的一个功能，因此，我们不使用解析器（parser）来指代这个模块。
1. XML/HTML 用户代理（user-agent）。XML/HTML 代理是指最终解析和/或渲染 XML/HTML 文档的计算机程序。对 HTML 文档来讲，就是我们常用的浏览器；对 XML 文档来讲，通常是一个可以由某个 GUI 支持系统解析并渲染为图形用户界面的文档。需要注意的是，一个 XML/HTML 用户代理也可以用来完成某种抽象的操作，并不一定是用来渲染图形用户界面的，比如，我们可以使用 XML 来描述日志、数据库等。

为方便描述，本文档中使用如下术语：

1. 数据（data）。
1. 变量（variable）。
1. 数据项（data item）或数据成员（data member）。对数组而言，每个数组单元就是一个数据项；对对象数据而言，其中的某个键值对就是一个数据项。
1. 文档元素（document element）。指文档对象模型中，使用某个标签（tag）定义的元素节点；一个文档元素可包含一个或多个属性（attribute）以及属性值，还可以包含内容（content）；一个元素可包含文本内容、数据内容或者使用标签定义的单个或多个子元素。
1. 文档片段（document fragment）。指 XML/HTML 文档中的一个片段，可作为模板被克隆（clone）到目标文档的其他位置。
1. 元素汇集（element collection）。指使用选择器选择的一组元素。这里避免使用“集合”这个术语，是为了防止和`集合（set）`数据类型混淆。
1. 码点（code point）。指一个表述为 `U+` 和四到六个 ASCII 大写十六进制数字形式的 Unicode 码点，范围在 U+0000 到 U+10FFFF（含）。有时候，我们会在码点之后包含码点的名称以及包含在小括号中的该码点渲染后的形式，但除了 U+0028 或 U+0029 之外（这两个码点表示的是小括号本身）。对不能渲染的码点以及 U+0028 或 U+0029，本文档会尽量包含其码点的名称。有关 Unicode 字符的更多术语解释如下：
   - 码点的名称由 Unicode 标准定义并以 ASCII 大写形式表述，如 `CR` 指 `Carriage Return（回车）`。
   - 替代符（surrogate）是范围在 U+D800 到 U+DFFF（含）的码点。
   - 不是替代符的码点被称为标量值（scalar value）。
   - U+FDD0 到 U+FDEF（含）范围内的码点，以及如下码点被称为非字符（noncharacter）：
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
   - ASCII 码点是指范围在 U+0000 NULL 到 U+007F DELETE（含）的码点。
   - ASCII 制表符或者新行符指 U+0009 TAB、 U+000A LF 或 U+000D CR。
   - ASCII 空白字符是指 U+0009 TAB、 U+000A LF、 U+000C FF、 U+000D CR、或 U+0020 SPACE。也常常简称为`空白字符`。
   - C0 控制字符是范围在 U+0000 NULL 到 U+001F INFORMATION SEPARATOR ONE（含）的码点。
   - C0 控制字符或空格指 C0 控制字符或 U+0020 SPACE。
   - 控制字符是指一个`C0 控制字符范围在 U+007F DELETE 到 U+009F APPLICATION PROGRAM COMMAND（含）的码点。
   - ASCII 数字是范围在 U+0030（`0`） 到 U+0039（`9`）（含）的字符。
   - ASCII 大写十六进制数字要么是一个 ASCII 数字，要么是一个范围在 U+0041（`A`）到 U+0046（`F`）（含）的码点。
   - ASCII 小写十六进制数字要么是一个 ASCII 数字，要么是一个范围在 U+0061（`a`）到 U+0066（`f`）（含）的码点。
   - ASCII 十六进制数字要么是一个 ASCII 大写十六进制数字，要么是一个 ASCII 小写十六进制数字。
   - ASCII 大写字母是一个范围在 U+0041（`A`）到 U+005A（`Z`）（含）的码点。
   - ASCII 小写字母是一个范围在 U+0061（`a`）到 U+007A（`z`）（含）的码点。
   - ASCII 字母要么是一个 ASCII 大写字母，要么是一个 ASCII 小写字母。
   - ASCII 字母数字要么是一个 ASCII 数字，要么是一个 ASCII 字母。


比如，表情符号 🤔 的码点是 U+1F914，可表述为 U+1F914（🤔），也可以表述为 U+1F914 THINKING FACE（🤔）。

#### 2.1.1) 程序结构

下面用一个简单的例子来说明 HVML 的基本用法。这个 HVML 程序生成一个 HTML 页面并根据用户的交互更新这个 HTML 页面；这个 HTML 页面，将在屏幕上展示三组信息：

1. 在页面顶端显示的系统状态栏，用于展示当前时间、WiFi 信号强度、电池电量信息等。这些信息将动态更新。
1. 在页面中间位置展示用户列表，每个用户项包括用户名称、头像等信息。这些信息来自 JSON 表达的一个字典数组。
1. 在页面底部展示一个搜索引擎连接。具体的搜索引擎根据系统所在的语言地区（locale）信息确定。

```html
<!DOCTYPE hvml SYSTEM "v: MATH">
<hvml target="html">
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

        <connect at="unix:///var/tmp/hibus.sock" as="databus" for="hiBus" />

        <archetype name="user_item">
            <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
                <img class="avatar" src="$?.avatar" />
                <span>$?.name</span>
            </li>
        </archetype>

        <archedata name="item_user">
            {
                "id": "$?.attr.data-value", "avatar": "$?.content[0].attr.src",
                "name": "$?.children[1].textContent", "region": "$?.attr.data-region"
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
                <error type="nodata">
                    <img src="wait.png" />
                </error>
                <except type="StopIteration">
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
                <match for="ANY" to="displace" with="$footer_def">
                    <update on="$@" with="$footer_def" />
                </match>
                <error type="nodata">
                    <p>You forget to define the $global variable!</p>
                </error>
                <except type="KeyError">
                    <p>Bad global data!</p>
                </except>
                <except type="IdentifierError">
                    <p>Bad archetype data!</p>
                </except>
            </test>
        </footer>

        <send on="$databus" to="subscribe" at="@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED">
            <observe on="$databus" for="event:$?" in="#theStatusBar">
                <update on="$@" by="FUNC: on_battery_changed" />
            </observe>
        </send>

        <observe on=".avatar" for="click">
            <load from="user.hvml" with="{'id': $@.attr['data-value']}" as="modal" />
        </observe>
    </body>
</hvml>
```

首先，HVML 采用了类似 HTML 的标签来定义文档的整体结构：

- 在文档的开头，我们使用 `<!DOCTYPE hvml>` 来标记文档类型为 `hvml`。我们还使用了 `DOCTYPE` 的 `SYSTEM` 标识符来定义该 HVML 文档使用的标签前缀以及需要预先装载的外部模块。
- `hvml` 标签用于定义整个 HVML 文档。可包含如下属性：
   1. `target`：定义 HVML 文档的目标标记语言，取 `html`、 `xml` 等值。
   1. `lang`： 定义语言信息，如 `en`、 `zh` 等；在解释器内部，当需要利用 Unicode 标准定义的语言规则进行大小写转换或者比较时使用。
- `head` 标签用于定义头部信息，其中可包含：
   1. 可被原样保留到目标文档的标签，如 HTML 文档的 `<meta>`、 `<link>` 标签。
   1. 全局数据的初始化和重置；使用 `init` 标签定义。
   1. 全局动态对象；使用 `init` 标签定义。
   1. 全局长连接数据源；使用 `connect` 标签定义。
   1. 全局模板；使用 `archedata` 或 `archetype` 标签定义。
- `body` 标签用于定义文档的本体内容。在 HVML 文档中，可以定义多个 `body` 本地内容，使用 `id` 属性区别不同的本体内容。在执行过程中，可通过 `load` 元素装载不同的本体内容。

其次，从上面的 HVML 程序看出，HVML 使用了类似 HTML 的标签（tag），同时也可混用 HTML 的标签。两者的区别在于：

1. HVML 是动态的，表述的是程序，而 HTML 是静态的，表述的是文档。
1. HVML 的大部分标签用来定义动作元素。每个动作元素执行一个或者一组操作，所以这些标签使用英文中的动词；而 HTML 标准通常使用名词或其简写作为标签名称，如 HTML 的常见标签 `p` 是 paragraph（段落）的简写。
1. HVML 可混合使用 HTML 的标签，使用非 HVML 的标签可定义外部元素。HVML 赋予所有的外部元素一个统一的操作：克隆该元素的属性和内容到目标文档并隐式调整 HVML 程序的一些上下文信息。
1. HVML 的标签名称、属性名称、变量名称和规则关键词是区分大小写的，这主要是为了和 XML 相关规范保持一致。

现在对照上面的例子介绍 HVML 的一些特点。本文档其他章节也会引用这个例子的片段。

首先是数据驱动编程（data-driven programming）。通过基于数据的迭代、插入、更新、清除等操作，开发者不需要编写程序或者只要少量编写程序即可动态生成最终的 XML/HTML 文档。比如上面示例代码中的 `iterate` 标签，就在`$users` 变量代表的数据（在 `header` 中使用 `init` 标签定义）上做迭代，然后在目标文档的 `ul` 元素中插入了若干 `li` 元素。而 `li` 元素的属性（包括子元素）由一个 `archetype` 标签定义，其中使用 `$？` 来指代被迭代的 `$users` 中的一个数据成员。

在上面的示例代码中，我们使用了系统内置变量 `$TIMERS` 来定义定时器，每个定时器有一个全局的标识符，间隔时间以及是否激活的标志。如果要激活一个定时器，我们只需要使用 HVML 的 `update` 标签来修改对应的键值，而不需要调用某个特定的编程接口。这是数据驱动编程的另一个用法——我们不需要为定时器或者其他的类似模块的操作提供额外的 API。

另外，在上面的示例代码中，我们通过 `observe` 标签观察新的数据或文档本身的变化以及用户交互事件，可实现 XML/HTML 文档或数据的动态更新。比如在最后一个 `observe` 标签中，通过监听用户头像上的点击事件来装载一个新的 `user.hvml` 文件，以模态对话框的形式展示对应用户的详细信息。

其次是彻底解除界面、交互和数据之间的耦合。通过 HVML 引入的编程模型和方法，用于表述界面的 XML/HTML 文档内容可完全由 HVML 生成和动态调整，这避免了在程序代码中直接操作文档的数据结构（即文档对象树，或简称 DOM 树），而程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。比如：

- HVML 可在文档片段模板或者数据模板中定义数据和 DOM 元素之间的映射关系（如示例代码中的 `archetype` 或 `archedata` 标签），而无需编写额外的代码完成数据到 DOM 元素属性、内容等的赋值操作。
- HVML 将错误和异常的展现和程序代码分离了开来，程序只要产生适当的错误或者异常（如示例代码中的 `error` 和 `except` 标签），而对错误或者异常的处理则直接在 HVML 中定义，这不仅仅将程序和界面隔离了开来，同时还提高了代码的可维护性。

再次是数据的 JSON 表达。HVML 对文档和数据的操作提供了一致接口。HVML 要求所有外部数据均使用 JSON 格式表述，JSON 格式是一种人机共读的数据表述形式，可在数值、字符串、数组、字典等基本数据单元的基础上表述复杂对象。由于 HTML/XML 文档片段（DOM 子树）可表述为 JSON 格式的数据，因此，HVML 亦可用于操作使用 JSON 表述的数据。在 HVML 中，我们还提供了对动态 JSON 对象的支持，我们可以使用外部脚本程序来实现自己的动态 JSON 对象，且可以在这些对象上执行类似函数调用一样的功能。

最后，HVML 通过动作标签（通常都是一些英文的动词，如 `init`、`update`、`iterate` 等）以及与之配合的介词或副词属性来定义动作标签所依赖的数据、目标操作位置以及执行条件来完成特定的文档操作。这和常见的编程语言有很大不同，HVML 的描述方式更加贴近自然语言，从而可以大幅降低学习门槛。

#### 2.1.2) 基本数据类型

HVML 定义如下基本数据类型：

- 空值（null）。
- 布尔值（boolean）。用于表示真假逻辑值，可取 `true` 或 `false` 两种值。
- 数值（number）。用于表达整数或浮点数，一般情况下，等价于 C 语言的 `double` 类型（双精度浮点数）。
- 字符串（string）。用于表达文本，始终使用 UTF-8 编码。
- 数组（array）。可使用索引引用的多个数据项。
- 对象（object）。用单个或多个键值对（key-value pair）表示，亦称字典、关联数组等；键值对也常被称作属性（property）。

以上基本数据类型的表达方式兼容 [JSON]。

#### 2.1.3) 扩展数据类型

本规范要求 HVML 解释器要实现如下扩展的数据类型以及两种特殊数据类型：

- 未定义（undefined）。该数据仅在内部使用，用来表达错误；或在更新容器数据时移除一个成员。
- 有符号长整数（longint），应实现为 64 位无符号整数。
- 无符号长整数（ulongint），应实现为 64 位有符号整数。
- 长浮点数（longdouble），对应 C 语言 long double 类型。
- 字节序列（bsequence）。
- 集合（set），特殊的数组，其中的成员可根据其值或者对象数组上的唯一性键值确保唯一性。

以上扩展数据类型的表达方式使用本文档定义的 [3.1.3.2) 扩展 JSON 语法](#3132-扩展-json-语法)。

HVML 还定义有如下两种特殊数据类型：

- 动态值（dynamic value）。动态值本质上由 `获取器（getter）` 和 `设置器（setter）` 方法构成，读取时，由获取器返回对应的值，设置时，由设置器完成对应的工作。
- 原生实体（native entity）。由底层实现的原生实体，通常用于代表一些可执行复杂操作的抽象数据，如读写流、长连接等。这些复杂操作包括实现虚拟属性上的获取器或设置器方法，实现对原生对象的观察（observe）等。

上述特殊数据类型属于内部数据类型，仅在运行时有效，在 HVML 代码中可通过变量和表达式访问。

动态值或者原生实体均可以作为对象的属性值存在，从而构成我们常说的动态对象。

在 HVML 中，我们扩展了对象的属性使之具有动态特性。一个动态属性，通常由 HVML 解释器或者外部脚本程序定义或实现，要么是一个动态值，要么是一个原生实体。

从 HVML 文档的角度看，访问一个动态属性的方法和访问一个常规属性的方法并无二致。比如，我们通过访问 `$SYSTEM.time` 可获得当前的 UNIX 时间戳。但是，在不同的时刻访问 `$SYSTEM.time`，获得的值将会不同。这是因为这里的 `time` 就是一个动态属性。

作为动态属性的另一个特性，我们可以将某个特定的属性视作对象而在其上提供虚拟的属性，比如当我们访问 `$SYSTEM.time.iso8601` 时，将获得当前时间的 ISO 8601 标准字符串（如 `2020-06-24T11:27:05+08:00`）。

更进一步，我们还可以将某个特定的属性当作函数使用，通过传递参数来获得不同的返回值，或者对该属性设置特定的值。比如在 `$SYSTEM` 对象上，如果我们要获取对当前时间执行特定格式化的字符串，可以使用 `$SYSTEM.time('%H:%m')`，这时，我们将获得类似 `11:27` 的时间字符串。如果我们要设置当前时间，则可以使用 `$SYSTEM.time(! 123456 )`。

这里，我们引入了两种运算符：`( )` 和 `(! )`。本质上，前者对应于动态属性的获取器方法，后者对应于动态属性的设置器方法。

除了内置的 `$SYSTEM` 动态对象之外，我们还可以通过外部脚本来实现自定义的动态对象，并通过 `init` 标签将这个动态对象和某个变量绑定在一起，如：

```html
    <init as="math" from="purc_dvobj_math" via="LOAD" />
```

之后，当我们访问 `$math.pi` 时，将返回 PI 的值，如果访问 `$math.sin($math.pi)` 将返回 `0.0`。

当我们引用一个动态对象上并不存在的动态属性，或者不存在的虚拟子属性，或者无法在该属性上执行函数操作时，HVML 解释器或该对象的外部脚本实现将返回错误或抛出异常。

通过这样的设计，我们可以方便有效地扩展 HVML 的功能，并通过动态对象和外部模块交换数据，或者调用外部模块的功能。

#### 2.1.4) 任意数据类型的强制转换规则

##### 2.1.4.1) 数值化

在需要将任意数据强制转换为数值的情形下，按如下规则转换为数值：

1. `null`、 `undefined`、 `false` 值转换为 0。
1. `true` 值转换为 1。
1. 空字符串按 0 处理；非空字符串按照 EJSON 数值的规则进行转换，比如 `123.34` 将转换为实数，`abcd` 转换为 0。
1. 空字节序列按 0 处理；非空字节序列取最高 64 位（最长 8 字节）按小端字节序转为有符号的长整数，再转为数值。
1. 动态值，不传递任何参数调用获取器方法，若返回值为无效值则取 0，若返回值为数值型，则取其数值，若返回值为非数值型，按本规则递归处理。
1. 原生实体，尝试获取 `__number` 键名的获取器方法。若存在该方法，则不传递任何参数调用这个获取器，参考动态值处理；若不存在该方法，则取 0。
1. 数组的数值，累加所有数组单元，若数组单元不是数值型，按本规则递归处理。
1. 字典的数值，累加所有键值，若某键值不是数值型，按本规则递归处理。

以上操作称为“数值化（numberify）”。

##### 2.1.4.2) 布尔化

当需要获得任何数据的布尔逻辑真假值时，按如下规则转换为布尔值：

1. 对如下情形始终视作 `false`：
   -  `null`、 `undefined`、 `false`。
   -  数值: 0。
   -  空字符串。
   -  空数组。
   -  空对象。
   -  空集合。
   -  长度为零的字节序列。
1. 如下情形始终视作 `true`：
   - `true`。
   - 非零数值。
1. 其他情形首先转换为数值，若结果为 0 则视作 `false`，结果非零则视作 `true`。

以上操作称为“布尔化（booleanize）”。

##### 2.1.4.3) 字符串化

在需要将任意数据强制转换为字符串的情形下，按如下规则转换：

1. `null`、 `undefined`、 `true`、 `false` 等，使用对应的关键词字符串。
1. 数值（包括长整形等），格式化输出，具体输出形式，由解释器确定。
1. 字符串，使用 UTF-8 编码串行化。
1. 字节序列，使用字节序列的十六进制表达方式，全大写。
1. 动态值，统一输出为 `<dynamic: %getter, %setter>`，其中 `%getter` 和 `%setter` 分别表示对动态值两个方法的格式化输出，具体形式，由解释器确定。
1. 原生实体，统一输出为 `<native: %entity>`，其中 `%entity` 表示对原生实体的格式化输出，具体形式，由解释器确定。
1. 数组：连接所有成员字符串化之后的字符串，每个成员之后追加（+U000A NEWLINE）字符。
1. 字典：连接所有属性键名对应的字符传以及键值对应的字符串，两者之间使用冒号（+U003A COMMA）分隔，每个属性之后追加（+U000A NEWLINE）字符。

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
id:1
name:Tom
age:2
male:true

id:2
name:Jerry
age:3
male:true

```

字符串化数据的目的，是为了按照字符串对多个数据进行对比、排序等操作。

注意，“字符串化”不同于“序列化”，后者指按照 EJSON 格式化数据。

##### 2.1.4.4) 序列化

“序列化（serialize）”指按照 EJSON 格式化任意数据。EJSON 格式，可见本文档 [3.1.3.2) 扩展 JSON 语法](#3132-扩展-json-语法)。

序列化时，若数据中包含有如下数据，则需做特别处理：

1. 动态值，统一输出为 `<dynamic>`。
1. 原生实体，统一输出为 `<native>`。

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
- 对象（object）。
- 集合（set）。

和不可变数据相反，可变数据的含义是，我们可以在运行时改变这个数据的值。本质上，可变数据都是容器类数据，也就是数组、对象和集合。我们改变这些数据的值，本质上改变的是这些数据所包含的内容，比如删除其中的一个数据项。

在 HVML 中，我们可以在可变数据上使用 `update`、 `erase`、 `clear` 等标签执行更新、删除或者清除操作，这些操作本质上修改的是其中的数据项。

我们也可以在原生实体上执行更新、删除或者清除操作，但这种情况下，操作的是原生实体代表的内部数据，而不是原生实体本身。

HVML 不提供任何操作可以用来改变不可变数据，但开发者可以使用 `init` 标签重置一个变量为其他数据。

#### 2.1.6) 变量

除了上述用于定义文档整体结构的标签外，HVML 提供了如下用于定义数据的标签：

- `init`：该标签初始化一个变量；我们将有名字的数据称为变量。在 HVML 文档的头部（由 `head` 标签定义）使用 `init` 标签，将初始化一个全局变量。在 HVML 文档的正文（由 `body` 标签定义）内使用 `init` 标签，将定义一个仅在其所在父元素定义的子树中有效的局部变量。我们可以直接将 JSON 数据嵌入到 `init` 标签内，亦可通过 HTTP 等协议加载外部内容而获得，比如通过 HTTP 请求，此时，使用 `from` 属性定义请求的 URL，`with` 属性定义请求的参数，`via` 属性定义请求的方法（如 `GET` 或 `POST`）。
- `connect`：该标签定义对一个外部数据源的连接，比如来自 MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包。
- `disconnect`：该标签关闭先前建立的外部数据源连接。
- `bind`：该标签用于定义一个表达式变量。

在 HVML 中，当我们引用变量时，我们使用 `$` 前缀，比如 `$global`、 `$users`、 `$?` 等。当我们要指代普通的 `$` 字符时，我们使用 `\` 做转义字符。

`$global`、 `$users` 这种变量称为命名变量（named variables），又分为全局变量或者局部变量。`$?` 这类使用特殊字符的变量称为上下文变量（context variables），根据 HVML 解释器的解析上下文确定其值。

HVML 定义的上下文变量罗列如下：

- `$?`：指父操作给出的结果数据，即父操作结果数据。
- `$~`：指当前操作数据，即对介词属性 `on` 的属性值求值后的结果数据。
- `$@`：指当前文档操作位置，即代表当前操作范围的 DOM 子树，也就是介词属性 `in` 定义的当前文档操作位置。
- `$#`：指父操作结果数据所包含的数据项个数，同 `$EJSON.count($?)` 的返回值。
- `$*`：指父操作结果数据的类型，用字符串表示，同 `$EJSON.type($?)` 的返回值。
- `$:`：若父操作结果数据是一个键值对象，则该变量表示键名，其他情形下为未定义。
- `$=`：若父操作结果数据是一个键值对象，则该变量表示键值，其他情形下为未定义。

以下上下文变量专用于迭代时（其他情形下为未定义）：

- `$%`：当前迭代的索引值，比如第一次迭代，该变量的值为 0，第二次迭代，该变量的值为 1，以此类推。

我们还可以在上下文变量的符号之前添加一个正整数来引用从当前向上回溯 `<N>` 级的上下文数据：

- `$<N><SYMB>`，如 `$1&`、 `$1?` 等：指从当前上下文向上回溯 `<N>` 级的上下文数据；这里的 `<N>` 必须是正整数。这个上下文变量主要用于访问执行栈上祖先动作元素对应栈帧的上下文数据。

在 HVML 中，我们通常使用 `as` 属性来给数据命名，但 HVML 保留如下几个变量名称用于特殊场合，我们称为内置全局变量，习惯上全部使用大写形式。

##### 2.1.6.1) `$REQUEST`

`$REQUEST`：主要用来表述装载文档时，由其他模块提供的请求数据，一般由 HVML 解释器在装载 HVML 文档时生成。比如下面的 Python 脚本装载一个 HVML 文档，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在 HVML 文档中，我们可使用 `$REQUEST.nrUsers` 来引用上述脚本代码传入的值（`10`）。

##### 2.1.6.2) `$SYSTEM`

`$SYSTEM`：一个用于访问系统基本功能的动态对象，可用于提供系统时间、当前语言地区信息、随机数、机器名称等。比如，我们要获得当前的 Unix 时间戳，可直接使用 `$SYSTEM.time`，如果要获得一个随机数，可直接使用 `$SYSTEM.random`，如果我们要获得当前的机器名称，可使用 `$SYSTEM.name`，如果要获取当前语言地区信息，可使用 `$SYSTEM.locale`。

在 HVML 中，`SYSTEM` 变量本质上是一个动态对象，无须初始化即可使用。

##### 2.1.6.3) `$DOC`

`$DOC` 是一个动态对象，该对象表述的是 HVML 生成的目标文档。我们可以使用该对象上的特定键名以及 `query` 方法通过 CSS 选择器获取目标文档上的特定元素或者元素汇集，如：

1. `$DOC.doctype`：获取该目标文档的 `doctype` 节点。
1. `$DOC.query("#foo")`：获取该目标文档中 `id` 属性值为 `foo` 的元素。
1. `$DOC.query(".bar")`：获取该目标文档中类名为 `foo` 的元素或元素汇集。

##### 2.1.6.4) `$TIMERS`

`$TIMERS`：用于全局的定时器，具有固定的格式，初始为空数组。可使用 `update` 等元素修改它的值，如：

```html
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

```html
    <choose on="$TIMERS" by="FILTER: AS 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>

    ...

    <observe on="$TIMERS" for="expired:foo" in="#the-header" >
        <update on="> span.local-time" at="textContent" with="$SYSTEM.time('%H:%m')" />
    </observe>
```

##### 2.1.6.5) `$L`

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

##### 2.1.6.6) `$T`

该变量主要用于文本的本地化，包含两个属性：

1. `map`：用于保存本地化字符串映射关系的对象，初始为空对象。
1. `get`：用于字符串的本地化，若未在 `map` 中定义映射关系，则返回原字符串。

常用用法如下：

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$T.map" from="https://foo.bar/messages/$SYSTEM.locale" to="merge" />

        <title>$T.get('Hello, world!')</title>
    </head>

    <body>
        <p>$T.get('Hello, HVML!')</p>
    </body>

</hvml>
```

在上面的 HVML 代码中，我们在头部使用 `update` 标签设置了 `$T.map`，该变量的内容来自包含有 `$SYSTEM.locale` 的一个 URL。注意其中的 `$SYSTEM.locale` 是一个 JSON 求值表达式，会返回当前系统的语言地区标识符（如 `zh_CN`），HVML 解释器求值并替代后的最终 URL 为：`https://foo.bar/messages/zh_CN`。从该 URL 获得的文件内容可能为：

```json
{
    "Hello, world!": "世界，您好！",
    "Hello, HVML!": "HVML，您好！",
}
```

以上代码最终会被解释为如下的 HTML 文档：

```html
<html>
    <head>
        <title>世界，您好！</title>
    </head>

    <body>
        <p>HVML，您好！</p>
    </body>
</html>
```

##### 2.1.6.7) `$EJSON`

该变量主要用于获得指定数据相关的信息，比如类型、数据项个数，并完成数据的数值化、字符串化、序列化等。

1. `$EJSON.type(<any>)`：获取数据的类型，如 `null`、 `boolean`、 `longdouble` 等，返回表示数据类型的字符串。
1. `$EJSON.count(<any>)`：获取给定数据的数据项个数。
1. `$EJSON.numberify(<any>, ["number | longint | ulongint | longdouble": the number subtype to return])`：对给定的数据执行数值化，结果数据的类型为指定的实数类型，默认为 `number`。
1. `$EJSON.stringify(<any>)`：对给定数据执行字符串化，结果数据的类型为字符串。
1. `$EJSON.serilize(<any>, <string: options>)`：对给定数据执行 EJSON 序列化，结果数据的类型为字符串。
1. `$EJSON.select(<container>, <string: selector>[, <boolean: recursively])`：按照给定的选择器返回给定容器数据中符合条件的数据项或一个数据汇集。

各数据类型的数据项个数规则如下：

- 数组或集合：数据项个数指数组成员数量或集合元素数量。
- 对象：数据项个数指键值对数量。
- 其他数据类型，如字符串、数值、 `true`、 `false` 或 `null` 等：数据项个数为 1。
- `undefined`：数据项个数为 0。

在 `select` 方法中，我们对第二个参数（`selector`）使用类似 CSS 选择器的方式来返回某个数据项或者某些数据项的汇集，比如：

- 在针对基于字典数据的树形结构或者数组中：
   - `[<key_name>]`：表示定义有 `<key_name>` 键名的数据项。
   - `[<key_name> = <value>]`：表示所有 `<key_name>` 的键值等于 `<value>` 的数据项。
   - `[<key_name> ~= <value>]`：表示所有 `<key_name>` 的键值包含以 `<value>` 作为空白字符分隔的完整词元的数据项。
   - `[<key_name> *= <value>]`：表示所有 `<key_name>` 的键值包含以 `<value>` 为子字符串的数据项。
   - `[<key_name> ^= <value>]`：表示所有 `<key_name>` 的键值以 `<value>` 打头的数据项。
   - `[<key_name> $= <value>]`：表示所有 `<key_name>` 的键值以 `<value>` 结尾的数据项。
- 针对数组：
   - `:nth-child(<n>)`：表示当前数组中第 `<n>` 个数据项；`<n>` 可以是数字、关键词或者公式。
   - `<type>:nth-of-type(<n>)`：表示当前数组中所有类型为 `<type>` 的第 `<n>` 个数据项；`<n>` 可以是数字、关键词或者公式。

使用上述选择器之后，相当于对原有的单个数据项做了一些过滤。比如 `<choose on="$users" ... />` 选择了整个 `$users` 数组内容做后续处理，但如果使用 `<choose on="$EJSON.select($users, ":nth-child(even)")` 则仅选择下标为偶数的数组单元。

##### 2.1.6.8) 集合

在 HVML 中，我们可以使用 JSON 数组来定义一个集合。集合有如下特征：

- 按照指定的数据项唯一性判断条件，具有唯一值的元素在集合中只能有一项。
- 我们可以在集合上执行合并、相交、相减等集合特有的操作。

当我们需要定义集合时，使用 `init` 标签的 `uniquely` 副词属性，必要时，通过 `via` 属性值指定唯一性判断条件。

我们按如下规则判断两个数据项是否相等：

- `number`、 `longint`、 `ulongint` 和 `longdouble` 视作同一种类型，强制转换为解释器可支持的最高精度实数类型后做对比，两个实数相同时，相等。
- 其他类型不同的数据项不相等。
- 两个字符串相同时，相等。
- 两个字节序列逐字节相同时，相等。
- 两个动态值的获取器和设置器相等时，相等。
- 两个原生实体指向同一原生实体对象时，相等。
- 两个数组的成员一对一相同时，相等。
- 两个字典字符串化后的字符串相同时，相等。

以上有两种情况使用字符串对比。为此，在使用 `init` 标签初始化集合时，我们可使用 `casesensitively` 或者 `caseinsensitively` 两个副词属性来指定字符串对比是否对大小写敏感；默认对大小写敏感。另外，我们还可以使用 `init` 元素的 `by` 属性指定用于对比两个数据是否相等的外部执行器。

比如，我们使用下面的 `init` 标签定义一个字符串集合：

```html
    <init as="locales" uniquely>
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK", "en_US" ]
    </init>
```

上述用来初始化字符串集合的数组中包含有重复两个值 `en_US`，因此，在最终的结果中只会保留一项。

但针对字典，我们可以定义使用某个特定的键值作为唯一性判断条件。比如我们通常使用 `id` 来表示数据项的唯一标识符。这个定义类似关系数据库中的主键（primary key）。

我们使用 `init` 标签的 `via` 属性值来定义字典的唯一性键名。当使用多个键名作为唯一性条件时，使用空格分隔。比如：

```html
    <init as="users" uniquely via="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>
```

上面的示例代码定义了一个使用 `id` 键名作为唯一性判断条件的集合。假如用来初始化这个集合的字典数组中多一项 `id` 为 `2` 的数据项，则之前 `id` 为 `2` 的数据项会被后来 `id` 为 `2` 的数据项覆盖。比如，

```html
    <init as="users" uniquely via="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "David", "region": "zh_CN" }
        ]
    </init>
```

上述代码初始化后的 `$users` 中，`id` 为 `2` 的用户姓名将为 `David`。

需要说明的是，内置全局变量 `$TIMERS` 本质上就是一个使用键名 `id` 的键值作为唯一性判断条件的字典集合。

HVML 为集合类数据提供了若干抽象的数据操作方法，比如求并集、交集、差集、异或集等。详情见 `update` 标签的描述。

##### 2.1.6.9) 表达式变量

HVML 允许使用 `bind` 标签将一个表达式绑定到一个变量：

```html
    <bind on="$users[$MATH.random(10)]" as="me" />
```

这个变量对应的并不是上述标签定义的元素被执行时 `$users[$MATH.random(10)]` 的值，而是 `$users[$MATH.random(10)]` 这个表达式。

当我们需要对绑定的表达式求值时，使用 `$me.eval`。由于上面的示例表达式使用了 `$MATH` 的 `random` 方法，所以每次求值将获得不同的结果。

另外，当表达式在不同的上下文环境中执行时，由于所引用变量的作用域发生了变化，所得到的结果也会出现不同。

我们可以使用 `observe` 标签观察一个绑定了表达式的变量，从而根据变量值的变化做出一些相应的处理。

比如，我们可以将某个目标文档元素的属性或者内容绑定到某个变量上，然后使用 `observe` 元素处理其上的 `change` 事件：


```html
    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />
    <bind on="$DOC.query('#the-user-name').attr.value" as="user_name">
        <observe on="$user_name" for="change">
        </observe>
    </bind>
```

#### 2.1.7) 文档片段的 JSON 数据表达

HVML 解释器按照固定的策略将 DOM 子树（文档片段）视作一个可以用 JSON 表达的数据来访问。比如对下面的 HTML 片段：

```html
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

需要注意的是，将 DOM 文档结构用 JSON 数据表达时，可以有多种不同的转换策略。但 HVML 解释器会采用固定的结构来进行转换，以方便在其上执行结构化查询。具体来讲：

1. 每个元素使用一个字典数据来表述，用 `hvml:tag` 键值对来描述元素的标签，用 `attr` 键值对来描述元素的属性，用 `children` 键值对来描述该元素的子元素或者内容。
1. 元素的所有属性构成了一个字典数据。
1. 所有元素的文本内容被视为一个虚拟的子元素，其标签名为 `txt`，其属性 `content` 定义了真正的文本内容。
1. 所有元素的数据内容被视为一个虚拟的子元素，其标签名为 `json`，其属性 `content` 使用扩展 JSON 格式定义了真正的数据内容。
1. 每个元素的子元素（包括文本内容和数据内容在内），用数组来描述，每个数组单元是一个字典数据，用于定义子元素。

在引用元素的属性或者文本内容时，我们使用如下约定：

- 当我们在一个元素上获取 `textContent` 键名的键值时，相当于引用这个元素的文本内容，包括所有子元素的文本内容，按照深度优先遍历路径连接起来的字符串。
- 当我们在一个元素上设置 `textContent` 键值时，相当于移除该元素的所有子元素（若有），并设置该元素的文本内容为对应的键值。
- 当我们在一个元素上获取 `jsonContent` 键名的键值时，相当于引用这个元素的所有数据内容，包括所有子元素的数据内容按照深度优先遍历路径形成的汇集。
- 当我们在一个元素上设置 `jsonContent` 键值时，相当于移除该元素的所有子元素（若有），并设置该元素的数据内容为对应的键值。
- 当我们在一个元素上获得 `content` 键名的键值时，相当于获得这个元素所有子元素的文档片段的文本表达；在设置该键名的键值时，相当于使用文本表达来创建该元素的子元素（替换掉原有子元素）。
- 当我们在一个元素上获得 `content[<index>]` 键名的键值时，相当于获得这个元素第 `<index>` 个子元素的文本表达；在设置该键名的键值时，相当于使用文本表达来创建该元素的内容或者子元素（替换掉原有子元素）。
- 我们可以使用 `attr.class` 这样的复合键名来引用一个元素的特定属性。引用一个未定义的属性时，按属性值为 `undefined` 值对待。
- 我们可以使用 `style.width` 这样的复合键名来引用一个元素的特定 CSS 属性。引用一个未定义的 CSS 属性时，按属性值为 `undefined` 值对待。

注：目前只有 SGML 支持用数据作为元素的内容，即 `jsonContent`。

#### 2.1.8) 数据模板和文档片段模板

HVML 定义了两种模板标签，用于定义可以插入 DOM 文档中的 XML/HTML 模板以及 JSON 数据模板：

- `archedata`：该标签用于定义一个 JSON 格式的数据项模板。
- `archetype`：这个标签可用于定义一个 XML/HTML 格式的文档片段模板。类似 HTML5 的 `template` 标签，其中的内容可以是一个 XML 片段，也可以是一个 HTML 片段，前者可用于生成特定 GUI 系统的界面描述片段，后者可以生成 HTML 文档的片段。

当使用 `archedata` 和 `archetype` 定义的元素具有 `raw` 属性时，其定义的文档片段将不执行 JSON 表达式置换操作。

在定义模板时，可直接定义文档片段和数据之间的映射关系。如：

```html
    <archetype name="user_item">
        <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.name</span>
        </li>
    </archetype>

    <archedata name="item_user">
        {
            "id": "$?.attr.data-value", "avatar": "$?.children[0].attr.src",
            "name": "$?.children[1].children[0].textContent", "region": "$?.attr.data-region"
        }
    </archedata>

    <archetype name="unknown_user_item" raw>
        <li class="user-item">
            <img class="avatar" src="/def-avatar.png">
            <span>Unknown</span>
        </li>
    </archetype>
```

在上面的例子中，`archetype` 标签定义了一个文档片段模板，可用于生成真实的文档片段并插入到合适的 DOM 树位置。HVML 解释器在将该模板克隆并插入到真实的文档 DOM 树时，会将当前上下文中的数据按照给定的映射关系进行替换。在 HVML 中，`$?` 是一个特殊的上下文变量，用来指代动作标签执行时的父操作结果数据。类似 `$?.id`、 `$?.name` 这样的字符串将被视为 JSON 求值表达式进行求值，最终使用当前上下文的数据来替代。

在上面的例子中，`archedata` 标签定义了一个数据模板，其处理类似 `archetype`，但主要执行相反的操作，通常用于将一个 DOM 子树映射为一个 JSON 数据项，或者将一个 JSON 数据项映射到另一个结构不同的 JSON 数据项。

在上面的例子中，第二个 `archetype` 标签定义了一个裸文本模板，其中包含一段 XML/HTML 文档片段，可克隆到目标位置，但不做任何 JSON 求值表达式的处理，即使包含合法的 JSON 求值表达式。

本质上，`archedata` 和 `archetype` 定义的模板内容是一个字符串数据，其变量名由 `name` 属性定义。

注意，用于引用特定的 `archetype` 或 `archedata` 模板的变量名，和 HTML/XML 不同，HVML 不要求该标识符是全局唯一的，而只要求在 HVML 的同一级兄弟元素中唯一，这带来了一定的便利。比如：

```html
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

另外，HVML 保留 `ERROR` 或 `EXCEPT` 两个名称定义错误和异常模板，详情见本文档 [2.4) 模板标签](#24-模板标签) 小节。

#### 2.1.9) 用来操作数据或元素的动作标签

HVML 定义有如下几个基本的动作标签，用于操作数据或者元素：

- `init` 标签用来初始化或重置一个变量。
- `update` 标签用来在指定的元素、元素汇集或者容器数据上执行更新操作。
- `clear` 标签用来在指定元素或者容器数据上执行清空操作，通常意味者删除当前元素或者数据的所有子元素或者数据项。
- `erase` 标签用来清除指定的元素、元素属性或容器中的数据项。
- `test` 标签定义在一个元素节点或者数据项上执行测试动作，用于实现依赖数据值的条件操作。
- `match` 标签用来定义 `test` 元素的子元素，以定义一个匹配分支。
- `iterate` 标签用来定义在一个可迭代数据或者元素上的迭代动作。
- `reduce` 标签用来定义在一个可迭代数据或者元素上执行归约（reduce）动作。
- `observe` 标签用来定义针对特定数据或者元素上的观察动作；`fire` 标签用来显式发起一个事件；`forget` 标签用来撤销对某个数据或者元素上的观察动作。

在 HVML 中，动作元素具有如下的特点：

1. 动作元素中不能直接包含使用目标标记语言的标签定义的子元素，但动作元素可以作为使用目标标记语言的标签定义的元素之子元素。
1. 每个动作元素都有一个输入数据，一般来自其父动作元素。
1. 每个动作元素有一个执行结果数据，用于其直接子元素的输入数据。
1. 每个动作元素有一个文档操作位置，对应最终文档的某个元素。一般继承自其父元素；当动作元素不使用 `in` 属性修改文档操作位置时，文档操作位置就不会发生变化。

我们将一个动作元素及其后代（descendant）动作元素形成的树形结构称为动作子树。

另外，在 HVML 中使用目标标记语言的标签定义的元素（如示例代码中的 `body`、 `ul` 等），通常形成了最终文档的结构骨架（skeleton），因此，我们将这类元素称为 `骨架` 元素。在 HVML 解释器中，我们将骨架元素视作一种特殊的动作元素：

- 其默认动作为 `noop`，即空操作。
- 骨架元素不需要输入数据，但隐含指定了可继承给后继动作元素的操作范围（对应上下文变量 `$@`），即该骨架元素在最终 DOM 树中对应的子树。
- 骨架元素对应的文档操作范围作为其执行结果传给其子动作元素，也就是子动作元素的上下文变量 `$?`。

通过动作标签，HVML 可完成对文档或数据的插入、删除、修改等操作，以及通过观察数据的变化而动态调整 DOM 树的行为。我们将在本文档 [2.5) 动作标签](#25-动作标签) 中详细讲述这些动作标签。

#### 2.1.10) 其他动作标签

HVML 还定义有如下一些动作标签：

- `request` 标签用于向一个外部数据源发出一个请求以获得结果数据。
- `connect` 标签用于连接到一个指定的外部数据源，并绑定一个变量名。
- `send` 标签用来在指定的长连接上发出一个消息。
- `disconnect` 标签用于显式关闭一个先前建立的外部数据源连接。
- `load` 标签用来装载一个由 `from` 属性指定的新 HVML 文档，并可将 `with` 属性指定的对象数据作为请求参数传递到新的 HVML 文档。
- `back` 标签用于返回到当前会话中的特定页面，或者终止当前的模态对话框。
- `define` 和 `include` 标签用于实现操作组的复制。我们可以通过 `define` 定义一组操作，然后在代码的其他位置通过 `include` 标签包含这组操作。
- `call` 和 `return` 标签用于实现类似函数调用的功能。我们可以通过 `call` 同步或者异步调用一个操作组，并在操作组中使用 `return` 返回一个结果。

#### 2.1.11) 错误和异常标签

为了方便处理错误和异常情形，HVML 定义了如下错误或异常处理标签：

- `error`：出现错误时，插入其中包含的内容到目标 DOM 树的当前位置。`error` 标签支持 `type` 属性，用来指定错误类型。如：
   - `nodata` 表示不存在指定的数据。
   - `notready` 表示数据尚未就绪。
   - `unauthorized` 表示连接指定的数据源时出现身份验证错误。
   - `timeout` 表示从数据源获取数据时出现超时错误。
- `except`：处理出现异常时，插入其中包含的内容到目标 DOM 树的当前位置。`except` 标签支持 `type` 属性，用来指定脚本的异常类型。如：
   - `SyntaxError` 表示语法错误。
   - `NotIterable` 表示指定的元素或数据不是可迭代的。
   - `IndexError` 索引错误，通常指索引值超出了数组范围。
   - `KeyError` 字典中的键值错误，通常指引用了一个不存在的键值。
   - `ZeroDivisionError` 表示遇到被零除错误。

另外，对可应对的错误或异常，HVML 提供了 `catch` 动作标签，可用来定义捕获特定的错误或者异常并进行处理。

注意：

1. 在 HVML 中，错误和异常标签必须包含在 HVML 动作元素或者骨架元素中作为其直接子元素使用，在错误和异常标签中，一般使用目标标记语言的标签定义文档片段。
1. 当出现错误或者异常时，错误或异常标签中定义的文档片段将被克隆并插入到目标文档的当前位置，并中止当前的操作。
1. 所有未被当前动作元素的 `error` 或 `except` 子元素捕获的错误或异常，将由执行路径上的父元素处理，直到根节点为止。根节点的错误或异常处理，定义在 `head` 元素中。

```html
    <head>
        ...
        <error raw>
            <p class="text-danger">There is an error.</p>
        </error>

        <except>
            <p class="text-warning">There is an execption: {$?.messages}</p>
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

                <error type="nodata">
                    <p>You forget to define the $global variable!</p>
                </error>
                <except type="KeyError">
                    <p>Bad global data!</p>
                </except>
            </test>
        </footer>
    </body>
```

#### 2.1.12) 介词属性

针对动作标签，HVML 定义了如下几个介词（如 `on`、 `in`、 `to` 等）属性，用于定义执行动作时依赖的数据（或元素）及其集合。如：

- `at`：在 `connect` 动作元素中，用于定义执行动作所依赖的外部数据源，其属性值通常是一个 URL，如 `tcp://foo.com:2345`、 `unix:///var/run/hibus.sock`。
- `from`：在 `init`、 `update`、 `load` 等动作元素中，用于定义执行动作所依赖的外部资源，其属性值通常是一个 URL。
- `on`：用于定义执行动作所依赖的数据、元素或元素汇集。未定义情形下，若父元素是动作元素，则取父动作元素的执行结果（`$?`），若父元素是骨架元素，则取骨架元素在目标文档中对应的位置（`$@`）。
- `in`：用于定义执行操作的目标文档位置或作用域（scope）。该属性通常使用 CSS 选择器定义目标文档的一个子树（sub tree），之后的操作会默认限定在这个子树中。如果没有定义该属性值，则继承父元素的操作位置，若父元素是骨架元素，则取该骨架元素在目标文档中对应的位置。
- `for`：在 `observe`、 `forget` 标签中，用于定义观察（observe）或解除观察（forget）操作对应的消息类型；在 `match` 标签中，用于定义匹配条件；在 `connect` 标签中，用于定义协议或用途。
- `as`：用于定义 `init`、 `connect`、 `bind`、 `load` 等元素绑定的变量名称、页面名称等。
- `with`：用于定义执行操作时的源数据；亦用于在 `init`、 `request`、 `send` 元素中定义发送请求或消息时的参数。
- `to`：用于在 `update` 标签中定义具体的更新动作，比如表示追加的 `append`，表示替换的 `displace` 等。
- `by`：主要用于定义执行测试、选择、迭代、归约操作时的脚本程序类或函数名称，分别称为选择器、迭代器或归约器，并统称为执行器（executor）。HVML 允许解释器支持内建（built-in）执行器。对简单的数据处理，可直接使用内置执行器，在复杂的数据处理情形中，可使用外部脚本定义的类或者函数。在 HVML 中，我们使用如下前缀来表示不同的执行器类型：
   - `CLASS: ` 表示使用外部程序定义的类作为执行器。
   - `FUNC: ` 表示使用外部程序定义的函数作为执行器。
   - `KEY: ` 表示使用某个键名或多个指定的键名返回对应的键值数据项，是一种内建的迭代器或选择器。
   - `RANGE: ` 表示使用指定的索引范围返回数据项，是一种内建的迭代器或选择器。
   - `TRAVEL: ` 表示使用指定的遍历方式遍历树状结构，是一种内建的迭代器或选择器。
   - `SQL: ` 表示在结构化数据上执行 SQL 查询，从而实现复杂的选择、迭代以及归约操作。
   - 其他针对字符串和数值的内建执行器，见本文档 [2.6.1) 内建执行器](#261-内建执行器) 小节。
- `via`：主要用于定义执行自定义选择、迭代、归约执行器时的过滤参数；亦用于在 `request`、 `send` 元素中指定请求方法（如 `GET`、 `POST`、 `DELETE` 等），或在 `init` 元素中用于指定集合的唯一性条件。

#### 2.1.13) 副词属性

针对某些动作标签，HVML 定义了如下几个副词属性，用于修饰操作行为。如：

- `synchronously`：在 `request`、 `send`、 `call` 等标签中，用于定义从外部数据源（或操作组）获取数据时采用同步请求方式；默认值；可简写为 `sync`。
- `asynchronously`：在 `request`、 `send`、 `call` 等标签中，用于定义从外部数据源（或操作组）获取数据时采用异步请求方式；可简写为 `async`。
- `exclusively`：在 `match` 标签中，用于定义排他性；具有这一属性时，匹配当前动作时，将不再处理同级其他 `match` 标签；可简写为 `excl`。
- `uniquely`：在 `init` 标签中，用于定义集合；具有这一属性时，`init` 定义的变量将具有唯一性条件；可简写为 `uniq`。
- `individually`：在 `update` 标签中，用于定义更新动作作用于数组、对象或者集合的单个数据项上；可简写为 `indv`。
- `once`：在 `observe` 动作标签中，用于指定仅观察一次，之后该观察将被自动解除。
- `casesensitively`：在 `init` 动作标签中初始化一个集合时，用于指定唯一性值的对比对大小写敏感，亦可用在 `sort` 标签；可简写为 `case`。
- `caseinsensitively`：在 `init` 动作标签中初始化一个集合时，用于指定唯一性值的对比对大小写不敏感，亦可用在 `sort` 标签；可简写为 `caseless`。
- `ascendingly`：在 `sort` 标签中，用于指定数据项的排列顺序为升序；可简写为 `asc`。
- `descendingly`：在 `sort` 标签中，用于指定数据项的排列顺序为降序；可简写为 `desc`。

注意：在 HVML 中，我们无需为副词属性赋值。

#### 2.1.14) 引用元素或数据

当我们需要引用某个元素或某个元素汇集时，我们使用 CSS 选择器。如：

- `.avatar` 表示所有 `class` 属性包含 `avatar` 的元素（集合）。
- `#the-user-list` 表示 `id` 属性为 `the-user-list` 的元素。
- `:root` 表示文档的根元素。
- `*` 表示文档中的所有元素。

然后使用 `$DOC.query()` 方法：

```html
    <update on="$DOC.query('#the-user-list > li')" at="attr.class" with="text-info" />
```

由于 `update` 标签的 `on` 属性值不允许使用整数、字符串等不可变数据，而 `observe` 标签的 `on` 属性值只能为可观察的原生实体或容器数据，因此，我们也可以在 `update` 和 `observe` 标签的 `on` 属性值中直接使用 CSS 选择器（字符串）。比如：

```html
    <update on="#the-user-list > li" at="attr.class" with="text-info" />
```

本质上，我们在上述两种标签的 `on` 属性值中使用 CSS 选择器选择目标文档的元素或者元素汇集时，解释器实质调用的是 `$DOC.query(<selector>)`方法。

由于通过 CSS 选择器指定的元素或者元素汇集通常指目标文档的位置，故而我们使用“目标文档位置”一词来统称元素或元素汇集。

如果要在 `update` 标签的 `on` 属性中引用一个数据，则必定使用 `$`、 `[`、或 `{` 作为前导字符：

- `$` 用来定义一个 JSON 求值表达式，如 `$TIMERS[0]`。
- `[` 用来定义一个 JSON 数组，如 `[ $foo, $bar, true, false ]`。
- `{` 用来定义一个 JSON 对象，如 `{ "$foo" : $bar, "foo": "bar" }`。

在其他可能导致混淆的动作标签中，可使用无等号的属性值表述语法，此时可或者使用字面的数值（number）、 `true`、 `false`、 `null` 等关键词：

```html
    <choose on 12345 by="ADD: LE 9999 BY 1000">
        ...
    </choose>
```

类似地，动作标签的 `with` 属性也使用这类规则来引用数据。详情见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性) 一节。

在 HVML 中，`on` 或者 `in` 介词属性在引用目标文档中的元素时，若使用前导字符 `>`，则将被限定在父元素 `in` 介词指定的范围内。如下面例子中，

```html
        <reduce on="$?" in="#the-user-statistics" by="class: RUserRegionStats">
            <choose on="$?.count" to="update" in="> h2 > span">
                <update on="$@" at="textContent" with="$?" />
            </choose>
            <clear on="#the-user-statistics > dl" />
            <iterate on="$?.regions" in="> dl" by="class: IUserRegions">
                <update on="$@" to="append" with="$region_to_users" />
            </iterate>
        </reduce>
```

`choose` 标签的 `in` 属性所指定的 `> h2 > span` 和 `#the-user-statistics > h2 > span` 等价；`iterate` 标签的 `in` 属性 `> dl` 和 `#the-user-statistics > dl` 等价。

变量的引用规则如下：

- 在 `archetype` 以及 `archedata` 标签定义的文档片段模板或者数据模板中，我们可以就属性值、文本内容引用上下文变量以及全局命名变量。此时，上下文变量由引用该模板的动作标签定义。
- 在 HVML 动作标签中，我们可以就属性值、文本内容引用上下文变量以及全局命名变量。此时，上下文变量由引用该模板的动作标签定义。
- 在使用目标标签语言定义的元素中，可以使用命名变量定义其属性值以及文本或数据内容。

#### 2.1.15) JSON 求值表达式

在上面的例子中，我们在文档片段模板或者数据模板中使用 `$` 前缀指定一个基于 JSON 数据的求值表达式。该求值表达式需要符合如下规则：

- 求值表达式可嵌套使用已绑定的动态对象，如上述示例中使用 `$string` 变量一样。
- 在可能有歧义的情况下，可使用一对 `{}` 包围整个 JSON 数据的求值表达式，比如：`user-$?.id` 和 `user-{$?.id}` 是一样的，但 `$user_item` 和 `{$user}_item` 是不一样的。
- 除上下文变量之外，变量名须符合一般的编程语言所定义的变量名规则，若使用正则表达式，可表达为：`/^[A-Za-z_][A-Za-z0-9_]*$/`。
- 使用 `\`（反斜杠）字符用于 `$` 、 `{`、 `}`、 `(`、 `)` 等字符的转义。

一个 JSON 求值表达式的返回值类型要么是一个字符串，要么是实际数据，这取决于使用这个表达式的位置。比如在一般的属性（不是 `on` 也不是 `with` 属性）时，将求值为字符串，而在 `archetype` 等模板中，若包含有 `raw` 属性，或在骨架元素中定义有 `hvml:raw` 属性，则其内容中的所有 `$` 将被视作字面值。

在本文档中，JSON 求值表达式被简称为 `JSONEE`。

有关属性值的指定语法，见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性) 一节。

JSON 求值表达式的语法，见本文档 [2.2.2) JSON 求值表达式的语法](#222-json-求值表达式的语法) 一节。

### 2.2) 规则、表达式及参数的描述语法

在 HVML 中，我们经常会使用属性中的表达式或者规则字符串来表示一个求值行为，比如：

```html
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

        <error type="nodata">
            <p>You forget to define the $global variable!</p>
        </error>
        <except type="KeyError">
            <p>Bad global data!</p>
        </except>
    </test>
```

`test` 标签中的 `by` 属性定义了 `KEY` 执行器的规则，而 `match` 标签中的 `for` 属性定义了一个可用来判断字符串是否匹配的逻辑表达式，如 `LIKE /^英语/` 表示父操作结果数据是否以 `英语` 打头。注意此处使用了正则表达式表示开头的 `^` 符号；如果使用正则表达式中表示结尾的 `$` 符号，则必须转义，以避免被 HVML 解析器将 `$` 作为 JSON 求值表达式处理。

#### 2.2.1) 规则描述语法

对此类规则，我们使用统一的描述语法，该语法也用来描述 JSON 求值表达式：

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
- `zH_Honkong`

而如下字符串无法正确匹配：

- `zh-C`
- `xx_CH`

#### 2.2.2) JSON 求值表达式的语法

一个合法的 JSON 表达式（`json_evaluation_expression`）需要符合如下的语法规则，且可递归使用：

```
    <json_evaluation_expression>: '$'<json_variable_addressing_expression> | '{$'<json_variable_addressing_expression>'}' | '{{$'<json_variable_addressing_expression>'}}'

    <extended_json>: 见本文档“3.1.3.2) 扩展 JSON 语法”，其中的 JSON value 可以是一个 JSON 求值表达式。

    <json_variable_addressing_expression>: <literal_variable_name>[<json_addressing_expression>, ...]
       <literal_variable_name>: 用于直接引用一个已命名的 JSON 数据。
       <json_addressing_expression>：用于引用一个 JSON 数据的子元素。

    <json_expression>: <json_evaluation_expression> | <extended_json>

    <json_addressing_expression>:
       '.'<literal_key_name>'(' [ws] <json_expression>[<',' [ws] <json_expression> [ws]>, ...] [ws] ')': 用于在动态对象上调用特定键名的获取器方法。
       '.'<literal_key_name>'(!' [ws] <json_expression>[<',' [ws] <json_expression> [ws]>, ...] [ws] ')': 用于在动态对象上调用特定键名的设置器方法。
       '.'<literal_key_name>: 用于引用一个对象的键值。
       '[' [ws] <json_evaluation_expression> | <quoted_key_name> | <literal_integer> [ws] ']': 用于引用一个数组的特定单元或者用于引用一个对象的键值，尤其当对应的键名不符合上面所说的变量名规则时。

    <literal_variable_name>: [<literal_positive_integer>]< '?' | '~' | '@' | '#' | '*' | ':' | '=' | '&' | '%' > | <literal_token>

    <literal_key_name>: <literal_token>

    <literal_integer>: /^-?\d+$/

    <literal_positive_integer>: /^[0-9]*[1-9][0-9]*$/

    <literal_token>: /^[A-Za-z_][A-Za-z0-9_]*$/

    <quoted_key_name>: '''<literal_char_sequence>''' | '"'<literal_char_sequence>'"'

    <ws>: /[ \t\f\n\r]+/    # white space
    <hws>: /[ \t]+/         # horinzontal white space
```

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

    literal_integer: /^-?[0-9]*[1-9][0-9]*$/
    literal_positive_integer: /^[0-9]*[1-9][0-9]*$/
    literal_non_negative_integer: /^[0-9]+$/

    ws: /[ \t\f\n\r]/   # white space
    hws: /[ \t]/        # horizontal white space
```

除此之外，

1. `literal_number` 遵循 [JSON] 语法。
1. `literal_integer` 本质上同 `literal_number`，只是在执行器的内部实现当中，应转换为最接近的整数使用。

另外，由于执行器的规则字符串通常作为属性值使用，考虑到属性值可使用单引号及双引号包围，因此，规则中的字符串字面值（string literal）可使用单引号（`'`）或双引号（`"`）包围：

- 当属性值本身使用双引号（`"`）包围时，规则中的字符串应使用单引号（`'`）包围。
- 当属性值本身使用单引号（`'`）包围时，规则中的字符串应使用双引号（`"`）包围。注意，此种情况下，属性值中的 `$` 将被当做字面值处理，不按 JSON 求值表达式解析。

所有规则中的字符串字面值，故而在这些字符串中包含字面的单引号（`'`）或双引号时（`"`）时，需使用转义，其他特殊字符，如 +U0009 TAB 等，参照 [JSON] 语法：

1. 需转义的特殊字符包括：`\\`、 `\/`（非强制）、 `\b`、 `\f`、 `\n`、 `\r`、 `\t`。
1. 当规则中的字符串使用单引号（`'`）包围时，字符串中包含的字面单引号（`'`）应使用转义表达：`\'`。
1. 当规则中的字符串使用双引号（`"`）包围时，字符串中包含的字面双引号（`"`）应使用转义表达：`\"`。
1. 当规则中的字符串使用双引号（`"`）包围时，字符串中包含的字面美元符号（`$`）应使用转义表达：`\$`。
1. `\uHHHH` 用四个十六进制数字表示一个 Unicode 字符，如 `\uA0A0`；不支持 C 语言十六进制或八进制（如 `\xA0\xA0`）这种写法。

以上说明适用 `literal_char` 和 `literal_char_sequence`。

注意，因 HVML 要求使用 UTF-8 编码，`literal_char` 本质上是一个多字节序列，对应字符串类型。当实际的 `literal_char` 中包含多个 Unicode 字符时，仅第一个字符生效。

#### 2.2.4) 参数描述语法

在描述动态对象的获取器、设置器方法的参数时，我们使用如下语法：

1. 必须传递的参数，包含在两个尖括号（`< >`）中描述；可选的参数，包含在两个中括号（`[ ]`）中描述。
1. 参数的描述用冒号分隔成两部分；冒号前的部分描述参数的类型，冒号后的部分描述用途，如：
   - 必传参数：`<number: seconds since epoch>`。
   - 可选参数：`[string: locale category]`。
1. 亦可使用如下的类型别名：
   1. `any`：任意类型。
   1. `real`：任意实数类型，即 `number`、 `longint`、 `ulongint` 或 `longdouble` 之一。
   1. `container`：容器，即 `array`、 `object` 或 `set`。
1. 参数可传递多个类型时，使用 `|` 分隔，如：`string | number`。
1. 当字符串参数中使用多个或者单个关键词表示单个或者多个选项时，我们用空格分隔这些关键词，使用 `||` `&&` 等符号表示这些关键词是否可以同时出现，然后将整个字符串参数用单引号（`'`）或双引号（`"`）包围，如 `"kernel-name || machine"` 或 `'kernel-name && machine'`。具体规则描述如下：
   1. 并置的关键词表示所有的关键词（组）都要以给定的顺序传递。
   1. `&&` 分隔的两个或多个关键词（组），表示必须传递所有这些关键词，顺序任意。
   1. `||` 分隔的两个或多个关键词（组），表示必须传递这些关键词中的一个或多个，顺序任意。
   1. `|` 分隔两个或者多个关键词（组），表示必须传递其中一个。
   1. 使用一对中括号（`[ ]`）对多个关键词进行分组。
1. 参数中使用的关键词由不包含空格和控制字符的可打印字符组成；参数中需要传递多个关键词时，使用单个或者多个 ASCII 空白字符分隔。

上述语法中的第五条，示例如下：

- `'kernel-name | kernel-release | kernel-version | machine | all'`：表示只能传递这些关键词中的一个。
- `'[kernel-name || kernel-release || kernel-version || machine] | all'`：表示要么传递 `all` 要么传递前面可选关键词中一个或多个，顺序任意。

比如我们使用如下的语法描述 `EJSON.numberify` 方法的接口：

`$EJSON.numberify(<any>, ['number | longint | ulongint | longdouble': the number subtype to return])`：对给定的数据做数值化，返回指定的实数类型，默认为 `number`。

以上语法亦可用于描述对象的属性，如：

```
    {
        "messageType": <string: the type of this message, such as `event`, `result`, `change`, and an implementation defined message type.>,
        "messageSubType": <string: the sub type of this message, optional>,
        "source": <any: the variant generating this message>,
        "time": <number: the time when this message fired>,
        "signature": <string: optional signature>,
        "payload" : <object: the payload of this message>
    }
```

### 2.3) 框架标签

#### 2.3.1) `hvml` 标签

`hvml` 标签定义一个 HVML 文档或程序。`hvml` 标签支持如下属性：

- `target`：定义 HVML 文档的目标标记语言，取 `html`、 `xml` 等值。
- `lang`： 定义语言信息，如 `en`、 `zh` 等；在解释器内部，当需要利用 Unicode 定义的语言规则进行大小写转换或者字符串比较时使用。

除了 `target` 属性之外，在 `hvml` 标签中定义的 `lang` 属性以及其他属性，将被克隆到目标文档的根元素中。这里所说的“克隆（clone）”，是指在复制之前，要对标签的属性值或其内容按照 JSONSTR 做求值。

除了注释之外，`hvml` 元素中可包含如下两种标签定义的子元素：

- 零个或一个由 `head` 标签定义的头部元素，若有则必须定义为 `hvml` 元素的第一个子元素。
- 一个或多个由 `body` 标签定义的本体元素。

其他外部标签定义的内容，将被克隆到目标文档的根元素当中。

#### 2.3.2) `head` 标签

`head` 标签用于定义 HVML 代码的头部信息，其中可包含如下标签定义的子元素：

- 可被原样保留到目标文档的标签，如 HTML 文档的 `<meta>`、 `<link>` 等标签。当目标标记语言不支持 `head` 标签时，所有外部元素定义的内容将被废弃。
- 全局数据的初始化；使用 `init` 标签定义。
- 全局动态对象；使用 `init` 标签定义。
- 全局长连接数据源；使用 `connect` 标签定义。
- 全局模板；使用 `archedata`、 `archetype`、 `error`、 `except` 等标签定义。

HVML 程序中，`head` 标签是可选的，无预定义属性。

当目标标记语言支持 `head` 标签时，其属性以及所有使用非 HVML 标签定义的内容将被克隆到目标文档的 `head` 元素中。

#### 2.3.3) `body` 标签

`body` 标签用于定义文档的本体内容。在 HVML 文档中，可以定义多个 `body` 本地内容，使用 `id` 属性区别不同的本体内容。在执行过程中，可通过 `load` 元素装载不同的本体内容。

当目标标记语言支持 `body` 标签时，其属性将被克隆到目标文档的 `body` 元素中。若目标标记语言不支持 `body`，其属性不会出现在目标文档中。

### 2.4) 模板标签

模板标签本质上定义的是一个文档片段模板或者数据模板，可视作一个包含 JSON 求值表达式的字符串或者 JSON 表达式，因此，我们实际上可以使用 `init` 标签来获得和模板标签一样的功能。

所有模板标签可使用其内容来定义一个模板，也可以使用 `src` 属性定义的 URL 从外部数据源中获得模板数据。当同时使用 `src` 属性和内容来定义模板数据时，内容始终具有更高的优先级。如，

```html
    <archetype name="user_item" src="http://foobar.com/templates/user_item">
        <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.name</span>
        </li>
    </archetype>
```

上述代码中的 `src` 属性定义的 URL 将被忽略。

当我们从外部 URL 中获得模板数据时，可使用如下属性：

- `src`：用于指定外部数据源 URL。
- `param`：形如 `a=10&b=20` 的请求参数，需按照 [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986) 进行编码。
- `method`：方法，如 `GET`、`POST` 等。

所有模板标签支持 `raw` 属性。当定义有这个属性时，模板数据中 `$` 将被视作一个字面字符，而不执行 JSON 求值。

#### 2.4.1) `archetype` 标签

`archetype` 标签用于定义一个文档片段模板。

#### 2.4.2) `archedata` 标签

`archedata` 标签用于定义一个数据模板。

#### 2.4.3) `error` 标签

`error` 标签用于定义一个针对错误的文档片段模板，可使用 `type` 属性指定对应的错误名称，但无需指定 `name` 属性。

当未指定 `tpye` 属性时，表示默认的错误模板。

本质上，`error` 标签定义的内容设置了 `ERROR` 变量对应 `type` 键名的键值，故而如下两个标签的功能是一样的：

```hvml
    <error type="nodata">
        <p>No user data!</p>
    </error>

    <update on="$ERROR" at=".nodata">
        "<p>No user data!</p>"
    </update>
```

#### 2.4.4) `except` 标签

`except` 标签用于定义一个针对异常的文档片段模板，可使用 `type` 属性指定对应的异常名称，但无需指定 `name` 属性。

当未指定 `tpye` 属性时，表示默认的异常模板。

本质上，`except` 标签定义的内容设置了 `EXCEPT` 变量对应 `type` 键名的键值，故而如下两个标签的功能是一样的：

```hvml
    <except>
        <p>There is an uncaught exception.</p>
    </except>

    <update on="$EXCEPT" at=".*">
        "<p>There is an uncaught exception.</p>"
    </update>
```

注意在上面定义异常模板时，我们未指定 `type` 属性，表示默认的异常模板。在 `update` 标签，我们改变的是 `$EXCEPT` 数据上的键名 `*` 的键值，这表示我们使用 `*` 键名保存默认的异常模板。

### 2.5) 动作标签

#### 2.5.1) `init` 标签

`init` 标签初始化一个变量。在 HVML 文档的头部（由 `head` 标签定义）使用 `init` 标签，将初始化一个全局变量。在 HVML 文档的正文（由 `body` 标签定义）内使用 `init` 标签，将定义一个仅在其所在父元素定义的子树中有效的局部变量。我们可以直接将 JSON 数据嵌入到 `init` 标签内，亦可通过 HTTP 等协议加载外部内容而获得，比如通过 HTTP 请求，此时，使用 `from` 属性定义该请求的 URL，使用 `with` 参数定义请求参数，使用 `via` 定义请求方法（如 `GET`、 `POST`、 `DELETE` 等）。

我们也可以使用 `init` 标签从共享库中初始化一个自定义的动态对象，此时，使用 `from` 指定要装在的动态库名称，使用 `for` 指定要装载的动态对象名称，并给定 `via` 属性值为 `LOAD`，表示装载共享库。

在一个已经初始化的变量上使用 `init` 标签时，将使用新的数据重置这个变量。

在使用 `init` 标签初始化集合时，我们可使用 `casesensitively` 或者 `caseinsensitively` 两个副词属性来指定字符串对比是否对大小写敏感；默认对大小写敏感。另外，我们还可以使用 `init` 元素的 `by` 属性指定用于对比两个数据是否相等的外部执行器。

该标签的常见用法如下：

```html
    <!-- init a set with an object array -->
    <init as="users" uniquely via="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>

    <!-- init a set with an string array case-insensitively -->
    <init as="locales" uniquely caseinsensitively>
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK", "en_us" ]
    </init>
    <!-- result:
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK" ]
    -->

    <!-- init $math from a shared library -->
    <init as="math" from="purc_dvobj_math" via="LOAD" />

    <init as="locales" from="http://foo.bar.com/locales" with="{ from: 'foo' }" via="POST" />

    <!-- reset $new_users -->
    <init as="new_users">
        [
            { "id": "1", "avatar": "/img/avatars/101.png", "name": "Jerry", "region": "en_US" }
            { "id": "2", "avatar": "/img/avatars/102.png", "name": "Tom", "region": "en_US" }
            { "id": "3", "avatar": "/img/avatars/103.png", "name": "Mike", "region": "en_US" }
        ]
    </init>
```

#### 2.5.2) `update` 标签

`update` 标签用于使用一个源数据（source data）修改一个目标数据（destination data）。目标数据应该是可变数据或者一个可在其上执行更新动作的原生实体数据，比如一个数组、一个对象、数组或对象的一个特定数据项、一个集合、一个数据汇集或者一个目标文档位置（即一个元素或元素汇集）。

该标签支持如下属性：

1. `on` 属性用于指定要修改的数组、对象、集合或者目标文档位置，即目标数据。
1. `at` 属性指定在目标数据上做修改的具体位置，比如键名、索引值等，称为目标位置（destination position）。目标数据在目标位置上的数据，称为最终数据（ultimate data）。当要修改的数据是目标数据本身时，不指定此属性，此时最终数据就是目标数据本身。
1. `to` 属性指定具体的修改动作（action），可取如下值之一：
   - `displace`：表示整个替换目标位置上的数据，是默认动作。
   - `append`：表示在目标数据或目标位置中执行追加操作；最终数据必须是数组或者目标文档位置。
   - `prepend`：表示在目标数据或目标位置中执行前置操作；最终数据必须是数组或者目标文档位置。
   - `merge`：表示在目标数据或目标位置中执行对象的合并操作；最终数据和源数据必须均为对象。
   - `remove`：表示移除目标位置上的数据，等同于用 `undefined` 替换当前位置的值。
   - `insertBefore`：表示在目标数据或者目标位置之前插入一个数据；最终数据必须是数组或者目标文档位置。
   - `insertAfter`：表示在目标数据或者目标位置之后插入一个数据；最终数据必须是数组或者目标文档位置。
   - `unite`：当目标数据为集合，源数据为数组或集合时，使用该动作执行将源数据（数组或集合）中的数据项合并到目标数据（集合）中，相当于求并集。
   - `intersect`：在集合（目标数据）上执行相交操作，相当于求交集；源数据可为数组或集合。
   - `subtract`：在集合（目标数据）上执行相减操作，作用于集合，相当于求差集；源数据可为数组或集合。
   - `xor`：在集合上（目标数据）上执行异或操作，作用于集合，相当于并集和交集之差；源数据可为数组或集合。
   - `overwrite`：在集合（目标数据）上匹配给定的键值并更新其他键值，作用于基于唯一性键值的对象集合，源数据可为对象、数组或集合。
1. `from` 属性指定修改操作源数据的外部数据源，如 URL；此时，使用 `with` 属性指定请求参数。
1. 当未定义 `from` 属性时，`with` 属性指定修改操作使用的源数据；当定义有 `from` 属性时，`with` 属性指定请求参数。
1. `via` 属性指定获得外部数据源的方法，如 `GET`、`POST` 等，仅在指定 `from` 时有效。
1. `by` 指定一个外部函数执行器；当 `to` 属性给定的修改动作无法完成预期的修改操作时，可使用外部函数执行器。指定 `by` 属性时，将忽略 `to` 属性值。

在指定源数据时，除了 `with` 属性和 `from` 属性之外，我们还可以使用 `update` 元素的 JSON 内容。三种源数据指定方式的优先级为：

1. 内容。
1. `from` 属性值；此时，使用 `with` 属性指定请求参数。
1. `with` 属性值（当未定义有效的 `from` 属性时）。

当执行成功时，该标签的结果数据为修改后的数据。

##### 2.5.2.1) 指定目标位置

对下面的文档片段：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none">0</span> users):</h2>
    </div>
```

我们通过下面的 `update` 标签来设置用户数量并修改其 `class` 属性：

```html
    <update on="#the-user-stats > h2 > span" at="textContent" with="10" />
    <update on="#the-user-stats > h2 > span" at="attr.class" with="text-warning" />
```

执行上述 `update` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="text-warning">10</span> users):</h2>
    </div>
```

类似地，我们在数组、对象等数据上执行 `update` 动作。比如更新 `$users` 的第二个用户的名称（`name`）：

```html
    <init as="users">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN", "age": 3 }
        ]
    </init>

    ...

    <update on="$users[1]" at=".name" with="Richard" />
```

当目标数据是目标文档位置（元素或者元素汇集）、数组或对象时，我们使用 `at` 的属性值指定要更改的数据成员位置或名称，如上面的 `textContent`、 `attr.class` 以及 `.name` 等。其规则如下：

- 如果目标数据是元素，我们使用 `textContent` 这一虚拟数据成员名称来表示元素的文本内容。
- 如果目标数据是元素，我们使用 `jsonContent` 这一虚拟数据成员名称来表示元素的 JSON 内容。
- 如果目标数据是元素，我们使用 `content` 来表示使用目标文档的片段来作为其内容（这可能改变 DOM 子树的结构）。
- 如果目标数据是元素，我们使用 `attr.<attr_name>`、 `attr[attr_name]` 来表示元素的属性名称，如 `attr.value` 或 `attr[value]` 表示修改元素的 `value` 属性值。
- 如果目标数据是元素，我们使用 `style.<style_name>`、 `style[style_name]` 来表示元素的样式名称，如 `style.width` 或 `style[width]` 表示修改元素的 `width` 样式值。
- 如果目标数据是对象，我们使用 `.<key_name>` 或 `[<key_name>]` 来表示数据项的键名。
- 如果目标数据是数组，我们使用 `[<index_num>]` 来表示数组中的第 `<index_num>` 个数据项。

我们可以使用不含等号的 `on` 和 `with` 属性值表述语法，如：

```
    <update on="$users[0]" at=".age" 3 />
    <update on="$users[1]" at=".age" with $math.eval("$~.age + 1") />
```

上例中，我们针对用户的 `age` 属性，使用了不含等号的属性值表述语法，第一个赋值语句，使用了常数 `3`；第二个赋值语句，使用了 JSON 表达式，求值结果为 `4`。

当我们使用 `undefined` 赋值给数组或者对象的某个数据项时，该数值项将被删除（同 `erase` 标签的效果），如：

```
    <update on="$users[1]" at=".age" with undefined />
```

亦可用 `remove` 动作：

```
    <update on="$users[1]" at=".age" to="remove" />
```

当上述 `update` 标签作用于上面的 `$users` 之后，结果为：

```json
    [
        { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
        { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
    ]
```

当我们需要在一个 `update` 标签中同时修改多个数据项时，我们在 `at` 属性值中使用空格表示多个数据项位置，在 `with` 属性值中使用数组对应这些位置上要做的修改。如下面的三个 `update` 标签：

```html
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

```html
    <init as="newUser">
        { "id": "0", "avatar": "/img/avatars/0.png", "name": "Annoymous", "region": "en_US", "age": 2 },
    </init>

    <update on="$users" to="prepend" with $newUser />
```

以上代码将把 `$newUser` 追加到 `$users` 的开头，从而成为用户数组的第一个成员。

另外，当属性值按字符串求值时，我们还可以使用除 `=` 之外的属性修改操作符修改内容，详情见本文档 [3.1.2.4) 动作元素属性](#3124-动作元素属性)。

当目标数据是元素汇集时，`update` 标签设定的更新动作，将作用于汇集中所有的元素在指定位置上的数据。比如，

```html
    <update on="span" at="attr.class" with="text-danger" />
```

将修改目标文档中所有类型为 `span` 的元素之类名为 `text-danger`。

当目标数据是对象、数组、集合，且具有 `individually` 副词属性时，`update` 标签设定的更新动作，将作用于数组中所有的数据项在指定位置上的数据。如，

```html
    <init as="users" uniquely via="id">
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

```
    <init as="users" uniquely via="id">
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

```html
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

```html
    <update on="$TIMERS" to="unite">
        [
            { "id" : "foobar", "interval" : 3000, "active" : "yes" },
        ]
    </update>
```

又如，当我们需要覆盖全局定时器中某个特定的数据项时，我们可以使用 `overwrite` 动作：

```html
    <update on="$TIMERS" to="overwrite">
        { "id" : "foo", "active" : "yes" },
    </update>
```

当我们要删除定时器 `foo` 时，可使用 `subtract` 动作：

```html
    <update on="$TIMERS" to="subtract">
        { "id" : "foo" }
    </update>
```

#### 2.5.3) `erase` 标签

`erase` 标签用于从数组、对象、元素或元素汇集中移除一个指定的数据项，支持 `on`、 `at` 和 `by` 介词属性。`on` 属性用于指定数组、对象、元素或元素汇集；`at` 用于要移除的数据子项，不指定时表示整个数据项；`by` 属性指定执行器。该元素的结果数据为数值，表示移除的数据项个数。

如针对如下的 HTML 代码片段：

```html
    <div id="the-user-statistics">
        <h2 class="text-info">User regions (totally <span class="none"></span> users):</h2>
    </div>
```

我们通过下面的 `erase` 标签来删除 `h2` 元素：

```html
    <erase on="#the-user-stats > h2" />
```

执行上述 `erase` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
    </div>
```

我们通过下面的 `erase` 标签来删除 `h2` 元素中的 `class` 属性：

```html
    <erase on="#the-user-stats > h2" at="attr.class" />
```

执行上述 `erase` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
    </div>
```

注意，当 `on` 属性值指定的是一个元素汇集时，`erase` 标签将移除该集合中所有的元素，或者所有元素的指定属性或内容。

类似地，我们也可以在数组上执行 `erase` 动作。比如清除 `$users` 的第二个成员：

```html
    <erase on="$users" at="[1]" />
```

我们也可以在对象上执行 `erase` 动作。比如清除 `$users[0]` 的 `name` 属性：

```html
    <erase on="$users[0]" at=".name" />
```

`at` 属性值可以是数组的索引值或者对象的属性名称（可指定多个，用空格分割）：

```html
    <erase on="$users[0]" at=".name .age" />
```

作为示例，下面的代码在 `iterate` 标签中使用 `erase` 标签，间隔删除数组中成员：

```html
    <iterate on="$EJSON.count($users)" by="SUB: GE 0 BY 2">
        <erase on="$users" at="[$?]" />
    </iterate>
```

#### 2.5.4) `clear` 标签

`clear` 标签用于清空一个指定的数组、对象、元素或元素汇集，仅支持 `on` 介词属性，用于指定要清空的数组、对象、元素或元素汇集。该元素产生 `true` 或 `false` 两种结果数据，分别表示成功或失败。

如针对如下的 HTML 代码片段：

```html
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

```html
    <clear on="#the-user-stats > dl" />
```

执行上述 `clear` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
        <dl>
        </dl>
    </div>
```

类似地，我们也可以在数据项上执行 `clear` 动作。比如清空 `$users` 第二个用户信息：

```html
    <clear on="$users[1]" />
```

执行上述清空指令后，`$users` 的第二个用户数据项仍然存在，但该数据项将变为空对象。

注意，当 `on` 属性值指定的是一个元素汇集时，`clear` 标签将对中的每个元素执行清空操作。

#### 2.5.5) `test` 标签和 `match` 标签

`test` 标签和 `match` 标签配合使用，主要用于实现条件处理。`test` 标签通过 `on` 属性定义在哪个数据项或者元素上执行测试，而 `match` 作为 `test` 元素的子元素，每个 `match` 子元素定义一个匹配分支。

`test` 标签可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值；而 `match` 元素始终产生真值（`true`）作为其结果数据。注意，不满足匹配条件的 `match` 元素定义的分支是不会被执行的。

如：

```html
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

            <error type="nodata">
                <p>You forget to define the $global variable!</p>
            </error>
            <except type="KeyError">
                <p>Bad global data!</p>
            </except>
        </test>
    </footer>
```

上面的示例在 `$global.locale` 数据项（由 `on` 属性指定）上执行测试，操作被限定在 `#the-footer`（由 `in` 属性指定）所在的 DOM 子树上。在 `test` 标签定义的元素内部，使用 `match` 标签定义了若干子元素，分别用来定义匹配条件 `AS 'zh_CN'`、 `AS 'zh_TW'` 以及 `LIKE '*'` 情况下的动作。

在解析 `match` 标签时，若某个标签定义了 `exclusively` 副词属性，则一旦该分支被匹配，将不再检查其他 `match` 分支。

假定 `$global` 所指代的 JSON 数据 `locale` 定义为 `zh_CN`，则最终生成的 HTML 片段如下：

```html
<footer id="the-footer">
    <p><a href="http://www.baidu.com" title="百度">Baidu</a></p>
</footer>
```

需要注意的是：`test` 动作始终确定一个动作结果，将成为子元素的上下文变量 `$?` 之值，该值一般是一个字符串或数值。`test` 标签可支持 `by` 属性，使用该属性指定的脚本类、函数或其他内置方法，可用来从 `on` 指定的复杂数据项或者元素上获得一个可供匹配的数据。

对于匹配条件，我们可以在 `match` 标签中使用 `on` 介词属性来定义一个基于动态 JSON 的逻辑表达式，也可以使用 `for` 介词属性定义基于 `test` 元素执行结果的匹配条件，两者选一，但 `for` 属性具有更高优先级。

使用 `on` 介词属性时，我们可以使用一个 JSON 求值表达式来确定匹配条件；当求值结果可被视作 `true` 时，视作匹配，反之视作不匹配。比如就上述 HVML 代码中的匹配 `zh_CN` 的 `match` 标签，可以如下书写：

```html
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

```html
    <match for="GT 10 AND LT 100">
        ...
    </match>
```

#### 2.5.6) `choose` 标签

`choose` 标签在 `on` 属性指定的数据或者元素上产生一个可供后续动作标签处理的数据项。

`choose` 标签可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果数据。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值。

比如要实现根据当前 `locale` 动态生成搜索链接的功能，我们也可以使用嵌套在 `choose` 标签中的 `update` 标签完成相关功能，如：

```
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
        <catch for="error:nodata">
            <update on="p" at="textContent" with='You forget to define the $locales/$global variables!' />
        </catch>
        <catch for="KeyError">
            <update on="p > a" at="textContent attr.href attr.title" with ["Google", "https://www.google.com", "Google"] />
        </catch>
        <catch for="*">
            <update on="p" at="textContent" with='Bad $locales/$global data!' />
        </catch>
    </choose>
  </body>
```

在上面的例子中，我们在 `by` 介词属性中指定了一个内置的 KEY 执行器，该执行器将 `$global.locale` 的值作为键名，返回了 `on` 介词属性指定的 `$locales` 字典数组上对应的键值，使用该键值通过其后的 `update` 子元素实现了 `in` 介词属性指定的 HTML 文档片段中的元素更新操作。

在复杂情形下，我们也可以编写脚本程序作为外部执行器来完成选择动作。

#### 2.5.7) `iterate` 标签

`iterate` 标签用于在指定的可迭代数据项或者元素上执行迭代操作。比如执行插入操作时，可将迭代得到的每个数据项作用到 `with` 属性指定的模板，并插入到 `in` 介词属性指定的位置。如下面的 HVML 代码片段：

```html
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
                <error type="notready">
                    <img src="wait.gif" />
                </error>
                <except type="StopIteration">
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>
    </body>
```

上述 HVML 代码在 `head` 标签中定义了 `users` 数据，是一个由字典结构组成的数组。在 `body` 标签中，该 HVML 文件迭代 `$users` 数组，并克隆 `$user_item` 这一模板定义的 HTML 片段并追加（`append`）到 `#the-user-list` 所在的位置。在迭代过程中，该标签使用脚本程序定义的 `IUser` 类来实现排序、过滤和映射操作。

使用脚本程序定义的类，可用于实现较为复杂的迭代逻辑和操作。但在一些简单的场合，我们也可以不使用类而使用其他动作标签完成动作，如使用 `update` 标签使用当前迭代数据更新特定的元素属性：

```
    <iterate on="$users" in="#the-user-list"
            by="RANGE: FROM 0 TO $EJSON.count($users) ADVANCE 2">
        <update on="[id=user-$?.id] span" at="attr.class" with *= "text-* text-info" />
    </iterate>
```

上述 HVML 代码，在 `$users` 数据上执行迭代，但未使用脚本程序定义的类，而使用了 `RANGE` 关键词来定义迭代范围。`RANGE: FROM 0 TO $EJSON.count($users) ADVANCE 2` 表示取 `$users` 数组中索引下标为偶数的所有数组项，之后，针对这些数据项执行 `update` 标签定义的更新操作。在 `update` 标签中，首先使用 `on` 介词属性定义了目标元素：`[id=user-$?.id] span`。该表达式使用了 CSS 选择器在 `#the-user-list` 定义的 DOM 子树中查找子元素，其中 `$?.id` 表示的是当前迭代得到的用户标志符。若存在这个子元素，则将其 `class` 属性设置为 `text-info`。这样，所有索引值为偶数的用户条目将使用由 `text-info` 类定义的样式来展现。

#### 2.5.8) `reduce` 标签

`reduce` 标签用于定义一个归约（Reduce）操作。比如在上面的例子中，我们通过 `reduce` 标签统计来自不同区域用户的个数，最终形成一个类似下面这样的数据：

```json
    {
        "count": 19,
        "regions": { "中国大陆": 10, "中国台湾": 7, "其他": 2 }
    }
```

通常 `reduce` 操作会形成另外一个可迭代数据，然后我们可以嵌套 `iterate` 等操作执行后续动作。比如下面的 HVML 代码片段：

```html
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

    <reduce on="$users" in="#the-user-statistics" by="CLASS: RUserRegionStats">
        <update on="> h2 > span" at="textContent" with="$?.count" />
        <clear on="> dl" />
        <sort on="$?.regions" to="iterate" by="KEY: ALL FOR KV" descendingly>
            <iterate on="$?" in="> dl" by="RANGE: ALL">
                <update on="$@" to="append" with="$region_to_users" />
            </iterate>
        </sort>
    </reduce>
```

上述代码由脚本程序定义的类 `RUserRegionStats` 在 `$users` 上执行归约操作，之后形成一个如上面 JSON 格式描述的统计结果，其中包括整个用户的个数，以及所有区域的用户个数。然后使用了 `update` 标签、 `clear` 标签以及 `iterate` 标签执行了三个后续动作：

- `update` 标签：用于更新 `#the-user-statistics > h2 > span` 元素的内容为用户总数。
- `clear` 标签：用于清除 `#the-user-statistics > dl` 元素的所有子元素。
- `sort` 标签：用于将 `$?.regions` 执行排序操作，按键值降序排列形成一个新的数组。
- `iterate` 标签：用于在 `#the-user-statistics > dl` 元素中追加用户按区域统计的信息。

假设执行归约操作后的结果同前述 JSON 格式给出的数据，则执行上述操作后获得的 HTML 片段为：

```html
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

`sort` 标签用于对指定的数组或者由执行器产生的序列执行排序操作：

- `on` 属性指定要操作的数据。
- `by` 属性指定执行器；若指定了执行器，则对执行器产生的数据序列执行排序操作，若没有指定执行器，则对 `on` 属性指定的数据（必须为数组）执行排序操作。
- `via` 属性指定排序的依据；当要排序的数组或者数据序列由对象组成时，该属性指定参与排序的单个或者多个键名。
- 使用 `ascendingly` 和 `descendingly` 副词属性指定使用升序还是降序排列。
- 使用 `casesensitively` 和 `caseinsensitively` 副词属性指定按照字符串排序时是否对大小写敏感。

如下代码对 `$users` 执行排序：

```html
        <init as="users">
            [
                { "id": 3, "avatar": "/img/avatars/3.png", "name": "David", "region": "en_US" }
                { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": 2, "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <sort on="$users" ascendingly via="id" />
```

结果为：

```json
            [
                { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": 2, "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
                { "id": 3, "avatar": "/img/avatars/3.png", "name": "David", "region": "en_US" }
            ]
```

`sort` 动作支持按照字符串或数值两种类型执行排序，这取决于从数组中获得的第一个排序数据的类型。若第一个参与排序的数据类型是 `number、 `longint`、 `ulongint` 或者 `longdouble` 时，使用数值排序，否则使用字符串排序。当使用数值时，所有数据数值化之后进行排序，而使用字符串时，所有数据字符串化之后进行排序。

当使用 `by` 属性指定了执行器之后，`sort` 标签定义的排序操作，可理解为一个 `choose` 动作外加一个 `sort` 操作。

如

```html
        <sort on="$?.regions" by="KEY: ALL FOR KV" descendingly>
            ...
        </sort>
```

相当于

```html
        <choose on="$?.regions" by="KEY: ALL FOR KV">
            <sort on="$?" descendingly via="v">
                ...
            </sort>
        </choose>
```

注意，在第一种用法（即使用 `by` 属性指定执行器的情况）中，`via="v"` 的排序条件将被隐含指定，无需显式指定。

#### 2.5.10) `observe`、 `forget` 和 `fire` 标签

`observe` 标签用于观察特定数据源上获得数据或状态，或者文档元素节点上的事件，并完成指定的操作。

假设文档通过本地总线机制（本例中是 `hiBus`）监听来自系统的状态改变事件，如电池电量、WiFi 信号强度、移动网络信号强度等信息，并在文档使用相应的图标来表示这些状态的改变。为此，我们可以定义如下的 HVML 文档：

```html
<hvml>
    <head>
        <connect at="unix:///var/run/hibus.sock" as="databus" for="hiBus"/>
    </head>

    <body>
        <header id="the-footer">
            <img class="mobile-status" src="/placeholder.png" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="/placeholder.png" />
            <span class="local-time">12:00</span>
            <img class="battery-status" src="/placeholder.png" />
        </header>

        <send on="$databus" to="subscribe" at="@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED">
            <observe on="$databus" for="event:$?">
                <update in="#the-header" by="FUNC: on_battery_changed">
                    <error>
                       <p>Bad scope.</p>
                    </error>
                    <except>
                        <p>Failed to update battery status</p>
                    </except>
                </update>
            </observe>
        </send>
    </body>
```

在上例中，我们使用外部脚本定义的 `on_battery_changed` 函数来实现更新操作。

另外一个 `observe` 标签的使用例子描述如下。

在 `head` 元素中，我们通过 `connect` 连接到 `unix:///var/run/hibus.sock`（`at` 属性），该连接被命名为 `databus`（`as` 属性）。

然后在 `body` 元素中，我们通过 `send` 元素订阅（`subscribe`）指定的事件，然后用 `observe` 元素定义了在 `$databus` 上特定事件的观察。每当电池状态发生变化时，就会从这个数据源收到相应的数据包。为方便数据交换，所有的数据包都打包为 JSON 格式，并具有如下的格式：

```json
    {
        "messageType": "event",
        "messageSubType": "XXXXXX",
        "source": "@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED",
        "time": 20200616100207.567,
        "signature": "XXXXX",
        "payload" : {
            "level": 80,
            "charging": false,
        },
    }
```

其中，`messageType` 字段表示数据包类型；`source` 表示产生此事件来源；`time` 表示此事件产生的系统时间；`signature` 是此事件的内容的签名，可用来验证数据来源的合法性；`payload` 中包含事件关联的数据。在上面这个例子中，事件包含两个信息，一个信息用来表示当前电量百分比，另一个信息表示是否在充电状态。

当 HVML 代理观察到来自 `$databus` 上的电池变化事件数据包之后，将根据 `observe` 标签定义的观察动作执行相应的操作。在上面的例子中，`observe` 标签所定义的操作及条件解释如下：

- 当来自`$databus`（`on` 属性值）上的数据包类型为 `event:$?`（`for` 属性值），这里的 `$?` 是 `send` 返回的唯一性标识字符串（相当于事件标志符），执行 `to` 介词属性定义的 `update` 操作。
- `observe` 元素的子元素 `update` 元素定义了具体的更新操作：由 `by` 介词属性定义的脚本函数 `on_battery_changed` 完成，该更新操作限定在 `in` 介词属性定义的 `#the-header` 元素节点中。

注意，当 `observe` 观察到了来自特定数据源上的数据包时，其结果数据为该事件数据包中的 `payload` 数据；若没有通过 `for` 属性和 `via` 指定具体要观察的数据包类型以及过滤条件时，则结果数据为整个数据包。

在简单情形下，我们也可以不使用脚本程序，直接使用 `update` 标签来定义更新操作。比如，我们要在状态栏上显示当前的 WiFi 名称或者移动网络的运营商名称：

```html
    <send on="$databus" to="subscribe" at="@localhost/cn.fmsoft.hybridos.settings/inetd/NETWORKCHANGED">
        <observe on="$databus" for="event:$?" in="#the-header">
            <update on="span.mobile-operator" at="textContent" with="$?.name">
                <error>
                    <p>Bad scope.</p>
                </error>
                <except>
                    <p>Failed to update mobile operator</p>
                </except>
            </update>
        </observe>
    </send>
```

对电池电量的更新，我们也可以不使用脚本程序，直接使用 `test`、 `match` 和 `update` 标签来定义更新操作：

```html
    <observe on="$databus" for="event:$?">
        <test on="$?.level" in="#the-header">
            <match for="GE 100" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-full.png" />
            </match>
            <match for="GT 90" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-90.png" />
            </match>
            <match for="GT 70" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-70.png" />
            </match>
            <match for="GT 50" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-50.png" />
            </match>
            <match for="GT 30" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-30.png" />
            </match>
            <match for="GT 10" exclusively>
                <update on="img.mobile-status" at="attr.src" with="/battery-level-10.png" />
            </match>
            <match for="ANY">
                <update on="img.mobile-status" at="attr.src" with="/battery-level-low.png" />
            </match>
        </test>
        <error>
            <p>Bad scope.</p>
        </error>
        <except>
            <p>Failed to update battery status</p>
        </except>
    </observe>
```

我们还可以使用 `observe` 标签观察文档某个节点上的变化或者用户交互事件。下面的例子展示了 `observe` 的多种用法：

- 通过监听 `MQTT` 数据包获得后台用户的新增或者删除时间，从而动态更改用户列表。
- 通过监听用户列表的父元素（容器元素）上的变化事件，动态更新用户统计信息。

```html
<hvml lang="en">
    <head>
        <connect at="tcp://foo.bar.com:1366" as="mqtt" for="MQTT" />
    </head>

    <body>
        <send on="$mqtt" to="subscribe" at="newUser" as="new_user" />
        <send on="$mqtt" to="subscribe" at="deleteUser" as="del_user" />

        <observe on="$mqtt" for="event:$new_user">
            <iterate on="$?" in="#the-user-list" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <error type="notready">
                    <img src="wait.gif" />
                </error>
                <except>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </observe>

        <observe on="$mqtt" for="event:$del_user">
            <iterate on="$?" in="#the-user-list" by="RANGE: FROM 0">
                <erase on="#user-$?.id" />
            </iterate>
        </observe>

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
                "id": "$?.attr.data-value", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr.data-region"
            },
        </archedata>

        <observe on="#the-user-list" for="change:content">

            <init as="users">
                [ ]
            </init>

            <iterate on="$@" by="TRAVEL: BREADTH">
                <update on="$users" to="append" with="$item_user" />
            </iterate>

            <reduce on="$users" in="#the-user-statistics" by="CLASS: RUserRegionStats">
                <choose on="$?" in="> h2 > span" by="KEY: AS 'count'">
                    <update on="$@" at="textContent" with="$?" />
                </choose>
                <clear in="#the-user-statistics > dl" />
                <sort on="$?.regions" by="KEY: ALL FOR KV" ascendingly>
                    <iterate on="$?" in="> dl" by="RANGE: FROM 0">
                        <update on="$@" to="append" with="$region_to_users" />
                    </iterate>
                </sort>
            </reduce>

        </observe>

    </body>
</hvml>
```

当我们要解除在某个特定数据或者元素之上的观察时，使用 `forget` 标签。也就是说，`forget` 是 `observe` 的反操作。

```html
    <forget on="#the-user-list" for="change:content" />
```

在 HVML 代码中，除了被动等待事件的发生之外，代码也可以直接使用 `fire` 标签主动地激发一个事件：

```html
    <init as="new_user">
        { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "zh_CN" }
    </init>

    <fire on="#user-list" for="new-user" with="$new_user" />

    ...

    <observe on="#user-list" for="new-user:*">
        ...
    </observe>
```

`fire` 元素将把 `with` 属性指定的数据作为事件数据包的 `payload` 进行处理，并根据 `on` 属性指定的元素或者数据确定事件的源，`for` 属性值作为事件名称打包事件数据包，并将事件加入到事件队列中。 注意，`fire` 元素不产生结果数据，所以不能包含其他子动作元素。

#### 2.5.11) `request` 标签

`request` 标签定义一个在指定 URL 上的同步或异步请求。使用 `request` 元素时，我们使用 `on` 属性指定 URL，使用 `with` 属性指定请求参数，使用 `via` 属性指定请求方法（如 `GET`、 `POST`、 `DELETE` 等）。`init` 元素提供类似的功能，但区别在于，`request` 可支持异步请求，而 `request` 不支持内嵌 JSON 数据为内容。

```html
    <request on="http://foo.bar.com/foo" with="$params" via="POST" as="foo" async>
        <observe on="$foo" for="result">
            ...
        </observe>
    </request>
```

#### 2.5.12) `connect`、 `send` 和 `disconnect` 标签

如前所述，`connect` 标签定义一个对外部数据源的长连接，比如来自 MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包；而 `disconnect` 标签关闭先前建立的一个长连接数据源。

`send` 标签用于在一个已连接的长连接数据源上发出一个同步或者异步的消息。比如在通过 MQTT 或者本地数据总线发送请求到外部模块或者远程计算机时，我们使用 `send` 元素发出一个异步消息，然后在另外一个 `observe` 标签定义的 HVML 元素中做相应的处理。比如，我们要通过 hiDataBus 协议向系统守护进程发出一个获得当前可用 WiFi 热点列表的远程过程调用：

```html
</hvml>
    <head>
        <connect at="unix:///var/run/hibus.sock" as="hibus" for="hiBus"/>
    </head>

    <body>
        ...

        <send on="$hibus" to="call" at="@localhost/cn.fmsoft.hybridos.settings/inetd/wifiGetHotspots" as="wifilist" asynchronously>
            <observe on="$hibus" for="result:$wifilist">
                ...
            </observe>
        </send>

        <send on="$hibus" to="subscribe" at="@localhost/cn.fmsoft.hybridos.settings/inetd/NETWORKCHANGED" as="networkchanged">
            <observe on="$hibus" for="event:$networkchanged">
                ...
            </observe>
        </send>
        ...
    </body>
</hvml>
```

正常情况下，使用同步请求时，`send` 元素的执行结果数据就是请求的返回结果；如果使用异步请求，`send` 元素的操作结果数据为字符串 `ok`。异步请求时，一般应该在对应的 `observe` 元素中做后续处理。

```html
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

            <connect at="unix:///var/run/hibus.sock" as="hibus" for="hiBus" />

            <send on="$hibus" to="call" at="@localhost/cn.fmsoft.hybridos.settings/inetd/wifiScanHotspots" with="$paramWifiList" as="hotspots_list" asynchronously>
                <observe on="$hibus" for="result:$hotspots_list">
                    <disconnect on="$hibus" />

                    <!-- fill the Wifi list with the response data -->
                    <iterate on="$?" in="#theWifiList">
                        <update on="$@" to="append" with="$wifi_item" />
                    </iterate>

                </observe>
            </send>

        </observe>
    </body>
```

#### 2.5.13) `load` 和 `back` 标签

`load` 标签用来装载一个由 `from` 属性指定的新 HVML 文档，并可将 `with` 属性指定的对象数据作为参数传递到新的 HVML 文档。如：

```html
    <load from="b.hvml" with="$user" as="userProfile" type="modal" />
```

`load` 元素将装载一个新的页面，我们使用 `as` 属性指定这个页面的名称，使用 `type` 属性指定新页面是模态窗口还是非模态窗口：

- `self`：表示不创建会话，也不创建窗口，而在当前窗口中渲染新的内容。
- `modal`：表示在当前会话中创建一个模态窗口。模态窗口将获得输入焦点，直到返回为止。
- `modaless`：表示在当前会话中创建一个非模态的新窗口。
- `session`：表示创建一个新会话，并在新会话中创建一个新窗口渲染新的内容。

`back` 标签用于返回到当前会话中的上个页面，或者终止当前的模态窗口。

```html
    <init as="user_info">
        {
            "retcode": "ok",
            "payload": {
                { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "en_US" },
            },
        }
    </init>

    <back to="_caller" with="$user_info" />
```

使用 `back` 标签时，我们可以使用 `to` 属性指定要返回的页面名称（`_caller` 是保留名称，用于指代调用该页面的页面名称）。此时，还可以使用 `with` 属性返回一个数据。当前页面是一个模态对话框时，该数据将作为 `load` 元素的结果数据返回；如果当前页面不是一个模态对话框，则该数据将做为请求数据（对应 `$REQUEST` 内置全局变量）提供给目标返回对应的页面，此时，该页面会执行一次重新装载操作（相当于浏览器刷新页面功能）。

```html
    <load from="new_user.hvml" type="modal">
        <test on="$?.retcode">
            <match for="AS 'ok'" exclusively>
                <choose on="$2.payload" in="#the-user-list">
                    <update on="$@" to="append" with="$user_item" />
                </choose>
            </match>
            <match>
                <back to="_caller" />
            </match>
        </test>
    </load>
```

以上 HVML 代码中的 `load` 标签装载了用来创建新用户的页面作为模态对话框。当模态对话框返回的状态为 `ok` 时，在 `#the-user-list` 中插入了一条新的用户条目。

正常情况下，`load` 元素装载一个模态对话框时，其执行结果数据就是模态对话框中 `back` 元素的 `with` 属性值；如果是创建新会话，则 `load` 元素的操作结果数据为字符串 `ok`；如果是覆盖当前页面的内容，则不返回任何结果数据。

`back` 元素不产生任何结果数据，故而不能包含子动作元素。

当 `load` 元素的 `from` 属性值以 `#` 打头时，`load` 元素将尝试装载当前 HVML 文档中定义的另一个本体，即另一个 `body` 子树定义的内容。如：

```html
<hvml>
    <body>
        ...

        <load from="#errorPage" />
    </body>

    <body id="errorPage">
        <p>We encountered a fatal error!</p>
    </body>
</hvml>
```

装载另一个本地意味着需要清空当前的目标文档内容，并跳转到本文档的另一个本体中重新执行 HVML 程序。

#### 2.5.14) `define` 和 `include` 标签

`define` 和 `include` 标签用于实现类似函数调用的功能。我们可以通过 `define` 定义一组操作，然后在代码的其他位置通过 `include` 标签包含这组操作。在 HVML 中，我们将这组操作简称为操作组。

`define` 标签通过 `as` 属性定义操作组的名称，其中包含了一组动作标签定义的子元素。`include` 元素将切换上下文到 `on` 属性指定的操作组中，`with` 属性传入的参数将作为 `define` 的结果数据供子元素使用。如：

```html
        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" in="#entries" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <include on="$fillDirEntries" with="/home" />
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <include on="$fillDirEntries" with="/" />
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <include on="$fillDirEntries" with="/home" />
        </observe>
```

上面的 HVML 代码，在初始化 `listbox` 时，以及用户点击了 `#goRoot` 或者 `#goHome` 按钮时，使用了 `$fillDirEntries` 定义的操作组。注意，在三次使用 `include` 标签时，通过 `with` 属性传入了不同的参数。

`include` 元素不产生任何结果数据，故而不能包含子动作元素。

`define` 元素可使用 `from` 属性从指定的 URL 中装载 HVML 片段。

#### 2.5.15) `call` 和 `return` 标签

`include` 元素完成的工作本质上是复制指定的操作组到当前的位置，所以和传统编程语言中的函数调用并不相同。如果要获得和函数调用相同的效果，使用 `call` 和 `return` 标签：

```html
        <define as="fillDirEntries">
            <choose on="$?" by="CLASS: CDirEntries">
                <iterate on="$?" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
                <return with="$#" />
            </choose>
        </define>

        <listbox id="entries">
            <call on="$fillDirEntries" in="#entries" with="/home">
            </call>
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <clear on="#entries" />
            <call on="$fillDirEntries" in="#entries" with="/">
            </call>
        </observe>

        <observe on="#goHome" for="click">
            <clear on="#entries" />
            <call on="$fillDirEntries" in="#entries" with="/home" />
        </observe>
```

在上述 HVML 代码中，`fillDirEntries` 使用 `return` 标签的 `with` 属性返回了目录项的个数，使之从一个操作组变成了一个带有返回值的函数。在使用这个函数时，使用 `call` 标签，以便获得结果数据。

`call` 标签和 `include` 标签有如下不同：

- `call` 元素通过 `in` 属性定义的文档操作位置将被操作组的第一个动作元素继承。
- `call` 元素有返回值，所以可在其中包含其他动作元素做后续操作。
- `include` 元素会忽略操作组的返回值。

另外，我们可以在 `call` 元素中使用副词属性 `asynchronously`，这样我们可以异步调用耗时的函数，然后使用 `observe` 观察其结果。如：

```html
        <define as="collectAllDirEntriesRecursively">
            ...
        </define>

        <listbox id="entries">
            <call as="my_task" on="$collectAllDirEntriesRecursively" with="/" asynchronously />
            <observe on="$my_task" for="success">
                <iterate on="$?" in="#entries" by="RANGE: FROM 0">
                    <update on="$@" to="append" with="$dir_entry" />
                </iterate>
            </observe>
        </listbox>
```

在上面的 HVML 代码中，我们异步调用了 `collectAllDirEntriesRecursively` 函数，该函数递归获取当前路径下的所有文件系统目录项（这是一个典型的耗时操作）。HVML 解释器会创建一个异步任务来执行该函数，`as` 属性指定了该任务的名称（`my_task`）。之后，代码使用 `observe` 元素来观察 `my_task` 任务的 `success` 事件，并做后续的处理。需要注意的是，异步调用操作组时，一般不应该操作真实文档对应的元素。

注意，不管是 `include` 还是 `call`，我们都可以递归使用。

#### 2.5.16) `catch` 标签

`catch` 作为任意动作元素的子元素，定义该动作出现错误或者异常时要执行的动作。`catch` 标签定义的元素作为 `error` 和 `except` 元素的补充，可定义错误或者异常情形下的动作。如：

```
    <choose on="$locales" in="#the-footer" by="KEY: AS '$global.locale'">
        <update on="p > a" at="textContent attr.href attr.title" with ["$?.se_name", "$?.se_url", "$?.se_title"] />
        <catch for="error:nodata">
            <update on="p" at="textContent" with='You forget to define the $locales/$global variables!' />
        </catch>
        <catch for="error:*">
            <update on="p" at="textContent" with='You forget to define the $locales/$global variables!' />
        </catch>
        <catch for="KeyError">
            <update on="p > a" at="textContent attr.href attr.title" with ["Google", "https://www.google.com", "Google"] />
        </catch>
        <catch>
            <update on="p" at="textContent" with='Bad $locales/$global data!' />
        </catch>
    </choose>
```

我们使用 `for` 介词属性来定义要捕获的错误或异常名称，或错误或异常名称的模式。错误名称始终具有 `error:` 前缀，而异常名称始终具有 `except` 前缀，但异常名称前的前缀可以忽略。

`for` 属性值的取值有如下规则：

- 若未定义 `for` 属性，或 `for` 的属性值为 `*` 或空字符串，则相当于匹配任意错误或异常。
- 多个错误或者异常，可使用空白字符分隔。
- 若错误或异常名称使用 `*` 字符，则表示匹配所有错误或异常。

#### 2.5.17) `bind` 标签

`bind` 标签定义一个绑定的变量；通常，被绑定的变量对应的是一个可求值的表达式，该表达式可使用 `on` 属性指定，也可以使用 `bind` 元素的内容来定义。如：

```html
    <bind on="$users[0]" as="me" />
```

或，

```html
    <bind as="me">
        {
            "id": "$currUser.id",
            "avatar": "/img/avatars/{$currUser.id}.png",
            "name": "$currUser.name",
            "region": "$currUser.locale"
        }
    </bind>
```

当我们使用这个变量时，我们调用其上的 `eval` 方法获得该表达式对应的具体数据。因此，下面的 `init` 和 `bind` 元素的执行效果是不一样的：

```
    <init as="sysClock">
        $SYSTEM.time
    </init>

    ...

    <bind on="$SYSTEM.time" as="rtClock" />

    <p>The initial system time: $sysClock</p>

    ...

    <p>The current system time: $rcClock.eval</p>
```

另外，若在该变量上执行 `observe` 动作，将在 HVML 程序运行进入消息循环时该变量对应的表达式将被重新求值，若前后发生变化，则将产生一个 `change` 消息，从而可以在 `observe` 动作元素定义的操作组中做相应的处理：

比如，

```html
    <bind on="$SYSTEM.time" as="rtClock" />

    <observe on="$rtClock" for="change">
       ...
    </observe>
```

上述代码中 `observe` 元素定义的操作组，将每一秒钟执行一次。

另外，我们可以将某个目标文档元素的属性或者内容绑定到某个变量上，然后使用 `observe` 元素处理其上的 `change` 事件：

```html
    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />
    <bind on="$DOC.query('#the-user-name').attr.value" as="user_name">
        <observe on="$user_name" for="change">
            ...
        </observe>
    </bind>
```

### 2.6) 执行器

在 `choose`、 `iterate` 以及 `reduce` 等动作标签中，我们通常要使用 `by` 介词属性来定义如何执行选择、迭代或者归约操作，我们称之为规则，而实现相应的规则的代码或者功能模块被称为选择器、迭代器或归约器，统称为执行器（executor）。HVML 解释器可实现内置（built-in）执行器，通过简单的语法来指定在选择、迭代、归约数据时遵循什么样的规则。在复杂情形下，HVML 允许文档作者调用外部脚本或者程序（比如可动态加载的模块）来实现执行器。HVML 使用 `CLASS` 或 `FUNC` 前缀来表示使用外部定义的执行器。

#### 2.6.1) 内建执行器

在 HVML 代码中，内置执行器的规则中可包含 JSON 求值表达式。但在调用执行器之前，HVML 解释器会完成 JSON 表达式的求值，将最终的规则字符串传递给执行器，因此，我们在描述内建执行器的规则时，不描述可能包含的 JSON 求值表达式。

##### 2.6.1.1) `KEY` 执行器

该执行器作用于字典数据上，使用给定的键名或键名列表返回键名、键值或键值对象列表，或者使用匹配某个规则的键名列表，返回键名、键值或者键值对象列表。比如对下面的数据：

```html
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

```html
    <init as="regionStats">
        [ "zh_CN", 100, "zh_TW", 90, "zh_HK", 90, "zh_SG", 90, "zh_MO", 80, "en_US", 30, "en_UK", 20 ]
    </init>
```

如果我们要获得所有的数组单元，则使用 `RANGE: FROM 0`。

如果我们要获得前四个数组单元，则使用 `RANGE: FROM 0 TO 4`，返回的数据为：

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

```html
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

作为示例，本文档 [2.1.6.4) `$TIMERS`](#2164-timers) 小节中激活某个特定定时器时使用了 `FILTER` 执行器。

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

比如，当我们使用 `CAHR: FROM 0 TO 10 ADVANCE 2 UNTIL 'f'` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

```json
    [ "A", "b", "o" ]
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

比如，当我们使用 `TOKEN: FROM 0 TO 3 DELIMETERS ' '` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

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

注意：数值执行器可能导致死循环。

##### 2.6.1.6) `SQL` 执行器

SQL（structured query language）是关系型数据库管理系统用来查询结构化数据的语言。考虑到 HVML 中大部分数据使用字典数据形成的数组表达，所以，HVML 引入了内建的 SQL 执行器。通过 SQL 执行器，我们可以非常方便地从 `on` 属性指定的数据集中查询获得特定的数据子集，且能够很容易地指定查询的匹配条件。比如针对下面的数据：

```html
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

```html
    <choose on="$TIMERS" by="SQL: SELECT & WHERE id = 'foo'">
        <update on="$?" at=".active" with="yes" />
    </choose>
```

在 HVML 中，SQL 执行器也可以作用于 DOM 文档子树或者嵌套的 JSON 字典数据。为此，我们引入了一个新的 SQL SELECT 分句 `TRAVEL IN`，可选 `SLIBLINGS`、 `DEPTH`、 `BREADTH` 或者 `LEAVES`，分别表示使用兄弟节点遍历、深度优先（depth-first）遍历、广度优先（breadth-first）遍历和叶子节点遍历，其语法为：

- `"TRAVEL" <ws> "IN" <ws> [ "SIBLINGS" | "DEPTH" | "BREADTH" | "LEAVES" ]`：用于指定在树形数据上的遍历方式。

如针对下面的 DOM 树：

```html
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

按本文档[2.1.7) 文档片段的 JSON 数据表达](#217-文档片段的-json-数据表达) 小节中描述的规则，上述 DOM 文档片段对应的 JSON 表达为：

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

如果我们在上述 DOM 文档片段（或等价的 JSON 数据）上执行深度优先遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN DEPTH` 语句的执行结果为：

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

如果我们在上述 DOM 文档片段（或等价的 JSON 数据）上执行广度优先遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN BREADTH` 语句的执行结果为：

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

如果我们在上述 DOM 文档片段（或等价的 JSON 数据）上执行叶子节点遍历，则 `SELECT tag, attr.id, textContent TRAVEL IN LEAVES` 语句的执行结果为：

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

```html
        <archedata name="item_user">
            {
                "id": "$?.attr.data-value", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr.data-region"
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

外部执行器是由外部脚本程序或者程序实现的符合所在动作标签要求的类或者函数，通常用于执行复杂的选择、迭代和归约操作，尤其是无法通过内建执行器实现某些特殊排序、条件判断和归约操作时。

使用外部执行器时，HVML 解释器将根据执行器的类型前缀和当前的动作标签来动态调用对应的函数或者创建对应的类对象来执行相应的操作。HVML 解释器支持如下外部执行器前缀：

- `CLASS: <ClassName>`：表示使用 `<ClassName>` 类作为执行器。目前可用于 `choose`、 `iterate`、 `reduce` 三个动作元素。
- `FUNC: <FuncName>`：表示使用 `<FuncName>` 函数作为执行器。目前仅用于 `update` 动作元素。

在 `choose`、 `iterate`、 `reduce` 以及 `update` 四个动作元素中使用外部执行器时，可使用 `via` 属性指定一个过滤参数。

使用外部执行器时，HVML 应用的主程序需要实现相应的类或者函数。本文档以 Python 语言为例，说明各个外部执行器的实现方法。对于不同于 Python 的脚本语言，比如 C/C++、JavaScript、Lua 等，可参考 Python 的实现进行处理。

##### 2.6.2.1) 外部选择器

在 `choose` 标签中，我们可以使用 `by` 介词属性指定使用一个外部的选择执行器，该执行器必须实现为 `HVMLChooser` 基类的一个子类。该基类的原型如下：

```python
class HVMLChooser (object):
    def __init__ (self):
        pass

    def choose (self, on_value, via_value):
        return None

    def map (self, cloned_item, in_value):
        return None
```

`HVMLChooser` 类仅包含两个主要的方法：`choose` 和 `map`。这两个方法在基类中不做任何工作，主要用于提供给子类重载。前者用于从 `on` 属性指定的数据项或元素（集合）中选择某个数据项或元素；后者建立被选中的元素在 `in` 属性指定的范围所执行的操作。如果后续执行使用的片段模板或者数据模板中已经定义有数据的映射关系，则无需实现 `map` 方法。

比如我们要从全局 `$TIMERS` 变量定义的数据中选择指定的定时器，我们可以使用内建的 SQL 执行器，也可以使用一个外部执行器 `CLASS: CTimer`。

```html
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

        <choose on='$TIMERS' by="CLASS: CTimer" via="foo">
            <update on="$?" at=".active" with="yes" />
        </choose>

        ...

    </body>
```

则 `CTimer` 的实现非常简单——从 `on` 属性指定的数组中查找 `id` 为 `via` 属性值（这里是 `foo`）数组单元，若有，则返回这个数组单元，否则返回 `None`。

```python
class CTimer (HVMLChooser):
    def __init__ (self):
        pass

    def choose (self, on_value, via_value):
        for t in on_value:
            if via_value == t['id']
                return t
        return None

```


`CTimer` 并未实现 `map` 方法，因为上面示例中并不需要克隆模板。

##### 2.6.2.2) 外部迭代器

在 `iterate` 动作标签中，当无法使用内建执行器实现特殊迭代操作时，我们可以使用由外部脚本程序定义的迭代执行器。

以 Python 语言为例，类似外部选择器，外部迭代器是 `HVMLIterator` 的子类，该类的实现如下：

```python
class HVMLIterator:
    def __init__ (self, on_value, via_value):
        pass

    # implement this method to iterate the data.
    def iterate (self):
        return None

    # implement this method to filter an item.
    def filter (self, curr_item):
        return True

    # implement this method to map the item data to the attributes and/or contents of
    # the cloned element.
    def map (self, cloned_item, current_item):
         return None
```

`HVMLIterator` 定义了三个方法：

- `iterate`：用于迭代数据，子类必须重载该方法。第一次调用时，该方法返回第一个数据项，之后每调用一次，该方法返回下一个数据项，直到返回 `None` 为止。
- `filter`：用于过滤某些数据项。子类可不用实现该方法。
- `map`：若后续操作要克隆模板，使用该方法将数据项映射到克隆后的元素上。

比如对下面迭代并克隆模板插入到指定位置的操作：

```html
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
                <error type="notready">
                    <img src="wait.gif" />
                </error>
                <except type="StopIteration">
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>

    ...
```

我们可以如下实现 `IUser` 类：

```python
class IUser (HVMLIterator):
    def __init__ (self, on_data, via_value):
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

    # implement this method to map the item data to the attributes and/or contents of
    # the cloned element.
    def map (self, el, item_data):
         el.find ('li').attr ('id') = 'user-' + item_data.id
         el.find ('li').attr ('alt') = item_data.name
         el.find ('img').attr ('src') = item_data.avatar
         el.find ('span').textContent = item_data.name
         return node
```

##### 2.6.2.3) 外部归约器

在 `reduce` 动作标签中，当无法使用内建执行器实现特殊的归约操作时，我们可以使用由外部脚本程序定义的归约执行器。以 Python 语言为例，类似外部选择器，外部归约器是 `HVMLReducer` 的子类，该类的实现大致如下：

```python
class HVMLReducer:
    def __init__ (self, on_value, via_value):
        pass

    # implement this method to reduce the data.
    def reduce (self):
        return None

```

`HVMLReducer` 仅定义了一个方法：

- `reduce`：用于执行归约操作，子类必须重载该方法。

比如就 2.7) 中提到的统计用户分布的示例，对应的外部 `RUserRegionStats` 类的实现大致如下：

```python
class RUserRegionStats (HVMLReducer):
    def __init__ (self, on_value, via_value):
        self.data = on_value
        self.stats = {}
        self.stats.count = 0
        self.stats.regions = { '中国大陆': 0, '中国台湾': 0, '其他': 0 }
        pass

    # implement this method to iterate the data.
    def reduce (self, item):
        for item in self.data:
            if item.locale == 'zh_CN':
                self.stats.regions ['中国大陆'] += 1
            elif item.locale == 'zh_TW':
                self.stats.regions ['中国台湾'] += 1
            else:
                self.stats.regions ['其他'] += 1

            self.count += 1

       return self.stats
```

##### 2.6.2.4) 外部函数

外部函数主要用于 `update` 标签以完成复杂的更新操作，所有的事件处理函数之原型为：

```python
def event_handler (on_value, via_value, root_in_scope):
```

其中，

- `on_value` 是 `update` 元素之 `on` 属性的值。
- `via_value` 是 `update` 元素之 `via` 属性的值。
- `root_in_scope` 是 `update` 元素之 `in` 属性确定的当前操作范围。

比如针对电池电量的改变事件，其 `payload` 如 2.8) 所示包含 `level` 和 `charging` 两个键值对，分别表示当前电量百分比以及是否在充电中。因此，其对应的执行器可实现为：

```python
def on_battery_changed (on_value, via_value, root_in_scope):
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

#### 2.6.3) 执行器规则表达式的处理

根据以上描述，我们可以在执行器的规则表达式中使用变量，如下所示：

```html
        <init as="fibonacci">
            [0, 1, ]
        </init>

        <iterate on="1" by="ADD: LT 20 BY $fibonacci[$%]">
            <update on="$fibonacci" to="append" with="$?" />
        </iterate>
```

以上 HVML 代码将获得一个斐波那契（Fibonacci）数列：

```
[0, 1, 1, 2, 3, 5, 8, 13]
```

解释如下：

1. 第一次迭代时，`$%` 的值为 0，`$fibonacci[0]` 的值为 `0`，所以 `ADD` 执行器的规则为：`LT 20 BY 0`。由于迭代结果的初始值为 1（`on` 属性指定），所以本次迭代的结果为 1。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第二次迭代时，`$%` 的值为 1，`$fibonacci[1]` 的值为 `1`，所以 `ADD` 执行器的规则为：`LT 20 BY 1`，由于上次的结果是 1，所以求值后的结果为 2。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第三次迭代时，`$%` 的值为 2，`$fibonacci[2]` 的值为第一次迭代时追加的 `1`，所以 `ADD` 执行器的规则为：`LT 20 BY 1`，由于上次的结果是 2，所以求值后的结果为 3。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第四次迭代时，`$%` 的值为 3，`$fibonacci[3]` 的值为第二次迭代时追加的 `2`，所以 `ADD` 执行器的规则为：`LT 20 BY 2`，由于上次的结果是 3，所以求值后的结果为 5。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第五次迭代时，`$%` 的值为 4，`$fibonacci[4]` 的值为第三次迭代时追加的 `3`，所以 `ADD` 执行器的规则为：`LT 20 BY 3`，由于上次的结果是 5，所以求值后的结果为 8。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第六次迭代时，`$%` 的值为 5，`$fibonacci[5]` 的值为第四次迭代时追加的 `5`，所以 `ADD` 执行器的规则为：`LT 20 BY 5`，由于上次的结果是 8，所以求值后的结果为 13。之后，该结果被追加到了 `$fibonacci` 数组中。
1. 第七次迭代时，`$%` 的值为 6，`$fibonacci[6]` 的值为第五次迭代时追加的 `8`，所以 `ADD` 执行器的规则为：`LT 20 BY 8`，由于上次的结果是 13，所以求值后的结果为 21。由于该结果不满足 `LT 20` 的条件，所以迭代终止。

需要注意的是，对执行器规则字符串的处理，大致有如下两个阶段：

1. 若规则字符串中包含有 JSON 求值表达式，则由 HVML 解释器在将规则字符串传递给执行器之前做处理。
也就是说，规则字符串中不会包含任何变量信息，但仍然可能包含求值表达式，如四则运算表达式。
1. 执行器要根据情况处理可能的规则变化情况，如上述例子中的规则字符串在不同的迭代中有不一样的值。

另外，某些执行器无法处理规则动态变化的情形，比如 SQL 和 TRAVEL 执行器。

### 2.7) 响应式处理

所谓响应式（responsive）处理，是指对如下的 HVML 代码：

```html
    <init as="message">
        "hello, world"
    </init>

    <p>
        $message
    </p>
```

当变量 `$message` 的值被其他 HVML 代码修改时，对应的 HTML 代码将自动更新，而无需使用 `observe` 元素来显式指定相关操作。如果使用 `observe`，则对应的 HVML 代码为：

```html
    <init as="message">
        "hello, world"
    </init>

    <p>
        $message

        <observe on="$message" for="change">
            <update on="$@" at="textContent" with="$message">
        </observe>
    </p>
```

为支持响应式处理，HVML 提供一个语法糖，我们可使用 `{{ }}` 双大括号来标记某个骨架元素的 `textContent` 包含的特定 JSON 求值表达式是响应式的，如：

```html
    <init as="user_name">
        "Tom"
    </init>

    <init as="hello">
        "hello, "
    </init>

    <p>
        {{$hello}}{{$user_name}}
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <init as="user_name" with="$?.attr.value" />
    </observe>
```

以上 HVML 代码在运行时，只要用户修改输入框中的内容，将：

1. 输入框中的内容将自动同步到 `$user_name` 变量。
1. `$user_name` 的内容变化，将自动触发输入框之上段落内容的变化。

对响应式标记，HVML 解释器通过为 JSON 求值表达式中的变量增加相应的 `observe` 元素来实现。比如，以上的代码相当于：

```html
    <p>
        $hello$user_name

        <observe on="$hello" for="change">
            <update on="$@" at="textContent" with="$hello$user_name">
        </observe>
        <observe on="$user_name" for="change">
            <update on="$@" at="textContent" with="$hello$user_name">
        </observe>
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <init as="user_name" with="$?.attr.value" />
    </observe>
```

如此，开发者不需要显式增加 `observe` 标签即可获得相同的响应式处理效果，只需要对相应的表达式增加响应式标记即可。但需要注意的是，HVML 会忽略在上下文变量上使用的响应式标记。

另外，我们可以使用 `bind` 标签实现元素属性或内容到变量的响应式处理。

```html
    <init as="user_name">
        "Tom"
    </init>

    <p>
        Hello, {{$user_name}}
    </p>

    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="$user_name" />
    <bind on="$DOC.query('#the-user-name').attr.value" as="user_name" />
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

> 1. Any number of comments and ASCII whitespace.
> 1. A `DOCTYPE`.
> 1. Any number of comments and ASCII whitespace.
> 1. The document element, in the form of an `hvml` element.
> 1. Any number of comments and ASCII whitespace.

#### 3.1.1) DOCTYPE

DOCTYPE 定义了文档格式以及 HVML 标签使用的前缀。

```html
<!DOCTYPE hvml>
```

一个 `DOCTYPE` 必须按顺序由如下几个部分组成：

> A DOCTYPE must consist of the following components, in this order:

1. 一个由 ASCII 字符组成，且匹配 `<!DOCTYPE` 的字符串，大小写敏感。
1. 一个或多个 ASCII 空白字符。
1. 一个由 ASCII 字符组成，且匹配 `hvml` 的字符串，大小写敏感。
1. 一个可选的 DOCTYPE 系统信息字符串。
1. 零个或多个 ASCII 空白字符。
1. 一个 U+003E GREATER-THAN SIGN 字符（`>`）。

> 1. A string that is an ASCII case-sensitive match for the string `"<!DOCTYPE"`.
> 1. One or more ASCII whitespace.
> 1. A string that is an ASCII case-sensitive match for the string `"hvml"`.
> 1. Optionally, a DOCTYPE system information string.
> 1. Zero or more ASCII whitespace.
> 1. A U+003E GREATER-THAN SIGN character (`>`).

通常书写为`<!DOCTYPE hvml>`，大小写敏感。

> In other words, `<!DOCTYPE hvml>`, case-sensitively.

在 HVML 文档中，当某个 HVML 标签可能和目标标记语言的标签冲突时，我们可以使用预定义前缀来标记 HVML 的标签，默认使用 `v:` 作为前缀，但我们也可以在 DOCTYPE 中自定义这个前缀。前缀字符串必须以字母打头，以冒号（`:`）结尾。

SYSTEM 标识符字符串的格式如下：

1. 一个或多个 ASCII 空白字符。
1. 一个由 ASCII 字符组成，且匹配 `SYSTEM` 的字符串，大小写敏感。
1. 一个或多个 ASCII 空白字符。
1. 一个 U+0022 QUOTATION MARK 字符（双引号，`"`）或 U+0027 APOSTROPHE 字符（单引号，`'`）。
1. 一个指定系统标识符的字面字符串，由一个或者多个被 U+0020 SPACE 字符（空格，` `）分隔的词元组成，比如 `v: MATH`。第一个词元必须由ASCII 字母打头并以 U+003A COLON MARK（冒号，`:`）结尾；该词元定义了 HVML 标签的前缀。其他的词元定义了应该为当前文档装载并绑定的全局变量，比如 `MATH`、 `FILE.FS`、 `FILE.FILE:F` 等。
1. 一个 U+0022 QUOTATION MARK 字符（双引号）或 U+0027 APOSTROPHE 字符（单引号），需匹配先前使用的引号。

> 1. One or more ASCII whitespace.
> 1. A string that is an ASCII case-sensitive match for the string "SYSTEM".
> 1. One or more ASCII whitespace.
> 1. A U+0022 QUOTATION MARK or U+0027 APOSTROPHE character (the quote mark).
> 1. A literal string specified the system information, which consists one or multiple tokens delimited by a U+0020 SPACE (` `), such as "v: MATH". The first token must be started with an ASCII alpha and ended with `:` (U+003A COLON MARK); it defines the prefix of HVML tag. The other tokens defines the variables should be bound for this document, such as `MATH`, `FILE.FS`, `FILE.FILE:F`, and so on.
> 1. A matching U+0022 QUOTATION MARK or U+0027 APOSTROPHE character (i.e. the same character as in the earlier step labeled quote mark).

比如，如果 DOCTYPE 元素被书写为 `<!DOCTYPE hvml SYSTEM "hvml: MATH FILE.FS FILE.FILE:F">`，则可在 HVML 标签之前添加指定的前缀，以免和目标标记语言的标签名称发生冲突：

> For example, if you write the DOCTYPE element as `<!DOCTYPE hvml SYSTEM "hvml: MATH FILE.FS FILE.FILE:F">`, you can add the specific prefix to some HVML tags:

```html
<!DOCTYPE hvml SYSTEM "hvml: MATH FILE:FS FILE:FILE">
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

        <connect at="unix:///var/run/hibus.sock" as="databus" for="hiBus" />

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
                <hvml:error type="nodata">
                    <img src="wait.png" />
                </hvml:error>
                <hvml:except type="StopIteration">
                    <p>Bad user data!</p>
                </hvml:except>
            </iterate>
        </ul>
     </body>
</hvml>
```

注意，我们通常在目标标记语言定义的标签和 HVML 标签冲突时才使用前缀。

当我们使用 `DOCTYPE` 的 `SYSTEM` 标志符定义需要预先装载的全局动态对象时，使用 `<pkg_name>`、 `<pkg_name>:<var_name>`、 `<pkg_name>.<obj_name>` 或者 `<pkg_name>.<obj_name>:<var_name>` 这样的表示法。以上四种表示法的含义分别解释如下：

1. 表示从 `<pkg_name>` 对应的共享库中装载名称同包名 `<pkg_name>` 的动态对象，并绑定为名称是 `<pkg_name>` 的变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称同包名 `<pkg_name>` 的动态对象，并绑定为名称是 `<var_name>` 的变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称为 `<obj_name>` 的动态对象，并绑定为名称是 `<obj_name>` 的变量。
1. 表示从 `<pkg_name>` 对应的共享库中装载名称为 `<obj_name>` 的动态对象，并绑定为变量 `<var_name>`。

如 `DATETIME math:MATH FILE.FS FILE.FILE:F`，表示从：

- 从 `DATETIME` 库中装载动态对象 `DATETIME` 并绑定到全局 `DATETIME` 变量；
- 从 `math` 库中装载动态对象 `MATH` 并绑定到全局 `MATH` 变量；
- 从 `FILE` 库中装载动态对象 `FS` 并绑定到全局 `FS` 变量；
- 从 `FILE` 库中装载动态对象 `FILE` 并绑定到全局 `F` 变量；

#### 3.1.2) 元素

根据其功能及用途，HVML 元素可划分为如下几类：

1) 框架元素（framework elements）  
`hvml`、 `head` 和 `body` 元素。此类元素用于定义 HVML 文档的框架结构。
2) 普通元素（normal elements）  
除框架元素之外的其他 HVML 元素，被称为普通元素。普通元素可进一步划分为如下子类：
   1. 数据操作元素（data operation elements）  
      `init` 和 `update` 元素。其内容必须是符合 eJSON 语法的文本，可包含 JSON 求值表达式。
   1. 一般动作元素（ordinary operation elements）  
       `erase`、 `clear`、 `test`、 `match`、 `choose`、 `iterate`、 `reduce`、 `observe`、 `fire`、 `connect`、 `disconnect`、 `load`、 `back`、 `define`、 `include`、 `call`、 `return` 和 `catch` 元素。
   1. 片段模板元素（fragment template elements）  
      `archetype`、 `error` 和 `except` 元素。片段模板元素的内容通常是使用目标标记语言书写的文档片段。简称模板元素（template elements）。
   1. 数据模板元素（data template elements）  
      `archedata` 元素。其内容必须是符合 eJSON 语法的文本，可包含 JSON 求值表达式。
3) 外部元素（foreign elements）  
所有不属于 HVML 标签定义的元素，被视为外部元素。所有可合法插入到 HVML 文档树中的外部元素，可被视作空动作元素（noop element），亦可被称为骨架元素（skeleton element）。此类元素中可包含文本内容、其他外部元素以及其他 HVML 普通元素。

根据其语法特点，HVML 元素可划分为如下两类：

1) 名词元素（noun elements）  
包括框架元素、外部元素、模板元素和数据模板元素。
2) 动作元素（operation elements）  
包括一般动作元素和数据操作元素。

一般动作元素用于定义对数据或文档的操作，可包含其他普通元素，但不能包含外部元素，也不能定义其文本内容。

数据动作元素用于定义 JSON 数据以及其上的操作，可包含其他普通元素，但不能包含外部元素。

一个模板元素的内容位于该模板元素的起始标签之后，终止标签之前，可包含任意的文本、字符引用、外部元素以及注释，但文本不能包含 U+003C LESS-THAN SIGN (`<`) 或者含糊的 `＆` 符号。

> The markup for the template contents of a template element is placed just after the template element's start tag and just before template element's end tag (as with other elements), and may consist of any text, character references, foreign elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand.

数据模板元素用于定义一个 JSON 格式的数据模板，其内容定义在该元素的起始标签之后，终止标签之前。

外部元素必须要么同时包含起始标签和终止标签，要么起始标签被标记为自终止。后者情形下，不能包含终止标签。

> Foreign elements must either have a start tag and an end tag, or a start tag that is marked as self-closing, in which case they must not have an end tag. 

比如，HTML 的 `<br>` 元素，在 HVML 中作为外部元素使用时，必须书写为：`<br />`。

当一个外部元素的起始标签被标记为自终止时，该元素不能包含任何内容（显然，没有终止标签就无法在起始标签和终止标签之间放置任何内容）。当一个外部元素的起始标签没有被标记为自终止时，该元素中可包含文本、字符引用、JSONEE、CDATA 段、注释以及其他外部元素或动作元素，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

> Foreign elements whose start tag is marked as self-closing can't have any contents (since, again, as there's no end tag, no content can be put between the start tag and the end tag). Foreign elements whose start tag is not marked as self-closing can have text, character references, CDATA sections, other foreign elements or operation elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand.

当一个外部元素包含 `hvml:raw` 属性时，该外部元素中只能包含可转义裸文本，此类元素统称为可转移文本元素（escapable raw text elements）。

可转义裸文本元素中可包含文本和字符引用，但文本中不可包含任何含糊的 & 符号，另有后面所述之限制。

> Escapable raw text elements can have text and character references, but the text must not contain an ambiguous ampersand. There are also further restrictions described below.

框架和外部元素可包含文本、字符引用、其他普通元素或外部元素以及注释，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

> Framework and foreign elements can have text, character references, other elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand. 

标签包含标签名称，给定了元素的名称。HVML 元素允许使用指定的前缀来避免出现标签名称的冲突。除该前缀中包含的冒号（:）字符之外，标签名称中仅使用 ASCII 字母及数字，且仅使用字母开头。

> Tags contain a tag name, giving the element's name. HVML allows use a prefix for the tag of a HVML-only element. Except for the colon character as the end of the prefix, HVML elements all have names that only use ASCII alphanumerics. 

注意，HVML 标签名称区别大小写。对于外部元素的标签，将保留其大小写形式。

##### 3.1.2.1) 起始标签

起始标签必须具有如下格式：

> Start tags must have the following format:

1. 一个起始标签的第一个字符必须是 U+003C LESS-THAN SIGN 字符（`<`）。
1. 该起始标签其后的几个字符必须是该元素的标签名称。
1. 如果在接下来的步骤中存在任意一个属性，则必须有一个或多个 ASCII 空白字符。
1. 然后，起始标签中可包括一些属性，属性的语法会在后面描述。属性之间必须使用一个或者多个 ASCII 空白字符分隔。
1. 在属性之后，或者没有属性的情况下在标签名称之后，可以包含一个或者多个 ASCII 空白字符。（某些属性要求必须跟随一个空白字符；见后面的属性小节。）
1. 然后，如果该元素是一个空白（void）元素，或者该元素是一个外部元素，则可包含一个 U+002F SOLIDUS 字符（`/`）。该字符对空白元素无效，但对外部元素来讲，表明该起始标签是自关闭的（self-closing）。
1. 最后，起始标签必须由一个 U+003E GREATER-THAN SIGN 字符（`>`）关闭.

> 1. The first character of a start tag must be a U+003C LESS-THAN SIGN character (<).
> 1. The next few characters of a start tag must be the element's tag name.
> 1. If there are to be any attributes in the next step, there must first be one or more ASCII whitespace.
> 1. Then, the start tag may have a number of attributes, the syntax for which is described below. Attributes must be separated from each other by one or more ASCII whitespace.
> 1. After the attributes, or after the tag name if there are no attributes, there may be one or more ASCII whitespace. (Some attributes are required to be followed by a space. See the attributes section below.)
> 1. Then, if the element is one of the void elements, or if the element is a foreign element, then there may be a single U+002F SOLIDUS character (/). This character has no effect on void elements, but on foreign elements it marks the start tag as self-closing.
> 1. Finally, start tags must be closed by a U+003E GREATER-THAN SIGN character (>).

##### 3.1.2.2) 终止标签

终止标签必须具有如下格式：

> End tags must have the following format:

1. 一个终止标签的第一个字符必须是 U+003C LESS-THAN SIGN 字符（`<`）。
1. 一个终止标签的第二个字符必须是 U+002F SOLIDUS 字符（`/`）。
1. 该起始标签其后的几个字符必须是该元素的标签名称。
1. 在标签名称之后，可以有一个或多个 ASCII 空白字符。
1. 最后，终止标签必须由一个 U+003E GREATER-THAN SIGN 字符（`>`）关闭.

> 1. The first character of an end tag must be a U+003C LESS-THAN SIGN character (<).
> 1. The second character of an end tag must be a U+002F SOLIDUS character (/).
> 1. The next few characters of an end tag must be the element's tag name.
> 1. After the tag name, there may be one or more ASCII whitespace.
> 1. Finally, end tags must be closed by a U+003E GREATER-THAN SIGN character (>).

##### 3.1.2.3) 属性

> 一个元素的属性在元素的起始标签中表达。

> Attributes for an element are expressed inside the element's start tag.

> 属性有一个名称和一个值。属性名称必须由一个或者多个不是控制字符、U+0020 SPACE、 U+0022（`"`）、 U+0027（`'`）、 U+003E（`>`）、 U+002F（`/`）、  U+003D（`=`）以及非字符（noncharacter）的字符组成。

> Attributes have a name and a value. Attribute names must consist of one or more characters other than controls, U+0020 SPACE, U+0022 ("), U+0027 ('), U+003E (>), U+002F (/), U+003D (=), and noncharacters. In the HVML syntax, attribute names, even those for foreign elements, may be written with any mix of ASCII lower and ASCII upper alphas.

属性值一般是文本和字符引用的混合体，且具有额外限制：文本中不能包含含糊的 `&` 符号。

> Attribute values are a mixture of text and character references, except with the additional restriction that the text cannot contain an ambiguous ampersand.

属性可以如下四种方式指定：

> Attributes can be specified in four different ways:

1) 空属性语法/Empty attribute syntax

仅仅一个属性名，属性值被隐式指定为空字符串。

> Just the attribute name. The value is implicitly the empty string.

在下面的例子中，`uniquely` 属性以空属性语法的形式给定：

> In the following example, the `uniquely` attribute is given with the empty attribute syntax:

```html
    <init as="foo" uniquely via="id">
```

如果一个使用空属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

> If an attribute using the empty attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

2) 无引号属性值语法/Unquoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 ASCII 空白字符、 U+0022 QUOTATION MARK 字符（`"`）、 U+0027 APOSTROPHE 字符（`'`）、 U+003D EQUALS SIGN 字符（`=`）、 U+003C LESS-THAN SIGN 字符（`<`）、 U+003E GREATER-THAN SIGN 字符（`>`）或者 U+0060 GRAVE ACCENT 字符（`\``），而且不能是一个空字符串。

> The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal ASCII whitespace, any U+0022 QUOTATION MARK characters ("), U+0027 APOSTROPHE characters ('), U+003D EQUALS SIGN characters (=), U+003C LESS-THAN SIGN characters (<), U+003E GREATER-THAN SIGN characters (>), or U+0060 GRAVE ACCENT characters (`), and must not be the empty string.

在下面的例子中，属性由无引号属性值语法的形式给定：

> In the following example, the value attribute is given with the unquoted attribute value syntax:

```html
    <init as=foo uniquely via=id>
```

如果一个使用无引号属性语法的属性之后跟随另一个属性，或者随后是起始标签语法第 6 步中提到的可选 U+002F SOLIDUS 字符（`/`），则必须使用 ASCII 空白字符来分隔这两个东西。

> If an attribute using the unquoted attribute syntax is to be followed by another attribute or by the optional U+002F SOLIDUS character (/) allowed in step 6 of the start tag syntax above, then there must be ASCII whitespace separating the two.

3) 单引号属性值语法/Single-quoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是单个 U+0027 APOSTROPHE 字符（`'`），随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 U+0027 APOSTROPHE 字符（`'`），最后由第二个单独的 U+0027 APOSTROPHE 字符（`'`）结尾。

>The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by a single U+0027 APOSTROPHE character ('), followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal U+0027 APOSTROPHE characters ('), and finally followed by a second single U+0027 APOSTROPHE character (').

在下面的例子中，属性由单引号属性值语法的形式给定：

> In the following example, the type attribute is given with the single-quoted attribute value syntax:

```html
    <init as='foo' uniquely via='id'>
```

如果一个使用单引号属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

If an attribute using the single-quoted attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

4) 双引号属性值语法/Double-quoted attribute value syntax

属性名之后跟随有零个或多个 ASCII 空白字符，随后是 U+003D EQUALS SIGN 字符（`=`），随后是零个或者多个 ASCII 空白字符，随后是单个 U+0022 QUOTATION MARK 字符（`"`），随后是属性值，而这里的属性值，除了需满足上面提到的属性值要求之外，还不能包含任何字面的 U+0022 QUOTATION MARK 字符（`"`），最后由第二个单独的 U+0022 QUOTATION MARK 字符（`"`）结尾。

> The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by a single U+0022 QUOTATION MARK character ("), followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal U+0022 QUOTATION MARK characters ("), and finally followed by a second single U+0022 QUOTATION MARK character (").

在下面的例子中，属性由双引号属性值语法的形式给定：

> In the following example, the name attribute is given with the double-quoted attribute value syntax:

```html
    <choose on="$2.payload" in="#the-user-list" with="$user_item">
```

如果一个使用双引号属性语法的属性之后跟随另一个属性，则必须使用 ASCII 空白字符来分隔这两个属性。

If an attribute using the double-quoted attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

在同一起始标签内，不能有两个或更多属性具有相同的属性名。

> There must never be two or more attributes on the same start tag whose names are an ASCII case-sensitive match for each other.

##### 3.1.2.4) 动作元素属性

在 HVML 中，动作元素的属性值存在如下特殊之处：

1. 动作元素的属性值可分为介词属性（preposition attribute）和副词属性（adverb attribute），这些属性是固有属性。
1. 所有介词属性均需定义对应的属性值，可省略其赋值操作符（U+003D EQUALS SIGN `=`）。
1. 所有副词属性按上述（Empty attribute syntax/空属性语法）表述。
1. 除固有的介词属性及副词属性之外，`update` 标签的 `with` 属性可使用额外的赋值运算符。

所有介词属性（仅在动作元素中）的赋值操作符（`=`）可以被忽略：

```
    <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
        <update at = "textContent" with = "foo" />
    </choose>
```

除了上面所述无引号属性值语法之外，我们还可以在如下情形下省略介词属性值周围的单引号（U+0027 APOSTROPHE `'`）或者双引号（U+0022 QUOTATION MARK `"`）：

1. 当使用 JSON 表述方法定义数组或对象作为介词属性值时。如，

```
    <choose on ["zh_CN", "en_US"] to "append update" in #the-user-list with $user_item>
    </choose>
```

或，

```
    <choose on {"zh_CN": 100, "en_US": 50} to "append update" in #the-user-list with $user_item>
    </choose>
```

另外，当使用单引号时，将忽略整个属性值字符串中的所有 JSON 表达式以及 JSON 表述，当做普通字符串处理。

在某些动作元素（如 `update`）中，我们可以使用除 `=` 之外的属性值操作符来改变目标元素或者数据的属性或者内容：

- `+=`：在当前的属性值中添加一个新的词元（token），若已有该词元，则不做修改。比如，原有的 `attr.class` 的属性值为 `foo`，使用 `at="attr.class" with += "text-warning"` 后，将修改为：`foo text-warning`；若原有属性值为 `foo text-warning`，则会保持不变。
- `-=`：从当前属性值中移除一个词元，若没有该词元，则不做修改。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with -= "text-warning"` 后，将修改为 `foo`。
- `%=`：从当前属性值中精确匹配一个词元，并使用第二个词元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with %= "text-warning text-info"` 后，将修改为 `foo text-info`。
- `~=`：从当前属性值中按指定的通配符模式匹配一个词元，并使用第二个词元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with ~= "text-* text-info"` 后，将修改为 `foo text-info`。
- `/=`：从当前属性值中按正则表达式匹配一个词元，并使用第二个词元替换。原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `at="attr.class" with /= "/^text/ text-info"` 后，将修改为 `foo text-info`。
- `^=`：在当前属性值的头部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `at="attr.data-value" with ^= "C"` 后，将修改为：`Cab`。
- `$=`：在当前属性值的尾部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `at="attr.data-value" with $= "C"` 后，将修改为：`abC`。

上述说明中所指词元（token），通常指一个长度不为零的字符序列，其中的字符为 ASCII 字母、ASCII 数字、或者减号（`-`）、连字符（`_`），词元之间由一个或多个空白字符分隔。但在具体的实现中，不包含任何空白字符的可打印字符串视作一个完整的词元。

如，

```
    <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
        <update at="attr.class" with %= "text-* text-info" />
    </choose>
```

注意，动作元素的介词属性，通常会被解释器视作字符串，或被串行化为字符串使用，但存在如下例外：

- 所有动作元素的 `on` 和 `with` 属性，若赋值操作符（=）被忽略且使用无引号属性值语法，或者使用其他语法情形下，以 `[`、 `{`、 `$` 打头时，将被视作一个表达式处理；否则按字符串处理。
- `choose`、 `iterate`、 `reduce` 和 `update` 元素的 `via` 属性，若赋值操作符（=）被忽略且使用无引号属性值语法，或者使用其他语法情形下，以 `[`、 `{`、 `$` 打头时，将被视作一个表达式处理；否则按字符串处理。

如：

```
        <init as i with 100 />

        <init as i with [0, 1, true, false] />
```

等价于：

```
        <init as="i">
            100
        </init>

        <init as="i">
            [0, 1, true, false]
        </init>
```

注意，所有动作元素的一般属性（既非介词属性，也非副词属性），均被解释器视作字符串，或被串行化为字符串使用；所有名词元素和外部元素的属性，均被解释器视作字符串，或被串行化为字符串使用。

##### 3.1.2.5) 可选标签

要求使用严格的 XML 语法，所以，原则上不能省略任何标签，但有如下所述的特殊情形。

1) 整个省略 `head` 元素

我们可以整个省略 `head` 元素。当我们整个省略 `head` 元素时，对应的 HVML DOM 树中将包含一个空的 `head` 元素节点。

```html
<!DOCTYPE hvml>
<hvml target="html">
    <body>
        ...
    </body>
</hvml>
```

2) 自动关闭外部元素

如下所示由外部元素定义的 HVML 片段：

```html
    <div>
        <p>台湾是中国领土<strong>不可分割的一部分！
    </div>
```

我们省略了 `</strong>` 和 `</p>` 终止标签，上述片段将被解析为：


```html
    <div>
        <p>台湾是中国领土<strong>不可分割的一部分！</strong></p>
    </div>
```

注意，HVML 解析器不能处理 HTML 规范定义的可选标签处理规则。如：

```html
    <ul>
        <li>苹果
        <li>菠萝
        <li>香蕉
    </ul>
```

按照 HTML 规范，应被解析为：

```html
    <ul>
        <li>苹果</li>
        <li>菠萝</li>
        <li>香蕉</li>
    </ul>
```

但会被 HVML 解析器解析为：

```html
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

> The text in raw text and escapable raw text elements must not contain any occurrences of the string `</` (U+003C LESS-THAN SIGN, U+002F SOLIDUS) followed by a tag name started with an ASCII alpha letter and followed by one of U+0009 CHARACTER TABULATION (tab), U+000A LINE FEED (LF), U+000C FORM FEED (FF), U+000D CARRIAGE RETURN (CR), U+0020 SPACE, U+003E GREATER-THAN SIGN (`>`), or U+002F SOLIDUS (`/`).

##### 3.1.2.7) JSONTEXT 和 JSONSTR

HVML 的 `init` 和 `archedata` 元素中包含的文本内容必须为一个完整的 JSON 表述（其中可使用 JSON 求值表达式）。如：

```html
<init as="foo">
    [
        "<p>The error message: $?.messages</p>",
        "<p>The exception message: $?.messages</p>"
    ]
</init>
```

对这类元素内容，我们称为 JSON 文本，或简称 `JSONTEXT`。需要说明的是，和裸文本不同，JSON 文本中可包含 `</` 字符，因为这些字符通常包含在双引号包裹的 JSON 字符串中，而不会出现在其他位置。

另外，在动作元素的 `on`、 `with` 等属性值中指定操作数据时，我们可直接使用 JSON 表述（其中可嵌入 JSON 求值表达式），如：

```html
<choose on='[$foo, $bar, true, false, null]'>
</choose>
```

对这类属性，我们称为 JSON 属性（JSON Attribute`），JSON 属性值使用 JSONTEXT 表述。

在其他的属性值中，我们可嵌入 JSON 表达式，如：

```html
<init as='foo' with="foo-$bar" />
```

在模板数据中，我们可嵌入 JSON 表达式，如：

```html
<archetype>
    <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
        <img class="avatar" src="$?.avatar" />
        <span>$?.name</span>
    </li>
</archetype>
```

对这类可嵌入式 JSONEE 的属性值或者可嵌入式 JSONEE 的模板数据，我们简称为 `JSONSTR`。

#### 3.1.3) 文本

在元素内部、属性值和注释中允许使用文本。有关文本使用的限制和使用文本的地方有关，并在其他小节中描述。

> Text is allowed inside elements, attribute values, and comments. Extra constraints are placed on what is and what is not allowed in text based on where the text is to be put, as described in the other sections.

##### 3.1.3.1) 新行

HVML 中的新行必须表达为 U+000D CARRIAGE RETURN（CR）字符、U+000A LINE FEED（LF）字符，或者成对出现的 U+000D CARRIAGE RETURN（CR）和 U+000A LINE FEED（LF）字符。

> Newlines in HVML may be represented either as U+000D CARRIAGE RETURN (CR) characters, U+000A LINE FEED (LF) characters, or pairs of U+000D CARRIAGE RETURN (CR), U+000A LINE FEED (LF) characters in that order.

在允许字符引用的情况下，U+000A LINE FEED 字符（但非 U+000D CARRIAGE RETURN 字符）的字符引用亦可表达一个新行。

> Where character references are allowed, a character reference of a U+000A LINE FEED (LF) character (but not a U+000D CARRIAGE RETURN (CR) character) also represents a newline.

##### 3.1.3.2) 扩展 JSON 语法

当 HVML 元素的内容是 JSON 值时，我们使用扩展的 JSON 语法来书写，这个写法兼容原始的 [JSON] 的语法。

1) 当内容不以换行字符（U+000A LF 或 U+000D CR 字符）开头时，则按普通 HTML 元素的文本内容进行解析，并支持 HTML 字符引用。如：

```html
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
   - 长双精度浮点数：1234567890FL

未显式指定类型的数值，全部视作双精度浮点数处理。

5) 可使用 `"""` 定义多行文本字符串，且保留其中的空格、制表符（`\t`）、单引号（`'`）或者不连续出现三次的双引号（`"`）等，无需使用转义符号。如：

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

6) 增加字节序列类型，使用 `bx`、 `bb`、 `b64` 等前缀，分别表示十六进制表达、二进制表达和 Base64 编码。如：

```js
{
    hex:     bx00112233445566778899AABBCCDDEEFF,
    binary:  bb0011.1100.0011.0011,
    base64:  b64UHVyQyBpcyBhbiBIVk1MIHBhcnNlciBhbmQgaW50ZXJwcmV0ZXIuCiA=,
}
```

使用二进制表达时，中间的句点只用于方便阅读，解析时忽略。

7) 键名、字符串，可使用单引号（`'`）或者双引号（`"`）包围，使用单引号时，字符串中的双引号不需要转义处理。如：

```js
{
    'Title': "David's Book",
    "Description": 'Daivd says: "This is my book"',
}
```

#### 3.1.4) 字符引用

在其他小节描述的特定情况下，文本中可混有字符应用。当文本中不能合法地包含某些字符时，字符引用可用于转义。

> In certain cases described in other sections, text may be mixed with character references. These can be used to escape characters that couldn't otherwise legally be included in text.

字符引用必须由一个 U+0026 AMPERSAND 字符（`&`）起始，之后是三种可能的字符引用类型：

> Character references must start with a U+0026 AMPERSAND character (&). Following this, there are three possible kinds of character references:

1) 被指名的字符引用/Named character references

`&` 字符之后必须跟随 [HTML Specification] 中“被指名的字符引用”一节中给定的名称，且必须使用相同的大小写形式。名称必须是被 U+003B SEMICOLON 字符（`;`）终止的。

> The ampersand must be followed by one of the names given in the named character references section in [HTML Specification], using the same case. The name must be one that is terminated by a U+003B SEMICOLON character (;).

2) 十进制编号的字符引用/Decimal numeric character reference

`&` 字符之后必须跟随一个 U+0023 NUMBER SIGN 字符（`#`），随后是一个或者多个 ASCII 数字，这些数字表示一个十进制的整数，对应于 下面的定义被允许的码点。数字之后必须由一个 U+003B SEMICOLON 字符（`;`）终止。

> The ampersand must be followed by a U+0023 NUMBER SIGN character (#), followed by one or more ASCII digits, representing a base-ten integer that corresponds to a code point that is allowed according to the definition below. The digits must then be followed by a U+003B SEMICOLON character (;).

3) 十六进制编号的字符引用/Hexadecimal numeric character reference

`&` 字符之后必须跟随一个 U+0023 NUMBER SIGN 字符（`#`），随后是一个 U+0078 LATIN SMALL LETTER X 字符（`x`）或一个 U+0058 LATIN CAPITAL LETTER X 字符（`X`），随后是一个或多个 ASCII 十六进制数字，这些数字表示一个十六进制的整数，对应于 下面的定义被允许的码点。数字之后必须由一个 U+003B SEMICOLON 字符（`;`）终止。

> The ampersand must be followed by a U+0023 NUMBER SIGN character (#), which must be followed by either a U+0078 LATIN SMALL LETTER X character (x) or a U+0058 LATIN CAPITAL LETTER X character (X), which must then be followed by one or more ASCII hex digits, representing a hexadecimal integer that corresponds to a code point that is allowed according to the definition below. The digits must then be followed by a U+003B SEMICOLON character (;).

上面描述的两种编号的字符引用形式，不允许引用 U+000D CR、非字符（noncharacter）以及除 ASCII 空白字符之外的控制字符，其他任意码点均可引用。

> The numeric character reference forms described above are allowed to reference any code point excluding U+000D CR, noncharacters, and controls other than ASCII whitespace.

一个含糊的 `&` 字符是指，一个 U+0026 AMPERSAND 字符（`&`）之后跟随一个或多个 ASCII 字母及数字，随后是一个 U+003B SEMICOLON 字符（`;`），但这些字符并不能匹配 [HTML Specification] “被指名的字符引用”一节中给定的名称。

> An ambiguous ampersand is a U+0026 AMPERSAND character (&) that is followed by one or more ASCII alphanumerics, followed by a U+003B SEMICOLON character (;), where these characters do not match any of the names given in the named character references section.

#### 3.1.5) CDATA 段落

CDATA 段落必须按给定的顺序包含如下组件：

> CDATA sections must consist of the following components, in this order:

1. 字符串 `<![CDATA[`。
1. 可选的文本，但文本中不能包含字符串 `]]>`。
1. 字符串 `]]>`。

> 1. The string `<![CDATA[`.
> 1. Optionally, text, with the additional restriction that the text must not contain the string `]]>`.
> 1. The string `]]>`.

CDATA 段落只能用于外部内容。在下面的例子中，CDATA 段落被用于转义 MathML `ms` 元素的内容：

> CDATA sections can only be used in foreign content. In this example, a CDATA section is used to escape the contents of a MathML ms element:

```html
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

> Comments must have the following format:

1. 字符串 `<!--`。
1. 可选文本，但文本中不能以字符串 `>` 打头，也不能以字符串 `->` 打头，也不能包含 `<!--`、 `-->` 或者 `--!>` 字符串，也不能以字符串 `<!-` 结尾。
1. 字符串 `-->`。

> 1. The string `<!--`.
> 1. Optionally, text, with the additional restriction that the text must not start with the string `>`, nor start with the string `->`, nor contain the strings `<!--`, `-->`, or `--!>`, nor end with the string `<!-`.
> 1. The string `-->`.

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

```html
<!DOCTYPE hvml>
<hvml target="xml">
    <head>
    </head>

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
                    <back to="_caller" with="$fileInfo" />
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
- 如果当前选中的目录项类型是文件，则使用 `back` 标签返回上个页面，同时返回 `fileInfo` 数据。

在上述代码中，外部选择器 `CDirEntries` 的实现非常简单，就是列出给定路径下的目录项，并按照要求返回一个字典数组。使用 Python 实现时非常简单，所以这里略去不谈。

如果我们使用 HybridOS 中提到的直接执行本地系统命令的扩展图式（lcmd），我们甚至都不需要编写任何代码，而只需要使用 `request`：

```html
        <init as="lcmdParams">
            { "cmdLine": "ls $fileInfo.curr_path" }
        <init>

        <request on="lcmd:///bin/ls" with="$lcmdParams" via="GET">
            <iterate on="$?" in="#entries" by="RANGE: 0">
                <update on="$@" to="append" with="$dir_entry" />
            </iterate>
        </request>
```

如此，开发者不需要做编写任何程序，即可实现一个简单的文件浏览和打开对话框。

### 4.2) 云应用

HVML 的潜力绝对不止上述示例所说的那样。在未来，我们甚至可以将 HVML 代码运行在云端，通过云端控制设备上的界面显示，从而形成一个新的云应用解决方案。

我们假设一个智能手环上显示当前时间、当地气温、佩戴者的心跳信息和步数信息等信息，而这个智能手环通过 MQTT（一种轻量级消息通讯协议）和云端服务器交换信息，比如向云端服务器发送佩戴者的心跳和步数信息、地理位置信息，获得时间以及当前位置的气象条件等信息。在传统的实现方式中，我们一般需要开发一个在智能手环上运行的 GUI 系统，然后和云端通讯获得数据，界面的修改完全由设备端代码负责。如果要改变界面的样式，大部分情况下需要升级整个智能手环的固件（firmware）。

但如果我们使用 HVML，则可以通过云端来控制设备的界面显示。运行在云端的 HVML 代码如下所示：

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <connect at="tcp://foo.bar:1300" as="braceletInfo" for="mqtt">

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
                <update on="#clock" at="textContent" with="$SYSTEM.time('%H:%m')" />
            </observe>
        </div>

        <div class="temperature" id="temperature">
            <send on="$braceletInfo" to="subscribe" at="temperature">
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#temperature" at="textContent" with="$?.value ℃" />
                </observe>
            </send>
        </div>

        <div class="heartbeat" id="heartbeat">
            <send on="$braceletInfo" to="subscribe" at="heartbeat">
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#heartbeat" at="textContent" with="$?.value BPM" />
                </observe>
            </send>
        </div>

        <div class="steps" id="steps">
            <send on="$braceletInfo" to="subscribe" at="steps">
                <observe on="$braceletInfo" for="event:$?">
                    <update on="#steps" at="textContent" with="$?.value" />
                </observe>
            </send>
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
1. 我们还可以通过外部脚本，将运行在云端的其他功能，如数据库存储、数据的分析以及人工智能等要素有机整合在一起。

## 5) 总结

本文所描述的 HVML，是一种通用、完备、优雅的数据驱动动态标记语言。其主要优点可总结如下：

1. 通过为数不多的动作标签定义了数据驱动的 HTML/XML 文档生成规则，避免使用基于流程控制的传统编程方法，开启了一种新的低代码编程模式。
1. 通过动作标签的介词属性和副词属性，规定了执行动作所需要的数据和动作类型以及规则，便于开发者理解和掌握，从而降低了学习门槛。
1. 为除了 JavaScript 脚本语言之外的其他脚本语言（或编程语言），提供了利用 Web 技术（HTML、CSS、HTTP、WebSocket 等）开发应用程序的框架和设施。
1. 通过丰富的内建执行器，通过诸如 KEY、RANGE、TRAVEL、SQL 等语句在元素和数据上执行迭代、过滤、排序、归约等操作，使开发者可以专心于业务逻辑的实现，而非具体的算法。
1. 通过外部执行器，为复杂数据的处理提供了使用外部脚本或者模块实现相应功能的方法，提供了可扩展性。
1. 通过绑定外部程序模块，提供了可扩展、灵活的动态对象实现方法，结合本文定义的 JSON 求值表达式，可用于满足各种基于函数调用的计算需求。
1. 解决了构建在现有 Web 技术之上的虚拟 DOM 技术存在的打补丁式解决方案引入的问题，比如代码的可读性降低，结构不清晰等问题。

## 附录

### 附.1) 贡献者榜单

本榜单顺序按贡献时间由早到晚排列：

1. Tian Siyuan：资深软件工程师；一些文档细节的建议。
1. Hax：Web 前端技术专家；一些文档细节的建议。

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

6) xGUI

![xGUI](https://www.fmsoft.cn/application/files/cache/thumbnails/7fbcb150d7d0747e702fd2d63f20017e.jpg)

7) miniStudio

![miniStudio](https://www.fmsoft.cn/application/files/cache/thumbnails/82c3be63f19c587c489deb928111bfe2.jpg)

8) HVML

![HVML](https://www.fmsoft.cn/application/files/8116/1931/8777/HVML256132.jpg)

9) 呼噜猫

![呼噜猫](https://www.fmsoft.cn/application/files/8416/1931/8781/256132.jpg)

10) Purring Cat

![Purring Cat](https://www.fmsoft.cn/application/files/2816/1931/9258/PurringCat256132.jpg)

### 附.3) 废弃或待定的内容

1) 老的匹配规则

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

2) 其他

使用 `$&` 作为当前迭代的迭代子（iterator），本质上是迭代子对应的原生实体。

未来，可以增加针对矩阵运算的执行器。

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

