/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: "off" */

const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

function buildTypings(cb) {
  const output = `${getOutput()}/vue`;

  const files = fs.readdirSync('src/vue/components').filter((file) => file.indexOf('.d.ts') < 0);
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.vue', '')
      .split('-')
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join('');
    const fileBase = fileName.replace('.vue', '');
    componentImports.push(`import ${componentName} from './components/${fileBase}';`);
    componentExports.push(componentName);
  });

  const mainTypings = fs
    .readFileSync('src/vue/framework7-vue.d.ts', 'utf-8')
    .replace('// IMPORT_COMPONENTS', componentImports.join('\n'))
    .replace('// EXPORT_COMPONENTS', `export { ${componentExports.join(', ')} }`);

  fs.writeFileSync(`${output}/framework7-vue.d.ts`, mainTypings);

  if (cb) cb();
}

module.exports = buildTypings;
