# History

## Roadmap

### Future

* 改为虚拟滚动条
  * [https://www.npmjs.com/package/smooth-scrollbar](https://www.npmjs.com/package/smooth-scrollbar)
  * [https://www.npmjs.com/package/perfect-scrollbar](https://www.npmjs.com/package/perfect-scrollbar)
* event.js 完善
* check 属性的 borderColor 分 checkBorderColor 和 uncheckBorderColor
* 合并单元格
* windows 下双向滚动条都出现时会留有空白问题
* 选择区域拖动，模仿 Numbers 表格更合适
* 需要修改.d.ts中，appearance的类型定义
* 参照：支持多个图标按钮
* 拖动列宽有bug(当滚动条到最右侧, 拖动列款刷新有问题)
* 自动折行/拖动行高
* 行选择/列选择
* 列隐藏
* IE10: [dataset](https://unpkg.com/dataset)
* PivotGrid
* 360安全浏览器的极速模式下（chrome 36），搜狗输入法无法输入汉字；【暂不解决】

### 1.1.1 (Feb 11 2020)

* InlineLookupEditor 增加 disableFilterSort 属性，用于禁止过滤内容的排序

### 1.1.0 (Feb 08 2020)

* kakaGrid.ListGrid 的 header 增加 contentHidden 属性，默认为 undefined
* kakaGrid.columns.type.BaseColumn 增加 hidden 属性，默认为 undefined

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            // header的contentHidden 和 Column的hidden 都用于列内容隐藏
            // contentHidden 优先级低于 hidden
            contentHidden: false, // 支持回调函数
            columnType: new kakaGrid.columns.type.CheckColumn({
                hidden: function(rec) {
                    return !!rec.isHidden
                }
            }),
            ...
        }],
        ...
    });
    ```

### 1.0.9 (Feb 06 2020)

* InlineMenuEditor 增加 autoWidth 属性
  * false，默认值，菜单宽度与单元格宽度保持相同
  * true，菜单宽度由菜单选项宽度决定
* InlineMenuEditor 鼠标点在其他地方能关闭菜单
* 升级 typescript 到最新版本

### 1.0.8 (Feb 03 2020)

* 修改打包错误

### 1.0.7 (Feb 03 2020)

* 发布时，包含 src 目录内容

### 1.0.6 (Jan 30 2020)

* FilterDataSource 实现 refresh 方法，用于刷新数据集的数据变化

### 1.0.5 (Jan 28 2020)

* 修改 1.0.4 版本引发的 InlineLookupEditor 鼠标选择无效问题

### 1.0.4 (Jan 20 2020)

* 修改 InlineLookupEditor 弹出下拉列表后，鼠标点击 grid 外无法收起问题

### 1.0.3 (Jan 19 2020)

* 解决 Chrome 下，单元格输入状态使用鼠标选择，当鼠标在输入框action按钮处抬起时触发动作问题

### 1.0.2 (Jan 15 2020)

* kakaGrid.columns.action.InlineMenuEditor 的 options 属性支持回调函数

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            action: new kakaGrid.columns.action.InlineMenuEditor({
                options: function(rec) {
                    return [{
                        value: 1,
                        classList: "",
                        html: "<i>选项1</i>"
                    }, {
                        value: 2,
                        classList: "",
                        html: "<i>选项2</i>"
                    }];
                },
                ...
            })
            ...
        }],
        ...
    });
    ```

### 1.0.1 (Jan 14 2020)

* 列定义中 headerStyle 属性回调支持 headerValues 参数

### 1.0.0 (Jan 13 2020)

* 修改字符串列显示数字内容且 style.textOverflow 为 "ellipsis" 时报错问题

### 0.9.9 (Jan 07 2020)

* 解决数据集过滤刷新问题

### 0.9.8 (Dec 27 2019)

* ListGrid 增加 disableColResize 属性，用于禁止所有列拖动
* 列定义增加 disableResize 属性，用于禁止单个列拖动

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            disableResize: true, // 禁止单个列拖动
            ...
        }],
        disableColResize: true, // 禁止全部列拖动
        ...
    });
    ```

### 0.9.7 (Dec 26 2019)

* 列定义支持 tooltipType、headerTooltipType 属性，用于扩展 tooltip 的类型
  * overflow-text：默认值，纯文本
  * overflow-html：支持 html 文本

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            tooltipType: "overflow-html", // 默认值为："overflow-text"
            ...
        }],
        ...
    });
    ```

