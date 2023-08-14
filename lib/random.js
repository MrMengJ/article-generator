// 线性插值 函数返回一个大于等于min，小于max的随机整数
export const randomInt = (min, max) => {
  const p = Math.random();
  return Math.floor(min + (max - min) * p);
};

export const createRandomPicker = (arr) => {
  arr = [...arr];
  function randomPicker() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  }
  randomPicker(); // 抛弃第一次选择结果，避免初始在数组末位的元素，在第一次不会被取到的问题，保证了随机性

  return randomPicker;
};
