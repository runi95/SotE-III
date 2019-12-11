import { Item } from './Item';

export class GoblinNightScope extends Item {
    public readonly itemId: number = FourCC('I01P');
    public readonly name: string = 'Goblin Night Scope';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNTelescope.blp';
    public readonly description: string = `An incredible scope with built in night vision.

|cffffcc00Effect:|r Provides an increase to the Hero's line of sight radius at night when carried.`;
}
