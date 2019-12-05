const MIN_VALUE: number = 128392;
const MAX_VALUE: number = 643281;

interface PasswordMatchingRule {
    matches(password: number): boolean;
}

class PasswordMatcher {
    rules: PasswordMatchingRule[];

    constructor(...rules: PasswordMatchingRule[]) {
        this.rules = rules;
    }

    matches(password: number): boolean {
        let match: boolean = true;

        for (const rule of this.rules) {
            match = match && rule.matches(password);
        }

        return match;
    }
}

class TwoAdjacentDigitsTheSameRule implements PasswordMatchingRule {
    matches(password: number): boolean {
        let match = false;

        const stringPassword = password.toString();
        for (let c: number = 1; c < stringPassword.length; c++) {
            if (stringPassword[c - 1] == stringPassword[c]) {
                match = true;
            }
        }

        return match;
    }
}

class ExactlyTwoAdjacentDigitsTheSameRule implements PasswordMatchingRule {

    matches(password: number): boolean {
        const TARGET_NUMBER_OF_DUPLICATES = 2;

        let match = false;

        const stringPassword = password.toString();
        let numAdjacentDuplicates = 1;
        for (let c: number = 1; c < stringPassword.length; c++) {
            if (stringPassword[c - 1] == stringPassword[c]) {
                numAdjacentDuplicates++;
            } else {
                if (numAdjacentDuplicates == TARGET_NUMBER_OF_DUPLICATES) {
                    break;
                } else {
                    // Reset adjacent duplicates count.
                    numAdjacentDuplicates = 1;
                }
            }
        }

        if (numAdjacentDuplicates == TARGET_NUMBER_OF_DUPLICATES) {
            match = true;
        }

        return match;
    }
}

class NoDecreasingDigitsRule implements PasswordMatchingRule {
    matches(password: number): boolean {
        let match = true;

        const stringPassword = password.toString();
        for (let c: number = 1; c < stringPassword.length; c++) {
            if (stringPassword[c - 1] > stringPassword[c]) {
                match = false;
            }
        }

        return match;
    }
}

const part1Matcher: PasswordMatcher = new PasswordMatcher(
    new TwoAdjacentDigitsTheSameRule(),
    new NoDecreasingDigitsRule()
);
const part2Matcher: PasswordMatcher = new PasswordMatcher(
    new ExactlyTwoAdjacentDigitsTheSameRule(),
    new NoDecreasingDigitsRule()
);

const part1MatchingPasswords: number[] = [];
const part2MatchingPasswords: number[] = [];
for (let passwordAttempt = MIN_VALUE; passwordAttempt <= MAX_VALUE; passwordAttempt++) {
    if (part1Matcher.matches(passwordAttempt)) {
        part1MatchingPasswords.push(passwordAttempt);
    }

    if (part2Matcher.matches(passwordAttempt)) {
        part2MatchingPasswords.push(passwordAttempt);
    }
}

console.log("Part 1: " + part1MatchingPasswords.length + " passwords matched the criteria.");
console.log("Part 2: " + part2MatchingPasswords.length + " passwords matched the criteria.");
