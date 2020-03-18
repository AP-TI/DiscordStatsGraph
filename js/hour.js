const loadData = () => {
  d3.json("https://apti.be/discord/api")
    .then(d => {
      console.log("Doing a call here!");
      d = d.splice(Math.max(d.length - 60, 1));

      const dLength = d.length;
      const transMulti = 2;
      const baseMulti = 9;
      const fontSize = 12;

      const calculateMax = CalculateMax(d);
      const calculateAverage = CalculateAverage(d);
      const averageField = { aantal: calculateMax > 35 ? calculateAverage : calculateAverage + 20 };
      const h = averageField.aantal * baseMulti;
      const w = dLength * baseMulti;
      const fontDef = (fontSize * 10 + fontSize);

      var hScalar = d3.scaleLinear()
        .domain([0, (averageField.aantal * baseMulti * transMulti ** 2)])
        .range([0, h]);

      var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      d3.select("#hour")
        .select("svg")
        .remove();

      const svg = d3
        .select("#hour")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const rects = svg.selectAll("rect").data(d);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, idx) => {
          return idx * baseMulti;
        })
        .attr("y", d => {
          return h - hScalar(d.aantal * baseMulti) - fontDef;
        })
        .attr("height", d => {
          const x = hScalar(d.aantal * baseMulti);
          return x <= 0 ? 0 : x;
        })
        .attr("width", () => {
          return baseMulti;
        })
        .attr("fill", d => {
          return ColorCode(d.aantal);
        })
        .on("mouseover", function (d) {
          div.transition()
            .duration(200)
            .style("opacity", .9);
          div.html("aantal: " + d.aantal + "<br/>" + DateFromObjectId(d._id).toLocaleString())
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
          div.transition()
            .duration(100)
            .style("opacity", 0);
        });

      const text = svg.selectAll("text").data(d);
      let sDate = new Date(Date.now());
      sDate.setDate(sDate.getDate() + 1);

      text.enter()
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(d => {
          let lDate = DateFromObjectId(d._id);
          let result = lDate.getHours().toString().padStart(2, "0") + "h" + lDate.getMinutes().toString().padStart(2, "0");

          if (!(sDate.getDay() == lDate.getDay()))
            result += " " + lDate.toLocaleDateString();

          sDate = lDate;
          return result;
        })
        .attr("font-family", "Verdana")
        .attr("font-size", fontSize + "px")
        .attr("fill", d => {
          return ColorCode(d.aantal);
        })
        .attr('transform', (d, idx) => {
          const x = idx * baseMulti + baseMulti;
          const y = h;
          return 'translate( ' + x + ' , ' + y + '),' + 'rotate(-90)';
        });
    })
    .catch(error => {
      console.log(error);
    });
}

loadData();
setInterval(loadData, 60000);