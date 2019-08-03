import { ItemRecipe } from '../ItemRecipe';

export class TheAegis extends ItemRecipe {
    private readonly steelShield: number = FourCC('I00J');
    private readonly scepter: number = FourCC('I010');
    protected readonly recipe: number[] = [this.steelShield, this.scepter];
    protected readonly resultingItem: number = FourCC('I014');
}
