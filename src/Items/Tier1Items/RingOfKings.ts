import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfCorruption } from '../BaseItems/OrbOfCorruption';

const itemId: number = FourCC('I055');
const name = 'Ring of Kings';
    const labels: ItemLabel[] = [ItemLabel.STRENGTH];
const goldCost = 1000;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNRingSkull.blp';
const description = `A royal ring fit for a king

|cffffcc00Strength:|r +10
|cffffcc00Unique:|r Decreases the armor of attacked units by 3
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 60 charges)
|cffffcc00Effect(2):|r Taking damage when below 40% of your maximum health while at 60 item charges resets all charges and applies Bloodlust to the wearer
|cffffcc00Attack speed (Bloodlust):|r +40%
|cffffcc00Movement speed (Bloodlust):|r +25%
|cffffcc00Duration (Bloodlust):|r 60

|cFF808080Strength increases your max health and health regen.|r`;

export class RingOfKings extends ItemRecipe {
    constructor(warAxe: WarAxe, orbOfCorruption: OrbOfCorruption) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, orbOfCorruption]);
    }
}
