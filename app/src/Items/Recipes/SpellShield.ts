import { ItemRecipe } from '../ItemRecipe';
import { VialOfMagic } from './VialOfMagic';
import { EnchantedShield } from './EnchantedShield';
import { Item } from '../Item';
import { LionsRing } from './LionsRing';

export class SpellShield extends ItemRecipe {
    private readonly vialOfMagic: VialOfMagic;
    private readonly enchantedShield: EnchantedShield;
    private readonly lionsRing: LionsRing;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02F');
    public readonly name: string = 'Spell Shield';
    public readonly goldCost: number = 780;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSpellShieldAmulet.blp';
    public readonly description: string = `A shield that glows with magical potency.

|cffffcc00Intelligence:|r +18
|cffffcc00Resistance:|r +30
|cffffcc00Effect:|r Blocks a negative spell cast directly on you every 40 seconds

|cFF808080Intelligence increases the damage done by your spells.|r`;

    constructor(vialOfMagic: VialOfMagic, enchantedShield: EnchantedShield, lionsRing: LionsRing) {
        super();

        this.vialOfMagic = vialOfMagic;
        this.enchantedShield = enchantedShield;
        this.lionsRing = lionsRing;
        this.recipe = [this.vialOfMagic, this.enchantedShield, this.lionsRing];
    }
}
