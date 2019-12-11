import { Item } from '../Item';

export class BlueSoulstone extends Item {
    public readonly itemId: number = FourCC('I00B');
    public readonly name: string = 'Blue Soulstone';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBlueGem.blp';
    public readonly description: string = `A soulstone can be powerful in the right hands, maybe you could find a proper container for it.`;
}
