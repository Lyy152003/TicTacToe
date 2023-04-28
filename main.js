// Xử lý sự kiên form mở đầu
function start(){
  window.location.href = "./tennguoichoi.html";
}

// Xử lí sự kiện cho form 2 - nhập tên người chơi
function play(){
  // lấy giá trị nhập 
  var name1=document.getElementById("name1").value;
  var name2=document.getElementById("name2").value;

  if(name1=== "" || name2=== "" || name1=== "" && name2=== ""){
      alert("Vui lòng nhập thông tin");
  }
  else{
    //  lưu trữ tên của người chơi trong bộ nhớ cục bộ của trang
      localStorage.setItem("name1", name1);
      localStorage.setItem("name2", name2);
      window.location.href = "./Game.html";
  }
  
}

// Xử lí sự kiện form 3 - chơi game

  // Lấy giá trị từ local storage
const name1 = localStorage.getItem("name1");
const name2 = localStorage.getItem("name2");

  // Hiển thị tên người chơi lên form HTML thông qua id
document.getElementById("player1").innerHTML = name1;
document.getElementById("player2").innerHTML = name2;

const squares = document.querySelectorAll('td'); // các ô đang chơi
let player = 'X';                                // người chơi hiện tại
let score1 = localStorage.getItem("score1") || 0;// lấy điểm từ bộ nhớ nếu ko có thì mặc định 0
let score2 = localStorage.getItem("score2") || 0;

  // Update điểm số trên giao diện
document.getElementById("score1").innerHTML = score1;
document.getElementById("score2").innerHTML = score2;

// các combo thắng của trò chơi
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

  // duyệt mảng combo
  for (let i = 0; i < combo.length; i++) {
    const [a, b, c] = combo[i];
    const cellA = document.getElementById(a);
    const cellB = document.getElementById(b);
    const cellC = document.getElementById(c); // lấy gia trị combo

    // Xu li khi ba cot giong nhau
    if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
        // thêm class win vao để tô đậm cột khi thắng
        cellA.classList.add('win'); 
        cellB.classList.add('win');
        cellC.classList.add('win');
        if (player === 'X') {
          score1++;
          document.getElementById("score1").innerHTML = score1;
          localStorage.setItem("score1", score1);
          setTimeout(() => {
            if (confirm(`${name1} wins! Do you want to play again?`)) {
              // Đặt lại trò chơi
              squares.forEach(cell => {
                cell.classList.remove('win');
                cell.textContent = '';
              });
              player = 'X';
              document.getElementById("player1").classList.add('playing');
              document.getElementById("player2").classList.remove('playing');
            }
          }, 100); // đợi 1 giây trước khi hiển thị hộp thoại xác nhận
        } else {
          score2++;
          document.getElementById("score2").innerHTML = score2;
          localStorage.setItem("score2", score2);
          setTimeout(() => {
            if (confirm(`${name2} wins! Do you want to play again?`)) {
              // Đặt lại trò chơi
              squares.forEach(cell => {
                cell.classList.remove('win');
                cell.textContent = '';
              });
              player = 'O';
              document.getElementById("player1").classList.add('playing');
              document.getElementById("player2").classList.remove('playing');
            }
          }, 100); // đợi 1 giây trước khi hiển thị hộp thoại xác nhận
        }
    } 
  }
}

// Xu ly khi nhan click
squares.forEach(cell => {
  cell.addEventListener('click', () => {
    // Thêm class của người chơi vào ô được click
  cell.classList.add(player.toLowerCase());

  if (!cell.textContent) {
      // Thêm ký tự của người chơi vào ô đó
    cell.textContent = player;
      // Kiểm tra xem ai đã thắng
    checkWin();
      // Đổi lượt chơi
    player = player === 'X' ? 'O' : 'X';
      // Cập nhật trạng thái đang chơi của người chơi trên giao diện
    if (player === 'X') {
        document.getElementById("player1").classList.add('playing');
        document.getElementById("player2").classList.remove('playing');
    } else {
        document.getElementById("player1").classList.remove('playing');
        document.getElementById("player2").classList.add('playing');
    }
  }
  });
});

// Chơi lại
document.getElementById("play-again").addEventListener('click', () => {
  // Xóa ký tự và class thắng của tất cả các ô
  squares.forEach(cell => {
    cell.classList.remove('win');
    cell.textContent = '';
  });
  // Đặt lại lượt chơi và trạng thái đang chơi của người chơi trên giao diện

  player = 'X';
  if (player === 'X') {
    document.getElementById("player1").classList.add('playing');
    document.getElementById("player2").classList.remove('playing');
  } else {
    document.getElementById("player1").classList.remove('playing');
    document.getElementById("player2").classList.add('playing');
  }
});

// Thoát
document.getElementById("exit").addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
