d3.json("https://apti.be/discord/api")
  .then(d => {
    d.reverse();
    const nData = [];

    let sAverage = d[0];
    for (let i = 1; i < d.length; i++) {
      sAverage += d[i].aantal;
      if (i % 60 == 0) {
        const obj = { ...d[i] };
        obj.aantal = sAverage / 60;
        nData.push(d[i]);
        sAverage = 0;
      }
    }

    d = [...nData];

    const dLength = d.length;
    const transMulti = 2;
    const baseMulti = 9;
    const fontSize = 12;

    const averageField = { aantal: CalculateAverage(d) };
    const h = averageField.aantal * baseMulti * transMulti * 1.25;
    const w = dLength * baseMulti;
    const fontDef = (fontSize * 10 + fontSize);

    var hScalar = d3.scaleLinear()
      .domain([0, (averageField.aantal * baseMulti * transMulti ** 2)])
      .range([0, h]);

    var divEle = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const svgEle = d3
      .select("#full")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    const rects = svgEle.selectAll("rect").data(d);

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
        divEle.transition()
          .duration(200)
          .style("opacity", .9);
        divEle.html(d.aantal + "<br/>" + DateFromObjectId(d._id).toLocaleString())
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        divEle.transition()
          .duration(100)
          .style("opacity", 0);
      })
      .on("click", (d) => {
        alert(d._id);
      });

    const text = svgEle.selectAll("text").data(d);

    let sDate = new Date(Date.now());
    sDate.setDate(sDate.getDate() + 1);

    text.enter()
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text(d => {
        let lDate = DateFromObjectId(d._id);
        let result = lDate.toLocaleTimeString();

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
