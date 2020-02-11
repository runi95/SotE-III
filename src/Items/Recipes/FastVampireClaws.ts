import { Item } from '../Item';
import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { Claws } from '../BasicItems/Claws';
import { VampireClaws } from '../BasicItems/VampireClaws';

export class FastVampireClaws extends ItemRecipe {
    private readonly claws: Claws;
    private readonly vampireClaws: VampireClaws;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I032');
    public readonly name: string = 'Fast Vampire Claws';
    public readonly labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.LIFESTEAL];
    public readonly goldCost: number = 1142;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedUnholyStrength.blp';
    public readonly description: string = `Lightweight vampire claws for faster attack speed.

|cffffcc00Agility:|r +15
|cffffcc00Lifesteal:|r +20%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;

    constructor(claws: Claws, vampireClaws: VampireClaws) {
        super();

        this.claws = claws;
        this.vampireClaws = vampireClaws;
        this.recipe = [this.claws, this.vampireClaws];
    }
}
