import { ItemRecipe } from '../ItemRecipe';
import { MaskOfProficiency } from '../Tier1Items/MaskOfProficiency';
import { ItemLabel } from '../ItemLabel';
import { FullVial } from '../Tier1Items/FullVial';

const itemId: number = FourCC('I029');
const name: string = 'Ring of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost: number = 7060;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRingVioletSpider.blp';
const description: string = `A ring infused with pure magic.

|cffffcc00Intelligence:|r +33
|cffffcc00Max Mana:|r +800
|cffffcc00Mana regen:|r +16

|cFF808080Mana is required when casting most spells.|r`;

export class RingOfMagic extends ItemRecipe {
    constructor(maskOfProficiency: MaskOfProficiency, fullVial: FullVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [maskOfProficiency, fullVial]);
    }
}
