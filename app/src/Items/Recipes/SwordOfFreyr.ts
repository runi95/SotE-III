import { ItemRecipe } from '../ItemRecipe';

export class SwordOfFreyr extends ItemRecipe {
    private readonly manaBlade: number = FourCC('I00K');
    private readonly manaAxe: number = FourCC('I00Q');
    protected readonly recipe: number[] = [this.manaBlade, this.manaAxe];
    protected readonly resultingItem: number = FourCC('I018');
}
