/**
 * Created by dantaeusb on 21/01/2017.
 */

export class RoadError{
    protected points: number = 1;
    protected name: string;
    protected code: string;

    constructor(code, name, points = 1) {
        this.code = code;
        this.name = name;
        this.points = points;
    }

    public getCode() {
        return this.code;
    }

    public getName() {
        return this.name;
    }

    public getPoints() {
        return this.points;
    }
}