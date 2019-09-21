import { ItemRecipe } from '../ItemRecipe';

export class ImprovedBalancedShield extends ItemRecipe {
    private readonly balancedShield: number = FourCC('I028');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.balancedShield, this.balancedShield];
    protected readonly resultingItem: number = FourCC('I02B');
}
