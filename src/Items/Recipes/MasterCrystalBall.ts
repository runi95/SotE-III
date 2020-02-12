import { ItemRecipe } from '../ItemRecipe';
import { AdeptCrystalBall } from './AdeptCrystalBall';
import { VialOfMagic } from './VialOfMagic';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01G');
const name: string = 'Master Crystal Ball';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost: number = 1200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallMaster.blp';
const description: string = `Can you see the future in this thing?

|cffffcc00Intelligence:|r +6
|cffffcc00Max Mana:|r +100
|cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
|cffffcc00Area of Effect:|r 1000
|cffffcc00Duration:|r 15
|cffffcc00Cooldown:|r 15

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class MasterCrystalBall extends ItemRecipe {
    constructor(adeptCrystalBall: AdeptCrystalBall, vialOfMagic: VialOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [adeptCrystalBall, vialOfMagic]);
    }
}
