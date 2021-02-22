# HVML 规范（V1.0）

HVML Specification Version 1.0  
Author: Vincent Wei  
Category: App Framework  
Date: Feb., 2021  
Status: Proposal  
Language: Chinese

*Copyright Notice*

Copyright (C) 2020, 2021 [FMSoft Technologies]  
All Rights Reserved.

- [1) 背景](#1-背景)
- [2) HVML 详解](#2-hvml-详解)
   + [2.1) 基本原理及术语](#21-基本原理及术语)
      * [2.1.1) 整体结构](#211-整体结构)
      * [2.1.2) 数据和变量](#212-数据和变量)
         - [2.1.2.1) `$_REQUEST`](#2121-_request)
         - [2.1.2.2) `$_SYSTEM`](#2122-_system)
         - [2.1.2.3) `$_TIMERS`](#2123-_timers)
         - [2.1.2.4) `$_L`](#2124-_l)
         - [2.1.2.5) `$_`](#2125-_)
         - [2.1.2.6) 集合](#2126-集合)
      * [2.1.3) 动态 JSON 对象和 `bind` 标签](#213-动态-json-对象和-bind-标签)
      * [2.1.4) 文档片段的 JSON 数据表达](#214-文档片段的-json-数据表达)
      * [2.1.5) 数据模板和文档片段模板](#215-数据模板和文档片段模板)
      * [2.1.6) 用来操作数据或元素的动作标签](#216-用来操作数据或元素的动作标签)
      * [2.1.7) 其他动作标签](#217-其他动作标签)
      * [2.1.8) 错误和异常标签](#218-错误和异常标签)
      * [2.1.9) 介词属性](#219-介词属性)
      * [2.1.10) 副词属性](#2110-副词属性)
      * [2.1.11) 引用元素或数据](#2111-引用元素或数据)
      * [2.1.12) JSON 求值表达式](#2112-json-求值表达式)
   + [2.2) 动作标签详解](#22-动作标签详解)
      * [2.2.1) `update` 标签](#221-update-标签)
      * [2.2.2) `remove` 标签](#222-remove-标签)
      * [2.2.3) `empty` 标签](#223-empty-标签)
      * [2.2.4) `test` 标签和 `match` 标签](#224-test-标签和-match-标签)
      * [2.2.5) `choose` 标签](#225-choose-标签)
      * [2.2.6) `iterate` 标签](#226-iterate-标签)
      * [2.2.7) `reduce` 标签](#227-reduce-标签)
      * [2.2.8) `observe` 和 `fire` 标签](#228-observe-和-fire-标签)
      * [2.2.9) `request` 标签](#229-request-标签)
      * [2.2.10) `init` 和 `set` 标签](#2210-init-和-set-标签)
      * [2.2.11) `listen` 和 `close` 标签](#2211-listen-和-close-标签)
      * [2.2.12) `load` 和 `back` 标签](#2212-load-和-back-标签)
      * [2.2.13) `define` 和 `include` 标签](#2213-define-和-include-标签)
      * [2.2.14) `call` 和 `return` 标签](#2214-call-和-return-标签)
      * [2.2.15) `catch` 标签](#2215-catch-标签)
   + [2.3) 执行器](#23-执行器)
      * [2.3.1) 内建执行器](#231-内建执行器)
         - [2.3.1.1) `KEY` 执行器](#2311-key-执行器)
         - [2.3.1.2) `RANGE` 执行器](#2312-range-执行器)
         - [2.3.1.3) 用于字符串的内建执行器](#2313-用于字符串的内建执行器)
         - [2.3.1.4) 用于数值的内建执行器](#2314-用于数值的内建执行器)
         - [2.3.1.5) `SQL` 执行器](#2315-sql-执行器)
         - [2.3.1.6) `TRAVEL` 执行器](#2316-travel-执行器)
         - [2.3.1.7) 内部执行器的使用](#2317-内部执行器的使用)
      * [2.3.2) 外部执行器](#232-外部执行器)
         - [2.3.2.1) 外部选择器](#2321-外部选择器)
         - [2.3.2.2) 外部迭代器](#2322-外部迭代器)
         - [2.3.2.3) 外部规约器](#2323-外部规约器)
         - [2.3.2.4) 外部函数](#2324-外部函数)
   + [2.3.3) 响应式处理](#233-响应式处理)
- [3) HVML 语法](#3-hvml-语法)
   + [3.1) 书写 HVML 文档](#31-书写-hvml-文档)
      * [3.1.1) DOCTYPE](#311-doctype)
      * [3.1.2) 元素](#312-元素)
         - [3.1.2.1) 起始标签/Start tags](#3121-起始标签start-tags)
         - [3.1.2.2) 终止标签/End tags](#3122-终止标签end-tags)
         - [3.1.2.3) 属性/Attributes](#3123-属性attributes)
         - [3.1.2.4) 动作元素属性](#3124-动作元素属性)
         - [3.1.2.5) 可选标签](#3125-可选标签)
         - [3.1.2.6) 裸文本元素和可转义裸文本元素的内容限制](#3126-裸文本元素和可转义裸文本元素的内容限制)
      * [3.1.3) 文本/Text](#313-文本text)
         - [3.1.3.1) 新行/newlines](#3131-新行newlines)
         - [3.1.3.2) JSON 求值表达式的语法](#3132-json-求值表达式的语法)         
      * [3.1.4) 字符引用/Character references](#314-字符引用character-references)
      * [3.1.5) CDATA 段落/CDATA sections](#315-cdata-段落cdata-sections)
      * [3.1.6) 注释/Comments](#316-注释comments)
   + [3.2) 解析 HVML 文档](#32-解析-hvml-文档)
      * [3.2.1) 解析模型概览](#321-解析模型概览)
      * [3.2.2) 解析错误](#322-解析错误)
      * [3.2.3) 输入字节流](#323-输入字节流)
      * [3.2.4) 解析状态](#324-解析状态)
         - [3.2.4.1) 插入模式](#3241-插入模式)
         - [3.2.4.2) 开放元素栈](#3242-开放元素栈)
      * [3.2.5) 断词/Tokenization](#325-断词tokenization)
      * [3.2.6) 树的构造](#326-树的构造)
         - [3.2.6.1) 创建和插入模式/Creating and inserting nodes](#3261-创建和插入模式creating-and-inserting-nodes)
         - [3.2.6.2) 解析仅包含文本的元素/Parsing elements that contain only text](#3262-解析仅包含文本的元素parsing-elements-that-contain-only-text)
         - [3.2.6.3) 自动关闭元素/Auto-closing elements](#3263-自动关闭元素auto_closing-elements)
         - [3.2.6.4) HVML 内容的词法解析规则/The rules for parsing tokens in HVML content](#3264-hvml-内容的词法解析规则the-rules-for-parsing-tokens-in-hvml-content)
         - [3.2.6.5) 外部内容的词法解析规则/The rules for parsing tokens in foreign content](#3265-外部内容的词法解析规则the-rules-for-parsing-tokens-in-foreign-content)
      * [3.2.7) 结束](#327-结束)
      * [3.2.8) 错误错误](#328-错误错误)
   + [3.3 HVML 片段的串行化/Serializing HVML fragments](#33-hvml-片段的串行化serializing-hvml-fragments)
   + [3.4 解析 HVML 片段/Parsing HVML fragments](#34-解析-hvml-片段parsing-hvml-fragments)
   + [3.5 已命名字符引用/Named character references](#35-已命名字符引用named-character-references)
- [4) 应用示例](#4-应用示例)
   + [4.1) 使用 HVML 开发传统 GUI 应用](#41-使用-hvml-开发传统-gui-应用)
   + [4.2) 云应用](#42-云应用)
- [5) 总结](#5-总结)


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
- 这些技术通过引入 `v-if`、`v-else`、`v-for` 等虚拟属性实现了基于数据的条件和循环流程控制，但这种方法带来代码可读性的急剧下降，代码可读性的下降带来代码可维护性的下降。如下面 Vue.js 的一个示例：

```html
<div v-if="Math.random() > 0.5">
  Now you see "{{ name }}"
</div>
<div v-else>
  Now you don't
</div>
```

在 HybridOS（合璧操作系统）的开发过程中，我们在虚拟 DOM 思想的基础上，发展了一套完备、通用、优雅、易学的标记语言 HVML（Hybrid Virtual Markup Language）。HVML 是一种通用的动态标记语言，主要用于生成实际的 XML/HTML 文档内容。HVML 通过数据驱动的动作标签和介词属性，实现了 XML/HTML 文档的动态生成和更新能力；HVML 还提供了和已有编程语言，如 C/C++、Python、Lua、JavaScript 等进行结合的方法，从而可以支持更加复杂的功能。

HVML 的设计思想来源于 React.js、Vue.js 等最新的 Web 前端框架。但是，相比基于虚拟 DOM 的 Web 前端技术，HVML 提供了更加系统和完备的低代码（low code，指使用更少的代码来编写程序）编程方法，并扩展了其用途。

在未来，HVML 将成为 HybridOS 的 App 开发首选编程语言。

## 2) HVML 详解

### 2.1) 基本原理及术语

和 HTML 类似，HVML 使用标记语言来定义文档的结构和内容，但和 HTML 不同的是，HVML 是动态的。

在详细了解 HVML 的设计思想之前，我们首先给出 HVML 的如下基本原理和特点：

1. 数据驱动编程。通过基于数据的迭代、插入、更新、清除等操作，开发者不需要编写程序或者只要少量编写程序即可动态生成最终的 XML/HTML 文档。通过观察新的数据或文档本身的变化以及用户交互事件，HVML 可实现 XML/HTML 文档或数据的动态更新。我们将这种编程方式称为数据驱动的编程（data-driven programming）。
1. 通过 HVML 引入的编程模型和方法，用于表述界面的 XML/HTML 文档内容可完全由 HVML 生成和动态调整，这避免了在程序代码中直接操作文档的数据结构（即文档对象树，或简称 DOM 树），而程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。比如，
   * HVML 可在文档片段模板或者数据模板中定义数据和 DOM 元素之间的映射关系，而无需编写额外的代码完成数据到 DOM 元素属性、内容等的赋值操作。
   * HVML 将错误和异常的处理和程序代码分离了开来，程序只要产生适当的错误或者异常，而对应的处理则直接在 HVML 中定义，这同时提高了代码的可维护性。
1. HVML 对文档和数据的操作提供了一致接口。HVML 要求所有外部数据均使用 JSON 格式表述，JSON 格式是一种人机共读的数据表述形式，可在数值、字符串、数组、字典等基本数据单元的基础上表述复杂对象。由于 HTML/XML 文档的片段可表述为 JSON 格式的数据，因此，HVML 亦可用于操作使用 JSON 表述的数据。
1. HVML 动作标签使用介词和副词属性来定义动作依赖的数据、目标对象以及执行条件等，和常见的编程语言有很大不同，HVML 的描述方式更加贴近自然语言，从而可以大幅降低学习门槛。
1. 通过对数据和文档结构的抽象，HVML 提供了为数不多的几种动作标签，通过这些标签的嵌套使用，可组合成更为复杂的操作逻辑。

在围绕 HVML 构成的软件系统中，主要包含如下两个模块：

1. HVML 解释器（interpreter）。HVML 解释器用来解析 HVML 文档或者 HTML/XML 文档片段，执行动作标签指定的操作，监听文档或数据的变化，并在需要的情况下，按照固定的接口调用使用脚本语言或者其他编程语言开发的功能。由于解析（parse）HVML 标记仅仅是 HVML 解释器的一个功能，因此，我们不使用解析器（parser）来指代这个模块。
1. XML/HTML 用户代理（user-agent）。XML/HTML 代理是指最终解析和/或渲染 XML/HTML 文档的计算机程序。对 HTML 文档来讲，就是我们常用的浏览器；对 XML 文档来讲，通常是一个可以由某个 GUI 支持系统解析并渲染为图形用户界面的文档。需要注意的是，一个 XML/HTML 用户代理也可以用来完成某种抽象的操作，并不一定是用来渲染图形用户界面的，比如，我们可以使用 XML 来描述日志、数据库等。

为方便描述，HybridOS 文档中使用如下术语：

1. 数据（data）。指可通过 JSON 格式表述的各种数据，包括：
   - 可用单个或多个键值对（key-value pair）表示的对象，亦称字典、关联数组等；
   - 数组；
   - 字符串；
   - 数值；
   - 真值（true）；
   - 假值（false）；
   - 空值（null）。
1. 数据项（data item）或数据元素（data element）。对数组而言，每个数组单元就是一个数据项；对字典数据而言，其中的某个键值对就是一个数据项。
1. 文档元素（document element）。指文档对象模型中，使用某个标签（tag）定义的元素节点；一个文档元素可包含一个或多个属性（attribute）以及属性值，还可以包含内容（content）；一个元素可包含文本内容或者使用标签定义的单个或多个子元素。
1. 文档片段（document fragement）。指 XML/HTML 文档中的一个片段，可作为模板被克隆（clone）到文档的其他位置。

下面用一个简单的例子来说明 HVML 的基本用法。这个 HVML 文档生成的 HTML 页面，将在屏幕上展示三组信息：

1. 在页面顶端显示的系统状态栏，用于展示当前时间、WiFi 信号强度、电池电量信息等。这些信息将动态更新。
1. 在页面中间位置展示用户列表，每个用户项包括用户名称、头像等信息。这些信息来自 JSON 表达的一个字典数组。
1. 在页面底部展示一个搜索引擎连接。具体的搜索引擎根据系统所在的语言地区（locale）信息确定。

```html
<!DOCTYPE hvml>
<hvml target="html" script="python" lang="en">
    <head>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <listen on="hibus://system/status" as="systemStatus" />
    </head>

    <body>
        <archetype id="user-item">
            <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
                <img class="avatar" src="$?.avatar" />
                <span>$?.name</span>
            </li>
        </archetype>

        <archedata id="item-user">
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
            <iterate on="$users" with="#user-item" to="append" by="CLASS: IUser">
                <error on="nodata">
                    <img src="wait.png" />
                </error>
                <except on="StopIteration">
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>

        <archetype id="footer-cn">
            <p><a href="http://www.baidu.com">Baidu</a></p>
        </archetype>

        <archetype id="footer-tw">
            <p><a href="http://www.bing.com">Bing</a></p>
        </archetype>

        <archetype id="footer-def">
            <p><a href="http://www.google.com">Google</a></p>
        </archetype>

        <footer id="the-footer">
            <test on="$global.locale" in='the-footer'>
                <match for="~zh_CN" to="displace" with="#footer-cn" exclusively>
                </match>
                <match for="~zh_TW" to="displace" with="#footer-tw" exclusively>
                </match>
                <match for="*" to="displace" with="#footer-def">
                </match>
                <error on="nodata">
                    <p>You forget to define the $global variable!</p>
                </error>
                <except on="KeyError">
                    <p>Bad global data!</p>
                </except>
                <except on="IdentifierError">
                    <p>Bad archetype data!</p>
                </except>
            </test>
        </footer>

        <observe on="$systemStatus" for="battery" by="FUNC: on_battery_changed">
        </observe>

        <observe on=".avatar" for="clicked" by="FUNC: on_avatar_clicked">
        </observe>
    </body>
</hvml>
```

#### 2.1.1) 整体结构

如上例所示，HVML 采用了类似 HTML 的标签来定义文档的整体结构：

- 在文档的开头，我们使用 `<!DOCTYPE hvml>` 来标记文档类型为 `hvml`。
- `hvml` 标签用于定义整个 HVML 文档。可包含如下属性：
   1. `target`：定义 HVML 文档的目标标记语言，取 `html`、`xml` 等值。
   1. `script`： 定义处理 HVML 文档的系统环境，取 `c`、`cpp`、`python`、`lua`、`javascript` 等值。
- `head` 标签用于定义头部信息，其中可包含：
   1. 可被原样保留到目标文档的标签，如 HTML 文档的 `<meta>`、`<link>` 标签。
   1. 全局数据的初始化；使用 `init` 和 `set` 标签定义。
   1. 全局动态 JSON 对象；使用 `bind` 标签定义。
   1. 需要监听的长连接数据源；使用 `listen` 标签定义。
   1. 全局模板；使用 `archedata`、`archetype` 或 `rawpart` 标签定义。
- `body` 标签用于定义文档的本体内容。

注意，所有非 HVML 标签所定义的内容，在 HVML 解析完成时，将被完整保留。另外需要注意的是，为了避免和 HTML 标准定义的标签重复，HVML 的常用标签均为英语中的动词，而 HTML 标准通常使用名词或其简写作为标签名称，如 HTML 的常见标签 `p` 是 paragraph（段落）的简写。

需要注意的是，HVML 的标签、属性名称、变量名称是区分大小写的，这主要是为了和 XML 相关规范保持一致。

__是否考虑：__  
在 HVML 文档中，可以定义多个 `body` 本地内容，使用 `id` 属性区别不同的本体内容。在执行过程中，可通过 `load` 元素装载不同的本地内容。

#### 2.1.2) 数据和变量

除了上述用于定义文档整体结构的标签外，HVML 提供了如下用于定义数据的标签：

- `init`：该标签初始化一个变量；我们将有名字的数据称为变量。在 HVML 文档的头部（由 `head` 标签定义）使用 `init` 标签，将初始化一个全局变量。在 HVML 文档的正文（由 `body` 标签定义）内使用 `init` 标签，将定义一个仅在其所在父元素定义的子树中有效的局部变量。我们可以直接将 JSON 数据嵌入到 `init` 标签内，亦可通过 HTTP 等协议加载外部内容而获得，比如通过 HTTP 请求，此时，使用 `with` 属性定义该请求。
- `listen`：该标签定义一个对长连接数据源的监听，比如来自 WebSocket、MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包。
- `close`：该标签关闭先前建立的一个长连接数据源。
- `bind`：该标签用于在头部定义一个动态的 JSON 对象，该对象由 HVML 解释器或外部脚本实现。

在 `head` 中定义的全局变量，不会因为本体内容的改变而改变。

在 HVML 中，我们通常使用 `as` 属性来给数据命名，但 HVML 保留如下几个变量名称用于特殊场合，我们称为内置全局变量，习惯上全部使用大写形式，并使用 `_` 作为前缀。

##### 2.1.2.1) `$_REQUEST`

`$_REQUEST`：主要用来表述装载文档时，由其他模块提供的请求数据，一般由 HVML 解释器在装载 HVML 文档时生成。比如下面的 Python 脚本装载一个 HVML 文档，并传递了 `nrUsers` 参数：

```python
hvml.load ("a.hvml", { "nrUsers" : 10 })
```

在 HVML 文档中，我们可使用 `$_REQUEST.nrUsers` 来引用上述脚本代码传入的值（`10`）。

##### 2.1.2.2) `$_SYSTEM`

`$_SYSTEM`：一个用于访问系统基本功能的 JSON 对象，可用于提供系统时间、当前语言地区信息、随机数、机器名称等。比如，我们要获得当前的 Unix 时间戳，可直接使用 `$_SYSTEM.time`，如果要获得一个随机数，可直接使用 `$_SYSTEM.random`，如果我们要获得当前的机器名称，可使用 `$_SYSTEM.name`，如果要获取当前语言地区信息，可使用 `$_SYSTEM.locale`。

在 HVML 中，`_SYSTEM` 变量本质上是一个动态 JSON 对象，无须初始化即可使用。

##### 2.1.2.3) `$_TIMERS`

`$_TIMERS`：主要用于在 `init` 标签中定义全局的定时器，具有固定的格式。如：

```html
    <init as="_TIMERS" uniquely by="id">
        [
            { "id" : "foo", "interval" : 1000, "active" : "no" },
            { "id" : "bar", "interval" : 2000, "active" : "no" },
        ]
    </init>
```

上述 `init` 标签定义了两个定时器（标识符分别为 `foo` 和 `bar`），间隔分别为 1 秒和 2 秒（使用毫秒为单位定义定时器）。这两个定时器均未激活（`active` 为 `no`）。

只要在 HVML 中修改某个定时器的 `active` 参数即可激活这个定时器，然后使用后面介绍的 `observe` 即可监听定时器到期时间：

```html
    <choose on="$_TIMERS" to="update" by="SQL: GET WHERE id = 'foo'">
        <update on="$?" key.active="yes" />
    </choose>

    ...

    <observe on="$_TIMERS" for="foo" to="update" in="#the-header" >
        <update on="> span.local-time" textContent="$_SYSTEM.time('%H:%m')" />
    </observe>
```

##### 2.1.2.4) `$_L`

`$_L` 是一个动态 JSON 对象，该对象完成数值对比、字符串对比以及逻辑与、或、异或、取反等逻辑操作：

1. `$_L.NOT(<json_evaluation_expression>)`：用于逻辑取反操作。
1. `$_L.AND(<json_evaluation_expression>, <json_evaluation_expression>, ...)`：用于逻辑与运算。
1. `$_L.OR(<json_evaluation_expression>, <json_evaluation_expression>, ...)`：用于逻辑或运算。
1. `$_L.XOR(<json_evaluation_expression>, <json_evaluation_expression>)`：用于逻辑异或运算。
1. `$_L.NUMCMP(< '>' | '>=' | '==' | '<=' | '<' | '!=' >, <json_evaluation_expression>, <json_evaluation_expression>)`：用于比较两个数值；第一个参数用来表示比较运算符，其后的两个参数用来传递两个数值。
1. `$_L.STRCMP(< 'case' | 'wildcard' | 'reg' >, <json_evaluation_expression>, <json_evaluation_expression>)`：用于对比两个字符串；第一个参数用来表示字符串的匹配方式（区分大小写、通配符、正则表达式），其后的两个参数用来传递两个字符串。

比如 `$_L.NOT($_L.NUMCMP('>', 5, 3))` 的结果是假值（`false`）。

##### 2.1.2.5) `$_`

该变量主要用于文本的本地化。常用用法如下：

```html
<!DOCTYPE hvml>
<hvml target="html" script="python">
    <head>
        <init as="_" with="https://foo.bar/messages/$_SYSTEM.locale">
        </init>

        <title>$_['Hello, world!']</title>
    </head>

    <body>
        <p>$_['Hello, HVML!']</p>
    </body>

</hvml>
```

在上面的 HVML 代码中，我们在头部使用 `init` 标签初始化了 `$_` 变量，该变量的内容来自 `https://foo.bar/messages/$_SYSTEM.locale`。注意其中的 `$_SYSTEM.locale` 是一个 JSON 求值表达式，会返回当前系统的语言地区标识符（如 `zh_CN`），HVML 解释器求值并替代后的最终 URL 为：`https://foo.bar/messages/zh_CN`。从该 URL 获得的文件内容一般为：

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

##### 2.1.2.6) 集合

在 HVML 中，我们可以使用 JSON 数组来定义一个集合。集合有如下特征：

- 按照指定的数据项唯一性判断条件，具有唯一值的元素在集合中只能有一项。
- 我们可以在集合上执行合并、相交、相减等集合特有的操作。

当我们需要定义集合时，使用 `init` 标签的 `uniquely` 副词属性，必要时，通过 `by` 属性值指定唯一性判断条件。

默认情况下，我们使用数据项的值来判断两个数据项是否相等。判断规则如下：

- 类型不同的数据项不相等。
- 两个字符串相同时，相等。
- 两个数值相同时，相等。
- 两个数组的成员一对一相同时，相等。
- 两个字典的键值对一对一相同时，相等。

比如，我们使用下面的 `init` 标签定义一个字符串集合：

```html
    <init as="locales" uniquely>
        [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK", "en_US" ]
    </init>
```

上述用来初始化字符串集合的数组中包含有重复两个值 `en_US`，因此，在最终的结果中只会保留一项。

但针对字典，我们可以定义使用某个特定的键值作为唯一性判断条件。比如我们通常使用 `id` 来表示数据项的唯一标识符。这个定义类似关系数据库中的主键（primary key）。

我们使用 `init` 标签的 `by` 属性值来定义字典的唯一性键名。当使用多个键名作为唯一性条件时，使用空格分隔。比如：

```html
    <init as="users" uniquely by="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
        ]
    </init>
```

上面的示例代码定义了一个使用 `id` 键名作为唯一性判断条件的集合。假如用来初始化这个集合的字典数组中多一项 `id` 为 `2` 的数据项，则之前 `id` 为 `2` 的数据项会被后来 `id` 为 `2` 的数据项替代。比如，


```html
    <init as="users" uniquely by="id">
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "David", "region": "zh_CN" }
        ]
    </init>
```

上述代码初始化后的 `$users` 中，`id` 为 `2` 的用户姓名将为 `David`。

注意，内置全局变量 `$_TIMERS` 本质上就是一个使用键名 `id` 的键值作为唯一性判断条件的字典集合。

HVML 为集合类数据提供了若干抽象的数据操作方法，比如求并集、交集、差集、异或集等。详情见 `set` 标签的描述。

#### 2.1.3) 动态 JSON 对象和 `bind` 标签

在 HVML 中，我们扩展了 JSON 数据的表达方式，使之具有动态特性。一个动态的 JSON 对象，通常由 HVML 解释器或者外部脚本程序定义或实现。从 HVML 文档的角度看，访问一个动态 JSON 对象的方法和访问一个常规的 JSON 对象方法并无二致。比如，我们通过访问 `$_SYSTEM.time` 可获得当前的 UNIX 时间戳。但是，每次访问某个动态 JSON 对象的特定属性时，其返回值可能会不同。

作为动态 JSON 对象的另一个特性，我们可以将某个特定的属性视作对象而在其上提供虚拟的属性，比如当我们访问 `$_SYSTEM.time.iso8601` 时，将获得当前时间的 ISO 8601 标准字符串（如 `2020-06-24T11:27:05+08:00`）。

更进一步，我们还可以将某个特定的属性当作函数使用，通过传递参数来获得不同的返回值，或者对该属性设置特定的值。比如在 `$_SYSTEM` 对象上，如果我们要获取对当前时间执行特定格式化的字符串，可以使用 `$_SYSTEM.time('%H:%m')`，这时，我们将获得类似 `11:27` 的时间字符串。如果我们要设置当前时间，则可以使用 `$_SYSTEM.time<123456>`。

这里，我们引入了两种运算符：`()` 和 `<>`。本质上，前者对应于属性的获取方法（getter），后者对应于属性的设置方法（setter）。

除了内置的 `$_SYSTEM` 动态对象之外，我们还可以通过外部脚本来实现自定义的动态 JSON 对象，并通过 `bind` 标签将这个动态的 JSON 对象和某个变量绑定在一起，如：

```html
    <bind on="math" in="libc" as="math" />
```

之后，当我们访问 `$math.pi` 时，将返回 PI 的值，如果访问 `$math.pi(3)` 将返回保留三位有效小数位数的 PI 值，即 `3.142`；而如果访问 `$math.sin($math.pi)` 将返回 `0.0`。

通过这样的设计，我们可以方便有效地扩展 HVML 的功能，并通过动态 JSON 对象和外部模块交换数据，或者调用外部模块的功能。

为方便处理复杂对象，我们还可以在已有的数据上绑定一个新的变量名：

```html
    <bind on="$users[0]" as="me" />
```

之后，当我们需要引用 `$users[0]` 时，可直接使用 `$me`。

当我们引用一个动态 JSON 对象上并不存在的属性，或者不存在的虚拟子属性，或者无法在该属性上执行函数操作时，HVML 解释器或该对象的外部脚本实现将返回错误或抛出异常。

#### 2.1.4) 文档片段的 JSON 数据表达

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
                "children": null
            },

            {
                "tag": "span",
                "attr": null,
                "children": [
                    {
                        "tag": "txt",
                         "attr": null,
                         "content": "foo",
                         "children": null
                    }
                ]
            },

            {
                "tag": "txt",
                "attr": null,
                "content": "（中国大陆）",
                "children": null
            }
        ]
    }
```

需要注意的是，将 DOM 文档结构用 JSON 数据表达时，可以有多种不同的转换策略。但 HVML 解释器会采用固定的结构来进行转换，以方便在其上执行结构化查询。具体来讲：

1. 每个 DOM 元素使用一个字典数据来表述，用 `tag` 键值对来描述元素的标签，用 `attr` 键值对来描述元素的属性，用 `children` 键值对来描述该元素的子元素或者文本内容。
1. 元素的所有属性构成了一个字典数据。
1. 所有元素的文本内容被视为一个虚拟的子元素，其标签名为 `txt`，其属性 `content` 定义了真正的文本内容。
1. 每个元素的子元素（包括文本内容在内），用数组来描述，每个数组单元是一个字典数据，用于定义子元素。

在引用元素的属性或者文本内容时，我们可以使用如下约定：

- 当我们在一个元素上获取 `textContent` 键名时，相当于引用这个元素的文本内容，包括所有子元素的文本内容，按照深度优先遍历路径连接起来的字符串。
- 当我们在一个元素上设置 `textContent` 键值时，相当于移除该元素的所有子元素（若有），并设置该元素的文本内容为对应的键值。
- 当我们在一个元素上获得 `xmlContent`、`htmlContent`、`jsonContent` 键名的键值时，相当于获得这个元素所有子元素的 XML、HTML 或者 JSON 表达；在设置该键名的键值时，相当于使用 XML、HTML 或者 JSON 表述的文本来创建该元素的子元素（替换掉原有子元素）。
- 我们可以使用 `attr.class` 这样的复合键名来引用一个元素的特定属性，从而将其看成是一个描述该元素的字典的一个键值。引用一个未定义的属性时，按属性值为 null 值对待。

在数据上执行选择、迭代或者规约操作时，上述方案只支持使用 `on` 属性指定单个数据项。我们也可以使用类似 CSS 选择器的方式来引用某个数据项或者某个数据项的集合，比如：

- 针对基于字典数据的树形结构或者数组：
    - `$users[locale]`：表示选择 `$users` 中定义有 `locale` 键名的数据项。
    - `$users[locale = 'abc']`：表示选择 `$users` 中所有 `locale` 键值等于 `abc` 的数据项。
    - `$users[locale *= 'abc']`：表示选择 `$users` 中所有 `locale` 键值包含 `abc` 子字符串的数据项。
    - `$users[locale ^= 'abc']`：表示选择 `$users` 中所有 `locale` 键值以 `abc` 打头的数据项。
    - `$users[locale $= 'abc']`：表示选择 `$users` 中所有 `locale` 键值以 `abc` 结尾的数据项。
    - `$users[locale ~= 'abc']`：表示选择 `$users` 中所有 `locale` 键值中以 `abc` 作为一个而完整词法单元的数据项。
- 针对数组：
    - `$users:nth-child(3n+1)`：表示当前数组中所有索引下标匹配 4、7、10 等的数据项。

使用上述选择器之后，相当于对原有单个数据项做了一些过滤。比如 `<choose on="$users" ... />` 选择了整个 `$users` 数组内容做后续处理，但如果使用 `<choose on="$users:nth-child(2n)"` 则仅选择下标为偶数的数组单元。

#### 2.1.5) 数据模板和文档片段模板

HVML 定义了两种模板标签，用于定义可以插入 DOM 文档中的 XML/HTML 模板以及 JSON 数据模板：

- `archedata`：该标签用于定义一个 JSON 格式的数据项模板。
- `archetype` 和 `rawpart`：这两个标签可用于定义一个 XML/HTML 格式的文档片段模板。类似 HTML5 的 `template` 标签，这两个标签用来定义一个 XML/HTML 模板，其中的内容可以是一个 XML 片段，也可以是一个 HTML 片段，前者可用于生成特定 GUI 系统的界面描述片段，后者可以生成 HTML 文档的片段。`archetype` 和 `rawpart` 的不同之处在于，在克隆前者定义的文档片段时，将执行 JSON 表达式置换操作，后者则不做此项处理。

在定义模板时，可直接定义文档片段和数据之间的映射关系。如：

```html
    <archetype id="user-item">
        <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.name</span>
        </li>
    </archetype>

    <archedata id="item-user">
        {
            "id": "$?.attr.data-value", "avatar": "$?.children[0].attr.src",
            "name": "$?.children[1].children[0].textContent", "region": "$?.attr.data-region"
        }
    </archedata>

    <rawpart id="unknown-user-item">
        <li class="user-item">
            <img class="avatar" src="/def-avatar.png">
            <span>Unknown</span>
        </li>
    </rawpart>
```

在上面的例子中，`archetype` 标签定义了一个文档片段模板，可用于生成真实的文档片段并插入到合适的 DOM 树位置。HVML 解释器在将该模板克隆并插入到真实的文档 DOM 树时，会将当前上下文中的数据按照给定的映射关系进行替换。在 HVML 中，`$?` 是一个特殊的上下文变量，用来指代动作标签执行时的当前上下文数据。类似 `$?.id`、`$?.name` 这样的字符串将被视为 JSON 求值表达式进行求值，最终使用当前上下文的数据来替代。

在上面的例子中，`archedata` 标签定义了一个数据模板，其处理类似 `archetype`，但主要执行相反的操作，通常用于将一个 DOM 子树映射为一个 JSON 数据项，或者将一个 JSON 数据项映射到另一个结构不同的 JSON 数据项。

在上面的例子中，`rawpart` 标签定义了一个裸文本模板，其中包含一段 XML/HTML 文档片段，可克隆到目标位置，但不做任何 JSON 求值表达式的处理，即使包含合法的 JSON 求值表达式。

注意，用于引用特定的 `archetype` 或 `archedata` 模板的标识符（由 `id` 属性定义），和 HTML/XML 不同，HVML 不要求该标识符是全局唯一的，而只要求在 HVML 的同一级兄弟元素中唯一，这带来了一定的便利。比如：

```html
    <body>
        <archetype id="user-item">
            <p>$?</p>
        </archetype>

        <ul>
            <archetype id="user-item">
                <li>$?</li>
            </archetype>

            ...
        </ul>
    </body>
```

在上述 HVML 代码中，当我们在 `ul` 元素中引用 `#user-item` 时，对应的文档模板是 `<li>$?</li>`，而在 `ul` 元素之外应用 `#user-item` 时，得到的文档模板是 `<p>$?</p>`。

#### 2.1.6) 用来操作数据或元素的动作标签

HVML 定义有如下几个基本的动作标签，用于操作数据或者元素：

- `test` 标签定义在一个元素节点或者数据项上执行测试动作，用于实现依赖数据值的条件操作。
- `match` 标签用来定义 `test` 元素的子元素，以定义一个匹配分支。
- `iterate` 标签用来定义在一个可迭代数据或者元素上的迭代动作。
- `reduce` 标签用来定义在一个可迭代数据或者元素上执行规约（reduce）动作。
- `observe` 标签用来定义针对被监听数据或者元素上的观察动作；`fire` 标签用来显式发起一个事件。
- `update` 标签用来定义在指定元素或数据项上的更新操作，同时定义文档元素属性、内容和数据之间的映射关系。
- `empty` 标签用来在指定元素或者数据项上执行清空操作，通常意味者删除当前元素或者数据的所有子元素或者数据项。
- `remove` 标签用来删除指定的元素或数据项。
- `set` 标签用来在字典、数组或者集合上，依据另外一项数据执行特定的操作。

在 HVML 中，动作元素具有如下的特点：

1. 动作元素中不能直接包含使用目标标记语言的标签定义的子元素，但动作元素可以作为使用目标标记语言的标签定义的元素之子元素。
1. 每个动作元素都有一个输入数据，一般来自其父动作元素。
1. 每个动作元素有一个执行结果数据，用于其直接子元素的输入数据。
1. 每个动作元素有一个文档操作位置，对应最终文档的某个元素。一般继承自其父元素；当动作元素用于操作数据时，文档操作位置不发生变化。

我们将一个动作元素及其后代（descendant）动作元素形成的树形结构称为动作子树。

另外，在 HVML 中使用目标标记语言的标签定义的元素（如示例代码中的 `body`、`ul` 等），通常形成了最终文档的结构骨架（skeleton），因此，我们将这类元素称为 `骨架` 元素。在 HVML 解释器中，我们将骨架元素视作一种特殊的动作元素：

- 其默认动作为 `noop`，即空操作。
- 骨架元素不需要输入数据，但隐含指定了可继承给后继动作元素的操作范围（对应上下文变量 `$@`），即该骨架元素在最终 DOM 树中对应的子树。
- 骨架元素对应的文档操作范围作为其执行结果传给其子动作元素，也就是子动作元素的上下文变量 `$?`。

通过动作标签，HVML 可完成对文档或数据的插入、删除、修改等操作，以及通过观察数据的变化而动态调整 DOM 树的行为。我们将在本文档第 2) 小节中详细讲述这些动作标签。

