import {Road} from "../level/road";
import {RoadError} from "./error";
/**
 * Created by dantaeusb on 21/01/2017.
 */

const errors = [
    // 5 - point
    {
        code: "1.1",
        name: "Не уступил дорогу (создал помеху) транспортному средству, имеющему преимущество",
        points: 5
    },
    {
        code: "1.2",
        name: "Не уступил дорогу (создал помеху) пешеходам, имеющим преимущество",
        points: 5
    },
    {
        code: "1.3",
        name: "Выехал на полосу встречного движения (кроме разрешенных случаев) или на трамвайные пути встречного направления",
        points: 5
    },
    {
        code: "1.4",
        name: "Проехал на запрещающий сигнал светофора или регулировщика",
        points: 5
    },
    {
        code: "1.5",
        name: "Не выполнил требования знаков приоритета, запрещающих и предписывающих знаков, дорожной разметки 1.1, 1.3, а также знаков особых предписаний",
        points: 5
    },
    {
        code: "1.6",
        name: "Пересек стоп-линию (разметка 1.12) при остановке при наличии знака 2.5 или при запрещающем сигнале светофора (регулировщика)",
        points: 5
    },
    {
        code: "1.7",
        name: "Нарушил правила выполнения обгона",
        points: 5
    },
    {
        code: "1.8",
        name: "Нарушил правила выполнения поворота",
        points: 5
    },
    {
        code: "1.9",
        name: " Нарушил правила выполнения разворота",
        points: 5
    },
    {
        code: "1.10",
        name: "Нарушил правила движения задним ходом",
        points: 5
    },
    {
        code: "1.11",
        name: "Нарушил правила проезда железнодорожных переездов",
        points: 5
    },
    {
        code: "1.12",
        name: "Превысил установленную скорость движения",
        points: 5
    },
    {
        code: "1.13",
        name: "Не принял возможных мер к снижению скорости вплоть до полной остановки транспортного средства при возникновении опасности для движения",
        points: 5
    },
    {
        code: "1.14",
        name: "Нарушил правила опережения транспортных средств при проезде пешеходных переходов",
        points: 5
    },
    {
        code: "1.15",
        name: "Выполнил обгон транспортного средства, имеющего нанесенные на наружные поверхности специальные цветографические схемы с включенными проблесковым маячком синего цвета и специальным звуковым сигналом, либо сопровождаемого им транспортного средства",
        points: 5
    },
    {
        code: "1.16",
        name: "Действие или бездействие кандидата в водители, вызвавшее необходимость вмешательства в процесс управления экзаменационным транспортным средством с целью предотвращения возникновения ДТП",
        points: 5
    },
    {
        code: "1.17",
        name: "Не выполнил (проигнорировал) задание экзаменатора",
        points: 5
    },
    // 3 - point
    {
        code: "2.1",
        name: "Нарушил правила остановки, стоянки",
        points: 3
    },
    {
        code: "2.2",
        name: "Не подал сигнал световым указателем поворота перед началом движения, перестроением, поворотом (разворотом) или остановкой.",
        points: 3
    },
    {
        code: "2.3",
        name: "Не выполнил требования дорожной разметки (кроме разметки 1.1, 1.3, 1.12)",
        points: 3
    },
    {
        code: "2.4",
        name: "Не использовал в установленных случаях аварийную сигнализацию или знак аварийной остановки",
        points: 3
    },
    {
        code: "2.5",
        name: "Выехал на перекресток при образовавшемся заторе, создав помеху движению ТС в поперечном направлении.",
        points: 3
    },
    {
        code: "2.6",
        name: "Не пристегнул ремень безопасности",
        points: 3
    },
    {
        code: "2.7",
        name: "Нарушил правила перевозки пассажиров",
        points: 3
    },
    {
        code: "2.8",
        name: "Использовал во время движения телефон",
        points: 3
    },
    {
        code: "2.9",
        name: "В установленных случаях не снизил скорость или не остановился",
        points: 3
    },
    // 1 - point
    {
        code: "3.1",
        name: "",
        points: 1
    },
    {
        code: "3.2",
        name: "Нарушил правила расположения транспортного средства на проезжей части",
        points: 1
    },
    {
        code: "3.3",
        name: "Выбрал скорость движения без учета дорожных и метеорологических условий",
        points: 1
    },
    {
        code: "3.4",
        name: "Двигался без необходимости со слишком малой скоростью, создавая помехи другим транспортным средствам",
        points: 1
    },
    {
        code: "3.5",
        name: "Резко затормозил при отсутствии необходимости предотвращения ДТП",
        points: 1
    },
    {
        code: "3.6",
        name: "Нарушил правила пользования внешними световыми приборами и звуковым сигналом",
        points: 1
    },
    {
        code: "3.7",
        name: "Допустил иные нарушения ПДД",
        points: 1
    },
    {
        code: "3.8",
        name: "Неправильно оценивал дорожную обстановку",
        points: 1
    },
    {
        code: "3.9",
        name: "Не пользовался зеркалами заднего вида",
        points: 1
    },
    {
        code: "3.10",
        name: "Неуверенно пользовался органами управления транспортного средства, не обеспечивал плавность движения",
        points: 1
    },
    {
        code: "3.11",
        name: "В процессе экзамена заглох двигатель",
        points: 1
    },
    // Zero - tech
    {
        code: "0.0",
        name: "Внимание: превышение скорости менее чем на 10 км",
        points: 0
    }
];

