#!/usr/bin/env python3
"""Check sample output with real PurC in temporary copies and a headless renderer.

Requires MATH/FS DVObjs and zh_CN.UTF-8. GUI click delivery is not tested.
Only temporary copies receive exit instructions to bound asynchronous programs.
"""
from pathlib import Path
import os, re, shutil, subprocess, tempfile, json
repo=Path(__file__).resolve().parents[1]
workspace=tempfile.TemporaryDirectory(prefix='hvml-verified-')
root=Path(workspace.name)
shutil.copytree(repo/'samples',root/'samples')
env=dict(os.environ,LANG='zh_CN.UTF-8',LC_ALL='zh_CN.UTF-8')
binary=os.environ.get('PURC_BIN') or shutil.which('purc')
if not binary:
 raise SystemExit('Set PURC_BIN to a PurC executable, or add purc to PATH.')
def run(p):
 r=subprocess.run([binary,'-c','headless','-d','local','-p',str(p)],cwd=p.parent,env=env,capture_output=True,text=True,timeout=5)
 assert r.returncode==0 and 'uncaught exception' not in r.stdout and not r.stderr,(p,r.stdout[-1500:],r.stderr)
 return r.stdout
for p in sorted((root/'samples').rglob('*.hvml')):
 if p.name in ['modal.hvml','loading-html-async.hvml','loading-html-async-placeholder.hvml'] or '-rdr-' in p.name:continue
 out=run(p)
 if p.name=='loading-html-sync.hvml':assert '谷爱凌' in out
 if p.name=='fibonacci-html-6.hvml':assert 'Totally 100 numbers' in out
 print('PASS original terminating sample:',p.name)
for name in ['loading/loading-html-async.hvml','loading/loading-html-async-placeholder.hvml','bootstrap/modal.hvml']:
 p=root/'samples'/name
 p.write_text(p.read_text().replace('        </observe>','            <exit />\n        </observe>',1))
 out=run(p)
 assert '谷爱凌' in out and 'null.title' not in out
 if 'loading/' in name:assert 'placeholder-glow' not in out and out.count('class="card-title"')==1 and 'rooster' not in out
 else:assert re.search(r'<button id="btnShowModal"[^>]*>',out) and 'disabled' not in re.search(r'<button id="btnShowModal"[^>]*>',out)[0]
 print('PASS actual async load, exit after event:',name)
# Verify the error handler's DOM update independently of external fetcher failures.
s=(repo/'samples/loading/loading-html-async.hvml').read_text()
branch=re.search(r'<observe against="breakingNews" for="except:\*"[^>]*>(.*?)</observe>',s,re.S)[1]
p=root/'error-branch.hvml';p.write_text('<hvml target="html"><body><div id="breaking-news"><h5>WAIT</h5></div>'+branch+'</body></hvml>')
out=run(p);assert 'Failed to load content!' in out and 'WAIT' not in out;print('PASS extracted error handler DOM update')
for name in ['calculator-html-rdr-1.hvml','calculator-html-rdr-2.hvml']:
 s=(repo/'samples/calculator'/name).read_text()
 branch=re.search(r'<match for="AS \'←\'" exclusively>(.*?)</match>',s,re.S)[1]
 p=root/(name+'-branch.hvml');p.write_text('<hvml target="html"><body><input id="expression" value="123" />'+branch+'</body></hvml>')
 out=run(p);assert 'value="12"' in out;print('PASS extracted backspace branch:',name)
