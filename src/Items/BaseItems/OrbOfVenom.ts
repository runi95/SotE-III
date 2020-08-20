import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I04Q');
const name: string = 'Orb of Venom';
const labels: ItemLabel[] = [ItemLabel.VENOM];
const goldCost: number = 540;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfVenom.blp';
const description: string = `An orb filled with a deadly poison.

|cffffcc00Venom:|r +9

|cFF808080Venom causes attacks to apply stacking poison damage.|r`;

export class OrbOfVenom extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
