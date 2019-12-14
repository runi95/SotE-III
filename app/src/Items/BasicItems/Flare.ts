import { Item } from '../Item';

export class Flare extends Item {
    public readonly itemId: number = FourCC('I01M');
    public readonly name: string = 'Flare';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNFlare.blp';
    public readonly description: string = `A flare that lights up the area around you.

|cffffcc00Effect:|r Reveals invisible units

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
