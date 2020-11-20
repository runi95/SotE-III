export class SpellCastUtils {
    private readonly fullVialItemId: number = FourCC('I016');

    public GetIntelligence(u: unit): number {
        const int: number = GetHeroInt(u, true);
        let bonuses: number = 0;

        const fullVial: item = GetItemOfTypeFromUnitBJ(u, this.fullVialItemId);
        if (fullVial !== undefined) {
            if (GetItemCharges(fullVial) === 60) {
                SetItemCharges(fullVial, 0);
                bonuses += 0.25 * int;
            }
        }

        return int + bonuses;
    }
}
