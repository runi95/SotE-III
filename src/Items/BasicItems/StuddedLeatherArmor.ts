import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I007');
const name: string = 'Studded Leather Armor';
const labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
const goldCost: number = 200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLeatherUpgradeOne.blp';
const description: string = `A weak leather armor.

|cffffcc00Max health:|r +50

|cFF808080Health determines how much damage you can take before dying.|r`;

export class StuddedLeatherArmor extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
