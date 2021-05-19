import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SharpSteelAxe } from '../Tier1Items/SharpSteelAxe';

const itemId: number = FourCC('I04B');
const name = 'Impaling Bolt';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost = 9800;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImpalingBolt.btn';
const description = `Can be thrown a great distance.

|cffffcc00Strength:|r +40
|cffffcc00Attack damage:|r +100

|cFF808080Strength increases your max health and health regen.|r`;

export class ImpalingBolt extends ItemRecipe {
    constructor(sharpSteelAxe: SharpSteelAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [sharpSteelAxe]);
    }
}