### 0.9.6 (Dec 20 2019)

* 修改 tooltip 默认样式为白底黑字

### 0.9.5 (Dec 12 2019)

* TreeDataSource 增加只读属性 expandedKeys

### 0.9.4 (Dec 02 2019)

* 修改 ImageColumn 支持空值，空值不显示图片（同时控制台不输出错误信息）
* 增加 ImageColumn 演示用例：：[./examples/index.html#/listgrid/image](./examples/index.html#/listgrid/image)

### 0.9.3 (Nov 29 2019)

* 增加 DrawColum 列，可通过 draw 属性自定义单元格内容
* Column、LookupColumn、MultilineTextColumn、TreeColumn 增加 draw 属性
* theme 增加 focusBgColor 属性，用于设置焦点单元格背景色：

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        theme: {
            // focusBgColor 的默认值为 undefined，可以是 固定颜色 或 回调函数:
            // focusBgColor: "#FDD", // 固定颜色
            focusBgColor: function(args) { // 回调函数
                if (args.grid.frozenRowCount > args.row) {
                    return undefined; // 列头颜色
                } else {
                    return undefined; // 非列头颜色
                }
            },
        }
    });
    ```

### 0.9.2 (Nov 20 2019)

* 修改 grid 大小发生变化后，滚动条滚动到最底部，最后一条记录被部分遮挡问题

### 0.9.1 (Nov 19 2019)

* 修改 InlineLookupEditor 当 allowOtherInput 为真、并有**非空**输入内容且无匹配时，不显示参照列表、只显示其他值

### 0.9.0 (Nov 18 2019)

* InlineLookupEditor 当 allowOtherInput 为**真**、并**有输入内容**且**无匹配**时，不显示参照列表、只显示其他值

### 0.8.9 (Oct 29 2019)

* InlineLookupEditor 的 allowOtherInput 属性支持回调函数，默认值为：false
    > **allowOtherInput**?: boolean | ((rec: IRecord) => boolean);

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
                allowOtherInput: function(rec) {
                    return true;
                },
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.8.8 (Oct 17 2019)

* 解决 TreeColumn 允许输入时，输入中文进入编辑状态导致输入框撑满单元格问题
* 增加 TreeColumn + InlineLookupEditor 例子：[./examples/index.html#/listgrid/treeLookup](./examples/index.html#/listgrid/treeLookup)

### 0.8.7 (Sep 25 2019)

* 修改拖动已选择区域大小的时候，导致触发编辑器动作按钮的问题

### 0.8.6 (Sep 25 2019)

* kakaGrid.ListGrid 增加 monitorResize 参数，默认值：true

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        monitorResize: false, // false：不自动监听 window 的 resize 事件；
        ...
    });
    ```

### 0.8.5 (Sep 25 2019)

* 增加 resize 方法，用于在 grid 容器大小发生变化时调用

### 0.8.4 (Sep 25 2019)

* 修改 theme 中 tree 属性默认值兼容问题

### 0.8.3 (Sep 24 2019)

