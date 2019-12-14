import { ItemRecipe } from '../ItemRecipe';
import { ScrollOfAgility } from './ScrollOfAgility';
import { Item } from '../Item';
import { CloakOfShadows } from '../BasicItems/CloakOfShadows';

export class CloakOfShadowWalk extends ItemRecipe {
    private readonly cloakOfShadows: CloakOfShadows;
    private readonly scrollOfAgility: ScrollOfAgility;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01J');
    public readonly name: string = 'Cloak of Shadow Walk';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAcolyteCloak.blp';
    public readonly description: string = `A cloak that lets you blend in with the shadows while moving.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.
|cffffcc00Effect (2):|r Turns the wearer invisible even while moving for a short duration.`;

    constructor(cloakOfShadows: CloakOfShadows, scrollOfAgility: ScrollOfAgility) {
        super();

        this.cloakOfShadows = cloakOfShadows;
        this.scrollOfAgility = scrollOfAgility;
        this.recipe = [this.cloakOfShadows, this.scrollOfAgility];
    }
}
