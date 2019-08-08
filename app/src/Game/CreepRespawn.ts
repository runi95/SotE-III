import { Trigger } from '../JassOverrides/Trigger';
import { GameGlobals } from './GameGlobals';

export class CreepRespawn {
    private readonly trig: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.trig.addCondition(() => {
            if (GetOwningPlayer(GetTriggerUnit()) !== Player(PLAYER_NEUTRAL_AGGRESSIVE)) {
                return false;
            }

            return !IsUnitType(GetTriggerUnit(), UNIT_TYPE_ANCIENT);
        });

        this.trig.addAction(() => {
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

        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DEATH);
    }
}