* theme 增加以 tree 属性：

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        theme: {
            tree: { // 树形列样式
                lineColor: "rgba(0, 0, 0, 0.3)", // 线颜色
                buttonColor: "rgba(0, 0, 0, 0.45)", // 加减号颜色
                buttonBgColor: "transparent", // 圆圈背景颜色
                buttonBorderColor: "rgba(0, 0, 0, 0.3)", // 圆圈边框颜色
            }
        }
    });
    ```

### 0.8.2 (Sep 23 2019)

* kakaGrid.ListGrid 增加 completeEdit 方法，用于强制结束编辑状态

    ```javascript
    grid.completeEdit();
    ```

### 0.8.1 (Sep 18 2019)

* 修改列发生变化时，列索引越界问题

### 0.8.0 (Sep 17 2019)

* 修改 underlayBackgroundColor 为 "transparent" 时，数据发生变化后空白处无法清空问题

### 0.7.9 (Jul 11 2019)

* 修改 IE11 日期列输入报错问题

### 0.7.8 (Jul 09 2019)

* TreeColumn 增加 canToggle、toggled 回调属性，用于控制展开或收起树节点相关的行为

    > 演示用例：[./examples/index.html#/listgrid/treelazy](./examples/index.html#/listgrid/treelazy)

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: new kakaGrid.columns.type.TreeColumn({
                canToggle: function(e) { // 切换（展开/收起）前
                    // e.col: number;
                    // e.row: number;
                    // e.type: "expand" | "expandAll" |
                    //         "collapse" | "collapseAll" |
                    //         "over";
                    // e.treeInfo: ITreeInfo;
                    // e.event: Event;
                    return true; // 返回 false 则阻止；非 false 则允许
                },
                toggled: function(e) { // 切换（展开/收起）后
                    // e.col: number;
                    // e.row: number;
                    // e.type: "expand" | "expandAll" |
                    //         "collapse" | "collapseAll"
                    // e.treeInfo: ITreeInfo;
                    // e.event: Event;
                    console.log(e);
                }
            }),
            ...
        }],
        ...
    });
    ```

### 0.7.7 (Jul 01 2019)

* 增加 kakaGrid.es5.min.js 和 kakaGrid.min.js

### 0.7.6 (Jun 28 2019)

* 解决 tooltip 显示左右越界问题

### 0.7.5 (Jun 28 2019)

* 解决 LookupColumn 延迟加载时，无法显示参照数据问题
* 解决 tooltip 显示底部越界问题

### 0.7.4 (Jun 27 2019)

* 解决 LookupColumn 延迟加载时，横向滚动过快导致的刷新错位问题

### 0.7.3 (Jun 27 2019)

* 修改 0.7.2 的 headerTooltip 支持合并单元格引起的 bug

### 0.7.2 (Jun 26 2019)

* headerTooltip 支持合并单元格

### 0.7.1 (Jun 25 2019)

* 列定义增加 headerTooltip 属性

    > Tooltip演示用例：[./examples/index.html#/listgrid/tooltip](./examples/index.html#/listgrid/tooltip)

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            // headerTooltip: "列头提示内容", // 固定提示内容
            headerTooltip: function(header) { // 回掉函数返回提示内容
                // header.cell => { col: number; row: number }
                // header.field => IField
                return ""; // 返回空，表示使用默认
            },
            ...
        }],
        ...
    });
    ```

### 0.7.0 (Jun 21 2019)

* 支持 <kbd>Enter</kbd> 和 <kbd>Tab</kbd> 键改变焦点，规则如下：
  * <kbd>Enter</kbd> 向下移动焦点，如果**单元格可编辑则进入编辑状态**
  * <kbd>Shift</kbd> + <kbd>Enter</kbd> 向上移动焦点
  * <kbd>Tab</kbd> 向右移动焦点
  * <kbd>Shift</kbd> + <kbd>Tab</kbd> 向左移动焦点
  * 编辑状态下，上述快捷键仍然起作用
  * **button**、**check**、**switch** 列改为只能使用 <kbd>Space</kbd> 键触发动作

### 0.6.9 (Jun 19 2019)

* 修改 focusCell 调用无效，而 focusGridCell 起作用的问题
* 新增列类型：switch（开关列）

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: "switch", // new kakaGrid.columns.type.SwitchColumn({})
            action: "switch", // new kakaGrid.columns.action.SwitchEditor({})
            ...
            headerType: "switch", // new kakaGrid.headers.type.SwitchHeader({})
            headerAction: "switch", // new kakaGrid.headers.action.SwitchHeaderAction({})
            ...
        }],
        ...
        theme: {
            switch: {
                borderColor: "#000",
                checkBgColor: "#3BCD4F",
                uncheckBgColor: "#FFF",
            }
        }
    });
    ```

* 列宽支持：auto

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            width: "auto", // 宽度为 auto 的列将平均撑满整个显示区域的剩余部分
            ...
        }],
        ...
    });
    ```

### 0.6.8 (Jun 10 2019)

* 增加 kakaGrid.ListGrid.EVENT_TYPE.CUT 事件，需要在此事件中实现剪切后的清空操作

    ```javascript
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CUT,
        function(e) {
            // 1. 在此处清空被剪切的数据
            // 2. 可以返回剪切数据，如果不返回则使用默认剪切数据
        }
    );
    ```

### 0.6.7 (May 31 2019)

* 列定义增加 headerColSpan 和 headerRowSpan 属性，用于列头的自定义单元格合并

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            headerColSpan: 2, // >1 才生效
            ...
        }],
        ...
    });
    ```

