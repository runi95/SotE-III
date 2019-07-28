import { ItemRecipe } from '../ItemRecipe';

export class ManaAxe extends ItemRecipe {
    private readonly warAxe: number = FourCC('I00L');
    private readonly emptyVial: number = FourCC('I000');
    protected readonly recipe: number[] = [this.warAxe, this.emptyVial];
    protected readonly resultingItem: number = FourCC('I00Q');
}
