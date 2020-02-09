export class RandomNumberGenerator {
    private readonly a: number = 1103515245;
    private readonly c: number = 12345;
    private seed: number = 1;

    public setSeed(seed: number): void {
        // tslint:disable-next-line:no-bitwise
        this.seed = seed & 0x7fffffff;
    }

    public next(): number {
        // tslint:disable-next-line:no-bitwise
        this.seed = (this.seed * this.a + this.c) & 0x7fffffff;
        return this.seed;
    }

    public random(min: number, max: number): number {
        if (min > max) {
            error(`min can't be greater than max`);
            return -1;
        }

        return ModuloInteger(this.next(), max + 1 - min) + min;
    }
}
