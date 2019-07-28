import { ItemRecipe } from '../ItemRecipe';

export class VialOfMagic extends ItemRecipe {
    private readonly orbOfMagic: number = FourCC('I00I');
    private readonly emptyVial: number = FourCC('I000');
    protected readonly recipe: number[] = [this.orbOfMagic, this.emptyVial];
    protected readonly resultingItem: number = FourCC('I001');
}
