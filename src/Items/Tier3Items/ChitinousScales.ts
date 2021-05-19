import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ImpenetrableShield } from '../Tier2Items/ImpenetrableShield';

const itemId: number = FourCC('I04N');
const name = 'Chitinous Scales';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN, ItemLabel.MAX_HEALTH, ItemLabel.BLOCK, ItemLabel.RESISTANCE];
const goldCost = 38050;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp2.blp';
const description = `Very strong, defensive scales.

|cffffcc00Health regen:|r +100
|cffffcc00Max health:|r +3000
|cffffcc00Block:|r +150
|cffffcc00Resistance:|r +150

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class ChitinousScales extends ItemRecipe {
    constructor(impenetrableShield: ImpenetrableShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [impenetrableShield]);
    }
}
