import { ItemRecipe } from '../ItemRecipe';
import { Flare } from '../BasicItems/Flare';
import { GoblinNightScope } from '../BasicItems/GoblinNightScope';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I020');
const name: string = 'Wand of Shadowsight';
const labels: ItemLabel[] = [];
const goldCost: number = 200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNWandOfShadowSight.blp';
const description: string = `An incredible scope with built in night vision.

|cffffcc00Effect:|r Provides an increase to the Hero's line of sight radius at night when carried.
|cffffcc00Effect(2):|r Reveals invisible units
|cffffcc00Effect(3):|r Gives the player vision of a target unit until that unit is dispelled.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class WandOfShadowsight extends ItemRecipe {
    constructor(goblinNightScope: GoblinNightScope, flare: Flare) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinNightScope, flare]);
    }
}
