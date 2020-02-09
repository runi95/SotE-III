import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { Item } from '../Item';
import { IronShield } from '../BasicItems/IronShield';
import { ItemLabel } from '../ItemLabel';

export class BalancedShield extends ItemRecipe {
    private readonly moonArmor: MoonArmor;
    private readonly ironShield: IronShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I028');
    public readonly name: string = 'Balanced Shield';
    public readonly labels: ItemLabel[] = [ItemLabel.BLOCK, ItemLabel.RESISTANCE];
    public readonly goldCost: number = 135;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDefendStop.blp';
    public readonly description: string = `No matter how you hold this shield it stays perfectly balanced.

|cffffcc00Block:|r +5
|cffffcc00Resistance:|r +5

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

    constructor(moonArmor: MoonArmor, ironShield: IronShield) {
        super();

        this.moonArmor = moonArmor;
        this.ironShield = ironShield;
        this.recipe = [this.moonArmor, this.ironShield];
    }
}
