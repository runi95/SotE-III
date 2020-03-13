import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfFire } from '../BaseItems/OrbOfFire';

const itemId: number = FourCC('I00X');
const name: string = 'Loaded Cannon';
const labels: ItemLabel[] = [ItemLabel.SPLASH];
const goldCost: number = 3200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpTwo.blp';
const description: string = `Make your enemies tremble!

|cffffcc00Splash:|r +80%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class LoadedCannon extends ItemRecipe {
    constructor(orbOfFire: OrbOfFire) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfFire]);
    }
}
