import { ItemRecipe } from '../ItemRecipe';
import { Item } from '../Item';
import { WandOfShadowsight } from './WandOfShadowsight';
import { ClockworkPenguin } from '../BasicItems/ClockworkPenguin';
import { ItemLabel } from '../ItemLabel';

export class SnowyOwl extends ItemRecipe {
    private readonly clockworkPenguin: ClockworkPenguin;
    private readonly wandOfShadowsight: WandOfShadowsight;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02C');
    public readonly name: string = 'Snowy Owl';
    public readonly labels: ItemLabel[] = [];
    public readonly goldCost: number = 100;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSnowOwl.blp';
    public readonly description: string = `It is said that these creatures can see the dead.

|cffffcc00Effect:|r A clockwork penguin with 6 inventory spaces that will always stay by your side and follow you around.

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(clockworkPenguin: ClockworkPenguin, wandOfShadowsight: WandOfShadowsight) {
        super();

        this.clockworkPenguin = clockworkPenguin;
        this.wandOfShadowsight = wandOfShadowsight;
        this.recipe = [this.clockworkPenguin, this.wandOfShadowsight];
    }
}
