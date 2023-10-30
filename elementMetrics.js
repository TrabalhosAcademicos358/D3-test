import json from "./result.json" assert { type: "json" };

const createElement = ({ name, color }) => {
    const section = document.querySelector("#metrics");
    const element = document.createElement("div");
    element.style.display = "flex";
    element.style.gap = "8px";
    element.innerHTML = `
        <p>${name}:</p>
        <div class="print-color" style="background-color: ${color};"></div>
    `;
    section.appendChild(element);
};

export const printElementMetrics = (callbackColor) => {
    const firstElement = json.root;
    const listResults = Object.keys(firstElement);
    const listObj = listResults.map((key) => ({
        name: key,
        color: callbackColor(key),
    }));
    listObj
        .sort((objA, objB) => objA.name.length - objB.name.length)
        .forEach((obj) => createElement(obj));
};
