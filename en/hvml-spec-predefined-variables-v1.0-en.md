# HVML Predefined Variables

Subject: HVML Predefined Variables  
Version: 1.0-RCb  
Author: Vincent Wei  
Category: Language Specification  
Creation Date: Nov. 1, 2021  
Last Modified Date: Apr. 30, 2023  
Status: Release Candidate  
Release Name: 硕鼠  
Language: Chinese

*Copyright Notice*

Copyright &copy; 2021, 2022, 2023 Vincent Wei 
Copyright &copy; 2021, 2022, 2023 Beijing Feynman Software Technology Co., Ltd.
all rights reserved

This document is not governed by the HVML-related software open source license.

The copyright owner discloses the purpose of this document, which is used to explain HVML-related design principles or related specifications to developers. Without the written permission of the copyright owner, no one may reproduce or distribute all or part of this document, or use the technical ideas described in this document to apply for patents, write academic papers, etc.

For a detailed list of registered trademarks or trademarks of the copyright owners mentioned in this article, please refer to the end of the document.

**Content**

[//]:# (START OF TOC)

- [1) Introduction] (#1-introduction)
    + [1.1) Specifications and Terms](#11-specifications and terms)
    + [1.2) Binary Format Representation](#12-binary format representation)
    + [1.3) Format Modifiers](#13-format modifiers)
    + [1.4) Writing Requirements](#14-writing requirements)
- [2) Non-Dynamic Variables] (#2-non-dynamic variables)
    + [2.1) `TIMERS`](#21-timers)
       * [2.1.1) Add Timers in Batches](#211-add timers in batches)
       * [2.1.2) Add a Timer](#212-add a timer)
       * [2.1.3) Remove a Timer] (#213-remove a timer)
       * [2.1.4) Modify Specific Timer Property] (#214-modify specific timer property)
    + [2.2) `REQ`](#22-req)
- [3) Required Dynamic Variables] (#3-required dynamic variables)
    + [3.1) `SYS`](#31-sys)
       * [3.1.1) `const` Method] (#311-const-method)
       * [3.1.2) `uname` Method] (#312-uname-method)
       * [3.1.3) `uname_prt` Method] (#313-uname_prt-method)
       * [3.1.4) `locale` Method](#314-locale-method)
       * [3.1.5) `time` Method] (#315-time-method)
       * [3.1.6) `time_us` Method] (#316-time_us-method)
       * [3.1.7) `sleep` Method] (#317-sleep-method)
       * [3.1.8) `timezone` Method] (#318-timezone-method)
       * [3.1.9) `cwd` Method] (#319-cwd-method)
       * [3.1.10) `env` Method] (#3110-env-method)
       * [3.1.11) `random_sequence` Method] (#3111-random_sequence-method)
       * [3.1.12) `random` Method] (#3112-random-method)
    + [3.2) `RUNNER`](#32-runner)
       * [3.2.1) `app_name` Property] (#321-app_name-property)
       * [3.2.2) `run_name` Property] (#322-run_name-property)
       * [3.2.3) `rid` Attribute] (#323-rid-attribute)
       * [3.2.4) `uri` Attribute] (#324-uri-attribute)
       * [3.2.5) `myObj` Static Property] (#325-myobj-static-properties)
       * [3.2.6) `user` Attribute] (#326-user-attribute)
       * [3.2.7) The `chan` Method] (#327-chan-method)
          - [3.2.7.1) `send` Method of Channel Entity] (#3271-channel-entity-send-method)
          - [3.2.7.2) `recv` Method of Channel Entity] (#3272-channel-entity-recv-method)
          - [3.2.7.3) `cap` Property of Channel Entity] (#3273-cap-property of channel entity)
          - [3.2.7.4) `len` Property of Channel Entity] (#3274--len-property of channel entity)
          - [3.2.7.5) Events on Channel entity] (#3275-Events on channel entity)
    + [3.3) `CRTN`](#33-crtn)
       * [3.3.1) `target` Property] (#331-target-property)
       * [3.3.2) `base` Attribute] (#332-base-attribute)
       * [3.3.3) `max_iteration_count` Property] (#333-max_iteration_count-property)
       * [3.3.4) `max_recursion_depth` Property] (#334-max_recursion_depth-property)
       * [3.3.5) `max_embedded_levels` Property] (#335-max_embedded_levels-property)
       * [3.3.6) `timeout` Property] (#336-timeout-property)
       * [3.3.7) `cid` Attribute] (#337-cid-attribute)
       * [3.3.8) `token` Attribute] (#338-token-attribute)
       * [3.3.9) `uri` Attribute] (#339-uri-attribute)
       * [3.3.10) `curator` Property] (#3310-curator-property)
       * [3.3.11) `native_crtn` Method] (#3311-native_crtn-method)
       * [3.3.12) `static` Attribute] (#3312-static-attributes)
       * [3.3.13) `temp` Attribute] (#3313-temp-attribute)
    + [3.4) `DOC`](#34-doc)
       * [3.4.1) `doctype` Method] (#341-doctype-method)
       * [3.4.2) `select` Method] (#342-select-method)
       * [3.4.3) `query` Method] (#343-query-method)
       * [3.4.4) Element Collection Entity] (#344-element collection entity)
    + [3.5) `RDR`](#35-rdr)
       * [3.5.1) `state` Attribute] (#351-state-attribute)
       * [3.5.2) `connect` Method] (#352-connect-method)
       * [3.5.3) `disconn` Method] (#353-disconn-method)
    + [3.6) `DATETIME`](#36-datetime)
       * [3.6.1) `time_prt` Method] (#361-time_prt-method)
       * [3.6.2) `utctime` Method] (#362-utctime-method)
       * [3.6.3) `localtime` Method](#363-localtime-method)
       * [3.6.4) `mktime` Method] (#364-mktime-method)
       * [3.6.5) `fmttime` Method] (#365-fmttime-method)
       * [3.6.6) `fmtbdtime` Method](#366-fmtbdtime-method)
    + [3.7) `DATA`](#37-data)
       * [3.7.1) `type` Method] (#371-type-method)
       * [3.7.2) `size` Method] (#372-size-method)
       * [3.7.3) `count` Method] (#373-count-method)
       * [3.7.4) `numerify` Method] (#374-numerify-method)
       * [3.7.5) `booleanize` Method] (#375-booleanize-method)
       * [3.7.6) `stringify` Method] (#376-stringify-method)
       * [3.7.7) `serialize` Method] (#377-serialize-method)
       * [3.7.8) `sort` Method] (#378-sort-method)
       * [3.7.9) `shuffle` Method] (#379-shuffle-method)
       * [3.7.10) `compare` Method] (#3710-compare-method)
       * [3.7.11) `parse` Method] (#3711-parse-method)
       * [3.7.12) `isequal` Method] (#3712-isequal-method)
       * [3.7.13) `fetchstr` Method] (#3713-fetchstr-method)
       * [3.7.14) `fetchreal` Method] (#3714-fetchreal-method)
       * [3.7.15) `crc32` Method] (#3715-crc32-method)
       * [3.7.16) `md5` Method] (#3716-md5-method)
       * [3.7.17) `sha1` Method] (#3717-sha1-method)
       * [3.7.18) `pack` Method] (#3718-pack-method)
       * [3.7.19) `unpack` Method] (#3719-unpack-method)
       * [3.7.20) `bin2hex` Method] (#3720-bin2hex-method)
       * [3.7.21) `hex2bin` Method] (#3721-hex2bin-method)
       * [3.7.22) `base64_encode` Method] (#3722-base64_encode-method)
       * [3.7.23) `base64_decode` Method] (#3723-base64_decode-method)
       * [3.7.24) `arith` Method] (#3724-arith-method)
       * [3.7.25) `bitwise` Method] (#3725-bitwise-method)
       * [3.7.26) `contains` Method] (#3726-contains-method)
       * [3.7.27) `has` Method] (#3727-has-method)
	+ [3.8) `L`](#38-l)
       * [3.8.1) `not` Method] (#381-not-method)
       * [3.8.2) `and` Method] (#382-and-method)
       * [3.8.3) `or` Method] (#383-or-method)
       * [3.8.4) `xor` Method] (#384-xor-method)
       * [3.8.5) `eq` Method] (#385-eq-method)
       * [3.8.6) `ne` Method] (#386-ne-method)
       * [3.8.7) `gt` Method] (#387-gt-method)
       * [3.8.8) `ge` Method] (#388-ge-method)
       * [3.8.9) `lt` Method] (#389-lt-method)
       * [3.8.10) `le` Method] (#3810-le-method)
       * [3.8.11) `streq` Method] (#3811-streq-method)
       * [3.8.12) `strne` Method] (#3812-strne-method)
       * [3.8.13) `strgt` Method] (#3813-strgt-method)
       * [3.8.14) `strge` Method] (#3814-strge-method)
       * [3.8.15) `strlt` Method] (#3815-strlt-method)
       * [3.8.16) `strle` Method] (#3816-strle-method)
       * [3.8.17) `eval` Method] (#3817-eval-method)
    + [3.9) `T`](#39-t)
       * [3.9.1) `map` Static Property] (#391-map-static-property)
       * [3.9.2) `get` Method] (#392-get-method)
    + [3.10) `STR`](#310-str)
       * [3.10.1) `contains` Method] (#3101-contains-method)
       * [3.10.2) `starts_with` Method] (#3102-starts_with-method)
       * [3.10.3) `ends_with` Method] (#3103-ends_with-method)
       * [3.10.4) `explode` Method] (#3104-explode-method)
       * [3.10.5) `implode` Method] (#3105-implode-method)
       * [3.10.6) `shuffle` Method] (#3106-shuffle-method)
       * [3.10.7) `replace` Method] (#3107-replace-method)
       * [3.10.8) `format_c` Method] (#3108-format_c-method)
       * [3.10.9) `scan_c` Method] (#3109-scan_c-method)
       * [3.10.10) `format_p` Method] (#31010-format_p-method)
       * [3.10.11) `scan_p` Method] (#31011-scan_p-method)
       * [3.10.12) `join` Method] (#31012-join-method)
       * [3.10.13) `nr_bytes` Method] (#31013-nr_bytes-method)
       * [3.10.14) `nr_chars` Method] (#31014-nr_chars-method)
       * [3.10.15) `tolower` Method] (#31015-tolower-method)
       * [3.10.16) `toupper` Method] (#31016-toupper-method)
       * [3.10.17) `substr` Method] (#31017-substr-method)
       * [3.10.18) `substr_compare` Method] (#31018-substr_compare-method)
       * [3.10.19) `substr_count` Method] (#31019-substr_count-method)
       * [3.10.20) `substr_replace` Method] (#31020-substr_replace-method)
       * [3.10.21) `strstr` Method] (#31021-strstr-method)
       * [3.10.22) `strpos` Method] (#31022-strpos-method)
       * [3.10.23) `strpbrk` Method] (#31023-strpbrk-method)
       * [3.10.24) `split` Method] (#31024-split-method)
       * [3.10.25) `chunk_split` Method] (#31025-chunk_split-method)
       * [3.10.26) `trim` Method] (#31026-trim-method)
       * [3.10.27) `pad` Method] (#31027-pad-method)
       * [3.10.28) `repeat` Method] (#31028-repeat-method)
       * [3.10.29) `reverse` Method] (#31029-reverse-method)
       * [3.10.30) `tokenize` Method] (#31030-tokenize-method)
       * [3.10.31) `translate` Method] (#31031-translate-method)
       * [3.10.32) `htmlentities_encode` Method] (#31032-htmlentities_encode-method)
       * [3.10.33) `htmlentities_decode` Method](#31033-htmlentities_decode-method)
       * [3.10.34) `nl2br` Method] (#31034-nl2br-method)
       * [3.10.35) `rot13` Method] (#31035-rot13-method)
       * [3.10.36) `count_chars` Method] (#31036-count_chars-method)
       * [3.10.37) `count_bytes` Method] (#31037-count_bytes-method)
	+ [3.11) `URL`](#311-url)
       * [3.11.1) `encode` Method] (#3111-encode-method)
       * [3.11.2) `decode` Method] (#3112-decode-method)
       * [3.11.3) `build_query` Method] (#3113-build_query-method)
       * [3.11.4) `parse_query` Method] (#3114-parse_query-method)
       * [3.11.5) `parse` Method] (#3115-parse-method)
       * [3.11.6) `assemble` Method] (#3116-assemble-method)
    + [3.12) `STREAM`](#312-stream)
       * [3.12.1) `open` Method] (#3121-open-method)
          - [3.12.1.1) `readstruct` Method of Stream Entity] (#31211-stream-entity-readstruct-method)
          - [3.12.1.2) `writestruct` Method of Stream Entity] (#31212--writestruct-method of stream entity)
          - [3.12.1.3) `readlines` Method of Stream Entity] (#31213--readlines-method of stream entity)
          - [3.12.1.4) `writelines` Method for Stream Entities] (#31214--writelines-method for stream entities)
          - [3.12.1.5) `readbytes` Method of Stream Entity] (#31215-stream-entity-readbytes-method)
          - [3.12.1.6) `writebytes` Method of Stream Entity] (#31216--writebytes-method of stream entity)
          - [3.12.1.7) `seek` Method of Stream Entity] (#31217--seek-method of stream entity)
       * [3.12.2) `close` Method] (#3122-close-method)
       * [3.12.3) `stdin` Static Attribute] (#3123-stdin-static-attribute)
       * [3.12.4) `stdout` Static Attribute] (#3124-stdout-static-attribute)
       * [3.12.5) `stderr` Static Attribute] (#3125-stderr-static-attribute)
       * [3.12.6) `pipe` Stream Entity] (#3126-pipe-stream-entity)
    + [3.13) `SOCK`](#313-sock)
       * [3.13.1) `stream` Method] (#3131-stream-method)
       * [3.13.2) `dgram` Method] (#3132-dgram-method)
          - [3.13.2.1) `accept` Method of Stream-Socket Entity] (#31321--accept-method of stream-socket entity)
          - [3.13.2.2) `send` Method of Stream-Socket Entity] (#31322--send-method of stream-socket entity)
          - [3.13.2.3) `recv` Method for Stream-Socket Entity] (#31323--recv-method for stream-socket entity)
          - [3.13.2.4) `close` Method of Stream-Socket Entity] (#31324--close-method of stream-socket entity)
          - [3.13.2.5) `peer` Attribute for Stream-Socket entities] (#31325 - -peer-attribute for stream-socket entities)
          - [3.13.2.6) `send` Method of Datagram-Socket Entity] (#31326--send-method of datagram-socket entity)
          - [3.13.2.7) `recv` Method of Datagram-Socket Entity] (#31327--recv-method of datagram-socket entity)
          - [3.13.2.8) `close` Method of Datagram-Socket Entity] (#31328--close-method of datagram-socket entity)
- [4) Optional Dynamic Variables] (#4-optional dynamic variables)
    + [4.1) `MATH`](#41-math)
       * [4.1.1) `pi` Method] (#411-pi-method)
       * [4.1.2) `e` Method] (#412-e-method)
       * [4.1.3) `const` Method] (#413-const-methods)
       * [4.1.4) `add` Method] (#414-add-method)
       * [4.1.5) The `sub` Method] (#415-sub-method)
       * [4.1.6) `mul` Method] (#416-mul-method)
       * [4.1.7) `div` Method] (#417-div-method)
       * [4.1.8) `eval` and `eval_l` Methods] (#418-eval-and-eval_l-methods)
       * [4.1.9) `sin` and `sin_l` Methods] (#419-sin-and-sin_l-methods)
       * [4.1.10) `cos` and `cos_l` Methods] (#4110-cos-and-cos_l-methods)
       * [4.1.11) `tan` and `tan_l` Methods] (#4111-tan-and-tan_l-methods)
       * [4.1.12) `sinh` and `sinh_l` Methods] (#4112-sinh-and-sinh_l-methods)
       * [4.1.13) `cosh` and `cosh_l` Methods] (#4113-cosh-and-cosh_l-methods)
       * [4.1.14) `tanh` and `tanh_l` Methods] (#4114-tanh-and-tanh_l-methods)
       * [4.1.15) `asin` and `asin_l` Methods] (#4115-asin-and-asin_l-methods)
       * [4.1.16) `acos` and `acos_l` Methods] (#4116-acos-and-acos_l-methods)
       * [4.1.17) `atan` and `atan_l` Methods] (#4117-atan-and-atan_l-methods)
       * [4.1.18) `asinh` and `asinh_l` Methods] (#4118-asinh-and-asinh_l-methods)
       * [4.1.19) `acosh` and `acosh_l` Methods] (#4119-acosh-and-acosh_l-methods)
       * [4.1.20) `atanh` and `atanh_l` Methods] (#4120-atanh-and-atanh_l-methods)
       * [4.1.21) `fmod` and `fmod_l` Methods] (#4121-fmod-and-fmod_l-methods)
       * [4.1.22) `fabs` Method] (#4122-fabs-method)
       * [4.1.23) `log` and `log_l` Methods] (#4123-log-and-log_l-methods)
       * [4.1.24) `log10` and `log10_l` Methods] (#4124-log10-and-log10_l-methods)
       * [4.1.25) `pow` and `pow_l` Methods] (#4125-pow-and-pow_l-methods)
       * [4.1.26) `exp` and `exp_l` Methods] (#4126-exp-and-exp_l-methods)
       * [4.1.27) `floor` and `floor_l` Methods] (#4127-floor-and-floor_l-methods)
       * [4.1.28) `ceil` and `ceil_l` Methods] (#4128-ceil-and-ceil_l-methods)
       * [4.1.29) `sqrt` and `sqrt_l` Methods] (#4129-sqrt-and-sqrt_l-methods)
	+ [4.2) `FS`](#42-fs)
       * [4.2.1) `list` Method] (#421-list-method)
       * [4.2.2) `list_prt` Method] (#422-list_prt-method)
       * [4.2.3) `basename` Method] (#423-basename-method)
       * [4.2.4) `chgrp` Method] (#424-chgrp-method)
       * [4.2.5) `chmod` Method] (#425-chmod-method)
       * [4.2.6) `chown` Method] (#426-chown-method)
       * [4.2.7) `copy` Method] (#427-copy-method)
       * [4.2.8) `dirname` Method] (#428-dirname-method)
       * [4.2.9) `disk_usage` Method] (#429-disk_usage-method)
       * [4.2.10) `file_exists` Method] (#4210-file_exists-method)
       * [4.2.11) `file_is` Method] (#4211-file_is-method)
       * [4.2.12) `lchgrp` Method] (#4212-lchgrp-method)
       * [4.2.13) `lchown` Method] (#4213-lchown-method)
       * [4.2.14) `linkinfo` Method] (#4214-linkinfo-method)
       * [4.2.15) `lstat` Method] (#4215-lstat-method)
       * [4.2.16) `link` Method] (#4216-link-method)
       * [4.2.17) `mkdir` Method] (#4217-mkdir-method)
       * [4.2.18) `pathinfo` Method] (#4218-pathinfo-method)
       * [4.2.19) `readlink` Method] (#4219-readlink-method)
       * [4.2.20) `realpath` Method] (#4220-realpath-method)
       * [4.2.21) `rename` Method] (#4221-rename-method)
       * [4.2.22) `rmdir` Method] (#4222-rmdir-method)
       * [4.2.23) `stat` Method] (#4223-stat-method)
       * [4.2.24) `symlink` Method] (#4224-symlink-method)
       * [4.2.25) `tempname` Method] (#4225-tempname-method)
       * [4.2.26) `touch` Method] (#4226-touch-method)
       * [4.2.27) `umask` Method] (#4227-umask-method)
       * [4.2.28) `unlink` Method] (#4228-unlink-method)
       * [4.2.29) `file_contents` Method] (#4229-file_contents-method)
       * [4.2.30) `opendir` Method] (#4230-opendir-method)
          - [4.2.30.1) `read` Method of Directory Stream Entity] (#42301--read-method of directory-stream entity)
          - [4.2.30.2) `rewind` Method of Directory Stream Entity] (#42302-rewind-method of directory-stream-entity)
       * [4.2.31) `closedir` Method] (#4231-closedir-method)
    + [4.3) `FILE`](#43-file)
       * [4.3.1) Text File] (#431-Text file)
          - [4.3.1.1) `txt.head` Method] (#4311-txthead-method)
          - [4.3.1.2) `txt.tail` Method] (#4312-txttail-method)
       * [4.3.2) Binary] (#432-binary)
          - [4.3.2.1) `bin.head` Method] (#4321-binhead-method)
          - [4.3.2.2) `bin.tail` Method] (#4322-bintail-method)
    + [4.4) `PY`](#44-py)
       * [4.4.1) `impl` Attribute] (#441-impl-attribute)
       * [4.4.2) `info` Attribute] (#442-info-attribute)
       * [4.4.3) `global` Attribute] (#443-global-attribute)
       * [4.4.4) `local` Attribute] (#444-local-attribute)
       * [4.4.5) `except` Attribute] (#445-except-attribute)
       * [4.4.6) `pythonize` Method] (#446-pythonize-method)
       * [4.4.7) `run` Method] (#447-run-method)
       * [4.4.8) `import` Method] (#448-import-method)
       * [4.4.9) `stringify` Method] (#449-stringify-method)
       * [4.4.10) `compile` Method] (#4410-compile-method)
          - [4.4.10.1) CPython Code Dynamic Object `entity` Attribute] (#44101-cpython-code-dynamic-object-entity-attribute)
          - [4.4.10.2) CPython Code Dynamic Object `local` Attribute] (#44102-cpython-code-dynamic-object-local-attribute)
          - [4.4.10.3) CPython Code Dynamic Object `eval` Method] (#44103-cpython-code-dynamic-object-eval-method)
- [Appendix](#Appendix)
    + [Appendix 1) Revision History] (#Appendix 1-Revision History)
       * [RCb) 230430] (#rcb-230430)
       * [RCa) 230331] (#rca-230331)
       * [RC9) 230131](#rc9-230131)
       * [RC8) 221231](#rc8-221231)
       * [RC7) 221130](#rc7-221130)
       * [RC6) 221031](#rc6-221031)
       * [RC5) 220901](#rc5-220901)
       * [RC4) 220701](#rc4-220701)
       * [RC3) 220601](#rc3-220601)
       * [RC2) 220501](#rc2-220501)
       * [RC1) 220401](#rc1-220401)
       * [BRC) 220201] (#brc-220201)
    + [Attachment 2) Contributor List](#attachment 2-contributor list)
    + [Appendix 3) Trademark Statement](#appendix 3-trademark statement)

[//]:# (END OF TOC)

## 1 Introduction

This document is part of the HVML specification, which is used to define in detail the predefined variables that HVML interpreters must support or optionally support.

### 1.1) Specifications and Terms

The technical specifications or terms followed by this document are listed below:

- HVML (Hybrid Virtual Markup Language), is a data-driven programmable markup language proposed by [Wei Yongming] (https://github.com/VincentWei). The following parts of the [HVML Specification](hvml-spec-v1.0-zh.md) are relevant to this document:
   1. 2.1) Terms and Basic Principles
   1. 2.2) Description Syntax of Rules, Expressions and Methods
- Interpreter refers to computer software that parses and runs HVML programs.
- Renderer refers to computer software that renders the target document generated by the HVML coroutine and interacts with the user.
- Runner, each interpreter instance corresponds to a runner, and after connecting to the renderer, it corresponds to a renderer session.
- Static property refers to the property whose key value is ordinary data on an object, and its key value is not a dynamic value. We usually use lowercase camelCase to name such properties, such as `myObj`.
- Dynamic property refers to the property whose key value is a dynamic value on an object. On a dynamic property, we can usually provide a getter or a setter to get the current value of the property or change the value of the property The current value.
- Getter refers to a getter for a dynamic property. Calling the getter returns the method's dynamic property value.
- Setter refers to the setter of a dynamic property. Calling the setter of a specific method will complete the setting of the corresponding property.
- Method refers to the function call provided by the dynamic object. We usually use all-lowercase names connected by underscores, such as `starts_with`.

According to whether it contains dynamic objects or not, HVML predefined variables can be divided into:

1. Non-dynamic variables, that is, the data corresponding to variables does not provide dynamic methods. All non-dynamic variables defined by this specification are built-in and required.
1. Dynamic variable, that is, the data corresponding to the variable provides a dynamic method. Dynamic variable are further divided into required dynamic variable and optional dynamic variable. Usually, dynamic variable can be designed as loadable shared library or module. The interpreter shall implement dynamic variable as built-in or loadable according to the requirements of this document; whether optional dynamic variable are implemented as loadable is at the discretion of the interpreter.

According to the scope of data corresponding to variable, it can be divided into:

1. Walker-level variable. It means that the data corresponding to this variable is visible to all HVML coroutines in the current interpreter instance. That is, different coroutines in the same walker correspond to the same data copy.
1. Coroutine-level variable. It means that the data corresponding to this variable is only visible to a single HVML coroutine in the current interpreter instance. That is, different HVML coroutines have their own copy of the data.

It should be noted that the implementation of walker-level variable should consider thread safety and reentrancy in the case of multi-threading (when the interpreter runs as a process, each interpreter instance corresponds to an independent thread).

**Agreement**
The interpreter can implement global variable by itself. As a convention, the names of global variables implemented by the interpreter should start with ASCII U+005F LOW LINE (`_`), use all uppercase letters and add the interpreter prefix. Such as `_PURC_VAR`. For general variables, use all lowercase letters.

### 1.2) Binary Format Representation
In order to cooperate with the streaming read and write methods (`readstruct`, `writestruct`) and the numericalization of byte sequences required by stream entities, we define a binary format representation.

We use a string to represent each component in a binary structure, multiple components are separated by blank characters (spaces, tabs, newlines, etc.), each component uses a type string to represent its type, If it is an integer or floating point number larger than one byte, it can be followed by optional `le` or `be` to indicate little endian or big endian.

For example, `i32le s128 f64` represents a structure in which the first 4 bytes are a 32-bit integer stored in a small header, followed by a 128-byte string, and the last 8 bytes are a 64-bit floating point number. The structure is 140 bytes in total.

When performing numerical operations on byte sequences, we specify the binary format of the byte sequence through a single keyword, such as `i32le` means a 32-bit signed integer stored in a small endian.

The following table gives the type representation for the various structural components supported by this representation:

| Type | Representation method | Corresponding HVML data type |
| ---------------- | -------- | ----------------------- ----- |
| 1-byte integer | `i8[:<QUANTITY>]` | longint, array of longint |
| 2-byte integer | `i16[le/be][:<QUANTITY>]` | longint, array of longint |
| 4-byte integer | `i32[le/be][:<QUANTITY>]` | longint, array of longint |
| 8-byte integer | `i64[le/be][:<QUANTITY>]` | longint, array of longint |
| 1-byte unsigned integer | `u8[:<QUANTITY>]` | ulongint, array of ulongint |
| 2-byte unsigned integer | `u16[le/be][:<QUANTITY>]` | ulongint, array of ulongint |
| 4-byte unsigned integer | `u32[le/be][:<QUANTITY>]` | ulongint, array of ulongint |
| 8-byte unsigned integer | `u64[le/be][:<QUANTITY>]` | ulongint, array of ulongint |
| 2-byte float | `f16[le/be][:<QUANTITY>]` | number, array of numbers |
| 4-byte float | `f32[le/be][:<QUANTITY>]` | number, array of numbers |
| 8-byte float | `f64[le/be][:<QUANTITY>]` | number, array of numbers |
| 12-byte float | `f96[le/be][:<QUANTITY>]` | longdouble, array of longdouble |
| 16-byte long double precision | `f128[le/be][:<QUANTITY>]` | longdouble, array of longdouble |
| byte sequence | `bytes:<SIZE>` | bsequence; SIZE specifies the number of bytes. |
| UTF-8 encoded string | `utf8[:<SIZE>]` | string; SIZE optional: specify the number of bytes, if not specified, until the null character (0x00). |
| UTF-16 encoded string | `utf16[le/be][:<SIZE>]` | string; SIZE optional: specify the number of bytes, if not specified, until a null character (two consecutive 0x00 bytes) until. |
| UTF-32 encoded string | `utf32[le/be][:<SIZE>]` | string; SIZE optional: specify the number of bytes, if not specified, until a null character (four consecutive 0x00 bytes) until. |
| Padding | `padding:<SIZE>` | None, the specified number of bytes will be skipped; SIZE specifies the number of bytes. |

For integers and floating-point numbers with more than 8 bits, as well as UTF-16 and UTF-32 encodings, the following optional suffixes are used to indicate the size header:

| type | type flag |
| ---- | -------- |
| small head | le |
| big head | be |

When not specified, the default follows the current architecture.

Different types of representations:

| Type | Representation method | Remarks | Example |
| -------- | ------------------ | ------------------ ----------------------- | -------------------- |
| Numerical type | Type + big/small header | If no big or small header is specified, follow the current architecture | u16, u32be, u64le |
| Continuous numeric type | type + big/small header + number | If no big or small header is specified, it follows the current architecture, and the number refers to the value of this type of value, which must be greater than zero | u16:10, u32be:10 |
| byte sequence | type + length | | bytes:234 |
| UTF-8 encoded string | type + length / type | If the length is not specified, the length of the string will be automatically calculated (the data must contain byte zero indicating the end) | utf8, utf8:123 |
| UTF-16 encoded string | type + length / type | If the length is not specified, the length of the string will be automatically calculated (the data must contain sixteen zeros indicating the end) | utf16, utf16:120 |
| UTF-32 encoded string | type + length / type | If the length is not specified, the length of the string will be automatically calculated (the data must contain 32 zeros indicating the end) | utf32be, utf32be:120 |

Notice:

- Binary format keywords are case sensitive.
- Byte sequences, padding, and string lengths are all in bytes.
- We represent a structure as a string of components, separated by whitespace.

For example, `i32le utf8:128 f64` indicates that the components of a structure are as follows:

1. The first 4 bytes are a 32-bit integer, stored in small header;
1. Followed by a 128-byte UTF-8 encoded string;
1. The last 8 bytes are a 64-bit floating point number.

The structure has 140 bytes in total.

### 1.3) Format Modifiers

<https://www.php.net/manual/en/function.sprintf.php>

### 1.4) Writing Requirements

A method description should contain the following sections:

- `Description` (required): First follow [HVML Specification - 2.2.4) Description Syntax of Dynamic Object Method](/zh/hvml-spec-v1.0-zh.md#224-Description of Dynamic Object Method Syntax) The syntax defined gives the method's prototype, which includes a short description of the parameters and return value. Then give a short description of what the method does.
- `parameters` (optional). A full description of the method parameters is given if necessary.
- `Return Value` (optional). Give a full description of the method's return value if necessary.
- `Exceptions` (required). Lists the exceptions that may be thrown by this method.
- `Examples` (required).
- `See Also` (optional). List relevant external links.
- `Notes` (optional).

Certain methods can return values such as `false`, `undefined` to flag errors. This happens only if the current action element has the `silently` adverb attribute set and only ignorable exceptions are encountered. When a method is called on an element with the `silently` adverb attribute set, we say that the method is being asked to "evaluate silently". For methods that support silent evaluation, the description of their use refers to the following form:

> This method changes the current working directory. Return `true` on success; throw an exception on failure, or `false` for ignorable exceptions when evaluating silently.

## 2) Non-Dynamic variables

### 2.1) `TIMERS`

`TIMERS` is a coroutine-level built-in variable. This variable is a collection of objects (the `id` attribute of the object is used as a unique key value).

The attributes used to describe a timer object are as follows:

```js
{
     'id': <string: `the timer identifier, the key with unique restriction`>,
     'interval': <string: `the interval of the timer in milliseconds`>,
     'active': <string: `activated or not`>
}
```

This variable is used to define a timer, and no dynamic method is provided on it; the program modifies the container data corresponding to the variable through the `update` element to operate the timer.

#### 2.1.1) Add Timers in Batches

```html
     <update on "$TIMERS" to "unite">
         [
             { "id" : "foo", "interval" : 1000, "active" : "no" },
             { "id" : "bar", "interval" : 2000, "active" : "no" },
         ]
     </update>
```


#### 2.1.2) Add a Timer

```html
     <update on="$TIMERS" to="append">
         { "id" : "foobar", "interval" : 3000, "active" : "yes" }
     </update>
```

#### 2.1.3) Remove a Timer

```html
     <update on="$TIMERS" to="subtract">
         { "id" : "foobar" }
     </update>
```

#### 2.1.4) Modify the Property of a Specific Timer

```html
     <!-- activate the timer `foo` -->
     <choose on="$TIMERS" by="FILTER: AS 'foo'">
         <update on="$?" at=".active" with="yes" />
     </choose>
```

or,

```html
     <update on="$TIMERS" to="overwrite">
         { "id" : "foo", "interval": 1500, "active" : "yes" }
     </update>
```

### 2.2) `REQ`

`REQ` is a coroutine-level built-in variable. This variable is used to save the request parameters passed to the program when loading an HVML program, and it is saved in the form of an object.

For example, the following Python script loads an HVML program and passes the `nrUsers` parameter:

```python
hvml. load ("a. hvml", { "nrUsers" : 10 })
```

In the program, we can use `$REQ.nrUsers` or `$REQ['nrUsers']` to refer to the value (`10`) passed in by the above script code.

## 3) Necessary Dynamic Variables

### 3.1) `SYS`

This variable is a walker-level built-in variable, which is mainly used to get or set system information. The implementation of this built-in variable needs to consider the following requirements:

- Calling the setter method of `$SYS` in a coroutine may generate a `change` event, which the interpreter should broadcast to all walkers and further forward to all coroutines in the walker.

#### 3.1.1) `const` Method

Get system constants.

**Description**

```js
$SYS.const(
         <string $name: `the constant name`>
) any : `the constant value`
```

This method gets the value of the specified constant. Return the corresponding data on success; throw `NoSuchKey` exception on failure, or return `undefined` on silent evaluation.

Note that the following constants should be defined by all HVML interpreters:

- `HVML_SPEC_RELEASE`: HVML specification version number, such as `硕鼠`.
- `HVML_SPEC_VERSION`: HVML specification version number, such as `1.0`.
- `HVML_PREDEF_VARS_SPEC_RELEASE`: HVML predefined variable specification version number, such as `硕鼠`.
- `HVML_PREDEF_VARS_SPEC_VERSION`: HVML predefined variable specification version number, such as `1.0`.
- `HVML_INTRPR_NAME`: The name of the HVML interpreter, such as `PurC`.
- `HVML_INTRPR_RELEASE`: The release name of the HVML interpreter, such as `立春`.
- `HVML_INTRPR_VERSION`: The version name of the HVML interpreter, such as `0.5.0`.

**Exception**

- `NoSuchKey`: The exception can be ignored.

**Example**

```js
// Get the value of the constant `HVML_SPEC_VER`
$SYS.const('HVML_SPEC_VERSION')
     // string: '1.0'
```

#### 3.1.2) `uname` Method

Get system information.

**Description**

```js
$SYS.uname object:
     `an object contains the following properties:`
         - 'kernel-name': <string: `kernel name (e.g., 'Linux')`>
         - 'kernel-release': <string: `kernel release (e.g., '2.6.28')`>
         - 'kernel-version': < string: `kernel version` >
         - 'nodename': <string: `the network node hostname` >
         - 'machine': <string: `machine hardware name` >
         - 'processor': <string: `the processor type` >
         - 'hardware-platform': <string: `the hardware platform` >
         - 'operating-system': <string: `the operating system (e.g., 'GNU/Linux')`>
```

This method obtains system information and returns an object containing key-value pairs such as the kernel name and version number. Note that for some unsupported system features, an empty string will be returned.

**Exception**

(none)

**Example**

```js
$SYS.uname
    /* object:
       {
            'kernel-name':      'Linux',
            'kernel-release':   '5.4.0-99-generic',
            'kernel-version':   '#112-Ubuntu SMP Thu Feb 3 13:50:55 UTC 2022',
            'nodename':         'magicBook',
            'machine':          'x86_64',
            'processor':        'x86_64',
            'hardware-platform':'x86_64',
            'operating-system': 'GNU/Linux'
       }
    */
```

#### 3.1.3) `uname_prt` Method

Get printable system information.

**Description**

```js
$SYS.uname_prt string: `the kernel name.`
```

This method gets the kernel name and returns a string.

```js
$SYS.uname_prt(
        <'[kernel-name || kernel-release || kernel-version || nodename || machine || processor || hardware-platform || operating-system] | all | default' $which = 'default':
            - 'kernel-name':        `includes kernel name (e.g., 'Linux')`
            - 'kernel-release':     `includes kernel release (e.g., '2.6.28')`
            - 'kernel-version':     `includes kernel version`
            - 'nodename':           `includes the network node hostname`
            - 'machine':            `includes machine hardware name`
            - 'processor':          `includes the processor type`
            - 'hardware-platform':  `includes the hardware platform`
            - 'operating-system':   `includes the operating system (e.g., 'GNU/Linux')`
            - 'all':                `includes all parts`
            - 'default':            `is equivalent to 'kernel-name'`
        >
) string: `the string concatenated the desired system information parts together.`
```

This method returns the feature values of multiple specified features, separated by spaces, concatenated as a string and returned. Note that for some unsupported system features, the corresponding feature value is an empty string.

**Exception**

(none)

**Example**

```js
// Get the kernel name
$SYS.uname_prt
     // string: 'Linux'

// Get the kernel name and version number
$SYS.uname_prt('kernel-name kernel-release kernel-version')
     // string: "Linux 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021"
```

#### 3.1.4) `locale` Method

Get or set the locale.

**Description**

```js
$SYS.locale string : `the locale for the messages category.`
```

This method gets the message category (messages category) area and returns a string.

```js
$SYS.locale(
        < 'ctype | numeric | time | collate | monetary | messages | paper | name | address | telephone | measurement | identification' $category = 'messages':
            - 'ctype':          `Character classification`
            - 'numeric':        `Formatting of nonmonetary numeric values`
            - 'time':           `Formatting of date and time values`
            - 'collate':        `String collation`
            - 'monetary':       `Formatting of monetary values`
            - 'messsages':      `Localizable natural-language messages`
            - 'paper':          `Settings related to the standard paper size (*)`
            - 'name':           `Formatting of salutations for persons (*)`
            - 'address':        `Formatting of addresses and geography-related items (*)`
            - 'telephone':      `Formats to be used with telephone services (*)`
            - 'measurement':    `Settings related to measurements (metric versus US customary) (*)`
            - 'identification': `Metadata describing the locale (*)`
        >
) string | undefined : `the locale like 'zh_CN'.`
```

This method gets the region of the specified category and returns a string. Certain platforms may not support certain locale categories, such as the `name` category. For unsupported locale classifications, the function will either throw an `Unsupported` exception, or return `undefined` when evaluated silently.

```js
$SYS.locale(!
        < '[ctype || numeric || time || collate || monetary || messages || paper || name || address || telephone || measurement || identification] | all' $categories:
            - 'ctype':          `Character classification`
            - 'numeric':        `Formatting of nonmonetary numeric values`
            - 'time':           `Formatting of date and time values`
            - 'collate':        `String collation`
            - 'monetary':       `Formatting of monetary values`
            - 'messsages':      `Localizable natural-language messages`
            - 'paper':          `Settings related to the standard paper size (*)`
            - 'name':           `Formatting of salutations for persons (*)`
            - 'address':        `Formatting of addresses and geography-related items (*)`
            - 'telephone':      `Formats to be used with telephone services (*)`
            - 'measurement':    `Settings related to measurements (metric versus US customary) (*)`
            - 'identification': `Metadata describing the locale (*)`
            - 'all':            `All of the locale categories`
        >,
        <string $locale: `the locale for $categories`>
) true | false
```

This method sets the region for the specified category (single or multiple). Returns `true` on success, `false` on failure. Certain platforms may not support certain locale categories, such as the name (`name`) category. For unsupported locale classifications, the function will either throw an `Unsupported` exception, or return `false` when evaluated silently.

**Exception**

- `Unsupported`: Unsupported area classification. Exceptions can be ignored.

**Remark**

1. In HVML, the character string representing the region always uses the form of `en_US`, `zh_CN`.
1. In the HVML application framework, it is required to always use UTF-8 encoding.
1. A locale-specific modification will generate a `change:locale/<category>` event on the `$SYS` variable.

**Example**

```js
$SYS.locale
     // string: "en_US"

$SYS.locale(! 'all', 'zh_CN')
     // boolean: true

$SYS.locale
     // string: "zh_CN"
```

#### 3.1.5) `time` Method

Get or set the calendar time (calendar time).

**Description**

```js
$SYS.time longint: `the calendar time (seconds since Epoch)`
```

This method gets the current calendar time (seconds since Epoch), and the return value type is `longint`.

```js
$SYS.time(!
         <real $seconds: `seconds since Epoch`>
) true | false
```

This method sets the system time, the integer part represents the number of seconds since Epoch, and the fractional part represents the number of microseconds. Return `true` on success, throw `AccessDenied` exception on failure, return `false` on silent evaluation.

**Exception**

- `InvalidValue`: An invalid parameter is passed in, such as a negative value or a microsecond value greater than 100,000 or less than 0.
- `AccessDenied`: This exception will be thrown when the owner of the current walker does not have permission to set the system time.

**Remark**

1. A modification to the calendar time will generate a `change:time` event on the `$SYS` variable.

**Example**

```js
$SYS.time
     // longint: 123456789L
```

**see**

- C standard functions: `gettimeofday()`, `settimeofday()`
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime class: <https://www.php.net/manual/en/class.datetime.php>

#### 3.1.6) `time_us` method

Get or set the system time with microsecond precision.

**Description**

```js
$SYS.time_us longdouble :
     `A long double number representing the number of seconds (integral part) and microseconds (fractional part) since Epoch.`
```

This method gets the current system time, including the number of seconds and microseconds since Epoch, and the return value is a longdouble value, and the fractional part is the microsecond value.

```js
$SYS.time_us(
        [
            < 'longdouble | object' $return_type = 'longdouble': `indicate the return type: a long double number or an object.`>
        ]
) longdouble | object : `A long double number or an object representing the number of seconds and microseconds since Epoch:`
        - 'sec': < longint: `seconds since Epoch` >
        - 'usec': < longint: `microseconds` >
```

This method gets the current system time, including the number of seconds and microseconds since Epoch, and the return value type is a longdouble value or an object containing two properties `sec` and `usec`.

```js
$SYS.time_us(!
         <real $sec_us: `seconds with microseconds since Epoch`>
) true | false
```

This method sets the system time with a real number (the integer part represents the number of seconds since the Epoch, and the fractional part represents the number of microseconds). Returns `true` on success, throws an exception on failure, returns `false` on silent evaluation.

```js
$SYS.time_us(!
         <object $time_with_us: `An object representing the number of seconds and microseconds since Epoch`>
) true | false
```

This method sets the system time using an object representing the system time. Returns `true` on success, throws an exception on failure, returns `false` on silent evaluation.

**Exception**

- `InvalidValue`: When the getter is called, this exception will be thrown when an incorrect parameter is passed in (such as the wrong return type); when silently evaluated, the current event of type `longdouble` will be returned. This exception is thrown when the setter is called with an invalid argument (such as a negative value or a microsecond value greater than 100,000 or less than 0).
- `AccessDenied`: This exception is thrown when the setter is called when the owner running the interpreter does not have permission to set the system time.

**Remark**

1. A modification to the system time will generate a `change:time` event on the `$SYS` variable.

**Example**

```js
$SYS.time_us
     // longdouble: 123456789.456789
```

**Reference**

- C standard functions: `gettimeofday()`, `settimeofday()`
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime class: <https://www.php.net/manual/en/class.datetime.php>

#### 3.1.7) `sleep` Method

Pause the execution of the current walker. If called in an HVML program, it will sleep the current coroutine.

**Description**

```js
$SYS. sleep(
         real $delay_time: `the delay time in seconds; a double or long double number representing the number of seconds (integral part) and microseconds/nanoseconds (fractional part) to delay.`
) real | false
```

This method suspends the execution of the current walker for the specified number of seconds. If a float is used to specify the number of seconds, the fractional part can specify the number of microseconds or nanoseconds to sleep. Under normal circumstances, this method returns 0; when the sleep is interrupted because the current coroutine has an event that needs to be processed, it returns the remaining seconds (the return value type is consistent with the parameter type).

**Exception**

- `ArgumentMissed`: A required argument was not specified. Exceptions can be ignored; returns `false` when evaluated silently.
- `WrongDataType`: non-real number type parameter type. Exceptions can be ignored; returns `false` when evaluated silently.
- `InvalidValue`: An invalid parameter is passed in, such as a negative value. Exceptions can be ignored; returns `false` when evaluated silently.
- `SystemFault`: Operating system failure. Exceptions cannot be ignored.

**Example**

```js
$SYS. sleep(1UL)
     // ulongint: 0UL

$SYS. sleep(0.3)
     // longdouble: 0.0FL
```

**Reference**

- POSIX functions: `sleep()`, `usleep()`, and `nanosleep()`.

#### 3.1.8) `timezone` method

Get or set the time zone.

**Description**

```js
$SYS.timezone : string | false
```

This method returns the current time zone.

```js
$SYS.timezone(!
         <string $timezone: `new timezone`>
         [,
             < 'local | global' $permanently = 'local': `change timezone permanently/globally or temporarily/locally.`>
         ]
) true | false
```

This method sets the current time zone. Returns `true` on success, throws an exception on failure, returns `false` on silent evaluation.

HVML recommends using strings like `Asia/Shanghai` to represent time zones. In essence, this string is the file path where the POSIX system saves time zone information. For example, for `Asia/Shanghai`, its time zone information is usually saved in the `/usr/share/zoneinfo/Asia/Shanghai` file or `/var/db/ timezone/zoneinfo/Asia/Shanghai`. The following special time zone names are also supported:

- `PRC`: China standard time, namely Beijing time, same as `Asia/Shanghai`.
- `Hongkong`: Hong Kong time, same as `Asia/Hong_Kong`.
- `UTC`: Coordinated Universal Time, same as `Etc/UTC`.
- `UCT`: Another name for Coordinated Universal Time, same as `Etc/UTC`.
- `Greenwich`: Greenwich Mean Time, same as `Etc/GM`.
- `GMT`: Abbreviation for Greenwich Mean Time, same as `Etc/GMT`.
- `posixrules`: POSIX default time zone rules, same as `America/New_York`.

**Exception**

- `InvalidValue`: Invalid time zone string. Invalid option keywords are treated as `local` when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to permanently change the system timezone.

**Remark**

1. A change to the system timezone will generate a `change:timezone` event on the `$SYS` variable.
1. Global, persistent modification of the system time zone, which may require an operating system restart.

**Example**

```js
$SYS.timezone
     // string: "Asia/Shanghai"

$SYS.timezone(! 'America/New_York' )
     //true

$SYS.timezone
     // string: "America/New_York"
```

**see**

- C standard function: `tzset()`
- PHP: <https://www.php.net/manual/en/timezones.php>

#### 3.1.9) `cwd` method

Get or set the current working path.

**Description**

```js
$SYS.cwd string | false: `returns the current working directory on success, or @false on failure.`
```

This method gets the current working path. Returns `true` on success, throws an exception on failure; upon silent evaluation, returns `false` for ignorable exceptions.

```js
$SYS.cwd(!
         <string $dir: `the new path for the current working directory.`>
) boolean: `returns @true on success or @false on failure.`
```

This method changes the current working directory. Returns `true` on success, throws an exception on failure; upon silent evaluation, returns `false` for ignorable exceptions.

**Exception**

The exceptions that may be generated by this method are all ignorable exceptions:

- `InvalidValue`: The passed-in directory string contains illegal characters not supported by the underlying operating system.
- `EntityNotFound`: The specified directory does not exist.
- `AccessDenied`: No access.
- `TooMany`: too long symlink jump.
- `TooLong`: Too long directory name.
- `IOFailure`: Input output error.
- `OSFailure`: Other OS errors.

**Remark**

1. Changes to the current working directory will generate a `change:cwd` event on the `$SYS` variable.

**Reference**

- C standard functions: `chdir()`, `getcwd()`

#### 3.1.10) `env` method

Get or set system environment variables.

**Description**

```js
$SYS.env(
         <string: `the environment variable name`>
) string | undefined
```

This method gets the value (string) of the specified environment variable; throws a `NoSuchKey` exception if not set, and returns `undefined` when evaluated silently.

```js
$SYS.env(!
         <string: `the environment variable name`>,
         <string | undefined: `the value`>
) true | false: `returns @true on success, otherwise @false if evaluated silently.`
```

This method sets the specified environment variable and returns Boolean data indicating whether the existing environment variable is overwritten.

**Exception**

The exceptions that may be generated by this method are all ignorable exceptions:

- `InvalidValue`: Illegal environment variable name.
- `NoSuchKey`: The specified environment variable does not exist.

**Remark**

1. Add a specific environment variable, and a `change:env/grown` event will be generated on the `$SYS` variable. The event parameter is an object, including the key with the name of the newly added environment variable as the key, and the corresponding value as the key value value pairs.
1. The modification of a specific environment variable will generate a `change:env` event on the `$SYS` variable, and the event parameter is an object containing a key-value pair with the modified environment variable name as the key and the corresponding value as the key value .
1. To delete a specific environment variable, a `change:env/shrunk` event will be generated on the `$SYS` variable, and the event parameter is the name of the environment variable to be removed.

**Example**

```js
// Set the value of the environment variable `LOGNAME`
$SYS.env(! 'LOGNAME', 'tom' )
     // boolean: true
```

#### 3.1.11) `random_sequence` Method

Get the specified random data from the kernel, which can be used for seeding the random number generator or for encryption purposes.

**Description**

```js
$SYS.random_sequence(
         <number $length: `the length of the random byte sequence`>
) bsequence | false
```

This method gets random data of a specified length from the kernel, which can be used for seeding the random number generator or for encryption purposes. This method returns a sequence of bytes of the specified length or throws an exception; when evaluated silently, `false` is returned.

**Exception**

- `InvalidValue`: `$length` is an invalid length; the length must be greater than 0 and less than or equal to 256.
- `NotSupported`: Not supported.

**Example**

```js
// Obtain random data from the kernel for the current walker's random number generator seed.
$SYS. random(! $DATA. fetchreal($SYS. random_sequence(4), 'u32') )
     // boolean: true
```

**Reference**

- Linux-specific interface: `getrandom()`

#### 3.1.12) `random` method

Get a random value.

**Description**

```js
$SYS.random longint: `a random between 0 and RAND_MAX.`
```

This method gets a random value (`longint`) between 0 and `RAND_MAX` (at least `32767`) defined by the C standard library.

```js
$SYS.random(
         <real $max: `the max value`>
) real | false: `A random real number between 0 and $max. The type of return value will be same as the type of $max.`
```

This method gets a random value between 0 and the specified maximum value. The type of the return value is the same as the type of the parameter `$max`.

```js
$SYS. random(!
         <real $seed: `the random seed`>
         [, <number $complexity: `a number equal or greater than 8 to indicate how sophisticated the random number generator it should use - the larger, the better the random numbers will be.>
         ]
) boolean: `@true for success, @false otherwise.`
```

This method sets the seed (`$seed`) and/or complexity (`$complexity`) of the random number generator. This method returns `true` on success; throws an exception on failure, or `false` for ignorable exceptions when evaluating silently.

**Exception**

`InvalidValue`: An invalid parameter was passed in, such as a too small `$complexity` value.

**Example**

```js
// Set the random number seed using the current system calendar time.
$SYS. random(! $SYS. time )
     //true

