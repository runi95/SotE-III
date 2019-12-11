import { Item } from './Item';

export class Flare extends Item {
    public readonly itemId: number = FourCC('I01M');
    public readonly name: string = 'Flare';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNFlare.blp';
    public readonly description: string = `|cffffcc00Effect:|r Reveals invisible units`;
}
