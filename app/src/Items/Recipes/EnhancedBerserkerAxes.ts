import { ItemRecipe } from '../ItemRecipe';

export class EnhancedBerserkerAxes extends ItemRecipe {
    private readonly berserkerAxes: number = FourCC('I023');
    private readonly berserkerPotion: number = FourCC('I003');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.berserkerAxes, this.berserkerPotion, this.berserkerPotion];
    protected readonly resultingItem: number = FourCC('I02A');
}
