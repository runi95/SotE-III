import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I039');
const name: string = 'Life Stone';
const labels: ItemLabel[] = [ItemLabel.RESTORATION];
const goldCost: number = 1200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHealthStone.blp';
const description: string = `The stone of life is often used by dryads to heal their wounds after battle.

|cffffcc00Restoration:|r +100%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class LifeStone extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
