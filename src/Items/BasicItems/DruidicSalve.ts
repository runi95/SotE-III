import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I012');
const name: string = 'Druidic Salve';
const labels: ItemLabel[] = [];
const goldCost: number = 1000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHealingSalve.blp';
const description: string = `A salve often used by druids to cure wounds.

|cffffcc00Effect:|r Heals 400 hitpoints over 12 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class DruidicSalve extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
