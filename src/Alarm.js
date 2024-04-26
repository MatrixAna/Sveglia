// il delay (tempo per suonare la sveglia )
function getTimeoutDelay(dueDate) {
  return Math.round((dueDate.getTime() - Date.now()) / 1000); // data stimata per la sveglia - la data di adesso = tempo che deve intercorrere
}

class Alarm {
  constructor(delegate, dueDate) {
    const delay = getTimeoutDelay(dueDate);
    this._delegate = delegate;
    this._id = setTimeout(delegate, delay); //esegue la funzione delegate dopo il tempo delay
  }
  stop() {
    clearTimeout(this._id);
  }
  snooze(delay) {
    this._id = setTimeout(this._delegate, delay);
  }
  _schedule(delay) {
    this._id = setTimeout(
      () =>
        this._delegate(
          () => this.stop(),
          (delay) => this.snooze(delay)
        ),
      delay
    );
  }
}

module.exports = {
  Alarm,
  getTimeoutDelay,
};
