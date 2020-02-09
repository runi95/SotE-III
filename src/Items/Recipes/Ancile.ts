import { ItemRecipe } from '../ItemRecipe';
import { IronShield } from '../BasicItems/IronShield';
import { Item } from '../Item';
import { ManaEgg } from './ManaEgg';
import { ItemLabel } from '../ItemLabel';

export class Ancile extends ItemRecipe {
    private readonly manaEgg: ManaEgg;
    private readonly ironShield: IronShield;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I016');
    public readonly name: string = 'Ancile';
    public readonly labels: ItemLabel[] = [ItemLabel.MAX_MANA, ItemLabel.BLOCK];
    public readonly goldCost: number = 370;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNGrimWard.blp';
    public readonly description: string = `A shield worn by the great mage Ancile.

|cffffcc00Max Mana:|r +450
|cffffcc00Block:|r +4

|cFF808080Mana is required when casting most spells.|r`;

    constructor(manaEgg: ManaEgg, ironShield: IronShield) {
        super();

        this.manaEgg = manaEgg;
        this.ironShield = ironShield;
        this.recipe = [this.manaEgg, this.ironShield];
    }
}
