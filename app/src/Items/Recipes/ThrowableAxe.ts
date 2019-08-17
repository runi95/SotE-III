import { ItemRecipe } from '../ItemRecipe';

export class ThrowableAxe extends ItemRecipe {
    private readonly bloodiedExecutionersAxe: number = FourCC('I00Z');
    private readonly scepter: number = FourCC('I010');
    protected readonly recipe: number[] = [this.bloodiedExecutionersAxe, this.scepter];
    protected readonly resultingItem: number = FourCC('I01E');
}
