import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00I');
const name: string = 'Orb of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
const goldCost: number = 350;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfMagic.blp';
const description: string = `An orb full of potencial magic if you know how to extract it.

|cffffcc00Intelligence:|r +7

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class OrbOfMagic extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
