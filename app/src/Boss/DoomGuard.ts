import { Boss } from './Boss';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';
import { GroupInRange } from '../JassOverrides/GroupInRange';

export class DoomGuard extends Boss {
    protected readonly bossId: number = FourCC('n026');
    protected readonly x: number = 13660.0;
    protected readonly y: number = -6942.0;
    protected readonly angle: number = 270.0;
    private readonly invulnerableAbilityId: number = FourCC('Avul');
    private readonly spiritTowerPosX: number[] = [13030.0, 13180.0, 13670.0, 14145.0, 14310.0, 14145.0, 13670.0, 13180.0];
    private readonly spiritTowerPosY: number[] = [-6930.0, -6480.0, -6290.0, -6480.0, -6930.0, -7380.0, -7580.0, -7380.0];
    private readonly spiritTowerUnitId: number = FourCC('u003');
    private readonly spiritTowers: number[] = [];
    private aliveSpiritTowers: number = 0;
    private readonly acolytePosX: number[] = [13175.0, 13290.0, 13670.0, 14030.0, 14170.0, 14074.0, 13670.0, 13290.0];
    private readonly acolytePosY: number[] = [-6950.0, -7280.0, -7448.0, -7295.0, -6944.0, -6615.0, -6440.0, -6587.0];
    private readonly acolyteUnitId: number = FourCC('u002');
    private readonly acolytes: number[] = [];
    private aliveAcolytes: number = 0;
    private readonly timerUtils: TimerUtils;

    constructor(timerUtils: TimerUtils) {
        super(Rect(13600, -7008, 13728, -6880));

        this.timerUtils = timerUtils;

        for (let i: number = 0; i < 8; i++) {
            const spiritTower: unit = CreateUnit(
                Player(PLAYER_NEUTRAL_AGGRESSIVE),
                this.spiritTowerUnitId,
                this.spiritTowerPosX[i],
                this.spiritTowerPosY[i],
                0.0,
            );
            this.spiritTowers[i] = GetHandleId(spiritTower);
            UnitAddAbility(spiritTower, this.invulnerableAbilityId);
            BlzPauseUnitEx(spiritTower, true);
        }
    }

    protected spawnCondition(): boolean {
        if (!IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO)) {
            return false;
        }

        if (this.aliveAcolytes !== 0) {
            return false;
        }

        if (this.aliveSpiritTowers !== 0) {
            return false;
        }

        return this.bossHandleId === undefined;
    }

    protected spawnAction(): void {
        const boss: unit = CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE), this.bossId, this.x, this.y, this.angle);
        this.bossHandleId = GetHandleId(boss);

        UnitAddAbility(boss, this.invulnerableAbilityId);
        BlzPauseUnitEx(boss, true);
        SetUnitState(boss, UNIT_STATE_LIFE, 1);

        this.aliveAcolytes = 8;
        for (let i: number = 0; i < 8; i++) {
            const acolyte: unit = CreateUnit(
                Player(PLAYER_NEUTRAL_AGGRESSIVE),
                this.acolyteUnitId,
                this.acolytePosX[i],
                this.acolytePosY[i],
                i * 45,
            );
            this.acolytes[i] = GetHandleId(acolyte);

            IssueImmediateOrder(acolyte, 'channel');
            BlzPauseUnitEx(acolyte, true);
        }

        this.aliveSpiritTowers = 8;
        const loc: location = Location(this.x, this.y);
        const grp: GroupInRange = new GroupInRange(1500, loc);
        grp.for((u: unit) => {
            if (GetUnitTypeId(u) === this.spiritTowerUnitId) {
                UnitRemoveAbility(u, this.invulnerableAbilityId);
                BlzPauseUnitEx(u, false);
            }
        });

        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            const currentLife: number = GetUnitState(boss, UNIT_STATE_LIFE);
            SetUnitState(boss, UNIT_STATE_LIFE, currentLife + 25 * this.aliveAcolytes);

            if (this.aliveAcolytes === 0 || currentLife + 25 * this.aliveAcolytes >= BlzGetUnitMaxHP(boss)) {
                UnitRemoveAbility(boss, this.invulnerableAbilityId);
                BlzPauseUnitEx(boss, false);
                this.timerUtils.releaseTimer(t);
            }
        });
    }

    protected deathCondition(): boolean {
        return true;
    }

    private arrayIncludes(arr: number[], numb: number): boolean {
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i] === numb) {
                return true;
            }
        }

        return false;
    }

    protected deathAction(): void {
        const dyingUnitHandleId: number = GetHandleId(GetTriggerUnit());
        if (dyingUnitHandleId === this.bossHandleId) {
            this.bossHandleId = undefined;

            if (this.lootItemId === undefined) {
                return;
            }

            CreateItem(this.lootItemId, GetUnitX(GetDyingUnit()), GetUnitY(GetDyingUnit()));
        } else if (this.arrayIncludes(this.acolytes, dyingUnitHandleId)) {
            this.aliveAcolytes--;
        } else if (this.arrayIncludes(this.spiritTowers, dyingUnitHandleId)) {
            this.aliveSpiritTowers--;

            const i: number = this.spiritTowers.findIndex((tower: number) => tower === dyingUnitHandleId);
            const spiritTower: unit = CreateUnit(
                Player(PLAYER_NEUTRAL_AGGRESSIVE),
                this.spiritTowerUnitId,
                this.spiritTowerPosX[i],
                this.spiritTowerPosY[i],
                0.0,
            );
            this.spiritTowers[i] = GetHandleId(spiritTower);
            UnitAddAbility(spiritTower, this.invulnerableAbilityId);
            BlzPauseUnitEx(spiritTower, true);
        }
    }
}
