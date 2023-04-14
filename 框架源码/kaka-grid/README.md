# @mctech/kaka-grid

## Roadmap

### Future

- 文本高亮显示（用于过滤）
- TreeDataSource优化
- 单元格悬停样式（杨学友）
- grid 输入检查及提醒
- 不同分辨率屏幕下来回拖动导致画布混乱
- 自定义列编辑器，例如 check 列允许输入数字
- examples 重构
- tree 样式，例如三角形展开节点

### 2.3.1 (Jan 15 2021)

- IE11兼容性-解决svg宽度解析问题

### 2.3.0 (Jan 14 2021)

- IE11兼容性-解决svg解析问题

### 2.2.9 (Dec 31 2020)

- 解决拖动滚动条导致滚动条下方的动作列触发单击事件问题
- 修改 SwitchColumn 默认样式

### 2.2.8 (Nov 19 2020)

- 解决合并单元格后，单元格右侧动作按钮的焦点颜色绘制不完整问题

### 2.2.7 (Nov 17 2020)

- 修改输入框右侧按钮快捷键无效问题
  右侧按钮快捷键：<kbd>Ctrl</kbd> + <kbd>Enter</kbd> 或 <kbd>⌘</kbd> + <kbd>Enter</kbd>

### 2.2.6 (Sep 30 2020)

- 优化 TreeDataSource 展开方法：expandToKey、expandToLevel

### 2.2.5 (Sep 18 2020)

- 修改文本右对齐且 textOverflow: "ellipsis" 时，左侧显示不完整问题

### 2.2.4 (Sep 15 2020)

- 列标题 caption 属性支持回调函数

  ```javascript
  const grid = new kakaGrid.ListGrid({
      header: [{
          caption: () => {
            return '列标题'
          },
          ...
      }]
      ...
  })
  ```

### 2.2.3 (Sep 14 2020)

- 修改 TreeColumn 列快捷键与单元格快捷键冲突的问题

### 2.2.2 (Sep 13 2020)

- 修改内容隐藏时背景色无效问题

### 2.2.1 (Sep 09 2020)

- 修改 TreeColumn 列支持 multilineText 属性时不显示 tooltip 的问题

### 2.2.0 (Aug 24 2020)

- 修改 TreeColumn 点击展开/收起动作的触发事件由 MOUSEDOWN_CELL 改为 CLICK_CELL
  > 升级此版本需要关注下树形列展开/收起是否正常，不确定是否有兼容性问题

### 2.1.9 (Aug 19 2020)

- InlineInputEditor 默认禁用鼠标滚轮操作，增加 enabledMouseWheel 属性用于控制是否开启鼠标滚轮操作
  主要用于控制 number 类型输入框，鼠标滚轮操作导致用户误输入问题

  ```javascript
  const grid = new kakaGrid.ListGrid({
      header: [{
          action: new kakaGrid.columns.action.InlineInputEditor({
              type: "number",
              enabledMouseWheel: false // 默认为 false
          })
          ...
      }]
      ...
  })
  ```

### 2.1.8 (Aug 04 2020)

- 修改 TreeColumn 动作按钮鼠标状态不正常问题
- TreeColumn 列支持 multilineText 属性，默认为 false，用于树形列显示多行文本

  ```javascript
  const grid = new kakaGrid.ListGrid({
      ...
      header: [{
        ...
        columnType: new kakaGrid.columns.type.TreeColumn({
          ...
          multilineText: true, // 树形列显示为多行文本，\n 为换行符
        }),
        style: {
          ...
          // 与多行文本相关的样式
          lineHeight: '1em', // 多行文本行高
          autoWrapText: false, // 多行文本自动换行
          lineClamp: 'auto', // 多行文本行数限制，'auto'为自动、数值为行数
        }
      },
      ...
      ]
      ...
  })
  ```

### 2.1.7 (Jul 28 2020)

