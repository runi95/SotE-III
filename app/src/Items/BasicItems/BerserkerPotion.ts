import { Item } from '../Item';

export class BerserkerPotion extends Item {
    public readonly itemId: number = FourCC('I003');
    public readonly name: string = 'Berserker Potion';
    public readonly goldCost: number = 250;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPotionRed.blp';
    public readonly description: string = `Boosts attack damage by 20% for 60 seconds.`;
}