s=(repo/'en/hvml-spec-v1.0-en.md').read_text()
block=re.search(r'```hvml\n(    <init as="evenNumbers" with=\[0,\].*?)```',s,re.S)[1]
p=root/'even.hvml';p.write_text('<!DOCTYPE hvml SYSTEM "v: MATH"><hvml target="html"><body>'+block+'</body></hvml>')
out=run(p);nums=[int(x) for x in re.findall(r'<li>\s*(\d+)',out)];assert nums==list(range(0,100,2)),nums;print('PASS English spec even numbers 0..98')
branch=re.search(r'(<match with="\$L.streq.*?</match>)',s,re.S)[1]
for locale,expected in [('zh_CN','CHINESE'),('en_US','DEFAULT')]:
 p=root/'match.hvml';p.write_text('<hvml target="html"><body><archetype name="footer_cn"><p>CHINESE</p></archetype><test on="'+locale+'">'+branch+'<match><p>DEFAULT</p></match></test></body></hvml>')
 out=run(p);assert expected in out and ('DEFAULT' not in out if expected=='CHINESE' else 'CHINESE' not in out);print('PASS match condition:',locale)
s=(repo/'zh/hvml-spec-v1.0-zh.md').read_text()
block=re.search(r'```hvml\n(    <init as="evenNumbers" with=\[0,\].*?)```',s,re.S)[1]
p=root/'even-zh.hvml';p.write_text('<!DOCTYPE hvml SYSTEM "v: MATH"><hvml target="html"><body>'+block+'</body></hvml>')
out=run(p);assert [int(x) for x in re.findall(r'<li>\s*(\d+)',out)]==list(range(0,100,2));print('PASS Chinese spec even numbers 0..98')
# Run the actual bilingual tutorial snippets, not copies of their syntax.
for language in ['en', 'zh']:
    tutorial = (repo / language / f'learn-hvml-programming-in-30-minutes-{language}.md').read_text()
    block = next(block for block in re.findall(r'```hvml\n(.*?)```', tutorial, re.S)
                 if '<define as "output_html">' in block and '<execute ' in block)
    for target in ['html', 'void']:
        p = root / f'execute-{language}-{target}.hvml'
        p.write_text(f'<hvml target="{target}"><body>{block}</body></hvml>')
        out = run(p)
        assert 'Hello, world!' in out
        if target == 'html':
            assert '<h1>HVML' in out and '<p>Hello, world!' in out
        print('PASS tutorial execute:', language, target)

    # Replace only the example destination; never attempt to enter /root.
    setter = re.search(r"\$SYS\.cwd!\(\s*'/root'\)", tutorial)[0]
    destination = root / f'cwd-{language}'
    destination.mkdir()
    setter = setter.replace("'/root'", json.dumps(str(destination)))
    p = root / f'setter-{language}.hvml'
    p.write_text('<hvml target="html"><body><inherit on ' + setter
                 + ' /><p>$SYS.cwd</p></body></hvml>')
    assert str(destination) in run(p)
    print('PASS tutorial cwd setter:', language)

reference = (repo / 'en/hvml-spec-predefined-variables-v1.0-en.md').read_text()
setter = re.search(r'\$DOC\.query\("#foo"\)\.attr!\( "bar", "qux"\)', reference)[0]
p = root / 'element-setter.hvml'
p.write_text('<hvml target="html"><body><div id="foo" bar="old" />'
             '<inherit on ' + setter + ' /></body></hvml>')
assert 'bar="qux"' in run(p)
print('PASS predefined-variable element setter')

# Old names remain valid in historical records, but not in current examples.
for folder in ['en', 'zh', 'samples', 'tools', 'interpreter', 'cloudapp', 'extensions']:
    for document in (repo / folder).rglob('*'):
        if document.suffix not in ['.md', '.hvml']:
            continue
        text = document.read_text()
        if document.name == 'hvml-spec-v1.0-en.md':
            text = text.split('### Appendix 1) Revision History')[0]
        elif document.name == 'hvml-spec-v1.0-zh.md':
            text = text.split('#### OR0) 250428')[0]
        assert not re.search(r'\(\s*!|<\/?include\b|`include`', text), document
        assert '#2510-define-and-include-tags' not in text, document
print('PASS current documentation syntax audit')

print('ALL 31 CHECKS PASSED')
workspace.cleanup()
