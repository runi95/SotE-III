import { Item } from './Item';

export class RunedBracers extends Item {
    public readonly itemId: number = FourCC('I00S');
    public readonly name: string = 'Runed Bracers';
    public readonly goldCost: number = 600;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNRunedBracers.blp';
    public readonly description: string = `You can't quite make out what the runes say.

|cffffcc00Effect (1):|r Increases item charges whenever you take spell damage.
|cffffcc00Effect (2):|r Releases a chain lightning whenever you reach over 100 charges
|cffffcc00Chain Lightning Damage:|r 250
|cffffcc00Chain Lightning Max Bounce:|r 5

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
