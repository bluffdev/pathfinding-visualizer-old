class BFS {
    row;
    col;
    qr;
    qc;
    dr;
    dc;
    grid;
    visitedNodes;
    shortestPath;
    prev;

    constructor(grid) {
        this.row = 45;
        this.col = 100;
        this.qr = [23];
        this.qc = [25];
        this.dr = [-1, 1, 0, 0];
        this.dc = [0, 0, 1, -1];
        this.grid = grid;
        this.visitedNodes = [];
        this.shortestPath = [];
        this.prev = new Map();
    }

    solve_bfs() {
        let r;
        let c;

        while (this.qr.length > 0 && this.qc.length > 0) {
            r = this.qr.shift();
            c = this.qc.shift();

            if (this.grid[r][c].isEnd === true) break;
            
            this.exploreNeighbors(r, c);
        }
        this.reconstructPath();
    };

    exploreNeighbors(r, c) {
        let rr;
        let cc;

        for (let i = 0; i < 4; i++) {
            rr = r + this.dr[i];
            cc = c + this.dc[i];

            if (rr < 0 || cc < 0) continue;
            if (rr >= this.row || cc >= this.col) continue;

            if (this.grid[rr][cc].isVisited === true) continue;
            if (this.grid[rr][cc].isWall === true) continue; 

            this.qr.push(rr);
            this.qc.push(cc);

            this.grid[rr][cc].isVisited = true;

            if (r == 23 && c == 25) {
                this.prev.set(this.grid[rr][cc], this.grid[23][25]);
            }

            else {
                this.prev.set(this.grid[rr][cc], this.grid[r][c]);
            }

            this.visitedNodes.push(this.grid[rr][cc]);
        }
    };

    reconstructPath() {
        let ex = 23;
        let ey = 75;

        for (let at = this.prev.get(this.grid[ex][ey]); at.isStart != true; at = this.prev.get(at)) {
            this.shortestPath.push(at);
        }

        this.shortestPath = this.shortestPath.reverse();
    }

    resetBFS(grid) {
        this.qr = [23];
        this.qc = [25];
        this.grid = grid;
        this.visitedNodes = [];
        this.shortestPath = [];
        this.prev = new Map();
    }
}