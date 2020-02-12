import { ItemRecipe } from '../ItemRecipe';
import { Branch } from '../BasicItems/Branch';
import { Scepter } from '../BasicItems/Scepter';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I013');
const name: string = 'Caduceus';
const labels: ItemLabel[] = [];
const goldCost: number = 1600;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEntrapmentWard.blp';
const description: string = `An ancient staff forged by the elves.

|cffffcc00Effect:|r Turns enemies into harmless critters for a short duration.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class CircesStaff extends ItemRecipe {
    constructor(branch: Branch, scepter: Scepter) {
        super(itemId, name, labels, goldCost, iconPath, description, [branch, scepter]);
    }
}