* 增加了"多按钮列"用例：[examples/index.html#/listgrid/button](./examples/index.html#/listgrid/button)

### 0.6.3 ~ 0.6.6 (May 27 2019)

* 修改边框颜色定义

### 0.6.2 (May 26 2019)

* InlineInputEditor、InlineLookupEditor、InlineTextAreaEditor 增加 disableInput 属性，用于控制是否允许输入
    > **不推荐** InlineLookupEditor 的 disableDropdown 属性已被 disableInput 替代，将不再推荐使用，使用此属性会有警告

### 0.6.1 (May 24 2019)

* 解决 IE 下，点击 grid 空白处无法粘贴的问题

### 0.6.0 (May 24 2019)

* 列右侧图标属性 appearance 支持回调

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            style: {
                appearance: function(active) { // 回调函数
                    return {
                        color: active ? "rgba(0, 0, 0, .9)" : "rgba(0, 0, 0, .54)",
                        path: "M0 2 5 7 10 2z",
                        width: 10,
                    };
                }
                // appearance: { // 自定义图标
                //     color: "rgba(0, 0, 0, .54)",
                //     path: "M0 2 5 7 10 2z",
                //     width: 10,
                // }
            },
            ...
        }],
        ...
    });
    ```

### 0.5.9 (May 23 2019)

* 主题默认颜色 checkbox.checkBgColor 的默认值如果不指定，则使用 color（*修改前使用 defaultBgColor*）

### 0.5.8 (May 22 2019)

* 列右侧图标新增：date-button
  * 可以在 action 动作回调函数中，根据输入框位置弹出自定义编辑器
  * 示例

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: "date",
            style: {
                appearance: "date-button", // 显示为日期按钮
                // appearance: "lookup-button", // 显示为查找按钮
                // appearance: "clear-button", // 显示为清空按钮
            },
            ...
            action: new kakaGrid.columns.action.InlineInputEditor({
                ...
                type: "date",
                action: function(rec, info) {
                    this.open(info.grid, info.cell); // 直接进入编辑状态
                    // 获取输入框位置（相对于 grid 显示区域）:
                    var rect = info.grid.getCellRelativeRect(info.cell.col, info.cell.row);
                    console.log(rect);
                },
                ...
            }),
            ...
        }],
        ...
    });
    ```

  * appearance 属性支持自定义图标，示例：./examples/index.html#/colunm_actions/InlineInputEditor

### 0.5.7 (May 21 2019)

* 解决部分 IE11 浏览器字体图标显示为 none 的问题
  * 问题描述：只有个别 IE11 遇到此问题，可能是升级安装不正常导致的，浏览器调试工具也无法使用，360版本调试工具调出来的是更早版本的调试器
  * 解决方案：只发现一台机器这样，个别现象暂时绕过，方案为：**不显示图标、也不显示 none**
