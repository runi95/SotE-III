import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I030');
const name: string = 'Mask of Death';
const labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
const goldCost: number = 1900;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp';
const description: string = `A mask of death.

|cffffcc00Lifesteal:|r +50%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;

export class MaskOfDeath extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
