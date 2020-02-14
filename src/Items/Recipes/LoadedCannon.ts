import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';
import { LoadedRifle } from './LoadedRifle';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00X');
const name: string = 'Loaded Cannon';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 1400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpTwo.blp';
const description: string = `Make your enemies tremble!

|cffffcc00Attack damage:|r +20
|cffffcc00Effect:|r Your physical attacks now deal 10% of the initial damage as splash damage in an area of 200 around the target.

|cFF808080Agility increases your attack and movement speed.|r`;

export class LoadedCannon extends ItemRecipe {
    constructor(loadedRifle: LoadedRifle, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [loadedRifle, ironSword]);
    }
}
