import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class MaskOfDeath extends Item {
    public readonly itemId: number = FourCC('I030');
    public readonly name: string = 'Mask of Death';
    public readonly labels: ItemLabel[] = [ItemLabel.LIFESTEAL];
    public readonly goldCost: number = 1900;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNMaskOfDeath.blp';
    public readonly description: string = `A mask of death.

|cffffcc00Lifesteal:|r +50%

|cFF808080Lifesteal makes you heal hitpoints equal to a percentage of the physical damage done when attacking.|r`;
}
