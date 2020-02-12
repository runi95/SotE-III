import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I00V');
const name: string = 'Crystal Ball';
const labels: ItemLabel[] = [];
const goldCost: number = 150;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBall.blp';
const description: string = `Can you see the future in this thing?

 |cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
 |cffffcc00Area of Effect:|r 600
 |cffffcc00Duration:|r 8
 |cffffcc00Cooldown:|r 20

 |cFF808080Effects are special properties that usually trigger on an event.|r`;

export class CrystalBall extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
