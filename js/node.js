class Node {
    constructor(row, col, tableCell) {
        this.row = row;
        this.col = col;
        this.isWall = false;
        this.isVisited = false;
        this.isStart = false;
        this.isEnd = false;
        this.tableCell = tableCell;
    }
}