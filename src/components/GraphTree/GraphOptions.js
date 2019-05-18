const GraphOptions = () => {
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

export default GraphOptions;
