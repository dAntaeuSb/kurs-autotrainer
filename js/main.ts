/**
 * Created by dantaeusb on 21/01/2017.
 */

import {LevelGenerator} from "./level"
import {Car} from "./car";
import {ErrorDispatcher} from "./control/dispatcher";
import {ControlMain} from "./control/main";

let level = new LevelGenerator();
let car = new Car();
let dispatcher = new ErrorDispatcher();
let autoControl = new ControlMain(car, dispatcher, level);

d3.timer((elapsed) => {
    level.updateScroll(car.getPosition());
    level.getCurrentRoad();
});