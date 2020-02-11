import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BasicItems/IronShield';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';
import { StuddedLeatherArmor } from '../BasicItems/StuddedLeatherArmor';

export class Ancile extends ItemRecipe {
    private readonly studdedLeatherArmor: StuddedLeatherArmor;
    private readonly ironShield: IronShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I016');
    public readonly name: string = 'Ancile';
    public readonly labels: ItemLabel[] = [ItemLabel.MAX_HEALTH, ItemLabel.BLOCK];
    public readonly goldCost: number = 1136;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGrimWard.blp';
    public readonly description: string = `A shield worn by the great mage Ancile.

|cffffcc00Max health:|r +250
|cffffcc00Block:|r +8

|cFF808080Health determines how much damage you can take before dying.|r`;

    constructor(studdedLeatherArmor: StuddedLeatherArmor, ironShield: IronShield) {
        super();

        this.studdedLeatherArmor = studdedLeatherArmor;
        this.ironShield = ironShield;
        this.recipe = [this.studdedLeatherArmor, this.ironShield];
    }
}
