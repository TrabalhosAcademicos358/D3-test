import json from "./result.json" assert { type: "json" };

export const nodes = Object.keys(json).map((key, index) => {
    const node = { id: key, group: index };
    return node;
});

const linksValuesArray = Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    const links = listValues.map((item) => {
        return { source: item + index, target: key, value: index };
    });
    return links;
});

export const links = [].concat(...linksValuesArray);

console.log(nodes);
console.log(links);
