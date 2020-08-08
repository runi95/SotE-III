import { ItemRecipe } from '../ItemRecipe';
import { AgileSlippers } from '../Tier1Items/AgileSlippers';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01H');
const name: string = 'Scroll of Agility';
const labels: ItemLabel[] = [];
const goldCost: number = 1005;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNScrollOfHaste.blp';
const description: string = `A mystical scroll written in an ancient language.

|cffffcc00Movement Speed:|r +80
|cffffcc00Use:|r Increases movement speed by 50%
|cffffcc00Mana Cost:|r 0
|cffffcc00Area of Effect:|r 600
|cffffcc00Duration:|r 60
|cffffcc00Cooldown:|r 60

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class ScrollOfAgility extends ItemRecipe {
    constructor(agileSlippers: AgileSlippers) {
        super(itemId, name, labels, goldCost, iconPath, description, [agileSlippers]);
    }
}
