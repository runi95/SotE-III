import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { BloodiedSacrificialDagger } from '../BasicItems/SacrificialDagger';
import { VampireClaws } from '../BasicItems/VampireClaws';
import { ItemLabel } from '../ItemLabel';

export class VampireDagger extends ItemRecipe {
    private readonly bloodiedSacrificialDagger: BloodiedSacrificialDagger;
    private readonly vampireClaws: VampireClaws;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02L');
    public readonly name: string = 'Vampire Dagger';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 2000;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSacrificialDagger.blp';
    public readonly description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Effect:|r Deals 1000 damage to target enemy unit and heals 666 hitpoints

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(bloodiedSacrificialDagger: BloodiedSacrificialDagger, vampireClaws: VampireClaws) {
        super();

        this.bloodiedSacrificialDagger = bloodiedSacrificialDagger;
        this.vampireClaws = vampireClaws;
        this.recipe = [this.bloodiedSacrificialDagger, this.vampireClaws];
    }
}
