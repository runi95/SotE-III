import { Item } from '../Item';
import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';

export class LoadedRifle extends ItemRecipe {
    private readonly ironSword: IronSword;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00W');
    public readonly name: string = 'Loaded Rifle';
    public readonly goldCost: number = 350;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpOne.blp';
    public readonly description: string = `The loaded rifle; an essential tool in warfare.

|cffffcc00Attack damage:|r +12

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

    constructor(ironSword: IronSword) {
        super();

        this.ironSword = ironSword;
        this.recipe = [this.ironSword];
    }
}
