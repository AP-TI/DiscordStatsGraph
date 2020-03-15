d3.json("https://apti.be/discord/api")
  .then(data => {

    const firstField = data[0];
    const height = firstField.aantal * 25;
    const width = data.length;
    const multi = 4;

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

    svg.append("line")
    .attr("x", (d) =>{
      return 0;
    })
    .attr("y", (d) =>{
      return 0;
    })
    .attr("height", (d) =>{
      return 200;
    });

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
