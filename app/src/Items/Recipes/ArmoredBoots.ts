import { ItemRecipe } from '../ItemRecipe';

export class ArmoredBoots extends ItemRecipe {
    private readonly bootsOfSpeed: number = FourCC('I00R');
    private readonly steelShield: number = FourCC('I00J');
    protected readonly recipe: number[] = [this.bootsOfSpeed, this.steelShield];
    protected readonly resultingItem: number = FourCC('I01C');
}
