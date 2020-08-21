import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VampireClaws } from '../BaseItems/VampireClaws';
import { IronClaws } from '../Tier1Items/IronClaws';

const itemId: number = FourCC('I032');
const name: string = 'Fast Vampire Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
const goldCost: number = 2525;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGreaterVampireClaws.dds';
const description: string = `Lightweight vampire claws for faster attack speed.

|cffffcc00Agility:|r +20
|cffffcc00Attack Damage:|r +40
|cffffcc00Lifesteal:|r +25
|cffffcc00Passive:|r Increases attack speed by +15%

|cFF808080Lifesteal determines the maximum amount of health regained when attacking enemy units.|r`;

export class FastVampireClaws extends ItemRecipe {
    constructor(ironClaws: IronClaws, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironClaws, vampireClaws]);
    }
}
