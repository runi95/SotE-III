import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class BlueSoulstone extends Item {
    public readonly itemId: number = FourCC('I00B');
    public readonly name: string = 'Blue Soulstone';
    public readonly labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
    public readonly goldCost: number = 1800;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBlueGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.

|cffffcc00Intelligence:|r +18

|cFF808080Intelligence increases the damage done by your spells.|r`;
}
