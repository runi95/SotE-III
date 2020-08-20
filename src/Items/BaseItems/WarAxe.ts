import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00L');
const name: string = 'War Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 360;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpOne.blp';
const description: string = `Just another war axe to carry, one amongst many.

|cffffcc00Strength:|r +6

|cFF808080Strength increases your max health and health regen.|r`;

export class WarAxe extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
