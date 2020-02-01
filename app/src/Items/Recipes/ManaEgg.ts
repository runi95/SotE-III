import { Item } from '../Item';
import { ItemRecipe } from '../ItemRecipe';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { ItemLabel } from '../ItemLabel';

export class ManaEgg extends ItemRecipe {
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I015');
    public readonly name: string = 'Mana Egg';
    public readonly labels: ItemLabel[] = [ItemLabel.MAX_MANA];
    public readonly goldCost: number = 900;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNManaStone.blp';
    public readonly description: string = `An egg surging with magical energy.

|cffffcc00Max Mana:|r +350

|cFF808080Mana is required when casting most spells.|r`;

    constructor(emptyVial: EmptyVial) {
        super();

        this.emptyVial = emptyVial;
        this.recipe = [this.emptyVial];
    }
}