// Use the current system calendar time to set the random number seed, and set the complexity of the random number generator to the highest.
$SYS. random(! $SYS. time, 256 )
     //true

$SYS.random
     // longint: 8899L

$SYS. random(1)
     // number: 0.789

$SYS.random(1000L)
     // longint: 492L

$SYS.random(-10FL)
     // longdouble: -8.96987678FL
```

**Reference**

- C standard function: `random_r()`
- C standard function: `srandom_r()`
- C standard function: `initstate_r()`

### 3.2) `RUNNER`

This variable is a walker-level built-in variable, and the interpreter will automatically create and bind it when creating a new walker. This variable is mainly used for walker-related information, and provides a mechanism for users to share data between different coroutines of the current walker.

#### 3.2.1) `app_name` Attribute

Get the application name of the current walker.

**Description**

```js
$RUNNER.app_name
     string : `the app name of current runner.`
```

This method gets the application name of the current walker.

**Exception**

This method does not raise an exception.

**Example**

```js
$RUNNER.app_name
     // string: 'cn.fmsoft.hvml.sample'
```

#### 3.2.2) `run_name` attribute

Get the walker name of the current walker.

**Description**

```js
$RUNNER.run_name
     string : `the runner name of current runner.`
```

This method gets the walker name of the current walker.

**Exception**

This method does not raise an exception.

**Example**

```js
$RUNNER.run_name
     // string: 'hello'
```

#### 3.2.3) `rid` Property

Get the runner identifier (`rid` for short) of the current runner.

**Description**

```js
$RUNNER.rid
     ulongint : `the identifier of the current runner.`
```

This method gets the walker identifier of the current walker.

**Exception**

This method does not raise an exception.

**Example**

```js
$RUNNER.sid
     // ulongint: 3UL
```

#### 3.2.4) `uri` Property

Get the URI of the current walker.

**Description**

```js
$RUNNER.uri
     string : `the URI of the current runner.`
```

This method gets the URI of the current walker, which looks like `edpt://localhost/cn.fmsoft.hvml.caculator/main`.

**Exception**

This method does not raise an exception.

**Example**

```js
$RUNNER.uri
     // string: 'edpt://localhost/cn.fmsoft.hvml.caculator/main'
```

#### 3.2.5) `myObj` static property

`myObj` is a static property of `RUNNER`, used to define user-defined key-value pairs, initially an empty object. Programs can set their content using the `update` element:

```html
<!DOCTYPE hvml>
<hvml target="html">
    <head>
        <update on="$RUNNER.myObj" to="displace">
            {
                "AUTHOR": "Vincent Wei",
            }
        </update>
    </head>

    <body>
        ...
    </body>
</hvml>
```

Since `$RUNNER` is a walker-level variable, changes in this data can be observed in another HVML coroutine of the current walker:

```html
     <observe on="$RUNNER.myObj" for="change:AUTHOR" in="#theStatusBar">
         ...
     </observe>
```

#### 3.2.6) `user` Attribute

Get or set the user key-value pair through this property.

**Description**

```js
$RUNNER. user(
         <string $key: `the user defined key name`>
) any | undefined : `the variant value corresponding to the key name $key.`
```

This method gets the key value corresponding to the specified key name. When the specified key name is not set, a `NoSuchKey` exception will be thrown, or `undefined` will be returned when silently evaluated.

```js
$RUNNER. user(!
         <string $key: `the user defined key name`>,
         <any | undefined $value: `the new variant value`>
) boolean : `returns @true when the old value was overridden or @false when a new key-value pair was created.`
```

This method sets the value of the specified key name and returns a Boolean value indicating whether the existing key value is overwritten. Note that passing in a key value of `undefined` will remove the corresponding key-value pair. When removing a key-value pair that does not exist, a `NoSuchKey` exception will be thrown, or `false` when evaluated silently.

_Note_, the getters and setters for `user` essentially access the `myObj` static property of `$RUNNER`.

**Exception**

Exceptions that this method may generate:

- `NoSuchKey`

**Example**

```js
// remove `userId` key-value pair
$RUNNER. user(! 'userId', undefined )
     // false (assumed that `userId` was not set)

// Set `userId` to `20211104`
$RUNNER. user(! 'userId', '20211104' )
     // false

// Get the key value corresponding to `userId`
$RUNNER. user('userId')
     // string: '20211104-01'

// Reset `userId` to `20220213`
$RUNNER. user(! 'userId', '20220213' )
     //true

// remove `userId` key-value pair
$RUNNER. user(! 'userId', undefined )
     //true
```

#### 3.2.7) `chan` Method

Get or create a channel.

**Description**

```js
$RUNNER.chan(
         <string $name: `the user defined channel name`>
) native/channel | undefined : `the native entity representing the channel or undefined if not found.`
```

This method gets the native entity corresponding to the specified channel name. The returned data corresponds to a native entity representing a channel, called a "channel entity". Channel entities provide the following methods:

- `$channel.send()`: Send a data to the channel; when the channel is full, this call will block the current coroutine until the data is read or it times out.
- `$channel.recv()`: read data from the channel; when the channel is empty, this call will block the current coroutine until there is data or timeout.

```js
$RUNNER.chan(!
         <string $name: `the user defined channel name`>
         [,
             <ulongint $cap = 1: `the capability of the channel.`>
         ]
) boolean : `@true for success or @false when error.`
```

This method creates or closes a channel (when the capacity is 0); it can also be used to change the capacity of an existing channel (only when the number of existing data is less than or equal to the capacity to be set).

**Exception**

Possible exceptions from the above methods:

- `ArgumentMissed`: A required argument was not specified. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.
- `WrongDataType`: invalid parameter type. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.
- `InvalidValue`: invalid capacity value. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.
- `BadName`: Bad channel name. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.
- `EntityNotFound`: The specified channel was not found. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.
- `EntityExists`: The specified channel already exists. Exceptions can be ignored; return `false` or `undefined` when evaluated silently.

**Example**

```js
// create `channel0` channel
$RUNNER.chan(! 'channel0', 10 )
     // true (assumed that `channel0` was not created)

// Change the capacity of the `channel0` channel to 20
$RUNNER.chan(! 'channel0', 20 )
     //true

// Get the `chan` channel
$RUNNER.chan('channel0')
     // native/channel

// Close the `channel0` channel by setting the channel capacity to 0
$RUNNER.chan(! 'channel0', 0 )
     //true

// Get `channel0` channel
$RUNNER.chan('channel0')
     // undefined
```

##### 3.2.7.1) `send` Method of Channel Entity

Send data to the channel.

**Description**

```js
$channel. send(
         <any: data>
) boolean
```

This method sends data to the specified channel; when the channel is full, this call will block the current coroutine until the data is read or it times out.

**Exception**

Exceptions that this method may generate:

- `EntityGone`: The channel disappeared (closed). Exceptions can be ignored; returns `false` when evaluated silently.
- `Timeout`: Timeout. Exceptions can be ignored; returns `false` when evaluated silently.

**Example**

##### 3.2.7.2) `recv` Method of Channel Entity

Receive data from channel entity.

**Description**

```js
$channel.recv() any | undefined
```

This method reads data from the channel; when the channel is empty, the call will block the current coroutine until there is data or timeout.

**Exception**

Exceptions that this method may generate:

- `EntityGone`: The channel disappeared (closed). Exceptions can be ignored; return `undefined` when evaluated silently.
- `Timeout`: Timeout. Exceptions can be ignored; return `undefined` when evaluated silently.

##### 3.2.7.3) `cap` Property of Channel Entity

Get the capacity of the channel entity.

**Description**

```js
$channel.cap ulongint | false
```

This property returns the capacity size of the channel entity.

**Exception**

Exceptions that this method may generate:

- `EntityGone`: The channel disappeared (closed). Exceptions can be ignored; returns `false` when evaluated silently.

##### 3.2.7.4) `len` Attribute of Channel Entity

Get the number of data items in the channel entity.

**describe**

```js
$channel.len ulongint | false
```

This property returns the amount of data to be read in the channel.

**abnormal**

Exceptions that this method may generate:

- `EntityGone`: The channel disappeared (closed). Exceptions can be ignored; returns `false` when evaluated silently.

##### 3.2.7.5) Events on Channel Entity

On channel entities, the following events can be observed:

- `sendable`: data can be sent (the buffer has space).
- `receivable`: Receivable data (buffer has space).
- `closed`: is closed.

### 3.3) `CRTN`

`CRTN` is a built-in coroutine-level dynamic variable, which is used to obtain the basic information of the current coroutine or set properties such as interpreter parameters of the current coroutine.

In addition, on the `$CRTN` variable, the following rendering state-related events will be generated:

1. `rdrState:suppressed`: The interaction between the current coroutine and the renderer (including updating the page and accepting interaction events from the renderer) is suppressed.
1. `rdrState:closed`: The renderer page corresponding to the coroutine is forcibly closed by the user.
1. `rdrState:lost`: The runner of the coroutine lost the connection to the renderer, such as the renderer terminated unexpectedly or exited abnormally.
1. `rdrState:regular`: The current coroutine and renderer return to the regular data exchange state.

#### 3.3.1) `target` Attribute

The target document type of the HVML coroutine can be obtained through this property.

**Description**

```js
$CRTN.target string: `the target document type such as 'html'`
```

Get the target document type of the current HVML coroutine, that is, the value of the `target` attribute of the `hvml` tag.

**Exception**

Getters for this property do not raise exceptions.

**Example**

```js
$CRTN.target
     // string: 'html'
```

#### 3.3.2) `base` Attribute

This property can be used to get or set the base URL of the HVML coroutine.

```js
$CRTN.base string: `the base URL.`
```

This property getter returns the current base URL, such as `file:///app/com.example.foo/hvml`.

```js
$CRTN. base(!
         <string $new_url: `the new base URL`>
) string | false: `the new base URL normalized from $new_url or `false` for invalid $new_url.`
```

This property setter sets the base URL of the HVML coroutine to the expected value, returning the normalized base URL. Throws an exception if passed `$new_url` is not a valid or unsupported URL, or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

An exception that is not raised by getters for this property.

The setter of this property can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: No argument was specified in the setter.
- `WrongDataType`: The parameter type specified in the setter is incorrect.
- `InvalidValue`: Invalid URL string.

**Example**

```js
$CRTN.base(! "https://foo.example.com//app/hvml/" )
     // string: 'https://foo.example.com/app/hvml'
```

#### 3.3.3) `max_iteration_count` Attribute

This property can be used to get or set the maximum number of iterations of the HVML coroutine when executing the `iterate` action element, which is used to detect possible infinite loops.

The default is the maximum value of a 64-bit unsigned integer: `2^64 - 1`.

**Description**

```js
$CRTN.max_iteration_count ulongint: `the current maximal iteration count.`
```

This property getter returns the current maximum iterations value.

```js
$CRTN.max_iteration_count(!
         <real $new_value: `the new maximal interation count`>
) ulongint | false : `the new maximal iteration count.`
```

