import { ItemRecipe } from '../ItemRecipe';

export class ReinforcedScales extends ItemRecipe {
    private readonly coralScales: number = FourCC('I00N');
    private readonly steelShield: number = FourCC('I00J');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.coralScales, this.coralScales, this.steelShield];
    protected readonly resultingItem: number = FourCC('I01K');
}
