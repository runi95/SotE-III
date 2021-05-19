import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfLightning } from '../BaseItems/OrbOfLightning';

const itemId: number = FourCC('I00K');
const name = 'Ice Blade';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost = 1350;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNThoriumMelee.blp';
const description = `A steel sword coated with frost.

|cffffcc00Attack damage:|r +19
|cffffcc00Effect (1):|r Attacks have a 5% chance to slow heroes.
|cffffcc00Effect (2):|r Attacks have a 15% chance to slow units.

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class IceBlade extends ItemRecipe {
    constructor(orbOfLightning: OrbOfLightning) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfLightning]);
    }
}
