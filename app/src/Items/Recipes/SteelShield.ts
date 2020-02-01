import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BasicItems/IronShield';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class SteelShield extends ItemRecipe {
    private readonly ironShield: IronShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00J');
    public readonly name: string = 'Steel Shield';
    public readonly labels: ItemLabel[] = [ItemLabel.BLOCK];
    public readonly goldCost: number = 270;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNHumanArmorUpTwo.blp';
    public readonly description: string = `A weak shield capable of blocking incoming physical damage.

|cffffcc00Block:|r +7

|cFF808080Incoming physical damage is reduced by the amount of block you have.|r`;

    constructor(ironShield: IronShield) {
        super();

        this.ironShield = ironShield;
        this.recipe = [this.ironShield];
    }
}
