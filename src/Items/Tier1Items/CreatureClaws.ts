import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I024');
const name = 'Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 2700;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCreatureAttack.blp';
const description = `Some very large claws.

|cffffcc00Agility:|r +30

|cFF808080Agility increases your attack and movement speed.|r`;

export class CreatureClaws extends ItemRecipe {
    constructor(claws: Claws) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, claws]);
    }
}
