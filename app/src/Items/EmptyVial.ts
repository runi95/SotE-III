import { Item } from './Item';

export class EmptyVial extends Item {
    public readonly itemId: number = FourCC('I000');
    public readonly name: string = 'Empty Vial';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNVialEmpty.tga';
    public readonly description: string = `An empty vial that very slowly collects magical energy.

|cffffcc00Max Mana:|r +50

|cFF808080Mana is required when casting most spells.|r`;
}
