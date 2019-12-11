import { Item } from '../Item';

export class GreenSoulstone extends Item {
    public readonly itemId: number = FourCC('I00A');
    public readonly name: string = 'Green Soulstone';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.`;
}
