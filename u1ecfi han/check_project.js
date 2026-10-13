const fs = require('fs');
const { execSync } = require('child_process');
const base = String.fromCharCode(100,58,47,100,101,118,47,104,7887,105,32,104,97,110);
const sr = base + '/shadowrocket-modules';

console.log('=== ROOT DIR ===');
console.log(fs.readdirSync(base).join('\n'));

console.log('\n=== SHADOWROCKET DIR ===');
console.log(fs.readdirSync(sr).join('\n'));

console.log('\n=== GIT STATUS ===');
try {
  const s = execSync('git status --short', { cwd: sr, encoding: 'utf8' });
  console.log(s || '(clean)');
} catch(e) { console.log('NO GIT:', e.message.split('\n')[0]); }

console.log('\n=== GIT REMOTE ===');
try {
  const r = execSync('git remote -v', { cwd: sr, encoding: 'utf8' });
  console.log(r || '(no remote)');
} catch(e) { console.log('NO REMOTE:', e.message.split('\n')[0]); }

console.log('\n=== GIT BRANCH ===');
try {
  const b = execSync('git branch -a', { cwd: sr, encoding: 'utf8' });
  console.log(b);
} catch(e) { console.log('NO BRANCH:', e.message.split('\n')[0]); }
