import { Item } from './Item';

export class OrbOfMagic extends Item {
    public readonly itemId: number = FourCC('I00I');
    public readonly name: string = 'Orb of Magic';
    public readonly goldCost: number = 400;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrbOfMagic.blp';
    public readonly description: string = `An orb full of potencial magic if you know how to extract it.

|cffffcc00Intelligence:|r +4

|cFF808080Intelligence increases the damage done by your spells.|r`;
}
