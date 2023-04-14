let generatedData: any

export const getDonutChartData = (themes: any) => {
  if (generatedData) {
    generatedData.datasets[0].backgroundColor = [themes.danger, themes.info, themes.primary]
  } else {
    generatedData = {
      labels: ['North America', 'South America', 'Australia'],
      datasets: [{
        label: 'Population (millions)',
        backgroundColor: [themes.danger, themes.info, themes.primary],
        data: [2478, 5267, 734],
      }],
    }
  }

  return generatedData
}
