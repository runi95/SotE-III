import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';
import { Branch } from '../BasicItems/Branch';
import { ReinforcedHide } from '../BasicItems/ReinforcedHide';

export class NaturesBlessing extends ItemRecipe {
    private readonly reinforcedHide: ReinforcedHide;
    private readonly branch: Branch;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02Z');
    public readonly name: string = `Nature's Blessing`;
    public readonly labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
    public readonly goldCost: number = 1150;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNNaturesBlessing.blp';
    public readonly description: string = `A branch blessed by mother nature herself.

|cffffcc00Effect:|r Heals 1000 hitpoints over 10 seconds.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(reinforcedHide: ReinforcedHide, branch: Branch) {
        super();

        this.reinforcedHide = reinforcedHide;
        this.branch = branch;
        this.recipe = [this.reinforcedHide, this.branch];
    }
}
