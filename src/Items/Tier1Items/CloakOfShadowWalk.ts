import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BaseItems/BootsOfSpeed';
import { CloakOfShadows } from '../BaseItems/CloakOfShadows';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01J');
const name = 'Cloak of Shadow Walk';
const labels: ItemLabel[] = [];
const goldCost = 930;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNAcolyteCloak.blp';
const description = `A cloak that lets you blend in with the shadows while moving.

|cffffcc00Movement speed:|r +80
|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still
|cffffcc00Use:|r Turns the wearer invisible even while moving for a short duration
|cffffcc00Mana cost:|r 75
|cffffcc00Duration:|r 5
|cffffcc00Cooldown:|r 60

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class CloakOfShadowWalk extends ItemRecipe {
    constructor(cloakOfShadows: CloakOfShadows, bootsOfSpeed: BootsOfSpeed) {
        super(itemId, name, labels, goldCost, iconPath, description, [cloakOfShadows, bootsOfSpeed]);
    }
}
