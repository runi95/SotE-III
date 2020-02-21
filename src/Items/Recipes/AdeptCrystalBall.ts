import { ItemRecipe } from '../ItemRecipe';
import { CrystalBall } from '../BasicItems/CrystalBall';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01F');
const name: string = 'Adept Crystal Ball';
const labels: ItemLabel[] = [];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBallAdept.blp';
const description: string = `Can you see the future in this thing?

|cffffcc00Use:|r Reveals the area of the map that it is cast upon
|cffffcc00Mana Cost:|r 0
|cffffcc00Range:|r 99999
|cffffcc00Area of Effect:|r 750
|cffffcc00Duration:|r 10
|cffffcc00Cooldown:|r 15

|cFF808080Use is an effects that occurs when an item is used by clicking on it.|r`;

export class AdeptCrystalBall extends ItemRecipe {
    constructor(crystalBall: CrystalBall) {
        super(itemId, name, labels, goldCost, iconPath, description, [crystalBall]);
    }
}
