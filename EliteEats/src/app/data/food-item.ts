export class FoodItem {
    name:string;
    category:string;
    expirationStart:Date;
    expirationEnd:Date;

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

    constructor(name:string, category:string, expirationEnd:Date, expirationStart?: Date){
        this.name = name;
        this.category = category;
        this.expirationStart = new Date();
        this.expirationEnd = expirationEnd;
    }
}
