import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AdeptStaff } from '../Tier1Items/AdeptStaff';

const itemId: number = FourCC('I03M');
const name = 'Master Staff';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST];
const goldCost = 4640;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPriestMaster.blp';
const description = `Your wish has been granted.

|cffffcc00Critical Cast:|r +80%

|cFF808080Critical cast gives a chance for spells to deal double damage.|r`;

export class MasterStaff extends ItemRecipe {
    constructor(adeptStaff: AdeptStaff) {
        super(itemId, name, labels, goldCost, iconPath, description, [adeptStaff]);
    }
}