export class ErrorDispatcher {
    protected dom;
    protected listDom;
    protected randomErrorButtonDom;
    protected percentageDom;
    protected countDom;

    protected errors: Array<RoadError> = [];

    constructor() {
        this.dom = d3.select("#error-wrapper");
        this.listDom = this.dom.select("#error-list");
        this.randomErrorButtonDom = this.dom.select("#error-random-button");
        this.percentageDom = this.dom.select(".progress-bar");
        this.countDom = this.dom.select(".points-count");

        this.randomErrorButtonDom.on("click", (e) => {
            this.addRandomError();
        });
    }

    public addRandomError() {
        let params = errors[Math.floor(Math.random() * errors.length)];

        this.addError(new RoadError(params.code, params.name, params.points));
    }

    public addError(error: RoadError) {
        if (this.errors.length == 0) {
            this.listDom.selectAll("*")
                .remove();
        }

        this.listDom
            .append("li")
            .text(`${error.getCode()}: ${error.getName()} (${error.getPoints()})`);

        this.errors.push(error);

        this.updatePointsAndPercentage();
    }

    public dispatchCode(code) {
        let errorId = "-1";

        for (let i in errors) {
            if (errors[i].code == code) {
                errorId = i;
                break;
            }
        }

        if (errorId == "-1") {
            console.warn(`No such error with code ${code}`);
            return;
        }

        let error = errors[errorId];

        this.addError(new RoadError(error.code, error.name, error.points))
    }

    protected updatePointsAndPercentage() {
        let totalPoints = 0;
        let percentage = 100;

        for (let i in this.errors) {
            totalPoints += this.errors[i].getPoints();
        }

        let failedPercent = (totalPoints * 100) / 5;

        console.log(this.errors);

        if (failedPercent > 100) {
            failedPercent = 100;
        }

        percentage -= failedPercent;

        this.countDom.text(totalPoints);
        this.percentageDom.style("width", `${percentage}%`);

        if (percentage < 50 && percentage > 25) {
            this.percentageDom.classed("progress-bar-success", false);
            this.percentageDom.classed("progress-bar-warning", true);
        } else if (percentage < 25) {
            this.percentageDom.classed("progress-bar-success", false);
            this.percentageDom.classed("progress-bar-warning", false);
            this.percentageDom.classed("progress-bar-danger", true);
        }
    }
}