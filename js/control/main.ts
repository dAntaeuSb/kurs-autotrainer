import {Car} from "../car";
import {ErrorDispatcher} from "./dispatcher";
import {LevelGenerator} from "../level";
/**
 * Created by dantaeusb on 22/01/2017.
 */

export class ControlMain {
    protected controlInterval;
    protected car: Car;
    protected errorDispatcher: ErrorDispatcher;
    protected level: LevelGenerator;

    protected registred = [];

    constructor(car: Car, errorDispatcher: ErrorDispatcher, level: LevelGenerator) {
        this.car = car;
        this.errorDispatcher = errorDispatcher;
        this.level = level;

        this.controlInterval = d3.interval(() => {
            this.tick();
        }, 100);
    }

    protected tick() {
        let stats = this.car.getStats();
        let bounds = this.car.getBounds();

        this.checkBeltOnMove(stats)
            .checkEngineOnMove(stats)
            .checkSpeedLimit(stats, bounds)
            .checkLights(stats)
            .checkReverseLine(stats, bounds);
    }

    protected checkBeltOnMove(stats) {
        const code = "2.6";

        if (this.registred.indexOf(code) != -1) {
            return this;
        }

        if (stats.speed > 30 && !stats.belt) {
            this.errorDispatcher.dispatchCode(code);
            this.registred.push(code);

            this.activateErrorAfterTimeout(code);
        }


        return this;
    }

    protected checkEngineOnMove(stats) {
        const code = "3.11";

        if (this.registred.indexOf(code) != -1) {
            return this;
        }

        if (stats.speed > 100 && !stats.engineOn) {
            this.errorDispatcher.dispatchCode(code);
            this.registred.push(code);

            this.activateErrorAfterTimeout(code);
        }

        return this;
    }

    protected checkSpeedLimit(stats, bounds) {
        const code = "1.12";
        const warnCode = "0.0";

        let basicLimit = this.level.getCurrentRoad().getSpeedLimit() * 10;

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
    }

    protected checkLights(stats) {
        const code1 = "3.7";
        const code2 = "2.4";

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
    }

    protected checkReverseLine(stats, bounds) {
        const code1 = "1.3";
        const code2 = "1.16";

        let carInLanes = [];

        for (let i in bounds) {
            let point = bounds[i];
            let laneBorders = this.level.getCurrentRoad().getLanesBorders();

            for (let k in laneBorders) {
                let yArr = laneBorders[k];

                if (point.x > yArr.x1 && point.x < yArr.x2) {
                    carInLanes.push(k);
                }
            }
        }

        if(this.registred.indexOf(code1) == -1 && carInLanes.indexOf("0") != -1) {
            this.errorDispatcher.dispatchCode(code1);
            this.registred.push(code1);
            this.activateErrorAfterTimeout(code1);
        }

        if(this.registred.indexOf(code2) == -1 && carInLanes.length <= 2) {
            this.errorDispatcher.dispatchCode(code2);
            this.registred.push(code2);
            this.activateErrorAfterTimeout(code2);
        }


        return this;
    }

    protected activateErrorAfterTimeout(code, timeout: number = 15000) {
        d3.timeout(() => {
            let i = this.registred.indexOf(code);

            if (i != -1) {
                let removed = this.registred.splice(i, 1);

                console.log(removed);
            }
        }, timeout);
    }
}