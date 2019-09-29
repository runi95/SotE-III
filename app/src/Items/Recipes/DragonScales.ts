import { ItemRecipe } from '../ItemRecipe';

export class DragonScales extends ItemRecipe {
    private readonly dragonWhelpClaws: number = FourCC('I025');
    private readonly coralScales: number = FourCC('I00N');
    protected readonly recipe: number[] = [this.dragonWhelpClaws, this.coralScales];
    protected readonly resultingItem: number = FourCC('I02H');
}
