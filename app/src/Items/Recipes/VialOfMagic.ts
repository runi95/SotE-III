import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../OrbOfMagic';
import { EmptyVial } from '../EmptyVial';
import { Item } from '../Item';

export class VialOfMagic extends ItemRecipe {
    private readonly orbOfMagic: OrbOfMagic;
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I001');
    public readonly name: string = 'Vial of Magic';
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialFull.blp';
    public readonly description: string = `An orb full of potencial magic if you know how to extract it.

|cffffcc00Intelligence:|r +5
|cffffcc00Max Mana:|r +60`;

    constructor(orbOfMagic: OrbOfMagic, emptyVial: EmptyVial) {
        super();

        this.orbOfMagic = orbOfMagic;
        this.emptyVial = emptyVial;
        this.recipe = [this.orbOfMagic, this.emptyVial];
    }
}
