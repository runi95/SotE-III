import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Claws } from '../BaseItems/Claws';
import { VampireClaws } from '../BaseItems/VampireClaws';

const itemId: number = FourCC('I032');
const name: string = 'Fast Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost: number = 2250;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGreaterVampireClaws.dds';
const description: string = `Lightweight vampire claws for faster attack speed.

|cffffcc00Agility:|r +15
|cffffcc00Lifesteal:|r +36

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class FastVampireClaws extends ItemRecipe {
    constructor(claws: Claws, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, vampireClaws]);
    }
}
