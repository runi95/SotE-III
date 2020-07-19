import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I00W');
const name: string = 'Loaded Rifle';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 2250;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpOne.blp';
const description: string = `The loaded rifle; an essential tool in warfare.

|cffffcc00Attack damage:|r +45

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class LoadedRifle extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
