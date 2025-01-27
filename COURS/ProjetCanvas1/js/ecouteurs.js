function initListeners(inputStates) {
    window.onkeydown = (event) => {
        console.log("Touche pressée : " + event.key);
        if(event.key === "ArrowRight") {
            inputStates.ArrowRight = true;
        }
        if(event.key === "ArrowLeft") {
            inputStates.ArrowLeft = true;
        }
    }

    window.onkeyup = (event) => {
        console.log("Touche relachée : " + event.key);
        if(event.key === "ArrowRight") {
            inputStates.ArrowRight = false;
        }
        if(event.key === "ArrowLeft") {
            inputStates.ArrowLeft = false;
        }
    }
}

export { initListeners };