import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../IronSword';
import { Claws } from '../Claws';
import { Item } from '../Item';

export class IronClaws extends ItemRecipe {
    private readonly ironSword: IronSword;
    private readonly claws: Claws;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00P');
    public readonly name: string = 'Iron Claws';
    public readonly goldCost: number = 550;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNClawsOfAttack.blp';
    public readonly description: string = `Sharp claws combined with speed and precision is a deadly combination.

|cffffcc00Agility:|r +5
|cffffcc00Attack damage:|r +7`;

    constructor(ironSword: IronSword, claws: Claws) {
        super();

        this.ironSword = ironSword;
        this.claws = claws;
        this.recipe = [this.ironSword, this.claws];
    }
}