* 新增 grid 列的只读和禁用支持回调方法

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            action: new kakaGrid.columns.action.InlineInputEditor({
                ...
                disabled: function(rec) { // 条件禁用【推荐】
                    return rec.fname === "disabled";
                },
                readonly: function(rec) { // 条件只读【推荐】
                    return rec.fname === "readonly";
                }
                ...
            }),
            ...
        }],
        ...
    });
    ```

    > **不推荐** 之前在选择单元格时，设置列动作的禁用、只读属性的方式

### 0.5.6 (May 21 2019)

* 解决 Symbol 冲突问题（*此冲突由于打包工具升级引起，需要升级到此版本才能适应新的打包工具*）

### 0.5.5 (May 21 2019)

* 修改 grid.header 为空时报错的问题

### 0.5.4 (May 20 2019)

* package.json 中增加 types 属性

### 0.5.3 (May 16 2019)

* 修改重新给 grid.header 重新赋值后，禁止选中单元格显示不正常问题

### 0.5.2 (May 15 2019)

* 当根据列索引获取相关信息时，如果列索引超出范围，使其不会抛异常

### 0.5.1 (May 14 2019)

* 当数据发送变化的时候，触发 SELECTED_CELL 事件

### 0.5.0 (Apr 08 2019)

* 修改选择区域拖动时，当拖动到最顶部和最底部的时候无法触发滚动的问题

### 0.4.9 (Apr 02 2019)

* 修改了当输入框处于编辑状态时修改列只读（或禁用）属性会导致无法输入内容的问题

### 0.4.8 (Apr 01 2019)

* 修改多行表头默认选择框渲染不完整问题

### 0.4.7 (Apr 01 2019)

* grid列头文字支持 "\n" 折行

### 0.4.6 (Mar 26 2019)

* 修改 TreeColumn 的展开/收起动作的响应方式，以解决在 SELECT_CELL 事件中弹出遮罩导致无法展开/收起的问题

### 0.4.5 (Mar 15 2019)

* 修改 **v0.4.4** 版本中，点击单元格右侧直接进入编辑状态的问题

### 0.4.4 (Mar 12 2019)

* 参照列默认的右侧小箭头支持单击
* 解决单击参照框的“非按钮区域”也会触发按钮动作的问题

### 0.4.3 (Mar 8 2019)

* 解决 chrome 中第二次输入中文会报错的问题

    ```matlab
    Uncaught DOMException:
        Failed to execute 'appendChild' on 'Node':
            The node to be removed is no longer a child of this node.
            Perhaps it was moved in a 'blur' event handler?
    ```

### 0.4.2 (Mar 6 2019)

* 当 InlineLookupEditor 允许额外值时，焦点切换会保存输入值

### 0.4.1 (Mar 6 2019)

* 当 InlineLookupEditor 允许额外值、且下拉列表中没有设置空选项时，也允许输入空值
* grid 增加空白处的点击事件：
  * ListGrid.EVENT_TYPE.CLICK_UNDERLAY
  * ListGrid.EVENT_TYPE.DBLCLICK_UNDERLAY
  * ListGrid.EVENT_TYPE.DBLTAP_UNDERLAY

### 0.4.0 (Mar 4 2019)

* 修改 LookupColumn 的 convert 回调属性中 value 和 displayValue 总是一样的问题

### 0.3.9 (Feb 25 2019)

* TreeDataSource 的 getTreeInfo 方法可能返回 null
* TreeDataSource 增加 getIndexByKey 方法，根据主键获取记录索引值

    ```javascript
    var treeDataSource = grid.dataSource;
    var key = "1001";
    var index = treeDataSource.getIndexByKey(key);
    var treeInfo = treeDataSource.getTreeInfo(index);
    console.log(treeInfo);
    ```

### 0.3.8 (Feb 22 2019)

* ListGrid 增加 disabled 和 readonly 属性，用于整体控制禁用和只读
* ListGrid 的 SELECTED_CELL 事件，允许阻止选择动作触发

    ```javascript
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.SELECTED_CELL,
        function(data, selected) {
            if (selected) {
                // 选择后
                ...
            } else {
                // 选择前，返回 false 可以阻止选择动作触发
                return false;
            }
        }
    );
    ```

### 0.3.7 (Feb 21 2019)

* 列支持 tooltip 属性，用于自定义内容提示

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            tooltip: "tooltip_field_name",
            ...
        }, {
            ...
            tooltip: function(record) {
                // 返回 "" 表示无提示
                return record["tooltip_field_name"];
            },
            ...
        }],
        ...
    });
    ```

### 0.3.6 (Feb 20 2019)

* 解决 windows 下的 chrome 中，对 input[type=number] 时拷贝无反应的问题
* 解决 safari 下禁止粘贴后，粘贴多次还能粘贴进去的问题

### 0.3.5 (Feb 11 2019)

* 修改 InlineLookupEditor 中属性改为非只读，以满足动态修改需求
* 增加“自定义字段”用例：#/listgrid/customField
  * 自定义字段根据其他字段显示值内容
  * 自定义字段输入的内容写入其他字段
  * 动态修改自定义字段的编辑器的属性

### 0.3.4 (Jan 30 2019)

