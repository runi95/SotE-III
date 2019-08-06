import { ItemRecipe } from '../ItemRecipe';

export class Ancile extends ItemRecipe {
    private readonly manaEgg: number = FourCC('I015');
    private readonly ironShield: number = FourCC('I005');
    protected readonly recipe: number[] = [this.manaEgg, this.ironShield];
    protected readonly resultingItem: number = FourCC('I016');
}
