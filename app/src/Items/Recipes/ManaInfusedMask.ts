import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { MaskOfProficiency } from './MaskOfProficiency';
import { VialOfMagic } from './VialOfMagic';

export class ManaInfusedMask extends ItemRecipe {
    private readonly maskOfProficiency: MaskOfProficiency;
    private readonly vialOfMagic: VialOfMagic;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I029');
    public readonly name: string = 'Mana Infused Mask';
    public readonly goldCost: number = 320;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkullBlue.blp';
    public readonly description: string = `A mask infused with pure magic.

|cffffcc00Intelligence:|r +12
|cffffcc00Max Mana:|r +100
|cffffcc00Mana regen:|r +30%

|cFF808080Mana is required when casting most spells.|r`;

    constructor(maskOfProficiency: MaskOfProficiency, vialOfMagic: VialOfMagic) {
        super();

        this.maskOfProficiency = maskOfProficiency;
        this.vialOfMagic = vialOfMagic;
        this.recipe = [this.maskOfProficiency, this.vialOfMagic];
    }
}
