import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class EmptySoulcage extends Item {
    public readonly itemId: number = FourCC('I009');
    public readonly name: string = 'Empty Soulcage';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 500;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSoulstone.blp';
    // tslint:disable-next-line: max-line-length
    public readonly description: string = `The soulcage is missing 3 gems, maybe if you could put the gems back inside you would be able to harness it's powers.`;
}
