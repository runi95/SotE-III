import { ItemRecipe } from '../ItemRecipe';

export class Soulcage extends ItemRecipe {
    private readonly emptySoulcage: number = FourCC('I009');
    private readonly greenSoulstone: number = FourCC('I00A');
    private readonly blueSoulstone: number = FourCC('I00B');
    private readonly purpleSoulstone: number = FourCC('I00C');
    protected readonly recipe: number[] = [this.emptySoulcage, this.greenSoulstone, this.blueSoulstone, this.purpleSoulstone];
    protected readonly resultingItem: number = FourCC('I011');
}