This property setter sets the maximum iterations value and returns the set value. Throws an exception when passed an invalid value (such as zero); or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

An exception that is not raised by getters for this property.

The setter of this property can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: No argument was specified in the setter.
- `WrongDataType`: The parameter type specified in the setter is incorrect.
- `InvalidValue`: Invalid value, exception can be ignored.

**Example**

```js
$CRTN.max_iteration_count(! 10000UL )
```

#### 3.3.4) `max_recursion_depth` Attribute

This property can be used to get or set the maximum recursion depth of the HVML coroutine when recursively executing a function to prevent stack overflow.

The default is the maximum value for a 16-bit unsigned integer: `2^16 - 1` (65535).

**Description**

```js
$CRTN.max_recursion_depth ulongint: `the current maximal recursion depth value.`
```

This property getter returns the current maximum recursion depth value.

```js
$CRTN.max_recursion_depth(!
         <real $new_value: `new maximal recursion depth`>
) ulongint | false: `the new maximal recursion depth value.`
```

This property setter sets the maximum recursion depth value and returns the set value. Throws an exception when an invalid value is passed in; or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

An exception that is not raised by getters for this property.

The setter of this property can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: No argument was specified in the setter.
- `WrongDataType`: The parameter type specified in the setter is incorrect.
- `InvalidValue`: Invalid value, exception can be ignored.

**Example**

```js
$CRTN.max_recursion_depth(! 10000UL)
```

#### 3.3.5) `max_embedded_levels` Attribute

This property gets or sets the maximum nesting level allowed when parsing eJSON data or processing container data.

The default value is 64.

**Description**

```js
$CRTN.max_embedded_levels ulongint: `the current maximal embedded levels.`
```

This property getter returns the current maximum container data nesting level.

```js
$CRTN.max_embedded_levels(!
         <real $new_value: `new maximal embedded levels`>
) ulongint | false: `the new maximal embedded levels.`
```

This property setter sets the maximum allowed container data nesting level, and returns the set value. Throws an exception when an invalid value is passed in; or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

Getters for this property do not raise exceptions.

The setter of this property can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: No argument was specified in the setter.
- `WrongDataType`: The parameter type specified in the setter is incorrect.
- `InvalidValue`: 0 or more than the maximum value of a 16-bit unsigned integer.

**Example**

```js
$CRTN.max_embedded_levels(!64UL)
```

#### 3.3.6) `timeout` Attribute

This property can be used to get or set the timeout value (unit: second) when the HVML coroutine gets data or sends a request through the data getter.

The default value is 10.0.

**Description**

```js
$CRTN.timeout number : `the current timeout value (in seconds)`
```

This property getter returns the current timeout value.

```js
$CRTN. timeout(!
         <number $new_timeout: `the new timeout value (in seconds)`>
) number | false: `the new timeout value`
```

This property setter sets the timeout value and returns the set value. Throws an exception when an invalid value is passed in; or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

Getters for this property do not raise exceptions.

This attribute is a setter that can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: No argument was specified in the setter.
- `WrongDataType`: A non-real-like parameter type was specified in the setter.
- `InvalidValue`: Invalid timeout value.

**Example**

```js
// Set the timeout value to 3.5 seconds.
$CRTN. timeout(! 3.5 )
     // number: 3.5
```

#### 3.3.7) `cid` Attribute

This property can be used to get the identifier of the current HVML coroutine (coroutine identifier, referred to as `cid`).

**Description**

```js
$CRTN.cid ulongint : `the corontine identifier`
```

**Exception**

Getters for this property do not raise exceptions.

**Example**

```js
$CRTN.cid
     // ulongint: 10UL
```

#### 3.3.8) `token` Attribute

This property can be used to get or set the token (token) of the current HVML coroutine.

**Description**

```js
$CRTN.token string : `the corontine token`
```

This method gets the token of the current HVML coroutine, in the form of `3cd5`.

```js
$CRTN. token(!
         <string $new_token: `the new token for the coroutine`>
) string | false: `the new token`
```

This method sets the token of the current HVML coroutine and returns `true` or `false`. Throws an exception when an invalid value is passed in (starts with an underscore, does not conform to the coroutine token specification), or returns `false` for ignorable exceptions when evaluating silently.

**Exception**

An exception that is not raised by getters for this property.

The setter of this property can generate the following exceptions, all of which are ignorable:

- `ArgumentMissed`: A required argument was not specified.
- `WrongDataType`: Wrong parameter type.
- `InvalidValue`: A value that does not conform to the coroutine token specification or a token name that starts with an underscore.

**Example**

```js
$CRTN.token
     // string: `7`

$CRTN. token(! 'myTask' )
     // string: `myTask`

$CRTN.token
     // string: `myTask`
```

#### 3.3.9) `uri` Attribute

The URI of the current HVML coroutine can be obtained through this property.

**Description**

```js
$CRTN.uri string : `the corontine URI`
```

This method gets the URI of the current HVML coroutine, in the form of `//localhost/cn.fmsoft.hvml.calculator/main/CRTN/7`.

**Exception**

Getters for this property do not raise exceptions.

**Example**

```js
$CRTN.uri
     // string: `//localhost/cn.fmsoft.hvml.calculator/main/CRTN/7`
```

#### 3.3.10) `curator` Attribute

Get the guardian coroutine identifier of the current HVML coroutine through this property.

**Description**

```js
$CRTN.curator ulongint : `the corontine identifier of the curator of the current coroutine`
```

This property getter gets the guardian coroutine identifier of the current HVML coroutine, and returns 0UL if the coroutine has no guardian coroutine.

**Exception**

This property getter does not raise an exception.

**Example**

```js
$CRTN. curator
     // ulongint: 5UL
```

#### 3.3.11) `native_crtn` Method

This method returns an observable native entity representing a specific sub-coroutine.

**Description**

```js
$CRTN.native_crtn(
     ulongint $cid: `the corontine identifier of one child coroutine`
) native/crtn | undefined
```

This method returns an observable native entity representing a specific sub-coroutine based on the given coroutine identifier. Can be used to observe the exit status of sub-coroutines.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No argument specified; exceptions can be ignored, and `undefined` is returned when evaluated silently.
- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid parameter, such as the specified `cid` does not exist; the exception can be ignored, and `undefined` is returned during silent evaluation.

**Example**

```js
$CRTN.native_crtn
     // native/crtn
```

#### 3.3.12) `static` Attribute

This attribute reflects the static variable corresponding to the current coroutine in the current execution stack, and should be implemented as a native entity. Access the static variables of the current coroutine in the specified namespace through the getters and setters of the properties of the native entity.

**Description**

```js
$CRTN.static.<variable>(
     [,
         < string | ulongint $namspace = 1L: `the name space of the variable`.
     ]
) any | undefined
```

This property getter gets the value of the specified variable. `variable` is the name of the variable; `namespace` is used to specify the name space of the variable, and the default value is 1L.

```js
$CRTN. static. <variable>(!
     < any $value: `the new value.` >,
     [,
         < string | ulongint $namspace = 1L: `the name space of the variable`.
     ]
) boolean
```

This property setter sets the value of the specified variable. `variable` is the variable name; `value` specifies the new value (use `undefined` to remove the variable); `namespace` is used to specify the namespace of the variable.

**Exception**

Exceptions that may be generated by property getters for this native entity:

- `ArgumentMissed`: No argument specified; exceptions can be ignored, and `undefined` is returned when evaluated silently.
- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid parameter, such as an invalid variable name; the exception can be ignored, and `undefined` is returned during silent evaluation.

Exceptions that may be raised by property setters for this native entity:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `InvalidValue`: Invalid parameter, such as an invalid variable name; the exception can be ignored, and `false` is returned for silent evaluation.

**Example**

```js
$CRTN.static.x('_root')
     // undefined

$CRTN.static.x(![0, 1, 2], '_root')
     //true

$CRTN.static.x('_root')
     // array: [0, 1, 2]

$CRTN.static.x
     // array: [0, 1, 2]
```

#### 3.3.13) `temp` Attribute

This attribute reflects the temporary variable corresponding to the current coroutine in the execution stack and should be implemented as a native entity. Access the temporary variables of the current coroutine in the specified namespace through the property getters and setters of the native entity.

**Description**

```js
$CRTN.temp.<variable>(
     [,
         < string | ulongint $namspace = 1L: `the name space of the variable`.
     ]
) any | undefined
```

Get the value of the specified temporary variable through the above attribute getter. `variable` is the name of the variable; `namespace` is used to specify the name space of the variable, and the default value is 1L.

```js
$CRTN.temp.<variable>(!
     < any $value: `the new value.` >,
     [,
         < string | ulongint $namspace = 1L: `the name space of the variable`.
     ]
) boolean
```

Set the value of the specified temporary variable via the above property setter. `variable` is the variable name; `value` specifies the new value (use `undefined` to remove the variable); `namespace` is used to specify the namespace of the variable.

**Exception**

Exceptions that may be generated by property getters for this native entity:

- `ArgumentMissed`: No argument specified; exceptions can be ignored, and `undefined` is returned when evaluated silently.
- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid parameter, such as an invalid variable name; the exception can be ignored, and `undefined` is returned during silent evaluation.

Exceptions that may be raised by property setters for this native entity:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `InvalidValue`: Invalid parameter, such as an invalid variable name; the exception can be ignored, and `false` is returned for silent evaluation.

**Example**

```js
$CRTN.temp.x('_topmost')
     // undefined

$CRTN.temp.x(! [0, 1, 2], '_topmost')
     //true

$CRTN.temp.x('_topmost')
     // array: [0, 1, 2]

$CRTN.temp.x
     // array: [0, 1, 2]
```

### 3.4) `DOC`

`DOC` is a built-in coroutine-level dynamic variable used to access elements in the eDOM tree generated by HVML programs.

When using `init` to load data with a MIME type of `text/html`, etc. from an external data source, the resulting data is a dynamic object representing the corresponding structured document (such as HTML, XML), etc. Therefore, you can also use and `$DOC` variable to access the document and its elements.

#### 3.4.1) `doctype` Method

This method returns the document type, string.

```js
$DOC.doctype string : `the target DOCTYPE, such as 'html'`
```

This method returns the doctype of the target document; a string, such as `html`.

**Example**

```js
$DOC.doctype
     // html
```

#### 3.4.2) `select` Method

Select elements according to their identifiers (id), class names, tag names, and name attribute values and generate corresponding collections of elements.

```js
$DOC. select(
         < string $string: `The identifier, the class name(s), the tag name, or the value of name attribute of the element(s) to select.` >
         [, < 'id | class | tag | name' $type = `id`:
             - 'id': `Select the element whose id property matches the specified string.`
             - 'class': `Select all elements which have all of the given class name(s).`
             - 'tag': `Select all elements with the given tag name.`
             - 'name': `Select all elements with a given name attribute in the document.`
             - 'nstag': `Select all elements with the given tag name belonging to the given namespace. Note that $string should contain the namespace and the tag name separated by a space character.`
            >
         ]
) native/elementCollection
```

The return value of this method may have the following two situations:

1. `undefined`: Wrong identifier or parameter type.
1. An element aggregate entity, containing zero or a single element.

#### 3.4.3) `query` Method

Use CSS selectors to query the collection of elements on the target document.

```js
$DOC. query(
     <string $selector: `the CSS selector.` >
) native/elementCollection
```

The return value of this method may have the following two situations:

1. `undefined`: Wrong CSS selector or parameter.
1. An element aggregate entity, containing zero or more elements.

#### 3.4.4) Element Collection Entity

On the element collection entity, we can get the corresponding getters for the following key names:

1. `.count()`: Get the number of elements in the collection of elements.
1. `.sub( <real: offset>, <real: length )`: Select elements from a given collection of elements based on offset and length to form a new collection of elements.
1. `.select( <string: CSS selector )`: Use a CSS selector to select elements in a given collection of elements and form a new collection of elements.
1. `.attr( <string: attributeName> )`: Get the specified attribute value of the first element in the collection of elements.
1. `.hasClass( <string: className> )`: Determine whether any element in the element collection is given the specified class name.
1. `.contents()`: Get the content (string, serialized by target markup language) of the first element in the element collection.
1. `.textContent()`: Get the text content of the first element (including child elements) in the element collection.
1. `.dataContent()`: Get the data content of the first element (including sub-elements) in the collection of elements, multiple contents form an array.

On the element collection entity, we can get the corresponding setters for the following key names:

1. `.attr(! <string: attributeName>, <string: value> )`: Set the attribute value of all elements in the element collection.
1. `.attr(! <object: attributes> )`: Use object information to set multiple attribute values ​​of all elements in the element collection.
1. `.contents(! <string: content> )`: Set the content of all elements in the element collection.
1. `.textContent(! <string: content> )`: Set the text content of all elements in the element collection, and remove possible child elements.
1. `.dataContent(! <any: content> )`: Set the data content of all elements in the element collection, and remove possible child elements.
1. `.addClass(! <string: className> )`: Add the specified class name to all elements in the element collection.
1. `.addClass(! <array: classNames> )`: Add all the class names specified in the array to all elements in the element collection.
1. `.removeAttr(! <string: attributeName> )`: Remove the specified attribute from all elements in the element collection.
1. `.removeClass(! )`: Removes all class names from all elements in the element collection.
1. `.removeClass(! <string: className> )`: Remove the specified class name of all elements in the element collection.
1. `.removeClass(! <array: classNames> )`: Remove all class names of all elements in the array in the collection of elements.

With the support of the above interfaces, when referencing elements through CSS selectors in HVML action elements, such as:

```html
<update on '#the-user-stats > h2 > span' at 'textContent attr.class' with ["10", "text-warning"] />
```

Equivalent to:

```html
<update on $DOC.query('#the-user-stats > h2 > span') at 'textContent attr.class' with ["10", "text-warning"] />
```

Usually, corresponding getter or setter functions are set on these key names, so that the expressions required by the HVML specification can be realized:

```js
// <div id="foo" bar="baz">

// Get the value of the attribute `bar` on the element with id foo:
$DOC.query("#foo").attr('bar')

// Set the value of the attribute `bar` on the element with id foo:
$DOC.query("#foo").attr(! "bar", "qux")
```

Reference: <https://api.jquery.com/category/attributes/>

### 3.5) `RDR`

`RDR` is a built-in walker-level dynamic variable that is used to access the renderer the current walker is connected to.

#### 3.5.1) `state` Property

The getter for this property returns the current renderer state object. This property does not provide a setter.

```js
$RDR.state object : `an object describing the current state of the renderer:`
         - 'comm': < string: `the communication method; an empty string if not connected.` >
         - 'prot': < string: `the protocol name, such as "PURCMC".` >
         - 'prot-version': <string: `the protocol version` >
         - 'prot-ver-code': < ulongint: `the protocol version code` >
         - 'uri': <string: `machine hardware name`>
```

**Exception**

(none)

**Example**

```js
$RDR.state
     // { 'comm': 'socket', 'prot': 'PURCMC', 'prot-version': '110', 'prot-ver-code': 110UL, 'uri': 'unix:///var /tmp/purcmc.sock'}
```

#### 3.5.2) `connect` Method

This method disconnects the current renderer and connects to the specified renderer.

```js
$RDR.connect( string : `a string presenting the communication method of the renderer`
         <'headless | thread | socket | hibus ' $comm = 'headless' >,
         [, <string $uri: `URI of the target renderer.` > ]
) true | false
```

**Exception**

This method may produce the following ignorable exceptions:

- `WrongDataType`: Wrong data type.
- `InvalidValue`: Invalid data, such as incorrect communication method and renderer URI, etc.
- Other exceptions generated by the underlying operating system.

**Example**

```js
$RDR.connect('socket', 'unix:///var/tmp/purcmc.sock')
     //true
```

#### 3.5.3) `disconn` Method

This method disconnects the current renderer.

```js
$RDR.disconn(
) true | false
```

**Exception**

This method may produce the following ignorable exceptions:

- `EntityNotFound`: The specified entity was not found; not currently connected to any renderer.
- Other exceptions generated by the underlying operating system.

**Example**

```js
$RDR.disconn()
     //true
