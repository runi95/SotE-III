import { ItemRecipe } from '../ItemRecipe';
import { IronSword } from '../BasicItems/IronSword';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02M');
const name: string = `Assassin's Blade`;
const labels: ItemLabel[] = [];
const goldCost: number = 750;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDaggerOfEscape.blp';
const description: string = `The assassin's preferred weapon of choice.

|cffffcc00Effect:|r Your first attack every 30 seconds deals 450 bonus damage.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class AssassinsBlade extends ItemRecipe {
    constructor(ironSword: IronSword) {
        super(itemId, name, labels, goldCost, iconPath, description, [ironSword]);
    }
}
