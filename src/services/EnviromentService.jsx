
const url = "http://localhost:5211/Stats";
const urlEnvLimit = "http://localhost:5211/IndoorEnvironments";


export async function getStatsByGarageID(id)
{
    const response = await fetch(`${url}?GarageId=${id}`);
    return response.json();
}

export async function getStatsLimitByGarageID(id)
{
    const response = await fetch(`${urlEnvLimit}`);
    const data = await response.json();
    let envLimit = await data.find((envLimit) => envLimit.garage.id === id);
    return envLimit;
}