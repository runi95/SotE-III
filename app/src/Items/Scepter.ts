import { Item } from './Item';

export class Scepter extends Item {
    public readonly itemId: number = FourCC('I010');
    public readonly name: string = 'Scepter';
    public readonly goldCost: number = 400;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPriestAdept.blp';
    public readonly description: string = `A magical scepter showing high status and wealth.

|cffffcc00Effect:|r Spawn 3 Footmen to fight for you.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
