import { ItemRecipe } from '../ItemRecipe';
import { Scepter } from '../BasicItems/Scepter';
import { Item } from '../Item';
import { BloodiedExecutionersAxe } from '../BasicItems/BloodiedExecutionersAxe';

// tslint:disable: max-line-length
export class ThrowableAxe extends ItemRecipe {
    private readonly bloodiedExecutionersAxe: BloodiedExecutionersAxe;
    private readonly scepter: Scepter;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01E');
    public readonly name: string = 'Throwable Axe';
    public readonly goldCost: number = 400;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNOrcMeleeUpThree.blp';
    public readonly description: string = `You can't quite make out what the runes say.

|cffffcc00Attack damage:|r +19
|cffffcc00Effect:|r Throw an axe at the target unit dealing 300 initial damage, 20 damage per second afterwards and drastically slows down movement speed for 15 seconds

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(bloodiedExecutionersAxe: BloodiedExecutionersAxe, scepter: Scepter) {
        super();

        this.bloodiedExecutionersAxe = bloodiedExecutionersAxe;
        this.scepter = scepter;
        this.recipe = [this.bloodiedExecutionersAxe, this.scepter];
    }
}
