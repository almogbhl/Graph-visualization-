import React, { Component } from "react";
import Graph from "react-graph-vis";
import students from "../data/students.json";

class PrintGraph extends Component {
  state = {
    graph: null,
    options: null,
    studentsData: null
  };

  async componentDidMount() {
    await this.calcAverage();
    this.manipulateData();
  }

  calcAverage = () => {
    students.map(student => {
      let total;
      let average;
      let scores = [];

      student.scores.map(score => {
        scores.push(score.score);
      });

      total = scores.reduce(function(acc, val) {
        return acc + val;
      }, 0);

      average = parseInt(total / student.scores.length);

      student["average"] = average;
    });

    this.setState({ studentsData: students });
  };

  createGraph = () => {
    let graph = {
      nodes: [],
      edges: []
    };

    return graph;
  };

  createBaseNodes = () => {
    const graph = this.createGraph();

    graph.nodes.push(
      {
        id: 1,
        label: "grades",
        color: { border: "#fff", background: "rgba(241, 196, 15,1)" }
      },
      {
        id: 2,
        label: "failed",
        color: { border: "#fff", background: "rgba(234, 32, 39,.4)" }
      },
      {
        id: 3,
        label: "passed",
        color: { border: "#fff", background: "rgba(76, 209, 55,.4)" }
      }
    );

    graph.edges.push({ from: 1, to: 2 }, { from: 1, to: 3 });

    return graph;
  };

  
  setGraphOptions = () => {
    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        font: { color: "#fff", strokeColor: "#000", align: "middle" },
        dashes: true,
        length: 180
      },
      nodes: {
        color: {
          border: "#BFEDF7",
          background: "rgba(255,255,255,0.3)",
          highlight: {
            border: "#44C4D2",
            background: "#246478"
          }
        },
        font: {
          color: "#FFF",
          size: 16,
          face: "Inconsolata",
          align: "center"
        },
        shape: "circle"
      }
    };

    return options;
  };

  manipulateData = () => {
    const graph = this.createBaseNodes();
    const options = this.setGraphOptions();

    const students = this.state.studentsData;

    let counterChild = 4;
    let counterParent = 4;
    let counterAverage = 4;

    students.map(u => {
      if (u._id >= 0) {
        const child = u.scores;
        const firstNodeTemplate = { id: counterChild, label: u.name };
        counterChild++;
        const averageNodeTemplate = { id: counterChild, label: `${u.average}` };

        graph.nodes.push(firstNodeTemplate);
        graph.nodes.push(averageNodeTemplate);
        counterChild++;

        if (child.length) {
          child.map(s => {
            const score = parseInt(s.score);
            const firstEdgeTemplate = {
              from: counterParent,
              to: counterChild,
              label: `${s.type}`
            };
            const secondNodeTemplate = {
              id: counterChild,
              label: `${score}`,
              color: {
                border: "#BFEDF7",
                background: "transparent",

                highlight: {
                  border: "#44C4D2",
                  background: "#246478"
                }
              }
            };

            counterAverage = counterParent + 1;

            const averageEdgeTemplate = {
              from: counterChild,
              to: counterAverage,
              label: `average`
            };

            const hasFailedTemplate = {
              from: counterAverage,
              to: 2,
              label: "hasFailed"
            };
            const hasPassedTemplate = {
              from: counterAverage,
              to: 3,
              label: "hasPassed"
            };

            graph.nodes.push(secondNodeTemplate);
            graph.edges.push(firstEdgeTemplate);
            graph.edges.push(averageEdgeTemplate);

            if (u.average <= 56) {
              graph.edges.push(hasFailedTemplate);
            } else {
              graph.edges.push(hasPassedTemplate);
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
    if (this.state.graph !== null) {
      return (
        <div>
          <Graph
            graph={this.state.graph}
            options={this.state.options}
            style={{
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
              background: "linear-gradient(#000116, #002538)"
            }}
          />
        </div>
      );
    } else {
      return "Loading";
    }
  }
}

export default PrintGraph;
