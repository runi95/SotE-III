import { ItemRecipe } from '../ItemRecipe';
import { VialOfMagic } from './VialOfMagic';
import { EnchantedShield } from './EnchantedShield';
import { LionsRing } from './LionsRing';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02F');
const name: string = 'Spell Shield';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.RESISTANCE];
const goldCost: number = 4000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSpellShieldAmulet.blp';
const description: string = `A shield that glows with magical potency.

|cffffcc00Intelligence:|r +18
|cffffcc00Resistance:|r +30
|cffffcc00Effect:|r Blocks a negative spell cast directly on you every 40 seconds

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class SpellShield extends ItemRecipe {
    constructor(vialOfMagic: VialOfMagic, enchantedShield: EnchantedShield, lionsRing: LionsRing) {
        super(itemId, name, labels, goldCost, iconPath, description, [vialOfMagic, enchantedShield, lionsRing]);
    }
}
