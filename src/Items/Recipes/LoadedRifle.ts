import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00W');
const name: string = 'Loaded Rifle';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpOne.blp';
const description: string = `The loaded rifle; an essential tool in warfare.

|cffffcc00Attack damage:|r +12

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class LoadedRifle extends ItemRecipe {
    constructor(ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironSword]);
    }
}
