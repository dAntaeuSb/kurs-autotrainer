import {Car} from "../car";
/**
 * Created by dantaeusb on 21/01/2017.
 */

export class CarStats{
    protected dom;
    protected paramsDom;
    protected car;

    constructor(car: Car) {
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
        }
    }

    public update() {
        let stats = this.car.getStats();

        this.paramsDom.engine.text(`Двигатель: ${stats.engineOn ? "вкл" : "выкл"}`);
        this.paramsDom.speed.text(`Скорость: ${Math.round(stats.speed / 10)}км/ч`);
        //this.paramsDom.transmission.text(`Передача: ${stats.transmission}`);
        this.paramsDom.breakEnabled.text(`Ручник: ${stats.breakEnabled ? "вкл" : "выкл"}`);
        this.paramsDom.lights.text(`Габариты: ${stats.lights ? "вкл" : "выкл"}`);
        this.paramsDom.alarm.text(`Аварийная сигнализация: ${stats.alarm ? "вкл" : "выкл"}`);
        this.paramsDom.belt.text(`Ремень водителя: ${stats.belt ? "пристегнут" : "не пристегнут"}`);
    }
}