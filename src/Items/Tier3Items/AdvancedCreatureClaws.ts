import { ItemRecipe } from '../ItemRecipe';
import { ImprovedCreatureClaws } from '../Tier2Items/ImprovedCreatureClaws';
import { ItemLabel } from '../ItemLabel';
import { DevouringFangs } from '../Tier2Items/DevouringFangs';
import { PurpleSoulstone } from '../UnclassedItems/PurpleSoulstone';

const itemId: number = FourCC('I03A');
const name = 'Advanced Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost = 23000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedCreatureAttack.blp';
const description = `Make sure you're holding these things the right way.

|cffffcc00Agility:|r +200
|cffffcc00Lifesteal:|r +200
|cffffcc00Passive:|r Increases attack speed by 5%

|cFF808080Agility increases your attack and movement speed.|r`;

export class AdvancedCreatureClaws extends ItemRecipe {
    constructor(improvedCreatureClaws: ImprovedCreatureClaws, purpleSoulstone: PurpleSoulstone, devouringFangs: DevouringFangs) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedCreatureClaws, purpleSoulstone, devouringFangs]);
    }
}
