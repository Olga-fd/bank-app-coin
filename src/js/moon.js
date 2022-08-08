function checkWithMoonAlg(val) {
  let arr = [];
  val = val.toString();

  for (let i = 0; i < val.length; i++) {
    if (i % 2 === 0) {
      let m = parseInt(val[i]) * 2;
      if (m > 9) {
        arr.push(m - 9);
      } else {
        arr.push(m);
      }
    } else {
      let n = parseInt(val[i]);
      arr.push(n);
    }
  }
  let summ = arr.reduce(function (a, b) {
    return a + b;
  });
  return Boolean(!(summ % 10));
}

module.exports = checkWithMoonAlg;
