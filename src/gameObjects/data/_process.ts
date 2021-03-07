import { data } from "./base_items";

// // object of kv pairs
// const z = new Set(
//   Object.entries(data)
//     .map(([_, item]) =>
//       item.requirements ? Object.keys(item.requirements) : ""
//     )
//     .flat()
// );
// z.forEach((i) => console.log(i));

// // array of strings
// const z = new Set(
//   Object.entries(data)
//     .map(([_, item]) => item.implicits)
//     .flat()
// );
// z.forEach((i) => console.log(i));

// // string
const y = new Set(Object.entries(data).map(([_, item]) => item.domain));
y.forEach((i) => console.log(i));

// // filter for things with non-empty array
// const z = new Set(
//   Object.entries(data)
//     .filter(([_, item]) => item.generation_weights.length > 0)
//     .flat()
// );
// z.forEach((i) => console.log(i));
