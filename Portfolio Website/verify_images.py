from pathlib import Path
import re
root = Path('.')
files = ['index.html','projects.html','contact.html']
missing = []
refs = []
for f in files:
    p = root / f
    if not p.exists():
        print(f'MISSING HTML: {f}')
        continue
    html = p.read_text(encoding='utf-8')
    for m in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html):
        path = (root / m).resolve()
        refs.append((f, m, path, path.exists()))
    for m in re.findall(r'<a[^>]+href=["\']([^"\']+\.(png|jpg|jpeg|gif|svg))["\']', html, re.I):
        path = (root / m[0]).resolve()
        refs.append((f, m[0], path, path.exists()))
print('Reference check results:')
for f,m,path,exists in refs:
    print(f'{f}: {m} -> {path} -> {"OK" if exists else "MISSING"}')
    if not exists:
        missing.append((f,m,path))
print('\nSummary:')
print(f'Total refs: {len(refs)}')
print(f'Missing: {len(missing)}')
if missing:
    print('Missing files:')
    for f,m,path in missing:
        print(f'  {f}: {m} -> {path}')
