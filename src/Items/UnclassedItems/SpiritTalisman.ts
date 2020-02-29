import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02X');
const name: string = 'Spirit Talisman';
const labels: ItemLabel[] = [ItemLabel.AGILITY];
const goldCost: number = 7260;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNTalisman.blp';
const description: string = `A powerful talisman worn by the Spirit Wind Rider.

|cffffcc00Agility:|r +81

|cFF808080Agility increases your attack and movement speed.|r`;

export class SpiritTalisman extends Item {
    constructor() {
        super(itemId, name, labels, goldCost, iconPath, description);
    }
}
