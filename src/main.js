import { d3 } from '../node_modules/d3'; 
import { GoPlot } from './goplot';
class hpoVisuals{
    constructor(){
        this.goPlot();
    }
    goPlot(data,colors,height,width){
        new GoPlot(data,colors,height,width);
    }
}
module.exports = hpoVisuals;