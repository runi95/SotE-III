import { ItemRecipe } from '../ItemRecipe';
import { IronClaws } from './IronClaws';
import { ManaBlade } from './ManaBlade';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I017');
const name: string = 'Fragarach';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 1300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAirBender.blp';
const description: string = `A sword so sharp it can cut whispers in half.

|cffffcc00Attack damage:|r +18
|cffffcc00Effect:|r Slows the movement speed of nearby enemy units by 20%

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Fragarach extends ItemRecipe {
    constructor(manaBlade: ManaBlade, ironClaws: IronClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [manaBlade, ironClaws]);
    }
}
