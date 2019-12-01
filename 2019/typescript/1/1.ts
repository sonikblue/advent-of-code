import lineReader = require("line-reader");

function calculateRequiredFuel(moduleMass: number) {
    return Math.floor(moduleMass / 3) - 2;
}

let totalFuelRequired = 0;
lineReader.eachLine('input.txt', function (line: string, lastLine: boolean) {
    totalFuelRequired += calculateRequiredFuel(parseInt(line));

    if (lastLine) {
        console.log('Total fuel required: ' + totalFuelRequired);
    }
});
