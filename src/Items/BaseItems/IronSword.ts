import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00H');
const name: string = 'Iron Sword';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 375;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSteelMelee.blp';
const description: string = `A dull sword capable of damaging enemy units through physical contact.

|cffffcc00Attack damage:|r +16

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class IronSword extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
