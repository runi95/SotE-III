import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02E');
const name: string = 'Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
const goldCost: number = 350;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGhoulFrenzy.blp';
const description: string = `Practicing with these will surely make you super fast.

|cffffcc00Lifesteal:|r +15

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class VampireClaws extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
