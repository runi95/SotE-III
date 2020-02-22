import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Claws } from '../BasicItems/Claws';
import { VampireClaws } from '../BasicItems/VampireClaws';

const itemId: number = FourCC('I032');
const name: string = 'Fast Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost: number = 2110;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedUnholyStrength.blp';
const description: string = `Lightweight vampire claws for faster attack speed.

|cffffcc00Agility:|r +15
|cffffcc00Lifesteal:|r +20%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;

export class FastVampireClaws extends ItemRecipe {
    constructor(claws: Claws, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws, vampireClaws]);
    }
}