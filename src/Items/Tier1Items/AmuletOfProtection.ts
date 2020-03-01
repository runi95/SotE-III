import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AmuletOfSpellReflection } from '../BaseItems/AmuletOfSpellReflection';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I03R');
const name: string = 'Amulet of Protection';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.REFLECT];
const goldCost: number = 2730;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPeriaptGreen.dds';
const description: string = `Protects the wearer from spells and magic.

|cffffcc00Max health:|r +120
|cffffcc00Reflect:|r +30

|cFF808080Reflect deals reflect damage back to the source when taking spell damage.|r`;

export class AmuletOfProtection extends ItemRecipe {
    constructor(amuletOfSpellReflection: AmuletOfSpellReflection, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [amuletOfSpellReflection, studdedLeatherArmor]);
    }
}
