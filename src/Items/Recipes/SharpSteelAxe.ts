import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BasicItems/WarAxe';
import { ItemLabel } from '../ItemLabel';
import { IronSword } from '../BasicItems/IronSword';

const itemId: number = FourCC('I00Q');
const name: string = 'Sharp Steel Axe';
const labels: ItemLabel[] = [ItemLabel.STRENGTH, ItemLabel.ATTACK_DAMAGE];
const goldCost: number = 1340;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpTwo.blp';
const description: string = `A perfectly grinded axe.

|cffffcc00Strength:|r +7
|cffffcc00Attack damage:|r +10

|cFF808080Strength increases your max health and health regen.|r`;

export class SharpSteelAxe extends ItemRecipe {
    constructor(warAxe: WarAxe, ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [warAxe, ironSword]);
    }
}