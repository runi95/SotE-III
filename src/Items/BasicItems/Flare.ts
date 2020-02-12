import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01M');
const name: string = 'Flare';
const labels: ItemLabel[] = [];
const goldCost: number = 200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNFlare.blp';
const description: string = `A flare that lights up the area around you.

|cffffcc00Effect:|r Reveals invisible units

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class Flare extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
