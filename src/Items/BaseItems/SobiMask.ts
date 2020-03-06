import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00T');
const name: string = 'Sobi Mask';
const labels: ItemLabel[] = [ItemLabel.MANA_REGEN];
const goldCost: number = 425;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSobiMask.blp';
const description: string = `An odd looking mask.

|cffffcc00Mana regen:|r +5

|cFF808080Mana regeneration determines how much mana you're passively regaining every second.|r`;

export class SobiMask extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
