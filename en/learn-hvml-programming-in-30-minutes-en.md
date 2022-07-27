# Learn HVML Programming in 30 Minutes

-- Vincent Wei

**Table of Contents**

[//]:# (START OF TOC)

- [Introduction](#introduction)
- [Fundamental](#fundamental)
- [Preparation](#preparation)
- [Expressions](#expressions)
- [Control Flow](#control-flow)
- [Data Driven Programming](#data-driven-programming)
- [Templates and Substitution](#templates-and-substitution)
- [Stack-based Virtual Machine](#stack-based-virtual-machine)
- [Event Driven Programming](#event-driven-programming)
- [Coroutines and Concurrency](#coroutines-and-concurrency)

[//]:# (END OF TOC)

## Introduction

HVML is the acronym of `Hybrid Virtual Markup Language`.
It is a general-purpose and easy-to-learn programming language proposed by [Vincent Wei], who is the author of the China-first open source project [MiniGUI].

Vincent Wei says that HVML is a programmable markup language with new principles, new structure, and new design patterns.
It is definitely unlike any programming language you are familiar with:

- It uses markups to define the program structure and the control flow.
- It uses the extended JSON with dynamic capabilities to define the data; this makes it ideal as a glue to bond different system components.
- It introduces the data driven programming model; this allows developers to focus more on data generation and processing, rather than program logic.
- It is dynamic; developers can not only fetch data, templates, HVML fragment from a remote data source, but also delete an exisiting variable.
- It supports coroutines, threads, closures, ..., which are those features you saw in popular modern programming languages.
- It is flexible; developers can use HVML to write simple scripting tools, or they can use it to develop complex GUI applications.
- It is fast; HVML uses a simple and effecient stack-based virtual machine, and it does not use any garbage collector.

This tutorial will show you the most exciting features of HVML,
     especially those features that are different from common programming languages.
If you are familiar with a script language such as Python or JavaScript,
   you will find that you can master the basic principles and methods of HVML programming in a very short time, say, in 30 minutes.

Let's enjoy it.

## Fundamental

As said before, HVML is a programmable markup language.
You know that HTML uses markups to define a static document and text in the document, while HVML uses markups to define a program structure and the data.
In other words, HTML is static, while HVML is programmable and dynamic.

For example, the following HTML file defines a document with a paragraph which contains `Hello, world!`:

```html
<html>
    <body>
        <p>Hello, world!</p>
    </body>
</html>
```

If you change all occurrences of `html` to `hvml` in the above HTML file,
    and add a new attribute `target="html"` to the root element, you will get your first HVML program:

```hvml
<hvml target="html">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

Like a Python, PHP, or JavaScript script, we need an interperter to run this HVML program.
From the interpreter's perspective, each element in an HVML program defines an operation to perform.
You know that a valid HTML document defines a DOM (Document Object Model) tree, and a web browser renders the DOM tree in a window.
Similarly, a valid HVML program also defines a DOM tree, and the interpreter executes the DOM tree.
In other words, a browser renders an HTML document, while an HVML interprerter executes an HVML program.

The interpreter executes the DOM tree from the root element, i.e., the `hvml` element, in depth-first order.
When executing the `hvml` element, because the `target` attribute has the value `html`, the interperter will generate an HTML document.
In terms of HVML, this HTML document is called `the target document`.
After executed the `hvml` element, the iterperter continues to execute the `body` element and the `p` element in sequence.
When the interpreter executed the `p` element, because there is no any element in the DOM tree, the interpreter will stop to execute the DOM tree.

The interpreter performs every element according to the tag name, the attributes, and the content.
The tag name defines the operation to perform, and the attributes and the contents defines the arguments when performing the operation.
For ease of understanding, you can think of an HVML element as a function and the attributes and the contents as the arguments when calling the function.

HVML introduces about 20 tags for different operations:

- `hvml`, `head`, and `body` are called `frame tags`; they are used to define the frame of an HVML program.
- `archetype`, `achedata`, `error`, and `except` are called `template tags`; they are used to define parameterized templates.
- `init`, `test`, `iterate`, `define`, `call`, `include`, `load`, `exit`, `return`, `update`, `back`, and other tags use verbs are called `verb tags`, they are used to define an action to operate a data, the target document, or the virtual machine.

Tags other than the above are called `foreign tags`.
For an element defined by a foreign tag, HVML assigns a default and uniform operation:
    evaluting the attribute values and the contents, then copying them to the target document.

For your first HVML program, the interpreter will generate an empty HTML document, and copy the contents of `body` and `p` elements to the target HTML document.
As a result, the HVML program generates an HTML document, which is same as the HTML file given earlier.

The great thing about HVML is that, you can use markups to define a program which may have a complex control flow.
You can also use flexible expressions to generate dynamic contents for your target document.

## Preparation

Before looking deeply the principles of HVML, let's build a developing environment for HVML first.
If you have built the environment, you can skip this section.

The HVML community has released an open source HVML interperter called `PurC`.
Please refer to the public repository of `PurC` for the detailed instructions to build and install it:

<https://github.com/HVML/PurC>

Assuming that you have installed PurC to your system, you can save the contents of your first HVML program to a file named `hello-world.hvml`:

```hvml
<hvml target="html">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

and run the HVML program by using the following command:

```bash
$ purc -b hello-world.hvml
```

The command line above will give you the following text:

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


>> The executing result:
null
```

You saw that this program generated a HTML document, which is same as the one we talked earlier.

## Expressions

However, if you run the HVML program without the flag `-b`, you will get nothing:

```bash
$ purc hello-world.hvml
$
```

The flag `-b` (or the corresponding long option `--verbose`) tells the interpreter to print verbose information when executing a program.
The HVML program generates an HTML document, but does not do anything to output information to your terminal.
Therefore, if you run `purc` without the `-b` flag, you will see nothing.

So, if you want to print some text to the terminal, how to program in HVML?

We can revise the first HVML program as follow:

```hvml
<!-- Version 1 -->
<hvml target="html">

    $STREAM.stdout.writelines('Hello, world!')

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

We call the initial version of the first HVML program as Version 0, and this revised version as Version 1.
When you use `purc` to run Version 1, you will get the following output:

```bash
$ purc hello-world.hvml
Hello, world!
```

Obviously, the newly added statement `$STREAM.stdout.writelines('Hello, world!')` outputs `Hello, world!` to your terminal.

Furthermore, if you execute the HVML program with the flag `-b`:

```bash
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


>> The executing result:
14
```

Comparing this output with the output of Version 0, you will find that the later shows an executing result `14` instead of `null`.

The statement like `$STREAM.stdout.writelines('Hello, world!')` is an EJSON expression in HVML.
We can use an EJSON expression to access a property of an object, or call a method of an object.
Every expression will have an evaluation result, and the result can be used to define the attribute values or contents of an element.

Let's take a closer look at the components in the expression.

`$STREAM` refers to an object named `STREAM`.
That is, `STREAM` is a variable, HVML uses `$` as the prefix when referring a variable.
Because we can embed an EJSON expresion in a string, HVML uses `$` to distinguish an EJSON expression with other literal text in a string.
As a convention, one variable like `STREAM` which are uppercase is a predefined variable.
You can use the predefined variables to access the system functions or perform common tasks.
Currently, HVML defines the following predefined variables:

- `SYS`: You can use `SYS` to get or set information about your system.
For example, the current locale, time, working directory, and so on.
- `STR`: You can use `STR` to manipulate strings.
For example, concatenate multiple strings or extract a substring, and so on.
- `STREAM`: You can use `STREAM` to open a stream and read/write data from/to the stream.
- `MATH`: As the name suggests, you can use `MATH` to perform the mathematical calculation based on floating point numbers.
- `FS` and `FILE`: You can use `FS` and `FILE` to perform operations on file systems and files.
- `EJSON`: You can use `EJSON` to convert among various data types.
- `L`: You can use `L` to perform the logical operations based on one or more data.
- `DATETIME`: You can use `DATETIME` to perform operations based on date and time.
- `URL`: You can use `URL` to perform operations based on URL and queries.

Per the expression `$STREAM.stdout.writelines('Hello, world!')`, it calls the method `writelines` on `stdout` object of the predefined variable `STREAM`.
The method `writelines` prints the `Hello, world!` on your terminal, and returns the bytes wrotten to the stream (`stdout`) totally.
Here it should be 14 - the length of the string `Hello, world!` plus the newline (`\n`) character wrotten to the terminal.

Because the expression appeared as the content of the `hvml` element, the result of this expression will be recorded as the result of executing the `hvml` element.
And because the `hvml` element is the root element, the result of executing the `hvml` element will become the result of the whole HVML program.
Therefore, `purc` gives the executing result of the HVML program: `14UL`.

We call the returned value of an expression as `evaluating result`.

In HVML, you can use syntax like [JSON] to define a simple data like undefined, null, a boolean, a number, a string, or a container like an array or an object,
   and you can use the expressions when defining a string or a container.
We enhanced the syntax of JSON to support more data type, such as long integers, unsigned long integers, long double numbers, and so on.
Therefore, We refer to them collectively as EJSON expressions.
Here are some examples:

- A single-quoted string: 'This is a literal text, $SYS.locale will not be evaluated.'
- A double-quoted string: "$SYS.locale will be evaluated in this text."
- A long integer (64-bit): 5L.
- An unsigned long integer (64-bit): -1UL (0xFFFFFFFFFFFFFFFF in C).
- A random number array: [ $SYS.random(1.0), $SYS.random(2.0), $SYS.random(3.0) ]
- An object: { locale: $SYS.locale, timezone: $SYS.timezone }

For example, you can use the following expression to define the executing result of the HVML program as an array:

```hvml
<!-- Version 2 -->
<hvml target="html">

    [ $STREAM.stdout.writelines('Hello, world!'), $STREAM.stdout.writelines($DATETIME.fmttime('%H:%M')) ]

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

The executing result of Version 2 would be an array: `[ 14UL, 6UL ]`. A number with postfix `UL` means it is an unsigned long integer.

For another example, you can use the following expression to calculate the area of a circle:

```
$MATH.eval('PI * r * r', { r: 3 })
```

The method `eval` of `$MATH` evaluating a parameterized mathematical formula (`PI * r * r` in this sample),
    while `r` is given by an object `{ r: 3 }` as the second argument of `eval` method.
Therefore, The executing result of the expression will be about `28.26`.

Moreover, HVML defines the compound EJSON expressions to have a simple logical control.
A compound EJSON expression consists of multiple EJSON expressions.
It is surrounded by `{{` and `}}`, and separated by `;`, `&&`, or `||`.
Just like you execute multiple commands in one shell command line,
     you can use a compound EJSON expression to implement a simple `if-then-else` logical control.

For example, the following compound expression tries to change the current working directory to `/root`.
If it succeeded, it will call `$FS.list_ptr` to get the directory entry list (a string array) in `/root`.
If it failed, it returns a failure prompt.
Regardless of success or failure, the expression calls `$STREAM.stdout.writelines` to print the entry list or the failure prompt ultimately.

```hvml
{{
    $STREAM.stdout.writelines({{
                $SYS.cwd(! '/root') && $FS.list_prt ||
                    'Cannot change directory to "/root"'
            }})
}}
```

## Control Flow

As said before, you can use the evaluating result of one expression as the attribute value or the text content of an element.
Now, let's try to enhance the HVML program to generate different contents according to the current system locale.
Please see Version 3 of the HVML program:

```hvml
<!-- Version 3 -->

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <!-- the `test` element checks whether the system locale starts with `zh` -->
        <test with = $STR.starts_with($SYS.locale, 'zh') >

            <h1>我的第一个 HVML 程序</h1>
            <p>世界，您好！</p>

            <!-- If the system locale does not start with `zh` -->
            <differ>
                <h1>My First HVML Program</h1>
                <p>Hello, world!</p>
            </differ>
        </test>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

You can easily find that the code in Version 3 introduces some intersting stuff:

1. Expression to define the value of the `lang` attribute: `$STR.substr($SYS.locale, 0, 2)`.
1. Elements with tag names using verbs, such as `test` and `differ`.
1. A special attribute having name `with` in `test` element, and the value is defined by an expression `$STR.starts_with($SYS.locale, 'zh')`.

Except for the above stuff, the code looks still like HTML:

1. The code uses `<` to define a open tag and `</` to define a close tag.
1. It uses the same synatx as HTML to define the attributes such as `target="html"`.
1. It uses `<!--` and `-->` to define comments, and so on.

The expression `$STR.substr($SYS.locale, 0, 2)` makes a substring of the system locale (a string like `zh_CN` or `en_US`),
    and uses the result as the value of `lang` attribute.

The elements `test` and `differ` act like the conditionl control statements such as `if` and `else` in a traditional programming language, such as C or JavaScript.
However, HVML does not use statements to write a program.
Instead, we use elements and expressions to write program.
Generally, an element performs a specific operation with the attributes and select a child element to continue.
When there is no child element, it return back to the parent element, until the root (`hvml`) element.

For example, in Version 3, the `test` element uses the expression defined by `with` attribute, i.e., `$STR.starts_with($SYS.locale, 'zh')`, as the condition.
If the evaluating result of the expression is true, that is, the system locale starts with `zh`,
   this HVML program will clone the `h1` and `p` elements in `test` element to the target document, and ignore the `differ` element.
If the evaluation result is false, the elements in `differ` element will be cloned to the target document.

Therefore, if the system locale is `zh_CN` or `zh_TW` when you execute the HVML program, the ultimate document generated by the program will look like:

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

But if the system locale is `en_US` or something else which does not start with `zh`, the ultimate document generated by the program will look like:

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

## Data Driven Programming

## Templates and Substitution

## Stack-based Virtual Machine

## Event Driven Programming

## Coroutines and Concurrency

Although the code is not like any program in C, JavaScript, or other common
programming languages, if you are told that the original design goal of HVML is
to allow developers can easily generate and operate HTML documents without
a web server using JavaScript in a web browser, you can easily guess
what's the code do:

1) The attribute `target="html"` in `hvml` element defines the target document
type of this HVML program: HTML. That is, this HVML program will genenrate an HTML
document.

2) The elements defined by HTML tags, such as `body`, `h1`, and `p` will be cloned
to the target document according to the execute path of the HVML program.

We can revise the first HVML program as follow:

```hvml
<!-- Version 1 -->
<hvml target="html">

    $STREAM.stdout.writelines('Hello, world!')

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

Please save the following contents in a file named `hello-world.hvml` as your first HVML program in your working directory:

```hvml
<!DOCTYPE hvml>
<hvml target="void">

    $STREAM.stdout.writelines('Hello, world!')

</hvml>
```

To run this HVML program, you can use `purc` in the following way:

```bash
```

You will see that your first HVML program prints `Hello, world!` on your terminal and quit:

```
Hello, world!
```

You can also run this HVML program directly as a script if you prepend the following line as the first line in the HVML program:

```
#!/usr/local/bin/purc
```

After this, run the following command to change the mode of the file to have the execute permission:

```bash
$ chmod +x hello.hvml
```

then run `hello.hvml` directly from the command line:

```bash
$ ./hello.hvml
```

Now, we hope that our HVML program can generate an HTML file instead of printing to the terminal. For this purpose, we enhance `hello-10.hvml` once more:

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <title>Hello, world!</title>
    <head>

    <body>
        <ul>
            <iterate on 0 onlyif $L.lt($0<, 10) with $EJSON.arith('+', $0<, 1) >
                <li>$?) Hello, world! --from COROUTINE-$CRTN.cid</li>
            </iterate>
        </ul>
    </body>
</hvml>
```

and save the contents in `hello-html.hvml` file. Note that there are two key
differences:

1. The value of `target` attribute of `hvml` element changed to `html`.
1. We used HTML tags such as `head`, `body`, `ul`, and `li` directly in
   the HVML program.

If you run `hello-html.hvml` program by using `purc` without any option, `purc`
will use the renderer called `HEADLESS`. This renderer will record the messages
sent by PurC to the renderer to a local file. Because this revised HVML program
did not use `$STREM.stdout` any more, you will see nothing on your terminal.
But you can use the option `--verbose` (or the short option `-b`) to show the
HTML contents generated by the HVML program in your terminal:

```bash
    $ purc -b hello-html.hvml
```

The command will give you the following output:

```
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-html.hvml`...

>> The document generated:
<html>
  <head>
    <title>
      Hello, world!
    </title>
  </head>
  <body>
    <ul>
      <li>
        0) Hello, world! --from COROUTINE-3
      </li>
      <li>
        1) Hello, world! --from COROUTINE-3
      </li>
      <li>
        2) Hello, world! --from COROUTINE-3
      </li>
      <li>
        3) Hello, world! --from COROUTINE-3
      </li>
      <li>
        4) Hello, world! --from COROUTINE-3
      </li>
      <li>
        5) Hello, world! --from COROUTINE-3
      </li>
      <li>
        6) Hello, world! --from COROUTINE-3
      </li>
      <li>
        7) Hello, world! --from COROUTINE-3
      </li>
      <li>
        8) Hello, world! --from COROUTINE-3
      </li>
      <li>
        9) Hello, world! --from COROUTINE-3
      </li>
    </ul>
  </body>
