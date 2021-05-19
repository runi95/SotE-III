import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { VialOfMagic } from '../Tier2Items/VialOfMagic';
import { EnhancedMaskOfProficiency } from '../Tier2Items/EnhancedMaskOfProficiency';

const itemId: number = FourCC('I04K');
const name = 'Scroll of Wisdom';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost = 33600;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNBansheeAdept.blp';
const description = `A scroll written in an ancient language

|cffffcc00Passive:|r Casting a spell has a 5% chance to instantly reset it's cooldown
|cffffcc00Intelligence:|r +150
|cffffcc00Max Mana:|r +4500
|cffffcc00Mana regen:|r +60

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class ScrollOfWisdom extends ItemRecipe {
    constructor(vialOfMagic: VialOfMagic, enhancedMaskOfProficiency: EnhancedMaskOfProficiency) {
        super(itemId, name, labels, goldCost, iconPath, description, [vialOfMagic, enhancedMaskOfProficiency]);
    }
}
