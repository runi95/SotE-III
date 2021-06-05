export interface KnockbackUnit {
    knockbackTarget: unit;
    targetX: number;
    targetY: number;
    dist: number;
    vel: number;
    onWallHit: (() => boolean) | undefined;
    onKnockbackEnd: (() => void) | undefined;
}