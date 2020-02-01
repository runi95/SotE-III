import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { AssassinsBlade } from './AssassinsBlade';
import { CloakOfShadowWalk } from './CloakOfShadowWalk';
import { ItemLabel } from '../ItemLabel';

export class AssassinsCloak extends ItemRecipe {
    private readonly assassinsBlade: AssassinsBlade;
    private readonly cloakOfShadowWalk: CloakOfShadowWalk;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02N');
    public readonly name: string = `Assassin's Cloak`;
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMetamorphosis.blp';
    // tslint:disable: max-line-length
    public readonly description: string = `A cloak that lets you blend in with the shadows while moving.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.
|cffffcc00Effect (2):|r Turns the wearer invisible even while moving for a short duration, the user deals 1000 bonus damage if breaking the invisibility by attacking.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
    // tslint:enable: max-line-length

    constructor(assassinsBlade: AssassinsBlade, cloakOfShadowWalk: CloakOfShadowWalk) {
        super();

        this.assassinsBlade = assassinsBlade;
        this.cloakOfShadowWalk = cloakOfShadowWalk;
        this.recipe = [this.assassinsBlade, this.cloakOfShadowWalk];
    }
}