* 修改列的 convert: TConvert 属性定义：

    ```javascript
    // 旧定义
    type TConvert = (
        value: any,
        displayValue: string,
        cell: {col: number, row: number},
        frozenInfo: {frozenColCount: number, frozenRowCount: number},
    ) => string;
    // 新定义
    type TConvert = (
        value: any,
        displayValue: string,
        cell: {col: number, row: number},
        grid: kakaGrid.ListGrid,
    ) => string;
    // 例子：在 convert 时获取当前记录
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: new kakaGrid.columns.type.Column({
                convert: function(value, displayValue, cell, grid) {
                    var record = grid.getRowRecord(cell.row); // 获取当前记录
                    return record.fieldValue ? displayValue : "";
                },
            }),
            ...
        }],
        ...
    });
    ```

### 0.3.3 (Jan 27 2019)

* 以下输入框，支持自定义动作
  * InlineLookupEditor
  * InlineTextAreaEditor
  * InlineInputEditor
* 以下列，支持自定义动作图标
  * LookupColumn
  * MultilineTextColumn
  * Column
  * NumberColumn
  * DateColumn
  * TreeColumn

### 0.3.2 (Jan 26 2019)

* InlineTextAreaEditor 支持自定义动作，改变图标、图标可以点击
  * disableAction 禁止自定义动作，默认为false
  * action 动作，类型为function，快捷键：<kbd>Ctrl</kbd>+<kbd>Enter</kbd> 或 <kbd>⌘</kbd>+<kbd>Enter</kbd>
  * 示例

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: "multilinetext",
            style: {
                appearance: "lookup-button", // 显示为查找按钮
                // appearance: "clear-button", // 显示为清空按钮
            },
            ...
            action: new kakaGrid.columns.action.InlineTextAreaEditor({
                ...
                disableAction: false,
                action: function(rec) {
                    alert(JSON.stringify(rec))
                },
                ...
            }),
            ...
        }],
        ...
    });
    ```

* 修改 右侧按钮 的宽度为固定值：32

### 0.3.1 (Jan 23 2019)

* 修改 InlineLookupEditor 的下拉框显示在 Gird 区域内

### 0.3.0 (Jan 22 2019)

* 修改 LookupColumn 的样式属性中 appearance 图标的默认大小

### 0.2.9 (Jan 21 2019)

* InlineLookupEditor 增加新按钮样式 clear-button

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            style: {
                appearance: "clear-button", // 显示为清空按钮
            },
            ...
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.2.8 (Jan 10 2019)

* ListGrid 增加两个事件用于实现选择区域拖动：CAN_DRAG_SELECTION 和 DRAG_SELECTION

    ```javascript
    ...
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CAN_DRAG_SELECTION,
        function(range) {
            // 返回是否允许拖动选择区域
            return range.start.row >= grid.frozenRowCount;
        }
    );
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.DRAG_SELECTION,
        function(data) {
            // data.dragDone true:拖动完成 false:拖动中
            // data.oldRange 拖动前的区域
            // data.newRange 拖动完成区域
            if (data.dragDone) {
                // 拖动完成
                const s = "[" +
                    data.oldRange.start.col + "|" +
                    data.oldRange.start.row + ", " +
                    data.oldRange.end.col + "|" +
                    data.oldRange.end.row + "] => [" +
                    data.newRange.start.col + "|" +
                    data.newRange.start.row + ", " +
                    data.newRange.end.col + "|" +
                    data.newRange.end.row + "]";
                console.log("DRAG_SELECTION:" + s);
            } else {
                // 拖动中
                if (data.newRange.start.row < grid.frozenRowCount) {
                    // 返回 false 表示目标区域无效
                    return false;
                }
            }
        }
    );
    ...
    ```

* theme 增加 selectionDragBgColor 属性，用于描述选择区域拖动过程中的背景颜色
* TreeColumn 支持 icon 属性

### 0.2.7 (Jan 02 2019)

* 解决 MultilineTextColumn 显示数值类型报错的问题
* 增加默认粘贴行为，ListGrid.EVENT_TYPE.PASTE 的使用规则如下：

    ```javascript
    // 1. 接管此事件后，默认粘贴行为失效
    ...
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.PASTE, function(data, e) {
        ...
    });
    ...

    // 2. 如果想让默认粘贴行为继续生效，则需要返回粘贴内容
    ...
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.PASTE, function(data, e) {
        ...
        return data;
    });
    ...
    ```

### 0.2.6 (Dec 29 2018)

* TreeDataSource 增加 hasChildren 和 getChildren 两个参数，用于懒加载

    ```javascript
    var getRecordsWithAjax = function(parentKey, allChildren) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                var records = treeRecords.filter(function(rec) {
                    return rec.parentID === parentKey;
                });
                resolve(records);
            }, 500);
        });
    };

    var data = []; // 用于缓存已加载记录，以后再刷新数据集也不会重复加载
    var loadedData = {}; // 用于缓存懒加载记录，避免一条记录发多次请求
    var cachedDataSource = kakaGrid.data.CachedDataSource.ofArray(data);
    var treeDataSource = new kakaGrid.data.TreeDataSource(cachedDataSource, {
        keyField: "ID",
        parentKeyField: "parentID",
        expandedKeys: [30],
        hasChildren: function(rec) {
            // rec 为当前记录对象；rec 为空表示返回是否有根记录
            // 返回当前记录是否有子记录
            return rec ? !rec.isLeaf : true;
        },
        getChildren: function(rec, all) {
            // rec 为当前记录对象；rec 为空表示返回根记录
            // 返回当前记录的子记录，类型为 IRecord[] 或 Promise<IRecord[]>
            // all 为布尔值，用于判断返回一级子记记录还是全部子记录
            var parentKey = rec ? rec.ID : null;
            if (!loadedData[parentKey]) {
                loadedData[parentKey] = getRecordsWithAjax(parentKey, all).then(
                    function(records) {
                        data.push.apply(data, records); // 缓存已加载记录
                        return records;
                    });
            }
            return loadedData[parentKey];
        },
    });
    ```

### 0.2.5 (Dec 25 2018)

* 优化 LookupColumn

### 0.2.4 (Dec 25 2018)

* 解决 LookupColumn 的 records 属性返回 Promise 导致死循环的问题

### 0.2.3 (Dec 18 2018)

* theme 增加以下属性：

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        theme: {
            ...
            frozenRowsFont: "16px sans-serif", // 列头字体
            defaultRowHeight: 40, // 默认行高
            defaultColWidth: 80, // 默认列宽
            ...
        },
        ...
    });
    ```

