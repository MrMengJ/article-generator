// 线性插值 获取介于min和max之间的随机整数
export const randomInit = (min, max) => {
  const p = Math.random();
  return Math.floor(min + (max - min) * p);
};