```

### 3.6) `DATETIME`

#### 3.6.1) `time_prt` Method

Get a time string with the given formatting specification/standard.

**Description**

```js
$DATETIME.time_prt(
         rfc822 | rfc850 | rfc1036 | rfc1036 | rfc1123 | rfc7231 | rfc2822 | rfc3339 | rfc3339-ex | rss | w3c' $format = 'iso8601':
             - 'atom': `Atom (example: 2005-08-15T15:52:01+00:00)`
             - 'cookie': `HTTP Cookies (example: Monday, 15-Aug-2005 15:52:01 UTC)`
             - 'iso8601': `Same as 'ATOM' (example: 2005-08-15T15:52:01+00:00)`
             - 'rfc822': `RFC 822 (example: Mon, 15 Aug 05 15:52:01 +0000)`
             - 'rfc850': `RFC 850 (example: Monday, 15-Aug-05 15:52:01 UTC)`
             - 'rfc1036': `RFC 1036 (example: Mon, 15 Aug 05 15:52:01 +0000)`
             - 'rfc1123': `RFC 1123 (example: Mon, 15 Aug 2005 15:52:01 +0000)`
             - 'rfc7231': `RFC 7231 (since PHP 7.0.19 and 7.1.5) (example: Sat, 30 Apr 2016 17:52:13 GMT)`
             - 'rfc2822': `RFC 2822 (example: Mon, 15 Aug 2005 15:52:01 +0000)`
             - 'rfc3339': `Same as 'ATOM'`
             - 'rfc3339-ex': `RFC 3339 EXTENDED format (example: 2005-08-15T15:52:01.000+00:00)`
             - 'rss': `RSS (example: Mon, 15 Aug 2005 15:52:01 +0000)`
             - 'w3c': `World Wide Web Consortium (example: 2005-08-15T15:52:01+00:00)`
         >
         [, <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for current calendar time.`>
             [, <string $timezone>
             ]
         ]
) string | false: `a date and time string in the given time format $format and the time zone $timezone for the specified calendar time $seconds.`
```

This method gets the time string of the specified calendar time in the given time zone and in the form of the given formatting standard/specification name (such as ISO8601, RFC850).

**Exception**

This method may produce the following ignorable exceptions:

- `WrongDataType`: wrong data type.
- `InvalidValue`: invalid data, such as incorrect format specification name, time or time zone name, etc.

**Example**

```js
$DATETIME.time_prt
     // string: '2020-06-24T11:27:05+08:00'

$DATETIME.time_prt.iso8601
     // string: '2020-06-24T11:27:05+08:00'

$DATETIME.time_prt('iso8601')
     // string: '2020-06-24T11:27:05+08:00'

// Get the ISO8601 standard string in Shanghai time zone (Beijing standard time) one hour before the current time
$DATETIME.time_prt('iso8601', $MATH.eval('x - 3600', { x: $SYS.time }), 'Asia/Shanghai')
     // string: '2020-06-24T11:27:05+08:00'

// Get the RFC822 standard string of the current time in Shanghai time zone (Beijing standard time)
$DATETIME.time_prt('rfc822', null, 'Asia/Shanghai')
     // string: 'Mon, 15 Aug 05 15:52:01 +0000'
```

**see**

- PHP: <https://www.php.net/manual/en/timezones.php>
- PHP: <https://www.php.net/manual/en/ref.datetime.php>
- PHP: <https://www.php.net/manual/en/datetime.formats.php>
- PHP DateTime class: <https://www.php.net/manual/en/class.datetime.php>

#### 3.6.2) `utctime` Method

Get the UTC split time of the current system time.

**describe**

```js
$DATETIME.utctime object : `An object representing the current broken-down time in UTC.`
```

Get the UTC (coordinated universal time) broken-down time of the current calendar time, and the return type is an object.

```js
$DATETIME.utctime(
         <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for the current calendar time.`>
) object
```

Get the UTC broken-down time of the given calendar time, the return type is an object.

The decomposition time object returned by the above method contains the following properties:

```js
{
    'usec': <number: `The number of microseconds after the second, in the range 0 to 999,999.`>
    'sec': <number: `The number of seconds after the minute, normally in the range 0 to 59, but can be up to 60 to allow for leap seconds.`>
    'min': <number: `The number of minutes after the hour, in the range 0 to 59.`>
    'hour': <number: `The number of hours past midnight, in the range 0 to 23.`>
    'mday': <number: `The day of the month, in the range 1 to 31.`>
    'mon': <number: `The number of months since January, in the range 0 to 11.`>
    'year': <number: `The number of years since 1900.`>
    'wday': <number: `The number of days since Sunday, in the range 0 to 6.`>
    'yday': <number: `The number of days since January 1, in the range 0 to 365.`>
    'isdst': <number: `A flag that indicates whether daylight saving time is in effect at the time described. The value is positive if daylight saving time is in effect, zero if it is not, and negative if the information is not available .`>
    'tz': <string: `The timezone name.`>
}
```

**Example**

```js
// Get the decomposition time of the current time in the current time zone
$DATETIME.utctime
     // object

// Get the decomposition time one hour before the current time
$DATETIME.utctime($MATH.sub($SYS.time, 3600))
     // object
```

**Reference**

- C standard function: `gmtime_r()`

#### 3.6.3) `localtime` Method

Get the broken down time for the specified time zone.

**Description**

```js
$DATETIME.localtime object : `An object representing the current broken-down time in the current timezone.`
```

Get the broken-down time of the current time in the current time zone, and the return type is an object.


```js
$DATETIME.localtime(
         [, <null | number | longint | ulongint | longdouble $seconds: `seconds since Epoch; @null for the current calendar time.`>
             [, <string $timezone>
             ]
         ]
) object
```

Get the broken-down time of the given time in the specified time zone, and the return type is an object.

The decomposition time object returned by the above method contains the following properties:

```js
{
   'usec':  <number: `The number of microseconds after the second, in the range 0 to 999,999.`>
   'sec':   <number: `The number of seconds after the minute, normally in the range 0 to 59, but can be up to 60 to allow for leap seconds.`>
   'min':   <number: `The number of minutes after the hour, in the range 0 to 59.`>
   'hour':  <number: `The number of hours past midnight, in the range 0 to 23.`>
   'mday':  <number: `The day of the month, in the range 1 to 31.`>
   'mon':   <number: `The number of months since January, in the range 0 to 11.`>
   'year':  <number: `The number of years since 1900.`>
   'wday':  <number: `The number of days since Sunday, in the range 0 to 6.`>
   'yday':  <number: `The number of days since January 1, in the range 0 to 365.`>
   'isdst': <number: `A flag that indicates whether daylight saving time is in effect at the time described. The value is positive if daylight saving time is in effect, zero if it is not, and negative if the information is not available.`>
   'tz':    <string: `The timezone name.`>
}
```

**example**

```js
// Get the decomposition time of the current time in the current time zone
$DATETIME.localtime
     // object

// Get the decomposed time in Shanghai time zone (Beijing standard time) one hour before the current time
$DATETIME.localtime($MATH.sub($SYS.time, 3600), 'Asia/Shanghai')
```

**see**

- C standard function: `localtime_r()`

#### 3.6.4) `mktime` Method
Convert decomposed time to calendar time (seconds since Epoch).

**Description**

```js
$DATETIME.mktime(
         <object $tm>
) longdouble : `seconds (including microseconds) since Epoch.`
```

Convert the decomposition time to calendar time (seconds since Epoch), and the return value type is longdouble.

**Example**

**Reference**

- C standard function: `mktime_r()`

#### 3.6.5) `fmttime` Method

Format a calendar time.

**Description**

```js
$DATETIME.fmttime(
         <string $format: `the format string`>
         [, <null | number | longint | ulongint | longdouble: `the calendar time (seconds since Epoch); @null for the current calendar time.`>
             [, <string $timezone>
             ]
         ]
) string | false
```

This method formats a calendar time according to the specified format and returns a string.

This method uses the same formatting modifiers as the C standard function `strftime()`, with the following exceptions or enhancements:

1. GNU extension modifiers such as `_` are not supported.
1. `strftime()` only supports the output format of `+0200` when expressing the time zone difference. To support the format of `+02:00`, `{%z:}` can be used in the format string .
1. `strftime()` does not support milliseconds, to support milliseconds, use `{m}`.
1. When the format string starts with `{UTC}`, it means that the calendar time is not converted to local time according to the current time zone, but is always formatted in Coordinated Universal Time (UTC).
1. When the literal `{` and `}` symbols need to be represented in the format string, the escape character `\` is preceded.

**Example**

```js
// get a time string like `11:27`
$DATETIME.fmttime("It is %H:%M now")
     // string: 'It is 11:27 now'

// get a time string like `11:27`
$DATETIME.fmttime("Now is China Standard Time %H:%M", null, 'Asia/Shanghai')
     // string: 'Now is 11:27 China Standard Time'
```

**Reference**

- C standard function: `strftime()`

#### 3.6.6) `fmtbdtime` Method

Format the breakup time.

**Description**

```js
$DATETIME.fmtbdtime(
         <string $format: `the format string`>,
         <null | object $bdtime: `the broken-down time object returned by utctime() or localtime(); @null for the current calendar time in current timzone.`
) string | false
```

This method formats a decomposed time in the specified format and returns a string.

**Example**

```js
// get a time string like `08:55`
$DATETIME.fmtbdtime("It is %H:%M now in Asia/Shanghai", $DATETIME.localtime($MATH.sub($SYS.time, 3600), 'Asia/Shanghai'))
     // string: 'It is 08:55 now in Asia/Shanghai'
```

**Reference**

- C standard function: `strftime()`

### 3.7) `DATA` 

This dynamic variable is a walker-level built-in variable, which is used to return information such as the type of data and the number of members.

#### 3.7.1) `type` Method

Return the type name of the data.

**Description**

```js
$DATA.type(
         [ <any $data> ]
) string
```

This method returns the type name of the given data, a string. If no data is specified, it will be treated as `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$DATA.type
     // string: `undefined`

$DATA.type(3.5)
     // string: `number`
```

#### 3.7.2) `size` Method

Return the memory size occupied by the data.

**Description**

```js
$DATA. size(
         [ <any $data> ]
) ulongint
```

This method returns the size of the memory space occupied by the data, and the return value is of `ulongint` type. When no data is specified, it is treated as `undefined`.

Note: The return value of this function is related to the implementation of the interpreter. Developers should not expect different interpreters to return the same results for the same data.

**Exception**

This method does not raise an exception.

**Example**

```js
$DATA.size
     // ulongint: 32UL

$DATA. size( "HVML" )
     // ulongint: 32UL
```

#### 3.7.3) `count` Method

Return the number of child data items in the data.

**Description**

```js
$DATA.count(
         [ <any $data> ]
) ulongint
```

This method returns the number of sub-data items of the data, and the return value is of `ulongint` type. When no data is specified, it is treated as `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$DATA.count
     // ulongint: 0

$DATA. count( 3.5 )
     // ulongint: 1UL

$DATA.count( [ 1.0, 2.0 ] )
     // ulongint: 2UL
```

#### 3.7.4) `numerify` Method

Numerical processing of the given data.

**Description**

```js
$DATA.numerify(
         [ <any $data> ]
) number
```

This method performs numerical processing on arbitrary data and returns a value. When no data is specified, it is treated as `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$DATA.numerify( "1.0" )
     // number: 1.0

$DATA.numerify
     // number: 0
```

#### 3.7.5) `booleanize` Method

Booleanizes the given data.

**Description**

```js
$DATA. booleanize(
         [ <any $data> ]
) boolean
```

This method booleanizes the given data and returns a Boolean value. When no data is specified, it is treated as `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$DATA. booleanize
     // boolean: false
```

#### 3.7.6) `stringify` Method

Stringify the given data.

**Description**

```js
$DATA. stringify(
         <any $data>
) string
```

This method stringifies arbitrary data and returns a string. When no data is specified, it is treated as `undefined`.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed. Exceptions cannot be ignored.
- `TooSmall`: too small buffer. Exceptions cannot be ignored.

**example**

```js
$DATA.stringify
     // string: 'undefined'

$DATA. stringify(123)
     // string: '123'
```

#### 3.7.7) `serialize` Method

Stringify the given data.

**Description**

```js
$DATA.serialize(
        <any $data>
        [, < '[real-json | real-ejson] || [ runtime-null | runtime-string ] || plain || spaced || pretty || pretty_tab || [bseq-hex-string | bseq-hex | bseq-bin | bseq-bin-dots | bseq-base64] || no-trailing-zero || no-slash-escape' $options = `real-json runtime-null plain bseq-hex-string`:
            - 'real-json':          `use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
            - 'real-ejson':         `use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
            - 'runtime-null':       `treat all HVML-specific runtime types as null, i.e., undefined, dynamic, and native values will be serialized as null.`
            - 'runtime-string':     `use string placehodlers for HVML-specific runtime types: "<undefined>", "<dynamic>", and "<native>".`
            - 'plain':              `do not use any extra formatting characters (whitespace, newline, or tab).`
            - 'spaced':             `use minimal space characters to format the output.`
            - 'pretty':             `use two-space to beautify the output.`
            - 'pretty-tab':         `use tab instead of two-space to beautify the output.`
            - 'bseq-hex-string':    `serialize binary sequence as hexadecimal string, e.g. "A0B0C0567890".`
            - 'bseq-hex':           `use hexadecimal form to serialize binary sequence.`
            - 'bseq-bin':           `use binary form to serialize binary sequence.`
            - 'bseq-bin-dots':      `use binary form to serialize binary sequence and use dots to seperate the binary digits per four digits. e.g., b1100.1010.`
            - 'bseq-base64':        `use Base64 to serialize binary sequence.`
            - 'no-trailing-zero':   `drop trailing zero for float values.`
            - 'no-slash-escape':    `do not escape the forward slashes ('/').`
           >
        ]
) string
```

This method serializes the given data and returns a string. When no data is specified, it is treated as `undefined` and the default formatting requirements.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed. Exceptions cannot be ignored.

**Example**

```js
$DATA.serialize
     // string: 'null'

$DATA.serialize(undefined, 'runtime-string')
     // string: '"<undefined>"'

$DATA. serialize("123")
     // string: '"123"'

$DATA. serialize([1, 2])
     // string: '[1,2]'
```

#### 3.7.8) `sort` Method

Performs a sort on an array or collection.

**describe**

```js
$DATA.sort(
         <array | set $data>,
         < 'asc | desc' $method = 'asc': sorting ascendingly or descendingly >
         [, < 'auto | number | case | caseless' $method = 'auto':
             - 'auto': `comparing members automatically;`
             - 'number': `comparing members as numbers;`
             - 'case': `comparing members as strings case-sensitively;`
             - 'caseless': `comparing members as strings case-insensitively.` >
         ]
) $data | false
```

This method sorts the given array or collection and returns the data itself.

**abnormal**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, `false` is returned when silently evaluated.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and `false` will be returned for silent evaluation.

**example**

```js
$DATA.sort([3, 4, 1, 0], 'asc')
     // array: [0, 1, 3, 4]
```

#### 3.7.9) `shuffle` Method

Randomly shuffle the order of the members of the given array or collection.

**describe**

```js
$DATA.shuffle(
         <array | set $data>,
) $data | false
```

This method randomly shuffles the order of the members of the given array or collection and returns the data itself.

**abnormal**

This method may generate the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, `false` is returned when silently evaluated.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and `false` will be returned for silent evaluation.

**Example**

```js
$DATA.shuffle([1, 2, 3, 4, 5])
     // array: [4, 3, 2, 5, 1]
```

#### 3.7.10) `compare` Method

Compare two data.

**Description**

```js
$DATA. compare(
         < any: the first data >,
         < any: the second data >
         [, < 'auto | number | case | caseless' = 'auto':
             - 'auto': `comparing automatically;`
             - 'number': `comparing as numbers;`
             - 'case': `comparing as strings case-sensitively;`
             - 'caseless': `comparing as strings case-insensitively.` >
         ]
) number | undefined
```

This method compares the given two data and returns the value:

- equal to 0 means that the two data are equal;
- less than 0 means that the first data is smaller than the second data;
- Greater than 0 indicates that the first data is greater than the second data.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.

**example**

```js
$DATA. compare(1, "1")
     // number: 0
```

#### 3.7.11) `parse` Method

Parse JSON/eJSON string and return data.

**Description**

```js
$DATA. parse(
         < string: $string: the JSON/EJSON string to be parsed. >
) any | undefined
```

This method parses the JSON/EJSON string and returns the data.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.

**Example**

```js
#DATA. parse("false")
     // boolean: false

#DATA. parse("[]")
     // array: []
```

#### 3.7.12) `isequal` Method

Determine whether two data are exactly equal.

**Description**

```js
$DATA. isequal(
         < any: the first data >,
         < any: the second data >
) boolean | undefined
```

This method judges whether the given two data are completely equal (consistent types and equal values), and returns a Boolean type.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: A required argument is missing. Exceptions can be ignored, returning `undefined`.

**Example**

```js
#DATA. isequal(false, 0)
     // boolean: false

#DATA. isequal(false, false)
     // boolean: true
```

#### 3.7.13) `fetchstr` Method

Extracts a string of the specified encoding from a sequence of binary bytes.

**describe**

```js
$DATA.fetchstr( <bsequece $bytes>,
         <'utf8 | utf16 | utf32 | utf16le | utf32le | utf16be | utf32be' $encoding: `the encoding; see Binary Format Notation.` >
         [, < null | real $length = null: `the length to decode in bytes.` >
             [, < real $offset = 0: `the offset in the byte sequence.` > ]
         ]
) string
```

This method converts the given binary byte sequence into the corresponding string according to the specified encoding and length, and returns the string. A `BadEncoding` exception will be thrown when the wrong encoding is included; or when silently evaluated, the correctly converted string will be returned.

**parameter**

- `bytes`
The sequence of binary bytes to process.
- `encoding`
Specifies the character encoding.
- `length`
Specifies the decoding length (in bytes). When `null` is taken, it means until the termination character is encountered: for UTF-8 encoding, until encountering `\0` bytes; for UTF-16 encoding, until encountering two consecutive `\0` bytes; for UTF -32 encoding, until four consecutive `\0` bytes are encountered.
- `offset`
Specify the decoding start position (in bytes). Can be negative, -1 for the last byte, -2 for the second-to-last byte, and so on.

**abnormal**

This method may throw the following exceptions:

- `ArgumentMissed`: A required argument is missing. Returns an empty string when evaluated silently.
- `WrongDataType`: Wrong parameter type. Returns an empty string when evaluated silently.
- `BadEncoding`: Bad encoding. Returns an empty string when evaluated silently.
- `InvalidValue`: Incorrect length or offset value. Returns an empty string when evaluated silently.

**example**

```js
// UTF8: Beijing Shanghai
$DATA.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8', 6, -6 )
     // string: "Shanghai"

// UTF8: Beijing Shanghai
$DATA.fetchstr( bxE58C97E4BAACE4B88AE6B5B7, 'utf8:6' )
     // string: "Beijing"
```

#### 3.7.14) `fetchreal` Method

This method extracts real numbers according to the specified real number type (and the order of size and head) at the specified position of the given binary sequence, and returns the corresponding real number type.

```js
$DATA.fetchreal( <bsequece $bytes>,
         <'i8 | i16 | i32 | i64 | u8 | u16 | u32 | u64 | f16 | f32 | f64 | f96 | f128 ...' $binary_format: `the binary format and/or endianness; see Binary Format Notation`>
         [, < real $offset = 0: `the offset in the byte sequence.` > ]
) real | array | undefined
```

This method converts the given binary byte sequence to the corresponding real number type according to the specified format.

This method supports `i16[le|be][:<QUANTITY>]` notation, which is used to represent the size and number of real numbers. When a valid number is specified, an array is returned.

**abnormal**

This method may throw the following exceptions:

- `WrongDataType`: Wrong data type; exceptions can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: wrong offset value or number exceeding the length of the binary byte order, etc.; the exception can be ignored, and `undefined` will be returned during silent evaluation.

**example**

```js
$DATA.fetchreal( bx0a00, 'i16le', 0 )
     // longint: 10L

$DATA.fetchreal( bx0a00, 'i8:2', 0 )
     // array: [ 10L, 00L ]
```

#### 3.7.15) `crc32` Method

Computes the CRC32 polynomial value of arbitrary data.

**describe**

```js
$DATA.crc32(
         <any $data>
         < 'CRC-32 | CRC-32/BZIP2 | CRC-32/MPEG-2 | CRC-32/POSIX | CRC-32/XFER | CRC-32/ISCSI | CRC-32C | CRC-32D | CRC-32/JAMCRC | CRC-32/AIXM | CRC-32Q' $algo = 'CRC-32': `the name of CRC32 algorithm; use @null for default algorithm.`>
         < 'ulongint | binary | uppercase | lowercase' $type = 'ulongint': `the type of return data:`
             - 'ulongint': `a unsigned longint value have the CRC32 checksum.`
             - 'binary': `a byte sequence (totally 4 bytes).`
             - 'uppercase': `a 8-character hexadecimal string in uppercase letters.`
             - 'lowercase': `a 8-character hexadecimal string in lowercase letters.` >
) ulongint | bsequence | string | undefined
```

This method computes the CRC32 polynomial value of arbitrary data. For data that is not a string or byte sequence, this method performs calculations based on the stringified data.

**abnormal**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Incorrect CRC32 algorithm name; the exception can be ignored, and `undefined` is returned when evaluated silently.

**example**

```
$DATA.crc32('HVML', 'CRC-32/POSIX', 'uppercase')
     // string: '7AD1CDE5'
```

**see**

- PHP `crc32()` function: <https://www.php.net/manual/en/function.crc32.php>
- [CRC Online Calculation]<https://crccalc.com/>
- [Catalogue of parametrised CRC algorithms](https://reveng.sourceforge.io/crc-catalogue/17plus.htm)

#### 3.7.16) `md5` Method

Computes the MD5 hash of arbitrary data.

**describe**

```js
$DATA.md5(
         <any $data>
         < 'binary | uppercase | lowercase' $type = 'binary': `the type of return data:`
             'binary' - `the MD5 digest is returned as a binary sequence (totally 16 bytes).`
             'uppercase' - `the MD5 digest is returned as a 32-character hexadecimal number in uppercase letters.`
             'lowercase' - `the MD5 digest is returned as a 32-character hexadecimal number in lowercase letters.`
         >
) string | bsequence
```

This method computes the MD5 hash of arbitrary data. For data that is not a string or byte sequence, this method performs calculations based on the stringified data.

**example**

**see**

- PHP `md5()` function: <https://www.php.net/manual/en/function.md5.php>

#### 3.7.17) `sha1` Method

Computes the SHA1 hash value of arbitrary data.

**describe**

```js
$DATA.sha1(
         <any $data>
         < 'binary | uppercase | lowercase' $type = 'binary': `the type of return data:`
             'binary' - `the MD5 digest is returned as a binary sequence (totally 20 bytes).`
             'uppercase' - `the MD5 digest is returned as a 40-character hexadecimal number in uppercase letters.`
             'lowercase' - `the MD5 digest is returned as a 40-character hexadecimal number in lowercase letters.`
         >
) string | bsequence
```

This method computes the SHA1 hash value of arbitrary data. For data that is not a string or byte sequence, this method performs calculations based on the stringified data.

**Example**

**Reference**

- PHP `sha1()` function: <https://www.php.net/manual/en/function.sha1.php>

#### 3.7.18) `pack` Method

Pack multiple data into a binary sequence.

**Description**

```js
$DATA.pack(
         <string $format: `the format string; see Binary Format Notation.` >,
         <real | string | bsequence | array $first: `the first data.` >
         [, <real | string | bsequence | array $second: `the second data.` >
             [, <real | string | bsequence | array $third: `the third data.` >
                 [, ... ]
             ]
         ]
) string
```

This function packs the incoming multiple real numbers, arrays of real numbers, strings or byte sequences into byte sequences according to the binary format specified by `$format`.

```js
$DATA.pack(
         < string $format: `the format string; see Binary Format Notation.` >,
         <array $data>
) string
```

When two parameters are passed in, and the second parameter is an array, this function converts the members of the passed array into byte sequences according to the binary format specified by `$format`.

**Abnormal**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, silent evaluation returns packed data.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and packed data is returned when evaluated silently.
- `BadEncoding`: Bad encoding; exceptions can be ignored, and packed data is returned when evaluated silently.
- `InvalidValue`: The given data exceeds the range of real numbers specified by the format; the exception can be ignored, and the packed data is returned during silent evaluation.

**Remark**

To prevent confusion, when using the first prototype, make sure that the first parameter is not an array, or pass in three or more parameters.

**Example**

```js
$DATA.pack( "i16le i32le", 10, 10)
     // bsequence: bx0a000a000000

$DATA.pack( "i16le:2 i32le", [[10, 15], 255])
     // bsequence: bx0A000F00FF000000

$DATA.pack( "i16le:2 i32le", [10, 15], 255)
     // bsequence: bx0A000F00FF000000
```

**see**

- [1.2) Binary format notation] (#12-Binary format notation)

#### 3.7.19) `unpack` method

Decompose a binary sequence into multiple data.

**describe**

```js
$DATA.unpack(
         <string $format: `the format string; see Binary Format Notation.` >,
         <bsequence $data: `the data.`>
) array | real | string | bsequence
```

This function decomposes the incoming byte sequence into an array of multiple data according to the binary format specified by `$format`.

When the format string specified by `$format` contains multiple primitive data types, the function returns an array; otherwise, it returns a single data.

**abnormal**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, silent evaluation returns decomposed data.
- `InvalidValue`: format and byte sequence do not match; exception can be ignored, silent evaluation returns decomposed data.

**example**

```js
$DATA.unpack( "i16le i32le", bx0a000a000000)
     // array: [10L, 10L]

$DATA.unpack( "i16le", bx0a000a000000)
     // longint: 10L
```

**Reference**

- [1.2) Binary format notation] (#12-Binary format notation)

#### 3.7.20) `bin2hex` method

Convert a string or byte sequence to a hexadecimal string representation.

**describe**

```js
$DATA.bin2hex(
         <string | bsequence $data>
         [, < 'lowercase | uppercase' $options = 'lowercase':
             - 'lowercase': `use lowercase letters for hexadecimal digits.`
             - 'uppercase': `use uppercase letters for hexadecimal digits.`
             >
         ]
) string
```

This function converts a sequence of bytes `data` into a string represented in hexadecimal. The conversion is in bytes, with the upper nibble first.

**abnormal**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, empty string is returned when silently evaluated.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and empty strings are returned for silent evaluation.

**Example**

```js
$DATA.bin2hex( bb0000.1111.1111.0000, 'uppercase')
     // string: '0FF0'
```

**Reference**

- PHP `bin2hex()` function: <https://www.php.net/manual/en/function.bin2hex.php>

#### 3.7.21) `hex2bin` Method

Convert a hexadecimal string to a sequence of bytes.

**Description**

```js
$DATA.hex2bin(
         <string $data>
) bsequence
```

This function converts the hexadecimal string `data` into a sequence of binary bytes.

**Exception**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, silent evaluation returns empty byte sequence.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and an empty byte sequence is returned on silent evaluation.
- `BadEncoding`: Unrecognized hexadecimal string; exception can be ignored, silent evaluation returns empty byte sequence.

**Example**

```js
$DATA.hex2bin( '0FF0' )
     // bsequence: bb0000.1111.1111.0000
```

**Reference**

- PHP `bin2hex()` function: <https://www.php.net/manual/en/function.hex2bin.php>

#### 3.7.22) `base64_encode` method

Encode a string or sequence of bytes using MIME Base64.

**Description**

```js
$DATA.base64_encode(
         <string | bsequence $data>
) string
```

This function encodes the given string or binary sequence `data` according to Base64.

**Exception**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, empty string is returned when silently evaluated.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and empty strings are returned for silent evaluation.

**Example**

```js
$DATA.base64_encode( bx48564D4C )
     // string: 'SFZNTA=='

$DATA.base64_encode('HVML is the world's first programmable markup language')
     // string: 'SFZNTCDmmK/lhajnkIPpppbmrL7lj6/nvJbnqIvmoIforrDor63oqIA='
```

**Reference**

- PHP `base64_encode()` function: <https://www.php.net/manual/en/function.base64-encode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.7.23) `base64_decode` Method

Decode a string encoded using MIME Base64.

**Description**

```js
$DATA.base64_decode(
         <string $data>,
) bsequence
```

This function decodes the input string `data` according to Base64 and returns the decoded byte sequence.

**Exception**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, silent evaluation returns empty byte sequence.
- `WrongDataType`: Wrong data type; exceptions can be ignored, and an empty byte sequence is returned on silent evaluation.
- `BadEncoding`: Bad Base64 encoding; exception can be ignored, and silent evaluation returns an empty byte sequence.

**example**

```js
$DATA.base64_decode('SFZNTA==')
     // bsequence: bx48564D4C
```

**Reference**

- PHP `base64_decode()` function: <https://www.php.net/manual/en/function.base64-decode.php>
- [RFC 2045](http://www.faqs.org/rfcs/rfc2045) section 6.8

#### 3.7.24) `arith` Method

Perform simple integer arithmetic operations on two numeric values.

**Description**

```js
$DATA.arith(
         <' + | - | * | / | % | ^ ' $arithmetic_operation>,
         <any $data1>,
         <any $data2>
) longint | undefined
```

This function will perform integer-based arithmetic calculations such as addition, subtraction, multiplication, division, modulus, power, etc. on the two input values, and always returns a result of type `longint`. The two values will first be coerced to values of type `longint`, and then the corresponding operations will be performed.

**Exception**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Wrong data type, that is, data that cannot be converted to a value of type `longint`; the exception can be ignored, and `undefined` will be returned during silent evaluation.
- `InvalidValue`: Incorrect value, such as a division by zero, or an incorrect bitwise operator; exceptions can be ignored, and `undefined` will be returned for silent evaluation.

**Example**

```js
$DATA.arith('+', 3, 2)
     // longint: 5L
```

#### 3.7.25) `bitwise` Method

Bit calculation based on two values.

**Description**

```js
$DATA. bitwise(
         <' & | "|" | ~ | ^ | < | > ' $bitwise_operation>,
         <any $data1>
         [, <any $data2> ]
) ulongint | undefined
```

This function performs bitwise operations on two input values (or one value) based on unsigned integers and, or, inverse, or, left shift, right shift, etc., and always returns the result of `ulongint` type. The value involved in the calculation will first be cast to `ulongint` type, and then the corresponding operation will be performed.

**Exception**

This method may throw the following exceptions:

- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Wrong data type, that is, data that cannot be converted to a value of type `ulongint`; the exception can be ignored, and `undefined` will be returned during silent evaluation.
- `InvalidValue`: Invalid value, such as an incorrect bitwise operator; exceptions can be ignored, and `undefined` is returned when silently evaluated.

**Example**

```js
$DATA. bitwise( '|', 0, 15 )
     // ulongint: 15UL
```

#### 3.7.26) `contains` Method

Determine whether a given value is contained in a linear container (such as an array, tuple, or collection).

**Description**

```js
$DATA. contains(
         <linctnr $haystack: `the linear container to search in.` >,
         <any $needle: `the variant to search for in the haystack.` >
         [, < 'exact | number | case | caseless | wildcard | regexp' $method = 'exact': `the search method:`
             - 'exact': `compaer two variants exactly.`
             - 'number': `comparing two variants as numbers.`
             - 'case': `comparing two variants as strings case-sensitively.`
             - 'caseless': `comparing two variants as strings case-insensitively.`
             - 'wildcard': `comparing two variants as strings and @needle as a wildcard.`
             - 'regexp': `comparing two variants as strings and @needle as a regular expression.`
         > ]
) longint
```

Determine whether the specified value `needle` is contained in the linear container `haystack`, and return the index of the first matching value in the linear container.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return `-1L` for silent evaluation.
- `WrongDataType`: Exceptions can be ignored; return `-1L` when evaluated silently.

**Reference**

- `haystack`
The linear container to be searched.
- `needle`
The variant to search for.
- `method`
Specifies the matching method. Four methods are available: exact (exact), numeric (numeric), case-sensitive (case), and case-insensitive (caseless).

**Return Value**

If `needle` is in `haystack`, return index >= 0, otherwise return `-1L`.

**Example**

```js
$DATA. contains([1, 2, 3], 3)
     // longint: 2L

$DATA. contains(['a', 'b'], 'c')
     // longint: -1L
```

#### 3.7.27) `has` Method

Determine whether an object contains the property defined by the specified key name.

**Description**

```js
$DATA.has(
         <object $haystack: `the object to search in.` >,
         <any $needle: `the key value to search for in the haystack.` >
         [, < 'exact | number | case | caseless | wildcard | regexp' $method = 'exact': `the search method:`
             - 'exact': `compaer two variants exactly.`
             - 'number': `comparing two variants as numbers.`
             - 'case': `comparing two variants as strings case-sensitively.`
             - 'caseless': `comparing two variants as strings case-insensitively.`
             - 'wildcard': `comparing two variants as strings and @needle as a wildcard.`
             - 'regexp': `comparing two variants as strings and @needle as a regular expression.`
         > ]
) any | undefined
```

Determine whether the object `haystack` contains the attribute defined by the specified key name `needle`, if so, return the corresponding attribute value, otherwise, an exception will be generated or `undefined` will be returned.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return `undefined` when evaluated silently.
- `WrongDataType`: Exceptions can be ignored; return `undefined` when evaluated silently.
- `NoSuchKey`: exceptions can be ignored; return `undefined` when evaluated silently.

**Reference**

- `haystack`
The object being searched for.
- `needle`
The key name to search for.
- `method`
Specify the matching method. Four methods are available: exact, numeric, case, and caseless.

**Return Value**

If the key specified by `needle` has any matching properties in `haystack`, return the first matching property value.

**Example**

```js
$DATA.has({ "a": 1, "b": 2, "c": 3}, "a")
     // 1

$DATA.has({ "a": 1, "b": 2, "c": 3}, "C", 'caseless')
     // 3
```

### 3.8) `L`

This variable is a walker-level built-in variable, mainly used for logic operations.

See [HVML 1.0 Specification - 2.1.4) Coercion rules for arbitrary data types](hvml-spec-v1.0-zh.md#214-%E4% BB%BB%E6%84%8F%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%BA%E5%88% B6%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99).

#### 3.8.1) `not` Method

Logical negation operation.

**Description**

```js
$L.not(<any>)
```

This method booleanizes the given data, then performs a logical negation, returning `true` or `false`. If no argument is passed, it is treated as `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.not
     // boolean: true

$L.not( false )
     // boolean: true
```

#### 3.8.2) `and` Method

Logical and operation.

**Description**

```js
$L.and(<any>, <any>[, <any>[, ...]])
```

This method performs Boolean processing on the given two or more data, and then performs a logical AND operation, returning `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.and
     // boolean: false

$L.and(true)
     // boolean: false

$L.and( false, true )
     // boolean: false

$L.and( 1, 2, 3 )
     // boolean: true
```

#### 3.8.3) `or` method

Logical OR operation.

**describe**

```js
$L.or(<any>, <any>[, <any>[, ...]])
```

This method performs Boolean processing on the given two or more data, and then performs a logical OR operation, returning `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.or
     // boolean: false

$L.or(true)
     // boolean: true

$L.or( false, true )
     // boolean: true
```

#### 3.8.4) `xor` Method

Logical or operation.

**Description**

```js
$L.xor(<any>, <any>)
```

This method performs Boolean processing on the given two data, and then performs logical OR operation, returning `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.xor
     // boolean: false

$L.xor( true )
     // boolean: true

$L.xor( false, true )
     // boolean: true
```

#### 3.8.5) `eq` Method

Compare whether two numbers are numerically equal.

**Description**

```js
$L.eq(<any>, <any>)
```

This method compares whether two values are numerically equal and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.eq
     // boolean: true

$L.eq(false)
     // boolean: true

$L.eq("1", 1)
     // boolean: true
```

#### 3.8.6) `ne` Method

Compare whether two numbers are numerically unequal.

**Description**

```js
$L.ne(<any>, <any>)
```

This method compares whether two values are numerically unequal and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.ne
     // boolean: false

$L.ne(true)
     // boolean: true

$L.ne("1", 2)
     // boolean: true
```

#### 3.8.7) `gt` Method

Compare whether the first data is numerically greater than the second data.

**Description**

```js
$L.gt(<any>, <any>)
```

This method compares whether the first data is numerically greater than the second data, and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.gt
     // boolean: false

$L.gt(true)
     // boolean: true

$L.gt("2", 1)
     // boolean: true
```

#### 3.8.8) `ge` Method

Compare whether the first data is numerically greater than or equal to the second data.

**Description**

```js
$L.ge(<any>, <any>)
```

This method compares whether the first data is numerically greater than or equal to the second data, and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.ge
     // boolean: true

$L.ge(true)
     // boolean: true

$L.ge(false)
     // boolean: true

$L.ge("2", 2)
     // boolean: true
```

#### 3.8.9) `lt` Method

Compare whether the first data is numerically smaller than the second data.

**Description**

```js
$L.lt(<any>, <any>)
```

This method compares whether the first data is numerically smaller than the second data, and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.lt
     // boolean: false

$L.lt(true)
     // boolean: false

$L.lt("2", 1)
     // boolean: false
```

#### 3.8.10) `le` Method

Compare whether the first data is numerically less than or equal to the second data.

**describe**

```js
$L.le(<any>, <any>)
```

This method compares whether the first data is numerically less than or equal to the second data, and returns `true` or `false`. If one or both of the first two parameters are missing, it is considered `undefined`.

**Exception**

This method does not raise an exception.

**Example**

```js
$L.le
     // boolean: true

$L.le(true)
     // boolean: false

$L.le(false)
     // boolean: true

$L.le("1", 2)
     // boolean: true
```

#### 3.8.11) `streq` Method

Compare the string representations of two data for equality or match.

**Description**

```js
$L.streq("case | caseless | wildcard | regexp",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` for comparing the string representations of two values for equality or match.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive, wildcard pattern matching, regular expression matching), and the following two parameters are used to pass two strings. When using wildcards and regular expressions, the first parameter is used to specify the wildcard pattern string or regular expression.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```js
$L. streq("case", "zh_cn", "zh_CN")
     // boolean: false

$L. streq("wildcard", "zh_*", "zh_CN")
     // boolean: true

$L. streq("regexp", "^zh", "zh_CN")
     // boolean: true
```

#### 3.8.12) `strne` Method

Compares the string forms of two data for unequal or mismatch.

**Description**

```js
$L.strne("case | caseless | wildcard | regexp",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` if the string representations of two values are not equal or do not match.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive, wildcard pattern matching, regular expression matching), and the following two parameters are used to pass two strings. When using wildcards and regular expressions, the first parameter is used to specify the wildcard pattern string or regular expression.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```js
$L.strne("case", "zh_cn", "zh_CN")
     // boolean: true

$L.strne("wildcard", "zh_*", "zh_CN")
     // boolean: false

$L.strne("regexp", "^zh", "zh_CN")
     // boolean: false
```

#### 3.8.13) `strgt` Method

Compare whether the string form of the first data is greater than the string form of the second data.

**Description**

```js
$L.strgt("case | caseless",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` by comparing whether the string representation of the first data is greater than the string representation of the second data.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive), and the following two parameters are used to pass two data.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```
$L.strgt("case", 'A', 'Z')
     // boolean: false
```

#### 3.8.14) `strge` Method

Compare whether the string form of the first data is greater than or equal to the string form of the second data.

**Description**

```js
$L.strge("case | caseless",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` if the string representation of the first data is greater than or equal to the string representation of the second data.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive), and the following two parameters are used to pass two data.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```js
$L.strge("case", 'A', 'A')
     // boolean: true
```


#### 3.8.15) `strlt` Method

Compare whether the string form of the first data is smaller than the string form of the second data.

**Description**

```js
$L.strlt("case | caseless",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` by comparing whether the string representation of the first data is less than the string representation of the second data.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive), and the following two parameters are used to pass two data.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```js
$L.strlt("case", 'A', 'Z')
     // boolean: true
```

#### 3.8.16) `strle` Method

Compare whether the string form of the first data is less than or equal to the string form of the second data.

**Description**

```js
$L.strle("case | caseless",
         <any>,
         <any>
) boolean | undefined
```

Return `true` or `false` if the string representation of the first data is less than or equal to the string representation of the second data.

The first parameter is used to indicate the matching method of the string (case-sensitive, case-insensitive), and the following two parameters are used to pass two data.

For data of non-string type, compare after stringifying.

**Exception**

This method may generate the following exceptions:

- `ArgumentMissed`: No argument was given. Can be ignored; when evaluated silently, `undefined` is returned.
- `WrongDataType`: Wrong parameter type. Can be ignored; when evaluated silently, `undefined` is returned.
- `InvalidValue`: Incorrect parameter. Can be ignored; when evaluated silently, `undefined` is returned.

**Example**

```js
$L.strle("case", 'A', 'Z')
     // boolean: true
```

#### 3.8.17) `eval` Method

Evaluate a parameterized logical operation expression.

**Description**

```js
$L.eval(
         <string: `logical expression`>
         [, <object: `the parameter map`> ]
) boolean | undefined
```

This method evaluates a parameterized logical operation expression and returns `true` or `false`.

**Example**

```js
$L.eval("x > y && y > z || b", { x: 2, y: 1, z: 0, b: $L.streq("case", $a, $b) })
     // boolean: true
```

### 3.9) `T`

This variable is a coroutine-level built-in variable, mainly used for localization substitution of text.

- `get`: A dynamic method that returns the replacement string.

#### 3.9.1) `map` Static Property

`map` is a static attribute of `T`, which is used to define the string mapping table, and is initially an empty object. Programs can set their content using the `update` element:

```html
<!DOCTYPE hvml>
<hvml target="html">
     <head>
         <update on="$T. map" to="displace">
             {
                 "Hello, world!": "Hello, world!",
                 "Hello, HVML!": "Hello, HVML!",
             }
         </update>

         <title>$T. get('Hello, world!')</title>
     </head>

     <body>
         <p>$T.get('Hello, HVML!')</p>
     </body>

</hvml>
```

#### 3.9.2) `get` method

**Description**

```js
$T.get(
         <string $text: `the original text.` >
) string : `the translated text.`
```

This method returns the translated text based on the original text. If there is no matching text in `$T.map`, the original text itself is returned.

**Exception**

- `ArgumentMissed`: A required argument is missing; the exception can be ignored, and an empty string is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored, empty string is returned for silent evaluation.

**Example**

```js
$T.get('Hello, world!')
     // string: 'Hello world! '
```

### 3.10) `STR`

`STR` is a built-in dynamic variable that is used to implement common string operations.

In the process of calling `STR` dynamic object method, the following exceptions may occur:

- `ArgumentMissed`: A required argument is missing, or insufficient arguments were passed in.
- `WrongDataType`: Wrong parameter type.
- `BadEncoding`: Bad encoding.

#### 3.10.1) `contains` Method

Determine whether a given substring is contained in a string.

**Description**

```js
$STR. contains(
         <string $haystack: `the string to search in.` >,
         <string $needle: `the substring to search for in the haystack.` >
         [, < boolean $case_insensitivity = false:
             false - `performs a case-sensitive check;`
             true - `performs a case-insensitive check.` >
         ]
) boolean
```

To determine whether the string `haystack` contains the string `needle`, execute

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return `false` for silent evaluation.
- `WrongDataType`: Exceptions can be ignored; return `false` when evaluated silently.

**Parameter**

- `haystack`
The string to be searched for.
- `needle`
The substring to search for.
- `case_insensitivity`
Specify whether to ignore case (optional); default is to ignore case.

**Return Value**

Return `true` if `needle` is in `haystack`, otherwise return `false`.

**Example**

```js
$STR. contains('Hello, world!', 'world')
     // boolean: true

$STR. contains('Hello, world!', '')
     // boolean: true
```

**Reference**

- PHP `str_contains()` function: <https://www.php.net/manual/en/function.str-contains.php>

#### 3.10.2) `starts_with` Method

Used to determine whether a string starts with a given string.

**Description**

```js
$STR.starts_with(
         <string $haystack: `the string to search in.`>,
         <string $needle: `the substring to search for in the haystack.`>
         [, <boolean $case_insensitivity = false:
             false - `performs a case-sensitive check;`
             true - `performs a case-insensitive check.`>
         ]
) boolean
```

Check if the string `haystack` starts with the substring `needle`.

**Parameter**

- `haystack`
The string to be searched for.
- `needle`
The substring to search for.
- `case_insensitivity`
Specifies whether to ignore case (optional); default is to ignore case.

**Return Value**

Return `true` if `haystack` starts with `needle`, otherwise return `false`.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return `false` for silent evaluation.
- `WrongDataType`: Exceptions can be ignored; return `false` when evaluated silently.

**Example**

```js
$STR.starts_with('Hello, world', 'hello', true)
     // boolean: true

$STR.starts_with('Hello, world', '')
     // boolean: true
```

**Reference**

- PHP `str_starts_with()` function: <https://www.php.net/manual/en/function.str-starts-with.php>

#### 3.10.3) `ends_with` Method

Used to determine whether a string ends with a given string.

```js
$STR.ends_with(
         <string $haystack: `the string to search in.`>,
         <string $needle: `the substring to search for in the haystack.`>
         [, <boolean $case_insensitivity = false:
             false - `performs a case-sensitive check;`
             true - `performs a case-insensitive check.`>
         ]
) boolean
```

Check if the string `haystack` ends with the substring `needle`.

**Parameter**

- `haystack`
The string to be searched for.
- `needle`
The substring to search for.
- `case_insensitivity`
Specify whether to ignore case (optional); default is to ignore case.

**Return Value**

Return `true` if `haystack` ends with `needle`, otherwise return `false`.

- `ArgumentMissed`: Exceptions can be ignored; return `false` for silent evaluation.
- `WrongDataType`: Exceptions can be ignored; return `false` when evaluated silently.

**Example**

```js
$STR.ends_with('Hello, world', 'World', true)
     // boolean: true

$STR.ends_with('Hello, world', '')
     // boolean: true
```

**Reference**

- PHP `str_ends_with()` function: <https://www.php.net/manual/en/function.str-ends-with.php>

#### 3.10.4) `explode` Method

Split a string using the specified substring.

**Description**

```js
$STR.explode(
         <string $string: `the input string to explode.`>
         [, <string $separator = '': `the boundary string.`>
             [, <real $limit = 0: `the limitation of members in the result array.`>]
         ]
) array
```

