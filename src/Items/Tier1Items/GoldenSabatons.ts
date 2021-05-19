import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { ItemLabel } from '../ItemLabel';
import { IronSword } from '../BaseItems/IronSword';

const itemId: number = FourCC('I04V');
const name = 'Golden Sabatons';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost = 1125;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGoldenSabatons.dds';
const description = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +50
|cffffcc00Attack damage:|r +25
|cffffcc00Unique:|r Increases attack speed by +30%

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class GoldenSabatons extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, ironSword]);
    }
}