</html>


>> The executing result:
null
```

However, we need to enhace the HVML program once more, in order that the program
will not exit immediately after generated the HTML contents. Otherwise,
the window created by xGUI Pro for this HVML program will disappeared
after `purc` exited.

We enhance `hello-html.hvml` to install a timer and update the document and
save it as `hello-html-timer.hvml`:

```hvml
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <title>My First HVML Program</title>

        <update on="$TIMERS" to="unite">
            [
                { "id" : "clock", "interval" : 500, "active" : "yes" },
            ]
        </update>
    </head>

    <body>
        <h1>My First HVML Program</h1>
        <p>Current Time: <span id="clock">$DATETIME.time_prt()</span></p>

        <ul>
            <iterate on 0 onlyif $L.lt($0<, 10) with $EJSON.arith('+', $0<, 1L) nosetotail >
                <li>$<) Hello, world! --from COROUTINE-$CRTN.cid</li>
            </iterate>
        </ul>

        <observe on $TIMERS for "expired:clock">
            <update on "#clock" at "textContent" to "displace" with "$DATETIME.time_prt()" />
        </observe>

        <observe on $CRTN for "rdrState:closed">
            <exit with "closed" />
        </observe>

    </body>
</hvml>
```

The original design goal of HVML is to allow developers who are familiar with
C/C++, Python, or other programming languages to easily develop GUI applications
by using Web front-end technologies (such as HTML/SVG, DOM and CSS), instead of
using JavaScript programming language in a web browser or Node.js.

We achieved this design goal and also designed HVML as a new-style and
general-purpose programming language. Now, we can not only use HVML as
a programming language to rapidly develop GUI applications based on Web
front-end technologies in the C/C++ runtime environment, but also use HVML
as a general script language.

For example, you can re-write the above HVML program to print some lines
on your terminal instead of generating an HTML docuement:

```hvml
<!DOCTYPE hvml>

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="void" lang="$STR.substr($SYS.locale, 0, 2)">

    <body>

        <!-- the `test` element checks whether the system locale starts with `zh` -->
        <test with = $STR.starts_with($SYS.locale, 'zh') >
            {{
                 $STEAM.stdout.writelines('我的第一个 HVML 程序');
                 $STEAM.stdout.writelines('世界，您好！');
            }}

            <!-- If the system locale does not start with `zh` -->
            <differ>
                {{
                     $STEAM.stdout.writelines('My First HVML Program');
                     $STEAM.stdout.writelines('Hello, world!');
                }}
            </differ>
        </test>

    </body>

</hvml>
```

When you execute the revised HVML program, it will print the lines
on your terminal instead of generating an HTML document:

```
我的第一个 HVML 程序
世界，您好！
```

or,

```
My First HVML Program
Hello, world!
```

Obviously, HVML differs from any existing programming language you know.

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

[JSON]: https://json.org
[React.js]: https://reactjs.org
[Vue.js]: https://vuejs.org

[HVML Specifiction V1.0]: https://github.com/HVML/hvml-docs/blob/master/zh/hvml-spec-v1.0-zh.md
[HVML Predefined Variables V1.0]: https://github.com/HVML/hvml-docs/blob/master/zh/hvml-spec-predefined-variables-v1.0-zh.md

