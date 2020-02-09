import { ItemPickup } from '../ItemPickup';
import { TimerUtils } from '../../Utility/TimerUtils';
import { Timer } from '../../JassOverrides/Timer';
import { GameGlobals } from '../../Game/GameGlobals';

export class SnowyOwlPickup extends ItemPickup {
    protected readonly itemTypeId: number = FourCC('I02C');
    private readonly summonId: number = FourCC('n027');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected action(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.SnowyOwl[playerId]) {
            return;
        }

        if (GetTriggerUnit() !== this.gameGlobals.PlayerHero[playerId]) {
            return;
        }

        this.gameGlobals.SnowyOwl[playerId] = true;
        const summon: unit = CreateUnit(
            GetOwningPlayer(this.gameGlobals.PlayerHero[playerId]),
            this.summonId,
            GetUnitX(this.gameGlobals.PlayerHero[playerId]),
            GetUnitY(this.gameGlobals.PlayerHero[playerId]),
            bj_UNIT_FACING,
        );
        IssueTargetOrderBJ(summon, 'move', this.gameGlobals.PlayerHero[playerId]);
        const maxDistance: number = 600;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            const newX: number = GetUnitX(this.gameGlobals.PlayerHero[playerId]);
            const newY: number = GetUnitY(this.gameGlobals.PlayerHero[playerId]);
            const distance: number = Math.sqrt(Pow(GetUnitX(summon) - newX, 2) + Pow(GetUnitY(summon) - newY, 2));

            if (distance > maxDistance) {
                SetUnitPosition(summon, newX, newY);
                IssueTargetOrderBJ(summon, 'move', this.gameGlobals.PlayerHero[playerId]);
            }

            if (!this.gameGlobals.SnowyOwl[playerId]) {
                RemoveUnit(summon);
                for (let i: number = 0; i < 6; i++) {
                    const itemInSlot: item = UnitItemInSlotBJ(summon, i);
                    if (itemInSlot) {
                        SetItemCharges(
                            CreateItem(GetItemTypeId(itemInSlot), GetUnitX(summon), GetUnitY(summon)),
                            GetItemCharges(itemInSlot),
                        );
                    }
                }

                this.timerUtils.releaseTimer(t);
            }
        });
    }
}
