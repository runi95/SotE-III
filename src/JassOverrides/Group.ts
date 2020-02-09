export class Group {
    protected readonly grp: group;

    constructor(grp: group) {
        this.grp = grp;
    }

    public for(exp: (u: unit) => void): void {
        let u: unit = FirstOfGroup(this.grp);
        while (u) {
            exp(u);
            GroupRemoveUnit(this.grp, u);
            u = FirstOfGroup(this.grp);
        }
    }

    public destroy(): void {
        DestroyGroup(this.grp);
    }
}
