import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I04P');
const name: string = 'Scroll of Witchcraft';
const labels: ItemLabel[] = [ItemLabel.COOLDOWN_REDUCTION];
const goldCost: number = 450;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNScrollOfProtection.blp';
const description: string = `A scroll cleverly crafted by the elves.

|cffffcc00Cooldown Reduction:|r +3%

|cFF808080Cooldown determines how often you can cast spells|r`;

export class ScrollOfWitchcraft extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
