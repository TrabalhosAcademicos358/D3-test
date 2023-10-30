import json from "./result.json" assert { type: "json" };

const nodesGroup = [...Object.keys(json).map((key, index) => {
    const node = { id: key, group: index };
    return node;
})]

const nodesResults = [...Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    const nodes = listValues.map((item) => {
        return { id: key + ":" + item, name: item, group: index };
    })
    return nodes;
})]

export const nodes = [
    ...nodesGroup,
    ...[].concat(...nodesResults)
]

const linksValuesArray = [...Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    const links = listValues.map((item) => {
        return { source: key, target: key + ":" + item, value: 1 };
    });
    return links;
})]

export const links = [].concat(...linksValuesArray);

console.log(nodes);
console.log(links);
