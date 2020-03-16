d3.json("https://apti.be/discord/api")
  .then(data => {
    var newData = [];

    var gemiddelde = data[0];
    for (let i = 1; i < data.length; i++) {
      gemiddelde += data[i].aantal;
      if (i % 60 == 0) {
        var object = { ...data[i] };
        object.aantal = gemiddelde / 60;
        newData.push(data[i]);
        gemiddelde = 0;
      }
    }

    data = [...newData];

    const dataLength = data.length;
    const translateMultiplier = 2;
    const baseMultiplier = 9;
    const fontSize = 12;

    const firstField = { aantal: CalculateAverage(data) };
    const height = firstField.aantal * baseMultiplier * translateMultiplier * 1.25;
    const width = dataLength * baseMultiplier;
    const yRectangleFontDefault = (fontSize * 10 + fontSize);

    var heightScaler = d3.scaleLinear()
      .domain([0, (firstField.aantal * baseMultiplier * translateMultiplier ** 2)])
      .range([0, height]);

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const svg = d3
      .select("#full")
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
        return height - heightScaler(d.aantal * baseMultiplier) - yRectangleFontDefault;
      })
      .attr("height", d => {
        const x = heightScaler(d.aantal * baseMultiplier);
        return x <= 0 ? 0 : x;
      })
      .attr("width", () => {
        return baseMultiplier;
      })
      .attr("fill", d => {
        return ColorCode(d.aantal);
      })
      .on("mouseover", function (d) {
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.aantal + "<br/>" + DateFromObjectId(d._id))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        div.transition()
          .duration(100)
          .style("opacity", 0);
      });

    const text = svg.selectAll("text").data(data);
    text.enter()
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text(d => { return DateFromObjectId(d._id); })
      .attr("font-family", "Verdana")
      .attr("font-size", fontSize + "px")
      .attr("fill", d => {
        return ColorCode(d.aantal);
      })
      .attr('transform', (d, idx) => {
        const x = idx * baseMultiplier + baseMultiplier;
        const y = height;
        return 'translate( ' + x + ' , ' + y + '),' + 'rotate(-90)';
      });
  })
  .catch(error => {
    console.log(error);
  });
