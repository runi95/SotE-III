import { ItemRecipe } from '../ItemRecipe';
import { MaskOfProficiency } from './MaskOfProficiency';
import { VialOfMagic } from './VialOfMagic';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I029');
const name: string = 'Mana Infused Mask';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA, ItemLabel.MANA_REGEN];
const goldCost: number = 1680;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkullBlue.blp';
const description: string = `A mask infused with pure magic.

|cffffcc00Intelligence:|r +12
|cffffcc00Max Mana:|r +100
|cffffcc00Mana regen:|r +30%

|cFF808080Mana is required when casting most spells.|r`;

export class ManaInfusedMask extends ItemRecipe {
    constructor(maskOfProficiency: MaskOfProficiency, vialOfMagic: VialOfMagic) {
        super(itemId, name, labels, goldCost, iconPath, description, [maskOfProficiency, vialOfMagic]);
    }
}
