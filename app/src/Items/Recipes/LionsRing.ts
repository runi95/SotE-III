import { ItemRecipe } from '../ItemRecipe';
import { RunedBracers } from '../RunedBracers';
import { ImprovedMoonArmor } from './ImprovedMoonArmor';
import { Item } from '../Item';

export class LionsRing extends ItemRecipe {
    private readonly runedBracers: RunedBracers;
    private readonly improvedMoonArmor: ImprovedMoonArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01L');
    public readonly name: string = 'Lions Ring';
    public readonly goldCost: number = 1200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRingLionHead.blp';
    public readonly description: string = `Lion's ring is known to protect it's wearers from magic attacks.

|cffffcc00Resistance:|r +18
|cffffcc00Effect (1):|r Increases item charges whenever you take spell damage.
|cffffcc00Effect (2):|r Releases a chain lightning whenever you reach over 100 charges
|cffffcc00Chain Lightning Damage:|r 300
|cffffcc00Chain Lightning Max Bounce:|r 5

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;

    constructor(runedBracers: RunedBracers, improvedMoonArmor: ImprovedMoonArmor) {
        super();

        this.runedBracers = runedBracers;
        this.improvedMoonArmor = improvedMoonArmor;
        this.recipe = [this.runedBracers, this.improvedMoonArmor];
    }
}
