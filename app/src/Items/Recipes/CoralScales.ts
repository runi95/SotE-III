import { ItemRecipe } from '../ItemRecipe';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';
import { Item } from '../Item';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';

export class CoralScales extends ItemRecipe {
    private readonly reinforcedHide: ReinforcedHide;
    private readonly studdedLeatherArmor: StuddedLeatherArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00N');
    public readonly name: string = 'Coral Scales';
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNagaArmorUp1.blp';
    public readonly description: string = `Very strong, defensive scales.

|cffffcc00Health regen:|r +6
|cffffcc00Max health:|r +70

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

    constructor(reinforcedHide: ReinforcedHide, studdedLeatherArmor: StuddedLeatherArmor) {
        super();

        this.reinforcedHide = reinforcedHide;
        this.studdedLeatherArmor = studdedLeatherArmor;
        this.recipe = [this.reinforcedHide, this.studdedLeatherArmor];
    }
}
