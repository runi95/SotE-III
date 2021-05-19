import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ManaStone } from '../Tier1Items/ManaStone';
import { BrightLifeStone } from '../Tier1Items/BrightLifeStone';

const itemId: number = FourCC('I03J');
const name = 'Charged Stone';
const labels: ItemLabel[] = [ItemLabel.RESTORATION, ItemLabel.MAX_MANA];
const goldCost = 9000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNChargedStone.dds';
const description = `A stone charged with mana and life.

|cffffcc00Max Mana:|r +1000
|cffffcc00Restoration:|r +500%

|cFF808080Restoration restores life points based on a percentage of mana used when casting spells.|r`;

export class ChargedStone extends ItemRecipe {
    constructor(manaStone: ManaStone, brightLifeStone: BrightLifeStone) {
        super(itemId, name, labels, goldCost, iconPath, description, [manaStone, brightLifeStone]);
    }
}
