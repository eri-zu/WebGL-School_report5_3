// ラジアンへ変換
export function radian(angle) {
  return (angle * Math.PI) / 180; //1度何ラジアンか
}

// 値をマッピング
// -----------------------------------
// @num : マッピングする値(Number)
// @resMin : 結果となる値の最小値(Number)
// @resMax : 結果となる値の最大値(Number)
// @baseMin : 元となる値の最小値(Number)
// @baseMax : 元となる値の最大値(Number)
// return : マッピングされた値(Number)
// -----------------------------------

export function map(num, resMin, resMax, baseMin, baseMax) {
  var p;
  if (num < baseMin) {
    return resMin;
  }
  if (num > baseMax) {
    return resMax;
  }
  p = (resMax - resMin) / (baseMax - baseMin);

  return (num - baseMin) * p + resMin;
}

// ランダムな整数を取得
// -----------------------------------
// @min : 最小値(int)
// @max : 最大値(int)
// return : minからmaxまでのランダムな整数(int)
// -----------------------------------
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// shuffle
export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// clamp
export function clamp(val, min, max, minVal, maxVal) {
  if (val < min) val = minVal == undefined ? min : minVal;
  else if (val > max) val = maxVal == undefined ? max : maxVal;

  return val;
}

// random
// ランダムな数(float)
// -----------------------------------
// @min : 最小値(float)
// @max : 最大値(float)
// return : min(含む)からmax(含む)までのランダムな数(float)
// -----------------------------------
export function random(min, max) {
  return Math.random() * (max - min) + min;
}
