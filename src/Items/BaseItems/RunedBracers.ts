import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00S');
const name = 'Runed Bracers';
const labels: ItemLabel[] = [];
const goldCost = 600;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRunedBracers.blp';
const description = `You can't quite make out what the runes say.

|cffffcc00Effect (1):|r Increases item charges whenever you take spell damage.
|cffffcc00Effect (2):|r Releases a chain lightning whenever you reach over 100 charges
|cffffcc00Chain Lightning Damage:|r 250
|cffffcc00Chain Lightning Max Bounce:|r 5

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class RunedBracers extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
