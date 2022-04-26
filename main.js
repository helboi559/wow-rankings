//select html elements
let submitChar = document.querySelector('#submitCharSearch input')
let regionSelect = document.querySelector("#regionSelect")
let serverSelect = document.querySelector('#serverSelect')
let charName = document.querySelector('#charName input')
let specificCharInfo = document.querySelector("#specificInfo input")

// console.log(charCardInfo)
let charImage = document.querySelector("img")
// console.log(regionSelect)
// let selectedRegion = document.querySelector("#selectedRegion")
//add listener to take all info(region,name,realm,specifics)
submitChar.addEventListener('click',(event) => {
    event.preventDefault();
    let charCardInfo = document.querySelector(".card")
    let cardTitle = document.querySelector(".card h5")
    let cardInfo = document.querySelector(".card p")
    let cardSeasonScore = document.querySelector(".card li")
    // console.log(regionSelect.value)
    async function testApi(){
        let response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=firetree&name=fourscoops&fields=mythic_plus_scores_by_season%3Acurrent`)
        // https://raider.io/api/v1/characters/profile?region=${regionSelect.value}&realm=${serverSelect.value}&name=${charName.value}&fields=${specificCharInfo.value}
        let data = await response.json();
        console.log(typeof data.thumbnail_url)
        //show info and display character info in a card(avatar,name,character description, current season score)
        charCardInfo.style.display = "block"
        charImage.src = data.thumbnail_url
        cardTitle.textContent = data.name
        cardInfo.textContent = `Level 60 ${data.faction} ${data.race} ${data.active_spec_name} ${data.class}`
        cardSeasonScore.textContent = `Season 3 score : ${data.mythic_plus_scores_by_season[0].scores.all}`

    }
    testApi();
})
// console.log('selected region',selectedRegion)

