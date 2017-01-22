define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by dantaeusb on 22/01/2017.
     */
    var ControlMain = (function () {
        function ControlMain(car, errorDispatcher, level) {
            var _this = this;
            this.registred = [];
            this.car = car;
            this.errorDispatcher = errorDispatcher;
            this.level = level;
            this.controlInterval = d3.interval(function () {
                _this.tick();
            }, 100);
        }
        ControlMain.prototype.tick = function () {
            var stats = this.car.getStats();
            var bounds = this.car.getBounds();
            this.checkBeltOnMove(stats)
                .checkEngineOnMove(stats)
                .checkSpeedLimit(stats, bounds)
                .checkLights(stats)
                .checkReverseLine(stats, bounds);
        };
        ControlMain.prototype.checkBeltOnMove = function (stats) {
            var code = "2.6";
            if (this.registred.indexOf(code) != -1) {
                return this;
            }
            if (stats.speed > 30 && !stats.belt) {
                this.errorDispatcher.dispatchCode(code);
                this.registred.push(code);
                this.activateErrorAfterTimeout(code);
            }
            return this;
        };
        ControlMain.prototype.checkEngineOnMove = function (stats) {
            var code = "3.11";
            if (this.registred.indexOf(code) != -1) {
                return this;
            }
            if (stats.speed > 100 && !stats.engineOn) {
                this.errorDispatcher.dispatchCode(code);
                this.registred.push(code);
                this.activateErrorAfterTimeout(code);
            }
            return this;
        };
        ControlMain.prototype.checkSpeedLimit = function (stats, bounds) {
            var code = "1.12";
            var warnCode = "0.0";
            var basicLimit = this.level.getCurrentRoad().getSpeedLimit() * 10;
            if (this.registred.indexOf(warnCode) == -1 && stats.speed > basicLimit) {
                this.errorDispatcher.dispatchCode(warnCode);
                this.registred.push(warnCode);
                this.activateErrorAfterTimeout(warnCode);
            }
            if (this.registred.indexOf(code) == -1 && stats.speed > basicLimit + 100) {
                this.errorDispatcher.dispatchCode(code);
                this.registred.push(code);
                this.activateErrorAfterTimeout(code);
            }
            return this;
        };
        ControlMain.prototype.checkLights = function (stats) {
            var code1 = "3.7";
            var code2 = "2.4";
            if (this.registred.indexOf(code1) == -1 && stats.speed > 100 && !stats.lights) {
                this.errorDispatcher.dispatchCode(code1);
                this.registred.push(code1);
                this.activateErrorAfterTimeout(code1);
            }
            if (this.registred.indexOf(code2) == -1 && stats.speed > 200 && stats.alarm) {
                this.errorDispatcher.dispatchCode(code2);
                this.registred.push(code2);
                this.activateErrorAfterTimeout(code2);
            }
            return this;
        };
        ControlMain.prototype.checkReverseLine = function (stats, bounds) {
            var code1 = "1.3";
            var code2 = "1.16";
            var carInLanes = [];
            for (var i in bounds) {
                var point = bounds[i];
                var laneBorders = this.level.getCurrentRoad().getLanesBorders();
                for (var k in laneBorders) {
                    var yArr = laneBorders[k];
                    if (point.x > yArr.x1 && point.x < yArr.x2) {
                        carInLanes.push(k);
                    }
                }
            }
            if (this.registred.indexOf(code1) == -1 && carInLanes.indexOf("0") != -1) {
                this.errorDispatcher.dispatchCode(code1);
                this.registred.push(code1);
                this.activateErrorAfterTimeout(code1);
            }
            if (this.registred.indexOf(code2) == -1 && carInLanes.length <= 2) {
                this.errorDispatcher.dispatchCode(code2);
                this.registred.push(code2);
                this.activateErrorAfterTimeout(code2);
            }
            return this;
        };
        ControlMain.prototype.activateErrorAfterTimeout = function (code, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 15000; }
            d3.timeout(function () {
                var i = _this.registred.indexOf(code);
                if (i != -1) {
                    var removed = _this.registred.splice(i, 1);
                    console.log(removed);
                }
            }, timeout);
        };
        return ControlMain;
    }());
    exports.ControlMain = ControlMain;
});
//# sourceMappingURL=main.js.map