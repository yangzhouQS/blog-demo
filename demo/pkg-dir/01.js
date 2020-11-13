const pkgDir = require('pkg-dir');

(async () => {
  const rootDir = await pkgDir(__dirname);

  console.log(rootDir);
  
  const cwd = process.cwd();
  const dir = pkgDir.sync(cwd);
  console.log(dir)
  //=> '/Users/sindresorhus/foo'
})();