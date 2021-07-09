import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I012');
const name = 'Druidic Salve';
const labels: ItemLabel[] = [];
const goldCost = 1000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHealingSalve.blp';
const description = `A salve often used by druids to cure wounds.

|cffffcc00Use:|r Heals 400 hitpoints over 12 seconds
|cffffcc00Mana cost:|r 125
|cffffcc00Range:|r 400
|cffffcc00Duration:|r 12
|cffffcc00Cooldown:|r 5

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class DruidicSalve extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
