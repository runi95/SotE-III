import { ItemRecipe } from '../ItemRecipe';
import { SteelShield } from './SteelShield';
import { CoralScales } from './CoralScales';
import { Item } from '../Item';

export class ReinforcedScales extends ItemRecipe {
    private readonly coralScales: CoralScales;
    private readonly steelShield: SteelShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01K');
    public readonly name: string = 'Reinforced Scales';
    public readonly goldCost: number = 1120;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp3.blp';
    public readonly description: string = `Highly reinforced scales, sure to defend against the strongest of opponents.

|cffffcc00Health regen:|r +15
|cffffcc00Max health:|r +150
|cffffcc00Block:|r +20

|cFF808080Health determines how much damage you can take before dying.|r`;

    constructor(steelShield: SteelShield, coralScales: CoralScales) {
        super();

        this.steelShield = steelShield;
        this.coralScales = coralScales;
        this.recipe = [this.coralScales, this.coralScales, this.steelShield];
    }
}
