import lineReader = require("line-reader");
import {Wire} from "./Wire";
import {Intersection} from "./Intersection";

interface IntersectionDistanceCalculator {
    intersections: Intersection[];

    calculateIntersectionDistances(): number[];
}

class IntersectionManhattanDistanceCalculator implements IntersectionDistanceCalculator {
    intersections: Intersection[];

    constructor(intersections: Intersection[]) {
        this.intersections = intersections;
    }

    manhattanDistance(intersection: Intersection): number {
        const intersectionPoint = intersection.point1;
        return Math.abs(intersectionPoint.x) + Math.abs(intersectionPoint.y);
    }

    calculateIntersectionDistances(): number[] {
        const intersectionDistances: number[] = [];

        for (const intersection of this.intersections) {
            intersectionDistances.push(this.manhattanDistance(intersection));
        }

        return intersectionDistances;
    }
}

class IntersectionWireLengthDistanceCalculator implements IntersectionDistanceCalculator {
    intersections: Intersection[];

    constructor(intersections: Intersection[]) {
        this.intersections = intersections;
    }

    calculateIntersectionDistances(): number[] {
        const intersectionDistances: number[] = [];

        for (const intersection of this.intersections) {
            const wireLength: number = intersection.point1.wireLength + intersection.point2.wireLength;
            intersectionDistances.push(wireLength)
        }

        return intersectionDistances;
    }
}

function calculateLowestIntersectionDistance(distanceCalculator: IntersectionDistanceCalculator): number {
    const intersectionDistances = distanceCalculator.calculateIntersectionDistances();
    const sortedIntersectionDistances = intersectionDistances.sort((a, b) => a - b);
    return sortedIntersectionDistances[0];
}

const wires: Wire[] = [];
lineReader.eachLine('input.txt', function (line: string, lastLine: boolean) {
    const instructions = line.split(",");
    wires.push(new Wire(instructions));

    if (lastLine) {
        const wire1 = wires[0];
        const wire2 = wires[1];
        const intersections = wire1.findIntersections(wire2);

        const part1DistanceCalculator: IntersectionDistanceCalculator = new IntersectionManhattanDistanceCalculator(intersections);
        const closestManhattanDistance = calculateLowestIntersectionDistance(part1DistanceCalculator);
        console.log("Part 1 - Closest intersection: " + closestManhattanDistance);

        const part2DistanceCalculator: IntersectionDistanceCalculator = new IntersectionWireLengthDistanceCalculator(intersections);
        const closestWirelengthDistance = calculateLowestIntersectionDistance(part2DistanceCalculator);
        console.log("Part 2 - Intersection with fewest steps: " + closestWirelengthDistance);
    }
});
