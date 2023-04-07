const squares = document.querySelectorAll('td');
let player = 'X';

// column win
function checkWin() {
  const combo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  // kiem tra 3 cot
  for (let i = 0; i < combo.length; i++) {
    const [a, b, c] = combo[i];
    const cellA = document.getElementById(a);
    const cellB = document.getElementById(b);
    const cellC = document.getElementById(c);

    // Xu li khi ba cot giong nhau
    if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
        cellA.classList.add('win');
        cellB.classList.add('win');
        cellC.classList.add('win');
        alert(`${cellA.textContent} wins!`);
    } else if (![...squares].map(cell => cell.textContent).includes('')) {
      alert('Tie Game!');
    }
  }
}

// Xu ly khi nhan click
squares.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.add(player.toLowerCase());

    if (!cell.textContent) {
      cell.textContent = player;
      checkWin();
      player = player === 'X' ? 'O' : 'X';
    }
  });
});


