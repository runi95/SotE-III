import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { BloodiedExecutionersAxe } from '../BaseItems/BloodiedExecutionersAxe';

const itemId: number = FourCC('I03S');
const name = 'Master Executioner Axe';
const labels: ItemLabel[] = [ItemLabel.EXECUTE];
const goldCost = 2500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMasterExecutionerAxe.dds';
const description = `Should make for a clean cut.

|cffffcc00Execute:|r +570

|cFF808080Execute instantly kills units below the execute threshold when damaging them with phyiscal attacks.|r`;

export class MasterExecutionerAxe extends ItemRecipe {
    constructor(bloodiedExecutionersAxe: BloodiedExecutionersAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [bloodiedExecutionersAxe]);
    }
}
