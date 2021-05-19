import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02O');
const name = `Assassin's Map`;
const labels: ItemLabel[] = [];
const goldCost = 1000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNSpy.blp';
const description = `A map that reveals the location of what you're hunting.

|cffffcc00Passive:|r Reveals all enemy controlled units

|cFF808080Passives are effects that are always active.|r`;

export class AssassinsMap extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
