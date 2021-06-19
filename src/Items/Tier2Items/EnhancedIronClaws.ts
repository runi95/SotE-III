import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { IronClaws } from '../Tier1Items/IronClaws';
import { LoadedRifle } from '../BaseItems/LoadedRifle';
import { Claws } from '../BaseItems/Claws';

const itemId: number = FourCC('I05A');
const name = 'Enhanced Iron Claws';
const labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.ATTACK_DAMAGE];
const goldCost = 3450;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedIronClaws.dds';
const description = `Looks like a deadly pair of claws.

|cffffcc00Agility:|r +35
|cffffcc00Attack damage:|r +75
|cffffcc00Passive:|r Increases attack speed by +10%
|cffffcc00Unique:|r Physical damage against targets below 25% health is increased by +100%

|cFF808080Agility increases your attack and movement speed.|r`;

export class EnhancedIronClaws extends ItemRecipe {
    constructor(ironClaws: IronClaws, loadedRifle: LoadedRifle, claws: Claws) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironClaws, loadedRifle, claws]);
    }
}
