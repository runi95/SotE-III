import { ItemRecipe } from '../ItemRecipe';
import { CreatureClaws } from './CreatureClaws';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class DragonWhelpClaws extends ItemRecipe {
    private readonly creatureClaws: CreatureClaws;
    protected readonly isRecipeUniquesOnly: boolean = false;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I025');
    public readonly name: string = 'Dragon Whelp Claws';
    public readonly labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.MAX_HEALTH];
    public readonly goldCost: number = 300;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedCreatureAttack.tga';
    public readonly description: string = `Do you really think these came from a dragon?

|cffffcc00Agility:|r +12
|cffffcc00Max health:|r +150

|cFF808080Agility increases your attack and movement speed.|r`;

    constructor(creatureClaws: CreatureClaws) {
        super();

        this.creatureClaws = creatureClaws;
        this.recipe = [this.creatureClaws, this.creatureClaws];
    }
}
