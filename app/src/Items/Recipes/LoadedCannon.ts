import { ItemRecipe } from '../ItemRecipe';

export class LoadedCannon extends ItemRecipe {
    private readonly loadedRifle: number = FourCC('I00W');
    private readonly ironSword: number = FourCC('I00H');
    protected readonly recipe: number[] = [this.loadedRifle, this.ironSword];
    protected readonly resultingItem: number = FourCC('I00X');
}
