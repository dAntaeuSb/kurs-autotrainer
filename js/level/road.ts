/**
 * Created by dantaeusb on 21/01/2017.
 */

export class Road{
    protected stopAllowed = false;
    protected speedLimit = 40;
    protected hasStopLight = false;
    protected classed = "road";

    constructor(stopAllowed = false) {

    }

    public drawTo(element) {
        element.append("div")
            .classed(this.classed, true);
    }

    public getSpeedLimit() {
        return this.speedLimit;
    }

    public getLanesBorders() {
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
        }
    }
}