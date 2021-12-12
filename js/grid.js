class Grid {
    width;
    height;
    nodes;
    mouseDown;
    animationIsRunning;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.nodes = [];
        this.mouseDown = false;
        this.animationIsRunning = false;
    }

    drawGrid() {
        let body = document.getElementsByTagName('body')[0];

        let table = document.createElement("table");

        for (let i = 0; i < this.height; i++) {
            let row = document.createElement("tr");

            this.nodes.push([]);

            for (let j = 0; j < this.width; j++) {
                let cell = document.createElement("th");
                row.appendChild(cell);
                this.nodes[i][j] = new Node(i, j, cell);
                if (i === 23 && j === 25) {
                    this.nodes[i][j].isStart = true;
                    this.nodes[i][j].tableCell.classList.add('start');
                }

                if (i === 23 && j === 75) {
                    this.nodes[i][j].isEnd = true;
                    this.nodes[i][j].tableCell.classList.add('end');
                }
            }
            table.appendChild(row);
        }

        body.appendChild(table);
    }

    addEventListeners() {
        for (let i = 0; i < this.height; i++) {

            let node = this.nodes[i];

            for (let j = 0; j < this.width; j++) {
                if (!node[j].start && !node[j].end) {
                    node[j].tableCell.addEventListener('mousedown', (e) => {
                        e.preventDefault()
                        if (this.animationIsRunning != true) {
                        this.mouseDown = true;
                        this.nodes[i][j].tableCell.classList.add('wall');
                        this.nodes[i][j].isWall = true; 
                        }
                    })
                }
            }

            for (let j = 0; j < this.width; j++) {
                node[j].tableCell.addEventListener('mouseup', (e) => {
                    e.preventDefault()
                    this.mouseDown = false;

                    if (node[j].start != true && node[j].end != true && this.animationIsRunning != true) {
                        this.nodes[i][j].tableCell.classList.add('wall');
                        this.nodes[i][j].isWall = true;
                    }
                })  
            }

            for (let j = 0; j < this.width; j++) {
                if (node[j].start != true && node[j].end != true) {
                    node[j].tableCell.addEventListener('mousemove', (e) => {
                        if (this.mouseDown === false) return;
                        e.preventDefault();
                        if (this.mouseDown && node[j].start != true && node[j].end != true && this.animationIsRunning != true)
                            this.nodes[i][j].tableCell.classList.add('wall'); 
                            this.nodes[i][j].isWall = true;
                    })
                }
            } 
        }
    }

    animateVisitedNodes(visitedNodes, shortestPath) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animateShortestPath(shortestPath);
                }, 10 * i);

                // Enables the buttons
                setTimeout(() => {
                    document.querySelector('#visualize-btn').disabled = false
                    document.querySelector('#reset-btn').disabled = false;
                }, 11 * i)
                break;
            }

            if (visitedNodes[i].isStart || visitedNodes[i].isEnd) continue;

            setTimeout(() => {
                visitedNodes[i].tableCell.classList.add('visited');
            }, 10 * i);
        }
    }

    animateShortestPath(shortestPath) {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
                shortestPath[i].tableCell.classList.remove('visited');
                shortestPath[i].tableCell.classList.add('path');
            }, 50 * i);
        }
    }

    resetGrid() {
        for (let i = 0; i < 45; i++) {
            for (let j = 0; j < 100; j++) {
                this.nodes[i][j].isWall = false;
                this.nodes[i][j].isVisited = false;
                this.nodes[i][j].tableCell.classList.remove('visited');
                this.nodes[i][j].tableCell.classList.remove('wall');
                this.nodes[i][j].tableCell.classList.remove('path')
                this.animationIsRunning = false;
            }
        }
    }
}