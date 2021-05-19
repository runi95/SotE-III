import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { MaskOfProficiency } from '../Tier1Items/MaskOfProficiency';

const itemId: number = FourCC('I048');
const name = 'Enhanced Mask of Proficiency';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MANA_REGEN];
const goldCost = 6880;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedMaskOfProficiency.dds';
const description = `I wonder what this thing does.

|cffffcc00Intelligence:|r +45
|cffffcc00Mana regen:|r +28

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class EnhancedMaskOfProficiency extends ItemRecipe {
    constructor(maskOfProficiency: MaskOfProficiency) {
        super(itemId, name, labels, goldCost, iconPath, description, [maskOfProficiency]);
    }
}
