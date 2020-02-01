import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class IronShield extends Item {
    public readonly itemId: number = FourCC('I005');
    public readonly name: string = 'Iron Shield';
    public readonly labels: ItemLabel[] = [ItemLabel.BLOCK];
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpOne.blp';
    public readonly description: string = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +3

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;
}
