import { ItemLabel } from '../ItemLabel';
import { ItemRecipe } from '../ItemRecipe';
import { ImprovedReinforcedHide } from '../Tier1Items/ImprovedReinforcedHide';
import { NaturesBlessing } from '../Tier1Items/NaturesBlessing';

const itemId: number = FourCC('I045');
const name = `Improved Nature's Blessing`;
const labels: ItemLabel[] = [ItemLabel.HEALTH_REGEN];
const goldCost = 10450;
const iconPath = 'ReplaceableTextures\\CommandButtons\\BTNImprovedNaturesBlessing.dds';
const description = `A branch blessed by mother nature herself.

|cffffcc00Health regen:|r +60
|cffffcc00Use:|r Heals 2500 hitpoints over 10 seconds
|cffffcc00Mana Cost:|r 600
|cffffcc00Duration:|r 10
|cffffcc00Cooldown:|r 25

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class ImprovedNaturesBlessing extends ItemRecipe {
    constructor(naturesBlessing: NaturesBlessing, improvedReinforcedHide: ImprovedReinforcedHide) {
        super(itemId, name, labels, goldCost, iconPath, description, [naturesBlessing, improvedReinforcedHide]);
    }
}
