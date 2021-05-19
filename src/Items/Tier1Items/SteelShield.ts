import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BaseItems/IronShield';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00J');
const name = 'Steel Shield';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost = 1155;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpTwo.blp';
const description = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +35

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

export class SteelShield extends ItemRecipe {
    constructor(ironShield: IronShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironShield]);
    }
}
