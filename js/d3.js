d3.json("https://apti.be/discord/api")
  .then(data => {
    var newData = [];

    for (let i = 0; i < data.length; i += 60) {
      newData.push(data[i]);
    }

    data = [...newData];

    const dataLength = data.length;
    const translateMultiplier = 2;
    const baseMultiplier = 9;
    const fontSize = 12;

    const firstField = data[0];
    const height = firstField.aantal * baseMultiplier * translateMultiplier * 1.25;
    const width = dataLength * baseMultiplier;
    const yRectangleFontDefault = (fontSize * 10 + fontSize);

    var dateFromObjectId = function (objectId) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toLocaleString();
    };

    var colorCode = function (aantal) {
      if (aantal > 50) return "rgb(204,0,0)";
      else if (aantal > 40) return "rgb(204,102,0)";
      else if (aantal > 30) return "rgb(204,204,0)";
      else if (aantal > 20) return "rgb(102,204,0)";
      else if (aantal > 10) return "rgb(0,0,204)";
      else if (aantal > 5) return "rgb(0,102,102)";
      else return "rgb(0,0,0";
    };

    var heightScaler = d3.scaleLinear()
      .domain([0, (firstField.aantal * baseMultiplier * translateMultiplier ** 2)])
      .range([0, height]);

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
        return colorCode(d.aantal);
      });

    const text = svg.selectAll("text").data(data);
    text.enter()
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text(d => { return dateFromObjectId(d._id); })
      .attr("font-family", "Verdana")
      .attr("font-size", fontSize + "px")
      .attr("fill", d => {
        return colorCode(d.aantal);
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
