import { Item } from '../Item';

export class ClockworkPenguin extends Item {
    public readonly itemId: number = FourCC('I01N');
    public readonly name: string = 'Clockwork Penguin';
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPenguin.blp';
    public readonly description: string = `The most adorable clockwork you'll ever see.

|cffffcc00Effect:|r A clockwork penguin with 6 inventory spaces that will always stay by your side and follow you around.`;
}
