import { Trigger } from '../JassOverrides/Trigger';
import { DamageEngineGlobals } from './DamageEngineGlobals';
import * as settings from '../Game/GameSettings';
import { DamageEvent } from './DamageEvent';

/**
 * Damage Engine 5.3.0.1
 */
export class DamageEngine {
    /**
     * Damage Event Arrays
     */
    private initialDamageEvents: DamageEvent[] = [];
    private zeroDamageEvents: DamageEvent[] = [];
    private damageEventAOEEvents: DamageEvent[] = [];
    private damageEventLethalEvents: DamageEvent[] = [];
    private initialDamageModificationEvents: DamageEvent[] = [];
    private multiplicativeDamageModificationEvents: DamageEvent[] = [];
    private preFinalDamageModificationEvents: DamageEvent[] = [];
    private finalDamageModificationEvents: DamageEvent[] = [];
    private afterDamageEvents: DamageEvent[] = [];

    /**
     * Damage Engine Variables
     */
    private started: boolean = false;
    private finished: boolean = false;
    private recursion: number = -1;
    private recursive: boolean = false;
    private purge: boolean = false;
    private preDamage: boolean = false;
    private holdClear: boolean = false;
    private ticker: timer = CreateTimer();
    private trig: Trigger = new Trigger();
    private otrg: Trigger = new Trigger();

    private previousAmount: number = 0.00;  // Added to track the original modified damage pre-spirit Link
    private previousValue: number = 0.00;   // Added to track the original pure damage amount of Spirit Link
    private previousType: number = 0;       // Track the type
    private previousCode: boolean = false;  // Was it caused by a trigger/script?
    private previousPierce: number = 0.00;
    private armorType: number = 0;
    private previousArmor: number = 0;
    private prevPreArmor: number = 0;
    private defenseType: number = 0;
    private previousDefense: number = 0;
    private prevPreDefense: number = 0;

    private lastSource: unit[] = [];
    private lastTarget: unit[] = [];
    private lastAmount: number[] = [];
    private lastAttackT: attacktype[] = [];
    private lastDamageT: damagetype[] = [];
    private lastWeaponT: weapontype[] = [];
    private lastTrig: trigger[] = [];
    private lastType: number[] = [];

    private readonly damageEngineGlobals: DamageEngineGlobals;

    constructor(damageEngineGlobals: DamageEngineGlobals) {
        this.damageEngineGlobals = damageEngineGlobals;
        this.otrg.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DAMAGED);
        this.otrg.addFilterFuncCondition(Filter(() => this.OnDamage()));

