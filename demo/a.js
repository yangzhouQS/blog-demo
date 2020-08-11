const a = mturnover [{
  'label': '最大金额差',
  'comp': 'inputNumberComp',
  'position': { 'spanNum': 12 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 1, 'min': -1, 'step': 1, 'style': { 'width': '220px' } },
  'eventConf': { 'isOn': true },
  'name': 'mturnover__maxDifference'
}, {
  'label': '最小金额差',
  'comp': 'inputNumberComp',
  'position': { 'spanNum': 12 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 1, 'min': -1, 'step': 1, 'style': { 'width': '220px' } },
  'eventConf': { 'isOn': true },
  'name': 'mturnover__minDifference'
}, {
  'name': 'mturnover__costType',
  'label': '费用科目',
  'comp': 'checkBoxComp',
  'position': { 'spanNum': 10 },
  'elmentConfig': { 'disabled': false },
  'eventConf': { 'isOn': true }
}, {
  'comp': 'dividerComp',
  'position': { 'spanNum': 24 },
  'elmentConfig': { 'title': 'allotin-order', 'contentPosition': 'left' }
}, {
  'label': '* 签字栏-1',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label1'
}, {
  'label': '* 签字栏-2',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label2'
}, {
  'label': '* 签字栏-3',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label3'
}, {
  'label': '* 签字栏-4',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label4'
}, {
  'comp': 'dividerComp',
  'position': { 'spanNum': 24 },
  'elmentConfig': { 'title': 'receive-order', 'contentPosition': 'left' }
}, {
  'label': '* 签字栏-1',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label1'
}, {
  'label': '* 签字栏-2',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label2'
}, {
  'label': '* 签字栏-3',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label3'
}, {
  'label': '* 签字栏-4',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label4'
}]

const b = [ {
  'comp': 'dividerComp',
  'position': { 'spanNum': 24 },
  'elmentConfig': { 'title': 'allotin-order', 'contentPosition': 'left' }
}, {
  'label': '* 签字栏-1',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label1'
}, {
  'label': '* 签字栏-2',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label2'
}, {
  'label': '* 签字栏-3',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label3'
}, {
  'label': '* 签字栏-4',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_allotin-order_printAllotin.label4'
}, {
  'comp': 'dividerComp',
  'position': { 'spanNum': 24 },
  'elmentConfig': { 'title': 'receive-order', 'contentPosition': 'left' }
}, {
  'label': '* 签字栏-1',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label1'
}, {
  'label': '* 签字栏-2',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label2'
}, {
  'label': '* 签字栏-3',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label3'
}, {
  'label': '* 签字栏-4',
  'comp': 'inputTextComp',
  'position': { 'spanNum': 6 },
  'elmentConfig': { 'disabled': false, 'size': 'small', 'max': 10, 'min': 1, 'step': 1, 'style': {} },
  'eventConf': { 'isOn': true },
  'name': 'mturnover_receive-order_printReceive.label4'
} ]