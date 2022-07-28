# Learn HVML Programming in 30 Minutes

-- Vincent Wei

**Table of Contents**

[//]:# (START OF TOC)

- [Introduction](#introduction)
- [Fundamental](#fundamental)
- [Preparation](#preparation)
- [Target Document Types and Expressions](#target-document-types-and-expressions)
- [Control Flow](#control-flow)
   + [Alternative branching and preposition attributes](#alternative-branching-and-preposition-attributes)
   + [Multiple branching and adverb attributes](#multiple-branching-and-adverb-attributes)
   + [Looping and Context Variables](#looping-and-context-variables)
- [Data/Event Driven Programming](#dataevent-driven-programming)
- [Templates and Substitutions](#templates-and-substitutions)
- [Variables and Closures](#variables-and-closures)
- [Coroutines and Concurrency](#coroutines-and-concurrency)
- [Summary](#summary)

[//]:# (END OF TOC)

## Introduction

HVML is the acronym of `Hybrid Virtual Markup Language`.
It is a general-purpose and easy-to-learn programming language proposed and designed by [Vincent Wei],
   who is the author of the China-first open source project [MiniGUI].

Vincent Wei says that HVML is a programmable markup language with new structure, new principles, and new design patterns.
It is definitely unlike any programming language you are familiar with:

- It uses markups to define the program structure and the control flow; this greatly improves the readability of the program.
- It uses the extended JSON with dynamic capabilities to define the data; this makes it ideal as a glue to bond different system components.
- It introduces the data driven programming model; this allows developers to focus more on data generation and processing, rather than the control flow.
- It is dynamic; developers can not only fetch data, templates, HVML fragments from a remote data source, but also delete an exisiting variable.
- It provides a unique way to support coroutines, threads, closures, ..., which are those features you saw in modern programming languages.
- It is flexible; developers can use HVML to write simple scripting tools, or they can use it to develop complex GUI applications.
- It is fast; HVML uses a simple and effecient stack-based virtual machine, and it does not use any garbage collector.

In this tutorial, we will show you the most exciting features of HVML,
     especially those features that are different from common programming languages.
If you are familiar with a script language such as Python or JavaScript,
   you will find that you can master the basic principles and methods of HVML programming in a very short time, say, in 30 minutes.

Let's enjoy it.

## Fundamental

As said before, HVML is a programmable markup language.
You know that HTML uses markups to define a static document and the text contents in a document, while HVML uses markups to define a program structure and the data.
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
From the HVML interpreter's perspective, each element in an HVML program defines an operation to perform.
You know that a valid HTML document defines a DOM (Document Object Model) tree, and a web browser can render the DOM tree in a window.
Similarly, a valid HVML program also defines a DOM tree, and the interpreter executes the DOM tree.
In other words, a browser renders an HTML document, while an HVML interprerter executes an HVML program.

The interpreter executes the DOM tree from the root element, i.e., the `hvml` element, in depth-first order.
When executing the `hvml` element, because the `target` attribute has the value `html`, the interperter will generate an HTML document.
In terms of HVML, this HTML document is called `the target document`.
After executed the `hvml` element, the iterperter continues to execute the `body` element and the `p` element in sequence.
After the interpreter executed the `p` element, because there is no any element in the DOM tree, the interpreter will stop to execute the DOM tree.

The interpreter performs every element according to the tag name, the attributes, and the content.
The tag name defines the operation to perform, and the attributes and the contents defines the arguments when performing the operation.
For ease of understanding, you can think of an HVML element as a function and the attributes and the contents as the arguments passed to it when calling the function.

HVML introduces about 20 tags for different operations:

- `hvml`, `head`, and `body` are called `frame tags`; they are used to define the frame of an HVML program.
- `archetype`, `achedata`, `error`, and `except` are called `template tags`; they are used to define parameterized templates.
- `init`, `test`, `iterate`, `define`, `call`, `include`, `load`, `exit`, `return`, `update`, `back`, and other tags use verbs are called `verb tags`,
    they are used to define an action to manipulate a data, update the target document, or control the virtual machine.

Tags other than the above tags are called `foreign tags`.
For an element defined by a foreign tag, HVML assigns a default and uniform operation:
    evaluting the attribute values and the contents, then copying them to the target document.

You may have a question: what if a foreign tag name conflicts with an HVML tag name?
The answer is using a prefix for HVML tags.

In the head of an HVML program, there can be an optional `DOCTYPE` node to define the document type and the prefix to use for HVML tags:

```hvml
<!DOCTYPE hvml SYSTEM "v:">
```

In this way, any tag with the prefix `v:` will be treated as a HVML tags, and others without the prefix are the foreign tags.
For example:

```hvml
<!DOCTYPE hvml SYSTEM "v:">

<v:hvml target="html">
    <v:body>
        <p>Hello, world!</p>
    </v:body>
</v:hvml>
```

Fortunately, we don't need to use this prefix in most cases, because HVML's tag names are significantly different from ones defined by HTML.

For your first HVML program, the interpreter will generate an empty HTML document, and copy the contents of `p` elements to the `body` of the target HTML document.
As a result, the HVML program generates an HTML document, which is same as the HTML file given earlier.

Note that, the `body` tag is not a foreign tag, it is a frame tag of HVML. It is used to define an entry body of an HVML program.
In deed, you can define multiple `body` elements in an HVML program, and tell the interpreter to use a specific body as the entry.

HVML also uses `head` tag to define an operation group to execute for any `body` entry.
This can be used to initialize some global data for each `body` entry.

The great thing about HVML is that, you can use markups to define a program which may have a complex control flow.
You can also use flexible expressions to generate dynamic contents for your target document.

## Preparation

Before looking deeply the principles of HVML, let's build a practice environment first.
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

```
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


>> The executed result:
null
```

You saw that this program generated a HTML document, which is same as the one we talked earlier.

On a Unix-like operating system, you can execute your first HVML program directly from a command line.
To do this, add the following line as the first line of your first HVML program:

```hvml
#!/usr/local/bin/purc -b
```

And make the file to have executing permission, then try to run the program:

```bash
$ chmod +x hello-world.hvml
$ ./hello-world.hvml
```

You will get the same result as before.

## Target Document Types and Expressions

When you reach here, you may have a new question: Does an HVML program have to generate an HTML document?
The answer is NO.

In fact, HVML supports multiple document types:

- `void`: all foreign elements will be ignored.
- `html`: generating an HTML document.
- `xml`: generating an XML document (not supported by PurC so far).
- `plain`: only the text contents will be kept as plain text (not supported by PurC so far).

So if you change the value of `target` of the `hvml` element to `void`, the HVML program will generate a void document,
   that is, all foreign elements in the HVML programs will be ignored.

```hvml
<hvml target="void">
    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

If you save the revised version to `hello-world-void.hvml` and run it by using `purc`, you will get the following output:

```
$ purc -b hello-world-void.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-world-0.hvml`...

>> The document generated:


>> The executed result:
null
```

Moreover, if you run the HVML program without the flag `-b`, you will get nothing:

```
$ purc hello-world.hvml
$
```

The flag `-b` (or the corresponding long option `--verbose`) tells the interpreter to print verbose information when executing a program.
The HVML program generates an HTML document, but does not do anything to output information to your terminal.
Therefore, if you run `purc` without the `-b` flag, you will see nothing.

So, if you want to print some text to the terminal, how to program in HVML?

You can revise your first HVML program as follow:

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

```
$ purc hello-world.hvml
Hello, world!
```

Obviously, the newly added statement `$STREAM.stdout.writelines('Hello, world!')` outputs `Hello, world!` to your terminal.

Furthermore, if you execute the HVML program with the flag `-b`:

```
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


>> The executed result:
14
```

Comparing this output with the output of Version 0, you will find that the later shows an executed result `14` instead of `null`.

The statement like `$STREAM.stdout.writelines('Hello, world!')` is an EJSON expression in HVML.
We can use an EJSON expression to access a property of an object, or call a method of an object.
Every expression will have an evaluated result, and the result can be used to define the attribute values or contents of an element.
Note that, even if you set the type of the target document is `void`,
     the attribute values or the contents of a foreign element will still be evaluated during execution.

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
And because the `hvml` element is the root element, the executed result of the `hvml` element will become the result of the whole HVML program.
Therefore, `purc` gives the executed result of the HVML program: `14UL`.

We call the returned value of an expression as `the evaluated result`.

In HVML, you can use syntax like [JSON] to define a simple data like undefined, null, a boolean, a number, a string, or a container like an array or an object,
   and you can use the expressions when defining a string or a container.
We enhanced the syntax of JSON to support more data types, such as long integers, unsigned long integers, long double numbers, and so on.
Whether it is an ordinary JSON or an EJSON expression, we refer to them collectively as EJSON expressions.
Here are some examples:

- A single-quoted string: 'This is a literal text, $SYS.locale will not be evaluated.'
- A double-quoted string: "$SYS.locale will be evaluated in this text."
- A long integer (64-bit): 5L.
- An unsigned long integer (64-bit): -1UL (0xFFFFFFFFFFFFFFFF in C).
- A random number array: [ $SYS.random(1.0), $SYS.random(2.0), $SYS.random(3.0) ]
- An object: { locale: $SYS.locale, timezone: $SYS.timezone }

For example, you can use the following expression to define the executed result of the HVML program as an array:

```hvml
<!-- Version 2 -->
<hvml target="html">

    [ $STREAM.stdout.writelines('Hello, world!'), $STREAM.stdout.writelines($DATETIME.fmttime('%H:%M')) ]

    <body>
        <p>Hello, world!</p>
    </body>
</hvml>
```

The executed result of Version 2 would be an array: `[ 14UL, 6UL ]`.
A number with postfix `UL` means it is an unsigned long integer.

For another example, you can use the following expression to calculate the area of a circle:

```
$MATH.eval('PI * r * r', { r: 3 })
```

The method `eval` of `$MATH` evaluating a parameterized mathematical formula (`PI * r * r` in this sample),
    while `r` is given by an object `{ r: 3 }` as the second argument of `eval` method.
Therefore, The executed result of the expression will be about `28.26`.

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

As said before, you can use the evaluated result of one expression as the attribute value or the text content of an element.
Now, let's try to enhance the HVML program to generate different contents according to the current system locale.

### Alternative branching and preposition attributes

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
If the evaluated result of the expression is true, that is, the system locale starts with `zh`,
   this HVML program will clone the `h1` and `p` elements in `test` element to the target document, and ignore the `differ` element.
If the evaluation result is false, the elements in `differ` element will be cloned to the target document.

Like the `with` attribute in `test` element, HVML uses some prepositions as the attribute names of verb elments, such as `on`, `with`, `for`, `via`, `against`, and so on.
By using the verb tags and preposition attributes, you can easily undertand what does the operation the element define.
In Version 3, `test with $STR.starts_with($SYS.locale, 'zh')` means checking the evaluated result of `$STR.starts_with($SYS.locale, 'zh')` to see whether it is true or false.
Note that HVML allows to omit the equal sign (`=`) between the preposition attribute name and the expression as the attribute value.
This gives HVML code better readability.

As a result, if the system locale is `zh_CN` or `zh_TW` when you execute the HVML program, the target document generated by the program will look like:

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

But if the system locale is `en_US` or something else which does not start with `zh`, the target document generated by the program will look like:

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

### Multiple branching and adverb attributes

If you want to support more languages, you can use `match` elements as the children elements of the `test` element.
For example:

```hvml
<!-- Version 4 -->

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <!-- the language identifier like `zh` or `en` will
             be the executed result of the `test` element -->
        <test on $STR.substr($SYS.locale, 0, 2) >

            <!--
                this `match` element checks the evaluated result of the parent element
                is whether same as 'zh' (Chinese).
            -->
            <match for "AS 'zh'" exclusively>
                <h1>我的第一个 HVML 程序</h1>
                <p>世界，您好！</p>
            </match>

            <!--
                this `match` element checks the evaluated result of the parent element
                is whether same as 'en' (English).
            -->
            <match for "AS 'en'" exclusively>
                <h1>My First HVML Program</h1>
                <p>Hello, world!</p>
            </match>

            <!--
                this `match` element checks the evaluated result of the parent element
                is whether same as 'fr' (French).
            -->
            <match for "AS 'fr'" exclusively>
                <h1>Mon premier programme HVML</h1>
                <p>Bonjour le monde!</p>
            </match>

            <!-- Anyting else, treat it as Latin.  -->
            <match for "ANY">
                <h1>Primum mihi HVML Programma</h1>
                <p>Salve, mundi!</p>
            </match>
        </test>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

In Version 4, we use `on` attribute in the `test` element and use multiple `match` elements with different `for` attribute values.
When using `on` attribute with a verb element, the evulated result of the `on` attribute value will become the executed result of the verb element.
Here, the executed result of the `test` element will be a string having only two letters like `zh`, `en`, `fr`, and so on.

Obviously, you can easily see that the `test` element and its child `match` elements define a multiple branching control flow
like `if-else if-else if-else` or `switch-case` in other programming languages.

You may notice that we use a special attribute called `exclusively` in some `match` elements.
The attribute uses an adverb and does not define any value.
It is called adverb attribute, and always be used to decorate an action.
Here the attribute `exclusively` shows that the branch is exclusive, that is,
     if the executed result of the parent `test` element matches the condition given by the `match` element,
     other `match` elements will be passed by.

Other usual adverb attributes are shown as follow:

- `uniquely`: used to define a set in an `init` element.
- `temporarily`: use to define a temporary variable in `init` element.
- `asynchronously`: used to define an asynchronous operation or start a coroutine asynchronously.
- `concurrently`：in a `call` element, used to define a concurrent call.
- `nosetotail`: in an `iterate` element, used to reset the input data with the last evaluated result.
- `ascendingly` and `descendingly: in a `sort` element, used to define the sorting order.
- `silently`: evaluating the expressions in an element silently intead of generating exceptions.

### Looping and Context Variables

Now, you want to generate all `Hello, world!` paragraphs in various languages.
You can use an `iterate` element for this purpose.
Here is Version 5 of your first HVML program:

```hvml
<!-- Version 5 -->

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <init as "helloInVarLangs">
            [
                "世界，您好！",
                "Hello, world!",
                "Bonjour le monde!",
                "Salve, mundi!",
            ]
        </init>

        <iterate on $helloInVarLangs >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

We use two new verb elements in Version 5: `init` and `iterate`.
Based on the meaning of these two verbs, you can immediately guess what they do.
Run Version 5 with `purc`, the HVML program gives you the expected result:

```
$ purc -b hello-world-5.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hello-world-5.hvml`...
Start of `Hello, world!`
End of `Hello, world!`

>> The document generated:
<html lang="en">
  <head>
  </head>
  <body>
    <h1>
      我的第一个 HVML 程序
    </h1>
    <p>
      世界，您好！
    </p>
    <p>
      Hello, world!
    </p>
    <p>
      Bonjour le monde!
    </p>
    <p>
      Salve, mundi!
    </p>
  </body>
</html>


>> The executed result:
23
```

Distinctly, it is easy to understand the verb elements introduced in Version 5:

1. The `init` element initializes a variables called `helloInVarLangs` with an string array defined in the content of the element in JSON.
1. The `iterate` element iterates over the data specified by `on` attribute: the array initialized just now.

But what does `$?` mean?

You should remember, HVML uses `$` as the prefix when referring a variable.
Therefore, `$?` must be a variable.
In HVML, a variable named with a special symbol like `?` is called `a context variable`.
Here, `$?` referring to the executed result of the prepositive operation.
The parent element is `iterate`, it iterates over each member in the array, and sets one member of the array as the executed result for each iteration.
Therefore, this HVML program will generate four paragraphs for `Hello, world!` in different languages, as you see in the result.

Unlike other programming languages, HVML makes heavy use of context variables:

- Essentially, context variables are temporary and have a very short lifespan. This will help us avoid unnecessary static variables and save memory usage.
- The context variables can rescue programmers from naming difficulties.

Except for `?`, HVML also defines other context variables:

- `@`: The current position of the target document; usually defined by the `in` attribute.
- `^`: The content data evaluated in prepositive operation.
- `:`: If the executed result is a property of an object, this variable representing the property name.
- `=`: If the executed result is a property of an object, this variable representing the property value.
- `%`：When the prepositive operation is an iteration, this variable representing the index (a number) for the current iteration.
- `<`：When the prepositive operation is an iteration, this variable representing the input data for the current iteration.

## Data/Event Driven Programming

Indeed, the `init` element in Version 5 is redundant.
You can revised it as follow:

```hvml
<!-- Version 6 -->

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <iterate on [ "世界，您好！", "Hello, world!", "Bonjour le monde!", "Salve, mundi!", ] >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

Version 6 shows a very important coding philosophy of HVML: Use less or no variables.

In Version 5 and Version 6, we hard code the array in the `init` or `iterate`.
This usually does not correspond to the actual situation.
In practice, the data must be from a foreign source, e.g, a locale file or a remote URL.

Most programming languages do not provide methods to fetch data from a URL, but HVML does.
You can use `init` to fetch data from a file or a remote URL:

```hvml
<!-- Version 7 -->

<!--
    $SYS.locale returns the current system locale such as `en_US` or `zh_CN`
    $STR.substr returns a substring of the given string.
-->
<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines('Start of `Hello, world!`')

    <body>

        <h1>我的第一个 HVML 程序</h1>

        <init as "helloInVarLangs" from "file://{$SYS.cwd}/hello-world.json" />

        <iterate on $helloInVarLangs >
            <p>$?</p>
        </iterate>

    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

Before running Version 7, please prepare a file named `hello-world.json` in your current working directory:

```json
[ "世界，您好！", "Hello, world!", "Bonjour le monde!", "Salve, mundi!" ]
```

You will get the same result if you run Version 7.
By using `from` attribute in the `init` element, the HVML program can fetch data from the specified URL.
Here, it is a local file in the current working directory.

In contrast to other programming languages, HVML provides the ability to fetch data directly from a specific URL.
This provides developers with great convenience, and frees developers from complicated network protocol details.
More than that, the interpreter impelments the fetching operation as an asynchronous task.
This can help developers to develop programs with high concurrency capabilities by using HVML.

Version 6 and Version 7 also disclose another coding philosophy of HVML: data driven programming.
In an HVML program, you focus more on the sourcing and processing of the data and less on how to name and manage them.

For another example of data driven programming, let's move to the Version 8 of your first HVML program:

```hvml
<!-- Version 8 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines("Start of `Hello, world!`")

    <head>
        <update on "$TIMERS" to "unite">
            [
                { "id" : "foobar", "interval" : 500, "active" : "yes" },
            ]
        </update>
    </head>

    <body>

        <h1>我的第一个 HVML 程序</h1>
        <p>世界，您好！</p>

        <observe on $TIMERS for 'expired:foobar' >
            $STREAM.stdout.writelines('Timer foobar observed')

            <inherit>
                $STREAM.stdout.writelines($STR.join('Timer foobar expired: ', $DATETIME.fmttime('%H:%M:%S')))
            </inherit>
        </observe>
    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

If you run Version 8 with `purc`, you will get the following output:

```
$ purc hello-world-8.hvml
Start of `Hello, world!`
Timer foobar observed
End of `Hello, world!`
Timer foobar expired: 13:21:00
Timer foobar expired: 13:21:00
Timer foobar expired: 13:21:01
Timer foobar expired: 13:21:01
Timer foobar expired: 13:21:02
Timer foobar expired: 13:21:02
Timer foobar expired: 13:21:03
Timer foobar expired: 13:21:03
...
```

If you did not interrupt the execution of the HVML program by using `Ctrl+C`, the program will continually print the prompts with the current time.

Obviously, this version activates a timer with the interval about 0.5s (500ms).

New let's look deeper into the code.
In Version 8, the code uses two new verb elements.
According to the tag names and the attribute names, you migth have the following conjectures:

1. The `update` element seems to change a predefined variable called `TIMERS` with the data defined as its content.
1. The `observe` element seems to create a listener to observe an event named `expired:foobar`.

If you look deeper into the code, it's not diffcult to find:

1. The `update` element will _unite_ the content, an array containing only one object, with the existing data of `TIMERS`.
1. The object in the array seems to define an active timer, with the identifier `foobar`, and the interval `500`.
1. The event which was listening by the `observe` element contains the identifier of the timer (`foobar`).

However, you did not write any code to create and activate the timer called `foobar`.

Indeed, in HVML, you change the data representing by `TIMERS` to create, activate, deactivate, or destroy a timer.
You do not need to call methods to manage the timers.
For example, if you want to remove a timer, just subtract the member in the array representing by `TIMERS`:

```hvml
    <update on $TIMERS to "subtract" with { id : "foobar" } />
```

This reflects the idea of data-driven programming once more:
Changing data directly instead of calling methods to manage them.

This version also illustrates the event-driven programming in HVML:
We observe a data for a specific event, then handle the event by a group of predefined operations which locates in the `observe` element.

In HVML, the execution of an HVML program can be divided into two stages:

1. The first stage called `first round of run`. In this stage, the program executes every elements in depth-first order.
For any `observe` element, the interperter creates a listener for the specific events, but defers the execution of the elements in the `observe` element.
If there is no event to listen, the program will exit after the first round of run.
1. The second stage called `event-driven stage`. After the execution of the first stage, once the event listened arrived, the interperter continues to execute the elements defined by the corresponding `observe` element. The HVML program keeps in this stage until it encounters an exception or an `exit` element.

Therefore, Version 8 will continue to print the prompts with the current time if you did not interrupt the execution.

If you want the program exit gracefully, you can modify it as follow:

```hvml
<!-- Version 9 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">

    $STREAM.stdout.writelines("Start of `Hello, world!`")

    <head>
        <update on "$TIMERS" to "unite">
            [
                { "id" : "foobar", "interval" : 500, "active" : "yes" },
            ]
        </update>
    </head>

    <body>

        <h1>我的第一个 HVML 程序</h1>
        <p>世界，您好！</p>

        <init as "startTime" with $SYS.time />

        <observe on $TIMERS for 'expired:foobar' >
            $STREAM.stdout.writelines('Timer foobar observed')

            <inherit>
                $STREAM.stdout.writelines($STR.join('Timer foobar expired: ', $DATETIME.fmttime('%H:%M:%S')))
            </inherit>

            <test with $L.gt($EJSON.arith('-', $SYS.time, $startTime), 10) >
                <exit with "Ok" />
            </test>

        </observe>
    </body>

    $STREAM.stdout.writelines('End of `Hello, world!`')

</hvml>
```

In this version, the program compares the current time with the start time.
When the elapsed time (`$EJSON.arith('-', $SYS.time, $startTime)`) exceeds 10 seconds (`$L.gt(..., 10)`), the program exits with a result "Ok".

## Templates and Substitutions

Now, let's consider a slightly more complicated example, which generates a HTML document listing your friends.
The friends are given by an object array.
Each object in the array gives some properties of one friend, including the identifier, the avatar URL, the nickname, the region, and the age.

You may prepare the friends information by using an `init` element:

```hvml
    <init as "myFriends">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 }
        ]
    </init>
```

You want to show a different greeting according to your firend's region.
You can write the code generating the HTML fragment showing your friend list in this way:

```hvml
    <ul>
        <iterate on "$myFriends">
            <init as oneFriend with $? temp />

            <test on $?.region >

                <match for 'LIKE "zh*"' exclusively>
                    <li class="user-item" id="user-$oneFriend.id"
                            data-value="$oneFriend.id" data-region="$oneFriend.region">
                        <img class="avatar" src="$oneFriend.avatar" />
                        <span>您好，$oneFriend.name</span>
                    </li>
                </match>

                <match for 'ANY'>
                    <li class="user-item" id="user-$oneFriend.id"
                            data-value="$oneFriend.id" data-region="$oneFriend.region">
                        <img class="avatar" src="$oneFriend.avatar" />
                        <span>Hello, $oneFriend.name</span>
                    </li>
                </match>
            </test>

        </iterate>
    </ul>
```

Apparently, the code is awkward, especially when your friends come from all over the world.
Because you have to copy and paste multiple times for different languages.

To deal with this situation, HVML provides an effcient way for you:
Use templates.

Version 10 gives the complete HVML program using templates:

```hvml
<!-- Version 10 -->

<hvml target="html" lang="$STR.substr($SYS.locale, 0, 2)">
  <body>

    <init as "myFriends">
        [
            { "id": 1, "avatar": "/img/avatars/1.png", "name": "Tom",
                "region": "en_US", "age": 2 },
            { "id": 2, "avatar": "/img/avatars/2.png", "name": "呼噜猫",
                "region": "zh_CN", "age": 3 }
        ]
    </init>

    <init as "greetings">
        { "zh": "您好，", "en": "Hello, " }
    </init>

    <archetype name="friendItem">
        <li class="friend-item" id="friend-$?.id"
                data-value="$?.id" data-region="$?.region">
            <img class="avatar" src="$?.avatar" />
            <span>$?.greeting$?.name</span>
        </li>
    </archetype>

    <ul class="friend-list">
        <iterate on "$myFriends">
            <init as oneFriend with $? temp />
            <update on $oneFriend to "merge" with { greeting: $greetings[$STR.substr($oneFriend.region, 0, 2)] } />

            <choose on $oneFriend>
                <update on $@ to "append" with $friendItem />
            </choose>
        </iterate>
    </ul>

  </body>
</hvml>
```

If you run Version 10 with `purc`, you will get the following result:

```
$ purc -b hvml/hello-world-a.hvml
purc 0.8.0
Copyright (C) 2022 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hvml/hello-world-a.hvml`...

>> The document generated:
<html lang="en">
  <head>
  </head>
  <body>
    <ul class="friend-list">
      <li class="friend-item" id="friend-1" data-value="1" data-region="en_US">
        <img class="avatar" src="/img/avatars/1.png">
        <span>
          Hello, Tom
        </span>
      </li>

      <li class="friend-item" id="friend-2" data-value="2" data-region="zh_CN">
        <img class="avatar" src="/img/avatars/2.png">
        <span>
          您好，呼噜猫
        </span>
      </li>
    </ul>
  </body>
</html>

>> The executed result:
null
```

This version shows the usage of templates.
The `archetype` element defines a template with some EJSON expression embedded in it.
The interpreter will substitue them with the evaluated results by referring to the executed result of the prepositive operation when using the template.
Here, the executed result of the prepositive operation is given by the `on` attribute of the `choose` element.
While the data represented by the temporory varaible `oneFriend` is initialized by an `init` element with the executed result of one iteration,
      and it is merged a new property called `greeting` with the subsequent `update` element.
The value of the `greeting` property in turn comes from the variable `greetings` initialized by the second `init` element.

Essentially, an `archetype` element defines a variable with the contents in the element.
The contents defined by the element will be substituded and always be a string as the result.
The string then can be used by `update` to insert to the target document.

Similarly, HVML also provides `archedate` tag to define data templates:
When an `archedata` template was substituded, the result will be any type of data instead of a string.
And you can use the result data to insert to a container or replace a member of the container by using an `update` element.

## Variables and Closures

## Coroutines and Concurrency

## Summary

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


>> The executed result:
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

