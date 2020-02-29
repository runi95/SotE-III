import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02I');
const name: string = 'Sacrificial Dagger';
const labels: ItemLabel[] = [];
const goldCost: number = 3000;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSacrifice.blp';
const description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Effect:|r Reaching 100 charges permanently upgrades this item
|cffffcc00Use:|r Increases item charges by 9 and then deals 100 damage to you
|cffffcc00Life Cost:|r 100
|cffffcc00Cooldown:|r 60

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class SacrificialDagger extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
