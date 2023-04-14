
declare const _: "$$$$event_target_symbol$$$$";

declare const __2: "$$$$draw_grid_symbol$$$$";

declare const __3: "$$$$list_grid_symbol$$$$";

declare const __4: "$$$$theme_symbol$$$$";

declare class Action<T> extends BaseAction_2<T> {
    private _action;
    constructor(options?: ActionOption<T>);
    get editable(): boolean;
    get action(): ActionListener<T>;
    set action(action: ActionListener<T>);
    clone(): Action<T>;
    getState(_grid: any): any;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): any[];
    onPasteCellRangeBox(): void;
    onDeleteCellRangeBox(): void;
}

declare type ActionListener<T> = (record: any, data: {
    grid: ListGridAPI<T>;
    cell: CellAddress;
}) => void;

declare interface ActionOption<T> extends BaseActionOption<T> {
    action?: ActionListener<T>;
}

declare type AfterSelectedCellEvent = CellAddress & {
    selected: true;
    before: CellAddress;
};

declare enum aggregateType {
    count = 0,
    sum = 1,
    avg = 2,
    max = 3,
    min = 4
}

declare type AnyFunction = (...args: any[]) => any;

declare type AnyListener = AnyFunction;

declare type Appearance = 'menulist-button' | 'lookup-button' | 'clear-button' | 'date-button' | 'none' | ((active: boolean) => SimpleColumnIconOption) | SimpleColumnIconOption;

declare type ArrayLayoutDefine<T> = CellDefine<T>[][];

declare interface AttachCellStyle {
    innerBox?: 'none' | 'dashed';
}

declare class BaseAction<T> {
    protected _disabled: boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
    constructor(option?: BaseHeaderActionOption<T>);
    get disabled(): boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
    set disabled(disabled: boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean));
    clone(): BaseAction<T>;
    bindGridEvent(_grid: ListGridAPI<T>, _cellId: LayoutObjectId): EventListenerId[];
    onChangeDisabledInternal(): void;
}

declare abstract class BaseAction_2<T> {
    protected _disabled: boolean | ((record: T) => boolean);
    constructor(options?: BaseActionOption<T>);
    get disabled(): boolean | ((record: T) => boolean);
    set disabled(disabled: boolean | ((record: T) => boolean));
    abstract get editable(): boolean;
    abstract clone(): BaseAction_2<T>;
    abstract bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
    abstract onPasteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress, value: string): void;
    abstract onDeleteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress): void;
    protected onChangeDisabledInternal(): void;
}

declare abstract class BaseActionInput<T> extends BaseInputEditor<T> {
    private _disableInput;
    private _disableAction;
    private _action?;
    constructor(options?: BaseActionInputOption<T>);
    get disableInput(): boolean | ActionListener<T>;
    set disableInput(disableInput: boolean | ActionListener<T>);
    get disableAction(): boolean | ActionListener<T>;
    set disableAction(disableAction: boolean | ActionListener<T>);
    get action(): ActionListener<T> | undefined;
    set action(action: ActionListener<T> | undefined);
    onBeforeKeydownInternal(grid: ListGridAPI<T>, keyCode: number, e: KeyboardEvent, cellId: LayoutObjectId): boolean;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
    onInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    onActionInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onActionOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    protected abstract getState(grid: any): any;
    private isDisabledInput;
    private isDisabledAction;
    private isDisabled;
}

declare interface BaseActionInputOption<T> extends EditorOption<T> {
    disableInput?: boolean | ActionListener<T>;
    disableAction?: boolean | ActionListener<T>;
    action?: ActionListener<T>;
}

declare interface BaseActionOption<T> {
    disabled?: boolean | ((record: T) => boolean);
}

declare abstract class BaseCheckAction<T> extends BaseAction<T> {
    bindGridEvent(grid: GridInternal<T>, cellId: LayoutObjectId): EventListenerId[];
    protected abstract getState(grid: GridInternal<T>): CheckHeaderState;
}

declare abstract class BaseCheckColumn<T> extends BaseColumn<T, boolean> {
    private _draw?;
    constructor(options?: BaseCheckColumnOption<T>);
    get draw(): DrawCallback | undefined;
    drawInternal(value: boolean, context: CellContext, style: CheckStyle, helper: GridCanvasHelperAPI, grid: GridInternal<T>, { getRecord }: DrawCellInfo<T>): void;
    protected convertInternal(value: any): boolean;
    protected abstract getState(grid: GridInternal<T>): CheckColumnState;
    protected abstract doDrawInternal(helper: GridCanvasHelperAPI, value: boolean, context: CellContext, opt: InlineCheckOption): void;
}

declare interface BaseCheckColumnOption<T> extends BaseColumnOption<T> {
    draw?: DrawCallback;
}

declare abstract class BaseCheckEditor<T> extends Editor<T> {
    constructor(options?: EditorOption<T>);
    bindGridEvent(grid: GridInternal<T>, cellId: LayoutObjectId): EventListenerId[];
    onPasteCellRangeBox(grid: GridInternal<T>, cell: CellAddress, value: string): void;
    onDeleteCellRangeBox(): void;
    protected abstract getState(grid: GridInternal<T>): CheckColumnState;
}

declare abstract class BaseCheckHeader<T> extends BaseHeader<T> {
    drawInternal(value: string, context: CellContext, style: BaseCheckStyle_2, helper: GridCanvasHelperAPI, grid: GridInternal<T>, { drawCellBase }: DrawCellInfo<T>): void;
    protected abstract getState(grid: GridInternal<T>): CheckHeaderState;
    protected abstract getInlineCheck(helper: GridCanvasHelperAPI, checked: boolean, context: CellContext, opt: InlineCheckOption): InlineAPI;
}

declare class BaseCheckStyle extends BaseStdStyle {
    static get DEFAULT(): BaseCheckStyle;
    private _uncheckBgColor?;
    private _checkBgColor?;
    private _borderColor?;
    constructor(style?: BaseCheckStyleOption);
    get uncheckBgColor(): ColorDef | undefined;
    set uncheckBgColor(uncheckBgColor: ColorDef | undefined);
    get checkBgColor(): ColorDef | undefined;
    set checkBgColor(checkBgColor: ColorDef | undefined);
    get borderColor(): ColorDef | undefined;
    set borderColor(borderColor: ColorDef | undefined);
    clone(): BaseCheckStyle;
}

declare class BaseCheckStyle_2 extends Style_2 {
    static get DEFAULT(): BaseCheckStyle_2;
    private _uncheckBgColor?;
    private _checkBgColor?;
    private _borderColor?;
    constructor(style?: HeaderCheckStyleOption);
    get uncheckBgColor(): ColorDef | undefined;
    set uncheckBgColor(uncheckBgColor: ColorDef | undefined);
    get checkBgColor(): ColorDef | undefined;
    set checkBgColor(checkBgColor: ColorDef | undefined);
    get borderColor(): ColorDef | undefined;
    set borderColor(borderColor: ColorDef | undefined);
    clone(): BaseCheckStyle_2;
}

declare interface BaseCheckStyleOption extends BaseStdStyleOption {
    uncheckBgColor?: ColorDef;
    checkBgColor?: ColorDef;
    borderColor?: ColorDef;
}

