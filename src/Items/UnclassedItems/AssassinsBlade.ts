import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I02M');
const name: string = `Assassin's Blade`;
const labels: ItemLabel[] = [];
const goldCost: number = 500;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDaggerOfEscape.blp';
const description: string = `The assassin's preferred weapon of choice.

|cffffcc00Unique:|r Your first attack every 30 seconds deals 300 bonus damage.

|cFF808080Unique item effects do not stack with itself.|r`;

export class AssassinsBlade extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
