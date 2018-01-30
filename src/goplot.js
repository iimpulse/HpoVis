import * as d3 from 'd3'; 
import {scale} from 'd3-scale';
export class GoPlot{
    constructor(opts){
        this.data = [];
        this.opts = opts;
        this.colors = [];
        this.initializeGoPlot();
    }
    initializeGoPlot(){
        var data = [4, 8, 15, 16, 23, 42];
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        var x0 = d3.scaleBand().range([0,width]).padding([.2])
        var x1 = d3.scaleBand();
        var y = d3.scaleLinear().range([height, 0]);
        var xAxis = d3.axisBottom(x0).scale(x0);
        var yAxis = d3.axisLeft(y).scale(y);
        var canvas = d3.select(".goplot").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)
                .append("g").attr("transform","translate(" + margin.left + "," + margin.top+")");
        var color = d3.scaleOrdinal().range(["#ca0020","#f4a582","#d5d5d5"]);

        d3.json('src/data/go.json',function(data){
            var categories = ["cellularComponent", "molecularFunction","biologicalProcess"];
            var goTerms = ["GOTERM1","GOTERM2","GOTERM3"];
            //
            x0.domain(categories);
            x1.domain(goTerms).range([0,x0.bandwidth()]);
            y.domain([0,160]);
            y.domain([0, d3.max(data, function(d) { return d3.max(d.terms, function(d) { return d.value; }); })]);
            canvas.append("g").attr("class", "x-axis").attr("transform","translate(0," + height + ")")
            .call(xAxis);
            canvas.append("g").attr("class", "y axis").style('opacity','0').call(yAxis);
            canvas.select('.y').transition().duration(500).delay(1300).style('opacity', '1');
            
            var slice = canvas.selectAll(".slice")
            .data(data)
            .enter().append("g")
            .attr("class","g").attr("transform",function(d) { return "translate(" + x0(d.category) + ",0)";});

            slice.selectAll("rect")
            .data(function(d){return d.terms;})
            .enter().append("rect").attr("width",x1.bandwidth())
            .attr("x", function(d){ return x1(d.id);})
            .style("fill", function(d){ return color(d.id);})
            .attr("y", function(d){return y(0); })
            .attr("height", function(d){ return height - y(0);});

            slice.selectAll("rect")
            .transition()
            .delay(function(d){return Math.random() * 1000})
            .duration(1000)
            .attr("y",function(d) {return y(d.value);})
            .attr("height",function(d){ return height - y(d.value)});
        });
        /*var plot = d3.select(".goplot")
        .selectAll("div")
        .data(this.data)
        .enter().append("div")
            .style("width", function(d) { return scalePlot(d) + "px"; })
            .text(function(d) { return d; });*/
    }
}

