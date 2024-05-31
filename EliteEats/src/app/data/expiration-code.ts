type range = [number, number?];

export class ExpirationCode {
    public static expColorCodes: Map<string, range> = new Map([
        ['red', [0, 3]],
        ['yellow', [4, 7]],
        ['green', [8]],
    ]);
}
