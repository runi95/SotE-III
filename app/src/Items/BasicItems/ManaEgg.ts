import { Item } from '../Item';

export class ManaEgg extends Item {
    public readonly itemId: number = FourCC('I015');
    public readonly name: string = 'Mana Egg';
    public readonly goldCost: number = 800;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNManaStone.blp';
    public readonly description: string = `An egg surging with magical energy.

|cffffcc00Max Mana:|r +600

|cFF808080Mana is required when casting most spells.|r`;
}
