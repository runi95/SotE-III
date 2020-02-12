import { ItemRecipe } from '../ItemRecipe';
import { BloodiedSacrificialDagger } from '../BasicItems/SacrificialDagger';
import { VampireClaws } from '../BasicItems/VampireClaws';
import { ItemLabel } from '../ItemLabel';

const itemId: number = FourCC('I02L');
const name: string = 'Vampire Dagger';
const labels: ItemLabel[] = [];
const goldCost: number = 5300;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNSacrificialDagger.blp';
const description: string = `A dagger often used by acolytes in sacrificial rituals

|cffffcc00Effect:|r Deals 1000 damage to target enemy unit and heals 666 hitpoints

|cFF808080Effects are special properties that usually trigger on an event.|r`;

export class VampireDagger extends ItemRecipe {
    constructor(bloodiedSacrificialDagger: BloodiedSacrificialDagger, vampireClaws: VampireClaws) {
        super(itemId, name, labels, goldCost, iconPath, description, [bloodiedSacrificialDagger, vampireClaws]);
    }
}
