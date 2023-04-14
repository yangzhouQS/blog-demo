;(function () {
  var records

  var grid = function () {
    var grid = new kakaGrid.ListGrid({
      parentElement: document.getElementById('kaka-grid'),
      header: [
        {
          caption: 'Continent',
          field: 'continent',
          width: 80,
        },
        {
          caption: 'Country',
          field: 'country',
          width: 80,
        },
        {
          caption: 'City',
          field: 'city',
          width: 80,
        },
      ],
      spanBodyOptions: {
        startCol: 0,
        endCol: 2,
      },
      records: records,
    })
    var mergeCells = [
      {
        cellRange: {
          start: { col: 2, row: 2 },
          end: { col: 2, row: 3 },
        },
        cellValue: '自定义合并单元格',
      },
    ]
    var doMergeCell = function (e, property) {
      for (var i = 0; i < mergeCells.length; i++) {
        var mergeCell = mergeCells[i]
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
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CELL_RANGE, function (
      e
    ) {
      // e.col 列索引（只读）
      // e.row 行索引（只读）
      // e.cellRange 单元格区域（可修改）
      doMergeCell(e, 'cellRange')
    })
    grid.addEventListener(kakaGrid.ListGrid.EVENT_TYPE.CELL_VALUE, function (
      e
    ) {
      // e.col 列索引（只读）
      // e.row 行索引（只读）
      // e.cellValue 单元格值（可修改）
      doMergeCell(e, 'cellValue')
    })
    return grid
  }

  var data = function () {
    var records = [
      {
        continent: 'Asia',
        country: 'China',
        city: 'BeiJing',
      },
      {
        continent: 'Asia',
        country: 'China',
        city: 'Shanghai',
      },
      {
        continent: 'Asia',
        country: 'Japan',
        city: 'Tokyo',
      },
      {
        continent: 'America',
        country: 'Canada',
        city: 'Toronto',
      },
    ]
    return records
  }
  records = data()

  var style = ''

  window.examples.push({
    key: 'listgrid/spanBody',
    grid: grid,
    style: style,
    data: data,
  })
})()
