import { ItemRecipe } from '../ItemRecipe';
import { AgileSlippers } from './AgileSlippers';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01H');
const name: string = 'Scroll of Agility';
const labels: ItemLabel[] = [];
const goldCost: number = 750;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNScrollOfHaste.blp';
const description: string = `A mystical scroll written in an ancient language.

|cffffcc00Movement Speed:|r +200
|cffffcc00Effect:|r Increases movement speed by 50% for 60 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class ScrollOfAgility extends ItemRecipe {
    constructor(agileSlippers: AgileSlippers) {
        super(itemId, name, labels, goldCost, iconPath, description, [agileSlippers]);
    }
}
