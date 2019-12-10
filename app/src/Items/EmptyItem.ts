import { Item } from './Item';

export class EmptyItem extends Item {
    public readonly itemId: number = FourCC('');
    public readonly name: string = '';
    public readonly goldCost: number = 0;
    public readonly iconPath: string = '';
    public readonly description: string = ``;
}
