import React, { Component } from "react";
import Graph from "react-graph-vis";
import styled from "styled-components";
import grades from "./grades.json";

class PrintGraph extends Component {
  state = {
    graph: null,
    options: null,
    events: null
  };

  componentDidMount() {
    this.dataManipulation();
  }

  dataManipulation = () => {
    let graph = {
      nodes: [],
      edges: []
    };
    let counter = 1;
    let counterParent = 1;

    let users = grades.filter(u => u._id <= 35);

    let data = users.map(g => {
      if (g._id >= 0) {
        const child = g.scores;
        graph.nodes.push({
          id: counter,
          label: g.name
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
                  background: "#246478",
                }
            }});

            graph.edges.push({
              from: counterParent,
              to: counter,
              label: `${s.type}`
            });

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
        font: {color: '#fff', strokeColor: '#000', align: "middle"},
        dashes: true,
        length: 180,
        
      },
      nodes: {
        color: {
          border: "#BFEDF7",
          background: "rgba(255,255,255,0.3)",
          highlight: {
            border: "#44C4D2",
            background: "#246478",
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
    if (this.state.graph) {
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