        this.trig.registerAnyUnitEventBJ(EVENT_PLAYER_UNIT_DAMAGING);
        this.trig.addFilterFuncCondition(Filter(() => this.OnPreDamage()));
    }

    /**
     * Adds an event that triggers right before a unit takes damage
     *  - Do not change the damage in any way during these events!
     */
    public addInitialDamageEvent(event: DamageEvent): void {
        this.initialDamageEvents.push(event);
    }

    /**
     * Adds an event that triggers right after a unit has taken 0 damage
     */
    public addZeroDamageEvent(event: DamageEvent): void {
        this.zeroDamageEvents.push(event);
    }

    /**
     * Add an event that adds or subtracts damage before it has been applied
     */
    public addInitialDamageModificationEvent(event: DamageEvent): void {
        this.initialDamageModificationEvents.push(event);
    }

    /**
     * Add an event that multiplies or subtracts damage before it has been applied
     */
    public addMultiplicativeDamageModificationEvent(event: DamageEvent): void {
        this.multiplicativeDamageModificationEvents.push(event);
    }

    /**
     * Adds an event that triggers right before armor and resistance has been factored in
     */
    public addPreFinalDamageModificationEvent(event: DamageEvent): void {
        this.preFinalDamageModificationEvents.push(event);
    }

    /**
     * Adds an event that triggers right before a unit takes lethal damage
     */
    public addLethalDamageEvent(event: DamageEvent): void {
        this.damageEventLethalEvents.push(event);
    }

    /**
     * Adds an event that triggers immediately once more than 1 unit has taken
     * damage from the same source
     */
    public addAOEDamageEvent(event: DamageEvent): void {
        this.damageEventAOEEvents.push(event);
    }

    /**
     * Adds an event that triggers after all other damage modifiers
     * have been factored in (even armor and resistance)
     */
    public addFinalDamageModificationEvent(event: DamageEvent): void {
        this.finalDamageModificationEvents.push(event);
    }

    /**
     * Adds an event that triggers after damage has been applied
     * to the target
     */
    public addAfterDamageEvent(event: DamageEvent): void {
        this.afterDamageEvents.push(event);
    }

    private initialDamageEvent(): void {
        this.initialDamageEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private zeroDamageEvent(): void {
        this.zeroDamageEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private damageEventAOE(): void {
        this.damageEventAOEEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private damageEventLethal(): void {
        this.damageEventLethalEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private initialDamageModificationEvent(): void {
        this.initialDamageModificationEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private multiplicativeDamageModificationEvent(): void {
        this.multiplicativeDamageModificationEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private preFinalDamageModificationEvent(): void {
        this.preFinalDamageModificationEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private finalDamageModificationEvent(): void {
        this.finalDamageModificationEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private afterDamageEvent(): void {
        this.afterDamageEvents.forEach(damageEvent => damageEvent.event(this.damageEngineGlobals));
    }

    private Error(): void {
        let s: string = 'WARNING: Recursion error when dealing damage! ';
        s += 'Prior to dealing damage from within a DamageEvent response trigger, do this:\n';
        s += 'Set DamageEventTrigger = (This Trigger)\n';
        s += 'Unit - Cause <Source> to damage <Target>...\n\n';
        s += 'Alternatively, just use the UNKNOWN damage type. It will skip recursive damage on its own without needing the "Set" line:/n';
        s += 'Unit - Cause <Source> to damage <Target>, dealing <Amount> damage of attack type <Attack Type> and damage type Unknown';

        ClearTextMessages();
        DisplayTimedTextToPlayer(GetLocalPlayer(), 0.00, 0.00, 999.00, s);
    }

    private OnAOEEnd(): void {
        if (this.damageEngineGlobals.DamageEventAOE > 1) {
            this.damageEventAOE();
            this.damageEngineGlobals.DamageEventAOE = 1;
        }

        this.damageEngineGlobals.DamageEventLevel = 1;
        this.damageEngineGlobals.EnhancedDamageTarget = undefined;
        this.damageEngineGlobals.AOEDamageSource = undefined;
        GroupClear(<group>this.damageEngineGlobals.DamageEventAOEGroup);
    }

    private Finish(): void {
        let i: number = -1;
        if (this.finished) {
            this.finished = false;
            if (this.damageEngineGlobals.DamageEventPrevAmt !== 0.00
                && this.damageEngineGlobals.DamageEventDamageT !== settings.DAMAGE_TYPE_UNKNOWN) {
                this.recursive = true;
                this.afterDamageEvent();
                this.recursive = false;
            }

            if (this.recursion > -1 && !this.holdClear && !this.purge) {
                this.purge = true;
                for (; i >= this.recursion;) {
                    i = i + 1;

                    this.damageEngineGlobals.NextDamageType = this.lastType[i];
                    if (this.lastTrig[i] !== undefined) {
                        DisableTrigger(this.lastTrig[i]);
                    }

                    UnitDamageTarget(this.lastSource[i], this.lastTarget[i], this.lastAmount[i],
                                     true, false, this.lastAttackT[i], this.lastDamageT[i], this.lastWeaponT[i]);
                    this.Finish();
                }
                for (; i <= -1; i--) {
                    if (this.lastTrig[i] !== undefined) {
                        EnableTrigger(this.lastTrig[i]);
                    }
                }

                this.recursion = -1;
                this.purge = false;
            }
        }
    }

    private OnExpire(): void {
        this.started = false;
        this.Finish();
        this.OnAOEEnd();
    }

    private CalibrateMR(): void {
        this.damageEngineGlobals.IsDamageMelee = false;
        this.damageEngineGlobals.IsDamageRanged = false;
        this.damageEngineGlobals.IsDamageSpell = this.damageEngineGlobals.DamageEventAttackT === 0;
        if (this.damageEngineGlobals.DamageEventDamageT === settings.DAMAGE_TYPE_NORMAL &&
            !this.damageEngineGlobals.IsDamageSpell) {
            this.damageEngineGlobals.IsDamageMelee = IsUnitType(
                <unit>this.damageEngineGlobals.DamageEventSource, UNIT_TYPE_MELEE_ATTACKER);
            this.damageEngineGlobals.IsDamageRanged = IsUnitType(
                <unit>this.damageEngineGlobals.DamageEventSource, UNIT_TYPE_RANGED_ATTACKER);
            if (this.damageEngineGlobals.IsDamageMelee && this.damageEngineGlobals.IsDamageRanged) {
                this.damageEngineGlobals.IsDamageMelee = this.damageEngineGlobals.DamageEventWeaponT > 0;
                this.damageEngineGlobals.IsDamageRanged = !this.damageEngineGlobals.IsDamageMelee;
            }
        }
    }

    private OnPreDamage(): boolean {
        const src: unit = GetEventDamageSource();
        const tgt: unit = BlzGetEventDamageTarget();
        const amt: number = GetEventDamage();
        const at: attacktype = BlzGetEventAttackType();
        const dt: damagetype = BlzGetEventDamageType();
        const wt: weapontype = BlzGetEventWeaponType();
        this.Finish();
        if (this.damageEngineGlobals.NextDamageType === 0 &&
            (this.damageEngineGlobals.DamageEventTrigger !== undefined || this.recursive)) {
            this.damageEngineGlobals.NextDamageType = this.damageEngineGlobals.DamageTypeCode;
        }

        if (this.recursive) {
            if (amt !== 0.00) {
                if (this.recursion < 512) {
                    this.recursion = this.recursion + 1;

                    this.lastAmount[this.recursion] = amt;
                    this.lastSource[this.recursion] = src;
                    this.lastTarget[this.recursion] = tgt;
                    this.lastAttackT[this.recursion] = at;
                    this.lastDamageT[this.recursion] = dt;
                    this.lastWeaponT[this.recursion] = wt;
                    this.lastTrig[this.recursion] = <trigger>this.damageEngineGlobals.DamageEventTrigger;
                    this.lastType[this.recursion] = this.damageEngineGlobals.NextDamageType;
                } else {
                    this.Error();
                }
            }
            this.damageEngineGlobals.NextDamageType = 0;
            this.damageEngineGlobals.DamageEventTrigger = undefined;
            BlzSetEventDamage(0.00);
        } else {
            if (!this.purge) {
                if (this.started) {
                    if (src !== this.damageEngineGlobals.AOEDamageSource) {
                        this.OnAOEEnd();
                        this.damageEngineGlobals.AOEDamageSource = src;
                    } else if (tgt === this.damageEngineGlobals.EnhancedDamageTarget) {
                        this.damageEngineGlobals.DamageEventLevel = this.damageEngineGlobals.DamageEventLevel + 1;
                    } else if (!IsUnitInGroup(tgt, <group>this.damageEngineGlobals.DamageEventAOEGroup)) {
                        this.damageEngineGlobals.DamageEventAOE = this.damageEngineGlobals.DamageEventAOE + 1;
                    }

                    if (this.preDamage) {
                        this.preDamage = false;
                        this.previousAmount = this.damageEngineGlobals.DamageEventAmount;
                        this.previousValue = this.damageEngineGlobals.DamageEventPrevAmt;
                        this.previousType = this.damageEngineGlobals.DamageEventType;
                        this.previousCode = this.damageEngineGlobals.IsDamageCode;
                        this.previousArmor = this.armorType;
                        this.previousDefense = this.damageEngineGlobals.DamageEventDefenseT;
                        this.prevPreDefense = this.defenseType;
                        this.previousPierce = this.damageEngineGlobals.DamageEventArmorPierced;
                        this.holdClear = true;
                    }
                } else {
                    TimerStart(this.ticker, 0.00, false, () => this.OnExpire());
                    this.started = true;
                    this.damageEngineGlobals.AOEDamageSource = src;
                    this.damageEngineGlobals.EnhancedDamageTarget = tgt;
                }

                GroupAddUnit(<group>this.damageEngineGlobals.DamageEventAOEGroup, tgt);
            }
            this.damageEngineGlobals.DamageEventType = this.damageEngineGlobals.NextDamageType;
            if (this.damageEngineGlobals.NextDamageType !== 0) {
                this.damageEngineGlobals.DamageEventType = this.damageEngineGlobals.NextDamageType;
                this.damageEngineGlobals.NextDamageType = 0;
                this.damageEngineGlobals.IsDamageCode = true;
                this.damageEngineGlobals.DamageEventTrigger = undefined;
            }
            this.damageEngineGlobals.DamageEventOverride = dt === undefined ||
                amt === 0.00 || this.damageEngineGlobals.DamageEventType * this.damageEngineGlobals.DamageEventType === 4;
            this.damageEngineGlobals.DamageEventPrevAmt = amt;
            this.damageEngineGlobals.DamageEventSource = src;
            this.damageEngineGlobals.DamageEventTarget = tgt;
            this.damageEngineGlobals.DamageEventAmount = amt;
            this.damageEngineGlobals.DamageEventAttackT = GetHandleId(at);
            this.damageEngineGlobals.DamageEventDamageT = GetHandleId(dt);
            this.damageEngineGlobals.DamageEventWeaponT = GetHandleId(wt);
            this.CalibrateMR();
            this.damageEngineGlobals.DamageEventArmorT = BlzGetUnitIntegerField(this.damageEngineGlobals.DamageEventTarget,
                                                                                UNIT_IF_ARMOR_TYPE);
            this.damageEngineGlobals.DamageEventDefenseT = BlzGetUnitIntegerField(this.damageEngineGlobals.DamageEventTarget,
                                                                                  UNIT_IF_DEFENSE_TYPE);
            this.armorType = this.damageEngineGlobals.DamageEventArmorT;
            this.defenseType = this.damageEngineGlobals.DamageEventDefenseT;
            this.damageEngineGlobals.DamageEventArmorPierced = 0.00;
            if (!this.damageEngineGlobals.DamageEventOverride) {
                this.recursive = true;
                this.initialDamageModificationEvent(); // DamageModifierEvent 1.00
                this.damageEngineGlobals.DamageEventOverride = this.damageEngineGlobals.DamageEventOverride ||
                    this.damageEngineGlobals.DamageEventType * this.damageEngineGlobals.DamageEventType === 4;
                if (!this.damageEngineGlobals.DamageEventOverride) {
                    this.multiplicativeDamageModificationEvent();
                    this.preFinalDamageModificationEvent();
                }
                this.recursive = false;

                BlzSetEventAttackType(ConvertAttackType(this.damageEngineGlobals.DamageEventAttackT));
                BlzSetEventDamageType(ConvertDamageType(this.damageEngineGlobals.DamageEventDamageT));
                BlzSetEventWeaponType(ConvertWeaponType(this.damageEngineGlobals.DamageEventWeaponT));
                if (this.damageEngineGlobals.DamageEventArmorPierced !== 0.00) {
                    BlzSetUnitArmor(this.damageEngineGlobals.DamageEventTarget,
                                    BlzGetUnitArmor(this.damageEngineGlobals.DamageEventTarget) -
                                        this.damageEngineGlobals.DamageEventArmorPierced);
                }
                if (this.armorType !== this.damageEngineGlobals.DamageEventArmorT) {
                    BlzSetUnitIntegerField(this.damageEngineGlobals.DamageEventTarget,
                                           UNIT_IF_ARMOR_TYPE, this.damageEngineGlobals.DamageEventArmorT);
                }
                if (this.defenseType !== this.damageEngineGlobals.DamageEventDefenseT) {
                    BlzSetUnitIntegerField(this.damageEngineGlobals.DamageEventTarget,
                                           UNIT_IF_DEFENSE_TYPE, this.damageEngineGlobals.DamageEventDefenseT);
                }

                BlzSetEventDamage(this.damageEngineGlobals.DamageEventAmount);
            }

            this.preDamage = true;
        }

        return false;
    }

    private OnDamage(): boolean {
        if (this.recursive) {
            return false;
        }


        if (this.preDamage) {
            this.preDamage = false;
        } else {
            this.Finish();
            this.holdClear = false;
            this.damageEngineGlobals.DamageEventAmount = this.previousAmount;
            this.damageEngineGlobals.DamageEventPrevAmt = this.previousValue;
            this.damageEngineGlobals.DamageEventType = this.previousType;
            this.damageEngineGlobals.IsDamageCode = this.previousCode;
            this.damageEngineGlobals.DamageEventSource = GetEventDamageSource();
            this.damageEngineGlobals.DamageEventTarget = BlzGetEventDamageTarget();
            this.damageEngineGlobals.DamageEventAttackT = GetHandleId(BlzGetEventAttackType());
            this.damageEngineGlobals.DamageEventDamageT = GetHandleId(BlzGetEventDamageType());
            this.damageEngineGlobals.DamageEventWeaponT = GetHandleId(BlzGetEventWeaponType());
            this.damageEngineGlobals.DamageEventArmorT = this.previousArmor;
            this.damageEngineGlobals.DamageEventDefenseT = this.previousDefense;
            this.damageEngineGlobals.DamageEventArmorPierced = this.previousPierce;
            this.armorType = this.prevPreArmor;
            this.defenseType = this.prevPreDefense;
            this.CalibrateMR();
        }

        if (this.damageEngineGlobals.DamageEventArmorPierced !== 0.00) {
            BlzSetUnitArmor(<unit>this.damageEngineGlobals.DamageEventTarget,
                            BlzGetUnitArmor(<unit>this.damageEngineGlobals.DamageEventTarget) +
                                this.damageEngineGlobals.DamageEventArmorPierced);
        }

        if (this.armorType !== this.damageEngineGlobals.DamageEventArmorT) {
            BlzSetUnitIntegerField(<unit>this.damageEngineGlobals.DamageEventTarget, UNIT_IF_ARMOR_TYPE, this.armorType);
        }

        if (this.defenseType !== this.damageEngineGlobals.DamageEventDefenseT) {
            BlzSetUnitIntegerField(<unit>this.damageEngineGlobals.DamageEventTarget, UNIT_IF_DEFENSE_TYPE, this.defenseType);
        }

        let r: number = GetEventDamage();
        this.recursive = true;
        if (this.damageEngineGlobals.DamageEventPrevAmt === 0.00) {
            this.zeroDamageEvent();
        } else {
            if (this.damageEngineGlobals.DamageEventAmount !== 0.00 && r !== 0.00) {
                this.damageEngineGlobals.DamageScalingWC3 = r / this.damageEngineGlobals.DamageEventAmount;
            } else if (this.damageEngineGlobals.DamageEventAmount > 0.00) {
                this.damageEngineGlobals.DamageScalingWC3 = 0.00;
            } else {
                this.damageEngineGlobals.DamageScalingWC3 = 1.00;
            }
            r = this.damageEngineGlobals.DamageEventAmount;
            this.damageEngineGlobals.DamageScalingUser = r / this.damageEngineGlobals.DamageEventPrevAmt;
            this.damageEngineGlobals.DamageEventAmount = r * this.damageEngineGlobals.DamageScalingWC3;

            if (this.damageEngineGlobals.DamageEventAmount > 0.00) {
                this.finalDamageModificationEvent(); // event 4.00

                this.damageEngineGlobals.LethalDamageHP = GetWidgetLife(<unit>this.damageEngineGlobals.DamageEventTarget) -
                    this.damageEngineGlobals.DamageEventAmount;
                if (this.damageEngineGlobals.LethalDamageHP <= 0.405) {
                    this.damageEventLethal();

                    this.damageEngineGlobals.DamageEventAmount = GetWidgetLife(<unit>this.damageEngineGlobals.DamageEventTarget) -
                        this.damageEngineGlobals.LethalDamageHP;
                    if (this.damageEngineGlobals.DamageEventType < 0 && this.damageEngineGlobals.LethalDamageHP <= 0.405) {
                        SetUnitExploded(<unit>this.damageEngineGlobals.DamageEventTarget, true);
                    }
                }
                this.damageEngineGlobals.DamageScalingUser = this.damageEngineGlobals.DamageEventAmount /
                    (this.damageEngineGlobals.DamageEventPrevAmt * this.damageEngineGlobals.DamageScalingWC3);
            }
            BlzSetEventDamage(this.damageEngineGlobals.DamageEventAmount);
            if (this.damageEngineGlobals.DamageEventDamageT !== settings.DAMAGE_TYPE_UNKNOWN) {
                this.initialDamageEvent(); // event 1.00
            }
        }

        this.recursive = false;
        this.finished = true;
        if (this.damageEngineGlobals.DamageEventAmount <= 0.00) {
            this.Finish();
        }
        return false;
    }



}
