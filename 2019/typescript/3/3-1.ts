import lineReader = require("line-reader");

const LEFT = "L";
const RIGHT = "R";
const UP = "U";
const DOWN = "D";

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(otherPoint: Point): boolean {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    }
}

class Wire {
    points: Point[];

    constructor(instructions: string[]) {
        this.points = [];

        let x: number = 0;
        let y: number = 0;

        for (const instruction of instructions) {
            const direction = instruction[0];
            const distance = parseInt(instruction.slice(1));

            for (let i = 0; i < distance; i++) {
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

                this.points.push(new Point(x, y));
            }
        }
    }

    findIntersections(otherWire: Wire): Point[] {
        const intersections: Point[] = [];

        for (const currentWirePoint of this.points) {
            for (const otherWirePoint of otherWire.points) {
                if (currentWirePoint.equals(otherWirePoint)) {
                    intersections.push(currentWirePoint);
                }
            }
        }

        return intersections;
    }
}

class IntersectionDistanceCalculator {
    intersections: Point[];

    constructor(intersections: Point[]) {
        this.intersections = intersections;
    }

    manhattanDistance(intersection: Point): number {
        return Math.abs(intersection.x) + Math.abs(intersection.y);
    }

    calculateIntersectionDistances(): number[] {
        const intersectionDistances: number[] = [];

        for (const intersection of this.intersections) {
            intersectionDistances.push(this.manhattanDistance(intersection));
        }

        return intersectionDistances.sort();
    }
}

function calculateIntersections(wires: Wire[]) {
    const wire1 = wires[0];
    const wire2 = wires[1];
    const intersections = wire1.findIntersections(wire2);

    const distanceCalculator = new IntersectionDistanceCalculator(intersections);
    const intersectionDistances = distanceCalculator.calculateIntersectionDistances();
    const sortedIntersectionDistances = intersectionDistances.sort((a, b) => a - b);

    console.log("Closest intersection: " + sortedIntersectionDistances[0]);
}

const wires: Wire[] = [];
lineReader.eachLine('input.txt', function (line: string, lastLine: boolean) {
    const instructions = line.split(",");
    wires.push(new Wire(instructions));

    if (lastLine) {
        calculateIntersections(wires);
    }
});
