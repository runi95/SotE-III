import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I02M');
const name = `Assassin's Blade`;
const labels: ItemLabel[] = [];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDaggerOfEscape.blp';
const description = `The assassin's preferred weapon of choice.

|cffffcc00Attack damage:|r +6
|cffffcc00Lifesteal:|r +10
|cffffcc00Unique:|r Your first attack every 30 seconds deals 420 bonus damage.

|cFF808080Unique item effects do not stack with itself.|r`;

export class AssassinsBlade extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