- 增加 CELL_RANGE、CELL_VALUE 事件，可用于自定义单元格合并
  - CELL_RANGE 在绘制表格时触发，用于改变单元格占用区域
  - CELL_VALUE 在绘制表格时触发，用于改变单元格的值内容
  - 这两个事件会频繁触发，大家慎用

  ```javascript
  const mergeCells = [{
    cellRange: {
      start: { col: 2, row: 2 },
      end: { col: 2, row: 3 },
    },
    cellValue: '自定义合并单元格',
  }]
  const doMergeCell = (e, property) => {
    for (const mergeCell of mergeCells) {
      if (
        mergeCell.cellRange.start.col <= e.col &&
        e.col <= mergeCell.cellRange.end.col &&
        mergeCell.cellRange.start.row <= e.row &&
        e.row <= mergeCell.cellRange.end.row
      ) {
        e[property] = mergeCell[property]
        break
      }
    }
  }
  grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CELL_RANGE, (e) => {
    // e.col 列索引（只读）
    // e.row 行索引（只读）
    // e.cellRange 单元格区域（可修改）
    doMergeCell(e, 'cellRange')
  })
  grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CELL_VALUE, (e) => {
    // e.col 列索引（只读）
    // e.row 行索引（只读）
    // e.cellValue 单元格值（可修改）
    doMergeCell(e, 'cellValue')
  })
  ```

### 2.1.6 (Jul 20 2020)

- 修改 InlineLookupEditor 在 Electron 中使用搜狗输入法时按回车无法写入问题
- 修改合并列头拖动时，居中列头文字会分离的问题
- 修改单元格选择透明背景渲染重叠问题
- ListGrid 增加 grid 边框线设置

  ```javascript
  const grid = new kakaGrid.ListGrid({
      ...
      borderMode: 'none', // grid 边框模式：
        // 'none': 无边框（默认）
        // 'content-border': 内容区域边框
        // 'grid-border': grid 区域边框
      borderColor: 'transparent', // grid 边框线颜色，默认透明
      borderWidth: 0, // grid 边框线宽度，默认为 0
      theme: { // 在主题属性中，可以设置 grid 边框线颜色和线宽
          gridBorderColor: 'transparent',
          gridBorderWidth: 0,
          ...
      },
      ...
  })
  ```

### 2.1.5 (Jul 01 2020)

- 修改单元格合并时，如果第一行与列头标题一致也合并的问题
- 修改使用 layout 属性定义列时，tooltip 不起作用的问题
- 修改 d.ts 中 kakaGrid 为命名空间

### 2.1.4 (Jun 22 2020)

- 修改列宽撑满时，第一次拖动不正常的 bug
- 修改可拖动选中区域右下角样式
- 列类型 Column、LookupColumn、MultilineTextColumn、TreeColumn 增加 cellStyle 属性
  - 此属性用于定义单元格的显示及编辑样式
  - cellStyle 默认值为 undefined
  - cellStyle 是一个对象，或是返回一个对象的回调函数
  - cellStyle.innerBox 内嵌框，'none'不显示 'dashed'虚线框
- 列样式增加 inputPadding 属性，可用于定义嵌入编辑框的内边距：
  InlineInputEditor、InlineLookupEditor、InlineTextAreaEditor

  ```javascript
  const grid = new kakaGrid.ListGrid({
      ...
      header: [{
          ...
          columnType: new kakaGrid.columns.type.Column({
              cellStyle: (rec) => {
                  return {
                      innerBox: 'dashed'
                  }
              },
          }),
          action: new kakaGrid.columns.action.InlineInputEditor({
              type: "text",
              disabled: (rec) => {
                return false
              }
          }),
          style: {
              padding: [0, 8, 0, 8],
              inputPadding: [0, 8, 0, 8], // input 框的 padding 值，[上, 右, 下, 左]
          },
          ...
      }],
      theme: {
          selectionBgColor: "#FFF",
          ...
      },
      ...
  })
  ```

