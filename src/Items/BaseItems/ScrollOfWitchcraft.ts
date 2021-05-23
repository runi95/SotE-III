import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I04P');
const name = 'Scroll of Witchcraft';
const labels: ItemLabel[] = [ItemLabel.COOLDOWN_REDUCTION];
const goldCost = 210;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNScrollOfProtection.blp';
const description = `A scroll cleverly crafted by the elves.

|cffffcc00Cooldown Reduction:|r +3%

|cFF808080Cooldown determines how often you can cast spells|r`;

export class ScrollOfWitchcraft extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
