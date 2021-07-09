import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { FullVial } from '../Tier1Items/FullVial';
import { BookOfKnowledge } from '../BaseItems/BookOfKnowledge';
import { ScrollOfWitchcraft } from '../BaseItems/ScrollOfWitchcraft';

const itemId: number = FourCC('I05B');
const name = 'Tome of Greater Knowledge';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.COOLDOWN_REDUCTION];
const goldCost = 2850;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNTomeRed.blp';
const description = `Could this possibly contain all knowledge known to man?

|cffffcc00Max mana:|r +150
|cffffcc00Intelligence:|r +40
|cffffcc00Cooldown reduction:|r +10%
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 60 charges)
|cffffcc00Effect(2):|r Casting a spell with 60 item charges removes all charges and casts the spell with a +50% bonus to intelligence

|cFF808080Mana is required when casting most spells.|r`;

export class TomeOfGreaterKnowledge extends ItemRecipe {
    constructor(fullVial: FullVial, bookOfKnowledge: BookOfKnowledge, scrollOfWitchcraft: ScrollOfWitchcraft) {
        super(itemId, name, labels, goldCost, iconPath, description, [fullVial, bookOfKnowledge, scrollOfWitchcraft]);
    }
}
