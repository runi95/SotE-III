import { ItemRecipe } from '../ItemRecipe';
import { Branch } from '../BasicItems/Branch';
import { Item } from '../Item';
import { Scepter } from '../BasicItems/Scepter';
import { ItemLabel } from '../ItemLabel';

export class CircesStaff extends ItemRecipe {
    private readonly branch: Branch;
    private readonly scepter: Scepter;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I013');
    public readonly name: string = 'Caduceus';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 200;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNEntrapmentWard.blp';
    public readonly description: string = `An ancient staff forged by the elves.

|cffffcc00Effect:|r Turns enemies into harmless critters for a short duration.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(branch: Branch, scepter: Scepter) {
        super();

        this.branch = branch;
        this.scepter = scepter;
        this.recipe = [this.branch, this.scepter];
    }
}
