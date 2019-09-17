import { ItemRecipe } from '../ItemRecipe';

export class ManaInfusedMask extends ItemRecipe {
    private readonly maskOfProficiency: number = FourCC('I026');
    private readonly vialOfMagic: number = FourCC('I001');
    protected readonly recipe: number[] = [this.maskOfProficiency, this.vialOfMagic];
    protected readonly resultingItem: number = FourCC('I029');
}
