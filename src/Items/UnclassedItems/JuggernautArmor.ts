import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02W');
const name = 'Juggernaut Armor';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 9834;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNArcaniteArchitecture.blp';
const description = `A massive and heavy armor used by the Infernal Juggernaut.

|cffffcc00Strength:|r +82

|cFF808080Strength increases your max health and health regen.|r`;

export class JuggernautArmor extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
