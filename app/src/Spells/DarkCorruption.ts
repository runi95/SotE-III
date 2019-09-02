import { Trigger } from '../JassOverrides/Trigger';

export class DarkCorruption {
    private readonly abilityId: number = FourCC('A036');
    private readonly summonId: number = FourCC('u001');
    private readonly darkSummoningId: number = FourCC('A04A');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private summonCount: number = 0;
    private readonly trig: Trigger = new Trigger();

    constructor() {
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private action(): void {
        if (GetUnitTypeId(GetDyingUnit()) === this.summonId) {
            this.summonCount--;
        } else if (this.summonCount < 5 && GetUnitAbilityLevel(GetKillingUnit(), this.abilityId) > 0
            && IsUnitEnemy(GetDyingUnit(), GetOwningPlayer(GetKillingUnit()))) {
            const darkSummoningLevel: number = GetUnitAbilityLevel(GetKillingUnit(), this.darkSummoningId);
            const x: number = GetUnitX(GetDyingUnit());
            const y: number = GetUnitY(GetDyingUnit());
            const intelligence: number = GetHeroInt(GetKillingUnit(), true);
            const summon: unit = CreateUnit(GetOwningPlayer(GetKillingUnit()), this.summonId, x, y, bj_UNIT_FACING);

            if (darkSummoningLevel > 0) {
                BlzSetUnitMaxHP(summon, 4 * intelligence + 75 * darkSummoningLevel);
            } else {
                BlzSetUnitMaxHP(summon, 2 * intelligence);
            }
            SetUnitLifePercentBJ(summon, 100);
            // BlzSetUnitArmor( summon, 10.00 )
            // BlzSetUnitAttackCooldown(summon, 2.00, 1)
            // BlzSetUnitDiceSides(summon, 1, 1)
            // BlzSetUnitDiceNumber(summon, 4, 1)
            if (darkSummoningLevel > 0) {
                const damage: number = Math.ceil(2 * intelligence + 5 * darkSummoningLevel);
                BJDebugMsg(`damage: ${damage}`);
                BlzSetUnitBaseDamage(summon, damage, 0);
            } else {
                BlzSetUnitBaseDamage(summon, Math.ceil(intelligence), 0);
            }
            UnitApplyTimedLifeBJ(10, this.timedLifeBuffId, summon);
        }
    }
}
