import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01O');
const name = 'Goblin Battery';
const labels: ItemLabel[] = [];
const goldCost = 700;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNMoonStone.blp';
const description = `A battery made for storing energy in the form of mana.

|cffffcc00Effect:|r Drains 1 mana per second to increase item charges until it reaches 100 charges.
|cffffcc00Use:|r Deals a maximum of 600 damage to all units around you and resets the item charge counter.
|cffffcc00Mana cost:|r 0
|cffffcc00Area of effect:|r 400
|cffffcc00Cooldown:|r 5

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class GoblinBattery extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
