const url = `/mreport/fine-report-tabs.html?code=mreport-concrete-supply-project&reportType=report_10$$$混凝土供应台账$yearrow/ma/crecsh/混凝土供应台账/混凝土供应台账.cpt&report_op=view$$混凝土供应台账(开累)$yearrow/ma/crecsh/混凝土供应台账/混凝土供应台账(开累).cpt&report_op=view`
const searchStr = url.substring(url.indexOf("?")).trim()
const [baseUrl, tabStr] = searchStr.split('$$$')
const ret = tabStr.split('$$').reduce((cur, memo) => {
    const [k, v] = memo.split('$')
    cur.push({
        title: k,
        url: `${baseUrl}&report_viewlet=${v}`
    })
    return cur
}, [])
console.log(ret)
