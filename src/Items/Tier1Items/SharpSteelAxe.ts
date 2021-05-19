import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BaseItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { IronSword } from '../BaseItems/IronSword';

const itemId: number = FourCC('I00Q');
const name = 'Sharp Steel Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost = 1345;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpTwo.blp';
const description = `A perfectly grinded axe.

|cffffcc00Strength:|r +12
|cffffcc00Attack damage:|r +25
|cffffcc00Effect(1):|r Increases item charges by 1 every second (max 60 charges)
|cffffcc00Effect(2):|r Taking physical damage when fully charges removes all charges and applies a lightning shield to the wearer that deals 35 damage per second to nearby units for 20 seconds

|cFF808080Strength increases your max health and health regen.|r`;

export class SharpSteelAxe extends ItemRecipe {
    constructor(warAxe: WarAxe, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, ironSword]);
    }
}
