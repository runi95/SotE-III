import { ItemRecipe } from '../ItemRecipe';

export class AdvancedReinforcedHides extends ItemRecipe {
    private readonly improvedMoonArmor: number = FourCC('I00O');
    private readonly improvedBalancedShield: number = FourCC('I02B');
    private readonly reinforcedScales: number = FourCC('I01K');
    protected readonly isRecipeUniquesOnly: boolean = false;
    protected readonly recipe: number[] = [
        this.improvedMoonArmor,
        this.improvedMoonArmor,
        this.improvedBalancedShield,
        this.reinforcedScales,
    ];
    protected readonly resultingItem: number = FourCC('I02D');
}
