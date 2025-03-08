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
syn match   shQuickComment  contained "^#.*$" contains=shTodo,@Spell

syn match   hvmlExpression  contained "\$.*" contains=Identifier,hvmlString,htmlString,hvmlCompoundExpression
syn region  hvmlCompoundExpression contained start=+{{+ end=+}}+ contains=hvmlExpression
syn region  hvmlString  contained start=+"""+ end=+"""+me=s-1 contains=htmlSpecialChar,hvmlExpression,@htmlPreproc
syn region  hvmlString  contained start=+'''+ end=+'''+ contains=htmlSpecialChar,@htmlPreproc
syn match   hvmlValue   contained "=[\t ]*[^'" \t>][^ \t>]*"hs=s+1   contains=javaScriptExpression,@htmlPreproc

syn region  hvmlEndTag  start=+</+      end=+>+ contains=hvmlTagN,htmlTagError
syn region  hvmlTag     start=+<[^/]+   end=+>+ fold contains=hvmlTagN,htmlString,hvmlString,hvmlPrepArg,hvmlValue,hvmlAdvArg,htmlTagError,@htmlPreproc,@htmlArgCluster
syn match   hvmlTagN    contained +<\s*[-a-zA-Z0-9]\++hs=s+1 contains=htmlTagName,hvmlTagName,hvmlActionTagName,@hvmlTagNameCluster
syn match   hvmlTagN    contained +</\s*[-a-zA-Z0-9]\++hs=s+2 contains=htmlTagName,hvmlTagName,hvmlActionTagName,@hvmlTagNameCluster

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

hi def link hvmlTag             Function
hi def link hvmlEndTag          Identifier
hi def link hvmlPrepArg         Type
hi def link hvmlAdvArg          Exception
hi def link hvmlString          String
hi def link hvmlActionTagName   Special
hi def link hvmlTagName         htmlTagName

hi def link hvmlExpression  Statement
hi def link hvmlCompoundExpression  Statement

let b:current_syntax = "hvml"

