/**
 * Created by dantaeusb on 21/01/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var RoadError = (function () {
        function RoadError(code, name, points) {
            if (points === void 0) { points = 1; }
            this.points = 1;
            this.code = code;
            this.name = name;
            this.points = points;
        }
        RoadError.prototype.getCode = function () {
            return this.code;
        };
        RoadError.prototype.getName = function () {
            return this.name;
        };
        RoadError.prototype.getPoints = function () {
            return this.points;
        };
        return RoadError;
    }());
    exports.RoadError = RoadError;
});
//# sourceMappingURL=error.js.map