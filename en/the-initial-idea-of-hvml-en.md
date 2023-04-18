# Talk about HVML, Its Origin and Future

Vincent Wei

HVML is a new type of high-level programming language proposed by the author in the process of developing the combined operating system. The novel "Biography of Coding" introduces this language as follows:

> The programming language invented by Lao Wei is officially called HVML, which is only one letter different from the web page markup language HTML we know. Some friends nicknamed it "Snoring Cat". HVML is completely different from many programming languages we know, such as Basic, Python, C/C++, etc. HVML proposes a data-driven concept. And there are no flow control statements such as if-then and do-while in the code, and all operations are based on data. For example, the input data of the program is an array, then we perform iterations on this array, and pick and process the elements in the array. and so on.
>
> —— "Biography of Coding" Chapter 10

This article will tell you about the origin of HVML and the author's vision for its future.

### The Origin of HVML

With the development of Internet technology and applications, the Web front-end development technology formed around HTML/CSS/JavaScript has developed rapidly, and it can even be described as "a thousand miles a day". Five years ago, front-end frameworks based on jQuery and Bootstrap became popular. And since 2019, frameworks based on virtual DOM technology have been favored by front-end developers, such as the famous React.js (<https://reactjs.org/> ), Vue.js (<https://cn.vuejs.org>), etc. It is worth noting that WeChat applets, quick apps, etc. also use this virtual DOM technology to build application frameworks.

The so-called "virtual DOM" means that the front-end application creates and maintains a virtual document object tree through JavaScript, and the application script does not directly operate the real DOM tree. In the virtual DOM tree, some process control based on variables is realized through some special attributes, such as conditions, loops, etc. Virtual DOM technology provides some benefits as follows:

1. Since scripts do not use script programs to directly operate the real DOM tree, on the one hand, the complexity of front-end development is simplified through the existing framework. On the other hand, frequent operations on the DOM tree for content, thereby improving page rendering efficiency and user experience.
1. Through the virtual DOM technology, the modification of a certain data by the program can be directly reflected on the content of the data-bound page, and the developer does not need to actively or directly call the relevant interface to operate the DOM tree. This technique provides so-called "reactive" programming, which greatly reduces the developer's workload.

Front-end frameworks represented by React.js and Vue.js have achieved great success. It seems that Internet companies still have a lot of money, so they can keep building all kinds of wheels recklessly.

However, application developers on embedded or IoT devices cannot enjoy the dividends brought by these technological advances. To develop applications on embedded or IoT devices, the programming language C/C++ is still used in most cases. Although there are some IoT operating systems that try to introduce JavaScript or Python language support into the system, only one programming language is not enough. For example, in the extensive and profound web front-end technology, JavaScript does play an important role, but the foundation of the web front-end technology is DOM and CSS: DOM provides a description of the elements in the document or interface, their attributes, and content. structure, while CSS describes the rendering characteristics of elements such as layout, style, and animation effects. In a word, the exquisite web page effect is not described by JavaScript, but determined by DOM and CSS.

Therefore, if we want to use the convenience brought by Web front-end technology to develop GUI applications in a non-browser environment, the most important thing to introduce is DOM and CSS, not just support for a scripting language.

In addition to developers of embedded or Internet of Things applications, other developers who use non-JavaScript languages, such as developers who use Python for artificial intelligence and big data analysis, cannot easily use the benefits of Web front-end technology. If you want to use it, you have to make a lot of troubles, for example, to visualize the calculation results, you must either use various GUI bindings of Python, or go around and feed data to the browser, and you must learn an additional scripting language. The hard work during this period is also too numerous to describe.

The author has developed MiniGUI for more than 20 years, and knows how to use C/C++ to develop interfaces, and writing a few lines of C/C++ codes can also create many exquisite interfaces. But for a few years, the author has engaged in Web front-end development several times, and was impressed by the subtlety of the Web front-end technology development interface. Later, I was reluctant to use C/C++ language to develop the interface. If it wasn't for the money, who would want to develop a GUI in C/C++ in 2020? There are still people who want to replace Qt with a "domestic" C++ GUI system. Pooh! That was twenty years ago. If you want to engage in domestic substitution, can you look ahead first?

On the other hand, in order to support complete Web front-end technology in embedded systems or Internet of Things devices, the required storage size and operating memory are relatively large, and GPU support is also required to obtain good results. Therefore, in the development of the hybrid operating system (HybridOS), we transformed the Web front-end technology through some small technical breakthroughs, so that developers can use less JavaScript code to complete more work. However, during the development of HybridOS, we realized that tinkering with the front-end technology of the Web can only be a stopgap measure—we need a new development framework, especially a programming language to break the existing framework and limitations of the front-end Web technology. limit.

So there is HVML. If summed up, the birth of HVML has its historical mission:

1. Through a complete, self-consistent, and highly abstract new programming language, further summarize and summarize some technical attempts made by React.js, Vue.js, etc. around virtual DOM technology.
1. Break the coupling between Web front-end technology and JavaScript, so that other programming languages, such as Python, Lua, C/C++, etc., can also directly use the convenience brought by Web front-end technology.
1. Bring new changes to traditional GUI development, including design tools and development frameworks.
1. Bring new possibilities for IoT application development in the cloud environment.

This is where HVML comes in. In the future, HVML will become the preferred programming language for HybridOS App development.

## HVML Overview

The following uses a simple example to describe the basic appearance of HVML. For the detailed specification of HVML, interested readers can click the original link at the end of the article.

The HTML page generated by the sample HVML code below will display three sets of information on the screen:

1. The system status bar displayed at the top of the page is used to display the current time, WiFi signal strength, battery power information, etc. This information will be dynamically updated by listening to status events from the system.
1. Display the user list in the middle of the page, and each user item includes user name, avatar and other information. The information comes from an array of dictionaries expressed in JSON. When the user clicks on a user's avatar, the HVML code will load a modal dialog with more information about that user.
1. Display a search engine link at the bottom of the page. The specific search engine is determined according to the language region (locale) information where the system is located.

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

        <connect at="socket:///var/run/hibus.sock" as="systemStatus" for="hiBus" />
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

        <observe on="$systemStatus" for="battery">
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

        <observe on=".avatar" for="clicked">
            <load on="user.hvml" with="{'id': $@.attr['data-value']}" as="modal" />
        </observe>
    </body>
</hvml>
```

Readers familiar with HTML will find the above code familiar. Yes, like HTML, HVML uses tags; but unlike HTML, HVML is dynamic and expresses programs, while HTML is static and expresses documents.

We compare some of the features of HVML with the above examples.

The first is data-driven programming. Through operations such as data-based iteration, insertion, update, and clearing, developers can dynamically generate the final XML/HTML document without writing a program or only need to write a small amount of program. For example, the `iterate` tag in the sample code above iterates over the data represented by the `$users` variable (defined using the `init` tag in `header`), and then in the `ul` element of the final document Several `li` elements have been inserted. Instead, the properties of `li` elements (including child elements) are defined by an `archetype` tag using `$? ` to refer to a data unit in `$users` being iterated over.

In the sample code above, we use the system built-in variable `$TIMERS` to define timers, and each timer has a global identifier, interval time and flag whether to activate. To activate a timer, we only need to use the `update` tag of HVML to modify the corresponding key value without calling a specific programming interface. This is another use of data-driven programming - we don't need to provide additional APIs for timers or other similar module operations.

In addition, in the sample code above, we use the `observe` tag to observe new data or changes in the document itself and user interaction events, which can realize dynamic updates of XML/HTML documents or data. For example, in the last `observe` tag, a new `user.hvml` file is loaded by listening to the click event on the user's avatar, and the detailed information of the corresponding user is displayed in the form of a modal dialog box.

The second is to completely decouple the interface, interaction, and data. Through the programming model and method introduced by HVML, the XML/HTML document content used to express the interface can be completely generated and dynamically adjusted by HVML, which avoids directly manipulating the data structure of the document (that is, the document object tree, or DOM for short) in the program code. tree), and the program only needs to focus on the generation and processing of the data itself. In this way, the decoupling of interface and data is realized. for example:
    - HVML can define the mapping relationship between data and DOM elements in the document fragment template or data template (such as the `archetype` or `archedata` tag in the sample code), without writing additional code to complete the data to DOM element attributes, Assignment operations such as content.
    - HVML separates the display of errors and exceptions from the program code. As long as the program generates appropriate errors or exceptions (such as `error` and `except` tags in the sample code), the handling of errors or exceptions is directly in the Defined in HVML, this not only isolates the program and the interface, but also improves the maintainability of the code.

Again a JSON representation of the data. HVML provides a consistent interface for operations on documents and data. HVML requires that all external data be expressed in JSON format. JSON format is a form of data expression that can be read by humans and machines. It can express complex objects based on basic data units such as numbers, strings, arrays, and dictionaries. Since HTML/XML document fragments (DOM subtrees) can be represented as JSON-formatted data, HVML can also be used to manipulate data represented in JSON. In HVML, we also provide support for dynamic JSON objects. We can use external script programs to implement our own dynamic JSON objects, and we can perform functions similar to function calls on these objects.

Finally, HVML uses action tags (usually some English verbs, such as `init`, `update`, `iterate`, etc.) and the associated preposition or adverb attributes to define the data on which the action tag depends and the target operation location and execute conditions to complete specific document operations. This is very different from common programming languages. The description method of HVML is closer to natural language, which can greatly reduce the learning threshold.

Due to space limitations, we do not intend to introduce HVML in detail in this article. It is enough for readers to have a perceptual understanding of HVML. Readers who are interested in knowing the detailed specifications can refer to the link to the original text at the end of the article. But be patient, defining a complete and self-consistent programming language is not an easy task, so if you want to read it, you have to find a long time and read it patiently and carefully.

## How HVML Changes Traditional GUI Development

We assume a GUI system that uses XML to describe the components (widgets) on the interface. Now, we want to use this GUI system to develop a simple file open dialog box. The general interface requirements are as follows:

1. There is a list box (Listbox), which lists the directories and files under the current path (collectively referred to as directory items). The user can use the mouse or keyboard to switch the currently selected item in the list box, and generate an event that the selected item changes.
1. At the top of the list box, there is a text label (Label), which shows the current path.
1. When the user clicks the "Open" button (Button) below the list box, if the currently selected item in the list box is a directory, enter this directory, modify the content of the text label used to display the current path, and use the new path Directory items populate the list box, if the currently selected item is a file, returns the selected file.

For the above interface and interaction requirements, we can usually use the following XML file description:

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
         open
     </button>
</ui>
```

In order to meet the above interaction processing requirements, we use HVML to describe the dynamic generation and interaction process of this interface:

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

        <observe on="$entries" for="selected-item-changed">
            <update on="$fileInfo" at="property.selected_type key.selected_name" with ["$?.type", "$?.name" ] />
        </observe>

        <observe on="$open" for="click">
            <test on="$fileInfo.selected_type">
                <match for="dir" exclusively>
                    <init as="new_path">
                        "$fileInfo.curr_path{$2.name}/"
                    </init>

                    <empty on="#entries" />
                    <call on="$fillDirEntries" with="$new_path" />
                    <update on="$fileInfo" at="property.curr_path" with="$new_path" />
                    <update on="#path" at="textContent" with="$new_path" />
                </match>
                <match for="file" exclusively>
                    <back to="_caller" with="$fileInfo">
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
- If the currently selected directory item type is a file, use the `back` tag to return to the previous page and return `fileInfo` data.

In the above code, the implementation of the external selector `CDirEntries` is very simple, which is to list the directory entries under the given path and return an array of dictionaries as required. It is very simple to implement in Python, so I will omit it here.

If we use the extended URL schema (lcmd) mentioned in HybridOS to directly execute local system commands, we don't even need to write any code, but just use `request`:

```html
         <requset on="lcmd:///bin/ls" with="{ "cmdLine": "ls $fileInfo.curr_path" }">
             <iterate on="$?" in="#entries" by="RANGE: 0">
                 <update on="$@" to="append" with="$dir_entry" />
             </iterate>
         </request>
```

In this way, developers can implement a simple file browsing and opening dialog box without writing any programs.

Obviously, if HVML is used, the development efficiency of traditional GUI applications will be greatly improved and the development cycle will be shortened. Of course, the traditional GUI support system needs to provide XML-based UI description support and CSS-like rendering support for layout, style, animation, etc.

## The Future of HVML: Cloud Applications

HVML has more potential than the above examples suggest. In the future, we can even run the HVML code on the cloud, and control the interface display on the device through the cloud, thus forming a new cloud application solution.

We assume that a smart bracelet displays information such as the current time, local temperature, wearer's heartbeat information and step information. And this smart bracelet exchanges information with the cloud server through MQTT (a lightweight message communication protocol), such as Send the wearer's heartbeat and step information, geographic location information to the cloud server, and obtain information such as time and weather conditions at the current location. In the traditional implementation method, we generally need to develop a GUI system running on the smart bracelet, and then communicate with the cloud to obtain data. And the modification of the interface is completely in charge of the device-side code. If you want to change the style of the interface, in most cases, you need to upgrade the firmware of the entire smart bracelet.

But if we use HVML, we can control the interface display of the device through the cloud. The HVML code running on the cloud looks like this:

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

The main points are as follows:

1. The HTML document generated by the code or the changes to the HTML document will be sent to the device through a long connection similar to WebSocket. And the device will re-render the user interface based on this information.
1. The code monitors the data sent by the smart bracelet (device) to the cloud through MQTT, including heartbeat, temperature, steps and other information, and updates the corresponding label content.
1. The code sets a timer, runs every 1 second, and updates the label content corresponding to the clock.
1. The code uses an external selection executor `CDumpEvent` to dump all events from `mqtt` to the cloud database.

This brings about the following notable changes:

1. The complex logic code will all run on the cloud. And the device only needs to have an HTML/XML user agent with sufficient functions, and usually only needs to include a renderer to render the final user interface according to the DOM tree and CSS.
1. When we need to adjust the display effect or function of the device, we only need to modify the HVML code without updating the firmware of the device.
1. We can also use external scripts to organically integrate other functions running on the cloud, such as database storage, data analysis, and artificial intelligence.

Writing here, the author is really moved by the point of view he has always emphasized: **Programming language is the thing that determines the soul and genes of the operating system, and it is the jewel in the crown of the basic software ecology! **

## HVML Reference Implementation Development Team

Now, the appearance of HVML is roughly formed. HVML can be realized, which is a large software project no less than a browser engine. In addition, HVML can be used in various scenarios, and can be bound to different external scripting languages to form different systems. If we want to apply HVML to a cloud environment, we also need to develop an application server.

As the author said in the novel "Biographic of Coding": **Like the old saying, once the key link is grasped, everything falls into place. The programming language is that key link.**. The changes brought about by a new programming language involve the reconstruction of basic software, changes in development models, changes in development tools, and the generation of new protocols and software. At the same time, it also involves changes in the upstream and downstream cooperation relationships in the industry. Just imagine, if the cloud applications described in this article become a reality, will the many efforts we are making in the IoT operating system be worthless?

In order to let everyone see how HVML actually turns as soon as possible, the author organized a small open source collaborative team to develop a reference implementation of HVML, with the goal of providing a solution for the Python ecosystem that can directly use Web front-end technology. The development team is now working, and we will report back as soon as we have results.

We expect more people or companies to join in the development of the HVML reference implementation. However, it takes a long period for a new programming language to mature from birth to maturity. Before seeing how HVML works, most people will hold a wait-and-see attitude. This is human nature. But opportunities must be reserved for conscientious people.

- If you own a promising basic software company, a potential user of HVML, or an upstream operating system company, such as a chip company, you can join the HybridOS partner program (see <https://hybridos.fmsoft.cn/members> for details) ), send several engineers to participate in the development of the HVML reference implementation. The author believes that your team and company will benefit greatly from this.
- If you represent an individual, you can give a reward to the HVML reference implementation project (reward at the end of the article or go to the web page <https://store.fmsoft.cn/campaign/denoteoss-lt>). Your encouragement, no matter big or small, will become the driving force for us to move forward!

Stay tuned, a revolution is slowly kicking off!
