import { ItemRecipe } from '../ItemRecipe';
import { FlareGun } from '../BaseItems/FlareGun';
import { GoblinNightScope } from '../BaseItems/GoblinNightScope';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I020');
const name = 'Wand of Shadowsight';
const labels: ItemLabel[] = [];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNWandOfShadowSight.blp';
const description = `An incredible scope with built in night vision.

|cffffcc00Effect:|r Provides an increase to the Hero's line of sight radius at night when carried
|cffffcc00Use:|r Reveals the target unit until the debuff is dispelled
|cffffcc00Mana cost:|r 0
|cffffcc00Range:|r 800
|cffffcc00Duration:|r Until dispelled
|cffffcc00Cooldown:|r 30

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class WandOfShadowsight extends ItemRecipe {
    constructor(goblinNightScope: GoblinNightScope, flareGun: FlareGun) {
        super(itemId, name, labels, goldCost, iconPath, description, [goblinNightScope, flareGun]);
    }
}