### 0.2.2 (Dec 17 2018)

* TreeColumn 的展开和收起样式改为：+ - 模式

### 0.2.1 (Dec 17 2018)

* 删除 package.json 中 module
* 修改 examples/code/listgrid/check.js 支持 ie11

### 0.2.0 (Dec 17 2018)

* InlineLookupEditor 和 LookupColumn 的 records 属性支持异步加载

    ```javascript
    var getLookupRecords1 = function(rec) {
        // 1. 返回 Promise
        return new Promise(function (resolve) {
            var records = [{id: 0, name: "..."}, ...];
            ...
            resolve(records);
        };
    };
    var getLookupRecords2 = function(rec) {
        // 2. 返回 records
        var records = [{id: 0, name: "..."}, ...];
        ...
        return records;
    };
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            columnType: new kakaGrid.columns.type.LookupColumn({
                ...
                records: getLookupRecords1,
                valueField: "id",
                captionField: "name",
                ...
            }),
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
                records: getLookupRecords2,
                valueField: "id",
                valueType: "number",
                captionField: "name",
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.1.9 (Dec 13 2018)

* 修改缺陷：当 hiddenHeader 为 true 时，如果没有记录则报错的问题

### 0.1.8 (Dec 13 2018)

* 修改缺陷：数字 0 在 grid 中不显示
* ListGird 增加 hiddenHeader 属性，用于控制是否显示列头，默认为false

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        hiddenHeader: true, // 隐藏列头
        ...
    });
    grid.hiddenHeader = false; // 显示列头
    ```

### 0.1.7 (Dec 13 2018)

