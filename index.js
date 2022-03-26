class Simulation {
  constructor(bankroll, startingBet) {
    this.bankroll = +bankroll;
    this.startingBet = +startingBet;
    this.bet = this.startingBet;
    if(this.startingBet > this.bankroll) return;

    this.start();
  }

  start() {
    this.table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const tableTitle = document.createElement('tr');

    const betsTitle = document.createElement('td');
    betsTitle.textContent = 'Bets';
    const bankrollTitle = document.createElement('td');
    bankrollTitle.textContent = 'Bankroll';

    tableTitle.append(betsTitle, bankrollTitle);
    this.table.append(tableTitle);
    document.body.appendChild(this.table);

    while(true) {
      const row = document.createElement('tr');
      const bets = document.createElement('td');
      const bankroll = document.createElement('td');
      row.append(bets, bankroll);
      this.table.append(row);

      while(true) {
        const binary = Math.random() * 2 | 0;

        const span = document.createElement('span');
        span.style.backgroundColor = 'lightcoral';
        span.style.padding = '0 2px';
        span.style.margin = '0 2px';
        span.textContent += this.bet;
        bets.appendChild(span);

        if(binary) {
          this.bankroll += this.bet
          bankroll.textContent = this.bankroll;
          this.bet = this.startingBet;
          break;
        } else {
          this.bankroll -= this.bet;
          if(this.bet * 2 > this.bankroll) {
            bankroll.textContent = this.bankroll;
            return;
          }
          this.bet *= 2;
        }

      }

      bets.lastChild.style.backgroundColor = 'lightgreen';
    }
  }

}

const bankrollDiv = document.createElement('div');
const bankrollLabel = document.createElement('label');
bankrollLabel.textContent = 'Bankroll ';
bankrollLabel.htmlFor = 'bankroll';
const bankrollInput = document.createElement('input');
bankrollInput.id = 'bankroll';
bankrollInput.value = 1000;
bankrollDiv.append(bankrollLabel, bankrollInput);

const startingBetDiv = document.createElement('div');
const startingBetLabel = document.createElement('label');
startingBetLabel.textContent = 'Starting bet ';
startingBetLabel.htmlFor = 'starting-bet';
const startingBetInput = document.createElement('input');
startingBetInput.id = 'starting-bet';
startingBetInput.value = 1;
startingBetDiv.append(startingBetLabel, startingBetInput);

const playButton = document.createElement('button');
playButton.textContent = 'play';
playButton.onclick = () => {
  document.querySelector('table')?.remove();
  const simulation = new Simulation(bankrollInput.value, startingBetInput.value);
}

document.body.append(bankrollDiv, startingBetDiv, playButton);
