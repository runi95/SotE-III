import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AmuletOfSpellReflection } from '../BaseItems/AmuletOfSpellReflection';
import { IronwoodBranch } from '../BaseItems/IronwoodBranch';

const itemId: number = FourCC('I03X');
const name: string = 'Skull Shield';
const labels: ItemLabel[] = [ItemLabel.THORNS, ItemLabel.REFLECT];
const goldCost: number = 3875;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGrimWard.blp';
const description: string = `Can reflect anything back to attackers.

|cffffcc00Reflect:|r +25
|cffffcc00Thorns:|r +25

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class SkullShield extends ItemRecipe {
    constructor(ironwoodBranch: IronwoodBranch, amuletOfSpellReflection: AmuletOfSpellReflection) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironwoodBranch, amuletOfSpellReflection]);
    }
}
