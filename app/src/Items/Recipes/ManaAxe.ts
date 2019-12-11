import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../WarAxe';
import { EmptyVial } from '../EmptyVial';
import { Item } from '../Item';

export class ManaAxe extends ItemRecipe {
    private readonly warAxe: WarAxe;
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00Q');
    public readonly name: string = 'Mana Axe';
    public readonly goldCost: number = 600;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpTwo.blp';
    public readonly description: string = `A war axe infused with magic.

|cffffcc00Strength:|r +5
|cffffcc00Max Mana:|r +60`;

    constructor(warAxe: WarAxe, emptyVial: EmptyVial) {
        super();

        this.warAxe = warAxe;
        this.emptyVial = emptyVial;
        this.recipe = [this.warAxe, this.emptyVial];
    }
}
