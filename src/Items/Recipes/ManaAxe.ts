import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BasicItems/WarAxe';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00Q');
const name: string = 'Mana Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_MANA];
const goldCost: number = 780;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpTwo.blp';
const description: string = `A war axe infused with magic.

|cffffcc00Strength:|r +5
|cffffcc00Max Mana:|r +60

|cFF808080Strength increases your max health and health regen.|r`;

export class ManaAxe extends ItemRecipe {
    constructor(warAxe: WarAxe, emptyVial: EmptyVial) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, emptyVial]);
    }
}
