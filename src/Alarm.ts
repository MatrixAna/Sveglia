// il delay (tempo per suonare la sveglia )
export function getTimeoutDelay(dueDate: Date): number {
  return Math.round((dueDate.getTime() - Date.now()) / 1000); // data stimata per la sveglia - la data di adesso = tempo che deve intercorrere
}
//creato il tipo AlarmDelegate per poter utilizzare senza dover riscrivere ogni volta tutti paramentri
export type AlarmDelegate = (
  stop: () => void,
  snooze: (delay: number) => void
) => void;

export class Alarm {
  private _delegate: AlarmDelegate;
  private _timeout?: ReturnType<typeof setTimeout>; // restituisce il tipo del timeout qualsiasi esso sia

  public constructor(delegate: AlarmDelegate, dueDate: Date) {
    const delay = getTimeoutDelay(dueDate);
    this._delegate = delegate;
    this._schedule(delay); //esegue la funzione delegate dopo il tempo delay
  }

  public stop() {
    clearTimeout(this._timeout);
    delete this._timeout;
    // this._timeout = undefined; // sarebbe equivalente alla delete
  }
  public snooze(delay: number) {
    this._schedule(delay); //reimposta il timeout
  }
  // permette di accedere ai metodi stop e snooze
  private _schedule(delay: number) {
    this._timeout = setTimeout(
      () =>
        this._delegate(
          () => this.stop(),
          (a) => this.snooze(a)
        ),
      delay
    );
  }
}
