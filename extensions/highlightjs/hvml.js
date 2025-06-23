hljs.registerLanguage("hvml", function (hljs) {
  const regex = hljs.regex;
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
        className: "meta",
        begin: /<!DOCTYPE/,
        end: />/,
        relevance: 10,
        contains: [
          {
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
          },
          {
            className: "variable.constant",
            begin: /[A-Z_][A-Z0-9_]+/, // 全大写的常量
            relevance: 10,
          },
        ],
      },
      hljs.HASH_COMMENT_MODE, // # 注释
      //hljs.C_LINE_COMMENT_MODE, // // 注释
      //hljs.C_BLOCK_COMMENT_MODE, // /* 注释 */
      hljs.COMMENT(/<!--/, /-->/, { relevance: 10 }),
      hljs.QUOTE_STRING_MODE, // 支持字符串高亮
      hljs.C_LINE_COMMENT_MODE, // 支持单行注释
      hljs.C_NUMBER_MODE, // 通用数字
      {
        className: "number",
        begin: "\\b(0b[01]+)", // 二进制
      },
      {
        className: "variable",
        begin: /\$[a-zA-Z_][a-zA-Z0-9_]*/, // 匹配$开头的变量
      },
      {
        className: "variable.constant",
        begin: /[A-Z_][A-Z0-9_]+/, // 全大写的常量
        relevance: 10,
      },
      // open tag
      {
        className: "tag",
        begin: /</,
        end: /\/?>/,
        contains: [
          {
            className: "attr",
            begin: "([a-zA-Z-:@]+)(s*)(=)",
            relevance: 10,
          },
          {
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
          },
          // 内置函数
          /*
          {
            className: "built_in",
            begin: "\\b(" + KEYWORDS.built_in.split(" ").join("|") + ")\\b",
          },*/
        ],
      },
      // close tag
      {
        className: "tag",
        begin: /<\//,
        end: /\/?>/,
      },
    ],
  };
});
