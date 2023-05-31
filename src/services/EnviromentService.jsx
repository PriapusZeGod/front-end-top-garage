
const url = "http://localhost:5211/Stats";
const urlEnvLimit = "http://34.36.170.138/IndoorEnvironments";
const urlAlarm = "http://localhost:5211/Alarm"

export async function getStatsByGarageID(id)
{
    const response = await fetch(`${url}?GarageId=${id}`);
    if (response.status === 404) {
        return [];
    }
    return response.json();
}

export async function getStatsLimitByGarageID(id)
{
    const response = await fetch(`${urlEnvLimit}`);
    const data = await response.json();
    let envLimit = await data.find((envLimit) => envLimit.garage.id === id);
    return envLimit;
}
export async function getAlarmByGarageId(id)
{
    const response = await fetch(`${url}?GarageId=${id}`);
    if (response.status === 404) {
        return [];
    }
    return response.json();
}
export async function setAlarmByGarage(garageId, alarm) {
    const url = '${url}?GarageId=${id}';

    const payload = {
        garageId: garageId,
        alarm: alarm,
    };

    console.log("Payload: " + JSON.stringify(payload));

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const status = response.status;
    console.log("Status: " + status);

    if (status !== 201) {
        let data = await response.text();
        throw new Error(data);
    }

    const data = await response.json();
    return data;
}


