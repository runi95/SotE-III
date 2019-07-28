import { ItemRecipe } from '../ItemRecipe';

export class CoralScales extends ItemRecipe {
    private readonly reinforcedHide: number = FourCC('I006');
    private readonly studdedLeatherArmor: number = FourCC('I007');
    protected readonly recipe: number[] = [this.reinforcedHide, this.studdedLeatherArmor];
    protected readonly resultingItem: number = FourCC('I00N');
}
