import json from "./result.json" assert { type: "json" };

const nodesGroup = Object.keys(json).map((key, index) => {
    const node = { id: key, group: index };
    return node;
});

const nodesResults = Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    const nodes = listValues.map((item) => {
        return { id: key + ":" + item, name: item, group: index };
    });
    return nodes;
});

export const nodes = [].concat(...nodesGroup, ...nodesResults);

const linksForNodesResults = Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    const links = listValues.map((item) => {
        return { source: key, target: key + ":" + item, value: 1 };
    });
    return links;
});

const firstElement = nodesGroup[0];
const linksForNodesGroup = nodesGroup
    .filter((obj) => firstElement.id !== obj.id)
    .map((obj) => ({ source: firstElement.id, target: obj.id, value: 2 }));

export const links = [].concat(...linksForNodesResults, ...linksForNodesGroup);