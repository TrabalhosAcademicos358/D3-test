import json from "./result.json" assert { type: "json" };

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
    return links;
});

const linksForNodesGroup = nodesGroup
    .map((obj) => {
        const pathTestCase = obj.id.split("->");
        if (pathTestCase.length > 1) {
            pathTestCase.pop()
            const stringIdNodeSource = pathTestCase.join("->");
            return { source: stringIdNodeSource, target: obj.id, value: 4 };
        }
        return null;
    })
    .filter((item) => item !== null);

export const links = [].concat(...linksForNodesResults, ...linksForNodesGroup);
