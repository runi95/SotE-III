import { ItemRecipe } from '../ItemRecipe';
import { CrystalBall } from '../BasicItems/CrystalBall';
import { SobiMask } from '../BasicItems/SobiMask';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01F');
const name: string = 'Adept Crystal Ball';
const labels: ItemLabel[] = [];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallAdept.blp';
const description: string = `Can you see the future in this thing?

|cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
|cffffcc00Area of Effect:|r 750
|cffffcc00Duration:|r 10
|cffffcc00Cooldown:|r 15

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class AdeptCrystalBall extends ItemRecipe {
    constructor(crystalBall: CrystalBall, sobiMask: SobiMask) {
        super(itemId, name, labels, goldCost, iconPath, description, [crystalBall, sobiMask]);
    }
}
