import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { Item } from '../Item';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { ItemLabel } from '../ItemLabel';

export class EnchantedShield extends ItemRecipe {
    private readonly orbOfMagic: OrbOfMagic;
    private readonly moonArmor: MoonArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I027');
    public readonly name: string = 'Enchanted Shield';
    public readonly labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.RESISTANCE];
    public readonly goldCost: number = 160;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumArmor.blp';
    public readonly description: string = `A shield that glows with magical potency.

|cffffcc00Intelligence:|r +5
|cffffcc00Resistance:|r +6

|cFF808080Intelligence increases the damage done by your spells.|r`;

    constructor(orbOfMagic: OrbOfMagic, moonArmor: MoonArmor) {
        super();

        this.orbOfMagic = orbOfMagic;
        this.moonArmor = moonArmor;
        this.recipe = [this.orbOfMagic, this.moonArmor];
    }
}
