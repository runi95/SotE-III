import { ItemRecipe } from '../ItemRecipe';
import { Fragarach } from './Fragarach';
import { SwordOfFreyr } from './SwordOfFreyr';
import { Item } from '../Item';

export class SwordOfNaegling extends ItemRecipe {
    private readonly fragarach: Fragarach;
    private readonly swordOfFreyr: SwordOfFreyr;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02G');
    public readonly name: string = 'Sword of Naegling';
    public readonly goldCost: number = 60;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDarkSword.blp';
    public readonly description: string = `The wind howls with anticipation as you raise the sword

|cffffcc00Attack damage:|r +20
|cffffcc00Strength:|r +10
|cffffcc00Effect:|r Summons a tornado that damages and slows nearby enemies`;

    constructor(fragarach: Fragarach, swordOfFreyr: SwordOfFreyr) {
        super();

        this.fragarach = fragarach;
        this.swordOfFreyr = swordOfFreyr;
        this.recipe = [this.fragarach, this.swordOfFreyr];
    }
}
