import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { IronSword } from '../IronSword';
import { EmptyVial } from '../EmptyVial';

export class ManaBlade extends ItemRecipe {
    private readonly ironSword: IronSword;
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00K');
    public readonly name: string = 'Mana Blade';
    public readonly goldCost: number = 350;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNThoriumMelee.blp';
    public readonly description: string = `A steel sword coated in mana, capable of boosting your physical and magical abilities.

    |cffffcc00Attack damage:|r +7`;

    constructor(ironSword: IronSword, emptyVial: EmptyVial) {
        super();

        this.ironSword = ironSword;
        this.emptyVial = emptyVial;
        this.recipe = [this.ironSword, this.emptyVial];
    }
}
