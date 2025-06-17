
const hvml = { 
    setMonarchTokensProvider : {
        defaultToken: 'invalid',
        ignoreCase: true,
        brackets: [
            { open: '{', close: '}', token: 'delimiter.bracket' },
            { open: '[', close: ']', token: 'delimiter.bracket' },
            { open: '(', close: ')', token: 'delimiter.bracket' }
        ],
        tokenizer: {
            root: [ 

                    [/[{\[\(]/, 
                        { 
                        token: 'delimiter.bracket.level1', 
                        next: '@bracketLevel1' 
                        }
                    ],
                    // 1. 匹配 ${expression} 复杂变量
                    [/(\$\{)([^}]+)(\})/, ['delimiter.bracket', 'variable.expression', 'delimiter.bracket']],
                    
                    // 2. 匹配简单变量（如 $var、$data.key）
                    [/\$[\w\.]+/, 'variable.simple'], 
                                            // ========== 高优先级规则 ==========
                    // 1. 特殊标记（日志、错误）
                    //[/\<error/, 'error.custom'],     // 匹配 <error 开头
                    [/(<\/?)(!DOCTYPE)(\s*)([a-zA-Z]*)(\s*)([a-zA-Z]*)(\s*)/, ['delimiter.hvml', 'tag', '', 'attribute.name.hvml','', 'tag','']],  // 匹配!DOCTYPE
                    //[/\[info/, 'keyword.custom'],    // 匹配 [info 开头


                    // 2. 注释（完整状态切换）
                    [/<!--/, 'comment.hvml', '@comment'],  // 开始标记类型为 custom-info
                    [/(^#.*$)/, 'comment.hvml'], //以#开头的注释

                    // ========== hvml 核心语法 ==========
                    // 3. 标签（如 <div> 或 </div>）
                    [/(<\/?)([a-zA-Z][\w\-:]*)(\s*)/, ['delimiter.hvml', 'tag', '']],

                    
                    // 4. 属性名和值
                    [/([a-zA-Z\-:@]+)(\s*)(=)/, 'attribute.name.hvml'],
                    [/"([^"]*)"/, 'attribute.value.hvml'],
                    [/'([^']*)'/, 'attribute.value.hvml'],

                    // ========== 通用规则 ==========
                    // 5. 符号（< > = /）
                    [/[<>=\/]/g, 'delimiter.hvml'],
                    
                    // 7. 关键字（if/else 等）
                    [/\b(if|else|foreach|return)\b/, 'keyword.custom'],
                    
                    // 8. 日期格式（如 [2023-10-01]）
                    [/\[\d{4}-\d{2}-\d{2}\]/, 'keyword.custom']
                ],
                // ====================== 嵌套层级状态 ======================
                bracketLevel1: [
                    // 左括号进入第二层
                    [/[{\[\(]/, 
                        { 
                        token: 'delimiter.bracket.level2', 
                        next: '@bracketLevel2' 
                        }
                    ],
                    // 右括号退出当前层
                    [/[}\]\)]/, 
                        { 
                        token: 'delimiter.bracket.level1', 
                        next: '@pop' 
                        }
                    ],
                    // 其他内容（如字符串、数字）保持原色
                    { include: 'commonContent' },
                    // 行尾未闭合错误检测
                    [/$/, 'error.unclosed', '@pop']
                ],

                bracketLevel2: [
                    // 左括号进入第三层
                    [/[{\[\(]/, 
                        { 
                        token: 'delimiter.bracket.level3', 
                        next: '@bracketLevel3' 
                        }
                    ],
                    // 右括号退回上一层
                    [/[}\]\)]/, 
                        { 
                        token: 'delimiter.bracket.level2', 
                        next: '@pop' 
                        }
                    ],
                    { include: 'commonContent' },
                    // 行尾未闭合错误检测
                    [/$/, 'error.unclosed', '@pop']
                ],

                bracketLevel3: [
                    // 右括号退回上一层（可继续扩展更多层级）
                    [/[{\[\(]/, 
                        { 
                        token: 'delimiter.bracket.level1', // 循环到第一层颜色
                        next: '@bracketLevel1' 
                        }
                    ],
                    [/[}\]\)]/, 
                        { 
                        token: 'delimiter.bracket.level3', 
                        next: '@pop' 
                        }
                    ],
                    { include: 'commonContent' },
                    // 行尾未闭合错误检测
                    [/$/, 'error.unclosed', '@pop']
                ],
                // ====================== 通用内容规则 ======================
                commonContent: [
                    [/(:)(\s*)("[^"]*")/, ['delimiter.json', '', 'json.key']],
                    [/(:)(\s*)('[^']*')/, ['delimiter.json', '', 'json.key']],
                    [/"[^"]*"/, 'json.string'],
                    [/'[^']*'/, 'json.key'],
                    [/\d+/, 'json.number'],
                    [/\b(true|false|null)\b/, 'keyword'],
                    [/./, ''] // 默认不染色
                ],
                // ====================== JSON 解析状态 ======================
                jsonState: [
                    // 对象键（带引号）
                    [/"([^"\\]|\\.)*"/, 'json.key'], 
                    
                    // 冒号键值分隔符
                    [/:/, 'delimiter.json'], 
                    
                    // 值类型匹配
                    { include: '@jsonValues' }, 
                    
                    // 对象/数组括号
                    [/[{}]/, '@brackets.delimiter.curly'], 
                    [/[\[\]]/, '@brackets.delimiter.square'],
                    
                    // 逗号分隔符
                    [/,/, 'delimiter.json'],
                    
                    // 空白跳过
                    [/\s+/, 'whiteSpace.json']
                ],
                
                // JSON 值类型子规则
                jsonValues: [
                    // 字符串
                    [/(:\/?)"([^"\\]|\\.)*"/, 'json.string'],
                    [/'([^'\\]|\\.)*'/, 'json.literal'],
                    
                    // 数字
                    [/-?\d+\.?\d*([eE][+-]?\d+)?/, 'json.number'],
                    
                    // 布尔和 null
                    [/\b(true|false|null)\b/, 'json.literal'],
                    
                    // 嵌套对象/数组
                    [/[{\[]/, { token: '@brackets', next: '@jsonState' }],
                    [/[}\]]/, { token: '@brackets', next: '@pop' }]
                ],
                comment: [
                    [/--\>/, 'comment.hvml', '@pop'],      // 结束标记类型为 custom-info
                    [/[^-]+/, 'comment.hvml'],           // 内容类型为 comment.hvml
                    [/-/, 'comment.hvml']                // 短横线类型为 comment.hvml
                ]
        },
    },
    defineTheme : {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // 括号层级颜色
            { token: 'delimiter.bracket.level1', foreground: '#FF00FF' }, // 洋红色
            { token: 'delimiter.bracket.level2', foreground: '#FFFF00' }, // 亮黄色
            { token: 'delimiter.bracket.level3', foreground: '#009FFF' }, // 亮蓝色
            { token: 'error.unclosed', foreground: '#0000FF' }, // 红色
            // JSON 特定颜色
            { token: 'json.key', foreground: '#CE9178' },
            { token: 'json.string', foreground: '#9CDCFE' },
            { token: 'json.number', foreground: '#B5CEA8' },
            { token: 'json.literal', foreground: '#569CD6' },
            { token: 'delimiter.json', foreground: '#D4D4D4' },
            //基础文本
            { token: 'invalid',foreground:'#E0E0E0'},
            // hvml 标签名（蓝色）
            { token: 'tag', foreground: '#569CD6' },
            // 属性名（浅橙色）CE9178
            { token: 'attribute.name.hvml', foreground: '#9CDCFE'},
            // 属性值（浅蓝色）9CDCFE
            { token: 'attribute.value.hvml', foreground: '#CE9178' },
            // 注释（绿色）
            { token: 'comment.hvml', foreground: '#60AA4E' },
            // 文档声明（紫色）
            { token: 'doctype.hvml', foreground: '#C586C0' },
            // 符号（浅黄色）
            { token: 'delimiter.hvml', foreground: '#C4C4C4' },
            // 自定义关键字（粉色）
            { token: 'keyword.custom', foreground: '#569CD6' },
            // 字符串（浅蓝色）
            { token: 'string.hvml', foreground: '#CE9178' },
            // 错误标记（红色）
            { token: 'error.custom', foreground: '#FF5252' },
            { token: 'variable.simple', foreground: '#4EC9B0' },  // 浅蓝色
            { token: 'variable.expression', foreground: '#1EFEB0' }, // 青色
            { token: 'delimiter.bracket', foreground: '#C4C4C4' },  // 符号颜色
        ],
        colors: {
            'editor.foreground': '#D4D4D4',
            'editor.background': '#1E1E1E'
        }
        //联想的一些选项

    },
    registerCompletionItemProvider : {
        triggerCharacters: ['<', ' ','('], // 触发补全的字符
        provideCompletionItems: function(model, position) {
            // 获取当前行的文本直到光标位置
            const lineUntil = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });
            // 1. 匹配日志类型（如[error]、[notice]）
            const logTypeMatch = lineUntil.match(/<([a-z]*)$/i);
            if (logTypeMatch) {
                return {
                    suggestions: [
                        {
                            label: '!DOCTYPE',
                            kind: monaco.languages.CompletionItemKind.Enum,
                            insertText: '!DOCTYPE hvml>',
                            detail: '通知日志级别'
                        }
                    ]
                };
            }
        }
    },
    setLanguageConfiguration : {
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
            { open: "<!--", close: "-->" }
        ],
        surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
            { open: "<!--", close: "-->" }
        ]
    },
    theme : "myDarkTheme",
    language : "hvml"
}

