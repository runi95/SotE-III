import { ItemRecipe } from '../ItemRecipe';
import { ManaBlade } from './ManaBlade';
import { ManaAxe } from './ManaAxe';
import { Item } from '../Item';

export class SwordOfFreyr extends ItemRecipe {
    private readonly manaBlade: ManaBlade;
    private readonly manaAxe: ManaAxe;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I018');
    public readonly name: string = 'Sword of Freyr';
    public readonly goldCost: number = 950;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRitualDagger.blp';
    public readonly description: string = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +7
|cffffcc00Effect:|r Summons a sword that fights by your side`;

    constructor(manaBlade: ManaBlade, manaAxe: ManaAxe) {
        super();

        this.manaBlade = manaBlade;
        this.manaAxe = manaAxe;
        this.recipe = [this.manaBlade, this.manaAxe];
    }
}
