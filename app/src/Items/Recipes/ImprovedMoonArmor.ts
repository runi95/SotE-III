import { ItemRecipe } from '../ItemRecipe';
import { MoonArmor } from '../BasicItems/MoonArmor';
import { Item } from '../Item';

export class ImprovedMoonArmor extends ItemRecipe {
    private readonly moonArmor: MoonArmor;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I00O');
    public readonly name: string = 'Improved Moon Armor';
    public readonly goldCost: number = 540;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNImprovedMoonArmor.blp';
    public readonly description: string = `A special armor capable of resisting spell damage.

|cffffcc00Resistance:|r +14

|cFF808080Incoming spell damage is reduced by the amount of resistance you have.|r`;

    constructor(moonArmor: MoonArmor) {
        super();

        this.moonArmor = moonArmor;
        this.recipe = [this.moonArmor];
    }
}