* InlineLookupEditor 支持自定义动作，改变图标、图标可以点击、既可以输入又可以触发动作，增加以下属性
  * disableDropdown 禁止下来查找，默认为false
  * disableAction 禁止动作查找，默认为false
  * action 动作，类型为function，快捷键：
    * disableDropdown为true时为：<kbd>Enter</kbd>
    * disableDropdown为false时为：<kbd>Ctrl</kbd>+<kbd>Enter</kbd> 或 <kbd>⌘</kbd>+<kbd>Enter</kbd>
  * 示例

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            style: {
                appearance: "lookup-button", // 显示为查找按钮
            },
            ...
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
                disableDropdown: false,
                disableAction: false,
                action: function(rec) {
                    alert(JSON.stringify(rec))
                },
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.1.6 (Dec 10 2018)

* InlineLookupEditor 增加 disableFilterRecords 属性，默认为false，false表示根据输入内容过滤下拉列表，true表示仅根据输入内容匹配、并将匹配项显示在前面

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
                disableFilterRecords: true, // 不过滤、仅匹配，并将匹配项排在前面
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.1.5 (Dec 07 2018)

* InlineLookupEditor 增加 filter 设置，用于根据当前记录过滤下拉选项

    ```javascript
    var grid = new kakaGrid.ListGrid({
        ...
        header: [{
            ...
            action: new kakaGrid.columns.action.InlineLookupEditor({
                ...
                filter: function(lookupRecord, record) {
                    // lookupRecord 为下拉记录
                    // record 为 grid 当前记录
                    return true; // 是否显示 lookupRecord
                },
                ...
            }),
            ...
        }],
        ...
    });
    ```

### 0.1.4 (Dec 05 2018)

* TreeDataSource 的 expandTo 方法更名为 expandToKey

    ```javascript
    // 旧写法
    ...
    var id = 12;
    treeDataSource.expandTo(id);
    ...

    // 新写法
    ...
    var id = 12;
    treeDataSource.expandToKey(id);
    ...
    ```

### 0.1.3 (Dec 04 2018)

* DataSource 的 refresh 方法，会强制触发 SELECTED_CELL 事件、并刷新 grid

    ```javascript
    // 旧写法，数据变化（包括记录值或记录数）时需要主动触发选中事件并刷新grid
    ...
    grid.dataSource.refresh();
    grid.selection.fireSelectedEvent();
    grid.invalidate();
    ...

    // 新写法，数据变化时只需要调用一行代码
    ...
    grid.dataSource.refresh();
    ...
    ```

### 0.1.2 (Dec 03 2018)

* 列头支持图标

## header 中的 field 属性有以下三种写法

1. field 是 string

    ```javascript
    const grid = new kakaGrid.ListGrid({
        header: [{
            field: 'field1', // 对应 records.field1
            ...
        }, {
            field: 'field2.name', // 对应 records.field2.name
            ...
        }],
        records: records,
        ...
    });
    ```

2. field 是 function

    ```javascript
    const grid = new kakaGrid.ListGrid({
        header: [{
            field: (record, value) => {
                if (value === undefined) {
                    // value 为 undefined 表示获取字段值
                    return record['fieldName']
                } else {
                    // value 非 undefined 表示设置字段值
                    record['fieldName'] = value
                    // 返回 true 表示有修改（会触发 CHANGED_VALUE）
                    // 返回 false 表示无修改（不会触发 CHANGED_VALUE）
                    return true
                }
            }
            ...
        }, {
            field: (record) => {
                // 注意：只考虑获取值、不考虑设置值，这种情况通常用于“只读字段”
                //      如果这个是“可写字段”，那么会导据返回值来确定是否触发 CHANGED_VALUE 的情况
                return record['fieldName']
            }
            ...
        }],
        records: records,
        ...
    });
    ```

3. field 是 { get: ..., set: ... }

    ```javascript
    const grid = new kakaGrid.ListGrid({
        header: [{
            field: {
                get: (record) => {
                    // 返回字段值
                    return record['fieldName']
                },
                set: (record, value) => {
                    // 设置字段值
                    record['fieldName'] = value
                    // 返回 true 表示有修改（会触发 CHANGED_VALUE）
                    // 返回 false 表示无修改（不会触发 CHANGED_VALUE）
                    return true
                }
            }
            ...
        }],
        records: records,
        ...
    });
    ```

## Publish

```sh
npm config set @mctech:registry https://npm.mctech.vip
npm login --registry=https://npm.mctech.vip --scope=@mctech
> chengang
> ********
> 10147817@qq.com
npm publish
```
