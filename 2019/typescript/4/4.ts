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

class NonDecreasingDigitsRule implements PasswordMatchingRule {
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

const matcher: PasswordMatcher = new PasswordMatcher(
    new TwoAdjacentDigitsTheSameRule(),
    new NonDecreasingDigitsRule()
);

const matchingPasswords: number[] = [];
for (let passwordAttempt = MIN_VALUE; passwordAttempt <= MAX_VALUE; passwordAttempt++) {
    if (matcher.matches(passwordAttempt)) {
        matchingPasswords.push(passwordAttempt);
    }
}

console.log(matchingPasswords.length + " passwords matched the criteria.");
