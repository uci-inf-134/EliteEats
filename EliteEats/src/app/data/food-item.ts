import { ExpirationCode } from "./expiration-code";

type range = [number, number?];

export class FoodItem {
    name: string;
    category: string;
    expirationStart: Date;
    expirationEnd: Date;
    selected: Boolean;
    daysUntilExpire: number;
    expColor: string | undefined;

    public readonly expColorCodes = ExpirationCode.expColorCodes;

    public static categories: string[] = [
        'Fruits',
        'Vegetables',
        'Dairy',
        'Meats',
        'Seafood',
        'Grains and Cereals',
        'Bread and Bakery',
        'Pantry Goods',
        'Frozen Foods',
        'Beverages',
        'Snacks',
        'Condiments',
        'Seasonings',
        'Oils and Vinegars',
    ]

    public static expirationPeriods: string[] = [
        'day(s)',
        'week(s)',
        'month(s)',
        'year(s)'
    ]

    constructor(name: string, category: string, expirationEnd: Date) {
        this.name = name;
        this.category = category;
        this.expirationStart = new Date();
        this.expirationEnd = expirationEnd;
        this.selected = false;

        this.daysUntilExpire = this.expirationDuration();
        this.expColor = this.getColor(this.daysUntilExpire);
    }

    static selectedAll(items: FoodItem[], state: boolean): void {
        items.forEach(item => {
            item.selected = state;
        })
    }

    public getColor(day: number): string | undefined {
        for (const [color, range] of ExpirationCode.expColorCodes.entries()) {
          const [start, end] = range;
          if ((start === null || day >= start) && (end === null || day <= end)) {
            return color;
          }
        }
        return undefined; // Return undefined if no matching range is found
      }

    private expirationDuration() {
        const dateDifference = this.expirationEnd.valueOf() - this.expirationStart.valueOf(); // calc in ms
        const msInDay = 1000 * 60 * 60 * 24;
        return Math.floor(dateDifference / msInDay);
    }

    public renewExpiration() {
        this.daysUntilExpire = this.expirationDuration();
    }

    public expirationToString() {
        if (this.daysUntilExpire == 0) {
            return "Exp: today";
          }
          else if (this.daysUntilExpire < 0) {
            return "EXPIRED";
          }
          else {
            return "Exp: " + this.daysUntilExpire + " days";
          }
    }
}