- TreeColumn 支持超链接，并增加样式属性 linkColor 用于超链接高亮颜色

  ```javascript
  const grid = new kakaGrid.ListGrid({
      ...
      header: [{
          ...
          columnType: 'tree',
          // action 为 ButtonAction 时，树形列的文本显示为超链接模式
          action: new kakaGrid.columns.action.ButtonAction({
              action: (rec) => {
                  alert(JSON.stringify(rec))
              }
          }),
          style: {
              ...
              linkColor: '#F00', // 超链接鼠标悬浮颜色，比 theme.tree.linkColor 优先
          },
          ...
      }],
      theme: {
        ...
        tree: {
          ...
          linkColor: 'rgba(0, 0, 0, 0.3)', // linkColor 的默认值
        }
      },
      ...
  })
  ```

- ListGrid 增加 highlightBorderWidth 属性，用于设置选择边框宽带，默认值为 2

  ```javascript
  const grid = new kakaGrid.ListGrid({
      ...
      // highlightBorderWidth: 2, // grid 属性，其优先于 theme 中的同名属性
      theme: {
        ...
        highlightBorderWidth: 2, // theme 属性
      },
      ...
  })
  ```

### 2.1.3 (Jun 09 2020)

- 绘制左边线、上边线

### 2.1.2 (Jun 04 2020)

- 增加 MOUSE_SELECTED_START、MOUSE_SELECTED_END 事件，在鼠标选择单元格前、后触发
- 修改 disableColumnResize 和列的 disableResize 属性优先级关系：
  disableColumnResize 优先于 disableResize

  ```javascript
  var grid = new kakaGrid.ListGrid({
      ...
      header: [{
          ...
          // 由于 disableColumnResize 为 true，所以即使 disableResize 设置为 false 也无法拖动
          // 如果要分别控制各列是否允许拖动，则需要设置 disableColumnResize 不为 true
          disableResize: false,
          ...
      }],
      disableColumnResize: true, // 禁止全部列拖动
      ...
  });
  ```

### 2.1.1 (May 30 2020)

- 解决 chrome 下快速且持续输入时，双击其他列编辑报错问题：

  ```matlab
  Uncaught DOMException:
      Failed to execute 'appendChild' on 'Node':
          The node to be removed is no longer a child of this node.
          Perhaps it was moved in a 'blur' event handler?
  ```

  > **问题原因**
  > 当 input 框处于编辑状态时，双击其他单元格，通常事件触发顺序 blur -> dblclick
  > 但 chrome 中如果输入框不停的在输入时，偶尔会 dblclick -> blur
  > safari 中未发现此问题

### 2.1.0 (May 19 2020)

- 解决 Column 列显示数值报错问题
- header 的 caption 属性支持回调

### 2.0.9 (May 12 2020)

- 兼容 IE11 - children 问题

### 2.0.8 (May 11 2020)

- 增加 Radio 列

  ```javascript
  const grid = new kakaGrid.ListGrid({
    ...
    header: [{
      ...
      columnType: 'radio',
      action: 'radio',
      ...
    }, {
      columnType: new kakaGrid.columns.type.RadioColumn({}),
      action: new kakaGrid.columns.action.RadioEditor({
        group: ({ grid, row, col }) => {
          // 支持分组
          const result = [];
          const group = grid.getRowRecord(row).group;
          for (
            let targetRow = grid.frozenRowCount;
            targetRow < grid.rowCount;
            targetRow++
          ) {
            if (grid.getRowRecord(targetRow).group === group) {
              result.push({ col, row: targetRow });
            }
          }
          return result;
        }
      })
    }],
    ...
  });
  ```

### 2.0.7 (May 08 2020)

- 修改滚动条在 grid 隐藏时，计算高度不正确问题

### 2.0.6 (May 06 2020)

