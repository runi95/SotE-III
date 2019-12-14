import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { SobiMask } from '../BasicItems/SobiMask';
import { Item } from '../Item';

export class MaskOfProficiency extends ItemRecipe {
    private readonly orbOfMagic: OrbOfMagic;
    private readonly sobiMask: SobiMask;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I026');
    public readonly name: string = 'Mask of Proficiency';
    public readonly goldCost: number = 130;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGuldanSkull.blp';
    public readonly description: string = `A mask that is said to be worn by a master necromancer.

|cffffcc00Intelligence:|r +5
|cffffcc00Mana regen:|r +30%

|cFF808080Intelligence increases the damage done by your spells.|r`;

    constructor(orbOfMagic: OrbOfMagic, sobiMask: SobiMask) {
        super();

        this.orbOfMagic = orbOfMagic;
        this.sobiMask = sobiMask;
        this.recipe = [this.orbOfMagic, this.sobiMask];
    }
}
