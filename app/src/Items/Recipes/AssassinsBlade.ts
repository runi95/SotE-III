import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { IronSword } from '../BasicItems/IronSword';

export class AssassinsBlade extends ItemRecipe {
    private readonly ironSword: IronSword;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02M');
    public readonly name: string = `Assassin's Blade`;
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDaggerOfEscape.blp';
    public readonly description: string = `The assassin's preferred weapon of choice.

|cffffcc00Effect:|r Your first attack every 30 seconds deals 450 bonus damage.
    
|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(ironSword: IronSword) {
        super();

        this.ironSword = ironSword;
        this.recipe = [this.ironSword];
    }
}
