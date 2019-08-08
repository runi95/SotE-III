import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class CreepRespawn {
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.trig.AddCondition(() => {
            if (GetOwningPlayer(GetTriggerUnit()) !== Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
                return false;
            }

            return !IsUnitType(GetTriggerUnit(), UNIT_TYPE_ANCIENT);
        });

        this.trig.AddAction(() => {
            const userData: number = GetUnitUserData(GetTriggerUnit());
            const unitTypeId: number = GetUnitTypeId(GetTriggerUnit());
            RemoveUnit(GetTriggerUnit());
            SetUnitUserData(CreateUnit(Player(PLAYER_NEUTRAL_AGGRESSIVE),
                                       unitTypeId,
                                       gameGlobals.CreepSpawnPoint[userData].x,
                                       gameGlobals.CreepSpawnPoint[userData].y,
                                       gameGlobals.CreepSpawnAngle[userData]),
                            userData);
        });

        this.trig.RegisterAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }
}
