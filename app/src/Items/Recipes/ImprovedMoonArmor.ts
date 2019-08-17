import { ItemRecipe } from '../ItemRecipe';

export class ImprovedMoonArmor extends ItemRecipe {
    private readonly moonArmor: number = FourCC('I008');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [this.moonArmor, this.moonArmor];
    protected readonly resultingItem: number = FourCC('I00O');
}
