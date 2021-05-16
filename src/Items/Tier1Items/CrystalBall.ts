import { ItemRecipe } from '../ItemRecipe';
import { ItemLabel } from '../ItemLabel';
import { OrbOfMagic } from '../BaseItems/OrbOfMagic';
import { SobiMask } from '../BaseItems/SobiMask';
import { ScrollOfWitchcraft } from '../BaseItems/ScrollOfWitchcraft';

const itemId: number = FourCC('I00V');
const name: string = 'Crystal Ball';
const labels: ItemLabel[] = [ItemLabel.INTELLIGENCE, ItemLabel.MANA_REGEN, ItemLabel.COOLDOWN_REDUCTION];
const goldCost: number = 2200;
const iconPath: string = 'ReplaceableTextures\\CommandButtons\\BTNCrystalBall.blp';
const description: string = `Can you see the future in this thing?

|cffffcc00Intelligence:|r +10
|cffffcc00Mana regen:|r +10
|cffffcc00Cooldown reduction:|r +8%
|cffffcc00Use:|r Reveals the area of the map that it is cast upon. Also reveals invisible units
|cffffcc00Mana Cost:|r 25
|cffffcc00Range:|r 99999
|cffffcc00Area of Effect:|r 600
|cffffcc00Duration:|r 8
|cffffcc00Cooldown:|r 20

|cFF808080Use is an effect that occurs when an item is used by clicking on it.|r`;

export class CrystalBall extends ItemRecipe {
    constructor(orbOfMagic: OrbOfMagic, sobiMask: SobiMask, scrollOfWitchcraft: ScrollOfWitchcraft) {
        super(itemId, name, labels, goldCost, iconPath, description, [orbOfMagic, sobiMask, scrollOfWitchcraft]);
    }
}
