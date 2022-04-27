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
    async function displayChar(){
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
    displayChar();
})



async function displayRio(){
    let mythicRankings = document.querySelector('#mythicRankings')
    let rioResponse = await fetch('https://raider.io/api/v1/mythic-plus/runs?season=season-sl-3&region=us&dungeon=all&affixes=all&page=0')
    let rioListData = await rioResponse.json();
    //return top 20 runs for the season and score
    console.log(rioListData)
    
    let top20 = rioListData.rankings
    // console.log(typeof top20)
    for(let i = 0 ; i < top20.length; i++) {
        console.log(top20[i])
        let teamRun = top20[i]
        //convert milliseconds to minutes/seconds
        let convertTime = teamRun.run.clear_time_ms
        const milliToMin = (convertTime) => {
            let min = Math.floor(convertTime/60000)
            // console.log(min)
            let seconds = (convertTime % 60000 /1000).toFixed(0)
            // console.log(seconds)
            if(seconds<10) {
                return `${min}:0${seconds}`
            } else {
                return `${min}:${seconds}`
            }
            
        }
        //create a new element and add each run details to each run
        let runListItem = document.createElement('div');
        runListItem.className = 'row'
        runListItem.innerHTML = `
        <div class="col">${teamRun.rank}</div>
        <div class="col">${teamRun.run.dungeon.short_name}</div>
        <div class="col">+${teamRun.run.mythic_level}</div>
        <div class="col">${milliToMin(convertTime)}</div>
        <div class="col">${teamRun.score}</div>
        <div class="col">${teamRun.run.roster[0].character.name},${teamRun.run.roster[1].character.name}</div>
        `
        mythicRankings.appendChild(runListItem)
    }
}
displayRio();

//<div class="col">${teamRun.run.weekly_modifiers[0].name},${teamRun.run.weekly_modifiers[1].name},${teamRun.run.weekly_modifiers[2].name},${teamRun.run.weekly_modifiers[3].name}</div>