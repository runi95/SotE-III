import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { Flare } from '../BasicItems/Flare';
import { GoblinNightScope } from '../BasicItems/GoblinNightScope';

export class WandOfShadowsight extends ItemRecipe {
    private readonly goblinNightScope: GoblinNightScope;
    private readonly flare: Flare;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I020');
    public readonly name: string = 'Wand of Shadowsight';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNWandOfShadowSight.blp';
    public readonly description: string = `An incredible scope with built in night vision.

|cffffcc00Effect:|r Provides an increase to the Hero's line of sight radius at night when carried.
|cffffcc00Effect(2):|r Reveals invisible units
|cffffcc00Effect(3):|r Gives the player vision of a target unit until that unit is dispelled.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(goblinNightScope: GoblinNightScope, flare: Flare) {
        super();

        this.goblinNightScope = goblinNightScope;
        this.flare = flare;
        this.recipe = [this.goblinNightScope, this.flare];
    }
}
