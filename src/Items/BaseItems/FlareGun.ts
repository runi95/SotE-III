import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01M');
const name: string = 'Flare';
const labels: ItemLabel[] = [];
const goldCost: number = 200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNFlare.blp';
const description: string = `A flare that lights up the area around you.

|cffffcc00Use:|r Reveals the target area
|cffffcc00Mana Cost:|r 0
|cffffcc00Range:|r 99999
|cffffcc00Area of Effect:|r 1800
|cffffcc00Duration:|r 45
|cffffcc00Cooldown:|r 180

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class FlareGun extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
