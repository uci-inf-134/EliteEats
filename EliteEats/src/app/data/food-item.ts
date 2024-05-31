import { ExpirationCode } from "./expiration-code";

type range = [number, number?];

export class FoodItem {
    name:string;
    category:string;
    expirationStart:Date;
    expirationEnd:Date;
    selected:Boolean;
    daysUntilExpire: number;
    expColor:string | undefined;

    public readonly expColorCodes: Map<string, range> = ExpirationCode.expColorCodes;

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

    constructor(name:string, category:string, expirationEnd:Date){
        this.name = name;
        this.category = category;
        this.expirationStart = new Date();
        this.expirationEnd = expirationEnd;
        this.selected = false;

        const dateDifference = expirationEnd.valueOf() - this.expirationStart.valueOf(); // calc in ms
        const msInDay = 1000 * 60 * 60 * 24;
        this.daysUntilExpire = Math.floor(dateDifference / msInDay);
        this.expColor = this.getColor(this.daysUntilExpire);
        console.log(this.expColor)
    }

    static selectedAll(items: FoodItem[], state: boolean):void {
        items.forEach(item => {
            item.selected = state;
        })
    }

    public getColor(day: number): string | undefined {
        for (const [color, range] of ExpirationCode.expColorCodes.entries()) {
            const [start, end] = range;
            if (end === undefined) {
                if (day >= start) {
                    return color;
                }
            } else {
                if (day >= start && day <= end) {
                    return color;
                }
            }
        }
        return undefined; // Return undefined if no matching range is found
    }
}
