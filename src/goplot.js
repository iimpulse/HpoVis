import * as d3 from 'd3'; 
import {scale} from 'd3-scale';
export class GoPlot{
    constructor(plotId,data,colors,height,width){
        this.data = []; // use data if no data throw error
        this.plotId = plotId ? plotId: ".goplot"; // default plotId
        this.colors = colors ? colors: ["#009ad8", "#e50000","#31b44a", ] // use default colors
        this.height = height ? height: 600; // use height otherwise default
        this.width = width ? width: 600; // use width otherwise default
        this.initializeGoPlot();
    }
    initializeGoPlot(){
        // Set Height Width and Margin of Plot
        // TODO: Make this dyanamic based on viewport?
        var margin = {top: 20, right: 40, bottom: 30, left: 80},
        width = 400 - margin.left,
        height = 400 - margin.top - margin.bottom;
        var x0 = d3.scaleBand().range([0,width]).padding([.3])
        var x1 = d3.scaleBand();
        var y = d3.scaleLinear().range([0,height]);
        var xAxis = d3.axisLeft(x0).scale(x0);
        var yAxis = d3.axisTop(y).scale(y);
        var canvas = d3.select(this.plotId).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)
                .append("g").attr("transform","translate(" + margin.left + "," + margin.top+")");
        var colors = d3.scaleOrdinal().range(this.colors);
        // TODO: Create opt for service URL
        d3.json('src/data/go.json',function(data){
            // Categories for the x-axis
            // category to map colors to each category
            // goTerms the different go terms we have.
            var categories = data.map(function(d){ return d.category})
            var category = 0;
            // Find how many array items we have for each category and map them.
            // @REQ: They must have the same length for each category.
            var goTerms = Array(data[0].terms.length).fill().map((v,i)=>i);
            // Create domains on the graph.
            colors.domain([categories]);
            x0.domain(categories);
            x1.domain(goTerms).range([0,x0.bandwidth()]);
            y.domain([0, d3.max(data, function(d) { return d3.max(d.terms, function(d) { return d.value; }); })]);
            // Create both Axis
            canvas.append("g").attr("class", "x-axis").call(xAxis).selectAll("text")	
            .style("text-anchor", "end").attr("dy", "-1em").attr("transform", "rotate(-45)");
            canvas.append("g").attr("class", "y axis").style('opacity','0').call(yAxis);
            canvas.select('.y').transition().duration(250).delay(1000).style('opacity', '1');
            // A slice is a Category on the bar graph
            var slice = canvas.selectAll(".slice").data(data)
            .enter().append("g").attr("class","g") 
            .attr("transform",function(d) { return "translate(0," + x0(d.category) + ")";});
            // Create a rectangle for each term and set the width and its color;
            // Get all the "rect" for each slice (should be zero) and for each d.terms append a new rect.
            slice.selectAll("rect").data(function(d){return d.terms;}).enter()
            .append("rect").attr("y", function(d,i){ return x1(i)}).attr("x", function(d){ return 0; })
            .style("fill", function(d,i){ 
                var color = colors(category);
                if(i == 2){
                    category++;
                }
                return color;
            }).attr("height", function(d){ return x1.bandwidth();});
            // Transition the height of each sub slice bar to the height of its value after a delay for effect.
            slice.selectAll("rect").transition().delay(function(d){return Math.random() * 1300}).duration(1300)
            .attr("width",function(d){return y(d.value)});
        });
    }
}

