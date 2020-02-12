import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00Z');
const name: string = `Bloodied Executioner's Axe`;
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSpiritWalkerMasterTraining.blp';
const description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +15
`;

export class BloodiedExecutionersAxe extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
