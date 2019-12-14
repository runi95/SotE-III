import { ItemRecipe } from '../ItemRecipe';
import { AdeptCrystalBall } from './AdeptCrystalBall';
import { VialOfMagic } from './VialOfMagic';
import { Item } from '../Item';

export class MasterCrystalBall extends ItemRecipe {
    private readonly adeptCrystalBall: AdeptCrystalBall;
    private readonly vialOfMagic: VialOfMagic;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01G');
    public readonly name: string = 'Master Crystal Ball';
    public readonly goldCost: number = 120;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallMaster.blp';
    public readonly description: string = `Can you see the future in this thing?

|cffffcc00Intelligence:|r +6
|cffffcc00Max Mana:|r +100
|cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
|cffffcc00Area of Effect:|r 1000
|cffffcc00Duration:|r 15
|cffffcc00Cooldown:|r 15

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(adeptCrystalBall: AdeptCrystalBall, vialOfMagic: VialOfMagic) {
        super();

        this.adeptCrystalBall = adeptCrystalBall;
        this.vialOfMagic = vialOfMagic;
        this.recipe = [this.adeptCrystalBall, this.vialOfMagic];
    }
}
