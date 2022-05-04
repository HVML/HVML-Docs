# Design and Implementation of a Programable Markup Language: HVML

**Table of Contents**

[//]:# (START OF TOC)

- [Article Info](#article-info)
- [Abstract](#abstract)
- [1) Introduction](#1-introduction)
   + [1.1) Problems](#11-problems)
   + [1.2) Existing Solutions](#12-existing-solutions)
   + [1.3) Our Solution](#13-our-solution)
- [2) Design of HVML](#2-design-of-hvml)
   + [2.1) Some Simple Samples](#21-some-simple-samples)
   + [2.2) A Comprehensive Sample](#22-a-comprehensive-sample)
   + [2.3) The HVML Virtual Machine](#23-the-hvml-virtual-machine)
      * [2.3.1) The execution model of HVML interpreter](#231-the-execution-model-of-hvml-interpreter)
      * [2.3.2) Flow control](#232-flow-control)
      * [2.3.3) Handling of errors and exceptions](#233-handling-of-errors-and-exceptions)
   + [2.4) eJSON Evaluation Expressions](#24-ejson-evaluation-expressions)
      * [2.4.1) The extended JSON](#241-the-extended-json)
      * [2.4.2) eJSON Evaluation Expressions](#242-ejson-evaluation-expressions)
      * [2.4.3) Complex eJSON Evaluation Expressions](#243-complex-ejson-evaluation-expressions)
   + [2.5) Variables](#25-variables)
      * [2.5.1) Context variables](#251-context-variables)
      * [2.5.2) Static variables](#252-static-variables)
      * [2.5.3) Temporary variables](#253-temporary-variables)
      * [2.5.4) Life cycle of a variable](#254-life-cycle-of-a-variable)
   + [2.6) Closures](#26-closures)
   + [2.7) Coroutines](#27-coroutines)
      * [2.7.1) Asynchrony and Concurrency](#271-asynchrony-and-concurrency)
      * [2.7.2) Event-driven](#272-event-driven)
      * [2.7.3) Observing a datum or a variable](#273-observing-a-datum-or-a-variable)
      * [2.7.4) Executes a closure asynchronously](#274-executes-a-closure-asynchronously)
   + [2.8) HVML Tags and Attributes](#28-hvml-tags-and-attributes)
      * [2.8.1) Frame tags](#281-frame-tags)
      * [2.8.2) Template tags](#282-template-tags)
      * [2.8.3) Data operation tags](#283-data-operation-tags)
      * [2.8.4) Stack operation tags](#284-stack-operation-tags)
      * [2.8.5) Coroutine operation tags](#285-coroutine-operation-tags)
      * [2.8.6) Event tags](#286-event-tags)
- [3) Interop with System](#3-interop-with-system)
   + [3.1) Dynamic Objects and Predefined Static Variables](#31-dynamic-objects-and-predefined-static-variables)
   + [3.2) External Dynamic Objects](#32-external-dynamic-objects)
   + [3.3) External Executors](#33-external-executors)
   + [3.4) Remote Data Fetcher](#34-remote-data-fetcher)
   + [3.5) HVML Targets](#35-hvml-targets)
      * [3.5.1) Target `void`](#351-target-void)
      * [3.5.2) Target `html`](#352-target-html)
      * [3.5.3) Target `xml`](#353-target-xml)
   + [3.6) HVML Renderers](#36-hvml-renderers)
      * [3.6.1) Headless Renderer](#361-headless-renderer)
      * [3.6.2) PURCMC Renderer](#362-purcmc-renderer)
      * [3.6.3) THREAD Renderer](#363-thread-renderer)
- [4) Typical Applications](#4-typical-applications)
   + [4.1) Use HVML to Govern GUIs](#41-use-hvml-to-govern-guis)
   + [4.2) Cloud Apps](#42-cloud-apps)
- [5) Open Source Implementation](#5-open-source-implementation)
   + [5.1) PurC](#51-purc)
   + [5.2) PurC Fetcher](#52-purc-fetcher)
   + [5.3) PurC Midnight Commander](#53-purc-midnight-commander)
   + [5.4) xGUI Pro](#54-xgui-pro)
- [6) Performance Testing](#6-performance-testing)
- [7) Development Experience](#7-development-experience)
- [8) Related Work](#8-related-work)
- [9) The Conclusion](#9-the-conclusion)
   + [9.1) Simple Design](#91-simple-design)
   + [9.2) Data-driven](#92-data-driven)
   + [9.3) Inherent Event-driven Mechanism](#93-inherent-event-driven-mechanism)
   + [9.4) New Application Framework](#94-new-application-framework)
- [Acknowledgements](#acknowledgements)
- [References](#references)
- [Authors](#authors)
- [Tradmarks](#tradmarks)

[//]:# (END OF TOC)

## Article Info

- Vincent Wei

## Abstract

During the development of [HybridOS], [Vincent Wei] proposed a new-style,
general-purpose, and easy-to-learn programming language called `HVML`.

The original design goal of HVML is to allow developers who are familiar with
C/C++, Python, or other programming languages to easily develop GUI applications
by using Web front-end technologies (such as HTML/SVG, DOM and CSS), instead of
using JavaScript programming language in a web browser or Node.js.

We achieved this design goal and also designed HVML as a new-style and
general-purpose programming language. Now, we can not only use HVML as
a programming language to rapidly develop GUI applications based on Web
front-end technologies in the C/C++ runtime environment, but also use HVML
as a general script language.

This article describes the reason we design HVML, and the main features of HVML.

## 1) Introduction

### 1.1) Problems

With the development of Internet and applications, the Web front-end
development technologies around HTML/CSS/JavaScript has evolved rapidly.
Since 2019, frameworks based on virtual DOM (Document Object Model) technology
have been favored by front-end developers, such as [React.js] and [Vue.js].

The so-called "virtual DOM" refers to a front-end application that uses
JavaScript to create and maintain a virtual DOM tree, and the application
scripts do not directly manipulate the real DOM tree.

The virtual DOM technology provides the following benefits:

1. The script does not directly manipulate the real DOM tree. On the one hand,
   the existing framework simplifies the complexity of front-end development,
   on the other hand, it reduces the frequent operations on the DOM tree through
   dynamic modification of page content by optimizing the operation of the real DOM tree,
   thus improving page rendering efficiency and user experience.
1. With the virtual DOM technology, the modification of a certain data
   by the program can directly be reflected on the content of the data-bound page,
   and the developer does not need to actively or directly call the relevant
   interface to operate the DOM tree. This technology provides so-called
   "responsive" programming, which greatly reduces the workload of developers.

On the other side, front-end frameworks represented by React.js and Vue.js have
achieved great success, but have the following deficiencies and shortcomings:

1. These technologies are based on multiple Web standards and require browsers
   that fully support the standards or specifications to run. Therefore,
   it is difficult to integrate these technologies with existing modules which
   are developed based on programming languages such as C/C++.
1. Due to inherent limitations, the use of JavaScript language in webpages
   has always been criticized by developers as follows:
   - Client-side security. The main problem or disadvantage in JavaScript is
     that the code is always visible to everyone, so anyone can view
     the source code.
   - Low source maintainability. It is difficult to develop large applications
     by using JavaScript. When use JavaScript in a front-end project, the
     configuration is often a tedious task to the amount of tools that require
     to figure together to make an environment for such a project.
   - Negative impact on performance. Running a large amount of JavaScript code
     related to business logic in the browser will cause page rendering and
     business logic to compete for processor resources. This is one of
     the main reasons why the user experiences of web-based UIs are always
     significantly different from native GUIs.
1. These technologies implement data-based condition and loop flow controls
   by introducing some virtual attributes such as `v-if`, `v-else`, and `v-for`.
   However, this method breaks the logic of the code and reduces the
   readability of the code. Below is an example:

```html
<div v-if="Math.random() > 0.5">
  Now you see "{{ name }}"
</div>
<div v-else>
  Now you don't
</div>
```

### 1.2) Existing Solutions

(Say something about electron and other similiar open source projects.)


### 1.3) Our Solution

HVML is a programmable markup language. Like HTML, HVML uses markups to define
program structure and data, but unlike HTML, HVML is programmable and dynamic.

HVML realizes the dynamic generation and update function of data and XML/HTML
documents through a limited number of action tags and dynamic JSON expressions
that can be used to define attributes and content; HVML also provides mechanisms
to interact with the runtime of an existing programming language, such as
C/C++, Python, Lua, etc., so as to provide strong technical support for these
programming languages to utilize Web front-end technologies outside the browser.
From this perspective, HVML can also be regarded as a glue language.

## 2) Design of HVML

### 2.1) Some Simple Samples

The classical `helloworld` program in HVML looks like:

```html
<!DOCTYPE hvml>
<hvml target="void">

    $STREAM.stdout.writelines('Hello, world!')

</hvml>
```

The HVML program above will print the following line on your terminal:

```
Hello, world!
```

Obviously, the key statement of the above program is

```js
$STREAM.stdout.writelines('Hello, world!')
```

This statement called the `writelines` method of `$STREAM.stdout`, and the
method printed the `Hello, world!` to STDOUT, i.e., your terminal.

Now we rewrite the above program a little more complicated to have the following
features:

- Output a valid HTML document or a simple text line according to
  a startup option.
- Support localization according to the current system locale.

Please read the code below and the comments carefully:

```html
<!DOCTYPE hvml>

<!-- $REQUEST contains the startup options -->
<hvml target="$REQUEST.target">
  <body>

    <!--
        $SYSTEM.locale returns the current system locale like `zh_CN'.
        This statement loads a JSON file which defined the map of
        localization messages, like:
        {
            "Hello, world!": "世界，您好！"
        }
    -->
    <update on="$T.map" from="messages/$SYSTEM.locale" to="merge" />

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
        <noop>
            $STREAM.stdout.writelines($?)
        </noop>
    </define>

    <!--
        This statement includes one of the operation sets defined above
        according to the value of `target` attribute of `hvml` element,
        and pass the result returned by `$T.get('Hello, world!')`.
    -->
    <include with=${output_$HVML.target} on="$T.get('Hello, world!')" />

  </body>
</hvml>
```

The HVML program above will generate a HTML document if the current system
locale is `zh_CN` and the value of the startup option `target` is `html`:

```html
<html>
  <body>
        <h1>HVML</h1>
        <p>世界，您好！</p>
  </body>
</html>
```

But if the value of the startup option `target` is `void`, the HVML program
above will print the following line on your terminal:

```
世界，您好！
```

With the simple samples above, you can see what's interesting about HVML.

In essence, HVML provides a new way of thinking to solve the previous problem:

- First, it introduces Web front-end technologies (HTML, XML, DOM, CSS, etc.)
  into other programming languages, rather than replacing other programming
  languages with JavaScript.
- Second, it uses an HTML-like markup language to manipulate elements,
  attributes, and styles in Web pages, rather than JavaScript.
- In addition, in the design of HVML, we intentionally use the concept of
  data-driven, so that HVML can be easily combined with other programming
  languages and various network connection protocols, such as data bus,
  message protocol, etc. In this way, developers use a programming language
  with which is familiar by them to develop the non-GUI part of the application,
  and all the functions of manipulating the GUI are handed over to HVML, and
  the modules are driven by the data flowing between them. While HVML provides
  the abstract processing capability of the data flow.

Although we designed HVML originally as a programming language to rapidly
develop GUI applications based on Web front-end technology in the C/C++
runtime environment, the developer can also use HVML as a general script
language in other scenarios.

In short, HVML provides a programming model that is different from traditional
programming languages. On the basis of data-driven, HVML provides a more
systematic and complete low-code (which means using less code to write programs)
programming method.

### 2.2) A Comprehensive Sample

下面的示例 HVML 代码生成的 HTML 页面，将在屏幕上展示三组信息：

1. 在页面顶端显示的系统状态栏，用于展示当前时间、WiFi 信号强度、电池电量信息等。这些信息将通过监听来自系统的状态事件动态更新。
1. 在页面中间位置展示用户列表，每个用户项包括用户名称、头像等信息。这些信息来自 JSON 表达的一个字典数组。当使用者点击了某个用户头像后，该 HVML 代码将装载一个模态对话框，其中展示该用户的更多信息。
1. 在页面底部展示一个搜索引擎连接。具体的搜索引擎根据系统所在的语言地区（locale）信息确定。

```html
<!DOCTYPE hvml>
<hvml target="html" lang="en">
    <head>
        <init as="users">
            [
                { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
                { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
            ]
        </init>

        <update on="$TIMERS" to="displace">
            [
                { "id" : "foo", "interval" : 500,  "active" : "yes" },
                { "id" : "bar", "interval" : 1000, "active" : "no" },
            ]
        </update>

        <init as="systemStatus" with=$STREAM.open('unix:///var/tmp/hibus.sock','default','hiBus') >
    </head>

    <body>
        <archetype name="user_item">
            <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
                <img class="avatar" src="$?.avatar" data-value="$?.id" />
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
            <img class="battery-status" />>
        </header>

        <ul class="user-list">
            <iterate on="$users" by="CLASS: IUser">
                <update on="$@" to="append" with="$user_item" />
                <except on="NoData">
                    <img src="wait.png" />
                </except>
                <except on="StopIteration">
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
            <test on="$_SYSTEM.locale" in='the-footer'>
                <match for="AS 'zh_CN'" exclusively>
                    <update on="$@" to="displace" with="$footer_cn" />
                </match>
                <match for="AS 'zh_TW'" exclusively>
                    <update on="$@" to="displace" with="$footer_tw" />
                </match>
                <match for="ANY">
                    <update on="$@" to="displace" with="$footer_def" />
                </match>
                <except on="NoData" raw>
                    <p>You forget to define the $global variable!</p>
                </except>
                <except on="KeyError">
                    <p>Bad global data!</p>
                </except>
                <except on="IdentifierError">
                    <p>Bad archetype data!</p>
                </except>
            </test>
        </footer>

        <observe on="$TIMERS" for="expired:foo" in="#the-header" >
            <update on="> span.local-time" at="textContent" with="$_SYSTEM.time('%H:%m')" />
        </observe>

        <choose on=$systemStatus.subscribe('@localhost/cn.fmsoft.hybridos.settings/powerd/BATTERYCHANGED')>
            <observe on="$databus" for="event:$?" in="#the-header" with=$onBatteryChanged />
                <test on="$?.level" in="#the-header">
                    <match for="GE 100" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-full.png" />
                    </match>
                    <match for="GE 90" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-90.png" />
                    </match>
                    <match for="GE 70" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-70.png" />
                    </match>
                    <match for="GE 50" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-50.png" />
                    </match>
                    <match for="GE 30" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-30.png" />
                    </match>
                    <match for="GE 10" exclusively>
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-10.png" />
                    </match>
                    <match for="ANY">
                        <update on="img.mobile-status" at="attr.src" with="/battery-level-low.png" />
                    </match>
                </test>
            </observe>
        </choose>

        <observe on=".avatar" for="clicked">
            <load on="user.hvml" with="{'id': $@.attr['data-value']}" as="modal" />
        </observe>
    </body>
</hvml>
```

Essentially, HVML is a new-style programming language with a higher level of
abstraction than common script languages such as JavaScript or Python.

下面用一个简单的例子来描述 HVML 的基本长相。有关 HVML 的详细规范，感兴趣的读者可点击文末的原文链接。

熟悉 HTML 读者一定会觉得上面的代码很眼熟。是的，和 HTML 类似，HVML 使用标签（tag）；但和 HTML 不同的是，HVML 是动态的，表述的是程序，而 HTML 是静态的，表述的是文档。

我们对照上述示例，介绍 HVML 的一些特点。

首先是数据驱动编程（data-driven programming）。通过基于数据的迭代、插入、更新、清除等操作，开发者不需要编写程序或者只要少量编写程序即可动态生成最终的 XML/HTML 文档。比如下面的上面示例代码中的 `iterate` 标签，就在`$users` 变量代表的数据（在 `header` 中使用 `init` 标签定义）上做迭代，然后在最终文档的 `ul` 元素中插入了若干 `li` 元素。而 `li` 元素的属性（包括子元素）由一个 `archetype` 标签定义，其中使用 `$？` 来指代被迭代的 `$users` 中的一个数据单元。

在上面的示例代码中，我们使用了系统内置变量 `$TIMERS` 来定义定时器，每个定时器有一个全局的标识符，间隔时间以及是否激活的标志。如果要激活一个定时器，我们只需要使用 HVML 的 `update` 标签来修改对应的键值，而不需要调用某个特定的编程接口。这是数据驱动编程的另一个用法——我们不需要为定时器或者其他的类似模块的操作提供额外的 API。

另外，在上面的示例代码中，我们通过 `observe` 标签观察新的数据或文档本身的变化以及用户交互事件，可实现 XML/HTML 文档或数据的动态更新。比如在最后一个 `observe` 标签中，通过监听用户头像上的点击事件来装载一个新的 `user.hvml` 文件，以模态对话框的形式展示对应用户的详细信息。

其次是彻底解除界面、交互和数据之间的耦合。通过 HVML 引入的编程模型和方法，用于表述界面的 XML/HTML 文档内容可完全由 HVML 生成和动态调整，这避免了在程序代码中直接操作文档的数据结构（即文档对象树，或简称 DOM 树），而程序只需要关注数据本身的产生和处理即可。这样，就实现了界面和数据的解耦。比如：

   - HVML 可在文档片段模板或者数据模板中定义数据和 DOM 元素之间的映射关系（如示例代码中的 `archetype` 或 `archedata` 标签），而无需编写额外的代码完成数据到 DOM 元素属性、内容等的赋值操作。
   - HVML 将错误和异常的展现和程序代码分离了开来，程序只要产生适当的错误或者异常（如示例代码中的 `error` 和 `except` 标签），而对错误或者异常的处理则直接在 HVML 中定义，这不仅仅将程序和界面隔离了开来，同时还提高了代码的可维护性。

再次是数据的 JSON 表达。HVML 对文档和数据的操作提供了一致接口。HVML 要求所有外部数据均使用 JSON 格式表述，JSON 格式是一种人机共读的数据表述形式，可在数值、字符串、数组、字典等基本数据单元的基础上表述复杂对象。由于 HTML/XML 文档片段（DOM 子树）可表述为 JSON 格式的数据，因此，HVML 亦可用于操作使用 JSON 表述的数据。在 HVML 中，我们还提供了对动态 JSON 对象的支持，我们可以使用外部脚本程序来实现自己的动态 JSON 对象，且可以在这些对象上执行类似函数调用一样的功能。

最后，HVML 通过动作标签（通常都是一些英文的动词，如 `init`、`update`、`iterate` 等）以及与之配合的介词或副词属性来定义动作标签所依赖的数据、目标操作位置以及执行条件来完成特定的文档操作。这和常见的编程语言有很大不同，HVML 的描述方式更加贴近自然语言，从而可以大幅降低学习门槛。

限于篇幅，我们不打算在本文中详细介绍 HVML，读者对 HVML 有个感性认识就可以了。有兴趣了解详细规范的读者，可以参阅文末的原文链接。不过要耐心点哦，定义一个完备、自恰的编程语言不是一件容易的事儿，所以要读，就要找个大段的时间，耐心点儿仔细地阅读。

### 2.3) The HVML Virtual Machine

#### 2.3.1) The execution model of HVML interpreter

#### 2.3.2) Flow control

#### 2.3.3) Handling of errors and exceptions

### 2.4) eJSON Evaluation Expressions

#### 2.4.1) The extended JSON

#### 2.4.2) eJSON Evaluation Expressions

#### 2.4.3) Complex eJSON Evaluation Expressions

### 2.5) Variables

#### 2.5.1) Context variables

#### 2.5.2) Static variables

#### 2.5.3) Temporary variables

#### 2.5.4) Life cycle of a variable

### 2.6) Closures


### 2.7) Coroutines

#### 2.7.1) Asynchrony and Concurrency

#### 2.7.2) Event-driven

#### 2.7.3) Observing a datum or a variable

#### 2.7.4) Executes a closure asynchronously

### 2.8) HVML Tags and Attributes

#### 2.8.1) Frame tags

#### 2.8.2) Template tags

#### 2.8.3) Data operation tags


#### 2.8.4) Stack operation tags


#### 2.8.5) Coroutine operation tags

#### 2.8.6) Event tags

## 3) Interop with System

### 3.1) Dynamic Objects and Predefined Static Variables

### 3.2) External Dynamic Objects

### 3.3) External Executors

### 3.4) Remote Data Fetcher

### 3.5) HVML Targets

#### 3.5.1) Target `void`

#### 3.5.2) Target `html`

#### 3.5.3) Target `xml`

### 3.6) HVML Renderers

#### 3.6.1) Headless Renderer

#### 3.6.2) PURCMC Renderer

#### 3.6.3) THREAD Renderer

## 4) Typical Applications

### 4.1) Use HVML to Govern GUIs

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

为满足以上的交互处理需求，我们使用 HVML 来描述这个界面的动态生成以及交互过程：

```html
<!DOCTYPE hvml>
<hvml target="xml">
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

        <archetype name="dir_entry">
            <item class="$?.type">$?.name</item>
        </archetype>

        <define as="fillDirEntries">
            <clear on="$@" />
            <choose on="$?" by="FUNC: DirEntries">
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
            <update on="$fileInfo" at=".selected_type .selected_name" with ["$?.type", "$?.name" ] />
        </observe>

        <observe on="#open" for="click">
            <test on="$fileInfo.selected_type">
                <match for="AS 'dir'" exclusively>
                    <init as="new_path">
                        "$fileInfo.curr_path{$2.name}/"
                    </init>

                    <call on="$fillDirEntries" with="$new_path" in="#entries" />
                    <update on="$fileInfo" at="property.curr_path" with="$new_path" />
                    <update on="#path" at="textContent" with="$new_path" />
                </match>
                <match for="AS 'file'" exclusively>
                    <exit with="$fileInfo">
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

其次，该代码使用了 `choose` 元素以及一个外部执行器（`FUNC: DirEntries`）来获得当前路径中的所有目录项。返回的结果数据大致为：

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

在上述代码中，外部选择器 `DirEntries` 的实现非常简单，就是列出给定路径下的目录项，并按照要求返回一个字典数组。使用 Python 实现时非常简单，所以这里略去不谈。

如果我们使用 HybridOS 中提到的直接执行本地系统命令的扩展 URL 图式（lcmd），我们甚至都不需要编写任何代码，而只需要使用 `init` 创建一个临时变量：

```html
    <init as="direntries" from="lcmd:///bin/ls" via="GET" with="{ "cmdLine": "ls $fileInfo.curr_path" }" temp>
        <iterate on="$?" in="#entries" by="RANGE: 0">
            <update on="$@" to="append" with="$dir_entry" />
        </iterate>
    </init>
```

或者，我们使用 `$FS` 预定义变量读取给定路径下的目录项：

```html
    <choose on=$FS.opendir($fileInfo.curr_path) >
        <iterate on=$? with=$?.read() >
            <update on="$@" to="append" with="$dir_entry" />
        </iterate>
    </choose>
```

如此，开发者不需要编写任何程序，即可实现一个简单的文件浏览和打开对话框。

显然，如果使用 HVML，将大大提高传统 GUI 应用的开发效率，缩短开发周期。当然，传统的 GUI 支持系统，需要提供基于 XML 的 UI 描述支持以及类似 CSS 的布局、样式、动画等的渲染效果支持。

### 4.2) Cloud Apps

HVML 的潜力绝对不止上述示例所说的那样。在未来，我们甚至可以将 HVML 代码运行在云端，通过云端控制设备上的界面显示，从而形成一个新的云应用解决方案。

我们假设一个智能手环上显示当前时间、当地气温、佩戴者的心跳信息和步数信息等信息，而这个智能手环通过 MQTT（一种轻量级消息通讯协议）和云端服务器交换信息，比如向云端服务器发送佩戴者的心跳和步数信息、地理位置信息，获得时间以及当前位置的气象条件等信息。在传统的实现方式中，我们一般需要开发一个在智能手环上运行的 GUI 系统，然后和云端通讯获得数据，界面的修改完全由设备端代码负责。如果要改变界面的样式，大部分情况下需要升级整个智能手环的固件（firmware）。

但如果我们使用 HVML，则可以通过云端来控制设备的界面显示。运行在云端的 HVML 代码如下所示：

```html
<!DOCTYPE hvml>
<hvml target="html" script="python">
    <head>
        <connect at="tcp://foo.bar/bracelet" as="braceletInfo" for="MQTT">

        <update on="$TIMERS" to="displace">
            [
                { "id" : "clock", "interval" : 1000, "active" : "yes" },
            ]
        </update>

        <link rel="stylesheet" type="text/css" href="/foo/bar/bracelet.css">
    </head>

    <body>
        <div class="clock" id="clock">
            <observe on="$TIMERS" for="expired:clock">
                <update on="#clock" at="textContent" with="$_SYSTEM.time('%H:%m')" />
            </observe>
        </div>

        <div class="temperature" id="temperature">
            <observe on="$braceletInfo" for="temperature">
                <update on="#temperature" at="textContent" with="$?.value ℃" />
            </observe>
        </div>

        <div class="heartbeat" id="heartbeat">
            <observe on="$braceletInfo" for="heartbeat">
                <update on="#heartbeat" at="textContent" with="$?.value BPM" />
            </observe>
        </div>

        <div class="steps" id="steps">
            <observe on="$braceletInfo" for="steps">
                <update on="#steps" at="textContent" with="$?.value" />
            </observe>
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

## 5) Open Source Implementation

For open source tools of HVML, please refer to the following repositories:

- HVML Documents: <https://github.com/HVML/hvml-docs>.
- PurC (the Prime hVml inteRpreter for C language): <https://github.com/HVML/purc>.
- PurC Fetcher (the remote data fetcher for PurC): <https://github.com/HVML/purc-fetcher>.
- PurCMC (an HVML renderer in text-mode): <https://github.com/HVML/purc-midnight-commander>.
- xGUI Pro (an advanced HVML renderer based on WebKit): <https://github.com/HVML/xgui-pro>.

### 5.1) PurC

### 5.2) PurC Fetcher

### 5.3) PurC Midnight Commander

### 5.4) xGUI Pro

## 6) Performance Testing

## 7) Development Experience

## 8) Related Work

## 9) The Conclusion

### 9.1) Simple Design

HVML defines the complete set of instructions for operating
an abstract stack-based virtual machine using only a dozen tags.
Each line of code has clear semantics through verb tags, preposition
attributes, and adverb attributes that conform to English expression habits.
This will help developers write program code with excellent readability.

### 9.2) Data-driven

On the one hand, HVML provides methods for implementing
functions by manipulating data. For example, we can use the update action to
manipulate a field in the timer array to turn a timer on or off without
calling the corresponding interface. On the other hand, the HVML language is
committed to connecting different modules in the system through a unified data
expression, rather than realizing the interoperation between modules through
complex interface calls. These two methods can effectively avoid the interface
explosion problem existing in traditional programming languages. To achieve
the above goals, HVML provides extended data types and flexible expression
processing capabilities on top of JSON, a widely used abstract data
representation.

### 9.3) Inherent Event-driven Mechanism

Inherent event-driven mechanism. Unlike other programming languages, the HVML
language provides language-level mechanisms for observing data, events, and
even observing changes in the result of an expression. On this basis,
developers can easily implement concurrency or asynchronous programming that
is difficult to manage in other programming languages without caring about
the underlying implementation details.

### 9.4) New Application Framework

When we used HVML to build the framework for GUI applications,
we got a totally different framework other than Java, C#, or Swift.

In a complete HVML-based application framework, a standalone UI renderer
is usually included. Developers write HVML programs to manipulate the page
content that describes the user interface, and the page content is finally
processed by the renderer and displayed on the screen. The HVML program runs
in the HVML interpreter, which can interact easily with the runtime environment
of other existing programming languages. The HVML program receives data or
events generated by other foreign programs or the renderer, and converts it
into the description of the UI or changes of UI according to the instructions
of the HVML program.

With this design, we separate all applications involving the GUI into two
loose modules:

- First, a data processing module independent of the user interface, developers
can use any programming language and development tools they are familiar with
to develop this module. For example, when it comes to artificial intelligence
processing, developers choose C++ or Python; in C++ code, apart from loading
HVML programs, developers do not need to consider anything related to interface
rendering and interaction, such as creating a button or clicking a menu item.
Developers only need to prepare the data needed to render the user interface
in the C++ code, and these data are usually represented by JSON.

- Second, one or more programs written in the HVML language (HVML programs) to
complete the manipulation of the user interface. The HVML program generates
the description information of the user interface according to the data provided
by the data processing module, and updates the user interface according to the
user's interaction or the calculation results obtained from the data processing
module, or drives the data processing module to complete certain tasks according
to the user's interaction.

In this way, the HVML application framework liberates the code for manipulating
interface elements from the tranditional design pattern of calling interfaces
such as C/C++, Java, C#  and uses HVML code instead. HVML uses a tag language
similar to HTML to manipulate interface elements. By hiding a lot of details,
it reduces the program complexity caused by directly using low-level
programming languages to manipulate interface elements.

Through HVML's unique application framework, we
delegate performance-critical data processing to an external program or server,
and the interaction with the user is handled by an independent renderer, and
the HVML program is responsible for gluing these different system components.
On the one hand, HVML solves the problem of difficult and efficient
interoperability between system components developed in different programming
languages, so that the advantages of each component can be fully utilized and
the value of existing software assets can be protected; on the other hand,
once the application framework provided by HVML is adopted, we can minimize
the coupling problem between different components.

## Acknowledgements

## References

## Authors

## Tradmarks

1) `HVML` is a registered tradmark of [FMSoft Technologies] in China and other contries or regions.

![HVML](https://www.fmsoft.cn/application/files/8116/1931/8777/HVML256132.jpg)

2) `呼噜猫` is a registered tradmark of [FMSoft Technologies] in China and other contries or regions.

![呼噜猫](https://www.fmsoft.cn/application/files/8416/1931/8781/256132.jpg)

3) `Purring Cat` is a tradmark of [FMSoft Technologies] in China and other contries or regions.

![Purring Cat](https://www.fmsoft.cn/application/files/2816/1931/9258/PurringCat256132.jpg)

4) `PurC` is a tradmark of [FMSoft Technologies] in China and other contries or regions.

![PurC](https://www.fmsoft.cn/application/files/5716/2813/0470/PurC256132.jpg)

[Beijing FMSoft Technologies Co., Ltd.]: https://www.fmsoft.cn
[FMSoft Technologies]: https://www.fmsoft.cn
[FMSoft]: https://www.fmsoft.cn
[HybridOS Official Site]: https://hybridos.fmsoft.cn
[HybridOS]: https://hybridos.fmsoft.cn

[HVML]: https://github.com/HVML
[MiniGUI]: http:/www.minigui.com
[WebKit]: https://webkit.org
[HTML 5.3]: https://www.w3.org/TR/html53/
[DOM Specification]: https://dom.spec.whatwg.org/
[WebIDL Specification]: https://heycam.github.io/webidl/
[CSS 2.2]: https://www.w3.org/TR/CSS22/
[CSS Box Model Module Level 3]: https://www.w3.org/TR/css-box-3/

[Vincent Wei]: https://github.com/VincentWei

[React.js]: https://reactjs.org
[Vue.js]: https://vuejs.org

[HVML Specifiction V1.0]: https://github.com/HVML/hvml-docs/blob/master/zh/hvml-spec-v1.0-zh.md
[HVML Predefined Variables V1.0]: https://github.com/HVML/hvml-docs/blob/master/zh/hvml-spec-predefined-variables-v1.0-zh.md

