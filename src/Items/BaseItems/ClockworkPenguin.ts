import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01N');
const name = 'Clockwork Penguin';
const labels: ItemLabel[] = [];
const goldCost = 200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNPenguin.blp';
const description = `The most adorable clockwork you'll ever see.

|cffffcc00Effect:|r A clockwork penguin with 6 inventory spaces that will always stay by your side and follow you around.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class ClockworkPenguin extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
