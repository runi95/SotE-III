import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03G');
const name = 'Orb of Fire';
const labels: ItemLabel[] = [ItemLabel.SPLASH];
const goldCost = 600;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfFire.blp';
const description = `The orb burns brightly.

|cffffcc00Splash:|r +10%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class OrbOfFire extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
