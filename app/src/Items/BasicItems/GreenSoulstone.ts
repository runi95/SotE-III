import { Item } from '../Item';

export class GreenSoulstone extends Item {
    public readonly itemId: number = FourCC('I00A');
    public readonly name: string = 'Green Soulstone';
    public readonly goldCost: number = 2000;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Strength:|r +10
|cffffcc00Max health:|r +200

|cFF808080Strength increases your max health and health regen.|r`;
}
