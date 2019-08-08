import { ItemRecipe } from '../ItemRecipe';

export class Caduceus extends ItemRecipe {
    private readonly branch: number = FourCC('I012');
    private readonly studdedLeatherArmor: number = FourCC('I007');
    protected readonly recipe: number[] = [this.branch, this.studdedLeatherArmor];
    protected readonly resultingItem: number = FourCC('I019');
}
