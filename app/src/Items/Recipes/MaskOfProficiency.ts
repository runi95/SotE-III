import { ItemRecipe } from '../ItemRecipe';

export class MaskOfProficiency extends ItemRecipe {
    private readonly orbOfMagic: number = FourCC('I00I');
    private readonly sobiMask: number = FourCC('I00T');
    protected readonly recipe: number[] = [this.orbOfMagic, this.sobiMask];
    protected readonly resultingItem: number = FourCC('I026');
}
