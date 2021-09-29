<template>
    <div class="monaco-editor">
        <div style="padding: 20px;">
            <el-select v-model="options.theme" placeholder="选择主题" @change="changeTheme">
                <el-option
                        v-for="item in themeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="options.language" placeholder="切换语言" @change="changeLanguage">
                <el-option
                        v-for="item in languageList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="_compileAndRunAsync">运行</el-button>
            <el-button type="primary" @click="codeFormat">格式化</el-button>
            <el-button type="primary">获取</el-button>
            <el-button type="primary">设置</el-button>
        </div>
        <div ref="container" style="height: 360px;width: 100%;"></div>
        <div style="height: 400px;width: 1200px;border:1px solid red">
            <run-code></run-code>
            <!--<iframe id="output" frameborder="0"></iframe>-->
        </div>
    </div>
</template>

<script>

  import * as monaco from 'monaco-editor'
  import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
  import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
  import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
  import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
  import 'monaco-editor/esm/vs/basic-languages/scss/scss.contribution'
  import 'monaco-editor/esm/vs/basic-languages/less/less.contribution'
  import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
  import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution'
  import { StandaloneCodeEditorServiceImpl } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeServiceImpl'
  import { Utilities } from './utilities'
  import RunCode from './preview-component/run-code.vue'

  export default {
    name: 'monaco-editor',
    components: { RunCode },
    data() {
      return {
        options: {
          theme: 'vs',
          value: `export default {
            mixins: [],
            data() {
              return {}
            },
            computed: {},
            mounted() {
            },
            methods: {}
          }
          `,
          // readOnly: true,
          language: 'javascript',
          minimap: {
            enabled: true
          },
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 16, // 字体大小
          autoIndent: false //自动缩进
        },
        themeList: [
          { label: 'vs', value: 'vs' },
          { label: 'vs-dark', value: 'vs-dark' },
          { label: 'hc-black', value: 'hc-black' }
        ],
        languageList: [
          { label: 'javascript', value: 'javascript' },
          { label: 'typescript', value: 'typescript' },
          { label: 'html', value: 'html' },
          { label: 'css', value: 'css' },
          { label: 'less', value: 'less' },
          { label: 'scss', value: 'scss' },
          { label: 'sql', value: 'sql' },
          { label: 'yaml', value: 'yaml' }
        ],
        editor: null,
        theme: {
          base: 'vs',
          inherit: true
        },
        currentCode: ''
      }
    },
    computed: {},
    mounted() {
      this._createEditor()
    },
    methods: {
      codeFormat() {
        this.editor.getAction(['editor.action.formatDocument'])._run();
      },
      async _compileAndRunAsync() {
        let code = this.editor.getValue() // await this.getCompiledCode();
        if (!code) {
          return;
        }
        try {
          Utilities.FastEval(code);
        } catch (e) {
          window.handleException(e);
        }

        const contentHtml = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Title</title>
                            </head>
                            <body>
                            <h1>
                                hello word
                            </h1>
                            </body>
                            </html>
                            `
        let output = document.querySelector('#output')
        debugger
        if (output) {
          debugger
          output.parentNode.removeChild(output)
          output = document.createElement('div')
          output.id = 'output'
          document.body.appendChild(output)
        } else {

        }
        const iframe = document.createElement('iframe');
        iframe.srcdoc = contentHtml
        output.appendChild(iframe)
      },
      async _getRunCode() {
        if (this.options.language === 'javascript') {
          return this.editor.getValue()
        } else {
          const model = this.editor.getModel()
          const uri = model.uri;

          const worker = await monaco.languages.typescript.getTypeScriptWorker();
          const languageService = await worker(uri);

          const uriStr = uri.toString();
          const result = await languageService.getEmitOutput(uriStr);
          const diagnostics = await Promise.all([languageService.getSyntacticDiagnostics(uriStr), languageService.getSemanticDiagnostics(uriStr)]);

          console.log(diagnostics)

          //////////////////
          var typescript = monaco.languages.typescript;
          typescript.typescriptDefaults.setCompilerOptions({
            module: typescript.ModuleKind.AMD,
            target: typescript.ScriptTarget.ESNext,
            noLib: false,
            strict: false,
            alwaysStrict: false,
            strictFunctionTypes: false,
            suppressExcessPropertyErrors: false,
            suppressImplicitAnyIndexErrors: true,
            noResolve: true,
            suppressOutputPathCheck: true,

            allowNonTsExtensions: true // required to prevent Uncaught Error: Could not find file: 'inmemory://model/1'.
          });
          // typescript.typescriptDefaults.addExtraLib(libContent, "babylon.d.ts");
          console.log(this.editor.getValue())
        }
      },
      getCompiledCode() {
        return this._getRunCode
      },
      _createEditor() {
        const editorOptions = {
          lineNumbers: 'on',
          roundedSelection: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          contextmenu: false,
          folding: true,
          showFoldingControls: 'always',
          fontSize: 14,
          renderIndentGuides: true,
          minimap: {
            enabled: true
          },
          formatOnPaste: true,
          renderValidationDecorations: 'on',
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8
          }
        };
        if (this.editor) {
          this.editor.dispose();
        }

        const options = Object.assign({}, editorOptions, this.options)
        // 初始化编辑器，确保dom已经渲染，dialog中要写在opened中
        this.editor = monaco.editor.create(this.$refs.container, options);
        // 编辑器内容发生改变时触发
        this.editor.onDidChangeModelContent(() => {
          let newCode = this.editor.getValue();
          window.localStorage.setItem('code', newCode)
          if (this.currentCode !== newCode) {
            this.currentCode = newCode;
          }
        })

        this.editor.onKeyUp(() => {
          // 当键盘按下，判断当前编辑器文本与已保存的编辑器文本是否一致
          console.log('当键盘按下')
        });
      },
      editGetValue() {
        // console.log(this.editor.getValue())
      },
      changeEditor() { // 更改editor内容
        this.editor.setValue(result.data);
        this.editor.getAction('editor.action.formatDocument')._run();
      },
      destroyEditor() { // 销毁编辑器
        this.editor.dispose();
      },
      changeTheme(theme) {
        this.editor.setTheme(theme)
      },
      changeLanguage(newLanguage) {
        console.log(theme)


        var oldModel = this.editor.getModel();//获取旧模型
        var value = this.editor.getValue();//获取旧的文本
        //创建新模型，value为旧文本，id为modeId，即语言（language.id）
        //modesIds即为支持语言
        //var modesIds = monaco.languages.getLanguages().map(function(lang) { return lang.id; });
        var newModel = monaco.editor.createModel(value, newLanguage);
        //将旧模型销毁
        if (oldModel) {
          oldModel.dispose();
        }
        //设置新模型
        this.editor.setModel(newModel);
        // this.editor.setTheme(theme)
      }
    }
  }
</script>

<style scoped lang="postcss">
    .monaco-editor {
        width: 100%;
        height: 100%;
    }

    #output {
        border: 1px solid #0a74e5;
    }
</style>

<!--

https://www.jianshu.com/p/528e63705073
//此例为更改编辑器为只读模式,其余以此类推
this.editor.updateOptions({readOnly:true})


触发编辑器事件
//此为格式化代码,anything无用，后一个参数为action事件，自行查找，我也就找到这么一个
this.editor.trigger('anything','editor.action.formatDocument');

动态修改语言
monaco.editor.setModelLanguage(monacoInstance.getModel(), 'html');
monaco.editor.setModelLanguage(monacoInstance.getModel(), 'javascript');



-->
