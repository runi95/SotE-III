import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';
import { ItemLabel } from '../ItemLabel';
import { OrbOfVenom } from '../BaseItems/OrbOfVenom';

const itemId: number = FourCC('I024');
const name = 'Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.VENOM];
const goldCost = 1010;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCreatureAttack.blp';
const description = `Some very large claws.

|cffffcc00Agility:|r +12
|cffffcc00Venom:|r +16

|cFF808080Venom causes attacks to apply stacking poison damage.|r`;

export class CreatureClaws extends ItemRecipe {
    constructor(claws: Claws, orbOfVenom: OrbOfVenom) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, orbOfVenom]);
    }
}
