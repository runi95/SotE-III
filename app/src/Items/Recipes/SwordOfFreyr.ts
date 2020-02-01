import { ItemRecipe } from '../ItemRecipe';
import { ManaBlade } from './ManaBlade';
import { ManaAxe } from './ManaAxe';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class SwordOfFreyr extends ItemRecipe {
    private readonly manaBlade: ManaBlade;
    private readonly manaAxe: ManaAxe;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I018');
    public readonly name: string = 'Sword of Freyr';
    public readonly labels: ItemLabel[] = [ItemLabel.STRENGTH];
    public readonly goldCost: number = 130;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRitualDagger.blp';
    public readonly description: string = `A sword that somehow dances in front of your very eyes.

|cffffcc00Strength:|r +7
|cffffcc00Effect:|r Summons a sword that fights by your side

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(manaBlade: ManaBlade, manaAxe: ManaAxe) {
        super();

        this.manaBlade = manaBlade;
        this.manaAxe = manaAxe;
        this.recipe = [this.manaBlade, this.manaAxe];
    }
}
