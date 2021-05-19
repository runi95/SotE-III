import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01P');
const name = 'Goblin Night Scope';
const labels: ItemLabel[] = [];
const goldCost = 200;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNTelescope.blp';
const description = `An incredible scope with built in night vision.

|cffffcc00Passive:|r Provides an increased line of sight radius at night

|cFF808080Passives are effects that are always active.|r`;

export class GoblinNightScope extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
