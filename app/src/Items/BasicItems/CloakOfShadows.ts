import { Item } from '../Item';

export class CloakOfShadows extends Item {
    public readonly itemId: number = FourCC('I01I');
    public readonly name: string = 'Cloak of Shadows';
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCloak.tga';
    public readonly description: string = `A cheap cloak that lets you blend in with the shadows.

|cffffcc00Effect:|r Turns the wearer invisible if they're standing perfectly still.

|cFF808080Effects are special properties that usually trigger on an event.|r`;
}
