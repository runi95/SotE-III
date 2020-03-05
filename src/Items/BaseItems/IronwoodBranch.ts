import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03B');
const name: string = 'Ironwood Branch';
const labels: ItemLabel[] = [ItemLabel.THORNS];
const goldCost: number = 1440;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNatureTouchGrow.blp';
const description: string = `Very pointy.

|cffffcc00Thorns:|r +18

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class IronwoodBranch extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
