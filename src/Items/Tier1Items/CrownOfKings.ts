import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { IronShield } from '../BaseItems/IronShield';
import { MoonArmor } from '../BaseItems/MoonArmor';

const itemId: number = FourCC('I053');
const name = 'Crown of Kings';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost = 1480;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNHelmutPurple.blp';
const description = `A royal crown fit for a king

|cffffcc00Strength:|r +10
|cffffcc00Block:|r +10
|cffffcc00Resistance:|r +10
|cffffcc00Unique:|r Damage taken is reduced by 1 for every 50 health missing

|cFF808080Strength increases your max health and health regen.|r`;

export class CrownOfKings extends ItemRecipe {
    constructor(warAxe: WarAxe, ironShield: IronShield, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, ironShield, moonArmor]);
    }
}
