import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class CrystalBall extends Item {
    public readonly itemId: number = FourCC('I00V');
    public readonly name: string = 'Crystal Ball';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBall.blp';
    public readonly description: string = `Can you see the future in this thing?

 |cffffcc00Effect:|r Reveals the area of the map that it is cast upon. Also reveals invisible units.
 |cffffcc00Area of Effect:|r 600
 |cffffcc00Duration:|r 8
 |cffffcc00Cooldown:|r 20

 |cFF808080Effects are special properties that usually trigger on an event.|r`;
}
