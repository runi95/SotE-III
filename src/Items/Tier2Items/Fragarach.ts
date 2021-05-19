import { ItemRecipe } from '../ItemRecipe';
import { IronClaws } from '../Tier1Items/IronClaws';
import { IceBlade } from '../Tier1Items/IceBlade';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I017');
const name = 'Fragarach';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost = 8450;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNAirBender.blp';
const description = `A sword so sharp it can cut whispers in half.

|cffffcc00Agility:|r +20
|cffffcc00Attack damage:|r +125
|cffffcc00Effect:|r Slows the movement speed of nearby enemy units by 20%

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Fragarach extends ItemRecipe {
    constructor(iceBlade: IceBlade, ironClaws: IronClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [iceBlade, ironClaws]);
    }
}
