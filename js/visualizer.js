const main = () => {
    visualizeButton = document.querySelector('#visualize-btn');
    resetButton = document.querySelector('#reset-btn');

    let grid = new Grid(100, 45);

    grid.drawGrid();
    grid.addEventListeners();

    let bfs = new BFS(grid.nodes);

    visualizeButton.addEventListener('click', (e) => {
        visualizeButton.disabled = true;
        resetButton.disabled = true;
        grid.animationIsRunning = true;
        bfs.solve_bfs();
        grid.animateVisitedNodes(bfs.visitedNodes, bfs.shortestPath);
    });

    resetButton.addEventListener('click', (e) => {
        grid.resetGrid();
        bfs.resetBFS(grid.nodes);
    });
}

main();