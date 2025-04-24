const { getZmanimJson } = require("kosher-zmanim");

function calculateHalachicTimes(lat, lon, elevation = 0) {
    const options = {
        latitude: lat,
        longitude: lon,
        elevation: elevation
    };
    try {
        const zmanim = getZmanimJson(options);
        if (zmanim && typeof zmanim === "object" && !Array.isArray(zmanim)) {
            return zmanim;
        } else {
            console.error("Invalid JSON format returned:", zmanim);
            throw new Error("Invalid JSON format returned");
        }
    } catch (error) {
        console.error("Error calculating zmanim:", error);
        throw new Error("Failed to calculate zmanim");
    }
}

module.exports = { calculateHalachicTimes };
