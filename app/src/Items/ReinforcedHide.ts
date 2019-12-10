import { Item } from './Item';

export class ReinforcedHide extends Item {
    public readonly itemId: number = FourCC('I006');
    public readonly name: string = 'Reinforced Hide';
    public readonly goldCost: number = 350;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNReinforcedHides.blp';
    public readonly description: string = `A protective layer of regenerative hide.

|cffffcc00Health regen:|r +5

|cFF808080Health regeneration determines how much health you're passively regaining every second.|r`;
}
