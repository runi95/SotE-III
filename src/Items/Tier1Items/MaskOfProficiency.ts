import { ItemRecipe } from '../ItemRecipe';
import { SobiMask } from '../BaseItems/SobiMask';
import { ItemLabel } from '../ItemLabel';
import { EmptyVial } from '../BaseItems/EmptyVial';

// tslint:disable: max-line-length
const itemId: number = FourCC('I026');
const name = 'Mask of Proficiency';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost = 950;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkull.blp';
const description = `I wonder what this thing does.

|cffffcc00Max Mana:|r +150
|cffffcc00Mana regen:|r +10
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 12 charges)
|cffffcc00Effect(2):|r Casting a spell with at least 4 item charges reduces the charge count by 3 and permanently increases the wearer's mana by +2

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class MaskOfProficiency extends ItemRecipe {
    constructor(emptyVial: EmptyVial, sobiMask: SobiMask) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial, sobiMask]);
    }
}
