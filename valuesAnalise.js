import json from "./result.json" assert { type: "json" };

const sourceLinks = "root";

const functionListFilter = (list) => {
    return list.filter(
        (item) => item !== "falso_positivo" && item !== "falso_negativo"
    );
};

const nodesGroup = Object.keys(json).map((key, index) => {
    const node = { id: key, group: index };
    return node;
});

const nodesResults = Object.keys(json).map((key, index) => {
    const listValues = Object.keys(json[key]);
    if (sourceLinks === key) return null;
    const nodes = functionListFilter(listValues).map((item) => ({
        id: key + ":" + item,
        name: item,
        group: index,
    }));
    return nodes;
});

export const nodes = [].concat(...nodesGroup, ...nodesResults);

const linksForNodesResults = Object.keys(json).map((key) => {
    const listValues = Object.keys(json[key]);
    const links = functionListFilter(listValues).map((item) => ({
        source: key,
        target: key + ":" + item,
        value: 1,
    }));
    return key !== sourceLinks ? links : [];
});

const linksForNodesGroup = nodesGroup.map((obj) => {
    return { source: sourceLinks, target: obj.id, value: 4 };
});

export const links = [].concat(...linksForNodesResults, ...linksForNodesGroup);
