
const url = "http://localhost:5055/Garages";

export async function getGaragesByUserID(userId)
{
    const response = await fetch(`${url}?UserId=${userId}`);
    const data = await response.json();
    return data;
}