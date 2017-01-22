define(["require", "exports", "./car/stats"], function (require, exports, stats_1) {
    "use strict";
    /**
     * Created by dantaeusb on 21/01/2017.
     */
    var w = 100;
    var h = 216;
    var rw = 86;
    var rh = 180;
    var Car = (function () {
        function Car() {
            this.engineOn = false;
            this.speed = 0;
            this.angle = 0;
            this.lightsEnabled = false;
            this.alarmEnabled = false;
            this.breakEnabled = false;
            this.belt = false;
            this.positionX = 510;
            this.positionY = 0;
            this.lastDriveTime = 0;
            this.dom = d3.select("#your-car");
            this.lightsDom = this.dom.select(".car-light");
            this.alarmDom = this.dom.select(".car-alarm");
            this.stats = new stats_1.CarStats(this);
            this.handleKeyboard();
            this.toggleAlarm();
            this.toggleBreak();
            this.drive();
        }
        Car.prototype.getStats = function () {
            return {
                engineOn: this.engineOn,
                speed: this.speed,
                transmission: this.transmission,
                breakEnabled: this.breakEnabled,
                lights: this.lightsEnabled,
                alarm: this.alarmEnabled,
                belt: this.belt,
                line: 2
            };
        };
        Car.prototype.getBounds = function () {
            var bounds = this.getRelativeBounds();
            for (var i in bounds) {
                bounds[i].y += this.positionY;
            }
            return bounds;
        };
        Car.prototype.getRelativeBounds = function () {
            var center = {
                x: this.positionX + w / 2,
                y: 100 + h / 2,
            };
            var x1y1rel = {
                x: -rw / 2,
                y: rh / 2,
            };
            var x1y1 = this.getAbsolutePointFromRelative(center, x1y1rel);
            var x2y1rel = {
                x: rw / 2,
                y: rh / 2,
            };
            var x2y1 = this.getAbsolutePointFromRelative(center, x2y1rel);
            var x1y2rel = {
                x: -rw / 2,
                y: -rh / 2,
            };
            var x1y2 = this.getAbsolutePointFromRelative(center, x1y2rel);
            var x2y2rel = {
                x: rw / 2,
                y: -rh / 2,
            };
            var x2y2 = this.getAbsolutePointFromRelative(center, x2y2rel);
            return {
                x1y1: x1y1,
                x2y1: x2y1,
                x1y2: x1y2,
                x2y2: x2y2
            };
        };
        Car.prototype.getAbsolutePointFromRelative = function (root, relative) {
            return {
                x: root.x + relative.x * Math.cos(this.angle) + relative.y * Math.sin(this.angle),
                y: root.y - relative.x * Math.sin(this.angle) + relative.y * Math.cos(this.angle),
            };
        };
        Car.prototype.getPosition = function () {
            return this.positionY;
        };
        Car.prototype.handleKeyboard = function () {
            var _this = this;
            Mousetrap.bind("b", function (e, n) {
                _this.toggleEngine();
            });
            Mousetrap.bind("k", function (e, n) {
                _this.toggleAlarm();
            });
            Mousetrap.bind("l", function (e, n) {
                _this.toggleLights();
            });
            Mousetrap.bind("x", function (e, n) {
                _this.toggleBreak();
            });
            Mousetrap.bind("c", function (e, n) {
                _this.toggleBelt();
            });
            Mousetrap.bind(["w", "w + a", "w + d"], function (e, n) {
                _this.accelerate(20);
            });
            Mousetrap.bind(["a", "a + w", "a + s"], function (e, n) {
                _this.turn(-20);
            });
            Mousetrap.bind(["d", "d + w", "d + s"], function (e, n) {
                _this.turn(20);
            });
            Mousetrap.bind(["s", "s + a", "s + d"], function (e, n) {
                _this.accelerate(-20);
            });
        };
        Car.prototype.drive = function () {
            var _this = this;
            this.lastDriveTime = Car.getMirotime();
            d3.timer(function () {
                var currTime = Car.getMirotime();
                if (currTime < _this.lastDriveTime) {
                    _this.lastDriveTime = 0;
                }
                var deltaTime = (currTime - _this.lastDriveTime) / 1000;
                var multipier = 10;
                if (_this.breakEnabled) {
                    multipier = 200;
                }
                if (_this.speed > 0) {
                    _this.speed -= deltaTime * multipier;
                }
                else {
                    _this.speed += deltaTime * multipier;
                }
                var deltaY = Math.cos(_this.angle) * deltaTime * _this.speed;
                var deltaX = Math.sin(_this.angle) * deltaTime * _this.speed;
                _this.positionY += deltaY;
                _this.positionX += deltaX;
                _this.dom
                    .style("left", _this.positionX + "px");
                _this.lastDriveTime = currTime;
                _this.stats.update();
            });
        };
        Car.getMirotime = function () {
            var d = new Date();
            return d.getSeconds() + d.getMilliseconds();
        };
        Car.prototype.accelerate = function (acceleration) {
            if (acceleration > 0) {
                if (this.speed > 0 && this.engineOn) {
                    this.speed += acceleration;
                }
                else if (this.speed + 3 < 0) {
                    this.speed += acceleration * 2;
                }
            }
            else {
                if (this.speed < 0 && this.engineOn) {
                    this.speed += acceleration;
                }
                else if (this.speed - 3 > 0) {
                    this.speed += acceleration * 2;
                }
            }
        };
        Car.prototype.turn = function (angle) {
            var speedAmp = Math.abs(this.speed / 200);
            angle = angle * speedAmp;
            this.angle += angle / 360;
            this.dom
                .style("transform", "rotateZ(" + this.angle + "rad)");
        };
        ;
        Car.prototype.toggleAlarm = function () {
            var _this = this;
            if (!this.alarmEnabled) {
                this.alarmTimer = d3.timer(function (e) {
                    _this.alarmTick(e);
                });
                this.alarmEnabled = true;
            }
            else {
                if (this.alarmTimer) {
                    this.alarmTimer.stop();
                    this.alarmDom
                        .style("display", "none");
                }
                this.alarmEnabled = false;
            }
            this.stats.update();
        };
        Car.prototype.toggleLights = function () {
            if (this.lightsEnabled) {
                this.lightsDom
                    .style("display", "none");
                this.lightsEnabled = false;
            }
            else {
                this.lightsDom
                    .style("display", "block");
                this.lightsEnabled = true;
            }
            this.stats.update();
        };
        Car.prototype.toggleBelt = function () {
            this.belt = !this.belt;
            this.stats.update();
        };
        Car.prototype.toggleEngine = function () {
            this.engineOn = !this.engineOn;
            this.stats.update();
        };
        Car.prototype.toggleBreak = function () {
            this.breakEnabled = !this.breakEnabled;
            this.stats.update();
        };
        Car.prototype.alarmTick = function (elapsed) {
            if (Math.ceil(elapsed / 500) % 2) {
                this.alarmDom
                    .style("display", "block");
            }
            else {
                this.alarmDom
                    .style("display", "none");
            }
        };
        return Car;
    }());
    exports.Car = Car;
});
//# sourceMappingURL=car.js.map