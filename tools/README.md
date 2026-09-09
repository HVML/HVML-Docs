This directory contains HVML tools and sample verification utilities.

- `markdown-to-html.hvml`: This tool generates HTML files based on a document file in Markdown and a template HTML file.

- `check-sample-compatibility.py`: Runs 31 checks using Python 3 and a real PurC interpreter with the headless renderer. Requires the MATH and FS dynamic objects and the `zh_CN.UTF-8` locale used by the bundled data. It runs samples in temporary copies, adds an exit after the expected asynchronous event, and checks extracted calculator/error branches and specification snippets. It also exercises the bilingual tutorials’ `execute` and setter examples and scans current documentation for obsolete syntax. It does not validate GUI clicks, Bootstrap JavaScript, or remote fetcher error delivery.

```sh
PURC_BIN=/path/to/purc PURC_DVOBJS_PATH=/path/to/dvobjs python3 tools/check-sample-compatibility.py
```

Missing dependencies, timeouts, uncaught exceptions, and incorrect checked output fail the check. A zero PurC exit status alone is not considered success. Run Python without `-O`, since the output checks use assertions.
