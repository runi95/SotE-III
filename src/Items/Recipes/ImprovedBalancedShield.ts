import { ItemRecipe } from '../ItemRecipe';
import { BalancedShield } from './BalancedShield';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class ImprovedBalancedShield extends ItemRecipe {
    private readonly balancedShield: BalancedShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02B');
    public readonly name: string = 'Improved Balanced Shield';
    public readonly labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
    public readonly goldCost: number = 885;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefend.blp';
    public readonly description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +12
|cffffcc00Resistance:|r +12

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

    constructor(balancedShield: BalancedShield) {
        super();

        this.balancedShield = balancedShield;
        this.recipe = [this.balancedShield];
    }
}