This function returns an array of strings, each element is a substring of `string`, and they are separated by the string `separator` as boundary points.

**Parameter**

- `string`
Enter a string.
- `seperator`
Delimited strings. When `separator` is empty, the input string is separated by characters; when `separator` is omitted, the separator string is treated as an empty string.
- `limit`
    If the `limit` parameter is positive, the returned array contains at most `limit` members, and the last member will contain the remainder of `string`.
    If the `limit` argument is negative, all but the last `-limit` elements are returned.
    If `limit` is 0, it means unlimited.

**Return Value**

This function returns an array of strings, each member of which is a substring of `string` separated by the string `separator` as boundary points.

If `separator` is an empty string, the input string will be character-separated. If `separator` contains a value not found in `string`, and a negative `limit` is used, then an empty array is returned, otherwise an array containing only a single member of `string` is returned. If `separator` appears at the beginning or end of `string`, an empty string (`""`) will be added as a boundary value at the beginning or end of the returned array.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return an empty array when silently evaluated.
- `WrongDataType`: Exceptions can be ignored; return an empty array when evaluated silently.

**Example**

```js
$STR.explode('beijing:shanghai:guangzhou', ':')
     // array: ['beijing', 'shanghai', 'guangzhou']

$STR. explode('1, 2, 3, ', ', ')
     // array: ['1', '2', '3', ''],

$STR.explode('Chinese characters')
     // array: ['Chinese', 'word']

$STR.explode('People's Republic of China', '', 2)
     // array: ['中', 'Hua']
```

**Reference**

- PHP `explode()` function: <https://www.php.net/manual/en/function.explode.php>

#### 3.10.5) `implode` Method

Concatenate the members of an array into a new string. Concatenate the strings in the string array using the specified string.

**Description**

```js
$STR.implode(
         <array $pieces: `the array to implode.`>
         [, <string $separator = '': `the boundary string.`>]
) string
```

Use `separator` to stringify the members of the array `pieces` and concatenate them into a new string.

**Parameter**

- `pieces`
Array; if a member of the array is not a string, stringify it first.
- `seperator`
Delimiter string; if not passed, it is treated as an empty string

**Return Value**

Return the new string after concatenation. Return an empty string if the array is empty. If `separator` is an empty string, this method directly concatenates each string in the array without a separator between each string.

**Exception**

- `ArgumentMissed`: The exception can be ignored; returns an empty string when evaluated silently.
- `WrongDataType`: Exceptions can be ignored; return an empty string when evaluated silently.

**Example**

```js
$STR.implode(['beijing', 'shanghai', 'guangzhou'], ', ')
     // string: 'beijing, shanghai, guangzhou'

$STR.implode([1, 2, 3, ''], ', ')
     // string: '1, 2, 3, '

$STR.implode(["root", 'x', 0, 0, 'root', "/root", "/bin/bash"], ':')
     // string: 'root:x:0:0:root:/root:/bin/bash'

$STR.implode(['Chinese', 'word'])
     // string: 'Chinese characters'
```

**Reference**

- PHP `implode()` function: <https://www.php.net/manual/en/function.implode.php>

#### 3.10.6) `shuffle` method

Shuffle a string randomly.

**Description**

```js
$STR.shuffle(
         <string $string: `the input string to shuffle.`>
) string
```

This function returns a new random permutation string based on the input string `string`.

**Parameter**

- `string`
input string

**Return Value**

This function returns a new string after random permutation.

**Exception**

- `ArgumentMissed`: The exception can be ignored; returns an empty string when evaluated silently.
- `WrongDataType`: Exceptions can be ignored; return an empty string when evaluated silently.

**Example**

```js
$STR.shuffle('beijing') // string: 'jbienig'
```

**Reference**

- PHP `str_shuffle()` function: <https://www.php.net/manual/en/function.str-shuffle.php>

#### 3.10.7) `replace` Method

Substring replacement.

**Description**

```js
$STR.replace(
         <string | array $search>,
         <string | array $replace>,
         <array | string $subject>
         [, <boolean $case_insensitivity = false:
             false - `performs case-sensitive replacements;`
             true - `performs case-insensitive replacements.`>
         ]
) string | array
```

This function returns a string or an array that is the result of replacing all occurrences of `search` in `subject` with `replace`.

**Parameter**

If `search` and `replace` are arrays, then the function will perform a mapping replacement of the two on `subject`. If the number of values in `replace` is less than the number of `search`, redundant replacements will be made with empty strings. If `search` is an array and `replace` is a string, then the replacement of each element in `search` will always use this string. This substitution does not change case.

If `search` and `replace` are both arrays, their values will be processed sequentially.

- `search`
The target value of the search, which is the needle. An array can specify multiple targets.
- `replace`
Replacement value for `search`. An array can be used to specify multiple replacements.
- `subject`
An array or string to perform substitutions, also known as `haystack`. If `subject` is an array, the replacement operation will iterate over the entire `subject`, and the return value will also be an array.
- `case_insensitivity`
Specify whether to ignore case (optional); default is to ignore case.

**Return Value**

This function returns the replaced array or string.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return empty string or empty array when silently evaluated.
- `WrongDataType`: Exceptions can be ignored; return empty string or empty array when silently evaluated.

**Example**

```js
$STR.replace("%BODY%", "black", "<body text=%BODY%>");
     // string: '<body text=black>'

$STR.replace("%body%", "black", "<body text=%BODY%>", true);
     // string: '<body text=black>'
```

**Reference**

- PHP `str_replace()` function: <https://www.php.net/manual/en/function.str-replace.php>
- PHP `str_ireplace()` function: <https://www.php.net/manual/en/function.str-ireplace.php>

#### 3.10.8) `format_c` Method

Format numeric and string data, format strings use C language-like modifiers (specifiers).

**Description**

```js
$STR.format_c(
         <string $format: `C format string.`>
         [, <boolean | number | longint | ulongint | longdouble | string $data>
             [, ...]
         ]
) string
```

This method formats the incoming single or multiple data using the specified C language format string.

```js
$STR.format_c(
         <string $format: `C format string.`>,
         <array $data>
) string
```

This method formats the data in the passed array using the specified C format string.

**Example**

```js
$STR.format_c('Tom is %d years old, while Jerry is %d years old.', 9, 7)
     // string: 'Tom is 9 years old, while Jerry is 7 years old.'

$STR.format_c('Tom is %d years old, while Jerry is %d years old.', [9, 7])
     // string: 'Tom is 9 years old, while Jerry is 7 years old.'
```

**Reference**

- PHP `sprintf()` function: <https://www.php.net/manual/en/function.sprintf.php>

#### 3.10.9) `scan_c` method

Parse the specified string according to the given format, which uses C-like specifier.

```js
$STR. scanf(
         <string $string: `The input string being parsed.`>,
         <string $format: `The interpreted format for string`>
) array
```

**Example**

```js
$STR.scan_c('Tom is 9 years old, while Jerry is 7 years old.',
         'Tom is %d years old, while Jerry is %d years old.')
     // array: [9L, 7L]
```

**Reference**

- PHP `sscanf()` function: <https://www.php.net/manual/en/function.sscanf.php>

#### 3.10.10) `format_p` Method

Format arbitrary data using placeholders, or serialized strings for non-string data.

```js
$STR.format_p(
         <string $format: `string contains placeholders.`>,
         <array | object $data>
) string
```

When using an array to express the data to be formatted, the placeholders are represented by `[0]`, `[1]`, etc.

When using objects to express the data to be formatted, the placeholders are represented by `{name}`, `{id}`, etc.

When multiple parameters are used to express the data to be formatted, the placeholders are represented by `#0`, `#1`, etc.

A preceding `\` symbol indicates escape.

**Example**

```js
$STR.format_p('There are two boys: [0] and [1]', ['Tom', 'Jerry'])
     // string: There are two boys: "Tom" and "Jerry"'

$STR.format_p('There are two boys: {name0} and {name1}', { name0: 'Tom', name1: 'Jerry' })
     // string: There are two boys: "Tom" and "Jerry"'

$STR.format_p('There are two boys: #0 and #1', 'Tom', 'Jerry')
     // string: There are two boys: "Tom" and "Jerry"'
```

#### 3.10.11) `scan_p` Method

Parse the specified string according to the given format, using placeholders for the format string.

```js
$STR.scan_p(
         <string $string: `The input string being parsed.`>,
         <string $format: `string contains placeholders.`>,
) array | object | any
```

To return an array, the placeholders are represented by `[0]`, `[1]`, etc.

To return an object, the placeholders are represented by `{name}`, `{id}`, etc.

To return a single piece of data, the placeholders are represented by  `#?`.

A preceding `\` symbol indicates escape.

**Example**

```js
$STR.scan_p('There are two boys: "Tom" and "Jerry"',
         'There are two boys: [0] and [1]')
     // array: ['Tom', 'Jerry']

$STR.scan_p('There are two boys: "Tom" and "Jerry"',
         'There are two boys: {name0} and {name1}')
     // object: { name0: 'Tom', name1: 'Jerry' }

$STR.scan_p('My name is "Tom"', 'My name is #?')
     // string: 'Tom'
```

#### 3.10.12) `join` Method

Used to concatenate two or more strings.

**Description**

```js
$STR.join(
         <any $data1>,
         <any $data2>
         [, <any $data3>
             [, ...]
         ]
) string
```

All parameters (at least two) are stringified and concatenated into a new string.

**Parameter**

- `data1`
The first data.
- `data2`
The second item of data.
- `data3`
third data.

**Return Value**

Strings concatenated in sequence.

**Example**

```js
$STR. join('hello', ' ', 'world')
     // string: 'hello world'

$STR. join(1, ', ', 2, ', ', 3)
     // string: '1, 2, 3'
```

#### 3.10.13) `nr_bytes` Method

Return the length in bytes of a string or sequence of bytes.

**Description**

```js
$STR.nr_bytes(
         <string | bsequence $data>
) ulongint
```

This method returns the length of a string or byte sequence measured in bytes, and the return value is of type `ulongint`. Note that for strings, the return value of this function always includes the null character used to terminate the string.

**Exception**

This method does not raise an exception.

**Example**

```js
$STR.nr_bytes( "" )
     // ulongint: 1

$STR.nr_bytes( "HVML" )
     // ulongint: 5UL

$STR.nr_bytes( bb )
     // ulongint: 0
```

#### 3.10.14) `nr_chars` Method

Get the number of characters in a string.

**Description**

```js
$STR.nr_chars(
         <string $string>
) ulongint | false
```

Get the number of characters in the string `string`.

**Parameter**

- `string`
Enter a string.

**Return Value**

The return value is of `ulongint` type, representing the number of characters.

**Exception**

- `ArgumentMissed`: Exceptions can be ignored; return `false` for silent evaluation.
- `WrongDataType`: Exceptions can be ignored; return `false` when evaluated silently.

**Example**

```js
// Get the length of the string `China`
$STR.nr_chars('China')
     // ulongint: 2
```

**Reference**

#### 3.10.15) `tolower` Method

Convert a string to lowercase.

**Description**

```js
$STR.tolower(
         <string $string>
) string
```

Convert all characters in the string `string` to lowercase and returns the converted string.

**Parameter**

- `string`
Enter a string.

**Return Value**

Convert to lowercase string.

**Example**

```js
$STR.tolower('Hello, world')
     // string: 'hello, world'
```

**Reference**

- PHP `strtolower()` function: <https://www.php.net/manual/en/function.strtolower.php>

#### 3.10.16) `toupper` Method

Convert a string to uppercase.

**Description**

```js
$STR.toupper(
         <string $string>
) string
```

Convert all characters in the string `string` to uppercase and returns the converted string.

**Parameter**

- `string`
Enter a string.

**Return Value**

Convert to uppercase string.

**Example**

```js
$STR.toupper('Hello, world')
     // string: 'HELLO, WORLD'
```

**Reference**

- PHP `strtoupper()` function: <https://www.php.net/manual/en/function.strtoupper.php>

#### 3.10.17) `substr` Method

Return a substring of a string.

**Description**

```js
$STR.substr(
         <string $string>,
         <real $offset>
         [, <real $length>]
) string
```

Return the substring of the string `string` specified by the `offset` and `length` parameters.

**Parameter**

- `string`
Enter a string.
- `offset`
    - non-negative value: The returned string will start at `offset` of the string `s`, counting from `0`;
    - Negative value: The returned string will start at `offset` characters from the end of the string `s`;
    - the length of the string `s` is less than `offset`, an empty string will be returned;
- `length`
    - 0: Return an empty string;
    - Positive value: The returned string will start at `offset` and contain at most `length` characters (depending on the length of `s`);
    - Negative value: `length` character at the end of the string `s` will be omitted;
    - If this parameter is not provided, the returned string starts from `offset` to the end of the string `s`.

**Return Value**

Return the part extracted from `string` or an empty string.

**Example**

```js
// Returns a substring of the string `abcdef` starting at character `0` and containing at most `10` characters
$STR.substr('abcdef', 0, 10)
     // string: 'abcdef'

// returns the substring of the string `abcdef` starting from the last character
$STR.substr('abcdef', -1)
     // string: 'f'

// returns the substring of the string `abcdef` except the last character
$STR.substr('abcdef', 0, -1)
     // string: 'abcde'

// Returns the substring of the string `abcdef` starting from the 3rd last character to the last character
$STR.substr('abcdef', -3, -1)
     // string: 'de'
```

**Reference**

- PHP `substr()` function: <https://www.php.net/manual/en/function.substr.php>

#### 3.10.18) `substr_compare` Method

Compare substrings (comparing specified lengths starting at specified offset).

**Description**

```js
$STR.substr_compare(
     <string $str1>,
     <string $str2>,
     <real $offset1>,
     <real $offset2>,
     [, <real $length = 0>
         [, <boolean $case_insensitivity = false:
             false - `performs a case-sensitive comparison;`
             true - `performs a case-insensitive comparison.`>
         ]
     ]
) number
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `substr_compare()` function: <https://www.php.net/manual/en/function.substr-compare.php>

#### 3.10.19) `substr_count` method

Count the number of occurrences of a substring.

**Description**

```js
$STR.substr_count(
     <string $haystack>,
     <string $needle>
     [, <real $offset = 0>
         [, <real $length = 0>
         ]
     ]
) ulongint
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `substr_count()` function: <https://www.php.net/manual/en/function.substr-count.php>

#### 3.10.20) `substr_replace` Method

Do substitutions in substrings.

**Description**

```js
$STR.substr_replace(
     <array|string $string>,
     <array|string $replace>,
     <array|real $offset>
     [,
         <array|real $length = 0>
     ]
) string|array
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `substr_replace()` function: <https://www.php.net/manual/en/function.substr-replace.php>

#### 3.10.21) `strstr` Method

Return the substring in the target string that starts or ends with the specified string.

**Description**

```js
$STR.strstr(
         <string $haystack>,
         <string $needle>
         [, <bool $before_needle = false>
             [, <bool $case_insensitivity = false:
                 false - `performs a case-sensitive check;`
                 true - `performs a case-insensitive check.`>
             ]
         ]
) string | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `strstr()` function: <https://www.php.net/manual/en/function.strstr.php>
- PHP `stristr()` function: <https://www.php.net/manual/en/function.stristr.php>

#### 3.10.22) `strpos` Method

Return the position of the first or last occurrence of the specified string within the target string.

**Description**

```js
$STR.strpos(
         <string $haystack>,
         <string $needle>
         [, <real $offset = 0>
             [, <bool $case_insensitivity = false:
                 false - `performs a case-sensitive check;`
                 true - `performs a case-insensitive check.`>
             ]
         ]
) ulongint | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `strpos()` function: <https://www.php.net/manual/en/function.strpos.php>
- PHP `stripos()` function: <https://www.php.net/manual/en/function.stripos.php>

#### 3.10.23) `strpbrk` Method

Find a substring in the target string that begins or ends with any character in a set of characters.

**Description**

```js
$STR.strpbrk(
         <string $string>,
         <string $characters>
         [, <bool $case_insensitivity = false:
             false - `performs a case-sensitive check;`
             true - `performs a case-insensitive check.`>
         ]
) string | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `strpbrk()` function: <https://www.php.net/manual/en/function.strpbrk.php>

#### 3.10.24) `split` Method

Split a string into an array of substrings of a given length.

**Description**

```js
$STR. split(
         <string $string>
         [, <real $length = 1> ]
) array
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `str_split()` function: <https://www.php.net/manual/en/function.str-split.php>

#### 3.10.25) `chunk_split` method

Split the string by the given small block length and delimiter to generate a new string.

**Description**

