import { ItemRecipe } from '../ItemRecipe';
import { WarAxe } from '../BasicItems/WarAxe';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class BerserkerAxes extends ItemRecipe {
    private readonly warAxe: WarAxe;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I023');
    public readonly name: string = 'Berserker Axes';
    public readonly labels: ItemLabel[] = [ItemLabel.STRENGTH];
    public readonly goldCost: number = 720;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBerserkerAxes.blp';
    public readonly description: string = `Dual axes most commonly wielded by the berserkers.

|cffffcc00Strength:|r +10

|cFF808080Strength increases your max health and health regen.|r`;

    constructor(warAxe: WarAxe) {
        super();

        this.warAxe = warAxe;
        this.recipe = [this.warAxe];
    }
}
