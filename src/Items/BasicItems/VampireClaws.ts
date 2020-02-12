import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02E');
const name: string = 'Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
const goldCost: number = 608;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGhoulFrenzy.blp';
const description: string = `Practicing with these will surely make you super fast.

|cffffcc00Lifesteal:|r +16%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;

export class VampireClaws extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
