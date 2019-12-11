import { ItemRecipe } from '../ItemRecipe';
import { BerserkerAxes } from './BerserkerAxes';
import { Item } from '../Item';
import { BerserkerPotion } from '../BasicItems/BerserkerPotion';

export class EnhancedBerserkerAxes extends ItemRecipe {
    private readonly berserkerAxes: BerserkerAxes;
    private readonly berserkerPotion: BerserkerPotion;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02A');
    public readonly name: string = 'Enhanced Berserker Axes';
    public readonly goldCost: number = 1500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEnhancedBerserkerAxes.blp';
    public readonly description: string = `Dual axes only wielded by the strongest berserkers.

|cffffcc00Strength:|r +18

|cFF808080Strength increases your max health and health regen.|r`;

    constructor(berserkerAxes: BerserkerAxes, berserkerPotion: BerserkerPotion) {
        super();

        this.berserkerAxes = berserkerAxes;
        this.berserkerPotion = berserkerPotion;
        this.recipe = [this.berserkerAxes, this.berserkerPotion, this.berserkerPotion];
    }
}
