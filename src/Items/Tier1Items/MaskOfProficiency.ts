import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';
import { SobiMask } from '../BaseItems/SobiMask';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I026');
const name: string = 'Mask of Proficiency';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MANA_REGEN];
const goldCost: number = 915;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkull.blp';
const description: string = `A mask that is said to be worn by a master necromancer.

|cffffcc00Intelligence:|r +6
|cffffcc00Mana regen:|r +7

|cFF808080Intelligence increases the damage done by your spells.|r`;

export class MaskOfProficiency extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, sobiMask: SobiMask) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, sobiMask]);
    }
}
