import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class EmptyVial extends Item {
    public readonly itemId: number = FourCC('I000');
    public readonly name: string = 'Empty Vial';
    public readonly labels: ItemLabel[] = [ItemLabel.MAX_MANA];
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialEmpty.tga';
    public readonly description: string = `An empty vial that very slowly collects magical energy.

|cffffcc00Max Mana:|r +50

|cFF808080Mana is required when casting most spells.|r`;
}
