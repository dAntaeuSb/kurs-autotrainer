/**
 * Created by dantaeusb on 21/01/2017.
 */
define(["require", "exports", "./level", "./car", "./control/dispatcher", "./control/main"], function (require, exports, level_1, car_1, dispatcher_1, main_1) {
    "use strict";
    var level = new level_1.LevelGenerator();
    var car = new car_1.Car();
    var dispatcher = new dispatcher_1.ErrorDispatcher();
    var autoControl = new main_1.ControlMain(car, dispatcher, level);
    d3.timer(function (elapsed) {
        level.updateScroll(car.getPosition());
        level.getCurrentRoad();
    });
});
//# sourceMappingURL=main.js.map