import { scaleBand, scaleLinear, axisLeft, axisTop, max, scaleOrdinal } from 'd3'; 
import {scale} from 'd3-scale';
import {select, selection } from 'd3-selection';
import 'd3-selection-multi';
export class GoPlot{
    constructor(data,opts){
        this.data = data ? data: null; // use data if no data throw error
        if(data === null || data === undefined){
            throw Error("No Data supplied to goPlot().");
        }else{
            this.plotId = opts.plotId ? opts.plotId: ".goplot"; // default plotId
            this.colors = opts.colors ? opts.colors: ["#009ad8", "#e50000","#31b44a"]; // use default colors
            this.height = opts.height ? opts.height: 600; // use height otherwise default
            this.width = opts.width ?opts. width: 600; // use width otherwise default
            this.initializeGoPlot();
        }
    }
    initializeGoPlot(){
        // Set Height Width and Margin of Plot
        // TODO: Make this dyanamic based on viewport?
        let data = this.data;
        let margin = {top: 20, right: 40, bottom: 30, left: 80},
        width = 500 - margin.left,
        height = 400 - margin.top - margin.bottom;
        let colors = scaleOrdinal().range(this.colors);

        // Categories for the x-axis
        // category to map colors to each category
        // goTerms the different go terms we have.
        let categories = data.map(function(d){ return d.category});
        let category = 0;

        // Find how many array items we have for each category and map them.
        // @REQ: They must have the same length for each category.
        let goTerms = Array(data[0].terms.length).fill().map((v,i)=>i);

        // Don't confuse yourself. The graph is rotated, but im still treating the dependent variable as y
        // however we must modify it as if its the x.
        let x0 = scaleBand().range([0,height]).padding([.3]);
        let x1 = scaleBand();
        let y = scaleLinear().range([0,height]);
        let xAxis = axisLeft(x0).scale(x0);
        let yAxis = axisTop(y).scale(y);
        let canvas = select(this.plotId).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)
                .append("g").attr("transform","translate(" + margin.left + "," + margin.top+")");

        // Create domains on the graph.
        colors.domain([categories]);
        x0.domain(categories);
        x1.domain(goTerms).range([0,x0.bandwidth()]);
        let ymax = max(data,function(d) { return max(d.terms, function(d) { return d.value; }); });
        y.domain([0, ymax]);

        // Create both Axis
        canvas.append("g").attr("class", "x-axis").call(xAxis).selectAll("text")	
        .style("text-anchor", "end").attrs({"dy":"-1em","transform":"rotate(-45)"});
        canvas.append("g").attr("class", "y axis").style('opacity','0').call(yAxis);
        canvas.append("text").text("Quanitity of Genes")
        .attrs({"class":"y","dy":"1em","x":ymax})
        .styles({'font-size':'10px',"text-anchor":"start"});
        canvas.select('.y').transition().duration(250).delay(1000).style('opacity', '1');

        // A slice is a Category on the bar graph
        let slice = canvas.selectAll(".slice").data(data)
        .enter().append("g")
        .attrs({"class":"g","transform":function(d) { return "translate(0," + x0(d.category) + ")";}}); \

        // Create a rectangle for each term and set the width and its color;
        // For each g in a category create another for each term to contain the bar and its label.
        let group = slice.selectAll("g").data(function(d){return d.terms;}).enter().append("g").attr("class","bar");
        let bar = group.append("rect");
        let bartext = group.append("text");
        bartext.style("opacity",0);
        bartext.attr("y", function(d,i){ return x1(i) + 15}).attr("x", function(d){return y(d.value) + 10});
        bar.attr("y", function(d,i){ return x1(i)}).attr("x", function(d){ return 0; })
        .style("fill", function(d,i){ 
            let color = colors(category);
            if(i == 2){
                category++;
            }
            return color;
        }).attr("height", function(d){ return x1.bandwidth();})
        .on("mouseover", function(d) {
            select(this).style("opacity", .6);
            select(this.nextSibling).text(d.id).styles({"font-weight":"bold","font-size":"12px"});
        })
        .on("mouseout", function(d) {
            select(this).style("opacity", 1);
            select(this.nextSibling).text("");
        });

        // Transition the height of each sub slice bar to the height of its value after a delay for effect.
        bar.transition().delay(function(d){return Math.random() * 1300}).duration(1300)
        .attr("width",function(d){return y(d.value)});
        bartext.transition().duration(250).delay(1000).style('opacity', '1');
    }
}

