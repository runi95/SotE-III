import { ItemRecipe } from '../ItemRecipe';
import { CloakOfShadowWalk } from '../Tier1Items/CloakOfShadowWalk';
import { ItemLabel } from '../ItemLabel';
import { SkullShield } from '../Tier1Items/SkullShield';

const itemId: number = FourCC('I049');
const name: string = 'Quills';
const labels: ItemLabel[] = [ItemLabel.THORNS, ItemLabel.REFLECT];
const goldCost: number = 9300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNQuillSprayOff.blp';
const description: string = `You should not be touching these.

|cffffcc00Reflect:|r +60
|cffffcc00Thorns:|r +60

|cFF808080Thorns makes melee attackers take thorn damage when attacking.|r`;

export class Quills extends ItemRecipe {
    constructor(skullShield: SkullShield) {
        super(itemId, name, labels, goldCost, iconPath, description, [skullShield]);
    }
}
