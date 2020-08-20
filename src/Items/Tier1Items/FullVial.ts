import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { EmptyVial } from '../BaseItems/EmptyVial';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';

// Did not give this item any bonus effects because it's too cheap
const itemId: number = FourCC('I016');
const name: string = 'Full Vial';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.INTELLIGENCE];
const goldCost: number = 900;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialFull.blp';
const description: string = `A vial full of potency.

|cffffcc00Max Mana:|r +100
|cffffcc00Intelligence:|r +12

|cFF808080Mana is required when casting most spells.|r`;

export class FullVial extends ItemRecipe {
    constructor(emptyVial: EmptyVial, orbOfMagic: OrbOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial, orbOfMagic]);
    }
}
