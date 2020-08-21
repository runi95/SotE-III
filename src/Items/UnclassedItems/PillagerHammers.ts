import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I050');
const name: string = 'Pillager Hammers';
const labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPillage.blp';
const description: string = `The perfect tool for pillaging entire citites.

|cffffcc00Attack damage:|r +15
|cffffcc00Passive:|r Increases attack speed by 33%

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;

export class PillagerHammers extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
