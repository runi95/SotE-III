import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I007');
const name = 'Studded Leather Armor';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost = 200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNLeatherUpgradeOne.blp';
const description = `A weak leather armor.

|cffffcc00Max health:|r +80

|cFF808080Health determines how much damage you can take before dying.|r`;

export class StuddedLeatherArmor extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
