import { Item } from '../Item';

export class Branch extends Item {
    public readonly itemId: number = FourCC('I012');
    public readonly name: string = 'Branch';
    public readonly goldCost: number = 1000;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNatureTouchGrow.blp';
    public readonly description: string = `A simple ingredient used in several ancient elf recipes.

|cffffcc00Effect:|r Heals 400 hitpoints over 12 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
