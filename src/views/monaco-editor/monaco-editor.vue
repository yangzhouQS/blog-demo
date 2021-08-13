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
            <el-button type="primary">运行</el-button>
            <el-button type="primary">获取</el-button>
            <el-button type="primary">设置</el-button>
        </div>
        <div ref="container" style="height: 360px;width: 100%;"></div>
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

  export default {
    name: 'monaco-editor',
    data() {
      return {
        options: {
          theme: 'vs',
          value: '',
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
        editor: {},
        theme: {
          base: 'vs',
          inherit: true,
          colors: {
            'activityBar.background': '#580000', //活动栏背景色
            'tab.inactiveBackground': '#300a0a', //非活动选项卡的背景色
            'tab.activeBackground': '#490000',//活动选项卡的背景色。
            'sideBar.background': '#330000',//侧边栏背景色。
            'statusBar.background': '#700000',//工作区打开时状态栏的背景色。

            'statusBar.noFolderBackground': '#700000',//没有打开文件夹时状态栏的背景色。

            'statusBarItem.remoteBackground': '#c33',//状态栏上远程指示器的背景色。

            'editorGroupHeader.tabsBackground': '#330000',//启用选项卡时编辑器组标题的背景颜色。

            'titleBar.activeBackground': '#770000',//窗口处于活动状态时的标题栏背景色。

            'titleBar.inactiveBackground': '#772222',//窗口处于非活动状态时的标题栏背景色。

            'selection.background': '#ff777788',//工作台所选文本的背景颜色。(不适用于编辑器。)

            // editor

            'editor.background': '#390000',//编辑器背景色。

            'editorGroup.border': '#ff666633',//将多个编辑器组彼此分隔开的颜色。

            'editorCursor.foreground': '#F8F8F8',//编辑器光标颜色。

            'editor.foreground': '#F8F8F8',//编辑器默认前景色。

            'editorWhitespace.foreground': '#c10000',//编辑器中空白字符的颜色。

            'editor.selectionBackground': '#750000',//编辑器所选内容的颜色。

            'minimap.selectionHighlight': '#750000',//编辑器选区在迷你地图中对应的标记颜色。

            'editorLineNumber.foreground': '#ff777788',//编辑器行号的颜色。

            'editorLineNumber.activeForeground': '#ffbbbb88',//编辑器活动行号的颜色

            'editorWidget.background': '#300000',//编辑器组件(如查找/替换)背景颜色。

            'editorHoverWidget.background': '#300000',//编辑器悬停提示的背景颜色。

            'editorSuggestWidget.background': '#300000',//建议小组件的背景色。

            'editorSuggestWidget.border': '#220000',//建议小组件的边框颜色。

            'editor.lineHighlightBackground': '#ff000033',//光标所在行高亮内容的背景颜色。
            'editor.hoverHighlightBackground': '#ff000044',//在下面突出显示悬停的字词。
            'editor.selectionHighlightBackground': '#f5500039',//具有与所选项相关内容的区域的颜色。
            'editorLink.activeForeground': '#FFD0AA',//活动链接颜色。
            'peekViewTitle.background': '#550000',//速览视图标题区域背景颜色。
            'peekView.border': '#ff000044',//速览视图边框和箭头颜色。
            'peekViewResult.background': '#400000',//速览视图结果列表背景色。
            'peekViewEditor.background': '#300000',//速览视图编辑器背景色。
            // UI
            'debugToolBar.background': '#660000',//调试工具栏背景颜色。
            'focusBorder': '#ff6666aa',//焦点元素的整体边框颜色。
            'button.background': '#833',//按钮背景色。

            'dropdown.background': '#580000',//下拉列表背景色。

            'input.background': '#580000',//输入框背景色。

            'inputOption.activeBorder': '#cc0000',//输入字段中已激活选项的边框颜色。

            'inputValidation.infoBackground': '#550000',//输入验证结果为信息级别时的背景色。

            'inputValidation.infoBorder': '#DB7E58',//严重性为信息时输入验证的边框颜色。

            'list.hoverBackground': '#800000',//使用鼠标移动项目时，列表或树的背景颜色。

            'list.activeSelectionBackground': '#880000',//使用鼠标移动项目时，列表或树的背景颜色。

            'list.inactiveSelectionBackground': '#770000',//已选项在列表或树非活动时的背景颜色。

            'list.dropBackground': '#662222',//使用鼠标移动项目时，列表或树进行拖放的背景颜色。

            'list.focusBackground': '#660000',//焦点项在列表或树活动时的背景颜色。

            'list.highlightForeground': '#ff4444',//在列表或树中搜索时，其中匹配内容的高亮颜色。

            'pickerGroup.foreground': '#cc9999',//快速选取器分组标签的颜色。

            'pickerGroup.border': '#ff000033',//快速选取器分组标签的颜色。

            'badge.background': '#cc3333',//Badge 背景色。Badge 是小型的信息标签。

            'progressBar.background': '#cc3333',//表示长时间操作的进度条的背景色。

            'errorForeground': '#ffeaea',//错误信息的整体前景色。

            'extensionButton.prominentBackground': '#cc3333',//扩展中突出操作的按钮背景色

            'extensionButton.prominentHoverBackground': '#cc333388'//扩展中突出操作的按钮被悬停时的颜色
          }
        }
      }
    },
    computed: {},
    mounted() {
      const options = Object.assign({}, this.options)
      // 初始化编辑器，确保dom已经渲染，dialog中要写在opened中
      this.editor = monaco.editor.create(this.$refs.container, options);
      // 编辑器内容发生改变时触发
      this.editor.onDidChangeModelContent(() => {
        this.editGetValue()
      })
    },
    methods: {
      editGetValue() {
        console.log(this.editor.getValue())
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
      changeLanguage(theme) {
        var model = monaco.editor.createModel(
          ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          'javascript'
        );
        const m = monaco.editor.getModels()
        debugger
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
</style>
