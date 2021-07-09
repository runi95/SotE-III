import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { CrystalBall } from './CrystalBall';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';

const itemId: number = FourCC('I01G');
const name = 'Master Crystal Ball';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
const goldCost = 2250;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallMaster.blp';
const description = `Can you see the future in this thing?

|cffffcc00Intelligence:|r +12
|cffffcc00Max mana:|r +250
|cffffcc00Use:|r Reveals the area of the map that it is cast upon. Also reveals invisible units
|cffffcc00Mana cost:|r 0
|cffffcc00Range:|r 99999
|cffffcc00Area of effect:|r 1000
|cffffcc00Duration:|r 15
|cffffcc00Cooldown:|r 15

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class MasterCrystalBall extends ItemRecipe {
    constructor(crystalBall: CrystalBall, orbOfMagic: OrbOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [crystalBall, orbOfMagic]);
    }
}
