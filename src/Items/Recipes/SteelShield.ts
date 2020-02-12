import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BasicItems/IronShield';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00J');
const name: string = 'Steel Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost: number = 470;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpTwo.blp';
const description: string = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +7

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class SteelShield extends ItemRecipe {
    constructor(ironShield: IronShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironShield]);
    }
}
