import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01D');
const name = 'Agile Slippers';
const labels: ItemLabel[] = [];
const goldCost = 480;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSlippersOfAgility.blp';
const description = `The most comfortable slippers you'll ever wear.

|cffffcc00Movement Speed:|r +80

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class AgileSlippers extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed]);
    }
}
