import { d3 } from '../node_modules/d3'; 
import { GoPlot } from './goplot';
class hpoVisuals{
    constructor(){
        this.goPlot();
    }
    goPlot(plotId,data,colors,height,width){
        new GoPlot(plotId,data,colors,height,width);
    }
}
module.exports = hpoVisuals;