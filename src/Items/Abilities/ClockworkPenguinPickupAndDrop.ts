import { GameGlobals } from '../../Game/GameGlobals';
import { ItemPickupAndDrop } from '../ItemPickupAndDrop';
import { Timer } from '../../JassOverrides/Timer';
import { TimerUtils } from '../../Utility/TimerUtils';

export class ClockworkPenguinPickupAndDrop extends ItemPickupAndDrop {
    protected readonly itemTypeId: number = FourCC('I01N');
    private readonly summonId: number = FourCC('n020');
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils) {
        super();

        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
    }

    protected pickup(): void {
        const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
        if (this.gameGlobals.ClockworkPenguin[playerId]) {
            return;
        }

        if (GetTriggerUnit() !== this.gameGlobals.PlayerHero[playerId]) {
            return;
        }

        this.gameGlobals.ClockworkPenguin[playerId] = true;
        const summon: unit = CreateUnit(
            GetOwningPlayer(this.gameGlobals.PlayerHero[playerId]),
            this.summonId,
            GetUnitX(this.gameGlobals.PlayerHero[playerId]),
            GetUnitY(this.gameGlobals.PlayerHero[playerId]),
            bj_UNIT_FACING,
        );
        IssueTargetOrderBJ(summon, 'move', this.gameGlobals.PlayerHero[playerId]);
        const maxDistance = 600;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            const newX: number = GetUnitX(this.gameGlobals.PlayerHero[playerId]);
            const newY: number = GetUnitY(this.gameGlobals.PlayerHero[playerId]);
            const distance: number = Math.sqrt(Pow(GetUnitX(summon) - newX, 2) + Pow(GetUnitY(summon) - newY, 2));

            if (distance > maxDistance) {
                SetUnitPosition(summon, newX, newY);
                IssueTargetOrderBJ(summon, 'move', this.gameGlobals.PlayerHero[playerId]);
            }

            if (!this.gameGlobals.ClockworkPenguin[playerId]) {
                RemoveUnit(summon);
                for (let i = 0; i < 6; i++) {
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

    protected drop(): void {
        let playerHasPenguin = false;
        for (let i = 0; i < 6; i++) {
            const itemInSlot: item = UnitItemInSlot(GetTriggerUnit(), i);
            if (GetItemTypeId(itemInSlot) === this.itemTypeId && itemInSlot !== GetManipulatedItem()) {
                playerHasPenguin = true;
            }
        }

        if (!playerHasPenguin) {
            const playerId: number = GetPlayerId(GetOwningPlayer(GetTriggerUnit()));
            this.gameGlobals.ClockworkPenguin[playerId] = false;
        }
    }
}
