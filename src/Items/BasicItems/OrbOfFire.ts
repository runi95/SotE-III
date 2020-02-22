import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I03G');
const name: string = 'Orb of Fire';
const labels: ItemLabel[] = [ItemLabel.SPLASH];
const goldCost: number = 600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfFire.blp';
const description: string = `The orb burns brightly.

|cffffcc00Splash:|r +10%

|cFF808080Splash determines how much of the original physical damage splashes to nearby units.|r`;

export class OrbOfFire extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