- 不兼容的内容：

  - kakaGrid.ListGrid.EVENT_TYPE.KEYDOWN 事件的参数发生变更
  - 修改方法：全文搜索 EVENT_TYPE.KEYDOWN，将旧参数改为新参数：
  - 旧 KEYDOWN 参数：

    ```javascript
    // *** 旧代码 ***
    grid.addEventListener(
      kakaGrid.ListGrid.EVENT_TYPE.KEYDOWN,
      (keyCode, e) => {
        // keyCode: number
        // e: KeyboardEvent
      }
    )
    ```

  - 新 KEYDOWN 参数：

    ```javascript
    // *** 新代码 ***
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.KEYDOWN, (e) => {
      // e.keyCode: number
      // e.event: KeyboardEvent
    })
    ```

- keyboardOptions 增加如下属性：

  - keyboardOptions.deleteCellValueOnDel 默认为 false，按 <kbd>Del</kbd> 键删除单元格内容
  - keyboardOptions.selectAllOnCtrlA 默认为 false
    按 <kbd>Ctrl</kbd> + <kbd>A</kbd> 或 <kbd>⌘</kbd> + <kbd>A</kbd> 键全选
  - keyboardOptions.selectAllOptions 全选设置

    ```javascript
    {
      ctrlA: { // Ctrl + A
        excludeFrozenRow: false, // 全选时是否排除锁定行(列头)
        excludeFrozenCol: false, // 全选时是否排除锁定列
      },
      shiftCtrlA: { // Shift + Ctrl + A
        excludeFrozenRow: true,
        excludeFrozenCol: false,
      }
    }
    ```

- 增加 underlayRowCount、underlayColCount 属性，空白行数、空白列数，默认为 0

  - underlayRowCount >= 0，表示滚动条可以向上滚动至最后一行距离底边线 underlayRowCount 个空白行高处
  - underlayRowCount < 0，表示滚动条可以向上滚动至最少只显示 underlayRowCount 个空白行高处
  - underlayColCount 规则同 underlayRowCount

- 增加 underlayRowHeight、underlayColWidth 属性，空白行高、空白列宽，默认为"auto"

  - "auto"，默认高度。当空白行数或空白列数 >= 0 时使用默认行高或列宽；< 0 时使用实际行高或列宽
  - number，固定高度

- CheckColumn、SwitchColumn 增加 draw 属性，用于自定义单元格内容

  ```javascript
  const grid = new kakaGrid.ListGrid({
    ...
    header: [{
      ...
      columnType: new kakaGrid.columns.type.CheckColumn({
        draw: (value, ctx, opt) => {
          // const { grid, record, row, col, selection, rect } = opt
          ctx.save()
          try {
            const x = opt.rect.left
            const y = opt.rect.top
            ctx.fillStyle = "#000"
            ctx.fillText('合计', x, y)
          } finally {
            ctx.restore()
          }
          return false // 返回 false 表示不再绘制单元格原有内容
        }
      }),
      ...
    }],
    ...
  });
  ```

### 2.0.5 (May 04 2020)

- headerStyle 支持 padding 属性

### 2.0.4 (Apr 08 2020)

- 去掉了 package.json 中对 @mctech/perfect-scrollbar 的依赖
- 允许 js 的引用顺序 kaka-grid 在 perfect-scrollbar 之前

### 2.0.3 (Apr 07 2020)

- 增加 @mctech/perfect-scrollbar 依赖，需要做如下修改：
  - 页面中引用 @mctech/perfect-scrollbar 中的 js、css 文件
  - 如果引用了，则使用虚拟滚动条；如果没引用，则使用原生滚动条

### 2.0.2 (Apr 01 2020)

- 修改 getCellRangeByField 当隐藏列头时返回内容有行偏差问题

### 2.0.1 (Apr 01 2020)

- 修改 check 列在自定义 theme 时显示不正常的问题

### 2.0.0 (Apr 01 2020)

