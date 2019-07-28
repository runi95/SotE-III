import { Spell } from './Spell';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class Frostfire extends Spell {
    protected abilityId: number = FourCC('A01C');
    private readonly unitTypeId: number = FourCC('n00G');
    private readonly dummyAbilityId: number = FourCC('Amrf');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super();

        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const x: number = GetUnitX(GetTriggerUnit());
        const y: number = GetUnitY(GetTriggerUnit());
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));

        let ticks: number = 20;
        const t: Timer = this.timerUtils.NewTimer();
        t.start(0.10, true, () => {
            ticks--;

            const randX: number = GetRandomReal(0, 600) - 300.0;
            const randY: number = y + GetRandomReal(0, 600) - 300.0;
            const dummy: unit = CreateUnit(Player(playerId), this.unitTypeId, randX, randY, bj_UNIT_FACING);
            UnitAddAbilityBJ(this.dummyAbilityId, dummy);
            UnitRemoveAbilityBJ(this.dummyAbilityId, dummy);
            UnitApplyTimedLifeBJ(10, this.timedLifeBuffId, dummy);
            SetUnitFlyHeightBJ(dummy, 10.00, 100.00);

            if (ticks <= 0) {
                this.timerUtils.ReleaseTimer(t);
            }
        });

        for (let i: number = 0; i < 20; i++) {
            TriggerSleepAction(GetRandomReal(0.10, 3));
        }
    }
}
