const { Alarm, getTimeoutDelay } = require("../src/Alarm");
/* Una nuova data per la sveglia */
function getDueDate(milliseconds) {
  const dueDate = new Date(); // creazione di un' oggetto data
  dueDate.setSeconds(dueDate.getSeconds() + milliseconds); // aggiungo 1000 sec nella data
  return dueDate; // restituisce la data
}

// primo test
describe("Metodi di utils", () => {
  describe("getTimeoutDelay", () => {
    test("Deve restituire la differenza in millisecondi tra la data di scadenza e la data attuale", () => {
      const dueDate = getDueDate(2000); // data di sveglia creata
      const delay = getTimeoutDelay(dueDate); // tempo a partire la sveglia
      expect(delay).toBe(2000); // si aspetta che il delay sia quello impostato
    });
  });
});
// test della classe Alarm
describe("Classe Alarm", () => {
  let delegate;
  let alarm;
  beforeAll(() => {
    jest.useFakeTimers(); // usa dei timmer finti per non dover aspettare ad eseguire il test
    jest.spyOn(global, "setTimeout"); //spia la setTimeout
  });
  beforeEach(() => {
    const dueDate = getDueDate(2000);
    delegate = jest.fn(); // crea una mockFunction (funzione finta)
    alarm = new Alarm(delegate, dueDate); //Istanzia la classe alarm
  });
  afterAll(() => {
    jest.useRealTimers(); //ritorna il comportamento normale del timer
  });
  test("la sveglia deve eseguire il delegato all'ora indicata", () => {
    expect(delegate).not.toBeCalled(); // ci aspettiamo che il delegato non venga chiamato
    jest.runAllTimers(); // scorrere il tempo
    expect(setTimeout).toHaveBeenCalledWith(delegate, 2000); // ci aspettiamo che il setTimeout sia chiamato con quei parametri
    expect(delegate).toHaveBeenCalled(); // ci aspettiamo che il delegate sia stato chiamato
  });
  test("il delegato non viene eseguito se la funzione stop viene chamata", () => {
    alarm.stop(); // chiama la funzione stop
    jest.runAllTimers(); // scorrere il tempo
    expect(delegate).not.toBeCalled(); // si aspetta che non suoni più l'alarme
  });
  test("Il delegato viene eseguito ancora una volta, quando è stato rimandato", () => {
    jest.runAllTimers(); // scorrere il tempo
    alarm.snooze(); // rimanda il setTimeot
    jest.runAllTimers(); // scorre il tempo
    expect(delegate).toHaveBeenCalledTimes(2); // cosi vedo se il delegato ha suonato due volte
  });
  test("il delegato non venga eseguito dopo che è stato rimandato, se viene fermato prima della scadenza del rinvio", () => {
    jest.runAllTimers(); // scorrere il tempo
    alarm.snooze(); // rimanda il setTimeot
    alarm.stop(); // chiama la funzione stop
    jest.runAllTimers(); // scorre il tempo
    expect(delegate).toHaveBeenCalledTimes(1);
  });
});

function fakeDelegate(stop, snooze) {
  stop();
}
test("se è possibile usare la fakeDelegate al posto di fn", () => {
  const stop = jest.fn();
  const snooze = jest.fn();
  fakeDelegate(stop, snooze);
  expect(stop).toBeCalled();

  // NO, troppo sbatti per un test!
  jest.useFakeTimers();
  const alarm = new Alarm(() => {}, getDueDate(2000));
  alarm.stop = jest.fn();
  fakeDelegate(() => alarm.stop());
  expect(alarm.stop).toBeCalled();
  jest.useRealTimers();
});