- 不兼容的内容：

  - grid.headerValues
    - 旧：grid.headerValues['xxx'] = true、 grid.headerValues.xxx
    - 新：grid.headerValues.set('xxx', true)、grid.headerValues.get('xxx')
    - 修改方式：搜索所有用到 headerValues 的地方，将其改为新方式获取值或设置值
  - 滚动条元素
    - 旧：\<div class="grid-scrollable">\<div class="grid-scroll-container">...\</div>\</div>
    - 新：\<div class="grid-scrollable">...\</div>
    - 修改方式：使用虚拟滚动条后，grid-scroll-container 元素没有了，如果依赖到了此元素，需要改为：grid-scrollable

- 属性及方法名变更如下：

  - headerColSpan -> colSpan
  - headerRowSpan -> rowSpan
  - readonly -> readOnly
  - getRowRecordIndex -> getRecordIndexByRow
  - getHeaderCellRange -> getCellRange
  - disableColResize -> disableColumnResize
  - 以上均做了兼容性保留处理，如果使用了旧的属性及方法则会在控制台输出相应警告

- 增加 layout 属性，用于定义列头布局和记录布局

  - 演示用例：[./examples/index.html#/listgrid/layout](./examples/index.html#/listgrid/layout)
  - layout、header 只能使用一个，layout 属性优先

  ```javascript
  var grid = new kakaGrid.ListGrid({
      ...
      layout: [[{ // 用二维数组描述布局
        caption: 'ID',
        rowSpan: 2,
        ...
      }, ...], [{...}], ...]
  });
  // 或
  var grid = new kakaGrid.ListGrid({
      ...
      layout: { // 列头 和 记录 分开定义
        header: [[], [], ...],
        body: [[], [], ...]
      }
  });
  ```

- 增加 spanBodyOptions 属性，用于内容部分的单元格合并：

  - spanBodyOptions.startCol 内容合并的开始列索引
  - spanBodyOptions.endCol 内容合并的结束列索引
  - 演示用例：[./examples/index.html#/listgrid/spanBody](./examples/index.html#/listgrid/spanBody)

  ```javascript
  var grid = new kakaGrid.ListGrid({
      ...
      spanBodyOptions: { // 默认为: null
        startCol: 0, // 支持 startCol >= endCol, 当 startCol > endCol 时为反方向合并
        endCol: 2
      }
  });
  ```

- 使用虚拟滚动条，滚动条不再占用显示区域位置
- 增加滚动条位置属性 scrollLeft、scrollTop
- 增加属性 visibleRowCount、visibleColCount，只读，可见的数据行、列个数，不包含锁定部分和不完整的部分
- 增加属性 topRow、topCol，只读，可见的第一个行、列号，不包含不完整部分
- 增加 allowRangePaste 属性，是否允许批量粘贴，默认为 false
- theme 增加 highlightBgColor 属性，用于设置焦点单元格背景色
- 事件增加 CONTEXTMENU_CELL，上下文菜单事件
- 增加 keyboardOptions 属性，用于控制键盘操作：
  - keyboardOptions.moveCellOnTab 默认为 true，按 tab 键是否移动单元格
  - keyboardOptions.moveCellOnEnter 默认为 true，按 enter 键是否移动单元格
- 焦点移动快捷键调整：
  - 增加 <kbd>Ctrl</kbd> + <kbd>方向键</kbd> 或 <kbd>⌘</kbd> + <kbd>方向键</kbd>
  - 增加 <kbd>Home</kbd> 和 <kbd>End</kbd> 支持组合 <kbd>Ctrl</kbd> 或 <kbd>⌘</kbd>
  - <kbd>Tab</kbd> 键移动到头自动折返

### [...](./HISTORY.md)

## Install

```sh
yarn

yarn build --types
# or
yarn build:dev
```

## VSCode Extensions

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### settings.json

```json
{
  // Use the project's typescript version
  "typescript.tsdk": "node_modules/typescript/lib",
  // Use prettier to format typescript, javascript, css and JSON files
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
