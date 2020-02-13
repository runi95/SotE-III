import { ItemRecipe } from '../ItemRecipe';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';
import { Claws } from '../BasicItems/Claws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I024');
const name: string = 'Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.MAX_HEALTH];
const goldCost: number = 830;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCreatureAttack.blp';
const description: string = `Some very large claws.

|cffffcc00Agility:|r +7
|cffffcc00Max health:|r +50

|cFF808080Agility increases your attack and movement speed.|r`;

export class CreatureClaws extends ItemRecipe {
    constructor(claws: Claws, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, studdedLeatherArmor]);
    }
}
