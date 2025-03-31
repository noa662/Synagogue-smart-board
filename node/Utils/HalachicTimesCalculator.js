const { ZmanimCalendar, Location } = require('kosher-zmanim');

function calculateHalachicTimes(lat, lon, elevation = 0) {
    const location = new Location(lat, lon, elevation);
    const calendar = new ZmanimCalendar(location);

    return {
        alotHashachar: calendar.getAlosHashachar(), // עלות השחר
        sunrise: calendar.getSunrise(), // זריחה
        sofZmanShma: calendar.getSofZmanShmaMGA(), // סוף זמן קריאת שמע לפי מג"א
        sofZmanTefila: calendar.getSofZmanTefilaGRA(), // סוף זמן תפילה לפי הגר"א
        chatzot: calendar.getChatzos(), // חצות היום
        minchaGedola: calendar.getMinchaGedola(), // מנחה גדולה
        minchaKetana: calendar.getMinchaKetana(), // מנחה קטנה
        plagHamincha: calendar.getPlagHamincha(), // פלג המנחה
        sunset: calendar.getSunset(), // שקיעה
        tzetHakochavim: calendar.getTzais(), // צאת הכוכבים
    };
}

module.exports = { calculateHalachicTimes };