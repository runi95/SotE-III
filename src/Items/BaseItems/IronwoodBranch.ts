import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03B');
const name = 'Ironwood Branch';
const labels: ItemLabel[] = [ItemLabel.THORNS];
const goldCost = 320;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNatureTouchGrow.blp';
const description = `Very pointy.

|cffffcc00Thorns:|r +8

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class IronwoodBranch extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
