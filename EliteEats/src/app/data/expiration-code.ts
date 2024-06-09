type range = [number | null, number | null];

export class ExpirationCode {
    public static expColorCodes: Map<string, range> = new Map([
        ['danger', [null, 0]], // From -infinity to 7
        ['warning', [1, 14]], // From 8 to 14
        ['success', [15, null]], // From 15 to infinity
    ]);
}
