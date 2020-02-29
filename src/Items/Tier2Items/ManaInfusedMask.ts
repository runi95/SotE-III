import { ItemRecipe } from '../ItemRecipe';
import { MaskOfProficiency } from '../Tier1Items/MaskOfProficiency';
import { ItemLabel } from '../ItemLabel';
import { FullVial } from '../Tier1Items/FullVial';

const itemId: number = FourCC('I029');
const name: string = 'Mana Infused Mask';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost: number = 2850;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkullBlue.blp';
const description: string = `A mask infused with pure magic.

|cffffcc00Intelligence:|r +18
|cffffcc00Max Mana:|r +200
|cffffcc00Mana regen:|r +10

|cFF808080Mana is required when casting most spells.|r`;

export class ManaInfusedMask extends ItemRecipe {
    constructor(maskOfProficiency: MaskOfProficiency, fullVial: FullVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [maskOfProficiency, fullVial]);
    }
}
