import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from './CreatureClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I025');
const name: string = 'Improved Creature Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost: number = 3600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedCreatureAttack.tga';
const description: string = `These claws seem to cut through things better than any sharp knife would.

|cffffcc00Agility:|r +40

|cFF808080Agility increases your attack and movement speed.|r`;

export class ImprovedCreatureClaws extends ItemRecipe {
    constructor(creatureClaws: CreatureClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [creatureClaws]);
    }
}
