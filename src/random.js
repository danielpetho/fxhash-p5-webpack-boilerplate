// returns a random number between a (inclusive) and b (exclusive)
const fxrand_num = (a, b) => {
    return a + (b - a) * fxrand();
  }
// returns a random integer between a (inclusive) and b (inclusive)
// requires a < b
const fxrand_int = (a, b) => {
  return Math.floor(fxrand_num(a, b + 1));
}
// returns a random boolean with p as percent likelihood of true
const fxrand_bool = (p) => {
  return fxrand() < p;
}
// return a random value in an array of items
const fxrand_choice = (list) => {
  return list[fxrand_int(0, list.length - 1)];
}

export { fxrand_num, fxrand_int, fxrand_bool, fxrand_choice };