import { ItemRecipe } from '../ItemRecipe';
import { DruidicSalve } from '../BasicItems/DruidicSalve';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I019');
const name: string = 'Caduceus';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost: number = 2000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNWandOfManaSteal.blp';
const description: string = `Caduceus the protector of merchants and travellers.

|cffffcc00Max health:|r +400
|cffffcc00Effect:|r Teleport to the Arcane Vault

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Caduceus extends ItemRecipe {
    constructor(druidicSalve: DruidicSalve, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [druidicSalve, studdedLeatherArmor]);
    }
}
