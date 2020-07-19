import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { SharpSteelAxe } from '../Tier1Items/SharpSteelAxe';

const itemId: number = FourCC('I04B');
const name: string = 'Impaling Bolt';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 9800;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImpalingBolt.btn';
const description: string = `Can be thrown a great distance.

|cffffcc00Strength:|r +40
|cffffcc00Attack damage:|r +100

|cFF808080Strength increases your max health and health regen.|r`;

export class ImpalingBolt extends ItemRecipe {
    constructor(sharpSteelAxe: SharpSteelAxe) {
        super(itemId, name, labels, goldCost, iconPath, description, [sharpSteelAxe]);
    }
}
