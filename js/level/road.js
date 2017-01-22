/**
 * Created by dantaeusb on 21/01/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Road = (function () {
        function Road(stopAllowed) {
            if (stopAllowed === void 0) { stopAllowed = false; }
            this.stopAllowed = false;
            this.speedLimit = 40;
            this.hasStopLight = false;
            this.classed = "road";
        }
        Road.prototype.drawTo = function (element) {
            element.append("div")
                .classed(this.classed, true);
        };
        Road.prototype.getSpeedLimit = function () {
            return this.speedLimit;
        };
        Road.prototype.getLanesBorders = function () {
            return {
                0: {
                    x1: 126,
                    x2: 287
                },
                1: {
                    x1: 287,
                    x2: 457
                },
                2: {
                    x1: 457,
                    x2: 626
                }
            };
        };
        return Road;
    }());
    exports.Road = Road;
});
//# sourceMappingURL=road.js.map