var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./road"], function (require, exports, road_1) {
    "use strict";
    var CrossRoad = (function (_super) {
        __extends(CrossRoad, _super);
        function CrossRoad() {
            _super.apply(this, arguments);
            this.classed = "cross-road";
        }
        return CrossRoad;
    }(road_1.Road));
    exports.CrossRoad = CrossRoad;
});
//# sourceMappingURL=crossroad.js.map