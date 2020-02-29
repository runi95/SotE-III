import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { IronwoodBranch } from '../BaseItems/IronwoodBranch';
import { StuddedLeatherArmor } from '../BaseItems/StuddedLeatherArmor';

const itemId: number = FourCC('I03I');
const name: string = 'Spiked Carapace';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.THORNS];
const goldCost: number = 3200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThornShield.blp';
const description: string = `Covers your entire body with armored spikes.

|cffffcc00Max health:|r +200
|cffffcc00Thorns:|r +30

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class SpikedCarapace extends ItemRecipe {
    constructor(ironwoodBranch: IronwoodBranch, studdedLeatherArmor: StuddedLeatherArmor) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironwoodBranch, studdedLeatherArmor]);
    }
}
