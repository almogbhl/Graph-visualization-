import React, { Component } from "react";
import Graph from "react-graph-vis";
import students from "../../data/students.json";
import GraphOptions from "./GraphOptions";
import CalcAverage from "./CalcAverage";

class GraphTree extends Component {
  state = {
    graph: null,
    options: null,
    studentsData: null
  };

  async componentDidMount() {
    const studentsData = CalcAverage(students);
    await this.setState({ studentsData });
    this.manipulateData();
  };

  nodeTemplate = (id, label, color) => {
    return {
      id,
      label,
      color
    }
  };

  edgeTemplate = (from, to, label) => {
    return {
      from,
      to,
      label
    }
  };

  createBaseNodes = () => {
    const nodeTemplate = this.nodeTemplate;
    const edgeTemplate = this.edgeTemplate;
    const graph = {
      nodes: [],
      edges: []
    };
    const nodes = graph.nodes;
    const edges = graph.edges;

    nodes.push(nodeTemplate(1, "grades", { border: "#fff", background: "rgba(241, 196, 15,1)" }))
    nodes.push(nodeTemplate(2, "failed", { border: "#fff", background: "rgba(234, 32, 39,.4)" }))
    nodes.push(nodeTemplate(3, "passed", { border: "#fff", background: "rgba(76, 209, 55,.4)" }))
   
    edges.push(edgeTemplate(1,2));
    edges.push(edgeTemplate(1,3));

    return graph;
  };

  manipulateData = () => {
    const graph = this.createBaseNodes();
    const options = GraphOptions();
    const nodes = graph.nodes;
    const edges = graph.edges;
    const students = this.state.studentsData;
    const nodeTemplate = this.nodeTemplate;
    const edgeTemplate = this.edgeTemplate;

    let counterChild = 4;
    let counterParent = 4;
    let counterAverage = 4;

    students.map(u => {
      if (u._id >= 0) {
        const child = u.scores;
      
        nodes.push(nodeTemplate(counterChild, u.name));
        counterChild++;
        nodes.push(nodeTemplate(counterChild, `${u.average}`));
        counterChild++;

        if (child.length) {
          child.map(s => {
            const score = parseInt(s.score);
      
            edges.push(edgeTemplate(counterParent, counterChild, `${s.type}`));
            nodes.push(nodeTemplate(counterChild, `${score}`, {background: "transparent",}));

            counterAverage = counterParent + 1;
        
            edges.push(edgeTemplate(counterChild, counterAverage, "average"));

            if (u.average <= 56) {
              edges.push(edgeTemplate(counterAverage, 2, "hasFailed"));
            } else {
              edges.push(edgeTemplate(counterAverage, 3, "hasPassed"));
            }
            counterChild++;
          });
        }
        counterParent = counterChild;
      }
    });

    this.setState({
      options,
      graph
    });
  };

  render() {
    const {graph, options} = this.state;
    if (graph === null) {
      return "loading...";
    } else {
      return (
          <Graph
            graph={graph}
            options={options}
            style={{
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
              background: "linear-gradient(#000116, #002538)"
            }}
          />
      );
    }
  }
}

export default GraphTree;
