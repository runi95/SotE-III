import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { SkullShield } from '../Tier1Items/SkullShield';

const itemId: number = FourCC('I049');
const name = 'Quills';
const labels: ItemLabel[] = [ItemLabel.THORNS, ItemLabel.REFLECT];
const goldCost = 9300;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNQuillSprayOff.blp';
const description = `You should not be touching these.

|cffffcc00Reflect:|r +60
|cffffcc00Thorns:|r +60

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class Quills extends ItemRecipe {
    constructor(skullShield: SkullShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [skullShield]);
    }
}
