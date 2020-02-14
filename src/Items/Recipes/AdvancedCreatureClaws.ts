import { ItemRecipe } from '../ItemRecipe';
import { ImprovedCreatureClaws } from './ImprovedCreatureClaws';
import { ItemLabel } from '../ItemLabel';
import { FastVampireClaws } from './FastVampireClaws';
import { PurpleSoulstone } from '../BasicItems/PurpleSoulstone';

const itemId: number = FourCC('I03A');
const name: string = 'Advanced Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost: number = 22560;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedCreatureAttack.blp';
const description: string = `Make sure you're holding these things the right way.

|cffffcc00Agility:|r +200
|cffffcc00Lifesteal:|r +120%

|cFF808080Agility increases your attack and movement speed.|r`;

export class AdvancedCreatureClaws extends ItemRecipe {
    constructor(improvedCreatureClaws: ImprovedCreatureClaws, fastVampireClaws: FastVampireClaws, purpleSoulstone: PurpleSoulstone) {
        super(itemId, name, labels, goldCost, iconPath, description, [improvedCreatureClaws, fastVampireClaws, purpleSoulstone]);
    }
}
