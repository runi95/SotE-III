import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01O');
const name: string = 'Goblin Battery';
const labels: ItemLabel[] = [];
const goldCost: number = 700;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMoonStone.blp';
const description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +4
|cffffcc00Effect (1):|r Increases item charges whenever you kill a unit.
|cffffcc00Effect (2):|r Permanently upgrades this item to the Bloodied Executioner's Axe once you reach 100 charges.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class GoblinBattery extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
