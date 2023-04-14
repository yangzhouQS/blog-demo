import { getCircleRadianPoint } from '../../../es/utils/graphs'

function getPetalPoints(insideRadius, outsideRadius, petalNum, petalCenter) {
  const PI2Dived = (Math.PI * 2) / (petalNum * 3)

  let points = new Array(petalNum * 3)
    .fill('')
    .map((_, i) =>
      getCircleRadianPoint(...petalCenter, i % 3 === 0 ? insideRadius : outsideRadius, PI2Dived * i)
    )

  const startPoint = points.shift()
  points.push(startPoint)

  points = new Array(petalNum).fill('').map(_ => points.splice(0, 3))

  points.unshift(startPoint)

  return points
}

export default function (render) {
  const {
    area: [w, h],
  } = render

  const petalCenter = [w / 2, h / 2]
  const [raidus1, raidus2, raidus3, raidus4] = [h / 6, h / 2.5, h / 3, h / 2]

  return {
    name: 'BezierCurve',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points: getPetalPoints(raidus1, raidus2, 6, petalCenter),
      close: true,
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
    },
    onMouseEnter() {
      const {
        style: { graphCenter },
      } = this

      this.animation('style', { lineWidth: 20, shadowBlur: 20 }, true)
      this.animation('shape', { points: getPetalPoints(raidus3, raidus4, 6, graphCenter) })
    },
    onMouseOuter() {
      const {
        style: { graphCenter },
      } = this

      this.animation('style', { lineWidth: 10, shadowBlur: 0 }, true)
      this.animation('shape', { points: getPetalPoints(raidus1, raidus2, 6, graphCenter) })
    },
    setGraphCenter(e) {
      const { style } = this

      if (e) {
        const { movementX, movementY } = e
        const [cx, cy] = style.graphCenter

        style.graphCenter = [cx + movementX, cy + movementY]
      } else {
        style.graphCenter = [...petalCenter]
      }
    },
  }
}
