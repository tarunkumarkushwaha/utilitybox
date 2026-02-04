// import JsonFormatter from "../tools/json/JsonFormatter";
import BarGraph from "../../Components/Tools/ToolBox/BarGraph";

export const TOOLS = [
//   {
//     id: "json-formatter",
//     name: "JSON Formatter",
//     category: "JSON",
//     description: "Pretty formats JSON input",
//     inputs: [
//       { label: "JSON Input", placeholder: "Paste raw JSON" }
//     ],
//     Component: JsonFormatter
//   },
  {
    id: "bar-graph",
    name: "Bar Graph Generator",
    category: "Graphs",
    description: "Generate bar graph from numbers",
    inputs: [
      { label: "Values", placeholder: "10,20,30" },
      { label: "Max Value", placeholder: "100" }
    ],
    Component: BarGraph
  }
];