# How to structure a data object

depends on if need to have ordered or random access more frequently

```
let a = {
    type: "item",
    shape: "array",
    pk: "id",
    data: { "a": { id: "a", name: "donkey" }, b: },
    order: ["a", "b", "c"],
    fetch:
};
```

# Messing around with plotly histograms: https://stackoverflow.com/questions/918736/random-number-generator-that-produces-a-power-law-distribution

```
var x = [];
let gen_num = () => {
    const distributionPower = 3.0;
    const uniformVariate = Math.random();
    const low = 0.0;
    const high = 1;
    return (
        ((high ** (distributionPower + 1) - low ** (distributionPower + 1)) *
            uniformVariate +
            low ** (distributionPower + 1)) **
        (1 / (distributionPower + 1))
    );
};

for (var i = 0; i < 100000; i++) {
    x[i] = gen_num();
}

var trace = {
    x: x,
    type: "histogram",
};
var data = [trace];
Plotly.newPlot("myDiv", data);
```
