d3.json("data.json", function(error, data) {
  if (error) throw error;
  drawBubbles(data.dosages)
});

const width = 660;
const height = 600;
const sunshineYellow = "#ffe638";
const name = "Baruna";

let div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

function drawBubbles(data){

  let dataArray = [];

  let svg = d3.selectAll("svg");

  for(let i = 0; i < d3.keys(data).length; i++) {
    let object = {
      "Dosage":"",
      "count": 0
    };
    object.Dosage = d3.keys(data)[i];
    object.count = data[d3.keys(data)[i]];
    dataArray.push(object);
  }
  dataArray.sort((x, y) => d3.descending(x["count"], y["count"]));
  let dataset = {"children":dataArray}

  let bubble = d3.pack()
                .size([height, height])
                .padding(5);
  let nodes = d3.hierarchy(dataset)
                .sum((d) => d.count);

  console.log(bubble(nodes).children);

  let node = svg.selectAll(".node")
          .data(bubble(nodes).children)
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

  node.append("circle")
          .attr("r", (d) => d.r)
          .attr("fill",sunshineYellow)
          .attr("fill-opacity",0.6)
          .attr("stroke",sunshineYellow)
          .attr("stroke-width",1)
          .on("mouseover", function(d) {
            div.transition()
              .duration(200)
              .style("opacity", .9);
            div.html("Dosage: <span style='font-weight:bold'>" + d.data.Dosage +  "</span><br/>"  + "Count: <span style='font-weight:bold'>" + d.data.count + "</span>")
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 15) + "px");
          })
          .on("mousemove",function(d){
            div.style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY - 15) + "px");
          })
          .on("mouseout", function(d) {
            div.transition()
              .duration(250)
              .style("opacity", 0);
          });
  node.filter((d,i) =>  d.data.count >= 3 )
    .append("text")
    .attr("x", 0)
    .attr("y", 5)
    .text((d) =>  d.data.Dosage)
    .attr("text-anchor","middle")
    .attr("font-size",12)
    .attr("fill","#fff")
    .attr("font-family","Futurice")
}
