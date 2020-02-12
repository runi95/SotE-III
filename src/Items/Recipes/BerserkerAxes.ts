import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BasicItems/WarAxe';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I023');
const name: string = 'Berserker Axes';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 1200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBerserkerAxes.blp';
const description: string = `Dual axes most commonly wielded by the berserkers.

|cffffcc00Strength:|r +10

|cFF808080Strength increases your max health and health regen.|r`;

export class BerserkerAxes extends ItemRecipe {
    constructor(warAxe: WarAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, warAxe]);
    }
}
