import { ItemRecipe } from '../ItemRecipe';

export class LightningBolt extends ItemRecipe {
    private readonly goblinBattery: number = FourCC('I01O');
    private readonly theAegis: number = FourCC('I014');
    protected readonly recipe: number[] = [this.goblinBattery, this.theAegis];
    protected readonly resultingItem: number = FourCC('I01Q');
}
