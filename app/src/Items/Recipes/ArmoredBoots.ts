import { ItemRecipe } from '../ItemRecipe';
import { BootsOfSpeed } from '../BasicItems/BootsOfSpeed';
import { SteelShield } from './SteelShield';
import { Item } from '../Item';

export class ArmoredBoots extends ItemRecipe {
    private readonly bootsOfSpeed: BootsOfSpeed;
    private readonly steelShield: SteelShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I01C');
    public readonly name: string = 'Armored Boots';
    public readonly goldCost: number = 205;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNBoots.blp';
    public readonly description: string = `Increases movement rate while keeping your feet safe.

|cffffcc00Movement Speed:|r +75
|cffffcc00Block:|r +9

|cFF808080Movement speed determines how fast you're able to move.|r`;

    constructor(bootsOfSpeed: BootsOfSpeed, steelShield: SteelShield) {
        super();

        this.bootsOfSpeed = bootsOfSpeed;
        this.steelShield = steelShield;
        this.recipe = [this.bootsOfSpeed, this.steelShield];
    }
}
