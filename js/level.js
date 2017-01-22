/**
 * Created by dantaeusb on 21/01/2017.
 */
define(["require", "exports", "./level/road", "./level/crossroad"], function (require, exports, road_1, crossroad_1) {
    "use strict";
    var LevelGenerator = (function () {
        function LevelGenerator() {
            this.roadParts = Array();
            this.DOM = d3.select("#sim-window");
            this.path = d3.select("#path");
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new crossroad_1.CrossRoad());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            this.roadParts.push(new road_1.Road());
            console.log(this.roadParts);
            this.draw();
        }
        LevelGenerator.prototype.dispatchBounds = function () {
        };
        LevelGenerator.prototype.draw = function () {
            for (var i in this.roadParts) {
                this.roadParts[i].drawTo(this.path);
            }
            this.path
                .style("margin-top", -(this.roadParts.length * 600 - window.innerHeight) + "px");
        };
        LevelGenerator.prototype.updateScroll = function (carPosition) {
            this.path
                .style("margin-top", -(this.roadParts.length * 600 - window.innerHeight - carPosition) + "px");
        };
        LevelGenerator.prototype.getCurrentRoad = function () {
            return this.roadParts[0];
        };
        return LevelGenerator;
    }());
    exports.LevelGenerator = LevelGenerator;
});
//# sourceMappingURL=level.js.map