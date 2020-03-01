import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AmuletOfSpellReflection } from '../BaseItems/AmuletOfSpellReflection';
import { MoonArmor } from '../BaseItems/MoonArmor';

const itemId: number = FourCC('I03Q');
const name: string = `Khadgar's Amulet`;
const labels: ItemLabel[] = [ItemLabel.RESISTANCE, ItemLabel.REFLECT];
const goldCost: number = 3345;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPeriapt1.blp';
const description: string = `Reflects and blocks incoming spells.

|cffffcc00Resistance:|r +12
|cffffcc00Reflect:|r +35

|cFF808080Reflect deals reflect damage back to the source when taking spell damage.|r`;

export class KhadgarsAmulet extends ItemRecipe {
    constructor(amuletOfSpellReflection: AmuletOfSpellReflection, moonArmor: MoonArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [amuletOfSpellReflection, moonArmor]);
    }
}
