import { ItemRecipe } from '../ItemRecipe';

export class CreatureClaws extends ItemRecipe {
    private readonly claws: number = FourCC('I00M');
    private readonly studdedLeatherArmor: number = FourCC('I007');
    protected readonly recipe: number[] = [this.claws, this.studdedLeatherArmor];
    protected readonly resultingItem: number = FourCC('I024');
}
