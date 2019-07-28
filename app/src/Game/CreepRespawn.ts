import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class CreepRespawn {
    private trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.trig.AddCondition(() => {
            if (GetOwningPlayer(GetTriggerUnit()) !== Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
                return false;
            }

            return !IsUnitType(GetTriggerUnit(), UNIT_TYPE_ANCIENT);
        });

        this.trig.AddAction(() => {
            const userData: number = GetUnitUserData(GetTriggerUnit());
            SetUnitUserData(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE),
                                       GetUnitTypeId(GetTriggerUnit()),
                                       gameGlobals.CreepSpawnPoint[userData].x,
                                       gameGlobals.CreepSpawnPoint[userData].y,
                                       gameGlobals.CreepSpawnAngle[userData]),
                            userData);
        });

        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }
}