#### 2.1.7) 其他动作标签

HVML 还定义有如下一些动作标签：

- `listen` 标签用于定义一个对长链接数据源的监听，并绑定一个变量名。
- `request` 标签用来在指定的被监听数据源上发出一个请求。
- `close` 标签用于关闭一个先前建立的长连接数据源。
- `load` 标签用来装载一个由 `with` 属性指定的新 HVML 文档，并可将 `by` 属性指定的对象数据作为参数传递到新的 HVML 文档。
- `back` 标签用于返回到当前会话中的特定页面，或者终止当前的模态对话框。
- `define` 和 `include` 标签用于实现操作组的复制。我们可以通过 `define` 定义一组操作，然后在代码的其他位置通过 `include` 标签包含这组操作。
- `call` 和 `return` 标签用于实现类似函数调用的功能。我们可以通过 `call` 同步或者异步调用一个操作组，并在操作组中使用 `return` 返回一个结果。

#### 2.1.8) 错误和异常标签

为了方便处理错误和异常情形，HVML 还定义了如下错误或异常处理标签：

- `error`：出现错误时，插入其中包含的内容到实际的 DOM 树中。`error` 标签支持 `on` 属性，用来指定错误类型。如：
   - `nodata` 表示不存在指定的数据。
   - `notready` 表示数据尚未就绪。
   - `unauthorized` 表示连接指定的数据源时出现身份验证错误。
   - `timeout` 表示从数据源获取数据时出现超时错误。
