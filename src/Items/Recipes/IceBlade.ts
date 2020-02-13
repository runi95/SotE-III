import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';
import { ItemLabel } from '../ItemLabel';
import { SlowChains } from '../BasicItems/SlowChains';

const itemId: number = FourCC('I00K');
const name: string = 'Ice Blade';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 950;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumMelee.blp';
const description: string = `A steel sword coated with frost.

|cffffcc00Attack damage:|r +14
|cffffcc00Effect (1):|r Attacks have a 5% chance to slow heroes.
|cffffcc00Effect (2):|r Attacks have a 15% chance to slow units.

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class IceBlade extends ItemRecipe {
    constructor(ironSword: IronSword, slowChains: SlowChains) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironSword, slowChains]);
    }
}
