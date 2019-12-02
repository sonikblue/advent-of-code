import lineReader = require("line-reader");

function calculateFuel(mass: number) {
    // Fuel required for the specified mass.
    let requiredFuel = Math.floor(mass / 3) - 2;

    // Fuel required for the fuel.
    if (requiredFuel > 0) {
        requiredFuel += calculateFuel(requiredFuel);
    } else {
        requiredFuel = 0;
    }

    return requiredFuel;
}

let totalFuelRequired = 0;

lineReader.eachLine('input.txt', function (line: string, lastLine: boolean) {
    totalFuelRequired += calculateFuel(parseInt(line));

    if (lastLine) {
        console.log('Total fuel required: ' + totalFuelRequired);
    }
});
