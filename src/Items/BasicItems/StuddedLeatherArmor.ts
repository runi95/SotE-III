import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class StuddedLeatherArmor extends Item {
    public readonly itemId: number = FourCC('I007');
    public readonly name: string = 'Studded Leather Armor';
    public readonly labels: ItemLabel[] = [ItemLabel.MAX_HEALTH];
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLeatherUpgradeOne.blp';
    public readonly description: string = `A weak leather armor.

|cffffcc00Max health:|r +50

|cFF808080Health determines how much damage you can take before dying.|r`;
}
