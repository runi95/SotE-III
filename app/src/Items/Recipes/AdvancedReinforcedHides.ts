import { ItemRecipe } from '../ItemRecipe';
import { ImprovedMoonArmor } from './ImprovedMoonArmor';
import { Item } from '../Item';
import { ImprovedBalancedShield } from './ImprovedBalancedShield';
import { ReinforcedScales } from './ReinforcedScales';

export class AdvancedReinforcedHides extends ItemRecipe {
    private readonly improvedMoonArmor: ImprovedMoonArmor;
    private readonly improvedBalancedShield: ImprovedBalancedShield;
    private readonly reinforcedScales: ReinforcedScales;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02D');
    public readonly name: string = 'Advanced Reinforced Hides';
    public readonly goldCost: number = 3700;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAdvancedReinforcedHides.blp';
    public readonly description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Health:|r +200
|cffffcc00Health regen:|r +20
|cffffcc00Block:|r +45
|cffffcc00Resistance:|r +45

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

    constructor(improvedMoonArmor: ImprovedMoonArmor, improvedBalancedShield: ImprovedBalancedShield, reinforcedScales: ReinforcedScales) {
        super();

        this.improvedMoonArmor = improvedMoonArmor;
        this.improvedBalancedShield = improvedBalancedShield;
        this.reinforcedScales = reinforcedScales;

        this.recipe = [this.improvedMoonArmor, this.improvedMoonArmor, this.improvedBalancedShield, this.reinforcedScales];
    }
}
