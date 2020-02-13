import { ItemRecipe } from '../ItemRecipe';
import { IronClaws } from './IronClaws';
import { IceBlade } from './IceBlade';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I017');
const name: string = 'Fragarach';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 2800;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAirBender.blp';
const description: string = `A sword so sharp it can cut whispers in half.

|cffffcc00Agility:|r +10
|cffffcc00Attack damage:|r +30
|cffffcc00Effect:|r Slows the movement speed of nearby enemy units by 20%

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Fragarach extends ItemRecipe {
    constructor(iceBlade: IceBlade, ironClaws: IronClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [iceBlade, ironClaws]);
    }
}
