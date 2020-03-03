import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I033');
const name: string = 'Orb of Lightning';
const labels: ItemLabel[] = [];
const goldCost: number = 400;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfLightning.blp';
const description: string = `The orb seems to brew up a storm from within.

|cffffcc00Use:|r Slows the target enemy unit's movement speed by 20%
|cffffcc00Mana Cost:|r 45
|cffffcc00Range:|r 700
|cffffcc00Duration:|r 5
|cffffcc00Cooldown:|r 60

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class OrbOfLightning extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
