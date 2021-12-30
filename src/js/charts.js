export function createChart(newArr, canvas, color = '#116acc') {
  const ctx = canvas.getContext('2d');
  let spotOn = getTransformedArray(newArr);

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
  const ctx = canvas.getContext('2d');

  let concat = objRec.concat(objExp);
  let maxGeneral = Math.max.apply(null, concat);
  let transformedArr = concat.map((x) => (165 * x) / maxGeneral);
  const minGeneral = Math.min.apply(null, transformedArr);
  let min = Math.min.apply(null, concat);

  let axisMax = document.querySelector('.main__ratio .max');
  let axisSubMax = document.querySelector('.main__ratio .xAxis .subMax');
  let axisMin = document.querySelector('.main__ratio .min');
  axisMax.textContent = `${maxGeneral.toFixed(0)} ₽`;
  axisMin.textContent = `${min} ₽`;
  let maxRec = Math.max.apply(null, objRec);
  let maxExp = Math.max.apply(null, objExp);
  if (maxRec == 0 || maxExp == 0) {
    axisSubMax.textContent = '';
  } else if (maxRec < maxExp) {
    axisSubMax.textContent = `${maxRec.toFixed(0)} ₽`;
  } else if (maxRec > maxExp || maxRec == maxExp) {
    axisSubMax.textContent = `${maxExp.toFixed(0)} ₽`;
  }

  let rec = getTransArray(objRec, maxGeneral, minGeneral);
  let exp = getTransArray(objExp, maxGeneral, minGeneral);
  let recMax = Math.max.apply(null, rec);
  let expMax = Math.max.apply(null, exp);
  if (recMax > expMax) {
    axisSubMax.style.bottom = `${expMax - 4}px`;
  } else {
    axisSubMax.style.bottom = `${recMax - 4}px`;
  }

  //46
  ctx.translate(0, canvas.height);
  ctx.rotate(-Math.PI / 2);
  compare(ctx, rec, exp, 0, 35);
  ctx.save();
  for (let j = 1; j < rec.length; j++) {
    ctx.restore();
    let value = 35 + 28 * j + j * 50;
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
