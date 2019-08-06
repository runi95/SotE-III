import { ItemRecipe } from '../ItemRecipe';

export class Fragarach extends ItemRecipe {
    private readonly manaBlade: number = FourCC('I00K');
    private readonly ironClaws: number = FourCC('I00P');
    protected readonly recipe: number[] = [this.manaBlade, this.ironClaws];
    protected readonly resultingItem: number = FourCC('I017');
}
