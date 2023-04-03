# Embedding Python in HVML program

- Author: Vincent Wei
- Date: March 2023

**Table of contents**

[//]:# (START OF TOC)

- [Preparation](#preparation)
- [Quickly understand HVML](#quickly-understand-hvml)
- [Loadable Dynamic Object PY](#loadable-dynamic-object-py)
- [Sample Program: Finding Prime Numbers](#sample-program-finding-prime-numbers)
- [Sample Program: 3D Random Walk](#sample-program-3d-random-walk)
- [Conclusion](#conclusion)

[//]:# (END OF TOC)


In March 2023, the HVML community released version 0.9.8 of the HVML open source interpreter PurC, which added support for Python.

With this new feature, we can easily call Python modules in HVML programs, and develop our own HVML applications by using rich software packages or modules in the Python ecosystem. At the same time, the cross-platform, unified GUI/CLI application development framework and the ability to run across terminals provided by HVML will bridge the decades-old gap between the Python ecosystem and the Web ecosystem, thereby greatly improving the performance of Python applications power and the ability to interact with users.

This article first explains the basic method of embedding Python in HVML through a simple program that finds prime numbers, and then uses NumPy and Matplotlib to implement 3D random walk animation HVML program, and introduces the typical application scenarios of this enhancement: Scientific Computing Visualization.

## Preparation

As of now, both the HVML interpreter PurC and the graphics renderer xGUI Pro support running on Linux or macOS desktops. In order to fully execute the HVML program embedded with Python code mentioned in this article, it is necessary to install the Python 3.9+ (Linux) or Python 3.11+ (macOS) runtime environment, development environment and related modules in advance.

For example, in Ubuntu Linux 20.04 or above systems, first install common development tools (such as git, make, etc.), and then use the following commands:

```console
$ sudo apt install python3 python3-pip python3-dev
$ sudo apt install libwebkit2gtk-4.0-dev
$ pip3 install numpy matplotlib
```

On macOS, first make sure you have xCode or xCode Command Line Tools installed, then install macPorts. For installation of macPorts, please visit macPorts official website: <https://www.macports.org>.

After that, in the terminal program of macOS, install the Python runtime environment, development-time environment and related modules through the `port` command of macPorts:

```console
$ sudo port install python311 py-pip
$ sudo port install webkit2-gtk-devel
$ sudo port install xorg-server
$ sudo pip3 install numpy matplotlib
```

Currently, developers need to compile the HVML interpreter PurC and graphics renderer xGUI Pro by themselves. After doing the above preparations, please visit the following open source code repository to obtain the source code and build the two software according to the description in README files:

- PurC: <https://github.com/HVML/PurC>
- xGUI Pro: <https://github.com/HVML/xGUI-Pro>

Note that in order to build PurC and xGUI Pro, you may also need to install the following development tools or libraries:

1. The cross-platform build system generator: CMake 3.15 or later
1. A C11 and CXX17 compliant compiler: GCC 8+ or Clang 6+
1. Zlib 1.2.0 or later
1. Glib 2.44.0 or later
1. BISON 3.0 or later
1. FLEX 2.6.4 or later
1. Ncurses 5.0 or later (optional; needed by Foil renderer in `purc`)

Please use the package management tool provided by the Linux distribution or macPorts to install the above software, and make sure to use the correct version.

Here are some supplementary instructions for macOS systems:

- The HVML interpreter requires Python 3.9+ to support interoperability with Python code. Installing Python 3.11 through macPorts on macOS is to avoid conflicts with Python 3.9 included in xCode Command Line Tools.
- On macOS, if you don't use the graphics renderer xGUI Pro, but only use the built-in character renderer Foil in PurC, you can also use the Homebrew system to build PurC without building xGUI Pro. But to build xGUI Pro, you must use macPorts. This is mainly because Homebrew does not provide a WebKit2Gtk3 package.
- When using macPorts to build PurC and xGUI Pro, be sure to specify the installation prefix of PurC and xGUI Pro as `/opt/local` through the `-DCMAKE_INSTALL_PREFIX=/opt/local` option of CMake; if you use the default `/usr/ local` installation prefix, there will be a situation where the header file cannot be found.
- When using xGUI Pro on macOS, you need to use macPorts to install the `xorg-server` package, and you need to log in again in order that the installation takes effect.
- After compiling xGUI Pro on macOS, you need to manually create a symbolic link with the suffix `.so` in the directory where the WebKit extension library is installed (eg `/opt/local/xguipro/lib/webext`):

```console
$ cd /opt/local/xguipro/lib/webext
$ sudo ln -s libWebExtensionHVML.so libWebExtensionHVML.dylib
```

The reason why you need to manually create a symbolic link on the macOS system is mainly because when WebKit searches for its extension libraries, it will only search and load the shared library file with the suffix `.so`, and on the macOS system, the suffix of a shared library is usually `.dylib`.

## Quickly understand HVML

Readers who are already familiar with the features of HVML can skip this section.

The main difference between HVML and other programming languages is that HVML uses an HTML-like markup language to define a program, hence having the name "Programmable Markup Language".

As a simple example, let's run this HVML program with the HVML interpreter PurC:

```hvml
<hvml target="html">

     $STREAM.stdout.writelines('Hello, world!')

     <body>
         <h1 style="color:red;text-align:center">Hello, World!</h1>
         <p>This paragraph is generated by HVML, and it is in HTML.</p>
     </body>
</hvml>
```

Suppose that we save the above program as `hello-world.hvml` file. If we run the command line program `purc` of the PurC interpreter in the system terminal without any parameters, we will get the following results:

```console
$ purc hello-world.hvml
Hello, world!
```

We see that there is only one more output on the terminal: `Hello, world!`. As you can probably imagine, this output is produced by the statement `$STREAM.stdout.writelines('Hello, world!')`, just like we call the `print()` function in a Python program.

And if we use the `-c thread` option when calling `purc`, we will get the following result:

```console
$ purc -c thread hello-world.hvml
Hello, world!

                                 Hello, World!

     This paragraph is generated by HVML, and it is in HTML.

```

On the author's Linux system, the effect is shown in the following figure:

![Hello, world!](/screenshots/hello-world-with-style-foil.png)

Clearly, we see a lot more than we did the first time around. In a terminal program that supports colors, you can see that `Hello, World!` is red and centered. Obviously, these contents are essentially defined by elements such as `h1`, `p` mixed in the HVML program. We also define the color (`color:red`) and text-alignment (`text-align:center`) of the `h1` element using CSS styles.

Unlike other programming languages, HVML executes elements such as' h1 'and' p 'as actions, and inserts their content into a structured document. In other programming languages, we may need to complete these tasks through a specific interface, such as using a template engine like Jinja2 in Python; and if we want to display the content generated by the template engine, we need to start a web server and feed the data to the browser.

But HVML has this capability built in, and it's the first important feature of HVML that we'll cover in this section: built-in structured document generation and manipulation capabilities. When running `purc` without the `-c thread` option, we can’t see anything related to the documentation, but we can still make `purc` output the corresponding document structure with the `-v` option:

```console
$ purc -v hello-world.hvml
purc 0.9.8
Copyright (C) 2022, 2023 FMSoft Technologies.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Executing HVML program from `file:///srv/devel/hvml/purc/build/hello-world.hvml`...
Hello, world!

The main coroutine exited.
>> The document generated:

<html>
   <head>
   </head>
   <body>
     <h1 style="color:red;text-align:center">Hello, World!
     </h1>
     <p>This paragraph is generated by HVML, and it is in HTML.
     </p>
   </body>
</html>

>> The executed result:
14
```

The above example also illustrates the second important feature of HVML: the separation of interpreter and renderer.

When we execute the `purc` command without the `-c thread` option, a renderer called `headless` will be used by default. As the name suggests, this renderer will not display any document content generated by HVML programs. Therefore, we don't see the content defined by the `h1`, `p`, etc. elements, but only what is output to the terminal using the `$STREAM.stdout.writelines()` method. When we use the `-c thread` option to execute the `purc` command, a character renderer built into `purc` will be used, named `Foil` (taken from the "two-way foil" in the famous science fiction novel "Three-Body" meaning). Similar to the working principle of a web browser, the Foil renderer will parse the HTML document generated by the HVML program, and format the content according to CSS style information to display on the terminal.

You must be able to imagine that if we use the xGUI Pro graphics renderer mentioned at the beginning of this article, we can see the content of the above document in the graphics window. And indeed it is. Start xGUI Pro, and replace the `-c thread` option with the `-c socekt` option when executing `purc`, you can see the above content in the window. However, because the HVML program we're currently writing exits immediately after generating the document, the window will flash by. So we need to do some extra work, add some code in there.

```hvml
<hvml target="html">

     $STREAM.stdout.writelines('Hello, world!')

     <body>
         <h1 style="color:red;text-align:center">Hello, World!</h1>
         <p>This paragraph is generated by HVML, and it is in HTML.</p>

         <!-- The newly added code is as follows. -->
         <test with $L.streq('caseless', $RDR.state.comm, 'socket') >
             <observe on $CRTN for 'rdrState:pageClosed'>
                 <exit with "User Closed" />
             </observe>
         </test>
     </body>
</hvml>
```

Then we start xGUI Pro first:

```console
$ xguipro
```

Then switch to another terminal and use `-c socket` to execute the `purc` command:

```console
$ purc -c socket hello-world.hvml
Hello, world!
```

This command will create a window showing the content of the document generated by the above code. See the picture below.

![Hello, world!](/screenshots/hello-world-with-style-xgui-pro.png)

The above `purc` command will not exit until we close the window. And if we execute the above HVML program with the `-c thread` option, the execution effect is the same as before: the program exits immediately. Obviously, the following code we added worked:

```hvml
         <test with $L.streq('caseless', $RDR.state.comm, 'socket') >
             <observe on $CRTN for 'rdrState:pageClosed'>
                 <exit with "User Closed" />
             </observe>
         </test>
```

Different from elements such as `h1` and `p`, the newly added code uses the elements defined by three English verbs "test", "observe" and "exit", which we call "action elements". As the name implies, action elements define the operations of the program. For example, `test` defines a test, and the attribute `with` specifies the conditions used for the test. Similarly, `observe` defines an observer (listener) that listens to the `rdrState:pageClosed` event on the data `$CTRN`, and executes the operation defined by `exit` when the event arrives, that is, exits the HVML program.

Readers can easily imagine that `$L`, `$RDR`, `$CRTN`, etc. in the above code use the word prefix `$` to represent a variable. According to the HVML specification, variables using all uppercase letters are system-defined variables. These three variables respectively represent objects dedicated to logical operations, the currently connected renderer, and the currently executing coroutine. In the above code, by accessing `$RDR.state`, we can get the status information of the current renderer, and the `comm` attribute on it indicates the communication method between the current HVML program and the renderer, which corresponds to the method `thread` or `socket` specified by the `-c` option on the `purc` command line.

Therefore, the function of the newly added code above is: if the communication method of the current renderer is `socket`, then observe the `rdrState:pageClosed` event of the current coroutine, and terminate the execution of the current coroutine when the event is fired.

This gives us the third important feature of HVML: event-driven.

In addition, we saw through the simple HVML program above that we can use an expression like `$L.streq('caseless', $RDR.state.comm, 'socket')` to set the attribute value of the element. In HVML, such expressions are called Hybrid Evaluating Expressions (HEE). We can also use expressions composed of multiple HEEs with certain logic control capabilities. We compound these expressions into Compound Hybrid Evaluating Expressions (CHEE) and surround them with a pair of double curly braces; for example ` {{ $L.gt($x, $y) && $x || $y }}` means to compare the values of `$x` and `$y`, and take the larger one.

Essentially, an HVML program consists of elements, including action elements defined by HVML or external elements defined by markup languages such as HTML, and mixed evaluation expressions used to set element attributes and their contents.

In addition to the above three important features, HVML also provides support for modern programming technologies such as template definition and substitution, exception handling, multi-coroutine, and concurrency. For more details, please refer to the following articles:

- [HVML, a Programable Markup Language](a-brief-introduction-to-hvml-en.md)
- [Learn HVML Programming in 30 Minutes](learn-hvml-programming-in-30-minutes-en.md)

## Loadable Dynamic Object PY

In PurC version 0.9.8, support for Python is implemented as an external dynamic variant object `$PY` of HVML. Using the functions provided by this object, we can complete the following functions in the HVML program:

1. Using the `$PY.import()` method, the specified Python module can be loaded and the submodules, attributes or functions provided by the loaded module can be accessed or called on it.
1. Using the `$PY.run()` method, you can execute a piece of Python code, a Python script or a specified module, and get its result.
1. Using the `$PY.compile()` method, you can compile a piece of Python code, and then evaluate it in different namespaces on the compiled Python code object and get the evaluation result.
1. Using the `$PY.pythonize()` method, you can convert data such as HVML strings, arrays, tuples, collections, and objects into Python internal objects, and then execute methods supported by these Python internal objects on them, or use these Object calls other Python modules or functions.
1. Using the `$PY.stringify()` method, you can convert the Python internal object into the corresponding HVML data, or get the corresponding string representation, which is similar to Python's `str()` function.
1. Use the `$PY.global` attribute to access the global variables of the built-in `__main__` module of the current Python interpreter instance through its getter or setter.
1. Use the `$PY.local` attribute to access the local variables of the built-in `__main__` module of the current Python interpreter instance through its getter or setter. Note that local variable namespaces will take precedence over global variables.

Below we use some hybrid compound evaluation expressions (CHEE) to illustrate the usage of `$PY`.

```hee
{{
     $PY.import('math');
     $PY.math.pow(2, 3)
}}
```

The above CHEE first imports the `math` module, and then calls the `pow` function of the `math` module, and the result is 8.

```hee
{{
     $PY.import('datetime', ['datetime:dt', 'timedelta:td']);
     $PY.stringify($PY.dt.fromtimestamp(1429417200.0))
}}
```

The first statement of CHEE above imports the submodules `datetime` and `timedelta` from the `datetime` package and named them `dt` and `td` respectively. This statement is equivalent to the following statement in Python:

```python
from datetime import datetime as dt, timedelta as td
```

The second statement of CHEE above constructs a `datetime` object according to the given timestamp, and then uses the `$PY.stringify` function on the object to stringify it, and the result should be: '2015-04-19 12:20:00'.

```hee
{{
     $PY.run('x = pow(2, 3)');
     $PY.global.x;
}}
```

The first statement of CHEE above executes a piece of Python code that assigns the result of `pow(2, 3)` to the global variable `x`. In HVML programs, we can access Python global variables using the `global` attribute of `$PY`. Therefore, the evaluation result of the above CHEE is the value of the global variable `x` in Python: 8.

```hee
{{
     $PY.local.x(! [1, 2, 2, 3] );
     $PY.local.x.reverse();
     $PY.local.x()()
}}
```

The first statement of CHEE above sets a Python local variable named `x` using an HVML array, then calls Python's `reverse()` method for lists on it, and then uses `$PY.local.x()()`. This calls the getter of `x` itself, which returns the HVML array corresponding to the Python list object. Therefore, the execution result of the above CHEE is [3, 2, 2, 1].

Among them, `$PY.local.x()` returns an HVML native entity representing a Python complex object, and its default getter is called again on this native entity, namely `$PY.local.x()()`, will perform data type conversion. This conversion will construct Python's Unicode string, bytes or byte array, list, dictionary, and set into corresponding HVML data types, which are string, byte sequence, array, object, and generic set respectively. Without such conversion, these Python objects are represented in HVML programs as native entity dynamic objects. `None`, `True`, `False`, integers, and floating numbers in Python do not do this kind of processing, and are directly equivalent to the `null`, `true`, `false`, `longint`, and `number` data types of HVML. For cases where the conversion cannot be performed, such as executing the default getter on a custom Python class object, it will be equivalent to calling Python's `str()` function on it.

Obviously, by using `$PY` variable to construct our expected mixed evaluation expression, and using it for the attribute value of HVML element or the content of action element, it is very convenient to embed Python code into HVML, thus taking full advantage of the rich modules and functions in the Python ecosystem.

Before entering the topic of this article, let's take a look at Python exception handling. If an exception occurs when executing Python code or calling the interface provided by the Python interpreter (currently using CPython), HVML will uniformly report the `ExternalFailure` exception, and the further Python exception name is given by `$PY.except`. As shown in the following example:

```hee
{{
     $PY.run('2 / 0');
     $PY.except
}}
```

CHEE above first runs the Python command `2/0`, which throws an exception. If we catch this exception and then access `$PY.except`, we will get the string: `ZeroDivisionError`. This is the Python exception name for "divided by zero error".

## Sample Program: Finding Prime Numbers

This section gives an HVML program to find prime numbers using a function written in Python:

```python
def find_next_prime(start):
     if start < 2:
         start = 2

     while True:
         start += 1
         for j in range(2, start + 1):
             if start % j == 0:
                 break
         if j == start:
             return start
```

The function is called `find_next_prim`, and as its name implies, this function returns the first prime number greater than the given argument. For example, if we pass in 2, it will return 3, and if we pass in 5, it will return 7.

Now, we try to embed this function in HVML and use the HTML `ul` and `li` elements to list all the prime numbers less than 100 obtained by calling the above Python function. The code is as follows, please pay attention to the comments.

```hvml
<!--
     Since $PY is implemented as a loadable dynamic object, we use DOCTYPE's
     SYSTEM identifier to load the dynamic object and bind it to the PY variable.
-->
<!DOCTYPE hvml SYSTEM "f: PY">
<hvml target="html">
     <head>
         <title>Embedding Python in HVML: Find Primes</title>
     </head>

     <body>
         <!--
             The 'init' element is used to define a variable. Its content uses HVML's ''' syntax
             to define an literal string, bound to the 'pyCode' variable.
             Note that we can also use the 'from' attribute of the 'init' element to initialize
             the content of the 'pyCode' variable from a specified file.
             So that there is no need to hardcode the content of this Python function into the HVML program.
         -->
         <init as 'pyCode'>
'''
def find_next_prime(start):
     if start < 2:
         start = 2

     while True:
         start += 1
         for j in range(2, start + 1):
             if start % j == 0:
                 break
         if j == start:
             return start
'''
         </init>

         <!--
             We perform a hybrid evaluation expression using the content of
             the 'inherit' action element.

             This expression executes the Python code contained in the 'pyCode' variable.
             Note that we can also directly execute the code from a Python file:

                 $PY.run('<the Python script file name>', 'file')
         -->
         <inherit>
             {{ $PY.run($pyCode, 'source') }}

             <!--
                 We utilize the 'catch' action element to catch exceptions that may occur
                 while executing the above Python code.
             -->
             <catch for `ExternalFailure`>
                 $STREAM.stdout.writelines("A Python exception raised: $PY.except!")

                 <exit with "$PY.except" />
             </catch>
         </inherit>

         <h1>Embedding Python in HVML: Find Primes</h1>

         <ul>
             <!--
                 The 'iterate' action element is used here to perform iteration,
                 similar to a loop in other programming languages.

                 The initial input data for this iteration is 2L, which is defined
                 by the 'on' attribute.

                 The stopping condition of the iteration is determined by
                 the expression of the 'onlyif' attribute: $L.lt($0~, 100L).

                 Where '$0~' represents the current iteration input data;
                 if the current iteration input data '$0~' is greater than or equal to 100L,
                 the expression evaluates to false and the entire iteration ends.

                 Not that on each iteration, the input data will execute all descendant elements
                 defined by iterate.

                 The expression '$PY.global.find_next_prime($0<)' specified by
                 the 'with' attribute is evaluated after each iteration
                 if the entire iteration has not ended.

                 Since the 'nosetotail' (meaning "end to end") adverb attribute is set,
                 the result of the with attribute will be used as the input data for the next iteration.
             -->
             <iterate on 2L only if $L.lt($0<, 100L)
                     with $PY.global.find_next_prime($0<) nosetotail >

                 <!--
                     Insert a 'li' element at the current document position,
                     and its content is '$?', which is the execution result of
                     the last action element, that is, the result of each iteration.
                 -->
                 <li>$?</li>
             </iterate>
         </ul>

         <!--
             Listen and handle the 'rdrState:pageClosed' event according to
             the renderer type.
         -->
         <test with $L.streq('caseless', $RDR.state.comm, 'socket') >
             <observe on $CRTN for "rdrState:pageClosed">
                 <exit with 'Ok' />
             </observe>
         </test>
     </body>
</hvml>
```

If we execute the above HVML program, and use the Foil character renderer, all prime numbers less than 100 will be listed, as shown in the figure below.

![Find Primes (Using ul and li)](/screenshots/embed-python-to-find-primes-using-ul-li.png)

If we want to list all prime numbers less than 10000, of course, the above program can run normally, but it is obviously a waste of space to display one prime number per line. Therefore, we slightly modify the part of the above code to generate documents, use `p` elements instead of `ul` elements, use `span` instead of `li` elements, and use different colors interleaved to display these prime numbers:

```hvml
         <!-- Use 'p' and 'span' elements to list all prime numbers less than 10000L. -->
         <p id="myNS">
             <iterate on 2L only if $L.lt($0~, 10000L)
                     with $PY.global.find_next_prime($0~) nosetotail >
                 <test with $DATA.arith('%', $%, 2L)>
                     <init as 'color' at '#myNS' with 'yellow' />
                     <differ>
                         <init as 'color' at '#myNS' with 'red' />
                     </differ>
                 </test>
                 <span style="color:$color">$?, </span>
             </iterate>
         </p>
```

If we execute the above HVML program and use the Foil character renderer, all prime numbers smaller than 10000 will be listed in a compact form, as shown in the following figure (limited by the screen, only the second half is shown):

![Find Primes (Using p and span)](/screenshots/embed-python-to-find-primes-using-p-span.png)

If we use the xGUI Pro graphics renderer, the effect is as follows (we set the background color of the `p` element to black by `style="background-color:black"`):

![Find Primes (Using p and span)](/screenshots/embed-python-to-find-primes-using-p-span-xgui-pro.png)

The above examples illustrate the great benefits of embedding Python programs in HVML: With HVML, we can use descriptive HTML and CSS to easily change the output of Python programs. At the same time, the separate design of HVML's interpreter and renderer brings a lot of convenience to our GUI/CLI design. As shown by the built-in Foil character renderer and xGUI Pro graphics renderer, we can unify the development of CLI (command line interaction) and GUI (graphical user interaction) through HVML. In other words, when we develop command-line programs in the future, we can also use Web technologies such as HTML and CSS to display content and complete interaction with users, without having to control the color, position, and alignment of text in a complicated and difficult-to-debug way. Going a step further, we can run the renderer on a remote device, thus gaining the ability to execute an HVML application cross-end. Interested readers can try to use the Web Socket communication capability provided by xGUI Pro.

## Sample Program: 3D Random Walk

The original version of the 3D random walk program described in this section comes from the animation example program "Animated 3D Random Walk" on the official website of Matplotlib:

<https://matplotlib.org/stable/gallery/animation/random_walk.html>

This program uses the popular NumPy and Matplotlib modules in the Python ecosystem to implement a three-dimensional random walk program. If you use Matplotlib's interactive backend (backend), such as Tk, Gtk, Qt, the results can be displayed on the graphical user interface in the form of animation.

The program utilizes the animation submodule of Matplotlib, and periodically updates the lines in it through the `update_lines()` function, thus realizing the animation effect.

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

...

def update_lines(num, walks, lines):
     for line, walk in zip(lines, walks):
         # NOTE: there is no .set_data() for 3 dim data...  
         line.set_data(walk[:num, :2].T)
         line.set_3d_properties(walk[:num, 2])
     return lines

...

#Creating the Animation object
ani = animation.FuncAnimation(
     fig, update_lines, num_steps, fargs=(walks, lines), interval=100)

plt.show()
```

The core code to implement the animation is given above: the `update_lines()` function and the `animation.FuncAnimation()` function call to create the animation. Finally, the program calls `plt.show()` to enter the animation. If Matplotlib's interactive backend is used, the program will not continue until the user closes all windows displayed by `plt.show()`.

If we want to interact with the user on the animation in the Python program, such as re-executing the animation, the animation framework currently provided by Matplotlib is difficult to achieve. The main reason for this is that Python is a procedural programming language in nature and lacks built-in support for event-driven mechanisms. In Python, to achieve this interaction, Matplotlib's animation framework needs to provide some kind of callback mechanism, and define corresponding events for various possible interaction situations, and then let developers handle these events in the callback function. This is obviously not an easy thing to do, and if you take into account the differences between different interactive backends such as Tk, Gtk, Qt, the amount of work will be very large.

The HVML solution is concise and unified: the rendering and interaction of the interface are handled by HVML, and Python only performs scientific calculations. In terms of the visualization needs of scientific computing, HVML only needs Matplotlib to generate PNG or SVG images. With this in mind, we can achieve our goal with a slight change to the original Python program. The main points are as follows:

1. Instead of using Matplotlib's animation framework, it is driven by HVML's timer.
1. In the HVML timer event, call Python's `update_lines()` function to update the drawn content, and save the result as a PNG or SVG file.
1. Update the interface content by modifying the `src` attribute of the `img` element in the HVML target document.

The main framework of the HVML program modified by the above scheme is similar to the HVML program for finding prime numbers, but there are some significant differences as follows:

1. In order to obtain better rendering effect, the program will use Bootstrap 5.1, a front-end framework which commonly used in web development.
1. The program creates a timer with an interval of 100ms, and the animation is driven by the expiration event of the timer.
1. The program displays a "Run again" button on the interface. After the user clicks the button, the animation will be re-executed.
1. In order to make the user interface more beautiful, the program uses more interface elements to beautify the head and tail of the page.

Below is the complete source code of the program, please read the comments to understand the program.

```hvml
<!DOCTYPE hvml SYSTEM "f: PY">
<hvml target="html">
     <head>
         <title>Embedding Python in HVML: Animated 3D Random Walk</title>

         <!-- Import Bootstrap 5.1 resources built into the renderer -->
         <link rel="stylesheet" href="//localhost/_renderer/_builtin/-/assets/bootstrap-5.1.3-dist/css/bootstrap.min.css" />
         <link rel="stylesheet" href="//localhost/_renderer/_builtin/-/assets/bootstrap-icons-1.8.3/bootstrap-icons.css" />

         <!--
             Create a timer by modifying the $TIMERS system variable. This embodies the HVML data-driven concept.
         -->
         <update on $TIMERS to 'unite'>
             [
                 { "id" : "clock", "interval" : 100, "active" : "yes" },
             ]
         </update>
     </head>

     <body>
         <!-- Embedded Python code. -->
         <init as 'pyCode'>
'''
import numpy as np
import matplotlib.pyplot as plt

# Fixing random state for reproducibility
np. random. seed(myseed)

def random_walk(num_steps, max_step=0.05):
     """Return a 3D random walk as (num_steps, 3) array."""
     start_pos = np.random.random(3)
     steps = np.random.uniform(-max_step, max_step, size=(num_steps, 3))
     walk = start_pos + np. cumsum(steps, axis=0)
     return walk

def update_lines(num, walks, lines):
     for line, walk in zip(lines, walks):
         # NOTE: there is no .set_data() for 3 dim data...  
         line.set_data(walk[:num, :2].T)
         line.set_3d_properties(walk[:num, 2])

def update_walks(num_steps):
     np. random. seed(myseed)
     return [random_walk(num_steps) for index in range(40)]

# Data: 40 random walks as (num_steps, 3) arrays
num_steps = 30
walks = update_walks(num_steps)

# Attaching 3D axis to the figure
fig = plt. figure()
ax = fig.add_subplot(projection="3d")

# Create lines initially without data
lines = [ax.plot([], [], [])[0] for _ in walks]

# Setting the axes properties
ax.set(xlim3d=(0, 1), xlabel='X')
ax.set(ylim3d=(0, 1), ylabel='Y')
ax.set(zlim3d=(0, 1), zlabel='Z')
'''
</init>

         <!--
             The content of the 'inherit' action element defines a CHEE.

             This CHEE execution uses '$PY.global' to set a Python global variable 'myseed'
             with the system's timestamp.

             Then execute the embedded Python code, call the interface of Matplotlib to save
             the first picture to the frame-orig.svg file in the current working path.

             Note that the 'catch' sub-element can be used to catch Python exceptions
             that may arise when evaluating CHEE above.
         -->
         <inherit>
             {{
                  $PY.global(! 'myseed', $SYS.time );
                  $PY. run($pyCode, 'source');
                  $PY.global.fig.canvas.draw_idle();
                  $PY.global.fig.savefig("frame-orig.svg");
             }}

             <catch for `ExternalFailure`>
                 <exit with "A Python exception raised: $PY.except" />
             </catch>
         </inherit>

         <!-- The header of the user interface. -->
         <div class="px-4 my-5 border-bottom">
             <div class="text-center">
                 <h1>Embedding Python in HVML: Animated 3D Random Walk<br/>
                 <small class="text-muted">Powered by NumPy and Matplotlib</small></h1>
             </div>
         </div>

         <!-- The main part of the user interface, which contains the key program logic. -->
         <div class="container" id='myNS'>
             <div class="border border-3 pt-3 pb-3">

                 <div class="col" >
                     <div class="text-center">
                         <!--
                             The 'img' element is used to display the plotting results of Matplotlib.

                             Note that the 'src' attribute is initially set to the 'frame-orig.svg' file,
                             and a URL starting with 'hvml://localhost/_system/_filesystem/' is used to locate a local file.
                             Wherein '$SYS.cmd' returns the current working path when executing the program.
                         -->
                         <img id="theFigure" width="638" height="476" src="hvml://localhost/_system/_filesystem/-$SYS.cwd/frame-orig.svg?once=yes"/>
                     </div>

                     <init as 'step' at '#myNS' with 0L />

                     <observe on $TIMERS for 'expired: clock'>
                         <!--
                            When the timer expires, call Python's 'update_lines()' function
                            to update the drawing and save it as a new picture.
                         -->
                         <inherit>
                             {{
                                     $STREAM.stdout.writelines("Going to handle Frame {$step}...");
                                     $PY.global.update_lines($step, $PY.global.walks, $PY.global.lines);
                                     $PY.global.fig.canvas.draw_idle();
                                     $PY.global.fig.savefig("frame-{$step}.svg");
                                     $STREAM.stdout.writelines("File frame-{$step}.svg generated")
                             }}
                         </inherit>

                         <!-- Update the 'src' attribute of the 'img' element in the target document. -->
                         <update on '#theFigure' at 'attr.src' with "hvml://localhost/_system/_filesystem/-$SYS.cwd/frame-{$step}.svg?once=yes" />

                         <!-- '$step' plus 1, if it is greater than 30, delete the timer. -->
                         <init as 'step' at '#myNS' with $DATA.arith('+', $step, 1) />
                         <test with $L.gt($step, 30)>
                             <update on $TIMERS to 'subtract' with = [{ id : 'clock' }] />
                         </test>
                     </observe>

                     <catch for `ExternalFailure`>
                         <p>A Python exception raised: $PY.except</p>
                     </catch>
                 </div>

                 <!-- 'Run Agian' button -->
                 <div class="col">
                     <div class="d-grid gap-2 col-10 mx-auto">
                         <button class="btn btn-outline-primary btn-for-input" id="runAgain" value="Run again" hvml-events="click" type="button">Run Again</button>
                     </div>
                 </div>
                 <observe on '#runAgain' for 'click'>
                     <!-- When the 'Run Again' button is clicked by the user, reset the animation. -->
                     <inherit>
                         {{
                             $PY.global.update_walks($DATA.arith('*', $step, 2))
                         }}
                     </inherit>

                     <!-- Restart the timer. -->
                     <init as 'step' at '#myNS' with 0L />
                     <update on $TIMERS to 'unite' with [{ "id" : "clock", "interval" : 100, "active" : "yes" }] />
                 </observe>
             </div>
         </div>

         <!-- The footer of the user interface. -->
         <div class="container">
             <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                 <div class="col-md-4 d-flex align-items-center">
                     <a href="https://hvml.fmsoft.cn" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                         <img class="d-block mx-auto" src="//localhost/_renderer/_builtin/-/assets/hvml-v.png" alt="HVML logo" height="24" />
                     </a>
                     <span class="mb-3 mb-md-0 text-muted">© 2023 HVML Community</span>
                 </div>

                 <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                     <li class="ms-3"><a class="text-muted" href="https://github.com/HVML"><i class="bi bi-github"></i></ a></li>
                     <li class="ms-3"><a class="text-muted" href="https://store.fmsoft.cn/campaign/denoteoss-lt"><i class="bi bi-coin"> </i></a></li>
                     <li class="ms-3"><a class="text-muted" href="mailto:hvml@fmsoft.cn"><i class="bi bi-envelope-heart-fill"></i> </a></li>
                 </ul>
             </footer>
         </div>

         <!-- Listen to the 'rdrState:pageClosed' event fired by the renderer to the current coroutine. -->
         <observe on $CRTN for "rdrState:pageClosed">
             <exit with 'Ok' />
         </observe>
     </body>
</hvml>
```

Note that due to the use of the `img` element, this program can only use the xGUI Pro graphics renderer (the Foil character renderer cannot render pictures in character terminals). The figure below shows the effect of the HVML program when using the xGUI Pro renderer:

![Animated 3D Random Walk](/screenshots/embed-python-animated-3d-random-walk.png)

When the user presses the "Run Again" button, the program will re-execute the animation again.

## Conclusion

This article describes what makes HVML a new breed of programming language: the Programmable Markup Language, and uses two sample programs to demonstrate the wonderful "chemical reaction" of combining HVML and Python.

With the support for embedded Python introduced in version 0.9.8 of the HVML open source interpreter PurC, developers can now easily call Python modules in HVML programs, thereby taking advantage of the rich software packages or modules in the Python ecosystem (such as in the popular PyTorch package in the AI field) to develop your own HVML applications. For the Python ecosystem, using HVML can elegantly solve the problem that it’s difficult to use Python to develop interactive applications.

In addition, through several sample programs in this article, we have also seen a major benefit brought by the HVML application framework decoupling interpreter and renderer: a new application framework that is cross-platform and is expected to unify GUI/CLI development. Of course, there is still a lot of work to be done to fully realize this goal. For example, the Foil renderer in PurC still lacks support for tables, inputs, forms, etc. But all of this is changing rapidly.

As the inventor of HVML and the leader of PurC and xGUI Pro projects, the author hopes that open source enthusiasts from all over the world will contribute to the rapid maturity of HVML!

Finally, welcome to visit the HVML open source interpreter PurC project repository: <https://github.com/HVML/PurC>, submit any of your comments, suggestions, bug reports and even code merge requests!

Thanks in advance!


