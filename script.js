import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as data from "./valuesAnalise.js";
import { printElementMetrics } from "./elementMetrics.js"

const width = 1920;
const height = 1920;

// https://d3js.org/d3-scale/ordinal#ordinal_unknown
// https://coolors.co/1e3888-ec4e20-7bc950-009fb7-eff1f3
const color = d3.scaleOrdinal(["plus", "minus", "equals"], ["#7BC950", "#EC4E20", "#1E3888"]);

// The force simulation mutates links and nodes, so create a copy
// so that re-evaluating this cell produces the same result.
const links = data.links.map((d) => ({ ...d }));
const nodes = data.nodes.map((d) => ({ ...d }));

printElementMetrics(color)

// Create a simulation with several forces.
const simulation = d3
    .forceSimulation(nodes)
    .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

// Create the SVG container.
const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr(
        "style",
        "background: #f8f9fa; border-radius: 25px; max-width: 100%; height: auto;"
    );

// Add a line for each link, and a circle for each node.
const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll()
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll()
    .data(nodes)
    .join("circle")
    .attr("r", 10)
    .attr("fill", (d) => color(d.group));

// console.log(node)

// node.append("text")
//     .text((d) => d.id)
//     .attr("x", 12)
//     .attr("dy", ".35em");

// Add a drag behavior.
node.call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
);

// Set the position attributes of links and nodes each time the simulation ticks.
function ticked() {
    link.attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
}

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

// When this cell is re-run, stop the previous simulation. (This doesn’t
// really matter since the target alpha is zero and the simulation will
// stop naturally, but it’s a good practice.)
// invalidation.then(() => simulation.stop());

const container = document.querySelector("#container");

// Append the SVG element.
container.append(svg.node());
