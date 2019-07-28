/**
 * DAMAGE ENGINE CONFIG
 *  - these are global constants that you can manually configure
 */

// Damage type classifications
export const DamageTypePureExplosive: number = -2;
export const DamageTypeExplosive: number = -1;
export const DamageTypeCode: number = 1;
export const DamageTypePure: number = 2;
export const DamageTypeHeal: number = 3;
export const DamageTypeBlocked: number = 4;
export const DamageTypeReduced: number = 5;
export const DamageTypeCriticalStrike: number = 6;

// Allows detection of Bash or Pulverize or AOE spread
export const DamageEventAOE: number = 1;
export const DamageEventLevel: number = 1;

// Attack types
export const ATTACK_TYPE_SPELLS: number = 0;
export const ATTACK_TYPE_NORMAL: number = 1;
export const ATTACK_TYPE_PIERCE: number = 2;
export const ATTACK_TYPE_SIEGE: number = 3;
export const ATTACK_TYPE_MAGIC: number = 4;
export const ATTACK_TYPE_CHAOS: number = 5;
export const ATTACK_TYPE_HERO: number = 6;

export const DAMAGE_TYPE_UNKNOWN: number = 0;
export const DAMAGE_TYPE_NORMAL: number = 4;
export const DAMAGE_TYPE_ENHANCED: number = 5;
export const DAMAGE_TYPE_FIRE: number = 8;
export const DAMAGE_TYPE_COLD: number = 9;
export const DAMAGE_TYPE_LIGHTNING: number = 10;
export const DAMAGE_TYPE_POISON: number = 11;
export const DAMAGE_TYPE_DISEASE: number = 12;
export const DAMAGE_TYPE_DIVINE: number = 13;
export const DAMAGE_TYPE_MAGIC: number = 14;
export const DAMAGE_TYPE_SONIC: number = 15;
export const DAMAGE_TYPE_ACID: number = 16;
export const DAMAGE_TYPE_FORCE: number = 17;
export const DAMAGE_TYPE_DEATH: number = 18;
export const DAMAGE_TYPE_MIND: number = 19;
export const DAMAGE_TYPE_PLANT: number = 20;
export const DAMAGE_TYPE_DEFENSIVE: number = 21;
export const DAMAGE_TYPE_DEMOLITION: number = 22;
export const DAMAGE_TYPE_SLOW_POISON: number = 23;
export const DAMAGE_TYPE_SPIRIT_LINK: number = 24;
export const DAMAGE_TYPE_SHADOW_STRIKE: number = 25;
export const DAMAGE_TYPE_UNIVERSAL: number = 26;

// Weapon sounds
// - Metal Light/Medium/Heavy -
export const WEAPON_TYPE_NONE: number = 0;
export const WEAPON_TYPE_ML_CHOP: number = 1;
export const WEAPON_TYPE_MM_CHOP: number = 2;
export const WEAPON_TYPE_MH_CHOP: number = 3;
export const WEAPON_TYPE_ML_SLICE: number = 4;
export const WEAPON_TYPE_MM_SLICE: number = 5;
export const WEAPON_TYPE_MH_SLICE: number = 6;
export const WEAPON_TYPE_MM_BASH: number = 7;
export const WEAPON_TYPE_MH_BASH: number = 8;
export const WEAPON_TYPE_MM_STAB: number = 9;
export const WEAPON_TYPE_MH_STAB: number = 10;

// - Wood Light/Medium/Heavy -
export const WEAPON_TYPE_WL_SLICE: number = 11;
export const WEAPON_TYPE_WM_SLICE: number = 12;
export const WEAPON_TYPE_WH_SLICE: number = 13;
export const WEAPON_TYPE_WL_BASH: number = 14;
export const WEAPON_TYPE_WM_BASH: number = 15;
export const WEAPON_TYPE_WH_BASH: number = 16;
export const WEAPON_TYPE_WL_STAB: number = 17;
export const WEAPON_TYPE_WM_STAB: number = 18;

// - Claw Light/Medium/Heavy -
export const WEAPON_TYPE_CL_SLICE: number = 19;
export const WEAPON_TYPE_CM_SLICE: number = 20;
export const WEAPON_TYPE_CH_SLICE: number = 21;

// - Axe Medium -
export const WEAPON_TYPE_AM_CHOP: number = 22;

// - Rock Heavy -
export const WEAPON_TYPE_RH_BASH: number = 23;

// Strings
export const AttackTypeDebugStr = ['SPELLS', 'NORMAL', 'PIERCE', 'SIEGE', 'MAGIC', 'CHAOS', 'HERO'];
export const DamageTypeDebugStr = ['UNKNOWN', undefined, undefined, undefined, 'NORMAL', 'ENHANCED', undefined, undefined, 'FIRE', 'COLD', 'LIGHTNING', 'POISON', 'DISEASE', 'DIVINE', 'MAGIC', 'SONIC', 'ACID', 'FORCE', 'DEATH', 'MIND', 'PLANT', 'DEFENSIVE', 'DEMOLITION', 'SLOW_POISON', 'SPIRIT_LINK', 'SHADOW_STRIKE', 'UNIVERSAL'];
export const WeaponTypeDebugStr = ['NONE', 'METAL_LIGHT_CHOP', 'METAL_MEDIUM_CHOP', 'METAL_HEAVY_CHOP', 'METAL_LIGHT_SLICE', 'METAL_MEDIUM_SLICE', 'METAL_HEAVY_SLICE', 'METAL_MEDIUM_BASH', 'METAL_HEAVY_BASH', 'METAL_MEDIUM_STAB', 'METAL_HEAVY_STAB', 'WOOD_LIGHT_SLICE', 'WOOD_MEDIUM_SLICE', 'WOOD_HEAVY_SLICE', 'WOOD_LIGHT_BASH', 'WOOD_MEDIUM_BASH', 'WOOD_HEAVY_BASH', 'WOOD_LIGHT_STAB', 'WOOD_MEDIUM_STAB', 'CLAW_LIGHT_SLICE', 'CLAW_MEDIUM_SLICE', 'CLAW_HEAVY_SLICE', 'AXE_MEDIUM_CHOP', 'ROCK_HEAVY_BASH'];
