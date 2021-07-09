import { ItemRecipe } from '../ItemRecipe';
import { Scepter } from '../BaseItems/Scepter';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I013');
const name = 'Caduceus';
const labels: ItemLabel[] = [];
const goldCost = 1600;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNEntrapmentWard.blp';
const description = `An ancient staff forged by the elves.

|cffffcc00Use:|r Turns the target into a harmless critter for a short duration
|cffffcc00Mana cost:|r 300
|cffffcc00Range:|r 800
|cffffcc00Duration (hero):|r 6
|cffffcc00Duration (creep):|r 12
|cffffcc00Cooldown:|r 120

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class CircesStaff extends ItemRecipe {
    constructor(scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [scepter]);
    }
}
