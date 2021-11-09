// import {
//   Chart,
//   LineElement,
//   BarElement,
//   BarController,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Decimation,
//   Filler,
//   Title,
//   SubTitle,
// } from 'chart.js';

// Chart.register(
//   LineElement,
//   BarElement,
//   BarController,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   TimeScale,
//   TimeSeriesScale,
//   Decimation,
//   Filler,
//   Title,
//   SubTitle
// );

// export function createChart() {
//   const ctx = document.getElementById('myChart').getContext('2d');
//   // ctx.canvas.width = 510;
//   // ctx.canvas.height = 150;
//   const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [
//         {
//           label: 'Dynamics',
//           borderWidth: 2,
//           data: [12, 19],
//           backgroundColor: ['#116acc'],
//           barThickness: 50,
//         },
//       ],
//     },
//     options: {
//       responsive: false,
//       maintainAspectRatio: false,
//       //showScale: false,
//       scales: {
//         x: {
//           grid: {
//             color: 'white',
//           },
//           // type: 'time',
//           // time: {
//           //   unit: 'month',
//           // },
//         },
//         y: {
//           suggestedMax: 100,
//           grid: {
//             color: 'white',
//           },
//           beginAtZero: true,
//           ticks: { stepSize: 100 },
//         },
//       },
//     },
//   });
// }

export function createChart(newArr) {
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');
  let max = Math.max.apply(null, newArr);
  let transformedArr = newArr.map((x) => (165 * x) / max);
  const min = Math.min.apply(null, transformedArr);
  let arr = transformedArr.map((y) => y - min);
  max = Math.max.apply(null, arr);
  let spotOn = arr.map((z) => (165 * z) / max);

  ctx.fillStyle = '#116acc';
  ctx.translate(0, canvas.height);
  ctx.rotate(-Math.PI / 2);
  ctx.fillRect(0, 35, spotOn[0], 50);
  ctx.save();
  for (let j = 1; j < spotOn.length; j++) {
    ctx.restore();
    ctx.fillRect(0, 35 + 28 * j + j * 50, spotOn[j], 50);
  }
}
