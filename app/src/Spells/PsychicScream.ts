import { Spell } from './Spell';

// FIXME: This spell does not work as intended
export class PsychicScream extends Spell {
    protected abilityId: number = FourCC('A01G');

    protected action(): void {
        const trig: unit = GetTriggerUnit();
        const abilityLevel: number = GetUnitAbilityLevelSwapped(this.abilityId, trig);
        const damage: number = 100 * abilityLevel + 2 * GetHeroInt(trig, true);
        const x: number = GetUnitX(trig);
        const y: number = GetUnitY(trig);
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const loc: location = Location(x, y);
        const grp: group = GetUnitsInRangeOfLocAll(1000, loc);

        ForGroup(grp, () => {
            if (IsUnitEnemy(GetEnumUnit(), Player(playerId))) {
                UnitDamageTargetBJ(trig, GetEnumUnit(), damage, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
                const uX: number = GetUnitX(GetEnumUnit());
                const uY: number = GetUnitY(GetEnumUnit());
                const dist: number = Math.sqrt(Pow(uX - x, 2) + Pow(uY - y, 2));
                const multX: number = 100 * ((uX - x) / dist);
                const multY: number = 100 * ((uY - y / dist));
                let targetX: number = uX;
                let targetY: number = uY;

                for (let i: number = 0; i < 4; i++) {
                    targetX += multX;
                    targetY += multY;
                    if (IsTerrainPathable(targetX, targetY, PATHING_TYPE_WALKABILITY)) {
                        targetX -= multX;
                        targetY -= multY;
                        break;
                    }
                }

                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Undead\\DeathCoil\\DeathCoilSpecialArt.mdl', uX, uY));
                SetUnitPosition(GetEnumUnit(), targetX, targetY);
            }
        });

        RemoveLocation(loc);
        DestroyGroup(grp);
    }
}
