import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class MoonArmor extends Item {
    public readonly itemId: number = FourCC('I008');
    public readonly name: string = 'Moon Armor';
    public readonly labels: ItemLabel[] = [ItemLabel.RESISTANCE];
    public readonly goldCost: number = 300;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMoonArmor.blp';
    public readonly description: string = `A special armor capable of resisting spell damage.

|cffffcc00Resistance:|r +5

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;
}
