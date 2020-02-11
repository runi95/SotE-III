import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class JuggernautArmor extends Item {
    public readonly itemId: number = FourCC('I02W');
    public readonly name: string = 'Juggernaut Armor';
    public readonly labels: ItemLabel[] = [ItemLabel.STRENGTH];
    public readonly goldCost: number = 9834;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNArcaniteArchitecture.blp';
    public readonly description: string = `A massive and heavy armor used by the Infernal Juggernaut.

|cffffcc00Strength:|r +82

|cFF808080Strength increases your max health and health regen.|r`;
}
