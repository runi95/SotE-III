import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from './CreatureClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I025');
const name: string = 'Dragon Whelp Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.MAX_HEALTH];
const goldCost: number = 1680;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedCreatureAttack.tga';
const description: string = `Do you really think these came from a dragon?

|cffffcc00Agility:|r +12
|cffffcc00Max health:|r +150

|cFF808080Agility increases your attack and movement speed.|r`;

export class DragonWhelpClaws extends ItemRecipe {
    constructor(creatureClaws: CreatureClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [creatureClaws]);
    }
}
