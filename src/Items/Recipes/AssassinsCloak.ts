import { ItemRecipe } from '../ItemRecipe';
import { AssassinsBlade } from './AssassinsBlade';
import { CloakOfShadowWalk } from './CloakOfShadowWalk';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
const itemId: number = FourCC('I02N');
const name: string = `Assassin's Cloak`;
const labels: ItemLabel[] = [];
const goldCost: number = 2300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMetamorphosis.blp';
const description: string = `A cloak that lets you blend in with the shadows while moving.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.
|cffffcc00Effect (2):|r Turns the wearer invisible even while moving for a short duration, the user deals 1000 bonus damage if breaking the invisibility by attacking.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class AssassinsCloak extends ItemRecipe {
    constructor(assassinsBlade: AssassinsBlade, cloakOfShadowWalk: CloakOfShadowWalk) {
        super(itemId, name, labels, goldCost, iconPath, description, [assassinsBlade, cloakOfShadowWalk]);
    }
}
