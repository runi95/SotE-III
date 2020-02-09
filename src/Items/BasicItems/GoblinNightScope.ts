import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class GoblinNightScope extends Item {
    public readonly itemId: number = FourCC('I01P');
    public readonly name: string = 'Goblin Night Scope';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNTelescope.blp';
    public readonly description: string = `An incredible scope with built in night vision.

|cffffcc00Effect:|r Provides an increase to the Hero's line of sight radius at night when carried.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
