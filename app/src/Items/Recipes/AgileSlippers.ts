import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BasicItems/BootsOfSpeed';
import { Item } from '../Item';

export class AgileSlippers extends ItemRecipe {
    private readonly bootsOfSpeed: BootsOfSpeed;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01D');
    public readonly name: string = 'Agile Slippers';
    public readonly goldCost: number = 300;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSlippersOfAgility.blp';
    public readonly description: string = `The most comfortable slippers you'll ever wear.

|cffffcc00Movement Speed:|r +200

|cFF808080Movement speed determines how fast you're able to move.|r`;

    constructor(bootsOfSpeed: BootsOfSpeed) {
        super();

        this.bootsOfSpeed = bootsOfSpeed;
        this.recipe = [this.bootsOfSpeed, this.bootsOfSpeed];
    }
}
