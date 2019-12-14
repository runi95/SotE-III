import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { CrystalBall } from '../BasicItems/CrystalBall';
import { SobiMask } from '../BasicItems/SobiMask';

export class AdeptCrystalBall extends ItemRecipe {
    private readonly crystalBall: CrystalBall;
    private readonly sobiMask: SobiMask;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01F');
    public readonly name: string = 'Adept Crystal Ball';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallAdept.blp';
    public readonly description: string = `Can you see the future in this thing?

|cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
|cffffcc00Area of Effect:|r 750
|cffffcc00Duration:|r 10
|cffffcc00Cooldown:|r 15

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(crystalBall: CrystalBall, sobiMask: SobiMask) {
        super();

        this.crystalBall = crystalBall;
        this.sobiMask = sobiMask;
        this.recipe = [this.crystalBall, this.sobiMask];
    }
}
