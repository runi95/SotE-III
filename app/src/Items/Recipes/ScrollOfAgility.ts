import { ItemRecipe } from '../ItemRecipe';
import { AgileSlippers } from './AgileSlippers';
import { Item } from '../Item';

export class ScrollOfAgility extends ItemRecipe {
    private readonly agileSlippers: AgileSlippers;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01H');
    public readonly name: string = 'Scroll of Agility';
    public readonly goldCost: number = 250;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNScrollOfHaste.blp';
    public readonly description: string = `A mystical scroll written in an ancient language.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Increases movement speed by 50% for 60 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(agileSlippers: AgileSlippers) {
        super();

        this.agileSlippers = agileSlippers;
        this.recipe = [this.agileSlippers];
    }
}
