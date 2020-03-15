d3.json("https://apti.be/discord/api")
  .then(data => {
    //data.forEach(d => d.aantal.numberInt = +d.aantal.numberInt);
    const firstField = data[0];
    const height = firstField.aantal * 25;
    const multi = 4;

    const svg = d3
      .select("#data-here")
      .append("svg")
      .attr("width", data.length)
      .attr("height", height);

      const rectangles = svg.selectAll("rect").data(data);

    rectangles
      .enter()
      .append("rect")
      .attr("x", (d, idx) => {
        return idx;
      })
      .attr("y", function (d, idx) {
        return height - d.aantal * multi;
      })
      .attr("height", function (d) {
        const x = d.aantal * multi;

        if (x <= 0) return 0;

        return x;
      })
      .attr("width", "1px")
      .attr("fill", d => {
        if (d.aantal > 50) return "rgb(204,0,0)";
        else if (d.aantal > 40) return "rgb(204,102,0)";
        else if (d.aantal > 30) return "rgb(204,204,0)";
        else if (d.aantal > 20) return "rgb(102,204,0)";
        else if (d.aantal > 10) return "rgb(0,0,204)";
        else return "rgb(0,0,0";
      });
  })
  .catch(error => {
    console.log(error);
  });
