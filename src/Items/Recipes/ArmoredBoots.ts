import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BasicItems/BootsOfSpeed';
import { SteelShield } from './SteelShield';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01C');
const name: string = 'Armored Boots';
const labels: ItemLabel[] = [ItemLabel.BLOCK];
const goldCost: number = 825;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBoots.blp';
const description: string = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +75
|cffffcc00Block:|r +9

|cFF808080Movement speed determines how fast you're able to move.|r`;

export class ArmoredBoots extends ItemRecipe {
    constructor(bootsOfSpeed: BootsOfSpeed, steelShield: SteelShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [bootsOfSpeed, steelShield]);
    }
}
