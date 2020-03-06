import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { MaulOfStrength } from '../Tier1Items/MaulOfStrength';
import { SteelShield } from '../Tier1Items/SteelShield';

const itemId: number = FourCC('I047');
const name: string = 'Medallion of Courage';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.BLOCK];
const goldCost: number = 9350;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMedalionOfCourage.blp';
const description: string = `A proof of courage amongst heroes.

|cffffcc00Block:|r +50
|cffffcc00Strength:|r +50

|cFF808080Strength increases your max health and health regen.|r`;

export class MedallionOfCourage extends ItemRecipe {
    constructor(maulOfStrength: MaulOfStrength, steelShield: SteelShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [maulOfStrength, steelShield]);
    }
}
