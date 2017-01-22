import {CarStats} from "./car/stats";
/**
 * Created by dantaeusb on 21/01/2017.
 */

const w = 100;
const h = 216;

const rw = 86;
const rh = 180;

export class Car{
    protected dom;
    protected lightsDom;
    protected alarmDom;

    protected engineOn: boolean = false;
    protected speed: number = 0;
    protected angle: number = 0;
    protected transmission;
    protected lightsEnabled: boolean = false;
    protected alarmEnabled: boolean = false;
    protected breakEnabled: boolean = false;
    protected belt = false;

    protected positionX:number = 510;
    protected positionY:number = 0;

    protected alarmTimer;

    protected stats: CarStats;

    protected lastDriveTime = 0;

    constructor() {
        this.dom = d3.select("#your-car");
        this.lightsDom = this.dom.select(".car-light");
        this.alarmDom = this.dom.select(".car-alarm");

        this.stats = new CarStats(this);

        this.handleKeyboard();

        this.toggleAlarm();
        this.toggleBreak();

        this.drive();
    }

    public getStats() {
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
    }

    public getBounds() {
        let bounds = this.getRelativeBounds();

        for (let i in bounds) {
            bounds[i].y += this.positionY;
        }

        return bounds;
    }

    public getRelativeBounds() {
        let center = {
                x: this.positionX + w / 2,
                y: 100 + h / 2,
            };

        let x1y1rel = {
            x: -rw / 2,
            y: rh / 2,
        };
        let x1y1 = this.getAbsolutePointFromRelative(center, x1y1rel);

        let x2y1rel = {
            x: rw / 2,
            y: rh / 2,
        };
        let x2y1 = this.getAbsolutePointFromRelative(center, x2y1rel);

        let x1y2rel = {
            x: -rw / 2,
            y: -rh / 2,
        };
        let x1y2 = this.getAbsolutePointFromRelative(center, x1y2rel);

        let x2y2rel = {
            x: rw / 2,
            y: -rh / 2,
        };
        let x2y2 = this.getAbsolutePointFromRelative(center, x2y2rel);

        return {
            x1y1: x1y1,
            x2y1: x2y1,
            x1y2: x1y2,
            x2y2: x2y2
        }
    }

    protected getAbsolutePointFromRelative(root, relative) {
        return {
            x: root.x + relative.x * Math.cos(this.angle) + relative.y * Math.sin(this.angle),
            y: root.y - relative.x * Math.sin(this.angle) + relative.y * Math.cos(this.angle),
        }
    }

    public getPosition() {
        return this.positionY;
    }

    protected handleKeyboard() {
        Mousetrap.bind("b", (e, n) => {
            this.toggleEngine();
        });

        Mousetrap.bind("k", (e, n) => {
            this.toggleAlarm();
        });

        Mousetrap.bind("l", (e, n) => {
            this.toggleLights();
        });

        Mousetrap.bind("x", (e, n) => {
            this.toggleBreak();
        });

        Mousetrap.bind("c", (e, n) => {
            this.toggleBelt();
        });

        Mousetrap.bind(["w", "w + a", "w + d"], (e, n) => {
            this.accelerate(20);
        });

        Mousetrap.bind(["a", "a + w", "a + s"], (e, n) => {
            this.turn(-20);
        });

        Mousetrap.bind(["d", "d + w", "d + s"], (e, n) => {
            this.turn(20);
        });

        Mousetrap.bind(["s", "s + a", "s + d"], (e, n) => {
            this.accelerate(-20);
        });
    }

    protected drive() {
        this.lastDriveTime = Car.getMirotime();

        d3.timer(() => {
            let currTime = Car.getMirotime();

            if(currTime < this.lastDriveTime) {
                this.lastDriveTime = 0;
            }

            let deltaTime = (currTime - this.lastDriveTime) / 1000;

            let multipier = 10;

            if (this.breakEnabled) {
                multipier = 200;
            }

            if (this.speed > 0) {
                this.speed -= deltaTime * multipier;
            } else {
                this.speed += deltaTime * multipier;
            }

            let deltaY = Math.cos(this.angle) * deltaTime * this.speed;
            let deltaX = Math.sin(this.angle) * deltaTime * this.speed;

            this.positionY += deltaY;
            this.positionX += deltaX;

            this.dom
                .style("left", `${this.positionX}px`);

            this.lastDriveTime = currTime;
            this.stats.update();
        })
    }

    protected static getMirotime() {
        let d = new Date();
        return d.getSeconds() + d.getMilliseconds();
    }

    protected accelerate(acceleration) {
        if (acceleration > 0) {
            if (this.speed > 0 && this.engineOn) {
                this.speed += acceleration;
            } else if (this.speed + 3 < 0) {
                this.speed += acceleration * 2
            }
        } else {
            if (this.speed < 0 && this.engineOn) {
                this.speed += acceleration;
            } else if (this.speed - 3 > 0) {
                this.speed += acceleration * 2
            }
        }
    }

    protected turn(angle) {
        let speedAmp = Math.abs(this.speed / 200);

        angle = angle * speedAmp;

        this.angle += angle / 360;

        this.dom
            .style("transform", `rotateZ(${this.angle}rad)`)
    };

    protected toggleAlarm() {
        if (!this.alarmEnabled) {
            this.alarmTimer = d3.timer((e) => {
                this.alarmTick(e);
            });

            this.alarmEnabled = true;
        } else {
            if (this.alarmTimer) {
                this.alarmTimer.stop();
                this.alarmDom
                    .style("display", "none");
            }

            this.alarmEnabled = false;
        }

        this.stats.update();
    }

    protected toggleLights() {
        if (this.lightsEnabled) {
            this.lightsDom
                .style("display", "none");

            this.lightsEnabled = false;
        } else {
            this.lightsDom
                .style("display", "block");

            this.lightsEnabled = true;
        }

        this.stats.update();
    }

    protected toggleBelt() {
        this.belt = !this.belt;

        this.stats.update();
    }

    protected toggleEngine() {
        this.engineOn = !this.engineOn;

        this.stats.update();
    }

    protected toggleBreak() {
        this.breakEnabled = !this.breakEnabled;

        this.stats.update();
    }

    protected alarmTick(elapsed) {
        if (Math.ceil(elapsed / 500) % 2) {
            this.alarmDom
                .style("display", "block");
        } else {
            this.alarmDom
                .style("display", "none");
        }
    }
}