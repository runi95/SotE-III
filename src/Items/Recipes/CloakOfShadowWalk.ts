import { ItemRecipe } from '../ItemRecipe';
import { ScrollOfAgility } from './ScrollOfAgility';
import { CloakOfShadows } from '../BasicItems/CloakOfShadows';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01J');
const name: string = 'Cloak of Shadow Walk';
const labels: ItemLabel[] = [];
const goldCost: number = 1050;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNAcolyteCloak.blp';
const description: string = `A cloak that lets you blend in with the shadows while moving.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.
|cffffcc00Effect (2):|r Turns the wearer invisible even while moving for a short duration.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class CloakOfShadowWalk extends ItemRecipe {
    constructor(cloakOfShadows: CloakOfShadows, scrollOfAgility: ScrollOfAgility) {
        super(itemId, name, labels, goldCost, iconPath, description, [cloakOfShadows, scrollOfAgility]);
    }
}
