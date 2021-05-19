import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00Z');
const name = `Bloodied Executioner's Axe`;
const labels: ItemLabel[] = [ItemLabel.EXECUTE];
const goldCost = 400;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSpiritWalkerMasterTraining.blp';
const description = `A well used bloodied executioner's axe.

|cffffcc00Execute:|r +150

|cFF808080Execute instantly kills units below the execute threshold when damaging them with phyiscal attacks.|r`;

export class BloodiedExecutionersAxe extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
