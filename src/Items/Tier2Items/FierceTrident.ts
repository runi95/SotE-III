import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { MasterExecutionerAxe } from '../Tier1Items/MasterExecutionerAxe';

const itemId: number = FourCC('I04F');
const name = 'Fierce Trident';
const labels: ItemLabel[] = [ItemLabel.EXECUTE];
const goldCost = 8000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNagaWeaponUp1.blp';
const description = `A fierce Naga weapon

|cffffcc00Execute:|r +1670

|cFF808080Execute instantly kills units below the execute threshold when damaging them with phyiscal attacks.|r`;

export class FierceTrident extends ItemRecipe {
    constructor(masterExecutionerAxe: MasterExecutionerAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [masterExecutionerAxe]);
    }
}
