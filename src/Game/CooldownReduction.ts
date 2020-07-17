import { Trigger } from "../JassOverrides/Trigger";
import { GameGlobals } from "./GameGlobals";


export class CooldownReduction {
    public gameGlobals: GameGlobals;
    private readonly t: Trigger = new Trigger();

    constructor(gameGlobals: GameGlobals) {
        this.gameGlobals = gameGlobals;

        this.t.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_SPELL_ENDCAST);
        this.t.addAction(() => this.action());
    }

    private action(): void {
        const trig: unit = GetTriggerUnit();
        const cooldownReduction: number = this.gameGlobals.PlayerCooldownReduction[GetPlayerId(GetOwningPlayer(trig))];
        if (!(cooldownReduction > 0)) {
            return;
        }

        const abilityId: number = GetSpellAbilityId();
        const abilityLevel: number = GetUnitAbilityLevel(trig, abilityId) - 1;
        BlzSetUnitAbilityCooldown(trig, abilityId, abilityLevel, BlzGetAbilityCooldown(abilityId, abilityLevel) * (1 - Math.min(cooldownReduction, 0.4)));
    }
}