```js
$STR.chunk_split(
         <string $string>
         [,
             <real $length = 76>
             [,
                 <string $separator = "\r\n">
             ]
         ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `chunk_split()` function: <https://www.php.net/manual/en/function.chunk-split.php>

#### 3.10.26) `trim` Method

Remove whitespace (or other characters) at the beginning, end, or both of a string.

**Description**

```js
$STR.trim(
         <string $string>
         [, <string $position "left | right | both" = "both">
             [, <string $characters = " \n\r\t\v\f"> ]
         ]
) string
```

**Parameter**

**Return value**

**Example**

**Reference**

- PHP `trim()` function: <https://www.php.net/manual/en/function.trim.php>
- PHP `ltrim()` function: <https://www.php.net/manual/en/function.ltrim.php>
- PHP `rtrim()` function: <https://www.php.net/manual/en/function.rtrim.php>

#### 3.10.27) `pad` Method

Pad a string to the specified length with another string.

**Description**

```js
$STR.pad(
     <string $string>,
     <real $length>,
     [, <string $pad_string = " ">,
         [, <string $pad_type 'left | right | both' = 'right'> ]
     ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `str_pad()` function: <https://www.php.net/manual/en/function.str-pad.php>

#### 3.10.28) `repeat` Method

Repeat a string.

**Description**

```js
$STR.repeat(
         <string $string>,
         <real $times>
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `str_repeat()` function: <https://www.php.net/manual/en/function.str-repeat.php>

#### 3.10.29) `reverse` method

Reverse a string.

**Description*

```js
$STR.reverse(
         <string $string>
) string
```

**Parameter**

**Return Value**
**Example**

**Reference**

- PHP `strrev()` function: <https://www.php.net/manual/en/function.strrev.php>

#### 3.10.30) `tokenize` Method

Split the string using the given token delimiter, returning an array of delimited tokens.

**Description**

```
$STR.tokenize(
         <string $string>,
         <string $delimiters>
) array
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `strtok()` function: <https://www.php.net/manual/en/function.strtok.php>

#### 3.10.31) `translate` Method

Convert the specified substring.

**Description**

```js
$STR.translate(
     <string $string>,
     <string $from>,
     <string $to>
) string

$STR.translate(
     <string $string>,
     <object $from_to_pairs>,
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `strtr()` function: <https://www.php.net/manual/en/function.strtr.php>

#### 3.10.32) `htmlentities_encode` Method

Convert characters to HTML entities.

**Description**

```js
$STR.htmlentities_encode(
        <string $string: `The input string.`>,
        <'[compat | quotes | noquotes] || [ignore | substitute | disallowed] || [html401 | xml1 | xhtml | html5]' $flags:
            'compat'    - `Will convert double-quotes and leave single-quotes alone.`
            'quotes'    - `Will convert both double and single quotes.`
            'noquotes'  - `Will leave both double and single quotes unconverted.`
            'ignore'    - `Silently discard invalid code unit sequences instead of returning an empty string. Using this flag is discouraged.`
            'substitute' - `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
            'disallowed' - `Replace invalid code points for the given document type with a Unicode Replacement Character U+FFFD or &#FFFD.`
            'html401'   - `Handle code as HTML 4.01.`
            'xml1'      - `Handle code as XML 1.`
            'xhtml'     - `Handle code as XHTML.`
            'html5'     - `Handle code as HTML 5.`
        >
        [, <boolean $all = false:
            false- `only the certain characters have special significance in HTML are translated into these entities.`
            true - `all characters which have HTML character entity equivalents are translated into these entities.`>
            [, <boolean $double_encode = true:
                true - `will convert everything.`
                false - `will not encode existing html entities.`>
            ]
        ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `htmlentities()` function: <https://www.php.net/manual/en/function.htmlentities.php>
- PHP `htmlspecialchars()` function: <https://www.php.net/manual/en/function.htmlspecialchars.php>

#### 3.10.33) `htmlentities_decode` method

Convert HTML entities to their corresponding characters.

**Description**

```js
$STR.htmlentities_decode(
         <string $string: `The input string.`>,
         <'[compat | quotes | noquotes] || substitute || [html401 | xml1 | xhtml | html5]' $flags:
             'compat' - `Will convert double-quotes and leave single-quotes alone.`
             'quotes' - `Will convert both double and single quotes.`
             'noquotes' - `Will leave both double and single quotes unconverted.`
             'substitute' - `Replace invalid code unit sequences with a Unicode Replacement Character U+FFFD or &#FFFD.`
             'html401' - `Handle code as HTML 4.01.`
             'xml1' - `Handle code as XML 1.`
             'xhtml' - `Handle code as XHTML.`
             'html5' - `Handle code as HTML 5.` >
         [, <boolean $all = false:
             false- `only the certain characters have special significance in HTML are translated into these entities.`
             true - `all characters which have HTML character entity equivalents are translated into these entities.` >
         ]
) string | bsequence
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `htmlentities()` function: <https://www.php.net/manual/en/function.html-entity-decode.php>
- PHP `htmlspecialchars_decode()` function: <https://www.php.net/manual/en/function.htmlspecialchars-decode.php>

#### 3.10.34) `nl2br` Method

Insert HTML newline tags before all newline characters in the string.

**Description**

```js
$STR.nl2br(
         <string $string: the input string. >
         [, < boolean $is_xhtml = true:
             true - `use '<br />'.`
             false - `use '<br>'.`
         ]
         [, < boolean $lowercases = true:
             true - `use 'br'.`
             false - `use 'BR'.`
         ]
) object | bsequence
```



**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `nl2br()` function: <https://www.php.net/manual/en/function.nl2br.php>

#### 3.10.35) `rot13` Method

Perform a ROT13 conversion on a string.

**Description**

```js
$STR.rot13(
         <string $string>
) string
```



**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `rot13()` function: <https://www.php.net/manual/en/function.rot13.php>

#### 3.10.36) `count_chars` method

Count the number of occurrences of a character in a string.

**Description**

```js
$STR.count_chars(
         < string $string: the examined string. >
         [, < 'object | string' $mode = 'object':
             'object' - returns an object with the character as key and the frequency of every character as value.
             'string' - returns a string containing all unique characters. >
         ]
) object | string
```



**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `count_chars()` function: <https://www.php.net/manual/en/function.count-chars.php>

#### 3.10.37) `count_bytes` Method

Count the number of occurrences of each byte (0...255) in a string or binary endianness.

**Description**

```js
$STR.count_bytes(
        < string | bsequence $data: the examined data. >
        [, < 'object-all | object-appeared | object-not-appeared | string-appeared | string-not-appeared' $mode = 'object-all':
            'object-all' - returns an object with the byte-value as key and the frequency of every byte as value.
            'object-appeared' - same as 0 but only byte-values with a frequency greater than zero are listed.
            'object-not-appeared' - same as 0 but only byte-values with a frequency equal to zero are listed.
            'bytes-appeared' - a binary sequence containing all unique bytes is returned.
            'bytes-not-appeared' - a binary sequence containing all not used bytes is returned.
            >
        ]
) object | bsequence
```



**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `count_chars()` function: <https://www.php.net/manual/en/function.count-chars.php>

### 3.11) `URL`

#### 3.11.1) `encode` Method

Encode a URL string.

**Description**

```js
$URL.encode(
         <string |bsequence $data: the string or the byte sequence to be encoded.>
         [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
           - 'rfc1738': encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.
           - 'rfc3986': encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).
         ]
) string
```

This method is used to URL-encode the bytes in the string or byte sequence. By default, it follows RFC 1738 and the 'application/x-www-form-urlencoded' media type encoding method.

URL encoding processes characters in a string or byte sequence in bytes and ignores the original encoding form of the string or byte sequence (such as UTF-8 or GB18030), except for `-_.`, all Non-alphanumeric characters are replaced with a percent sign (%) followed by two hexadecimal digits. For historical reasons, this encoding has two forms. When encoded using RFC 1738 and the 'application/x-www-form-urlencoded' media type, spaces are encoded as plus signs (+), in the same way that forms in web pages are encoded using the `POST` method. With RFC 3986, spaces are encoded as `%20`.

This method returns a string.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: No required argument specified; exception can be ignored, empty string is returned when silently evaluated.
- `WrongDataType`: Data that is not a string type or a byte sequence type is passed in; the exception can be ignored, and an empty string is returned during silent evaluation.

**Example**
```js
$URL.encode('HVML: The world's first programmable markup language!')
     // string: 'HVML%3A+%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8%8B %E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21'

$URL.rawencode('HVML: The world's first programmable markup language!', 'rfc3986')
     // string: 'HVML%3A%20%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8 %8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21'
```

**Reference**

- [`$DATA.decode` method](#3102-decode-method)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urlencode()` function: <https://www.php.net/manual/en/function.urlencode.php>
- PHP `rawurlencode()` function: <https://www.php.net/manual/en/function.rawurlencode.php>

#### 3.11.2) `decode` method

Decode a URL-encoded string.

**Description**

```js
$URL.decode(
        <string $str: the string to be decoded.>
        [, < 'binary | string' $type = 'string': `the type of return data:`
            - 'binary': `the decoded data returned as a binary sequence.`
            - 'string': `the decoded data returned as a string in UTF-8 encoding.` >
            [, <'rfc1738 | rfc3986' $enc_type = 'rfc1738':
              - 'rfc1738': decoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.
              - 'rfc3986':  decoding is performed according to RFC 3986, and spaces are expected being percent encoded (%20).
            ]
        ]
) string | bseqence
```

This method decodes a URL-encoded string into a string or sequence of bytes.

URL encoding processes characters in a string or byte sequence in bytes and ignores the original encoding form of the string or byte sequence (such as UTF-8 or GB18030), except for `-_.`, all Non-alphanumeric characters are replaced with a percent sign (%) followed by two hexadecimal digits. For historical reasons, this encoding has two forms. When encoded using RFC 1738 and the 'application/x-www-form-urlencoded' media type, spaces are encoded as plus signs (+), in the same way that forms in web pages are encoded using the `POST` method. With RFC 3986, spaces are encoded as `%20`.

**Exception**

This method may generate the following exceptions:

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: No required arguments specified; exceptions can be ignored, and silent evaluation returns an empty string or an empty byte sequence.
- `WrongDataType`: Data that is not a string type is passed in; the exception can be ignored, and an empty string or empty byte sequence is returned during silent evaluation.
- `BadEncoding`: Generated when `$type` is `string`, indicating that the decoded data is not a legal UTF-8 encoded character; the exception can be ignored, and the decoded string will be returned during silent evaluation.

**Example**

```js
$URL.decode('HVML%3A+%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7%A8% 8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21')
     // string: 'HVML: The world's first programmable markup language!'

$URL.decode('HVML%3A%20%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE%E5%8F%AF%E7%BC%96%E7% A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80%21', 'string', 'rfc3986')
     // string: 'HVML: The world's first programmable markup language!'
```

**Reference**

- [`$DATA.encode` method](#3101-encode-method)
- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `urldecode()` function: <https://www.php.net/manual/en/function.urldecode.php>
- PHP `rawurldecode()` function: <https://www.php.net/manual/en/function.rawurldecode.php>

#### 3.11.3) `build_query` Method

Generate a URL-encoded query string.

**Description**

```js
$URL.build_query(
    < object | array $query_data >
    [, < string $numeric_prefix = '': the numeric prefix for the argument names if `query_data` is an array. >
        [, <string $arg_separator = '&': the character used to separate the arguments. >
            [, <'[real-json | real-ejson] || [rfc1738 | rfc3986]' $opts = 'real-json rfc1738':
              - 'real-json':    `use JSON notation for real numbers, i.e., treat all real numbers (number, longint, ulongint, and longdouble) as JSON numbers.`
              - 'real-ejson':   `use eJSON notation for longint, ulongint, and longdouble, e.g., 100L, 999UL, and 100FL.`
              - 'rfc1738':      `encoding is performed per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
              - 'rfc3986':      `encoding is performed according to RFC 3986, and spaces will be percent encoded (%20).`
            ]
        ]
    ]
) string
```

This method constructs a string that can be used in the query part of a URL, such as `foo=bar&text=HVML%E6%98%AF%E5%85%A8%E7%90%83%E9%A6%96%E6%AC%BE %E5%8F%AF%E7%BC%96%E7%A8%8B%E6%A0%87%E8%AE%B0%E8%AF%AD%E8%A8%80`.

If the first parameter is an array, the array member will be used to specify the key value of each parameter in the query string, and the corresponding key name will use the array member serial number by default, so the query string like `0=bar&1=foo` will be generated eventually .

If the first parameter is an object, the object key-value pair is used to form the key name and key value of each parameter in the query string, so a query string like `foo=fou&bar=buz` will be generated finally.

Use `$arg_separator` to specify the character to use when separating arguments, the default is `&`; must be an ASCII character.

When the parameter is container data, a processing method similar to the PHP `http_build_query()` function will be used.

In addition, we can specify how to process real number data through `$opts`, and we can also specify the encoding method through this parameter.

**Exception**

**Example**

**Reference**

- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `http_build_query()` function: <https://www.php.net/manual/en/function.http-build-query.php>

#### 3.11.4) `parse_query` Method

Parse a URL-encoded query string.

**Description**

```js
$URL.parse_query(
     <string $query_string>
     [, <string $arg_separator = '&': the character used to separate the arguments. >
         [, <'[array | object] || [string | binary | auto] || [rfc1738 | rfc3986]' $opts = 'object auto rfc1738':
           - 'array': `construct an array with the query string; this will ignore the argument names in the query string.`
           - 'object': `construct an object with the query string.`
           - 'auto': `the argument values will be decoded as strings first; if failed, decoded into binary sequences.`
           - 'binary': `the argument values will be decoded as binary sequences.`
           - 'string': `the argument values will be decoded as strings.` >
           - 'rfc1738': `the query string is encoded per RFC 1738 and the 'application/x-www-form-urlencoded' media type, which implies that spaces are encoded as plus (+) signs.`
           - 'rfc3986': `the query string is encoded according to RFC 3986, and spaces will be percent encoded (%20).`
         ]
     ]
) object
```

This method parses a URL query part string and constructs an array or object using the parameters in the string.

**Exception**

**Example**

**Reference**

- [RFC 1738](http://www.faqs.org/rfcs/rfc1738)
- [RFC 3986](http://www.faqs.org/rfcs/rfc3986)
- PHP `http_build_query()` function: <https://www.php.net/manual/en/function.http-build-query.php>

#### 3.11.5) `parse` Method

Parse a URL, returning its components.


**Description**

```js
$URL. parse(
         <string $url: the URL to parse.>,
         [,
             <'all | [scheme || host || port || user || password || path || query || fragment]' $components = 'all': the components want to parse.>
         ]
) object | string
```


**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `parse_url()` function: <https://www.php.net/manual/en/function.parse-url.php>

#### 3.11.6) `assemble` Method

Assemble a complete URL from the decomposed URL object.


**Description**

```js
$URL.assemble(
         <object $broken_down_url: `the broken-down URL object.`>
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `parse_url()` function: <https://www.php.net/manual/en/function.parse-url.php>

### 3.12) `STREAM`

`$STREAM` is a walker-level built-in variable, which is used to implement operations based on reading and writing streams. Similar to the `query` method of the `$DOC` variable, the `open` method provided on this variable returns a native entity on which we provide the interface.

The following HVML code opens a local file and then calls the `readstruct` method on the native entity representing the read stream:

```html
     <init as="formats">
         [
             "bytes:2 padding:2 u32le u32le",
             "f64le f64le",
         ]
     </init>

     <init as="packages">
     </init>

     <choose on="$STREAM.open('file://mydata.txt', 'read')">
         <iterate on="$formats" in="$packages" by="RANGE: 0">
             <update on="$packages" to="append" with="$?. readstruct($2, $?)" />
         </iterate>
     </choose>
```

The native entity returned by the `$STREAM.open` method is called a "stream entity". Stream entities shall provide the following basic interfaces:

- `readbytes` and `writebytes` methods: Read and write sequences of bytes.
- `readstruct` and `writestruct` methods: Read and write binary data structures.
- `readlines` and `writelines` methods: Read and write lines of text.
- `seek`: Within a seekable stream repositions the read and write position of the stream.

For convenience, we provide the following static properties on the `$STREAM` variable:

- `stdin`, `stdout`, and `stderr` static attributes: Stream entity wrappers for C language standard input, standard output, and standard error.

Generally speaking, stream entities should be observable, so that you can listen to whether there is data waiting to be read on the read stream, or whether data can be written to the write stream. For example, we can observe `$STREAM.stdin` to listen for user input:

```html
     <observe on="$STREAM.stdin" for="read">
         <choose on="$?. readlines(1)">
             ...
         </choose>
     </observe>
```

In addition, the `STREAM` variable should use an extensible implementation to provide additional read and write methods on the stream entity for different stream types, so that support for some application layer protocols can be achieved. For example, when the `$STREAM` method implemented by an interpreter supports sending HTTP requests, additional methods for processing HTTP protocol headers can be implemented:

```html
     <observe on="$STREAM.open('http://foo.com/')" for="read">
         <choose on="$?.http_get_headers()">
             ...
         </choose>
     </choose>
```

#### 3.12.1) `open` Method

Open a stream, returning a native entity value representing the stream. This native entity can be observed.

**Description**

```js
$STREAM.open(
        < string $uri: `the URI of the stream.` >
        [, <'[read || write || append || create || truncate || nonblock] | default' $opt = 'default':
               - 'read':        `Open for reading only`
               - 'write':       `Open for writing only`
               - 'append':      `Open in append mode.  Before each write, the offset is positioned at the end of the stream`
               - 'create':      `If $uri does not exist, create it as a regular file`
               - 'truncate':    `If $uri already  exists and is a regular file and the access mode allows writing it will be truncated to length 0`
               - 'nonblock':    `Open the $uri in nonblocking mode`
               - 'default':     `equivalent to 'read write'`
           >
            [, <'[ssl | tls] || websocket || hibus || mqtt || http || ...' $filerts = '': `the filters will be used on the stream entity.`
                   - 'ssl':         `this filter uses SSL to encrypt and decrypt the data; only for TCP connections.`
                   - 'tls':         `this filter uses TLS to encrypt and decrypt the data; only for TCP connections.`
                   - 'websocket':   `this filter can handle WebSocket protocol, provide methods like ws_send() and ws_read()`
                   - 'hibus':       `this filter can handle hiBus protocol, provide methods like hibus_subscribe() and hibus_call_procedure()`
                   - 'mqtt':        `this filter can handle the MQTT protocol, privide methods like mqtt_subscribe() and mqtt_send_message()`
                   - 'http':        `this filter can handle the HTTP protocol, provide methods like http_send_request() and http_read_response_header()`
               >
                [, <object $filert_opts: `the options for fitlers.` >
                ]
            ]
        ]
) native/stream | undefined
```

This method opens a stream and returns a native entity value representing the stream.

This method uses a URI to specify the stream location to open and the transport layer type name, such as:

- `file:///etc/passwd`: `/etc/passwd` file.
- `file://Documents/mydata`: `Document/mydata` file under the current working directory.
- `pipe:///usr/bin/wc`: Execute the specified system program in the child process, and create an anonymous pipe as the standard input, output and error of the child process. Options and/or arguments required on the command line can be passed via query parameters in the URI.
- `fifo:///var/tmp/namedpipe`: FIFO, which is a named pipe.
- `unix:///var/run/myapp.sock`: UNIX socket.
- `tcp://foo.com:1100`: TCP socket.
- `udp://foo.com:1100`: UDP socket.

We can specify one or more data filters in the `open` method, and these data filters can play different roles, such as:

- `ssl`: Encrypt and decrypt data using the SSL Secure Sockets Layer protocol, only for `tcp` type names.
- `tls`: Use TLS transport layer security protocol to encrypt and decrypt data, only for `tcp` type names.
- `http`: Use the HTTP application layer protocol to process data. This filter will extend the methods provided on the stream entity so that requests can be sent or response headers can be processed through the HTTP protocol.
- `websocket`: Use the WebSocket application layer protocol to process data, this filter will extend the methods provided on the stream entity, so that message packets can be sent and received through the WebSocket protocol.
- `hibus`: Use the hiBus data bus protocol to process data. This filter will extend the methods provided on the stream entity, so that you can subscribe to events or initiate remote procedure calls and get results through the hiBus data bus.
- `mqtt`: Use the MQTT IoT protocol to process data. This filter will extend the methods provided on the flow entity, so that you can subscribe to events through the MQTT data bus or initiate remote procedure calls and get results.

The interpreter should at least implement support for `file://`, other types and filters can be selected according to the situation. The interpreter can also customize filters, for example, it can provide support for various MIME types, so that bitmap files such as PNG and JPEG can be decoded into objects expressing bitmaps, including the resolution of bitmaps and the number of scan lines The byte order of pixel color values.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and `undefined` is returned when silently evaluated.

**Remark**

1. The closing of the stream will be done automatically when the corresponding native entity value is finally released. You can also call the `$FS.close` method in advance to release the system resources occupied by the stream entity.
1. The option string varies with the type of stream.
1. Correspondence between option string and `fopen`:

| $STREAM.open | fopen |
| -------------------------- | -------- |
| `read` | `r` |
| `write create truncate` | `w` |
| `write create append` | `a` |
| `read write` | `r+` |
| `read write create truncate` | `w+` |
| `read write create append` | `a+` |

**example**

```js
$STREAM.open("file://abc.md", "read write")
```

##### 3.12.1.1) The `readstruct` Method of Stream Entity

Read a binary structure from the stream and convert to appropriate data.

```js
$stream. readstruct(
         <string $format: `the format of the struct`>
) array | real | string | bsequence
```

This method reads data from the stream entity (`$stream`) according to the specified format. When the format string specified by `$format` contains multiple basic data types, the function returns an array;
Otherwise return a single data.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required arguments; exceptions can be ignored, silently evaluating returns read data.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and the read data will be returned during silent evaluation.
- `InvalidValue`: Invalid data was passed in; exceptions can be ignored, empty arrays are silently evaluated.
- `NotDesiredEntity`: Indicate that an unexpected entity was passed (the target may be a directory), and silently evaluate to an empty array.
- `BrokenPipe`: The other end of the pipe or socket is closed; the exception can be ignored, and an empty array is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and an empty array is returned when silently evaluated.
- `IOFailure`: input and output errors; exceptions can be ignored, and an empty array is returned when silently evaluated.

**Example**

Assume that the file content is as follows (byte sequence description using eJSON):

```
bx0a000a000000
```

Read a struct:

```js
$stream. readstruct('i16le i32le')
     // array: [10, 10]
```

##### 3.12.1.2) The `writestruct` Method of Stream Entitity

Write multiple data to the stream according to the specified structure format.

```js
$stream.writestruct(
         <string $format: `the format string; see Binary Format Notation.` >,
         <real | string | bsequence | array $first: `the first data.` >
         [, <real | string | bsequence | array $second: `the second data.` >
             [, <real | string | bsequence | array $third: `the third data.` >
                 [, ... ]
             ]
         ]
) ulongint
```

This function writes the incoming multiple real numbers, real number arrays, strings or byte sequences into the stream entity (`$stream`) according to the binary format specified by `$format`.

```js
$stream.writestruct(
         < string $format: `the format string; see Binary Format Notation.` >,
         <array $data>
) ulongint
```

When three parameters are passed in and the third parameter is an array, this function writes the members of the passed array to the stream in sequence according to the binary format specified by `$format`.

This method writes data to the stream in the specified format and returns the number of bytes written.

**abnormal**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, silently evaluating returns the number of bytes written.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, silently evaluating returns the number of bytes written.
- `InvalidValue`: Invalid data was passed in; exceptions can be ignored, and silent evaluation returns the number of bytes written.
- `BrokenPipe`: The other end of the pipe or socket has been closed; the exception can be ignored, and the number of bytes actually written is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and the number of bytes actually written is returned when silently evaluated.
- `NoStorageSpace`: Indicate insufficient storage space; the exception can be ignored, and the actual number of bytes written will be returned during silent evaluation.
- `TooLarge`: The write size exceeds the (file) limit; the exception can be ignored, and the number of bytes actually written is returned when silently evaluated.
- `IOFailure`: Input and output errors; exceptions can be ignored, and the number of bytes actually written is returned when silently evaluated.

**Example**

```js
$stream.writestruct("i16le i32le", 10, 10)
// Write to file (hexadecimal): 0x0a 0x00 0x0a 0x00 0x00 0x00

$stream.writestruct("i16le:2 i32le", [[10, 15], 255])
// Write to file (hexadecimal): 0x0a 0x00 0x0f 0x00 0xff 0x00 0x00 0x00

$stream.writestruct("i16le:2 i32le", [10, 15], 255)
// Write to file (hexadecimal): 0x0a 0x00 0x0f 0x00 0xff 0x00 0x00 0x00
```

##### 3.12.1.3) The `readlines` Method of Stream Entity

Read the given number of lines from the stream, returning a string array.

**Description**

```js
$stream. readlines(
         < real $lines: `the number of lines to read`>
) array
```

This method reads the data by the specified number of rows, and converts it into an array to return, and each member of the array is a row of data.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, empty array when evaluated silently.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, empty array when evaluated silently.
- `InvalidValue`: Invalid data was passed in; exceptions can be ignored, empty arrays are silently evaluated.
- `NotDesiredEntity`: Indicate that an unexpected entity was passed (the target may be a directory), and silently evaluates to an empty array.
- `BrokenPipe`: The other end of the pipe or socket is closed; the exception can be ignored, and an empty array is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and an empty array is returned when silently evaluated.
- `IOFailure`: Input and output errors; exceptions can be ignored, and an empty array is returned when silently evaluated.

**Example**

Suppose the file content is as follows:

```
This is the string to write
Second line
```

Read 10 lines:

```js
$stream. readlines(10)
     // array: ["This is the string to write", "Second line"]
```

##### 3.12.1.4) The `writelines` Method of Stream Entity

Write a string to the stream.

**Description**

```js
$stream.writelines(
         < 'string | array' $line: `the data to write`>
) ulongint

```

This method writes the string specified by the parameter to the stream. When the parameter is an array, each member of the array is required to be a string type. When writing, each array member is a separate line, and returns the number of bytes written.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, silently evaluating returns the number of bytes actually written.
- `WrongDataType`: Incorrect argument type; exception can be ignored, silently evaluating returns the number of bytes actually written.
- `InvalidValue`: Invalid data is passed in; the exception can be ignored, and the number of bytes actually written is returned when silently evaluated.
- `BrokenPipe`: The other end of the pipe or socket has been closed; the exception can be ignored, and the number of bytes actually written is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and the number of bytes actually written is returned when silently evaluated.
- `NoStorageSpace`: Indicate insufficient storage space; the exception can be ignored, and the actual number of bytes written will be returned during silent evaluation.
- `TooLarge`: The write size exceeds the (file) limit; the exception can be ignored, and the number of bytes actually written is returned when silently evaluated.
- `IOFailure`: Input and output errors; exceptions can be ignored, and the number of bytes actually written is returned when silently evaluated.

**Example**

```js
$STREAM.stdout.writelines("This is the string to write")
     // will output on STDOUT:
     // This is the string to write

$STREAM.stdout.writelines(["This is the string to write", "Second line"])
     // will output on STDOUT:
     // This is the string to write
     // Second line
```

##### 3.12.1.5) The `readbytes` Method of Stream Entity

Read a sequence of bytes from the stream, returning a sequence of bytes.

**Description**

```js
$stream. readbytes(
         < real $length: `the length to read in bytes`>
) bsequence
```

This method reads bytes of the specified length from `$stream` and converts them to a sequence of bytes to return.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, silent evaluation returns empty byte sequence.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, empty byte sequence is returned on silent evaluation.
- `InvalidValue`: invalid data was passed in; exceptions can be ignored, and an empty byte sequence is returned when evaluated silently.
- `NotDesiredEntity`: Indicate that an unexpected entity was passed (the target may be a directory), and silently evaluates to an empty byte sequence.
- `BrokenPipe`: The other end of the pipe or socket is closed; exceptions can be ignored, and silent evaluation returns an empty byte sequence.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and an empty byte sequence is returned when evaluated silently.
- `IOFailure`: Input-output error; exceptions can be ignored, and silent evaluation returns an empty sequence of bytes.


**Example**

Assumed file content (12 bytes total):

```
write string
```

Read 10 bytes:

```js
$STREAM.stdin.readbytes(10)
     // bsequence: bx77726974652073747269
```

##### 3.12.1.6) The `writebytes` Method of Stream Entity

Write a sequence of bytes to the stream.

**Description**

```js
$stream.writebytes(
         <'string | bsequence' $data: `the data to write`>
) ulongint
```

This method writes a sequence of bytes to `$stream` and returns the number of bytes written.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, return 0 when silently evaluated.
- `WrongDataType`: Incorrect argument type; exception can be ignored, return 0 when silently evaluated.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and 0 is returned when silently evaluated.
- `BrokenPipe`: The other end of the pipe or socket is closed; exceptions are ignored, and 0 is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; exceptions can be ignored, and 0 is returned when silently evaluated.
- `NoStorageSpace`: Indicate insufficient storage space; exceptions can be ignored, and 0 is returned during silent evaluation.
- `TooLarge`: The write size exceeds the (file) limit; the exception is ignored, and 0 is returned when silently evaluated.
- `IOFailure`: Input and output errors; exceptions can be ignored, and 0 is returned for silent evaluation.

**Example**

```js
// write sequence of bytes
$STREAM.stdout.writebytes(bx48564d4c3A202d5f2e)
     // ulongint: 9L

// write the string as a sequence of bytes
$STREAM.stdout.writebytes("write string")
     // longint: 13L
```

Note: When a string is written as a sequence of bytes, a trailing null character should be written.

##### 3.12.1.7) The `seek` method of stream entities

Perform a positional operation on the stream.

**Description**

```js
$stream. seek(
         <number $offset: `the offset to be set`>,
         [, <'set | current | end | default' $whence = 'default':
             - 'set': `The $stream offset is set to offset bytes`
             - 'current': `The $stream offset is set to its current location plus offset bytes`
             - 'end': `The $stream offset is set to the size of the file plus offset bytes.`
             - 'default': `is equivalent to 'set'`
            >
         ]
) ulongint | false
```

This method performs a positioning operation and returns the current location.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, `false` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored and `false` will be returned for silent evaluation.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and `false` will be returned when silently evaluated.
- `Unsupported`: The operation is not supported (pipes, sockets); exceptions can be ignored, and `false` will be returned for silent evaluation.
- `TooLarge`: The returned offset is too large; the exception can be ignored, and `false` is returned for silent evaluation.

**Remark**

1. Only `file://` type streams are supported.

**Example**

```js
// Example: Locate to the 10th byte position
$stream. seek(10, 'set')
     // ulongint: 10L
```

#### 3.12.2) `close` Method

Close the stream.

**Description**

```js
$STREAM. close(
         < stream $stream: `the stream entity to close.` >
) boolean
```

This method closes the stream entity opened by `$STREAM.open` in order to release the system resources occupied by the stream entity. Returns `true` on success, also considered successful if the stream has been closed.

Note that if this method is not called, the closing of the stream will be done automatically when the corresponding native entity value is finally released.

**Exception**

- `ArgumentMissed`: missing required argument; exception can be ignored, `false` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored and `false` will be returned for silent evaluation.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and `false` will be returned when silently evaluated.

**Example**

```js
// create and clear
$STREAM.close($STREAM.open("file://abc.md", "read write create truncate"))
```

#### 3.12.3) `stdin` Static Property

This is a static attribute, corresponding to a stream entity, whose value can be used for stream reading and writing. It is the encapsulation of the C language standard input stream.

#### 3.12.4) `stdout` Static Property

This is a static attribute, corresponding to a stream entity, whose value can be used for the write interface of streaming read and write, and is the encapsulation of the standard output stream of C language.

**Example**

```
// Print the kernel name (like `Linux`) to stdout.
$STREAM.stdout.writelines($SYS.uname_prt('kernel-name'))
```

#### 3.12.5) `stderr` Static Property

This is a static attribute, which corresponds to a stream entity, and its value can be used for the write interface of stream read and write, which is the encapsulation of C language standard error stream.

#### 3.12.6) `pipe` Stream Entity

**Query Parameter**

In the `pipe` URI, we pass in the options (options) and parameters (arguments) for the command line through the query component (query component) according to the following specifications:

- Use `ARG0`, `ARG1`...`ARG<N>` as keys to represent all the command-line arguments used to execute the command.
- Where `ARG0` is optional; when `ARG0` is not passed, it means that the first parameter of the command line will be used in the last part of the path component of the `pipe` URI, usually the file name of the executable program .
- `ARG0`, `ARG1`...`ARG<N>` should be given consecutively. The code that parses the `pipe` URI will loop through the key-value pairs in the query component starting from 0, and stop when the given `ARG<n> (<n> >= 1)` cannot be found.

Suppose we want to execute the following command:

```
du -BM hvml-spec-v1.0-zh.md
```

Then the corresponding URI is (note that it must be URI-encoded):

```
     pipe:///usr/bin/du?ARG0=du&ARG1=-BM&ARG2=hvml-spec-v1.0-zh.md
```

Note that the value of each parameter should be URI-encoded in accordance with the RFC3986 specification.

**Additional Method**

The `pipe` stream entity should additionally provide the `writeeof` method, which is used by the parent process to write the EOF (end of file) character to the pipe. This operation is equivalent to closing the standard input (stdin) of the child process. Most interactive command line programs will choose to exit when the standard input is closed.

The `pipe` stream entity should additionally provide a `status` method for checking the status of the child process. This method returns an array, the first member is a string representing the state, and the second member gives the value corresponding to the state.

### 3.13) `SOCK`

`$SOCK` is a walker-level built-in variable that is used to create a stream socket or datagram socket and listen for connection requests or receive or send messages on the socket.

The following HVML code listens for connection requests on the specified UNIX domain socket, and then calls the `accept` method on the native entity representing the stream socket:

```html
    <choose on $SOCK.listen('unix:///var/run/myapp.sock') >
        <observe on $? for 'connRequest' >
            <choose on $?.accept() >
                ...
            </choose>
        </observe>
    </choose>
```

The native entity returned by the `$SOCK.listen` method is called a "streamSocket entity". A stream socket entity shall provide the following basic interfaces:

- `connRequest` event, used to notify a new connection request.
- `accept`: Accept the connection request and create a stream entity.

#### 3.13.1) `stream` Method

Create and listen to a stream socket (streamSocket), and return a native entity value representing the stream socket. This native entity can be observed.

**Description**

```js
$SOCK. stream(
         < string $uri: `the URI of the stream.` >
         [, <'[create || truncate || nonblock] | default' $opt = 'default':
                - 'create': `If $uri does not exist, try to create it`
                - 'nonblock': `Open the $uri in nonblocking mode`
                - 'default': `equivalent to 'create nonblock'`
            >
                 [, <longint $backlog: `the backlog.` >
                 ]
             ]
         ]
) native/streamSocket | undefined
```

This method creates and listens to a stream socket and returns a native entity value representing the stream socket.

This method specifies the location of the stream socket to open using a URI, such as:

- `unix:///var/run/myapp.sock`: UNIX socket.
- `tcp://foo.com:1100`: TCP socket.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and `undefined` is returned when silently evaluated.

**Remark**

1. The closing of the stream socket will be done automatically when the corresponding native entity value is finally released, and the `$streamSocket.close` method can be called in advance to release the system resources occupied by the stream socket entity.

**Example**

```js
$SOCK.stream("unix://var/run/myapp.sock")
```

#### 3.13.2) `dgram` Method

Create a datagram socket (dgramSocket) and return a native entity value representing the datagram socket. This native entity can be observed.

**Description**

```js
$SOCK.dgram(
        < string $uri: `the URI of the dgram socket.` >
        [, <'[create || truncate || nonblock] | default' $opt = 'default':
               - 'create':      `If $uri does not exist, try to create it`
               - 'nonblock':    `Open the $uri in nonblocking mode`
               - 'default':     `equivalent to 'create nonblock'`
           >
        ]
) native/dgramSocket | undefined
```

This method creates a datagram socket and returns a native entity value representing the datagram socket.

This method specifies the location of the stream socket to open using a URI, such as:

- `unix:///var/run/myapp.sock`: UNIX datagram socket.
- `udp://foo.com:1100`: UDP datagram socket.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required argument; exception can be ignored, and `undefined` is returned when silently evaluated.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid data is passed in; exceptions can be ignored, and `undefined` is returned when silently evaluated.

**Remark**

1. The closing of the stream socket will be done automatically when the corresponding native entity value is finally released, and the `$streamSocket.close` method can be called in advance to release the system resources occupied by the stream socket entity.

**Example**

```js
$SOCK.stream("unix://var/run/myapp.sock")
```

##### 3.13.2.1) `accept` Method of Stream Socket Entity

Accept connection requests from clients and create corresponding stream entities.

```js
$streamSocket. accept(
     [, <'[ssl | tls] || websocket || hibus || mqtt || http || ...' $filerts = '': `the filters will be used on the stream entity.`
            - 'ssl': `this filter uses SSL to encrypt and decrypt the data; only for TCP connections.`
            - 'tls': `this filter uses TLS to encrypt and decrypt the data; only for TCP connections.`
            - 'websocket': `this filter can handle WebSocket protocol, provide methods like ws_send() and ws_read()`
            - 'hibus': `this filter can handle hiBus protocol, provide methods like hibus_subscribe() and hibus_call_procedure()`
            - 'mqtt': `this filter can handle the MQTT protocol, privide methods like mqtt_subscribe() and mqtt_send_message()`
            - 'http': `this filter can handle the HTTP protocol, provide methods like http_send_request() and http_read_response_header()`
        >
         [, <object $filert_opts: `the options for fitlers.` >
         ]
     ]
) native/stream | undefined
```

This method accepts a connection request on a stream socket and returns a stream entity.

**Exception**

- `MemoryFailure`: Memory allocation failed; exception cannot be ignored.
- `ArgumentMissed`: missing required arguments; exceptions can be ignored, silently evaluating returns read data.
- `WrongDataType`: Incorrect parameter type; exception can be ignored, and the read data will be returned during silent evaluation.
- `InvalidValue`: invalid data was passed in; exceptions can be ignored, empty arrays are silently evaluated.
- `NotDesiredEntity`: Indicates that an unexpected entity was passed (the target may be a directory), and silently evaluates to an empty array.
- `BrokenPipe`: The other end of the pipe or socket is closed; the exception can be ignored, and an empty array is returned when evaluated silently.
- `AccessDenied`: The owner of the current walker does not have permission to write data; the exception can be ignored, and an empty array is returned when silently evaluated.
- `IOFailure`: Input and output errors; exceptions can be ignored, and an empty array is returned when silently evaluated.

**example**

##### 3.13.2.2) `send` Method of Stream Socket Entity

Send a message through this method.

##### 3.13.2.3) `recv` Method of Stream Socket Entity

Receive messages through this method.

##### 3.13.2.4) `close` Method of Stream Socket Entity

Close the stream socket entity.

##### 3.13.2.5) `peer` Property of Stream Socket Entity

Through this attribute, the address information of the peer (peer) corresponding to the stream socket that accepts the connection request can be obtained.

##### 3.13.2.6) `send` Method of Datagram Socket Entity

Send a message through this method.

##### 3.13.2.7) `recv` Method of Datagram Socket Entity

Receive messages through this method.

##### 3.13.2.8) `close` Method of Datagram Socket Entity

Close the stream socket entity.

## 4) Optional Dynamic Variable

### 4.1) `MATH`

`MATH` is a loadable dynamic variable used to implement complex mathematical operations and functions.

In the process of calling `MATH` dynamic object method, the following exceptions may occur:

- `ArgumentMissed`: A required argument is missing, or insufficient arguments were passed in.
- `WrongDataType`: Wrong parameter type.
- `ZeroDivision`: division by zero error.
- `Overflow`: An overflow error occurred during calculation.
- `Underflow`: An underflow error occurred while computing.
- `InvalidFloat`: Invalid floating point number.

#### 4.1.1) `pi` Method

This method is used to obtain a PI value with a given precision:

```js
// prototype
// always returns 3.14159265358979323846
$MATH.pi

// prototype
// always returns 3.141592653589793238462643383279502884L
$MATH.pi_l
```

#### 4.1.2) `e` Method

This method is used to obtain the value of e (natural constant, Euler's number) to a given precision:

```js
// prototype
// always returns 2.718281828459045
$MATH.e

// prototype
// always returns 2.718281828459045235360287471352662498L
$MATH.e_l
```

#### 4.1.3) `const` Method

Getters for these two methods are used to get predefined and custom math constants:

```js
// prototype
// Return the specified constant according to the incoming keyword or custom constant name, and the return type is `number`
$MATH.const( <'e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt (2)'] > <string: a user-defined const name>) number

// prototype
// Return the specified constant according to the incoming keyword or custom constant name, and the return type is `longdouble`
$MATH.const_l( <'e | log2e | log10e | ln2 | ln10 | pi | pi/2 | pi/4 | 1/pi | 2/pi | sqrt(2) | 2/sqrt(pi) | 1/sqrt (2)'> | <string: a user-defined const name>) longdouble

// Example: Get the log2e value, ie: 1.4426950408889634074
$MATH. const('log2e')

// Example: get 1/sqrt(2) value, ie: 0.707106781186547524400844362104849039L.
$MATH.const_l('1/sqrt(2)')
```

Note: For the values of predefined constants, see the C language standard library header file: `<math.h>`.

The setters for these two methods are used to set custom mathematical constants:

```js
// prototype
// set custom constant
$MATH. const(!
         <string: `a user-defined const name`>,
         <number: the constant>
         [, <longdouble: the constant>]
) boolean

// Example: set c (speed of light in vacuum) to 299792458
$MATH. const(! 'c', 299792458)

// Example: set G0 (gravitational constant) to 6.67e-11
$MATH. const(! 'G0', 6.67e-11)
```

Implementation requirements:

1. The value of the defined constant and the set custom constant can be modified through the setter.
1. Each constant has two precision values, one is normal precision value and the other is long double precision value.
1. If the long double-precision floating-point value corresponding to the constant is not passed, it will be treated as a normal precision value.
1. When the constant values of `pi` and `e` are changed by the setter, the return values of `$MATH.pi` and `$MATH.e` should be changed accordingly.

#### 4.1.4) `add` Method

Find the sum of two real numbers.

```js
// Prototype: Find the sum of two real numbers and return a value of the specified type; default is `number`
$MATH.add(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// Example: Finding (1.4 + 0.7) returns `number` type by default, and the result is `2.1`.
$MATH. add(1.4, 0.7)

// Example: Find (1.4 + 0.7) and convert to `longint` type, the result is `2L`.
$MATH. add(1.4, 0.7, 'longint')
```

#### 4.1.5) `sub` Method

Find the difference between two real numbers.

```js
// Prototype: find the difference between two real numbers, and return a value of the specified type; the default is `number`
$MATH.sub(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// Example: Finding (1.4 - 0.7) returns `number` type by default, and the result is `0.7`.
$MATH.sub(1.4, 0.7)

// Example: Finding (1.4 - 0.7) returns `longint` type, the result is `0L`.
$MATH.sub(1.4, 0.7, 'longint')
```

#### 4.1.6) `mul` Method

Find the product of two real numbers.

```js
// Prototype: Calculate the product of two real numbers and return a value of the specified type; the default is `number`
$MATH.mul(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// Example: Finding (1.4 * 0.7) returns `number` type by default, and the result is `0.98`.
$MATH.mul(1.4, 0.7)

// Example: Finding (1.4 * 0.7) returns `longint` type, the result is `0L`.
$MATH.mul(1.4, 0.7, 'longint')
```

#### 4.1.7) `div` Method

Find the quotient of two real numbers.

```js
// Prototype: find the quotient of two real numbers, and return a value of the specified type; the default is `number`
$MATH.div(<real>, <real>[, 'number | longint | ulongint | longdouble']) number | longint | ulongint | longdouble

// Example: Finding (1.4 / 0.7) returns `number` type by default, and the result is `2.0`.
$MATH.div(1.4, 0.7)

// Example: Finding (1.4 / 0.7) returns `longint` type, the result is `2L`.
$MATH.div(1.4, 0.7, 'longint')
```

#### 4.1.8) `eval` and `eval_l` Methods

These two methods are used to solve the parameterized operation expression. The `eval` method returns the result data of the `number` type, and the `eval_l` method returns the result data of the `longdouble` type.

Parametric operation expressions are similar to mathematical formulas, in which four arithmetic symbols, predefined constants, parameters, and functions can be used. For example, the expression for calculating the area of a circle is:

`PI*r*r`

In the above expression, `PI` is a predefined constant, and `r` is a parameter of this expression. When evaluating, we need to pass the value of this parameter into `eval` or ` eval_l` method. like:

`$MATH.eval('PI * r * r', { r: 2.0 })`

It will calculate the area of a circle with a radius of 2.0.

We can also use the following expression to complete the same calculation:

`$MATH.eval('PI * pow(r, 2)', { r: 2.0 })`

In the above expression, we used `pow(r, 2)` instead of `r * r`), `pow` is a function used to calculate a number to a specified power.

When a parameter name conflicts with a constant name, we take precedence over the given parameter value. For example, the following calculation:

`$MATH.eval('PI * pow(r, 2)', { PI: 3, r: 2.0 })`

will treat `PI` as a parameter name rather than a constant, so it evaluates to 12.

In parameterized operation expressions, the following constants can be used:

- `E`: Euler's constant, which is also the base of natural logarithms, approximately equal to 2.718.
- `LN2`: The natural logarithm of 2, approximately equal to 0.693.
- `LN10`: The natural logarithm of 10, approximately equal to 2.303.
- `LOG2E`: Base 2 logarithm of E, approximately equal to 1.443.
- `LOG10E`: Base 10 logarithm of E, approximately equal to 0.434.
- `PI`: Pi, the ratio of the circumference of a circle to its diameter, approximately equal to 3.14159.
- `SQRT1_2`: The square root of one-half (½), which is also the reciprocal of the square root of 2, approximately equal to 0.707.
- `SQRT2`: The square root of 2, approximately equal to 1.414.

In parameterized operation expressions, the following trigonometric functions can be used:

- `acos(x)`: Return the arc cosine of a number.
- `acosh(x)`: Return the inverse hyperbolic cosine of a number.
- `asin(x)`: Return the arc sine of a number.
- `asinh(x)`: Return the inverse hyperbolic sine of a number.
- `atan(x)`: Return the arc tangent of a number.
- `atanh(x)`: Return the inverse hyperbolic tangent of a number.
- `atan2(y, x)`: Return the arc tangent of y/x.
- `cos(x)`: Return the cosine of a number.
- `cosh(x)`: Return the hyperbolic cosine of a number.
- `sin(x)`: Return the sine of a number.
- `sinh(x)`: Return the hyperbolic sine of a number.
- `tan(x)`: Return the tangent of a number.
- `tanh(x)`: Return the hyperbolic tangent of a number.

In parameterized operation expressions, the following power and logarithmic functions can be used:

- `cbrt(x)`: Return the cube root of a number.
- `exp(x)`: Return Euler's constant raised to the parametric power, E^x, where x is the parameter and E is Euler's constant (2.718..., the base of natural logarithms).
- `hypot(x, y)`: Return the square root of the sum of squares of two numbers.
- `log(x)`: Return the natural logarithm of a number (㏒e, ie ㏑).
- `log10(x)`: Return the base 10 logarithm of a number.
- `log2(x)`: Return the base 2 logarithm of a number.
- `pow(x, y)`: Return a number raised to the power of y.
- `sqrt(x)`: Return the square root of a number.

In parameterized operation expressions, the following rounding functions can be used:

- `ceil(x)`: Return the smallest integer greater than a number, that is, the value after a number is rounded up.
- `floor(x)`: Return the largest integer less than a number, that is, the value after a number is rounded down.
- `round(x)`: Return a rounded number, equivalent to rounding the given argument to the nearest integer, away from 0.
- `trunc(x)`: Return the integer part of a number (directly remove the decimal point and the part after it), which is equivalent to rounding a number towards 0 to be an integer.

In parameterized operation expressions, the following miscellaneous functions can be used:

- `abs(x)`: Return the absolute value of a number.
- `max(x, y)`: Return the maximum of two values.
- `min(x, y)`: Return the minimum of two values.
- `random()`: Return a pseudo-random number between 0 and 1.
- `sign(x)`: Return the sign of a number, knowing whether a number is positive, negative or 0.

```js
// prototype
$MATH.eval(<string: a parameterized arithmetic expressions>[, <object: parameter map>]) number

// Example 1: Solve (500 + 10) * (700 + 30)
$MATH.eval("(500 + 10) * (700 + 30)")

// Example 2: Find the circumference of a circle
$MATH.eval("2 * pi * r", { pi: $MATH.pi, r: $r })

// Example 2a: Find the circumference of a circle (using a constant)
$MATH.eval("2 * PI * r", { r: $r })

// Example 3: Find the area of a circle
$MATH.eval("pi * r * r", { pi: $MATH.pi, r: 5 })

// Example 3a: Find the area of a circle (using constants and functions)
$MATH.eval("PI * pow(r, 2)", { r: 5 })

// Prototype: long double version of eval_l
$MATH.eval_l(<string: a parameterized arithmetic expressions>[, <object: parameter map>]) longdouble
```

#### 4.1.9) `sin` and `sin_l` Methods

Used to calculate the sine of the angle. The prototype is as follows:

```js
// Prototype: Find the sine of an angle, the angle is in radians; the return value is `number` type
$MATH.sin(<number | longint | ulongint | longdouble>) number

// Prototype: Find the sine of an angle, the angle is in radians; the return value is `longdouble` type
$MATH.sin_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the sine of (pi/4), return `number` type, the result is `0.707107`.
$MATH. sin($MATH. const('pi/4'))

// Example: find the sine of (pi/4), return `longdouble` type, the result is `0.707107L`.
$MATH. sin_l($MATH. const('pi/4'))
```

#### 4.1.10) `cos` and `cos_l` Methods

The cosine value is used to calculate the angle. The prototype is as follows:

```js
// Prototype: Find the cosine of an angle, the angle is in radians; the return value is `number` type
$MATH.cos(<number | longint | ulongint | longdouble>) number

// Prototype: Find the cosine of the angle, the angle is in radians; the return value is `longdouble` type
$MATH.cos_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the cosine of (pi/4), return the `number` type, and the result is `0.707107`.
$MATH.cos($MATH.const('pi/4'))

// Example: Calculate the cosine of (pi/4), return the `longdouble` type, and the result is `0.707107L`.
$MATH.cos_l($MATH.const('pi/4'))
```

#### 4.1.11) `tan` and `tan_l` Methods

Used to calculate the tangent of an angle. The prototype is as follows:

```js
// Prototype: Find the tangent of an angle, the angle is in radians; the return value is `number` type
$MATH.tan(<number | longint | ulongint | longdouble>) number

// Prototype: Find the tangent of an angle, the angle is in radians; the return value is `longdouble` type
$MATH.tan_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the tangent of (pi/4), return `number` type, the result is `1.0`.
$MATH.tan($MATH.const('pi/4'))

// Example: Find the tangent of (pi/4), return `longdouble` type, the result is `1.0L`.
$MATH.tan_l($MATH.const('pi/4'))
```

#### 4.1.12) `sinh` and `sinh_l` Methods

They are used to calculate the hyperbolic sine of a value. The prototype is as follows:

```js
// Prototype: Calculate the hyperbolic sine of a value; the return value is `number` type
$MATH.sinh(<number | longint | ulongint | longdouble>) number

// Prototype: Find the hyperbolic sine of a value; the return value is of type `longdouble`
$MATH.sinh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the hyperbolic sine of `1.0`, return `number` type, and the result is `1.175201`.
$MATH. sinh(1.0)

// Example: Calculate the hyperbolic sine of `1.0`, return `longdouble` type, and the result is `1.175201L`.
$MATH. sinh_l(1.0)
```

#### 4.1.13) `cosh` and `cosh_l` Methods

Used to calculate the hyperbolic cosine of a numeric value. The prototype is as follows:

```js
// Prototype: Calculate the hyperbolic cosine of a value; the return value is of `number` type
$MATH.cosh(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the hyperbolic cosine of a value; the return value is of type `longdouble`
$MATH.cosh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the hyperbolic cosine of `1.0`, return `number` type, and the result is `1.543081`.
$MATH.cosh(1.0)

// Example: Calculate the hyperbolic cosine of `1.0`, return the `longdouble` type, and the result is `1.543081L`.
$MATH.cosh_l(1.0)
```

#### 4.1.14) `tanh` and `tanh_l` Methods

Used to calculate the hyperbolic tangent of a numeric value. The prototype is as follows:

```js
// Prototype: Find the hyperbolic tangent of a value; the return value is `number` type
$MATH.tanh(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the hyperbolic tangent of a value; the return value is of type `longdouble`
$MATH.tanh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the hyperbolic tangent of `1.0`, return `number` type, and the result is `0.761594`.
$MATH.tan(1.0)

// Example: Calculate the hyperbolic tangent of `1.0`, return `longdouble` type, and the result is `0.761594L`.
$MATH.tan_l(1.0)
```

#### 4.1.15) `asin` and `asin_l` Methods

Used to calculate the arcsine of a number. The prototype is as follows:

```js
// Prototype: Find the arc sine of a value to obtain the radian value of the corresponding angle; the return value is `number` type
$MATH.asin(<number | longint | ulongint | longdouble>) number

// Prototype: Find the arc sine of the value, and get the radian value of the corresponding angle; the return value is `longdouble` type
$MATH.asin_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the arcsine of `0.707107`, return `number` type, and the result is `0.785398`.
$MATH.asin(0.707107)

// Example: Find the arcsine of `0.707107`, return `longdouble` type, and the result is `0.785398L`.
$MATH.asin_l(0.707107)
```

#### 4.1.16) `acos` and `acos_l` Methods

Used to calculate the arccosine of a number. The prototype is as follows:

```js
// Prototype: Find the arccosine of the value and obtain the radian value of the corresponding angle; the return value is `number` type
$MATH.acos(<number | longint | ulongint | longdouble>) number

// Prototype: Find the arccosine of the value, and get the radian value of the corresponding angle; the return value is `longdouble` type
$MATH.acos_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the arccosine of `0.707107`, return `number` type, and the result is `0.785398`.
$MATH.acos(0.707107)

// Example: Calculate the arccosine of `0.707107`, return `longdouble` type, and the result is `0.785398L`.
$MATH.acos_l(0.707107)
```

#### 4.1.17) `atan` and `atan_l` Methods

Used to calculate the arctangent of a numeric value. The prototype is as follows:

```js
// Prototype: Calculate the arctangent of a value, and get the radian value of the corresponding angle; the return value is `number` type
$MATH.atan(<number | longint | ulongint | longdouble>) number

// Prototype: find the arctangent of a value, and obtain the radian value of the corresponding angle; the return value is `longdouble` type
$MATH.atan_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the arctangent of `1.0`, return `number` type, the result is `0.785398`.
$MATH.atan(1.0)

// Example: Find the arctangent of `1.0`, return `longdouble` type, the result is `0.785398L`.
$MATH.atan_l(1.0)
```

#### 4.1.18) `asinh` and `asinh_l` Methods

Calculate the inverse hyperbolic sine of the value. The prototype is as follows:

```js
// Prototype: Calculate the inverse hyperbolic sine of a value; the return value is `number` type
$MATH.asinh(<number | longint | ulongint | longdouble>) number

// Prototype: Find the inverse hyperbolic sine of a value; the return value is of type `longdouble`
$MATH.asinh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the inverse hyperbolic sine of `1.0`, return `number` type, and the result is `0.881374`.
$MATH.asin(1.0)

// Example: Find the inverse hyperbolic sine of `1.0`, return `longdouble` type, and the result is `0.881374L`.
$MATH.asin_l(1.0)
```

#### 4.1.19) `acosh` and `acosh_l` methods

Used to calculate the inverse hyperbolic cosine of a number. The prototype is as follows:

```js
// Prototype: Calculate the inverse hyperbolic cosine of a value; the return value is `number` type
$MATH.acosh(<number | longint | ulongint | longdouble>) number

// Prototype: Find the inverse hyperbolic cosine of a value; the return value is of type `longdouble`
$MATH.acosh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the inverse hyperbolic cosine of `1.0`, return `number` type, and the result is `0.0`.
$MATH.acos(1.0)

// Example: Calculate the inverse hyperbolic cosine of `1.0`, return `longdouble` type, and the result is `0.0L`.
$MATH.acos_l(1.0)
```

#### 4.1.20) `atanh` and `atanh_l` methods

Used to calculate the inverse hyperbolic tangent of a number. The prototype is as follows:

```js
// Prototype: Calculate the inverse hyperbolic tangent of a value; the return value is `number` type
$MATH.atanh(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the inverse hyperbolic tangent of a value; the return value is of type `longdouble`
$MATH.atanh_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the inverse hyperbolic tangent of `0.5`, return `number` type, and the result is `0.549306`.
$MATH.atanh(0.5)

// Example: Calculate the inverse hyperbolic tangent of `0.5`, return `longdouble` type, and the result is `0.549306L`.
$MATH.atanh_l(0.5)
```

#### 4.1.21) `fmod` and `fmod_l` Methods

They are used to calculate the remainder when dividing two values. The prototype is as follows:

```js
// Prototype: Find the remainder of the division of two values; the return value is `number` type
$MATH.fmod(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) number

// Prototype: Calculate the remainder of the division of two values; the return value is of type `longdouble`
$MATH.fmod_l(<number | longint | ulongint | longdouble>, <number | longint | ulongint | longdouble>) longdouble

// Example: find the remainder of `(4.5/2.0)`, return `number` type, the result is `0.5`.
$MATH.fmod(4.5, 2.0)

// Example: find the remainder of `(4.5/2.0)`, return `longdouble` type, the result is `0.5L`.
$MATH.fmod_l(4.5, 2.0)
```

#### 4.1.22) `fabs` Method

They are used to calculate the absolute value of a numeric value. The prototype is as follows:

```js
// Prototype: Calculate the absolute value of the value; the return value type is the type of the incoming parameter value
$MATH.fabs(<number | longint | ulongint | longdouble>) number | longint | ulongint | longdouble

// Example: find the absolute value of `-2.5L`, return `longdouble` type, and the result is `2.5L`.
$MATH.fabs(-2.5L)

```

#### 4.1.23) `log` and `log_l` Methods

They are used to calculate the natural logarithm of a value. The prototype is as follows:

```js
// Prototype: Calculate the natural logarithm of a value; return value is `number` type
$MATH.log(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the natural logarithm of a value; the return value is of type `longdouble`
$MATH.log_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Find the natural logarithm of `e`, return `number` type, and the result is `1.0`.
$MATH. log($MATH. const('e'))

// Example: find the natural logarithm of `e`, return `longdouble` type, and the result is `1.0L`.
$MATH. log_l($MATH. const('e'))
```

#### 4.1.24) `log10` and `log10_l` Methods

They are used to calculate the base `10` logarithm of a value. The prototype is as follows:

```js
// Prototype: Calculate the logarithm of a value based on `10`; the return value is of type `number`
$MATH.log10(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the logarithm of a value based on `10`; the return value is of type `longdouble`
$MATH.log10_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate the logarithm of `10.0` based on `10`, return `number` type, and the result is `1.0`.
$MATH.log10(10.0)

// Example: Calculate the logarithm of `10.0` based on `10`, return `longdouble` type, and the result is `1.0L`.
$MATH.log10i_l(10.0)
```

#### 4.1.25) `pow` and `pow_l` Methods

Used to calculate `x` to the power of `y`. The prototype is as follows:

```js
// Prototype: find `x` to the power of `y`; the return value is of type `number`
$MATH.pow(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) number

// Prototype: find `x` raised to the power of `y`; the return value is of type `longdouble`
$MATH.pow_l(<number | longint | ulongint | longdouble> x, <number | longint | ulongint | longdouble> y) longdouble

// Example: find `3.0` to the power of `2.0`, return `number` type, the result is `9.0`.
$MATH.pow(3.0, 2.0)

// Example: find `3.0` to the power of `2.0`, return `longdouble` type, the result is `9.0L`.
$MATH.pow_l(3.0, 2.0)
```

#### 4.1.26) `exp` and `exp_l` Methods

Used to calculate `e` raised to the power of `x`. The prototype is as follows:

```js
// Prototype: find `e` raised to the power of `x`; the return value is of type `number`
$MATH.exp(<number | longint | ulongint | longdouble> x) number

// Prototype: find `e` raised to the power of `x`; the return value is of type `longdouble`
$MATH.exp_l(<number | longint | ulongint | longdouble> x) longdouble

// Example: find `e` raised to the power of `1.0`, return `number` type, the result is `2.718282`.
$MATH.exp(1.0)

// Example: find `e` raised to the power of `1.0`, return `longdouble` type, the result is `2.718282L`.
$MATH.exp_l(1.0)
```

#### 4.1.27) `floor` and `floor_l` Methods

The rounded value used to calculate the numeric value. The prototype is as follows:

```js
// Prototype: Calculate the value rounded down; the return value is `number` type
$MATH.floor(<number | longint | ulongint | longdouble>) number

// Prototype: calculates the value rounded down; the return value is of type `longdouble`
$MATH.floor_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate `-2.3`, round down the integer value, return `number` type, and the result is `-3.0`.
$MATH. floor(-2.3)

// Example: Calculate `-2.3`, round down the integer value, return `longdouble` type, and the result is `-3.0L`.
$MATH. floor_l(-2.3)
```

#### 4.1.28) `ceil` and `ceil_l` Methods

The rounded up value used to calculate the numeric value. The prototype is as follows:

```js
// Prototype: Calculate the value rounded up; the return value is `number` type
$MATH.ceil(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the value rounded up; the return value is `longdouble` type
$MATH.ceil_l(<number | longint | ulongint | longdouble>) longdouble

// Example: Calculate `-2.3`, round up the integer value, return `number` type, and the result is `-2.0`.
$MATH.ceil(-2.3)

// Example: Calculate `-2.3`, round up the integer value, return `longdouble` type, and the result is `-2.0L`.
$MATH.ceil_l(-2.3)
```

#### 4.1.29) `sqrt` and `sqrt_l` methods

Used to calculate the square root of a number. The prototype is as follows:

```js
// Prototype: Calculate the square root of a number; the return value is of type `number`
$MATH.sqrt(<number | longint | ulongint | longdouble>) number

// Prototype: Calculate the square root of a value; the return value is of type `longdouble`
$MATH.sqrt_l(<number | longint | ulongint | longdouble>) longdouble

// Example: find the square root of `9.0`, return `number` type, the result is `3.0`.
$MATH. sqrt(9.0)

// Example: find the square root of `9.0`, return `longdouble` type, the result is `3.0L`.
$MATH. sqrt_l(9.0)
```

### 4.2) `FS`

`FS` is a mountable dynamic variable used to implement common filesystem operations.

In the process of calling `FS` dynamic object method, the following exceptions may occur:

- `ArgumentMissed`: A required argument is missing, or insufficient arguments were passed in.
- `WrongDataType`: Wrong parameter type.
- `AccessDenied`: Access is denied.
- `IOFailure`: Input output error.
- `TooMany`: It means too many (such as symbolic links).
- `TooLong`: Indicate too long (like a path name).
- `NotDesiredEntity`: Indicate that an unexpected entity was passed.
- `EntityNotFound`: The specified entity (such as a file) was not found.
- `EntityExists`: When creating a new entity (such as a file), the entity already exists.
- `OSFailure`: Indicate that an undefined general operating system error was encountered.
- `BadEncoding`: Bad encoding.

**Remark**

When the specified path is given as a relative path (that is, without a leading `/` symbol), all methods of this object will use the current working path information (same as `$SYS.cwd`).

#### 4.2.1) `list` Method

This method is used to list the directory entries under the specified path and returns an array of objects. The prototype and main usage are as follows:

```js
// prototype
$FS.list(
         [ <string $path: `the path to list`>
             [, <string $filters: `the list of semicolon separated name filters.`> ]
         ]
) array
```

Information about each directory entry is represented by the following objects:

```js
{
     'name': <string: `name of the file (directory entry')`>,
     'dev_major': <ulongint: `the major ID of device containing file`>,
     'dev_minor': <ulongint: `the minor ID of device containing file`>,
     'inode': <ulongint: `inode number`r>
     'type': <string: `file type like 'd', 'b', 's', ...`>,
     'mode_digits': <string: `file mode like `0644``>,
     'mode_alphas': <string: `file mode like `rwxrwxr-x``>,
     'nlink': <ulongint: `number of hard links`>,
     'uid': <number: `the user ID of owner`>,
     'gid': <number: `the group ID of owner`>,
     'rdev_major': <ulongint: `the major device ID if it is a special file`>,
     'rdev_minor': <ulongint: `the minor device ID if it is a special file`>,
     'size': <ulongint: `total size in bytes`>,
     'blksize': <ulongint: `block size for filesystem I/O`>,
     'blocks': <ulongint: `Number of 512B blocks allocated`>,
     'atime_sec': <ulongint: `time of last acces (seconds since Epoch)`>,
     'atime_nsec': <ulongint: `time of last acces (nanoseconds since 'atime_sec')`>,
     'mtime_sec': <ulongint: `time of last modification (seconds since Epoch)`>,
     'mtime_nsec': <ulongint: `time of last modification (nanoseconds since 'mtime_sec')`>,
     'ctime_sec': <ulongint: `time of last status change (seconds since Epoch`)>
     'ctime_nsec': <ulongint: `time of last status change (nanoseconds since 'ctime_sec'`)>
}
```

**Example**

```js
// List all directory entries in the current working directory
$FS.list
     // array

