import { d3 } from '../node_modules/d3'; 
import { GoPlot } from './goplot';
class hpoVisuals{
    constructor(){
    }
    goPlot(data,opts){
        if(!opts){
            opts = {};
        }
        new GoPlot(data,opts);
    }
}
module.exports = hpoVisuals;