- `except`：处理出现异常时，插入其中包含的内容到实际的 DOM 树中。`except` 标签支持 `on` 属性，用来指定脚本的异常类型。如：
   - `SyntaxError` 表示语法错误。
   - `NotIterable` 表示指定的元素或数据不是可迭代的。
   - `IndexError` 索引错误，通常指索引值超出了数组范围。
   - `KeyError` 字典中的键值错误，通常指引用了一个不存在的键值。
   - `ZeroDivisionError` 表示遇到被零除错误。

注意：在 HVML 中，错误和异常标签必须包含在 HVML 动作标签中作为其直接子元素使用，在错误和异常标签中，可以使用目标标记语言的标签定义子元素。
当出现错误或者异常时，错误或异常标签中定义的文档片段将被克隆到当前的文档操作位置，并中止当前的操作。

为方便错误和异常的处理，我们可以使用 `archetype` 或 `rawpart` 标签定义当前上下文中默认的错误或异常文档片段：

```html

    <rawpart id="ERROR">
        <p class="text-danger">There is an error.</p>
    </rawpart>
    
    <archetype id="EXCEPT">
        <p class="text-warning">There is an execption: {$_EXCEPT.messages}</p>
    </archetype>
```

#### 2.1.9) 介词属性

针对动作标签，HVML 定义了如下几个介词（如 `on`、`in`、`to` 等）属性，用于定义执行动作时依赖的数据（或元素）及其集合。如：

- `on`：用于定义执行动作所依赖的数据、元素或元素集合。未定义情形下，若父元素是动作元素，则取父动作元素的执行结果，若父元素是骨架元素，则取骨架元素在真实文档中对应的 DOM 子树。
- `in`：用于定义执行操作的文档位置或作用域（scope）。操作文档时，该属性通常定义 DOM 树的一个子树（sub tree），使用子树的根元素定义，之后的操作会默认限定在这个子树中。如果没有定义该属性值，则继承父元素的操作位置，若父元素是骨架元素，则取该骨架元素在真实文档中对应的 DOM 子树。操作数据时，通常指使用 `init` 元素定义的一个数据或者其子数据项。注意，使用 `in` 介词属性指定数据作为操作范围时，不会改变文档的操作位置。
- `for`：在 `observe` 标签中，用于定义观察（observe）操作对应的事件名称；在 `match` 标签中，用于定义匹配条件。
- `as`：用于定义 `init`、`bind`、`load` 等元素绑定的变量名称、页面名称等。
- `with`：用于定义克隆数据项或者文档片段时模板（`archetype` 或 `archedata`）元素的标识符。需要模板但未定义的情形下，会产生 `nodata` 错误。
- `to`：用于定义后续动作或者动作列表，多个动作使用空格分割。一个动作如果定义有相应的动作标签，则需要使用子元素描述，也可以是如下无需使用子元素描述的动作：
   - `noop`：空操作。
   - `append`：在当前范围追加（append）一个子元素或子对象项。
   - `prepend`：在当前当前范围前置（prepend）一个子元素或子数据项。
   - `insertBefore`：在当前范围之前插入一个元素。
   - `insertAfter`：在当前范围之后插入一个元素。
   - `displace`：置换当前范围中的所有子元素。
- `by`：主要用于定义执行测试、选择、迭代、规约操作时的脚本程序类或函数名称，分别称为选择器、迭代器或规约器，并统称为执行器（executor）。HVML 允许解释器支持内建（built-in）执行器。对简单的数据处理，可直接使用内置执行器，在复杂的数据处理情形中，可使用外部脚本定义的类或者函数。在 HVML 中，我们使用如下前缀来表示不同的执行器类型：
   - `CLASS: ` 表示使用外部脚本程序定义的类作为执行器。
   - `FUNC: ` 表示使用外部脚本程序定义的函数作为执行器。
   - `KEY: ` 表示使用某个键名或多个指定的键名返回对应的键值数据项，是一种内建的迭代器或选择器。
   - `RANGE: ` 表示使用指定的索引范围返回数据项，是一种内建的迭代器或选择器。
   - `TRAVEL: ` 表示使用指定的遍历方式遍历树状结构，是一种内建的迭代器或选择器。
   - `SQL: ` 表示在结构化数据上执行 SQL 查询，从而实现复杂的选择、迭代以及规约操作。
   - 其他针对字符串和数值的内建执行器，见本文档 3.1) 节。

#### 2.1.10) 副词属性

针对某些动作标签，HVML 定义了如下几个副词属性，用于修饰操作行为。如：

- `ascendingly`：在使用内置迭代器、选择器或者规约器时，用于指定数据项的排列顺序为升序；可简写为 `asc`。
- `descendingly`：在使用内置迭代器、选择器或者规约器时，用于指定数据项的排列顺序为降序；可简写为 `desc`。
- `synchronously`：在 `init`、`request`、`call` 标签中，用于定义从外部数据源（或操作组）获取数据时采用同步请求方式；默认值；可简写为 `sync`。
- `asynchronously`：在 `init`、`request`、`call` 标签中，用于定义从外部数据源（或操作组）获取数据时采用异步请求方式；可简写为 `async`。
- `exclusively`：在 `match` 动作标签中，用于定义排他性；具有这一属性时，匹配当前动作时，将不再处理同级其他 `match` 标签；可简写为 `excl`。
- `uniquely`：在 `init` 动作标签中，用于定义集合；具有这一属性时，`init` 定义的变量将具有唯一性条件；可简写为 `uniq`。

注意：在 HVML 中，我们无需为副词属性赋值。

#### 2.1.11) 引用元素或数据

当我们需要在动作标签的 `on` 属性中引用某个或某个元素集合时，我们使用和 CSS 选择器一样的语法，如：

- `.avatar` 表示所有 `class` 属性包含 `avatar` 的元素（集合）。
- `#the-user-list` 表示 `id` 属性为 `the-user-list` 的元素。
- `[name='user']` 表示 `name` 属性为 `user` 的元素（集合）。

注意，如果要在 `on` 属性中引用一个数据，则必定使用 `$` 作为前导字符，该字符用来定义一个 JSON 求值表达式。

在 HVML 中，`on` 或者 `in` 介词属性在引用文档中的元素时，若使用前导字符 `>`，则将被限定在父元素 `in` 介词指定的范围内。如下面例子中，

```html
        <reduce on="$?" to="choose empty iterate" in="#the-user-statistics" by="class: RUserRegionStats">
            <choose on="$?.count" to="update" in="> h2 > span">
                <update on="$@" textContent="$?" />
            </choose>
            <empty in="#the-user-statistics > dl" />
            <iterate on="$?.regions" to="append" in="> dl" with="#region-to-users" by="class: IUserRegions">
            </iterate>
        </reduce>
```

`choose` 标签的 `in` 属性所指定的 `> h2 > span` 和 `#the-user-statistics > h2 > span` 等价；`iterate` 标签的 `in` 属性 `> dl` 和 `#the-user-statistics > dl` 等价。

在 HVML 中，我们可以在多种场合引用当前作用域中的有效数据。在引用变量时，我们使用 `$` 前缀。如前面示例中使用的 `$global`、`$users`、`$?` 等。

`$global`、`$users` 这种变量称为命名变量（named variables），又分为全局变量或者局部变量。`$?` 这类使用特殊字符的变量称为上下文变量（context variables），根据 HVML 解释器的解析上下文确定其值。

HVML 定义的上下文变量可罗列如下：

- `$?`：指当前上下文数据。在迭代中，指一次迭代获得数组元素或键值对；其他情况下，指前置操作的结果。
- `$#`：指当前上下文数据所包含的数据项数目：
   - 假如当前上下文数据是数组，该变量指数组单元数量。
   - 假如当前上下文数据是字典，该变量指键值对数量。
   - 假如当前上下文数据是字符串、数值、真值（true）、假值（false），则该变量的值为 1。
   - 假如当前上下文数据是空值（null），则该变量的值为 0。
- `$%`：指当前数据的类型，用字符串表示，可能的取值有：`object`、`array`、`string`、`number`、`true`、`false`、`null`，分别表示对象、数组、字符串、数值、真值、假值以及空值。
- `$@`：指当前的文档操作范围，即代表当前操作范围的 DOM 子树，也就是介词属性 `in` 定义的当前文档操作位置。
- `$<N>`，如 `$0`、`$1` 等：指从当前上下文向上回溯 `<N>` 级的上下文数据；这里的 `<N>` 可以是零和正整数。这个上下文变量主要用于访问祖先动作元素的上下文数据。

以下上下文变量专用于迭代时：

- `$&`：当前迭代的索引值，比如第一次迭代，该变量的值为 0，第二次迭代，该变量的值为 1，以此类推。
- `$:`：在当前结果来自键值对（key-value paire）时，该变量用来表示键名，其他情形下为空字符串。

变量的引用规则如下：

- 在 `archetype` 以及 `archedata` 标签定义的文档片段模板或者数据模板中，我们可以就属性值、文本内容引用上下文变量以及全局命名变量。此时，上下文变量由引用该模板的动作标签定义。
- 在 HVML 动作标签中，我们可以就属性值、文本内容引用上下文变量以及全局命名变量用，此时，上下文变量由引用该模板的动作标签定义。
- 在使用目标标签语言定义的元素中，可以使用命名变量定义其属性值以及文本内容。

当我们要指代普通的 `$` 字符时，我们使用 `\` 做转义字符。

#### 2.1.12) JSON 求值表达式

在上面的例子中，我们在文档片段模板或者数据模板中使用 `$` 前缀指定一个基于 JSON 数据的求值表达式。该求值表达式需要符合如下规则：

- 一个 JSON 求值表达式的返回值类型是动态的，取决于使用这个表达式的上下文。但大部分情况下，JSON 求值表达式返回字符串，此时，非字符串类型的返回值将使用字符串表达，比如空值的字符串表达为 `null`，真值的字符串表达为 `true`，而对象（或字典）的字符串表达就是该对象的 JSON 表述本身。
- 一个 JSON 表达式的返回值类型不是字符串的情况，通常发生在内部执行器中。当在内部执行器中使用一个 JSON 表达式时，其返回值类型会根据该执行器的语法确定。比如在 `RANGE: FROM <integer_expression> [TO <integer_expression>][, ADVANCE <integer_expression>]` 这个内部执行器中，当使用 JSON 求值表达式来确定起始索引值以及步进值时，其返回值类型将被强制转换成整数。
- 若求值表达式最终返回的不是一个字符串，则使用对应的字符串表达，比如空值表达为 `null`。
- 求值表达式可嵌套使用已绑定的动态 JSON 对象，如上述示例中使用 `$string` 变量一样。
- 在可能有歧义的情况下，可使用一对 `{}` 包围整个 JSON 数据的求值表达式，比如：`user-$?.id` 和 `user-{$?.id}` 是一样的。
- 除上下文变量之外，变量名须符合一般的编程语言所定义的变量名规则，若使用正则表达式，可表达为：`/^[A-Za-z_][A-Za-z0-9_]*$/`。
- 使用 `\`（反斜杠）字符用于 `$` 、`{`、`}`、`<`、`>` 等字符的转义。

### 2.2) 动作标签详解

#### 2.2.1) `update` 标签

`update` 标签用于修改一个指定的数据项、元素或元素集合，仅支持 `on` 介词属性，用于指定要修改的数据项、元素或元素集合。该元素不产生结果数据，故而不支持在其中包含子动作元素，但可以包含 `error` 或 `except` 子元素。

比如对下面的文档片段：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
    </div>
```

