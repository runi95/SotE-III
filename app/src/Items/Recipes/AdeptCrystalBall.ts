import { ItemRecipe } from '../ItemRecipe';

export class AdeptCrystalBall extends ItemRecipe {
    private readonly crystalBall: number = FourCC('I00V');
    private readonly sobiMask: number = FourCC('I00T');
    protected readonly recipe: number[] = [this.crystalBall, this.sobiMask];
    protected readonly resultingItem: number = FourCC('I01F');
}
