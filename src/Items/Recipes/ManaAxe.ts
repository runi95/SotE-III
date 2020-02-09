import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BasicItems/WarAxe';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class ManaAxe extends ItemRecipe {
    private readonly warAxe: WarAxe;
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00Q');
    public readonly name: string = 'Mana Axe';
    public readonly labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.MAX_MANA];
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpTwo.blp';
    public readonly description: string = `A war axe infused with magic.

|cffffcc00Strength:|r +5
|cffffcc00Max Mana:|r +60

|cFF808080Strength increases your max health and health regen.|r`;

    constructor(warAxe: WarAxe, emptyVial: EmptyVial) {
        super();

        this.warAxe = warAxe;
        this.emptyVial = emptyVial;
        this.recipe = [this.warAxe, this.emptyVial];
    }
}
