import { ItemLabel } from '../ItemLabel';
import { LifeStone } from '../BasicItems/LifeStone';
import { ItemRecipe } from '../ItemRecipe';

const itemId: number = FourCC('I03K');
const name: string = 'Bright Life Stone';
const labels: ItemLabel[] = [ItemLabel.RESTORATION];
const goldCost: number = 3000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBrightLifeStone.dds';
const description: string = `The stone shines brightly.

|cffffcc00Restoration:|r +250%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class BrightLifeStone extends ItemRecipe {
    constructor(lifeStone: LifeStone) {
        super(itemId, name, labels, goldCost, iconPath, description, [lifeStone]);
    }
}
