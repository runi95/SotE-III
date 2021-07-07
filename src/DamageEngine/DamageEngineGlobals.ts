export class DamageEngineGlobals {
    /**
     * DAMAGE ENGINE GLOBALS
     *  - these are global variables used by the damage engine and damage event triggers
     */
    public DamageEventTrigger: trigger | undefined = undefined;

    public DamageEventOverride = false;
    public NextDamageType = 0;
    public DamageEventType = 0;
    public DamageTypeCode = 0;
    public IsDamageCode = false;
    public IsDamageSpell = false;
    public IsDamageMelee = false;
    public IsDamageRanged = false;

    public DamageEventSourceOwningPlayer: player | undefined = undefined;
    public DamageEventTargetOwningPlayer: player | undefined = undefined;
    public DamageEventSourceOwningPlayerId: number | undefined = undefined;
    public DamageEventTargetOwningPlayerId: number | undefined = undefined;
    public DamageEventSource: unit | undefined = undefined;
    public DamageEventTarget: unit | undefined = undefined;

    public DamageEventAOE = 0;
    public DamageEventAOEGroup: group | undefined = undefined;
    public AOEDamageSource: unit | undefined = undefined;
    public DamageEventLevel = 0;
    public EnhancedDamageTarget: unit | undefined = undefined;

    public PiercingOverflowAmount = 0;
    public DamageEventAmount = 0;
    public DamageEventPrevAmt = 0;
    public LethalDamageHP = 0;
    public DamageEventArmorPierced = 0;
    public DamageScalingWC3 = 0;
    public DamageScalingUser = 0;

    public DamageEventAttackT = 0;
    public DamageEventDamageT = 0;
    public DamageEventWeaponT = 0;
    public DamageEventArmorT = 0;
    public DamageEventDefenseT = 0;

    // Custom SotE variables
    public ExecuteDamage = 0;
    public NextDefensiveReduction = 0;
    public DamageEventDefenseReduction = 0;
}
