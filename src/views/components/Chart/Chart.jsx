import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Chart.css";
import * as _ from "lodash";
import flowchartImg from "../../assets/flow_medinflow.svg";
import descriptionImg from "../../assets/info_medinflow.svg";
// import arrow from "../../assets/down-arrow.svg";

const Chart = ({ data, clickNode, chartZoom }) => {
  // console.log(data)
  const chartRef = useRef();
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  var nodes = d3.cluster(data);
  // var nodesByLevel = d3.nest().key(function (d) {return d.depth}).entries(nodes);
  // console.log(nodesByLevel)

  const getMaxHorizontalCount = (data) => {
    let maxCount = 0;
    for (const [key, value] of Object.entries(data)) {
      if (value.length > maxCount) {
        maxCount = value.length;
      }
    }
    return maxCount;
  };

  const initialFunction = async () => {
    const ds = d3.stratify()(data);
    const groupedData = _.groupBy(data, "parentId");
    setMaxWidth(300 * getMaxHorizontalCount(groupedData));
    setMaxHeight((ds.height + 1) * 190);

    const svg = d3
      .select(chartRef.current)
      .html("")
      .append("svg")
      .attr("width", `${maxWidth}px`)
      .attr("height", `${maxHeight + 100}px`)
      .append("g")
      .attr("transform", "translate(0,3)");

    const treeStructure = d3.tree().size([maxWidth - 100, maxHeight - 100]);
    const info = treeStructure(ds);

    // shadow filter
    var defs = svg.append("defs");
    var filter = defs.append("filter").attr("id", "dropshadow");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 3)
      .attr("dy", 3)
      .attr("result", "offsetBlur");
    filter
      .append("feFlood")
      .attr("in", "offsetBlur")
      .attr("flood-color", "#3d3d3d")
      .attr("flood-opacity", "0.5")
      .attr("result", "offsetColor");
    filter
      .append("feComposite")
      .attr("in", "offsetColor")
      .attr("in2", "offsetBlur")
      .attr("operator", "in")
      .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    svg
      .append("g")
      .selectAll("path")
      .data(info.links())
      .enter()
      .append("path")
      .style("fill", "none")
      .style("stroke", "#C1C1C1")
      .style("stroke-dasharray", "6, 8")
      .style("stroke-width", "2")
      .attr("d", (d) => {
        if (d.source.data.label) {
          if (d.source.data.label.length > 17) {
            return `M ${d.source.x + 85}, ${d.source.y + 170} v 50 H ${
              d.target.x + 85
            } V ${d.target.y}`;
          } else {
            return `M ${d.source.x + 85}, ${d.source.y + 145} v 50 H ${
              d.target.x + 85
            } V ${d.target.y}`;
          }
        } else {
          return `M ${d.source.x + 85}, ${d.source.y + 100} v 50 H ${
            d.target.x + 85
          } V ${d.target.y}`;
        }
      });

    svg
      .append("g")
      .selectAll("img")
      .data(info.descendants())
      .enter()
      .append("image")
      .attr("x", (d) => {
        // console.log(d)
        return d.x + 77;
      })
      .attr("y", (d) => {
        return d.y - 12;
      });
    // .attr("width", 15)
    // .attr("height", 15)
    // .attr("xlink:href", (d) => {
    //   if (d.parent) {
    //     return arrow
    //   }
    // });

    svg
      .append("g")
      .selectAll("rect")
      .on("click", (d) => {
        // console.log(d)
        clickNode(d.id);
      })
      .data(info.descendants())
      .enter()
      .append("rect")
      .attr("filter", "url(#dropshadow)")
      .classed("button", true)
      .classed("circle", (d) => (d.data.type === "circle" ? true : false))
      .classed("square", (d) => (d.data.type === "square" ? true : false))
      .style("fill", (d) => {
        if (d.data.color === "#FCC176") {
          return "#F6E3BB";
        } else if (d.data.color === "#EE7977") {
          return "#F5BBBB";
        } else if (d.data.color === "#8BCFC8") {
          return "#B9F4D0";
        } else if (d.data.color === "#A0BBE2") {
          return "#BEE5F6";
        }
        return d.data.color;
      })
      // .style("stroke", "#ECECEC")
      // .style("stroke-width", "6")
      .style("width", (d) => {
        // return '170px';
        if (d && d.data.displayType == "image") {
          return "90px";
        } else {
          return "170px";
        }
      })
      .attr("x", (d) => {
        // return d.x;
        if (d && d.data.displayType == "image") {
          return d.x + 40;
        } else {
          return d.x;
        }
      })
      .attr("y", (d) => {
        return d.y;
      })
      .style("height", (d) => {
        return "90px";
      })
      .on("click", (d) => {
        clickNode(d.id);
      });
    // .datum(data)
    // .attr("class", "line")

    svg
      .append("g")
      .selectAll("switch")
      .data(info.descendants())
      .enter()
      .append("switch")
      .append("foreignObject")
      .attr("x", (d) => d.x + 10)
      .attr("y", (d) => d.y + 5)
      .style("text-align", "center")
      .style("width", "150px")
      .style("height", "80px")
      .append("xhtml:div")
      .on("click", (d) => {
        clickNode(d.id);
      })
      .style("display", "table")
      .style("font-size", "15px")
      .style("width", "150px")
      .style("height", "80px")
      .append("xhtml:p")
      // .append("image")
      .style("display", "table-cell")
      .style("text-align", "center")
      .style("vertical-align", "middle")
      .style("font-size", "1.2em")
      .style("font-family", "Avenir Next Condensed")
      .style("color", "#000000")
      .text((d) => d.data.name)
      .on("click", (d) => {
        clickNode(d.id);
      });

    svg
      .append("g")
      .selectAll("img")
      .data(info.descendants())
      .enter()
      .append("image")
      .attr("width", "80px")
      .attr("height", "80px")
      .attr("x", (d) => d.x + 45)
      .attr("y", (d) => d.y + 5)
      .attr("xlink:href", (d) => d.data.displayImage)
      .on("click", (d) => {
        clickNode(d.id);
      });

    svg
      .append("g")
      .selectAll("img")
      .data(info.descendants())
      .enter()
      .append("image")
      .attr("x", (d) => {
        if (d && d.data.displayType == "image") {
          return d.data.type === "circle" ? d.x + 22 : d.x + 30;
        } else {
          return d.data.type === "circle" ? d.x : d.x - 8;
        }
      })
      .attr("y", (d) => {
        return d.data.type === "circle" ? d.y : d.y - 10;
      })
      .attr("width", 30)
      .attr("height", 30)
      .attr("xlink:href", (d) => {
        // console.log(d)
        if (d.data.action === "flowchart") {
          return flowchartImg;
        } else if (d.data.action == "description" || !d.data.action) {
          return descriptionImg;
        }
      });

    svg
      .append("g")
      .selectAll("switch")
      .data(info.descendants())
      .enter()
      .append("switch")
      .append("foreignObject")
      .attr("x", (d) => d.x + 10)
      .attr("y", (d) => {
        return d.data.label && d.data.label.length > 17 ? d.y + 113 : d.y + 100;
      })
      .style("text-align", "center")
      .style("width", "150px")
      .style("height", "45px")
      .append("xhtml:div")
      .style("display", "table")
      .style("font-size", "15px")
      .style("width", "150px")
      .style("height", "45px")
      .append("xhtml:p")
      .style("display", "table-cell")
      .style("text-align", "center")
      .style("vertical-align", "middle")
      .style("word-break", "break-all")
      .style("font-size", "1.1em")
      .style("font-family", "Avenir Next Condensed")
      .text((d) => {
        // console.log(d.data.label);
        return d.data.label;
      })
      .on("click", (d) => {
        clickNode(d.id);
      });
  };

  useEffect(() => {
    initialFunction();
  });
  return (
    <>
      <div
        ref={chartRef}
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          zoom: chartZoom,
        }}
      />
    </>
  );
};

export default Chart;
