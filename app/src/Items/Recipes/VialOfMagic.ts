import { ItemRecipe } from '../ItemRecipe';
import { OrbOfMagic } from '../BasicItems/OrbOfMagic';
import { EmptyVial } from '../BasicItems/EmptyVial';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class VialOfMagic extends ItemRecipe {
    private readonly orbOfMagic: OrbOfMagic;
    private readonly emptyVial: EmptyVial;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I001');
    public readonly name: string = 'Vial of Magic';
    public readonly labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MAX_MANA];
    public readonly goldCost: number = 130;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialFull.blp';
    public readonly description: string = `An orb full of potencial magic if you know how to extract it.

|cffffcc00Intelligence:|r +5
|cffffcc00Max Mana:|r +60

|cFF808080Intelligence increases the damage done by your spells.|r`;

    constructor(orbOfMagic: OrbOfMagic, emptyVial: EmptyVial) {
        super();

        this.orbOfMagic = orbOfMagic;
        this.emptyVial = emptyVial;
        this.recipe = [this.orbOfMagic, this.emptyVial];
    }
}
