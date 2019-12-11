import { Item } from './Item';

export class PurpleSoulstone extends Item {
    public readonly itemId: number = FourCC('I00C');
    public readonly name: string = 'Purple Soulstone';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPurpleGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.`;
}
