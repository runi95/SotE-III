import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireClaws } from '../BasicItems/VampireClaws';

const itemId: number = FourCC('I03N');
const name: string = 'Vampire Fangs';
const labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
const goldCost: number = 1500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCannibalize.blp';
const description: string = `These fangs are able to drain the blood of the living withing seconds.

|cffffcc00Lifesteal:|r +60

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class VampireFangs extends ItemRecipe {
    constructor(vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [vampireClaws]);
    }
}
