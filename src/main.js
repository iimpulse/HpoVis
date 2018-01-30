import { d3 } from '../node_modules/d3'; 
import { GoPlot } from './goplot';
class hpoVisuals{
    constructor(){
        this.goPlot();
    }
    goPlot(){
        new GoPlot();
    }
}
module.exports = hpoVisuals;