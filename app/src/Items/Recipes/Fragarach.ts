import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { IronClaws } from './IronClaws';
import { ManaBlade } from './ManaBlade';

export class Fragarach extends ItemRecipe {
    private readonly manaBlade: ManaBlade;
    private readonly ironClaws: IronClaws;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I017');
    public readonly name: string = 'Fragarach';
    public readonly goldCost: number = 220;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAirBender.blp';
    public readonly description: string = `A sword so sharp it can cut whispers in half.

|cffffcc00Attack damage:|r +18
|cffffcc00Effect:|r Slows the movement speed of nearby enemy units by 20%

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(manaBlade: ManaBlade, ironClaws: IronClaws) {
        super();

        this.manaBlade = manaBlade;
        this.ironClaws = ironClaws;
        this.recipe = [this.manaBlade, this.ironClaws];
    }
}
