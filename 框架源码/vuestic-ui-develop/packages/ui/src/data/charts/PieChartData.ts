export const getPieChartData = (themes: any) => ({
  labels: ['Africa', 'Asia', 'Europe'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [themes.primary, themes.warning, themes.danger],
    data: [2478, 5267, 734],
  }],
})
