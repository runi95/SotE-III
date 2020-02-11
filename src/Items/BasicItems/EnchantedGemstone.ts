import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class EnchantedGemstone extends Item {
    public readonly itemId: number = FourCC('I02Y');
    public readonly name: string = 'Enchanted Gemstone';
    public readonly labels: ItemLabel[] = [ItemLabel.INTELLIGENCE];
    public readonly goldCost: number = 9894;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEnchantedGemstone.blp';
    public readonly description: string = `A gemstone enchanted by powerful magic.

|cffffcc00Intelligence:|r +99

|cFF808080Intelligence increases the damage done by your spells.|r`;
}
