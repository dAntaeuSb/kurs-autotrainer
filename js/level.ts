/**
 * Created by dantaeusb on 21/01/2017.
 */

import {Road} from "./level/road"
import {CrossRoad} from "./level/crossroad";

export class LevelGenerator {
    protected DOM;
    protected path;
    protected roadParts = Array<Road>();

    constructor() {
        this.DOM = d3.select("#sim-window");
        this.path = d3.select("#path");

        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new CrossRoad());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());
        this.roadParts.push(new Road());

        console.log(this.roadParts);

        this.draw();
    }

    protected dispatchBounds() {

    }

    public draw() {
        for(let i in this.roadParts) {
            this.roadParts[i].drawTo(this.path);
        }

        this.path
            .style("margin-top", `${-(this.roadParts.length * 600 - window.innerHeight)}px`);
    }

    public updateScroll(carPosition) {
        this.path
            .style("margin-top", `${-(this.roadParts.length * 600 - window.innerHeight - carPosition)}px`);
    }

    public getCurrentRoad(): Road {
        return this.roadParts[0];
    }
}