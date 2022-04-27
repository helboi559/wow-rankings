//FORM SUBMIT VARIABLE **********
let submitChar = document.querySelector('#submitCharSearch input')
// console.log(submitChar)

//add listener to take all info(region,name,realm,specifics)
submitChar.addEventListener('click',(event) => {
    event.preventDefault();
    //SELECT HTML ELEMENTS ************
    //OPTIONS IN CHAR SEARCH ELEMENTS **
    let regionSelect = document.querySelector("#regionSelect")
    let serverSelect = document.querySelector('#serverSelect')
    let charName = document.querySelector('#charName input')
    // let specificCharInfo = document.querySelector("#specificInfo")
    
    //HIDDEN CARD TEMPLATE ELEMENTS TO DISPLAY IN CHAR SEARCH ELEMENTS
    let charImage = document.querySelector("img")
    let charCardInfo = document.querySelector(".card")
    let cardTitle = document.querySelector(".card h5")
    let cardInfo = document.querySelector(".card p")
    let cardSeasonScore = document.querySelector("#dungeonScore")
    let cardRaidPro = document.querySelector("#raidProgression")
    let cardGear = document.querySelector("#gear")
    // console.log(regionSelect.value)
    
    //GET DATA FROM API FROM 3 ENDPOINTS
    async function displayChar(){
        let responseDungeon = await fetch(`https://raider.io/api/v1/characters/profile?region=${regionSelect.value}&realm=${serverSelect.value}&name=${charName.value}&fields=mythic_plus_scores_by_season%3Acurrent`)
        // https://raider.io/api/v1/characters/profile?region=${regionSelect.value}&realm=${serverSelect.value}&name=${charName.value}&fields=${specificCharInfo.value}
        let dataDungeon = await responseDungeon.json();

        let responseRaid = await fetch(`https://raider.io/api/v1/characters/profile?region=${regionSelect.value}&realm=${serverSelect.value}&name=${charName.value}&fields=raid_progression`)
        //
        let dataRaid = await responseRaid.json()

        let responseGear = await fetch(`https://raider.io/api/v1/characters/profile?region=${regionSelect.value}&realm=${serverSelect.value}&name=${charName.value}&fields=gear`)
        //
        let dataGear = await responseGear.json()
        console.log(dataGear)

        //show info and display character info in a card(avatar,name,character description, current season score)
        charCardInfo.style.display = "block"
        charImage.src = dataDungeon.thumbnail_url
        cardTitle.textContent = dataDungeon.name
        cardInfo.textContent = `Level 60 ${dataDungeon.faction} ${dataDungeon.race} ${dataDungeon.active_spec_name} ${dataDungeon.class}`
        cardSeasonScore.textContent = `Season 3 score : ${dataDungeon.mythic_plus_scores_by_season[0].scores.all}`
        cardRaidPro.textContent = `Current Progression: ${dataRaid.raid_progression['sepulcher-of-the-first-ones'].summary} `
        cardGear.textContent = `Gear Score: ${dataGear.gear.item_level_equipped}`
    }
    displayChar();
})



async function displayRio(){
    let mythicRankings = document.querySelector('#mythicRankings')
    let rioResponse = await fetch('https://raider.io/api/v1/mythic-plus/runs?season=season-sl-3&region=us&dungeon=all&affixes=all&page=0')
    let rioListData = await rioResponse.json();
    //return top 20 runs for the season and score
    // console.log(rioListData)
    
    let top20 = rioListData.rankings
    // console.log(typeof top20)
    for(let i = 0 ; i < top20.length; i++) {
        // console.log(top20[i])
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