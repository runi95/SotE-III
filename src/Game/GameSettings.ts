/**
 * DAMAGE ENGINE CONFIG
 *  - these are global constants that you can manually configure
 */

// Damage type classifications
export const DamageTypePureExplosive = -2;
export const DamageTypeExplosive = -1;
export const DamageTypeCode = 1;
export const DamageTypePure = 2;
export const DamageTypeHeal = 3;
export const DamageTypeBlocked = 4;
export const DamageTypeReduced = 5;
export const DamageTypeCriticalStrike = 6;

// Allows detection of Bash or Pulverize or AOE spread
export const DamageEventAOE = 1;
export const DamageEventLevel = 1;

// Attack types
export const ATTACK_TYPE_SPELLS = 0;
export const ATTACK_TYPE_NORMAL = 1;
export const ATTACK_TYPE_PIERCE = 2;
export const ATTACK_TYPE_SIEGE = 3;
export const ATTACK_TYPE_MAGIC = 4;
export const ATTACK_TYPE_CHAOS = 5;
export const ATTACK_TYPE_HERO = 6;

export const DAMAGE_TYPE_UNKNOWN = 0;
export const DAMAGE_TYPE_NORMAL = 4;
export const DAMAGE_TYPE_ENHANCED = 5;
export const DAMAGE_TYPE_FIRE = 8;
export const DAMAGE_TYPE_COLD = 9;
export const DAMAGE_TYPE_LIGHTNING = 10;
export const DAMAGE_TYPE_POISON = 11;
export const DAMAGE_TYPE_DISEASE = 12;
export const DAMAGE_TYPE_DIVINE = 13;
export const DAMAGE_TYPE_MAGIC = 14;
export const DAMAGE_TYPE_SONIC = 15;
export const DAMAGE_TYPE_ACID = 16;
export const DAMAGE_TYPE_FORCE = 17;
export const DAMAGE_TYPE_DEATH = 18;
export const DAMAGE_TYPE_MIND = 19;
export const DAMAGE_TYPE_PLANT = 20;
export const DAMAGE_TYPE_DEFENSIVE = 21;
export const DAMAGE_TYPE_DEMOLITION = 22;
export const DAMAGE_TYPE_SLOW_POISON = 23;
export const DAMAGE_TYPE_SPIRIT_LINK = 24;
export const DAMAGE_TYPE_SHADOW_STRIKE = 25;
export const DAMAGE_TYPE_UNIVERSAL = 26;

// Weapon sounds
// - Metal Light/Medium/Heavy -
export const WEAPON_TYPE_NONE = 0;
export const WEAPON_TYPE_ML_CHOP = 1;
export const WEAPON_TYPE_MM_CHOP = 2;
export const WEAPON_TYPE_MH_CHOP = 3;
export const WEAPON_TYPE_ML_SLICE = 4;
export const WEAPON_TYPE_MM_SLICE = 5;
export const WEAPON_TYPE_MH_SLICE = 6;
export const WEAPON_TYPE_MM_BASH = 7;
export const WEAPON_TYPE_MH_BASH = 8;
export const WEAPON_TYPE_MM_STAB = 9;
export const WEAPON_TYPE_MH_STAB = 10;

// - Wood Light/Medium/Heavy -
export const WEAPON_TYPE_WL_SLICE = 11;
export const WEAPON_TYPE_WM_SLICE = 12;
export const WEAPON_TYPE_WH_SLICE = 13;
export const WEAPON_TYPE_WL_BASH = 14;
export const WEAPON_TYPE_WM_BASH = 15;
export const WEAPON_TYPE_WH_BASH = 16;
export const WEAPON_TYPE_WL_STAB = 17;
export const WEAPON_TYPE_WM_STAB = 18;

// - Claw Light/Medium/Heavy -
export const WEAPON_TYPE_CL_SLICE = 19;
export const WEAPON_TYPE_CM_SLICE = 20;
export const WEAPON_TYPE_CH_SLICE = 21;

// - Axe Medium -
export const WEAPON_TYPE_AM_CHOP = 22;

// - Rock Heavy -
export const WEAPON_TYPE_RH_BASH = 23;

// Strings
export const AttackTypeDebugStr: string[] = ['SPELLS', 'NORMAL', 'PIERCE', 'SIEGE', 'MAGIC', 'CHAOS', 'HERO'];
export const DamageTypeDebugStr: (string | undefined)[] = [
    'UNKNOWN',
    undefined,
    undefined,
    undefined,
    'NORMAL',
    'ENHANCED',
    undefined,
    undefined,
    'FIRE',
    'COLD',
    'LIGHTNING',
    'POISON',
    'DISEASE',
    'DIVINE',
    'MAGIC',
    'SONIC',
    'ACID',
    'FORCE',
    'DEATH',
    'MIND',
    'PLANT',
    'DEFENSIVE',
    'DEMOLITION',
    'SLOW_POISON',
    'SPIRIT_LINK',
    'SHADOW_STRIKE',
    'UNIVERSAL',
];

export const WeaponTypeDebugStr: string[] = [
    'NONE',
    'METAL_LIGHT_CHOP',
    'METAL_MEDIUM_CHOP',
    'METAL_HEAVY_CHOP',
    'METAL_LIGHT_SLICE',
    'METAL_MEDIUM_SLICE',
    'METAL_HEAVY_SLICE',
    'METAL_MEDIUM_BASH',
    'METAL_HEAVY_BASH',
    'METAL_MEDIUM_STAB',
    'METAL_HEAVY_STAB',
    'WOOD_LIGHT_SLICE',
    'WOOD_MEDIUM_SLICE',
    'WOOD_HEAVY_SLICE',
    'WOOD_LIGHT_BASH',
    'WOOD_MEDIUM_BASH',
    'WOOD_HEAVY_BASH',
    'WOOD_LIGHT_STAB',
    'WOOD_MEDIUM_STAB',
    'CLAW_LIGHT_SLICE',
    'CLAW_MEDIUM_SLICE',
    'CLAW_HEAVY_SLICE',
    'AXE_MEDIUM_CHOP',
    'ROCK_HEAVY_BASH',
];
