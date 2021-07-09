import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AdeptStaff } from '../Tier1Items/AdeptStaff';
import { BookOfKnowledge } from '../BaseItems/BookOfKnowledge';
import { ScrollOfWitchcraft } from '../BaseItems/ScrollOfWitchcraft';

const itemId: number = FourCC('I03M');
const name = 'Master Staff';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST, ItemLabel.INTELLIGENCE, ItemLabel.COOLDOWN_REDUCTION];
const goldCost = 3394;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPriestMaster.blp';
const description = `Your wish has been granted.

|cffffcc00Intelligence:|r +35
|cffffcc00Critical cast:|r +20%
|cffffcc00Cooldown reduction:|r +10%
|cffffcc00Use:|r Apply banish to the target unit for 3 seconds.
|cffffcc00Range (Banish) :|r 800
|cffffcc00Mana cost (Banish) :|r 50
|cffffcc00Cooldown (Banish) :|r 30

|cFF808080Critical cast gives a chance for spells to deal double damage.|r`;

export class MasterStaff extends ItemRecipe {
    constructor(adeptStaff: AdeptStaff, bookOfKnowledge: BookOfKnowledge, scrollOfWitchcraft: ScrollOfWitchcraft) {
        super(itemId, name, labels, goldCost, iconPath, description, [adeptStaff, bookOfKnowledge, scrollOfWitchcraft]);
    }
}
