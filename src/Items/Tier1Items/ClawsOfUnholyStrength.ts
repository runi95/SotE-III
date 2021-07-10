import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { Claws } from '../BaseItems/Claws';

// Did not give this item any bonus effects because it's too cheap
const itemId: number = FourCC('I05I');
const name = 'Claws of Unholy Strength';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 900;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedUnholyStrength.blp';
const description = `These claws seem to hold some sort of unholy power within them.

|cffffcc00Agility:|r +20
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 120 charges)
|cffffcc00Effect (2):|r Taking lethal damage while at 120 charges sets item charges back to 1 and prevents you from dying for the next 5 seconds

|cFF808080Agility increases your attack and movement speed.|r`;

export class ClawsOfUnholyStrength extends ItemRecipe {
    constructor(claws: Claws) {
        super(itemId, name, labels, goldCost, iconPath, description, [claws]);
    }
}
