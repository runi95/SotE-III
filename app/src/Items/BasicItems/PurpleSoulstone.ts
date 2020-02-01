import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class PurpleSoulstone extends Item {
    public readonly itemId: number = FourCC('I00C');
    public readonly name: string = 'Purple Soulstone';
    public readonly labels: ItemLabel[] = [ItemLabel.AGILITY, ItemLabel.ATTACK_DAMAGE];
    public readonly goldCost: number = 1700;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPurpleGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Agility:|r +4
|cffffcc00Attack damage:|r +5

|cFF808080Agility increases your attack and movement speed.|r`;
}
