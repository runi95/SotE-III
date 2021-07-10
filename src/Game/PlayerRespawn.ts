import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';
import { PlayerVictoryUtils } from '../Utility/PlayerVictoryUtils';
import { TimerUtils } from '../Utility/TimerUtils';
import { Timer } from '../JassOverrides/Timer';

export class PlayerRespawn {
    private readonly gameGlobals: GameGlobals;
    private readonly playerVictoryUtils: PlayerVictoryUtils;
    private readonly timerUtils: TimerUtils;
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals, playerVictoryUtils: PlayerVictoryUtils, timerUtils: TimerUtils) {
        this.gameGlobals = gameGlobals;
        this.playerVictoryUtils = playerVictoryUtils;
        this.timerUtils = timerUtils;

        this.trig.addCondition(() => this.condition());
        this.trig.addAction(() => this.action());
        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }

    private condition(): boolean {
        return IsUnitType(GetTriggerUnit(), UNIT_TYPE_HERO);
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const playerId: number = GetPlayerId(GetOwningPlayer(trig));
        const killingPlayerId: number = GetPlayerId(GetOwningPlayer(GetKillingUnit()));
        if (killingPlayerId >= 0 && killingPlayerId < bj_MAX_PLAYERS && IsPlayerEnemy(Player(playerId), Player(killingPlayerId))) {
            const dyingHeroLevel: number = GetHeroLevel(trig);
            // Min gold reward (level 1): 190
            // Max gold reward (level 30): 2400
            const goldReward: number = Math.floor((4000 * (dyingHeroLevel * 0.05)) / (1 + 0.05 * dyingHeroLevel));
            SetPlayerState(
                Player(killingPlayerId),
                PLAYER_STATE_RESOURCE_GOLD,
                GetPlayerState(Player(killingPlayerId), PLAYER_STATE_RESOURCE_GOLD) + goldReward,
            );

            const txt: texttag = CreateTextTag();
            SetTextTagText(txt, `${goldReward.toString()} gold`, 0.02);
            SetTextTagPos(txt, GetUnitX(trig), GetUnitY(trig), BlzGetUnitZ(trig));
            SetTextTagColor(txt, 255.0, 255.0, 0.0, 255.0);
            SetTextTagPermanent(txt, false);
            SetTextTagLifespan(txt, 2.0);
            SetTextTagVelocityBJ(txt, 64, 90);
        }

        DisplayTextToForce(
            GetPlayersAll(),
            // tslint:disable-next-line:max-line-length
            `${this.gameGlobals.PlayerColorCodes[playerId]}${GetPlayerName(Player(playerId))}|r has died!`,
        );
        this.gameGlobals.RazorBladesOn[playerId] = false;
        this.gameGlobals.PlayerLives[playerId] -= 1;
        if (this.gameGlobals.PlayerLives[playerId] > 0) {
            MultiboardSetItemValueBJ(
                this.gameGlobals.Multiboard as multiboard,
                2,
                2 + playerId,
                I2S(this.gameGlobals.PlayerLives[playerId]),
            );
            
            const t: Timer = this.timerUtils.newTimer();
            t.start(5, false, () => {
                if (!this.gameGlobals.IsArenaBattleInProgress) {
                    ReviveHero(
                        trig,
                        GetRectCenterX(this.gameGlobals.PlayerSpawnRegion[playerId]),
                        GetRectCenterY(this.gameGlobals.PlayerSpawnRegion[playerId]),
                        true,
                    );
                    SetUnitManaPercentBJ(trig, 100);
                }

                this.timerUtils.releaseTimer(t);
            });
        } else {
            this.playerVictoryUtils.defeatPlayer(playerId, 'has been defeated!');
        }
    }
}
