import { ItemRecipe } from '../ItemRecipe';
import { SteelShield } from './SteelShield';
import { Scepter } from '../BasicItems/Scepter';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class TheAegis extends ItemRecipe {
    private readonly steelShield: SteelShield;
    private readonly scepter: Scepter;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I014');
    public readonly name: string = 'The Aegis';
    public readonly labels: ItemLabel[] = [ItemLabel.BLOCK];
    public readonly goldCost: number = 130;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNLightningShield.blp';
    public readonly description: string = `A shield said to be forged by gods.

|cffffcc00Effect:|r Forms a shield of electricity around the wearer, dealing damage each second to surrounding units
|cffffcc00Block:|r +9

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

    constructor(steelShield: SteelShield, scepter: Scepter) {
        super();

        this.steelShield = steelShield;
        this.scepter = scepter;
        this.recipe = [this.steelShield, this.scepter];
    }
}
