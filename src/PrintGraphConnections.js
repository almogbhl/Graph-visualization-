import React, { Component } from "react";
import Graph from "react-graph-vis";
import grades from "./grades.json";

class PrintGraph extends Component {
  state = {
    graph: null,
    options: null,
    events: null,
    data: null
  };

  async componentDidMount() {
    await this.calcAverage();
    this.dataManipulation();
  }

  calcAverage = () => {
    let data = grades.map(u => {
      let scores = [];
      u.scores.map(s => {
        scores.push(s.score);
      });
      let total = scores.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      let average = parseInt(total / u.scores.length);

      u["average"] = average;
    });

    this.setState({ data: grades });
  };

  dataManipulation = () => {
    let graph = {
      nodes: [],
      edges: []
    };
    let counter = 4;
    let counterParent = 4;
    let counterAverage = 4;

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

    let users = this.state.data.filter(u => u._id <= 12);

    let data = users.map(u => {
      if (u._id >= 0) {
        const child = u.scores;

        graph.nodes.push({
          id: counter,
          label: u.name
        });
        counter++;

        graph.nodes.push({
          id: counter,
          label: `${u.average}`
        });
        counter++;

        if (child.length) {
          child.map(s => {
            const score = parseInt(s.score);

            graph.nodes.push({
              id: counter,
              label: `${score}`,
              color: {
                border: "#BFEDF7",
                background: "transparent",

                highlight: {
                  border: "#44C4D2",
                  background: "#246478"
                }
              }
            });

            graph.edges.push({
              from: counterParent,
              to: counter,
              label: `${s.type}`
            });
            counterAverage = counterParent + 1;
            graph.edges.push({
              from: counter,
              to: counterAverage,
              label: `average`
            });

            if (u.average <= 56) {
              graph.edges.push({
                from: counterAverage,
                to: 2,
                label: "hasFailed"
              });
            } else {
              graph.edges.push({
                from: counterAverage,
                to: 3,
                label: "hasPassed"
              });
            }
            counter++;
          });
        }

        counterParent = counter;
      }
    });

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
            events={this.state.events}
            style={{
              height: "100vh",
              verflow: "hidden",
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
