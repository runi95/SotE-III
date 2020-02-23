import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { ItemLabel } from '../ItemLabel';
import { FullVial } from './FullVial';

const itemId: number = FourCC('I001');
const name: string = 'Vial of Magic';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost: number = 1790;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialOfMagic.dds';
const description: string = `A vial full of enchanted mana water.

|cffffcc00Intelligence:|r +8
|cffffcc00Max Mana:|r +150
|cffffcc00Mana regen:|r +12

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class VialOfMagic extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, fullVial: FullVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, fullVial]);
    }
}
