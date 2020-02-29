import { ItemRecipe } from '../ItemRecipe';
import { BloodiedSacrificialDagger } from '../BaseItems/BloodiedSacrificialDagger';
import { VampireClaws } from '../BaseItems/VampireClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02L');
const name: string = 'Vampire Dagger';
const labels: ItemLabel[] = [];
const goldCost: number = 5300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSacrificialDagger.blp';
const description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Use:|r Deals 1000 damage to target enemy unit and heals 500 hitpoints
|cffffcc00Mana Cost:|r 0
|cffffcc00Range:|r 500
|cffffcc00Cooldown:|r 60

|cFF808080Use is an effects that occurs when an item is used by clicking on it.|r`;

export class VampireDagger extends ItemRecipe {
    constructor(bloodiedSacrificialDagger: BloodiedSacrificialDagger, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [bloodiedSacrificialDagger, vampireClaws]);
    }
}
