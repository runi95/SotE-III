import { Item } from '../Item';

export class LoadedRifle extends Item {
    public readonly itemId: number = FourCC('I00W');
    public readonly name: string = 'Loaded Rifle';
    public readonly goldCost: number = 600;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanMissileUpOne.blp';
    public readonly description: string = `The loaded rifle; an essential tool in warfare.

|cffffcc00Attack damage:|r +12

|cFF808080Your attack damage determines how much damage your physical attacks do.|r`;
}
