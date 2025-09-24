export default class EnergyManager {
    private _energies: number;

    constructor(start: number) { this._energies = start; }

    public get energies() { return this._energies; }
    private set energies(value: number) { this._energies = value; }

    public spend(amount: number) { this.energies -= amount; }

    public recover(amount: number) { this.energies += amount; }
}