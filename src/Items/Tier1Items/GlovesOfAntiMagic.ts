import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';
import { ItemLabel } from '../ItemLabel';
import { GoblinBattery } from '../BaseItems/GoblinBattery';

const itemId: number = FourCC('I056');
const name = 'Gloves of Anti-Magic';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 1350;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNControlMagic.blp';
const description = `A very unique set of gloves.

|cffffcc00Agility:|r +30
|cffffcc00Unique:|r Dealing physical damage destroys 12 mana from the target unit and deals bonus damage to the target for each mana destroyed this way

|cFF808080Agility increases your attack and movement speed.|r`;

export class GlovesOfAntiMagic extends ItemRecipe {
    constructor(claws: Claws, goblinBattery: GoblinBattery) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, goblinBattery]);
    }
}
