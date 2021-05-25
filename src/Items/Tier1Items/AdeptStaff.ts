import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { FairyWand } from '../BaseItems/FairyWand';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';

const itemId: number = FourCC('I03L');
const name = 'Adept Staff';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST, ItemLabel.INTELLIGENCE];
const goldCost = 1154;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPriestAdept.blp';
const description = `Your wish has been granted.

|cffffcc00Intelligence:|r +10
|cffffcc00Critical Cast:|r +15%

|cFF808080Critical cast gives a chance for spells to cast with an additional intelligence bonus.|r`;

export class AdeptStaff extends ItemRecipe {
    constructor(fairyWand: FairyWand, orbOfMagic: OrbOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [fairyWand, orbOfMagic]);
    }
}
