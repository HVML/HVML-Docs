# HVML Specification

Subject: HVML Specification  
Version: 1.0-RCb  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: July, 2020  
Last Modified Date: Apr. 30, 2023  
Status: Release Candidate  
Release Name: 硕鼠  
Language: Chinese

*Copyright Notice*

Copyright &copy; 2021, 2022, 2023 Vincent Wei 
Copyright &copy; 2021, 2022, 2023 Beijing Feynman Software Technology Co., Ltd.
All rights reserved

This document is not governed by the HVML-related software open source license.

The copyright owner discloses the purpose of this document, which is used to explain HVML-related design principles or related specifications to developers. Without the written permission of the copyright owner, no one may reproduce or distribute all or part of this document, or use the technical ideas described in this document to apply for patents, write academic papers, etc.

For a detailed list of registered trademarks or trademarks of the copyright owners mentioned in this article, please refer to the end of the document.

[TOC]

## 1 Introduction

### 1.1) Background Technology

The background technologies involved in this article and their latest specifications are as follows:

- HTML and its specifications. Specifications and standards such as HTML and CSS are developed by the W3C <https://www.w3.org> organization to standardize the writing and rendering behavior of web page content. The key specifications are as follows:
    * HTML: Hypertext Markup Language, a standard for expressing the content structure of web pages. HTML latest specification: <https://html.spec.whatwg.org/>.
    * CSS: Cascading Style Sheets, used to define the specifications of HTML page element layout, rendering effects, etc. After CSS 2.2 <https://www.w3.org/TR/CSS22/>, the CSS specification began to be divided into modules, and each module evolved separately. Currently, it generally supports Level 3. The progress of the specification of CSS modules can be seen at the following webpage: <https://drafts.csswg.org>.
    * JavaScript/ECMAScript: A scripting programming language that conforms to the ECMAScript specification, originally designed by Netscape for browsers to manipulate the content and rendering behavior of HTML pages. And it is now under the responsibility of the European Computer Manufacturers Association and the International Organization for Standardization Develop relevant standards. The latest standard is ECMA-262: <http://www.ecma-international.org/publications/standards/Ecma-262.htm>.
    * DOM: Document Object Model, used for the internal expression of XML/HTML document structure. An XML/HTML document will be parsed by an XML/HTML parser and generate a DOM tree. Each element in the XML/HTML document constitutes an element node on the DOM tree. And each element's sub-elements, attributes, text content and so on, constitute the child nodes of this element node. The latest specification for DOM can be found at: <https://dom.spec.whatwg.org/>.
    * JSON: JavaScript Object Notation is a lightweight information interchange format. Originally it is used for string representation of JavaScript objects, which is easy to use by JavaScript script code. And it is now widely used for data exchange between different programming languages or software modules. For a description of JSON, please refer to: <https://json.org/>.
- User Agent is a term in the HTML specification, which is used to refer to a computer program that can parse W3C specifications such as HTML and CSS, and render the content of HTML documents, then presenting them to users and realize user interaction. The browser we are familiar with is the user agent. But the user agent is not limited to the browser. It can be a software component or an application framework. For example, the software components embedded in email client programs to parse and render HTML-formatted emails are essentially HTML user agents.
- XML: The Extensible Markup Language is a simple text format developed by the W3C organization to express structured information. Compared to HTML, XML uses a similar structure, but is stricter and more general. XML is one of the most widely used formats today for sharing structured information, whether between programs, between people, between computers and people, locally or across networks. An introduction and specification of XML can be found at: <https://www.w3.org/standards/xml/>.
- Scripting Programming Language: It refers to a computer programming language similar to JavaScript, usually interpreted and executed, with dynamic features. In addition to JavaScript, common scripting languages include Python, Lua, PHP, etc.
- Advanced Programming Languages: Programming languages, like C, C++, Java and C#, are usually compiled and executed, running directly on computer hardware or virtual machines.
- SQL: Structured Query Language, a data manipulation language for relational databases, currently almost all relational databases support SQL. Unlike general programming languages, SQL has non-procedural features, and the basic SQL code does not include flow control statements such as if-else.

### 1.2) Questions

With the development of Internet technology and applications, the Web front-end development technology developed around HTML/CSS/JavaScript is developing rapidly, and it can even be described as "a thousand miles a day". Five years ago, front-end frameworks based on jQuery and Bootstrap were popular. And since 2019, frameworks based on virtual DOM technology have been favored by front-end developers, such as the famous [React.js], [Vue.js], etc. It is worth noting that WeChat applets, quick apps, etc. also use this virtual DOM technology to build application frameworks.

The so-called "virtual DOM" means that the front-end application creates and maintains a virtual document object tree through JavaScript, and the program script does not directly operate the real DOM tree. In the virtual DOM tree, some process control based on data is realized through some special attributes, such as conditions, loops, etc.

On the other hand, a large number of graphical user interface (GUI) applications are still being developed in programming languages such as C, C++, Java, and C#. The program framework of these traditional GUI applications is nothing more than directly calling the interface provided by C/C++ or other programming languages, and completing the creation of GUI elements in an event loop to respond to user interaction. In order to facilitate the development of GUI applications, there are many similar GUI Toolkit libraries in the industry, such as Motif running on Unix graphics workstations in the early days, Win32 and MFC on Windows, Gtk+ developed on Linux desktops, cross-platform Qt, for embedded MiniGUI and so on.

These GUI Toolkit libraries provide some help in improving the development efficiency of graphical user interface applications, but limited to the expressive ability of programming languages, developers often fall into a large number of details of manipulating GUI elements and their attributes. Even if there is a visual interface designer to help developers, its development efficiency is difficult to compare with the web front-end technology mentioned above.

So, can we take web front-end technology beyond the browser? For example, can C, C++, Java programs, and even scripting languages such as Python easily use Web front-end technology to develop GUI applications?

In order to introduce Web front-end technology into the development of general GUI applications, the open source community has also done some exploratory work, such as the Electron open source project, which packs Chromium + Node.js together to let the Web backend run on the local machine. This facilitates the development of local GUI applications. But Electron's software stack is too complex, which limits its application areas.

In addition, the front-end framework represented by React.js and Vue.js has achieved great success. But there are the following defects and deficiencies:

1. These technologies are based on existing mature Web standards, and require browsers that fully support relevant front-end specifications to run (or, only run in browsers). And it is difficult to integrate with existing C/C++-based Integration of functional modules for programming language development.
1. Due to inherent limitations, the use of JavaScript language in web pages has always had the following problems criticized by developers:
    - Poor security: On the one hand, code related to business logic is executed on the end user's browser, and anyone can see the source code of the JavaScript program, which may leak sensitive information; on the other hand, malicious code may be executed on the end user's browser, This leads to the leakage of user sensitive data.
    - Negative impact on performance: Running a large amount of JavaScript code related to business logic in the browser will cause the problem of page rendering and business logic competing for processor resources, which is one of the reasons why there is a significant difference between the page rendering capability of browsers and the interface developed by traditional GUI.
    - Lower code maintainability: Developers often randomly embed scattered JavaScript codes in different places on the webpage, which reduces the maintainability of the entire application system code.
1. These technologies implement data-based conditional and loop flow control by introducing virtual attributes such as `v-if`, `v-else`, `v-for`, which split the logic of the code and destroy the readability of the code . As an example below:

```html
<div v-if="Math.random() > 0.5">
  Now you see "{{ name }}"
</div>
<div v-else>
  Now you don't
</div>
```

### 1.3) Purpose

During the development of [HybridOS] (combined operating system), [Vincent Wei] (https://github.com/VincentWei) proposed a complete, general-purpose, and easy-to-learn new programming language called HVML. HVML is the abbreviation of Hybrid Virtual Markup Language, and the Chinese name is "Hulumao". HVML is pronounced /'huːmeil/, which sounds like "虎妹儿" in Mandarin.

We define HVML as a Programmable Markup Language. Like HTML, HVML uses a markup language to define program structure and data. But unlike HTML, HVML is programmable and dynamic. HVML realizes the dynamic generation and updating of XML/HTML documents through a limited number of action tags and expressions that can be used to define attributes and contents. The combined method provides strong technical support for these programming languages to use Web front-end technology outside the browser. From this perspective, HVML can also be regarded as a glue language.

In essence, HVML provides a new idea to solve the previous problem: First, introduce Web front-end technologies (mainly DOM, CSS, etc.) into other programming languages instead of replacing other programming languages with JavaScript. Second, use an HTML-like markup language to manipulate elements, attributes, and styles in your document, rather than JavaScript. In addition, in the process of designing HVML, we intentionally use the concept of data-driven, so that HVML can be very conveniently combined with other programming languages and various network connection protocols, such as data bus, message protocol, etc. In this way, whichever programming language the developer is familiar with, he uses this programming language to develop the non-presentation and interactive parts of the application, and all functions related to presentation and interaction are handed over to HVML for processing. The flow of data is driven, and HVML provides the ability to abstract the data flow process.

Although the original goal of designing HVML is to improve the efficiency of graphical user interface (GUI) application development, it can actually be used in more general scenarios-as long as the output of the program can be abstracted as one or more tree structures. HVML can be used; we can even use HVML like an ordinary scripting language, and use HTML and CSS to describe the interactive interface of a character terminal-oriented command-line application.

The main features of HVML are:

1. Descriptive syntax: Through verb labels, preposition attributes, and adverb attributes that conform to the natural language expression habits, HVML makes each line of code have clear semantics, which can help developers write program code with better readability.
1. Minimalist design: HVML defines complete instructions for manipulating documents, data, and an abstract stack virtual machine using just over twenty unique tags.
1. A higher level of abstraction: Developers can use HVML to accomplish more with less code, without having to worry too much about technical details.
1. Data-driven: On the one hand, HVML provides methods for manipulating data to implement functions. For example, we can use the update action to manipulate a field in the timer array to turn on or off a timer without calling the corresponding interface. On the other hand, the HVML language is committed to connecting different modules in the system through a unified data expression, rather than through complex interface calls to achieve interoperability between modules. These two methods can effectively avoid the interface explosion problem existing in traditional programming languages. In order to achieve the above goals, HVML provides extended data types and flexible expression processing capabilities based on JSON, a widely used abstract data expression method.
1. Event-driven: Unlike other programming languages, the HVML language provides language-level mechanisms for observing specific events or even observing changes in the result of an expression. On this basis, developers can easily implement asynchronous or concurrent programming that is difficult to manage in other programming languages without caring about the underlying implementation details. At the same time, HVML supports modern programming techniques such as coroutines and closures.
1. Flexible application framework: Through HVML, developers can hand over performance-critical data processing to external program modules or servers, interact with users by independent renderers, and HVML programs are responsible for gluing these different system components. On the one hand, HVML solves the problem that it is difficult to efficiently interoperate between system components developed in different programming languages, so that the advantages of each component can be fully utilized and the value of existing software assets can be protected; on the other hand, the application framework provided by HVML is adopted Developing applications can maximize the decoupling between different components.

In short, HVML provides a programming model different from traditional programming languages. Based on the idea of data-driven, HVML provides a more systematic and complete low-code (low code, refers to using less code to write programs) programming method.

HVML is the application programming language of choice for HybridOS.

### 1.4) Application Framework

The application framework formed around HVML is significantly different from traditional GUI application frameworks and Web front-end technologies. For traditional GUI applications, the code design pattern is nothing more than directly calling the interface provided by C/C++ or other programming languages, and completing the work of creating interface elements and responding to user interaction in an event loop. The biggest difference between Web front-end technology and traditional GUI applications lies in the descriptive HTML and CSS languages, but the program framework is essentially the same-event loop, and JavaScript language must be used.

But HVML provides a completely different application framework.

In a complete HVML-based application framework, it usually includes a user interface renderer (UI renderer) that runs independently. Developers write HVML programs to manipulate the page content that describes the user interface, and the page content is finally processed by the renderer and displayed on the screen. The HVML program runs in the HVML interpreter and can be combined with the runtime environment of other existing programming languages to receive data generated by other programming language programs and convert it into a user interface description according to the instructions of the HVML program information or change information. Through this design, we separate all applications related to GUI into two loose modules:

First, a data processing module that has nothing to do with the user interface. Developers can use any familiar programming language and development tools to develop this module. For example, when it comes to artificial intelligence processing, developers choose Python; in Python code, in addition to loading HVML programs, developers do not need to consider anything related to interface rendering and interaction, such as creating a button or clicking a menu to complete For this kind of work such as a certain work, developers only need to prepare the data required to render the user interface in the Python code, and these data are usually expressed in descriptive languages such as HTML/XML/CSS. We collectively refer to these data processing modules as "external programs".

Second, one or more programs written in the HVML language (HVML programs) are used to complete the manipulation of the user interface. The HVML program generates user interface description information based on the data provided by the data processing module, and updates the user interface according to user interaction or calculation results obtained from the data processing module, or drives the data processing module to complete certain tasks according to user interaction.

In this way, the HVML application framework frees the code for manipulating interface elements from the original design mode of calling interfaces such as C, C++, Java, and C#, and uses HVML code to process them instead. HVML uses a tag language similar to HTML to manipulate interface elements. By hiding a large number of details, it reduces the program complexity caused by directly using high-level programming languages to manipulate interface elements.

Usually, we design the interface renderer as a dumb device like a character console, so that we can free the HVML program and other modules of the application from the details of controlling the display behavior of interface elements. For example, in the development of the character terminal program, we can use some escape control instructions to set the color of the character, whether to blink, etc., and the character terminal program does not need to contain any codes to deal with the character color and blinking - because these details The character console (maybe It is hardware, or it may be a pseudo-terminal program) to help us handle it silently. HVML's interface renderer also follows the same design idea. After the HVML program creates a button, as for what the button looks like and how the user interacts with it, all these don't need to be worried about by the HVML program-everything is given by the renderer. It operates under the control of a certain descriptive language (such as HTML, CSS). This brings another benefit, since the interface renderer does not contain any application running logic code and sensitive data, to some extent, this brings about an increase in security.

In the HVML application framework, an application can start multiple parallel tasks at the same time. We call these parallel tasks "runners" (Note: Different runners may be developed using different programming languages). A walker developed in the HVML language runs in a separate instance of the HVML interpreter. An interpreter instance can be a system process running independently, or it can be a separate thread in the interpreter process; this depends on the specific implementation of the interpreter. But no matter how the interpreter is implemented, HVML requires that a single walker can load multiple HVML programs to run at the same time, and the interpreter should always execute these HVML program instances loaded by the same walker in the form of independent coroutines. Therefore, we use the term "coroutine" in this document to refer to a running instance of an HVML program.

This design brings the following benefits:

1. Compared with the concurrency mechanism provided by threads or processes, coroutines provide a low-cost mechanism for achieving concurrency. Multiple coroutines created by the same walker belong to the same operating system task and run in independent interpreter instances; these coroutines are executed alternately in a single operating system task (thread or process) under the coordination of the interpreter, so coroutines The data exchange between does not need to consider the race-condition problem, almost all lock-free operations, which reduces the cost of processing concurrency, thus improving the overall performance.
1. By separating the code responsible for different business logic into different coroutines, we can improve the modularity of the entire project, thereby improving the testability and maintainability of the project, and then improving the software quality of the entire project.

With such an application framework design, HVML allows almost all programming languages, whether traditional programming languages such as C/C++ or scripting languages such as Python, to use a unified model to develop GUI applications.

## 2) Detailed Explanation of HVML

For convenience of description, this document uses the following terms:

1. `data`: Refers to data that can be described using a notation such as JSON. It can be used to describe basic data such as text and values, and can also be used to describe abstract data such as arrays, key-value pairs, and trees.
1. `data item or datum` or `data member`: For arrays, each array cell is a data item; for object data, a key-value pair is a data item. To prevent confusion, we avoid using the word `element` to refer to data items or data members.
1. `Tag`: In HTML/XML/HVML documents, the element type name used to define an element node.
1. `Destination document`: It refers to XML/HTML documents generated by HVML programs.
1. `Element`. It refers to the element node defined by a tag in the document object model; a document element can contain one or more attributes and attribute values, and can also contain content; an element can contain text content, Data content or single or multiple child elements defined using tags.
1. `Document fragment`.: It refers to a fragment in an XML/HTML document that can be cloned as a template to a specified location in the target document.
1. `text content`: It refers to the content of an element defined using text.
1. `data content`: It refers to the content of an element defined using an abstract data representation.
1. `Element collection`: It refers to zero or more elements selected using a selector. The term "set" is avoided here to avoid confusion with the `set` data type.
1. `program`: A section or set of executable code collections. Unless otherwise stated, this document refers specifically to HVML programs.
1. `Interpreter`: Unless otherwise specified, this document specifically refers to the program used to parse and execute HVML programs.
1. `coroutine`: Unless otherwise specified, this document specifically refers to a running HVML program instance.
1. `Code point`: It refers to a Unicode code point represented as `U+` and four to six ASCII uppercase hexadecimal digits in the range U+0000 to U+10FFFF, inclusive. Sometimes, we include the name of the code point and the rendered form of the code point enclosed in parentheses after the code point, and the rendered form of the code point is highlighted or bolded. For code points that cannot be rendered, this document will give their code point names. More terminology related to Unicode characters is explained below:
    - The name of the code point is defined by the Unicode standard and expressed in ASCII uppercase, such as `CR` for Carriage Return (carriage return).
    - `surrogate` is a code point in the range U+D800 to U+DFFF, inclusive.
    - A code point that is not a substitute is called `scalar value`.
    - Code points in the range U+FDD0 to U+FDEF (inclusive), and the following code points are called `noncharacters`:
       + U+FFFE, U+FFFF
       + U+1FFFE, U+1FFFF
       + U+2FFFE, U+2FFFF
       + U+3FFFE, U+3FFFF
       + U+4FFFE, U+4FFFF
       + U+5FFFE, U+5FFFF
       + U+6FFFE, U+6FFFF
       + U+7FFFE, U+7FFFF
       + U+8FFFE, U+8FFFF
       + U+9FFFE, U+9FFFF
       + U+AFFFE, U+AFFFF
       + U+BFFFE, U+BFFFF
       + U+CFFFE, U+CFFFF
       + U+DFFFE, U+DFFFF
       + U+EFFFE, U+EFFFF
       + U+FFFFE, U+FFFFF
       + U+10FFFE, U+10FFFF.
    - `ASCII codepoints` are codepoints in the range U+0000 NULL to U+007F DELETE (inclusive).
    - `ASCII tab or newline` means U+0009 TAB, U+000A LF or U+000D CR.
    - `ASCII white space character` means U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, or U+0020 SPACE. Also often referred to simply as `blank character`.
    - `C0 control characters` are code points in the range U+0000 NULL to U+001F INFORMATION SEPARATOR ONE, inclusive.
    - `C0 control character or space` refers to the C0 control character or U+0020 SPACE.
    - `control character` means a `C0 control character` or a code point in the range U+007F DELETE to U+009F APPLICATION PROGRAM COMMAND (inclusive).
    - `ASCII digits` are characters in the range U+0030 (`0`) to U+0039 (`9`), inclusive.
    - `ASCII uppercase hexadecimal digit` is either an ASCII digit or a code point in the range U+0041 (`A`) to U+0046 (`F`), inclusive.
    - `ASCII lowercase hexadecimal digit` is either an ASCII digit or a code point in the range U+0061 (`a`) to U+0066 (`f`), inclusive.
    - `ASCII hex digit` is either an ASCII uppercase hex digit or an ASCII lowercase hex digit.
    - `ASCII uppercase` is a code point in the range U+0041 (`A`) to U+005A (`Z`), inclusive.
    - `ASCII lowercase letter` is a code point in the range U+0061 (`a`) to U+007A (`z`), inclusive.
    - `ASCII letter` is either an ASCII uppercase letter or an ASCII lowercase letter.
    - `ASCII alphanumeric` is either an ASCII number or an ASCII letter.
    - `Unihan ideographic characters` are code points in the following ranges:
       + U+4E00 through U+9FFC (inclusive)
       + U+F900 to U+FAD9 (inclusive)
       + U+3400 through U+4DBF (inclusive)
       + U+20000 through U+2A6DD (inclusive)
       + U+2A700 through U+2B734 (inclusive)
       + U+2B740 through U+2B81D (inclusive)
       + U+2B820 through U+2CEA1 (inclusive)
       + U+2CEB0 to U+2EBE0 (inclusive)
       + U+2F800 through U+2FA1D (inclusive)
       + U+30000 through U+3134A (inclusive)

For example, the code point of the emoji 🤔 is U+1F914, which can be expressed as U+1F914 (🤔) or U+1F914 THINKING FACE (🤔).

### 2.1) Basic Principles

Before understanding the design details of HVML in detail, we describe the key technical features of HVML through some code snippets, so that readers can have a quick overview of it.

The First is descriptive syntax.

HVML uses an XML-like syntax to define program structure and write code. HVML defines a small number of more than ten action tags, which can be used to define variables, manipulate data or control the execution path of the program. In conjunction with these action tags, HVML uses prepositional attributes and adverb attributes to define the source data, target data, and execution conditions that the action depends on, so as to obtain a program expression and writing effect that is closer to natural language. On the one hand, this reduces the learning threshold for developers, and on the other hand, it improves the readability of the code.

For example, the following HVML snippet defines an empty array named `emptyArray` and an empty object named `emptyObject` using the `init` tag:

```hvml
<init as 'emptyArray' with [] />
<init as 'emptyObject' with { } />
```

The following HVML snippet still uses the `init` tag, but by using an additional attribute defines a collection whose members are derived from an array of objects (JSON representation) defined by the content of the `init` element, but added to the collection The members of will maintain the uniqueness of the `id` key value; that is, in the object array defined by the content, existing members with duplicate `id` key values will be overwritten by new members. This is achieved by the key name `id` specified by the adverb attribute `uniquely` and the preposition attribute `against`.

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

In the above `init` element, we can also use the `from` attribute to specify an external URL to get data from an external data source instead of hardcoding the data into the code:

```hvml
<init as 'users' from 'https://foo.bar.com/users/$SYS.locale' uniquely against 'id' />
```

If the developer wants the process of loading data from an external data source to be completed asynchronously, we only need to add another adverb attribute `async`:

```hvml
<init as 'users' from 'https://foo.bar.com/users/$SYS.locale' uniquely against 'id' async />
```

This syntax also allows us to mix external tags to define the structure of HVML programs by assigning a uniform action to unknown non-HVML tags. For example, the following code generates an even-numbered list defined by the HTML `ul` and `li` tags through the `iterate` element:

```hvml
<ul>
    <init as "evenNumbers" with [ ] temp >
        <iterate on 0 onlyif $L.lt($0<, 100) with $DATA.arith('+', $0<, 2L) nosetotail >
            <li>$?</li>
        </iterate>
    </init>
</ul>
```

The second is flexible expressions.

Based on the widely used JSON representation method, HVML enables dynamic processing capabilities and the ability to parameterize data representation. HVML extends the JSON representation method to support more data types, and defines the method of obtaining data from the underlying system or implementing a certain function by using dynamic values and native entities. Flexible expression evaluation capabilities. This can help us take advantage of existing system capabilities, and can also help developers quickly expand the functions and capabilities of HVML programs.

For example, in the following HVML code snippet, the first two characters of the system locale string (such as `zh_CN`) are taken as the result by the expression `$STR.substr($SYS.locale, 0, 2)`, and `lang` is set Attribute value (`zh`) for this attribute:

```hvml
<hvml target="html"
         lang="$STR.substr($SYS.locale, 0, 2)">
     ...
</hvml>
```

HVML also supports compound expressions (surrounded by `{{ ... }}`) with simple logical processing capabilities. For example, the above function of setting the language attribute of the target document, if it is passed in through `lang` of the request parameter, the language specified in the request parameter will be used first:

```hvml
<hvml target="html"
         lang="{{ $REQ.lang || $STR.substr($SYS.locale, 0, 2) }}" silently>
     ...
</hvml>
```

For another example, the following code implements the function similar to the C language `(x > y) ? big = x : big = y` statement:

```hvml
<init as "big" with {{ $L.gt($x, $y) && $x || $y }} temp />
<init as "small" with {{ $L.lt($x, $y) && $x || $y }} temp />
```

The third is data-driven programming.

In HVML, we advocate the structure of organizing programs around the data to be processed, such as selecting data, iterating over data, performing sorting or reducing operations, observing changes in data, etc., and even we manipulate the implementation of a function by changing the data . For example, to add a timer, we don't need to call a certain programming interface, but add a new data item in a collection. We call this programming method data-driven programming.

For example, the following HVML snippet uses the `update` action tag, adds an active timer, and then uses `choose` and `update` to disable it:

```hvml
     <!-- Add a timer with identifier `foo`, interval 3000 ms, active state -->
     <update on "$TIMERS" to "append">
         { "id" : "foo", "interval" : 3000, "active" : "yes" }
     </update>

     ...

     <!-- invalidate the timer with identifier `foo` -->
     <choose on "$TIMERS" by "FILTER: AS 'foo'">
         <update on $? at ".active" with "no" />
     </choose>
```

The Fourth are template application and unified document or data expression.

By using the template described by the parameterized eJSON syntax, the content of the target document used to express the tree structure can be generated and updated by the HVML program, which avoids calling specific interfaces in the program code to modify the target document, and the HVML program only needs to focus on the data itself generation and processing. In this way, the decoupling of interface and data is realized. In addition, HVML provides consistent operation actions for document and data operations. Therefore, the action elements used by HVML for operating data can be used not only for operating data, but also for operating target documents.

For example, the following HVML program fragment uses the `archetype` element to define a template, and then uses the `iterate` and `update` elements to process the data in the `users` array into a fragment of the target document through template replacement, and then append it to In the target document:

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

The fifth is unique stack VM.

HVML programs are executed on an abstract stack virtual machine. After an HVML program is parsed, a vDOM (virtual DOM) tree representing the program structure is generated, and the interpreter executes each element on the vDOM in depth-first order starting from the root element. Every time a descendant element is executed, a new stack frame will be pushed on the execution stack of the virtual machine until the leaf element of vDOM. At this time, after the interpreter executes the leaf element, it will pop the last stack frame, the previous stack frame becomes the last stack frame, and then try to execute the next sibling element of the corresponding element of the stack frame. On the stack virtual machine of HVML, we can implement an efficient data management model. Some data exists as intermediate data when performing operations and will be automatically released. The other part of data is maintained in the stack frame, so that these data can be automatically allocated and released. Data, only a small part of it exists in static form. With such a management mechanism, we don't need to use an expensive garbage collector in the interpreter. In addition, based on dynamically replaceable operation groups, HVML provides the function of executing or invoking operation groups in place, and implements closure-like features.

For example, the following HVML code snippet demonstrates the ability to perform different groups of operations in-place depending on the current target document type:

```hvml
<!-- This element defines an action group that outputs an HTML fragment. -->
<define as "output_html">
     <h1>HVML</h1>
     <p>$?</p>
</define>

<!-- This element defines an action group that prints text to the system's standard output. -->
<define as "output_void">
     <inherit>
         $STREAM.stdout.writelines($?)
     </inherit>
</define>

<!-- This element performs different groups of operations in-place based on the value of the `target` attribute of the current `hvml` element. -->
<include with ${output_$CRTN.target} on $T.get('Hello, world!') />
```

The sixth is built-in event-driven.

HVML provides visibility into data, variables, and expressions at the language level. With just one `observe` element, we can observe a specific event on a piece of data, a change in the state of a variable, or even a change in the value of an expression.

For example, the following code snippet observes the expiration event of a timer with identifier `foo`:

```hvml
<observe on "$TIMERS" for "expired:foo">
     ...
</observe>
```

For another example, the following code snippet binds an expression to a variable so that changes in the value of the expression can be observed:

```hvml
<bind on $SYS.time as "rtClock" />

<observe on $rtClock for 'change'>
    ...
</observe>
```

Since `$SYS.time` returns a Unix timestamp value in seconds, the group of operations defined by the `observe` element will be executed every second.

The seventh is easy to implement asynchronous and concurrent programming.

As mentioned earlier, loading data from external data sources, starting sub-coroutines, and initiating requests can all be performed asynchronously. To initiate an asynchronous operation, you only need to use the `async` adverb attribute in elements such as `init` and use the `observe` element to observe events on variables. As shown in the code below:

```hvml
<init as "users" from "http://foo.bar.com/get_all_users" async />

<archetype name="user_item">
     <li class="user-item">
         <img class="avatar" src="" />
         <span></span>
     </li>
</archetype>

<ul class="user-list">
     <img src="wait. png" />
</ul>

<!-- When we get a `change:attached` event on the users variable,
      Indicates that the asynchronous operation has completed and its data has been bound to the users variable. -->
<observe against "users" for "change:attached" in "#user-list">
     <clear on $@ />
     <iterate on $users>
         <update on $@ to 'append' with $user_item />
     </iterate>
</observe>
```

Based on the stack virtual machine, HVML allows multiple HVML programs to run simultaneously on a virtual machine, and requires the interpreter to use coroutines to manage multiple instances of HVML programs running simultaneously on the same virtual machine. At the same time, HVML allows concurrent calls to groups of operations to execute a piece of code on another virtual machine instance. These mechanisms can help developers easily implement asynchronous and concurrent programming, while in other programming languages, asynchronous and concurrent programming usually requires sufficient skills to be well controlled.

For example, the following code snippet calls the `collectAllDirEntriesRecursively` operation group asynchronously and concurrently. This operation group recursively traverses the specified directory, collects all directory entries under it, and then uses `observe` to observe the status of this concurrent call. Obviously, this group of operations is a time-consuming operation. Before the operation group returns the result, the caller can continue to execute and complete other work.

```hvml
     <call as "my_task" on $collectAllDirEntriesRecursively with "/" within "myRunner" concurrently asynchronously />
     <observe on "$my_task" for "callState:success">
         <iterate on $? in "#entries" by "RANGE: FROM 0">
             <update on $@ to "append" with "$dir_entry" />
         </iterate>
     </observe>
```

HVML also allows two coroutines to send requests to each other. And the two coroutines can be in different virtual machine instances, which provides a unified and efficient communication mechanism across coroutines and virtual machines.

In addition, HVML requires the interpreter to provide the ability to evaluate again, so that when evaluating expressions, the execution of the current coroutine can be blocked as needed. And when the corresponding condition arrives Wake up the coroutine, and then it will evaluate the expression again to obtain the desired result. This helps to achieve a finer-grained coroutine scheduling capability, and provides support for mechanisms such as channels (similar to the Go language), thereby enabling a simple and efficient inter-coroutine communication mechanism.

For example, in the following HVML program, when two compound expressions are evaluated, the `$SYS.sleep` method will block the current coroutine, so that the virtual machine can be released and other coroutines can continue to execute:

```hvml
<hvml target="void">
    <body>

        <load from "#repeater" onto '_null' async />

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

The program first loads another ontology asynchronously and executes it in a sub-coroutine. The sub-coroutine outputs a line of information every second. And the main coroutine will be executed by `$SYS.sleep immediately after outputting `I will sleep 5 seconds`. (5)` Blocking. When the five seconds expire, the main coroutine will be woken up by the scheduler and continue execution. At this point, the above expression will be re-evaluated, but continue from where `$SYS.sleep(5)` is. Thus, the output of the above program is roughly:

```
COROUTINE-3: 2022-09-01T14:50:40+0800: I will sleep 5 seconds
COROUTINE-4: 2022-09-01T14:50:40+0800
COROUTINE-4: 2022-09-01T14:50:41+0800
COROUTINE-4: 2022-09-01T14:50:42+0800
COROUTINE-4: 2022-09-01T14:50:43+0800
COROUTINE-4: 2022-09-01T14:50:44+0800
COROUTINE-3: 2022-09-01T14:50:45+0800: I am awake.
```

The eighth is dynamics.

In HVML programs, variable names, expressions, operation groups, procedures, etc. can be dynamically generated. And we can even remove a variable.

The following code loads a dynamically generated HVML program using `load` element:

```hvml
<init as 'request'>
     {
         hvml: '<hvml target="html"><body><h1>$REQ.text</h1><p>$REQ.hvml</p></body></hvml>',
         text: "Hello, world!",
     }
</init>

<load on "$request.hvml" onto "hello@main">
     $request
</load>
```

When we don't need to use a variable, it can be removed by resetting the variable with `undefined`:

```hvml
<init as 'request' with undefined />
```

HVML also provides a feature called stand-in expressions, which allow us to define an expression (including compound expressions) as a variable or a method on it:

```hvml
<bind on $STREAM.stdout.writelines($_ARGS[0]) as "console" against 'puts' />

<inherit>
     $console.puts('Hello, world!')
</inherit>
```

`bind` element above binds the expression given by `on` attribute to `puts` method of `console` variable. Afterwards, we can use `$console.puts` to refer to the original expression.

#### 2.1.1) Program Structure

The following uses a simple example to illustrate the program structure of HVML. This HVML program generates an HTML page and updates the HTML page based on user interaction. This HTML page will display three sets of information on the screen:

1. Display the system status bar at the top of the page to display the current time, WiFi signal strength, battery power information, etc. This information will be updated dynamically.
1. Display the user list in the middle of the page. And each user item includes user name, avatar and other information. The information comes from an array of dictionaries expressed in JSON.
1. Display a search engine link at the bottom of the page. The specific search engine is determined according to the language region (locale) information where the system is located.

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

        <init as="databus" with=$STREAM.open('unix:///var/tmp/hibus.sock','default','hiBus') >

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

First, HVML uses  tags like HTML to define the overall structure of the document:

- At the beginning of the document, we use `<!DOCTYPE hvml>` to mark the document type as `hvml`. We also use the `SYSTEM` identifier of the `DOCTYPE` to define the external tag prefixes used by this HVML program and the external modules that need to be preloaded.
- `hvml` tag is used to define an entire HVML program. It can contain the following attributes:
    1. `target`: defines the target markup language of the HVML program, taking values such as `html`, `xml`, `void`, etc.
    1. Other attributes (such as the `lang` attribute, used to define the language, such as `en`, `zh`, etc.), will be cloned to the root element of the target document after being evaluated by the interpreter.
- `head` tag is used to define the header information, which can contain:
    1. Tags that can be retained to the target document, such as `<meta>`, `<link>` tags of HTML documents.
    1. Initialization or reset of global data: defines using `init` tag.
    1. A global dynamic object: defines using `init` tag.
    1. Global template: defines using `archedata` or `archetype` tags.
- `body` tag is used to define the body content of the document. In an HVML program, zero or more `body` local contents can be defined, and `id` attribute can be used to distinguish different ontology contents. During execution, different ontology contents can be loaded via `load` element.

Secondly, it can be seen from the above HVML program that HVML uses HTML-like tags, and HTML tags can also be mixed. The difference between them is:

1. HVML is dynamic, which expresses programs； while HTML is static， which expresses documents.
1. Most tags in HVML are used to define action elements. Each action element performs one or a set of operations, so these tags use verbs in English; while HTML standards usually use nouns or their abbreviations as tag names, such as the common HTML tag `p` is a shorthand for paragraph.
1. Other tags of HVML are used to define a program framework or a template, so nouns are used as tag names, such as `head` and `archetype`, which are used to define a frame element and a template element respectively.
1. HVML can mix HTML, XML and other target markup language tags, and use non-HVML tags to define an external element. HVML assigns a uniform operation to all external elements: clone the element's attributes and content to the current target document location and implicitly adjust the context data of the HVML program.
1. HVML tag names, attribute names, variable names, and rule keywords are case-sensitive. They are mainly for consistency with XML-related specifications.
1. HVML elements support the following types of attributes:
    - General properties: Currently there is only one generic attribute `id`. This attribute is used to specify the identifier of the element. In HVML, element identifiers are mainly used to locate elements or stack frames. When the attribute is used in an external element, the attribute and its value will be cloned into the target document.
    - Noun attribute: Such as `name`and so on, are usually used in template elements.
    - Prepositional properties. Such as `on`, `with`and so on, are used in verb elements.
    - Adverb attribute. Such as `uniquely`, etc., are used in verb elements.

Now introduce some features of HVML with the above example. Snippets of this example are also referenced in other sections of this document.

The first is data-driven programming. Through operations such as data-based iteration, insertion, update, and clearing, developers can dynamically generate the final XML/HTML document without writing a program or only need to write a small amount of program. For example, `iterate` tag in the sample code above iterates over the data represented by `$users` variable (defined using the `init` tag in `head`), and then inserts `ul` element in the target document A number of `li` elements. Instead, the properties of `li` elements (including child elements) are defined by an `archetype` tag using `$? ` to refer to a data member in `$users` being iterated over.

In the sample code above, we use the system built-in variable `$TIMERS` to define timers. And each timer has a global identifier, interval time, and a flag whether it is active or not. To activate a timer, we only need to use `update` tag of HVML to modify the corresponding key value without calling a specific programming interface. This is another use of data-driven programming - we don't need to provide additional application programming interfaces (APIs) for timers or other similar module operations.

In addition, in the sample code above, we use the `observe` tag to observe new data or changes in the document itself and user interaction events, which can realize dynamic updates of XML/HTML documents or data. For example, in the last `observe` tag, a new `user.hvml` program is loaded by listening to the click event on the user's avatar, and the detailed information of the corresponding user is displayed on the new renderer page.

The second is to completely decouple the interface, interaction, and data. Through the programming model and method introduced by HVML, the XML/HTML document content used to express the interface can be completely generated and dynamically adjusted by HVML, which avoids directly manipulating the data structure of the document (that is, the document object tree, or DOM for short) in the program code. tree), and the program only needs to focus on the generation and processing of the data itself. In this way, the decoupling of interface and data is realized. for example:

- HVML can define the mapping relationship between data and DOM elements in the document fragment template or data template (such as `archetype` or `archedata` element in the sample code), without writing additional code to complete the data to DOM element attributes, assignment operations such as content.
- HVML separates the display of errors and exceptions from the program code. As long as the program defines an appropriate error or exception template (such as `error` and `except` elements in the sample code), the error or exception situation can be defined content to display without further programmatic processing.

Thirdly, HVML provides a consistent interface for document and data operations, which reduces the complexity of the interface and effectively avoids interface explosion. In HVML, we also provide support for dynamic objects. We can use external programs to implement our own dynamic objects, and we can perform functions similar to function calls on these dynamic objects.

Finally, HVML uses action tags (usually some English verbs, such as `init`, `update`, `iterate`, etc.) and the associated preposition or adverb attributes to define the data on which the action tag depends and the target operation location And execute conditions to complete specific operations. This is very different from common programming languages. The description method of HVML is closer to natural language, which can greatly reduce the learning threshold.

For the convenience of distinction, we call the DOM tree generated after parsing the HVML program vDOM (virtual DOM), and the DOM tree corresponding to the target document is called eDOM (effective DOM).

#### 2.1.2) Basic Data Types

HVML defines the following basic datum types:

- Null.
- Boolean: It is used to represent true and false logical values, which can take `true` or `false` two values.
- Number: It is used to express integers or floating-point numbers. In general, it is equivalent to the `double` type (double-precision floating-point number) in C language.
- String: For expressing text, it is always use UTF-8 encoding.

HVML defines the following basic container types:

- Array: Multiple data items that can be referenced using an index, with variable capacity.
- Object: Represented by single or multiple key-value pairs, also known as dictionaries, associative arrays, etc.; key-value pairs are also often called properties.

Primitive data item types and primitive container types are collectively referred to as primitive data types, and their representations are compatible with [JSON].

#### 2.1.3) Extend Data Types

This specification requires HVML interpreter to implement the following extended data types and two special data types:

- Undefined: This data is used internally only to indicate that the data is not ready, or to remove a member when updating the container's data.
- Exception: It is used internally only to indicate exceptions.
- Longint: It shall be implemented as a 64-bit signed integer.
- Ulongint: It shall be implemented as a 64-bit unsigned integer.
- Longdouble: It is corresponding to the C language long double type.
- Bsequence.
- Tuple: Multiple data items that can be referenced by index, once created, its capacity is immutable, and its members cannot be removed, only empty.
- Set: A special array in which members are unique based on their values or unique keys on an array of objects.

The representations of the above extended data types use the [2.2.5) eJSON syntax] (#225-ejson-syntax) defined in this document. In this article, "eJSON" is an acronym for `extended JSON`.

HVML also defines the following two special data types:

- Dynamic value: It is essentially composed of `getter` and `setter` methods. When reading, the getter returns the corresponding value, and when setting, the setter completes the corresponding work.
- Native entity: It is implemented by the bottom layer is usually used to represent some abstract data that can perform complex operations, such as read and write streams, long connections, etc. These complex operations include implementing getter or setter methods on virtual properties, implementing observations on native objects, and so on.

The special data types mentioned above are intrinsic data types, valid only at runtime, and accessible through variables and expressions in HVML code.

Both dynamic values and native entities can exist as attribute values of objects, thus forming what we often call dynamic objects.

In HVML, we extend the properties of objects to be dynamic. A dynamic attributes, usually defined or implemented by an HVML interpreter or an external program, is either a dynamic value or a native entity.

From the point of view of an HVML program, accessing a dynamic attribute is no different than accessing a regular attribute. For example, we can get the current UNIX timestamp by accessing `$SYS.time`. However, accessing `$SYS.time` at different times will result in different values. This is because `time` here is a dynamic attribute.

As another feature of dynamic properties, we can treat a specific attribute as an object and provide virtual properties on it. For example, when we access `$SYS.uname_prt.default`, we will get the current operating system kernel name (like `Linux`).

Furthermore, we can also use a specific attribute as a function, pass parameters to obtain different return values, or set a specific value for the attribute. For example, on `$SYS` object, if we want to get the kernel name and release version number of the current operating system, we can use `$SYS.uname_prt('kernel-name kernel-release')`, at this time, we will get A string like `Linux 5.4.0-107-generic`.

In addition to using `( )`, which is similar to a function call, we can also use `(! )`, which is used to set a attribute. For example, use `$SYS.cwd` to get the current working directory, and use `$SYS.cwd(! '/tmp' )` to set the current working directory.

Here, we introduce two operators: `( )` and `(! )`. Essentially, the former corresponds to getter methods for dynamic properties, and the latter corresponds to setter methods for dynamic properties.

In addition to the built-in `$SYS` dynamic object or the dynamic object preloaded through `DOCTYPE`, we can also implement a custom dynamic object through an external program module, and pass this dynamic object and a variable through the `init` tag Bind together like:

```hvml
     <init as="math" from="purc_dvobj_math" via="LOAD" />
```

After that, when we access `$math.pi`, it will return the value of PI, and if we access `$math.sin($math.pi)`, it will return `0.0`.

When we refer to a dynamic attribute that does not exist on a dynamic object, or a virtual subproperty that does not exist, or cannot perform a function operation on the attribute, the HVML interpreter will throw an exception.

Through such a design, we can easily and effectively expand the functions of HVML, and exchange data with external modules through dynamic objects, or call the functions of external modules.

#### 2.1.4) Casting Rules for Arbitrary Data Types

##### 2.1.4.1) Numericalization

In the case where arbitrary data needs to be coerced into a numeric value, convert it to a numeric value according to the following rules:

1. `null`, `undefined`, `false` values are converted to 0.
1. `true` value is converted to 1.
1. Empty strings are treated as 0; non-empty strings are converted according to the rules of eJSON values, such as `123.34` will be converted to real numbers, and `abcd` will be converted to 0.
1. An empty byte sequence is treated as 0; a non-empty byte sequence takes the highest 64 bits (up to 8 bytes) and converts it into a signed long integer in little-endian byte order, and then converts it into a value.
1. For dynamic values, if there is no getter method, it will be treated as 0; if there is a getter method, no parameter will be passed to call the getter method, if the return value is invalid, it will be 0, if the return value is numeric, Then take its value, if the return value is non-numeric, it will be processed recursively according to this rule.
1. Native entity, try to get the getter method of `__number` key name. If this method exists, call this getter without passing any parameters, refer to dynamic value processing; if this method does not exist, take 0.
1. For the value of the array, add up all the array elements. If the array element is not numeric, it will be processed recursively according to this rule.
1. For the value of the tuple, add up all the tuple units. If the tuple unit is not numeric, it will be processed recursively according to this rule.
1. For the value of the dictionary, add up all key values. If a key value is not numeric, it will be processed recursively according to this rule.

The above operation is called "numerify".

##### 2.1.4.2) Booleanize

When it is necessary to obtain the Boolean logic true or false value of any data, it is converted into a Boolean value according to the following rules:

1. Always treat `false` for:
    - `null`, `undefined`, `false`.
    - Value: 0.
    - Empty string.
    - Empty array.
    - Empty tuple.
    - Empty object.
    - Empty collection.
    - Byte sequence of length zero.
1. Dynamic value: If there is no getter method, it will be treated as `false`; if it exists, the getter method will be called without passing any parameters, and the return value will be judged according to this rule.
1. Native entity: Try to get the getter method of the `__boolean` key name, if the method exists, call the getter without passing any parameters, and judge the return value recursively according to this rule; if the method does not exist, take `false `.
1. Other cases are always considered `true`, including:
    - `true`.
    - Non-zero value.
    - Non-empty string.
    - Non-empty array.
    - Non-empty tuple.
    - Non-null object.
    - Non-empty collection.
    - Sequence of bytes with non-zero length.

The above operations are called "booleanize".

##### 2.1.4.3) Stringify

In the case where any data needs to be forcibly converted to a string, convert according to the following rules:

1. For `null`, `undefined`, `true`, `false`, etc., use the corresponding keyword string to output.
1. Numerical values (including long integers, etc.), formatted output, and the specific output format is determined by the interpreter.
1. String, output using UTF-8 encoding.
1. Byte sequence, using the hexadecimal representation of the byte sequence, all uppercase.
1. For dynamic values, the unified output is `<dynamic: %getter, %setter>`, where `%getter` and `%setter` respectively represent the formatted output of the two methods of dynamic values, and the specific form is determined by the interpreter .
1. For native entities, the unified output is `<native: %entity>`, where `%entity` represents the formatted output of native entities, and the specific form is determined by the interpreter.
1. Array: Concatenate the character strings of all members, and append a semicolon (+U003B SEMICOLON) character after each member.
1. Tuple: Concatenate the character strings of all members, and append a semicolon (+U003B SEMICOLON) character after each member.
1. Dictionary: Connect the character string corresponding to the key name of all attributes and the string corresponding to the key value, separated by a colon (+U003A COLON), and append a comma (+U002C COMMA) character after each attribute.

The above operation is called "stringify".

For example, the following JSON data,

```json
     [
         { "id": "1", "name": "Tom", "age": 2, "male": true },
         { "id": "2", "name": "Jerry", "age": 3, "male": true }
     ]
```

will be stringified as:

```
id:1,name:Tom,age:2,male:true,;id:2,name:Jerry,age:3,male:true,

```

The purpose of stringifying data is to perform operations such as comparing and sorting multiple data according to strings, and it is also used to process the evaluation results of parameterized strings and to concatenate with other parts of strings.

Note that "stringify" is different from "serialize", which refers to formatting data according to JSON or eJSON.

##### 2.1.4.4) Serialize

"Serialize" means to format arbitrary data according to JSON or eJSON. eJSON format, see this document [2.2.5) eJSON syntax] (#225-ejson-syntax).

When serializing, if the output is in JSON format, the data of the eJSON extension type should be uniformly output as `null` or a string in a specific format.

1. `undefined`.
1. Dynamic value.
1. Primary entity.

##### 2.1.4.5) Key-Value Objects

In HVML, we can represent a key-value pair in an object as a new object, such as:

```json
{
     "nrUsers" : 2,
     "names" : [ "Tom", "Jerry" ],
}
```

The key-value pair `"nrUsers" : 2` in this object can be expressed as a new object:

```json
{
     "k": "nrUsers",
     "v": 2
}
```

We refer to the above objects as `key-value objects` (key-value object).

And the above object can be converted to an array of key-value objects:

```json
[
     { "k": "nrUsers", "v": 2 },
     { "k": "names", "v": [ "Tom", "Jerry" ] }
]
```

An array of key-value objects essentially forms a collection with `k` as the unique key.

It should be noted that the HVML interpreter will implicitly convert a attribute of the object to a key-value object on request, and we usually do not need to perform this conversion explicitly.

#### 2.1.5) Mutable and Immutable Data

In HVML, we refer to the following data types as immutable data:

- Undefined.
- Null.
- True.
- False.
- Number.
- String.
- Byte sequence.
- Dynamic value.
- Native entity.

The meaning of immutable data is that we cannot change the value of this data at runtime, but can only construct a new data to represent the new value.

We refer to the following data types as mutable data:

- Array.
- Tuple.
- Object.
- Set.

In contrast to immutable data, the meaning of mutable data is that we can change the value of this data at runtime. Essentially, mutable data is container class data, that is, arrays, tuples, objects, and collections. When we change the value of these data, what we essentially change is the content contained in these data, such as deleting or modifying one of the data items.

In HVML, we can use tags such as `update`, `clear`, `erase` on mutable data to perform update, clear or remove operations, which essentially modify the data items in it.

We can also perform update, clear, or remove operations on native entities, but in this case, the operation is on the internal data represented by the native entity, not the native entity itself. For example, performing a `clear` operation on a native entity representing a directory entry will clear all files and subdirectories in the directory entry, and performing an `erase` operation on it will remove the directory entry.

HVML does not provide any operations that can be used to change immutable data, but developers can use the `init` tag to reset a variable to other data.

#### 2.1.6) Variables

In addition to the above tags used to define the overall structure of the document, HVML provides the following tags used to define data:

- `init`: This tag initializes a variable; we refer to named data as variables. Using `init` tag at the head of an HVML program (defined by `head` tag) will initialize a global variable by default. Using the `init` tag within the body of an HVML program (defined by `body` tag) will define a local variable that is only valid within the subtree defined by its parent element. We can directly embed JSON data into `init` tag, or get it by loading external content through protocols such as HTTP. When requesting via HTTP, use `from` attribute to define the URL of the request, `with` attribute to define the parameters of the request, and `via` attribute to define the method of the request (such as `GET` or `POST`).
- `bind`: This tag is used to define an expression variable.

##### 2.1.6.1) Types of Variables

In HVML, when we refer to variables, we use `$` prefix like `$global`, `$users`, `$?` etc. When we want to refer to the normal `$` character, we use `\` as escape character.

Variables such as `$global` and `$users` are called named variables, which are divided into static named variables and temporary named variables; `$?` variables that use special characters are called It is a context variable, and its value is determined according to the execution stack of the HVML interpreter. It should be noted that in HVML-related documents, the execution stack of a program extends from top to bottom, and the first stack frame that is pushed is called the topmost stack frame.

In HVML, context variables and static variables are managed differently:

1. The context variable exists on the execution stack of the HVML program, and is automatically destroyed when the corresponding stack frame is popped up. It is essentially a temporary variable.
1. Static named variables are static, global, and associated with an element node in the vDOM tree. A statically named variable persists unless it is reset with `undefined` value in `init` action.
1. Temporary named variable is essentially a special context variable.
1. If you use the name of a named variable to refer to a variable instead of using the special symbols of the context variable in the program, the interpreter will first look for a temporary variable matching the name in the current execution stack, and then in the parent element of the current vDOM position and ancestor elements to find a static variable matching that name.

##### 2.1.6.2) Context Variables

The context variables defined by HVML are listed as follows:

- `@`: Refer to the current document operation position, expressed by the eDOM element collection (target element collection), usually defined by the preposition attribute `in` in the preceding operation.
- `?`: Refer to the result data of the previous operation.
- `!`: Refer to user data, which can be used to refer to temporary variables.
- `^`: Refer to the content data of the pre-operation, only for action elements and frame elements, and undetermined in other cases.
- `:`: If the result data of the pre-operation is a key-value object, the variable represents the key name, otherwise it is undetermined.
- `=`: If the result data of the pre-operation is a key-value object, the variable represents the key value, otherwise it is undetermined.

The following context variables are specific to iteration (undefined otherwise):

- `%`: The current iteration index value. For example, the first iteration, the value of this variable is 0, the second iteration, the value of this variable is 1, and so on.
- `~` or `<`: The iteration data for the current iteration, initially defined by the preposition attribute `on` and possibly updated after each iteration.

We can also prepend a positive integer to the sign of a context variable to refer to context data going back `<N>` levels from the current one:

- `$<N><SYMB>`, such as `$1<`, `$1?`, etc.: Refers to the context data of `<N>` level back from the current context; here `<N>` must be zero or positive integer. This context variable is mainly used to access context data in previous stack frames on the execution stack. When `<N>` is zero, it refers to accessing context variables in the current stack frame.

The context variables in the current stack frame are described as follows:

1. All context variables are initially defined as undetermined. Accessing undefined context variables will raise a `NoData` exception.
1. The setting of context variables is related to certain properties, such as `$0<` initially from `on` attribute value, `$0@` from `in` attribute value or inherited from the previous stack frame. Therefore, when referring to these context variables, attention should be paid to the evaluation order of attribute values stipulated by the action element.

To improve the readability of the code, we can also use the anchor defined by `id` attribute of the element to define the context variable to be referenced:

- `$#<ANCHOR><SYMB>`, such as `$#theAnchor~`, `$#theAnchor?`, etc.: Refers to backtracking from the current stack frame along the execution stack and using `<ANCHOR>` to match the corresponding vDOM element `id` attribute value to locate the context data of a stack frame on the execution stack.

##### 2.1.6.3) Predefined Variables

In HVML, we usually use `as` attribute to name data, but HVML reserves several variable names for predefined occasions. We call them predefined global variables, and it is customary to use all uppercase.

According to whether it contains dynamic objects or not, HVML's predefined variables can be divided into:

1. Dynamic variable, that is, the data corresponding to the variable provides a dynamic method.
1. Non-dynamic variables, that is, the data corresponding to variables does not provide dynamic methods.

According to the scope of the variable corresponding to the data, the predefined variables of HVML can be divided into:

1. Walker-level variables: It means that the data corresponding to this variable is visible to all HVML coroutines in the current interpreter instance: That is, different coroutines in the same walker correspond to the same data copy.
1. Coroutine-level variables: Indicate that the data corresponding to this variable is only visible to a single HVML coroutine in the current interpreter instance. That is, different HVML coroutines have their own copy of the data.

According to whether the variable must be provided, the predefined variables of HVML can be divided into:

1. Required variables: The interpreter must implement this variable.
1. Optional variables: Implementation of this variable is optional.

As part of the HVML specification collection, the document [HVML Predefined Variables](hvml-spec-predefined-variables-v1.0-zh.md) specifies all the predefined variables and their interfaces in detail, and the interpreter should do corresponding implementation.

Some key predefined variables are briefly described below.

1) `$REQ`

`$REQ`: It is mainly used to describe the request data provided by other modules when loading the program, and is generally generated by the HVML interpreter when loading the HVML program. For example, the following Python script loads an HVML program and passes the `nrUsers` parameter:

```python
hvml. load ("a. hvml", { "nrUsers" : 10 })
```

In the HVML program, we can use `$REQ.nrUsers` to refer to the value (`10`) passed in by the above script code.

`$REQ` variable is essentially a necessary coroutine-level non-dynamic object.

2) `$SYS`

`$SYS`: A dynamic object used to access the basic functions of the system, which can be used to provide system time, current locale (region), time zone, random sequence, machine name, etc. For example, if we want to get the current Unix timestamp, we can use `$SYS.time` directly, if we want to get a random sequence, we can use `$SYS.random_sequence`, if we want to get the current machine name, we can use `$ SYS.uname`, if you want to get the current language and region information, you can use `$SYS.locale`.

`$SYS` variable is essentially a necessary walker-level dynamic object.

3) `$RUNNER`

`$RUNNER` is a necessary runner-level dynamic variable, which is mainly used to obtain runner-related information and provide users with a mechanism to share data between different coroutines of the current runner. for example:

1. `$RUNNER.app_name`: Get the application name of the current runner.
1. `$RUNNER.run_name`: Get the runner name of the current runner.
1. `$RUNNER.rid`: Get the runner identifier of the current runner.
1. `$RUNNER.uri`: Get the URI of the current runner.
1. `$RUNNER.myObj`: Static attribute, user-defined object.
1. `$RUNNER.user`: Get or set the properties of `$RUNNER.myObj` object.
1. `$RUNNER.chan`: Create a channel.

Channel is an important inter-coroutine communication mechanism.

The operation mechanism of the channel is very simple: When a coroutine wants to receive data from a channel without data, the coroutine will be blocked, and when other coroutines write data to the channel, the coroutine will be automatically blocked. wake. The following program creates two sub-coroutines to act as the sender and receiver respectively, and realizes the communication between the coroutines through the channel:

```hvml
<hvml target="void">
     <body>

         <!-- open a channel named `myChannel` -->
         <init as chan with $RUNNER. chan(! 'myChannel' ) />

         <!-- start the writer coroutine asynchronously -->
         <load from "#writer" asynchronously />

         <!-- start the reader coroutine and wait for the result -->
         <load from "#reader">
             $STREAM.stdout.writelines("The result got from the reader: `$?`")
         </load>

     </body>

     <body id="writer">
         <init as chan with $RUNNER. chan('myChannel') />

         <iterate on [ 'H', 'V', 'M', 'L' ]>
             $chan. send($?)

             <sleep for '1s' />

         </iterate>

         <!-- close the channel -->
         <inherit>
             $RUNNER.chan(! 'myChannel', 0)
         </inherit>

     </body>

     <body id="reader">
         <choose on $RUNNER. chan('myChannel')>

             <init as result with '' />

             <!-- the channel has been closed if $chan.recv() returns false -->
             <iterate with $?. recv() silently>
                 $STREAM.stdout.writelines("$DATETIME.time_prt: the data received: $?");

                 <init as result at '_grandparent' with "$result$?" />
             </iterate>

             <exit with $result />
         </choose>

     </body>

</hvml>
```

The above code, the final output will be roughly as follows:

```
2022-08-24T12:27:00+08:00: the data received: H
2022-08-24T12:27:01+08:00: the data received: V
2022-08-24T12:27:02+08:00: the data received: M
2022-08-24T12:27:03+08:00: the data received: L
2022-08-24T12:27:03+08:00: The result got from the reader: HVML
```

4) `$CRTN`

`$CRTN` is a dynamic object, which represents the currently executing HVML program instance (coroutine) itself, and is used to set the parameters related to the current coroutine. for example:

1. `$CRTN.base`: Get or set the default URL location of the HVML program (similar to the HTML `base` tag).
1. `$CRTN.max_iteration_count`: Get or set the maximum number of iterations when the HVML program executes the `iteration` element; it is used to detect possible infinite loops.
1. `$CRTN.max_recursion_depth`: Get or set the maximum recursion depth of the HVML program when recursively executing a function to prevent stack overflow.
1. `$CRTN.max_embedded_levels`: Get or set the maximum nesting level allowed by the HVML program when parsing or processing nested container data.
1. `$CRTN.timeout`: Get or set the timeout value when fetching external data.
1. `$CRTN.cid`: Get the coroutine identifier of the current coroutine.
1. `$CRTN.uri`: Get the URI of the current coroutine.
1. `$CRTN.token`: Get or set the token of the current coroutine.

Among them, the coroutine token is a unique identifier in the walker automatically assigned by the interpreter, which can be used to identify a coroutine. The interpreter can take the serial number of the new coroutine maintained by the walker or the decimal string corresponding to the coroutine identifier as the default token. A coroutine can override this auto-assigned token by calling the setter of `$CRTN.token` attribute. Note that we reserve token names starting with an underscore for special purposes. For example, `_main` means the first coroutine created by the walker.

In addition, we can also observe some global events and changes in the rendering state of the current coroutine through `$CRTN` object, so as to gracefully handle the situation where the renderer page is closed by the user or the renderer is lost. These events are:

- `idle`: The current HVML coroutine is listening to `idle` event on `$CRTN`, and `idle` event is fired because no event has been received.
- `rdrState:pageClosed`: The renderer page corresponding to the coroutine is closed by the user.
- `rdrState:pageSuppressed`: The interaction between the coroutine and the renderer (including updating the page and accepting interaction events from the renderer) is suppressed.
- `rdrState:pageReload`: The document content of the current coroutine is reloaded to the renderer, and the renderer state is adjusted to `regular`.
- `rdrState:connLost`: The walker where the coroutine is located has lost the connection to the renderer.

`$CRTN` variable is essentially a necessary coroutine-level dynamic object.

5) `$DOC`

`$DOC` is a dynamic object representing the target documentation generated by HVML. We can use specific key names on this object and `query` method to get a collection of elements on the target document through CSS selectors, such as:

1. `$DOC.doctype`: Get the content of the `doctype` node of the target document.
1. `$DOC.query("#foo")`: Get the collection of elements whose `id` attribute value is `foo` in the target document.
1. `$DOC.query(".bar")`: Obtain the collection of elements formed by all elements whose `class` attribute value is `bar` in the target document.

`$DOC` variable is essentially a necessary coroutine-level dynamic object.

6) `$TIMERS`

`$TIMERS` is for the current HVML program, with a fixed format, initially an empty set. Its value can be modified using elements such as `update`, such as:

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

The above `update` element contained in `head` element defines two timers (with identifiers `foo` and `bar`) with intervals of 1 second and 2 seconds respectively (timers are defined in milliseconds) . Neither timer is active (`active` is `no`).

Just modify `active` parameter of a timer in HVML to activate the timer, and then use `observe` tag to monitor the timer expiration time:

```hvml
     <choose on="$TIMERS" by="FILTER: AS 'foo'">
         <update on="$?" at=".active" with="yes" />
     </choose>

     ...

     <observe on="$TIMERS" for="expired:foo" in="#the-header">
         <update on="> span.local-time" at="textContent" with="$SYS.time('%H:%m')" />
     </observe>
```

`$TIMERS` variable is essentially a necessary coroutine-level non-dynamic object.

7) `$L`

`$L` is a dynamic object that performs logical operations such as numerical comparison, string comparison, and, or, XOR, negation, etc., such as:

1. `$L.not(<any>)`: Used for logical inversion operation.
1. `$L.and(<any>, <any>, ...)`: It is used for logical AND operation.
1. `$L.or(<any>, <any>, ...)`: It is used for logical or operation.
1. `$L.xor(<any>, <any>)`: It is used for logical XOR operation.
1. `$L.eq(<any>, <any>)`: It is used to compare whether two parameters are numerically equal.
1. `$L.ne(<any>, <any>)`: It is used to compare whether two parameters are not equal in value.
1. `$L.gt(<any>, <any>)`: It is used to compare whether the first parameter is numerically greater than the second parameter.
1. `$L.ge(<any>, <any>)`: It is used to compare whether the first parameter is numerically greater than or equal to the second parameter.
1. `$L.lt(<any>, <any>)`: It is used to compare whether the first parameter is numerically smaller than the second parameter.
1. `$L.le(<any>, <any>)`: It is used to compare whether the first parameter is numerically less than or equal to the second parameter.
1. `$L.streq(<'caseless | case | wildcard | reg'>, <any>, <any>)`: It is used to compare whether two strings are equal; the first parameter is used to represent the string Matching method (case-sensitive, wildcard, regular expression), and the following two parameters are used to pass two strings.

For example, the result of `$L.not($L.gt(5, 3))` is `false`.

`$L` variable is essentially a necessary walker-level dynamic object.

8) `$T`

This variable is mainly used for localization of text and contains two attributes:

1. `map`: An object used to save the mapping relationship of localized strings, initially an empty object.
1. `get`: It is used for string localization, if no mapping relationship is defined in `map`, the original string will be returned.

Common usage is as follows:

```hvml
<!DOCTYPE hvml>
<hvml target="html">
     <head>
         <update on="$T.map" from="https://foo.bar/messages/$SYS.locale" to="merge" />

         <title>$T. get('Hello, world!')</title>
     </head>

     <body>
         <p>$T.get('Hello, HVML!')</p>
     </body>

</hvml>
```

In the above HVML code, we set `$T.map` in the header using the `update` tag, and the content of this variable comes from a URL containing `$SYS.locale`. Note that `$SYS.locale` is an evaluation expression that returns the locale identifier of the current system (such as `zh_CN`). The final URL after evaluation and replacement by the HVML interpreter is: `https:// foo.bar/messages/zh_CN`. The content of the file obtained from this URL might be:

```json
{
     "Hello, world!": "Hello, world!",
     "Hello, HVML!": "Hello, HVML!",
}
```

The above code will eventually be interpreted as the following HTML document:

```hvml
<html>
     <head>
         <title>Hello world! </title>
     </head>

     <body>
         <p>HVML, Hello! </p>
     </body>
</html>
```

`$T` variable is essentially a necessary coroutine-level dynamic object.

9) `$DATA`

This variable is mainly used to obtain information related to the specified data, such as the type and number of data items, and to complete the numericalization, stringification, and serialization of the data.

1. `$DATA.type(<any>)`: Get the type of data, such as `null`, `boolean`, `longdouble`, etc., and return a string representing the data type.
1. `$DATA.count(<any>)`: Get the number of data items of the given data.
1. `$DATA.numerify(<any>, ["number | longint | ulongint | longdouble": the number subtype to return])`: Perform numericalization on the given data, and the type of the result data is the specified real number type , which defaults to `number`.
1. `$DATA.stringify(<any>)`: Stringify the given data, and the type of the resulting data is a string.
1. `$DATA.serilize(<any>, <string: options>)`: Perform eJSON serialization on the given data, and the type of the resulting data is a string.
1. `$DATA.arith(<arithmetic operation>, <any: operand>, <any: operand>)`: Convert the given two items of data to `longint`, and then perform the specified four arithmetic operations (addition, minus, etc.) and return the result.
1. `$DATA.bitwise(<bitwise operation>, <any: operand>[, <any: operand>])`: Convert the given item or items of data to `ulongint`, and then execute the specified Bitwise operations (and, or, etc.) and return the result.
1. `$DATA.select(<container>, <string: selector>[, <boolean: recursively])`: Return qualified data items or a collection of data in the given container data according to the given selector.

The rules for the number of data items of each data type are as follows:

- Array, tuple, or set: The number of data items refers to the number of members in the array, tuple, or set.
- Object: The number of data items refers to the number of key-value pairs.
- Other data types, such as strings, numbers, `true`, `false` or `null`, etc.: The number of data items is 1.
- `undefined`: The number of data items is 0.

In `select` method, we use a CSS selector-like approach to the second parameter (`selector`) to return a certain data item or a collection of some data items, such as:

- In a tree, array or tuple for dictionary-based data:
    - `[<key_name>]`: Indicate a data item defined with a `<key_name>` key name.
    - `[<key_name> = <value>]`: Indicate all data items whose key value of `<key_name>` is equal to `<value>`.
    - `[<key_name> ~= <value>]`: Indicate that all the key values of `<key_name>` contain data items of complete tokens separated by `<value>` as whitespace characters.
    - `[<key_name> *= <value>]`: Indicate that all the key values of `<key_name>` contain data items whose substring is `<value>`.
    - `[<key_name> ^= <value>]`: Indicate all data items whose key value of `<key_name>` starts with `<value>`.
    - `[<key_name> $= <value>]`: Indicate all data items whose key value of `<key_name>` ends with `<value>`.
- for arrays or tuples:
    - `:nth-child(<n>)`: Indicate `<n>`th data item in the current array or tuple; `<n>` can be a number, a keyword or a formula.
    - `<type>:nth-of-type(<n>)`: Indicate all `<n>`th data items whose type is `<type>` in the current array or tuple; `<n>` can Is a number, keyword or formula.

After using the above selector, it is equivalent to doing some filtering on the original single data item. For example, `<choose on="$users" ... />` selects the entire `$users` array or tuple content for subsequent processing, but if you use `<choose on="$DATA.select($users, " :nth-child(even)")` selects only the array or tuple members whose subscripts are even numbers.

`$DATA` variable is essentially a necessary walker-level dynamic object.

10) `$STREAM`

`$STREAM` is used to implement read and write stream based operations. Similar to the `query` method of the `$DOC` variable, `open` method provided on this variable returns a native entity on which we provide an interface for reading from or writing to the stream .

The native entity returned by `$STREAM.open` method is called a "stream entity". Stream entities provide the following basic interfaces:

- `readbytes` and `writebytes` methods: Read and write sequences of bytes.
- `readstruct` and `writestruct` methods: Read and write binary data structures.
- `readlines` and `writelines` methods: Read and write lines of text.
- `seek`: within a seekable stream repositions the read and write position of the stream.

For convenience, we provide the following static properties on `$STREAM` variable:

- `stdin`, `stdout`, and `stderr` static attributes: Stream entity wrappers for C language standard input, standard output, and standard error.

The stream entity should be observable, so that it can listen to whether there is data waiting to be read on the read stream, or whether data can be written to the write stream. For example, we can observe `$STREAM.stdin` to listen for user input:

```hvml
     <observe on="$STREAM.stdin" for="read">
         <choose on="$?. readlines(1)">
             ...
         </choose>
     </observe>
```

In addition, `STREAM` variable should use an extensible implementation. On the one hand, we can extend the types of stream entities, such as from files, anonymous pipes, and named pipes to Unix sockets and TCP connections. On the other hand, we can support Different protocols extend the operation methods provided by stream entities to provide additional read and write methods on stream entities. For example, when `$STREAM` method implemented by an interpreter supports sending HTTP protocol, the method of sending HTTP request and processing HTTP protocol can be realized:

```hvml
     <init as="myFetcher" on="$STREAM.open('tcp://foo.com:80','default','http')">
         <choose on="$myFetcher.http_send_request('GET','/')" />
         <choose on="$myFetcher.http_read_response_header()" />
     </init>
```

As a valuable design, we can abstract the behavior of connecting two processes through anonymous pipes in traditional Unix systems into a stream entity, for example, we pipe the content on the standard output to `/usr/bin /wc` command processing:

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

`$STREAM` variable is essentially a necessary walker-level dynamic object.

11) `$SOCK`

`$SOCK` is a native entity object used to create stream sockets or datagram sockets. This variable is a necessary walker-level dynamic object.

1. `$SOCK.stream()`: Create a stream socket and listen for connection requests from clients on it. This method returns a stream socket entity, you can observe the `connRequest` event on the stream socket entity, and call the `accept()` method to accept the connection request. The `accept()` method on a stream socket entity will return a stream entity.
1. `$SOCK.dgram()`: Create a datagram socket.

12) `$RDR`

`$RDR` is a native entity object representing the renderer corresponding to the current walker, which can be used to obtain the current renderer information, such as protocol, URI, etc. This variable is a necessary walker-level dynamic object.

1. `$RDR.state`: Through this attribute, the current renderer state object can be obtained, including communication method, renderer URI, protocol name, protocol version, etc.
1. `$RDR.connect(<comm>, <uri>)`: Connect to the specified renderer; if currently connected to a renderer, the connection will be disconnected.
1. `$RDR.disconn()`: Disconnect the current renderer connection.

##### 2.1.6.4) Collection Variables

In HVML, we can use JSON arrays to initialize data contained in a collection, but JSON itself does not have the concept of a collection. Therefore, HVML provides the ability to initialize a collection variable using an array. In other words, a collection is an internal expression of an array with certain characteristics, and we need to access the collection data through variables.

Collections have the following characteristics:

- According to the specified data item uniqueness judgment condition, there can only be one item of elements with unique values in the collection.
- We can perform collection-specific operations such as merging, intersecting, and subtracting on collections.

When we need to define a collection, use `uniquely` adverb attribute of `init` tag, and if necessary, specify the uniqueness judgment condition through `against` attribute value.

We judge whether two data items are equal according to the following rules:

- `number`, `longint`, `ulongint` and `longdouble` are regarded as the same type, and they are cast to the highest precision real number type supported by the interpreter for comparison; when the values of the converted two real numbers are equal, These two data items are equal.
- Equal when two Boolean values are the same.
- Two strings (with or without a case-sensitive matching strategy) are equal when they are the same.
- Two byte sequences are equal when they are identical byte-for-byte.
- Equal when the getters and setters of two dynamic values are equal.
- Two native entities are equal when they point to the same native entity object.
- When comparing two different types of data, if the strings after stringification (can apply case-sensitive matching strategy) are the same, they are equal.
- The members of the two arrays are compared one by one. When all members are one-to-one, they are equal.
- The members of the two tuples are compared one by one, and all members are equal when they are one-to-one.
- Two dictionaries are equal if their stringified strings are the same.

There are two cases above that use string comparison. To this end, when using `init` tag to initialize the collection, we can use `casesensitively` or `caseinsensitively` two adverb attributes to specify whether the string comparison is case-sensitive; the default is case-sensitive.

For example, we define a collection of strings using the following `init` tag:

```hvml
     <init as="locales" uniquely>
         [ "zh_CN", 100, "zh_HK", 90, "zh_TW", 60, "en_US", 50, "en_UK", 50, "en_US", 30 ]
     </init>
```

The array used to initialize the string collection above contains repeated `en_US` and `50`, so only one item will be kept in the final result:

```json
         [ "zh_CN", 100, "zh_HK", 90, "zh_TW", 60, "en_US", 50, "en_UK", 30 ]
```

For dictionaries, we can define and use a specific key value as a unique judgment condition. For example, we usually use `id` to represent the unique identifier of a data item. This definition is similar to the primary key in a relational database.

We use `against` attribute value of `init` tag to define the unique key name of the dictionary. When using multiple keys as uniqueness conditions, separate them with spaces. For example:

```hvml
     <init as="users" uniquely against="id">
         [
             { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
             { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
         ]
     </init>
```

The sample code above defines a collection that uses `id` key as a unique criterion. If there is one more data item with `id` as `2` in the dictionary array used to initialize this collection, the previous data item with `id` as `2` will be overwritten by the data item with `id` as `2` later . For example,

```hvml
     <init as="users" uniquely against="id">
         [
             { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
             { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
             { "id": "2", "avatar": "/img/avatars/2.png", "name": "David", "region": "zh_CN" }
         ]
     </init>
```

In `$users` after the above code is initialized, the name of the user whose `id` is `2` will be `David`.

It should be noted that the necessary global variable `$TIMERS` is essentially a collection of dictionaries that use the key value of the key name `id` as a unique judgment condition.

When adding new data members to a collection, there are the following conventions:

1. When the unique key name is not used, the data in the collection can be of any type, and the uniqueness is determined according to the above rules for judging whether two data are equal.
1. When using a unique key name, the data in the collection must be a dictionary, and the uniqueness of the member is determined by comparing the key value corresponding to the unique key name. When the dictionary pre-added to the collection lacks the specified unique key name, it is treated as if its key value is `undefined`.

HVML provides several abstract data manipulation methods for collection data, such as union, intersection, difference, XOR, etc. See the description of `update` tag for details.

##### 2.1.6.5) Variable Name Convention

The interpreter can implement some predefined walker-level variables or coroutine-level variables by itself. As a convention, the names of global variables implemented by the interpreter should start with ASCII U+005F LOW LINE (`_`) and use all uppercase letters And add the interpreter prefix, such as `_PURC_VAR`. For general variables, use all lowercase letters.

In addition, the following variable names are reserved for special occasions:

- `_ARGS`: It is used to refer to all arguments passed into the alias expression (usually implemented using an array or tuple).

Developers should avoid using reserved variable names in HVML programs.

#### 2.1.7) Evaluation Expressions and Parameterized Data

In the above example, we use `$` prefix to specify an evaluation expression in the document fragment template or data template. The evaluation expression needs to conform to the following rules:

- Evaluated expressions can be nested using bound dynamic objects, as in the above example using `$string` variable.
- Except for context variables, variable names must conform to the variable name rules defined by general programming languages; if you use regular expressions to express the rules, it can be expressed as: `/^[A-Za-z_][A-Za- z0-9_]*$/`.
- We can also use ``{{`` and ``}}`` to surround multiple evaluation expressions to form a compound hybrid evaluation expression. In a compound expression, we can use the result of a single evaluation expression to control the subsequent evaluation behavior, so that it has a simple logic control function.

In this document, evaluation expressions are referred to simply as `HEE`, short for `Hybrid Evaluation Expression'. For the syntax of evaluated expressions, see [2.2.2) Syntax of evaluated expressions](#222-Syntax of evaluated expressions) section of this document.

- Evaluation expressions can be embedded in structured data described using eJSON syntax to form parameterized data, such as `[$SYS.time, $SYS.locale, null, true, 2022]`.
- The evaluation expression can be embedded in a string surrounded by double quotes (or triple double quotes) to form a parameterized string, such as `"The system time is: $SYS.time"`. Essentially, parameterized strings are a special case of parameterized data.
- In a parameterized string, a pair of `{}` can be used to surround a single evaluation expression to prevent confusion, such as: `"user-$?.id"` and `"user-{$?.id} "` is the same, but `"$user_item"` and `"{$user}_item"` are not the same.
- In parameterized strings, `\` (backslash) character can be used for `$`, `{`, `}`, `[`, `]`, `(`, `)`, etc. of the escape.
- In the parameters of the evaluation expression, you can use parameterized data or parameterized strings, such as: `$DATA.count([1, 2, true, $SYS.time, "$user.id"])`

Parameterized data is typically used to specify attribute values for prepositional attributes (`on` and `with`) that accept data and the data content of action elements, while parameterized string is typically used to specify attribute values and document fragment templates. See [3.1.2.4) Action Element Attributes] (#3124-Action Element Attributes) section of this document for the syntax for specifying attribute values.

For eJSON syntax, see this document [2.2.5) eJSON syntax] (#225-ejson-syntax).

##### 2.1.7.1) Composite Evaluation Expressions

Compound hybrid evaluation expressions (CHEE for short) are an important feature. CHEE essentially consists of one or more HEEs, but with certain logic control capabilities. Its effect is similar to the effect of using semicolon or `&&`, `||` when executing multiple commands at a time in the Unix Shell command line. Here are some examples:

```js
{{
     // Call $SYS.cwd to switch the current working path to the `/etc` directory, and then call $FS.list
     // Get an array of all directory entry objects.
     $SYS.cwd(! '/etc'); $FS.list
}}

{{
     // Try changing the working path to the `/root` directory
     $SYS.cwd(! '/root') &&
         // If successful, call $FS.list to get an array of all directory entry objects in this directory
         $FS.list ||
             // Otherwise, print prompt information to standard output ($STREAM.stdout)
             $STREAM.stdout.writelines('Cannot change directory to "/root"');
             // and change the working path to `/`
             $SYS.cwd(! '/' ) &&
                 // If successful, get an array of all directory item objects in the directory
                 $FS.list ||
                     // otherwise use `false` as the final evaluation result of this CHEE
                     false
}}

{{
# Try to change the working directory to the `/root` directory, if successful, call $FS.list_prt to get the directory
# List of all directory items (string), otherwise return a prompt message. Eventually the list of directory items or error messages
# Output to standard output.
     $STREAM.stdout.writelines({{
                 $SYS.cwd(! '/root') && $FS.list_prt ||
                     'Cannot change directory to "/root"'
             }})
}}
```

##### 2.1.7.2) Expression Variables and Stand-In Expressions

HVML allows binding an evaluated expression (or parameterized data) to a variable using `bind` tag:

```hvml
     <bind on $users[$MATH. random(10)] as "me" />
```

This variable does not correspond to the value of `$users[$MATH.random(10)]` when the element defined by the above tag is executed, but the evaluation expression `$users[$MATH.random(10)]` ; we call such variables "expression variables"

When we need to evaluate a bound expression, we use `$me.eval`; we call `$me.eval` such expressions as substitute expressions. Since the example expression above uses `random` method of `$MATH`, it will get different results each time it is evaluated.

We can use `observe` tag to observe a variable bound to an expression, so as to make some corresponding processing according to the change of the variable value.

For example, we can bind the attribute or content of a target document element to a variable, and then use `observe` element to handle `change` event on it:

```hvml
<input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />
<bind on="$DOC.query('#the-user-name')[0].attr.value" as="user_name">
     <observe on $user_name for "change">
         ...
     </observe>
</bind>
```

#### 2.1.8) Stack VM

In theory, every HVML program runs on a hypothetical stack-based virtual machine. The HVML interpreter first parses the HVML program, generates the corresponding vDOM tree, and then processes each element in depth-first order starting from the root element of the vDOM. Traditionally, the execution stack of an HVML program grows from top to bottom. Every time a descendant element is executed, a new stack frame is pushed on the execution stack until the leaf element of vDOM. At this time, the interpreter Will pop the last stack frame, and then try to execute the next sibling element of the element corresponding to the new last stack frame.

The aforementioned context variables are maintained in the execution stack, and each stack frame retains a value corresponding to the context variables; while static variables are associated with a specific vDOM element, and its namespace is the subtree defined by the element.

For example, the following HVML program will print the Fibonacci numbers less than 10:

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
                 $STREAM.stdout.writelines($STR.join(' 0: ', $last_one));
                 $STREAM.stdout.writelines($STR.join(' 1: ', $last_two));
             }}
         </inherit>

         <iterate on $last_two onlyif $L.lt($0<, 10L) with $DATA.arith('+', $0<, $last_one) nosetotail>
             <init as "last_one" at "2" with $last_two temp />
             <init as "last_two" at "2" with $? temp />

             <update on "$3!" at ".count" to "displace" with += 1 />

             <inherit>
                 $STREAM.stdout.writelines(
                     $STR.join(' ', $DATA.arith('+', $%, 2), ': ', $?))
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

Its execution path is described as follows:

1. The interpreter initializes an execution stack and pushes a special stack frame representing the top of the stack.
1. The interpreter executes the action specified by `hvml` element and pushes a new stack frame on the execution stack. Normally, `hvml` element will create an empty target document based on the value of `target` attribute. In this example, we set `target` to `void`, so a void target document will be created.
1. The interpreter executes the actions specified by `head` element, the first child element of `hvml` element, and pushes a new stack frame into the execution stack. For this example, the target document type is nothing, so it does nothing other than process `head` element's attributes, content, and its children. `head` element does not contain child elements, but defines content. Its content is an evaluated expression that, when evaluated, will print `Fibonacci Numbers` on standard output.
1. Since `head` element does not contain child elements, the interpreter will pop up the bottom stack frame after executing the actions of `head` element, and then start to execute the next sibling element of `head` element.
1. The interpreter executes the action specified by the second sub-element `body` element of `hvml` element, and pushes a new stack frame on the execution stack. For this example, the target document type is nothing, so it does nothing other than process `body` element's attributes, content, and its children. `body` element defines attributes, does not define content, and contains multiple child elements, so its child elements will continue to be processed.
1. The interpreter executes `inherit` of the first child element of `body` element. The element will inherit the context variables from the previous stack frame, and then process its content and child elements. In this example, the element only defines content. Its content is an evaluated expression that, when evaluated, will print two additional lines of text on standard output.
1. By analogy, the interpreter will execute several other child elements of `body` element in turn, including three `init` elements and `inherit` element.
1. The interpreter executes `iterate` element, which performs an iterative operation so that all its descendants are repeated multiple times. In this example, `iterate` element will be executed 5 times, and the three `init` sub-elements and one `inherit` sub-element will also be executed 5 times.
1. The interpreter executes the last `inherit` child element of `body`. Similar to the aforementioned `inherit` child element, the execution effect of this element is to output two lines of text.
1. The interpreter pops the stack frame corresponding to the last `inherit` child element of `body`.
1. The interpreter pops the stack frame corresponding to `body` element.
1. The interpreter pops the stack frame corresponding to `hvml` element and reaches the top of the stack.
1. Execution of the HVML program ends.

The final output of the HVML program is:

     #Fibonacci Numbers
     ## Fibonacci Numbers less than 10

         0: 0
         1:1
         twenty one
         3: 2
         4:3
         5:5
         6:8

     Totally 7 numbers.

Typically, one interpreter instance corresponds to one virtual machine instance. Theoretically, the aforementioned virtual machine can run multiple HVML programs at the same time. At this time, each HVML program corresponds to an execution stack, and the concurrent execution of multiple HVML programs can be realized by switching the current execution stack through a certain mechanism. This is similar to how real physical computing implements multitasking. In practice, the interpreter usually executes multiple HVML program instances loaded in the same virtual machine instance in the form of independent coroutines, and switches the coroutines at the following times:

1. After each element action is executed, the interpreter will force the current coroutine to yield the use of the virtual machine, so that other coroutines in the ready state can get a chance to execute.
1. When calling a method of a dynamic object, if the corresponding method returns an error value indicating retry, it indicates that the method blocks the current coroutine, and the interpreter can schedule other coroutines in the ready state until the execution state of the coroutine is reset to the ready state. At this point, the interpreter will perform re-evaluation of the blocked expression.

#### 2.1.9) Frame Elements

In HVML, the framework element is used to define the overall framework of an HVML program. We can define text content inside the frame element.

HVML defines the following framework elements:

- `hvml`: This element defines the root element of the HVML program. Except for `target` attribute, its attributes and content will be cloned to the root element of the target document.
- `head`: This element defines the public part of the HVML program, usually used to create global static variables. Additionally, if the target document supports `head` element, its attributes and content will be cloned into `head` element of the target document.
- `body`: This element defines a program body; an HVML program can contain zero or more program bodies, but each execution will only execute one specified body. Additionally, if the target document supports `body` element, its attributes and content will be cloned into `body` element of the target document.

For details, see the subsection [2.3) Frame Tag Details](#23-Frame Tag Details) in this document.

#### 2.1.10) Template Elements

In HVML, template elements are used to define templates for document fragments or parameterized data templates that can be replaced. The template element uses content to define the template and therefore cannot define any child elements.

HVML defines the following template elements:

- `archedata`: This element is used to define a data construction template described in eJSON format.
- `archetype`: This element is used to define a document fragment template defined in the target markup language.
- `error`: This element defines a document fragment template that specifies the type of error.
- `except`: This element defines a document fragment template that specifies the type of exception.

For details, see the section [2.4) Detailed explanation of template tags] (#24-Detailed explanation of template tags) in this document.

#### 2.1.11) Action Elements

In HVML, action elements have the following characteristics:

1. In the action element, we can use parameterized data to define the content. In order to distinguish the text content of the target document element, we call the content of the action element "data content". Usually, the data content of an action element must be defined before any of its child elements, and only one item can be defined. The data defined by the content of the action element will be bound to `$^` context variable of the corresponding stack frame.
1. Each action element will generate an execution result data, which is bound to `$?` context variable of the corresponding stack frame.
1. Each action element corresponds to the context variable `$@` representing the location of the target document in the stack frame, which can be defined using `in` attribute. If not defined, it will inherit from its parent element.

We consider the content defined by the action element as additional data. In some action elements that use the `with` attribute, such as `init`, when the expression of the data is too complex to be defined by the attribute value of `with`, we can use the content to define the data.

We call the tree structure formed by an action element and its descendant elements an action subtree.

In HVML, the elements defined by the tags of the target markup language (such as `ul`, `li`, etc. in the sample code) usually form the structural skeleton of the target document, so we call such elements `skeleton ` element. In the HVML interpreter, we treat skeleton elements as a special kind of action element:

- The default action is to insert (append) a clone of the element at the current target document position.
- The skeleton element implicitly specifies the target document position (corresponding to the context variable `$@`) that can be inherited to subsequent child elements, that is, the corresponding element of the skeleton element in the eDOM tree.
- Except for `$@`, other context variables corresponding to skeleton elements are initially `undefined`.

We define action elements through HVML action tags, which we will describe in detail in this document [2.5) Action Tag Details](#25-Action Tag Details).

##### 2.1.11.1) Action Elements Used to manipulate data

HVML defines the following basic action elements for manipulating data or elements:

-  `init` element is used to initialize or reset a variable.
- `update` element is used to perform an update operation on the specified element, collection of elements, or container data.
- `clear` element is used to perform a clear operation on the specified element or container data, which usually means deleting all child elements or data items of the current element or data.
- `erase` element is used to remove a specified element, element attribute, or data item in a container.
- `choose` element is used to choose (or generate) another data from the given data.
- `reduce` element is used to define the reduction action to be performed on an iterable data or elements.

##### 2.1.11.2) Action Elements for Manipulating the Execution Stack

The following action elements are used to manipulate the virtual machine, including the execution stack, event loop, etc.:

- `test` element performs a test action on an element node or data item, and is used to implement conditional operations that depend on data values.
- `match` element defines a match branch as a direct child of `test` element.
- `differ` element, as a direct child of `test` element, defines the program branch when the test fails.
- `iterate` element is used to define an iterative action on an iterable data or element, thereby implementing a loop.
- `define` element is used to define a reusable group of operations.
- `return` element is used to define the return value of an operation group.
- `back` element is used to pop the stack frame to the specified execution stack position, which is equivalent to breaking the default execution path.
- `include` element is used to execute a group of operations in place.
- `call` element is used to call an operation group.
- `catch` element is used to catch an exception.

##### 2.1.11.3) Other Action Elements

HVML also defines the following action elements for manipulating event loops, renderers, operation groups, etc.:

- `observe` element is used to define observation actions on specific data or elements.
- `fire` element is used to explicitly fire an event.
- `forget` element is used to cancel the observation action on a certain data or element.
- `request` tag is used to make a request to a renderer, other coroutines, etc. and get the resulting data.
- `load` element is used to load and execute a specified HVML program (or code), which is equivalent to creating a new coroutine.
- `exit` element is used to actively exit the execution of an HVML program, that is, terminate an HVML coroutine.
- `sleep` element is used to actively sleep the current coroutine.

#### 2.1.12) Error and Exception Handling

In HVML, errors refer to fatal problems that cannot be recovered, such as segment faults, bus errors, etc.; exceptions refer to problems that can be caught or handled.

To facilitate error and exception handling, use the following error or exception template elements:

- `error`: In case of an error, attempt to insert at the current position of the target document with the content contained within. `error` element supports `type` attribute, which is used to specify the corresponding error type. like:
    - `BusError`: Indicate a bus error (bad memory access).
    - `SegFault`: Indicate a segment fault (invalid memory reference).
    - `Terminated`: Indicate that the interpreter instance was artificially terminated.
    - `CPUTimeLimitExceeded`: Indicate that the CPU time limit has been reached.
    - `FileSizeLimitExceeded`: Indicate that the file size limit has been reached.
- `except`: When an uncaught exception occurs, insert the contained content at the current position in the target document. `except` element supports `type` attribute, which is used to specify the corresponding exception type.

The exceptions defined by HVML are as follows:

- General:
    - `Conflict`: Indicate that the specified operating conditions conflict with each other.
    - `Gone`: Indicate that the specified data or entity has disappeared.
    - `Incompleted`: Indicate an incomplete call, such as a system call interrupted by a signal.
    - `MismatchedVersion`: The version does not match, such as using a lower version of an external executor or a dynamic object.
    - `NotReady`: Indicate that it is not ready, for example, the data corresponding to the specified named variable is not ready yet.
    - `NotImplemented`: Indicate that a feature has not yet been implemented.
    - `NotFound`: Indicate not found, such as the specified variable namespace cannot be found.
    - `NotAllowed`: Indicate an operation that is not allowed, such as an executor with an incorrect data type.
    - `NotAcceptable`: Indicate unacceptable conditions, such as wrong prepositional attribute values.
    - `Timeout`: Timeout.
    - `TooEarly`: Indicate too early (such as the specified data is not yet ready).
    - `TooLarge`: Indicate too large (such as packet size).
    - `TooLong`: Indicate too long (such as path name).
    - `TooMany`: Indicate too many (such as symbolic links).
    - `TooSmall`: Indicate too small (such as buffer size).
    - `Unauthorized`: Indicate unauthenticated.
    - `UnavailableLegally`: Unavailable for legal reasons.
    - `UnmetPrecondition`: The precondition was not met.
    - `Unsupported`: Indicate that a feature or a required information is not supported, such as certain locale classifications.
- Parsing related:
    - `BadEncoding`: Indicate bad character encoding.
    - `BadHVMLTag`: Indicate a bad, unsuitable tag, or mismatched HVML closing tag.
    - `BadHVMLAttrName`: Indicate a bad HVML element attribute name, such as an unknown attribute name, an attribute name that does not conform to the specification, etc.
    - `BadHVMLAttrValue`: Indicate an unparseable HVML element attribute value.
    - `BadHVMLContent`: Indicate unparsable HVML element content.
    - `BadTargetHTML`: Indicate that there was an error parsing the target tag document (HTML).
    - `BadTargetXGML`: Indicate that an error occurred while parsing the target markup document (XGML).
    - `BadTargetXML`: Indicate that an error occurred while parsing the target tag document (XML).
- Interpreter related:
    - `ArgumentMissed`: A required argument is missing.
    - `BadExpression`: Indicate a bad expression, produced when evaluating the expression.
    - `BadExecutor`: Indicate a bad executor, generated when parsing the executor.
    - `BadIndex`: Index error, which occurs when referencing an array or tuple element, usually means that the index value exceeds the range of the array or tuple.
    - `BadName`: Indicate a bad variable name. Usually occurs when the specified variable name does not meet the specification requirements when evaluating the evaluation expression.
    - `ChildTerminated`: The child coroutine was forcibly terminated.
    - `DuplicateName`: Duplicate name, when the variable name to be initialized is already taken.
    - `DuplicateKey`: Duplicate key, usually occurs when merging objects or collections.
    - `eDOMFailure`: Indicate that a problem was encountered while building the eDOM.
    - `InternalFailure`: Interpreter internal error.
    - `InvalidValue`: Indicate an incorrect, unacceptable value. Usually occurs when an unacceptable value is passed in.
    - `LostRenderer`: Lost connection to the renderer.
    - `MaxIterationCount`: Indicate that the maximum number of iterations has been reached.
    - `MaxRecursionDepth`: Indicate that the maximum recursion depth has been reached.
    - `MemoryFailure`: Memory error, such as internal heap is too small, memory allocation failed.
    - `NoData`: Indicate that the specified data does not exist, or that the specified variable name is not bound to any data.
    - `NoSuchKey`: The key value in the dictionary is wrong, usually referring to a key value that does not exist.
    - `NotIterable`: Indicate that the specified element or data is not iterable.
    - `WrongDataType`: Indicate wrong data type.
- Floating point related:
    - `InvalidFloat`: Indicate that an invalid floating-point number was passed in. For example, when calling `$MATH.asin`, a real number that is not in the range of `[-1, 1]` is passed in.
    - `Overflow`: Indicate an upward overflow error occurred during floating-point arithmetic.
    - `Underflow`: Indicate an underflow error in floating-point arithmetic.
    - `ZeroDivision`: Indicate that a division by zero error was encountered.
- Operating system related:
    - `AccessDenied`: Indicate that access is denied or permissions are insufficient.
    - `BrokenPipe`: The other end of the pipe has been closed.
    - `ConnectionAborted`: The connection was aborted.
    - `ConnectionRefused`: Connection refused.
    - `ConnectionReset`: The connection was reset.
    - `EntityNotFound`: The specified entity (such as a file) was not found.
    - `EntityExists`: When creating a new entity (such as a file), the entity already exists.
    - `EntityGone`: The entity has disappeared.
    - `IOFailure`: Indicate an input/output error.
    - `NotDesiredEntity`: Indicate that an unexpected entity was passed.
    - `NoStorageSpace`: Indicate when there is not enough storage space (such as writing a file).
    - `NameResolutionFailed`: Name resolution failed. The exception should define additional information so that the application can know the specific name that failed to parse.
    - `OSFailure`: Indicate that a general operating system error was encountered that was not explicitly defined as an exception. The exception should define additional information so that the application can get specific error information, such as `errno` on Unix-like systems.
    - `RequestFailed`: The request failed. The exception should define additional information so that the application can get specific request failure information, such as the HTTP protocol status code.
    - `SysFault`: Unrecoverable operating system failure, usually corresponding to the system's `EFAULT`.

In addition, HVML provides `catch` action tag, which can be used to catch specific exceptions and handle them.

In `catch`, `except` and `error` tags, we must surround exception or error names with backticks U+0060 GRAVE ACCENT character (\`). `ANY` is used for any error or exception and is a reserved word.

Error and exception handling instructions are as follows:

1. In `error` and `except` tags, we generally use the tags of the target markup language to define a document fragment, also known as an error and exception template.
1. When an exception occurs, first check whether the current element contains the corresponding `catch` action element. If there is, execute the operation group defined by `catch` element; if not, check whether there is a corresponding `except` sub-element, if yes, clone the document fragment defined in it and append it to the current position of the target document, and pop up Execution continues on the current stack frame. If the exception is not handled by the current element, the current stack frame is popped, and this step is repeated in the previous stack frame until the top of the stack.
1. When an error occurs, first check whether the current element contains a corresponding `error` child element. If so, clone the document fragment defined in it and append it to the current position of the target document, and then directly pop all the stack frames in the current execution stack to the top of the stack. If the error is not handled by the current element, the current stack frame is popped, and this step is repeated in the previous stack frame until the top of the stack.

Exceptions and errors usually occur in the following situations:

1. When evaluating an element's attribute value, content, or calling an executor.
1. The exception encountered when executing the operation corresponding to the action element, such as illegal attribute value, data consistency error, etc.
1. Other situations, such as allocation of stack frames, failure to create new coroutines, etc.

Typically, when an action element, frame element, or template element is set with `silently` adverb attribute, or an external element is set with `hvml:silently` attribute, when evaluating its attribute value or content, or calling the executor , if an ignorable exception is encountered, a reasonable return value should be returned instead of throwing an exception. For example, when calling `$SYS.time(! <number $seconds: seconds since Epoch> )` to set the system time, if the current user does not have permission to modify the system time, an `AccessDenied` exception should usually be generated. However, if the `silently` adverb attribute is set on the element calling this method, no exception will be raised, but `false` will be returned to indicate an execution error.

`silently` attribute mainly applies to the first two cases referred to above; which exceptions can be ignored and which exceptions cannot be ignored are usually determined by the interpreter implementer. The exception generated in the third case will be considered fatal and cannot be ignored, that is, `silently` attribute is invalid for the third case, such as `MemoryFailure` exception caused by a failure to allocate a stack frame.

A sample code for error and exception handling is given below:

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

#### 2.1.13) Preposition Properties

For action tags, HVML defines the following prepositions (such as `on`, `in`, `to`, etc.) attributes, which are used to define the data (or elements) and their collections that the action depends on. like:

- `in`: This attribute applies to all action elements and is used to define the target document location for performing the action. This attribute usually uses CSS selectors to define a collection of elements in the target document, and subsequent operations will be performed on this collection of elements. If the attribute value is not defined, the corresponding value of the preceding stack frame will be inherited. If the element corresponding to the preceding stack frame is a skeleton element, the corresponding position of the skeleton element in the target document will be taken.
- `on`: In the tags of `choose`, `iterate` and other operational data, it is used to define the data, elements or collection of elements that the execution action depends on.
- `from`: In elements supporting external resources such as `init`, `update`, `define`, `load`, it is used to define the external resources that the execution action depends on, and its attribute value is usually a URL.
- `via`: It is used in conjunction with `from` attribute to specify the request method (such as `GET`, `POST`, `DELETE`, etc.).
- `for`: In `observe`, `forget` tags, used to define the event name corresponding to the observe (observe) or unobserve (forget) operation; in `match` tag, used to define the matching conditions.
- `as`: It is define variable names in `init`, `define`, `bind`, `load`, etc. elements.
- `at`: When used in conjunction with `as` attribute, it is used for the scope of the variable name; specify the target position on the target data in `update` element.
- `with`: In `init`, `update`, `define`, `load` and other elements that support external resources, when used with `from` attribute, it is used to define request parameters; defined in `request` element Request parameters; in `iterate` element define the evaluation expression for the iteration result when no executor is used; in the `include` element define the operation group to be referenced; in the `test` element define the test condition.
- `to`: Define specific update actions in `update` tag, such as `append` for appending, `displace` for replacement, etc.; define the stack frame to fall back to in the `back` tag.
- `by`: It is used to define selectors, iterators or reducers when performing test, selection, iteration, and reduction operations, collectively referred to as executors. HVML allows interpreters to support built-in executors. For simple data processing, the built-in executor can be used directly, and in complex data processing situations, classes or functions defined by external programs can be used. In HVML, we use the following prefixes to denote different actuator types:
    - `CLASS:` It means to use the class defined by the external program as the executor.
    - `FUNC:` It means to use the function defined by the external program as the executor.
    - `KEY:` It means to use a certain key name or multiple specified key names to return the corresponding key-value data item, which is a built-in iterator or selector.
    - `RANGE:` It means to use the specified index range to return data items, which is a built-in iterator or selector.
    - `TRAVEL:` It means to use the specified traversal method to traverse the tree structure, which is a built-in iterator or selector.
    - `SQL:` It means to execute SQL queries on structured data, enabling complex selection, iteration, and reduction operations.
    - For other built-in executors for strings and numbers, see [2.6.1) Built-in executors](#261-Built-in executors) subsection of this document.
- `against`: In the `init` element, it is used to specify the unique key value of the collection; in the `sort` element, it is used to specify the sort basis; in the `bind` element, it is used to specify the method name of the binding expression.
- `within`: It is used in `load` and `call` elements to specify the name of the target walker.
- `onto`: The window or page name used in the `load` element to specify the renderer.
- `onlyif` and `while`: In `iterate`, it is used to define the conditional expression for judging whether to continue iterating before and after generating the iteration result.
- `idd-by`: In verb elements, the identifier used to define the element (same as the `id` attribute in noun elements).

#### 2.1.14) Adverb Attributes

For some action tags, HVML defines the following adverb attributes, which are used to modify the operation behavior. like:

- `synchronously`: In `init`, `request`, `call`, `load` and other elements, it is used to define the synchronous request method when obtaining data from an external data source (or operation group); default value; can be abbreviated for `sync`.
- `asynchronously`: In `init`, `request`, `call`, `load` and other elements, it is used to define the asynchronous request method when obtaining data from an external data source (or operation group); it can be abbreviated as `async `.
- `exclusively`: In the `match` element, it is used to define exclusivity; with this attribute, when matching the current action, other `match` elements at the same level will not be processed; it can be abbreviated as `excl`.
- `uniquely`: In the `init` element, it is used to define a collection; with this attribute, the variable defined by `init` will have a unique condition; it can be abbreviated as `uniq`.
- `individually`: In the `update` element, it is used to define the update action to act on each data item of the array, tuple, object or collection; it can be abbreviated as `indv`.
- `once`: In the `observe` action element, it is used to specify only one observation, after which the observation will be automatically dismissed.
- `casesensitively`: When initializing a collection in the `init` action element, the comparison used to specify the unique value is case-sensitive, and can also be used in the `sort` element; can be abbreviated as `case`.
- `caseinsensitively`: When initializing a collection in the `init` action element, the comparison used to specify the unique value is case-insensitive, and can also be used in the `sort` element; it can be abbreviated as `caseless`.
- `ascendingly`: In the `sort` element, it is used to specify that the data items are sorted in ascending order; it can be abbreviated as `asc`.
- `descendingly`: In the `sort` element, it is used to specify that the data items are sorted in descending order; it can be abbreviated as `desc`.
- `silently`: Used to instruct the interpreter to perform silent evaluations and operations to ignore ignorable exceptions encountered while evaluating the current element's attributes, content, or performing operations defined by the element; use `hvml :silently` This way of writing.
- `temporarily`: In the action elements that define variables such as `init`, it is used to specify that the variable is temporary rather than static; all temporary variables are maintained in the context variable (`$!`); can be abbreviated as `temp `.
- `nosetotail`: In `iterate` action element, it is used to use the result of the previous iteration as the input data for the next iteration; equivalent writing: "nose-to-tail"
- `responsively`: In the skeleton element, it is used to define that its text content is responsive; it can be abbreviated as `resp`.
- `noreturn`: In `request` element, it is used to define the return value of ignoring the request; equivalent writing: "no-return".
- `concurrently`: In `call` element, it is used to define a concurrent call; it can be abbreviated as `conc`.
- `constantly`: In `bind` element, it is used to indicate that the expression being bound will return a constant value for the same parameter; can be abbreviated as "const"
- `must-yield`: Indicates that every time an element with this attribute is executed, the current coroutine should be forced to yield (yield) the processor; use `hvml:must-yield` in the external element.

Note: In HVML, we don't need to assign values to adverb attributes.

#### 2.1.15) Referencing Elements or Data

When we need to refer to an element, we use CSS selectors. like:

- `.avatar` means all elements (collections) whose `class` attribute contains `avatar`.
- `#the-user-list` means the element whose `id` attribute is `the-user-list`.
- `:root` indicates the root element of the document.
- `*` means all elements in the document.

Then use the `$DOC.query()` method to get the corresponding collection of elements:

```hvml
     <update on="$DOC.query('#the-user-list > li')" at="attr.class" with="text-info" />
```

Since `on` attribute value of `update` tag does not allow immutable data such as integers and strings, and `on` attribute value of `observe` tag can only be observable native entity or container data, therefore, we also CSS selectors (strings) can be used directly in the `on` attribute value of `update` and `observe` tags. For example:

```hvml
     <update on="#the-user-list > li" at="attr. class" with="text-info" />
```

Essentially, when we use the CSS selector to select the element collection of the target document in `on` attribute value of the above two tags, the interpreter essentially calls `$DOC.query(<selector>)` method.

Since collections of elements specified via CSS selectors typically refer to single or multiple locations in the target document, we use the term "target document location" to refer to elements or collections of elements collectively.

If you want to use parameterized data in the `on` attribute of `update` tag, you must use `$`, `[` or `{` as leading characters:

- `$` is used to define an evaluation expression, such as `$TIMERS[0]`.
- `[` is used to define a parameterized array, such as `[ $foo, $bar, true, false ]`.
- `[!` is used to define a parameterized tuple, such as `[! $foo, $bar, true, false ]`.
- `{` is used to define a parameterized object, such as `{ "$foo" : $bar, "foo": "bar" }`.

In other action tags that may cause confusion, attribute value expression syntax without an equal sign can be used. In this case, literal values (number), `true`, `false`, `null` and other keywords can be used:

```hvml
     <choose on 12345 by="ADD: LE 9999 BY 1000">
         ...
     </choose>
```

Similarly, `with` attribute of action tags uses these rules for referencing data. See [3.1.2.4) Action Element Attributes] (#3124-Action Element Attributes) section of this document for details.

In HVML, when `on` or `in` preposition attribute refers to an element in the target document, if the leading character `>` is used, it will be limited to the scope specified by `in` preposition of the parent element. As in the example below,

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

`> h2 > span` specified by `in` attribute of `choose` tag is equivalent to `#the-user-statistics > h2 > span`; `in` attribute of `iterate` tag is `> dl` and `# the-user-statistics > dl` Equivalent.

Variable reference rules are as follows:

- In document fragment templates or data templates defined by `archetype` and `archedata` tags, we can refer to context variables and named variables for attribute values, text content. At this point, the context variable is defined by the action tag that references this template.
- In HVML action tags, we can refer to context variables as well as named variables for attribute values, text content. At this point, the context variable is defined by the action tag that references this template.
- In an element defined using the target markup language, its attribute values and text or data content can be defined using named variables.

#### 2.1.16) Coroutines and Virtual Machine State

A properly parsed and loaded HVML program runs as a coroutine. HVML defines coroutines with the following four execution stages:

- Scheduled: The stage is scheduled. When the scheduler selects the coroutine in this stage to enter the ready state, it enters the first round of execution stage.
- First-run: The first-run execution phase. When the first round of execution phase is completed, if the coroutine does not observe any events, it will enter the cleanup phase; if there are observers registered, it will enter the event loop execution phase.
- Observing: The event loop execution phase.
- Cleanup: Cleanup phase. During the cleanup phase, the scheduler sends the coroutine's exit or termination status to the parent coroutine (if any).

In addition to the normal execution of coroutines entering the cleanup phase, an HVML coroutine may terminate due to an exception. Therefore, we use the following terms to distinguish the exit or termination status of a coroutine:

- Exited: Implicit exit or voluntary exit; all elements are naturally executed without registering any observers; or the `exit` action element is executed to exit voluntarily. When the coroutine exits, the result data saved in the top stack frame will be used as the result data of the coroutine.
- Terminated: Terminated due to an error or uncaught exception. When the coroutine is terminated, the result data is the exception name.

In the normal scheduling process, an HVML coroutine has the following three execution states:

- Ready: The coroutine is waiting to be executed, and the scheduler will select and execute the coroutine in order.
- Running: The coroutine is running.
- Stopped: The coroutine is stopped waiting for the arrival of specific wake-up conditions, such as sub-coroutine exit, active sleep expiration, asynchronous data fetcher returns data, concurrent call returns results, debugger requests to continue execution, etc. When the set wake-up condition arrives, the scheduler sets the state of the coroutine to ready.

When we load another HVML program asynchronously, we can observe the running status changes of sub-coroutines in the current HVML coroutine. Events related to the running state of the coroutine have a `corState:` prefix, such as `corState:exited` or `corState:terminated`; the event additional data contains the result data.

Usually in the following situations, the coroutine will be set to be suspended by the interpreter:

- In the case of using an external resource loader running independently, when elements such as `init`, `load`, `define`, `archetype`, `archedata`, `error`, `except` load external resources, the interpreter can be set to enter the stop state. When the interpreter obtains the result from the external resource loader, it wakes up the coroutine and continues to process subsequent operations. Note that some of the above elements support `asynchronously` adverb attribute, if this adverb attribute is used, the interpreter does not need to do the above processing.
- When `load`, `call` and other elements are synchronously waiting for other coroutines to return results, the interpreter should set the coroutine to enter the stop state. When the interpreter gets results from other coroutines, it wakes up the coroutine to continue processing subsequent operations.
- When a `sleep` element is executed, the interpreter shall set the coroutine to stop. When the interpreter observes that the sleep has expired, or there is an event that needs to be processed by the coroutine, it wakes up the coroutine to continue subsequent processing.

In addition to the above running states, HVML stipulates that a coroutine has the following rendering states:

- Regular: The coroutine and the renderer perform normal data exchange.
- Closed: The renderer page corresponding to the coroutine is forcibly closed by the user.
- Lost: The walker where the coroutine is located loses the connection to the renderer.
- Suppressed: The interaction between the coroutine and the renderer (including updating the page and accepting interaction events from the renderer) is suppressed.

The HVML coroutine can judge the change of its own rendering state by observing the renderer event on the built-in `$CRTN` variable. Render state-related events correspond to names with `rdrState:` prefix, such as `rdrState:pageSuppressed`.

Each HVML coroutine runs on a specific HVML virtual machine instance, and each HVML virtual machine instance corresponds to a walker in the HVML application framework. The virtual machine instance corresponding to the HVML walker has the following status:

- Boot: Booting.
- Idle: Indicate that there is no coroutine on it.
- Busy: Working.
- Shutdown: Shutdown is in progress.

#### 2.1.17) Structured Data Representation of Document Fragments

The HVML interpreter follows a fixed strategy for accessing the target document subtree (document fragment) as a structured data. For example, consider the following HTML fragment:

```hvml
     <li class="user-item">
         <img class="avatar" src="foo/bar. png" />
         <span>foo</span> (Mainland China)
     </li>
```

It is equivalent to the following JSON data:

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
                 "content": "(Mainland China)",
                 "children": []
             }
         ]
     }
```

It should be noted that when expressing the DOM document structure with structured data, there are many different transformation strategies. However, the HVML interpreter will use a fixed structure for conversion, so that structured queries can be executed on it. Specifically:

1. Each element is represented by a dictionary data, using `tag` key-value pair to describe the tag of the element, using `attr` key-value pair to describe the attribute of the element, and using `children` key-value pair to describe the element Child elements or content.
1. All attributes of an element constitute a dictionary data.
1. The text content of all elements is regarded as a virtual sub-element, whose tag name is `txt`, and whose attribute `content` defines the real text content.
1. The data content of all elements is regarded as a virtual sub-element, whose tag name is `json`, and whose attribute `content` uses eJSON format to define the real data content.
1. The sub-elements (including text content and data content) of each element are described by an array, and each array unit is a dictionary data used to define sub-elements.

When referring to attributes or text content of elements, we use the following conventions:

- When we get the key value of `textContent` key name on an element, it is equivalent to referencing the text content of this element, including the text content of all descendant elements, and the strings connected according to the depth-first traversal path.
- When we set `textContent` key value on an element, it is equivalent to removing all descendant nodes (if any) of the element, and setting the text content of the element to the corresponding key value.
- When we get the key value of `dataContent` key name on an element, it is equivalent to referring to all the data content of this element, including the array formed by the data content of all descendant elements according to the depth-first traversal path.
- When we set `dataContent` key value on an element, it is equivalent to removing all descendant nodes (if any) of the element, and setting the data content of the element to the corresponding key value.
- When we get the key value of `content` key name on an element, it is equivalent to getting the text expression of the document fragment of all descendant nodes (including content and descendant elements) of this element; when setting the key value of the key name , it is equivalent to using text expression to create descendant nodes of the element (replacing the original descendant nodes).
- We can use composite keys like `attr.class` to refer to static attributes of an element. References to an undefined static attribute are treated as if the attribute value were `undefined`.
- Use attribute names like `prop.selectedIndex` or `prop.style.width`, `prop.style[width]` to refer to dynamic properties of an element. References to an undefined dynamic attribute are treated as if the attribute value were `undefined`.

Usually, we use `update` element to modify the static attribute and content of the element; for dynamic attribute , such as the content entered in the `input` box, we need to use `request` element to obtain or set up.

Note: Currently only planned SGML supports using data as element content, i.e. `dataContent`.

#### 2.1.18) MIME Type

`init` and other elements that load data from external resources will determine the loaded data type according to MIME of the resource:

- `text/html`:  It is used to represent a native entity of DOM document.
- `text/css`: string
- `text/javascript`: string
- `text/plain`: string
- `text/*`: string
- `application/xml`: It is used to represent a native entity of DOM document.
- `application/json`: data
- `application/octet-stream`: byte sequence
- `application/*`: byte sequence
- `image/*`: byte sequence
- `audio/*`: byte sequence
- `video/*`: byte sequence
- `font/*`: byte sequence

#### 2.1.19) HVML URI Schema

We introduce `hvml` and `hvml+run` two URI schemas for the HVML application framework.

##### 2.1.19.1) `hvml` Schema

This schema is primarily used by HVML renderers and serves two purposes:

1) Define the page in the HVML renderer

Similar to `http` schema, a complete `hvml` schema includes hostname, application name, traveler name, page group name, page name, and query components, such as:

`hvml://<host_name>/<app_name>/<runner_name/<page_group_name>/<page_name>/?irId=<the_initial_request_identifier>`

As the names of its parts suggest, it contains the following information for an HVML renderer page:

- CPU name.
- Application Name: We use the reserved name `_renderer` to refer to the renderer itself.
- Walker name: We use the reserved name `_builtin` to refer to built-in assets.
- Page group name: We use the special name `-` when the page does not belong to any pagegroup.
- Page name: The name of a normal window or page.
- `irId` query parameter: It is used to pass initial request parameters from the HVML interpreter.

2) Define public resources that the renderer can directly access

At this time, `hvml` is used to describe the public resources provided by an application, such as pictures and style files. At this point, we use the reserved `_builtin` to refer to the walker name, `-` to refer to the page group name, and then use the page name part to refer to the path of the resource being located relative to the public resource storage location:

`hvml://<host_name>/<app_name>/_builtiin/-/<path_to_asset>[?query][#fragment]`

For example:

`hvml://localhost/cn.fmsoft.hvml.test/_builtin/-/assets/logo.png`

Normally, when the host name is `localhost`, the renderer will try to load the specified application common resources locally. The renderer can translate `hvml` to the equivalent `http` or `https` schema for the case from a remote host. For example:

`http://other.host.com/cn.fmsoft.hvml.test/_builtin/-/assets/logo.png`

Similarly, we can use the `_renderer` reserved name to refer to the renderer itself, so that resources can be loaded from the renderer's built-in resources via a URI such as,

`hvml://localhost/_renderer/_builtin/-/assets/bootstrap-5.1.3-dist/css/bootstrap.min.css`

##### 2.1.19.2) `hvml+run` Schema

This schema is mainly used to define a coroutine or channel belonging to a specific walker. It is similar to `ftp` schema. The complete `hvml+run` schema includes the host name, application name, traveler name, resource type (representing the coroutine’s `CRTN` or `CHAN` for channels) and resource identifiers, such as coroutine tokens or channel names, such as:

`hvml+run://localhost/appName/myRunner/CRTN/7`

In HVML programs, we can interact with other walkers of the current application through action elements such as `request`. For convenience, we don't need to specify the schema name and host name. We can use `-` to refer to the current application. In this way, we can use the following abbreviations to refer to the current host. The coroutine or channel belong to the specified walker in the current application, such as:

- Reference the specified coroutine: `/-/otherRunner/CRTN/7`
- Reference the specified channel: `/-/otherRunner/CHAN/channel0`

Similarly, we can also use `-` to refer to the current walker, which can refer to the specified coroutine in the current host, current application, and current walker, such as:

`/-/-/CRTN/7`

When we need to refer to a coroutine on another host, we can use the following writing method:

`//otherhost/otherAppName/otherRunner/CRTN/dispatcher`

In `hvml+run` schema, we reserve special coroutine tokens (equivalent to aliases) as follows:

- `_main`: Indicate the main coroutine, which is the first coroutine created by the specified walker.
- `_first`: Indicate the first coroutine among existing coroutines. Note that `_main` will be unavailable after the first coroutine created by the walker exits, but `_first` is always available.
- `_last`: Indicate the last coroutine among existing coroutines. Note that `_first` and `_last` point to the same coroutine when there is only one coroutine in the coroutine.

### 2.2) Description Syntax of Rules, Expressions and Methods

In HVML, we often use expressions or rule strings in attributes to represent an evaluation behavior, such as:

```hvml
     <init as="locales">
       {
           "en_US" : "English (United States)",
           "en_UK" : "English (United Kingdom)",
           "zh_CN" : "Chinese (Mainland China)",
           "zh_TW" : "Chinese (Taiwan, China)",
           "zh_HK" : "Chinese (Hong Kong, China)",
           "zh_MO" : "Chinese (Macao, China)",
       }
     </init>

     <test on="$locales" in='#the-footer' by="KEY: AS '$global.locale' FOR VALUE">
         <match for="AS 'Chinese (Mainland China)'" exclusively>
             <update on="$@" to="displace" with="$footer_cn" />
         </match>
         <match for="AS 'Chinese (Taiwan,China)'" exclusively>
             <update on="$@" to="displace" with="$footer_tw" />
         </match>
         <match for="LIKE /^English/" exclusively>
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

`by` attribute in `test` tag defines the rules of `KEY` executor. And `for` attribute in `match` tag defines a logical expression that can be used to determine whether a string matches.For example, `LIKE / ^English/` indicates whether the pre-operation result data starts with `English`. Note that the regular expression is used here to represent `^` symbol at the beginning. If `$` symbol at the end of the regular expression is used, it must be escaped to avoid `$` being used as an the leading character processing of an evaluation expression by the HVML parser .

#### 2.2.1) Rule Description Syntax

For such rules, we use a unified description syntax, which is also used to describe evaluation expressions:

1. A rule consists of one or more lexical units.
1. Lexical units are divided into the following categories:
    1. Literal special characters that should be used as they are. For example, colons (`:`) and commas (`,`) are usually used to separate lexical units (groups) with different meanings, surrounded by single quotes (`'` ) .
    1. Literal flag characters that should be used as they are, generally use ASCII uppercase or lowercase letters, surrounded by single quotation marks (`'`).
    1. Literal key words that should appear as they are should be ,which is surrounded by double quotation marks (`"`).
    1. A regular expression, is generally surrounded by two forward and backward slashes (`/`).
    1. English words not surrounded by single quotes, double quotes or slashes or English phrases connected by underscores. For example, `ws` and `literal_integer` are used to represent a named lexical unit.
    1. `...` means to repeat the previous token.
1. If a rule contains the named tokens, a new line will define the syntax of the tokens until all named tokens are fully defined or specified.
1. When defining the grammar of the named lexical unit, use a colon (`:`) after the lexical unit name. After the colon, a new line can be used, but the second line is usually indented.
1. When the interpretation of a named lexical unit has multiple indented line descriptions, each line represents a parallel (single-choice) description.
1. Usually use one line to describe a lexical unit, if it is too long, you can use a backslash (`\`) to indicate a continuation line.
1. Use a pair of angle brackets (`< >`) to denote a lexical unit (group) that must exist.
1. Lexical units (groups) surrounded by square brackets (`[ ]`) are optional.
1. Multiple tokens form a token group; use a pair of braces (`{ }`) to group multiple tokens.
1. If there is no space between multiple lexical units, it means that these lexical units form an inseparable lexical unit group.
1. When a lexical unit is represented by a single or multiple lexical units, or can be selected from multiple lexical units (groups), we use `||`, `&&`, `|` and other symbols to represent these units Whether they can appear at the same time, the rules are as follows:
    1. Concatenated units indicate that all tokens (groups) are to be delivered in the order given.
    1. Two or more lexical units (groups) separated by `&&`, indicating that all these lexical units (groups) must be passed, in any order.
    1. `||` separates two or more lexical units (groups), indicating that one or more of these lexical units (groups) must be passed, in any order.
    1. `|` separates two or more lexical units (groups), indicating that one of them must be passed.
1. The text after the pound sign (`#`) is regarded as a comment.
1. Additional instructions:
    1. The spaces in the rule syntax description do not mean that the actual rules should contain spaces, but only to separate different lexical units for easy reading.
    1. When a lexical unit is represented by a single or multiple literal flag characters, spaces are not used to separate these characters during actual encoding.
    1. When a token is represented by a single or multiple literal keywords, we separate these keywords with one or more horizontal whitespace characters (i.e. spaces or horizontal tabs).

For example, the following is a hypothetical rule. In its grammatical description, we often use regular expressions. The related grammatical description is:

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

According to the above syntax, the following rule strings are legal:

```
     FOO: ALL
     FOO:ALL
     FOO: LIKE 'a wildcard card such as *.md'
     FOO: LIKE "a wildcard card such as *.md"
     FOO: LIKE /a regular expression like ^[0-9]*[1-9][0-9]*$/
     FOO: LIKE 'zh_??'i5
     FOO: LIKE "zh_??"i5
```

The following rule string does not meet the syntax requirements:

```
     FOO:
     FOO: ALL 'a literal string'
     FOO: LIKE
     FOO: ALL LIKE 'a literal string'
     FOO: LIKE 'zh_?? "i5
```

In addition, we often use regular expressions in rules, so we need to pay attention to the following points:

- Regular expressions enclosed in `//` shall conform to the POSIX.1-2001 standard.
- Because `//` is used to define a regular expression, when the regular expression contains a literal `/` character, it needs to be escaped.
- When using the trailing `$` character in a regular expression, it needs to be escaped.
- When using `\t`, `\w`, `\s`, etc. to express specific characters in the regular expression, the `\` symbol needs to be escaped.

`regexp_flags` after the regular expression specifies matching flags (optional), which can be one or more of the following flag characters:

- `g`: global match.
- `i`: case-insensitive search.
- `m`: multi-line search.
- `s`: Allow `.` to match newlines.
- `u`: use UNICODE.
- `y`: Perform a sticky search, matching starts at the current position of the target string.

That is, the following regular expression notation is correct:

```
/^head/
/tail\$/im
```

And the following regular expression is wrong:

```
/^head/tail/
/tail\$/ima sf
```

For more information, please see:

- `man regex` on Linux
- Python 3 re module: <https://docs.python.org/3/library/re.html>
- JavaScript Regular Expressions: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags>

In the other two modes of string matching (general matching and wildcard matching), flag characters similar to regular expressions can also be used, and the maximum matching length can be specified additionally.

- `matching_flags`: Indicate flag characters in general matching and wildcard matching modes, which can be one or more of the following key characters:
    - `i`: Ignore case.
    - `s`: Treat all whitespace characters (U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, or U+0020 SPACE characters) as spaces (U+0020 SPACE characters).
    - `c`: Compress consecutive identical whitespace characters into a single whitespace character.
- `max_matching_length`: Indicate the maximum matching length (in characters).

For example, `LIKE 'zh_??'i5` means to match only five characters, not case-sensitive. For this match condition, the following strings will match correctly:

- `zh_CN`
- `ZH_TW Taiwan is an inalienable part of Chinese territory`
- `zH_Hongkong`

And the following strings cannot be matched correctly:

- `zh-C`
- `xx_CH`

#### 2.2.2) Evaluation Expressions Syntax

A legal evaluation expression (`hybrid_evaluation_expression`) needs to conform to the following syntax rules and can be used recursively:

```
     <hybrid_evaluation_expression>:
         '$' <hybrid_variable_addressing_expression>
         '{$'<hybrid_variable_addressing_expression>'}'
         '${'<hybrid_variable_name_evaluation_expression>'}'
         '{{' [ws] <compound_hybrid_evaluation_expression> [ws] '}}'

     <extended_json>: See the section "2.2.5) eJSON Syntax" in this document, where the JSON value can be an evaluation expression.

     <compound_hybrid_evaluation_expression>:
         <hybrid_evaluation_expression> | <extended_json> [[ws] < ';' | '&&' | '||' > [ws] <hybrid_evaluation_expression> | <extended_json>, ...]

     <hybrid_variable_name_evaluation_expression>:
         [ <literal_variable_token> ]<hybrid_evaluation_expression>[<literal_variable_token_other_char>, ...]

     <hybrid_variable_addressing_expression>: <literal_variable_name>[<hybrid_addressing_expression>, ...]
        <literal_variable_name>: Used to directly refer to a named data.
        <hybrid_addressing_expression>: Used to refer to a member of a container.

     <hybrid_expression>: <hybrid_evaluation_expression> | <extended_json>

     <hybrid_addressing_expression>:
        '.'<literal_key_name>'(' [ws] <hybrid_expression>[<',' [ws] <hybrid_expression> [ws]>, ...] [ws] ')': used to call specific Getter method for the key name.
        '.'<literal_key_name>'(!' [ws] <hybrid_expression>[<',' [ws] <hybrid_expression> [ws]>, ...] [ws] ')': for calling on dynamic objects A setter method for a specific key name.
        '.'<literal_key_name>: used to refer to the key value of an object.
        '[' [ws] <hybrid_evaluation_expression> | <quoted_key_name> | <literal_integer> [ws] ']': used to refer to a specific element of an array, tuple or to refer to a key value of an object, especially when the corresponding key When the name does not conform to the variable name rules mentioned above.

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
     <unihan_ideograph>: /\u{4E00}-\u{9FFC}\u{F900}-\u{FAD9}\u{3400}-\u{4DBF}\u{20000}-\u{2A6DD}\ u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\ u{2FA1D}\u{30000}-\u{3134A}/

     <ws>: /[ \t\f\n\r]+/ # white space
     <hws>: /[ \t]+/ # horinzontal white space
```

It should be noted that we allow the use of negative numbers as index values when using `[ ]` to refer to members of arrays, tuples, or sets. When a negative number is used as an index value, it ranges from -1 to the number of members of the array or collection, starting with the last member.

For compound evaluation expressions, we define the following rules:

1. The evaluation result of a CHEE refers to the result of the last evaluation expression evaluated in the CHEE; all intermediate results will be discarded.
1. A CHEE can be nested within another CHEE.
1. You can use `//` or `#` to define line comments between expressions.

The processing steps are as follows:

1) Set the first CHEE among CHEEs as the current HEE.
2) Evaluate the current HEE to form the current evaluation result, then,
    - If it is followed by `;`and there is a next HEE, adjust the next HEE to the current HEE and jump to the second step; if there is no next HEE, then jump to the third step.
    - If it is followed by `&&`, first do boolean processing on the current evaluation result. If it is `true`, then adjust the next HEE (if any) to the current HEE and jump to the second step. Otherwise, skip After evaluating the next HEE (if any), adjust the next HEE (if any) to the current HEE and jump to step 2. In the above process, if there is no HEE that can be evaluated, then jump to the third step.
    - If it is followed by `||`, first do boolean processing on the current evaluation result. If it is `false`, adjust the next HEE (if any) to the current HEE and jump to the second step. Otherwise Skip the evaluation of the next HEE (if any) and adjust the next HEE (if any) to the current HEE and jump to step 2. In the above process, if there is no HEE that can be evaluated, then jump to the third step.
3) Set the evaluation result of the entire CHEE as the evaluation result of the last evaluated HEE, discarding other intermediate results.

#### 2.2.3) Common Denoted Noun Units

The following named lexical units will not be described repeatedly in the following text:

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

Besides,

1. `literal_number` follows the [JSON] syntax.
1. `literal_integer` is essentially the same as `literal_number`. But it should be converted to the nearest integer for use in the internal implementation of the executor.
1. `ip_literal`, `ipv4_address` and `reg_host_name`, see `Section 3.2.2` of [RFC 3986].

In addition, since the rule string of the executor is usually used as an attribute value, considering that the attribute value can be surrounded by single quotes and double quotes, the string literal in the rule can use single quotes (`'`) or surrounded by double quotes (`"`):

- Strings in rules should be surrounded by single quotes (`'`) when the attribute value itself is surrounded by double quotes (`"`).
- When the attribute value itself is surrounded by single quotes (`'`), the string in the rule should be surrounded by double quotes (`"`). Note that in this case, `$` in the attribute value will be treated as a literal, not used to define an evaluated expression.

So string literals in all rules, when these strings contain literal single quotes (`'`) or double quotes (`"`), are required to escape. Other special characters, such as +U0009 TAB, etc. , are refer to [JSON] syntax:

1. The special characters that need to be escaped include: `\\`, `\/` (not mandatory), `\b`, `\f`, `\n`, `\r`, `\t`.
1. When the string in the rule is surrounded by single quotes (`'`), the literal single quotes (`'`) contained in the string should be escaped: `\'`.
1. When the string in the rule is surrounded by double quotes (`"`), the literal double quotes (`"`) contained in the string should be escaped: `\"`.
1. When the string in the rule is surrounded by double quotes (`"`), the literal dollar sign (`$`) contained in the string should be escaped: `\$`.
1. `\uHHHH` uses four hexadecimal digits to represent a Unicode character, such as `\uA0A0`; C language hexadecimal or octal (such as `\xA0\xA0`) is not supported.

The above instructions apply to `literal_char` and `literal_char_sequence`.

Note that since HVML requires UTF-8 encoding, `literal_char` is essentially a multibyte sequence corresponding to the string type. When the actual `literal_char` contains multiple Unicode characters, only the first character takes effect.

#### 2.2.4) Description Syntax of Dynamic Object Methods

When describing the parameters and return values of the getter and setter methods of dynamic objects, we use the following syntax:

1. When describing a parameter, the type of the parameter must be specified, plus an optional formal parameter name; if the parameter is optional, you can use `=` to give the default value of the formal parameter. For example:
    - `number $seconds`.
    - `boolean $case_insensitivity = false`.
    - `string`.
    - `string = 'auto'`.
1. Optionally, add a colon U+003A (`:`) after the parameter type (and formal parameter name) and describe its purpose surrounded by backticks U+0060 (\`) (or use C language comment symbols) . For example:
    - number $seconds: /\* seconds since epoch \*/
    - boolean $case\_insensitivity = false: \`performs a case-sensitive (@false) or a case-insensitive (@true) check.\`
    - string: locale category
1. If keywords such as `true`, `null`, `undefined` are included in the description, use U+0040 (@) leading symbol.
1. Use `native/<entityName>` to describe native entity types, where `<entityName>` is the name of this native entity type.
1. The following type aliases can be used:
    1. `any`: Any type.
    1. `real`: Any real number type, ie one of `number`, `longint`, `ulongint` or `longdouble`.
    1. `linctnr`: Linear container, ie `array`, `tuple` or `set`.
    1. `container`: container, namely `array`, `tuple`, `object` or `set`.
1. When parameters can pass multiple types, use `|` to separate them, such as: `string | number`.
1. When multiple or single keywords are used in the string parameter to indicate single or multiple options, we separate these keywords with spaces, and use symbols such as `||` `&&` to indicate whether these keywords can appear at the same time, and then Surround the entire string parameter with single quotes (`'`) or double quotes (`"`), such as `"kernel-name || machine"` or `'kernel-name && machine'`. The specific rules are described as follows:
    1. Concatenated keywords indicate that all keywords (groups) are to be passed in the given order.
    1. Two or more keywords (groups) separated by `&&`, indicating that all these keywords must be passed, in any order.
    1. Two or more keywords (groups) separated by `||`, indicating that one or more of these keywords must be passed, in any order.
    1. `|` separates two or more keywords (groups), indicating that one of them must be passed.
    1. Use a pair of square brackets (`[ ]`) to group multiple keywords.
    1. Do not use the preceding parameter type `string`.
1. The keywords used in the parameters are composed of printable characters that do not contain spaces and control characters; when multiple keywords need to be passed in the parameters, use single or multiple ASCII blank characters to separate them.
1. When enumerating and describing the use of keywords, describe a keyword in one line and use the leading character `-`.
1. The return value type of the method is described after the closing bracket U+0029 (`)`); when multiple types may be returned, use the `|` symbol to separate. Optionally, add a colon (`:`) after the type name and a brief description of the return value.
1. Optionally, we describe the parameters or syntax units that must be included in a pair of angle brackets (`< >`); for optional parameters or syntax units, include them in a pair of square brackets (`[ ] `) described in.

The situation where keywords are used in the above syntax to indicate options, examples are as follows:

- `'kernel-name | kernel-release | kernel-version | machine | all'`: Indicates that only one of these keywords can be passed.
- `'[kernel-name || kernel-release || kernel-version || machine] | all'`: means to either pass `all` or pass one or more of the preceding optional keywords, in any order.

For example, we use the following syntax to describe the interface of `$DATA.numerify` method:

```javascript
// Numericize the given data and return the specified real number type, which defaults to `number`.
$DATA.numerify(
         any $data,
         'number | longint | ulongint | longdouble' $subtype = 'number': `the number subtype to return.`
) number | longint | ulongint | longdouble : `the numberified data.`
```

or,

```javascript
// Numericize the given data and return the specified real number type, which defaults to `number`.
$DATA.numerify(
         <any $data>
         [,
             <'number | longint | ulongint | longdouble' $subtype = 'number': `the number subtype to return.`>
         ]
) number | longint | ulongint | longdouble : `the numberified data.`
```

The above syntax can also be used to describe the properties of objects, such as:

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

#### 2.2.5) eJSON Syntax

When the content of the HVML element is data content, we can mix extended JSON syntax to describe a certain structured data, and nested evaluation expressions. This section describes the extended JSON syntax.

1) When the content does not start with a newline character (U+000A LF or U+000D CR character), it will be parsed as the text content of an ordinary HTML element and HTML character references are supported, otherwise it will be processed according to the extended JSON syntax. like:

```hvml
<foo id=text>123456&amp;</foo>

<foo id=number>
123456
</foo>
```

 `foo` element with  `id` of `text` has the content of the string `123456&`. Another `foo` element has the content of the numeric value `123456`.

2) When the key name of an object starts with an ASCII letter and only contains ASCII letters, numbers, minus signs, and underscores, the double quotes around the key name can be omitted. In other cases, double quotes must be used. like:

```javascript
{
     width: "device-width",
     initial-scale: 1.0,
     minimum-scale: 0.5,
     maximum-scale: 2.0,
     user-scalable: true,
     "Region": "zh-CN"
}
```

3) The last key-value pair in an object, after the last unit of an array, may contain a comma (,). like:

```javascript
{
     age: 10,
     weight: 30,
     height: 150,
}
```

or,

```javascript
[
         { age: 10, weight: 30, height: 150, },
         { age: 11, weight: 32, height: 145, },
]
```

4) Use the following suffix to clearly indicate the type of number:
    - Signed long (64-bit): 1234567890L
    - Unsigned long (64-bit): 1234567890UL
    - `0x` prefix can be used to represent the signed long integer in hexadecimal representation, and `L` suffix can be ignored in this case: 0x1122AABBCCDDEEFF
    - You can use `0x` prefix to represent the signed long integer in hexadecimal representation, and `L` suffix can be ignored in this case: 0x8899AABBCCDDDEEFFU
    - Long double precision floating point number: 1234567890FL

Value that do not explicitly specify a type are all treated as double-precision floating-point numbers.

5) The object key name or string can be surrounded by single quotes (`'`) or double quotes (`"`). The difference between single quotes and double quotes is that when using double quotes, the single quotes do not need to be converted Definition processing. They evaluate the expression contained in it, and stringize the evaluation result and concatenate it with other parts as the final result. When using single quotes, the double quotes do not need to be escaped , which ignore expressions that may exist in it. For example:

```js
{
     'Title': "David's Book",
     "Description": 'Daivd says: "This is my book"',
}
```

Note that unescaped C0 control characters are not allowed in strings defined by double quotes and single quotes.

6) You can use `"""` (triple-double-quote) to define a multi-line text string, and keep the ASCII tab or newline character (U+0009 TAB, U+000A LF) , U+000D CR), single quotes (`'`), and double quotes (`"`) that do not appear three times in a row do not need to use escape symbols. Similarly, `'''` (triple-single-quote) can be used to define a multi-line text string, and ASCII tabs or newlines, double quotes (`"`) and Single quotation marks (`'`) that do not appear three times in a row do not need to use escape symbols.

For example:

```js
{
     id: 1234567890UL,
     nickname: "David",
     signature:
"""
one

     Delayed by 'program'

         "Young artists.
""",
}
```

The difference between triple single quotes and triple double quotes is that when using triple double quotes, the expression contained in it will be evaluated.And the result will be stringified and concatenated with other parts as the final result. When using triple When single quotes are used, evaluated expressions within them are ignored.

Note that in strings defined by triple double quotes and triple single quotes, unescaped characters, except ASCII tabs or newline characters (U+0007 TAB, U+000A LF, U+000D CR)  outside the C0 control character.

7) For byte sequence types, prefixes such as `bx`, `bb`, `b64` are used to represent hexadecimal representation, binary representation and Base64 encoding respectively. For example:

```js
{
     hex: bx00112233445566778899AABBCCDDEEFF,
     binary: bb0011.1100.0011.0011,
     base64: b64UHVyQyBpcyBhbiBIVk1MIHBhcnNlciBhbmQgaW50ZXJwcmV0ZXIuCiA=,
}
```

If no characters follow `bx`, `bb`, `b64` prefix, it means an empty sequence of bytes.

When using binary expression, the period in the middle is optional, it is only used for convenience of reading, and it is ignored during parsing.

8) Surround definition tuples with `[!` and `]`. For example:

```js
[! 'Title', "David's Book", "Description", 'Daivd says: "This is my book"' ]
```

### 2.3) Frame Tag Details

Frame tags are used to define the frame structure of an HVML program, there are three tags: `hvml`, `head` and `body`.

Note that in frame tags, we can use HVML-defined adverb attributes, such as `silently`, to indicate that silent evaluation is performed when evaluating its attribute value and content.

In addition to the adverb attribute and the specified attribute, other attributes defined in the frame tag (such as `lang` attribute defined in `hvml` tag) will be cloned into the corresponding element of the target document after being evaluated .

#### 2.3.1) `hvml` Tag

`hvml` tag defines an HVML program (or HVML document). `hvml` tag supports the following attributes:

- `target`: Define the target markup language of the HVML program, take the value of `void`, `html`, `xml` and so on, usually the name of a target markup language (or target document type). The HVML interpreter should at least support the special object markup language `void`. As the name implies, `void` type does not produce any actual object document content, so it can run normally without a renderer. At this time, HVML programs and general scripts The procedures are not fundamentally different. When the target markup language is defined as `void`. The interpreter will maintain a special eDOM tree. Any updates to this eDOM tree will be completely ignored. And executing `$DOC.query` on it will always return empty Elements collection.

Note that `target` attribute and all HVML adverb attributes should not be cloned into the root element of the target document.

In addition to comments, `hvml` element can contain sub-elements defined by the following two tags:

- Zero or one head element defined by the `head` tag, if any, must be defined as the first child element of `hvml` element.
- Zero or more body elements defined by the `body` tag.

#### 2.3.2) `head` Tag

`head` tag is used to define the header information of the HVML code, which can contain sub-elements defined by the following tags:

- Tags that can be left unchanged in the target document, such as `<meta>`, `<link>`, etc. tags of HTML documents.
- Initialization of global data, which is defined using `init` tag.
- Global dynamic object, which is defined using `init` tag.
- Global persistent connection data source, which is initialized with `init` tag and `$STREAM` predefined variable.
- Global templates, which is defined using `archedata`, `archetype`, `error`, `except`, etc. tags.

In HVML programs, `head` tag is optional and has no predefined attributes.

When the target markup language supports `head` tag, its attributes and content as well as all elements defined using non-HVML tags, will be cloned into the `head` element of the target document. When the target markup language does not support the `head` tag, its attributes will be discarded, and its content and all child elements defined using non-HVML tags will be placed under the root element of the target document.

#### 2.3.3) `body` Tag

`body` tag is used to define the body content of the HVML program. In an HVML program, multiple `body` local contents can be defined, and `id` attribute can be used to distinguish different ontology contents. During execution, different ontology contents can be loaded via `load` element.

When the target markup language supports `body` tag, its attributes will be cloned into `body` element of the target document. If the target markup language does not support `body`, its attributes will be discarded.

#### 2.3.4) Content of `hvml` Tag

Inside `hvml` tag, we can use evaluation expressions, which will be evaluated during execution. And the result will be set as the execution result of `hvml` element. And the stack frame corresponding to `hvml` element is always the topmost stack frame.Therefore, the result data of `hvml` element will also be the execution result of the entire HVML coroutine. Inside `hvml` tag, we can define multiple expressions, and the evaluation result of the latter expression will overwrite the result data of `hvml` element. For example:

```hvml
<hvml target="void" lang="$STR.substr($SYS.locale, 0, 2)">
     {{
         $STREAM.stdout.writelines('Start of `Hello, world!`');
         $STREAM.stdout.writelines("$DATETIME.fmttime('%H:%m')")
     }}

     <head>
         <title>$T. get('Hello, world!')</title>
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

As for the above HVML program, the result data of `hvml` element will be the execution result of the entire HVML coroutine. Thus, normal execution of the above program evaluates to the result of the last evaluated expression: 6 (the number of bytes written to standard input with the string "11:00" plus an extra newline).

### 2.4) Template tag Details

The template tag essentially defines a document fragment template or data template, which can be regarded as a parameterized string or parameterized data. Therefore, we can actually use `init` tag to obtain the same function as the template tag.

All template tags can use their content to define a template, or use the URL defined by `src` attribute to get template data from an external data source. When using both `src` attribute and content to define template data, an attempt will be made to load the specified external resource as template data, and if that fails, the content will be used instead. For example:

```hvml
     <archetype name="user_item" src="foo:///nonexistent_dir/templates/user_item">
         <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
             <img class="avatar" src="$?.avatar" />
             <span>$?.name</span>
         </li>
     </archetype>
```

The above code specifies the wrong protocol name for `src` attribute value. The request will fail, therefore, the content-defined template data will end up being used.

When we get template data from an external URL, we can use the following attributes:

- `src`: It is used to specify the external data source URL.
- `param`: Request parameters in the form of `a=10&b=20`, which need to be encoded according to [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986).
- `method`: Such as `GET`, `POST`, etc.

All template tags support the following attributes:

- `silently` attribute: When this attribute is defined, evaluation of the attribute's value will perform silent evaluation.
- `raw` attribute: When this attribute is defined, `$` in the template data will be treated as a literal character, and expression evaluation processing will not be performed.

#### 2.4.1) `archetype` Tag

`archetype` tag is used to define a document fragment template.

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

In the above example, the first `archetype` tag defines a document fragment template that can be used to generate the final target document fragment and insert it into the specified position of the target document. When the HVML interpreter clones the template and inserts it into the real document, it will replace the data in the current context according to the given mapping relationship. In HVML, `$?` is a special context variable used to refer to the pre-operation result data when the action tag is executed. Strings like `$?.id`, `$?.name` will be evaluated as evaluation expressions, and finally replaced with data from the current context.

In the example above, the second `archetype` tag defines a bare-text template containing a fragment of an XML/HTML document that is cloned to the target location without any evaluation of the expression, even if it contains a valid Evaluation expression.

In addition, in the `archetype` tag, we can also use `type` attribute to define the text type of the template fragment, which can take the following values:

- `plain`: Treat as plain text.
- `html`: Treat as an HTML fragment.
- `svg`: Treat as an SVG fragment.
- `mathml`: Treat as a MathML fragment.
- `xgml`: Treat as an XGML fragment.
- `xml`: Treat as a generic XML fragment.

If no `type` attribute value is specified, the default text type of the target document is taken. For example, when the target document type is `html`, the document fragments defined by `archetype` tag will be processed as HTML fragments by default.

Essentially, the template content defined by `archetype` is a string variable whose variable name is defined by `name` attribute.

Note that the variable name used to refer to a specific `archetype` template, unlike HTML/XML, HVML does not require the identifier to be globally unique, but only required to be unique among sibling elements of the same level in HVML, which brings certain convenience. for example:

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

In the above HVML code, when we refer to `$user_item` in the `ul` element, the corresponding document template is `<li>$?</li>`, and `$user_item` is referenced outside the `ul` element `, the resulting document template is `<p>$?</p>`.

#### 2.4.2) `archedata` Tag

`archedata` tag is used to define a data template.

```hvml
     <archedata name="item_user">
         {
             "id": "$?.attr[data-value]", "avatar": "$?.children[0].attr.src",
             "name": "$?.children[1].children[0].textContent", "region": "$?.attr[data-region]"
         }
     </archedata>
```

In the example above, `archedata` tag defines a data template that is handled like an `archetype`, but is generally used to map one piece of data to another that is structured differently.

Essentially, `archedata` defines a parameterized data that can be referenced by a variable name defined by the `name` attribute.

#### 2.4.3) `error` Tag

`error` tag is used to define an error-specific document fragment template. `type` attribute can be used to specify the corresponding error name. But `name` attribute does not need to be specified. When defining error names, you must use the backtick attribute value syntax.

When `type` attribute is not specified, or when the `ANY` value is used, it means the default error template, which can match any error.

Essentially, the content defined by `error` tag sets the key value of `ERROR` variable corresponding to `type` key name, so the functions of the following two tags are the same:

```hvml
     <error type=`SegFault`>
         <p>Memory error!</p>
     </error>

     <update on="$ERROR" at=".SegFault">
         "<p>Out of memory!</p>"
     </update>
```

#### 2.4.4) `except` Tag

`except` tag is used to define a document fragment template for exceptions. `type` attribute can be used to specify the corresponding exception name, but `name` attribute does not need to be specified. When defining exception names, you must use the backtick attribute value syntax.

When `type` attribute is not specified, or when `ANY` value is used, it means the default exception template, which can match any exception.

Essentially, the content defined by `except` tag sets the key value of `EXCEPT` variable corresponding to `type` key name. So the functions of the following two tags are the same:

```hvml
     <except>
         <p>There is an uncaught exception.</p>
     </except>

     <update on="$EXCEPT" at=".ANY">
         "<p>There is an uncaught exception.</p>"
     </update>
```

Note that when defining the exception template above, we did not specify `type` attribute, indicating the default exception template. In `update` tag, what we change is the key value of the key name `ANY` on `$EXCEPT` data, which means that we use `ANY` key name to save the default exception template.

### 2.5) Action Tag Details

#### 2.5.1) `init` tag

`init` tag defines an element that performs initialization or reset of variables. Using `init` tag at the head of an HVML program (defined by `head` tag), will initialize a global variable. Using `init` tag within the body of an HVML program (defined by `body` tag) will by default define a local variable that is only valid within the subtree defined by its parent element.

By default, we use `init` tag to initialize or override a static variable, but if we use `temporarily` adverb attribute in `init` tag, a temporary variable will be created.

Usually, we use `as` attribute to specify the name of the variable to be initialized, we can use `at` attribute to specify the name space of the variable (name space) or in the case of creating a temporary variable, specify the stack frame where the variable is located:

- If you initialize a static variable, when we use the predefined names `_parent`, `_grandparent`, `_root` starting with an underscore (\_), the variable will be defined on the parent element, grandparent element or root element respectively.
- If you initialize a static variable, when we use the predefined name `_runner` starting with an underscore (\_), a runner-level variable will be created, which will be visible to all coroutines of this runner.
- If initializing a temporary variable, when we use the predefined names `_last`, `_nexttolast`, and `_topmost` starting with an underscore (\_), they will be in the previous stack frame, the previous stack frame and the topmost stack frame respectively Define temporary variables above.
- Element identifiers starting with a pound sign (#), such as `#myAnchor`, will search for the specified element identifier (specified by `id` attribute of the element) in its ancestor elements (or previous stack frames), and will Initializes the variable on the first matching ancestor element (or preceding stack frame).
- When using a positive integer N (such as `2`, `3`), if a static variable is initialized, N ancestor elements will be traced back along the vDOM tree to the ancestor element, and the variable will be initialized on the ancestor element; if a temporary variable is initialized, it will be Backtrack N stack frames along the execution stack, and initialize variables on the stack frame.
- In the case of silent evaluation, if no matching ancestor element or previous stack frame is found, it will be treated as if `at` attribute is not defined.

We usually use `with` attribute to define an evaluation expression (or parameterized data) to specify the value of the variable. We can also directly embed the evaluation expression inside `init` tag, thus using its data content to define the value of this variable. We can also load external resources through protocols such as HTTP, such as HTTP requests. At this time, use `from` attribute to define the URL of the request, use `with` parameter to define the request parameters, and use `via` attribute to define the request method ( such as `GET`, `POST`, `DELETE`, etc.).

We can also use `init` tag to initialize a custom dynamic object from the shared library. At this time, the attribute value of the given `via` is `LOAD`, which means loading an external program module. When using the `init` element to load a dynamic object, we specify the name of the external program module to be loaded through the `from` attribute. Determining the specific file name and the storage location of the module file according to the module name depends on the specific interpreter implementation. If there are multiple dynamic objects defined in the external program module (such as C/C++ language shared library), use the `for` attribute to specify the name of the dynamic object to be loaded.

When we use the `from` attribute in `init` tag, `via` attribute is not `LOAD`, and `asynchronously` adverb attribute is used. The data will be asynchronously fetched from the external resource as the value of the variable. The program can do further processing by observing `change:attached` on the variable. See [2.5.11) `observe`, `forget` and `fire` labels](#2511-observe-forget-and-fire-labels) for details.

It should be noted that when using the asynchronous loading method to initialize a variable, when the data of the external resource is returned, the program has already left the context (execution stack) where `init` element is located, so it cannot handle the situation where the data contains context variables. The interpreter can restrict the data in this case to be only the original data (raw data).

Using `init` tag on an already initialized variable will reset the variable with new data, while using `undefine` to reset the variable has the same effect as deleting the variable.

The interpreter determines which data to use to initialize or reset a variable according to the following rules:

1. When `from` attribute is specified and `asynchronously` adverb attribute is not specified, the data will be fetched from the specified external resource synchronously. In this case, `with` attribute value is used to specify the request parameters; when the synchronous request fails (note: an exception may be thrown at this time), if there is content defined, the content data will be used as the source data.
1. When `from` attribute is specified and `asynchronously` adverb attribute is not specified, the data will be fetched from the specified external resource asynchronously. In this case, if there is content defined, the content data will be used as the source data first, and when the asynchronous loading is successful, the value of this variable will be reset to the loaded data.
1. When `from` attribute is not specified, if `with` attribute is defined, the value of the `with` attribute is used to initialize or reset the variable. In this case, the content is ignored. If `with` attribute is not defined but the definition has content , then use the content as the initialized or reset variable. If neither is defined, a `NoData` exception is thrown.

When using `init` tag to initialize a collection, we can use `casesensitively` or `caseinsensitively` adverb attributes to specify whether the string comparison is case-sensitive. The default is case-sensitive.

Common uses of this tag are as follows:

```hvml
     <!-- Initialize a collection with an array of objects -->
     <init as="users" uniquely against="id">
         [
             { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
             { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
         ]
     </init>

     <!-- Initialize a collection with an array of strings (case-insensitive) -->
     <init as="locales" uniquely case insensitively>
         [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK", "en_us" ]
     </init>
     <!-- The result is:
         [ "zh_CN", "zh_HK", "zh_TW", "en_US", "en_UK" ]
     -->

     <!-- Load the dynamic object $math from the shared library -->
     <init as="math" from="purc_dvobj_math" via="LOAD" />

     <!-- Get data from http://foo.bar.com/locales using POST method with from=foo query parameter and initialize $locales -->
     <init as="locales" from="http://foo.bar.com/locales" with="{ from: 'foo' }" via="POST" />

     <!-- override $users variable -->
     <init as="users">
         [
             { "id": "1", "avatar": "/img/avatars/101.png", "name": "Jerry", "region": "en_US" }
             { "id": "2", "avatar": "/img/avatars/102.png", "name": "Tom", "region": "en_US" }
             { "id": "3", "avatar": "/img/avatars/103.png", "name": "Mike", "region": "en_US" }
         ]
     </init>

     <!-- reset the `users` variable with an empty array -->
     <init as="users" with="[]" />
```

We can also use `at` attribute in `init` tag to specify the element position where the variable name is located. For example:

```hvml
<body>
     <!-- Initialize a collection with an array of objects on the `body` element (unique key is id) -->
     <init as="users" uniquely against="id">
         [
             { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
             { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
         ]
     </init>

     <div>
         <!-- Use the `at` attribute to override the `users` variable on the `body` element -->
         <init as="users" at="_grandparent">
             [
                 { "id": "3", "avatar": "/img/avatars/3.png", "name": "Vincent", "region": "zh_CN" },
                 { "id": "4", "avatar": "/img/avatars/4.png", "name": "David", "region": "en_US" }
             ]
         </init>

         <!-- Create a `users` variable on the `div` element, initialized to an empty array -->
         <init as="users" with="[]" />

         <section id="myAnchor">
             <div>
                 <!-- Create a `users` variable on the `section` element, initialized to an empty array -->
                 <init as="users" with="[]" at="#myAnchor" />

                 <!-- Create an `emptyUser` variable on the `section` element, initialized to an empty object -->
                 <init as="emptyUser" with="{}" at="_grandparent" />
             </div>
         </section>
     </div>

     <!-- remove the users variable from the `body` element -->
     <init as="users" with=undefined />
</body>
```

The execution result (`$?`) of the `init` element is the data corresponding to the variable.

We can also not specify `as` attribute of `init`, so that we only use the `init` tag to initialize a piece of data, and then use the result data ($?) of `init` element to complete the corresponding work. In this case, we usually do not use the asynchronous initialization mode.

```hvml
     <init from="http://foo.bar.com/locales" with="{ from: 'foo' }" via="POST">

         <!-- do something here by using `$?` -->
     </init>
```

The exceptions that may be thrown by `init` element are:

- When the variable name specified by `as` attribute does not meet the requirements, `BadName` exception will be thrown.
- When the ancestor element or the preceding stack frame name specified by the `at` attribute does not meet the requirements or does not exist, `BadName` exception or `EntityNotFound` exception will be thrown respectively.

When we use `temporarily` adverb attribute in `init` tag, it will manipulate or prepend the user-defined context variable `$!` in the stack frame, thereby creating a temporary variable:

- Initially, `$!` shall be defined as an empty object. Adding a user-defined temporary variable means adding a new key-value pair to this object, the key name is the name of the temporary variable, and the key value is the value of the temporary variable.
- When using the `as` attribute, the key-value pair specified in the user-defined context variable `$!` will be initialized or overwritten by default, but we can use `at` attribute to specify the target stack frame through element identifiers, etc.
- When accessing a temporary variable in the current or previous stack frame, `$[N]!.<name of the temp. variable>` expression can be used.
- For convenience, you can also use `$<name of the temp. variable>` expressions to access temporary variables.
- As a restriction, temporary variables cannot be initialized asynchronously, that is, the `temporarily` adverb attribute cannot be used at the same time as the `asynchronously` adverb attribute. If both adverb attributes are specified, `asynchronously` should be ignored.

When we only look up named variables based on the name, it is processed according to the following rules:

1. When naming a variable based on a name query, the execution stack will traverse the previous stack frame upwards to find the first matching temporary variable;
1. If not found, start from the parent element of the vDOM element position corresponding to the current stack frame, and search for the corresponding static named variable in the ancestor element node.

#### 2.5.2) `update` Tag

 `update` tag defines an action element that performs a data update operation that modifies a destination data using a source data. The target data should be mutable data or a native entity data on which an update action can be performed, such as an array, a tuple, an object, or a specific data item of an array, tuple or object, a collection or a target document location (i.e. a collection of elements).

This tag supports the following attributes:

1. `on` attribute is used to specify the array, tuple, object, collection or target document location to be modified, that is, the target data.
1. `at` attribute specifies the specific location to modify on the target data, such as key name, index value, etc., which is called the destination position. The data of the target data at the target position is called ultimate data. When the data to be modified is the target data itself, this attribute is not specified, and the final data is the target data itself.
1. `to` attribute specifies a specific modification action, which can take one of the following values:
    - `displace`: Indicates that the data at the entire replacement target position is the default action.
    - `append`: means to perform an append operation in the target data or target location; the final data must be an array or target document location.
    - `prepend`: Indicates that the prepend operation is performed in the target data or the target location; the final data must be an array or the target document location.
    - `insertBefore`: Indicate inserting a data before the target data or target position; the final data must be an array or target document position.
    - `insertAfter`: means to insert a data after the target data or the target position; the final data must be an array or the target document position.
    - `add`: When the final data is an array or the target document location, it is equivalent to `append` operation. When the final data is a collection, adds the source data to the given collection.
    - `remove`: When the final data is an array or the target document position, it means to remove the data at the target position. When the final data is a collection, it means to remove a data item that matches the source data from the collection.
    - `overwrite`: Indicate that an object or collection overwrite operation is performed on the target data or target location. When the final data is an object, the source data must be an object. This action will replace the key-value pair with the same key name in the final data object with the key-value pair in the source data. When the final data is a collection, the final data must be a collection of objects based on unique key values. The source data can be a single object or a linear container (array, tuple or collection). This action will overwrite the matching source data in the final data Item object.
    - `merge` or `unite`: Indicate to perform the merge operation of objects or collections on the target data or target location. When the final data is an object, the source data must be an object; the merged final data (object) contains the original key-value pairs and the key-value pairs in the source data, and for duplicate key names, replace them with the values in the source data. When the final data is a collection, the source data must be a linear container (array, tuple or collection), this action will merge the data items in the source data (array, tuple or collection) into the final data (collection), when When a uniqueness condition conflicts, the source data is used instead.
    - `intersect`: Indicate to perform the intersection operation of the object or collection on the target data or target position. When the final data is an object, the source data must be an object; only key-value pairs corresponding to keys that exist in both the final data and the source data are kept in the final data (object) after operation, and other key-value pairs are removed. When the final data is a set, the source data must be a linear container (array, tuple, or set); the action will only keep in the final data items that exist in both the final set and the source data (determined using the uniqueness condition of the set ).
    - `subtract`: Indicate to perform the subtraction operation of the object or set on the target data or target position. When the final data is an object, the source data must be an object; the key-value pair corresponding to the key existing in the source data is removed from the final data (object) after the operation. When the final data is a collection, the source data can be a linear container (array, tuple or collection); this action will remove the data items determined by the source data according to the uniqueness condition of the collection in the final data.
    - `xor`: Indicate the OR operation of an object or collection on the target data or target location. When the final data is an object, the source data must be an object; the final data (object) after the operation retains key-value pairs corresponding to keys that only exist in the final data or the source data. When the final data is a set, the source data must be a linear container (array, tuple, or set); this action is equivalent to finding the difference between the union and the intersection.
1. `from` attribute specifies the external data source for modifying the operation source data, such as URL; at this time, use `with` attribute to specify the request parameters, and use `via` attribute to specify the request method.
1. When `from` attribute is not defined, `with` attribute specifies the source data used by the modification operation; when `from` attribute is defined, `with` attribute specifies the request parameters.
1. `via` attribute specifies the method of obtaining the external data source, such as `GET`, `POST`, etc., and is only valid when `from` is specified.

When specifying the source data, when the source data must be a linear container (array, tuple or set), a single data can also be treated as an array containing only one member to facilitate programming.

When specifying the source data, in addition to `with` attribute and `from` attribute, we can also use the content data of `update` element. The priorities of the three source data specification methods are:

1. When `from` attribute is specified, it will try to get data from the specified external resource synchronously. In this case, `with` attribute value is used to specify the request parameters; when the synchronous request fails (note: an exception may be thrown at this time), if there is content defined, the content data will be used as the source data.
1. When `from` attribute is not specified, if `with` attribute is defined, the value of `with` attribute will be used as the source data first. And the content will be ignored in this case. If `with` attribute is not defined but the content is defined, then use content as source data and throw `NoData` exception if neither is defined.

When executed successfully, the result data of `update` element is the modified target data.

##### 2.5.2.1) Specify Target Location

For the following document snippet:

```hvml
     <div id="the-user-statistics">
         <h2>User regions (totally <span class="none">0</span> users):</h2>
     </div>
```

We set the number of users and modify their `class` attribute through `update` tag below:

```hvml
     <update on="#the-user-stats > h2 > span" at="textContent" with="10" />
     <update on="#the-user-stats > h2 > span" at="attr. class" with="text-warning" />
```

After executing the above `update` action, the above HTML snippet will become:

```hvml
     <div id="the-user-statistics">
         <h2>User regions (totally <span class="text-warning">10</span> users):</h2>
     </div>
```

Similarly, we perform `update` actions on arrays, tuples, objects, etc. For example to update the name (`name`) of the second user in `$users`:

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

When the target data is the target document location (element or element collection), array, tuple or object, we use the attribute value of `at` to specify the location or name of the data member to be changed, such as `textContent`, `attr. class` and `.name` etc. Its rules are as follows:

- If the target data is an element, we use the virtual data member name `textContent` to represent the text content of the element.
- If the target data is an element, we use `dataContent` virtual data member name to represent the element's data content.
- If the target data is an element, we use `content` to indicate that the fragment of the target document is used as its content (this may change the structure of the DOM subtree).
- If the target data is an element, we use `attr.<attr_name>`, `attr[attr_name]` to represent the static attribute name of the element, such as `attr.value` or `attr[value]` to represent the `value` of the element attribute value.
- If the target data is an object, we use `.<key_name>` or `[<key_name>]` to represent the key name of the data item.
- If the target data is an array, we use `[<index_num>]` to represent the `<index_num>`th data item in the array.
- If the target data is a tuple, we use `[<index_num>]` to represent the `<index_num>`th data item in the tuple.

We can use the preposition attribute value specification syntax without the equal sign, such as:

```hvml
     <update on $users[0] at '.age' with 3 >
         <update on $users[1] at '.age' with $math.add($?.age, 1) />
     </update>
```

In the above example, for `age` attribute of the target data `$users[0]` and `$users[1]`, we use the attribute value specification syntax without the equal sign. The first `update` element uses the constant `3`; the second `update` element uses the evaluated expression and the context variable `$?` (that is, the result of the previous `update`, which is `$users[ 0]`), so it evaluates to `4`.

When we use `undefined` to assign a value to a data item of an array or object, the value item will be deleted (same as the effect of the `erase` tag), such as:

```hvml
     <update on $users[1] at=".age" with undefined />
```

You can also use the `remove` action:

```hvml
     <update on $users[1] at=".age" to="remove" />
```

When the above `update` tag acts on the above `$users`, the result is:

```json
     [
         { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US", "age": 2 },
         { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
     ]
```

When we need to modify multiple data items in an `update` tag at the same time, we use spaces in the `at` attribute value to represent multiple data item positions, and use arrays in the `with` attribute value to correspond to these positions. Modifications. Such as the following three `update` tags:

```hvml
     <update on="p > a" at="textContent" with="$?.se_name" />
     <update on="p > a" at="attr.href" with="$?.se_url" />
     <update on="p > a" at="attr.title" with="$?.se_title" />
```

They can be combined into an `update` tag:

```
     <update on="p > a" at "textContent attr.href attr.title" with ["$?.se_name", "$?.se_url", "$?.se_title"] />
```

When `at` specifies multiple target positions, and the number of them does not match the number of array data items of `with` attribute value, the position where no value is specified takes the last value of `with` attribute.

When `at` specifies multiple target locations and `with` attribute value is not an array, `with` attribute value acts on all target locations.

When we perform an update action directly on the target data, we don't specify `at` attribute:

```hvml
     <init as="newUser">
         { "id": "0", "avatar": "/img/avatars/0.png", "name": "Annoymous", "region": "en_US", "age": 2 },
     </init>

     <update on="$users" to="prepend" with $newUser />
```

The above code will append `$newUser` to the beginning of `$users`, thus becoming the first member of the users array.

In addition, when the evaluation result of the attribute value is a string, we can also use attribute modification operators other than `=` to modify the final data. For details, see this document [3.1.2.4) Action element attributes] (#3124- action element attribute).

In addition, when the attribute value is numeric data, we can also use attribute modification operators other than `=` to modify the final data. For details, see this document [3.1.2.4) Action element attributes] (#3124-Action element attribute).

When the target data is a collection of elements, the update action set by `update` tag will act on the data of all elements in the collection at the specified position. For example,

```hvml
    <update on="span" at="attr.class" with="text-danger" />
```

It will modify all elements of type `span` in the target document named `text-danger`.

When the target data is an object, tuple, array, or set, and has `individually` adverb attribute, the update action set by `update` tag will act on the data at the specified position of all data items in the array. like,

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
             "nameEN": [ "Chinese (mainland of China)", "Chinese (Taiwan, China)", "English (USA)"],
             "nameZH": [ "Chinese (Mainland China)", "Chinese (Taiwan, China)", "English (US)"],
         }
     </init>

     <update on="$localeNames" at="[2]" to="remove" individually />
```

The first `update` tag in the above code changes the `region` of all users in the `$users` collection to `zh_CN`; the second `update` tag changes the second `region` of all key values in `$localeNames` Data item deletion. The following results are obtained respectively:

```json
     [
         { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "zh_CN" },
         { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" },
     ]
```

and

```json
     {
         "locales": [ "zh_CN", "zh_TW" ],
         "nameEN": [ "Chinese (mainland of China)", "Chinese (Taiwan, China)"],
         "nameZH": [ "Chinese (Mainland China)", "Chinese (Taiwan)"],
     }
```

An exception will be thrown if the update operation breaks the uniqueness condition of the collection.

##### 2.5.2.2) Update collection

When the target data is a collection, `at` attribute value will be ignored, and only actions such as `unite` for collections can be performed. An exception will be thrown if the update operation breaks the uniqueness condition of the collection.

The following code defines a `$users` variable as a collection (using `id` as the unique key), and defines an array of `$new_users` objects:

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

Note that we use `id` as the unique key name, so the value corresponding to the key name will remain unique in the collection.

We use the following `update` tag with `$new_users` as the source data, using the `unite` action:

```hvml
     <update on="$users" to="unite" with="$new_users" />
```

The following results are obtained:

```json
     [
         { "id": "1", "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
         { "id": "2", "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" },
         { "id": "3", "avatar": "/img/avatars/3.png", "name": "David", "region": "zh_CN" }
     ]
```

Similarly, when we want to add a new timer, modify `$TIMERS` using the `update` tag as follows:

```hvml
     <update on="$TIMERS" to="unite">
         [
             { "id" : "foobar", "interval" : 3000, "active" : "yes" },
         ]
     </update>
```

As another example, when we need to overwrite a specific data item in the global timer, we can use the `overwrite` action:

```hvml
     <update on="$TIMERS" to="overwrite">
         { "id" : "foo", "active" : "yes" }
     </update>
```

When we want to delete timer `foo`, we can use `subtract` action:

```hvml
     <update on="$TIMERS" to="subtract">
         { "id" : "foo" }
     </update>
```

#### 2.5.3) `erase` Tag

`erase` tag defines an action element that performs a removal operation, used to remove a specified data item from the target data, and supports `on` and `at` preposition attributes. `on` attribute is used to specify the target data, which can be an array, a tuple, an object, a collection of elements, or a native entity that supports removal operations. `at` is used for the data sub-item to be removed, and if not specified, it means all data items . The result data of the `erase` element is the number of items removed.

For example, for the following HTML code snippet:

```hvml
     <div id="the-user-statistics">
         <h2 class="text-info">User regions (totally <span class="none"></span> users):</h2>
     </div>
```

We delete the `h2` element with the following `erase` tag:

```hvml
     <erase on="#the-user-stats > h2" />
```

After performing the above `erase` action, the above HTML snippet will become:

```hvml
     <div id="the-user-statistics">
     </div>
```

We delete the `class` attribute in the `h2` element with the following `erase` tag:

```hvml
     <erase on="#the-user-stats > h2" at="attr.class" />
```

After performing the above `erase` action, the above HTML snippet will become:

```hvml
     <div id="the-user-statistics">
         <h2>User regions (totally <span class="none"></span> users):</h2>
     </div>
```

Note that when `on` attribute value specifies a collection of elements, `erase` tag will remove all elements in the collection, or the specified attributes or content of all elements.

Similarly, we can also perform `erase` action on arrays. For example to clear the second member of `$users`:

```hvml
     <erase on="$users" at="[1]" />
```

Note that when we execute the `erase` action on a tuple, the corresponding member will be set to null.

We can also perform the `erase` action on objects. For example, clear the `name` attribute of `$users[0]`:

```hvml
     <erase on="$users[0]" at=".name" />
```

`at` attribute value can be the index value of the array or the attribute name of the object (multiple can be specified, separated by spaces):

```hvml
     <erase on="$users[0]" at=".name .age" />
```

As an example, the following code uses `erase` tag in `iterate` tag to delete the members of the array at intervals:

```hvml
     <iterate on="$DATA.count($users)" by="SUB: GE 0 BY 2">
         <erase on="$users" at="[$?]" />
     </iterate>
```

#### 2.5.4) `clear` Tag

`clear` tag defines an element that performs a clear operation, which clears an array, object, collection of elements, or a native entity object that supports clear operations. This element only supports `on` preposition attribute, which is used to specify the target data and produce `true` or `false` two result data, indicating success or failure respectively.

For example, for the following HTML code snippet:

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

We clear all child nodes of `dl` node with the following `clear` tag:

```hvml
     <clear on="#the-user-stats > dl" />
```

After executing the above `clear` action, the above HTML code snippet will become:

```hvml
     <div id="the-user-statistics">
         <h2>User regions (totally <span class="none"></span> users):</h2>
         <dl>
         </dl>
     </div>
```

Similarly, we can perform `clear` actions on data items as well. For example, clear the second user information in `$users`:

```hvml
     <clear on="$users[1]" />
```

After executing the above clear command, the second user data item of `$users` still exists, but the data item will become empty.

Note that when `on` attribute value specifies a collection of elements, `clear` tag will perform a clear operation on each element in it.

#### 2.5.5) `test`, `match` and `differ` Tags

##### 2.5.5.1) Multi-Branch Processing

`test` tag is used in conjunction with `match` tag, and is mainly used to implement branch processing. `test` element defines which data item to perform the test on through `on` attribute, and `match` is used as a sub-element of `test` element, and each `match` sub-element defines a matching branch.

`test` element can support `by` attribute, and an execution result can be obtained through the executor specified by this attribute. If no `by` attribute is defined, its result data is the `on` attribute value. Whereas a `match` element always yields a true value (`true`) as its result data. Note that branches defined by `match` elements that do not meet the matching conditions will not be executed.

Note that `test` element treats the executor the same as `choose` element when `by` attribute is used.

Please see the sample code below:

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

The above example performs the test on `$global.locale` data item (specified by the `on` attribute). And the operation is restricted to the target document location where `#the-footer` (specified by `in` attribute) is located. In the element defined by the `test` tag, use `match` tag to define several sub-elements, which are used to define the matching conditions `AS 'zh_CN'`, `AS 'zh_TW'` and `LIKE '*'` respectively action.

After the interpreter selects a matching `match` sub-element, if the `match` sub-element defines `exclusively` adverb attribute, it will no longer check the branches defined by other `match` sub-elements. Also, except for the `catch` sub-element, other non-`match` sub-elements (including outer elements) within the `test` element will be ignored.

As far as the above sample code is concerned, assuming that the `locale` of the data referred to by `$global` is defined as `zh_CN`, the resulting HTML fragment is as follows:

```hvml
<footer id="the-footer">
     <p><a href="http://www.baidu.com" title="Baidu">Baidu</a></p>
</footer>
```

It should be noted that `test` action always determines an action result, which will become the value of the context variable `$?` of the child element, which is generally a string or a number. When the `by` attribute is used, the built-in executor or external executor specified by this attribute can be used to obtain a matching data from the data specified by `on`. In this case, the working method of the executor is the same as that of `choose` The elements are the same.

For matching conditions, we can use `on` preposition attribute in `match` element to define an expression, and judge whether it matches by booleanizing the result of evaluating the expression, or use `for` preposition attribute Defines a matching condition based on the execution result of `test` element, either, but `for` attribute has higher priority.

When using `on` preposition attribute, we can use an evaluation expression to determine the matching condition; when the evaluation result is Booleanized, if the result is `true`, it is considered a match, otherwise it is regarded as a mismatch. For example, `match` element that matches `zh_CN` in the above HVML code can be written as follows:

```hvml
         <match on="$L. streq('case', 'zh_CN', $?)" exclusively>
             <update on="$@" to="displace" with="$footer_cn" />
         </match>
```

When using `for` preposition attribute, simple logical expressions can be used to define matching conditions. Its rules are described as follows:

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

For example, we can write a matching rule as follows:

```hvml
     <match for="GT 10 AND LT 100">
         ...
     </match>
```

It should be noted that when the matching rule specified by `for` attribute of `match` tag is not `ANY`:

1. If the matching rule specified by `for` attribute of `match` element is a numerical comparison expression (such as `GT`, `LT`), perform numerical processing on the result data of `test` element before matching.
1. If the matching rule specified by `for` attribute of `match` element is a string matching expression (such as `AS`, `LIKE`), then perform string processing on the result data of `test` element before proceeding match.
1. ~~If the result data of its parent element (that is, `test`) is a real number type, the matching rule specified by the `for` attribute of `match` tag is processed as a numerical comparison logical expression. At this time, the logical expression It is invalid to use string matching expressions (such as `AS`, `LIKE`) in . ~~
1. ~~If the result data of its parent tag (that is, `test`) is of other types, the matching rule specified by `for` attribute of `match` tag is processed as a string comparison logical expression. At this time, the logical expression It is invalid to use numerical comparison expressions (such as `GT`, `LT`) in the formula. When the result data is not a string type, it should be stringified. ~~

##### 2.5.5.2) Choose One of the Two

As a simplification, we can use the value of `with` attribute of `test` element to determine how to handle the subtree of operations defined by `test` element:

```hvml
     <test with="$STR.stars_with($CRTN.app, 'cn.fmsoft.hvml')">
         ...

         <!-- when the value of `with` attribute of `test` element is false -->
         <differ>
             ...
         </differ>
     </test>
```

The above code, when the value of `with` attribute is `true`, continue to execute the operation subtree of the element, but ignore the operation subtree defined by `differ` sub-element; if the result of the evaluation of the attribute value is `false `, only the operation subtree defined by `differ` sub-element is processed. In this case, `differ` element is optional. `differ` element does not use any prepositional and adverbial attributes other than `in`. Similar to `inherit`, this element will inherit the context variable of the previous operation by default. If there is data content defined, `$^` context variable of the corresponding stack frame will be overwritten with the data content.

When `with` and `on` attributes are specified at the same time, `on` attribute will be prioritized. That is, to use this simplification, `on` attribute cannot be specified.

#### 2.5.6) `choose` Tag

`choose` tag defines an action element that performs a selection operation that produces a data item on the data specified by `on` attribute that can be processed by subsequent action elements.

`choose` element can support `by` attribute, and an execution result data can be obtained through the executor specified by this attribute. If no `by` attribute is defined, the resulting data is the value of `on` attribute.

For example, to realize the function of dynamically generating search links according to the current `locale`, we can also use the `update` element nested in `choose` element to complete related functions, such as:

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

In the above example, we specified a built-in KEY executor in `by` preposition attribute of `choose` element, which takes the value of `$global.locale` as the key name and returns `on` preposition The corresponding key value on `$locales` dictionary array specified by the attribute, using the key value to implement the element update operation in the target document fragment specified by the `in` preposition attribute through the subsequent `update` sub-element.

In complex situations, we can also specify an external executor in `by` attribute to complete the selection action. See this article [2.6.2) External actuators] (#262-External actuators) for details.

#### 2.5.7) `iterate` Tag

##### 2.5.7.1) Using Iterative Executors

The `iterate` tag is used to define an action element that performs an iterative operation, which performs an iterative operation on the specified iterable data. For example, we can iteratively process an array, use the `update` sub-element for each data item obtained through iteration, replace the specified document fragment template with the data item obtained through iteration, and insert it into the target document. Such as the following HVML code snippet:

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

The above HVML code defines the `users` data in the `head` element, which is an array of dictionary structures. In the `body` element, the program iterates over the `$users` array and clones the `$user_item` template-defined document fragment and appends (`append`) it to where `#the-user-list` is located. During iteration, the tag uses the `IUser` class defined by the external program to obtain the data items obtained by each iteration.

Classes defined using external executors can be used to implement more complex iteration logic and operations. But in some simple cases, we can also use the built-in executor to complete the iterative operation:

```
     <iterate on="$users" in="#the-user-list" by="RANGE: FROM 0 ADVANCE 2">
         <update on="> [id=user-$?.id] span" at="attr.class" with ~= "text-* text-info" />
     </iterate>
```

The above HVML code performs iteration over the `$users` data, but without using an external executor, the `RANGE` keyword is used to define the iteration range. `RANGE: FROM 0 ADVANCE 2` means to fetch all array items whose index subscripts are even numbers in the `$users` array, and then perform the update operation defined by the `update` tag for these data items. In the `update` tag, the target element is first defined using the `on` preposition attribute: `[id=user-$?.id] span`. This expression uses a CSS selector to find child elements in the eDOM subtree defined by `#the-user-list`, where `$?.id` represents the user identifier obtained by the current iteration. If present, set its `class` attribute to `text-info`. This way, all user entries with an even index value will be rendered using the styles defined by the `text-info` class.

##### 2.5.7.2) Does not use iterative executor

We can also use the `with` attribute to directly define the evaluation expression of the iteration result, instead of using the iteration executor defined by the `by` attribute. At this point, we can use the `onlyif` attribute and/or `while` attribute to define a conditional expression that determines whether to start a new iteration before obtaining the iteration result, or a conditional expression that determines whether to terminate the iteration after obtaining the iteration result.

When not using the iterative executor, the attributes or context variables of the `iterate` element should be processed according to the following steps.

When the `on` attribute is defined, we treat the value of the `on` attribute as the input value for each iteration, and then use the `with` attribute to find the next value:

1. Before the first iteration:
    - Initialize `$0%` with 0.
    - Initialize `$0<` with the value of the `on` attribute.
    - Initialize `$0@` with `in` attribute value or inherit from `$@`.
1. Before each iteration:
    - Evaluates the expression defined by the `onlyif` attribute, and if the booleanized result is `false`, then terminate the iteration, otherwise continue the iteration. If `onlyif` is not defined, it is considered to be `true`.
1. In each iteration:
    - Set `$0<` to `$0?`; evaluate content expression (result is set to `$0^`); process child elements.
1. After each iteration:
    - Evaluate the expression defined by the `with` attribute, if the result of the evaluation is one of `false`, `null` or `undefined` (boolean processing is not done here), then terminate the iteration, otherwise, if there is an adverb attribute `nosetotail`, reset `$0<` using the evaluation result of the `with` attribute. If `with` is not defined, it is treated as `undefined`.
    - If a `while` attribute is defined, the expression defined by the `while` attribute is evaluated, and if the result is booleaned to `false`, the iteration is terminated. If the `while` attribute is not defined, its value is considered to be `true`.
    - If the above steps do not cause the iteration to terminate, then `$0%` is incremented by 1 and a new iteration is started.

The following example generates a column of even numbers less than 100:

```hvml
     <init as "evenNumbers" with []>
         <iterate on 0 onlyif $L.lt($0<, 100L) with $DATA.arith('+', $0<, 2) nosetotail>
             <update on="$evenNumbers" to="append" with="$?" />
         </iterate>
     </init>
```

When the `on` attribute is not defined, we take the `with` attribute as input and iterate over the result:

1. Before the first iteration:
    - Initialize `$0%` with 0.
    - Initialize `$0@` with `in` attribute value or inherit from `$@`.
1. Before each iteration:
    - Evaluates the expression defined by the `onlyif` attribute, and if the booleanized result is `false`, then terminate the iteration, otherwise continue the iteration. If `onlyif` is not defined, it is considered to be `true`.
1. In each iteration:
    - Evaluate the expression defined by the `with` attribute. If the evaluation result is one of `false`, `null` or `undefined` (boolean processing is not done here), then terminate the iteration, otherwise, use ` The evaluation of the with attribute resets `$0<`. If `with` is not defined, it is treated as `undefined`.
    - Set `$0<` to `$0?`; evaluate content expression (result is set to `$0^`); process child elements.
1. After each iteration:
    - If a `while` attribute is defined, the expression defined by the `while` attribute is evaluated, and if the result is booleaned to `false`, the iteration is terminated. If the `while` attribute is not defined, its value is considered to be `true`.
    - If the above steps do not cause the iteration to terminate, then `$0%` is incremented by 1 and a new iteration is started.

The following example reads all directory entries under a specific directory:

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

#### 2.5.8) `reduce` Tag

`reduce` tag defines an element that performs a Reduce operation. Similar to `choose` element, `reduce` element supports `on` attribute and `by` attribute, and its result data is the result of the reduction operation.

We can use `by` attribute in `reduce` tag to specify a built-in executor, and the implicit reduction operation will be performed based on the data generated by the built-in executor. For example, the following code:

```hvml
     <init as="regionStats">
         { "zh_CN": 100, "zh_TW": 90,"zh_HK": 90, "zh_SG": 90, "zh_MO": 80, "en_US": 70, "en_UK": 80}
     </init>

     <reduce on=$regionStats by="KEY: ALL">
         ...
     </reduce>
```

The implicit reduction calculation will be performed on the following array basis:

```json
[ 100, 90, 90, 90, 80, 70, 80 ]
```

The result of the statute is:

```json
{
     "count": 7,
     "sum": 600,
     "avg": 85.71,
     "max": 100,
     "min": 70,
}
```

See [2.6.1.8) Use of built-in executors] (#2618-Use of built-in executors) in this specification for details on the implicit specification operations.

When the implicit protocol operation cannot meet our requirements, we can implement the required protocol operation through an external executor. For example, in the above example, we use the external function executor (`StatsUserRegion`) to count the number of users from different regions, and finally form a data similar to the following:

```json
    {
        "count": 19,
        "regions": { "中国大陆": 10, "中国台湾": 7, "其他": 2 }
    }
```

Usually `reduce` element will form another iterable data, and then we can nest `iterate` and other elements to perform subsequent actions. For example, the following HVML code snippet:

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

The above code uses the external function executor `StatsUserRegion` to perform the reduction operation on `$users`, and then forms a statistical result as described in the JSON format above, including the number of the entire user and the number of users in all regions. Then use `update` tag, `clear` tag, `iterate` tag to perform three follow-up actions:

- `update` tag: It is used to update the content of the `#the-user-statistics > h2 > span` element to the total number of users.
- `clear` tag: It is used to clear all child elements of the `#the-user-statistics > dl` element.
- The `choose` tag: It is used to convert `$?.regions` object to an array of key-value objects.
- `sort` tag: It is used to sort the results of `choose` action (array of key-value objects) in descending order by `v` (the number of people in the area).
- `iterate` tag: Used to append user statistics by region to the `#the-user-statistics > dl` element.

Assuming that the result after performing the reduction operation is the same as the data given in the aforementioned JSON format, the document fragment obtained after performing the above operation is:

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

#### 2.5.9) `sort` Tag

`sort` tag defines an action element that performs a sort operation on the specified array. This element supports the following attributes:

- `on` attribute specifies which data to sort.
- `by` attribute specifies a built-in executor that converts `on` data into an array, or an external function executor that sorts `on` data directly. If not specified, the default sorting is performed; at this time, the data specified by `on` attribute must be an array or a collection.
- `with` attribute specifies additional parameters when using an external executor.
- `against` attribute specifies the basis for sorting; when the array to be sorted is composed of objects, this attribute specifies a single or multiple key names participating in the sorting.
- Use the `ascendingly` (default) and `descendingly` adverb attributes to specify whether to use ascending or descending order.
- Use the `casesensitively` (default) and `caseinsensitively` adverb attributes to specify whether to sort strings case-sensitively or not.

The following code performs a sort on `$users`:

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

The result is:

```json
     [
         { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom", "region": "en_US" },
         { "id": 2, "avatar": "/img/avatars/2.png", "name": "Jerry", "region": "zh_CN" }
         { "id": 3, "avatar": "/img/avatars/3.png", "name": "David", "region": "en_US" }
     ]
```

`sort` action element supports sorting by either string or numeric types, depending on the type of the first sorted data obtained from the array. If the first data type involved in sorting is `number`, `longint`, `ulongint` or `longdouble`, use numeric sorting, otherwise use string sorting. When using numeric values, all data is sorted after being numeric, and when using strings, all data is sorted after stringing.

When `against` is used to specify a key name, but the array member is not an object, or the specified key name does not exist, the corresponding key value is `undefined`.

We can use `by` attribute to specify an external function executor that performs the sorting. like:

```hvml
     <sort on="$?.regions" by="FUNC: mySort">
         ...
     </sort>
```

We can also use the built-in executor to first generate an object on the data specified by `on` attribute, and then perform the default sort on the resulting data. For example, the following code:

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

First, the built-in executor specified by by is used to complete the conversion from the object to the key-value object array, and the conversion result is:

```json
    [
        { "k": "中国大陆", "v": 10 },
        { "k": "其他",     "v": 2  },
        { "k": "中国台湾", "v": 7  }
    ]
```

Then sort the above array in descending order for `v` key value, and the result is:

```json
    [
        { "k": "中国大陆", "v": 10 },
        { "k": "中国台湾", "v": 7  },
        { "k": "其他",     "v": 2  }
    ]
```

Essentially, the above HVML code is the same as the following using `choose` followed by `sort`:

```hvml
     <choose on="$regions" by="KEY: ALL FOR KV">
         <sort on="$?" against="v" descendingly>
             <iterate on="$?" in="> dl" by="RANGE: ALL">
                 <update on="$@" to="append" with="$region_to_users" />
             </iterate>
         </sort>
     </choose>
```

When we do not use an external executor, `on` attribute or the built-in executor specified by `by` attribute must provide an array for sorting. When using an external executor, `on` attribute specified The data type is determined by the external executor. For example, we can perform a sort operation on a string, and the result of the execution may be to arrange all the words in the string in lexicographical order.

#### 2.5.10) `define` and `include` Tags

`define` tag is used to define a set of reusable groups of operations. We can define a set of operations through `define`, and then include this set of operations through `include` tag elsewhere in the code, or call this set of operations through `call` tag and expect to return a result. In HVML, we refer to a group of operations defined by `define` tag as an operation group for short.

`define` element defines the name of the action group through `as` attribute, which contains a set of child elements defined by the action tag. `include` element will switch the execution context to the operation group specified by the `with` attribute. The parameters passed in by `on` attribute will be used as the result data (ie the value of `$?` variable) for the operation group, and `include` The data defined by the element through its content will become the value of the `$^` variable. For example:

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

The above HVML code uses the action group defined by `$fillDirEntries` when `listbox` is initialized, and when the user clicks `#goRoot` or `#goHome` button. Note that in the three places where `include` tag is used, different parameters are passed in through `on` attribute, and the target document location is specified using `in` attribute.

Essentially, the work done by `include` element is equivalent to copying the specified operation group to the current location for execution, which we call execute in place. For example, if the above code does not use `define` and `include`, it is equivalent to:

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

`include` performs groups of operations in-place similarly to closures in other programming languages. For example, `dir_entry` template is used in the above `fillDirEntries` operation group, and this template is only defined once. But with a little modification, you can override the default `dir_entry` template by defining a new one called `dir_entry` before including the action group. Note the note in it:

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
             <!-- Defines a new `dir_entry` template that displays a `/home/` (path) prefix before filenames -->
             <archetype name="dir_entry">
                 <item class="$?.type">/home/$?.name</item>
             </archetype>

             <!-- `fillDirEntries` action group will use the new `dir_entry` template above -->
             <include with="$fillDirEntries" on="/home" in="#entries" />
         </listbox>

         <button id="goRoot">
             root
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

`define` element can load an HVML snippet from a specified URL using `from` attribute. With this feature, we can use groups of operations with different functions as common modules for different HTML programs to use. In addition, when using the content of `define` element and the HVML fragment specified by `from` attribute to define an operation group, the operation group will first use the content definition, and when the HVML fragment defined by `from` attribute is correctly loaded, use The loaded HVML fragment is bound to the operation group name.

For example, we define an action group in `/module/html/listitems.hvml` to display array items:

```hvml
     <ol>
         <iterate on="$?" by="RANGE: FROM 0">
             <li>$?</li>
         </iterate>
     </ol>
```

And the default operator group writes the array members to the standard output stream:

```hvml
     <define as="listitems" from="/module/$CRTN.target/listitems.hvml">
         <inherit>
             $STREAM.stdout.writelines($?)
         </inherit>
     </define>

     <include with="$listitems" on=['Line #1', 'Line #2'] />
```

In the above code, when the loading or parsing of the HVML fragment specified by `from` attribute of `define` element fails, the program can still run normally, but the actual operation effect is different. This capability gives us a very flexible feature:

1. The normal operation of an HVML program may not depend on a specific target document type.
1. We can make the same HVML program generate different target document fragments according to different target document types.

When using `from` attribute, `define` behaves as follows:

1. Attempt to load the HVML fragment specified by `from` synchronously, if unsuccessful, stops loading, throws an exception, and retains the operation group defined by the content. If successful, then,
1. Attempt to parse the loaded HVML fragment, if unsuccessful, stops loading, throws an exception, and preserves the operation group defined by the content. If successful, then,
1. If the parsed vDOM fragment tree does not contain any valid child elements, stop loading, throw an exception, and keep the operation group defined by the content. If successful, then,
1. The corresponding variable (specified by `as` attribute value) points to the parsed vDOM fragment tree.

Similar to `init` tag, when using `define` tag to load HVML fragments from external resources, you can use attributes such as `with` and `via` to specify query parameters and request methods.

In essence, we can treat operation groups as a special kind of data, and there is no essential difference between using `define` to define a named operation group and using `init` to initialize a variable. Therefore, we can also use the `at` attribute to specify the scope of the action group name, and the `async` adverb attribute to asynchronously load and parse the action group, and use the `observe` element to observe the state of variables.

The following code loads multiple HVML fragments via the `iterate` action element:

```hvml
<hvml target="html" lang="en">
     <head>
         <base href="$CRTN. base(! 'file:///' )" />

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

For the above code, if there are two HVML fragment files in  `/module/html/` directory: `A.hvml` and `B.hvml`, two operation groups will be created: `opsA` and `opsB`, respectively Points to two separate vDOM fragment trees. When we use `include`, `call` or `observe` to refer to `opsA` and `opsB` in an HVML program, the corresponding vDOM fragment tree will be executed instead of the original default value operation group.

Similar to `init`, the `define` defined in `head` element will create a globally visible operation group, that is, the operation groups of `opsA` and `opsB` defined in the above code are globally visible. Using `define` in `body` will bind the action group name on its parent element by default, thus making the action group visible in the vDOM subtree rooted at the parent element. But we can use the `at` attribute to specify the name space of the operation group:

- The predefined names `_parent`, `_grandparent`, `_root` starting with an underscore (\_) will define the name of the operation group on the parent element, grandparent element, and root element respectively.
- Element identifiers starting with a pound sign (#), such as `#myAnchor`, will search for the specified element identifier (specified by `id` attribute) in its ancestor elements, and will be on the first matching ancestor element Defines the name of the action group.
- When using a positive integer N (such as `2`, `3`), it will backtrack N ancestor elements along the vDOM tree in the direction of the ancestor element on which the action group name is defined.
- In the case of silent evaluation, if no matching ancestor element is found, it will be treated as if `at` attribute is not defined; otherwise, `EntityNotFound` exception should be thrown.

According to the above rules, the above method of defining multiple operation groups can also be coded as follows:

```hvml
<hvml target="html" lang="en">
     <head>
         <base href="$CRTN. base(! 'file:///' )" />
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

If the operation group defined by `define` is empty, `NoData` exception should be thrown when using the `include` or `call` element to refer to the operation group.

The value defined by `on` attribute of `include` element will become the result data of the stack frame corresponding to `define`; similarly, the value defined by `with` attribute of `call` element will become the result data of the stack frame corresponding to `define` fruit data. For the convenience of writing, when the data passed to the operation group is `object`, the interpreter should conform to the attributes of the HVML `literal_variable_token` lexical unit for all key names in the object, and set it to `define` to correspond to the temporary named variable in the stack frame , so as to obtain the effect similar to the function parameter. For example, the following code calculates the greatest common divisor of two positive integers:

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

In addition, we can use `in` attribute in `include` element or `call` element to define the location of the target document, so the attribute value will affect the behavior of the operation group.

We can define sub-elements in `include` element, and these sub-elements will be executed after the operation group defined by `define` has been executed.

#### 2.5.11) `observe`, `forget` and `fire` Tags

`observe` tag is used to define an action element that performs an observation operation. This element will observe a state change on a specific variable or data, and when the specified event arrives, if its `with` attribute specifies a valid operation group, then Execute the operation group, otherwise execute the operation group defined by the tag.

We use `against` attribute of `observe` to specify the name of a statically named variable to observe, and the `on` attribute to specify a piece of data to observe. `against` attribute takes precedence over `on` attribute. Note that we cannot observe a temporary named variable or context variable.

When we observe a static named variable, we can observe whether the data corresponding to the named variable is ready, or whether an error occurs in the process of obtaining the data, or whether the data on the named variable has been destroyed, etc.

The following code gets the current user information from a remote server, but using an asynchronous request:

```hvml
     <init as="users" from="http://foo.bar.com/get_all_users" async />

     <archetype name="user_item">
         <li class="user-item">
             <img class="avatar" src="" />
             <span></span>
         </li>
     </archetype>

     <ul class="user-list">
         <img src="wait. png" />
     </ul>

     <observe against="users" for="change:attached" in="#user-list">
         <clear on="$@" />
         <iterate on="$users" by="RANGE: FROM 0">
             <update on="$@" to="append" with="$user_item" />
         </iterate>
     </observe>
```

When we observe `change:attached` event on `users` variable, it indicates that the data is ready. At this point, we can execute the operation group defined by `observe`: clear the contents of `#user-list`, and then iterate Members of the `$users` array, use the template `$user_item` to generate document fragments that are appended to `#user-list`.

We can track and handle the following events on statically named variables:

- `change:progress`: Indicate that progress is updated when fetching data asynchronously as a static named variable.
- `change:attached`: Indicate that the data on the static named variable has changed from the initial `undefined` to valid data.
- `change:displaced`: Indicate that the data previously associated with the variable has been replaced with new data, such as using `init` to reset the variable, or the previously initiated asynchronous request operation successfully obtained valid data.
- `change:detached`: Indicate that the valid data previously associated with the variable has been disassociated, and its value is reset to `undefined`, such as the case where the previously initiated asynchronous request operation failed and failed to obtain valid data.
- `except:<exceptionName>`: Indicate that an exception occurred when obtaining the data corresponding to the variable, which may be a request error or a parsing error. Specific information, is given by the subtype of the event.

When the event observed by `observe` arrives, the interpreter should switch to the operation group defined by `observe` itself or the operation group defined by `define` referenced by its `with` attribute to execute the HVML program. At this point, in the front stack frame corresponding to the operation group, the following context variables should be defined:

- `$?`: The payload data of the event. If the observed variable is a variable, it is the data corresponding to the observed variable.
- `$!`: In user data, two temporary variables are predefined to represent the complete event name and event source, named `_eventName` and `_eventSource` respectively.
- `$@`: The target document location defined by the `in` attribute of `observe`, or the target document location from which `observe` inherits.

When we use `with` attribute in `observe` element to define the operation group to be referenced, the execution effect of the HVML program is equivalent to the effect of `include` action element, that is, it should be executed in place instead of called by ` The group of operations specified by the with` attribute.

When we observe a piece of data, we can obtain the events produced by the data or changes in the data itself. For example, we can monitor events from long connections, the return value of asynchronous requests, or obtain the results returned after calling remote procedures on long connections, and can also be used to monitor events generated by some internal data, such as those generated by `$TIMERS` data Timer expiration events, etc.

Assume that the document listens to state change events from the system through a local bus mechanism (`hiBus` in this example), such as battery level, WiFi signal strength, mobile network signal strength, etc., and uses corresponding icons in the document to represent these states Change. To do this, we can write the following HVML program:

```hvml
<hvml>
    <head>
        <init as="databus" with="$STREAM.open('unix:///var/run/hibus.sock','default','hibus')"/>
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

In the above example, we use the `onBatteryChanged` operation group defined by `define` to implement the update operation of the target document.

Another example usage of `observe` tag is described below.

In `head` element, we connect to `unix:///var/run/hibus.sock` via  `init` tag, using `$STREAM` predefined variable. `open` method of `$STREAM` returns a stream entity named `databus` (`as` attribute). Then in the `body` element, we use `choose` tag to subscribe to (`subscribe`) the specified event through `$databus.subscribe` method, and then use `observe` element to define the observation of a specific event on `$databus` . Whenever the state of the battery changes, a corresponding data packet is obtained from this data source. For the sake of illustration, we assume that the packets are described in JSON format:

```json
     {
         "messageType": "event",
         "eventName": "XXXXXX",
         "source": <source data>,
         "time": 20200616100207.567,
         "signature": "XXXXX",
         "payload": {
             "level": 80,
             "charging": false,
         },
     }
```

Among them, `messageType` field indicates the data packet type. `eventName` field indicates the event name. `source` indicates the source data that generated the event. `time` indicates the system time when the event was generated. `signature` is the content of the event signature, which can be used to verify the legitimacy of the data source. `payload` contains event-related data. In the above example, the event contains two messages. One message is used to indicate the current battery percentage, and the other message indicates whether it is in the charging state.

The event name must conform to `event_name` lexical unit requirements defined in this specification. See [2.2.3) Common referred to lexical units] (#223-Common referred to lexical units) for details. Here are some examples of legal event names:

- `click`
- `change:attached`
- `event:3cc8f9e2ff74f872f09518ffd3db6f29`
- `corState:except/BadName`

When the HVML agent observes the battery change event packets from `$databus`, it will perform corresponding operations according to the observation actions defined by the `observe` tag. In the above example, the operations and conditions defined by `observe` tag are interpreted as follows:

- When the packet type from `$databus` (specified by the `on` attribute value) is `event:$?` (specified by the `for` attribute value). Here, `$?` is the execution result of `choose` element, which represents the unique identification string of the subscribed event (equivalent to the event identifier), and executes the operation group defined by `observe`.
- `with` attribute of the `observe` element specifies the group of operations (`$onBatteryChanged`) that perform the update operation, where the update operation is limited to the `#the-header` target element defined by the `in` preposition attribute.

Note that when `observe` observes a packet from a specific data source, the resulting data is `payload` data in the event packet.

Similarly, when we want to display the current WiFi name or mobile network operator name on the status bar:

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

We can also use `observe` tag to observe changes on a node in the document or user interaction events. The following examples show various uses of `observe`:

- By listening to `MQTT` packet to obtain the time of adding or deleting background users, so as to dynamically change the user list.
- Dynamically update user statistics by listening to change events on the parent element (container element) of the user list.

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

In the above example, we use `define` tag to define an operation group, and then use `with` attribute in `observe` tag to specify this operation group. When `change:content` event arrives, `$ onChangeContent` action group will be executed. We also use `in` attribute of `observe` tag to specify the target document location when executing `$onChangeContent` action group.

`forget` tag is used when we want to unobserve an event on a particular piece of data or element. That is, `forget` is the inverse of `observe`.

```hvml
     <forget on="#the-user-list" for="change:content" />
```

It should be noted that we can use `observe` to observe the same event in multiple different places in the HVML program, and `forget` will remove all matching observations.

In HVML code, in addition to passively waiting for an event to occur, the code can also directly use the `fire` tag to actively fire an event:

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

`fire` element will process the data specified by `with` attribute as `payload` of the event packet, and determine the source of the event according to the element or data specified by `on` attribute. And the value of `for` attribute will be used as the event name to package the event packet and add the event to the event queue.

For the same event, we can observe and perform different actions in multiple places in the HVML program. When we need to undo a specific observation, we can use `as` attribute in `observe` tag to name the observation, and then use `init` to reset the variable to `undefine` to remove the observation:

```hvml
     <choose on="$TIMERS" by="FILTER: AS 'foo'">
         <update on="$?" at=".active" with="yes" />
     </choose>

     ...

     <init as="updateTimes">
         0
     </init>

     <observe as="opsPerSecond" on="$TIMERS" for="expired:foo" in="#the-header">
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

Similar to `init`, when using `as` attribute in `observe` element to name an observation, we can also use `at` attribute to specify where the name is bound (i.e.namespace).

We can use `for` attribute of `observe` and `forget` to specify an exact event name to observe, or use wildcards or regular expressions to represent a set of eligible events:

- When `for` attribute value contains `?` or `*`, it means a wildcard match.
- When `for` attribute value starts with `/`, it means a regular expression match.

For example:

```hvml
     <forget on="$TIMERS" for="expired:*" />
```

It will remove expiry event observations for all timers.

Finally, `observe` supports `once` adverb attribute. And the observation with this adverb attribute will be automatically dismissed by the interpreter after being executed once.

#### 2.5.12) `call` and `return` Labels

The work done by `include` element is equivalent to copying the specified operation group to the current location for execution (execute in place). So it is different from the function call in traditional programming languages. To achieve the same effect as a function call, use `call` and `return` labels:

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

In the above HVML code, `fillDirEntries` uses the `with` attribute of the `return` element to return the number of directory entries, turning it from an operation group into a function with a return value. When using this function, use `call` tag to define an action element that performs the call operation in order to obtain the result data.

`call` element differs from `include` element as follows:

- The result data in the stack frame corresponding to `call` element can be overwritten by `return` element in the operation group or `back` element in the operation group. If there is no `return` or `back` element in the operation group to modify the result data, the result data in the stack frame corresponding to the `call` element will remain `undefined` unchanged.
- In the stack frame corresponding to `include` element, the initial result data is determined by its own `on` attribute value or content, which can be overwritten by `back` element in the operation group. And `return` element in the operation group   is only used to fall back to the stack frame where the last `include` is located,without modifying the result data in the stack frame corresponding to `include`.

That is, the main difference between `call` and `include` is how to handle the return value defined by `return` element in the operation group: The former cares about the return value, and the latter does not. In practice, `include` is generally used to manipulate the target document, and `call` is generally used to obtain a result data.

We can use `within` attribute on `call` element to specify a different name than the current walker. At this point, we can perform the specified group of operations in another walker. Since each HVML walker has its own virtual machine instance, and different virtual machine instances usually run in different threads or different processes of the operating system. In this way, we can achieve concurrent processing based on thread or process. When we use `concurrently` attribute on the current worker, a new coroutine will be created in the current virtual machine instance to execute the specified operation group. We call the above two calling behaviors `call concurrently`. At this point, if `asynchronously` adverb attribute is used, `call` element will return immediately after creating the new coroutine (and possibly a new virtual machine instance), then use `observe` to observe its result. Otherwise it will wait for the concurrent call The result is returned. For example:

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

In the above HVML code, we concurrently call `collectAllDirEntriesRecursively` operation group, which recursively gets all the file system directory entries under the current path (this is a typical time-consuming operation). The HVML interpreter shall create a new coroutine within the walker specified by `within` attribute to execute the group of operations. If the specified walker does not exist, a new walker is created. And the new walker means a new virtual machine instance. When using `asynchronously` adverb attribute, `as` attribute is used to specify the name of the variable that tracks the task (`my_task`). After this, the code uses `observe` element to observe `callState:success` event of `my_task` variable, and do follow-up processing.

Note the use of the adverb attributes above:

- When we specify a walker name different from the current walker in `within` attribute, concurrent calls must be performed. And if `within` attribute is not specified or `_self` is specified in the `within` attribute, if we don't use `concurrently` adverb attribute, `call` element behaves like a normal function call. And `asynchronously` or `synchronously` adverb attribute is ignored.
- When using `concurrently`, `call` element will create a new coroutine in the specified walker to execute the specified operation group. By default, it will wait for the execution result synchronously, which is equivalent to specifying `synchronously` adverb attribute. If `asynchronously' is specified ` adverb attribute, it will return immediately. At this time, you need to use a variable to observe events related to concurrent calls.

When an action group is invoked concurrently, the interpreter creates a new coroutine in the specified walker to execute the vDOM subtree defined by the action group. The interpreter can refer to the following steps for corresponding implementation:

1. If the specified walker name is the current walker, set the current walker as the target walker and skip to step 4.
2. If the specified walker already exists, set the walker as the target walker and skip to step 4.
3. If the specified walker does not exist, create a new walker and its corresponding virtual machine instance, create all necessary walker-level global variables in the current virtual machine instance (such as `$SYS`, `$RUNNER`, `$DATA `, `$STREAM`, `$RDR`, etc.). Set the new walker as the target walker, skip to step 4.
4. Clone the `DOCTYPE` node of the current vDOM and build an empty `hvml` root node, set its `target` attribute to `void`, then clone the vDOM subtree defined by the operation group and use it as the `hvml` root element and build a `call` element to invoke the operation group, forming a complete vDOM tree.
5. Create a coroutine on the virtual machine instance corresponding to the target walker, build all necessary coroutine-level global variables, such as `$T`, `$TIMERS`, `$CRTN`, etc., and associate them with the vDOM tree.
6. Schedule the execution of the newly constructed vDOM tree, and pass the value defined by the `with` attribute of the `call` element and the content data of the `call` element through the request data, respectively: `$REQ._args` and `$REQ. _content`.
7. When the coroutine exits normally, or when an error or uncaught exception is encountered, the result or exception information is returned to the caller through the `callState` event.

Following the above steps is equivalent to dynamically constructing the following HVML program and running the program in a new walker or a new coroutine:

```
<!DOCTYPE hvml SYSTEM "f: FILE:FS">
<hvml target="void">
     <!-- this is the cloned operation group -->
     <define as "theOpGroup">
         ...
     </define>

     <call on $theOpGroup with $REQ._args>
         $REQ._content

         <exit with $? />
     </call>
</hvml>
```

Since concurrent calls are usually used to perform some time-consuming calculation tasks, we set the target document type of the corresponding coroutine to `void`, so as to prevent newly created walkers and coroutines from being associated with the renderer. But by calling the action group concurrently, we can also use it to create a normal walker associated with the renderer. For example:

```hvml
         <define as="newRunner">
             <test with="$RDR.connect('socket', 'unix:///var/tmp/purcmc.sock')" >

                 <request on="$RDR" to="setPageGroups">
                     '...'
                 </request>

                 <load from="new_user.hvml" onto="user@main" asynchronously>
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

The above code asynchronously loads an HVML program in a concurrently executing operation group, which will create a new coroutine in the virtual machine instance. When the current coroutine exits, the newly created coroutine is still executing, so the corresponding virtual machine instance will also continue to run.

As mentioned earlier, we limit the target document type of the concurrently executed operation group to `void`, so that there is no need to associate the corresponding coroutine to the renderer. But you can use `load` tag in the operation group to load other objects that need to be rendered HVML program for the compiler. In this case, the above code uses `request` element to send requests to the renderer, such as connecting to the renderer, starting a new renderer session and making corresponding settings, etc. At this point, we can use the content data of `call` element to pass the relevant parameters to the renderer.

When the operation group is called concurrently asynchronously, the result data of `call` element is a native entity representing the new coroutine. The native entity should provide at least one `id` attribute, which is used to return the identifier of the new coroutine.

The format of the coroutine identifier is `[//hostname]/<appName>/<runnerName>/CRTN/<coroutineToken>`, which must meet the `coroutine_identifier` lexical unit requirements defined in this specification. For details, see [2.2.3) Common denoted nouns] (#223 - common denoted nouns). Here are some examples of valid coroutine identifiers:

- `//localhost/cn.fmsoft.hvml.sample/Runner0/CRTN/7`
- `/cn.fmsoft.hvml.sample/Runner0/CRTN/foo`
- `/cn.fmsoft.hvml.sample/myRunner/CRTN/3cc8f`

Here, we use a coroutine token to identify a coroutine. We don't use the term coroutine name because with `load` element we can create multiple coroutine instances of a single HVML program. In addition, we can specify a coroutine with some predefined coroutine tokens (usually starting with an underscore), such as:

- `_main`: Indicate the main coroutine, which is the first coroutine created by the specified walker.
- `_first`: Indicate the first coroutine among existing coroutines. Note that `_main` will be unavailable after the first coroutine created by the walker exits, but `_first` is always available.
- `_last`: Indicate the last coroutine among existing coroutines. Note that `_first` and `_last` point to the same coroutine when there is only one coroutine in the coroutine.

For the attribute value of `within`, we reserve `_self` as the name of the predefined walker, specifically referring to the current walker.

The events corresponding to the concurrent call operation group are:

- `callState:success`: The coroutine corresponding to the operation group returns data successfully.
- `callState:error/<errorName>`: The coroutine corresponding to the operation group has an error.
- `callState:except/<exceptName>`: The coroutine corresponding to the operation group encountered an uncaught exception.

When the operation group is called concurrently, as we limit the corresponding HVML program to a vDOM subtree, we cannot access the variables in the closure of the operation group in the original HVML program. This is quite different from conventional calls. For example, the following code:

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

An action group is defined, which uses the static variable `$allEntries` in its closure. So this operation group works fine without using concurrent calls:

```hvml
         <call on="$collectAllDirEntriesRecursively" with="/" />
```

But if concurrent calls are used, the action group will throw an exception because the `$allEntries` variable cannot be found:

```hvml
         <call on="$collectAllDirEntriesRecursively" with="/"
                 within="newRunner" concurrently asynchronously />
```

Therefore, we need to use a local variable, and return the local variable at the end:

```hvml
     <define as="collectAllDirEntriesRecursively">
         <init as="allEntries" with=[] temporarily />

         <define as="collectAllDirEntries">
             ...
         </define>

         <call on="$collectAllDirEntries" with="$?" />
         <return with="$allEntries" />
     </define>

     ...

     <call as="my_task" on="$collectAllDirEntriesRecursively" with="/"
             within="newRunner" concurrently asynchronously />

```

The above code also shows the function of recursively calling the operation group.

#### 2.5.13) `bind` Tag

`bind` tag defines an action element that performs a binding expression operation. This element creates an expression variable, so `as` attribute and `at` attribute can be used to specify the name of the variable and the variable scope. In general, an expression variable corresponds to an evaluable expression that can be specified using `on` attribute, or defined using the contents of `bind` element. For example:

```hvml
     <bind on="$users[0]" as="me" />
```

or,

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

     <bind as="greeting">
         "Hello, $user_name"
     </bind>
```

When we use this variable, we call `eval` method on it to get the specific data corresponding to the expression. Therefore, the following `init` and `bind` elements perform differently:

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

In addition, if `observe` action is executed on the variable, the expression corresponding to the variable will be re-evaluated when the HVML program enters the message loop. If there is a change, `change` message will be generated, so that Do the corresponding processing in the operation group defined by `observe` action element:

For example,

```hvml
     <bind on $SYS.time as 'rtClock' />

     <observe on $rtClock for "change">
        ...
     </observe>
```

The operation group defined by `observe` element in the above code will be executed every second.

In addition, we can bind the attribute or content of a target document element to a variable, and then use `observe` element to handle `change` event on it:

```hvml
    <input type="text" name="user-name" id="the-user-name" placeholder="Your Name" value="" />

    <bind on $DOC.query('#the-user-name')[0].attr.value as 'user_name'>
        <observe on $user_name for 'change'>
            ...
        </observe>
    </bind>
```

We can also use parameters in `eval` method of the bound variable, and use the variable name `$_ARGS` in the original expression to refer to the incoming parameters, thus realizing the function of substitute expression. Among them, `$_ARGS` represents the list of all parameters passed into `eval` (expressed in tuples or arrays), and `$_ARGS[<N>]` can refer to the `<N>`th parameter of the parameter list .

Furthermore, we can also bind an expression to a method whose expression variable is different from `eval`. At this time we use `against` attribute to specify the method name. If `against` attribute is not used, the default ` eval` method name will be used.

For example, in the following code snippet, we bind the output string to the standard output expression as an expression variable `console`, and use `against` attribute to specify the corresponding method name `puts`:

```hvml
     <bind on "$STREAM.stdout.writelines($_ARGS[0])" as "console" against 'puts' />
     <inherit>
         $console.puts('Hello, world!')
     </inherit>
```

When we use the stand-in expression `$console.puts('Hello, world!')`, the corresponding final expression is `$STREAM.stdout.writelines('Hello, world!')`. In this way, we can create corresponding concise aliases for some commonly used expressions, which is convenient for our use.

Note that when an expression is executed in a different context, the result may appear different due to the change in the scope of the referenced variable. In addition, when we use `observe` element to observe the change of an expression variable, we will not be able to pass parameters.

When implemented, the interpreter can represent the bound expression as a native entity and provide `eval` attribute on it or a getter for an alternative attribute name specified by `against` attribute. When calling `eval` getter of the native entity, a temporary variable `_ARGS` can be created in the current evaluation stack frame, corresponding to a tuple constructed from all the incoming parameters. And then the expression corresponding to the native entity will perform normal evaluation, and these temporary variables are removed after the evaluation is complete.

When we use `constantly` adverb attribute when binding an expression, it means that the bound expression will always return a constant value for the same parameter. In this case, the interpreter should additionally implement a method suffixed with `_const`, which evaluates to the same argument only once, and returns the result of the first evaluation when called with the same argument. In practice, this method can be used to define constants generated by a particular expression.

If no method name is specified, the interpreter should implement `eval` method, and the corresponding constant method name is `eval_const`.

The following code binds an expression that produces a constant result:

```hvml
     <bind on $MATH.div(1.0, $MATH.sqrt($_ARGS[0])) as 'myConst' against 'reciprocal_of_sqrt' constantly />
```

We can then use the stand-in expression `$myConst.reciprocal_of_sqrt_const(2.0)` to get the reciprocal of the square root of 2.0. When we use this stand-in expression, only the first call will perform the real evaluation process. And the subsequent evaluation of the expression and parameter 2.0 will directly return the result of the first evaluation without performing repeated The real evaluation process.

#### 2.5.14) `catch` Tag

`catch` tag defines an action element that performs an exception capture operation. This element can be used as a sub-element of any action element, and defines the operation to be performed when an exception occurs during the execution of the action. Unlike `except` element, `catch` element defines a program branch when an exception occurs. For example:

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

We use `for` preposition attribute to define the specific name of the exception to catch, and must use the backtick attribute value syntax.

The value of `for` attribute value has the following rules:

- If `for` attribute is not defined, or `for` attribute value is `ANY`, it is equivalent to matching any exception.
- Multiple exceptions may be separated by whitespace.

The original execution result of the action defined by `catch` tag should be an object representing exception information, which must contain the following necessary attributes:

- `name`: Indicate the exception name, a string.
- `info`: Additional information about the exception, a string.

Other attributes can be determined by the interpreter. Usage is as follows:

```hvml
     <catch for `ANY`>
         <exit with "Exception raised: $?.name" />
     </catch>
```

#### 2.5.15) `back` Tag

`back` tag defines an action element that rolls back the execution stack operation, which is used to control the current execution stack so as to roll back to the specified front stack frame. After the rollback, the program will be executed from the next execution position defined by the target stack frame.

`back` element only supports the following two prepositional attributes:

- `to`: It is used to specify the fallback position, and supports three specifying methods:
    - Three predefined relative stack frame names starting with an underscore (U+005F `_`): `_last`, `_nexttolast` and `_topmost`, which represent the previous stack frame, the previous stack frame and the topmost stack respectively frame.
    - The identifier of the corresponding element of the target stack frame starting with the hash character (U+0023 `#`), such as `#myAnchor`.
    - The number of back stack frames represented by a positive integer.
- `with`: It is used to specify a value that will replace the result data corresponding to the context variable after the fallback. We can also use the content of this element to define this data.

For example, when we use `iterate` to generate an even number column less than 100. If we use the `back` tag, we can code it as follows:

```hvml
    <init as="evenNumbers" with=[0,] >
        <iterate on=$?[0] with=$MATH.add($0<,2) nosetotail>
            <test on=$?>
                <match on=$L.gt($?,100) exclusively>
                    <back to="3" >
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

The above code, when the calculated even number is greater than `100`, it will fall back to the fourth stack frame and reach the stack frame corresponding to `init` element, and then start execution from the next sub-action element of the element corresponding to the stack frame, That is, the actions defined by `ol` outer element.

When `back` element uses `silently` adverb attribute, no exception will be generated. And it will be processed according to the following rules:

- Unrecognized `to` attribute value or fail to evaluate or stack frames, will be treated as falling back to the top stack frame.
- When `with` attribute value is not specified, it will be treated as `undefined`, and the context variable after fallback will not be changed.
- If `with` attribute fails to evaluate, treat it as `undefined`.

Use `with` attribute value to define an operation that can replace the result data of the context variable after the fallback, which helps the program control the execution logic. For example, when an exception is caught:

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

The above code reads the directory entries under the specified directory and catches possible exceptions. When an exception occurs, use the `back` tag to return to the stack frame corresponding to `ul`, and modify the result data (`$?`) of the `ul` stack frame to a string. After the rollback, the program starts to execute the `test` tag to determine the type of the result data. Note that `ul` acts as an outer element, and its initial result data is `undefined`. If its type is `string`, it means that an exception occurred, and subsequent operations will insert a `li` element into the target document, which contains the exception information.

#### 2.5.16) `request` tag

The `request` tag defines an action element that performs a document request, walker request, or renderer request operation.

We can use the `request` element to initiate a method call request at a target document location, for example, to manipulate the HTML `video` element to quickly jump to a specified location:

```hvml
     <video id="my-video" width="320" height="240" autoplay muted>
         <source src="movie.mp4" type="video/mp4" />
         <source src="movie.ogg" type="video/ogg" />
         Your browser does not support the video tag.
     </video>

     <!-- request on="$DOC.query('#my-video')" to="fastSeek" with="5.30" -->
     <request on="#my-video" to="fastSeek" with="5.30" />
```

At this point, we use the following three attributes:

- `on` attribute specifies the target document location.
- `to` attribute specifyies the method or function to call.
- `with` attribute specifies the call parameters. We can also use the content of `request` to define call parameters.

In order to observe the execution result of the request asynchronously, we can use `as` attribute to define a static named variable for the request, and use `observe` tag to observe its result. Therefore, we can use the following adverb attributes in this tag:

- `synchronously` attribute is used to specify the execution result of the synchronous waiting request. It is the default value and generally does not need to be explicitly specified.
- `asynchronously` attribute is used to specify asynchronously wait for the execution result.
- `noreturn` attribute is used to specify that the processing side of the request is not required to send the corresponding response message.

Similar to `init`, when using `as` attribute in `request` tag to name a request, we can also use `at` attribute to specify the binding location of the name (i.e. the namespace).

When we specify a simple method with `to` attribute, the value of `with` attribute will be passed as an argument to the method. As in the following example:

```hvml
     <request on="#my-video" to="doSomething" with="['value for foo', 'value for bar']" />
```

In a renderer that supports JavaScript, the above request will eventually be interpreted as the following JavaScript code:

```js
     document.getElementById('#my-video').doSomething(['value for foo', 'value for bar']);
```

We use method names prefixed with `get:` or `set:` in the `to` attribute, which can be used to get or set the dynamic attribute value of a specific document element. For example, the following code sets the `#myInput` element to be disabled, and uses the `noreturn` adverb attribute, ignoring the response.

```hvml
     <request on="#myInput" to="set:disabled" with=true noreturn />
```

The following code gets the content of the input box:

```hvml
     <request on="#myInput" to="get:value" />
```


We can also use `request` to execute a function call code supported by the renderer on the specified element, and use the following predefined variables set by the renderer in the function call code:

- `ELEMENT`: Each element in the collection of target document elements specified by the `on` attribute.
- `ARG`: Arguments defined by `with` attribute or content.

At this point, we use `call:` prefix in `to` attribute value:

```hvml
     <request on="#myModal" to="call:bootstrap.Carousel.getInstance(ELEMENT).to(ARG)" with=0 />
```

In the above `to` attribute value, we use `ELEMENT` and `ARG` to refer to the current element object and the parameters passed to the method through `with` attribute or content. These special keywords are handled and replaced by the renderer. For example, the above function call will eventually be interpreted by the renderer as the following JavaScript code:

```js
const method = new Function('ELEMENT', 'ARG', 'return bootstrap. Carousel. getInstance(ELEMENT).to(ARG)');
const result = method(document. getElementByHVMLHandle('4567834'), 0);
```

When using this method, when the parameter is an array, you can use the methods supported by the renderer scripting language to refer to its members, such as `ARG[0]`, `ARG[1]`.

We can also use the above method to get or set the dynamic attribute value of a specific document element. For example, the following code sets `#myInput` element to be disabled, and uses `noreturn` adverb attribute, ignoring the response.

```hvml
     <request on "#myInput" to "call:ELEMENT.disabled=true" with 0 noreturn />
```

We use `request` tag to send a request to another coroutine in this walker. At this time, we specify `on` attribute value as the identifier of the target coroutine or the native entity representing the target coroutine, and `to` attribute value constitutes the operation name of the request. And the `with` attribute or element content is the parameter of the request. Through the function provided by `request` tag, we can let the target coroutine call the specified operation group in its execution context, and then return the result to the caller. Since the request can be sent across peers, it is equivalent to executing a remote procedure call.

Note that we cannot use `request` to send a request to the current coroutine, nor is it allowed to send requests across applications. But we can send a request to another walker of the current application.

For example, we can also send data to a channel created by another runner of the current application. In this case, we use the target channel identifier: `[//hostName]/appName/<runnerName>/CHAN/<channelName>`. Corresponds to the designated noun unit `channel_identifier` defined in this specification, see [2.2.3) Common designated noun units] (#223-Common designated noun unit) for details. Here, we can use `-` to refer to the current host or the current application, such as:

- `//-/-/AnotherRunner/CHAN/channel0`: It refers to the `channel0` channel of the runner named `AnotherRunner` in the current host and current application.
- `/-/AnotherRunner/CHAN/channel1`: It refers to the `channel1` channel of the runner named `AnotherRunner` in the current host and current application.

When sending a request to another walker's channel, we can only perform `post` operation, which will immediately return an error response when the target channel is full, such as:

```hvml
     <request on "/-/AnotherRunner/CHAN/channel0" to "post" with { data: 'I am here', channel: 'got' } noreturn />
```

In addition, we can also send a request to a specified coroutine created by another walker of the current application. In a typical application scenario, the worker who handles the request will receive the request in the main coroutine and distribute it to other coroutines for processing, and then forward the processing result of the sub-coroutine as a response to the requester. In this case, the requesting party does not need to know the specific coroutine token, but uses `_main` as the coroutine token.

The target coroutine identifier format is `[//hostName]/appName/<runnerName>/CRTN/<coroutineToken>`. Coroutine_identifier corresponds to the referred noun defined in this specification, see [2.2.3) Common referred nouns] (#223-Common referred nouns) for details. Here, we can use `-` to refer to the current host or the current application, such as:

- `//-/-/AnotherRunner/CRTN/3dfedf`: It refers to the `3dfedf` coroutine of the runner named `AnotherRunner` in the current host and application.
- `/-/AnotherRunner/CRTN/3dfedf`: It refers to the `3dfedf` coroutine of the runner named `AnotherRunner` in the current host and current application.
- `/-/AnotherRunner/CRTN/_main`: It refers to the main coroutine of the runner named `AnotherRunner` in the current host and current application.

Usually, the running state of the target coroutine which is used to complete the request enters the event polling phase before it can respond to requests from other coroutines and return the result to the requesting coroutine after executing the corresponding operation group. To do this, the coroutine should observe `request:<operationName>` event on `$CRTN` variable.

As shown in the following code, a coroutine defines an operation group `echo`, which appends a prefix to the incoming parameters and returns them as they are:

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

Suppose the file name to save the HVML program is `myrepeater.hvml`. In a coroutine (parent coroutine), we create a new coroutine (child coroutine) in the specified walker through the `load` element to execute the HVML program, and send a request to the child coroutine in the parent coroutine. When the parent coroutine receives the `corState:observing` event from the child coroutine, we send an `echo1` request to the child coroutine:

```
     <load as="myRepeater" from="myrepeater.hvml" within="myRunner" asynchronously>
         <observe on="$myRepeater" for="corState:observing">
             <request on="$myRepeater.uri" to="echo1">
                 "How are you?"
             </request>
         </observe>
     </load>
```

Apparently, the child coroutine handles the request for `echo1` in the observer for `request:echo1` event defined with `observe` tag. When the child coroutine creates multiple observers for `echo1` request, all observers will be scheduled for execution, and the results will form an array and be sent back to the requester as a response.

It should be noted that, in the above example, if the request name specified by the parent coroutine is `echo1`, the result is: `foo: How are you?`.    And if the request name is `echo2`, the result should be : `bar: How are you?`.

When we use `request` tag, we can also send a request to the renderer, such as creating a new window group, removing a window group, etc. At this point, specify `on` attribute value as the predefined variable `$RDR`. As for the specific request operation and parameters to be executed, they are passed through `to` attribute and `with` attribute, and their meaning and requirements are related to the specific renderer protocol. For example, when using the PURCMC protocol, we can send the following request to the renderer to add a window group to the specified workspace:

```hvml
     <request on '$RDR' to 'addPageGroups'>
         {
              dataType: 'html',
              data: '<section id="newGroup1"></section><section id="newGroup2"><article id="newGroupBody2" class="tabbedwindow"></article></section>'
         }
     </request>
```

As another example, when we request the renderer to dump the page content created by the coroutine to which the current walker belongs:

```hvml
     <request on $RDR to 'callMethod'>
         {
              element: "main",
              attribute: "plainwin:hello@main",
              data: {
                     method: 'dumpContents',
                     arg: 'screenshot.png'
              },
         }
     </request>
```

#### 2.5.17) `load` and `exit` Labels

`load` tag defines an action element that performs a loader operation, which starts a new coroutine in the specified worker (virtual machine instance) that loads and executes the specified HVML program. The new HVML code or program instance loaded by `load` is called child coroutine. And the coroutine that executes the action of `load` element is called parent coroutine.

`load` element is used to load and execute an HVML code (string) specified by `on` attribute or a new HVML program specified by `from` attribute. And it can use the object data specified by `with` attribute as a parameter (corresponding to ` $REQ` variable) to the child coroutine. For example:

```hvml
     <load from="b.hvml" as="userProfile" onto="user@main" />
         $user
     </load>
```

`load` element supports the following prepositional attributes:

- `on`: Specify HVML code (string).
- `from`: the URL of the specified HVML program (`$CRTN.base` works). If the URL uses `#` to specify an anchor. It is used to specify `body` identifier as the program entry. If it is empty, it means to start the new coroutine with the same HVML program as the current HVML coroutine. If it starts with `#`, it means to start the new coroutine with the same HVML program as the current coroutine, but specified `body` identifier used as an entry by `#`.
- `with`: If `from` attribute specifies a valid URL string, specify the request parameters when loading the HVML program from an external resource.
- `via`: If `from` attribute specifies a valid URL string, then this attribute specifies the request method when loading the HVML program from an external resource, and the default is `GET`.
- `as`: When we asynchronously load a new HVML program, we use this attribute to bind the new HVML coroutine to a variable name so that the state of the coroutine can be observed.
- `at`: Similar to `init`, when using the `as` attribute in `load` tag to name an HVML program, we can also use `at` attribute to specify the binding location of the name (that is, the namespace).
- `within` attribute specifies the walker name. Do not specify this attribute or use the reserved word `_self` as the walker name to indicate the current walker. Unlike `call` element, the walker specified by `load` element must already exist, that is, `load` element will not actively create a new walker.
- `onto`: Specify the renderer page identifier used to render the target document, using the form `[<page_type>:]<page_name>[@[<workspace_name>/]<group_name>]` to specify the page name and the page group it is in. Among them, `<page_type>` specifies the type of the page, and `plainwin` (default) or `widget` can be used, which means to create a normal window or widget as a page. `workspace_name` and `group_name` respectively represent the workspace where the page is located Name and page group name, `page_name` is the unique name of the page in the specified page group.

When specifying a page name, we can use the following reserved names (reserved names usually start with an underscore) to refer to specific pages (when using reserved names, you do not need to specify the page group and page type):

- `_null`: Indicate an empty page. At this point, the document content and its change information generated by the newly created coroutine will not be synchronized to the renderer. When `onto` attribute is not specified, it is considered to create an empty page.
- `_inherit`: If the newly created child coroutine belongs to the same liner as the current coroutine, it means that the coroutine will inherit the document content of the parent coroutine and use the same renderer page. At this point, the child coroutine and the parent coroutine can update the document at the same time, and their updates will be reflected on the current page at the same time.
- `_self`: Indicate the current page. Rendering a new HVML program in the current page usually means that the HVML coroutine corresponding to the current page will be suppressed. And the document content in the page will be overwritten by the new HVML coroutine. When using this page name, page grouping and page type information are ignored.
- `_active`: Indicate the current active page in the group corresponding to the current HVML program. The HVML coroutine corresponding to the current active page will be suppressed.
- `_first`: Indicate the first page in the group corresponding to the current HVML program. The HVML coroutine corresponding to the first page will be suppressed.
- `_last`: Indicate the last page in the group corresponding to the current HVML program. The HVML coroutine corresponding to the last page will be suppressed.

When specifying a workspace name, we can use the following reserved names (reserved names usually start with an underscore) to refer to a specific workspace:

- `_default`: Indicate the default workspace.
- `_active`: Indicate the currently active workspace.
- `_first`: Indicate the first workspace.
- `_last`: Indicate the last workspace.

When the URL specified by the value of `from` attribute defines a fragment (using the `#` symbol), `load` element will attempt to execute the specified ontology in the HVML program, that is, the group of operations defined by another `body` subtree.

When `on` attribute and `from` attribute are specified at the same time, the rules are as follows:

1. If `from` attribute is not specified or the value of `from` attribute is not a valid URL string, then try to load the string specified by `on` attribute, which is called the string content.
1. If `from` attribute specifies a valid URL string, the HVML program will be loaded from external resources first. At this point, use `with` attribute value to specify the request parameters, and `via` attribute value to specify the request method.
1. When using string content and external resources at the same time, if an exception occurs during the process of loading and parsing external resources, and `silently` attribute is set, then use the string content as the HVML program. If everything is normal, use External Resources. That is, the string content is used as a fallback program.
1. If neither the string content nor the external resource is available, an exception `NoData` is thrown.

In addition to reserved names, the page identifier specified by `onto` attribute must conform to `page_identifier` lexical unit requirements defined in this specification, see [2.2.3) Common named lexical units](#223-Common named Lexical unit). Here are some examples of legal page identifiers:

- `user`: Create a normal window named `user`.
- `user@Users`: Create a normal window named `user` in `Users` page group of the default workspace.
- `user@main/Users`: Create a normal window named `user` in `Users` page group of `main` workspace.
- `plainwin:user@main/Users`: Create a plain window named `user` in `Users` page group of `main` workspace.
- `widget:user@main/Users`: Create a widget called `user` in `Users` page group of `main` workspace.

When the given page name does not exist, it means to create a new page in the specified group and give the page the given name. If the specified page group does not exist, the first group will be used. When we create a new renderer page, we can specify the page parameters passed to the renderer, such as class name, title and style, through `_renderer` key name of its `with` attribute value.

The content data of `load` element will be passed as a parameter to the new coroutine. And in the new coroutine, it can be accessed using `$REQ` variable.

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

The above code uses `on` attribute to specify an HVML program (`$request.hvml`) to be loaded and executed, and passes `$request` data as the request data of the program to the new coroutine. Note that the HVML program specified by `on` attribute uses the `text` of `$REQ` predefined variable as the content of `h1` element, and the program code itself as the content of the `p` element. At the same time, the program uses `_renderer` key name to define the parameters that need to be passed to the renderer, including the class name and style information of the page.

The final HTML document generated by the program is as follows:

```hvml
<html>
     <body>
         <h1>Hello, world!</h1>
         <p>&lt;hvml target="html"&gt;&lt;body&gt;&lt;h1&gt;$REQ.text&lt;/h1&gt;&lt;p&gt;$REQ.hvml&lt;/p&gt;&lt;/body>&lt;/hvml&gt ;</p>
     </body>
</html>
```

`load` tag supports the following adverb attributes:

- `synchronously`: Load synchronously and default behavior. `load` element will synchronously wait for the child coroutine to exit.
- `asynchronously`: Load asynchronously. `load` element does not wait for the child coroutine to exit.

Suppose we use `load` tag to load an HVML program for creating new users, if using the synchronous loading method:

```hvml
     <load from="new_user.hvml" onto="newUser@mainBody" synchronously>
         <update on="#the-user-list" to="append" with="$?" />

         <!-- For the abnormal exit of the sub-coroutine, handle it by catching the corresponding exception -->
         <catch for `ChildTerminated`>
             ...
         </catch>
     </load>
```

If you use the asynchronous loading method, you need the `as` attribute and use the `observe` tag to create an observer to observe the `corState:exited` (exit) event of the child coroutine:

```hvml
     <load from="new_user.hvml" as="newUser" onto="newUser@mainBody" asynchronously>
         <observe on="$newUser" for="corState:exited">
             <update on="#the-user-list" to="append" with="$user_item" />
         </observe>
     </load>
```

Both of the above implementations will insert a new user entry into `#the-user-list` of the current target document.

When using the asynchronous loading method, the normal result data of `load` element should be a native entity used to identify the new coroutine. The native entity should provide at least one `id` attribute, which can be used to return the identifier of the new coroutine.

In conjunction with `load` element, we usually use `exit` tag in the loaded program to actively exit the execution of the coroutine and define the return data of the coroutine. For example:

```hvml
     <init as="user_info">
         { "id": "5", "avatar": "/img/avatars/5.png", "name": "Vincent", "region": "en_US" },
     </init>

     <exit with="$user_info" />
```

The above code uses `with` attribute of `exit` tag to define a piece of data that the interpreter should process as the result data of the current HVML coroutine.

When we create a sub-coroutine in the current walker and render the document content of the sub-coroutine in an existing renderer page (such as setting `onto` attribute value to `_self`), the corresponding coroutine of the page The render state will be set to suppressed because the renderer page is occupied. Such as the following code:

```hvml
<hvml>
     <body>
         ...

         <load from="#errorPage" onto="_self" asynchronously />

         ...
     </body>

     <body id="errorPage">
         <p>We encountered a fatal error!</p>
     </body>
</hvml>
```

`load` element in the above code corresponds to the following steps:

1. Load the HVML program (or clone the vDOM of the current program) and execute the program in a newly created sub-coroutine, whose entry is the body of `#errorPage`.
1. The child coroutine will use the renderer page used by its parent coroutine (specified by `onto` attribute value `_self`), so the parent coroutine will be suppressed by the interpreter (rendering state is `suppressed`). Due to `asynchronously` adverb attribute, the parent coroutine will continue to run, but will not do any data exchange with the renderer.
1. The child coroutine clears the renderer page used by the parent coroutine and loads its own target document content.
1. Release the renderer page after the child coroutine terminates, and the interpreter sets the rendering state of the parent coroutine to `regular`, and overwrites the renderer page content with its complete target document content.
1. The parent coroutine resumes normal renderer data exchange.

#### 2.5.18) `inherit` Tag

`inherit` tag is used to define an action element that performs an inheritance operation. Except for `in`, this element does not use any preposition and adverb attributes, and inherits the context variables of its front stack frame by default. If there is data content defined, use the data content to overwrite `$^` context variable of the corresponding stack frame.

Usually, we use `inherit` element to separate code with different logical functions. And we often use its content to perform functions provided by dynamic objects. The following code shows various usage scenarios of `inherit` tag:

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

#### 2.5.19) `sleep` Tag

`sleep` tag is used to define an action element that performs a sleep operation, which allows the current coroutine to enter the stop state, thereby sleeping for the specified time.

This element uses the following attributes:

- `with`: Specify the number of seconds to sleep (note: decimals are valid).
- `for`: Use the time unit to specify the time to sleep. For example, `1m` means one minute, the following units are supported:
    - `ns`: nanosecond.
    - `us`: microsecond.
    - `ms`: millisecond.
    - `s`: second.
    - `m`: point.
    - `h`: hour.
    - `d`: day.

When both `with` and `for` attributes are specified, `with` takes precedence.

As in the sample code below:

```hvml
     <!-- Sleep for a random time from 0 to 10.0 seconds -->
     <sleep with="$SYS. random(10.0)" />

     <!-- Sleep for 0.5 seconds -->
     <sleep for="0.5s" />

     <!-- sleep 1 day 12 hours -->
     <sleep for="1d 12h" />
```

When the interpreter executes `sleep` element, it should set the current coroutine to stop state, and wake up the current coroutine after the sleep time expires. During the sleep of a coroutine due to `sleep` element, the interpreter detects any event sent to the coroutine, then the interpreter should wake up the coroutine immediately.

The result data of `sleep` is the remaining sleep time (number of seconds, numeric type), or 0 if not interrupted.

### 2.6) Actuator

In action tags such as `choose`, `iterate` and `reduce`, we usually use the `by` preposition attribute to define how to perform selection, iteration or reduction operations, which we call rules, and implement the corresponding rules Code or functional modules are called selectors, iterators or reducers, collectively called executors. The HVML interpreter can implement a built-in executor, specifying what rules to follow when selecting, iterating, and reducing data through a simple syntax. In complex cases, HVML allows document authors to call external programs (such as dynamically loadable modules) to implement executors. HVML uses `CLASS` or `FUNC` prefixes to indicate the use of externally defined executors.

It should be noted that executors are also available in `test` and `sort` tags. The executor used in `test` tag is the same as `choose` tag. When the built-in executor is used in `sort` tag, the sorting operation will be performed on the results returned by the built-in executor. While when using an external executor, the sorting operation will be performed directly on the basis of the data specified by `on` attribute.

#### 2.6.1) Built-In Executor

In HVML code, rules for built-in executor can contain evaluated expressions (essentially parameterized strings). But before calling the executor, the HVML interpreter will complete the evaluation of the evaluation expression and pass the final rule string to the executor. Therefore, when we describe the rules of the built-in executor, we assume that the corresponding evaluation value has been completed.

##### 2.6.1.1) `KEY` Executor

This executor acts on dictionary data, using the given key name or key name list to return the key name, key value or key value object list, or using the key name list matching a certain rule, returning the key name, key value or key A list of value objects. For example for the following data:

```hvml
     <init as="regionStats">
         { "zh_CN": 100, "zh_TW": 90,"zh_HK": 90, "zh_SG": 90, "zh_MO": 80, "en_US": 70, "en_UK": 80}
     </init>
```

The above dictionary data uses language and locale as the key name, and an integer as the corresponding key value.

If we want to get all key values, use `KEY: ALL`.

If we want to get the key values corresponding to several key names, use `KEY: AS 'zh_CN', 'zh_HK'`.

If we want to get the key values of all Chinese regions, use pattern matching `KEY: LIKE 'zh_*'`, or use regular expression `KEY: LIKE /zh_[A-Z][A-Z]/i`.

If we want to get the key-value pairs corresponding to all mainland China regions and all English regions, we can use `KEY: AS 'zh_CN' LIKE 'zh_*'`.

We can also use logical operators to describe more complex key name matching conditions, such as: `KEY: AS 'zh_CN', 'zh_TW' OR NOT LIKE 'en_*'`

When there is no match for the given key name, the corresponding information is not included in the result.

The syntax of the `KEY` executor is as follows:

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

`FOR` clause in `KEY` executor specifies how the data is returned:

- When taking `VALUE`, return the key value (default behavior).
- When fetching `KEY`, return the key name.
- When taking `KV`, the key-value pair will be converted into an object with two attributes, where the attribute `k` represents the key name. And the attribute `v` represents the key value, that is, the key-value object. For the above data, the result data corresponding to the rule `KEY: AS 'zh_CN', 'zh_HK' FOR KV` is:

```json
     [ { "k": "zh_CN", "v": 100 }, { "k": "zh_TW", "v": 90 } ]
```

For dictionary data, when `by` attribute is not specified, `KEY: ALL` executor is used by default.

##### 2.6.1.2) `RANGE` Executor

This executor acts on array and collection data, and uses the subscript range to return the corresponding list of array elements (a collection can be regarded as an array that does not contain repeated data elements). For example for the following data:

```hvml
     <init as="regionStats">
         [ "zh_CN", 100, "zh_TW", 90, "zh_HK", 90, "zh_SG", 90, "zh_MO", 80, "en_US", 30, "en_UK", 20 ]
     </init>
```

If we want to get all array elements, use `RANGE: FROM 0`.

If we want to get the first four array cells, use `RANGE: FROM 0 TO 3`, the returned data is:

```json
     [ "zh_CN", 100, "zh_TW", 90 ]
```

If we want to get the array unit whose index subscript is even, then use `RANGE: FROM 0 ADVANCE 2`, the returned data is:

```json
     [ "zh_CN", "zh_TW", "zh_HK", "zh_SG", "zh_MO", "en_US", "en_UK" ]
```

If we want to get the array unit whose index subscript is odd, then use `RANGE: FROM 1 ADVANCE 2`, the returned data is:

```json
     [ 100, 90, 90, 90, 80, 30, 20 ]
```

The syntax of the `RANGE` executor is as follows:

```
     "RANGE" [ws] ':' [ws] "FROM" <ws> <integer_expression> ["TO" <ws> <integer_expression>][ <ws> "ADVANCE" <ws> <integer_expression>]

     integer_expression: <literal_integer> | <integer_evaluation_expression>
     integer_evaluation_expression: <four_arithmetic_expressions>
     four_arithmetic_expressions: a four arithmetic expressions like C language, such as `(3.14 * 6 * 6) / 5`

```

For array data, when `by` attribute is not specified, `RANGE: FROM 0` executor is used by default.

Note that the executor should check for invalid index values.

##### 2.6.1.3) `FILTER` Executor

This executor works on arrays, objects, and collections, filtering the elements in the container using specific conditions. For example for the following data:

```hvml
     <init as="myArray" uniquely>
         [ 100, 95, 95, 95, 80, 30, 55, 20 ]
     </init>
```

If we want to get all collection elements, use `FILTER: ALL`, the returned data is:

```json
     [ 100, 95, 80, 30, 55, 20 ]
```

If we want to get elements whose value is greater than 30, use `FILTER: GT 30`, the returned data is:

```json
     [ 100, 95, 80, 55 ]
```

If we want to get elements ending with 0, use `FILTER: LIKE /0\$/`, the returned data is:

```json
     [ 100, 80, 30, 20 ]
```

The syntax of the `FILTER` executor is as follows:

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

Notice:

1. When using the numeric value comparison clause, the data will be converted into numeric values for processing.
1. When using a string to match a clause, the data will be serialized into a string first, and then matched.
1. When the elements in the collection use an additional unique key name to determine the uniqueness, the matching condition specified by `FILTER` is only related to the value corresponding to the unique key name.
1. When this executor is used in a collection, use the key value as the filter condition, and use `FOR` clause similar to `KEY` executor to specify the returned data format.

For collection data, when `by` attribute is not specified, `FILTER: ALL` executor is used by default.

As an example, `FILTER` executor is used when activating a specific timer in section [2.1.6.3) Predefined variables](#2163-Predefined variables) of this document.

##### 2.6.1.4) Built-In Executor for Strings

For string data, HVML provides the following built-in executors, which can be used to traverse the character list and token list in the string respectively:

- `CHAR:`: Split the string into a list of characters. The syntax is similar to the `RANGE` executor.
- `TOKEN:`: Split the string into a list of tokens according to the specified delimiter.

The syntax of `CHAR` executor is as follows:

```
     "CHAR" [ws] ':' [ws] "FROM" <ws> <integer_expression> [ <ws> "TO" <ws> <integer_expression>] \
         [ <ws> "ADVANCE" <ws> <integer_expression>] \
         [ <ws> "UNTIL" <ws> <quoted_literal_char>]

     integer_expression: <literal_integer> | <integer_evaluation_expression>
     integer_evaluation_expression: <four_arithmetic_expressions>
     four_arithmetic_expressions: a four arithmetic expressions, such as `(3.14 * 6 * 6) / 5`
```

For example, when we use `CHAR: FROM 0 TO 10 ADVANCE 2 UNTIL 'f'` actuator to act on the string `A brown fox jumps over a lazy cat`, the returned data is:

```json
     [ "A", "b", "o", "n" ]
```

The syntax of `TOKEN` executor is as follows:

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

For example, when we use `TOKEN: FROM 0 TO 2 DELIMETERS ' '` executor to act on the string `A brown fox jumps over a lazy cat`, the returned data is:

```json
     [ "A", "brown", "fox" ]
```

For string data, if `by` attribute is not specified, `CHAR: FROM 0` executor is used by default.

Going a step further, the HVML interpreter provides specific natural language-based word and sentence executors: `WORD` and `SENTENCE`.

##### 2.6.1.5) Built-In Executor for Numeric Values

For numeric data, HVML provides the following built-in executors that can be used to generate lists of numbers, or "sequences" for short:

- `ADD`: When the given condition is satisfied, the addition operation is performed on the basis of the given value.
- `SUB`: When a given condition is met, perform a subtraction operation based on a given value.
- `MUL`: Perform a multiplication operation based on the given value when the given condition is met.
- `DIV:`: When the given condition is met, the division operation is performed based on the given value.
- `FORMULA:`: Use the given iterative formula to evaluate when the given condition is met.
- `OBJFORMULA:`: Evaluate the formula on the object using the given number of iterations when the given condition is met.

The syntax of `ADD`, `SUB`, `MUL`, `DIV` executors is as follows:

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

For example, when we use `ADD: GT 90 BY -3` actuator to act on the value `100`, the returned sequence is:

```json
     [ 100, 97, 94, 91 ]
```

The syntax of `FORMULA` executor is as follows:

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

For example, when we use the `FORMULA: LT 500 BY (X * 2 - 50)` actuator to act on the value `100`, the returned sequence is:

```json
     [ 100, 150, 250, 450 ]
```

For numeric data, if `by` attribute is not specified, `ADD: LE $? BY 1` executor will be used by default; this executor will generate an array containing only one value, which is the current operation data.

The syntax of `OBJFORMULA` executor is as follows:

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

For example, when we use `OBJFORMULA: x LT 500 AND y LT 600 BY x = (x * 2 - 50), y = y + x` and the actuator acts on the object `{ x: 100, y: 0 }`, The returned array is:

```json
     [
         { "x": 100, "y", 100 },
         { "x": 150, "y", 250 },
         { "x": 250, "y", 500 },
     ]
```

Note, when using numeric executors for iteration:

1. The initial iteration data (that is, the value of the context variable `$<`) comes from `on` attribute, and before the next iteration is executed, the value of the context variable `$<` will be replaced by the result data of the previous iteration.
1. The rule string defined by `by` attribute of the numeric executor should be re-evaluated on each iteration.
1. When the number of iterations exceeds the maximum setting value `MaxIterationCount` exception will be thrown.

##### 2.6.1.6) `SQL` Executor

SQL (structured query language) is a language used by relational database management systems to query structured data. Considering that most of the data in HVML is represented by arrays formed by dictionary data, HVML introduces a built-in SQL executor. Through the SQL executor, we can easily query a specific subset of data from the dataset specified by `on` attribute, and can easily specify the matching conditions of the query. For example for the following data:

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

We can directly use `SQL` executor to obtain a subset of the above data, for example:

- If we want to get the data subset of all Chinese regions, use `SQL: SELECT * WHERE locale LIKE 'zh_*'`.
- If we want to obtain data subsets of several specific regions, use `SQL: SELECT * WHERE locale IN ('zh_CN', 'zh_TW')`.
- If we want to get records where the `rank` key value is greater than 70, use `SQL: SELECT locale WHERE rank > 70`.
- If we want to get the Chinese region records where `rank` key value is greater than 70, then use `SQL: SELECT locale WHERE locale LIKE 'zh_*' AND rank > 70`.

Unlike the SQL language used for databases, we do not use `FROM` clause of standard SQL statements to specify database tables, because in HVML we already use the `on` preposition attribute to specify datasets. Therefore, it can be said that HVML's SQL executor is a simplified SQL implementation, which mainly implements selection, iteration and reduction operations with the help of SQL's `SELECT` statement. Specifically, HVML's SQL statements mainly support the following clauses (different HVML interpreter implementations can support more SQL clauses).

- `WHERE`: It is used to specify filter conditions.
- `GROUP BY`: It is used  to specify grouping (reduction) conditions.
- `ORDER BY`: It is used to specify the sort operation.

Besides, in `SELECT` statement of HVML’s built-in SQL interpreter, in addition to using `*` to return all possible fields, you can also use `&` to return the entire data that meets the given conditions. When the data is an array, dictionary or When using a native entity object, you can use `update` statement to modify its content. For example:

```hvml
     <choose on="$TIMERS" by="SQL: SELECT & WHERE id = 'foo'">
         <update on="$?" at=".active" with="yes" />
     </choose>
```

In HVML, SQL executors can also operate on DOM document subtrees or nested structured dictionary data. To this end, we introduce a new SQL SELECT clause `TRAVEL IN`, which can choose `SLIBLINGS`, `DEPTH`, `BREADTH` or `LEAVES`. They respectively represent the use of sibling node traversal and depth-first Traversal, breadth-first traversal and leaf node traversal. The syntax is:

- `"TRAVEL" <ws> "IN" <ws> [ "SIBLINGS" | "DEPTH" | "BREADTH" | "LEAVES" ]`: It is used to specify the traversal method on the tree data.

For example, for the following DOM tree:

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

According to the rules described in this document [2.1.17) Structured data representation of document fragments](#2117-Structured data representation of document fragments), the structured data representation corresponding to the above DOM document fragments is:

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

If we perform a depth-first traversal on the above DOM document fragment (or equivalent structured data), the result of `SELECT tag, attr.id, textContent TRAVEL IN DEPTH` statement is:

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

If we perform a breadth-first traversal on the above DOM document fragment (or equivalent structured data), the result of the `SELECT tag, attr.id, textContent TRAVEL IN BREADTH` statement is:

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

If we perform leaf node traversal on the above DOM document fragment (or equivalent structured data), the execution result of `SELECT tag, attr.id, textContent TRAVEL IN LEAVES` statement is:

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

Note that when executing SQL statements on an array or tree structure based on dictionary data, the optional fields (such as `tag`, `attr.id`, etc.) are the union of the keys of all dictionary data. For all undefined key-value pairs, the corresponding key value is `null`.

When using `TRAVEL IN` clause, you can use built-in variables, such as `@__depth` as the current traversal depth, and `@__index` as the index value at the current depth. So you can reuse `WHERE` conditional clause to Limit the depth or amount of traversal. For example `SELECT tag, attr.id, textContent WHERE @__depth > 0 AND @__depth < 3 TRAVEL IN DEPTH` will give the following result:

```json
[
     { "tag": "li", "attr.id": "user-1", "textContent": null },
     { "tag": "li", "attr.id": "user-2", "textContent": null },
]
```

##### 2.6.1.7) `TRAVEL` Executor

As a simple alternative to `SQL` executor, we can use `TRAVEL` executor on the tree structure.

The syntax of `TRAVEL` actuator is as follows:

```
     "TRAVEL" [ws] ':' [ws] <"SIBLINGS" | "DEPTH" | "BREADTH" | "LEAVES">
```

Described as follows:

- When using `TRAVEL: SIBLINGS`, traverse all sibling nodes at the same level as the current node.
- When using `TRAVEL: DEPTH`, perform a depth traversal from the first level child nodes until the leaf nodes.
- When `TRAVEL: BREADTH` is used, a breadth traversal is performed in the first-level child nodes until all first-level child nodes are traversed.
- When using `TRAVEL: LEAVES`, traverse all leaf nodes.

We use this built-in executor when we need to map the attributes or content of some elements in the DOM subtree to target data or target elements. like:

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

The above HVML code iterates over the users on the user manifest list, maps using `item_user` as the data template, and appends it to the array in `$users`.

##### 2.6.1.8) Use of Built-In Executor

The built-in executors described above are mainly used for selection and iteration.

When the built-in executor does not generate any data items,
- When used for selection, the resulting data is `undefined`;
- When used for iteration, pop the current iteration operation off the stack.

When used to select,
- if the executor returns only a single data item, the result is that data item;
- If the executor returns multiple data items, the result is an array.

The SQL executor can be used for reductions via the `GROUP BY` clause.

When we use a built-in executor in a reduce operation that does not directly implement the reduce operation, it responds to the reduce operation by returning some implicit reduction information. for example,

1. Count: The number of data items that meet the conditions for executing the statement, and the corresponding key name is `count`.
1. Sum: The sum of data items that meet the execution statement conditions), and the corresponding key name is `sum`.
1. Average value: The average value of the data items that meet the execution statement conditions (all data items are forced to be converted to numeric data, and array and dictionary data are set to 0), and the corresponding key name is `avg`.
1. Maximum value: The maximum value of data items that meet the conditions for executing the statement (all data items are forcibly converted to numerical data, and array and dictionary data are set to 0), and the corresponding key name is `max`.
1. Minimum value: The minimum value of data items that meet the conditions for executing the statement (all data items are forcibly converted to numeric data, and array and dictionary data take 0), and the corresponding key name is `min`.

In this case, the return data of the reduce operation will look like:

```json
{
     "count": 5,
     "sum": 400,
     "avg": 90,
     "max": 100,
     "min": 80,
}
```

#### 2.6.2) External Executor

An external executor is a class or function implemented by an external program that meets the requirements of the action tag. It is usually used to perform complex selection, iteration, reduction, and sorting operations, especially some special selections that cannot be implemented through the built-in executor. When filtering, reducing, and sorting operations.

When using an external executor, the HVML interpreter will dynamically call the corresponding function or create the corresponding class object to perform the corresponding operation according to the type prefix of the executor and the current action tag. The HVML interpreter should support at least the following two types of external executors:

- `CLASS: <className>@[<moduleName>]`: means to use the `<className>` class in the module `<moduleName>` as the executor, mainly used for `iterate` action elements.
- `FUNC: <funcName>@[<moduleName>]`: means to use the `<funcName>` function in the module `<moduleName>` as the executor, which can be used for `choose`, `iterate`, `reduce`, ` sort` and `update` action elements.

The HVML interpreter can define the interface specifications of the above-mentioned external executors. For example, for C/C++ language, `<moduleName>` refers to a shared library, and for Python language, `<moduleName>` refers to a loadable module name.

Alternatively, when using an external executor, an additional parameter can be specified using the `with` attribute.

When using an external executor, the application needs to implement the corresponding class or function in the main program or external module. This document uses the Python language as an example to illustrate the implementation methods of each external executor. For scripting languages other than Python, such as C/C++, JavaScript, Lua, etc., you can refer to the implementation of Python for processing.

##### 2.6.2.1) External Function Executor

We can implement all external executors using functions. Taking `Python` as an example, when using `by` preposition attribute to specify an external function executor as a selector, iterator or reducer, the executor must be implemented as a function with the following prototype:

```python
def chooser(on_value, with_value):
```

The corresponding functions are as follows:

- As a selector, the source data (`on` attribute value) should be a container. And the function should return an item in the source data.
- As an iterator, this function should return an array generated based on the source data. And subsequent iterations occur on this array.
- As a reducer, the source data should be a container. And this function should return the data after specific reduction processing on the source data, usually an object.

When using `by` preposition attribute to specify an external function executor as the sorter. The executor must be implemented as a function with the following prototype:

```python
def sorter(on_value, with_value,
         against_value = None, desc = False, caseless = False):
```

That is to say, `against` attribute specified by `sort` element and the adverb attribute values such as `ascendingly`/`descendingly`, `casesensitively`/`caseinsensitively` are passed through `against_value`, `desc` and `caseless` parameters .

When used as a sorter, the source data should be an array or collection. This function performs specific sorting processing on the source data and returns the source data itself.

For example, if we want to select a specified timer from the data defined by the global `$TIMERS` variable, we can use the built-in SQL executor, or an external executor `FUNC: ChooseTimer`.

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

Then the implementation of `ChooseTimer` is very simple - find the `id` from the array specified by the `on` attribute as the array element of the `with` attribute value (here `foo`), if there is, return this array element, otherwise return `None`.

```python
def ChooseTimer(on_value, with_value):
     for t in on_value:
         if with_value == t['id']
             return t
     return None
```

As another example of using `reduce` to count user distribution, the corresponding external `StatsUser` function is implemented as follows:

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

##### 2.6.2.2) External Class Executor

In `iterate` action tag, in addition to using external functions as iterators, we can also use iteration executors defined by external classes. The iterator implemented by the function needs to return all the data to be iterated at one time. While the iterator implemented by the class is called to obtain the data of the current iteration at each iteration. So it has better flexibility. And when there are many data to be iterated, taking up less system resources.

Taking the Python language as an example, when using a class as an external iterator, it must be implemented as a subclass of `HVMLIterator`. The implementation of this class is as follows:

```python
class HVMLIerator:
     def __init__(self, on_value, with_value):
         pass

     # implement this method to iterate the data.
     def iterate(self):
         return None

     # implement this method to filter an item.
     def filter(self, curr_item):
         return True
```

`HVMLIterator` defines two methods:

- `iterate`: It is used to iterate data, and subclasses must override this method. The first time this method is called, the method returns the first data item, and each subsequent call returns the next data item until `None` is returned.
- `filter`: It is used to filter certain data items. When `iterate` method generates a data item, this method will be called. If it returns `False`, the current data will be discarded and the next data item will be obtained. Subclasses do not need to implement this method.

For example, for the following operation of iterating and inserting the clone template into the specified position:

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

We can implement `IUser` class as follows:

```python
class IUser (HVMLI Iterator):
     def __init__(self, on_data, with_value):
         self.on_data = on_data
         self.i = 0;
         self.n = len(on_data)
         pass

     # implement this method to return the next item.
     def iterate(self):
         if self.i < self.n:
             item = self.on_data[i]
             i++
         else:
             item = None

         return item

     # implement this method to filter an item.
     def filter(self, item):
         return True
```

#### 2.6.3) Processing of Executor Regular Expressions

According to the above description, we can use variables in the regular expression of the executor as follows:

```hvml
         <init as="fibonacci">
             [0, 1, ]
         </init>

         <iterate on="1" by="ADD: LT 20 BY $fibonacci[-2]">
             <update on="$fibonacci" to="append" with="$?" />
         </iterate>
```

The above HVML code will get a Fibonacci sequence:

```json
[0, 1, 1, 2, 3, 5, 8, 13]
```

The explanation is as follows:

1. In the first iteration, `$fibonacci` only has two initial values. And the value of `$fibonacci[-2]` is 0. So the rule of `ADD` actuator is: `LT 20 BY 0`. Since the initial value of the iteration result is 1 (specified by the `on` attribute), the result of this iteration is 1. Afterwards. The result is appended to `$fibonacci` array.
1. In the second iteration, there are three values in `$fibonacci`, and the value of `$fibonacci[-2]` is 1. So the rule of `ADD` actuator is: `LT 20 BY 1`. Since the last result of the iteration is 1, so the result of the evaluation is 2. Afterwards, the result is appended to `$fibonacci` array.
1. In the third iteration, there are four values in `$fibonacci`, and the value of `$fibonacci[-2]` is 1. So the rule of `ADD` actuator is: `LT 20 BY 1`. Due to the above result is 2, so the result of the evaluation is 3. Afterwards, the result is appended to `$fibonacci` array.
1. In the fourth iteration, there are five values in `$fibonacci`, and the value of `$fibonacci[-2]` is 2. So the rule of `ADD` actuator is: `LT 20 BY 2`. Due to the above result is 3, so the result of the evaluation is 5. Afterwards, the result is appended to the `$fibonacci` array.
1. At the fifth iteration, there are six values in `$fibonacci`, and the value of `$fibonacci[-2]` is 3, so the rule of the `ADD` actuator is: `LT 20 BY 3`. Due to the above result is 5, so the result of the evaluation is 8. Afterwards, the result is appended to the `$fibonacci` array.
1. At the sixth iteration, there are seven values in `$fibonacci`, and the value of `$fibonacci[-1]` is 5, so the rule of `ADD` actuator is: `LT 20 BY 5`. Due to the above result is 8, so the result of the evaluation is 13. Afterwards, the result is appended to the `$fibonacci` array.
1. At the seventh iteration, there are eight values in `$fibonacci`, and the value of `$fibonacci[-1]` is 8, so the rule of `ADD` actuator is: `LT 20 BY 8`. Due to the above result is 13, so the result of the evaluation is 21. The iteration terminates because the result does not satisfy the condition of `LT 20`.

It should be noted that the processing of executor rule strings generally has the following two stages:

1. If the rule string contains an evaluation expression, it will be processed by the HVML interpreter before passing the rule string to the executor. That is to say, the rule string will not contain any variable information, but may still contain expressions supported by the rule, such as four arithmetic operation expressions.
1. The executor should handle possible rule changes according to the situation. For example, the rule string in the above example has different values in different iterations.

In addition, some executors cannot handle dynamic changes in rules, such as SQL and TRAVEL executors.

### 2.7) Responsive Update

The so-called responsive update refers to the following HVML code:

```hvml
     <init as="message">
         "hello, world"
     </init>

     <p>
         $message
     </p>
```

When the value of the variable `$message` is modified by other HVML code, the corresponding HTML document will be updated automatically without using elements such as `observe`.

With the support of expression binding capabilities provided by HVML, the support of reactive processing becomes extremely simple. We can mark the element's text content as responsive simply by using the `hvml:responsively` adverb attribute in the outer tag:

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

When the above HVML code is running, as long as the user modifies the content in the input box, it will:

1. The content in the input box will be automatically synchronized to `$user_name` variable.
1. The content change of `$user_name` will automatically trigger the change of the content of the paragraph above the input box.

The HVML interpreter does this by implicitly adding bindings to expressions that require reactive processing, and observing bound variables. For example, the above code is equivalent to:

```hvml
     <p>
         $hello $user_name

         <bind as="__p_textContent">$hello $user_name</bind>
         <observe on="$__p_textContent" for="change">
             <update on="$@" at="textContent" with="$__p_textContent.eval">
         </observe>
     </p>

     <input type="text" name="user-name" placeholder="Your Name" value="$user_name" />

     <observe on="input[name='user-name']" for="change">
         <init as="user_name" with="$?.attr.value" />
     </observe>
```

After using responsive processing, developers don't need to explicitly write `bind` and `observe` tags to get the same responsive processing effect, just add `hvml:responsively` adverb attribute to the external tag.

The following example binds the user name to the name entered in the input box; through responsive processing, when the user changes the content in the input box, the text content of `p` element will automatically change.

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

We use the `&=` operator when we need to use reactive updates for properties of skeleton elements. like:

```hvml
     <p style &= 'display:$display' hvml:responsively>
         Hello, $user_name
     </p>
```

## 3) HVML Syntax

Note: This section refers to the HTML specification: <https://html.spec.whatwg.org/#syntax>.

### 3.1) Write HVML Documentation

HVML essentially uses XML syntax to describe individual elements in a program. The writing of HVML documents needs to meet the following points:

1. Always use UTF-8 encoding.
1. Use XML syntax.
1. Case sensitive.
1. Write HTML fragments or templates using XHTML syntax.

An HVML program consists of the following parts:

1. Any number of comments and ASCII whitespace characters.
1. A `DOCTYPE`.
1. Any number of comments and ASCII whitespace characters.
1. A document element defined as an `hvml` element.
1. Any number of comments and ASCII whitespace characters.

There are two forms of comments in HVML programs, one is a regular comment in the form of `<!-- comment content -->`, and the other is a pound sign (`#`) comment commonly used in scripting languages. The difference is:

1. The parser parses regular comments and constructs a comment node in the final vDOM tree.
1. Hashmark comments can only appear before regular comments or `DOCTYPE`. Any number of whitespace characters plus the `#` character defines a pound comment line, all characters in a comment line, including the end of the line, will be completely ignored by the parser. Therefore, the content of the hashtag will not appear in the vDOM tree.

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

DOCTYPE defines the document format and prefixes used by HVML tags.

```hvml
<!DOCTYPE hvml>
```

A `DOCTYPE` must consist of the following parts, in order:

1. A string of ASCII characters matching `<!DOCTYPE`, case-sensitive.
1. One or more ASCII whitespace characters.
1. A case-sensitive string of ASCII characters matching `hvml`.
1. An optional DOCTYPE system information string.
1. Zero or more ASCII whitespace characters.
1. A U+003E GREATER-THAN SIGN character (`>`).

Usually written as `<!DOCTYPE hvml>`, case sensitive.

In the HVML document, when the HVML tag may conflict with a target markup language tag, we can use a predefined prefix to mark the HVML tag. By default, `v:` is used as the prefix, but we can also customize it in DOCTYPE this prefix. The prefix string must start with a letter and end with a colon (`:`).

The format of the SYSTEM identifier string is as follows:

1. One or more ASCII whitespace characters.
1. A case-sensitive string of ASCII characters matching `SYSTEM`.
1. One or more ASCII whitespace characters.
1. A U+0022 QUOTATION MARK character (double quote, `"`) or U+0027 APOSTROPHE character (single quote, `'`).
1. A literal string specifying a system identifier consisting of one or more tokens separated by U+0020 SPACE characters (space, ` `), such as `f: MATH`. The first token must start with an ASCII letter and end with U+003A COLON MARK (colon, `:`); this token defines a prefix for external tags used in the current HVML document. Other tokens define global variables that should be loaded and bound for the current document, such as `MATH`, `FILE.FS`, `FILE.FILE:F`, etc.
1. A U+0022 QUOTATION MARK character (double quotation mark) or a U+0027 APOSTROPHE character (single quotation mark), matching a previously used quotation mark.

For example, if the DOCTYPE element is written as `<!DOCTYPE hvml SYSTEM "ext: MATH FILE.FS FILE.FILE:F">`, the specified prefix can be added before the outer tags to avoid conflicts with HVML tag names:

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

        <init as="databus" with=$STREAM.open('unix:///var/run/hibus.sock','default','hiBus') />

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

Note that we usually only use prefixes when the tags defined by the target markup language conflict with HVML tags.

When we use `SYSTEM` flag of `DOCTYPE` to define a walker-level dynamic object that needs to be preloaded, use `<pkg_name>`, `<pkg_name>:<var_name>`, `<pkg_name>.<obj_name>` or Notation like `<pkg_name>.<obj_name>:<var_name>`. The meanings of the above four representations are explained as follows:

1. Indicate loading the dynamic object with the same package name `<pkg_name>` from the shared library corresponding to `<pkg_name>`, and binding it as a walker-level variable named `<pkg_name>`.
1. Indicate loading the dynamic object with the same package name `<pkg_name>` from the shared library corresponding to `<pkg_name>`, and binding it as a walker-level variable named `<var_name>`.
1. Indicate loading the dynamic object named `<obj_name>` from the shared library corresponding to `<pkg_name>`, and binding it as a walker-level variable named `<obj_name>`.
1. Indicate that the dynamic object named `<obj_name>` is loaded from the shared library corresponding to `<pkg_name>`, and bound as a traveler-level variable `<var_name>`.

Such as `DATETIME math:MATH FILE.FS FILE.FILE:F` means from:

1. Load the dynamic object `DATETIME` from the `DATETIME` library and bind it to the traveler-level `DATETIME` variable.
1. Load the dynamic object `MATH` from the `math` library and bind it to the walker-level `MATH` variable.
1. Load the dynamic object `FS` from the `FILE` library and bind to the traveler-level `FS` variable.
1. Load the dynamic object `FILE` from the `FILE` library and bind it to the walker-level `F` variable.

#### 3.1.2) Elements

According to their functions and uses, HVML elements can be divided into the following categories:

1. Framework elements
`hvml`, `head` and `body` elements. These elements are used to define the skeleton structure of an HVML document.
2. Normal elements
HVML elements other than frame elements are called normal elements. Common elements can be further divided into the following subclasses:
    1. Data operation elements
       `init` and `update` elements. Its content must be a valid parameterized data.
    1. Ordinary operation elements
        `erase`, `clear`, `test`, `match`, `choose`, `iterate`, `reduce`, `observe`, `fire`, `load`, `back`, `define`, `include` `, `call`, `return` and `catch` elements.
    1. Fragment template elements
       `archetype`, `error` and `except` elements. The content of a fragment template element is typically a document fragment written in the target markup language. Referred to as template elements (template elements).
    1. Data template elements
       The `archedata` element. Its content must be a valid parameterized data.
3. Foreign elements
All elements not defined by HVML tags are considered external elements. All external elements that can legally be inserted into the HVML document tree can be called skeleton elements. Such elements can contain text content, other external elements, and other normal HVML elements.

According to its grammatical characteristics, HVML elements can be divided into the following two categories:

1. Noun elements
Includes frame elements, template elements, and data template elements.
2. Operation elements
Including general action elements, skeleton elements and data action elements.

General action elements are used to define operations on data or documents, and can contain other common elements and external elements that can be used as skeleton elements, but cannot define their text content.

Data action elements are used to define data content, and can contain other common elements and external elements that can be used as skeleton elements. When it contains child elements, its data content can only appear once, and it precedes any child elements. As shown in the following example:

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

The content of a template element is located after the start tag of the template element and before the end tag, and can contain any text, character references, external elements, and comments, but the text cannot contain U+003C LESS-THAN SIGN (`<`) or Ambiguous `&` symbol.

The data template element is used to define a data template in eJSON format, and its content is defined after the start tag of the element and before the end tag.

The outer element must either contain both start and end tags, or the start tag must be marked as self-terminating. In the latter case, the terminating tag cannot be included.

For example, when the HTML `<br>` element is used as an external element in HVML, it must be written as: `<br />`.

When an outer element's start tag is marked as self-terminating, that element cannot contain any content (obviously, you can't put anything between the start and end tags without the end tag). When the start tag of an external element is not marked as self-terminating, the element can contain text, character references, HEE, CDATA sections, comments and other external elements or action elements, but the text cannot contain U+003C LESS- THAN SIGN (`<`) or an ambiguous ampersand.

When an external element contains the `hvml:raw` attribute, only escapable raw text can be included in the external element, and such elements are collectively called escapable raw text elements.

Escapeable baretext elements may contain text and character references, but the text must not contain any ambiguous ampersands, subject to the restrictions described below.

Frames and external elements may contain text, character references, other normal elements or external elements, and comments, but text may not contain U+003C LESS-THAN SIGN (`<`) or ambiguous ampersands.

Tags contain a tag name, giving the name of the element. HVML elements allow the use of specified prefixes to avoid tag name collisions. Except for the colon (:) character included in this prefix, use only ASCII letters and numbers in tag names and only start with a letter.

Note that HVML tag names are case sensitive. For tags of external elements, their case will be preserved.

##### 3.1.2.1) Start Tag

The start tag must have the following format:

1. The first character of a start tag must be the U+003C LESS-THAN SIGN character (`<`).
1. The first few characters following the start tag must be the tag name of the element.
1. If any of the attributes are present in the next steps, there must be one or more ASCII whitespace characters.
1. Then, some attributes can be included in the start tag, and the syntax of attributes will be described later. Attributes must be separated by one or more ASCII whitespace characters.
1. One or more ASCII whitespace characters may be included after the attribute, or after the tag name if there is no attribute. (Some attributes require a whitespace to follow; see the Attributes section below.)
1. Then, if the element is a void element, or if the element is an external element, it can contain a U+002F SOLIDUS character (`/`). This character is invalid for blank elements, but for external elements, it indicates that the start tag is self-closing (self-closing).
1. Finally, the start tag must be closed by a U+003E GREATER-THAN SIGN character (`>`).

##### 3.1.2.2) End Tag

Termination tags must have the following format:

1. The first character of a terminating tag must be the U+003C LESS-THAN SIGN character (`<`).
1. The second character of a terminating tag must be the U+002F SOLIDUS character (`/`).
1. The first few characters following the start tag must be the tag name of the element.
1. After the tag name, there can be one or more ASCII whitespace characters.
1. Finally, the terminating tag must be closed by a U+003E GREATER-THAN SIGN character (`>`).

##### 3.1.2.3) Attribute

The attribute of an element is expressed in the element's start tag.

Attribute has a name and a value. Attribute names must consist of one or more characters that are not control characters, U+0020 SPACE, U+0022 (`"`), U+0027 (`'`), U+003E (`>`), U+002F (`/ `), U+003D (`=`), and noncharacter (noncharacter) characters.

Attribute values are typically a mixture of text and character references, with an additional restriction: text cannot contain ambiguous `&` symbols.

Attribute can be specified in five ways:

1) Empty attribute syntax/Empty attribute syntax

Just a attribute name, the attribute value is implicitly specified as the empty string.

In the following example, the `uniquely` attribute is given with the empty attribute syntax:

```hvml
     <init as="foo" uniquely against="id">
```

If an attribute using the empty attribute syntax is followed by another attribute, the two attributes must be separated by an ASCII whitespace character.

2) Unquoted attribute value syntax/Unquoted attribute value syntax

The attribute name is followed by zero or more ASCII blank characters, followed by the U+003D EQUALS SIGN character (`=`), followed by zero or more ASCII blank characters, followed by the attribute value, and the attribute value here, In addition to meeting the attribute value requirements mentioned above, it cannot contain any literal ASCII whitespace characters, U+0022 QUOTATION MARK characters (`"`), U+0027 APOSTROPHE characters (`'`), U+003D EQUALS SIGN character (`=`), U+003C LESS-THAN SIGN character (`<`), U+003E GREATER-THAN SIGN character (`>`), or U+0060 GRAVE ACCENT character (`\``), and Cannot be an empty string.

In the following example, attributes are given in the form of the unquoted attribute value syntax:

```hvml
     <init as=foo uniquely against=id>
```

If an attribute using the unquoted attribute syntax is followed by another attribute, or followed by the optional U+002F SOLIDUS character (`/`) mentioned in step 6 of the start tag syntax, it must be separated by an ASCII whitespace character These two things.

3) Single-quoted attribute value syntax/Single-quoted attribute value syntax

The attribute name is followed by zero or more ASCII whitespace characters, followed by a U+003D EQUALS SIGN character (`=`), followed by zero or more ASCII whitespace characters, followed by a single U+0027 APOSTROPHE character (`' `), followed by the attribute value, and the attribute value here, in addition to meeting the attribute value requirements mentioned above, cannot contain any literal U+0027 APOSTROPHE characters (`'`), and finally the second separate End of U+0027 APOSTROPHE character (`'`).

In the following example, attributes are given in the form of single-quoted attribute-value syntax:

```hvml
     <init as='foo' uniquely against='id'>
```

If an attribute using the single-quote attribute syntax is followed by another attribute, the two attributes must be separated by an ASCII whitespace character.

4) Double-quoted attribute value syntax/Double-quoted attribute value syntax

The attribute name is followed by zero or more ASCII whitespace characters, followed by a U+003D EQUALS SIGN character (`=`), followed by zero or more ASCII whitespace characters, followed by a single U+0022 QUOTATION MARK character (` "`), followed by the attribute value, and the attribute value here, in addition to meeting the above-mentioned attribute value requirements, cannot contain any literal U+0022 QUOTATION MARK characters (`"`), and finally by the second single U+0022 QUOTATION MARK characters (`"`).

In the following example, attributes are given in the form of double-quoted attribute-value syntax:

```hvml
     <choose on="$2.payload" in="#the-user-list" with="$user_item">
```

If an attribute using the double-quote attribute syntax is followed by another attribute, the two attributes must be separated by an ASCII whitespace character.

5) Grave-quoted attribute value syntax/Grave-quoted attribute value syntax

The backtick attribute value syntax is usually used in occasions where system-predefined keywords must be used, such as quoting the name of an error or exception. at this time,

The attribute name is followed by zero or more ASCII whitespace characters, followed by a U+003D EQUALS SIGN character (`=`), followed by zero or more ASCII whitespace characters, followed by a single U+0060 GRAVE ACCENT character (\ `), followed by the attribute value, and the attribute value here, in addition to meeting the attribute value requirements mentioned above, cannot contain any literal U+0060 GRAVE ACCENT characters (\`), and finally the second separate U+0060 GRAVE ACCENT character (\`) at the end.

In verb tags, the U+003D EQUALS SIGN character (`=`) after the attribute name of the preposition can be omitted.

In the following example, attributes are given in the form of backticked attribute-value syntax:

```hvml
     <catch for `NoData`>
         ...
     </catch>

     <except type=`NoData`>
         ...
     </except>
```

Note that when using backticks to define attribute values, literal predefined constants must be used without any evaluation.

If an attribute using the backtick attribute syntax is followed by another attribute, the two attributes must be separated by an ASCII whitespace character.

---

Note that in verb tags, the U+003D EQUALS SIGN character (`=`) after the prepositional attribute name can be omitted.

Within the same start tag, no two or more attributes can have the same attribute name.

##### 3.1.2.4) Action Element Attribute

In HVML, the attribute values of action elements have the following special features:

1. The attribute values of action elements can be divided into preposition attribute and adverb attribute, which are inherent attributes.
1. All preposition attributes need to define corresponding attribute values, and their assignment operators (U+003D EQUALS SIGN `=`) can be omitted.
1. All adverb attributes are described above (Empty attribute syntax/empty attribute syntax).
1. In addition to the inherent preposition and adverb attributes, the `with` attribute of `update` tag can use additional assignment operators.

The assignment operator (`=`) of all prepositional attributes (only in action elements) can be ignored:

```hvml
     <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
         <update at = "textContent" with = "foo" />
     </choose>
```

In addition to the unquoted attribute value syntax described above, we can omit single quotes (U+0027 APOSTROPHE `'`) or double quotes (U+0022 QUOTATION MARK `"`) around prepositional attribute values in the following cases:

1. When using parameterized data definition arrays or objects as preposition attribute values. like,

```hvml
     <choose on ["zh_CN", "en_US"] to "append update" in #the-user-list with $user_item>
     </choose>
```

or,

```hvml
     <choose on {"zh_CN": 100, "en_US": 50} to "append update" in #the-user-list with $user_item>
     </choose>
```

In addition, when single quotes are used, all evaluation expressions in the entire attribute value string will be ignored and treated as ordinary strings.

In `update` element, we can use attribute value operators other than `=` for the `with` attribute to change the final data:

1. When the attribute value of the `with` attribute is a string type, and the modification action is `displace`:
    - `+=`: Add a new token (token) to the final data. If the token already exists, it will not be modified. For example, the original attribute value of `attr.class` is `foo`, after using `at="attr.class" with += "text-warning"`, it will be changed to: `foo text-warning`; if the original If there is an attribute value of `foo text-warning`, it will remain unchanged.
    - `-=`: Remove a token in the final data, if there is no token, do not modify it. For example, the original attribute value of `attr.class` is `foo text-warning`, after using `at="attr.class" with -= "text-warning"`, it will be changed to `foo`.
    - `*=`: Append the specified substring after (default) or before (using the `^` prefix character) each token of the final data. For example, the original attribute value of `attr.class` is `info warning`, after using `at="attr.class" with *= "^text-"`, it will be changed to: `text-info text-warning `.
    - `/=`: Match one token by regular expression in the final data and replace it with the second token. The original `attr.class` attribute value is `foo text-warning`, then after using `at="attr.class" with /= "/^text/ text-info"`, it will be changed to `foo text- info`.
    - `%=`: Exactly match a token in the final data and replace it with the second token. For example, if the original attribute value of `attr.class` is `foo text-warning`, after using `at="attr.class" with %= "text-warning text-info"`, it will be changed to `foo text -info`.
    - `~=`: Match one token against the specified wildcard pattern in the final data and replace it with the second token. For example, if the original attribute value of `attr.class` is `foo text-warning`, after using `at="attr.class" with ~= "text-* text-info"`, it will be changed to `foo text -info`.
    - `^=`: Add the specified attribute value at the head of the final data. For example, the original attribute value of `attr[data-value]` is `ab`, after using `at="attr[data-value]" with ^= "C"`, it will be changed to `Cab`.
    - `$=`: Add the specified attribute value at the end of the final data. For example, the original attribute value of `attr[data-value]` is `ab`, after using `at="attr[data-value]" with $= "C"`, it will be changed to `abC`.
1. When the attribute value of the `with` attribute is numeric data, and the modification action is `displace`:
    - `+=`: Numericize the initial final data, then add the specified attribute value and replace the final data with the result.
    - `-=`: Numericize the initial final data, then subtracts the specified attribute value and replaces the final data with the result.
    - `*=`: Numericize the initial final data, multiplies it by the specified attribute value and replaces the final data with the result.
    - `/=`: Numericize the initial final data, divides by the specified attribute value and replaces the final data with the result.
    - `%=`: Convert the specified attribute value to an unsigned integer: if the value is zero, replace the final data with zero; if the value is not zero, numericalize the initial final data, and then use the Signed integer values modulo the final data and replace the final data with the result.
    - `~=`: Numericize the initial final data (x), digitize the specified attribute value (y), round x, keep y to decimal places, and replace the final data with the result. When y is zero or negative, it is equivalent to the `round` operation of floating point numbers.
    - `^=`: Perform numerical processing on the initial final data (x) and the specified attribute value (y), find x raised to the power of y, and replace the final data with the result.
    - `$=`: Numericize the initial final data (x) and the specified attribute value (y), find the remainder of x / y, and replace the final data with the result.

The word (token) mentioned in the above description usually refers to a sequence of characters whose length is not zero, and the characters in it are ASCII letters, ASCII numbers, or minus signs (`-`), hyphens (`_`). Elements are separated by one or more whitespace characters. However, in a specific implementation, a printable string that does not contain any whitespace characters is considered a complete token.

For example,

```hvml
    <choose on "$2.payload" to "append update" in "#the-user-list" with "$user_item">
        <update at="attr.class" with %= "text-* text-info" />
    </choose>
```

Note that the preposition attribute of an action element is usually treated as a string or parameterized string by the interpreter and used after evaluation, with the following exceptions:

- `on` and `with` attributes of all action elements, if the assignment operator (=) is omitted and the unquoted attribute value syntax is used, or if the other syntax is used and the `[`, `{` or When the value expression begins, it will be treated as a parameterized data; otherwise, it will be treated as a string or a parameterized string.
- `onlyif` and `while` attributes of `iterate` element start with `[`, `{`, or When the evaluation expression begins, it will be treated as a parameterized data; otherwise, it will be treated as a string or a parameterized string.

Here's what happens when the assignment operator is omitted:

```hvml
     <!-- initialize $i to boolean true -->
     <init as i with true />

     <!-- initialize $i to a long integer 100L -->
     <init as i with 100L />

     <!-- initialize $i to the string `false` -->
     <init as i with 'false' />

     <!-- Initialize $i to the string "100L-zh_CN" -->
     <init as i with "100L-$SYS.locale" />

     <!-- Initialize $i with the result of a compound evaluation expression, such as the string "zh_CN" -->
     <init as i with {{ $REQ.locale || $SYS.locale }} />

     <!-- Initialize $i with the result of a compound evaluation expression, such as the string "zh_CN" -->
     <init as i with "{{ $REQ.locale || $SYS.locale }}" />

     <!-- Use parameterized data, initialize $i as an array -->
     <init as i with [0, 1, true, false] />

     <!-- Use parameterized data, initialize $i as an array -->
     <init as i with "[0, 1, true, false]" />

     <!-- Using parameterized data, initialize $i to an object -->
     <init as i with '{ a: 1, b: 2 }' />

     <!-- Using parameterized data, initialize $i to an object -->
     <init as i with { a: 1, b: 2 } />

     <!-- start with a non-specified character, initialize $i to a parameterized string, the result is " [0, 1, true, false]" -->
     <init as i with " [0, 1, true, false]" />
```

Here are the cases where the assignment operator is not omitted:

```hvml
     <!-- initialize $i to the string "true" -->
     <init as i with=true />

     <!-- initialize $i to the string "100L" -->
     <init as i with=100L />

     <!-- initialize $i to the string `false` -->
     <init as i with='false' />

     <!-- Initialize $i to the string "100L-zh_CN" -->
     <init as i with="100L-$SYS.locale" />

     <!-- Use parameterized data, initialize $i as an array -->
     <init as i with=[0, 1, true, false] />

     <!-- Use parameterized data, initialize $i as an array -->
     <init as i with="[0, 1, true, false]" />

     <!-- Using parameterized data, initialize $i to an object -->
     <init as i with='{ a: 1, b: 2 }' />

     <!-- Using parameterized data, initialize $i to an object -->
     <init as i with={ a: 1, b: 2 } />

     <!-- start with a non-specified character, initialize $i to a parameterized string, the result is " [0, 1, true, false]" -->
     <init as i with=" [0, 1, true, false]" />
```

Note that all general attributes of action elements (neither prepositional nor adverbial attributes) are treated as strings or parameterized strings by the interpreter; all attributes of noun elements and external elements are treated as characters by the interpreter string or parameterized string.

##### 3.1.2.5) Optional Tag

Strict XML syntax is required, so, in principle, no tags can be omitted, but there are special cases as described below.

1) Omit `DOCTYPE` entirely

We can omit `DOCTYPE` element entirely. In this case, the parser handles the default `DOCTYPE` as follows:

```
<!DOCTYPE hvml SYSTEM "f:">
```

2) Omit `head` element entirely

We can omit `head` element entirely. In this case, if the target document supports a `head` element, an empty `head` element will be created in the target document.

```hvml
<!DOCTYPE hvml>
<hvml target="html">
     <body>
         ...
     </body>
</hvml>
```

3) Omit `body` element entirely

We can omit the `body` element entirely. In this case, we cannot execute different body codes by specifying the `id` attribute of `body`. If the target document supports the `body` element, an empty `body` element will be created in the target document, and the content of the target document generated by the HVML program will be inserted into the `body` element. If the target document does not support a `body` element, the generated content will be inserted into the root element of the target document.

```hvml
<!DOCTYPE hvml SYSTEM 'f: MATH'>
<hvml target="void">
     <iterate on 0 only if $L.lt($0<, 10) with $MATH.add($0<, 1)>
         $STREAM.stdout.writelines(
                 $STR.join($0<, ") Hello, world! --from COROUTINE-", $CRTN.cid))
     </iterate>
</hvml>
```

4) Auto-closing outer elements

An HVML fragment defined by an outer element looks like this:

```hvml
     <div>
         <p>Taiwan is an inalienable part of Chinese territory<strong>!
     </div>
```

We omitted `</strong>` and `</p>` terminating tags, the above fragment would be parsed as:


```hvml
     <div>
         <p>Taiwan is an inalienable part of Chinese territory<strong>! </strong></p>
     </div>
```

Note that HVML parsers cannot handle the optional tag handling rules defined by the HTML specification. like:

```hvml
     <ul>
         <li>Apple
         <li>Pineapple
         <li>banana
     </ul>
```

According to the HTML specification, it should be parsed as:

```hvml
     <ul>
         <li>Apple</li>
         <li>Pineapple</li>
         <li>Banana</li>
     </ul>
```

but would be parsed by the HVML parser as:

```hvml
     <ul>
         <li>Apple
             <li>Pineapple
                 <li>Banana</li>
             </li>
         </li>
     </ul>
```

##### 3.1.2.6) Content Restrictions for Baretext Elements and Escapable Baretext Elements

The text in bare text elements and escapable bare text elements cannot contain any tags starting with `</` (U+003C LESS-THAN SIGN, U+002F SOLIDUS) followed by tag names starting with ASCII letters and U+0009 CHARACTER TABULATION (tab), U+000A LINE FEED (LF), U+000C FORM FEED (FF), U+000D CARRIAGE RETURN (CR), U+0020 SPACE, U+003E GREATER-THAN SIGN (`>`) , or a string of one of the U+002F SOLIDUS (`/`) characters.

##### 3.1.2.7) Data Content and Data Attribute

The text content contained in `init` and `archedata` elements of HVML must be a valid parameterized data. like:

```hvml
<init as="foo">
    [
        "<p>There is an unrecoverable error!</p>",
        "<p>The exception message: $?.messages</p>"
    ]
</init>
```

The content of such elements is called data content. It should be noted that we need to use a self-contained syntax to describe the data content, which is not as random as naked text, so characters such as `</` can be included, because these characters are usually included in the string wrapped in quotation marks, not appear elsewhere.

In addition, when specifying operation data in attribute values such as `on` and `with` of action elements, we can also directly use parameterized data, such as:

```hvml
<choose on='[$foo, $bar, true, false, null]'>
</choose>
```

For this type of attribute, we call it a data attribute, and the value of the data attribute is represented by legal parameterized data.

In other attribute values, use parameterized strings, such as:

```hvml
<init as='foo' with="foo-$bar" />
```

When defining a document fragment template, its content will be treated as a parameterized string as a whole, such as:

```hvml
<archetype name="foo">
     <li class="user-item" id="user-$?.id" data-value="$?.id" data-region="$?.region">
         <img class="avatar" src="$?.avatar" />
         <span>$?.name</span>
     </li>
</archetype>
```

#### 3.1.3) Text

Text is allowed inside elements, in attribute values, and in comments. Restrictions on the use of the text depend on where the text is used and are described in other subsections.

##### 3.1.3.1) New Line

A new line in HVML must be expressed as a U+000D CARRIAGE RETURN (CR) character, a U+000A LINE FEED (LF) character, or a pair of U+000D CARRIAGE RETURN (CR) and U+000A LINE FEED (LF) character.

A character reference of the U+000A LINE FEED character (but not the U+000D CARRIAGE RETURN character) also expresses a new line, where character references are allowed.

#### 3.1.4) Character Reference

Text may be mixed with character applications in certain cases described in other subsections. Character references can be used for escaping when certain characters cannot legally be contained in the text.

A character reference must begin with a U+0026 AMPERSAND character (`&`), followed by the three possible types of character references:

1) Named character references/Named character references

The `&` character must be followed by the name given in the "Named Character References" section of the [HTML Specification], and must use the same case. Names must be terminated by a U+003B SEMICOLON character (`;`).

2) Decimal numbered character reference/Decimal numeric character reference

The `&` character must be followed by a U+0023 NUMBER SIGN character (`#`), followed by one or more ASCII digits representing a decimal integer corresponding to the allowed code points defined below. Numbers must be terminated by a U+003B SEMICOLON character (`;`).

3) Hexadecimal numeric character reference

The `&` character must be followed by a U+0023 NUMBER SIGN character (`#`), followed by a U+0078 LATIN SMALL LETTER X character (`x`) or a U+0058 LATIN CAPITAL LETTER X character (`X` ), followed by one or more ASCII hexadecimal digits representing a hexadecimal integer corresponding to the allowed code points defined below. Numbers must be terminated by a U+003B SEMICOLON character (`;`).

The two numbered character reference forms described above do not allow references to U+000D CR, noncharacters (noncharacter), and control characters other than ASCII whitespace characters, and any other code point can be referenced.

An ambiguous `&` character is a U+0026 AMPERSAND character (`&`) followed by one or more ASCII letters and digits, followed by a U+003B SEMICOLON character (`;`), but these characters do not Cannot match a name given in the "Named Character References" section of the [HTML Specification].

#### 3.1.5) CDATA Paragraph

A CDATA section must contain the following components in the order given:

1. The string `<![CDATA[`.
1. Optional text, but the text cannot contain the string `]]>`.
1. The string `]]>`.

CDATA sections can only be used for external content. In the following example, a CDATA section is used to escape the content of the MathML `ms` element:

```hvml
<p>You can add a string to a number, but this string qualifies the number:</p>
<math>
  <ms><![CDATA[x<y]]></ms>
  <mo>+</mo>
  <mn>3</mn>
  <mo>=</mo>
  <ms><![CDATA[x<y3]]></ms>
</math>
```

#### 3.1.6) Comments

Comments must have the following format:

1. The string `<!--`.
1. Optional text, but the text cannot start with the string `>`, nor can it start with the string `->`, nor can it contain `<!--`, `-->` or `--!> ` string, and cannot end with the string `<!-`.
1. The string `-->`.

### 3.2) Parse HVML Documentation

(documentation pending).

## 4) Application Example

All examples in this document are for web applications. In this application scenario, we can use Python or any other script program instead of JavaScript to develop web front-end applications. In this section we introduce some other application scenarios of HVML.

### 4.1) Using HVML to Develop Traditional GUI Applications

We assume a GUI system that uses XML to describe the components (widgets) on the interface. Now, we want to use this GUI system to develop a simple file open dialog box. The general interface requirements are as follows:

1. There is a list box (Listbox), which lists the directories and files under the current path (collectively referred to as directory items). The user can use the mouse or keyboard to switch the currently selected item in the list box, and generate an event that the selected item changes.
1. At the top of the list box, there is a text tag (tag), which shows the current path.
1. When the user clicks the "Open" button (Button) below the list box, if the currently selected item in the list box is a directory, enter this directory, modify the content of the text tag used to display the current path, and use the new path Directory items populate the list box, if the currently selected item is a file, returns the selected file.

For the above interface and interaction requirements, we can usually use the following XML file description:

```xml
<ui>
     <tag id="path">
         /home
     </tag>

     <listbox id="entries">
         <item class="dir">..</item>
         <item class="dir">vincent</item>
         <item class="dir">david</item>
         <item class="file">README.txt</item>
     </listbox>

     <button id="open">
         open
     </button>
</ui>
```

Note that for simplicity, we do not introduce descriptive information about the component layout.

In order to meet the above interaction processing requirements, we use HVML to describe the dynamic generation and interaction process of this interface:

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

        <tag id="path">
            $fileInfo.curr_path
        </tag>

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

Let's make some explanations for the key parts of the above HVML code.

First, the code uses a global `$fileInfo` variable to record the current path (initially `/home/`) and the type (initially `dir`) and name (initially `..` ). When the user selects a new directory item in the listbox, the `selected-item-changed` event is observed and the `selected_type` and `selected_name` keys in `$fileInfo` are updated. An example of the `payload` key value for this event is as follows:

```json
     {
         "type": "dir",
         "name": "david",
     }
```

Second, the code uses the `choose` element and an external executor (`CLASS: CDirEntries`) to get all directory entries in the current path. The returned result data is approximately:

```json
     [
         { "type": "dir", "name": "david" },
         { "type": "dir", "name": "vincent" },
         { "type": "file", "name": "README.txt" },
     ]
```

On top of the above results, populate the listbox with `iterate` elements.

Finally, the above code observes the `clicked` event when the user clicks the `Open` button. When handling the event, do the work by checking `$fileInfo.selected_type`:

- If the currently selected directory item type is a directory, switch to that directory. In this case, the list box is first emptied and then populated with the directory items under the new path.
- If the currently selected directory entry type is a file, use the `back` tag to return to the previous HVML program and return `fileInfo` data.

In the above code, the implementation of the external selector `CDirEntries` is very simple, which is to list the directory entries under the given path and return an array of dictionaries as required. It is very simple to implement in Python, so I will omit it here.

If we use the extended schema (lcmd) mentioned in HybridOS to directly execute local system commands, we don't even need to write any code, but just use `init`:

```hvml
     <init as="lcmdParams">
         { "cmdLine": "ls $fileInfo. curr_path" }
     <init>

     <init from="lcmd:///bin/ls" with="$lcmdParams" via="GET" as="files" temporarily>
         <iterate on="$files" in="#entries" by="RANGE: 0">
             <update on="$@" to="append" with="$dir_entry" />
         </iterate>
     </init>
```

In this way, developers can implement a simple file browsing and opening dialog box without writing any programs.

### 4.2) Cloud Apps

HVML has more potential than the above examples suggest. In the future, we can even run the HVML code on the cloud, and control the interface display on the device through the cloud, thus forming a new cloud application solution.

We assume that a smart bracelet displays information such as the current time, local temperature, wearer's heartbeat information and step information, and this smart bracelet exchanges information with the cloud server through MQTT (a lightweight message communication protocol), such as Send the wearer's heartbeat and step information, geographic location information to the cloud server, and obtain information such as time and weather conditions at the current location. In the traditional implementation method, we generally need to develop a GUI system running on the smart bracelet, and then communicate with the cloud to obtain data, and the modification of the interface is completely in charge of the device-side code. If you want to change the style of the interface, in most cases, you need to upgrade the firmware of the entire smart bracelet.

But if we use HVML, we can control the interface display of the device through the cloud. The HVML code running on the cloud looks like this:

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

The main points are as follows:

1. The HTML document generated by the code or the changes to the HTML document will be sent to the device through a long connection similar to WebSocket, and the device will re-render the user interface based on this information.
1. The code monitors the data sent by the smart bracelet (device) to the cloud through MQTT, including heartbeat, temperature, steps and other information, and updates the corresponding tag content.
1. The code sets a timer, runs every 1 second, and updates the tag content corresponding to the clock.
1. The code uses an external selection executor `CDumpEvent` to dump all events from `mqtt` to the cloud database.

This brings about the following notable changes:

1. The complex logic code will all run on the cloud, and the device only needs to have an HTML/XML user agent with sufficient functions, and usually only needs to include a renderer to render the final user interface according to the DOM tree and CSS.
1. When we need to adjust the display effect or function of the device, we only need to modify the HVML code without updating the firmware of the device.
1. We can also organically integrate other functions running on the cloud, such as database storage, data analysis, and artificial intelligence, through external programs.

## 5) Summary

The HVML described in this article is a general, complete, and elegant data-driven dynamic markup language. Its main advantages can be summarized as follows:

1. Defines data-driven HTML/XML document generation rules through a small number of action tags, avoids the traditional programming method based on process control, and opens a new low-code programming mode.
1. Through the preposition attribute and adverb attribute of the action tag, the data and action types and rules required to execute the action are specified, which is easy for developers to understand and master, thereby reducing the learning threshold.
1. For scripting languages (or programming languages) other than the JavaScript scripting language, frameworks and facilities for developing applications using Web technologies (HTML, CSS, HTTP, WebSocket, etc.) are provided.
1. Through rich built-in executors, such as KEY, RANGE, TRAVEL, SQL and other statements to perform iteration, filtering, sorting, reduction and other operations on elements and data, so that developers can concentrate on the realization of business logic, while non-specific algorithm.
1. Through the external executor, it provides a method for using external programs to realize the corresponding functions for the processing of complex data, which improves the scalability.
1. By binding external program modules, a scalable and flexible dynamic object implementation method is provided. Combined with the parameterized data expression method defined in this paper, it can be used to meet various computing needs based on function calls.
1. Solve the problems introduced by the patch solution of the virtual DOM technology built on the existing web technology, such as the reduced readability of the code and the unclear structure.

## Appendix

### Appendix 1) Revision History

Release history:

- March 31, 2023: Release V1.0 RCa, tagged 'v1.0-rca-230331'.
- 31 December 2022: Release V1.0 RC9, tagged 'v1.0-rc9-221231'.
- November 30, 2022: Release V1.0 RC8, tagged 'v1.0-rc8-221130'.
- October 31, 2022: Release V1.0 RC7, tagged 'v1.0-rc7-221031'.
- 01 Sep 2022: Release V1.0 RC6, tagged as 'v1.0-rc6-220901'.
- July 01, 2022: Release V1.0 RC5, tagged as 'v1.0-rc5-220701'.
- 01 Jun 2022: Release V1.0 RC4, tagged as 'v1.0-rc4-220601'.
- 01 May 2022: Release V1.0 RC3, tagged as 'v1.0-rc3-220501'.
- April 01, 2022: Release V1.0 RC2, tagged as 'v1.0-rc2-220401'.
- February 09, 2022: Release V1.0 RC1, tagged 'v1.0-rc1-220209'.

#### RCb) 230430

##### RCb.1) Adjust Page and Workspace Name Conventions 

The main revisions are as follows:

1. Add reserved names for workspaces such as `_default`, `_active`.

Related chapters:

- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)

#### RCa) 230331

##### RCa.1) Adjust `SYSTEM` Identifier Rules for `DOCTYPE`

The main revisions are as follows:

1. When loading an external module using the `SYSTEM` identifier rule of `DOCTYPE`, bind the corresponding dynamic object to the walker-level variable.

Related chapters:

- [3.1.1) DOCTYPE] (#311-doctype)

##### RCa.2) Adjust Result of `catch` Action Element

The main revisions are as follows:

1. The result of `catch` action element needs to be defined as an object describing the exception information.

Related chapters:

- [2.5.14) `catch` tag] (#2514-catch-tag)

##### RCa.3) Tweak `update` action Element

The main revisions are as follows:

When specifying the source data, when the source data must be a linear container (array, tuple or set), a single data can also be treated as an array containing only one member to facilitate programming.

Related chapters:

- [2.5.2) `update` tag] (#252-update-tag)

#### RC9) 221231

##### RC9.1) Reactive Processing Syntax for Defining Skeleton Element Attributes

The main revisions are as follows:

1. Use `&=` operator to specify that a particular attribute of a skeleton element is responsive.

Related chapters:

- [2.7) Reactive update] (#27-Reactive update)

##### RC9.2) Structured Data Representation of Document Fragments

The main revisions are as follows:

1. Use `dataContent` instead of `jsonContent`.
1. Remove virtual keys like `style.width`.
1. Remove virtual key names like `content[<index>]`.

Related chapters:

- [2.1.17) Structured data representation of document fragments] (#2117 - Structured data representation of document fragments)

##### RC9.3) Adjust `update` Element Related Details  


The main revisions are as follows:

1. `add` action has been added, which can be used in collections.
1. Adjust  `remove` action, which can be used for collections.
1. Adjust operations such as `merge`, `unite`, `overwrite`, `intersect`, `subtract`, `xor`, which can be used for objects.

Related chapters:

- [2.5.2) `update` tag] (#252-update-tag)

##### RC9.4) Adjust `request` Element Related Details  

The main revisions are as follows:

1. Adjust the description of coroutine tokens.
1. Adjust the description of `$RDR` predefined variable.

Related chapters:

- [2.5.16) `request` tag] (#2516-request-tag)
- [2.1.6.3) Predefined variables] (#2163-predefined variables)

#### RC8) 221130

##### RC8.1) Backtick Attribute Value Syntax

The main revisions are as follows:

1. Define the exception or error name using the backtick attribute value syntax.

Related chapters:

- [2.1.12) Error and exception handling] (#2112-Error and exception handling)
- [2.4.3) `error` tag] (#243-error-tag)
- [2.4.4) `except` tag] (#244-except-tag)
- [2.5.14) `catch` tag] (#2514-catch-tag)
- [3.1.2.3) Properties] (#3123-properties)

##### RC8.2) New Data Type Aliases

The main revisions are as follows:

1. Add `linctnr` as an alias for the linear container type.

Related chapters:

- [2.2.4) Description syntax for dynamic object methods] (#224-Dynamic object method description syntax)

##### RC8.3) Adverb Attributes in Frame Elements

The main revisions are as follows:

1. All HVML adverb attributes used in framework elements (`hvml`, `head`, `body`), should not be cloned into the target document.
1. `target` attribute in `hvml` tag should also not be cloned into the target document.

Related chapters:

- [2.3) Detailed explanation of frame tags](#23-Detailed explanation of frame tags)

##### RC8.4) Misc

The main revisions are as follows:

1. Extend JSON syntax to support triple single quotes (`'''`).
1. Fine-tune the stringification rules to avoid newline characters and use commas and semicolons instead.
1. Normative terms:
    - Hybrid evaluation expression (HEE).
    - Compound hybrid evaluation expression (CHEE).
    - Parameterized Data.
    - Parameterized String.
1. `$EJSON` is renamed to `$DATA`.
1. `$DATA.numberify` is renamed to `$DATA.numerify`.
1. Adjust the chapters about evaluation expression syntax, eJSON syntax.

Related chapters:

- [2.1.4.3) stringify] (#2143-stringify)
- [2.2.5) eJSON syntax] (#225-ejson-syntax)

#### RC7) 221031

##### RC7.1) Stand-In Expression

The main revisions are as follows:

1. Introducing the term substitute expression
1. Enhance the `bind` tag to support alias expressions
1. Add `constantly` adverb attribute
1. Add a new variable name convention section

Related chapters:

- [2.1.6.13) Expression variables and alias expressions] (#21613 - Expression variables and alias expressions)
- [2.1.6.14) Variable name convention] (#21614-Variable name convention)
- [2.5.13) `bind` tag] (#2513-bind-tag)
- [2.1.14) Adverb attributes] (#2114-adverb attributes)

##### RC7.2) Tuning Variables Section

The main revisions are as follows:

1. Re-divide the content of subsections.
1. Allow `$~` to be used instead of `$<` when it is necessary to avoid using angle brackets as context variables.
1. Use the term `undetermined` (replacing `undefined`) to describe the initial state of a context variable when it is not assigned a value.

Related chapters:

- [2.1.6) Variables] (#216-Variables)

##### RC7.3) Adjust the eJSON Syntax for Defining Tuples

The main revisions are as follows:

1. Use `[!` and `]` to surround definition tuples; reserve `( ... )` for defining common mathematical or logical expressions.

Related chapters:

- [2.1.15) Quoting elements or data] (#2115 - Quoting elements or data)
- [2.2.5) eJSON syntax] (#225-ejson-syntax)

##### RC7.4) Adjust the Name of the Adverb Attribute

The main revisions are as follows:

1. Add shorthand forms of adverb attributes such as `constantly`, `concurrently`, `responsively`.
1. Add the equivalent writing forms of `noreturn` and `nosetotail`.

Related chapters:

- [2.1.14) Adverb attributes] (#2114-adverb attributes)

##### RC7.5) Preposition Attributes Enhancement 

The main revisions are as follows:

1. `idd-by` preposition attribute is added to set the identifier of the verb element to avoid using the noun attribute `id` in the verb element.

Related chapters:

- [2.1.13) Prepositional properties] (#2113-prepositional properties)

#### RC6) 220901

##### RC6.1) Enhance Variable Names

The main revisions are as follows:

1. Allow Unihan ideographic characters in variable names

Related chapters:

- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)

##### RC6.2) Enhance `request` Tag

The main revisions are as follows:

1. Enhance the `request` tag to allow sending requests to other walkers' main coroutines.
1. Enhance the `request` tag to allow sending data to the specified channel of other walkers.

Related chapters:

- [2.5.16) `request` tag] (#2516-request-tag)

##### RC6.3) Adjust HVML URI Schema

The main revisions are as follows:

1. Adjust `hvml+cor` schema to `hvml+run` schema.
1. Enhance the `hvml+run` schema so that it can be used to specify coroutines or channels.

Related chapters:

- [2.1.19.2) `hvml+run` schema] (#21192-hvmlrun-schema)
- [2.2.3) Common denoted nouns] (#223-Common denoted nouns)

##### RC6.4) Add Tuple Container Type

The main revisions are as follows:

1. Use tuples to define a fixed-capacity linear container.

Related chapters:

- [2.1.3) Extended data types] (#213-Extended data types)
- [2.2.5) eJSON syntax] (#225-ejson-syntax)

##### RC6.5) Reevaluation

The main revisions are as follows:

1. Increase the description of re-evaluation
1. Add a description of the timing of coroutine scheduling

Related chapters:

- [2.1) Rationale] (#21-Rationale)
- [2.1.8) Stacked virtual machine] (#218-stacked virtual machine)
- [2.1.6.3) Predefined variables] (#2163-predefined variables)

#### RC5) 220701

##### RC5.1) Adjust the Description of `include` Tag

The main revisions are as follows:

1. Supplement the description for in-place execution.

Related chapters:

- [2.5.10) `define` and `include` tags] (#2510-define-and-include-tags)

##### RC5.2) Adjust `request` Tag

The main revisions are as follows:

1. Adjusted the processing model of using the `request` tag to send requests to other coroutines.
1. In the `to` attribute value, you can use `get:` and `set:` prefixes to get or set the dynamic attribute value of the element.
1. When sending a request to the renderer, use the predefined variable `$RDR`.

Related chapters:

- [2.5.16) `request` tag] (#2516-request-tag)
- [2.1.6.3) Predefined variables] (#2163-predefined variables)

##### RC5.3) Adjust `load` and `call` Tags

The main revisions are as follows:

1. `load` supports creating a new coroutine in the specified worker to execute the specified HVML program.
1. `load` and `call` tags use `within` attribute to specify the new traveler name.
1. In `load` tag, use the new `onto` attribute to specify the renderer page information.
1. `idle` and renderer events on `$CRTN` predefined variable.
1. When `load` and `call` are executed asynchronously, the return value is a native entity representing the new coroutine. The native entity should provide the `id` attribute to return the identifier of the new coroutine.

Related chapters:

- [2.1.13) Prepositional properties] (#2113-prepositional properties)
- [2.5.12) `call` and `return` labels] (#2512-call-and-return-labels)
- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)
- [2.1.6.3) Predefined variables] (#2163-predefined variables)

##### RC5.4) HVML URI Schema and Coroutine Descriptor

The main revisions are as follows:

1. `hvml` schema
1. `hvml+cor` schema
1. Coroutine descriptor

Related chapters:

- [2.1.19) HVML URI schema] (#2119-hvml-uri-schema)
- [2.2.3) Common denoted nouns] (#223-Common denoted nouns)

##### RC5.5) Enhance `sort` Tag

The main revisions are as follows:

1. You can use the built-in executor to convert the data specified by the `on` attribute into an array.

Related chapters:

- [2.5.9) `sort` tag] (#259-sort-tag)

##### RC5.6) Adjust the `observe` Tag

The main revisions are as follows:

1. Use the `against` preposition attribute to define observations against variables instead of the `at` attribute.

Related chapters:

- [2.5.11) `observe`, `forget` and `fire` labels] (#2511-observe-forget-and-fire-labels)

##### RC5.7) Frame Tag Content

The main revisions are as follows:

1. The content defined in the `hvml` tag is evaluated as an expression and set as the result data of the corresponding stack frame.

Related chapters:

- [2.3.4) `hvml` tag content](#234-hvml-tag content)

##### RC5.8) Other Revision

The main revisions are as follows:

1. `load` tag supports the predefined page type `_inherit`, which means inheriting the document and renderer pages of the parent coroutine (only those in the same line).
1. Adjust the common window prefix to `plainwin:`.
1. Allow hashtag comments.
1. Allow `head` and `body` to be optional tags.
1. Allow the `init` tag to not bind variables but only initialize data as the execution result of the `init` element.
1. Allow `init` tag `_runner` as `at` attribute value to initialize a runner-level variable.
1. Use "walker" instead of "session".
1. `$SESSION` is renamed to `$RUNNER`; `$HVML` is renamed to `$CRTN`; `$SYSTEM` is renamed to `$SYS`; `$REQUEST` is renamed to `$REQ`.
1. Adjust the processing rules when `iterate` does not use the iterative executor.
1. `archetype` tag adds the `type` attribute to define the text type.
1. When `include` or `call` element is applied to an operation group, if the actual parameter passed is an object, it can be processed into multiple formal parameters by using a temporary variable, which is convenient for code writing.
1. Add the description of the expression `${...}`: used to construct a valid variable name.
1. Correct the use of the prefix defined by the SYSTEM identifier in DOCTYPE: it is used on external tags that may conflict with HVML tags, instead of HVML tags.

Related chapters:

- [2.3.4) `hvml` tag content](#234-hvml-tag content)
- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)
- [3.1) Writing HVML documentation] (#31-writing-hvml-documentation)
- [3.1.2.5) OPTIONAL-TAGS] (#3125-OPTIONAL-TAGS)
- [2.5.1) `init` tag] (#251-init-tag)
- [2.5.7.2) don't use iterative executor] (#2572 - don't use iterative executor)
- [2.4.1) `archetype` tag] (#241-archetype-tag)
- [2.5.10) `define` and `include` tags] (#2510-define-and-include-tags)
- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)
- [3.1.1) DOCTYPE] (#311-doctype)

#### RC4) 220601

##### RC4.1) Refactor `Fundamental` Section

The main revisions are as follows:

1. Add several terms.
1. Add the description of HVML stack virtual machine.
1. Add an overview of various elements, supplemented the relationship between various elements and virtual machine stack frames and context variables.
1. Add a description of the state of the coroutine.

Related chapters:

- [2.1) Rationale] (#21-Rationale)
- [2.1.16) HVML coroutine state] (#2116-hvml-coroutine state)

##### RC4.2) MIME Types and Data

The main revisions are as follows:

1. Explain how to determine the loaded data type according to the MIME type of the resource when loading data from an external resource.

Related chapters:

- [2.1.18) MIME-types] (#2118-mime-types)

##### RC4.3) `inherit` Tag

The main revisions are as follows:

1. In order to facilitate group writing of code blocks, the `inherit` tag is added. The action element created by the `inherit` tag does not use any preposition and adverb attributes, and inherits the context variables of the previous stack frame.

Related chapters:

- [2.5.18) `inherit` tag] (#2518-inherit-tag)

##### RC4.4) `sleep` Tag

The main revisions are as follows:

1. Add `sleep` tag to sleep the current coroutine.

Related chapters:

- [2.5.19) `sleep` tag] (#2519-sleep-tag)

##### RC4.5) Adjust Context Variables

The main revisions are as follows:

1. Add `$^` context variable, which is used to represent the data defined by the content in the action element.
1. Adjust the purpose of `$<`, only used for iteration, named iterative data.
1. When the observed event comes and the operation group defined by `observe` is executed, the user data is used to pass the event name, event source and other information in the front stack frame of the corresponding operation group:
    - `$!`: In user data, two temporary variables are predefined to represent the complete event name and event source, named `_eventName` and `_eventSource` respectively.

Related chapters:

- [2.1.6) Variables] (#216-Variables)
- [2.5.7.2) don't use iterative executor] (#2572 - don't use iterative executor)
- [2.6.1.5) Builtin executor for numeric values] (#2615 - Builtin executor for numeric values)
- [2.5.11) `observe`, `forget` and `fire` labels] (#2511-observe-forget-and-fire-labels)

##### RC4.6) Adjustment of Elements and Attributes

The main revisions are as follows:

1. Describe in detail the implementation mechanism of the `call` element to call the operation group concurrently, and use the `concurrently` adverb attribute to indicate concurrent calls, and use the `within` attribute to set the traveler name.
1. Add the `within` attribute, which is used to specify the renderer page information in the `load` element, and specify the traveler name in the `call` to avoid using the `in` attribute.
1. Enhance the `request` element so that it can be used to send events to other coroutines.
1. Supplement the result data in the case of asynchronous execution of `load` and `call` elements: coroutine identifier.

Related chapters:

- [2.1.13) Prepositional properties] (#2113-prepositional properties)
- [2.1.14) Adverb attributes] (#2114-adverb attributes)
- [2.5.12) `call` and `return` labels] (#2512-call-and-return-labels)
- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)
- [2.5.16) `request` tag] (#2516-request-tag)

##### RC4.7) `differ` Tag

The main revisions are as follows:

1. Enhance `test` tag to use `with` attribute to simplify branch handling.
1. Add `differ` tag to define other branches.

Related chapters:

- [2.5.5) `test`, `match` and `differ` labels] (#255-test-match-and-differ-labels)

#### RC3) 220501

##### RC3.1) Adjust Action Tags

Remove `connect`, `send` and `disconnect` labels, and adjust related functions to use `$STREAM`.

Use the `exit` tag to exit the execution of the program and define the return data of the program.

Adjust the functionality of the `back` tag, used to unwind stack frames.

Add handling details of the `from` attribute of the `define` element.

`with` attribute can be used to specify the operation group in the `observe` tag.

`request` tag is only used to make a request to the renderer.

Name variables maintained in context variables, called "temporary variables", are no longer confused with "local variables". Use the `temporarily` adverb attribute (which can be abbreviated as `temp`) to define temporary variables instead of the `locally` attribute.

Adjuste the role of `at` attribute in `init` and `define` tags: `at` attribute is now used to define the namespace of variable or operation group names.

In the `request`, `bind` and `load` tags, in the case of asynchronous execution, if you use the `as` attribute to name, you can use the `at` attribute to define the namespace of the name.

Wildcards or regular expressions can be used in the `for` attribute value of the `observe` and `forget` tags.

Define the contents of the context variable for the `observe` action group.

Adjuste the description order of action tags.

Related chapters:

- [2.5.10) `define` and `include` tags] (#2510-define-and-include-tags)
- [2.5.11) `observe`, `forget` and `fire` labels] (#2511-observe-forget-and-fire-labels)
- [2.5.15) `back` tag] (#2515-back-tag)
- [2.5.16) `request` tag] (#2516-request-tag)
- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)

##### RC3.2) HVML Program Running Status

Define the running state of an HVML program:

Related chapters:

- [2.1.16) HVML program running status] (#2116-hvml-program running status)

##### RC3.3) Use the Element's Anchor Name to Locate the Front Stack Frame

The preceding stack frame can be located using the element's anchor name, allowing context variables in the preceding stack frame to be specified in the evaluation expression.

Related chapters:

- [2.1.6) Variables] (#216-Variables)
- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)

##### RC3.5) eJSON Syntax Enhancement

Sign longs and unsigned longs can be expressed in hexadecimal using the `0x` prefix.

An empty sequence of bytes can be defined.

Related chapters:

- [2.2.5) eJSON syntax] (#225-ejson-syntax)

##### RC3.6) `$STREAM` Predefined Variable

A basic description of the built-in dynamic variable `$STREAM`.

Related chapters:

- [2.1.6.3) Predefined variables] (#2163-predefined variables)

##### RC3.7) Adjust the Description Syntax of Dynamic Object Methods

Native entity types are described using the form `native/<entityName>`, where `<entityName>` is the name of this native entity type. No longer use `specific` aliases.

Related chapters:

- [2.2.4) Description syntax for dynamic object methods] (#224-Dynamic object method description syntax)

##### RC3.8) Naming Rules for Event Names

The token that defines the name of the event.

Related chapters:

- [2.2.3) Common denoted nouns] (#223-Common denoted nouns)
- [2.5.11) `observe`, `forget` and `fire` labels] (#2511-observe-forget-and-fire-labels)

##### RC3.9) Simplify external executors

Labels such as `init`, `update` no longer support external executors.

Only `iterate` tag supports class-based external executors.

`sort` tag supports external functions as sorters.

Related chapters:

- [2.5.9) `sort` tag] (#259-sort-tag)
- [2.6.2) External Actuator] (#262-External Actuator)

##### RC3.10) Coroutines and Their States

Supplements the relationship between interpreter instance, renderer session, application and walker, and defines the running state and rendering state related to coroutines.

Related chapters:

- [1.4) Application Framework] (#14-Application Framework)
- [2.1.16) HVML coroutine state] (#2116-hvml-coroutine state)
- [2.5.17) `load` and `exit` labels] (#2517-load-and-exit-labels)

#### RC2) 220401

##### RC2.1) Initialization and Reset Methods of User-Defined Temporary Variables

Use `temporarily` to create or reset a temporary variable.

The name of the temporary variable can be specified in `as` or `at` of the `init` tag.

Locally name variables can be referenced directly using their names, and have a higher name lookup priority than static variables.

Clearly distinguish static named variables from locally named variables.

Related chapters:

- [2.1.6) Variables] (#216-Variables)
- [2.5.1) `init` tag] (#251-init-tag)
- [2.1.14) Adverb attributes] (#2114-adverb attributes)

##### RC2.2) Adjust the Description Syntax of Dynamic Object Methods

Adjust the description syntax of dynamic object methods to be more rigorous.

Related chapters:

- [2.2.4) Description syntax for dynamic object methods] (#224-Dynamic object method description syntax)

##### RC2.3) Context variable enhancements and tweaks

Remove `$&`: It refers to the auxiliary data (auxiliary data) of the pre-operation, which is initially the data after evaluating the attribute value of the preposition attribute with; the iterative executor may modify this data.

Context variable `$^` changed to `$<` for better recognition:

You can use 0 as a prefix to access context variables in the current stack frame, such as `$0<`, `$0%`, etc.

Related chapters:

- [2.1.6) Variables] (#216-Variables)
- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)

##### RC2.4) Enhancement to `iterate` Element

Support directly using the `with` attribute to define expressions that produce iteration results.

Support using the `onlyif` and `while` attributes to determine whether to terminate the iteration before and after generating the iteration result respectively. The attribute value processing of these two attributes is similar to the `on` and `with` attributes, that is, expressions are prioritized.

Support the use of the `nosetotail` adverb attribute to use the result of the previous iteration as the input for the next iteration.

Related chapters:

- [2.1.13) Prepositional properties] (#2113-prepositional properties)
- [2.1.14) Adverb attributes] (#2114-adverb attributes)
- [2.5.7.2) don't use iterative executor] (#2572 - don't use iterative executor)
- [3.1.2.4) Action element attributes] (#3124 - Action element attributes)

##### RC2.5) Adjust the Content of the First Chapter

Adjusted the first chapter title from "Background" to "Introduction" and reorganized the content.

Related chapters:

- [1) Introduction] (#1-Introduction)

##### RC2.6) Exception related Enhancement

Add `Unsupported` exception.

Clarify ignorable and non-ignorable exceptions, and how to handle the `silently` adverb attribute.

Related chapters:

- [2.1.12) Error and exception handling] (#2112-Error and exception handling)

##### RC2.7) Name an `observe`

An observation can be named using `observe` so that a specific observation can be removed.

Related chapters:

- [2.5.10) `observe`, `forget` and `fire` labels] (#2510-observe-forget-and-fire-labels)

##### RC2.8) Enhance `request`

A target document location (a collection of elements) can be asked to execute a method using `request`.

Related chapters:

- [2.5.11) `request` tag] (#2511-request-tag)

##### RC2.9) Adjust Preposition Attributes

Use `against` to define unique keys for collections in `init` and sort by in `sort`. The `via` attribute is only used to define the method of the request.

Use `with` attribute to define filtering data for external executors, no longer use the `via` attribute.

Related chapters:

- [2.1.13) Prepositional properties] (#2113-prepositional properties)
- [2.5.1) `init` tag] (#251-init-tag)
- [2.5.9) `sort` tag] (#259-sort-tag)
- [2.6.2) External Actuator] (#262-External Actuator)

##### RC2.10) Adjust the Syntax of Reactive processing

Use the `responsively` adverb attribute to define the text content of skeleton elements as responsive, no longer use `{{$...}}` syntax.

Use `<p style &= 'display: $display;' >` to define properties on skeleton elements to be responsive.

Related chapters:

- [2.7) Reactive processing] (#27-Reactive processing)
- [2.1.14) Adverb attributes] (#2114-adverb attributes)

##### RC2.11) Enhance `bind` Tag

Enhance `bind` tag to support using content to define the expression to bind.

Related chapters:

- [2.5.13) `bind` tag] (#2513-bind-tag)

##### RC2.12) Compound Evaluation Expressions

Support compound evaluation expression (CHEE, compound evaluation expression).

Related chapters:

- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)

##### RC2.13) Adjust Booleanization Rules

When booleanizing, the numerical processing is no longer performed.

Related chapters:

- [2.1.4.2) Boolean] (#2142-boolean)

#### RC1) 220209

##### RC1.1) Adjustment of Context Variables

Remove the following context variables:

- `$*`: It refers to the type of the pre-operation result data, represented by a string, the same as the return value of `$DATA.type($?)`.
- `$#`: It refers to the number of data items contained in the pre-operation result data, same as the return value of `$DATA.count($?)`.
- `$&`: As the iterator of the current iteration, it is essentially the native entity corresponding to the iterator.

Context variable `$~` changed to `$^` for better recognition:

- `$^`: It refers to the input data of the pre-operation, which is initially the data after evaluating the attribute value of the preposition attribute `on`; the iterative executor may modify this value.

Add the following context variables:

- `$&`: It refers to the auxiliary data of the preceding operation, which is initially the data after evaluating the attribute value of the preposition attribute `with`; the iterative executor may modify this value.
- `$!`: User-defined data saved in the pre-operation execution stack, used to define temporary data.

Added description: The difference between named variables and context variables.

Related chapters:

- [2.1.6) Variables] (#216-Variables)
- [2.2.2) Syntax of evaluated expressions] (#222 - Syntax of evaluated expressions)

##### RC1.2) `init` Tag Enhancement

Use `at` attribute in `init` tag to overwrite named variables already in the current namespace.

When `as` or `at` attribute is not specified in `init` tag, the user-defined data in the definition or override.

Related chapters:

- [2.5.1) `init` tag] (#251-init-tag)

##### RC1.3) Additional Clarifications for Numeric Executors

Added a description for the initial data of the numerical actuator.

Related chapters:

- [2.6.1.5) Builtin executor for numeric values] (#2615 - Builtin executor for numeric values)

##### RC1.4)`observe` Tag Enhancement 

Use `at` attribute in `observe` tag to observe the data changes corresponding to the named variables.

In order to observe the abnormal state when the named variable is initialized asynchronously, the exception data type is added.

Related chapters:

- [2.5.10) `observe`, `forget` and `fire` labels] (#2510-observe-forget-and-fire-labels)
- [2.1.3) Extended data types] (#213-Extended data types)

##### RC1.5) Skeleton Element Enhancement

Skeleton elements are defined as generic action elements with default actions, and thus can be nested with HVML action elements.

Related chapters:

- [2.1.11.1) Action elements used to manipulate data] (#21111 - Action elements used to manipulate data)
- [3.1.2) Elements] (#312-Elements)

##### RC1.6) Enhancement to Attribute Value Operators

In `update` action element, when the data specified by `with` attribute is a string type and the modification action is `displace`, the `*=` attribute value operator is added.

In `update` action element, when the data specified by `with` attribute is numeric data and the modification action is `displace`, you can use `+=`, `-=`, `*=`, `/= `, `%=` and other attribute value operators.

Related chapters:

- [3.1.2.4) Action element attributes] (#3124 - Action element attributes)

#### BRC) Other

Old matching rules:

- If `for` attribute value is `*` or an empty string, it is equivalent to matching any value.
- If the attribute value does not use the prefix described below, or is prefixed with the `\` character, an exact match is performed. If the current value is a string, the `for` attribute value is treated as a string to perform string matching; if the current value is a number, the `for` attribute value is treated as a number to perform matching.

If the current value is a string, the following prefixes can be used to indicate matching conditions other than exact matching:

- `~`: Indicates a wildcard (wildcard) match of a string, which supports wildcards and ignores case; such as `~zh*`, means to match all strings starting with `zh`.
- `/`: Indicates a regular expression match for a string. For example, `/[1-9][0-9]?/` means to match a string of positive integers from 11 to 99.

If the current value is a number, the following prefixes can be used to indicate matching conditions other than exact matching:

- `>`: Indicates that the current value is greater than the value given after the prefix, such as `> 30`.
- `>=`: Indicates that the current value is greater than or equal to the value given after the prefix, such as `>= 30`.
- `<=`: Indicates that the current value is less than or equal to the value given after the prefix, such as `<= 30`.
- `<`: Indicates that the current value is less than the value given after the prefix, such as `< 30`.
- `!`: Indicates that the current value is not equal to the value given after the prefix, such as `! 30`.

### Attachment 2) Undetermined Content

#### TBD 1) Extended Data Types

##### TBD 1.1) Extended Data Types

1) Complex numbers and their operations

2) Matrix and its operations

#### TBD2) Action Element

##### TBD2.1) `pipe` Tag

The `pipe` tag is used to pipe a byte sequence, string, or output stream to another thing that accepts an input stream.

For example, the actual effect of the following code is to append the contents of the file `src.txt` to `dst.txt`.

```hvml
     <pipe on="$STREAM.open('file://src.txt', 'read')"
             with="$STREAM.open('file://dst.txt', 'write append')">
     </pipe>
```

We can also pipe the output stream to a subprocess that executes a specific program, and then pipe the output stream of the subprocess to standard output:

```hvml
     <pipe on="HVML" with="$STREAM.open('exe:///usr/bin/wc')">
         <pipe on="$?" with="$STREAM.stdout" />
     </pipe>
```

`pipe` tag will always read data from the stream entity specified by `on` attribute, and write the result to the stream entity specified by the `with` attribute. By default, when the stream entity specified by the `on` attribute is closed, `pipe` ends execution, and its result data is the stream entity specified by the `with` attribute.

When the data specified by `on` attribute is a byte sequence or a string, it will correspond to a virtual stream entity, the content of which is the specified byte sequence or string, and the file will be received after reading these contents Tail flag indicating that the stream entity has been closed.

We can use `asynchronously` adverb attribute to execute `pipe` operations asynchronously:

```hvml
     <pipe on="$STREAM.in" with="$STREAM.open('exe:///usr/bin/wc')"
             as="myPipe" async>
         <observe on="myPipe" for="pipe:done">
             <choose on="$STREAM.stdout.writelines($myPipe.out.readlines(1))" />
         </observe>
     </pipe>
```

##### TBD2.2) `connect`, `send` and `disconnect` Tags

As mentioned earlier, `connect` tag defines a persistent connection to an external data source, such as packets from MQTT or a local data bus (such as the data bus dBus commonly used in Linux desktop systems); while the `disconnect` tag closes a previously established connection. A long connection data source.

`send` tag is used to send a synchronous or asynchronous message on a connected persistent connection data source. For example, when sending a request to an external module or a remote computer through MQTT or a local data bus. We use `send` element to send an asynchronous message, and then do corresponding processing in another HVML element defined by `observe` tag. For example, we want to issue a remote procedure call to the system daemon to get the list of currently available WiFi hotspots through the hiDataBus protocol:

```hvml
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

Normally, when a synchronous request is used, the execution result data of `send` element is the return result of the request. If an asynchronous request is used, the operation result data of `send` element is the string `ok`. When making an asynchronous request, generally follow-up processing should be done in the corresponding `observe` element.

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

##### TBD2.3) External Function Updater

In `update` tag, `by` specifies an external function executor; when the modification action given by the `to` attribute cannot complete the expected modification operation, the external function executor can be used. When the `by` attribute is specified, the `to` attribute value is ignored.

External functions are mainly used in `update` tag to complete complex update operations. The prototypes of all event handlers are:

```python
def event_handler (on_value, with_value, root_in_scope):
```

in,

- `on_value` is the value of `on` attribute of `update` element.
- `with_value` is the value of `with` attribute of `update` element.
- `root_in_scope` is the current operating scope determined by `in` attribute of `update` element.

For example, for the change event of battery power, its `payload` contains two key-value pairs `level` and `charging` as shown in 2.8), which respectively indicate the current power percentage and whether it is charging. Therefore, its corresponding executor can be implemented as:

```python
def on_battery_changed(on_value, with_value, root_in_scope):
     if on_value.level == 100:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-full.png'
     elif on_value.level > 90:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-90.png'
     elif on_value.level > 70:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-70.png'
     elif on_value.level > 50:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-50.png'
     elif on_value.level > 30:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-30.png'
     elif on_value.level > 10:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-10.png'
     else:
         root_in_scope.find('img.battery-status').attr('src') = '/battery-level-low.png'
```

The above script sets different battery icons for different power ranges, so as to show the user the remaining power information of the current battery.

##### TBD2.4) Misc

Virtual DOM technology provides some benefits as follows:

1. Since the script program does not directly operate the real DOM tree, on the one hand, the complexity of the front-end development is simplified through the existing framework; Frequent operations on the DOM tree improve page rendering efficiency and user experience.
1. Through the virtual DOM technology, the modification of a certain data by the program can be directly reflected on the page content bound to the data, and the developer does not need to actively or directly call the relevant interface to operate the DOM tree. This technique provides so-called "reactive" programming, which greatly reduces the developer's workload.

Alternatively, we can use the `by` attribute of the `init` element to specify an external executor for comparing two values for equality.

- `connect`: This tag defines a connection to an external data source, such as packets from MQTT or a local data bus (such as the data bus dBus commonly used in Linux desktop systems).
- `disconnect`: This tag closes a previously established connection to an external data source.

- `connect` tag is used to connect to a specified external data source and bind a variable name.
- `send` tag is used to send a message on the specified persistent connection.
- `disconnect` tag is used to explicitly close a previously established connection to an external data source.

- `at`: In `connect` action element, it is used to define the external data source that the action depends on, and its attribute value is usually a URL, such as `tcp://foo.com:2345`, `unix:/ //var/run/hibus.sock`.
- `for`: In `connect` tag, it is used to define the protocol or purpose.
- `with`: Define the parameters when sending the request or message in `send` element.

`request` tag makes a synchronous or asynchronous request on an external data source.

When getting data from an external data source, we use `at` attribute to specify the URL, `with` attribute to specify the request parameters, and `via` attribute to specify the request method (such as `GET`, `POST`, `DELETE`, etc.) :

```hvml
     <request at="http://foo.bar.com/foo" with="$params" via="POST" as="foo" async>
         <observe on="$foo" for="result:success">
             ...
         </observe>
     </request>
```

The above usage is similar to `init`, but `request` can specify the processing method of the request result through the `to` attribute, such as saving the request result to the specified file:

```hvml
     <request at="http://foo.bar.com/foo" with="$params" via="POST" to="save:/tmp/foo.tmp" as="foo" async>
         <observe on="$foo" for="result:success">
             ...
         </observe>
     </request>
```

In this case, we can use the following result processing methods:

- `save:` Save to a local file. The execution result of this operation is the full file path after saving.
- `filter:` Create a subprocess and a pipe and uses the pipe as the standard input of the subprocess, then executes the specified program in the subprocess, and writes the request result to the pipe. The result of this operation is the standard output (sequence of bytes) of the child process.

When the current HVML program is rendered in a modal window, `terminated:success` event of the program can be observed and then processed. If the current HVML program is not rendered in the modal dialog box, the data will be provided as request data (corresponding to `$REQ` built-in global variable) to the target to return the corresponding HVML program. At this time, the HVML program will perform a reload Operation (similar to the browser's function of refreshing the page).

`exit` element does not produce any result data and therefore cannot contain child action elements.

Under normal circumstances, when `load` element loads an HVML program and renders it in a modal window, the execution result data is the value of `with` attribute of  `exit` element in the new HVML program; if it is rendered in a new normal window , the operation result data of `load` element is the string `ok` under normal circumstances; if it is rendered in another existing window, the HVML program running in this window will be terminated and a new HVML will be rendered in the current window program content.

`exit` tag is used to terminate the current HVML program and return the return value to the specified target HVML program.

`load` tag supports the following adverb attributes:

- `synchronously`: Load synchronously and default behavior. The `load` element will wait for the new HVML program to exit, equivalent to creating a modal window.
- `asynchronously`: Load asynchronously. `load` element does not wait for the new HVML program to exit.
- `concurrently`: Execute HVML programs in parallel. If the interpreter supports runners, the value of `as` attribute is used to identify a runner.

### Appendix 3) Contributor List

The order of this list is arranged from early to late according to the contribution time:

1. Tian Siyuan: Senior software engineer; some suggestions for document details.
1. Hax: Web front-end technology expert; some suggestions for document details.

### Appendix 4) Trademark Statement

The product, technology or term names mentioned in this article involve the following trademarks registered by Beijing Feynman Software Technology Co., Ltd. in China or other regions:

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
