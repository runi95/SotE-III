import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { ReinforcedHide } from '../BaseItems/ReinforcedHide';

const itemId: number = FourCC('I052');
const name = 'Belt of Giant Strength';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.HEALTH_REGEN];
const goldCost = 1050;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNBelt.blp';
const description = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +12
|cffffcc00Health regen:|r +12

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class BeltOfGiantStrength extends ItemRecipe {
    constructor(warAxe: WarAxe, reinforcedHide: ReinforcedHide) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, reinforcedHide]);
    }
}