我们通过下面的 `update` 标签来设置用户数量并修改其 `class` 属性：

```html
    <update on="#the-user-stats > h2 > span" textContent="10" attr.class="text-warning" />
```

执行上述 `update` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="text-warning">10</span> users):</h2>
    </div>
```

类似地，我们也可以在数据上执行 `update` 动作。比如更新 `$users` 的第二个用户的名称（`name`）：

```html
    <update on="$users[1]" key.name="Richard" />
```

在 `update` 标签中，除了介词属性之外，我们使用其他属性来完成数据项或元素的内容更新，如上面的 `textContent`、`attr.class` 以及 `key.name` 等。其规则如下：

- 对元素节点而言，我们使用 `attr.<attr_name>` 来表示元素的属性名称，如 `attr.value` 表示修改元素的 `value` 属性值。
- 对元素节点而言，我们使用 `style.<style_name>` 来表示元素的样式名称，如 `style.width` 表示修改元素的 `width` 样式值。
- 对数据项而言，如果数据项是字典结构，我们使用 `key.<key_name>` 来表示数据项的键值。
- 对数据项而言，如果数据项是数组形式，我们使用 `array[<index_num>]` 来表示数组型数据项的第 `<index_num>` 个单元。
- 对数据项而言，如果数据项是字符串、数值或者逻辑类型，我们使用 `value` 属性来改变它的值。比如，上面的 `update` 标签也可以写成：

```html
    <update on="$users[1].name" value="Richard" />
```

在改变数据项的值时，HVML 会保持数据类型不发生变化。比如用户的年龄是数值，则会将 `value` 属性设定的值转换成数值再进行赋值。

在 HVML 中，根据目标标记语言的不同，我们可以引入一些虚拟的属性值来指代对特定内容的修改，比如针对 HTML 文档我们可使用 `textContent` 这一虚拟属性名来表示元素节点的纯文本内容，使用 `htmlContent` 来表示使用 HTML 标记片段来作为其内容（这可能改变 DOM 子树的结构）。类似地，我们可以使用 `xmlContent` 表示使用 XML 文档片段来设定其内容。这类虚拟属性，取决于 HVML 的目标标记语言。

注意，在属性值的表达式中，我们可以应用当前上下文数据（即 `$?`）等上下文变量的值，比如：

```html
    <update on="$users[1].locale" value="$?.locale" />
```

注意，当 `on` 属性值指定的是一个元素集合时，`update` 标签设定的属性或内容操作，将用于集合中所有的元素。

另外，我们还可以使用除 `=` 之外的如下属性修改操作符：

- `+=`：在当前的属性值中添加一个新的词法单元（token，指使用某种词法进行分割的最小单元字符串），若已有该词法单元，则不做修改。比如，原有的 `attr.class` 的属性值为 `foo`，使用 `attr.class += "text-warning"` 后，将修改为：`foo text-warning`；若原有属性值为 `foo text-warning`，则会保持不变。
- `-=`：从当前属性值中移除一个词法单元，若没有该词法单元，则不做修改。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class -= "text-warning"` 后，将修改为 `foo`。
- `%=`：从当前属性值中按指定的模式匹配一个词法单元，并使用第二个词法单元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class %= "text-* text-info"` 后，将修改为 `foo text-info`。
- `/=`：从当前属性值中按正则表达式匹配一个词法单元，并使用第二个词法单元替换。原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class /= "/^text/ text-info"` 后，将修改为 `foo text-info`。
- `^=`：在当前属性值的头部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `attr.data-value ^= "C"` 后，将修改为：`Cab`。
- `$=`：在当前属性值的尾部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `attr.data-value $= "C"` 后，将修改为：`abC`。

#### 2.2.2) `remove` 标签

`remove` 标签用于移除一个指定的数据项、元素或元素集合，仅支持 `on` 介词属性，用于指定要修改的数据项、元素或元素集合。该元素不产生结果数据，故而不支持在其中包含子动作元素，但可以包含 `error` 或 `except` 子元素。

如针对如下的 HTML 代码片段：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
    </div>
```

我们通过下面的 `remove` 标签来删除 `h2` 元素：

```html
    <remove on="#the-user-stats > h2" />
```

执行上述 `remove` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
    </div>
```

类似地，我们也可以在数据项上执行 `remove` 动作。比如删除 `$users` 的第二个用户：

```html
    <remove on="$users[1]" />
```

注意，当 `on` 属性值指定的是一个元素集合时，`remove` 标签将移除该集合中所有的元素。

#### 2.2.3) `empty` 标签

`empty` 标签用于清空一个指定的数据项、元素或元素集合，仅支持 `on` 介词属性，用于指定要清空的数据项、元素或元素集合。该元素不产生结果数据，故而不支持在其中包含子动作元素，但可以包含 `error` 或 `except` 子元素。

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

我们通过下面的 `empty` 标签来清空用来 `dl` 节点的所有子节点：

```html
    <empty on="#the-user-stats > dl" />
```

执行上述 `empty` 动作后，上面的 HTML 代码片段将变为：

```html
    <div id="the-user-statistics">
        <h2>User regions (totally <span class="none"></span> users):</h2>
        <dl>
        </dl>
    </div>
```

类似地，我们也可以在数据项上执行 `empty` 动作。比如清空 `$users` 第二个用户信息：

```html
    <empty on="$users[1]" />
```

执行上述清空指令后，`$users` 的第二个用户数据项仍然存在，但其值将变为空值。

注意，当 `on` 属性值指定的是一个元素集合时，`empty` 标签将对集合中的每个元素执行清空操作。

#### 2.2.4) `test` 标签和 `match` 标签

`test` 标签和 `match` 标签配合使用，主要用于实现条件处理。`test` 标签通过 `on` 属性定义在哪个数据项或者元素上执行测试，而 `match` 作为 `test` 元素的子元素，每个 `match` 子元素定义一个匹配分支。

`test` 标签可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值；而 `match` 元素始终产生真值（`true`）作为其结果数据。注意：不满足匹配条件的 `match` 元素定义的分支是不会被执行的。

如：

```html
    <archetype id="footer-cn">
        <p><a href="http://www.baidu.com" title="百度">Baidu</a></p>
    </archetype>

    <archetype id="footer-tw">
        <p><a href="http://www.bing.com" title="必應">Bing</a></p>
    </archetype>

    <archetype id="footer-others">
        <p><a href="http://www.google.com" title="Google">Google</a></p>
    </archetype>

    <footer id="the-footer">
        <test on="$global.locale" in='#the-footer'>
            <match for="zh_CN" to="displace" with="#footer-cn" exclusively>
            </match>
            <match for="zh_TW" to="displace" with="#footer-tw" exclusively>
            </match>
            <match for="*" to="displace" with="#footer-others">
            </match>

            <error on="nodata">
                <p>You forget to define the $global variable!</p>
            </error>
            <except on="KeyError">
                <p>Bad global data!</p>
            </except>
        </test>
    </footer>
```

上面的示例在 `$global.locale` 数据项（由 `on` 属性指定）上执行测试，操作被限定在 `#the-footer`（由 `in` 属性指定）所在的 DOM 子树上。在 `test` 标签定义的元素内部，使用 `match` 标签定义了若干子元素，分别用来定义匹配条件 `zh_CN`、`zh_TW` 以及 `*` 情况下的动作。

在解析 `match` 标签时，若某个标签定义了 `exclusively` 副词属性，则一旦该分支被匹配，将不再检查其他 `match` 分支。

假定 `$global` 所指代的 JSON 数据 `locale` 定义为 `zh_CN`，则最终生成的 HTML 片段如下：

```html
<footer id="the-footer">
    <p><a href="http://www.baidu.com" title="百度">Baidu</a></p>
</footer>
```

需要注意的是：`test` 动作始终确定一个动作结果，将成为子元素的上下文变量 `$?` 之值，该值一般是一个字符串或数值。`test` 标签可支持 `by` 属性，使用该属性指定的脚本类、函数或其他内置方法，可用来从 `on` 指定的复杂数据项或者元素上获得一个可供匹配的数据。

对于匹配条件，我们可以在 `match` 标签中使用 `on` 介词属性来定义一个基于动态 JSON 的逻辑表达式，也可以使用 `for` 介词属性定义基于 `test` 元素执行结果的匹配条件，两者选一，但 `for` 属性具有更高优先级。

使用 `on` 介词属性时，我们可以使用全局动态对象 `$_L` 构建一 JSON 求值表达式求值来确定匹配条件；当求值表达式返回 0、null、false、长度为零的字符串时，视作不匹配，反之视作匹配。比如就上述 HVML 代码中的匹配 `zh_CN` 的 `match` 标签，可以如下书写：

```html
        <match on="$_L.STRCMP ('case', 'zh_CN', $?)" to="displace" with="#footer-cn" exclusively />
```

使用 `for` 介词属性时，可以避免使用繁琐的 JSON 求职表达式，但要求 `test` 动作的结果必须是字符串或数值。其规则如下：

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

#### 2.2.5) `choose` 标签

`choose` 标签在 `on` 属性指定的数据或者元素上产生一个可供后续动作标签处理的数据项。

`choose` 标签可支持 `by` 属性，通过该属性指定的执行器来获得一个执行结果数据。如果没有定义 `by` 属性，其结果数据就是 `on` 属性值。

比如要实现 2.4) 小节中根据当前 `locale` 动态生成搜索链接的功能，我们也可以使用嵌套在 `choose` 标签中的 `update` 标签完成相关功能，如：

```html
    <head>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="locales">
            {
              "zh_CN" : {"se_name" : "Baidu", "se_url": "https://www.baidu.com", "se_title": "百度" },
              "zh_TW" : {"se_name" : "Bing", "se_url": "https://www.bing.com", "se_title": "必应" }
            }
        </init>

        ...
    </head>

    <footer id="the-footer">
        <p><a href="" title=""></a></p>
    </footer>

    <choose on="$locales" to="update" in="#the-footer" by="KEY: $global.locale">
        <update on="p > a" textContent="$?.se_name" attr.href="$?.se_url" attr.title="$?.se_title" />
        <catch for="error:nodata">
            <update on="p" textContent="You forget to define the \$locales/\$global variables!" />
        </catch>
        <catch for="KeyError">
            <update on="p > a" textContent="Google" attr.href="https://www.google.com" attr.title="Google" />
        </catch>
        <catch for="*">
            <update on="p" textContent="Bad \$locales/\$global data!" />
        </catch>
    </choose>
```

在上面的例子中，我们在 `by` 介词属性中指定了一个内置的 KEY 执行器，该执行器将 `$global.locale` 的值作为键名，返回了 `on` 介词属性指定的 `$locales` 字典数组上对应的键值，使用该键值通过其后的 `update` 子元素实现了 `in` 介词属性指定的 HTML 文档片段中的元素更新操作。

在复杂情形下，我们也可以编写脚本程序作为外部执行器来完成选择动作。

#### 2.2.6) `iterate` 标签

`iterate` 标签用于在指定的可迭代数据项或者元素上执行迭代操作。比如执行插入操作时，可将迭代得到的每个数据项作用到 `with` 属性指定的模板，并插入到 `in` 介词属性指定的位置。如下面的 HVML 代码片段：

```html
    <head>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>
    </head>

    <body>
        <archetype id="user-item">
            <li class="user-item">
                <img class="avatar" src="" />
                <span></span>
            </li>
        </archetype>

        <ul id="the-user-list" class="user-list">
            <iterate on="$users" to="append" in="#the-user-list" with="#user-item" by="CLASS: IUser">
                <error on="notready">
                    <img src="wait.gif" />
                </error>
                <except on="StopIteration">
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>
    </body>
```

上述 HVML 代码在 `head` 标签中定义了 `users` 数据，是一个由字典结构组成的数组。在 `body` 标签中，该 HVML 文件迭代 `$users` 数组，并克隆 `#user-item` 这一模板定义的 HTML 片段并追加（`append`）到 `#the-user-list` 所在的位置。在迭代过程中，该标签使用脚本程序定义的 `IUser` 类来实现排序、过滤和映射操作。

使用脚本程序定义的类，可用于实现较为复杂的迭代逻辑和操作。但在一些简单的场合，我们也可以不使用类而使用其他动作标签完成动作，如使用 `update` 标签使用当前迭代数据更新特定的元素属性：

```html
    <iterate on="$users" to="update" in="#the-user-list" by="RANGE: 0, $#, 2">
        <update on="[id=user-$?.id] span" attr.class *= "text-* text-info" />
    </iterate>
```

上述 HVML 代码，在 `$users` 数据上执行迭代，但未使用脚本程序定义的类，而使用了 `RANGE` 关键词来定义迭代范围。`RANGE: 0, $#, 2` 表示取 `$users` 数组中索引下标为偶数的所有数组项，之后，针对这些数据项执行 `update` 标签定义的更新操作。在 `update` 标签中，首先使用 `on` 介词属性定义了目标元素：`[id=user-$?.id] span`。该表达式使用了 CSS 选择器在 `#the-user-list` 定义的 DOM 子树中查找子元素，其中 `$?` 表示的是当前的迭代数据项。若存在这个子元素，则将其 `class` 属性设置为 `text-info`。这样，所有索引值为偶数的用户条目将使用由 `text-info` 类定义的样式来展现。

#### 2.2.7) `reduce` 标签

`reduce` 标签用于定义一个规约（Reduce）操作。比如在上面的例子中，我们通过 `reduce` 标签统计来自不同区域用户的个数，最终形成一个类似下面这样的数据：

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

    <archetype id="region-to-users">
        <div>
            <dt>$:</dt>
            <dd>$=</dd>
        </div>
    </archetype>

    <reduce on="$users" to="update emtpy iterate" in="#the-user-statistics" by="CLASS: RUserRegionStats">
        <update on="> h2 > span" textContent="$?.count" />
        <empty on="> dl" />
        <iterate on="$?.regions" to="append" in="> dl" with="#region-to-users" by="KEY: ALL" descendingly>
        </iterate>
    </reduce>
```

上述代码由脚本程序定义的类 `RUserRegionStats` 在 `$users` 上执行规约操作，之后形成一个如上面 JSON 格式描述的统计结果，其中包括整个用户的个数，以及所有区域的用户个数。然后使用了 `update` 标签、`empty` 标签以及 `iterate` 标签执行了三个后续动作：

- `update` 标签：用于更新 `#the-user-statistics > h2 > span` 元素的内容为用户总数。
- `empty` 标签：用于清除 `#the-user-statistics > dl` 元素的所有子元素。
- `iterate` 标签：用于在 `#the-user-statistics > dl` 元素中追加用户按区域统计的信息。

假设执行规约操作后的结果同前述 JSON 格式给出的数据，则执行上述操作后获得的 HTML 片段为：

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

#### 2.2.8) `observe` 和 `fire` 标签

`observe` 标签用于观察特定数据源上获得数据或状态，或者文档元素节点上的事件，并完成指定的操作。

假设文档通过本地总线机制（本例中是 `hibus`）监听来自系统的状态改变事件，如电池电量、WiFi 信号强度、移动网络信号强度等信息，并在文档使用相应的图标来表示这些状态的改变。为此，我们可以定义如下的 HVML 文档：

```html
<hvml>
    <head>
        <listen on="hibus://localhost/system/status" as="systemStatus" />
    </head>

    <body>
        <header id="the-footer">
            <img class="mobile-status" src="/placeholder.png" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="/placeholder.png" />
            <span class="local-time">12:00</span>
            <img class="battery-status" src="/placeholder.png" />
        </header>

        <observe on="$systemStatus" for="battery" to="update" in="#the-header" by="FUNC: on_battery_changed">
            <error>
                <p>Bad scope.</p>
            </error>
            <except>
                <p>Failed to update battery status</p>
            </except>
        </observe>
    </body>
```

在上例中，我们使用外部脚本定义的 `on_battery_changed` 函数来实现更新操作。

另外一个 `observe` 标签的使用例子描述如下。

在 `head` 元素中，我们通过 `listen` 监听 `hibus://localhost/system/status`（`on` 属性）上来的通知事件，该监听被命名为 `systemStatus`（`as` 属性）。每当系统状态发生变化时，就会从这个数据源收到相应的数据包。为方便数据交换，所有的数据包都打包为 JSON 格式，并具有如下的格式：

```json
    {
        "event" : "battery",
        "source": "/system/status",
        "time": 20200616100207.567,
        "signature": "XXXXX",
        "payload" : {
            "level": 80,
            "charging": false,
        },
    }
```

