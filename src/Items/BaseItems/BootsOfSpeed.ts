import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00R');
const name = 'Boots of Speed';
const labels: ItemLabel[] = [];
const goldCost = 300;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNBootsOfSpeed.blp';
const description = `Increases movement rate.

|cffffcc00Movement speed:|r +50

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class BootsOfSpeed extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
