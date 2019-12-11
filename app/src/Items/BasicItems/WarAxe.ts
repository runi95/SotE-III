import { Item } from '../Item';

export class WarAxe extends Item {
    public readonly itemId: number = FourCC('I00L');
    public readonly name: string = 'War Axe';
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpOne.blp';
    public readonly description: string = `Just another war axe to carry, one amongst many.

|cffffcc00Strength:|r +4

|cFF808080Strength increases your max health and health regen.|r`;
}
