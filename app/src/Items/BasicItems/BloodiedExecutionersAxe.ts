import { Item } from '../Item';

export class BloodiedExecutionersAxe extends Item {
    public readonly itemId: number = FourCC('I00Z');
    public readonly name: string = `Bloodied Executioner's Axe`;
    public readonly goldCost: number = 400;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSpiritWalkerMasterTraining.blp';
    public readonly description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +15
`;
}
