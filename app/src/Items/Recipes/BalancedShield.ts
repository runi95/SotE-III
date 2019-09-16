import { ItemRecipe } from '../ItemRecipe';

export class BalancedShield extends ItemRecipe {
    private readonly moonArmor: number = FourCC('I008');
    private readonly ironShield: number = FourCC('I005');
    protected readonly recipe: number[] = [this.moonArmor, this.ironShield];
    protected readonly resultingItem: number = FourCC('I028');
}
