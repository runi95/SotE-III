import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BasicItems/IronShield';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';

const itemId: number = FourCC('I016');
const name: string = 'Ancile';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
const goldCost: number = 1536;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGrimWard.blp';
const description: string = `A shield worn by the great mage Ancile.

|cffffcc00Max health:|r +250
|cffffcc00Block:|r +8

|cFF808080Health determines how much damage you can take before dying.|r`;

export class Ancile extends ItemRecipe {
    constructor(studdedLeatherArmor: StuddedLeatherArmor, ironShield: IronShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [studdedLeatherArmor, ironShield]);
    }
}