其中，`event` 字段表示事件类型；`source` 表示产生此事件的软件模块或者主机信息；`time` 表示此事件产生的系统时间；`signature` 是此事件的内容的签名，可用来验证数据来源的合法性；`payload` 中包含事件关联的数据。在上面这个例子中，事件包含两个信息，一个信息用来表示当前电量百分比，另一个信息表示是否在充电状态。

当 HVML 代理观察到来自 `$systemStatus` 上的事件数据包之后，将根据 `observe` 标签定义的观察动作执行相应的操作。在上面的例子中，`observe` 标签所定义的操作及条件解释如下：

- 当来自`$systemStatus` （`on` 属性值）上的数据包中的 `event` 字段为 `battery` 时（`for` 属性指），执行 `to` 介词属性定义的 `update` 操作，具体的操作由 `by` 介词属性定义的脚本函数 `on_battery_changed` 完成，该更新操作限定在 `in` 介词属性定义的 `#the-header` 元素节点中。

注意：当 `observe` 观察到了来自特定数据源上的特定事件时，其结果数据为该事件数据包中的 `payload` 数据；若没有通过 `for` 属性指定具体要观察的事件，则结果数据为整个事件数据包。

在简单情形下，我们也可以不使用脚本程序，直接使用 `update` 标签来定义更新操作。比如，我们我们要在状态栏上显示当前的 WiFi 名称或者移动网络的运营商名称：

```html
        <observe on="$systemStatus" for="mobile-operator" to="update" in="#the-header">
            <update on="span.mobile-operator" textContent="$?.name" />

            <error>
                <p>Bad scope.</p>
            </error>
            <except>
                <p>Failed to update mobile operator</p>
            </except>
        </observe>
```

对电池电量的更新，我们也可以不使用脚本程序，直接使用 `test`、`match` 和 `update` 标签来定义更新操作：

```html
    <observe on="$systemStatus" for="battery" to="test">
        <test on="$?.level" in="#the-header">
            <match for="100" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-full.png" />
            </match>
            <match for=">90" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-90.png" />
            </match>
            <match for=">70" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-70.png" />
            </match>
            <match for=">50" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-50.png" />
            </match>
            <match for=">30" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-30.png" />
            </match>
            <match for=">10" to="update" exclusively>
                <update on="img.mobile-status" attr.src="/battery-level-10.png" />
            </match>
            <match for="*" to="update">
                <update on="img.mobile-status" attr.src="/battery-level-low.png" />
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
        <listen on="mqtt://foo.bar.com/userchange" as="userChanges" />
    </head>

    <body>
        <observe on="$userChanges" for="new" to="iterate">
            <iterate on="$?" to="append" in="#the-user-list" with="#user-item" by="CLASS: IUser">
                <error on="notready">
                    <img src="wait.gif" />
                </error>
                <except>
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </observe>

        <observe on="$userChanges" for="delete" to="iterate">
            <iterate on="$?" to="remove" in="#the-user-list" by="RANGE: 0">
                <remove on="#user-$?.id" />
            </iterate>
        </observe>

        <div id="the-user-statistics">
            <h2>User regions (totally <span></span> users):</h2>
            <dl>
            </dl>
        </div>

        <archetype id="region-to-users">
            <div>
                <dt>$:</dt>
                <dd>$=</dd>
            </div>
        </archetype>

        <archedata id="item-user">
            {
                "id": "$?.attr.data-value", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr.data-region"
            },
        </archedata>

        <observe on="#the-user-list" for="change" to="iterate">

            <init as="users">
                [ ]
            </init>

            <iterate on="$@" to="append" in="$users" with="#item-user" by="TRAVEL: BREADTH">
            </iterate>

            <reduce on="$users" to="choose empty iterate" in="#the-user-statistics" by="CLASS: RUserRegionStats">
                <choose on="$?" to="update" in="> h2 > span" by="KEY: 'count'">
                    <update on="$@" textContent="$?" />
                </choose>
                <empty in="#the-user-statistics > dl" />
                <iterate on="$?.regions" to="append" in="> dl" with="#region-to-users" by="KEY: ALL" ascendingly>
                </iterate>
            </reduce>

        </observe>

    </body>
</hvml>
```

在 HVML 代码中，除了被动等待事件的发生之外，代码也可以直接使用 `fire` 标签主动地激发一个事件：

```html
    <init as="new_user">
        { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "zh_CN" }
    </init>

    <fire on="#user-list" for="new-user" with="$new_user" />

    ...

    <observe on="#user-list" for="new-user">
        ...
    </observe>
```

`fire` 元素将把 `with` 属性指定的数据作为事件数据包的 `payload` 进行处理，并根据 `on` 属性指定的元素或者数据确定事件的源，`for` 属性值作为事件名称打包事件数据包，并将事件加入到事件队列中。 注意：`fire` 元素不产生结果数据，所以不能包含其他子动作元素。

#### 2.2.9) `request` 标签

`request` 标签用于在一个被监听的数据源上发出一个同步或者异步的请求。比如在通过 MQTT 或者本地数据总线发送请求到外部模块或者远程计算机时，我们使用 `request` 标签，然后在另外一个 `observe` 标签定义的 HVML 元素中做相应的处理。比如，我们要通过 hiBus 协议向系统守护进程发出一个获得当前可用 WiFi 热点列表的请求：

```html
</hvml>
    <head>
        <listen on="hibus://localhost/system/wifiManager" as="wifimanager" />
    </head>

    <body>
        ...

        <request on="$wifimanager" to="observe" asynchronously>
            <observe on="$wifimanager" for="wifilist" to="iterate">
                ...
            </observe>
        </request>

        ...
    </body>
</hvml>
```

正常情况下，使用同步请求时，`request` 元素的执行结果数据就是请求的返回结果；如果使用异步请求，`request` 元素的操作结果数据为字符串 `ok`。异步请求时，一般应该在对应的 `observe` 元素中做后续处理。

#### 2.2.10) `init` 和 `set` 标签

`init` 标签初始化一个变量。在 HVML 文档的头部（由 `head` 标签定义）使用 `init` 标签，将初始化一个全局变量。在 HVML 文档的正文（由 `body` 标签定义）内使用 `init` 标签，将定义一个仅在其所在父元素定义的子树中有效的局部变量。我们可以直接将 JSON 数据嵌入到 `init` 标签内，亦可通过 HTTP 等协议加载外部内容而获得，比如通过 HTTP 请求，此时，使用 `with` 属性定义该请求。

`set` 标签在 `on` 属性给定的变量上，使用 `with` 指定的数据来执行由 `to` 属性指定的操作，主要用于集合操作。

这两个标签的常见用法如下：

```html
    <init as="users" uniquely by="id">
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

    <set on="$users" to="merge" with="$new_users">
    </set>
```

上述代码定义了一个 `$users` 变量作为集合（使用 `id` 作为唯一性键名），并定义了一个 `$new_users` 字典数组。在使用 `set` 标签指定的 `merge` 操作后，得到如下结果：

```json
        [
            { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
            { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" },
            { "id": "3", "avatar": "/img/avatars/3.png", "name": "David", "region": "zh_CN" }
        ]
```

HVML 为不同的数据类型提供了如下操作：

- `displace`：表示整个替换当前值，是默认动作。
- `append`：表示执行追加操作，作用于数组。
- `prepend`：表示执行前置操作，作用于数组。
- `union`：表示执行合并操作，作用于集合，相当于求并集。
- `intersect`：在集合上执行相交操作，作用于集合，相当于求交集。
- `subtract`：在集合上执行相减操作，作用于集合，相当于求差集。
- `xor`：在集合上执行异或操作，作用于集合，相当于并集和交集之差。
- `update`：在集合上匹配给定的键值并更新其他键值，作用于基于字典的集合。

比如修改全局定时器的操作，我们可以使用 `set` 标签完成：

```html
    <set on="$_TIMERS" to="update">
        { "id" : "foo", "active" : "yes" },
    </set>
```

类似地，我们要添加一个新的定时器时，使用如下的 `set` 标签：

```html
    <set on="$_TIMERS" to="merge">
        [
            { "id" : "foobar", "interval" : 3000, "active" : "yes" },
        ]
    </set>
```

当我们要删除定时器 `foo` 时，使用如下的 `set` 标签：

```html
    <set on="$_TIMERS" to="subtract">
        { "id" : "foo" }
    </set>
```

注意，当我们使用 `id` 作为键名时，该键名对应的值，在数组中将保持唯一。

#### 2.2.11) `listen` 和 `close` 标签

如前所述，`listen` 标签定义一个对长连接数据源的监听，比如来自 WebSocket、MQTT 或者本地数据总线（如 Linux 桌面系统中常用的数据总线 dBus）的数据包；而 `close` 标签关闭先前建立的一个长连接数据源。

```html
    <body>
        <button id="theBtnWifiList">Click to fetch WiFi List</button>

        <archetype id="wifi-item">
            <li>@?.name</li>
        </archetype>

        <ul id="theWifiList">
        </ul>

        <observe on="#theBtnWifiList" for="click">

            <init as="paramWifiList">
                { "action" : "get_list" }
            </init>

            <listen on="hibus://localhost/system/wifiManager" as="wifimanager" />

            <request on="$wifimanager" to="observe" with="$paramWifiList" asynchronously>
                <observe on="$wifimanager" for="ok">
                    <close on="$wifimanager">

                    <!-- fill the Wifi list with the response data -->
                    <iterate on="$?" to="append" with="#wifi-item" in="#theWifiList">
                    </iterate>

                </observe>
            </request>

        </observe>
    </body>
```

`listen` 和 `close` 元素均不产生结果数据，所以不能包含其他子动作元素。

#### 2.2.12) `load` 和 `back` 标签

`load` 标签用来装载一个由 `with` 属性指定的新 HVML 文档，并可将 `by` 属性指定的对象数据作为参数传递到新的 HVML 文档。如：

```html
    <load with="b.hvml" by="$user" as="_modal" />
```

`load` 元素将在当前会话中装载一个新的页面，我们使用 `as` 属性指定这个页面的名称；如下页面名称具有特殊含义：

- `_modal`：用于表示创建一个模态对话框。模态对话框将获得输入焦点，直到返回为止。
- `_blank`：用于表示创建一个全新的会话。

若指定的页面名称不同于以上的特殊名称，则会使用新页面内容覆盖当前的页面内容。

`back` 标签用于返回到当前会话中的特定页面，或者终止当前的模态对话框。

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

使用 `back` 标签时，若当前活动是一个页面，我们可以使用 `to` 属性指定要返回的活动名称（`_caller` 是保留名称，用于指代调用该活动的活动）。此时，还可以使用 `with` 属性返回一个数据。当当前页面是一个模态对话框时，该数据将作为 `load` 元素的结果数据返回；如果当前页面不是一个模态对话框，则该数据将做为请求数据（对应 `$_REQUEST` 内置全局变量）提供给目标返回对应的页面，此时，该页面会执行一次重新装载操作（相当于浏览器刷新页面功能）。

```html
    <load with="new_user.hvml" as="_modal">
        <test on="$?.retcode">
            <match for="ok" exclusively>
                <choose on="$2.payload" to="append" in="#the-user-list" with="#user-item">
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

#### 2.2.13) `define` 和 `include` 标签

`define` 和 `include` 标签用于实现类似函数调用的功能。我们可以通过 `define` 定义一组操作，然后在代码的其他位置通过 `include` 标签包含这组操作。在 HVML 中，我们将这组操作简称为操作组。

`define` 标签通过 `as` 属性定义操作组的名称，其中包含了一组动作标签定义的子元素。`include` 元素将切换上下文到 `on` 属性指定的操作组中，`with` 属性传入的参数将作为 `define` 的结果数据供子元素使用。如：

```html
        <define as="fillDirEntries">
            <choose on="$?" to="iterate" by="CLASS: CDirEntries">
                <iterate on="$?" to="append" in="#entries" with="#dir-entry" by="RANGE: 0">
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <include on="fillDirEntries" with="/home" />
        </listbox>

        <button id="goRoot>
            Root
        </button>

        <button id="goHome>
            Home
        </button>

        <observe on="#goRoot" for="click">
            <empty on="#entries" />
            <include on="fillDirEntries" with="/" />
        </observe>

        <observe on="#goHome" for="click">
            <empty on="#entries" />
            <include on="fillDirEntries" with="/home" />
        </observe>
```

上面的 HVML 代码，在初始化 `listbox` 时，以及用户点击了 `#goRoot` 或者 `#goHome` 按钮时，使用了 `$fillDirEntries` 定义的操作组。注意，在三次使用 `include` 标签时，通过 `with` 属性传入了不同的参数。

`include` 元素不产生任何结果数据，故而不能包含子动作元素。

#### 2.2.14) `call` 和 `return` 标签

`include` 元素完成的工作本质上是复制指定的操作组到当前的位置，所以和传统编程语言中的函数调用并不相同。如果要获得和函数调用相同的效果，使用 `call` 和 `return` 标签：

```html
        <define as="fillDirEntries">
            <choose on="$?" to="iterate" by="CLASS: CDirEntries">
                <iterate on="$?" to="append" with="#dir-entry" by="RANGE: 0">
                </iterate>
                <return with="$#" />
            </choose>
        </define>

        <listbox id="entries">
            <call on="fillDirEntries" in="#entries" with="/home">
            </call>
        </listbox>

        <button id="goRoot">
            Root
        </button>

        <button id="goHome">
            Home
        </button>

        <observe on="#goRoot" for="click">
            <empty on="#entries" />
            <call on="fillDirEntries" in="#entries" with="/">
            </call>

        </observe>

        <observe on="#goHome" for="click">
            <empty on="#entries" />
            <call on="fillDirEntries" in="#entries" with="/home" />
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
            <observe on="$my_task" for="ready">
                <iterate on="$?" to="append" in="#entries" with="#dir-entry" by="RANGE: 0">
                </iterate>
            </observe>
        </listbox>
```

在上面的 HVML 代码中，我们异步调用了 `collectAllDirEntriesRecursively` 函数，该函数递归获取当前路径下的所有文件系统目录项（这是一个典型的耗时操作）。HVML 解释器会创建一个异步任务来执行该函数，`as` 属性指定了该任务的名称（`my_task`）。之后，代码使用 `observe` 元素来观察 `my_task` 任务的 `ready` 事件，并做后续的处理。需要注意的是，异步调用操作组时，一般不应该操作真实文档对应的元素。

注意，不管是 `include` 还是 `call`，我们都可以递归使用。

#### 2.2.15) `catch` 标签

`catch` 作为任意动作元素的子元素，定义该动作出现错误或者异常时要执行的动作。`catch` 标签定义的元素作为 `error` 和 `except` 元素的补充，可定义错误或者异常情形下的动作。如：

```html
    <choose on="$locales" to="update" in="#the-footer" by="KEY: $global.locale">
        <update on="p > a" textContent="$?.se_name" attr.href="$?.se_url" attr.title="$?.se_title" />
        <catch for="error:nodata">
            <update on="p" textContent="You forget to define the \$locales/\$global variables!" />
        </catch>
        <catch for="error:*">
            <update on="p" textContent="You forget to define the \$locales/\$global variables!" />
        </catch>
        <catch for="KeyError">
            <update on="p > a" textContent="Google" attr.href="https://www.google.com" attr.title="Google" />
        </catch>
        <catch>
            <update on="p" textContent="Bad \$locales/\$global data!" />
        </catch>
    </choose>
```

我们使用 `for` 介词属性来定义要捕获的错误或异常名称，或错误或异常名称的模式。错误名称始终具有 `error:` 前缀，而异常名称始终具有 `except` 前缀，但异常名称前的前缀可以忽略。

`for` 属性值的取值有如下规则：

- 若未定义 `for` 属性，则相当于匹配任意错误或异常。
- 若 `for` 属性值为 `*` 或空字符串，则相当于匹配任意错误或异常。
- 若 `for` 属性值中包含有 `*` 或者 `?` 字符，则表示通配符（wildcard）匹配，可支持通配符并忽略大小写；如 `error:*`，表示匹配所有错误。

### 2.3) 执行器

在 `choose`、`iterate` 以及 `reduce` 等动作标签中，我们通常要使用 `by` 介词属性来定义如何执行选择、迭代或者规约操作，我们称之为规则，而实现相应的规则的代码或者功能模块被称为选择器、迭代器或规约器，统称为执行器（executor）。HVML 解释器可实现内置（built-in）执行器，通过简单的语法来指定在选择、迭代、规约数据时遵循什么样的规则。在复杂情形下，HVML 允许文档作者调用外部脚本或者程序来实现执行器。HVML 使用前缀来表示不同的执行器类型，当使用 `FUNC` 或者 `CLASS` 前缀时，HVML 解释器将使用由外部脚本或代码实现的执行器。

