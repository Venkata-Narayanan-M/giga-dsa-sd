let a;
b = 200;
if (true) {
  a = 100;
  var b;
  const c = 300;
}

const arrayofNum = [100, 23, 10, 45, 1000, 323, 1, 101, 67, 15, 121];
const result = arrayofNum
  .filter((num) => num.toString().startsWith("1"))
  .sort((a, b) => b - a);

// console.log(result);
const alias = [
  { value: "QA", label: "QA" },
  { value: "Staging", label: "Staging" },
  { value: "Production", label: "Production" },
  { value: "Approved", label: "Approved" },
];

for (let i = 0; i < alias.length; i++) {
  if (alias[i].value === "Staging") {
    alias.splice(i, 1);
    i--;
  }
  if (alias[i].value === "Production") {
    alias.splice(i + 1, 0, { value: "test", label: "test" });
    break;
  }
}

console.log(alias);
