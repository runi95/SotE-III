import { Item } from './Item';

export class BootsOfSpeed extends Item {
    public readonly itemId: number = FourCC('I00R');
    public readonly name: string = 'Boots of Speed';
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBootsOfSpeed.blp';
    public readonly description: string = `Increases movement rate.

|cffffcc00Movement Speed:|r +50

|cFF808080Movement speed determines how fast you're able to move.|r`;
}
