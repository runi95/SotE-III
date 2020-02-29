import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02W');
const name: string = 'Juggernaut Armor';
const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost: number = 9834;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNArcaniteArchitecture.blp';
const description: string = `A massive and heavy armor used by the Infernal Juggernaut.

|cffffcc00Strength:|r +82

|cFF808080Strength increases your max health and health regen.|r`;

export class JuggernautArmor extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
