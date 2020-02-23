import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { SobiMask } from '../BasicItems/SobiMask';

const itemId: number = FourCC('I016');
const name: string = 'Full Vial';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost: number = 750;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialFull.blp';
const description: string = `A vial full of potency.

|cffffcc00Max Mana:|r +100
|cffffcc00Mana regen:|r +10

|cFF808080Mana is required when casting most spells.|r`;

export class FullVial extends ItemRecipe {
    constructor(emptyVial: EmptyVial, sobiMask: SobiMask) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial, sobiMask]);
    }
}
