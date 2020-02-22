import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03F');
const name: string = 'Fairy Wand';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST];
const goldCost: number = 1160;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNStarWand.blp';
const description: string = `Your wish has been granted.

|cffffcc00Critical Cast:|r +20%

|cFF808080Spell damage will persevere and break through opponent's resistance.|r`;

export class FairyWand extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
