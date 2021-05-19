import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02X');
const name = 'Spirit Talisman';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost = 7260;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNTalisman.blp';
const description = `A powerful talisman worn by the Spirit Wind Rider.

|cffffcc00Agility:|r +81

|cFF808080Agility increases your attack and movement speed.|r`;

export class SpiritTalisman extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
