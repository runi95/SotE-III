import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AdeptStaff } from './AdeptStaff';

const itemId: number = FourCC('I03M');
const name: string = 'Master Staff';
const labels: ItemLabel[] = [ItemLabel.CRITICAL_CAST];
const goldCost: number = 4640;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPriestMaster.blp';
const description: string = `Your wish has been granted.

|cffffcc00Critical Cast:|r +80%

|cFF808080Critical cast gives a chance for spells to deal double damage.|r`;

export class MasterStaff extends ItemRecipe {
    constructor(adeptStaff: AdeptStaff) {
        super(itemId, name, labels, goldCost, iconPath, description, [adeptStaff]);
    }
}
