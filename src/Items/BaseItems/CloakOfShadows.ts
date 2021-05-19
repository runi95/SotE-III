import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I01I');
const name = 'Cloak of Shadows';
const labels: ItemLabel[] = [];
const goldCost = 100;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNCloak.tga';
const description = `A cheap cloak that lets you blend in with the shadows.

|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class CloakOfShadows extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
