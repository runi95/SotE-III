import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from '../Game/GameGlobals';
import { Timer } from '../JassOverrides/Timer';
import { StunUtils } from './StunUtils';
import { TimerUtils } from './TimerUtils';
import { RandomNumberGenerator } from './RandomNumberGenerator';
import { VenomUtils } from './VenomUtils';

export class ArenaUtils {
    private readonly gameGlobals: GameGlobals;
    private readonly timerUtils: TimerUtils;
    private readonly stunUtils: StunUtils;
    private readonly venomUtils: VenomUtils;
    private readonly randomNumberGenerator: RandomNumberGenerator;
    private readonly arenaGate: destructable;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals, timerUtils: TimerUtils, stunUtils: StunUtils, venomUtils: VenomUtils, randomNumberGenerator: RandomNumberGenerator) {
        this.gameGlobals = gameGlobals;
        this.timerUtils = timerUtils;
        this.stunUtils = stunUtils;
        this.venomUtils = venomUtils;
        this.randomNumberGenerator = randomNumberGenerator;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);

        this.arenaGate = CreateDestructable(FourCC('ATg1'), 2944, 5632, 0, 1, 0);
        ModifyGateBJ(bj_GATEOPERATION_OPEN, this.arenaGate);
    }

    private condition(): boolean {
        return this.gameGlobals.IsArenaBattleInProgress && IsUnitType(GetDyingUnit(), UNIT_TYPE_HERO);
    }

    private action(): void {
        const alivePlayers: number[] = [];
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (this.gameGlobals.PlayerHero[i] !== undefined && UnitAlive(this.gameGlobals.PlayerHero[i])) {
                alivePlayers.push(i);
            }
        }

        let allAlivePlayersAreAllies: boolean = true;
        for (let i: number = 0; i < alivePlayers.length; i++) {
            if (
                !alivePlayers.every(
                    (alivePlayer) =>
                        alivePlayer === i ||
                        (IsPlayerAlly(Player(alivePlayers[i]), Player(alivePlayer)) &&
                            IsPlayerAlly(Player(alivePlayer), Player(alivePlayers[i]))),
                )
            ) {
                allAlivePlayersAreAllies = false;
            }
        }

        if (allAlivePlayersAreAllies) {
            BlzChangeMinimapTerrainTex('war3mapMap.blp');
            SetCameraBoundsToRect(GetCameraBoundsMapRect());
            ModifyGateBJ(bj_GATEOPERATION_OPEN, this.arenaGate);

            for (let i: number = 0; i < alivePlayers.length; i++) {
                DisplayTextToForce(
                    GetPlayersAll(),
                    // tslint:disable-next-line:max-line-length
                    `${this.gameGlobals.PlayerColorCodes[alivePlayers[i]]}${GetPlayerName(Player(alivePlayers[i]))}|r has won the arena!`,
                );
            }

            for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
                if (
                    this.gameGlobals.PlayerLives[i] !== undefined &&
                    this.gameGlobals.PlayerLives[i] > 0 &&
                    this.gameGlobals.PlayerHero[i] !== undefined &&
                    !UnitAlive(this.gameGlobals.PlayerHero[i])
                ) {
                    const x: number = GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[i]);
                    const y: number = GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[i]);
                    ReviveHero(this.gameGlobals.PlayerHero[i], x, y, true);
                    if (GetLocalPlayer() === Player(i)) {
                        SetCameraPositionForPlayer(Player(i), x, y);
                    }
                }
            }

            this.gameGlobals.IsArenaBattleInProgress = false;
            this.initiateFightCountdown();
        }
    }

    public initiateFight(): void {
        this.gameGlobals.IsArenaBattleInProgress = true;
        ModifyGateBJ(bj_GATEOPERATION_CLOSE, this.arenaGate);
        PlaySoundBJ(this.gameGlobals.ArenaStartedSound);

        // Respawn all dead heroes
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (
                this.gameGlobals.PlayerHero[i] !== undefined &&
                !UnitAlive(this.gameGlobals.PlayerHero[i]) &&
                this.gameGlobals.PlayerLives[i] > 0
            ) {
                ReviveHero(
                    this.gameGlobals.PlayerHero[i],
                    GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[i]),
                    GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[i]),
                    false,
                );
            }
        }

        this.stunUtils.clearAllStuns();
        this.venomUtils.clearAllVenom();

        // Make pause, make invulnerable, remove all buffs and heal heroes
        const teleportEffects: effect[] = [];
        for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
            if (this.gameGlobals.PlayerHero[i] !== undefined && this.gameGlobals.PlayerLives[i] > 0) {
                PauseUnit(this.gameGlobals.PlayerHero[i], true);
                SetUnitInvulnerable(this.gameGlobals.PlayerHero[i], true);
                UnitRemoveBuffs(this.gameGlobals.PlayerHero[i], true, true);
                SetUnitLifePercentBJ(this.gameGlobals.PlayerHero[i], 100);
                SetUnitManaPercentBJ(this.gameGlobals.PlayerHero[i], 100);
                teleportEffects.push(
                    AddSpecialEffect(
                        'Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl',
                        GetUnitX(this.gameGlobals.PlayerHero[i]),
                        GetUnitY(this.gameGlobals.PlayerHero[i]),
                    ),
                );
            }
        }

        let ticks: number = 10;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;

            if (ticks === 7) {
                for (let i: number = 0; i < teleportEffects.length; i++) {
                    DestroyEffect(teleportEffects[i]);
                }

                for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
                    if (this.gameGlobals.PlayerHero[i] !== undefined && this.gameGlobals.PlayerLives[i] > 0) {
                        const x: number = this.randomNumberGenerator.random(
                            GetRectMinX(this.gameGlobals.TheArenaRegion),
                            GetRectMaxX(this.gameGlobals.TheArenaRegion),
                        );
                        const y: number = this.randomNumberGenerator.random(
                            GetRectMinY(this.gameGlobals.TheArenaRegion),
                            GetRectMaxY(this.gameGlobals.TheArenaRegion),
                        );
                        SetUnitPosition(this.gameGlobals.PlayerHero[i], x, y);
                        DestroyEffect(AddSpecialEffect('Abilities\\Spells\\Human\\MassTeleport\\MassTeleportCaster.mdl', x, y));
                        SetCameraPositionForPlayer(Player(i), x, y);
                    }
                }

                BlzChangeMinimapTerrainTex('war3mapImported\\war3mapPreviewSmall.dds');
                SetCameraBoundsToRect(this.gameGlobals.TheArenaRegion);
            }

            if (ticks < 6 && ticks > 0) {
                PlaySoundBJ(this.gameGlobals.ArenaCountdownSound);
                for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
                    if (this.gameGlobals.PlayerHero[i] !== undefined && this.gameGlobals.PlayerLives[i] > 0) {
                        const tag: texttag = CreateTextTag();
                        SetTextTagText(tag, ticks.toString(), 0.048);
                        SetTextTagPos(tag, GetUnitX(this.gameGlobals.PlayerHero[i]), GetUnitY(this.gameGlobals.PlayerHero[i]), 16.0);
                        SetTextTagVelocity(tag, 0.0, 0.04);
                        SetTextTagFadepoint(tag, 0.5);
                        SetTextTagLifespan(tag, 1.0);
                        SetTextTagPermanent(tag, false);
                        if (GetLocalPlayer() === Player(i)) {
                            SetTextTagVisibility(tag, true);
                        }
                    }
                }
            }

            if (ticks <= 0) {
                PlaySoundBJ(this.gameGlobals.ArenaFightSound);
                for (let i: number = 0; i < bj_MAX_PLAYERS; i++) {
                    if (this.gameGlobals.PlayerHero[i] !== undefined && this.gameGlobals.PlayerLives[i] > 0) {
                        PauseUnit(this.gameGlobals.PlayerHero[i], false);
                        SetUnitInvulnerable(this.gameGlobals.PlayerHero[i], false);
                    }
                }

                this.timerUtils.releaseTimer(t);
            }
        });
    }

    public initiateFightCountdown(): void {
        let ticks: number = this.gameGlobals.GameSuddenDeathTime;
        const t: Timer = this.timerUtils.newTimer();
        t.start(1, true, () => {
            ticks--;
            MultiboardSetItemValueBJ(this.gameGlobals.Multiboard as multiboard, 2, 9, ticks.toString());

            if (ticks === 60) {
                DisplayTimedTextToForce(bj_FORCE_ALL_PLAYERS, 10, `Arena battle will start in |cffffcc001|r minute`);
                PlaySoundBJ(this.gameGlobals.ArenaOneMinuteSound);
            }

            if (ticks <= 0) {
                this.timerUtils.releaseTimer(t);
                this.initiateFight();
            }
        });
    }
}
