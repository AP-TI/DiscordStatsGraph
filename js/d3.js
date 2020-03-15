d3.json("https://apti.be/discord/api")
  .then(data => {
    var newData = [];

    for (let i = 0; i < data.length; i += 60) {
      newData.push(data[i]);
    }

    data = [...newData];

    const dataLength = data.length;
    const translateMultiplier = 2;
    const baseMultiplier = 10;

    const firstField = data[0];
    const height = firstField.aantal * baseMultiplier * translateMultiplier *1.5;
    const width = dataLength * baseMultiplier * translateMultiplier;

    console.log(dataLength)
    console.log(firstField);
    console.log(firstField._id);

    var dateFromObjectId = function (objectId) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toLocaleString();
    };

    console.log(dateFromObjectId(firstField._id));

    const svg = d3
      .select("#data-here")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const rectangles = svg.selectAll("rect").data(data);

    rectangles
      .enter()
      .append("rect")
      .attr("x", (d, idx) => {
        return idx * baseMultiplier;
      })
      .attr("y", d => {
        return height - d.aantal * baseMultiplier - 200;
      })
      .attr("height", d => {
        const x = d.aantal * baseMultiplier;

        if (x <= 0) return 0;

        return x;
      })
      .attr("width", () => {
        return baseMultiplier;
      })
      .attr("transform", (d, idx) => {
        return `translate(${[translateMultiplier * idx, 0]})`
      })
      .attr("fill", d => {
        if (d.aantal > 50) return "rgb(204,0,0)";
        else if (d.aantal > 40) return "rgb(204,102,0)";
        else if (d.aantal > 30) return "rgb(204,204,0)";
        else if (d.aantal > 20) return "rgb(102,204,0)";
        else if (d.aantal > 10) return "rgb(0,0,204)";
        else return "rgb(0,0,0";
      });

      const text = svg.selectAll("text").data(data);

      text.enter()
      .append("text")
      .attr("x", (d, idx) => {
        return idx * baseMultiplier;
      })
      .attr("y", d => {
        return height - d.aantal * baseMultiplier;
      })
      .text(d => { return dateFromObjectId(d._id);})
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "red");
  })
  .catch(error => {
    console.log(error);
  });
