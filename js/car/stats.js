define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Created by dantaeusb on 21/01/2017.
     */
    var CarStats = (function () {
        function CarStats(car) {
            this.car = car;
            this.dom = d3.select("#car-state");
            this.paramsDom = {
                engine: this.dom.select("#car-state-engine"),
                speed: this.dom.select("#car-state-speed"),
                //transmission: this.dom.select("#car-state-transmission"),
                breakEnabled: this.dom.select("#car-state-break"),
                lights: this.dom.select("#car-state-lights"),
                alarm: this.dom.select("#car-state-alarm"),
                belt: this.dom.select("#car-state-belt"),
            };
        }
        CarStats.prototype.update = function () {
            var stats = this.car.getStats();
            this.paramsDom.engine.text("\u0414\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044C: " + (stats.engineOn ? "вкл" : "выкл"));
            this.paramsDom.speed.text("\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C: " + Math.round(stats.speed / 10) + "\u043A\u043C/\u0447");
            //this.paramsDom.transmission.text(`Передача: ${stats.transmission}`);
            this.paramsDom.breakEnabled.text("\u0420\u0443\u0447\u043D\u0438\u043A: " + (stats.breakEnabled ? "вкл" : "выкл"));
            this.paramsDom.lights.text("\u0413\u0430\u0431\u0430\u0440\u0438\u0442\u044B: " + (stats.lights ? "вкл" : "выкл"));
            this.paramsDom.alarm.text("\u0410\u0432\u0430\u0440\u0438\u0439\u043D\u0430\u044F \u0441\u0438\u0433\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F: " + (stats.alarm ? "вкл" : "выкл"));
            this.paramsDom.belt.text("\u0420\u0435\u043C\u0435\u043D\u044C \u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F: " + (stats.belt ? "пристегнут" : "не пристегнут"));
        };
        return CarStats;
    }());
    exports.CarStats = CarStats;
});
//# sourceMappingURL=stats.js.map