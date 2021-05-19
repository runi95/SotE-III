import { ItemLabel } from '../ItemLabel';
import { Item } from '../Item';

const itemId: number = FourCC('I02M');
const name = `Assassin's Blade`;
const labels: ItemLabel[] = [];
const goldCost = 500;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNDaggerOfEscape.blp';
const description = `Pierces through the thickest of defenses.

|cffffcc00Attack damage:|r +200
|cffffcc00Piercing:|r +600
|cffffcc00Passive:|r Every attack has a 5% chance to completely ignore block

|cFF808080Piercing lets a certain amount of damage go through block.|r`;

export class AssassinsBlade extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
