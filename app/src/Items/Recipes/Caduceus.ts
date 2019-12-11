import { ItemRecipe } from '../ItemRecipe';
import { Branch } from '../Branch';
import { StuddedLeatherArmor } from '../StuddedLeatherArmor';
import { Item } from '../Item';

export class Caduceus extends ItemRecipe {
    private readonly branch: Branch;
    private readonly studdedLeatherArmor: StuddedLeatherArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I019');
    public readonly name: string = 'Caduceus';
    public readonly goldCost: number = 1200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNWandOfManaSteal.blp';
    public readonly description: string = `Caduceus the protector of merchants and travellers.

|cffffcc00Max health:|r +400
|cffffcc00Effect:|r Teleport to the Arcane Vault

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(branch: Branch, studdedLeatherArmor: StuddedLeatherArmor) {
        super();

        this.branch = branch;
        this.studdedLeatherArmor = studdedLeatherArmor;
        this.recipe = [this.branch, this.studdedLeatherArmor];
    }
}
