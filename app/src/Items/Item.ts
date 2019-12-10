export abstract class Item {
    public abstract readonly itemId: number;
    public abstract readonly name: string;
    public abstract readonly goldCost: number;
    public abstract readonly iconPath: string;
    public abstract readonly description: string;
}