注意，内建执行器在执行选择、迭代或者规约操作时，相应动作标签中的 `ascendingly` 和 `descendingly` 副词属性将产生作用。

#### 2.3.1) 内建执行器

##### 2.3.1.1) `KEY` 执行器

该执行器作用于字典数据上，使用给定的键名或键名列表返回键值对或键值对列表，或者使用匹配某个规则的键名列表，返回键值对列表。比如对下面的数据：

```html
    <init as="regionStats">
        { "zh_CN" : 100, "zh_TW" : 90，"zh_HK": 90, "zh_SG": 90, "zh_MO": 80, "en_US": 70, "en_UK": 80 }
    </init>
```

上面字典数据使用语言地区信息（locale）作为键名，一个整数作为对应的键值。

如果我们要获得所有的键值对，则使用 `KEY: ALL`。

如果我们要获得其中几个键值对，则使用 `KEY: 'zh_CN', 'zh_HK'`。

如果我们要获得所有汉语地区的键值对，则使用模式匹配 `KEY: LIKE 'zh_*'`，或使用正则表达式 `KEY: LIKE '/zh_[A-Z][A-Z]/i'`。

如果我们要获得所有中国大陆地区和所有英语地区对应的键值对，可使用 `KEY: 'zh_CN', LIKE 'zh_*'`。

`KEY` 执行器的语法如下：

```
    KEY: ALL | <key_name_list>
    
    <key_name_list>: <key_list_expression>[, <key_list_expression>[, ...]]
    <key_list_expression>: LIKE <key_pattern_expression> | <key_name_expression>
    <key_pattern_expression>: '<literal_wildcard_string>' | '<regular_expression>' | <string_evaluation_expression>
    <key_name_expression>: '<literal_string>' | <string_evaluation_expression>
    <string_evaluation_expression>: <json_evaluation_expression>
```

对于字典数据，不指定 `by` 属性时，默认使用 `KEY: ALL` 执行器。

注：JSON 求值表达式（JSON evaluation expression）的规则及语法，在本文档 4.5.5) 小节中统一描述（下同）。

##### 2.3.1.2) `RANGE` 执行器

该执行器作用于数组数据上，使用下标范围来返回对应的数组单元列表。比如对下面的数据：

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

如果我们要获得索引下标为偶数的数组单元，则使用 `RANGE: FROM 0, ADVANCE 2`，返回的数据为：

```json
    [ "zh_CN", "zh_TW", "zh_HK", "zh_SG", "zh_MO", "en_US", "en_UK" ]
```

如果我们要获得索引下标为奇数的数组单元，则使用 `RANGE: FROM 1, ADVANCE 2`，返回的数据为：

```json
    [ 100, 90, 90, 90, 80, 30, 20 ]
```

`RANGE` 执行器的语法如下：

```
    RANGE: FROM <integer_expression> [TO <integer_expression>][, ADVANCE <integer_expression>]
    
    <integer_expression>: <literal_integer> | <integer_evaluation_expression>
    <integer_evaluation_expression>: <json_evaluation_expression>
```

对于数组数据，不指定 `by` 属性时，默认使用 `RANGE: FROM 0` 执行器。

##### 2.3.1.3) 用于字符串的内建执行器

针对字符串数据，HVML 提供如下内建执行器，可分别用于遍历字符串中的字符和词法单元（token）：

- `CHAR:`：将字符串分割为字符数组。语法和 `RANGE` 执行器类似。
- `TOKEN:`：将字符串按照指定的分隔符分割为词法单元数组。

`CHAR` 执行器的语法如下：

```
    CHAR: FROM <integer_expression> [TO <integer_expression>][, ADVANCE <integer_expression>][, STOP ON <string_expression>]
    
    <integer_expression>: <literal_integer> | <integer_evaluation_expression>
    <string_expression>: '<literal_string>' | <string_evaluation_expression>
    <integer_evaluation_expression>: <json_evaluation_expression>
    <string_evaluation_expression>: <json_evaluation_expression>
```

比如，当我们使用 `CAHR: FROM 0 TO 10, ADVANCE 2, STOP ON 'f'` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

```json
    [ "A", "b", "o" ]
```

`TOKEN` 执行器的语法如下：

```
    TOKEN: FROM <integer_expression> [TO <integer_expression>][, ADVANCE <integer_expression>][, DELIMETERS <string_expression>]
    
    <integer_expression>: <literal_integer> | <integer_evaluation_expression>
    <string_expression>: '<literal_string>' | <string_evaluation_expression>
    <integer_evaluation_expression>: <json_evaluation_expression>
    <string_evaluation_expression>: <json_evaluation_expression>
```

比如，当我们使用 `TOKEN: FROM 0 TO 3, DELIMETERS ' '` 执行器作用于字符串 `A brown fox jumps over a lazy cat` 时，返回的数据为：

```json
    [ "A", "brown", "fox" ]
```

对于字符串数据，若不指定 `by` 属性时，默认使用 `CHAR: FROM 0` 执行器。

更进一步，HVML 解释器可提供基于特定自然语言的单词和句子执行器：`WORD` 和 `SENTENCE`。

##### 2.3.1.4) 用于数值的内建执行器

针对数值数据，HVML 提供如下内建执行器，可用于产生数列：

- `ADD`：在给定数值基础上执行加法操作，直到指定的数值为止。
- `SUBTRACT`：在给定数值基础上执行减法操作，直到指定的数值为止。
- `MULTIPLY`：在给定数值基础上执行乘法操作，直到指定的数值为止。
- `DIVIDE:`：在给定数值基础上执行除法操作，直到指定的数值为止。

`ADD` 执行器的语法如下：

```
    ADD: BY <number_expression>, NOT BEYOND <number_expression>
    
    <number_expression>: <literal_number> | <number_evaluation_expression>
    <number_evaluation_expression>: <json_evaluation_expression>
```

比如，当我们使用 `ADD: BY -3, NOT BEYOND 90` 执行器作用于数值 `100` 时，返回的数列为：

```json
    [ 100, 97, 94, 91 ]
```

对于数值数据，若不指定 `by` 属性时，默认使用 `ADD: MULTIPLY 2, NOT BEYOND $?` 执行器；该执行器将产生只包含一个数值的数列，这个数值就是初始上下文数据。

注：数值执行器可能导致死循环。

##### 2.3.1.5) `SQL` 执行器

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
- 如果我们要获得其中 `rank` 键值大于 70 的记录，则使用 `SQL: SELECT locale WHERE ranke > 70`。
- 如果我们要获得其中 `rank` 键值大于 70 汉语地区记录，则使用 `SQL: SELECT locale WHERE locale LIKE 'zh_*' AND ranke > 70`。

和用于数据库的 SQL 语言不同，我们并没有使用标准 SQL 语句的 `FROM` 分句来指定数据库表，因为在 HVML 中我们已经使用了`on` 介词属性来指定了数据集。因此，可以说 HVML 的 SQL 执行器是一种简化的 SQL 实现，主要借助 SQL 的 `SELECT` 语句实现了选择、迭代和规约操作。具体而言，HVML 的 SQL 语句主要支持如下分句（不同的 HVML 解释器实现可以支持更多的 SQL 分句）。

- `WHERE`: 用于指定筛选条件。
- `GROUP BY`：用于指定分组（规约）条件。
- `ORDER BY`：用于指定排序操作。

在 HVML 中，SQL 执行器也可以作用于 DOM 文档子树或者嵌套的 JSON 字典数据。为此，我们引入了一个新的 SQL SELECT 分句 `TRAVEL IN`，可选 `SLIBLINGS`、`DEPTH`、`BREADTH` 或者 `LEAVES`，分别表示使用兄弟节点遍历、深度优先（depth-first）遍历、广度优先（breadth-first）遍历和叶子节点遍历，其语法为：

- `TRAVEL IN [SIBLINGS | DEPTH | BREADTH | LEAVES]`：用于指定在树状数据上的遍历方式。

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

按本文 1.4) 中的规则，上述 DOM 文档片段对应的 JSON 表达为：

```json
{
    "tag": "ul",
    "attr": null,
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
                    "children": null
                },

                {
                    "tag": "span",
                    "attr": null,
                    "children": [
                        {
                            "tag": "txt",
                            "content": "foo",
                            "children": null
                        },
                    ]
                },

                {
                    "tag": "txt",
                    "attr": null,
                    "content": "（中国大陆）",
                    "children": null
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
                    "children": null
                },

                {
                    "tag": "span",
                    "attr": null,
                    "children": [
                        {
                            "tag": "txt",
                            "attr": null,
                            "content": "foo",
                            "children": null 
                        },
                    ]
                },

                {
                    "tag": "txt",
                    "attr": null,
                    "content": "（中国台湾）",
                    "children": null
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

使用 `TRAVEL IN` 分句时，可使用 `DEPTH FROM ... TO ...` 限定词，用于指定遍历树状数据时的深度（depth），如 `SELECT tag, attr.id, textContent TRAVEL IN DEPTH FROM 1 TO 2` 将给出如下结果：

```json
[
    { "tag": "li", "attr.id": "user-1", "textContent": null },
    { "tag": "li", "attr.id": "user-2", "textContent": null },
]
```

注意，在基于字典数据的数组或者树状结构上执行 SQL 语句时，可选的字段（如 `tag`、`attr.id` 等）为所有字典数据的键名之并集。对所有未定义的键值对，相应的键值为 null。

除了 `SELECT` 语句外，HVML 的 SQL 执行器支持 `GET` 语句，其语法和 `SELECT` 类似，唯一的不同在于 `GET` 语句返回给定条件的字典数据之引用，而不是字典数据值。通常，我们配合 `update` 操作使用 `GET` 语句，以便更新数据。如本文 1.1) 小节中修改激活定时器时使用的 SQL 语句。

##### 2.3.1.6) `TRAVEL` 执行器

作为一种对 `SQL` 执行器的简单替代，我们可以在树状结构上使用 `TRAVEL` 执行器。

`TRAVEL` 执行器的语法如下：

```
    TRAVEL: <SIBLINGS | DEPTH | BREADTH | LEAVES>
```

说明如下：

- 使用 `TRAVEL: SIBLINGS` 时，遍历和当前节点同级的所有兄弟节点。
- 使用 `TRAVEL: DEPTH` 时，从第一级子节点开始执行一次深度遍历，直到叶子节点为止。
- 使用 `TRAVEL: BREADTH` 时，在第一级子节点中执行一次广度遍历，直到遍历完所有第一级子节点为止。
- 使用 `TRAVEL: LEAVES` 时，遍历所有的叶子节点。

当我们需要将 DOM 子树中的部分元素之属性或内容映射到目标数据或者目标元素时，我们使用这一内建执行器。如：

```html
        <archedata id="item-user">
            {
                "id": "$?.attr.data-value", "avatar": "$?.content[0].attr.src",
                "name": "$?.content[1].textContent", "region": "$?.attr.data-region"
            },
        </archedata>

        <observe on="#the-user-list" for="change" to="iterate">

            <init as="users">
                [ ]
            </init>

            <iterate on="$@" to="append" in="$users" with="#item-user" by="TRAVEL: BREADTH">
            </iterate>
        </observe>
```

上述 HVML 代码在用户清单列表上遍历用户，使用 `item-user` 作为数据模板进行映射，然后将其追加到 `$users` 所在的数组中。

##### 2.3.1.7) 内部执行器的使用

以上描述的内部执行器主要用于选择和迭代。当执行器仅返回单个数据项时，通常用于选择。而 SQL 执行器通过 `GROUP BY` 分句，可用于规约。

但我们可以在 `KEY`、`RANGE` 等执行器基础上返回一些隐含的规约信息。比如，

1. 计数：符合执行语句条件的数据项数目，对应键名为 `count`。
1. 总和：符合执行语句条件的数据项之和），对应键名为 `sum`。
1. 均值：符合执行语句条件的数据项之均值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `avg`。
1. 最大值：符合执行语句条件的数据项之最大值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `max`。
1. 最小值：符合执行语句条件的数据项之最小值（所有数据项强制转换为数值型数据，数组和字典数据取 0），对应键名为 `min`。

在字符串等非数值型数据项上进行数值型计算时，遵循如下的转换策略：

1. null 值转换为 0。
1. true 值转换为 1。
1. false 值转换为 0。
1. 字符串按照 C 语言字符串转数值的规则进行转换，比如 `0x123`，按照十六进制转换为整数，`abcd` 转换为 0。
1. 数组的数值，累加所有数组单元，若数组单元不是数值型，按本规则递归处理。
1. 字典的数值，累加所有键值，若某键值不是数值型，按本规则递归处理。

此种情况下，规约操作的返回数据将形如：

```json
{
    "count": 5,
    "sum": 400,
    "avg": 90,
    "max": 100,
    "min": 80,
}
```

#### 2.3.2) 外部执行器

外部执行器是由外部脚本程序或者程序实现的符合所在动作标签要求的类或者函数，通常用于执行复杂的选择、迭代和规约操作，尤其是无法通过内建执行器实现某些特殊排序、条件判断和规约操作时。

使用外部执行器时，HVML 解释器将根据执行器的类型前缀和当前的动作标签来动态调用对应的函数或者创建对应的类对象来执行相应的操作。HVML 解释器支持如下外部执行器前缀：

- `CLASS: <ClassName>`：表示使用 `<ClassName>` 类作为执行器。
- `FUNC: <FuncName>`：表示使用 `<FuncName>` 函数作为执行器。

使用外部执行器时，要使用 HVML 的 `hvml` 元素之 `script` 属性所定义的脚本语言实现实现相应的类或者函数。本文档以 Python 语言为例，说明各个外部执行器的实现方法。对于不同于 Python 的脚本语言，比如 JavaScript、Lua 等，可参考 Python 的实现进行处理。

##### 2.3.2.1) 外部选择器

在 `choose` 标签中，我们可以使用 `by` 介词属性指定使用一个外部的选择执行器，该执行器必须实现为 `HVMLChooser` 基类的一个子类。该基类的原型如下：

```python
class HVMLChooser (object):
    def __init__ (self):
        pass

    def choose (self, on_value, in_value):
        return None

    def map (self, cloned_item, chosen_item):
        return None
```

`HVMLChooser` 类仅包含两个主要的方法：`choose` 和 `map`。这两个方法在基类中不做任何工作，主要用于提供给子类重载。前者用于从 `on` 属性指定的数据项或元素（集合）中选择某个数据项或元素；后者建立被选中的元素在 `in` 属性指定的范围所执行的操作。如果后续执行使用的片段模板或者数据模板中已经定义有数据的映射关系，则无需实现 `map` 方法。

比如我们要从全局 `$_TIMERS` 变量定义的数据中选择指定的定时器，我们可以使用内建的 SQL 执行器，也可以使用一个外部执行器 `CLASS: CTimer`。

```html
    <head>
        <init as="_TIMERS" uniquely by="id">
            [
                { "id" : "foo", "interval" : 1000, "active" : "no" },
                { "id" : "bar", "interval" : 2000, "active" : "no" },
            ]
        </init>
    </head>

    <body>
        ...

        <choose on="foo" to="update" in="$_TIMERS" by="CLASS: CTimer">
            <update on="$?" key.active="yes" />
        </choose>

        ...

    </body>
```

则 `CTimer` 的实现非常简单——从 `in` 属性指定的数组中查找 `id` 为 `on` 属性值（这里是 `foo`）数组单元，若有，则返回这个数组单元，否则返回 `None`。

```python
class CTimer (HVMLChooser):
    def __init__ (self):
        pass

    def choose (self, on_value, in_value):
        for t in in_value:
            if on_value == t['id']
                return t
        return None

```


`CTimer` 并未实现 `map` 方法，因为上面示例中并不需要克隆模板。

##### 2.3.2.2) 外部迭代器

在 `iterate` 动作标签中，当无法使用内建执行器实现特殊迭代操作时，我们可以使用由外部脚本程序定义的迭代执行器。

以 Python 语言为例，类似外部选择器，外部迭代器是 `HVMLIterator` 的子类，该类的实现如下：

```python
class HVMLIterator:
    def __init__ (self, on_value):
        pass

    # implement this method to sort the data.
    def sort (self):
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

