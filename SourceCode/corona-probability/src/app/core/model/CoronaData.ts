export class CoronaData {

    sevenDayInzidenz: number;
    sevenDayUnfoundInzidenz: number;
    foundProbability: number;
    probabilityForUnfoundPositive: number;
    atLeastOnePositiveOutOf10: number;
    atLeastOnePositiveOutOf50: number;
    atLeastOnePositive: KeyValue[];
}

export class KeyValue {
    count: number;
    probability: number;
}