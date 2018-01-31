# Human Phenotype Ontology Visualizations #
A javascript ( ECMA6 ) visualization library for the Human Phenotype Ontology Project using d3.js v4

http://human-phenotype-ontology.github.io/

---
## Installation For Development ##
Node
Node Package Manager

`npm install`

---
## Deploy For Development ##

`webpack-dev-server` - Will deploy to localhost:8080

---
##  Build For Use ##
TBD - Will be deploying to NPM for use.

---
## API Reference ##

### Gene Ontology Plot ###
The gene ontology plot was created to represent to go terms related to the three main hierarchical categories for a given hpo term.

##### Usage #####
`hpoVisuals.goPlot(plotId,data,colors,height,width)`
#### Defaults ####
plotId - A class identifier for the plot. (default: ".goplot")  
data - JSON data for the plot. Please reference data/go.json (default: None)  
colors - A list of hex values for each category (default: ["#009ad8", "#e50000","#31b44a"])  
height - Height of the plot (default: 400px)  
width - Width of the plot (default: 400px)

---
