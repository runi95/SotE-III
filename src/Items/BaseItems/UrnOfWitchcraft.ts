import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I05G');
const name = 'Urn of Witchcraft';
const labels: ItemLabel[] = [ItemLabel.COOLDOWN_REDUCTION];
const goldCost = 560;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNUrnOfKelThuzad.blp';
const description = `An urn often used by witches when crafting spells.

|cffffcc00Cooldown Reduction:|r +8%

|cFF808080Cooldown determines how often you can cast spells|r`;

export class UrnOfWitchcraft extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
