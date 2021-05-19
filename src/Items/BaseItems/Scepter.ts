import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I010');
const name = 'Scepter';
const labels: ItemLabel[] = [];
const goldCost = 400;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPriestAdept.blp';
const description = `A magical scepter showing high status and wealth.

|cffffcc00Use:|r Spawn 3 Footmen to fight for you
|cffffcc00Mana Cost:|r 50
|cffffcc00Duration:|r 20
|cffffcc00Cooldown:|r 60

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class Scepter extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
