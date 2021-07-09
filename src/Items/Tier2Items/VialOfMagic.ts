import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { FullVial } from '../Tier1Items/FullVial';

const itemId: number = FourCC('I001');
const name = 'Vial of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost = 7020;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNVialOfMagic.dds';
const description = `A vial full of enchanted mana water.

|cffffcc00Intelligence:|r +33
|cffffcc00Max mana:|r +900
|cffffcc00Mana regen:|r +12

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class VialOfMagic extends ItemRecipe {
    constructor(fullVial: FullVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [fullVial]);
    }
}
