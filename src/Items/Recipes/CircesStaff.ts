import { ItemRecipe } from '../ItemRecipe';
import { DruidicSalve } from '../BasicItems/DruidicSalve';
import { Scepter } from '../BasicItems/Scepter';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I013');
const name: string = 'Caduceus';
const labels: ItemLabel[] = [];
const goldCost: number = 1600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEntrapmentWard.blp';
const description: string = `An ancient staff forged by the elves.

|cffffcc00Use:|r Turns the target into a harmless critter for a short duration
|cffffcc00Mana Cost:|r 300
|cffffcc00Range:|r 800
|cffffcc00Duration (hero):|r 6
|cffffcc00Duration (creep):|r 12
|cffffcc00Cooldown:|r 120

|cFF808080Use is an effects that occurs when an item is used by clicking on it.|r`;

export class CircesStaff extends ItemRecipe {
    constructor(druidicSalve: DruidicSalve, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [druidicSalve, scepter]);
    }
}
