import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { FastVampireClaws } from './FastVampireClaws';
import { VampireFangs } from '../Tier1Items/VampireFangs';
import { CreatureClaws } from '../Tier1Items/CreatureClaws';

const itemId: number = FourCC('I043');
const name = 'Devouring Fangs';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost = 11500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRedDragonDevour.blp';
const description = `No need to chew.

|cffffcc00Agility:|r +100
|cffffcc00Lifesteal:|r +100

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class DevouringFangs extends ItemRecipe {
    constructor(fastVampireClaws: FastVampireClaws, vampireFangs: VampireFangs, creatureClaws: CreatureClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [fastVampireClaws, vampireFangs, creatureClaws]);
    }
}
