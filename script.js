$(document).ready(function() {

// Start your code from here
    var temas = ["bowser", "chrom", "Michael Scott"]
    $("#add-animal").on("click", addTema)
    $("#animal-buttons").on("click", ".buttonSearch", searchGiphy)
    $("body").on("click", ".animal-item", changeState)

    

    for(var i = 0; i < temas.length; i++){
        console.log(temas[i])
        $("#animal-buttons").append(`<button class="buttonSearch"> ${temas[i]}</button`)
        var butt = document.createElement("button")
        butt.innerHTML = temas[i]
        }
    


    function addTema(e){

        e.preventDefault()


        var animal = document.getElementById("animal-input").value
        $("#animal-buttons").append(`<button class="buttonSearch"> ${animal}</button`)
        console.log("Add tema: " + animal)
        temas.push(animal)
        var butt = document.createElement("button")
        butt.innerHTML = temas[temas.length - 1]
        
    }

    function searchGiphy(e){

        var busqueda
        e.preventDefault()
        busqueda = $(this).text
        console.log("Click search" + busqueda)


    }

    function searchGiphy(e){
        e.preventDefault()
        $("#animals").empty()
        var busqueda
        busqueda = $(this).text()
        console.log("Click Search" + busqueda)

        var content = $.get("https://api.giphy.com/v1/gifs/search", {
            api_key: "2w6RHorHJgtKkW6zvLtQaqzOcZWPx8Ke",
            q: busqueda,
            limit: 10,
        })
        
        content.done(function(response){
            console.log(response)
            console.log(response.data[0].images.fixed_height_still.url)
            for(var i = 0; i < response.data.length; i++){
                var div = $("<p>")
                div.html("Rating: " + response.data[i].rating)
                var imagen = $("<img>")
                imagen.attr("src", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-still", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-move", response.data[i].images.fixed_height.url)
                imagen.attr("data-state", "no")
                imagen.addClass("animal-item")
                $("#animals").append(div)
                $("#animals").append(imagen)
                
            }
        })
    }

    function changeState(e){
        e.preventDefault()
        var state = $(this).attr("data-state")
        if(state == "no"){
            $(this).attr("src", $(this).attr("data-move"))
            $(this).attr("data-state", "si")
        }else{
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "no")
        }
    }



});