- `sort`：用于可迭代数据的排序。子类可不用实现该方法。
- `iterate`：用于迭代数据，子类必须重载该方法。第一次调用时，该方法返回第一个数据项，之后每调用一次，该方法返回下一个数据项，直到返回 `None` 为止。
- `filter`：用于过滤某些数据项。子类可不用实现该方法。
- `map`：若后续操作要克隆模板，使用该方法将数据项映射到克隆后的元素上。

比如对下面迭代并克隆模板插入到指定位置的操作：

```html
    <archetype id="user-item">
        <li class="user-item">
            <img class="avatar" />
            <span></span>
        </li>
    </archetype>

    ...

        <ul id="the-user-list" class="user-list">
            <iterate on="$users" to="append" in="#the-user-list" with="#user-item" by="CLASS: IUser">
                <error on="notready">
                    <img src="wait.gif" />
                </error>
                <except on="StopIteration">
                    <p>Bad user data!</p>
                </except>
            </iterate>
        </ul>

    ...
```

我们可以如下实现 `IUser` 类：

```python
class IUser (HVMLIterator):
    def __init__ (self, on_data):
        self.on_data = on_data
        self.i = 0;
        self.n = len (on_data)
        pass

    # implement this method to sort the data.
    def sort (self):
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

##### 2.3.2.3) 外部规约器

在 `reduce` 动作标签中，当无法使用内建执行器实现特殊的规约操作时，我们可以使用由外部脚本程序定义的规约执行器。以 Python 语言为例，类似外部选择器，外部规约器是 `HVMLReducer` 的子类，该类的实现大致如下：

```python
class HVMLReducer:
    def __init__ (self, on_value):
        pass

    # implement this method to reduce the data.
    def reduce (self):
        return None

```

`HVMLReducer` 仅定义了一个方法：

- `reduce`：用于执行规约操作，子类必须重载该方法。

比如就 2.7) 中提到的统计用户分布的示例，对应的外部 `RUserRegionStats` 类的实现大致如下：

```python
class RUserRegionStats (HVMLReducer):
    def __init__ (self, archedata):
        self.data = archedata
        self.stats = {}
        self.stats.count = 0
        self.stats.regions = { '中国大陆': 0, '中国台湾': 0, '其他': 0 }
        pass

    # implement this method to iterate the data.
    def reduce (self, item):
        for item in self.archedata:
            if item.locale == 'zh_CN':
                self.stats.regions ['中国大陆'] += 1
            elif item.locale == 'zh_TW':
                self.stats.regions ['中国台湾'] += 1
            else:
                self.stats.regions ['其他'] += 1

            self.count += 1

       return self.stats
```

##### 2.3.2.4) 外部函数

外部函数主要用于 `observe` 标签，用于监听事件。在 HVML 中，所有事件均需要打包成如下的 JSON 格式：

```json
    {
        "source": "hibus://localhost/system/status",
        "event": "battery",
        "time": 20200616100207.567,
        "signature": "XXXXX",
        "payload": ...
    }
```

其中的各键值对含义如下：

- `source`：事件来源，字符串。
- `event`：事件名称，字符串。
- `time`：事件发生时间戳，数值。
- `signature`：签名，用于验证事件来源的真伪。
- `payload`：事件数据。具体格式因事件来源和类型的不同而不同。

所有的事件处理函数之原型为：

```python
def event_handler (on_value, root_in_scope, source, event, time_stamp, event_payload):
```

其中，

- `on_value` 是 `observe` 元素之 `on` 属性的值。
- `root_in_scope` 是 `observe` 元素之 `in` 属性确定的当前操作范围。
- `source`、`event`、`time_stamp` 和 `event_payload` 对应于事件源、事件名称、时间戳和事件数据。

比如针对电池电量的改变事件，其 `payload` 如 2.8) 所示包含 `level` 和 `charging` 两个键值对，分别表示当前电量百分比以及是否在充电中。因此，其对应的执行器可实现为：

```python
def on_battery_changed (on_value, root_in_scope, source, event, time_stamp, event_payload):
    if event_payload.level == 100:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-full.png'
    elif event_payload.level > 90:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-90.png'
    elif event_payload.level > 70:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-70.png'
    elif event_payload.level > 50:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-50.png'
    elif event_payload.level > 30:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-30.png'
    elif event_payload.level > 10:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-10.png'
    else:
        root_in_scope.find ('img.battery-status').attr('src') = '/battery-level-low.png'
```

上面的脚本，针对不同的电量范围设置了不同的电池图标，从而向用户展示了当前电池的剩余电量信息。

### 2.3.3) 响应式处理

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
            <update on="$@" textContent="$message">
        </observe>
    </p>
```

为支持响应式处理，HVML 使用 `{{ }}` 双大括号来标记某个 JSON 求值表达式是响应式的，如：

```html
    <init as="user_name">
        "Tom"
    </init>

    <init as="hello">
        "hello, "
    </init>

    <p>
        {{ $hello$user_name }}
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <update on="$user_name" value="$?" />
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
            <update on="$@" textContent="$hello$user_name">
        </observe>
        <observe on="$user_name" for="change">
            <update on="$@" textContent="$hello$user_name">
        </observe>
    </p>

    <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

    <observe on="input[name='user-name']" for="change">
        <update on="$user_name" value="$?" />
    </observe>
```

如此，开发者不需要显式增加 `observe` 标签即可获得相同的响应式处理效果，只需要对相应的表达式增加响应式标记即可。但需要注意的是，HVML 会忽略在上下文变量上使用的响应式标记。

另外，我们还可以使用 HybridOS 提出的数据绑定机制实现元素属性或内容到变量的响应式处理。比如，就上面的 HVML 代码，我们希望实现用户输入框中的内容和变量 `$user_name` 绑定。只要用户修改了输入框中的内容，将自动修改 `$user_name` 的值，而无需使用 `observe` 标签。为此，我们可以如下编写 HVML 代码：

```html
    <input type="text" name="user-name" placeholder="Your Name" value="$user_name"
        databind="$user_name: attr.value" />
```

上述代码，使用 `databind` 属性定义了元素属性 `value` 和变量 `$user_name` 的绑定关系。如此，我们不需要使用 `observe` 和 `update` 标签。

## 3) HVML 语法

### 3.1) 书写 HVML 文档

HVML 本质上采用 XML 语法描述程序中的各个元素。HVML 文档的书写需满足如下要点：

1. 始终使用 UTF-8 编码。
1. 使用 XML 语法。
1. 区分大小写。
1. 使用 XHTML 语法书写 HTML 片段或模板。

一个 HVML 程序由如下几个部分组成：

1. Any number of comments and ASCII whitespace.
1. A `DOCTYPE`.
1. Any number of comments and ASCII whitespace.
1. The document element, in the form of an `hvml` element.
1. Any number of comments and ASCII whitespace.

#### 3.1.1) DOCTYPE

DOCTYPE 定义了文档格式以及 HVML 标签使用的前缀。

```html
<!DOCTYPE hvml>
```

A DOCTYPE must consist of the following components, in this order:

1. A string that is an ASCII case-insensitive match for the string `"<!DOCTYPE"`.
1. One or more ASCII whitespace.
1. A string that is an ASCII case-insensitive match for the string `"hvml"`.
1. Optionally, a DOCTYPE prefix string.
1. Zero or more ASCII whitespace.
1. A U+003E GREATER-THAN SIGN character (`>`).

In other words, `<!DOCTYPE hvml>`, case-sensitively.

在 HVML 文档中，当某个 HVML 标签可能和目标标记语言的标签冲突时，我们可以使用预定义前缀来标记 HVML 的标签，默认使用 `v:` 作为前缀，但我们也可以在 DOCTYPE 中自定义这个前缀。前缀字符串必须以字母打头，以冒号（`:`）结尾。

1. One or more ASCII whitespace.
1. A string that is an ASCII case-sensitive match for the string "SYSTEM".
1. One or more ASCII whitespace.
1. A U+0022 QUOTATION MARK or U+0027 APOSTROPHE character (the quote mark).
1. A literal string specified the system information, which consists one or multiple tokens delimited by a U+0020 SPACE (` `), such as "v: html c". The first token must be started with an ASCII alpha and ended with `:` (U+003A COLON MARK); it defines the prefix of HVML tag. The other tokens are reserved for future use.
1. A matching U+0022 QUOTATION MARK or U+0027 APOSTROPHE character (i.e. the same character as in the earlier step labeled quote mark).

For example, if you write the DOCTYPE element as `<!DOCTYPE hvml SYSTEM "hvml:">`, you can add the specific prefix to some HVML tags:

```html
<!DOCTYPE hvml SYSTEM "hvml:">
<hvml target="html" script="python" lang="en">
    <head>
        <init as="global">
            { "locale" : "zh_CN" }
        </init>

        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <listen on="hibus://system/status" as="systemStatus" />
    </head>

    <body>
        <header id="theStatusBar">
            <img class="mobile-status" src="" />
            <span class="mobile-operator"></span>
            <img class="wifi-status" src="" />
            <span class="local-time">12:00</span>
            <img class="battery-status" />
        </header>

        <ul class="user-list">
            <iterate on="$users" with="#user-item" to="append" by="CLASS: IUser">
                <hvml:error on="nodata">
                    <img src="wait.png" />
                </hvml:error>
                <hvml:except on="StopIteration">
                    <p>Bad user data!</p>
                </hvml:except>
            </iterate>
        </ul>
     </body>
</hvml>
```

注意：我们通常在目标标记语言定义的标签和 HVML 标签冲突时才使用前缀。

#### 3.1.2) 元素

HVML 元素可划分为如下几类：

1) 无文本的动作元素（action elements without text）  
`update`、`remove`、`test`、`match`、`choose`、`iterate`、`reduce`、`observe`、`fire`、`listen`、`close`、`load`、`back`、`define`、`include`、`call`、`return` 和 `catch` 元素。

2) 有文本的动作元素（action elements with text）  
`init` 和 `set` 元素。

3) 模板元素（template elements）  
`archetype`、`rawpart`、`error` 和 `except` 元素。

4) 裸文本元素（raw text elements）  
`archedata` 元素。

6) 普通元素（normal elements）  
`hvml`、`head` 和 `body` 元素。

7) 外部元素 （foreign elements） 
所有不属于 HVML 标签定义的元素，被视为外部元素。

无文本的动作元素用于定义对数据或文档的操作，可包含其他动作元素以及 `error` 或者 `except` 这两类普通元素，但不能包含其他类型的元素，也不能定义内容。

有文本的动作元素用于定义 JSON 数据，不可包含其他子元素；其内容之限制同裸文本元素。

一个模板元素的模板内容位于该模板元素的起始标签之后，终止标签之前，可包含任意的文本、字符引用、外部元素以及注释，但文本不能包含 U+003C LESS-THAN SIGN (`<`) 或者含糊的＆符号。

> The markup for the template contents of a template element is placed just after the template element's start tag and just before template element's end tag (as with other elements), and may consist of any text, character references, foreign elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand.

外部元素必须要么同时包含起始标签和终止标签，要么起始标签被标记为自终止。后者情形下，不能包含终止标签。

> Foreign elements must either have a start tag and an end tag, or a start tag that is marked as self-closing, in which case they must not have an end tag. 

比如，HTML 的 `<br>` 元素，在 HVML 中作为外部元素使用时，必须书写为：`<br />`。

当一个外部元素的起始标签被标记为自终止时，该元素不能包含任何内容（显然，没有终止标签就无法在起始标签和终止标签之间放置任何内容）。当一个外部元素的起始标签没有被标记为自终止时，该元素中可包含文本、字符引用，CDATA 段、注释以及其他外部元素或动作元素，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

> Foreign elements whose start tag is marked as self-closing can't have any contents (since, again, as there's no end tag, no content can be put between the start tag and the end tag). Foreign elements whose start tag is not marked as self-closing can have text, character references, CDATA sections, other foreign elements or action elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand.

裸文本元素中可包含文本，但有如下所述之限制。

> Raw text elements can have text, though it has restrictions described below.

普通元素可包含文本、字符引用、其他普通元素或外部元素以及注释，但文本中不可包含 U+003C LESS-THAN SIGN (`<`) 或含糊的 & 符号。

> Normal elements can have text, character references, other elements, and comments, but the text must not contain the character U+003C LESS-THAN SIGN (<) or an ambiguous ampersand. 

普通元素及外部元素中可包含可转义裸文本，统称为为可转移文本元素（escapable raw text elements）。

可转义裸文本元素中可包含文本和字符引用，但文本中不可包含任何含糊的 & 符号，另有如下所述之限制。

> Escapable raw text elements can have text and character references, but the text must not contain an ambiguous ampersand. There are also further restrictions described below.

标签包含标签名称，给定了元素的名称。HVML 元素允许使用指定的前缀来避免出现标签名称的冲突。除该前缀中包含的冒号（:）字符之外，标签名称中仅使用 ASCII 字母及数字，且仅使用字母开头。

> Tags contain a tag name, giving the element's name. HVML allows use a prefix for the tag of a HVML-only element. Except for the colon character as the end of the prefix, HVML elements all have names that only use ASCII alphanumerics. 

注意，HVML 标签名称区别大小写。对于外部元素的标签，将保留其大小写形式。

##### 3.1.2.1) 起始标签/Start tags

Start tags must have the following format:

1. The first character of a start tag must be a U+003C LESS-THAN SIGN character (<).
1. The next few characters of a start tag must be the element's tag name.
1. If there are to be any attributes in the next step, there must first be one or more ASCII whitespace.
1. Then, the start tag may have a number of attributes, the syntax for which is described below. Attributes must be separated from each other by one or more ASCII whitespace.
1. After the attributes, or after the tag name if there are no attributes, there may be one or more ASCII whitespace. (Some attributes are required to be followed by a space. See the attributes section below.)
1. Then, if the element is one of the void elements, or if the element is a foreign element, then there may be a single U+002F SOLIDUS character (/). This character has no effect on void elements, but on foreign elements it marks the start tag as self-closing.
1. Finally, start tags must be closed by a U+003E GREATER-THAN SIGN character (>).

##### 3.1.2.2) 终止标签/End tags

End tags must have the following format:

1. The first character of an end tag must be a U+003C LESS-THAN SIGN character (<).
1. The second character of an end tag must be a U+002F SOLIDUS character (/).
1. The next few characters of an end tag must be the element's tag name.
1. After the tag name, there may be one or more ASCII whitespace.
1. Finally, end tags must be closed by a U+003E GREATER-THAN SIGN character (>).

##### 3.1.2.3) 属性/Attributes

Attributes for an element are expressed inside the element's start tag.

Attributes have a name and a value. Attribute names must consist of one or more characters other than controls, U+0020 SPACE, U+0022 ("), U+0027 ('), U+003E (>), U+002F (/), U+003D (=), and noncharacters. In the HVML syntax, attribute names, even those for foreign elements, may be written with any mix of ASCII lower and ASCII upper alphas.

Attribute values are a mixture of text and character references, except with the additional restriction that the text cannot contain an ambiguous ampersand.

Attributes can be specified in four different ways:

1) 空属性语法/Empty attribute syntax

Just the attribute name. The value is implicitly the empty string.

In the following example, the disabled attribute is given with the empty attribute syntax:

```html
    <init as="_TIMERS" uniquely by="id">
```

If an attribute using the empty attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

2) 无引号属性值语法/Unquoted attribute value syntax

The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal ASCII whitespace, any U+0022 QUOTATION MARK characters ("), U+0027 APOSTROPHE characters ('), U+003D EQUALS SIGN characters (=), U+003C LESS-THAN SIGN characters (<), U+003E GREATER-THAN SIGN characters (>), or U+0060 GRAVE ACCENT characters (`), and must not be the empty string.

In the following example, the value attribute is given with the unquoted attribute value syntax:

```html
    <init as=_TIMERS uniquely by=id>
```

If an attribute using the unquoted attribute syntax is to be followed by another attribute or by the optional U+002F SOLIDUS character (/) allowed in step 6 of the start tag syntax above, then there must be ASCII whitespace separating the two.

3) 单引号属性值语法/Single-quoted attribute value syntax

The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by a single U+0027 APOSTROPHE character ('), followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal U+0027 APOSTROPHE characters ('), and finally followed by a second single U+0027 APOSTROPHE character (').

In the following example, the type attribute is given with the single-quoted attribute value syntax:

```html
    <init as='_TIMERS' uniquely by='id'>
```

If an attribute using the single-quoted attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

4) 双引号属性值语法/Double-quoted attribute value syntax

