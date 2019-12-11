import { ItemRecipe } from '../ItemRecipe';
import { StuddedLeatherArmor } from '../StuddedLeatherArmor';
import { Item } from '../Item';
import { Claws } from '../Claws';

export class CreatureClaws extends ItemRecipe {
    private readonly claws: Claws;
    private readonly studdedLeatherArmor: StuddedLeatherArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I024');
    public readonly name: string = 'Creature Claws';
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCreatureAttack.blp';
    public readonly description: string = `Some very large claws.

|cffffcc00Agility:|r +5
|cffffcc00Max health:|r +60

|cFF808080Agility increases your attack and movement speed.|r`;

    constructor(claws: Claws, studdedLeatherArmor: StuddedLeatherArmor) {
        super();

        this.claws = claws;
        this.studdedLeatherArmor = studdedLeatherArmor;
        this.recipe = [this.claws, this.studdedLeatherArmor];
    }
}
