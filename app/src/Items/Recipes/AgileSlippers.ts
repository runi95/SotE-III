import { ItemRecipe } from '../ItemRecipe';

export class AgileSlippers extends ItemRecipe {
    private readonly bootsOfSpeed: number = FourCC('I00R');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.bootsOfSpeed, this.bootsOfSpeed];
    protected readonly resultingItem: number = FourCC('I01D');
}
