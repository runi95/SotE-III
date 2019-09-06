import { DamageEvent } from '../DamageEngine/DamageEvent';
import { DamageEngineGlobals } from '../DamageEngine/DamageEngineGlobals';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class TheAegis implements DamageEvent {
    private readonly itemId: number = FourCC('I014');
    private readonly dummyUnitTypeId: number = FourCC('n001');
    private readonly dummyAbilityId: number = FourCC('A02N');
    private readonly timedLifeBuffId: number = FourCC('BTLF');
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        this.timerUtils = timerUtils;
    }

    public event(globals: DamageEngineGlobals): void {
        const trig: unit = globals.DamageEventTarget as unit;

        if (!UnitHasItemOfTypeBJ(trig, this.itemId)) {
            return;
        }

        const theAegis: item = GetItemOfTypeFromUnitBJ(trig, this.itemId);

        if (GetItemCharges(theAegis) < 100) {
            return;
        }

        SetItemCharges(theAegis, 1);
        const dummy: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitTypeId, GetUnitX(trig), GetUnitY(trig), bj_UNIT_FACING);
        UnitAddAbility(dummy, this.dummyAbilityId);
        IssueTargetOrder(dummy, 'lightningshield', trig);
        UnitApplyTimedLifeBJ(3, this.timedLifeBuffId, dummy);

        let ticks: number = 100;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            SetItemCharges(theAegis, 100 - ticks);

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
