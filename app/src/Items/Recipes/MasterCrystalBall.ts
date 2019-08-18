import { ItemRecipe } from '../ItemRecipe';

export class MasterCrystalBall extends ItemRecipe {
    private readonly adeptCrystalBall: number = FourCC('I01F');
    private readonly vialOfMagic: number = FourCC('I001');
    protected readonly recipe: number[] = [this.adeptCrystalBall, this.vialOfMagic];
    protected readonly resultingItem: number = FourCC('I01G');
}
