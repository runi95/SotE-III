import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I006');
const name = 'Reinforced Hide';
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost = 360;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNReinforcedHides.blp';
const description = `A protective layer of regenerative hide.

|cffffcc00Health regen:|r +8

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;

export class ReinforcedHide extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
