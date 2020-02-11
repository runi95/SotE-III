import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class SpiritTalisman extends Item {
    public readonly itemId: number = FourCC('I02X');
    public readonly name: string = 'Spirit Talisman';
    public readonly labels: ItemLabel[] = [ItemLabel.AGILITY];
    public readonly goldCost: number = 7260;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNTalisman.blp';
    public readonly description: string = `A powerful talisman worn by the Spirit Wind Rider.

|cffffcc00Agility:|r +81

|cFF808080Agility increases your attack and movement speed.|r`;
}
