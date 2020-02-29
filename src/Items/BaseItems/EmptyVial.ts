import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I000');
const name: string = 'Empty Vial';
const labels: ItemLabel[] = [ItemLabel.MAX_MANA];
const goldCost: number = 150;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialEmpty.tga';
const description: string = `An empty vial that very slowly collects magical energy.

|cffffcc00Max Mana:|r +50

|cFF808080Mana is required when casting most spells.|r`;

export class EmptyVial extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
