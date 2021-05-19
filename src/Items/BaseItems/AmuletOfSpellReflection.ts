import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03C');
const name = 'Amulet of Spell Reflection';
const labels: ItemLabel[] = [ItemLabel.REFLECT];
const goldCost = 760;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPeriapt.blp';
const description = `A seemingly simple amulet.

|cffffcc00Reflect:|r +20

|cFF808080Reflect deals reflect damage back to the source when taking spell damage.|r`;

export class AmuletOfSpellReflection extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
