import { ItemRecipe } from '../ItemRecipe';
import { Fragarach } from './Fragarach';
import { SwordOfFreyr } from './SwordOfFreyr';
import { Item } from '../Item';
import { ItemLabel } from '../ItemLabel';

export class SwordOfNaegling extends ItemRecipe {
    private readonly fragarach: Fragarach;
    private readonly swordOfFreyr: SwordOfFreyr;
    public readonly recipe: Item[];
    public readonly itemId: number = FourCC('I02G');
    public readonly name: string = 'Sword of Naegling';
    public readonly labels: ItemLabel[] = [ItemLabel.ATTACK_DAMAGE, ItemLabel.STRENGTH];
    public readonly goldCost: number = 60;
    public readonly iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNDarkSword.blp';
    public readonly description: string = `The wind howls with anticipation as you raise the sword

|cffffcc00Attack damage:|r +20
|cffffcc00Strength:|r +10
|cffffcc00Effect:|r Summons a tornado that damages and slows nearby enemies

|cFF808080Effects are special properties that usually trigger on an event.|r`;

    constructor(fragarach: Fragarach, swordOfFreyr: SwordOfFreyr) {
        super();

        this.fragarach = fragarach;
        this.swordOfFreyr = swordOfFreyr;
        this.recipe = [this.fragarach, this.swordOfFreyr];
    }
}
