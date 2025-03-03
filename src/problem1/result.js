var sum_to_n_a = function (n) {
  let sum = 0;
  if (n > 0) {
    for (let i = 1; i <= n; i++) sum += i;
  } else {
    for (let i = -1; i >= n; i--) sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  // your code here
  if (n < 0) {
    return -(n * (n - 1)) / 2;
  }
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  if (n < 0) {
    if (n === -1) {
      return -1;
    }
    return n + sum_to_n_c(n + 1);
  }
  // your code here
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(-50));
console.log(sum_to_n_b(-50));
console.log(sum_to_n_c(50));
