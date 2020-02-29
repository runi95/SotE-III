import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfFire } from '../BaseItems/OrbOfFire';

const itemId: number = FourCC('I00X');
const name: string = 'Loaded Cannon';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.SPLASH];
const goldCost: number = 1600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpTwo.blp';
const description: string = `Make your enemies tremble!

|cffffcc00Attack damage:|r +20
|cffffcc00Effect:|r Your physical attacks now deal 10% of the initial damage as splash damage in an area of 200 around the target.

|cFF808080Agility increases your attack and movement speed.|r`;

export class LoadedCannon extends ItemRecipe {
    constructor(orbOfFire: OrbOfFire) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfFire]);
    }
}
