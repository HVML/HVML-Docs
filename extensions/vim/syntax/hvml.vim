" Vim syntax file
" Language: HVML
" Maintainer: Vincent Wei <vincent@minigui.org>
" Last Change: 2025 Mar. 28

" quit when a syntax file was already loaded
if exists("b:current_syntax")
  finish
endif

if !exists("main_syntax")
  let main_syntax = 'html'
endif

runtime! syntax/html.vim
unlet b:current_syntax

syn case match

syn match   shTodo          contained "\<\%(COMBAK\|FIXME\|TODO\|XXX\)\ze:\=\>"
syn match   shQuickComment  /^#.*/ contains=shTodo,@Spell

syn region  hvmlString  start=+"""+ end=+"""+me=s-1 contains=hvmlExpression,hvmlCompoundExpression,@htmlPreproc
syn region  hvmlString  start=+'''+ end=+'''+
syn region  hvmlString  start=/"/ skip=/\\"/ end=/"/  oneline
syn region  hvmlString  start=/'/ skip=/\\'/ end=/'/  oneline

syn match   hvmlCtxVariableInTag contained /\$\d*[@?!^:=%~<]/
syn match   hvmlExpression  "\$.*" contained contains=Identifier,hvmlCtxVariableInTag,hvmlString,htmlString,hvmlCompoundExpression
syn match   hvmlCEOperatorAnd  "&&" contained
syn match   hvmlCEOperatorOR   "||" contained
syn region  hvmlCompoundExpression start=+{{+ end=+}}+ contains=hvmlExpression,hvmlCEOperatorAnd,hvmlCEOperatorOR,hvmlCompoundExpression
syn match   hvmlValue   contained "=[\t ]*[^'" \t>][^ \t>]*"hs=s+1   contains=javaScriptExpression,@htmlPreproc

syn region  hvmlEndTag  start=+</+      end=+>+ contains=hvmlTagN,htmlTagError
syn region  hvmlTag     start=+<[^/]+   end=+>+ fold contains=hvmlTagN,htmlString,hvmlString,hvmlPrepArg,hvmlValue,hvmlAdvArg,hvmlCtxVariableInTag,htmlTagError,@htmlPreproc,@htmlArgCluster
syn match   hvmlTagN    contained +<\s*[-a-zA-Z0-9]\++hs=s+1 contains=htmlTagName,hvmlTagName,hvmlActionTagName,@hvmlTagNameCluster
syn match   hvmlTagN    contained +</\s*[-a-zA-Z0-9]\++hs=s+2 contains=htmlTagName,hvmlTagName,hvmlActionTagName,@hvmlTagNameCluster

" syn region hvmlVariable contained start=/\$/me=e+1 end=/[\s\.]/me=s-1
" syn region hvmlContent  start=/\>/rs=e+1 end=/</re=s-1 contains=Identifier,hvmlString,hvmlCompoundExpression

" syntax match hvmlSysVariable    /\$\<\h\u\+\>/
syn match hvmlUsrVariable    /\$\<\h\w\+\>/
syn match hvmlCtxVariable    /\$\d*[@?!^:=%~<]/
syn match hvmlProperty       /\.\<\h\w\+\>/
syn match hvmlNumber        "\<\d\+\>#\="
syn match hvmlNumber        "\<\d\+L\>#\="
syn match hvmlNumber        "\<\d\+UL\>#\="
syn match hvmlNumber        "\<-\=\.\=\d\+\>#\="
syn match hvmlNumber        "\<-\=\.\=\d\+FL\>#\="

syn region hvmlGetterCall  start=/\.\<\h\w\+\>\s\+(/rs=e+1  end=/)/re=s-1 contains=hvmlUserVariable,hvmlString,hvmlCompoundExpression,hvmlGetterCall,hvmlSetterCall
syn region hvmlSetterCall  start=/\.\<\h\w\+\>\s\+(!/rs=e+1 end=/)/re=s-1 contains=hvmlUserVariable,hvmlString,hvmlCompoundExpression,hvmlGetterCall,hvmlSetterCall

" HVML tag names
syn keyword hvmlTagName contained hvml archetype archedata error except

" HVML tag names
syn keyword hvmlActionTagName contained init update erase clear test match differ
syn keyword hvmlActionTagName contained choose iterate reduce sort define include
syn keyword hvmlActionTagName contained observe forget fire call return
syn keyword hvmlActionTagName contained bind catch back request load exit inherit sleep

syn keyword hvmlPrepArg contained in on from via for as at with to by against within onto onlyif idd-by
syn keyword hvmlAdvArg  contained synchronously asynchronously exclusively uniquely individually wholly once casesensitively caseinsensitively ascendingly descendingly silently temporarily nosetotail responsively noreturn concurrently constantly must-yield
syn keyword hvmlAdvArg  contained sync async excl uniq indv case caseless asc desc temp nose-to-tail resp no-return conc const

" The default highlighting.
hi def link shTodo              Todo
hi def link shQuickComment      Comment

hi def link hvmlTag             Delimiter
hi def link hvmlEndTag          Delimiter
hi def link hvmlPrepArg         Operator
hi def link hvmlAdvArg          Exception
hi def link hvmlString          String
hi def link hvmlActionTagName   Include
hi def link hvmlTagName         htmlTagName

hi def link hvmlExpression          Function
hi def link hvmlExpressionIn        Function
hi def link hvmlCompoundExpression  Statement
hi def link hvmlUsrVariable         Identifier
hi def link hvmlCtxVariable         Identifier
hi def link hvmlProperty            Identifier
hi def link hvmlCtxVariableInTag    Special
hi def link hvmlNumber              Number
" hi def link hvmlContent             Special

let b:current_syntax = "hvml"

