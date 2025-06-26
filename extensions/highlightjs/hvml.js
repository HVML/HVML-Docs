hljs.registerLanguage("hvml", function (hljs) {
  const regex = hljs.regex;
  const MY_0B = {
    className: "number",
    begin: "\\b(0b[01]+)", // 二进制
  };
  const MY_0X = {
    className: "number",
    begin: "\\b(0x[0-9a-fA-F]+)", // 十六进制
  };
  const MY_STRING = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/,
      },
      {
        begin: /'/,
        end: /'/,
      },
    ],
  };
  const MY_STRING2 = {
    className: "string2",
    begin: /`/,
    end: /`/,
  };
  const MY_VAR_CON = {
    className: "variable.constant",
    begin: /[A-Z_][A-Z0-9_]+/,
    relevance: 10,
  };
  const MY_ATTR = {
    className: "attribute",
    begin: "([a-zA-Z-:@]+)(s*)(=?)",
    relevance: 10,
  };
  const MY_VAR_SIMPLE = {
    className: "variable-simple",
    begin: /\$([\@]*)([\?]*)[\w]*/,
  };
  const MY_BUILD_IN = {
    className: "build-in",
    begin: /\.[\w]+\(/,
    end: /\)/,
    contains: [
      MY_STRING,
      MY_STRING2,
      MY_VAR_CON,
      MY_ATTR,
      hljs.C_NUMBER_MODE,
      MY_0B,
      MY_0X,
    ],
  };
  const MY_SP_ATTR = {
    className: "attribute2",
    begin: /\{\{/,
    end: /\}\}/,
    contains: [
      MY_VAR_SIMPLE,
      MY_ATTR,
      MY_STRING,
      MY_STRING2,
      MY_BUILD_IN,
      hljs.C_NUMBER_MODE,
      MY_0B,
      MY_0X,
    ],
  };
  //brace loop
  const level1 = {
    begin: /\{|\[|\(/,
    end: /\}|\]|\)/,
    className: "brace-level-1",
    contains: [
      MY_ATTR,
      MY_STRING,
      MY_STRING2,
      MY_SP_ATTR,
      MY_VAR_SIMPLE,
      MY_BUILD_IN,
      hljs.C_NUMBER_MODE,
      MY_0B,
      MY_0X,
    ],
  };

  const level2 = {
    begin: /\{|\[|\(/,
    end: /\}|\]|\)/,
    className: "brace-level-2",
    contains: [
      MY_ATTR,
      MY_STRING,
      MY_STRING2,
      MY_SP_ATTR,
      MY_VAR_SIMPLE,
      MY_BUILD_IN,
      hljs.C_NUMBER_MODE,
      MY_0B,
      MY_0X,
    ],
  };

  const level3 = {
    begin: /\{|\[|\(/,
    end: /\}|\]|\)/,
    className: "brace-level-3",
    contains: [
      MY_ATTR,
      MY_STRING,
      MY_STRING2,
      MY_SP_ATTR,
      MY_VAR_SIMPLE,
      MY_BUILD_IN,
      hljs.C_NUMBER_MODE,
      MY_0B,
      MY_0X,
    ],
  };

  // 建立嵌套关系
  level1.contains.push(level2);
  level2.contains.push(level3);
  level3.contains.push(level1); // 循环回第一层

  /*
  const KEYWORDS = {
    keyword:
      "hvml head body init iterate test catch except update clear define include",
    literal: "true false null",
    built_in: "append prepend replace merge remove",
  };*/

  return {
    keywords: {
      keyword: "hvml if else while for return",
      literal: "true false null",
    },
    contains: [
      // DOCTYPE
      {
        className: "doctype",
        begin: "<!DOCTYPE",
        end: ">",
        relevance: 10,
        contains: [MY_STRING, MY_VAR_CON],
      },
      hljs.HASH_COMMENT_MODE, // # 注释
      //hljs.C_LINE_COMMENT_MODE, // // 注释
      //hljs.C_BLOCK_COMMENT_MODE, // /* 注释 */
      hljs.COMMENT(/<!--/, /-->/, { relevance: 10 }),
      hljs.QUOTE_STRING_MODE, // 支持字符串高亮
      hljs.C_LINE_COMMENT_MODE, // 支持单行注释
      hljs.C_NUMBER_MODE, // 通用数字
      MY_0B,
      MY_0X,
      MY_VAR_SIMPLE,
      MY_BUILD_IN,
      MY_VAR_CON,
      // open tag1
      {
        className: "active-tag",
        begin:
          /<(init|update|erase|clear|test|match|differ|choose|iterate|reduce|sort|define|execute|observe|forget|fire|call|return|bind|catch|back|request|load|exit|inherit|sleep|adapt)/,
        end: /\/?>/,
        contains: [
          {
            className: "adverb",
            begin:
              /(s*)(ascendingly|asc|descendingly|desc|synchronously|sync|asynchronously|async|exclusively|excl|uniquely|uniq)(s*)/,
          },
          MY_ATTR,
          MY_STRING,
          MY_STRING2,
          MY_SP_ATTR,
          MY_VAR_SIMPLE,
          MY_BUILD_IN,
          hljs.C_NUMBER_MODE, // 通用数字
          MY_0B,
          MY_0X,
        ],
      },
      // open tag2
      {
        className: "tag",
        begin: /<[a-zA-Z_][a-zA-Z0-9_]*/,
        end: /\/?>/,
        contains: [
          MY_ATTR,
          MY_STRING,
          MY_STRING2,
          MY_SP_ATTR,
          MY_VAR_SIMPLE,
          MY_BUILD_IN,
          hljs.C_NUMBER_MODE, // 通用数字
          MY_0B,
          MY_0X,
        ],
      },
      // close tag1
      {
        className: "active-tag",
        begin:
          /<\/(init|update|erase|clear|test|match|differ|choose|iterate|reduce|sort|define|execute|observe|forget|fire|call|return|bind|catch|back|request|load|exit|inherit|sleep|adapt)/,
        end: />/,
      },
      // close tag2
      {
        className: "tag",
        begin: /<\/[a-zA-Z_][a-zA-Z0-9_]*/,
        end: /\/?>/,
      },
      MY_SP_ATTR,
      level1,
    ],
  };
});
