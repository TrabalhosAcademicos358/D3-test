import json from "./result.json" assert { type: "json" };

export const printElementMetrics = (callbackColor) => {
    const listResults = Object.keys(json[0]);
    const listObj = listResults.map((key) => {name: key, color: callbackColor(key)});
    listObj.forEach((obj) => createElement(obj))
};
