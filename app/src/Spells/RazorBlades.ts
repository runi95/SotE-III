import { TimerUtils } from '../Utility/TimerUtils';
import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class RazorBlades {
    private readonly dummyUnitId: number = FourCC('n016');
    private readonly defenseSystemAbilityId: number = FourCC('A02A');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_ISSUED_ORDER);
    }

    private condition(): boolean {
        return GetIssuedOrderIdBJ() === String2OrderIdBJ('defend');
    }

    private action(): void {
        const mana: number = GetUnitStateSwap(UNIT_STATE_MANA, GetTriggerUnit());
        let intelligence: number = GetHeroInt(GetTriggerUnit(), true);

        if (mana > intelligence) {
            const trig: unit = GetTriggerUnit();
            const playerId: number = GetPlayerId(GetOwningPlayer(trig));
            const x: number = GetUnitX(trig);
            const y: number = GetUnitY(trig);
            let aoe: number = 50.00;
            const bladeOne: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId,
                                              x + 150.00 * CosBJ(0.00), y + 150.00 * SinBJ(0.00), 0);
            const bladeTwo: unit = CreateUnit(GetOwningPlayer(trig), this.dummyUnitId,
                                              x + 150.00 * CosBJ(180.00), y + 150.00 * SinBJ(180.00), 0);

            if (GetUnitAbilityLevelSwapped(this.defenseSystemAbilityId, trig) > 0) {
                aoe = 100.00;
                SetUnitScalePercent(bladeOne, 150, 150, 150);
                SetUnitScalePercent(bladeTwo, 150, 150, 150);
            }

            this.gameGlobals.RazorBladesOn[playerId] = true;

            let ticker: number = 0;
            let tickerOne: number = 0;
            let tickerTwo: number = 180;
            const t: Timer = this.timerUtils.newTimer();
            t.start(0.05, true, () => {
                SetUnitPosition(bladeOne, GetUnitX(trig) + 150.00 * CosBJ(tickerOne), GetUnitY(trig) + 150.00 * SinBJ(tickerOne));
                SetUnitPosition(bladeTwo, GetUnitX(trig) + 150.00 * CosBJ(tickerTwo), GetUnitY(trig) + 150.00 * SinBJ(tickerTwo));

                ticker += 1;
                tickerOne += 10;
                tickerTwo += 10;

                this.dealBladeDamage(trig, bladeOne, aoe);
                this.dealBladeDamage(trig, bladeTwo, aoe);

                if (ticker > 4) {
                    ticker = 0;
                    intelligence = GetHeroInt(trig, true);
                    SetUnitManaBJ(trig, GetUnitStateSwap(UNIT_STATE_MANA, trig) - intelligence);
                    if (GetUnitStateSwap(UNIT_STATE_MANA, trig) === 0) {
                        this.gameGlobals.RazorBladesOn[playerId] = false;
                    }
                }

                if (tickerOne > 359) {
                    tickerOne = 0;
                }

                if (tickerTwo > 359) {
                    tickerTwo = 0;
                }

                if (!this.gameGlobals.RazorBladesOn[playerId]) {
                    IssueImmediateOrderBJ(trig, 'undefend');
                    RemoveUnit(bladeOne);
                    RemoveUnit(bladeTwo);
                    this.timerUtils.releaseTimer(t);
                }
            });
        } else {
            const txt: texttag = CreateTextTag();
            SetTextTagPos(txt, GetUnitX(GetTriggerUnit()), GetUnitY(GetTriggerUnit()), 1);
            SetTextTagColor(txt, 255, 0, 0, 255);
            SetTextTagPermanentBJ(txt, false);
            SetTextTagLifespanBJ(txt, 2.00);
            SetTextTagVelocityBJ(txt, 128, 90);
            SetTextTagTextBJ(txt, 'Insufficient mana', 10);
        }
    }

    private dealBladeDamage(trig: unit, blade: unit, aoe: number): void {
        const loc: location = GetUnitLoc(blade);
        const grp: GroupInRange = new GroupInRange(aoe, loc);

        grp.for((u: unit) => {
            if (IsUnitEnemy(u, GetOwningPlayer(trig)) && UnitAlive(u)) {
                DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Other\\Stampede\\StampedeMissileDeath.mdl',
                                               GetUnitX(u), GetUnitY(u)));
                UnitDamageTargetBJ(trig, u, 20, ATTACK_TYPE_NORMAL, DAMAGE_TYPE_NORMAL);
            }
        });

        RemoveLocation(loc);
        grp.destroy();
    }
}
