
async function testApi(){
    let response = await fetch('https://raider.io/api/v1/characters/profile?region=us&realm=skullcrusher&name=haelshah&fields=mythic_plus_scores_by_season:current')
    let data = await response.json();
    console.log(data)
}
testApi();