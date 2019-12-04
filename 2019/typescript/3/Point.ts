export class Point {
    x: number;
    y: number;
    wireLength: number;

    constructor(x: number, y: number, wireLength: number) {
        this.x = x;
        this.y = y;
        this.wireLength = wireLength;
    }

    equals(otherPoint: Point): boolean {
        return this.x == otherPoint.x && this.y == otherPoint.y;
    }
}
