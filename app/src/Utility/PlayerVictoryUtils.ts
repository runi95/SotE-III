import { GameGlobals } from '../Game/GameGlobals';
import { Trigger } from '../JassOverrides/Trigger';

interface AlivePlayers {
    playerId: number;
    lives: number;
}

export class PlayerVictoryUtils {
    private readonly gameGlobals: GameGlobals;

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;
    }

    public defeatPlayer(playerId: number, messageSuffix: string): void {
        DisplayTextToForce(GetPlayersAll(),
                           `${this.gameGlobals.PlayerColorCodes[playerId]}${GetPlayerName(Player(playerId))}|r ${messageSuffix}`);
        CreateFogModifierRectBJ(true, Player(playerId), FOG_OF_WAR_VISIBLE, GetPlayableMapRect());
        if (this.gameGlobals.PlayerHero[playerId] !== undefined) {
            RemoveUnit(this.gameGlobals.PlayerHero[playerId]);
            this.gameGlobals.PlayerHero.splice(playerId, 1);
        }

        this.gameGlobals.PlayerLives[playerId] = 0;
        this.checkForLosersAndVictors();
    }

    public checkForLosersAndVictors(): void {
        const alivePlayers: AlivePlayers[] = [];
        const deadPlayers: number[] = [];
        for (let i: number = 0; i < this.gameGlobals.PlayerLives.length; i++) {
            if (this.gameGlobals.PlayerLives[i] > 0) {
                alivePlayers.push({ playerId: i, lives: this.gameGlobals.PlayerLives[i] });
            } else {
                deadPlayers.push(i);
            }
        }

        let allAlivePlayersAreAllies: boolean = true;
        for (let i: number = 0; i < alivePlayers.length; i++) {
            if (!alivePlayers.every(alivePlayer => alivePlayer.playerId === i || (IsPlayerAlly(Player(alivePlayers[i].playerId),
                                                                                               Player(alivePlayer.playerId))
                && IsPlayerAlly(Player(alivePlayer.playerId), Player(alivePlayers[i].playerId))))) {
                allAlivePlayersAreAllies = false;
            }
        }

        if (allAlivePlayersAreAllies) {
            EnableUserUI(false);

            alivePlayers.forEach((alivePlayer) => {
                const p: player = Player(alivePlayer.playerId);
                const trig: Trigger = new Trigger();
                const d: dialog = DialogCreate();

                DialogSetMessage(d, 'Victory!');

                trig.addAction(() => CustomVictoryOkBJ());
                trig.registerDialogButtonEvent(DialogAddButton(d, 'Quit Game', GetLocalizedHotkey('Q')));

                if (GetLocalPlayer() === p) {
                    EnableUserControl(true);
                }

                DialogDisplay(p, d, true);
                VolumeGroupSetVolumeForPlayerBJ(p, SOUND_VOLUMEGROUP_UI, 1.0);
                StartSoundForPlayerBJ(p, bj_victoryDialogSound);
            });

            deadPlayers.forEach((deadPlayer) => {
                const p: player = Player(deadPlayer);
                const trig: Trigger = new Trigger();
                const d: dialog = DialogCreate();

                DialogSetMessage(d, 'Defeat!');

                trig.addAction(() => CustomDefeatQuitBJ());
                trig.registerDialogButtonEvent(DialogAddButton(d, 'Quit Game', GetLocalizedHotkey('Q')));

                if (GetLocalPlayer() === p) {
                    EnableUserControl(true);
                }

                DialogDisplay(p, d, true);
                VolumeGroupSetVolumeForPlayerBJ(p, SOUND_VOLUMEGROUP_UI, 1.0);
                StartSoundForPlayerBJ(p, bj_defeatDialogSound);
            });
        }
    }
}