// List all directory entries matching `*.conf` in the current working directory
$FS.list("", '*.conf')
     // array

// List directory entries whose names match the given two wildcards
$FS.list('/etc', "*.txt; *.md")
     // array
```

#### 4.2.2) `list_prt` Method

This method is used to list the directory item information under the specified path, and returns a formatted string array. The prototype and main usage are as follows:

```js
// prototype
$FS.list_prt(<string: path>[, <string: the list of semicolon separated name filters>[, '[mode || nlink || uid || gid || size || blksize || atime || ctime | | mtime || name] | all | default']])

// Example: List all directory items under the specified path, and only list the directory item name and type.
$FS.list_prt($path)

// Example: List directory entries whose names match the given wildcard, but only list the directory entry name and type.
$FS.list_prt($path, "*.txt")

// Example: List directory entries whose names match the given two wildcards, and specify the listed columns and their order
$FS.list_prt($path, "*.txt; *.md", "mode nlink uid gid size blksize atime ctime mtime name")
```

Note: The formatting method of `list_prt` for each directory entry information is the same as the Linux `ls` command.

#### 4.2.3) `basename` Method

Return the tail names in the path.

**Description**

```js
$FS.basename(
         <string $path: a path.>
         [,
             <string $suffix = '': if the name component ends in `suffix` this will also be cut off.>
         ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `basename()` function: <https://www.php.net/manual/en/function.basename.php>

#### 4.2.4) `chgrp` Method

Change the owner group of a file.

**Description**

```js
$FS.chgrp(
         <string $filename: `path to the file.`>,
         <string | number $group: `A group name or a group identifier.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `chgrp()` function: <https://www.php.net/manual/en/function.chgrp.php>

#### 4.2.5) `chmod` method

Change the access permissions of a file.

**Description**

```js
$FS.chmod(
         <string $filename: `path to the file.`>,
         <string $permissions: `the permission string like '0644' or 'u+rwx,go+rx'.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `chmod()` function: <https://www.php.net/manual/en/function.chmod.php>

#### 4.2.6) `chown` method

Change the owner user of a file.

**Description**

```js
$FS.chown(
         <string $filename: `path to the file`.>,
         <string | number $user: `A user name or a user identifier.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `chown()` function: <https://www.php.net/manual/en/function.chown.php>

#### 4.2.7) `copy` Method

Copy files.

**Description**

```js
$FS.copy(
         <string $from: `path to the source file.`>,
         <string $to: `The destination path.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `copy()` function: <https://www.php.net/manual/en/function.copy.php>

#### 4.2.8) `dirname` Method

Return the path of the parent directory.

**Description**

```js
$FS.dirname(
         <string $path: `a path.`>
         [,
             <real $levels = 1: `The number of parent directories to go up.`>
         ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `dirname()` function: <https://www.php.net/manual/en/function.dirname.php>

#### 4.2.9) `disk_usage` Method

Return the disk usage of the file system.

**Description**

```js
$FS.disk_usage(
         <string $directory: `A directory of the filesystem or disk partition.`>
) object
```

**Parameter**

**Return Value**

The return values are as follows:

```js
{
     'free_blocks': <ulongint: `the number of free blocks`>,
     'free_inodes': <ulongint: `the number of free inodes`>,

     'total_blocks': <ulongint: `the number of total blocks`>,
     'total_inodes': <ulongint: `the number of total inodes`>,

     'mount_point': <string: `the mount point of the file system`>,
     'dev_majar': <ulongint: `the majar device ID`>,
     'dev_minor': <ulongint: `the minor device ID`>,
}
```

**example**

**Reference**

- PHP `disk_free_space()` function: <https://www.php.net/manual/en/function.disk-free-space.php>
- PHP `disk_total_space()` function: <https://www.php.net/manual/en/function.disk-total-space.php>

#### 4.2.10) `file_exists` Method

Determine whether a file or directory exists.

**Description**

```js
$FS.file_exists(
         <string $filename: `path to the file or directory.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `file_exists()` function: <https://www.php.net/manual/en/function.file-exists.php>

#### 4.2.11) `file_is` Method

Determine whether a file is of the specified type.

**Description**

```js
$FS.file_is(
         <string $filename: `the path to a file or directory.`>
         <'[ dir | regular | symlink | socket | pipe | block | char ] || [ executable | exe ] || [readable | read] || [writable write]' $which = 'regular readable':
             'dir' - `a directory.`
             'regular' - `a regular file.`
             'symlink' - `a symbolic link.`
             'socket' - `a unix socket file.`
             'pipe' - ``a named pipe file or just a pipe file.``
             'block' - `a block device file.`
             'char' - `a character device file.`
             'executable'/'exe' - `is executable.`
             'readable'/'read' - `is readable.`
             'writable'/'write' - `is writable.`
        >
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `is_dir()` function: <https://www.php.net/manual/en/function.is_dir.php>
- PHP `is_file()` function: <https://www.php.net/manual/en/function.is_file.php>
- PHP `is_link()` function: <https://www.php.net/manual/en/function.is_link.php>
- PHP `is_executable()` function: <https://www.php.net/manual/en/function.is_executable.php>
- PHP `is_readable()` function: <https://www.php.net/manual/en/function.is_readable.php>
- PHP `is_writable()` function: <https://www.php.net/manual/en/function.is_writable.php>

#### 4.2.12) `lchgrp` Method

Change the owner group of a symbolic link.

**Description**

```js
$FS.lchgrp(
         <string $filename: `The path to the symlink.`>,
         <string | number $group: `A group name or a group identifier.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `lchgrp()` function: <https://www.php.net/manual/en/function.lchgrp.php>

#### 4.2.13) `lchown` Method

Change the owner user of a symbolic link.

**Description**

```js
$FS.lchown(
         <string $filename: `The path to the symlink.`>,
         <string | number $user: `A user name or a user identifier.`>
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `lchown()` function: <https://www.php.net/manual/en/function.lchown.php>

#### 4.2.14) `linkinfo` Method

Get link information.

**Description**

```js
$FS.linkinfo(
         <string $path: 'The path to the link.`>
) number | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `linkinfo()` function: <https://www.php.net/manual/en/function.linkinfo.php>

#### 4.2.15) `lstat` Method

Get statistics for a file or symbolic link.

**Description**

```js
$FS.lstat(
        <string $filename: `The path to the file or directory.`>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - `returns ID of device containing the file.`
            'inode' - `returns inode number.`
            'type' - `returns file type like 'd', 'b', or 's'.`
            'mode_digits' - `returns file mode like '0644'.`
            'mode_alphas' - `returns file mode like 'rwxrwxr-x'.`
            'nlink' - `returns number of hard links.`
            'uid' - `returns the user ID of owner.`
            'gid' - `returns the group ID of owner.`
            'rdev' - `returns the device ID if it is a special file.`
            'size' - `returns total size in bytes.`
            'blksize' - `returns block size for filesystem I/O.`
            'blocks' - `returns number of 512B blocks allocated.`
            'atime' - `returns time of last acces.`
            'mtime' - `returns time of last modification.`
            'ctime' - `returns time of last status change.`
            'all' - `returns all above information.`
            'default' - 'type mode_digits uid gid size rdev ctime'
            >
        ]
) object
```

**Parameter**

**Return Value**

The Result is represented by the following objects or parts thereof:

```js
{
     'dev_major': <ulongint: `the major ID of device containing file`>,
     'dev_minor': <ulongint: `the minor ID of device containing file`>,
     'inode': <ulongint: `inode number`r>
     'type': <string: `file type like 'd', 'b', or 's'`>,
     'mode_digits': <string: `file mode like '0644'`>,
     'mode_alphas': <string: `file mode like 'rwxrwxr-x'`>,
     'nlink': <number: `number of hard links`>,
     'uid': <number: `the user ID of owner`>,
     'gid': <number: `the group ID of owner`>,
     'rdev_major': <ulongint: `the major device ID if it is a special file`>,
     'rdev_minor': <ulongint: `the minor device ID if it is a special file`>,
     'size': <ulongint: `total size in bytes`>,
     'blksize': <ulongint: `block size for filesystem I/O`>,
     'blocks': <ulongint: `number of 512B blocks allocated`>,
     'atime_sec': <ulongint: `time of last acces (seconds since Epoch)`>,
     'atime_nsec': <ulongint: `time of last acces (nanoseconds since 'atime_sec')`>,
     'mtime_sec': <ulongint: `time of last modification (seconds since Epoch)`>,
     'mtime_nsec': <ulongint: `time of last modification (nanoseconds since 'mtime_sec')`>,
     'ctime_sec': <ulongint: `time of last status change (seconds since Epoch`)>
     'ctime_nsec': <ulongint: `time of last status change (nanoseconds since 'ctime_sec'`)>
}
```

**Example**

**Reference**

- PHP `lstat()` function: <https://www.php.net/manual/en/function.lstat.php>

#### 4.2.16) `link` Method

Create hard links.

**Description**

```js
$FS.link(
         <string $target: `Target of the link.` >,
         <string $link: `The link name.` >
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `link()` function: <https://www.php.net/manual/en/function.link.php>

#### 4.2.17) `mkdir` Method

Create a directory.

**Description**

```js
$FS.mkdir(
         <string $directory: `The directory path.` >
         [, < string $permissions = '0777': `The permissions are '0777' by default, which means the widest possible access.` >
             [, < boolean $recursive = `false`: `Allows the creation of nested directories specified in $directory.` >
             ]
         ]
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `mkdir()` function: <https://www.php.net/manual/en/function.mkdir.php>

#### 4.2.18) `pathinfo` Method

Get file path information.

**Description**

```js
$FS.pathinfo(
         < string $path: `The path to be parsed.` >
         [,
             < '[dirname || basename || extension || filename] | all' $flags = 'all': `Specifies the elements to be returned`.
             >
         ]
) object | string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `pathinfo()` function: <https://www.php.net/manual/en/function.pathinfo.php>

#### 4.2.19) `readlink` Method

Read the content of a symbolic link.

**Description**

```js
$FS.readlink(
         <string $path: `The symbolic link path.` >
) string | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `readlink()` function: <https://www.php.net/manual/en/function.readlink.php>

#### 4.2.20) `realpath` Method

Return the normalized absolute pathname.

**Description**

```js
$FS.realpath(
         <string $path: `The path being checked.` >
) string | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `realpath()` function: <https://www.php.net/manual/en/function.realpath.php>

#### 4.2.21) `rename` Method

Rename a file or directory.

**Description**

```js
$FS.rename(
         <string $from: `The old name.` >
         <string $to: `The new name.` >
) true | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `rename()` function: <https://www.php.net/manual/en/function.rename.php>

#### 4.2.22) `rmdir` Method

Remove directory.

**Description**

```js
$FS.rmdir(
         <string $directory: `The directory path.` >
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `rmdir()` function: <https://www.php.net/manual/en/function.rmdir.php>

#### 4.2.23) `stat` method

Get statistics for a file.

**Description**

```js
$FS.stat(
        <string $filename: `The path to the file or directory.`>
        [, < '[dev || inode || type || mode_digits || mode_alphas || nlink || uid || gid || size || rdev || blksize || blocks || atime || ctime || mtime] | all | default' $flags = 'default':
            'dev' - `returns ID of device containing the file.`
            'inode' - `returns inode number.`
            'type' - `returns file type like 'd', 'b', or 's'.`
            'mode_digits' - `returns file mode like '0644';`
            'mode_alphas' - `returns file mode like 'rwxrwxr-x';`
            'nlink' - `returns number of hard links.`
            'uid' - `returns the user ID of owner.`
            'gid' - `returns the group ID of owner.`
            'rdev' - `returns the device ID if it is a special file.`
            'size' - `returns total size in bytes.`
            'blksize' - `returns block size for filesystem I/O.`
            'blocks' - `returns number of 512B blocks allocated.`
            'atime' - `returns time of last acces.`
            'mtime' - `returns time of last modification.`
            'ctime' - `returns time of last status change.`
            'all' - `returns all above information.`
            'default' - 'type mode_digits uid gid size rdev ctime'
            >
        ]
) object
```

**Parameter**

**Return Value**

The result is represented by the following objects or parts thereof:

```js
{
     dev_major: <ulongint: the major ID of device containing file>,
     dev_minor: <ulongint: the minor ID of device containing file>,
     inode: <ulongint: inode number>
     type: <string: file type like 'd', 'b', 's', ...>,
     mode_digits: <string: file mode like `0644`>,
     mode_alphas: <string: file mode like `rwxrwxr-x`>,
     nlink: <ulongint: number of hard links>,
     uid: <ulongint: the user ID of owner>,
     gid: <ulongint: the group ID of owner>,
     rdev_major: <ulongint: the major device ID if it is a special file>,
     rdev_minor: <ulongint: the minor device ID if it is a special file>,
     size: <ulongint: total size in bytes>,
     blksize: <ulongint: block size for filesystem I/O>,
     blocks: <ulongint: Number of 512B blocks allocated>,
     atime_sec: <ulongint: time of last acces (seconds since Epoch)>,
     atime_nsec: <ulongint: time of last acces (nanoseconds since `atime_sec`)>,
     mtime_sec: <ulongint: time of last modification (seconds since Epoch)>,
     mtime_nsec: <ulongint: time of last modification (nanoseconds since `mtime_sec`)>,
     ctime_sec: <ulongint: time of last status change (seconds since Epoch)>
     ctime_nsec: <ulongint: time of last status change (nanoseconds since `ctime_sec`)>
}
```

**Example**

**Reference**

- PHP `stat()` function: <https://www.php.net/manual/en/function.stat.php>

#### 4.2.24) `symlink` Method

Create a symbolic link.

**Description**

```js
$FS.link(
         < string $target: Target of the link. >,
         < string $link: The link name. >
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `symlink()` function: <https://www.php.net/manual/en/function.symlink.php>

#### 4.2.25) `tempname` Method

Generate unique temporary file name.

**Description**

```js
$FS.tempname(
         < string $directory: The directory where the temporary filename will be created. >
         < string $prefix: The prefix of the generated temporary filename. >
) string | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `tempname()` function: <https://www.php.net/manual/en/function.tempname.php>


#### 4.2.26) `touch` Method

Set access and update time for files.

**Description**

```js
$FS.touch(
         < string $filename: Path to the file. >
         [, <real $mtime = 0: The modification time, if it is 0 or negative, use the current system time. >
             [, <real $atime = 0: The access time, if it is 0 or negative, use `mtime`. > ]
         ]
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `touch()` function: <https://www.php.net/manual/en/function.touch.php>

#### 4.2.27) `umask` Method

Change the current umask value.

**Description**

```js
$FS.umask(
         [ string $mask = '': The new umask. ]
) string
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `umask()` function: <https://www.php.net/manual/en/function.umask.php>

#### 4.2.28) `unlink` Method

Remove hard links.

**Description**

```js
$FS.unlink(
         < string $filename: Path to the file. >
) boolean
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `unlink()` function: <https://www.php.net/manual/en/function.unlink.php>

#### 4.2.29) `file_contents` Method

Read from or write to a file.

**Description**

```js
$FS.file_contents(
        < string $filename: `Path to the file.` >
        < '[binary | string] || [strict | silent]' $flags:
            'binary' - `reads the contents as a byte sequence.`
            'string' - `reads the contents as a string in UTF-8.`
            'strict' - `throw the `BadEncoding` exception for a bad encoded string.`
            'silent' - `stops reading for any error and returns the read data.`
        >
        [, <longint $offset = 0: `The offset where the reading starts. Negative offsets count from the end of the file.` >
            [, <ulongint $length = 0: `Maximum length of data read. The default is to read until end of file is reached.` > ]
        ]
) string | bsequence | false
```

```js
$FS.file_contents(!
        < string $filename: `Path to the file.` >
        < string | bsequenc $data: `The data to write, can be either a string or a byte sequence.`
        < 'append || lock': $flags:
            'append' - `if file $filename already exists, append the data to the file instead of overwriting it.`
            'lock' - `acquires an exclusive lock on the file while proceeding to the writing.`
        >
) ulongint | false
```

**Parameter**

**Return Value**

**Example**

**Reference**

- PHP `file_get_contents()` function: <https://www.php.net/manual/en/function.file-get-contents.php>
- PHP `file_put_contents()` function: <https://www.php.net/manual/en/function.file-put-contents.php>

#### 4.2.30) `opendir` Method

Open a directory.

**Description**

```js
$FS.opendir(
         < string $pathname: Path to the directory. >
) native/dirStream | false
```

This method opens the specified path to read the directory entries, and the returned data corresponds to a native entity representing the directory stream, called "dirStream". Directory entities provide the following methods:

- `$dirStream.read()`: Read the next directory entry.
- `$dirStream.rewind()`: Rewind the directory stream.

**Parameter**

**Return Value**

A native entity on which a `read` or `rewind` method is provided to read a directory entry or reset the directory stream, respectively.

**Example**

**Reference**

- PHP `opendir()` function: <https://www.php.net/manual/en/function.opendir.php>

##### 4.2.30.1) `read` Method of Directory Stream Entity

Read the next directory entry.

**Description**

```js
$dirStream. read object | false
```

**Example**

**Reference**

- PHP `readdir()` function: <https://www.php.net/manual/en/function.readdir.php>

##### 4.2.30.2) `rewind` Method of Directory Stream Entity

Reset directory flow.

**Description**

```js
$dirStream. rewind boolean
```

**Example**

**Reference**

- PHP `rewinddir()` function: <https://www.php.net/manual/en/function.rewinddir.php>

#### 4.2.31) `closedir` Method

Close directory stream.

**Description**

```js
$FS.closedir(
         < dirStream $dir_stream: `The dirStream entity to close.` >
) boolean
```

This method prematurely closes the directory stream opened by `$FS.opendir()` in order to release the system resources it occupies. If this method is not called, when the variant data corresponding to the directory stream is destroyed, the directory stream will also be automatically closed.

**Parameter**

**Return Value**

**Example**

**Remark**

**Reference**

- PHP `opendir()` function: <https://www.php.net/manual/en/function.opendir.php>

### 4.3) `FILE`

`FILE` is a loadable dynamic variable used to implement common file read and write operations.

The variable is designed as a two-level object:

- `txt`: Provides an interface for reading and writing text files.
- `bin`: Provides an interface for reading and writing binary files.

**Remark**

When the specified file is given as a relative path (i.e. without a leading `/` symbol), all methods of the object will use the current working path information maintained by the current runner (same as `$SYS.cwd`).

#### 4.3.1) Text File

##### 4.3.1.1) `txt.head` Method

This method reads the first few lines of a text file and returns an array of strings.

```js
// prototype
$FILE.txt.head(<string: file name>[, <number: number of lines>])

// Example: read all lines
$FILE.txt.head($file)

// Example: read the first 5 lines
$FILE.txt.head($file, 5)

// Example: read all but the last 5 lines
$FILE.txt.head($file, -5)
```

##### 4.3.1.2) `txt.tail` Method

This method reads the last few lines of the text file and returns an array of strings.

```js
// prototype
$FILE.txt.tail(<string: file name>[, <number: number of lines>])

// Example: read all lines
$FILE.txt.tail($file)

// Example: read last 5 lines
$FILE.txt.tail($file, 5)

// Example: read all but the first 5 lines
$FILE.txt.tail($file, -5)
```

#### 4.3.2) Binary File

##### 4.3.2.1) `bin.head` Method

This method reads the first few bytes of the binary file and returns a sequence of bytes.

```js
// prototype
$FILE.bin.head(<string: file name>[, <number: number of bytes>])

// Example: read all bytes
$FILE. bin. head($file)

// Example: read the first 5 bytes
$FILE. bin. head($file, 5)

// Example: read all but the last 5 bytes
$FILE. bin. head($file, -5)
```

##### 4.3.2.2) `bin.tail` Method

This method reads the last few bytes of the binary file and returns a sequence of bytes.

```js
// prototype
$FILE.bin.tail(<string: file name>[, <number: number of bytes>])

// Example: read all bytes
$FILE. bin. tail($file)

// Example: read last 5 bytes
$FILE. bin. tail($file, 5)

// Example: read all but the first 5 bytes
$FILE. bin. tail($file, -5)
```

### 4.4) `py`

`PY` is a loadable dynamic object,which is bound as a walker-level variable by default. This object uses CPython to perform the following functions:

1. `$PY.global` and `$PY.local`: Use HVML data access (including setting) global variables or local variables used by the Python environment.
1. `$PY.import`: Load the specified Python module and call (or access) the submodules, functions and attributes provided by the loaded module on it.
1. `$PY.run`: Execute a piece of Python code, a Python script or a specified module, and get the result.
1. `$PY.pythonize`: Convert HVML strings, arrays, tuples, collections, objects and other data into Python object entities, and then execute the methods supported by these Python object entities on them.
1. `$PY.stringify`: Get the string representation of a Python object entity.
1. `$PY.compile`: Compile a piece of Python code, and then call `local` on the result to set local variables or call the `eval` method to execute the compiled code and get the result.

#### 4.4.1) `impl` Attribute

Use this property to get information about the implementer of the `$PY` variable, including developer, author, license, etc.

**Description**

```js
$PY.impl object:
     `an object contains the following properties:`
         - 'vendor': < string: `the vendor name of this dynamic object, e.g., "HVML Community"` >
         - 'author': < string: `the author name of this dynamic object, e.g., "Vincent Wei"` >
         - 'verName': < string: `the version name of this dynamic object, e.g., "0.1.0"` >
         - 'verCode': < string: `the version code fo this dynmaic object, e.g., "0"` >
         - 'license': < string: `the license of this implementation fo this dynmaic objec, e.g., "LGPLv3+"` >
```

This property returns an object describing information about the current CPython interpreter.

**Exception**

- Accessing this property produces no exception.

**Example**

```js
$PY.impl
     /* object:
        {
             'vendor': 'HVML Community',
             'author': 'Vincent Wei',
             'verName': '0.1.0',
             'verCode': '0',
             'license': 'LGPLv3+',
        }
     */
```

#### 4.4.2) `info` Attribute

Use this attribute to get the version number, compiler, platform, build information, copyright and other information of the CPython library used by `$PY`.

**Description**

```js
$PY.info object:
     `an object contains the following properties:`
         - 'version': < string: `the version of this Python interpreter.` >
         - 'platform': <string: `the platform identifier for the current platform.` >
         - 'copyright': < string: `the official copyright string for the current Python version.` >
         - 'compiler': < string: `an indication of the compiler used to build the current Python version, in square brackets (e.g., [GCC 2.7.2.2])` >
         - 'build-info': < string: `information about the sequence number and build date and time of the current Python interpreter instance, e.g., "#67, Aug 1 1997, 22:34:28"` >
         - 'path': <dynamic: `to get or set the default module search path`.>
```

This property returns an object describing information about the current CPython interpreter.

**Exception**

- Accessing this property produces no exception.

**Example**

```js
$PY.info
     /* object:
        {
             'version': '3.10.9',
             'platform': 'Linux',
             'copyright': 'Copyright 1991-1995 Stichting Mathematisch Centrum, Amsterdam',
             'compiler': '[GCC 2.7.2.2]',
             'build-info': '#67, Aug 1 1997, 22:34:28',
        }
     */
```

#### 4.4.3) `global` Attribute

This attribute reflects the current Python interpreter's `__main__` module's global variable dictionary.

**Description**

```js
$PY.global()
     object : `the global variables of the current __main__ module in the Python interpreter.`
```

This attribute getter returns all global variables and their values of the `__main__` module of the current Python interpreter. Note that key-value pairs with a `__` prefix and `__` suffix will be ignored.

```js
$PY.global(<string $name: `the global variable name`>) any | undefined
```

This attribute getter returns the value of the specified global variable for the `__main__` module of the current Python interpreter.

```js
$PY. global(!
         <object $globals: `the object defined new global variables`>
) true | false
```

This attribute setter will use the given object to set global variables of the current Python interpreter `__main__` module, existing variables may be overwritten.

```js
$PY. global(!
         <string $name: `the global variable name`>,
         <any $value: `the value`>
) true | false
```

This attribute setter sets the value of the specified global variable of the `__main__` module of the current Python interpreter; when `$value` is `undefined`, the global variable is deleted.

This property should be implemented as a native entity, so that `$PY.global.x` can be used to get the value of the global variable `x`, or use `$PY.global.x(! ... )` to set the global variable value.

**Exception**

The getter for this property produces the following exception:

- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `BadName`: Bad variable name; ignore exception, return `undefined` when silently evaluated.
- `NoSuchKey`: non-existent global variable; exceptions can be ignored, and `undefined` will be returned when silently evaluated.

The setter for this property produces the following exception:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `BadName`: bad variable name; exception can be ignored, `false` is returned when silently evaluated.
- `InvalidValue`: invalid value, such as an unsupported data type; exceptions can be ignored, and `false` will be returned for silent evaluation.
- `InternalFailure`: CPython exception; the exception can be ignored, and `false` is returned for silent evaluation.

**Example**

```js
$PY.global()
     // object: { }

$PY.global(! 'x', 'zh_CN')
     // boolean: true

$PY.global('x')
     // string: 'zh_CN'

$PY.global.x
     // string: 'zh_CN'

$PY.global.x(! undefined )
     // boolean: 'true'

$PY.global.x
     // exception: NoSuchKey
```

#### 4.4.4) `local` Property

This property reflects the local variable dictionary when executing the `$PY.run` method.

**Description**

```js
$PY.local()
     object : `the local variables used when executing $PY.run().`
```

This property getter returns the current local variable and its value.

```js
$PY.local(
         <string $name: `the local variable name`>
) any | undefined
```

This property getter returns the value of the specified local variable.

```js
$PY.local(!
         <object $local: `the object defined new local variables`>
) true | false
```

This property setter will set a local variable with the given object, existing variables may be overwritten.

```js
$PY.local(!
         <string $name: `the local variable name`>,
         <any $value: `the value`>
) true | false
```

This property setter sets the value of the specified local variable; when `$value` is `undefined`, the local variable is deleted.

This property should be implemented as a native entity, so that `$PY.local.x` can be used to get the value of the local variable `x`, or use `$PY.local.x(! ... )` to set the local variable value.

**Exception**

The getter for this property produces the following exception:

- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `BadName`: Bad variable name; ignore exception, return `undefined` when silently evaluated.
- `NoSuchKey`: non-existent global variable; exceptions can be ignored, and `undefined` will be returned when silently evaluated.

The setter for this property produces the following exception:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `BadName`: bad variable name; exception can be ignored, `false` is returned when silently evaluated.
- `InvalidValue`: invalid value, such as an unsupported data type; exceptions can be ignored, and `false` will be returned for silent evaluation.
- `InternalFailure`: CPython exception; the exception can be ignored, and `false` is returned for silent evaluation.

**Example**

```js
$PY.local()
     // object: { }

$PY.local(! 'x', 'zh_CN')
     // boolean: true

$PY.local('x')
     // string: 'zh_CN'
```

#### 4.4.5) `except` Attribute

This attribute gets the last Python exception name on the `$PY` dynamic variable.

**Description**

```js
$PY.except
     null | string : `the last exception name reported by CPython.`
```

This method returns the exception name corresponding to the last Python internal error on the `$PY` dynamic variable, initially `null`, which can be used to further distinguish Python exceptions.

**Exception**

This method does not raise an exception.

**Example**

```js
$PY.except
     // null
{{ $PY. run('2 / 0'); $PY. except }}
     // string: 'ZeroDivisionError'
```

#### 4.4.6) `pythonize` Method

This method will construct a CPython native entity object from an HVML string, object, array, and collection, and then execute the corresponding method on it.

**Description**

```js
$PY.pythonize(
     <string | object | array | tuple | set: $hvml_data: `An HVML string, object, array, tuple, or generic set`>
) native/pyObject::any | undefined
```

This method will use the given HVML string, object, array, and collection to construct a CPython native entity object on which the corresponding method can then be executed.

Note that calling the default getter on itself on a CPython native entity will return the corresponding HVML data. for example,

Construct a native CPython entity from an empty array:

```js
$PY. pythonize([])
     // native/pyObject::list
```

Constructing a CPython native entity with an empty array and executing the default getter on it will result in an empty array for HVML.

```js
$PY.pythonize([])()
     // array: []
```

Constructing a CPython native entity using an HVML array, executing the `reverse()` method on it, and then executing the default getter on it will yield a reversed HVML array.

```js
$PY.pythonize([1, 2, 3]).reverse()()
     // array: [3, 2, 1]
```

**Return Value**

This method returns a native entity named `pyObject::any`.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No argument specified; exceptions can be ignored, and `undefined` is returned when evaluated silently.
- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.

**Example**

```js
$PY. pythonize([])
     // native/pyObject::list

$PY.pythonize(['apple', 'banana', 'cherry']).add('orange')
     // native/pyObject::list

$PY.pythonize(['apple', 'banana', 'cherry']).add('orange')()
     // array: ['apple', 'banana', 'cherry', 'orange']

$PY.pythonize('Hello, World!').upper()()
     // string: 'HELLO, WORLD!'
```

#### 4.4.7) `run` Method

This method executes a Python program, a module as a script, or a Python script file.

**Description**

```js
$PY.run(
     <string $cmd_mod_file: `an isolated expressions, a single statement, an arbitrarily long Python source code, a module name, or a file name`>
         [, < '[command | statement | source | module | file] || skip-first-line || dont-write-byte-code' $options = 'command':
             - 'command': `evaluate an isolated expressions.`
             - 'statement': `run a single statement.`
             - 'source': `run an arbitrarily long Python source code.`
             - 'module': `run a Python library module as a script.`
             - 'file': `run a Python file as a script.`
             - 'skip-first-line': `skip first line of source, allowing use of non-Unix forms of #!cmd.`
             - 'dont-write-byte-code': `don't write .pyc files on import.`
             >
         ]
) any | undefined
```

This method executes a specified Python program (command), or executes a specified Python module in the form of a script, or executes a Python script file. `$cmd_mod_file` specifies program content, module name or script file name; `$options` specifies execution options.

**Return Value**

This method returns the execution result.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No argument specified; exceptions can be ignored, and `undefined` is returned when evaluated silently.
- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `EntityNotFound`: The specified module was not found; the exception can be ignored, and `undefined` is returned when silently evaluated.
- `InvalidValue`: Invalid parameter, such as the specified symbol does not exist; the exception can be ignored, and `undefined` is returned during silent evaluation.
- `InternalFailure`: CPython exception; the exception can be ignored, and `undefined` is returned when silently evaluated.

**Example**

```js
$PY. run('print("Hello from Python")')
     // null

$PY.run('pow(2,3)')
     //8L
```

#### 4.4.8) `import` Method

A module or specified symbols within it can be loaded by this method.

**Description**

```js
$PY.import(
     <string $name: `the Python module name`>
     [,
         <array $fromlist = []: `the names of objects or submodules that should be imported from the module given by $name.`>
     ]
) true | false
```

This method imports the specified Python module, or imports the specified Python object or Python submodule from within the specified module, after which the imported module, object, or submodule is available on the `$PY` variable.

**Remark**

1. When using the `$name` parameter to specify the module name, you can use `<package>.<module>:<aliase>` to specify the alias of the package or module.
1. When using the `$fromlist` parameter to specify an object or submodule, you can use `<object/submodule>:<aliase>` to specify the alias of the object or submodule.
1. When the imported object is a Python function object, you can use the setter on the corresponding symbol to pass the function parameters in the form of key-value pairs.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `DuplicateName`: Duplicate name, when the name of the module, submodule or object to be imported is already taken; the exception is ignored, and `false` is returned when silently evaluated.
- `EntityNotFound`: The specified module, object, or subobject was not found; the exception is ignored, and `false` is returned for silent evaluation.
- `InvalidValue`: Invalid parameter, such as the specified symbol does not exist; the exception can be ignored, and `false` is returned when silently evaluated.

**Example**

```js
$PY. import("math")
     // boolean: true
$PY.math.pow(2, 2)
     // number: 4
// Use (! ) to pass function arguments as key-value pairs.
$PY. math. pow(! { x: 2, y: 3 } )
     // number: 8

$PY.import('math', ['pow:power'])
     // boolean: true
$PY.power(2, 2)
     // number: 4
```

#### 4.4.9) `stringify` Method

This method stringifies a Python entity.

**Description**

```js
$PY.stringify(
     string $py_code: `a native entity with name prefix "pyObject::"`
) string | false
```

This method stringifies a specified native Python entity.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.

**example**

```js
$PY. stringify({{ $PY. import('math'); $PY. math. pi }})
     // string: '3.1415926535897931'
```

#### 4.4.10) `compile` Method

This method can be used to compile a specified piece of Python code.

**Description**

```js
$PY.compile(
     string $py_code: `the Python code`
) native/pyObject::code | undefined
```

This method compiles a piece of Python code, returns a dynamic object representing the CPython code, and can then execute the `eval` method on the dynamic object or access the `local` attribute.

**Exception**

Exceptions that this method may generate:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
-...

**Example**

```js
$PY. compile('c = 4 + 2')
     //pyCodeObject
```

##### 4.4.10.1) CPython Code Dynamic Object `entity` Attribute

The getter for this property returns the CPython object native entity corresponding to the CPthon code dynamic object.

**Description**

```js
$pyCodeObject.entity
     native/pyObject::code : `the pyObject::code entity of this pyCodeObject.`
```

This property getter returns the CPython code object native entity corresponding to `$pyCodeObject`.

**Exception**

Getter for this property do not raise exceptions.

**Example**

```js
$pyCodeObject.entity
     // native/pyObject:code
```

##### 4.4.10.2) CPython Code Dynamic Object `local` Attribute

This attribute reflects the local variables dictionary of the CPython code dynamic object.

**Description**

```js
$pyCodeObject.local
     object : `the local variables used when executing $pyCodeObject.eval().`
```

This property getter returns `$pyCodeObject` local variables and their values.

```js
$pyCodeObject. local(
         <string $name: `the local variable name`>
) any | undefined
```

This property getter returns the value of the specified local variable of `$pyCodeObject`.

```js
$pyCodeObject. local(!
         <object $local: `the object defined new local variables`>
) true | false
```

This property setter will set `$pyCodeObject` local variables with the given object, existing variables may be overwritten.

```js
$pyCodeObject. local(!
         <string $name: `the local variable name`>,
         <any $value: `the value`>
) true | false
```

This property setter sets the value of the specified local variable; when `$value` is `undefined`, the local variable is deleted.

This property should be implemented as a native entity, so that `$pyCodeObject.local.x` can be used to get the value of the local variable `x`, or use `$pyCodeObject.local.x(! ... )` to set the local variable value.

**abnormal**

The getter for this property produces the following exception:

- `WrongDataType`: Wrong parameter type; exception can be ignored, and `undefined` is returned when silently evaluated.
- `BadName`: Bad variable name; ignore exception, return `undefined` when silently evaluated.
- `NoSuchKey`: non-existent global variable; exceptions can be ignored, and `undefined` will be returned when silently evaluated.

The setter for this property produces the following exception:

- `ArgumentMissed`: No arguments specified; exceptions can be ignored, and `false` is returned for silent evaluation.
- `WrongDataType`: Wrong argument type; exception can be ignored and `false` will be returned for silent evaluation.
- `BadName`: bad variable name; exception can be ignored, `false` is returned when silently evaluated.
- `InvalidValue`: Invalid value, such as an unsupported data type; the exception can be ignored, and `undefined` is returned during silent evaluation.
- `InternalFailure`: CPython exception; the exception can be ignored, and `undefined` is returned when silently evaluated.

**Example**

```js
$pyCodeObject.local
     // object: { }

$pyCodeObject.local(! 'x', 'zh_CN')
     // boolean: true

$pyCodeObject. local('x')
     // string: 'zh_CN'
```

##### 4.4.10.3) CPython Code Dynamic Object`eval` Method  

Execute CPython code dynamic object.

**Description**

```js
$pyCodeObject.eval(
     [
         <object $globals = null: `the global variables defined by an object`>,
         [
             <object $locals = null : `the local variables defined by an object`>
         ],
     ]
) any
```

This method executes the CPython code object in the specified local environment; if `$globals` is not specified, the global variables defined by `$PY` are used; if `$locals` is not specified, the `$pyCodeObject.local` attribute is used The specified local variable.

**Exception**

Exception that this method may generate:

- `InternalFailure`: Python interpreter exception; the specific Python exception name can be obtained through `$PY.except`.

**Example**

```js
$PY.compile('4 + 2').eval()
     // 6

$PY.compile('x + y').eval( { x: 4, y: 5 } )
     // 9

$PY.compile('math.pow(x, y)').eval( null, { x: 2, y: 3 } )
     // 8
```

## Appendix

### Appendix 1) Revision History

Release History:

- March 31, 2023: Release V1.0 RCa, tagged 'v1.0-rca-230331'.
- January 31, 2023: Release V1.0 RC9, tagged 'v1.0-pv-rc9-230131'.
- 31 December 2022: Release V1.0 RC8, tagged 'v1.0-pv-rc8-221231'.
- November 30, 2022: Release V1.0 RC7, tagged 'v1.0-pv-rc7-221130'.
- 31 October 2022: Release V1.0 RC6, tagged 'v1.0-pv-rc6-221031'.
- 01 Sep 2022: Release V1.0 RC5, tagged 'v1.0-pv-rc5-220901'.
- 01 Jul 2022: Release V1.0 RC4, tagged 'v1.0-pv-rc4-220701'.
- 01 Jun 2022: Release V1.0 RC3, tagged 'v1.0-pv-rc3-220601'.
- 01 May 2022: Release V1.0 RC2, tagged 'v1.0-pv-rc2-220501'.
- April 01, 2022: Release V1.0 RC1, tagged 'v1.0-pv-rc1-220401'.

#### RCb) 230430

1. Adjust the usage of `$CRTN.static` and `$CRTN.temp` properties.

#### RCa) 230331

1. Add `$CRTN.static` and `$CRTN.temp` two dynamic properties.
1. Add the necessary dynamic variable `$SOCK`.
1. Add optional dynamic variable `$PY`.
1. Adjust the keywords of `$FS.file_is`.

#### RC9) 230131

1. Rename the `.content()` attribute name of the element collection entity to `.contents()`.
1. Rename the `.jsonContent()` attribute name of the element collection entity to `.dataContent()`.
1. Add `$DOC.select` method.
1. Organize the interface of the element collection entity.

#### RC8) 221231

1. Adjust the `$CRTN.token` property and add a setter.
1. Add `$RDR` variable.

#### RC7) 221130

1. Rename `$EJSON` to `$DATA`.
1. Adjust the name of `$DATA.numberify` to `$DATA.numerify`.
1. Enhance `$STREAM.stdout.writelines` to support multiple parameters.
1. Add `$DATA.contains` and `$DATA.has` methods.

#### RC6) 221031

(no revision)

#### RC5) 220901

1. Replace "session" with "walker".
1. `$SESSION` is renamed to `$RUNNER`; `$HVML` is renamed to `$CRTN`; `$SYSTEM` is renamed to `$SYS`; `$REQUEST` is renamed to `$REQ`.
1. Add `$CRTN.cid`, `$CRTN.token` and `$CRTN.uri` attribute getters.
1. Add `$CRTN.curator`, `$CRTN.native_crtn` attribute getters.
1. Add `$RUNNER.rid`, `$RUNNER.uri` attribute getters.
1. Enhance `$MATH.eval` and `$MATH.eval_l` to support constants and functions.
1. Add `$DATA.arith` and `$DATA.bitwise` methods.
1. Add `$DATA.size` method.
1. Add `$STR.nr_bytes` method.

#### RC4) 220701

1. Describe how to pass command-line arguments through the query component of the `pipe` URI.
1. Describe additional methods of the `pipe` stream entity: `writeeof` and `status`.
1. The `user_obj` static property name of `$RUNNER` is adjusted to `myObj`.

#### RC3) 220601

1. New interface:
    - `$RUNNER.app_name`: Returns the current runner's app name.
    - `$RUNNER.run_name`: Returns the runner name of the current runner.
1. Remove the reference to global-level dynamic variables.
1. Adjust `$SYS` to a walker-level dynamic variable.
1. Adjust `$FS.rename` method return value type (boolean).

#### RC2) 220501

1. Adjust the `$STREAM` variable to the necessary variables.

1. Originally designed as `$STREAM` methods, `readstruct`, etc., are all adjusted to stream entity methods.

1. The `readdir` and `rewinddir` methods originally designed as `$FS` methods are adjusted to the methods of directory stream entities.

1. Adjust the interface to use string options instead of boolean flags:
    - `$SYS.time_us`
    - `$SYS.timezone`

1. Use the `regexp` keyword instead of `reg`:
    - `$STR.streq`
    - `$STR.strne`

1. New method
    - `$SYS.sleep`
    - `$DATA.pack`
    - `$DATA.unpack`
    - `$STR.scan_c`
    - `$STR.scan_p`

1. New method
    - `$CRTN.target`

#### RC1) 220401

1. Remove single element entity, all use element collection entity.
1. `$STR.strlen` method has been removed.
1. Change the interface of `$STR.implode`, `$STR.explode` methods.
1. `$STR.strcat` method is renamed to `$STR.join`, and the interface is enhanced.
1. `$STR.upper` method is renamed to `$STR.toupper`.
1. `$STR.lower` method is renamed to `$STR.tolower`.
1. Add a lot of methods to `$STR`.
1. Adjust the return object format of `$FS.list` method.
1. Add `$URL` dynamic object and its methods.
1. Separate `$STREAM`.
1. Add a lot of methods to `$FS`.
1. Adjust `$SYS` as a global level dynamic variable.
1. Adjust the `random` method in `$SYS` to the `RUNNER` variable, and adjust the method related to time formatting to the new `$DATETIME` variable.
1. Add `$STREAM.stdin`, `$STREAM.stdout` and `$STREAM.stderr` three static properties, which are used to return stream read and write entities representing standard input, standard output and standard error.
1. Add `random_sequence` method in `$SYS`.
1. Move `env` and `cwd` methods in `$RUNNER` to `$SYS` methods.
1. Add `utf16` and `utf32` two encodings in the binary format notation.
1. Add `$DATA.fetchstr` and `$DATA.fetchreal`, which can use binary format notation to extract real numbers or strings from a sequence of bytes.
1. Enhance the method of the element collection native entity, so that it can generate a subset of the specified element collection.

#### BRC) 220201


### Appendix 2) Contributor List 

The order of this list is arranged from early to late according to the contribution time:


### Appendix 3) Trademark Statement

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
 
