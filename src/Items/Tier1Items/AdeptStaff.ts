import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { FairyWand } from '../BaseItems/FairyWand';

const itemId: number = FourCC('I03L');
const name: string = 'Adept Staff';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST];
const goldCost: number = 2030;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPriestAdept.blp';
const description: string = `Your wish has been granted.

|cffffcc00Critical Cast:|r +40%

|cFF808080Critical cast gives a chance for spells to deal double damage.|r`;

export class AdeptStaff extends ItemRecipe {
    constructor(fairyWand: FairyWand) {
        super(itemId, name, labels, goldCost, iconPath, description, [fairyWand]);
    }
}
