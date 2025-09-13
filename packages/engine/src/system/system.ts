import type Game from '../game';

export default abstract class System {
    private _game: Game;

    get game() { return this._game; }
    set game(game: Game) { this._game = game; }

    protected make() {
        console.log();
    }
}