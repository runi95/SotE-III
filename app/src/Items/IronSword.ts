import { Item } from './Item';

export class IronSword extends Item {
    public readonly itemId: number = FourCC('I00H');
    public readonly name: string = 'Iron Sword';
    public readonly goldCost: number = 250;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSteelMelee.blp';
    public readonly description: string = `A dull sword capable of damaging enemy units through physical contact.

|cffffcc00Attack damage:|r +5

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;
}
