import { Item } from '../Item';

export class SobiMask extends Item {
    public readonly itemId: number = FourCC('I00T');
    public readonly name: string = 'Sobi Mask';
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSobiMask.blp';
    public readonly description: string = `An odd looking mask.

|cffffcc00Mana regen:|r +25%

|cFF808080Mana regeneration determines how much mana you're passively regaining every second.|r`;
}
