import json from "./result.json" assert { type: "json" };

const sourceLinks = "root";
const separator = "->";

const functionListFilter = (list) => {
    return list.filter(
        (item) => item !== "falso_positivo" && item !== "falso_negativo"
    );
};

const joinInUniqueList = (...list) => {
    const hasListItem = list.some(
        (item) => Array.isArray(item) && item.length > 0
    );
    if (hasListItem) {
        let newList = [];
        list.forEach((item) =>
            Array.isArray(item) ? newList.push(...item) : newList.push(item)
        );
        const listJoin = [].concat(...newList);
        return joinInUniqueList(...listJoin);
    }
    return [].concat(...list);
};

const nodesGroup = Object.keys(json).map((key, index) => {
    const node = { id: key };
    return node;
});

const nodesResults = Object.keys(json)
    .map((key, index) => {
        const listValues = Object.keys(json[key]);
        if (sourceLinks === key) return null;

        const nodes = functionListFilter(listValues).map((item) => ({
            id: key + separator + item,
            name: item,
            group: item,
        }));

        const nodesDataResults = nodes.map((obj) => {
            const nameKey = obj.id.split(separator)[0];
            const nameResult = obj.name;
            const listValuesResults = json[nameKey][nameResult];
            return listValuesResults.map((item) => ({
                id: obj.id + separator + item,
                nameResult: item,
                group: obj.group,
            }));
        });

        return [...nodes, ...nodesDataResults];
    })
    .filter((obj) => obj !== null);

export const nodes = joinInUniqueList(...nodesGroup, ...nodesResults);

export const links = nodes
    .map((obj) => {
        const listPath = obj.id.split(separator);
        listPath.pop();

        const source = listPath.join(separator);
        const target = obj.id;
        const value = 2 * listPath.length;

        return target !== sourceLinks ? { source, target, value } : null;
    })
    .filter((obj) => obj !== null);
