import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00L');
const name = 'War Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 360;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpOne.blp';
const description = `Just another war axe to carry, one amongst many.

|cffffcc00Strength:|r +6

|cFF808080Strength increases your max health and health regen.|r`;

export class WarAxe extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
