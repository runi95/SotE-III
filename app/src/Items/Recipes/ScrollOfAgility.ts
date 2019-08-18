import { ItemRecipe } from '../ItemRecipe';

export class ScrollOfAgility extends ItemRecipe {
    private readonly agileSlippers: number = FourCC('I01D');
    private readonly speedPotion: number = FourCC('I00F');
    protected readonly recipe: number[] = [this.agileSlippers, this.speedPotion];
    protected readonly resultingItem: number = FourCC('I01H');
}
