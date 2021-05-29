import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { AmuletOfSpellReflection } from '../BaseItems/AmuletOfSpellReflection';
import { IronwoodBranch } from '../BaseItems/IronwoodBranch';
import { ReinforcedHide } from '../BaseItems/ReinforcedHide';

const itemId: number = FourCC('I03X');
const name = 'Skull Shield';
const labels: ItemLabel[] = [ItemLabel.THORNS, ItemLabel.REFLECT];
const goldCost = 1476;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNGrimWard.blp';
const description = `Can reflect anything back to attackers.

|cffffcc00Reflect:|r +14
|cffffcc00Thorns:|r +14
|cffffcc00Health regen:|r +14

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class SkullShield extends ItemRecipe {
    constructor(ironwoodBranch: IronwoodBranch, amuletOfSpellReflection: AmuletOfSpellReflection, reinforcedHide: ReinforcedHide) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironwoodBranch, amuletOfSpellReflection, reinforcedHide]);
    }
}