declare abstract class BaseColumn<T, V> implements ColumnTypeAPI {
    private _convert?;
    private _convertCopy?;
    private _fadeinWhenCallbackInPromise;
    private _hidden?;
    constructor(options?: BaseColumnOption<T>);
    get StyleClass(): typeof BaseStyle_2;
    get fadeinWhenCallbackInPromise(): boolean | undefined;
    get convert(): Convert | undefined;
    get convertCopy(): Convert | undefined;
    get hidden(): boolean | ((record: T) => boolean) | undefined;
    set hidden(hidden: boolean | ((record: T) => boolean) | undefined);
    reviseAttachCellsArea(_rect: Rect, _row: number, _grid: ListGridAPI<T>): void;
    reviseAttachCellsPadding(padding: [number, number, number, number], row: number, grid: ListGridAPI<T>): void;
    reviseFocusRect(_rect: Rect, _row: number, _grid: ListGridAPI<T>): void;
    onDrawCell(cellValue: MaybePromise<unknown>, info: DrawCellInfo<T>, context: CellContext, grid: ListGridAPI<T>): void | Promise<void>;
    abstract clone(): BaseColumn<T, V>;
    abstract drawInternal(value: V, context: CellContext, style: BaseStyle_2, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
    drawMessageInternal(message: Message, context: CellContext, style: BaseStyle_2, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
    bindGridEvent(_grid: ListGridAPI<T>, _cellId: LayoutObjectId): EventListenerId[];
    getCopyCellValue(value: V, _grid: ListGridAPI<T>, _cell: CellAddress): string;
    convertCopyValue(value: unknown, cell: CellAddress, grid: ListGridAPI<T>): V;
    protected doConvertInternal(value: unknown, cell: CellAddress, grid: ListGridAPI<T>): V;
    protected convertInternal(value: unknown): V;
    protected convertCopyInternal(value: unknown): V;
    protected drawEditingInternal(_context: CellContext, _style: BaseStyle_2, _helper: GridCanvasHelperAPI, _grid: ListGridAPI<T>, _info: DrawCellInfo<T>): void;
    private isContentHidden;
}

declare interface BaseColumnOption<T> {
    fadeinWhenCallbackInPromise?: boolean;
    convert?: Convert;
    convertCopy?: Convert;
    hidden?: boolean | ((record: T) => boolean);
}

declare abstract class BaseHeader<T> {
    constructor(_options?: {});
    get StyleClass(): typeof BaseStyle;
    onDrawCell(cellValue: unknown, info: DrawCellInfo<T>, context: CellContext, grid: ListGridAPI<T>): void;
    convertInternal(value: unknown): string;
    abstract drawInternal(value: string, context: CellContext, style: BaseStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
    bindGridEvent(_grid: ListGridAPI<T>, _cellId: LayoutObjectId): EventListenerId[];
}

declare interface BaseHeaderActionOption<T> {
    disabled?: boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
}

declare interface BaseHeaderDefine<T> {
    caption?: string | (() => string);
    headerField?: string;
    headerStyle?: HeaderStyleOption | BaseStyle | null;
    headerType?: HeaderTypeOption | BaseHeader<T> | null;
    headerAction?: HeaderActionOption | BaseAction<T> | null;
    headerIcon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    headerTooltip?: HeaderTooltip<T>;
    headerTooltipType?: HeaderTooltip<T>;
    sort?: OldSortOption<T>;
    colSpan?: number;
    rowSpan?: number;
}

declare abstract class BaseInputEditor<T> extends Editor<T> {
    constructor(options?: EditorOption<T>);
    open(grid: ListGridAPI<T>, cell: CellAddress): boolean;
    abstract clone(): BaseInputEditor<T>;
    abstract onInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    abstract onOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    abstract onChangeSelectCellInternal(grid: ListGridAPI<T>, cell: CellAddress, selected: boolean): void;
    abstract onSetInputAttrsInternal(grid: ListGridAPI<T>, cell: CellAddress, input: HTMLInputElement): void;
    abstract onGridScrollInternal(grid: ListGridAPI<T>): void;
    onBeforeKeydownInternal(_grid: ListGridAPI<T>, _keyCode: number, _e: KeyboardEvent, _cellId: LayoutObjectId): boolean;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
    onPasteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress, value: string): void;
    onDeleteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress): void;
}

declare class BaseStdStyle extends BaseStyle_2 {
    static get DEFAULT(): BaseStdStyle;
    private _textAlign;
    private _textBaseline;
    constructor(style?: BaseStdStyleOption);
    get textAlign(): CanvasTextAlign;
    set textAlign(textAlign: CanvasTextAlign);
    get textBaseline(): CanvasTextBaseline;
    set textBaseline(textBaseline: CanvasTextBaseline);
    clone(): BaseStdStyle;
}

declare class BaseStdStyle_2 extends BaseStyle {
    static get DEFAULT(): BaseStdStyle_2;
    private _textAlign;
    private _textBaseline;
    constructor(style?: BaseStdStyleOption);
    get textAlign(): CanvasTextAlign;
    set textAlign(textAlign: CanvasTextAlign);
    get textBaseline(): CanvasTextBaseline;
    set textBaseline(textBaseline: CanvasTextBaseline);
    clone(): BaseStdStyle_2;
}

declare interface BaseStdStyleOption extends BaseStyleOption {
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

declare class BaseStyle extends EventTarget_2 implements ColumnStyle {
    static get EVENT_TYPE(): {
        CHANGE_STYLE: string;
    };
    static get DEFAULT(): BaseStyle;
    private _bgColor?;
    constructor({ bgColor }?: BaseStyleOption);
    get bgColor(): ColorDef | undefined;
    set bgColor(bgColor: ColorDef | undefined);
    doChangeStyle(): void;
    clone(): BaseStyle;
}

declare class BaseStyle_2 extends EventTarget_2 implements ColumnStyle {
    static get EVENT_TYPE(): {
        CHANGE_STYLE: 'change_style';
    };
    static get DEFAULT(): BaseStyle_2;
    private _bgColor?;
    constructor({ bgColor }?: BaseStyleOption);
    get bgColor(): ColorDef | undefined;
    set bgColor(bgColor: ColorDef | undefined);
    doChangeStyle(): void;
    clone(): BaseStyle_2;
}

declare interface BaseStyleOption {
    bgColor?: ColorDef;
}

declare type BeforeSelectedCellEvent = CellAddress & {
    selected: false;
    after: CellAddress;
};

declare type BorderMode = 'none' | 'content-border' | 'grid-border';

/**
 * BranchGraphColumn
 */
declare class BranchGraphColumn<T> extends BaseColumn<T, unknown> {
    private _start;
    private _cache;
    constructor(options?: BranchGraphColumnOption<T>);
    get StyleClass(): typeof BranchGraphStyle;
    clearCache(grid: GridInternal<T>): void;
    onDrawCell(cellValue: MaybePromise<unknown>, info: DrawCellInfo<T>, context: CellContext, grid: GridInternal<T>): void | Promise<void>;
    clone(): BranchGraphColumn<T>;
    drawInternal(_value: unknown, context: CellContext, style: BranchGraphStyle, helper: GridCanvasHelperAPI, grid: GridInternal<T>, _info: DrawCellInfo<T>): void;
}

declare interface BranchGraphColumnOption<T> extends BaseColumnOption<T> {
    start?: 'top' | 'bottom';
    cache?: boolean;
}

declare type BranchGraphColumnState<T> = Map<FieldDef<T>, {
    timeline: BranchPoint[][];
    branches: string[];
}>;

declare class BranchGraphStyle extends BaseStyle_2 {
    private _branchColors;
    private _margin;
    private _circleSize;
    private _branchLineWidth;
    private _mergeStyle;
    static get DEFAULT(): BranchGraphStyle;
    constructor(style?: BranchGraphStyleOption);
    get branchColors(): ColorDef | ((name: string, index: number) => ColorDef);
    set branchColors(branchColors: ColorDef | ((name: string, index: number) => ColorDef));
    get margin(): number;
    set margin(margin: number);
    get circleSize(): number;
    set circleSize(circleSize: number);
    get branchLineWidth(): number;
    set branchLineWidth(branchLineWidth: number);
    get mergeStyle(): 'straight' | 'bezier';
    set mergeStyle(mergeStyle: 'straight' | 'bezier');
    clone(): BranchGraphStyle;
}

declare interface BranchGraphStyleOption extends BaseStyleOption {
    branchColors?: ColorDef | ((name: string, index: number) => ColorDef);
    margin?: number;
    circleSize?: number;
    branchLineWidth?: number;
    mergeStyle?: 'straight' | 'bezier';
}

declare interface BranchLine {
    readonly fromIndex?: number;
    toIndex?: number;
    readonly colorIndex: number;
    readonly point?: BranchPoint;
}

declare interface BranchPoint {
    readonly index: number;
    readonly commit: boolean;
    lines: BranchLine[];
    readonly tag?: string;
}

declare class ButtonAction<T> extends Action<T> {
    constructor(options?: ButtonActionOption<T>);
    getState(grid: any): any;
}

declare type ButtonActionOption<T> = ActionOption<T>;

declare class ButtonColumn<T> extends Column<T> {
    private _caption?;
    private _linkButton;
    constructor(options?: ButtonColumnOption<T>);
    get StyleClass(): typeof ButtonStyle;
    get caption(): string | undefined;
    withCaption(caption: string): ButtonColumn<T>;
    clone(): ButtonColumn<T>;
    drawInternal(value: string, context: CellContext, style: ButtonStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { getIcon }: DrawCellInfo<T>): void;
    protected convertInternal(value: unknown): string;
}

declare interface ButtonColumnOption<T> extends ColumnOption<T> {
    caption?: string;
    linkButton?: boolean;
}

declare type ButtonColumnState = {
    mouseActiveCell?: CellAddress;
};

declare class ButtonStyle extends Style {
    static get DEFAULT(): ButtonStyle;
    private _buttonBgColor?;
    constructor(style?: ButtonStyleOption);
    get buttonBgColor(): ColorDef | undefined;
    set buttonBgColor(buttonBgColor: ColorDef | undefined);
    clone(): ButtonStyle;
}

declare interface ButtonStyleOption extends StyleOption {
    buttonBgColor?: ColorDef;
}

/**
 * grid data source for caching Promise data
 */
declare class CachedDataSource<T> extends DataSource<T> {
    private _rCache;
    private _fCache;
    static get EVENT_TYPE(): typeof DataSource.EVENT_TYPE;
    static ofArray<T>(array: T[]): CachedDataSource<T>;
    constructor(opt?: DataSourceParam<T>);
    protected getOriginal(index: number): MaybePromiseOrUndef<T>;
    protected getOriginalField<F extends FieldDef<T>>(index: number, field: F): FieldData;
    protected setOriginalField<F extends FieldDef<T>>(index: number, field: F, value: any): MaybePromise<boolean>;
    clearCache(): void;
    protected fieldPromiseCallBackInternal<F extends FieldDef<T>>(index: number, field: F, value: PromiseCacheValue<any>): void;
    protected recordPromiseCallBackInternal(index: number, record: PromiseCacheValue<T>): void;
    dispose(): void;
}

declare type CanToggle = (e: {
    col: number;
    row: number;
    type: CanToggleType;
    treeInfo: TreeInfo;
    event: Event;
}) => boolean;

declare type CanToggleType = ToggledType | 'over';

declare type CanvasHelper = {
    drawButton: typeof drawButton;
    drawCheckbox: typeof drawCheckbox;
    drawInlineImageRect: typeof drawInlineImageRect;
    drawRadioButton: typeof drawRadioButton;
    drawSwitchButton: typeof drawSwitchButton;
    drawSwitchBtn: typeof drawSwitchBtn;
    fillRoundRect: typeof fillRoundRect;
    fillTextRect: typeof fillTextRect;
    measureCheckbox: typeof measureCheckbox;
    measureRadioButton: typeof measureRadioButton;
    roundRect: typeof roundRect;
    strokeColorsRect: typeof strokeColorsRect;
    strokeRoundRect: typeof strokeRoundRect;
    fillCircle: typeof fillCircle;
    strokeCircle: typeof strokeCircle;
};

declare interface CellAddress {
    col: number;
    row: number;
}

declare interface CellContext {
    readonly col: number;
    readonly row: number;
    range: CellRange;
    getContext(): CanvasRenderingContext2D;
    toCurrentContext(): CellContext;
    getDrawRect(): RectProps | null;
    getRect(): RectProps;
    getSelection(): CellSelection;
    setRectFilter(rectFilter: (base: RectProps) => RectProps): void;
}

declare interface CellDefine<T> extends ColumnDefine<T> {
}

declare interface CellRange {
    start: CellAddress;
    end: CellAddress;
}

declare type CellRangeEvent = CellAddress & {
    cellRange: CellRange;
};

declare interface CellSelection {
    border: {
        bottom: boolean;
        left: boolean;
        right: boolean;
        top: boolean;
    };
    dragged: boolean;
    select: CellAddress;
    range: CellRange;
}

declare type CellStyle = AttachCellStyle | (<T>(record: T) => AttachCellStyle);

declare type CellValueEvent = CellAddress & {
    cellValue: any;
};

declare type ChangedHeaderValueCellEvent = CellAddress & {
    field: string;
    value: any;
    oldValue: any;
};

declare type ChangedValueCellEvent<T> = CellAddress & {
    record: T;
    field: FieldDef<T>;
    value: any;
    oldValue: any;
};

declare class CheckColumn<T> extends BaseCheckColumn<T> {
    get StyleClass(): typeof CheckStyle;
    clone(): CheckColumn<T>;
    protected getState(grid: GridInternal<T>): CheckColumnState;
    protected doDrawInternal(helper: GridCanvasHelperAPI, value: boolean, context: CellContext, opt: InlineCheckOption): void;
}

declare type CheckColumnState = {
    elapsed: {
        [key: string]: number;
    };
    block: {
        [key: string]: boolean;
    };
    mouseActiveCell?: CellAddress;
};

declare class CheckEditor<T> extends BaseCheckEditor<T> {
    clone(): CheckEditor<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
}

declare class CheckHeader<T> extends BaseCheckHeader<T> {
    get StyleClass(): typeof CheckHeaderStyle;
    clone(): CheckHeader<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
    protected getInlineCheck(helper: GridCanvasHelperAPI, checked: boolean, context: CellContext, opt: InlineCheckOption): InlineAPI;
}

declare class CheckHeaderAction<T> extends BaseCheckAction<T> {
    clone(): CheckHeaderAction<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
}

declare type CheckHeaderState = {
    elapsed: {
        [key: string]: number;
    };
    block: {
        [key: string]: boolean;
    };
    mouseActiveCell?: CellAddress;
};

declare class CheckHeaderStyle extends BaseCheckStyle_2 {
    static get DEFAULT(): CheckHeaderStyle;
    constructor(style?: CheckHeaderStyleOption);
    clone(): CheckHeaderStyle;
}

declare type CheckHeaderStyleOption = HeaderCheckStyleOption;

declare class CheckStyle extends BaseCheckStyle {
    static get DEFAULT(): CheckStyle;
    constructor(style?: CheckStyleOption);
    clone(): CheckStyle;
}

declare type CheckStyleOption = BaseCheckStyleOption;

declare type ColorDef = CanvasRenderingContext2D['fillStyle'];

declare type ColorPropertyDefine = ColorDef | ((args: StylePropertyFunctionArg) => string) | ((args: StylePropertyFunctionArg) => CanvasGradient) | ((args: StylePropertyFunctionArg) => CanvasPattern);

declare type ColorsDef = ColorDef | (ColorDef | null)[];

declare type ColorsDef_2 = ColorDef | (ColorDef | null)[];

declare type ColorsPropertyDefine = ColorPropertyDefine | (ColorDef | null)[] | ((args: StylePropertyFunctionArg) => (ColorDef | null)[]);

declare class Column<T> extends BaseColumn<T, string> {
    private _draw?;
    private _cellStyle?;
    constructor(options?: ColumnOption<T>);
    get StyleClass(): typeof Style;
    clone(): Column<T>;
    get draw(): DrawCallback | undefined;
    get cellStyle(): CellStyle | undefined;
    reviseAttachCellsArea(rect: Rect, row: number, grid: ListGridAPI<T>): void;
    reviseAttachCellsPadding(padding: [number, number, number, number], row: number, grid: ListGridAPI<T>): void;
    drawInternal(value: string, context: CellContext, style: Style, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { getIcon, getRecord }: DrawCellInfo<T>): void;
}

declare type ColumnActionOption = 'CHECK' | 'check' | 'INPUT' | 'input' | 'SWITCH' | 'switch';

declare interface ColumnData<T> extends WidthData {
    id: LayoutObjectId;
    field?: FieldDef<T>;
    icon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    message?: Message | ((record: T) => Message) | keyof T;
    columnType: BaseColumn<T, any>;
    action?: BaseAction_2<T>;
    style: ColumnStyleOption | null | undefined;
    define: ColumnDefine<T>;
    contentHidden?: boolean | ((record: T) => boolean);
    tooltip?: TooltipOption<T>;
    tooltipType?: TooltipOption<T>;
}

declare interface ColumnDefine<T> extends BaseHeaderDefine<T> {
    field?: FieldDef<T>;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    icon?: ColumnIconOption<T> | ColumnIconOption<T>[];
    message?: Message | ((record: T) => Message) | keyof T;
    columnType?: ColumnTypeOption | BaseColumn<T, any> | null;
    action?: ColumnActionOption | BaseAction_2<T> | null;
    style?: ColumnStyleOption | null;
    contentHidden?: boolean | ((record: T) => boolean);
    disableResize?: boolean;
    tooltip?: TooltipOption<T>;
    tooltipType?: TooltipOption<T>;
}

declare type ColumnFadeinState = {
    activeFadeins?: ((point: number) => void)[];
    cells: {
        [key: string]: {
            opacity: number;
        };
    };
};

declare type ColumnIconOption<T> = FontIcon<T> | ImageIcon<T> | PathIcon<T> | SvgIcon<T> | NamedIcon<T>;

declare interface ColumnMenuItemObjectOptions {
    [value: string]: string;
}

declare interface ColumnMenuItemOption {
    value: any;
    label: string;
    classList?: string[];
    html?: string;
}

declare type ColumnMenuItemOptions = ColumnMenuItemOption[] | SimpleColumnMenuItemOption[] | OldSimpleColumnMenuItemOption[] | string | ColumnMenuItemObjectOptions;

declare interface ColumnOption<T> extends BaseColumnOption<T> {
    draw?: DrawCallback;
    cellStyle?: CellStyle;
}

/**
 * columns
 */
declare const columns: {
    action: {
        ACTIONS: ImmutableActions;
        BaseAction: typeof BaseAction_2;
        Editor: typeof Editor;
        BaseCheckEditor: typeof BaseCheckEditor;
        BaseInputEditor: typeof BaseInputEditor;
        BaseActionInput: typeof BaseActionInput;
        Action: typeof Action;
        CheckEditor: typeof CheckEditor;
        RadioEditor: typeof RadioEditor;
        SwitchEditor: typeof SwitchEditor;
        ButtonAction: typeof ButtonAction;
        SmallDialogInputEditor: typeof SmallDialogInputEditor;
        InlineInputEditor: typeof InlineInputEditor;
        InlineTextAreaEditor: typeof InlineTextAreaEditor;
        InlineLookupEditor: typeof InlineLookupEditor;
        InlineMenuEditor: typeof InlineMenuEditor;
        of: typeof of;
    };
    type: {
        TYPES: {
            DEFAULT: Column<any>;
            NUMBER: NumberColumn<any>;
            CHECK: CheckColumn<any>;
            RADIO: RadioColumn<any>;
            BUTTON: ButtonColumn<any>;
            IMAGE: ImageColumn<any>;
            MULTILINETEXT: MultilineTextColumn<any>;
            DATE: DateColumn<any>;
            LOOKUP: LookupColumn<any, any>;
            SWITCH: SwitchColumn<any>;
            TREE: TreeColumn<any>;
            DRAW: DrawColumn<any>;
        };
        BaseColumn: typeof BaseColumn;
        BaseCheckColumn: typeof BaseCheckColumn;
        Column: typeof Column;
        NumberColumn: typeof NumberColumn;
        CheckColumn: typeof CheckColumn;
        RadioColumn: typeof RadioColumn;
        SwitchColumn: typeof SwitchColumn;
        ButtonColumn: typeof ButtonColumn;
        ImageColumn: typeof ImageColumn;
        PercentCompleteBarColumn: typeof PercentCompleteBarColumn;
        IconColumn: typeof IconColumn;
        BranchGraphColumn: typeof BranchGraphColumn;
        MenuColumn: typeof MenuColumn;
        MultilineTextColumn: typeof MultilineTextColumn;
        DateColumn: typeof DateColumn;
        LookupColumn: typeof LookupColumn;
        TreeColumn: typeof TreeColumn;
        DrawColumn: typeof DrawColumn;
        of: typeof of_2;
    };
    style: {
        EVENT_TYPE: {
            CHANGE_STYLE: "change_style";
        };
        BaseStyle: typeof BaseStyle_2;
        BaseStdStyle: typeof BaseStdStyle;
        BaseCheckStyle: typeof BaseCheckStyle;
        Style: typeof Style;
        NumberStyle: typeof NumberStyle;
        CheckStyle: typeof CheckStyle;
        RadioStyle: typeof RadioStyle;
        SwitchStyle: typeof SwitchStyle;
        ButtonStyle: typeof ButtonStyle;
        ImageStyle: typeof ImageStyle;
        IconStyle: typeof IconStyle;
        PercentCompleteBarStyle: typeof PercentCompleteBarStyle;
        MultilineTextStyle: typeof MultilineTextStyle;
        MenuStyle: typeof MenuStyle;
        DateStyle: typeof DateStyle;
        LookupStyle: typeof LookupStyle;
        TreeStyle: typeof TreeStyle;
        DrawStyle: typeof DrawStyle;
        of: typeof of_3;
    };
};

declare interface ColumnStyle {
    bgColor?: ColorDef;
    doChangeStyle(): void;
    clone(): ColumnStyle;
}

declare type ColumnStyleOption = string | ColumnStyle | BaseStyleOption | BaseStdStyleOption | BaseCheckStyleOption | StyleOption | ButtonStyleOption | CheckStyleOption | SwitchStyleOption | NumberStyleOption | MultilineTextStyleOption | MenuStyleOption | ImageStyleOption | IconStyleOption | BranchGraphStyleOption | PercentCompleteBarStyleOption | LookupStyleOption | TreeStyleOption | DrawStyleOption | ((record: any) => string | ColumnStyle | BaseStyleOption | BaseStdStyleOption | BaseCheckStyleOption | StyleOption | ButtonStyleOption | CheckStyleOption | SwitchStyleOption | NumberStyleOption | MultilineTextStyleOption | MenuStyleOption | ImageStyleOption | IconStyleOption | BranchGraphStyleOption | PercentCompleteBarStyleOption | LookupStyleOption | TreeStyleOption | DrawStyleOption);

declare interface ColumnTypeAPI {
}

declare type ColumnTypeOption = 'DEFAULT' | 'default' | 'NUMBER' | 'number' | 'CHECK' | 'check' | 'BUTTON' | 'button' | 'IMAGE' | 'image' | 'MULTILINETEXT' | 'multilinetext' | 'DATE' | 'date' | 'LOOKUP' | 'lookup' | 'SWITCH' | 'switch' | 'TREE' | 'tree' | 'DRAW' | 'draw';

declare type Convert = <T, V>(value: unknown, displayValue: V, cell: CellAddress, grid: ListGridAPI<T>) => V;

/**
 * core modules
 */
declare const core: {
    DrawGrid: typeof DrawGrid;
    EVENT_TYPE: DrawGridEvents;
};

/**
 * data modules
 */
declare const data: {
    CachedDataSource: typeof CachedDataSource;
    DataSource: typeof DataSource;
    FilterDataSource: typeof FilterDataSource;
    PivotDataSource: typeof PivotDataSource;
    TreeDataSource: typeof TreeDataSource;
};

/**
 * grid data source
 */
declare class DataSource<T> extends EventTarget_2 {
    static get EVENT_TYPE(): {
        readonly REFRESH_DATA: "refresh_data";
        readonly UPDATED_LENGTH: "updated_length";
        readonly UPDATED_ORDER: "updated_order";
        readonly UPDATE_LENGTH: "update_length";
    };
    static EMPTY: DataSource<any>;
    static ofArray<T>(array: T[]): DataSource<T>;
    protected _sortedIndexMap: null | number[];
    private _get;
    private _length;
    private readonly _source;
    constructor(obj?: DataSourceParam<T> | DataSource<T>);
    get source(): any;
    get(index: number): MaybePromiseOrUndef<T>;
    getField<F extends FieldDef<T>>(index: number, field: F): FieldData;
    hasField(index: number, field: FieldDef<T>): boolean;
    setField<F extends FieldDef<T>>(index: number, field: F, value: any): MaybePromise<boolean>;
    sort(field: FieldDef<T>, order: 'desc' | 'asc'): MaybePromise<void>;
    get length(): number;
    set length(length: number);
    refresh(): void;
    get dataSource(): DataSource<T>;
    dispose(): void;
    protected getOriginal(index: number): MaybePromiseOrUndef<T>;
    protected getOriginalField<F extends FieldDef<T>>(index: number, field: F): FieldData;
    protected hasOriginalField(index: number, field: FieldDef<T>): boolean;
    protected setOriginalField<F extends FieldDef<T>>(index: number, field: F, value: any): MaybePromise<boolean>;
    protected fieldPromiseCallBackInternal<F extends FieldDef<T>>(_index: number, _field: F, _value: PromiseCacheValue<any>): void;
    protected recordPromiseCallBackInternal(_index: number, _record: PromiseCacheValue<T>): void;
    protected refreshInternal(): void;
    protected setLength(length: number): void;
}

declare interface DataSourceAPI<T> {
    length: number;
    get(index: number): MaybePromiseOrUndef<T>;
    getField<F extends FieldDef<T>>(index: number, field: F): FieldData;
    hasField(index: number, field: FieldDef<T>): boolean;
    setField<F extends FieldDef<T>>(index: number, field: F, value: any): MaybePromise<boolean>;
    sort(field: FieldDef<T>, order: 'desc' | 'asc'): MaybePromise<void>;
}

declare interface DataSourceParam<T> {
    get: (index: number) => T;
    length: number;
    source?: any;
}

declare class DateColumn<T> extends Column<T> {
    static get defaultFormat(): Intl.DateTimeFormat;
    static set defaultFormat(fmt: Intl.DateTimeFormat);
    private _format?;
    constructor(options?: DateColumnOption<T>);
    get StyleClass(): typeof DateStyle;
    get format(): Intl.DateTimeFormat | undefined;
    clone(): DateColumn<T>;
    withFormat(format: Intl.DateTimeFormat): DateColumn<T>;
    protected convertInternal(value: Date): string;
}

declare interface DateColumnOption<T> extends ColumnOption<T> {
    format?: Intl.DateTimeFormat;
}

declare class DateStyle extends Style {
    static get DEFAULT(): DateStyle;
    constructor(style?: DateStyleOption);
    clone(): DateStyle;
}

declare type DateStyleOption = StyleOption;

declare type DeleteCellEvent = CellAddress & {
    event: KeyboardEvent;
};

declare const DG_EVENT_TYPE: DrawGridEvents;

declare type DragSelectionEvent = {
    dragDone: boolean;
    newRange: CellRange;
    oldRange: CellRange;
};

declare function drawButton(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, option?: DrawButtonOption): void;

declare type DrawButtonOption = {
    backgroundColor?: ColorDef;
    bgColor?: ColorDef;
    radius?: number;
    shadow?: {
        color?: string;
        blur?: number;
        offsetX?: number;
        offsetY?: number;
        offset?: {
            x?: number;
            y?: number;
        };
    };
};

declare type DrawCallback = <T>(value: any, ctx: CanvasRenderingContext2D, info: {
    grid: ListGridAPI<T>;
    record: unknown;
    rect: RectProps;
    col: number;
    row: number;
    selection: CellSelection;
}) => boolean;

declare interface DrawCellInfo<T> {
    getRecord(): unknown;
    getIcon(): ColumnIconOption<T> | ColumnIconOption<T>[] | null;
    getHeaderIcon(): ColumnIconOption<T> | ColumnIconOption<T>[] | null;
    getMessage(): Message;
    messageHandler: MessageHandler<T>;
    style: ColumnStyleOption | HeaderStyleOption | null | undefined;
    clearCellBase(): void;
    drawCellBase(arg?: {
        bgColor?: ColorPropertyDefine;
    }): void;
    drawCellBg(arg?: {
        bgColor?: ColorPropertyDefine;
    }): void;
    drawCellBorder(): void;
    getCell(): CellAddress;
    getContentHidden(): boolean;
}

/**
 * draw Checkbox
 * @param ctx - canvas context
 * @param x - The x coordinate where to start drawing the checkbox (relative to the canvas)
 * @param y - The y coordinate where to start drawing the checkbox (relative to the canvas)
 * @param check - checkbox check status
 * @param option - option
 * @returns
 */
declare function drawCheckbox(ctx: CanvasRenderingContext2D, x: number, y: number, check: number | boolean, { uncheckBgColor, checkBgColor, borderColor, boxSize, }?: DrawCheckboxOption): void;

declare type DrawCheckboxOption = {
    uncheckBgColor?: ColorDef;
    checkBgColor?: ColorDef;
    borderColor?: ColorDef;
    boxSize?: number;
};

declare class DrawColumn<T> extends BaseColumn<T, unknown> {
    private _draw?;
    constructor(options?: DrawColumnOptions<T>);
    get StyleClass(): typeof DrawStyle;
    clone(): DrawColumn<T>;
    get draw(): DrawCallback | undefined;
    drawInternal(value: any, context: CellContext, style: DrawStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { getRecord }: DrawCellInfo<T>): void;
}

declare interface DrawColumnOptions<T> extends BaseColumnOption<T> {
    draw?: DrawCallback;
}

/**
 * DrawGrid
 */
declare abstract class DrawGrid extends EventTarget_2 {
    static get EVENT_TYPE(): typeof DG_EVENT_TYPE;
    private [__2];
    /**
     * constructor
     *
     * <pre>
     * Constructor options
     * -----
     * rowCount: grid row count.default 10
     * colCount: grid col count.default 10
     * frozenColCount: default 0
     * frozenRowCount: default 0
     * defaultRowHeight: default grid row height. default 40
     * defaultColWidth: default grid col width. default 80
     * highlightBorderWidth: default grid highlight border width. default 2
     * parentElement: canvas parentElement
     * font: default font
     * underlayRowCount: default 0
     * underlayColCount: default 0
     * underlayRowHeight: default 'auto'
     * underlayColWidth: default 'auto'
     * underlayBackgroundColor: underlay background color
     * singleSelection: default false
     * disableColumnResize: default false
     * -----
     * </pre>
     */
    constructor(options?: DrawGridConstructorOptions);
    /**
     * Get root element.
     * @returns root element
     */
    getElement(): HTMLElement;
    /**
     * Get canvas element.
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Focus the grid.
     * @returns
     */
    focus(): void;
    hasFocusGrid(): boolean;
    /**
     * Selection instance.
     */
    get selection(): Selection_2;
    /**
     * Number of rows.
     */
    get rowCount(): number;
    set rowCount(rowCount: number);
    /**
     * Number of columns.
     */
    get colCount(): number;
    set colCount(colCount: number);
    /**
     * Number of frozen columns.
     */
    get frozenColCount(): number;
    set frozenColCount(frozenColCount: number);
    /**
     * Number of frozen rows.
     */
    get frozenRowCount(): number;
    set frozenRowCount(frozenRowCount: number);
    /**
     * Default row height.
     *
     */
    get defaultRowHeight(): number;
    set defaultRowHeight(defaultRowHeight: number);
    /**
     * Default column width.
     */
    get defaultColWidth(): string | number;
    set defaultColWidth(defaultColWidth: string | number);
    /**
     * Highlight Border Width.
     */
    get highlightBorderWidth(): string | number;
    set highlightBorderWidth(highlightBorderWidth: string | number);
    /**
     * Font definition as a string.
     */
    get font(): string;
    set font(font: string);
    /**
     * Number of underlay rows.
     */
    get underlayRowCount(): number;
    set underlayRowCount(underlayRowCount: number);
    /**
     * Number of underlay cols.
     */
    get underlayColCount(): number;
    set underlayColCount(underlayColCount: number);
    /**
     * Height of underlay row.
     */
    get underlayRowHeight(): number | 'auto';
    set underlayRowHeight(underlayRowHeight: number | 'auto');
    /**
     * Width of underlay col.
     */
    get underlayColWidth(): number | 'auto';
    set underlayColWidth(underlayColWidth: number | 'auto');
    /**
     * Background color of the underlay.
     */
    get underlayBackgroundColor(): string;
    set underlayBackgroundColor(underlayBackgroundColor: string);
    /**
     * Border color of the grid.
     */
    get borderColor(): string;
    set borderColor(borderColor: string);
    /**
     * Border width of the grid.
     */
    get borderWidth(): number;
    set borderWidth(borderWidth: number);
    /**
     * Border mode of the grid.
     */
    get borderMode(): BorderMode;
    set borderMode(borderMode: BorderMode);
    get keyboardOptions(): DrawGridKeyboardOptions | null;
    set keyboardOptions(keyboardOptions: DrawGridKeyboardOptions | null);
    /**
     * Single selection.
     */
    get singleSelection(): boolean;
    set singleSelection(singleSelection: boolean);
    /**
     * Disable column resize.
     */
    get disableColumnResize(): boolean;
    set disableColumnResize(disableColumnResize: boolean);
    get disableColResize(): boolean;
    set disableColResize(disableColumnResize: boolean);
    get canDragSelection(): boolean | void | undefined;
    configure(name: 'fadeinWhenCallbackInPromise', value?: boolean): boolean;
    /**
     * Apply the changed size.
     * @returns
     */
    updateSize(): void;
    /**
     * Apply the changed scroll size.
     * @returns `true` if there was a change in the scroll size
     */
    updateScroll(): boolean;
    /**
     * Get the row height of the given the row index.
     * @param row - The row index
     * @returns The row height
     */
    getRowHeight(row: number): number;
    /**
     * Set the row height of the given the row index.
     * @param row - The row index
     * @param height - The row height
     * @returns
     */
    setRowHeight(row: number, height: number): void;
    /**
     * Get the column width of the given the column index.
     * @param col - The column index
     * @returns The column width
     */
    getColWidth(col: number): number;
    /**
     * Set the column widtht of the given the column index.
     * @param col - The column index
     * @param width - The column width
     * @returns
     */
    setColWidth(col: number, width: number | string): void;
    /**
     * Get the column max width of the given the column index.
     * @param col - The column index
     * @returns The column max width
     */
    getMaxColWidth(col: number): string | number | undefined;
    /**
     * Set the column max width of the given the column index.
     * @param col - The column index
     * @param maxWidth - The column max width
     * @returns
     */
    setMaxColWidth(col: number, maxWidth: number | string): void;
    /**
     * Get the column min width of the given the column index.
     * @param col - The column index
     * @returns The column min width
     */
    getMinColWidth(col: number): string | number | undefined;
    /**
     * Set the column min width of the given the column index.
     * @param col - The column index
     * @param minWidth - The column min width
     * @returns
     */
    setMinColWidth(col: number, minWidth: number | string): void;
    /**
     * Get the column disable resize of the given the column index.
     * @param col - The column index
     * @returns The column disable resize
     */
    getColDisableResize(col: number): true | undefined;
    /**
     * Set the column disable resize of the given the column index.
     * @param col - The column index
     * @param disableResize - The column disable resize
     * @returns
     */
    setColDisableResize(col: number, disableResize: boolean): void;
    /**
     * Get the rect of the cell.
     * @param col - index of column, of the cell
     * @param row - index of row, of the cell
     * @returns the rect of the cell.
     */
    getCellRect(col: number, row: number): Rect;
    /**
     * Get the relative rectangle of the cell.
     * @param col - index of column, of the cell
     * @param row - index of row, of the cell
     * @returns the rect of the cell.
     */
    getCellRelativeRect(col: number, row: number): Rect;
    /**
     * Get the rectangle of the cells area.
     * @param startCol - index of the starting column, of the cell
     * @param startRow - index of the starting row, of the cell
     * @param endCol - index of the ending column, of the cell
     * @param endRow - index of the ending row, of the cell
     * @returns the rect of the cells.
     */
    getCellsRect(startCol: number, startRow: number, endCol: number, endRow: number): Rect;
    getCellRangeRect(range: CellRange): Rect;
    isFrozenCell(col: number, row: number): {
        row: boolean;
        col: boolean;
    } | null;
    getRowAt(absoluteY: number): number;
    getColAt(absoluteX: number): number;
    getCellAt(absoluteX: number, absoluteY: number): CellAddress;
    /**
     * Scroll to where cell is visible.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    makeVisibleCell(col: number, row: number): void;
    /**
     * Moves the focus cursor to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    setFocusCursor(col: number, row: number): void;
    _updatedSelection(): void;
    /**
     * Focus the cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns
     */
    focusCell(col: number, row: number): void;
    /**
     * Redraws the range of the given cell.
     * @param col - The column index of cell.
     * @param row - The row index of cell.
     * @returns
     */
    invalidateCell(col: number, row: number): void;
    /**
     * Redraws the range of the given cells.
     * @param startCol - index of the starting column, of the cell
     * @param startRow - index of the starting row, of the cell
     * @param endCol - index of the ending column, of the cell
     * @param endRow - index of the ending row, of the cell
     * @returns
     */
    invalidateGridRect(startCol: number, startRow: number, endCol?: number, endRow?: number): void;
    invalidateCellRange(range: CellRange): void;
    /**
     * Redraws the whole grid.
     * @returns
     */
    invalidate(): void;
    /**
     * Get the number of scrollable rows fully visible in the grid. visibleRowCount does not include the frozen rows counted by the frozenRowCount property. It does not include any partially visible rows on the bottom of the grid.
     * @returns
     */
    get visibleRowCount(): number;
    /**
     * Get the number of scrollable columns fully visible in the grid. visibleColCount does not include the frozen columns counted by the frozenColCount property. It does not include any partially visible columns on the right of the grid.
     * @returns
     */
    get visibleColCount(): number;
    /**
     * Get the index of the first row in the scrollable region that is visible.
     * @returns
     */
    get topRow(): number;
    /**
     * Get the index of the first column in the scrollable region that is visible.
     * @returns
     */
    get leftCol(): number;
    /**
     * gets or sets the number of pixels that an element's content is scrolled vertically
     */
    get scrollTop(): number;
    set scrollTop(scrollTop: number);
    /**
     * gets or sets the number of pixels that an element's content is scrolled from its left edge
     */
    get scrollLeft(): number;
    set scrollLeft(scrollLeft: number);
    /**
     * Get the overflowed text in the cell rectangle, from the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns The text overflowing the cell rect.
     */
    getCellOverflowText(col: number, row: number): string | null;
    /**
     * Set the overflowed text in the cell rectangle, to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @param overflowText - The overflowed text in the cell rectangle.
     * @returns
     */
    setCellOverflowText(col: number, row: number, overflowText: string | false): void;
    /**
     * Get the overflowed type in the cell rectangle, from the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @returns The type overflowing the cell rect.
     */
    getCellOverflowType(col: number, row: number): string | null;
    /**
     * Set the overflowed type in the cell rectangle, to the given cell.
     * @param col - The column index.
     * @param row - The row index
     * @param overflowType - The overflowed type in the cell rectangle.
     * @returns
     */
    setCellOverflowType(col: number, row: number, overflowType: string | false): void;
    addDisposable(disposable: IDisposable): void;
    /**
     * Dispose the grid instance.
     * @returns
     */
    dispose(): void;
    getAttachCellsArea(range: CellRange): {
        element: HTMLElement;
        rect: Rect;
        padding: [number, number, number, number];
    };
    onKeyDownMove(evt: KeyboardEvent): void;
    _getMouseAbstractPoint(evt: Event): {
        x: number;
        y: number;
    } | null;
    _getMouseRelativePoint(e: Event): {
        x: number;
        y: number;
    } | null;
    _getColsWidth(startCol: number, endCol: number): number;
    _moveFocusCell(col: number, row: number, shiftKey: boolean, silence?: boolean): void;
    _forceFocusCell(): void;
    _resetColWidthOffset(col: number): void;
    _adjustColWidth(col: number, orgWidth: number): number;
    _getVisibleRect(): Rect;
    _invalidateRect(drawRect: Rect): void;
    _getInitContext(): CanvasRenderingContext2D;
    _toRelativeRect(absoluteRect: Rect): Rect;
    /**
     * Overwrites the definition of a column whose width is set to `auto` with the current auto width formula.
     * @param grid - grid instance
     * @returns
     */
    _storeAutoColWidthExprs(): void;
    resize(): void;
    /**
     * Get the value of cell with the copy action.
     * <p>
     * Please implement
     * </p>
     *
     * @param col - Column index of cell.
     * @param row - Row index of cell.
     * @returns the value of cell
     */
    protected getCopyCellValue(_col: number, _row: number, _range: CellRange): string | Promise<string> | void;
    /**
     * Draw a cell
     * <p>
     * Please implement cell drawing.
     * </p>
     *
     * @param col - Column index of cell.
     * @param row - Row index of cell.
     * @param context - context of cell drawing.
     * @returns
     */
    protected abstract onDrawCell(col: number, row: number, context: CellContext): Promise<void> | void;
    protected bindEventsInternal(): void;
    protected getTargetRowAtInternal(_absoluteY: number): {
        row: number;
        top: number;
    } | void;
    protected getRowsHeightInternal(_startRow: number, _endRow: number): number | void;
    protected getRowHeightInternal(_row: number): number | void;
    protected getScrollHeightInternal(_row?: number): number | void;
    protected getMoveLeftColByKeyDownInternal({ col }: CellAddress): number;
    protected getMoveRightColByKeyDownInternal({ col }: CellAddress): number;
    protected getMoveUpRowByKeyDownInternal({ row }: CellAddress): number;
    protected getMoveDownRowByKeyDownInternal({ row }: CellAddress): number;
    protected getOffsetInvalidateCells(): number;
    protected getCopyRangeInternal(range: CellRange): CellRange;
    protected getAttachCellsAreaInternal(range: CellRange): Rect;
    protected getAttachCellsPaddingInternal(_range: CellRange): [number, number, number, number];
    protected getFocusRectInternal(col: number, row: number): Rect;
    protected getDefaultRowHeight(): number;
    protected getDefaultColWidth(): number;
    protected getHighlightBorderWidth(): number;
    protected updateSelectionRange(range: CellRange): CellRange;
    protected getCellOverflowTextInternal(_cell: CellAddress): string;
    protected getCellOverflowTypeInternal(_cell: CellAddress): string;
    protected getDefaultBorderMode(): string;
    fireListeners<TYPE extends keyof DrawGridEventHandlersEventMap>(type: TYPE, ...event: DrawGridEventHandlersEventMap[TYPE]): DrawGridEventHandlersReturnMap[TYPE][];
    protected abstract getDefaultFont(): string;
    protected abstract getDefaultUnderlayBackgroundColor(): string;
    protected abstract getDefaultBorderColor(): string;
    protected abstract getDefaultBorderWidth(): number;
}

declare interface DrawGridAPI {
    font?: string;
    rowCount: number;
    colCount: number;
    frozenRowCount: number;
    frozenColCount: number;
    defaultRowHeight: number;
    defaultColWidth: string | number;
    highlightBorderWidth: string | number;
    underlayRowCount: number;
    underlayColCount: number;
    underlayRowHeight: number | 'auto';
    underlayColWidth: number | 'auto';
    underlayBackgroundColor?: string;
    keyboardOptions: DrawGridKeyboardOptions | null;
    readonly selection: Selection_3;
    readonly canvas: HTMLCanvasElement;
    readonly visibleRowCount: number;
    readonly visibleColCount: number;
    readonly topRow: number;
    readonly leftCol: number;
    scrollLeft: number;
    scrollTop: number;
    getElement(): HTMLElement;
    focus(): void;
    hasFocusGrid(): boolean;
    listen<TYPE extends keyof DrawGridEventHandlersEventMap>(type: TYPE, listener: (...event: DrawGridEventHandlersEventMap[TYPE]) => DrawGridEventHandlersReturnMap[TYPE]): EventListenerId;
    listen(type: string, listener: AnyListener): EventListenerId;
    readonly canDragSelection: boolean | void | undefined;
    configure(name: 'fadeinWhenCallbackInPromise', value?: boolean): boolean;
    updateSize(): void;
    updateScroll(): boolean;
    invalidate(): void;
    invalidateCell(col: number, row: number): void;
    invalidateGridRect(startCol: number, startRow: number, endCol?: number, endRow?: number): void;
    invalidateCellRange(cellRange: CellRange): void;
    getRowHeight(row: number): number;
    setRowHeight(row: number, height: number): void;
    getColWidth(col: number): number;
    setColWidth(col: number, width: number): void;
    getMaxColWidth(col: number): string | number | undefined;
    setMaxColWidth(col: number, maxwidth: string | number): void;
    getMinColWidth(col: number): string | number | undefined;
    setMinColWidth(col: number, minwidth: string | number): void;
    getCellRect(col: number, row: number): RectProps;
    getCellRelativeRect(col: number, row: number): RectProps;
    getCellsRect(startCol: number, startRow: number, endCol: number, endRow: number): RectProps;
    getCellRangeRect(cellRange: CellRange): RectProps;
    isFrozenCell(col: number, row: number): {
        row: boolean;
        col: boolean;
    } | null;
    getRowAt(absoluteY: number): number;
    getColAt(absoluteX: number): number;
    getCellAt(absoluteX: number, absoluteY: number): CellAddress;
    makeVisibleCell(col: number, row: number): void;
    setFocusCursor(col: number, row: number): void;
    focusCell(col: number, row: number): void;
    getCellOverflowText(col: number, row: number): string | null;
    setCellOverflowText(col: number, row: number, overflowText: false | string): void;
    getCellOverflowType(col: number, row: number): string | null;
    setCellOverflowType(col: number, row: number, overflowText: false | string): void;
    getAttachCellsArea(range: CellRange): {
        element: HTMLElement;
        rect: RectProps;
        padding: [number, number, number, number];
    };
    onKeyDownMove(evt: KeyboardEvent): void;
    dispose(): void;
    addDisposable(disposable: {
        dispose(): void;
    }): void;
    _getMouseRelativePoint(e: Event): {
        x: number;
        y: number;
    } | null;
}

declare interface DrawGridConstructorOptions {
    rowCount?: number;
    colCount?: number;
    frozenColCount?: number;
    frozenRowCount?: number;
    /**
     * Default grid row height. default 40
     */
    defaultRowHeight?: number;
    /**
     * Default grid col width. default 80
     */
    defaultColWidth?: number | string;
    highlightBorderWidth?: number | string;
    font?: string;
    underlayRowCount?: number;
    underlayColCount?: number;
    underlayRowHeight?: number | 'auto';
    underlayColWidth?: number | 'auto';
    underlayBackgroundColor?: string;
    borderMode?: BorderMode;
    borderColor?: string;
    borderWidth?: number;
    keyboardOptions?: DrawGridKeyboardOptions;
    /**
     * Canvas parent element
     */
    parentElement?: HTMLElement | null;
    /**
     * Disable column resizing
     */
    disableColumnResize?: boolean;
    singleSelection?: boolean;
}

declare interface DrawGridEventHandlersEventMap {
    selected_cell: [SelectedCellEvent, boolean];
    mouse_selected_start: [MouseEvent | TouchEvent];
    mouse_selected_end: [MouseEvent | TouchEvent];
    click_cell: [MouseCellEvent];
    click_underlay: [];
    dblclick_cell: [MouseCellEvent];
    dblclick_underlay: [];
    mouseenter_cell: [MousePointerCellEvent & {
        event: Event;
    }];
    mouseleave_cell: [MousePointerCellEvent];
    mouseover_cell: [MousePointerCellEvent & {
        event: Event;
    }];
    mouseout_cell: [MousePointerCellEvent];
    mousemove_cell: [MouseCellEvent];
    mousedown_cell: [MouseCellEvent];
    mouseup_cell: [MouseCellEvent];
    contextmenu_cell: [MouseCellEvent];
    dbltap_cell: [TouchCellEvent];
    dbltap_underlay: [];
    keydown: [KeydownEvent];
    paste_cell: [PasteCellEvent];
    input_cell: [InputCellEvent];
    delete_cell: [DeleteCellEvent];
    scroll: [ScrollEvent];
    editableinput_cell: [CellAddress];
    modify_status_editableinput_cell: [ModifyStatusEditableinputCellEvent];
    focus_grid: [FocusEvent];
    blur_grid: [FocusEvent];
    resize_column: [{
        col: number;
    }];
    copydata: [ClipboardEvent];
    cutdata: [ClipboardEvent];
    pastedata: [string, ClipboardEvent];
    can_drag_selection: [CellRange];
    drag_selection: [DragSelectionEvent];
}

declare interface DrawGridEventHandlersReturnMap {
    selected_cell: boolean | void;
    mouse_selected_start: void;
    mouse_selected_end: void;
    click_cell: void;
    click_underlay: void;
    dblclick_cell: void;
    dblclick_underlay: void;
    mouseenter_cell: void;
    mouseleave_cell: void;
    mouseover_cell: void;
    mouseout_cell: void;
    mousemove_cell: void;
    mousedown_cell: boolean | void;
    mouseup_cell: void;
    contextmenu_cell: void;
    dbltap_cell: void;
    dbltap_underlay: void;
    keydown: boolean | void;
    paste_cell: void;
    input_cell: void;
    delete_cell: void;
    scroll: void;
    editableinput_cell: boolean | void;
    modify_status_editableinput_cell: void;
    focus_grid: void;
    blur_grid: void;
    resize_column: void;
    copydata: string | void;
    cutdata: string | void;
    pastedata: string | void;
    can_drag_selection: boolean | void;
    drag_selection: boolean | void;
}

declare interface DrawGridEvents {
    /**
     * Indicates when the cell was clicked.
     */
    CLICK_CELL: 'click_cell';
    /**
     * Indicates when the cell was double-clicked.
     */
    DBLCLICK_CELL: 'dblclick_cell';
    /**
     * Indicates when the cell was double-taped.
     */
    DBLTAP_CELL: 'dbltap_cell';
    /**
     * Indicates when pointing device button is pressed in a cell.
     */
    MOUSEDOWN_CELL: 'mousedown_cell';
    /**
     * Indicates when pointing device button is released in a cell.
     */
    MOUSEUP_CELL: 'mouseup_cell';
    /**
     * Indicates the cell selection state has changed.
     */
    SELECTED_CELL: 'selected_cell';
    MOUSE_SELECTED_START: 'mouse_selected_start';
    MOUSE_SELECTED_END: 'mouse_selected_end';
    /**
     * Indicates key-downed.
     */
    KEYDOWN: 'keydown';
    MOUSEMOVE_CELL: 'mousemove_cell';
    MOUSEENTER_CELL: 'mouseenter_cell';
    MOUSELEAVE_CELL: 'mouseleave_cell';
    MOUSEOVER_CELL: 'mouseover_cell';
    MOUSEOUT_CELL: 'mouseout_cell';
    /**
     * Indicates when the user attempts to open a context menu in the cell.
     */
    CONTEXTMENU_CELL: 'contextmenu_cell';
    INPUT_CELL: 'input_cell';
    PASTE_CELL: 'paste_cell';
    DELETE_CELL: 'delete_cell';
    EDITABLEINPUT_CELL: 'editableinput_cell';
    MODIFY_STATUS_EDITABLEINPUT_CELL: 'modify_status_editableinput_cell';
    /**
     * Indicates when the column width has changed.
     */
    RESIZE_COLUMN: 'resize_column';
    /**
     * Indicates when scrolled.
     */
    SCROLL: 'scroll';
    FOCUS_GRID: 'focus_grid';
    BLUR_GRID: 'blur_grid';
    CAN_DRAG_SELECTION: 'can_drag_selection';
    DRAG_SELECTION: 'drag_selection';
    CLICK_UNDERLAY: 'click_underlay';
    DBLCLICK_UNDERLAY: 'dblclick_underlay';
    DBLTAP_UNDERLAY: 'dbltap_underlay';
    COPY: 'copydata';
    CUT: 'cutdata';
    PASTE: 'pastedata';
}

declare interface DrawGridKeyboardOptions {
    moveCellOnTab?: boolean;
    moveCellOnEnter?: boolean;
    deleteCellValueOnDel?: boolean;
    selectAllOnCtrlA?: boolean;
    selectAllOptions?: DrawGridKeyboardSelectAllOptions;
}

declare interface DrawGridKeyboardSelectAllOption {
    excludeFrozenRow?: boolean;
    excludeFrozenCol?: boolean;
}

declare interface DrawGridKeyboardSelectAllOptions {
    ctrlA?: DrawGridKeyboardSelectAllOption;
    shiftCtrlA?: DrawGridKeyboardSelectAllOption;
}

declare function drawInlineImageRect(ctx: CanvasRenderingContext2D, image: HTMLImageElement, srcLeft: number, srcTop: number, srcWidth: number, srcHeight: number, destWidth: number, destHeight: number, left: number, top: number, width: number, height: number, { offset, padding }?: DrawInlineImageRectOption): void;

declare type DrawInlineImageRectOption = {
    offset?: number;
    padding?: PaddingOption;
};

/**
 * draw Radio button
 * @param ctx - canvas context
 * @param x - The x coordinate where to start drawing the radio button (relative to the canvas)
 * @param y - The y coordinate where to start drawing the radio button (relative to the canvas)
 * @param check - radio button check status
 * @param option - option
 * @returns
 */
declare function drawRadioButton(ctx: CanvasRenderingContext2D, x: number, y: number, check: number | boolean, { checkColor, borderColor, bgColor, boxSize, }?: DrawRadioButtonOption): void;

declare type DrawRadioButtonOption = {
    checkColor?: ColorDef;
    borderColor?: ColorDef;
    bgColor?: ColorDef;
    boxSize?: number;
};

declare class DrawStyle extends BaseStyle_2 {
    private _appearance;
    static get DEFAULT(): DrawStyle;
    constructor(style?: DrawStyleOption);
    get appearance(): Appearance;
    set appearance(appearance: Appearance);
    clone(): DrawStyle;
}

declare interface DrawStyleOption extends BaseStyleOption {
    appearance?: Appearance;
}

/**
 * draw Switch Button
 * @param ctx - canvas context
 * @param x - The x coordinate where to start drawing the switch (relative to the canvas)
 * @param y - The y coordinate where to start drawing the switch (relative to the canvas)
 * @param check - switch check status
 * @param option - option
 * @returns
 */
declare function drawSwitchBtn(ctx: CanvasRenderingContext2D, x: number, y: number, check: boolean, animElapsedTime: number, { uncheckBgColor, checkBgColor, borderColor, btnSize, }?: DrawSwitchOption): void;

declare function drawSwitchButton(ctx: CanvasRenderingContext2D, x: number, y: number, check: boolean, animElapsedTime: number, { uncheckBgColor, checkBgColor, borderColor, btnSize, }?: DrawSwitchOption): void;

declare type DrawSwitchOption = {
    uncheckBgColor?: ColorDef;
    checkBgColor?: ColorDef;
    borderColor?: ColorDef;
    btnSize?: {
        width: number;
        height: number;
    };
};

declare abstract class Editor<T> extends BaseAction_2<T> {
    protected _readOnly: boolean | ((record: T) => boolean);
    constructor(options?: EditorOption<T>);
    get editable(): boolean;
    get readOnly(): boolean | ((record: T) => boolean);
    set readOnly(readOnly: boolean | ((record: T) => boolean));
    get readonly(): boolean | ((record: T) => boolean);
    set readonly(readOnly: boolean | ((record: T) => boolean));
    protected onChangeReadOnlyInternal(): void;
}

declare interface EditorOption<T> extends BaseActionOption<T> {
    readOnly?: boolean | ((record: T) => boolean);
}

declare function endsWith(str: string, searchString: string, position?: number): boolean;

declare type EventListenerId = number;

/**
 * event target.
 */
declare class EventTarget_2 {
    private [_];
    /**
     * Adds an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns unique id for the listener.
     */
    listen(type: string, listener: AnyListener): EventListenerId;
    /**
     * Removes an event listener which was added with listen() by the id returned by listen().
     * @param id - the id returned by listen().
     * @returns
     */
    unlisten(id: EventListenerId): void;
    /**
     * Adds an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns
     */
    addEventListener(type: string, listener: AnyListener): void;
    /**
     * Removes an event listener.
     * @param type - The event type id.
     * @param listener - Callback method.
     * @returns
     */
    removeEventListener(type: string, listener: AnyListener): void;
    /**
     * @param type - The event type id.
     * @returns
     */
    hasListeners(type: string): boolean;
    /**
     * Fires all registered listeners
     * @param type - The type of the listeners to fire.
     * @param args - fire arguments
     * @returns the result of the last listener
     */
    fireListeners(type: string, ...args: any[]): any[];
    /**
     * @returns
     */
    dispose(): void;
}

declare interface FieldAssessor<T> {
    get: FieldGetter<T>;
    set: FieldSetter<T>;
}

declare type FieldData = MaybePromiseOrUndef<any>;

declare type FieldDef<T> = keyof T | FieldGetter<T> | FieldAssessor<T>;

declare type FieldGetter<T> = (record: T) => any;

declare type FieldSetter<T> = (record: T, value: any) => void;

declare function fillCircle(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number): void;

declare function fillRoundRect(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radius: number): void;

declare function fillTextRect(ctx: CanvasRenderingContext2D, text: string, left: number, top: number, width: number, height: number, { offset, padding }?: FillTextRectOption): void;

declare type FillTextRectOption = {
    offset?: number;
    padding?: PaddingOption;
};

declare type Filter<T> = (record: T | undefined) => boolean;

/**
 * grid data source for filter
 */
declare class FilterDataSource<T> extends DataSource<T> {
    private _dataSource;
    private _handler;
    private _filterData;
    static get EVENT_TYPE(): typeof DataSource.EVENT_TYPE;
    constructor(dataSource: DataSource<T>, filter: Filter<T>);
    get filter(): Filter<T> | null;
    set filter(filter: Filter<T> | null);
    protected getOriginal(index: number): MaybePromiseOrUndef<T>;
    sort(field: FieldDef<T>, order: 'desc' | 'asc'): MaybePromise<void>;
    get source(): any;
    get dataSource(): DataSource<T>;
    dispose(): void;
    protected refreshInternal(): void;
}

declare interface FontIcon<T> {
    font?: string;
    content?: keyof T;
    className?: string;
    tagName?: string;
    isLiga?: boolean;
    width?: number;
    height?: number;
    color?: string;
}

declare type FontPropertyDefine = string | ((args: StylePropertyFunctionArg) => string);

declare function genChars(s: string): {
    next(): string | null;
};

declare function genWords(s: string): GenWordsResult;

declare type GenWordsResult = {
    next(): string | null;
};

declare function getChoices(): {
    [key: string]: Theme;
};

declare function getDefault(): Theme;

declare type GetRadioEditorGroup<T> = (target: {
    grid: ListGridAPI<T>;
    col: number;
    row: number;
}) => CellAddress[];

declare type GetValueResult<T, R> = (value: string, info: {
    grid: ListGridAPI<T>;
    col: number;
    row: number;
}) => R;

declare type GetValueResult_2<T, R> = (value: string, info: {
    grid: ListGridAPI<T>;
    col: number;
    row: number;
}) => R;

declare class GridCanvasHelper<T> implements GridCanvasHelperAPI {
    private _grid;
    private _theme;
    constructor(grid: ListGridAPI<T>);
    createCalculator(context: CellContext, font: string | undefined): {
        calcWidth(width: number | string): number;
        calcHeight(height: number | string): number;
    };
    getColor(color: ColorPropertyDefine, col: number, row: number, ctx: CanvasRenderingContext2D): ColorDef;
    getColor(color: ColorsPropertyDefine, col: number, row: number, ctx: CanvasRenderingContext2D): ColorsDef_2;
    toBoxArray(obj: ColorsDef_2): [ColorDef | null, ColorDef | null, ColorDef | null, ColorDef | null];
    toBoxPixelArray(value: number | string | (number | string)[], context: CellContext, font: string | undefined): [number, number, number, number];
    get theme(): RequiredThemeDefine;
    drawWithClip(context: CellContext, draw: (ctx: CanvasRenderingContext2D) => void): void;
    drawBorderWithClip(context: CellContext, draw: (ctx: CanvasRenderingContext2D) => void): void;
    getTextRect(text: string, context: CellContext, { padding, offset, textAlign, textBaseline, font, textOverflow, icons, }?: {
        padding?: number | string | (number | string)[];
        offset?: number;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): RectProps;
    text(text: string, context: CellContext, { padding, offset, color, textAlign, textBaseline, font, textOverflow, icons, }?: {
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    multilineText(multilines: string[], context: CellContext, { padding, offset, color, textAlign, textBaseline, font, lineHeight, autoWrapText, lineClamp, textOverflow, icons, }?: {
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
        lineHeight?: string | number;
        autoWrapText?: boolean;
        lineClamp?: LineClamp;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    fillText(text: string, x: number, y: number, context: CellContext, { color, textAlign, textBaseline, font, }?: {
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
    }): void;
    clearCell(context: CellContext): void;
    fillCell(context: CellContext, { fillColor, selectionColor, }?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
    }): void;
    fillCellWithState(context: CellContext, option?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
        isEditing?: boolean;
    }): void;
    fillRect(rect: RectProps, context: CellContext, { fillColor, selectionColor, }?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
    }): void;
    fillRectWithState(rect: RectProps, context: CellContext, option?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
    }): void;
    getSelectionColorState(context: CellContext, option?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
    }): ColorPropertyDefine | undefined;
    getFillColorState(context: CellContext, option?: {
        fillColor?: ColorPropertyDefine;
        selectionColor?: ColorPropertyDefine;
    }): ColorPropertyDefine;
    border(context: CellContext, { borderColor, lineWidth, }?: {
        borderColor?: ColorsPropertyDefine;
        lineWidth?: number;
    }): void;
    borderSelection(context: CellContext, option?: {
        borderColor?: ColorsPropertyDefine;
        lineWidth?: number;
        highlightBorderWidth?: number;
        isEditing?: boolean;
    }): void;
    buildCheckBoxInline(check: boolean, context: CellContext, option?: {
        animElapsedTime?: number;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): InlineDrawer;
    buildSwitchBtnInline(check: boolean, context: CellContext, option?: {
        animElapsedTime?: number;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): InlineDrawer;
    checkbox(check: boolean, context: CellContext, option?: {
        animElapsedTime?: number;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): void;
    radioButton(check: boolean, context: CellContext, option?: {
        animElapsedTime?: number;
        checkColor?: ColorPropertyDefine;
        uncheckBorderColor?: ColorPropertyDefine;
        checkBorderColor?: ColorPropertyDefine;
        bgColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): void;
    switch(check: boolean, context: CellContext, option?: {
        animElapsedTime?: number;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): void;
    button(caption: string, context: CellContext, { bgColor, padding, offset, color, textAlign, textBaseline, shadow, font, textOverflow, icons, }?: {
        bgColor?: ColorPropertyDefine;
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        shadow?: DrawButtonOption['shadow'];
        font?: FontPropertyDefine;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    testFontLoad(font: string | undefined, value: string, context: CellContext): boolean;
    tree(text: string, context: CellContext, { font, offset, color, lineColor, buttonColor, buttonBgColor, buttonBorderColor, icons, padding, textAlign, textBaseline, textOverflow, treeInfo, treeNodeSpace, isMultilineText, autoWrapText, lineHeight, lineClamp, }?: {
        font?: FontPropertyDefine;
        offset?: number;
        color?: ColorPropertyDefine;
        lineColor?: ColorPropertyDefine;
        buttonColor?: ColorPropertyDefine;
        buttonBgColor?: ColorPropertyDefine;
        buttonBorderColor?: ColorPropertyDefine;
        icons?: SimpleColumnIconOption[];
        padding?: number | string | (number | string)[];
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        textOverflow?: TextOverflow;
        treeInfo?: TreeInfo;
        treeNodeSpace?: number;
        isMultilineText?: boolean;
        autoWrapText?: boolean;
        lineHeight?: string | number;
        lineClamp?: LineClamp;
    }): void;
    attachArea(rect: RectProps, context: CellContext): void;
}

declare interface GridCanvasHelperAPI {
    theme: RequiredThemeDefine;
    text(text: string | (InlineAPI | string)[], context: CellContext, option: {
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    getTextRect(value: string, context: CellContext, option: {
        font?: FontPropertyDefine;
        icons?: SimpleColumnIconOption[];
        padding?: number | string | (number | string)[];
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        textOverflow?: TextOverflow;
    }): RectProps;
    button(caption: string, context: CellContext, option: {
        bgColor?: ColorPropertyDefine;
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        shadow?: {
            color?: string;
            blur?: number;
            offsetX?: number;
            offsetY?: number;
            offset?: {
                x?: number;
                y?: number;
            };
        };
        font?: FontPropertyDefine;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    checkbox(check: boolean, context: CellContext, option: InlineCheckOption): void;
    radioButton(check: boolean, context: CellContext, option: {
        animElapsedTime?: number;
        bgColor?: ColorPropertyDefine;
        checkColor?: ColorPropertyDefine;
        uncheckBorderColor?: ColorPropertyDefine;
        checkBorderColor?: ColorPropertyDefine;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
    }): void;
    switch(check: boolean, context: CellContext, option: InlineCheckOption): void;
    multilineText(multilines: string[], context: CellContext, option: {
        padding?: number | string | (number | string)[];
        offset?: number;
        color?: ColorPropertyDefine;
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        font?: FontPropertyDefine;
        lineHeight?: string | number;
        autoWrapText?: boolean;
        lineClamp?: LineClamp;
        textOverflow?: TextOverflow;
        icons?: SimpleColumnIconOption[];
    }): void;
    getColor(color: ColorPropertyDefine, col: number, row: number, ctx: CanvasRenderingContext2D): ColorDef;
    getColor(color: ColorsPropertyDefine, col: number, row: number, ctx: CanvasRenderingContext2D): ColorsDef;
    toBoxPixelArray(value: number | string | (number | string)[], context: CellContext, font: string | undefined): [number, number, number, number];
    fillRectWithState(rect: RectProps, context: CellContext, option: {
        fillColor?: ColorPropertyDefine;
    }): void;
    drawBorderWithClip(context: CellContext, draw: (ctx: CanvasRenderingContext2D) => void): void;
    drawWithClip(context: CellContext, draw: (ctx: CanvasRenderingContext2D) => void): void;
    testFontLoad(font: string | undefined, value: string, context: CellContext): boolean;
    buildCheckBoxInline(check: boolean, context: CellContext, option: InlineCheckOption): InlineAPI;
    buildSwitchBtnInline(check: boolean, context: CellContext, option: InlineCheckOption): InlineAPI;
    tree(value: string, context: CellContext, option: {
        font?: string;
        offset?: number;
        color?: ColorPropertyDefine;
        lineColor?: ColorPropertyDefine;
        buttonColor?: ColorPropertyDefine;
        buttonBgColor?: ColorPropertyDefine;
        buttonBorderColor?: ColorPropertyDefine;
        icons?: SimpleColumnIconOption[];
        padding?: number | string | (number | string)[];
        textAlign?: CanvasTextAlign;
        textBaseline?: CanvasTextBaseline;
        textOverflow?: TextOverflow;
        treeInfo?: TreeInfo;
        treeNodeSpace?: number;
        isMultilineText?: boolean;
        autoWrapText?: boolean;
        lineHeight?: string | number;
        lineClamp?: LineClamp;
    }): void;
    attachArea(rect: RectProps, context: CellContext): void;
}

declare interface GridInternal<T> extends ListGridAPI<T> {
    '$$$$col.fadein_stateID symbol$$$$'?: ColumnFadeinState;
    '$$$$col.inline_editing_stateID symbol$$$$'?: InlineEditingState;
    '$$$$btncol.stateID symbol$$$$'?: ButtonColumnState;
    '$$$$chkcol.stateID symbol$$$$'?: CheckColumnState;
    '$$$$swtcol.stateID symbol$$$$'?: CheckColumnState;
    '$$$$rdcol.stateID symbol$$$$'?: RadioColumnState;
    '$$$$branch_graph_col.stateID symbol$$$$'?: BranchGraphColumnState<T>;
    '$$$$inline_menu_editor.stateID symbol$$$$'?: InputEditorState;
    '$$$$inline_input_editor.stateID symbol$$$$'?: InputEditorState;
    '$$$$small_dialog_input_editor.stateID symbol$$$$'?: InputEditorState;
    '$$$$check_header.stateID symbol$$$$'?: CheckHeaderState;
    '$$$$switch_header.stateID symbol$$$$'?: CheckHeaderState;
}

declare interface GroupHeaderDefine<T> extends HeaderDefine<T> {
    columns: HeadersDefine<T>;
}

declare class Header<T> extends BaseHeader<T> {
    get StyleClass(): typeof Style_2;
    drawInternal(value: string, context: CellContext, style: Style_2, helper: GridCanvasHelperAPI, _grid: ListGridAPI<T>, { drawCellBase, getHeaderIcon }: DrawCellInfo<T>): void;
}

declare type HeaderActionOption = 'CHECK' | 'check' | 'SORT' | 'sort' | 'SWITCH' | 'switch';

declare type HeaderBodyLayoutDefine<T> = {
    header: HeaderCellDefine<T>[][];
    body: CellDefine<T>[][];
};

declare interface HeaderCellDefine<T> extends HeaderDefine<T> {
}

declare interface HeaderCheckStyleOption extends HeaderStdStyleOption {
    uncheckBgColor?: ColorDef;
    checkBgColor?: ColorDef;
    borderColor?: ColorDef;
}

declare interface HeaderDefine<T> extends BaseHeaderDefine<T> {
}

/**
 * headers
 */
declare const headers: {
    action: {
        ACTIONS: ImmutableHeaderActions;
        BaseAction: typeof BaseAction;
        BaseCheckAction: typeof BaseCheckAction;
        SortHeaderAction: typeof SortHeaderAction;
        CheckHeaderAction: typeof CheckHeaderAction;
        SwitchHeaderAction: typeof SwitchHeaderAction;
        of: typeof of_4;
        ofCell: typeof ofCell;
    };
    style: {
        BaseStyle: typeof BaseStyle;
        BaseStdStyle: typeof BaseStdStyle_2;
        BaseCheckStyle: typeof BaseCheckStyle_2;
        Style: typeof Style_2;
        SortHeaderStyle: typeof SortHeaderStyle;
        CheckHeaderStyle: typeof CheckHeaderStyle;
        SwitchHeaderStyle: typeof SwitchHeaderStyle;
        MultilineTextHeaderStyle: typeof MultilineTextHeaderStyle;
        of: typeof of_5;
    };
    type: {
        TYPES: {
            DEFAULT: Header<any>;
            SORT: SortHeader<any>;
            CHECK: CheckHeader<any>;
            SWITCH: SwitchHeader<any>;
            MULTILINETEXT: MultilineTextHeader<any>;
        };
        BaseHeader: typeof BaseHeader;
        BaseCheckHeader: typeof BaseCheckHeader;
        Header: typeof Header;
        SortHeader: typeof SortHeader;
        CheckHeader: typeof CheckHeader;
        SwitchHeader: typeof SwitchHeader;
        MultilineTextHeader: typeof MultilineTextHeader;
        of: typeof of_6;
        ofCell: typeof ofCell_2;
    };
};

declare type HeadersDefine<T> = (GroupHeaderDefine<T> | ColumnDefine<T>)[];

declare interface HeaderStdStyleOption extends BaseStdStyleOption {
    color?: ColorDef;
    font?: string;
    padding?: number | string | (number | string)[];
    textOverflow?: TextOverflow;
    lineHeight?: string | number;
    autoWrapText?: boolean;
    lineClamp?: LineClamp;
}

declare type HeaderStyleOption = ColumnStyle | BaseStyleOption | BaseStdStyleOption | HeaderStdStyleOption | HeaderCheckStyleOption | CheckHeaderStyleOption | SwitchHeaderStyleOption | SortHeaderStyleOption | (() => ColumnStyle | BaseStyleOption | BaseStdStyleOption | HeaderStdStyleOption | HeaderCheckStyleOption | CheckHeaderStyleOption | SwitchHeaderStyleOption | SortHeaderStyleOption);

declare type HeaderTooltip<T> = string | ((header: {
    cell: CellAddress;
    field: FieldDef<T>;
}) => string);

declare type HeaderTypeOption = 'DEFAULT' | 'default' | 'SORT' | 'sort' | 'CHECK' | 'check' | 'SWITCH' | 'switch';

declare type HeaderValues = Map<any, any>;

declare function icon(name: string, icon?: IconDefine): IconDefine;

declare class IconColumn<T> extends Column<T> {
    private _tagName;
    private _className?;
    private _content?;
    private _name?;
    private _iconWidth?;
    constructor(options?: IconColumnOption<T>);
    get StyleClass(): typeof IconStyle;
    clone(): IconColumn<T>;
    drawInternal(value: string, context: CellContext, style: IconStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
}

declare interface IconColumnOption<T> extends ColumnOption<T> {
    tagName?: string;
    className?: string;
    content?: string;
    name?: string;
    iconWidth?: number;
}

declare interface IconDefine {
    d: string;
    width: number;
    height: number;
}

declare function icons(icons: {
    [key: string]: IconDefine;
}): void;

declare class IconStyle extends Style {
    static get DEFAULT(): IconStyle;
    constructor(style?: IconStyleOption);
    clone(): IconStyle;
}

declare type IconStyleOption = StyleOption;

declare interface IDisposable {
    dispose: () => void;
}

declare class ImageColumn<T> extends BaseColumn<T, HTMLImageElement> {
    get StyleClass(): typeof ImageStyle;
    onDrawCell(cellValue: MaybePromise<string>, info: DrawCellInfo<T>, context: CellContext, grid: ListGridAPI<T>): MaybePromise<void>;
    clone(): ImageColumn<T>;
    drawInternal(value: HTMLImageElement, context: CellContext, style: ImageStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, _info: DrawCellInfo<T>): void;
}

declare interface ImageIcon<T> {
    src: keyof T | string;
    width?: number;
    height?: number;
}

declare class ImageStyle extends BaseStdStyle {
    static get DEFAULT(): ImageStyle;
    private _margin;
    private _imageSizing?;
    private _appearance?;
    constructor(style?: ImageStyleOption);
    get imageSizing(): 'keep-aspect-ratio' | undefined;
    set imageSizing(imageSizing: 'keep-aspect-ratio' | undefined);
    get margin(): number;
    set margin(margin: number);
    get appearance(): Appearance | undefined;
    set appearance(appearance: Appearance | undefined);
    clone(): ImageStyle;
}

declare interface ImageStyleOption extends BaseStdStyleOption {
    appearance?: Appearance;
    imageSizing?: 'keep-aspect-ratio';
    margin?: number;
}

declare interface ImmutableActions {
    CHECK: ImmutableCheckEditor<any>;
    RADIO: ImmutableRadioEditor<any>;
    INPUT: ImmutableInputEditor<any>;
    SWITCH: ImmutableSwitchEditor<any>;
}

declare class ImmutableCheckEditor<T> extends CheckEditor<T> {
    get disabled(): boolean | ((record: T) => boolean);
    get readOnly(): boolean | ((record: T) => boolean);
}

declare class ImmutableCheckHeaderAction<T> extends CheckHeaderAction<T> {
    get disabled(): boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
}

declare interface ImmutableHeaderActions {
    SORT: ImmutableSortHeaderAction<any>;
    CHECK: ImmutableCheckHeaderAction<any>;
    SWITCH: ImmutableSwitchHeaderAction<any>;
}

declare class ImmutableInputEditor<T> extends SmallDialogInputEditor<T> {
    get disabled(): boolean | ((record: T) => boolean);
    get readOnly(): boolean | ((record: T) => boolean);
}

declare class ImmutableRadioEditor<T> extends RadioEditor<T> {
    get disabled(): boolean | ((record: T) => boolean);
    get readOnly(): boolean | ((record: T) => boolean);
}

declare class ImmutableSortHeaderAction<T> extends SortHeaderAction<T> {
    get disabled(): boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
}

declare class ImmutableSwitchEditor<T> extends SwitchEditor<T> {
    get disabled(): boolean | ((record: T) => boolean);
    get readOnly(): boolean | ((record: T) => boolean);
}

declare class ImmutableSwitchHeaderAction<T> extends SwitchHeaderAction<T> {
    get disabled(): boolean | ((grid: ListGridAPI<T>, cell: CellAddress) => boolean);
}

declare class Inline implements InlineAPI {
    private _content;
    constructor(content?: string);
    width(obj: {
        ctx: CanvasRenderingContext2D;
    }): number;
    font(): string | null;
    color(): ColorDef | null;
    canDraw(): boolean;
    onReady(_callback: AnyFunction): void;
    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom, }: InlineDrawOption): void;
    canBreak(): boolean;
    splitIndex(index: number): {
        before: Inline | null;
        after: Inline | null;
    };
    breakWord(ctx: CanvasRenderingContext2D, width: number): {
        before: Inline | null;
        after: Inline | null;
    };
    breakAll(ctx: CanvasRenderingContext2D, width: number): {
        before: Inline | null;
        after: Inline | null;
    };
    toString(): string;
}

declare interface InlineAPI {
    width(arg: {
        ctx: CanvasRenderingContext2D;
    }): number;
    font(): string | null;
    color(): ColorDef | null;
    canDraw(): boolean;
    onReady(callback: AnyFunction): void;
    draw(opt: any): void;
    canBreak(): boolean;
}

declare interface InlineCheckOption {
    animElapsedTime?: number;
    uncheckBgColor?: ColorPropertyDefine;
    checkBgColor?: ColorPropertyDefine;
    borderColor?: ColorPropertyDefine;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

declare class InlineDrawer extends Inline {
    private _draw;
    private _width;
    private _color?;
    constructor({ draw, width, color, }: {
        draw: InlineDrawerFunction;
        width: number;
        height: number;
        color?: ColorDef;
    });
    width(_arg: {
        ctx: CanvasRenderingContext2D;
    }): number;
    font(): string | null;
    color(): ColorDef | null;
    canDraw(): boolean;
    onReady(_callback: AnyFunction): void;
    draw({ ctx, canvasHelper, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom, }: InlineDrawOption): void;
    canBreak(): boolean;
    toString(): string;
}

declare type InlineDrawerFunction = (options: InlineDrawOption) => void;

declare type InlineDrawOption = {
    ctx: CanvasRenderingContext2D;
    canvasHelper: CanvasHelper;
    rect: RectProps;
    offset: number;
    offsetLeft: number;
    offsetRight: number;
    offsetTop: number;
    offsetBottom: number;
};

declare type InlineEditingState = {
    cellRange?: CellRange;
    inputPadding?: [number, number, number, number];
};

declare class InlineInputEditor<T> extends BaseActionInput<T> {
    private _classList?;
    private _type?;
    private _enabledMouseWheel;
    constructor(options?: InlineInputEditorOption<T>);
    get classList(): string[] | undefined;
    set classList(classList: string[] | undefined);
    get type(): string | undefined;
    set type(type: string | undefined);
    get enabledMouseWheel(): boolean;
    set enabledMouseWheel(enabled: boolean);
    clone(): InlineInputEditor<T>;
    onActionInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onActionOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    onChangeSelectCellInternal(grid: ListGridAPI<T>, _cell: CellAddress, _selected: boolean): void;
    onGridScrollInternal(grid: ListGridAPI<T>): void;
    onChangeDisabledInternal(): void;
    onChangeReadOnlyInternal(): void;
    onSetInputAttrsInternal(grid: ListGridAPI<T>, _cell: CellAddress, input: HTMLInputElement): void;
    protected getState(grid: any): any;
}

declare interface InlineInputEditorOption<T> extends EditorOption<T> {
    classList?: string | string[];
    type?: string;
    enabledMouseWheel?: boolean;
}

declare class InlineLookupEditor<T, L> extends BaseActionInput<T> {
    private _classList?;
    private _records;
    private _valueField;
    private _valueType;
    private _captionField;
    private _filterFields;
    private _allowOtherInput;
    private _disableFilterRecords;
    private _disableFilterSort;
    private _filter?;
    private _dropdownTemplate?;
    private _dropdownEmptyTemplate?;
    constructor(options?: InlineLookupEditorOption<T, L>);
    get classList(): string[] | undefined;
    set classList(classList: string[] | undefined);
    get records(): L[] | ((rec: T) => L[] | Promise<L[]>);
    set records(records: L[] | ((rec: T) => L[] | Promise<L[]>));
    get valueField(): string;
    set valueField(valueField: string);
    get valueType(): "string" | "number";
    set valueType(valueType: "string" | "number");
    get captionField(): string;
    set captionField(captionField: string);
    get filterFields(): string | string[];
    set filterFields(filterFields: string | string[]);
    get allowOtherInput(): boolean | ((rec: T) => boolean);
    set allowOtherInput(allowOtherInput: boolean | ((rec: T) => boolean));
    get disableFilterRecords(): boolean;
    set disableFilterRecords(disableFilterRecords: boolean);
    get disableFilterSort(): boolean;
    set disableFilterSort(disableFilterSort: boolean);
    get disableDropdown(): boolean;
    set disableDropdown(disableDropdown: boolean);
    get filter(): ((lookupRecord: L, record: T) => boolean) | undefined;
    set filter(filter: ((lookupRecord: L, record: T) => boolean) | undefined);
    get dropdownTemplate(): ((...values: any[]) => string) | undefined;
    set dropdownTemplate(dropdownTemplate: ((...values: any[]) => string) | undefined);
    get dropdownEmptyTemplate(): ((...values: any[]) => string) | undefined;
    set dropdownEmptyTemplate(dropdownEmptyTemplate: ((...values: any[]) => string) | undefined);
    clone(): InlineLookupEditor<T, L>;
    onActionInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onActionOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    onChangeSelectCellInternal(_grid: ListGridAPI<T>, _cell: CellAddress, _selected: boolean): void;
    onGridScrollInternal(grid: ListGridAPI<T>): void;
    onChangeDisabledInternal(): void;
    onChangeReadOnlyInternal(): void;
    onSetInputAttrsInternal(grid: ListGridAPI<T>, _cell: CellAddress, input: HTMLInputElement): void;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
    protected getState(grid: any): any;
}

declare interface InlineLookupEditorOption<T, L> extends BaseActionInputOption<T> {
    classList?: string | string[];
    records?: L[] | ((rec: T) => L[] | Promise<L[]>);
    valueField?: string;
    valueType?: 'string' | 'number';
    captionField?: string;
    filterFields?: string | string[];
    allowOtherInput?: boolean | ((rec: T) => boolean);
    disableFilterRecords?: boolean;
    disableFilterSort?: boolean;
    disableDropdown?: boolean;
    filter?: (lookupRecord: L, record: T) => boolean;
    dropdownTemplate?: (...values: any[]) => string;
    dropdownEmptyTemplate?: (...values: any[]) => string;
}

declare class InlineMenuEditor<T> extends Editor<T> {
    private _classList?;
    private _options;
    private _autoWidth;
    constructor(options?: InlineMenuEditorOption<T>);
    dispose(): void;
    get classList(): string[] | undefined;
    set classList(classList: string[] | undefined);
    get options(): (record: T | undefined) => ColumnMenuItemOption[];
    set options(options: (record: T | undefined) => ColumnMenuItemOption[]);
    get autoWidth(): boolean;
    set autoWidth(autoWidth: boolean);
    clone(): InlineMenuEditor<T>;
    onChangeDisabledInternal(): void;
    onChangeReadOnlyInternal(): void;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
    onPasteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress, value: string): void;
    onDeleteCellRangeBox(grid: ListGridAPI<T>, cell: CellAddress): void;
    private _pasteDataToOptionValue;
}

declare interface InlineMenuEditorOption<T> extends EditorOption<T> {
    classList?: string | string[];
    options?: ColumnMenuItemOptions | ((record: T | undefined) => ColumnMenuItemOptions);
    autoWidth?: boolean;
}

declare class InlineTextAreaEditor<T> extends BaseActionInput<T> {
    private _classList;
    constructor(options?: InlineTextAreaEditorOption<T>);
    get classList(): "" | string[];
    set classList(classList: "" | string[]);
    clone(): InlineTextAreaEditor<T>;
    onActionInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onActionOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    onChangeSelectCellInternal(grid: ListGridAPI<T>, cell: CellAddress, selected: any): void;
    onGridScrollInternal(grid: ListGridAPI<T>): void;
    onChangeDisabledInternal(): void;
    onChangeReadOnlyInternal(): void;
    onSetInputAttrsInternal(grid: ListGridAPI<T>, _cell: CellAddress, input: HTMLInputElement): void;
    protected getState(grid: any): any;
}

declare interface InlineTextAreaEditorOption<T> extends BaseActionInputOption<T> {
    classList?: string | string[];
}

declare type InputCellEvent = CellAddress & {
    value: string;
};

declare type InputEditorState = {
    element?: any;
};

declare interface IPivotBase {
    field: string;
}

declare interface IPivotCol extends IPivotBase {
}

declare interface IPivotColumn extends IPivotBase {
    aggregate: aggregateType;
}

declare interface IPivotDataSourceOptions {
    rowPivots: IPivotRow[];
    colPivots: IPivotCol[];
    columns: IPivotColumn[];
}

declare interface IPivotRow extends IPivotBase {
}

declare interface ITreeDataSourceOptions<T> {
    keyField: string;
    parentKeyField: string;
    expandedKeys?: TExpandedKeys;
    hasChildren?: (rec?: T | null) => boolean;
    getChildren?: (rec?: T | null, all?: boolean) => T[] | Promise<T[] | {
        records: T[];
        expandedKeys?: TExpandedKeys;
    }>;
}

declare interface ITreeInfo {
    expanded: boolean;
    isLast: boolean;
    isLeaf: boolean;
    key: any;
    level: number;
    levelLast: boolean[];
    parentKey: any;
}

declare namespace kakaGrid {
    const version: string;
    class ListGrid<T> extends _kakaGrid.ListGrid<T> {
    }
    const core: typeof _kakaGrid.core;
    const tools: typeof _kakaGrid.tools;
    const columns: typeof _kakaGrid.columns;
    const data: typeof _kakaGrid.data;
    const headers: typeof _kakaGrid.headers;
    const themes: typeof _kakaGrid.themes;
    const GridCanvasHelper: typeof _kakaGrid.GridCanvasHelper;
    const icons: {
        [key: string]: IconDefine;
    };
    const template: typeof str.template;
    const register: typeof _kakaGrid.register;
}
export default kakaGrid;

/**
 * Kaka Grid
 */
declare const _kakaGrid: {
    version: string;
    core: typeof core;
    tools: typeof tools;
    ListGrid: typeof ListGrid;
    columns: typeof columns;
    data: typeof data;
    headers: typeof headers;
    themes: typeof themes;
    GridCanvasHelper: typeof GridCanvasHelper;
    readonly icons: {
        [key: string]: IconDefine;
    };
    template: typeof str.template;
    register: typeof register;
};

declare type KeydownEvent = {
    keyCode: number;
    event: KeyboardEvent;
    stopCellMoving(): void;
};

declare type LayoutDefine<T> = HeaderBodyLayoutDefine<T> | ArrayLayoutDefine<T>;

declare type LayoutObjectId = number | string | symbol;

declare const LG_EVENT_TYPE: ListGridEvents;

declare type LineClamp = number | 'auto';

/**
 * ListGrid
 */
declare class ListGrid<T> extends DrawGrid implements ListGridAPI<T> {
    static get EVENT_TYPE(): typeof LG_EVENT_TYPE;
    private [__3];
    /**
     * constructor
     * @param options - Constructor options
     */
    constructor(options?: ListGridConstructorOptions<T>);
    /**
     * Dispose the grid instance.
     * @returns
     */
    dispose(): void;
    /**
     * Define of the header with the given data.
     * <pre>
     * column options
     * -----
     * caption: header caption
     * field: field name
     * width: column width
     * minWidth: column min width
     * maxWidth: column max width
     * disableResize: column disable resize
     * icon: icon name
     * message: message key name
     * columnType: column type
     * action: column action
     * style: column style
     * headerType: header type
     * headerStyle: header style
     * headerAction: header action
     * headerField: header field name
     * sort: define sort setting
     * -----
     *
     * multiline header
     * -----
     * caption: header caption
     * columns: columns define
     * -----
     * </pre>
     */
    get header(): HeadersDefine<T>;
    set header(header: HeadersDefine<T>);
    /**
     * The define of the layout.
     */
    get layout(): LayoutDefine<T>;
    set layout(layout: LayoutDefine<T>);
    /**
     * Get the row count per record
     */
    get recordRowCount(): number;
    /**
     * Records.
     */
    get records(): T[] | null;
    set records(records: T[] | null);
    /**
     * Data source.
     */
    get dataSource(): DataSource<T>;
    set dataSource(dataSource: DataSource<T>);
    /**
     * Theme.
     */
    get theme(): Theme | null;
    set theme(theme: Theme | null);
    /**
     * If set to true to allow pasting of ranges.
     */
    get allowRangePaste(): boolean;
    set allowRangePaste(allowRangePaste: boolean);
    /**
     * Sort state.
     */
    get sortState(): SortState;
    set sortState(sortState: SortState);
    /**
     * Header values.
     */
    get headerValues(): HeaderValues;
    set headerValues(headerValues: HeaderValues);
    /**
     * Whether to hide the column header.
     */
    get hiddenHeader(): boolean;
    set hiddenHeader(hidden: boolean);
    /**
     * Disabled.
     */
    get disabled(): boolean | ((record: T) => boolean);
    set disabled(disabled: boolean | ((record: T) => boolean));
    /**
     * Read Only.
     */
    get readOnly(): boolean | ((record: T) => boolean);
    set readOnly(readOnly: boolean | ((record: T) => boolean));
    get readonly(): boolean | ((record: T) => boolean);
    set readonly(readOnly: boolean | ((record: T) => boolean));
    /**
     * Span Body
     */
    get spanBodyOptions(): ListGridSpanBodyOptions | null;
    set spanBodyOptions(spanBodyOptions: ListGridSpanBodyOptions | null);
    /**
     * Get the field of the given column index.
     * @param col - The column index.
     * @param row - The row index.
     * @returns The field object.
     */
    getField(col: number, row: number): FieldDef<T> | undefined;
    /**
     * Get the column define of the given column index.
     * @param col - The column index.
     * @param row - The row index.
     * @returns The column define object.
     */
    getColumnDefine(col: number, row: number): ColumnDefine<T>;
    getColumnType(col: number, row: number): ColumnTypeAPI;
    /**
     * Get the header field of the given header cell.
     * @param col - The column index.
     * @param row - The header row index.
     * @returns The field object.
     */
    getHeaderField(col: number, row: number): any;
    /**
     * Get the header define of the given header cell.
     * @param col - The column index.
     * @param row - The header row index.
     * @returns The header define object.
     */
    getHeaderDefine(col: number, row: number): HeaderDefine<T>;
    /**
     * Get the column of the given column index.
     * @param col - The column index.
     * @returns The field object.
     */
    getColumn(col: number, row?: number): ColumnData<T>;
    /**
     * Get the record of the given row index.
     * @param row - The row index.
     * @returns The record.
     */
    getRowRecord(row: number): MaybePromiseOrUndef<T>;
    /**
     * Get the record index of the given row index.
     * @param row -  The row index.
     * @returns The record index.
     */
    getRecordIndexByRow(row: number): number;
    /**
     * Get the record index of the given row index.
     * @param row - The row index.
     * @returns The record index.
     */
    getRowRecordIndex(row: number): number;
    /**
     * Gets the row index starting at the given record index.
     * @param index - The record index.
     */
    getRecordStartRowByRecordIndex(index: number): number;
    /**
     * Get the column index of the given field.
     * @param field - The field.
     * @returns The column index.
     */
    getColumnIndexByField(field: FieldDef<T>): number | null;
    /**
     * Get the column index of the given field.
     * @param field - The field.
     * @param index - The record index
     * @returns The column index.
     */
    getCellRangeByField(field: FieldDef<T>, index: number): CellRange | null;
    /**
     * Focus the cell.
     * @param field - The field.
     * @param index - The record index
     * @returns
     */
    focusGridCell(field: any, index: number): void;
    /**
     * Scroll to where cell is visible.
     * @param field - The field.
     * @param index - The record index
     * @returns
     */
    makeVisibleGridCell(field: any, index: number): void;
    /**
     * Select cell range
     */
    selectCellRange(startCol: number, startRow: number, endCol: number, endRow: number): void;
    getGridCanvasHelper(): GridCanvasHelper<T>;
    /**
     * Get cell range information for a given cell.
     * @param col - column index of the cell
     * @param row - row index of the cell
     * @returns cell range info
     */
    getCellRange(col: number, row: number): CellRange;
    /**
     * Get header range information for a given cell.
     * @param col - column index of the cell
     * @param row - row index of the cell
     * @returns cell range info
     */
    getHeaderCellRange(col: number, row: number): CellRange;
    protected getCopyCellValue(col: number, row: number, range?: CellRange): string;
    protected onDrawCell(col: number, row: number, context: CellContext): MaybePromise<void>;
    doGetCellValue(col: number, row: number, valueCallback: (value: any) => void): boolean;
    doChangeValue(col: number, row: number, changeValueCallback: (before: any) => any): any;
    doSetPasteValue(text: string, test?: (data: SetPasteValueTestData<T>) => boolean): void;
    getHeaderValue(col: number, row: number): any | undefined;
    setHeaderValue(col: number, row: number, newValue: any): void;
    getLayoutCellId(col: number, row: number): LayoutObjectId;
    completeEdit(): void;
    protected bindEventsInternal(): void;
    protected getMoveLeftColByKeyDownInternal({ col, row }: CellAddress): number;
    protected getMoveRightColByKeyDownInternal({ col, row, }: CellAddress): number;
    protected getMoveUpRowByKeyDownInternal({ col, row }: CellAddress): number;
    protected getMoveDownRowByKeyDownInternal({ col, row }: CellAddress): number;
    protected getOffsetInvalidateCells(): number;
    protected getCopyRangeInternal(range: CellRange): CellRange;
    protected getAttachCellsAreaInternal(range: CellRange): Rect;
    protected getAttachCellsPaddingInternal(range: CellRange): [number, number, number, number];
    protected getFocusRectInternal(col: number, row: number): Rect;
    protected getCellOverflowTextInternal(cell: CellAddress): string;
    protected getCellOverflowTypeInternal(cell: CellAddress): string;
    protected getDefaultRowHeight(): number;
    protected getDefaultColWidth(): number;
    protected getHighlightBorderWidth(): number;
    protected updateSelectionRange(range: CellRange): CellRange;
    protected getDefaultFont(): string;
    protected getDefaultUnderlayBackgroundColor(): string;
    protected getDefaultBorderColor(): string;
    protected getDefaultBorderWidth(): number;
    fireListeners<TYPE extends keyof ListGridEventHandlersEventMap<T>>(type: TYPE, ...event: ListGridEventHandlersEventMap<T>[TYPE]): ListGridEventHandlersReturnMap[TYPE][];
}

declare interface ListGridAPI<T> extends DrawGridAPI {
    records: T[] | null;
    dataSource: DataSourceAPI<T>;
    theme: RequiredThemeDefine | null;
    sortState: SortState | null;
    headerValues: HeaderValues;
    recordRowCount: number;
    readOnly: boolean | ((record: T) => boolean);
    disabled: boolean | ((record: T) => boolean);
    spanBodyOptions: ListGridSpanBodyOptions | null;
    listen<TYPE extends keyof ListGridEventHandlersEventMap<T>>(type: TYPE, listener: (...event: ListGridEventHandlersEventMap<T>[TYPE]) => ListGridEventHandlersReturnMap[TYPE]): EventListenerId;
    getField(col: number, row: number): FieldDef<T> | undefined;
    getRowRecord(row: number): MaybePromiseOrUndef<T>;
    getRecordIndexByRow(row: number): number;
    getRecordStartRowByRecordIndex(index: number): number;
    getHeaderField(col: number, row: number): any | undefined;
    getHeaderValue(col: number, row: number): any | undefined;
    setHeaderValue(col: number, row: number, newValue: any): void;
    getCellRange(col: number, row: number): CellRange;
    getCellRangeByField(field: FieldDef<T>, index: number): CellRange | null;
    focusGridCell(field: FieldDef<T>, index: number): void;
    makeVisibleGridCell(field: FieldDef<T>, index: number): void;
    selectCellRange(startCol: number, startRow: number, endCol: number, endRow: number): void;
    getGridCanvasHelper(): GridCanvasHelperAPI;
    doChangeValue(col: number, row: number, changeValueCallback: (before: any) => any): MaybePromise<boolean>;
    doGetCellValue(col: number, row: number, valueCallback: (value: any) => void): boolean;
    doSetPasteValue(text: string): void;
    doSetPasteValue(text: string, test: (data: SetPasteValueTestData<T>) => boolean): void;
    getLayoutCellId(col: number, row: number): LayoutObjectId;
    getColumnType(col: number, row: number): ColumnTypeAPI;
}

declare interface ListGridConstructorOptions<T> extends DrawGridConstructorOptions {
    /**
     * Simple header property
     */
    header?: HeadersDefine<T>;
    /**
     * Layout property
     */
    layout?: LayoutDefine<T>;
    /**
     * Header row height(s)
     */
    headerRowHeight?: number[] | number;
    /**
     * Hidden header
     */
    hiddenHeader?: boolean;
    /**
     * Records data source
     */
    dataSource?: DataSource<T>;
    /**
     * Simple records data
     */
    records?: T[];
    /**
     * Theme
     */
    theme?: ThemeDefine | string;
    /**
     * If set to true to allow pasting of ranges. default false
     */
    allowRangePaste?: boolean;
    /**
     * @deprecated Cannot be used with ListGrid.
     * @override
     */
    rowCount?: undefined;
    /**
     * @deprecated Cannot be used with ListGrid.
     * @override
     */
    colCount?: undefined;
    /**
     * @deprecated Cannot be used with ListGrid.
     * @override
     */
    frozenRowCount?: undefined;
    disabled?: boolean | ((record: T) => boolean);
    readonly?: boolean | ((record: T) => boolean);
    spanBodyOptions?: ListGridSpanBodyOptions;
    monitorResize?: boolean;
}

declare interface ListGridEventHandlersEventMap<T> extends DrawGridEventHandlersEventMap {
    changed_value: [ChangedValueCellEvent<T>];
    changed_header_value: [ChangedHeaderValueCellEvent];
    cell_range: [CellRangeEvent];
    cell_value: [CellValueEvent];
}

declare interface ListGridEventHandlersReturnMap extends DrawGridEventHandlersReturnMap {
    changed_value: void;
    changed_header_value: void;
    cell_range: void;
    cell_value: void;
}

declare interface ListGridEvents extends DrawGridEvents {
    /**
     * Indicates when the cell value was changed.
     */
    CHANGED_VALUE: 'changed_value';
    /**
     * Indicates when the header cell value was changed.
     */
    CHANGED_HEADER_VALUE: 'changed_header_value';
    /**
     * Indicates when get the cell range.
     */
    CELL_RANGE: 'cell_range';
    /**
     * Indicates when get the cell value.
     */
    CELL_VALUE: 'cell_value';
}

declare interface ListGridSpanBodyOptions {
    startCol: number;
    endCol: number;
}

declare class LookupColumn<T, L> extends BaseColumn<T, string> {
    private _records?;
    private _lookupMap;
    private _valueField?;
    private _captionField?;
    private _draw?;
    private _cellStyle?;
    constructor(options?: LookupColumnOption<T, L>);
    get StyleClass(): typeof LookupStyle;
    get records(): L[] | ((rec: T) => L[] | Promise<L[]>) | undefined;
    get valueField(): string | undefined;
    get captionField(): string | undefined;
    get draw(): DrawCallback | undefined;
    get cellStyle(): CellStyle | undefined;
    reviseAttachCellsArea(rect: Rect, row: number, grid: ListGridAPI<T>): void;
    reviseAttachCellsPadding(padding: [number, number, number, number], row: number, grid: ListGridAPI<T>): void;
    clone(): LookupColumn<T, L>;
    drawInternal(value: any, context: CellContext, style: LookupStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
    convertCopyInternal(value: unknown): string;
    protected convertInternal(value: any): string;
    protected doConvertInternal(value: unknown, _cell: CellAddress, _grid: ListGridAPI<T>): string;
    private _convertInternalValue;
    private _convertInternal;
    private _mergeRecords;
}

declare interface LookupColumnOption<T, L> extends BaseColumnOption<T> {
    draw?: DrawCallback;
    records?: L[] | ((rec: T) => L[] | Promise<L[]>);
    valueField?: string;
    captionField?: string;
    cellStyle?: CellStyle;
}

declare class LookupStyle extends Style {
    static get DEFAULT(): LookupStyle;
    constructor(style?: LookupStyleOption);
    clone(): LookupStyle;
}

declare type LookupStyleOption = StyleOption;

declare type MaybePromise<T> = T | Promise<T>;

declare type MaybePromiseOrUndef<T> = T | undefined | Promise<T | undefined>;

/**
 * Returns an object containing the width of the checkbox.
 * @param ctx - canvas context
 * @returns Object containing the width of the checkbox
 */
declare function measureCheckbox(ctx: CanvasRenderingContext2D): {
    width: number;
};

/**
 * Returns an object containing the width of the radio button.
 * @param ctx - canvas context
 * @returns Object containing the width of the radio button
 */
declare function measureRadioButton(ctx: CanvasRenderingContext2D): {
    width: number;
};

declare class MenuColumn<T> extends BaseColumn<T, unknown> {
    private _options;
    constructor(options?: MenuColumnOption<T>);
    get StyleClass(): typeof MenuStyle;
    get options(): SimpleColumnMenuItemOption[];
    clone(): MenuColumn<T>;
    withOptions(options: ColumnMenuItemOptions): MenuColumn<T>;
    drawInternal(value: string, context: CellContext, style: MenuStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { getCell, getIcon }: DrawCellInfo<T>): void;
    protected convertInternal(value: unknown): unknown;
    private _convertInternal;
    getCopyCellValue(value: unknown, grid: ListGridAPI<T>, cell: CellAddress): string;
}

declare interface MenuColumnOption<T> extends BaseColumnOption<T> {
    options?: ColumnMenuItemOptions;
}

declare class MenuStyle extends Style {
    static get DEFAULT(): MenuStyle;
    constructor(style?: MenuStyleOption);
    clone(): MenuStyle;
}

declare interface MenuStyleOption extends StyleOption {
}

declare type Message = MessageObject | string;

declare interface MessageHandler<T> {
    drawCellMessage(message: Message, context: CellContext, style: ColumnStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
}

declare interface MessageObject {
    type: 'error' | 'info' | 'warning';
    message: string | null;
    original?: Message;
}

declare type ModifyStatusEditableinputCellEvent = CellAddress & {
    input: HTMLInputElement;
};

declare type MouseCellEvent = CellAddress & {
    event: MouseEvent;
};

declare type MousePointerCellEvent = CellAddress & {
    related?: CellAddress;
};

declare type MultilineText = boolean | (<T>(record: T) => boolean);

declare class MultilineTextColumn<T> extends BaseColumn<T, string> {
    private _draw?;
    private _cellStyle?;
    constructor(options?: MultilineTextColumnOption<T>);
    get StyleClass(): typeof MultilineTextStyle;
    clone(): MultilineTextColumn<T>;
    get draw(): DrawCallback | undefined;
    get cellStyle(): CellStyle | undefined;
    reviseAttachCellsArea(rect: Rect, row: number, grid: ListGridAPI<T>): void;
    reviseAttachCellsPadding(padding: [number, number, number, number], row: number, grid: ListGridAPI<T>): void;
    drawInternal(value: string, context: CellContext, style: MultilineTextStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { getIcon, getRecord }: DrawCellInfo<T>): void;
}

declare interface MultilineTextColumnOption<T> extends BaseColumnOption<T> {
    draw?: DrawCallback;
    cellStyle?: CellStyle;
}

declare class MultilineTextHeader<T> extends BaseHeader<T> {
    get StyleClass(): typeof MultilineTextHeaderStyle;
    clone(): MultilineTextHeader<T>;
    drawInternal(value: string, context: CellContext, style: MultilineTextHeaderStyle, helper: GridCanvasHelperAPI, _grid: GridInternal<T>, { drawCellBase }: DrawCellInfo<T>): void;
}

declare class MultilineTextHeaderStyle extends Style_2 {
    static get DEFAULT(): MultilineTextHeaderStyle;
    constructor(style?: MultilineTextHeaderStyleOption);
    clone(): MultilineTextHeaderStyle;
}

declare interface MultilineTextHeaderStyleOption extends HeaderStdStyleOption {
}

declare class MultilineTextStyle extends Style {
    static get DEFAULT(): MultilineTextStyle;
    private _lineHeight;
    private _autoWrapText;
    private _lineClamp;
    constructor(style?: MultilineTextStyleOption);
    clone(): MultilineTextStyle;
    get lineHeight(): string | number;
    set lineHeight(lineHeight: string | number);
    get lineClamp(): LineClamp;
    set lineClamp(lineClamp: LineClamp);
    get autoWrapText(): boolean;
    set autoWrapText(autoWrapText: boolean);
}

declare interface MultilineTextStyleOption extends StyleOption {
    lineHeight?: string | number;
    autoWrapText?: boolean;
    lineClamp?: LineClamp;
}

declare interface NamedIcon<T> {
    name: keyof T | string;
    width?: number;
    height?: number;
}

declare class NumberColumn<T> extends Column<T> {
    static get defaultFormat(): Intl.NumberFormat;
    static set defaultFormat(fmt: Intl.NumberFormat);
    private _format?;
    constructor(options?: NumberColumnOption<T>);
    get StyleClass(): typeof NumberStyle;
    get format(): Intl.NumberFormat | undefined;
    clone(): NumberColumn<T>;
    withFormat(format: Intl.NumberFormat): NumberColumn<T>;
    protected convertInternal(value: unknown): string;
}

declare interface NumberColumnOption<T> extends ColumnOption<T> {
    format?: Intl.NumberFormat;
}

declare class NumberStyle extends Style {
    static get DEFAULT(): NumberStyle;
    constructor(style?: NumberStyleOption);
    clone(): NumberStyle;
}

declare type NumberStyleOption = StyleOption;

declare function of<T>(columnAction: ColumnActionOption | BaseAction_2<T> | null | undefined): BaseAction_2<T> | undefined;

declare function of_2<T>(columnType: ColumnTypeOption | BaseColumn<T, any> | null | undefined): BaseColumn<T, any>;

declare function of_3(columnStyle: ColumnStyleOption | null | undefined, record: any, StyleClassDef?: typeof BaseStyle_2): BaseStyle_2;

declare function of_4<T>(headerAction: HeaderActionOption | BaseAction<T> | null | undefined): BaseAction<T> | undefined;

declare function of_5<T>(headerStyle: HeaderStyleOption | null | undefined, headerValues: T, StyleClass: typeof BaseStyle): BaseStyle;

declare function of_6<T>(headerType: HeaderTypeOption | BaseHeader<T> | null | undefined): BaseHeader<T>;

declare function of_7(value: ThemeDefine | string | undefined | null): Theme | null;

declare function ofCell<T>(headerCell: BaseHeaderDefine<T>): BaseAction<T> | undefined;

declare function ofCell_2<T>(headerCell: BaseHeaderDefine<T>): BaseHeader<T>;

declare interface OldSimpleColumnMenuItemOption {
    value: any;
    caption: string;
}

declare type OldSortOption<T> = boolean | ((order: 'asc' | 'desc', col: number, grid: ListGridAPI<T>) => void);

declare type PaddingOption = {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};

declare type PartialThemeDefine = Partial<ThemeDefine>;

declare type PasteCellEvent = CellAddress & {
    value: string;
    normalizeValue: string;
    multi: boolean;
    rangeBoxValues: PasteRangeBoxValues;
    event: ClipboardEvent;
};

declare interface PasteRangeBoxValues {
    readonly colCount: number;
    readonly rowCount: number;
    getCellValue(offsetCol: number, offsetRow: number): string;
}

declare interface PathIcon<T> {
    path: keyof T | string;
    width: number;
    height: number;
    color?: string;
}

declare class PercentCompleteBarColumn<T> extends Column<T> {
    private _min;
    private _max;
    private _formatter;
    constructor(options?: PercentCompleteBarColumnOption<T>);
    get StyleClass(): typeof PercentCompleteBarStyle;
    clone(): PercentCompleteBarColumn<T>;
    drawInternal(value: string, context: CellContext, style: PercentCompleteBarStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
}

declare interface PercentCompleteBarColumnOption<T> extends ColumnOption<T> {
    min?: number;
    max?: number;
    formatter?: (value: string) => string;
}

declare class PercentCompleteBarStyle extends Style {
    static get DEFAULT(): PercentCompleteBarStyle;
    private _barColor;
    private _barBgColor;
    private _barHeight;
    constructor(style?: PercentCompleteBarStyleOption);
    get barColor(): ColorDef | ((num: number) => ColorDef);
    set barColor(barColor: ColorDef | ((num: number) => ColorDef));
    get barBgColor(): ColorDef;
    set barBgColor(barBgColor: ColorDef);
    get barHeight(): number;
    set barHeight(barHeight: number);
    clone(): PercentCompleteBarStyle;
}

declare interface PercentCompleteBarStyleOption extends StyleOption {
    barColor?: ColorDef | ((num: number) => ColorDef);
    barBgColor?: ColorDef;
    barHeight?: number;
}

/**
 * grid data source for pivot
 */
declare class PivotDataSource<T> extends DataSource<T> {
    static get EVENT_TYPE(): {
        readonly REFRESH_DATA: "refresh_data";
        readonly UPDATED_LENGTH: "updated_length";
        readonly UPDATED_ORDER: "updated_order";
        readonly UPDATE_LENGTH: "update_length";
    };
    private _dataSource;
    private _options;
    private _records;
    private _keysMap;
    private _distinctMap;
    constructor(dataSource: DataSource<T>, options: IPivotDataSourceOptions);
    get options(): IPivotDataSourceOptions;
    protected getOriginal(index: number): T;
    refresh(): void;
}

declare type PromiseCacheValue<V> = MaybePromiseOrUndef<V>;

declare class RadioColumn<T> extends BaseColumn<T, boolean> {
    get StyleClass(): typeof RadioStyle;
    clone(): RadioColumn<T>;
    convertInternal(value: unknown): boolean;
    drawInternal(value: boolean, context: CellContext, style: RadioStyle, helper: GridCanvasHelperAPI, grid: GridInternal<T>, _info: DrawCellInfo<T>): void;
}

declare type RadioColumnState = {
    elapsed: {
        [key: string]: number;
    };
    block: {
        [key: string]: boolean;
    };
    mouseActiveCell?: CellAddress;
};

declare class RadioEditor<T> extends Editor<T> {
    protected _group: GetRadioEditorGroup<T>;
    constructor(option?: RadioEditorOption<T>);
    clone(): RadioEditor<T>;
    get group(): GetRadioEditorGroup<T>;
    set group(group: GetRadioEditorGroup<T>);
    bindGridEvent(grid: GridInternal<T>, cellId: LayoutObjectId): EventListenerId[];
    onPasteCellRangeBox(grid: GridInternal<T>, cell: CellAddress, value: string): void;
    onDeleteCellRangeBox(): void;
    private _action;
}

declare interface RadioEditorOption<T> extends EditorOption<T> {
    group?: GetRadioEditorGroup<T>;
}

declare class RadioStyle extends BaseStdStyle {
    static get DEFAULT(): RadioStyle;
    private _checkColor?;
    private _uncheckBorderColor?;
    private _checkBorderColor?;
    private _uncheckBgColor?;
    private _checkBgColor?;
    constructor(style?: RadioStyleOption);
    get checkColor(): ColorDef | undefined;
    set checkColor(checkColor: ColorDef | undefined);
    get uncheckBorderColor(): ColorDef | undefined;
    set uncheckBorderColor(uncheckBorderColor: ColorDef | undefined);
    get checkBorderColor(): ColorDef | undefined;
    set checkBorderColor(checkBorderColor: ColorDef | undefined);
    get uncheckBgColor(): ColorDef | undefined;
    set uncheckBgColor(uncheckBgColor: ColorDef | undefined);
    get checkBgColor(): ColorDef | undefined;
    set checkBgColor(checkBgColor: ColorDef | undefined);
    clone(): RadioStyle;
}

declare interface RadioStyleOption extends BaseStdStyleOption {
    checkColor?: ColorDef;
    uncheckBorderColor?: ColorDef;
    checkBorderColor?: ColorDef;
    uncheckBgColor?: ColorDef;
    checkBgColor?: ColorDef;
}

declare class Rect {
    static bounds(left: number, top: number, right: number, bottom: number): Rect;
    static max(rect1: Rect, rect2: Rect): Rect;
    private _left;
    private _top;
    private _width;
    private _height;
    private _right;
    private _bottom;
    constructor(left: number, top: number, width: number, height: number);
    get left(): number;
    set left(left: number);
    get top(): number;
    set top(top: number);
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    get right(): number;
    set right(right: number);
    get bottom(): number;
    set bottom(bottom: number);
    offsetLeft(offset: number): void;
    offsetTop(offset: number): void;
    copy(): Rect;
    intersection(rect: Rect): Rect | null;
    contains(another: Rect): boolean;
    inPoint(x: number, y: number): boolean;
}

declare interface RectProps {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
}

declare const register: {
    theme: typeof theme;
    icon: typeof icon;
    icons: typeof icons;
};

declare type RequiredThemeDefine = Required<ThemeDefine> & {
    checkbox: Required<ThemeDefine['checkbox']>;
    radioButton: Required<ThemeDefine['radioButton']>;
    button: Required<ThemeDefine['button']>;
    header: Required<ThemeDefine['header']>;
    switch: Required<ThemeDefine['switch']>;
    tree: Required<ThemeDefine['tree']>;
};

declare function roundRect(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radius: number): void;

declare type ScrollEvent = {
    event: Event;
};

declare type SelectedCellEvent = BeforeSelectedCellEvent | AfterSelectedCellEvent;

/**
 * Selected area management
 */
declare class Selection_2 extends EventTarget_2 {
    private _grid;
    private _sel;
    private _focus;
    private _start;
    private _end;
    private _drag?;
    private _isWraped;
    private _updateRange;
    constructor(grid: DrawGrid, updateRange: (range: CellRange) => CellRange);
    get range(): CellRange;
    set range(range: CellRange);
    get focus(): CellAddress;
    get select(): CellAddress;
    set select(cell: CellAddress);
    get dragging(): boolean;
    get drag(): {
        readonly select: {
            col: number;
            row: number;
        };
        readonly range: {
            end: {
                col: number;
                row: number;
            };
            start: {
                col: number;
                row: number;
            };
        };
        inRange(col: number, row: number): boolean;
        inDrag(col: number, row: number): boolean;
    };
    inRange(col: number, row: number): boolean;
    border(col: number, row: number): {
        bottom: boolean;
        left: boolean;
        right: boolean;
        top: boolean;
    };
    fireSelectedEvent(): void;
    startDrag(): void;
    stopDrag(): void;
    _updateGridRange(): boolean;
    _setFocusCell(col: number, row: number, keepSelect: boolean): void;
    _forceUpdateRange(): void;
    private _setSelectCell;
    private _wrapFireSelectedEvent;
}

declare interface Selection_3 {
    select: CellAddress;
    range: CellRange;
}

declare function setDefault(defaultTheme: Theme): void;

declare type SetPasteValueTestData<T> = CellAddress & {
    grid: ListGridAPI<T>;
    record: T;
    value: string;
    oldValue: any;
};

declare type SimpleColumnIconOption = {
    content?: string;
    font?: string;
    color?: ColorDef;
    className?: string;
    tagName?: string;
    isLiga?: boolean;
    width?: number;
    src?: MaybePromise<string>;
    svg?: string;
    name?: string;
    path?: string;
};

declare interface SimpleColumnMenuItemOption {
    value: any;
    label: string;
}

declare class SmallDialogInputEditor<T> extends BaseInputEditor<T> {
    private _helperText?;
    private _inputValidator?;
    private _validator?;
    private _classList?;
    private _type?;
    constructor(options?: SmallDialogInputEditorOption<T>);
    dispose(): void;
    get classList(): string[] | undefined;
    set classList(classList: string[] | undefined);
    get type(): string | undefined;
    set type(type: string | undefined);
    get helperText(): string | GetValueResult_2<T, string> | undefined;
    get inputValidator(): GetValueResult_2<T, MaybePromise<string>> | undefined;
    get validator(): GetValueResult_2<T, MaybePromise<string>> | undefined;
    clone(): SmallDialogInputEditor<T>;
    onInputCellInternal(grid: ListGridAPI<T>, cell: CellAddress, inputValue: string): void;
    onOpenCellInternal(grid: ListGridAPI<T>, cell: CellAddress): void;
    onChangeSelectCellInternal(grid: ListGridAPI<T>, cell: CellAddress, selected: any): void;
    onGridScrollInternal(grid: ListGridAPI<T>): void;
    onChangeDisabledInternal(): void;
    onChangeReadOnlyInternal(): void;
    onSetInputAttrsInternal(grid: ListGridAPI<T>, cell: CellAddress, input: HTMLInputElement): void;
}

declare interface SmallDialogInputEditorOption<T> extends EditorOption<T> {
    classList?: string | string[];
    type?: string;
    helperText?: string | GetValueResult<T, string>;
    inputValidator?: GetValueResult<T, MaybePromise<string>>;
    validator?: GetValueResult<T, MaybePromise<string>>;
}

declare class SortHeader<T> extends BaseHeader<T> {
    get StyleClass(): typeof SortHeaderStyle;
    drawInternal(value: string, context: CellContext, style: SortHeaderStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, { drawCellBase }: DrawCellInfo<T>): void;
}

declare class SortHeaderAction<T> extends BaseAction<T> {
    private _sort;
    constructor(option?: SortHeaderActionOption<T>);
    get sort(): SortOption<T>;
    set sort(sort: SortOption<T>);
    clone(): SortHeaderAction<T>;
    private _executeSort;
    bindGridEvent(grid: ListGridAPI<T>, cellId: LayoutObjectId): EventListenerId[];
}

declare interface SortHeaderActionOption<T> extends BaseHeaderActionOption<T> {
    sort?: SortOption<T>;
}

declare class SortHeaderStyle extends Style_2 {
    static get DEFAULT(): SortHeaderStyle;
    private _sortArrowColor?;
    constructor(style?: SortHeaderStyleOption);
    get sortArrowColor(): ColorDef | undefined;
    set sortArrowColor(sortArrowColor: ColorDef | undefined);
    clone(): SortHeaderStyle;
}

declare interface SortHeaderStyleOption extends HeaderStdStyleOption {
    sortArrowColor?: ColorDef;
}

declare type SortOption<T> = boolean | ((arg: {
    order: 'asc' | 'desc';
    col: number;
    row: number;
    grid: ListGridAPI<T>;
}) => void);

declare interface SortState {
    col: number;
    row: number;
    order: 'asc' | 'desc' | undefined;
}

declare const str: {
    endsWith: typeof endsWith;
    genChars: typeof genChars;
    genWords: typeof genWords;
    escape: (html: string) => string;
    template: (strings: TemplateStringsArray, ...keys: any[]) => (...values: any[]) => string;
};

declare function strokeCircle(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number): void;

declare function strokeColorsRect(ctx: CanvasRenderingContext2D, borderColors: [
    ColorDef | null,
    ColorDef | null,
    ColorDef | null,
    ColorDef | null
], left: number, top: number, width: number, height: number): void;

declare function strokeRoundRect(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radius: number): void;

declare class Style extends BaseStdStyle {
    static get DEFAULT(): Style;
    private _color?;
    private _font?;
    private _padding?;
    private _inputPadding?;
    private _textOverflow;
    private _appearance;
    constructor(style?: StyleOption);
    get color(): ColorDef | undefined;
    set color(color: ColorDef | undefined);
    get font(): string | undefined;
    set font(font: string | undefined);
    get padding(): number | string | (number | string)[] | undefined;
    set padding(padding: number | string | (number | string)[] | undefined);
    get inputPadding(): number | string | (number | string)[] | undefined;
    set inputPadding(inputPadding: number | string | (number | string)[] | undefined);
    get textOverflow(): TextOverflow;
    set textOverflow(textOverflow: TextOverflow);
    get appearance(): Appearance;
    set appearance(appearance: Appearance);
    clone(): Style;
}

declare class Style_2 extends BaseStdStyle_2 {
    static get DEFAULT(): Style_2;
    private _color?;
    private _font?;
    private _padding?;
    private _textOverflow;
    private _lineHeight;
    private _autoWrapText;
    private _lineClamp;
    constructor(style?: HeaderStdStyleOption);
    get color(): ColorDef | undefined;
    set color(color: ColorDef | undefined);
    get font(): string | undefined;
    set font(font: string | undefined);
    get padding(): number | string | (number | string)[] | undefined;
    set padding(padding: number | string | (number | string)[] | undefined);
    get textOverflow(): TextOverflow;
    set textOverflow(textOverflow: TextOverflow);
    get lineHeight(): string | number;
    set lineHeight(lineHeight: string | number);
    get lineClamp(): LineClamp;
    set lineClamp(lineClamp: LineClamp);
    get autoWrapText(): boolean;
    set autoWrapText(autoWrapText: boolean);
    clone(): Style_2;
}

declare interface StyleOption extends BaseStdStyleOption {
    color?: ColorDef;
    font?: string;
    padding?: number | string | (number | string)[];
    inputPadding?: number | string | (number | string)[];
    textOverflow?: TextOverflow;
    appearance?: Appearance;
}

declare interface StylePropertyFunctionArg {
    row: number;
    col: number;
    grid: ListGridAPI<any>;
    context: CanvasRenderingContext2D;
}

declare interface SvgIcon<T> {
    svg: keyof T | string;
    width?: number;
    height?: number;
}

declare class SwitchColumn<T> extends BaseCheckColumn<T> {
    get StyleClass(): typeof SwitchStyle;
    clone(): SwitchColumn<T>;
    protected getState(grid: GridInternal<T>): CheckColumnState;
    protected doDrawInternal(helper: GridCanvasHelperAPI, value: boolean, context: CellContext, opt: InlineCheckOption): void;
}

declare class SwitchEditor<T> extends BaseCheckEditor<T> {
    clone(): SwitchEditor<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
}

declare class SwitchHeader<T> extends BaseCheckHeader<T> {
    get StyleClass(): typeof SwitchHeaderStyle;
    clone(): SwitchHeader<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
    protected getInlineCheck(helper: GridCanvasHelperAPI, checked: boolean, context: CellContext, opt: InlineCheckOption): InlineAPI;
}

declare class SwitchHeaderAction<T> extends BaseCheckAction<T> {
    clone(): SwitchHeaderAction<T>;
    protected getState(grid: GridInternal<T>): CheckHeaderState;
}

declare class SwitchHeaderStyle extends BaseCheckStyle_2 {
    static get DEFAULT(): SwitchHeaderStyle;
    constructor(style?: SwitchHeaderStyleOption);
    clone(): SwitchHeaderStyle;
}

declare type SwitchHeaderStyleOption = HeaderCheckStyleOption;

declare class SwitchStyle extends BaseCheckStyle {
    static get DEFAULT(): SwitchStyle;
    constructor(style?: SwitchStyleOption);
    clone(): SwitchStyle;
}

declare type SwitchStyleOption = BaseCheckStyleOption;

declare type TExpandedKeys = number[] | string[];

declare type TextOverflow = 'clip' | 'ellipsis' | string;

declare class Theme implements RequiredThemeDefine {
    private [__4];
    private _checkbox;
    private _radioButton;
    private _button;
    private _header;
    private _switch;
    private _tree;
    constructor(obj: ThemeDefine);
    constructor(obj: PartialThemeDefine, superTheme: ThemeDefine);
    get underlayBackgroundColor(): string;
    get font(): string;
    get frozenRowsFont(): string;
    get color(): ColorPropertyDefine;
    get frozenRowsColor(): ColorPropertyDefine;
    get defaultBgColor(): ColorPropertyDefine;
    get frozenRowsBgColor(): ColorPropertyDefine;
    get focusBgColor(): ColorPropertyDefine;
    get selectionBgColor(): ColorPropertyDefine;
    get selectionDragBgColor(): ColorPropertyDefine;
    get highlightBgColor(): ColorPropertyDefine;
    get borderColor(): ColorsPropertyDefine;
    get frozenRowsBorderColor(): ColorsPropertyDefine;
    get highlightBorderColor(): ColorsPropertyDefine;
    get gridBorderColor(): string;
    get gridBorderWidth(): number;
    get defaultRowHeight(): number;
    get defaultColWidth(): number;
    get highlightBorderWidth(): number;
    get checkbox(): RequiredThemeDefine['checkbox'];
    get radioButton(): RequiredThemeDefine['radioButton'];
    get button(): RequiredThemeDefine['button'];
    get header(): RequiredThemeDefine['header'];
    get switch(): RequiredThemeDefine['switch'];
    get tree(): RequiredThemeDefine['tree'];
    hasProperty(names: string[]): boolean;
    extends(obj: PartialThemeDefine): Theme;
}

declare function theme(name: string, theme?: Theme): Theme;

declare interface ThemeDefine {
    font?: string;
    frozenRowsFont?: string;
    underlayBackgroundColor: string;
    color: ColorPropertyDefine;
    frozenRowsColor?: ColorPropertyDefine;
    defaultBgColor?: ColorPropertyDefine;
    frozenRowsBgColor?: ColorPropertyDefine;
    selectionBgColor: ColorPropertyDefine;
    highlightBgColor?: ColorPropertyDefine;
    borderColor: ColorsPropertyDefine;
    frozenRowsBorderColor?: ColorsPropertyDefine;
    highlightBorderColor: ColorsPropertyDefine;
    gridBorderColor?: string;
    gridBorderWidth?: number;
    selectionDragBgColor?: ColorPropertyDefine;
    focusBgColor?: ColorPropertyDefine;
    defaultRowHeight?: number;
    defaultColWidth?: number;
    highlightBorderWidth?: number;
    checkbox: {
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
    };
    radioButton: {
        checkColor?: ColorPropertyDefine;
        uncheckBorderColor?: ColorPropertyDefine;
        checkBorderColor?: ColorPropertyDefine;
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
    };
    button: {
        color?: ColorPropertyDefine;
        bgColor?: ColorPropertyDefine;
    };
    header: {
        sortArrowColor?: ColorPropertyDefine;
    };
    switch: {
        uncheckBgColor?: ColorPropertyDefine;
        checkBgColor?: ColorPropertyDefine;
        borderColor?: ColorPropertyDefine;
    };
    tree: {
        lineColor?: ColorPropertyDefine;
        buttonColor?: ColorPropertyDefine;
        buttonBgColor?: ColorPropertyDefine;
        buttonBorderColor?: ColorPropertyDefine;
        linkColor?: ColorPropertyDefine;
    };
}

declare const themes: {
    BASIC: Theme;
    MATERIAL_DESIGN: Theme;
    theme: {
        Theme: typeof Theme;
    };
    of: typeof of_7;
    getDefault: typeof getDefault;
    setDefault: typeof setDefault;
    getChoices: typeof getChoices;
};

declare type Toggled = (e: {
    col: number;
    row: number;
    type: ToggledType;
    treeInfo: TreeInfo;
    event: Event;
}) => void;

declare type ToggledType = 'expand' | 'expandAll' | 'collapse' | 'collapseAll';

/**
 * tools
 */
declare const tools: {
    canvasHelper: CanvasHelper;
};

declare type TooltipOption<T> = string | ((rec: T) => string);

declare type TouchCellEvent = CellAddress & {
    event: TouchEvent;
};

declare class TreeColumn<T> extends BaseColumn<T, string> {
    private _canToggle?;
    private _toggled?;
    private _draw?;
    private _cellStyle?;
    private _multilineText?;
    constructor(options?: TreeColumnOption<T>);
    get StyleClass(): typeof TreeStyle;
    get canToggle(): CanToggle | undefined;
    get toggled(): Toggled | undefined;
    get draw(): DrawCallback | undefined;
    get cellStyle(): CellStyle | undefined;
    get multilineText(): MultilineText | undefined;
    reviseAttachCellsArea(rect: Rect, row: number, grid: ListGridAPI<T>): void;
    reviseAttachCellsPadding(padding: [number, number, number, number], row: number, grid: ListGridAPI<T>): void;
    reviseFocusRect(rect: Rect, row: number, grid: ListGridAPI<T>): void;
    clone(): TreeColumn<T>;
    drawInternal<T>(value: any, context: CellContext, style: TreeStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
    bindGridEvent<T>(grid: ListGridAPI<T>, cellId: LayoutObjectId): any[];
    protected drawEditingInternal(context: CellContext, style: TreeStyle, helper: GridCanvasHelperAPI, grid: ListGridAPI<T>, info: DrawCellInfo<T>): void;
}

declare interface TreeColumnOption<T> extends BaseColumnOption<T> {
    draw?: DrawCallback;
    canToggle?: CanToggle;
    toggled?: Toggled;
    cellStyle?: CellStyle;
    multilineText?: MultilineText;
}

/**
 * grid data source for tree
 */
declare class TreeDataSource<T> extends DataSource<T> {
    static get EVENT_TYPE(): {
        readonly REFRESH_DATA: "refresh_data";
        readonly UPDATED_LENGTH: "updated_length";
        readonly UPDATED_ORDER: "updated_order";
        readonly UPDATE_LENGTH: "update_length";
    };
    private _dataSource;
    private _options;
    private _expandMap;
    private _idMap;
    private _pIdMap;
    private _levelMap;
    private _lastMap;
    private _rootRecords;
    private _records;
    private _updateLengthSilentCounter;
    constructor(dataSource: DataSource<T>, options: ITreeDataSourceOptions<T>);
    get options(): ITreeDataSourceOptions<T>;
    get expandedKeys(): string[];
    protected getOriginal(index: number): MaybePromiseOrUndef<T>;
    getTreeInfo(index: number): ITreeInfo | undefined;
    getIndexByKey(key: number | string): number;
    expandAll(): void;
    expand(index: number, all?: boolean): void;
    expandToKey(key: number | string): number;
    expandToLevel(level: number): number[];
    collapseAll(): void;
    collapse(index: number, all?: boolean): void;
    toggle(index: number, all?: boolean): void;
    get source(): any;
    get dataSource(): DataSource<T>;
    protected refreshInternal(): void;
}

declare interface TreeInfo {
    expanded: boolean;
    isLast: boolean;
    isLeaf: boolean;
    key: any;
    level: number;
    levelLast: boolean[];
    parentKey: any;
}

declare class TreeStyle extends Style {
    static get DEFAULT(): TreeStyle;
    private _lineColor?;
    private _buttonColor?;
    private _buttonBgColor?;
    private _buttonBorderColor?;
    private _linkColor?;
    private _lineHeight;
    private _autoWrapText;
    private _lineClamp;
    constructor(style?: TreeStyleOption);
    get lineColor(): ColorDef | undefined;
    set lineColor(lineColor: ColorDef | undefined);
    get buttonColor(): ColorDef | undefined;
    set buttonColor(buttonColor: ColorDef | undefined);
    get buttonBgColor(): ColorDef | undefined;
    set buttonBgColor(buttonBgColor: ColorDef | undefined);
    get buttonBorderColor(): ColorDef | undefined;
    set buttonBorderColor(buttonBorderColor: ColorDef | undefined);
    get linkColor(): ColorDef | undefined;
    set linkColor(linkColor: ColorDef | undefined);
    get lineHeight(): string | number;
    set lineHeight(lineHeight: string | number);
    get lineClamp(): LineClamp;
    set lineClamp(lineClamp: LineClamp);
    get autoWrapText(): boolean;
    set autoWrapText(autoWrapText: boolean);
    clone(): TreeStyle;
}

declare interface TreeStyleOption extends StyleOption {
    lineColor?: ColorDef;
    buttonColor?: ColorDef;
    buttonBgColor?: ColorDef;
    buttonBorderColor?: ColorDef;
    linkColor?: ColorDef;
    lineHeight?: string | number;
    autoWrapText?: boolean;
    lineClamp?: LineClamp;
}

declare interface WidthData {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    disableResize?: boolean;
}

export { }
