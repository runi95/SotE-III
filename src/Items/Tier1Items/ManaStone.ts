import { ItemRecipe } from '../ItemRecipe';
import { EmptyVial } from '../BaseItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I015');
const name = 'Mana Stone';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA];
const goldCost = 1500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNManaStone.blp';
const description = `A stone surging with magical energy.

|cffffcc00Max Mana:|r +500
|cffffcc00Unique:|r Casting a spell now costs an additional 5% of your current mana, but the extra mana cost is applied to spells as an extra intelligence bonus

|cFF808080Mana is required when casting most spells.|r`;

export class ManaStone extends ItemRecipe {
    constructor(emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial]);
    }
}
