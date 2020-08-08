import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00R');
const name: string = 'Boots of Speed';
const labels: ItemLabel[] = [];
const goldCost: number = 300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBootsOfSpeed.blp';
const description: string = `Increases movement rate.

|cffffcc00Movement Speed:|r +50

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class BootsOfSpeed extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
