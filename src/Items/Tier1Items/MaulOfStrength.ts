import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I023');
const name: string = 'Maul of Strength';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 2400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHammer.blp';
const description: string = `A heavy maul only wielded by the strongest of heroes.

|cffffcc00Strength:|r +20

|cFF808080Strength increases your max health and health regen.|r`;

export class MaulOfStrength extends ItemRecipe {
    constructor(warAxe: WarAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, warAxe]);
    }
}
