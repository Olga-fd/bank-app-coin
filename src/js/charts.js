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

export function createChart(newArr, canvas, color = '#116acc') {
  //const canvas = document.querySelector('.myChart');
  const ctx = canvas.getContext('2d');
  let spotOn = getTransformedArray(newArr);
  // let max = Math.max.apply(null, newArr);
  // let transformedArr = newArr.map((x) => (165 * x) / max);
  // const min = Math.min.apply(null, transformedArr);
  // let arr = transformedArr.map((y) => y - min);
  // max = Math.max.apply(null, arr);
  // let spotOn = arr.map((z) => (165 * z) / max);

  ctx.fillStyle = color;
  ctx.translate(0, canvas.height);
  ctx.rotate(-Math.PI / 2);
  ctx.fillRect(0, 35, spotOn[0], 50);
  ctx.save();
  for (let j = 1; j < spotOn.length; j++) {
    ctx.restore();
    ctx.fillRect(0, 35 + 28 * j + j * 50, spotOn[j], 50);
  }
}

export function createStackedChart(objRec, objExp, canvas) {
  //const canvas = document.querySelector('.myChart');
  const ctx = canvas.getContext('2d');

  let concat = objRec.concat(objExp);
  let maxGeneral = Math.max.apply(null, concat);
  let transformedArr = concat.map((x) => (165 * x) / maxGeneral);
  const minGeneral = Math.min.apply(null, transformedArr);
  let min = Math.min.apply(null, concat);

  let axisMax = document.querySelector('.main__ratio .max');
  let axisSubMax = document.querySelector('.main__ratio .subMax');
  let axisMin = document.querySelector('.main__ratio .min');
  axisMax.textContent = `${maxGeneral.toFixed(0)} ₽`;
  axisMin.textContent = `${min} ₽`;
  let maxRec = Math.max.apply(null, objRec);
  let maxExp = Math.max.apply(null, objExp);
  if (maxRec > maxExp || maxRec == maxExp) {
    axisSubMax.textContent = `${maxExp.toFixed(0)} ₽`;
  } else if (maxRec < maxExp) {
    axisSubMax.textContent = `${maxRec.toFixed(0)} ₽`;
  }

  let rec = getTransArray(objRec, maxGeneral, minGeneral);
  let exp = getTransArray(objExp, maxGeneral, minGeneral);

  ctx.translate(0, canvas.height);
  ctx.rotate(-Math.PI / 2);
  compare(ctx, rec, exp, 0, 46);
  // if (rec[0] > exp[0]) {
  //   ctx.fillStyle = '#76ca66';
  //   ctx.fillRect(0, 35, rec[0], 50);
  //   ctx.fillStyle = '#fd4e5d';
  //   ctx.fillRect(0, 35, exp[0], 50);
  // } else if (rec[0] < exp[0]) {
  //   ctx.fillStyle = '#fd4e5d';
  //   ctx.fillRect(0, 35, exp[0], 50);
  //   ctx.fillStyle = '#76ca66';
  //   ctx.fillRect(0, 35, rec[0], 50);
  // } else if (rec[0] == exp[0]) {
  //   ctx.fillRect(0, 35, 0, 50);
  // }
  ctx.save();
  for (let j = 1; j < rec.length; j++) {
    ctx.restore();
    let value = 46 + 28 * j + j * 50;
    // if (rec[j] > exp[j]) {
    //   ctx.fillStyle = '#76ca66';
    //   ctx.fillRect(0, 35 + 28 * j + j * 50, rec[j], 50);
    //   ctx.fillStyle = '#fd4e5d';
    //   ctx.fillRect(0, 35 + 28 * j + j * 50, exp[j], 50);
    // } else if (rec[j] < exp[j]) {
    //   ctx.fillStyle = '#fd4e5d';
    //   ctx.fillRect(0, 35 + 28 * j + j * 50, exp[j], 50);
    //   ctx.fillStyle = '#76ca66';
    //   ctx.fillRect(0, 35 + 28 * j + j * 50, rec[j], 50);
    // } else if (rec[j] == exp[j]) {
    //   ctx.fillRect(0, 35, 0, 50);
    // }
    compare(ctx, rec, exp, j, value);
  }
}

function getTransformedArray(array) {
  let max = Math.max.apply(null, array);
  let transformedArr = array.map((x) => (165 * x) / max);
  const min = Math.min.apply(null, transformedArr);
  let arr = transformedArr.map((y) => y - min);
  let maximum = Math.max.apply(null, arr);
  let spotOn = arr.map((z) => (165 * z) / maximum);
  return spotOn;
}

function getTransArray(array, maxGeneral, minGeneral) {
  let transformedArr = array.map((x) => (165 * x) / maxGeneral);
  let arr = transformedArr.map((y) => y - minGeneral);
  return arr;
}

function compare(ctx, rec, exp, j, value) {
  if (rec[j] > exp[j]) {
    ctx.fillStyle = '#76ca66';
    ctx.fillRect(0, value, rec[j], 50);
    ctx.fillStyle = '#fd4e5d';
    ctx.fillRect(0, value, exp[j], 50);
  } else if (rec[j] < exp[j]) {
    ctx.fillStyle = '#fd4e5d';
    ctx.fillRect(0, value, exp[j], 50);
    ctx.fillStyle = '#76ca66';
    ctx.fillRect(0, value, rec[j], 50);
  } else if (rec[j] == exp[j]) {
    ctx.fillRect(0, value, 0, 50);
  }
}
