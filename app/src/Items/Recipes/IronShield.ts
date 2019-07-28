import { ItemRecipe } from '../ItemRecipe';

export class IronShield extends ItemRecipe {
    private readonly ironShield: number = FourCC('I005');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.ironShield, this.ironShield];
    protected readonly resultingItem: number = FourCC('I00J');
}
