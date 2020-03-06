import { ItemRecipe } from '../ItemRecipe';
import { EmptyVial } from '../BaseItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I015');
const name: string = 'Mana Stone';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA];
const goldCost: number = 2400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNManaStone.blp';
const description: string = `A stone surging with magical energy.

|cffffcc00Max Mana:|r +800

|cFF808080Mana is required when casting most spells.|r`;

export class ManaStone extends ItemRecipe {
    constructor(emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [emptyVial]);
    }
}
