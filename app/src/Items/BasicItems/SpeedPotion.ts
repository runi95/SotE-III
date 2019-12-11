import { Item } from '../Item';

export class SpeedPotion extends Item {
    public readonly itemId: number = FourCC('I00F');
    public readonly name: string = 'Speed Potion';
    public readonly goldCost: number = 250;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPotionYellow.blp';
    public readonly description: string = `Boosts movement speed by 50% for 60 seconds.`;
}
