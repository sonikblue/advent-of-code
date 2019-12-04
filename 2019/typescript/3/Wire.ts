import {Point} from "./Point";
import {Intersection} from "./Intersection";

const LEFT = "L";
const RIGHT = "R";
const UP = "U";
const DOWN = "D";

export class Wire {
    points: Point[];

    constructor(instructions: string[]) {
        this.points = [];

        let x: number = 0;
        let y: number = 0;
        let wireLength: number = 0;

        for (const instruction of instructions) {
            const direction = instruction[0];
            const distance = parseInt(instruction.slice(1));

            for (let i = 0; i < distance; i++) {
                wireLength ++;

                switch (direction) {
                    case LEFT:
                        x--;
                        break;
                    case RIGHT:
                        x++;
                        break;
                    case UP:
                        y++;
                        break;
                    case DOWN:
                        y--;
                        break;
                }

                this.points.push(new Point(x, y, wireLength));
            }
        }
    }

    findIntersections(otherWire: Wire): Intersection[] {
        const intersections: Intersection[] = [];

        for (const currentWirePoint of this.points) {
            for (const otherWirePoint of otherWire.points) {
                if (currentWirePoint.equals(otherWirePoint)) {
                    intersections.push(new Intersection(currentWirePoint, otherWirePoint));
                }
            }
        }

        return intersections;
    }
}
