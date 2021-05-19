import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03F');
const name = 'Fairy Wand';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST];
const goldCost = 1160;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNStarWand.blp';
const description = `Your wish has been granted.

|cffffcc00Critical Cast:|r +20%

|cFF808080Critical cast gives a chance for spells to deal double damage.|r`;

export class FairyWand extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
