import { Item } from '../Item';
import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';

export class ImprovedReinforcedHide extends ItemRecipe {
    private readonly reinforcedHide: ReinforcedHide;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I031');
    public readonly name: string = 'Improved Reinforced Hide';
    public readonly labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
    public readonly goldCost: number = 1400;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedReinforcedHides.blp';
    public readonly description: string = `A stronger protective layer of regenerative hide.

|cffffcc00Health regen:|r +25

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

    constructor(reinforcedHide: ReinforcedHide) {
        super();

        this.reinforcedHide = reinforcedHide;
        this.recipe = [this.reinforcedHide];
    }
}
