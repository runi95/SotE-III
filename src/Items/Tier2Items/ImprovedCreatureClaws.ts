import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from '../Tier1Items/CreatureClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I025');
const name = 'Improved Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 7200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedCreatureAttack.tga';
const description = `These claws seem to cut through things better than any sharp knife would.

|cffffcc00Agility:|r +80

|cFF808080Agility increases your attack and movement speed.|r`;

export class ImprovedCreatureClaws extends ItemRecipe {
    constructor(creatureClaws: CreatureClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [creatureClaws]);
    }
}
