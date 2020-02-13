import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01O');
const name: string = 'Goblin Battery';
const labels: ItemLabel[] = [];
const goldCost: number = 700;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMoonStone.blp';
const description: string = `A battery made for storing energy in the form of mana.

|cffffcc00Effect (1):|r Drains 1 mana per second to increase item charges until it reaches 100 charges.
|cffffcc00Use:|r Deals a maximum of 486 damage to all units around you and resets the item charge counter.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class GoblinBattery extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
