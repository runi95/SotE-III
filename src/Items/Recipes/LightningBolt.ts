import { ItemRecipe } from '../ItemRecipe';
import { TheAegis } from './TheAegis';
import { Item } from '../Item';
import { GoblinBattery } from '../BasicItems/GoblinBattery';
import { ItemLabel } from '../ItemLabel';

// tslint:disable: max-line-length
export class LightningBolt extends ItemRecipe {
    private readonly goblinBattery: GoblinBattery;
    private readonly theAegis: TheAegis;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01Q');
    public readonly name: string = 'Lightning Bolt';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNPurge.blp';
    public readonly description: string = `A lightning bolt capable of devastating damage.

|cffffcc00Effect:|r Sends a lightning bolt down at the target location, dealing 2200 damage to enemy units in the center of the target area after 0.6 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(goblinBattery: GoblinBattery, theAegis: TheAegis) {
        super();

        this.goblinBattery = goblinBattery;
        this.theAegis = theAegis;
        this.recipe = [this.goblinBattery, this.theAegis];
    }
}
