let maze;
let player;
let mazeSize = 10; 
let grid = [];
let endPoint = { x: mazeSize - 1, y: mazeSize - 1 }; 


window.onload = function() {
    startGame();
};

function startGame() {
    maze = document.getElementById('maze');
    maze.innerHTML = ''; 
    grid = generateMaze(mazeSize); 
    player = { x: 0, y: 0 }; 

    grid[player.y][player.x + 1] = 1;
    grid[player.y + 1][player.x] = 1;

    drawMaze();
    window.addEventListener('keydown', movePlayer); 
}

function generateMaze(size) {
    let maze = [];
    
    for (let i = 0; i < size; i++) {
        maze[i] = [];
        for (let j = 0; j < size; j++) {
            maze[i][j] = 0; 
        }
    }

    function carvePath(x, y) {
        const directions = [
            [0, 1],  
            [1, 0],  
            [0, -1], 
            [-1, 0]  
        ];

        directions.sort(() => Math.random() - 0.5);

        for (const [dx, dy] of directions) {
            const nx = x + dx * 2;
            const ny = y + dy * 2;

            if (nx >= 0 && ny >= 0 && nx < size && ny < size && maze[ny][nx] === 0) {
                maze[ny][nx] = 1; 
                maze[y + dy][x + dx] = 1; 
                carvePath(nx, ny); 
            }
        }
    }

    maze[1][1] = 1;
    carvePath(1, 1);

    maze[0][0] = 1;
    maze[size - 1][size - 1] = 1;

    return maze;
}

function drawMaze() {
    maze.innerHTML = ''; 

    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            
            if (x === player.x && y === player.y) {
                div.classList.add('player');
            }
            
            else if (grid[y][x] === 0) {
                div.classList.add('wall');
            }
            
            else {
                div.classList.add('path');
            }

            maze.appendChild(div);
        }
    }
}

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (player.y > 0 && grid[player.y - 1][player.x] === 1) player.y--;
            break;
        case 'ArrowDown':
            if (player.y < mazeSize - 1 && grid[player.y + 1][player.x] === 1) player.y++;
            break;
        case 'ArrowLeft':
            if (player.x > 0 && grid[player.y][player.x - 1] === 1) player.x--;
            break;
        case 'ArrowRight':
            if (player.x < mazeSize - 1 && grid[player.y][player.x + 1] === 1) player.x++;
            break;
    }

    drawMaze(); 
    
    if (player.x === endPoint.x && player.y === endPoint.y) {
        showMessage();
    }
}


function showMessage() {
    document.getElementById('result').style.display = 'block';
    document.getElementById('loveImage').src = 'zdjecie.jpg'; 
}
