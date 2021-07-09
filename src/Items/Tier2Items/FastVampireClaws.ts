import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireClaws } from '../BaseItems/VampireClaws';
import { IronClaws } from '../Tier1Items/IronClaws';

const itemId: number = FourCC('I032');
const name = 'Fast Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost = 2525;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGreaterVampireClaws.dds';
const description = `Lightweight vampire claws for faster attack speed.

|cffffcc00Agility:|r +20
|cffffcc00Attack damage:|r +40
|cffffcc00Lifesteal:|r +25
|cffffcc00Unique:|r Increases lifesteal by an additional 5% of attack damage

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class FastVampireClaws extends ItemRecipe {
    constructor(ironClaws: IronClaws, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironClaws, vampireClaws]);
    }
}