The attribute name, followed by zero or more ASCII whitespace, followed by a single U+003D EQUALS SIGN character, followed by zero or more ASCII whitespace, followed by a single U+0022 QUOTATION MARK character ("), followed by the attribute value, which, in addition to the requirements given above for attribute values, must not contain any literal U+0022 QUOTATION MARK characters ("), and finally followed by a second single U+0022 QUOTATION MARK character (").

In the following example, the name attribute is given with the double-quoted attribute value syntax:

```html
    <choose on="$2.payload" to="append update" in="#the-user-list" with="#user-item">
```

If an attribute using the double-quoted attribute syntax is to be followed by another attribute, then there must be ASCII whitespace separating the two.

There must never be two or more attributes on the same start tag whose names are an ASCII case-sensitive match for each other.

##### 3.1.2.4) 动作元素属性

在 HVML 中，动作元素的属性值存在如下特殊之处：

1. 动作元素的属性值可分为介词属性和副词属性，这些属性是固有属性。
1. 所有介词属性均需定义对应的属性值，可省略其赋值操作符（U+003D EQUALS SIGN `=`）。
1. 所有副词属性按上述（Empty attribute syntax/空属性语法）表述。
1. 除固有的介词属性及副词属性之外，其他属性使用上述四种语法之一，且可使用额外的赋值运算符。

所有介词属性（仅在动作元素中）的赋值操作符（`=`）可以被忽略：

```html
    <choose on "$2.payload" to "append update" in "#the-user-list" with "#user-item">
        <update textContent = "foo" />
    </choose>
```

尽管对符合条件的介词属性值，我们可以省略其周围的单引号（U+0027 APOSTROPHE `'`）或者双引号（U+0022 QUOTATION MARK `"`），但建议使用单引号或者双引号，以使得 HVML 代码的书写效果更为美观。

```html
    <init as "_TIMERS" uniquely by "id">
```

__是否考虑：__  
当使用单引号时，将忽略整个属性值字符串中的所有 JSON 表达式，当做普通字符串处理。

在某些动作元素（如 `update`）中，我们可以使用除 `=` 之外的属性值操作符来改变目标元素或者数据的属性或者内容：

- `+=`：在当前的属性值中添加一个新的词法单元（token，指使用某种词法进行分割的最小单元字符串），若已有该词法单元，则不做修改。比如，原有的 `attr.class` 的属性值为 `foo`，使用 `attr.class += "text-warning"` 后，将修改为：`foo text-warning`；若原有属性值为 `foo text-warning`，则会保持不变。
- `-=`：从当前属性值中移除一个词法单元，若没有该词法单元，则不做修改。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class -= "text-warning"` 后，将修改为 `foo`。
- `%=`：从当前属性值中按指定的模式匹配一个词法单元，并使用第二个词法单元替换。比如，原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class %= "text-* text-info"` 后，将修改为 `foo text-info`。
- `/=`：从当前属性值中按正则表达式匹配一个词法单元，并使用第二个词法单元替换。原有的 `attr.class` 属性值为 `foo text-warning`，则使用 `attr.class /= "/^text/ text-info"` 后，将修改为 `foo text-info`。
- `^=`：在当前属性值的头部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `attr.data-value ^= "C"` 后，将修改为：`Cab`。
- `$=`：在当前属性值的尾部添加指定的属性值。比如，原有的 `attr.data-value` 的属性值为 `ab`，使用 `attr.data-value $= "C"` 后，将修改为：`abC`。

如，

```html
    <choose on "$2.payload" to "append update" in "#the-user-list" with "#user-item">
        <update attr.class %= "text-* text-info" />
    </choose>
```

##### 3.1.2.5) 可选标签

要求使用严格的 XML 语法，所以，原则上不能省略任何标签，但有如下所述的特殊情形。

1) 整个省略 `head` 元素

我们可以整个省略 `head` 元素。当我们整个省略 `head` 元素时，对应的 HVML DOM 树中将包含一个空的 `head` 元素节点。

```html
<!DOCTYPE hvml>
<hvml>
    <body>
        ...
    </body>
</hvml>
```

2) 自动关闭外部元素

如下所示由外部元素定义的 HVML 片段：

```html
    <div>
        <p>asdf asdf wiup asdfi kjfdas <i>asdfasdf.
    </div>
```

我们省略了 `</i>` 和 `</p>` 终止标签，上述片段将被解析为：


```html
    <div>
        <p>asdf asdf wiup asdfi kjfdas <i>asdfasdf.</i></p>
    </div>
```

注意，HVML 解析器不能处理 HTML 规范定义的可选标签处理规则。如：

```html
    <ul>
        <li>asdf asdf.
        <li>asdf asdf wiup asdfi kjfdas.
        <li>asdf kjaskfdasdf askdf asdf fa jaksdfasdf.
    </ul>
```

按照 HTML 规范，应被解析为：

```html
    <ul>
        <li>asdf asdf.</li>
        <li>asdf asdf wiup asdfi kjfdas.</li>
        <li>asdf kjaskfdasdf askdf asdf fa jaksdfasdf.</li>
    </ul>
```

但会被 HVML 解析器解析为：

```html
    <ul>
        <li>asdf asdf.
            <li>asdf asdf wiup asdfi kjfdas.
                <li>asdf kjaskfdasdf askdf asdf fa jaksdfasdf.</li>
            </li>
        </li>
    </ul>
```

##### 3.1.2.6) 裸文本元素和可转义裸文本元素的内容限制

裸文本元素和可转义裸文本元素中的文本不能包含任何以 `</`（U+003C LESS-THAN SIGN, U+002F SOLIDUS）打头，且跟随以 ASCII 字母打头的标签名称以及 U+0009 CHARACTER TABULATION (tab)、U+000A LINE FEED (LF)、U+000C FORM FEED (FF)、U+000D CARRIAGE RETURN (CR)、U+0020 SPACE、U+003E GREATER-THAN SIGN (`>`)，或者 U+002F SOLIDUS (`/`) 字符之一的字符串。

> The text in raw text and escapable raw text elements must not contain any occurrences of the string `</` (U+003C LESS-THAN SIGN, U+002F SOLIDUS) followed by a tag name started with an ASCII alpha letter and followed by one of U+0009 CHARACTER TABULATION (tab), U+000A LINE FEED (LF), U+000C FORM FEED (FF), U+000D CARRIAGE RETURN (CR), U+0020 SPACE, U+003E GREATER-THAN SIGN (`>`), or U+002F SOLIDUS (`/`).

#### 3.1.3) 文本/Text

Text is allowed inside elements, attribute values, and comments. Extra constraints are placed on what is and what is not allowed in text based on where the text is to be put, as described in the other sections.

##### 3.1.3.1) 新行/newlines

Newlines in HVML may be represented either as U+000D CARRIAGE RETURN (CR) characters, U+000A LINE FEED (LF) characters, or pairs of U+000D CARRIAGE RETURN (CR), U+000A LINE FEED (LF) characters in that order.

Where character references are allowed, a character reference of a U+000A LINE FEED (LF) character (but not a U+000D CARRIAGE RETURN (CR) character) also represents a newline.

##### 3.1.3.2) JSON 求值表达式的语法

除 `rawpart` 元素之外，所有元素的属性值以及文本内容中，可嵌入 JSON 求值表达式。

一个合法的 JSON 表达式（`<json_evaluation_expression>`）需要符合如下的语法规则，且可递归使用：

- `<json_evaluation_expression>`: `'$'<json_addressing_expression> | '{$'<json_addressing_expression>'}'`
- `<json_addressing_expression>`：
   - `<literal_variable_name>'.'<literal_key_name>'('<json_evaluation_expression>[, <json_evaluation_expression>, ...]')'` 用于在动态 JSON 对象上调用特定键名的 getter 方法。
   - `<literal_variable_name>'.'<literal_key_name>'<'<json_evaluation_expression>[, <json_evaluation_expression>, ...]'>'` 用于在动态 JSON 对象上调用特定键名的 setter 方法。
   - `<literal_variable_name>'.'<literal_key_name>` 用于引用一个 JSON 对象的键值。
   - `<literal_variable_name>'['<json_evaluation_expression> | <quoted_key_name> | <literal_integer>']'` 用于引用一个 JSON 数组的特定单元或者用于引用一个 JSON 对象的键值，尤其当对应的键名不符合上面所说的变量名规则时。当 JSON 表达式的返回值是数值时，强制转换为整数按索引值处理，当 JSON 表达式的返回值是字符串时，按键名处理。
   - `<literal_variable_name>` 用于直接引用一个 JSON 数据。
- `<literal_variable_name>`：`'?' | '@' | '#' | '%' | '@' | ':' | <literal_integer> | <literal_token>`。
- `<literal_key_name>`：`<literal_token>`。
- `<literal_integer>`：`/^[1-9][0-9]*$/`。
- `<literal_token>`：`/^[A-Za-z_][A-Za-z0-9_]*$/`。
- `<quoted_key_name>`: `'<literal_string>'` | `"<literal_string>"`。

#### 3.1.4) 字符引用/Character references

In certain cases described in other sections, text may be mixed with character references. These can be used to escape characters that couldn't otherwise legally be included in text.

Character references must start with a U+0026 AMPERSAND character (&). Following this, there are three possible kinds of character references:

Named character references
The ampersand must be followed by one of the names given in the named character references section, using the same case. The name must be one that is terminated by a U+003B SEMICOLON character (;).
Decimal numeric character reference
The ampersand must be followed by a U+0023 NUMBER SIGN character (#), followed by one or more ASCII digits, representing a base-ten integer that corresponds to a code point that is allowed according to the definition below. The digits must then be followed by a U+003B SEMICOLON character (;).
Hexadecimal numeric character reference
The ampersand must be followed by a U+0023 NUMBER SIGN character (#), which must be followed by either a U+0078 LATIN SMALL LETTER X character (x) or a U+0058 LATIN CAPITAL LETTER X character (X), which must then be followed by one or more ASCII hex digits, representing a hexadecimal integer that corresponds to a code point that is allowed according to the definition below. The digits must then be followed by a U+003B SEMICOLON character (;).
The numeric character reference forms described above are allowed to reference any code point excluding U+000D CR, noncharacters, and controls other than ASCII whitespace.

An ambiguous ampersand is a U+0026 AMPERSAND character (&) that is followed by one or more ASCII alphanumerics, followed by a U+003B SEMICOLON character (;), where these characters do not match any of the names given in the named character references section.

#### 3.1.5) CDATA 段落/CDATA sections

CDATA sections must consist of the following components, in this order:

1. The string `<![CDATA[`.
1. Optionally, text, with the additional restriction that the text must not contain the string `]]>`.
1. The string `]]>`.
1. CDATA sections can only be used in foreign content (MathML or SVG). In this example, a CDATA section is used to escape the contents of a MathML ms element:

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

#### 3.1.6) 注释/Comments

Comments must have the following format:

1. The string `<!--`.
1. Optionally, text, with the additional restriction that the text must not start with the string `>`, nor start with the string `->`, nor contain the strings `<!--`, `-->`, or `--!>`, nor end with the string `<!-`.
1. The string `-->`.

### 3.2) 解析 HVML 文档

#### 3.2.1) 解析模型概览

#### 3.2.2) 解析错误

#### 3.2.3) 输入字节流

#### 3.2.4) 解析状态

##### 3.2.4.1) 插入模式

##### 3.2.4.2) 开放元素栈

#### 3.2.5) 断词/Tokenization

#### 3.2.6) 树的构造

##### 3.2.6.1) 创建和插入模式/Creating and inserting nodes

##### 3.2.6.2) 解析仅包含文本的元素/Parsing elements that contain only text

##### 3.2.6.3) 自动关闭元素/Auto-closing elements

##### 3.2.6.4) HVML 内容的词法解析规则/The rules for parsing tokens in HVML content

##### 3.2.6.5) 外部内容的词法解析规则/The rules for parsing tokens in foreign content

#### 3.2.7) 结束

#### 3.2.8) 错误错误

### 3.3 HVML 片段的串行化/Serializing HVML fragments

### 3.4 解析 HVML 片段/Parsing HVML fragments

### 3.5 已命名字符引用/Named character references

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

注意：为简单起见，我们没有引入有关构件布局的描述信息。

为满足以上的交互处理需求，我们使用 HVML 来描述这个界面的动态生成以及交互过程：

```html
<!DOCTYPE hvml>
<hvml target="xml" script="python">
    <head>
        <init as="fileInfo">
            {
                "curr_path": "/home/", 
                "selected_type": "dir",
                "selected_name": "..",
            }
        </init>
    </head>

    <body>
        <label id="path">
            $fileInfo.curr_path
        </label>

        <archetype id="dir-entry">
            <item class="$?.type">$?.name</item>
        </archetype>

        <define as="fillDirEntries">
            <choose on="$?" to="iterate" by="CLASS: CDirEntries">
                <iterate on="$?" to="append" in="#entries" with="#dir-entry" by="RANGE: 0">
                </iterate>
            </choose>
        </define>

        <listbox id="entries">
            <call on="$fillDirEntries" with="$fileInfo.curr_path" />
        </listbox>

        <button id="open">
            Open
        </button>

        <observe on="$entries" for="selected-item-changed">
            <update on="$fileInfo" key.selected_type="$?.type" key.selected_name="$?.name" />
        </observe>

        <observe on="$open" for="click">
            <test on="$fileInfo.selected_type">
                <match for="dir" to="empty call update update" exclusively>
                    <init as="new_path">
                        "$fileInfo.curr_path{$2.name}/"
                    </init>

                    <empty on="#entries" />
                    <call on="$fillDirEntries" with="$new_path" />
                    <update on="$fileInfo" key.curr_path="$new_path" />
                    <update on="#path" textContent="$new_path" />
                </match>
                <match for="file" exclusively>
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

        <requset on="lcmd:///bin/ls" with="$lcmdParams">
            <iterate on="$?" to="append" in="#entries" with="#dir-entry" by="RANGE: 0">
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
<hvml target="html" script="python">
    <head>
        <listen on="mqtt://foo.bar/bracelet" as="braceletInfo">

        <init as="_TIMERS" uniquely on="id">
            [
                { "id" : "clock", "interval" : 1000, "active" : "yes" },
            ]
        </init>

        <link rel="stylesheet" type="text/css" href="/foo/bar/bracelet.css">
    </head>

    <body>
        <div class="clock" id="clock">
            <observe on="$_TIMERS" for="clock">
                <update on="#clock" textContent="$_SYSTEM.time('%H:%m')" />
            </observe>
        </div>

        <div class="temperature" id="temperature">
            <observe on="$braceletInfo" for="temperature">
                <update on="#temperature" textContent="$?.value ℃" />
            </observe>
        </div>

        <div class="heartbeat" id="heartbeat">
            <observe on="$braceletInfo" for="heartbeat">
                <update on="#heartbeat" textContent="$?.value BPM" />
            </observe>
        </div>

        <div class="steps" id="steps">
            <observe on="$braceletInfo" for="steps">
                <update on="#steps" textContent="$?.value" />
            </observe>
        </div>

        <observe on="$braceletInfo">
            <choose on="$?" to="noop" by="CLASS: CDumpEvent" />
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
1. 通过丰富的内建执行器，通过诸如 KEY、RANGE、TRAVEL、SQL 等语句在元素和数据上执行迭代、过滤、排序、规约等操作，使开发者可以专心于业务逻辑的实现，而非具体的算法。
1. 通过外部执行器，为复杂数据的处理提供了使用外部脚本或者模块实现相应功能的方法，提供了可扩展性。
1. 通过绑定外部程序模块，提供了可扩展、灵活的动态 JSON 对象实现方法，结合本文定义的 JSON 求值表达式，可用于满足各种基于函数调用的计算需求。
1. 解决了构建在现有 Web 技术之上的虚拟 DOM 技术存在的打补丁式解决方案引入的问题，比如代码的可读性降低，结构不清晰等问题。

[Beijing FMSoft Technologies Co., Ltd.]: https://www.fmsoft.cn
[FMSoft Technologies]: https://www.fmsoft.cn
[HybridOS Official Site]: https://hybrid.fmsoft.cn

[MiniGUI]: http:/www.minigui.com
[WebKit]: https://webkit.org
[HTML Specification]: https://html.spec.whatwg.org/
[DOM Specification]: https://dom.spec.whatwg.org/
[WebIDL Specification]: https://heycam.github.io/webidl/
[CSS 2.2]: https://www.w3.org/TR/CSS22/
[CSS Box Model Module Level 3]: https://www.w3.org/TR/css-box-3/

[HybridOS Architecture]: HybridOS-Architecture
[HybridOS Code and Development Convention]: HybridOS-Code-and-Development-Convention

