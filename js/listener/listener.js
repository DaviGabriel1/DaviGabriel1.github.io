document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault(); 
        pesquisar()
    }
});