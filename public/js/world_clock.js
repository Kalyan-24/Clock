const dateInfo = document.getElementById('date-info')
const addWorldClockBtn = document.getElementById('add-world-clock-btn')
const searchCity = document.querySelector('.search-city')
const container = document.querySelector('.container')
const searchInput = document.querySelector('.search-city .nav-bar #search-container input')
const cities = document.querySelector('.cities')

const deleteContainer = document.querySelector('.delete-container')
const deleteBtn = document.getElementById('delete')
const cancelBtn = document.getElementById('cancel')

const backBtn = document.getElementById('back')
const searchBtn = document.getElementById('search')

var worldClocksContainer = document.getElementById('world-clocks')
const currentTime = document.getElementById('current-time')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var worldClocks = []

let cityData = [
    { "city": "Kabul", "country": "Afghanistan", "state": "Kabul", "timezone": "Asia/Kabul" },
    { "city": "Mariehamn", "country": "Aland", "state": "Finström", "timezone": "Europe/Mariehamn" },
    { "city": "Tirana", "country": "Albania", "state": "Durrës", "timezone": "Europe/Tirane" },
    { "city": "Algiers", "country": "Algeria", "state": "Alger", "timezone": "Africa/Algiers" },
    { "city": "Pago Pago", "country": "American Samoa", "state": "", "timezone": "Pacific/Pago_Pago" },
    { "city": "Andorra", "country": "Andorra", "state": "", "timezone": "Europe/Andorra" },
    { "city": "Luanda", "country": "Angola", "state": "Luanda", "timezone": "Africa/Luanda" },
    { "city": "Antigua", "country": "Antigua and Barbuda", "state": "", "timezone": "America/Antigua" },
    { "city": "Santiago", "country": "Argentina", "state": "Santa Cruz", "timezone": "America/Santiago" },
    { "city": "Doctor Pedro P. Pena", "country": "Argentina", "state": "Formosa", "timezone": "America/Asuncion" },
    { "city": "San Luis", "country": "Argentina", "state": "San Luis", "timezone": "America/Argentina/San_Luis" },
    { "city": "San Salvador de Jujuy", "country": "Argentina", "state": "Jujuy", "timezone": "America/Argentina/Jujuy" }, { "city": "Ushuaia", "country": "Argentina", "state": "Tierra del Fuego", "timezone": "America/Argentina/Ushuaia" },
    { "city": "Catamarca", "country": "Argentina", "state": "Catamarca", "timezone": "America/Argentina/Catamarca" },
    { "city": "La Rioja", "country": "Argentina", "state": "La Rioja", "timezone": "America/Argentina/La_Rioja" },
    { "city": "San Juan", "country": "Argentina", "state": "San Juan", "timezone": "America/Argentina/San_Juan" },
    { "city": "Salta", "country": "Argentina", "state": "Salta", "timezone": "America/Argentina/Salta" },
    { "city": "Tucumán", "country": "Argentina", "state": "Tucumán", "timezone": "America/Argentina/Tucuman" },
    { "city": "Rio Gallegos", "country": "Argentina", "state": "Santa Cruz", "timezone": "America/Argentina/Rio_Gallegos" },
    { "city": "Mendoza", "country": "Argentina", "state": "Mendoza", "timezone": "America/Argentina/Mendoza" },
    { "city": "Córdoba", "country": "Argentina", "state": "Córdoba", "timezone": "America/Argentina/Cordoba" },
    { "city": "Buenos Aires", "country": "Argentina", "state": "Ciudad de Buenos Aires", "timezone": "America/Argentina/Buenos_Aires" },
    { "city": "Yerevan", "country": "Armenia", "state": "Erevan", "timezone": "Asia/Yerevan" },
    { "city": "Oranjestad", "country": "Aruba", "state": "", "timezone": "America/Aruba" },
    { "city": "Broken Hill", "country": "Australia", "state": "New South Wales", "timezone": "Australia/Broken_Hill" },
    { "city": "Darwin", "country": "Australia", "state": "Northern Territory", "timezone": "Australia/Darwin" },
    { "city": "Canberra", "country": "Australia", "state": "Australian Capital Territory", "timezone": "Australia/Sydney" },
    { "city": "Adelaide", "country": "Australia", "state": "South Australia", "timezone": "Australia/Adelaide" },
    { "city": "Brisbane", "country": "Australia", "state": "Queensland", "timezone": "Australia/Brisbane" },
    { "city": "Hobart", "country": "Australia", "state": "Tasmania", "timezone": "Australia/Hobart" },
    { "city": "Perth", "country": "Australia", "state": "Western Australia", "timezone": "Australia/Perth" },
    { "city": "Melbourne", "country": "Australia", "state": "Victoria", "timezone": "Australia/Melbourne" },
    { "city": "Sydney", "country": "Australia", "state": "New South Wales", "timezone": "Australia/Sydney" },
    { "city": "Passau", "country": "Austria", "state": "Oberösterreich", "timezone": "Europe/Berlin" },
    { "city": "Vienna", "country": "Austria", "state": "Wien", "timezone": "Europe/Vienna" },
    { "city": "Kapan", "country": "Azerbaijan", "state": "Z?ngilan", "timezone": "Asia/Yerevan" },
    { "city": "Baku", "country": "Azerbaijan", "state": "Baki", "timezone": "Asia/Baku" },
    { "city": "Manama", "country": "Bahrain", "state": "", "timezone": "Asia/Bahrain" },
    { "city": "Bahrain", "country": "Bahrain", "state": "", "timezone": "Asia/Bahrain" },
    { "city": "Dhaka", "country": "Bangladesh", "state": "Dhaka", "timezone": "Asia/Dhaka" },
    { "city": "Chittogram", "country": "Bangladesh", "state": "Chittogram", "timezone": "Asia/Dhaka" },
    { "city": "Bridgetown", "country": "Barbados", "state": "Saint Michael", "timezone": "America/Barbados" },
    { "city": "Barbados", "country": "Barbados", "state": "Saint Michael", "timezone": "America/Barbados" },
    { "city": "Minsk", "country": "Belarus", "state": "Minsk", "timezone": "Europe/Minsk" },
    { "city": "Brussels", "country": "Belgium", "state": "Brussels", "timezone": "Europe/Brussels" },
    { "city": "Belize", "country": "Belize", "state": "Belize", "timezone": "America/Belize" },
    { "city": "Porto-Novo", "country": "Benin", "state": "Ouémé", "timezone": "Africa/Porto-Novo" },
    { "city": "Bermuda", "country": "Bermuda", "state": "", "timezone": "Atlantic/Bermuda" },
    { "city": "Thimphu", "country": "Bhutan", "state": "Thimphu", "timezone": "Asia/Thimphu" },
    { "city": "Puerto Heath", "country": "Bolivia", "state": "La Paz", "timezone": "America/Lima" },
    { "city": "La Paz", "country": "Bolivia", "state": "La Paz", "timezone": "America/La_Paz" },
    { "city": "Sarajevo", "country": "Bosnia and Herzegovina", "state": "Sarajevo", "timezone": "Europe/Sarajevo" },
    { "city": "Gaborone", "country": "Botswana", "state": "South-East", "timezone": "Africa/Gaborone" },
    { "city": "Araguaina", "country": "Brazil", "state": "Tocantins", "timezone": "America/Araguaina" },
    { "city": "Rio Branco", "country": "Brazil", "state": "Acre", "timezone": "America/Rio_Branco" },
    { "city": "Porto Velho", "country": "Brazil", "state": "Rondônia", "timezone": "America/Porto_Velho" },
    { "city": "Cuiaba", "country": "Brazil", "state": "Mato Grosso", "timezone": "America/Cuiaba" },
    { "city": "Maceio", "country": "Brazil", "state": "Alagoas", "timezone": "America/Maceio" },
    { "city": "Manaus", "country": "Brazil", "state": "Amazonas", "timezone": "America/Manaus" },
    { "city": "Santarem", "country": "Brazil", "state": "Pará", "timezone": "America/Santarem" },
    { "city": "Campo Grande", "country": "Brazil", "state": "Mato Grosso do Sul", "timezone": "America/Campo_Grande" },
    { "city": "Boa Vista", "country": "Brazil", "state": "Roraima", "timezone": "America/Boa_Vista" },
    { "city": "Belem", "country": "Brazil", "state": "Pará", "timezone": "America/Belem" },
    { "city": "Brasilia", "country": "Brazil", "state": "Distrito Federal", "timezone": "America/Sao_Paulo" },
    { "city": "Fortaleza", "country": "Brazil", "state": "Ceará", "timezone": "America/Fortaleza" },
    { "city": "Salvador", "country": "Brazil", "state": "Bahia", "timezone": "America/Bahia" },
    { "city": "Bahia", "country": "Brazil", "state": "Bahia", "timezone": "America/Bahia" },
    { "city": "Recife", "country": "Brazil", "state": "Pernambuco", "timezone": "America/Recife" },
    { "city": "Rio de Janeiro", "country": "Brazil", "state": "Rio de Janeiro", "timezone": "America/Sao_Paulo" },
    { "city": "Sao Paulo", "country": "Brazil", "state": "São Paulo", "timezone": "America/Sao_Paulo" },
    { "city": "Bandar Seri Begawan", "country": "Brunei", "state": "Brunei and Muara", "timezone": "Asia/Brunei" },
    { "city": "Sofia", "country": "Bulgaria", "state": "Grad Sofiya", "timezone": "Europe/Sofia" },
    { "city": "Ouagadougou", "country": "Burkina Faso", "state": "Kadiogo", "timezone": "Africa/Ouagadougou" },
    { "city": "Bujumbura", "country": "Burundi", "state": "Bujumbura Mairie", "timezone": "Africa/Bujumbura" },
    { "city": "Phnom Penh", "country": "Cambodia", "state": "Phnom Penh", "timezone": "Asia/Phnom_Penh" },
    { "city": "Douala", "country": "Cameroon", "state": "Littoral", "timezone": "Africa/Douala" },
    { "city": "Liverpool", "country": "Canada", "state": "Nova Scotia", "timezone": "America/Halifax" },
    { "city": "Atikokan", "country": "Canada", "state": "Ontario", "timezone": "America/Atikokan" },
    { "city": "Winnipeg", "country": "Canada", "state": "Manitoba", "timezone": "America/Winnipeg" },
    { "city": "Regina", "country": "Canada", "state": "Saskatchewan", "timezone": "America/Regina" },
    { "city": "Calgary", "country": "Canada", "state": "Alberta", "timezone": "America/Edmonton" },
    { "city": "Victoria", "country": "Canada", "state": "British Columbia", "timezone": "America/Vancouver" },
    { "city": "Ottawa", "country": "Canada", "state": "Ontario", "timezone": "America/Toronto" },
    { "city": "Thunder Bay", "country": "Canada", "state": "Ontario", "timezone": "America/Thunder_Bay" },
    { "city": "Halifax", "country": "Canada", "state": "Nova Scotia", "timezone": "America/Halifax" },
    { "city": "St. John’s", "country": "Canada", "state": "Newfoundland and Labrador", "timezone": "America/St_Johns" },
    { "city": "Edmonton", "country": "Canada", "state": "Alberta", "timezone": "America/Edmonton" },
    { "city": "Montréal", "country": "Canada", "state": "Québec", "timezone": "America/Montreal" },
    { "city": "Vancouver", "country": "Canada", "state": "British Columbia", "timezone": "America/Vancouver" },
    { "city": "Toronto", "country": "Canada", "state": "Ontario", "timezone": "America/Toronto" },
    { "city": "Praia", "country": "Cape Verde", "state": "", "timezone": "Atlantic/Cape_Verde" },
    { "city": "George Town", "country": "Cayman Islands", "state": "", "timezone": "America/Cayman" },
    { "city": "Bangui", "country": "Central African Republic", "state": "Bangui", "timezone": "Africa/Bangui" },
    { "city": "Ndjamena", "country": "Chad", "state": "Hadjer-Lamis", "timezone": "Africa/Ndjamena" },
    { "city": "Santiago", "country": "Chile", "state": "Región Metropolitana de Santiago", "timezone": "America/Santiago" },
    { "city": "Kashgar", "country": "China", "state": "Xinjiang Uygur", "timezone": "Asia/Kashgar" },
    { "city": "Harbin", "country": "China", "state": "Heilongjiang", "timezone": "Asia/Harbin" },
    { "city": "Chongqing", "country": "China", "state": "Chongqing", "timezone": "Asia/Chongqing" },
    { "city": "Guangzhou", "country": "China", "state": "Guangdong", "timezone": "Asia/Shanghai" },
    { "city": "Urumqi", "country": "China", "state": "Xinjiang Uygur", "timezone": "Asia/Urumqi" },
    { "city": "Beijing", "country": "China", "state": "Beijing", "timezone": "Asia/Shanghai" },
    { "city": "Shanghai", "country": "China", "state": "Shanghai", "timezone": "Asia/Shanghai" },
    { "city": "Medellin", "country": "Colombia", "state": "Antioquia", "timezone": "America/Bogota" },
    { "city": "Cali", "country": "Colombia", "state": "Valle del Cauca", "timezone": "America/Bogota" },
    { "city": "Bogota", "country": "Colombia", "state": "Bogota", "timezone": "America/Bogota" },
    { "city": "Moroni", "country": "Comoros", "state": "", "timezone": "Indian/Comoro" },
    { "city": "Brazzaville", "country": "Congo (Brazzaville)", "state": "Pool", "timezone": "Africa/Brazzaville" },
    { "city": "Lubumbashi", "country": "Congo (Kinshasa)", "state": "Katanga", "timezone": "Africa/Lubumbashi" },
    { "city": "Kinshasa", "country": "Congo (Kinshasa)", "state": "Kinshasa City", "timezone": "Africa/Kinshasa" },
    { "city": "Rarotonga", "country": "Cook Islands", "state": "", "timezone": "Pacific/Rarotonga" },
    { "city": "San Jose", "country": "Costa Rica", "state": "San José", "timezone": "America/Costa_Rica" },
    { "city": "Zagreb", "country": "Croatia", "state": "Grad Zagreb", "timezone": "Europe/Zagreb" },
    { "city": "Santiago de Cuba", "country": "Cuba", "state": "Santiago de Cuba", "timezone": "America/Havana" },
    { "city": "Havana", "country": "Cuba", "state": "Ciudad de la Habana", "timezone": "America/Havana" },
    { "city": "Willemstad", "country": "Curacao", "state": "", "timezone": "America/Curacao" },
    { "city": "Nicosia", "country": "Cyprus", "state": "", "timezone": "Asia/Nicosia" },
    { "city": "Ostrava", "country": "Czech Republic", "state": "Moravskoslezský", "timezone": "Europe/Prague" },
    { "city": "Prague", "country": "Czech Republic", "state": "Prague", "timezone": "Europe/Prague" },
    { "city": "Copenhagen", "country": "Denmark", "state": "Hovedstaden", "timezone": "Europe/Copenhagen" },
    { "city": "Djibouti", "country": "Djibouti", "state": "Djibouti", "timezone": "Africa/Djibouti" },
    { "city": "Roseau", "country": "Dominica", "state": "Saint George", "timezone": "America/Dominica" },
    { "city": "San Juan", "country": "Dominican Republic", "state": "San Juan", "timezone": "America/Santo_Domingo" },
    { "city": "Santiago", "country": "Dominican Republic", "state": "Santiago", "timezone": "America/Santo_Domingo" },
    { "city": "Santo Domingo", "country": "Dominican Republic", "state": "Distrito Nacional", "timezone": "America/Santo_Domingo" },
    { "city": "Dili", "country": "East Timor", "state": "Dili", "timezone": "Asia/Dili" },
    { "city": "Santa Cruz", "country": "Ecuador", "state": "Galápagos", "timezone": "Pacific/Galapagos" },
    { "city": "Quito", "country": "Ecuador", "state": "Pichincha", "timezone": "America/Guayaquil" },
    { "city": "Guayaquil", "country": "Ecuador", "state": "Guayas", "timezone": "America/Guayaquil" },
    { "city": "Luxor", "country": "Egypt", "state": "Qina", "timezone": "Africa/Cairo" },
    { "city": "Alexandria", "country": "Egypt", "state": "Al Iskandariyah", "timezone": "Africa/Cairo" },
    { "city": "Cairo", "country": "Egypt", "state": "Al Qahirah", "timezone": "Africa/Cairo" },
    { "city": "San Salvador", "country": "El Salvador", "state": "San Salvador", "timezone": "America/El_Salvador" },
    { "city": "Malabo", "country": "Equatorial Guinea", "state": "Bioko Norte", "timezone": "Africa/Malabo" },
    { "city": "Asmara", "country": "Eritrea", "state": "Anseba", "timezone": "Africa/Asmara" },
    { "city": "Tallinn", "country": "Estonia", "state": "Harju", "timezone": "Europe/Tallinn" },
    { "city": "Addis Ababa", "country": "Ethiopia", "state": "Addis Ababa", "timezone": "Africa/Addis_Ababa" },
    { "city": "Stanley", "country": "Falkland Islands", "state": "", "timezone": "Atlantic/Stanley" },
    { "city": "Tórshavn", "country": "Faroe Islands", "state": "Eysturoyar", "timezone": "Atlantic/Faroe" },
    { "city": "Palikir", "country": "Federated States of Micronesia", "state": "", "timezone": "Pacific/Pohnpei" },
    { "city": "Suva", "country": "Fiji", "state": "Central", "timezone": "Pacific/Fiji" },
    { "city": "Helsinki", "country": "Finland", "state": "Southern Finland", "timezone": "Europe/Helsinki" },
    { "city": "Marseille", "country": "France", "state": "Provence-Alpes-Côte-d'Azur", "timezone": "Europe/Paris" },
    { "city": "St.-Denis", "country": "France", "state": "La Réunion", "timezone": "Indian/Reunion" },
    { "city": "Lyon", "country": "France", "state": "Rhône-Alpes", "timezone": "Europe/Paris" },
    { "city": "Cayenne", "country": "France", "state": "Guinaa", "timezone": "America/Cayenne" },
    { "city": "Paris", "country": "France", "state": "Île-de-France", "timezone": "Europe/Paris" },
    { "city": "Libreville", "country": "Gabon", "state": "Estuaire", "timezone": "Africa/Libreville" },
    { "city": "Tbilisi", "country": "Georgia", "state": "Tbilisi", "timezone": "Asia/Tbilisi" },
    { "city": "Stuttgart", "country": "Germany", "state": "Baden-Württemberg", "timezone": "Europe/Berlin" },
    { "city": "Bremen", "country": "Germany", "state": "Bremen", "timezone": "Europe/Berlin" },
    { "city": "Cologne", "country": "Germany", "state": "Nordrhein-Westfalen", "timezone": "Europe/Berlin" },
    { "city": "Dresden", "country": "Germany", "state": "Sachsen", "timezone": "Europe/Berlin" },
    { "city": "Frankfurt", "country": "Germany", "state": "Hessen", "timezone": "Europe/Berlin" },
    { "city": "Hamburg", "country": "Germany", "state": "Hamburg", "timezone": "Europe/Berlin" },
    { "city": "Munich", "country": "Germany", "state": "Bayern", "timezone": "Europe/Berlin" },
    { "city": "Berlin", "country": "Germany", "state": "Berlin", "timezone": "Europe/Berlin" },
    { "city": "Kumasi", "country": "Ghana", "state": "Ashanti", "timezone": "Africa/Accra" },
    { "city": "Accra", "country": "Ghana", "state": "Greater Accra", "timezone": "Africa/Accra" },
    { "city": "Gibraltar", "country": "Gibraltar", "state": "Gibraltar", "timezone": "Europe/Gibraltar" },
    { "city": "Athens", "country": "Greece", "state": "Attiki", "timezone": "Europe/Athens" },
    { "city": "Nuuk", "country": "Greenland", "state": "Kommuneqarfik Sermersooq", "timezone": "America/Godthab" },
    { "city": "Godthab", "country": "Greenland", "state": "Kommuneqarfik Sermersooq", "timezone": "America/Godthab" },
    { "city": "Saint George's", "country": "Grenada", "state": "", "timezone": "America/Grenada" },
    { "city": "Agana", "country": "Guam", "state": "", "timezone": "Pacific/Guam" },
    { "city": "Guatemala", "country": "Guatemala", "state": "Guatemala", "timezone": "America/Guatemala" },
    { "city": "Conakry", "country": "Guinea", "state": "Conakry", "timezone": "Africa/Conakry" },
    { "city": "Bissau", "country": "Guinea Bissau", "state": "Bissau", "timezone": "Africa/Bissau" },
    { "city": "Georgetown", "country": "Guyana", "state": "East Berbice-Corentyne", "timezone": "America/Guyana" },
    { "city": "Port-au-Prince", "country": "Haiti", "state": "Ouest", "timezone": "America/Port-au-Prince" },
    { "city": "Tegucigalpa", "country": "Honduras", "state": "Francisco Morazán", "timezone": "America/Tegucigalpa" },
    { "city": "Hong Kong", "country": "Hong Kong", "state": "", "timezone": "Asia/Hong_Kong" },
    { "city": "Budapest", "country": "Hungary", "state": "Budapest", "timezone": "Europe/Budapest" },
    { "city": "Reykjavík", "country": "Iceland", "state": "Suðurnes", "timezone": "Atlantic/Reykjavik" },
    { "city": "Tirupati", "country": "India", "state": "Andhra Pradesh", "timezone": "Asia/Kolkata" },
    { "city": "Vijayawada", "country": "India", "state": "Andhra Pradesh", "timezone": "Asia/Kolkata" },
    { "city": "Kochi", "country": "India", "state": "Kerala", "timezone": "Asia/Kolkata" },
    { "city": "Vishakhapatnam", "country": "India", "state": "Andhra Pradesh", "timezone": "Asia/Kolkata" },
    { "city": "Ahmedabad", "country": "India", "state": "Gujarat", "timezone": "Asia/Kolkata" },
    { "city": "Pune", "country": "India", "state": "Maharashtra", "timezone": "Asia/Kolkata" },
    { "city": "Chennai", "country": "India", "state": "Tamil Nadu", "timezone": "Asia/Kolkata" },
    { "city": "Hyderabad", "country": "India", "state": "Telangana", "timezone": "Asia/Kolkata" },
    { "city": "Bangalore", "country": "India", "state": "Karnataka", "timezone": "Asia/Kolkata" },
    { "city": "Kolkata", "country": "India", "state": "West Bengal", "timezone": "Asia/Kolkata" },
    { "city": "New Delhi", "country": "India", "state": "Delhi", "timezone": "Asia/Kolkata" },
    { "city": "Mumbai", "country": "India", "state": "Maharashtra", "timezone": "Asia/Kolkata" },
    { "city": "Jayapura", "country": "Indonesia", "state": "Papua", "timezone": "Asia/Jayapura" },
    { "city": "Makassar", "country": "Indonesia", "state": "Sulawesi Selatan", "timezone": "Asia/Makassar" },
    { "city": "Jakarta", "country": "Indonesia", "state": "Jakarta Raya", "timezone": "Asia/Jakarta" },
    { "city": "Tehran", "country": "Iran", "state": "Tehran", "timezone": "Asia/Tehran" },
    { "city": "Baghdad", "country": "Iraq", "state": "Baghdad", "timezone": "Asia/Baghdad" },
    { "city": "Dublin", "country": "Ireland", "state": "Dublin", "timezone": "Europe/Dublin" },
    { "city": "Douglas", "country": "Isle of Man", "state": "", "timezone": "Europe/Isle_of_Man" },
    { "city": "Jerusalem", "country": "Israel", "state": "Jerusalem", "timezone": "Asia/Jerusalem" },
    { "city": "Tel Aviv-Yafo", "country": "Israel", "state": "Tel Aviv", "timezone": "Asia/Jerusalem" },
    { "city": "Verona", "country": "Italy", "state": "Veneto", "timezone": "Europe/Rome" },
    { "city": "Turin", "country": "Italy", "state": "Piemonte", "timezone": "Europe/Rome" },
    { "city": "Genoa", "country": "Italy", "state": "Liguria", "timezone": "Europe/Rome" },
    { "city": "Florence", "country": "Italy", "state": "Toscana", "timezone": "Europe/Rome" },
    { "city": "Venice", "country": "Italy", "state": "Veneto", "timezone": "Europe/Rome" },
    { "city": "Palermo", "country": "Italy", "state": "Sicily", "timezone": "Europe/Rome" },
    { "city": "Naples", "country": "Italy", "state": "Campania", "timezone": "Europe/Rome" },
    { "city": "Milan", "country": "Italy", "state": "Lombardia", "timezone": "Europe/Rome" },
    { "city": "Rome", "country": "Italy", "state": "Lazio", "timezone": "Europe/Rome" },
    { "city": "Yamoussoukro", "country": "Ivory Coast", "state": "Lacs", "timezone": "Africa/Abidjan" },
    { "city": "Abidjan", "country": "Ivory Coast", "state": "Lagunes", "timezone": "Africa/Abidjan" },
    { "city": "Kingston", "country": "Jamaica", "state": "Kingston", "timezone": "America/Jamaica" },
    { "city": "Osaka", "country": "Japan", "state": "Osaka", "timezone": "Asia/Tokyo" },
    { "city": "Tokyo", "country": "Japan", "state": "Tokyo", "timezone": "Asia/Tokyo" },
    { "city": "Amman", "country": "Jordan", "state": "Amman", "timezone": "Asia/Amman" },
    { "city": "Qyzylorda", "country": "Kazakhstan", "state": "Qyzylorda", "timezone": "Asia/Qyzylorda" },
    { "city": "Astana", "country": "Kazakhstan", "state": "Aqmola", "timezone": "Asia/Almaty" },
    { "city": "Almaty", "country": "Kazakhstan", "state": "Almaty", "timezone": "Asia/Almaty" },
    { "city": "Mombasa", "country": "Kenya", "state": "Coast", "timezone": "Africa/Nairobi" },
    { "city": "Nairobi", "country": "Kenya", "state": "Nairobi", "timezone": "Africa/Nairobi" },
    { "city": "Tarawa", "country": "Kiribati", "state": "", "timezone": "Pacific/Tarawa" },
    { "city": "Pristina", "country": "Kosovo", "state": "Pristina", "timezone": "Europe/Belgrade" },
    { "city": "Kuwait", "country": "Kuwait", "state": "Al Kuwayt", "timezone": "Asia/Kuwait" },
    { "city": "Bishkek", "country": "Kyrgyzstan", "state": "Bishkek", "timezone": "Asia/Bishkek" },
    { "city": "Vientiane", "country": "Laos", "state": "Vientiane [prefecture]", "timezone": "Asia/Vientiane" },
    { "city": "Riga", "country": "Latvia", "state": "Riga", "timezone": "Europe/Riga" },
    { "city": "Beirut", "country": "Lebanon", "state": "Beirut", "timezone": "Asia/Beirut" },
    { "city": "Maseru", "country": "Lesotho", "state": "Maseru", "timezone": "Africa/Maseru" },
    { "city": "Monrovia", "country": "Liberia", "state": "Montserrado", "timezone": "Africa/Monrovia" },
    { "city": "Tripoli", "country": "Libya", "state": "Tajura' wa an Nawahi al Arba", "timezone": "Africa/Tripoli" },
    { "city": "Vaduz", "country": "Liechtenstein", "state": "", "timezone": "Europe/Vaduz" },
    { "city": "Vilnius", "country": "Lithuania", "state": "Vilniaus", "timezone": "Europe/Vilnius" },
    { "city": "Luxembourg", "country": "Luxembourg", "state": "Luxembourg", "timezone": "Europe/Luxembourg" },
    { "city": "Macau", "country": "Macau S.A.R", "state": "", "timezone": "Asia/Macau" },
    { "city": "Skopje", "country": "Macedonia", "state": "Centar", "timezone": "Europe/Skopje" },
    { "city": "Antananarivo", "country": "Madagascar", "state": "Antananarivo", "timezone": "Indian/Antananarivo" },
    { "city": "Blantyre", "country": "Malawi", "state": "Blantyre", "timezone": "Africa/Blantyre" },
    { "city": "Lilongwe", "country": "Malawi", "state": "Lilongwe", "timezone": "Africa/Blantyre" },
    { "city": "Kuala Lumpur", "country": "Malaysia", "state": "Selangor", "timezone": "Asia/Kuala_Lumpur" },
    { "city": "Male", "country": "Maldives", "state": "", "timezone": "Indian/Maldives" },
    { "city": "Timbuktu", "country": "Mali", "state": "Timbuktu", "timezone": "Africa/Bamako" },
    { "city": "Bamako", "country": "Mali", "state": "Bamako", "timezone": "Africa/Bamako" },
    { "city": "Valletta", "country": "Malta", "state": "", "timezone": "Europe/Malta" },
    { "city": "Majuro", "country": "Marshall Islands", "state": "", "timezone": "Pacific/Majuro" },
    { "city": "Nouakchott", "country": "Mauritania", "state": "Nouakchott", "timezone": "Africa/Nouakchott" },
    { "city": "Port Louis", "country": "Mauritius", "state": "", "timezone": "Indian/Mauritius" },
    { "city": "Ojinaga", "country": "Mexico", "state": "Chihuahua", "timezone": "America/Ojinaga" },
    { "city": "Hermosillo", "country": "Mexico", "state": "Sonora", "timezone": "America/Hermosillo" },
    { "city": "Matamoros", "country": "Mexico", "state": "Tamaulipas", "timezone": "America/Matamoros" },
    { "city": "Tijuana", "country": "Mexico", "state": "Baja California", "timezone": "America/Tijuana" },
    { "city": "Chihuahua", "country": "Mexico", "state": "Chihuahua", "timezone": "America/Chihuahua" },
    { "city": "Mazatlan", "country": "Mexico", "state": "Sinaloa", "timezone": "America/Mazatlan" },
    { "city": "Cancun", "country": "Mexico", "state": "Quintana Roo", "timezone": "America/Cancun" },
    { "city": "Merida", "country": "Mexico", "state": "Yucatán", "timezone": "America/Merida" },
    { "city": "Monterrey", "country": "Mexico", "state": "Nuevo León", "timezone": "America/Monterrey" },
    { "city": "Mexico City", "country": "Mexico", "state": "Distrito Federal", "timezone": "America/Mexico_City" },
    { "city": "Chisinau", "country": "Moldova", "state": "Chisinau", "timezone": "Europe/Chisinau" },
    { "city": "Monaco", "country": "Monaco", "state": "", "timezone": "Europe/Paris" },
    { "city": "Ulaanbaatar", "country": "Mongolia", "state": "Ulaanbaatar", "timezone": "Asia/Ulaanbaatar" },
    { "city": "Podgorica", "country": "Montenegro", "state": "Podgorica", "timezone": "Europe/Podgorica" },
    { "city": "Casablanca", "country": "Morocco", "state": "Grand Casablanca", "timezone": "Africa/Casablanca" },
    { "city": "Maputo", "country": "Mozambique", "state": "Maputo", "timezone": "Africa/Maputo" },
    { "city": "Naypyidaw", "country": "Myanmar", "state": "Mandalay", "timezone": "Asia/Rangoon" },
    { "city": "Rangoon", "country": "Myanmar", "state": "Yangon", "timezone": "Asia/Rangoon" },
    { "city": "Windhoek", "country": "Namibia", "state": "Khomas", "timezone": "Africa/Windhoek" },
    { "city": "Kathmandu", "country": "Nepal", "state": "Bhaktapur", "timezone": "Asia/Kathmandu" },
    { "city": "Amsterdam", "country": "Netherlands", "state": "Noord-Holland", "timezone": "Europe/Amsterdam" },
    { "city": "Noumea", "country": "New Caledonia", "state": "Sud", "timezone": "Pacific/Noumea" },
    { "city": "Wellington", "country": "New Zealand", "state": "Manawatu-Wanganui", "timezone": "Pacific/Auckland" },
    { "city": "Christchurch", "country": "New Zealand", "state": "Canterbury", "timezone": "Pacific/Auckland" },
    { "city": "Auckland", "country": "New Zealand", "state": "Auckland", "timezone": "Pacific/Auckland" },
    { "city": "Managua", "country": "Nicaragua", "state": "Managua", "timezone": "America/Managua" },
    { "city": "Niamey", "country": "Niger", "state": "Niamey", "timezone": "Africa/Niamey" },
    { "city": "Abuja", "country": "Nigeria", "state": "Federal Capital Territory", "timezone": "Africa/Lagos" },
    { "city": "Kano", "country": "Nigeria", "state": "Kano", "timezone": "Africa/Lagos" },
    { "city": "Lagos", "country": "Nigeria", "state": "Lagos", "timezone": "Africa/Lagos" },
    { "city": "Pyongyang", "country": "North Korea", "state": "P'yongyang", "timezone": "Asia/Pyongyang" },
    { "city": "Famagusta", "country": "Northern Cyprus", "state": "", "timezone": "Asia/Famagusta" },
    { "city": "Capitol Hill", "country": "Northern Mariana Islands", "state": "", "timezone": "Pacific/Saipan" },
    { "city": "Oslo", "country": "Norway", "state": "Oslo", "timezone": "Europe/Oslo" },
    { "city": "Muscat", "country": "Oman", "state": "Muscat", "timezone": "Asia/Muscat" },
    { "city": "Islamabad", "country": "Pakistan", "state": "I.C.T.", "timezone": "Asia/Karachi" },
    { "city": "Lahore", "country": "Pakistan", "state": "Punjab", "timezone": "Asia/Karachi" },
    { "city": "Karachi", "country": "Pakistan", "state": "Sindh", "timezone": "Asia/Karachi" },
    { "city": "Ngerulmud", "country": "Palau", "state": "", "timezone": "Pacific/Palau" },
    { "city": "Gaza", "country": "Palestine", "state": "", "timezone": "Asia/Gaza" },
    { "city": "Panama City", "country": "Panama", "state": "Panama", "timezone": "America/Panama" },
    { "city": "Port Moresby", "country": "Papua New Guinea", "state": "Central", "timezone": "Pacific/Port_Moresby" },
    { "city": "Asuncion", "country": "Paraguay", "state": "Asunción", "timezone": "America/Asuncion" },
    { "city": "Lima", "country": "Peru", "state": "Lima", "timezone": "America/Lima" },
    { "city": "Manila", "country": "Philippines", "state": "Metropolitan Manila", "timezone": "Asia/Manila" },
    { "city": "Lódz", "country": "Poland", "state": "Lódz", "timezone": "Europe/Warsaw" },
    { "city": "Gdansk", "country": "Poland", "state": "Pomeranian", "timezone": "Europe/Warsaw" },
    { "city": "Kraków", "country": "Poland", "state": "Lesser Poland", "timezone": "Europe/Warsaw" },
    { "city": "Warsaw", "country": "Poland", "state": "Masovian", "timezone": "Europe/Warsaw" },
    { "city": "Ponta Delgada", "country": "Portugal", "state": "Azores", "timezone": "Atlantic/Azores" },
    { "city": "Lisbon", "country": "Portugal", "state": "Lisboa", "timezone": "Europe/Lisbon" },
    { "city": "San Juan", "country": "Puerto Rico", "state": "", "timezone": "America/Puerto_Rico" },
    { "city": "Doha", "country": "Qatar", "state": "Ad Dawhah", "timezone": "Asia/Qatar" },
    { "city": "Bucharest", "country": "Romania", "state": "Bucharest", "timezone": "Europe/Bucharest" },
    { "city": "Sakhalin", "country": "Russia", "state": "Sakhalin", "timezone": "Asia/Sakhalin" },
    { "city": "Srednekolymsk", "country": "Russia", "state": "Sakha (Yakutia)", "timezone": "Asia/Srednekolymsk" },
    { "city": "Khandyga", "country": "Russia", "state": "Sakha (Yakutia)", "timezone": "Asia/Khandyga" },
    { "city": "Kaliningrad", "country": "Russia", "state": "Kaliningrad", "timezone": "Europe/Kaliningrad" },
    { "city": "Kirov", "country": "Russia", "state": "Kirov", "timezone": "Europe/Kirov" },
    { "city": "Astrakhan", "country": "Russia", "state": "Astrakhan'", "timezone": "Europe/Astrakhan" },
    { "city": "Saratov", "country": "Russia", "state": "Saratov", "timezone": "Europe/Saratov" },
    { "city": "Ulyanovsk", "country": "Russia", "state": "Ul'yanovsk", "timezone": "Europe/Ulyanovsk" },
    { "city": "Omsk", "country": "Russia", "state": "Omsk", "timezone": "Asia/Omsk" },
    { "city": "Novokuznetsk", "country": "Russia", "state": "Kemerovo", "timezone": "Asia/Novokuznetsk" },
    { "city": "Ust Nera", "country": "Russia", "state": "Sakha (Yakutia)", "timezone": "Asia/Ust-Nera" },
    { "city": "Tomsk", "country": "Russia", "state": "Tomsk", "timezone": "Asia/Tomsk" },
    { "city": "Anadyr", "country": "Russia", "state": "Chukchi Autonomous Okrug", "timezone": "Asia/Anadyr" },
    { "city": "Volgograd", "country": "Russia", "state": "Volgograd", "timezone": "Europe/Volgograd" },
    { "city": "Yekaterinburg", "country": "Russia", "state": "Sverdlovsk", "timezone": "Asia/Yekaterinburg" },
    { "city": "Samara", "country": "Russia", "state": "Samara", "timezone": "Europe/Samara" },
    { "city": "Barnaul", "country": "Russia", "state": "Altay", "timezone": "Asia/Barnaul" },
    { "city": "Novosibirsk", "country": "Russia", "state": "Novosibirsk", "timezone": "Asia/Novosibirsk" },
    { "city": "Irkutsk", "country": "Russia", "state": "Irkutsk", "timezone": "Asia/Irkutsk" },
    { "city": "Krasnoyarsk", "country": "Russia", "state": "Krasnoyarsk", "timezone": "Asia/Krasnoyarsk" },
    { "city": "Chita", "country": "Russia", "state": "Chita", "timezone": "Asia/Chita" },
    { "city": "Vladivostok", "country": "Russia", "state": "Primor'ye", "timezone": "Asia/Vladivostok" },
    { "city": "Yakutsk", "country": "Russia", "state": "Sakha (Yakutia)", "timezone": "Asia/Yakutsk" },
    { "city": "Magadan", "country": "Russia", "state": "Maga Buryatdan", "timezone": "Asia/Magadan" },
    { "city": "Petropavlovsk Kamchatskiy", "country": "Russia", "state": "Kamchatka", "timezone": "Asia/Kamchatka" },
    { "city": "Kamchatka", "country": "Russia", "state": "Kamchatka", "timezone": "Asia/Kamchatka" },
    { "city": "St. Petersburg", "country": "Russia", "state": "City of St. Petersburg", "timezone": "Europe/Moscow" },
    { "city": "Moscow", "country": "Russia", "state": "Moskva", "timezone": "Europe/Moscow" },
    { "city": "Kigali", "country": "Rwanda", "state": "Kigali City", "timezone": "Africa/Kigali" },
    { "city": "Basseterre", "country": "Saint Kitts and Nevis", "state": "", "timezone": "America/St_Kitts" },
    { "city": "Castries", "country": "Saint Lucia", "state": "", "timezone": "America/St_Lucia" },
    { "city": "Kingstown", "country": "Saint Vincent and the Grenadines", "state": "", "timezone": "America/St_Vincent" },
    { "city": "Apia", "country": "Samoa", "state": "", "timezone": "Pacific/Apia" },
    { "city": "San Marino", "country": "San Marino", "state": "", "timezone": "Europe/San_Marino" },
    { "city": "Sao Tome", "country": "Sao Tome and Principe", "state": "", "timezone": "Africa/Sao_Tome" },
    { "city": "Medina", "country": "Saudi Arabia", "state": "Al Madinah", "timezone": "Asia/Riyadh" },
    { "city": "Jeddah", "country": "Saudi Arabia", "state": "Makkah", "timezone": "Asia/Riyadh" },
    { "city": "Makkah", "country": "Saudi Arabia", "state": "Makkah", "timezone": "Asia/Riyadh" },
    { "city": "Riyadh", "country": "Saudi Arabia", "state": "Ar Riyad", "timezone": "Asia/Riyadh" },
    { "city": "Dakar", "country": "Senegal", "state": "Dakar", "timezone": "Africa/Dakar" },
    { "city": "Belgrade", "country": "Serbia", "state": "Grad Beograd", "timezone": "Europe/Belgrade" },
    { "city": "Victoria", "country": "Seychelles", "state": "", "timezone": "Indian/Mahe" },
    { "city": "Freetown", "country": "Sierra Leone", "state": "Western", "timezone": "Africa/Freetown" },
    { "city": "Singapore", "country": "Singapore", "state": "", "timezone": "Asia/Singapore" },
    { "city": "Bratislava", "country": "Slovakia", "state": "Bratislavský", "timezone": "Europe/Bratislava" },
    { "city": "Ljubljana", "country": "Slovenia", "state": "Osrednjeslovenska", "timezone": "Europe/Ljubljana" },
    { "city": "Guadalcanal", "country": "Solomon Islands", "state": "Guadalcanal", "timezone": "Pacific/Guadalcanal" },
    { "city": "Honiara", "country": "Solomon Islands", "state": "Guadalcanal", "timezone": "Pacific/Guadalcanal" },
    { "city": "Mogadishu", "country": "Somalia", "state": "Banaadir", "timezone": "Africa/Mogadishu" },
    { "city": "Bloemfontein", "country": "South Africa", "state": "Orange Free State", "timezone": "Africa/Johannesburg" },
    { "city": "Pretoria", "country": "South Africa", "state": "Gauteng", "timezone": "Africa/Johannesburg" },
    { "city": "Port Elizabeth", "country": "South Africa", "state": "Eastern Cape", "timezone": "Africa/Johannesburg" },
    { "city": "Durban", "country": "South Africa", "state": "KwaZulu-Natal", "timezone": "Africa/Johannesburg" },
    { "city": "Johannesburg", "country": "South Africa", "state": "Gauteng", "timezone": "Africa/Johannesburg" },
    { "city": "Cape Town", "country": "South Africa", "state": "Western Cape", "timezone": "Africa/Johannesburg" },
    { "city": "Grytviken", "country": "South Georgia and the Islands", "state": "", "timezone": "Atlantic/South_Georgia" },
    { "city": "Seoul", "country": "South Korea", "state": "Seoul", "timezone": "Asia/Seoul" },
    { "city": "Juba", "country": "South Sudan", "state": "Central Equatoria", "timezone": "Africa/Juba" },
    { "city": "Bilbao", "country": "Spain", "state": "País Vasco", "timezone": "Europe/Madrid" },
    { "city": "Canary", "country": "Spain", "state": "", "timezone": "Atlantic/Canary" },
    { "city": "Seville", "country": "Spain", "state": "Andalucía", "timezone": "Europe/Madrid" },
    { "city": "Valencia", "country": "Spain", "state": "Comunidad Valenciana", "timezone": "Europe/Madrid" },
    { "city": "Barcelona", "country": "Spain", "state": "Cataluña", "timezone": "Europe/Madrid" },
    { "city": "Madrid", "country": "Spain", "state": "Comunidad de Madrid", "timezone": "Europe/Madrid" },
    { "city": "Sri Jawewardenepura Kotte", "country": "Sri Lanka", "state": "Colombo", "timezone": "Asia/Colombo" },
    { "city": "Colombo", "country": "Sri Lanka", "state": "Colombo", "timezone": "Asia/Colombo" },
    { "city": "Khartoum", "country": "Sudan", "state": "Khartoum", "timezone": "Africa/Khartoum" },
    { "city": "Paramaribo", "country": "Suriname", "state": "Paramaribo", "timezone": "America/Paramaribo" },
    { "city": "Longyearbyen", "country": "Svalbard and Jan Mayen Islands", "state": "Svalbard", "timezone": "Arctic/Longyearbyen" },
    { "city": "Mbabane", "country": "Swaziland", "state": "Hhohho", "timezone": "Africa/Mbabane" },
    { "city": "Stockholm", "country": "Sweden", "state": "Stockholm", "timezone": "Europe/Stockholm" },
    { "city": "Bern", "country": "Switzerland", "state": "Bern", "timezone": "Europe/Zurich" },
    { "city": "Zürich", "country": "Switzerland", "state": "Zürich", "timezone": "Europe/Zurich" },
    { "city": "Geneva", "country": "Switzerland", "state": "Genève", "timezone": "Europe/Zurich" },
    { "city": "Damascus", "country": "Syria", "state": "Damascus", "timezone": "Asia/Damascus" },
    { "city": "Taipei", "country": "Taiwan", "state": "Taipei City", "timezone": "Asia/Taipei" },
    { "city": "Dushanbe", "country": "Tajikistan", "state": "Tadzhikistan Territories", "timezone": "Asia/Dushanbe" },
    { "city": "Dar es Salaam", "country": "Tanzania", "state": "Dar-Es-Salaam", "timezone": "Africa/Dar_es_Salaam" },
    { "city": "Bangkok", "country": "Thailand", "state": "Bangkok Metropolis", "timezone": "Asia/Bangkok" },
    { "city": "Nassau", "country": "The Bahamas", "state": "", "timezone": "America/Nassau" },
    { "city": "Banjul", "country": "The Gambia", "state": "Banjul", "timezone": "Africa/Banjul" },
    { "city": "Lome", "country": "Togo", "state": "Maritime", "timezone": "Africa/Lome" },
    { "city": "Tongatapu", "country": "Tonga", "state": "", "timezone": "Pacific/Tongatapu" },
    { "city": "Port-of-Spain", "country": "Trinidad and Tobago", "state": "Port of Spain", "timezone": "America/Port_of_Spain" },
    { "city": "Tunis", "country": "Tunisia", "state": "Tunis", "timezone": "Africa/Tunis" },
    { "city": "Adana", "country": "Turkey", "state": "Adana", "timezone": "Europe/Istanbul" },
    { "city": "Ankara", "country": "Turkey", "state": "Ankara", "timezone": "Europe/Istanbul" },
    { "city": "Istanbul", "country": "Turkey", "state": "Istanbul", "timezone": "Europe/Istanbul" },
    { "city": "Ashgabat", "country": "Turkmenistan", "state": "Ahal", "timezone": "Asia/Ashgabat" },
    { "city": "Grand Turk", "country": "Turks and Caicos Islands", "state": "", "timezone": "America/Grand_Turk" },
    { "city": "Funafuti", "country": "Tuvalu", "state": "", "timezone": "Pacific/Funafuti" },
    { "city": "Kampala", "country": "Uganda", "state": "Kampala", "timezone": "Africa/Kampala" },
    { "city": "Kharkiv", "country": "Ukraine", "state": "Kharkiv", "timezone": "Europe/Kiev" },
    { "city": "Kiev", "country": "Ukraine", "state": "Kiev", "timezone": "Europe/Kiev" },
    { "city": "Sharjah", "country": "UAE", "state": "Sharjah", "timezone": "Asia/Dubai" },
    { "city": "Abu Dhabi", "country": "UAE", "state": "Abu Dhabi", "timezone": "Asia/Dubai" },
    { "city": "Dubai", "country": "UAE", "state": "Dubay", "timezone": "Asia/Dubai" },
    { "city": "Cambridge", "country": "UK", "state": "Cambridgeshire", "timezone": "Europe/London" },
    { "city": "Edinburgh", "country": "UK", "state": "Edinburgh", "timezone": "Europe/London" },
    { "city": "Liverpool", "country": "UK", "state": "Merseyside", "timezone": "Europe/London" },
    { "city": "Cardiff", "country": "UK", "state": "Cardiff", "timezone": "Europe/London" },
    { "city": "Leeds", "country": "UK", "state": "West Yorkshire", "timezone": "Europe/London" },
    { "city": "Manchester", "country": "UK", "state": "Manchester", "timezone": "Europe/London" },
    { "city": "Birmingham", "country": "UK", "state": "West Midlands", "timezone": "Europe/London" },
    { "city": "Belfast", "country": "UK", "state": "Belfast", "timezone": "Europe/London" },
    { "city": "Glasgow", "country": "UK", "state": "Glasgow", "timezone": "Europe/London" },
    { "city": "London", "country": "UK", "state": "Westminster", "timezone": "Europe/London" },
    { "city": "Adak", "country": "USA", "state": "Alaska", "timezone": "America/Adak" },
    { "city": "Madison", "country": "USA", "state": "Wisconsin", "timezone": "America/Chicago" },
    { "city": "Palmer", "country": "USA", "state": "Alaska", "timezone": "America/Anchorage" },
    { "city": "Monterey", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "Louisville", "country": "USA", "state": "Kentucky", "timezone": "America/Kentucky/Louisville" },
    { "city": "Charlotte", "country": "USA", "state": "North Carolina", "timezone": "America/New_York" },
    { "city": "Portland", "country": "USA", "state": "Maine", "timezone": "America/New_York" },
    { "city": "Cordova", "country": "USA", "state": "Alaska", "timezone": "America/Anchorage" },
    { "city": "Vancouver", "country": "USA", "state": "Washington", "timezone": "America/Los_Angeles" },
    { "city": "Tucson", "country": "USA", "state": "Arizona", "timezone": "America/Phoenix" },
    { "city": "Reno", "country": "USA", "state": "Nevada", "timezone": "America/Los_Angeles" },
    { "city": "Albuquerque", "country": "USA", "state": "New Mexico", "timezone": "America/Denver" },
    { "city": "Austin", "country": "USA", "state": "Texas", "timezone": "America/Chicago" },
    { "city": "El Paso", "country": "USA", "state": "Texas", "timezone": "America/Denver" },
    { "city": "Jacksonville", "country": "USA", "state": "Florida", "timezone": "America/New_York" },
    { "city": "Indianapolis", "country": "USA", "state": "Indiana", "timezone": "America/Indiana/Indianapolis" },
    { "city": "Knoxville", "country": "USA", "state": "Tennessee", "timezone": "America/New_York" },
    { "city": "Baltimore", "country": "USA", "state": "Maryland", "timezone": "America/New_York" },
    { "city": "San Jose", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "Sacramento", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "Las Vegas", "country": "USA", "state": "Nevada", "timezone": "America/Los_Angeles" },
    { "city": "Portland", "country": "USA", "state": "Oregon", "timezone": "America/Los_Angeles" },
    { "city": "Salt Lake City", "country": "USA", "state": "Utah", "timezone": "America/Denver" },
    { "city": "Oklahoma City", "country": "USA", "state": "Oklahoma", "timezone": "America/Chicago" },
    { "city": "San Antonio", "country": "USA", "state": "Texas", "timezone": "America/Chicago" },
    { "city": "Cleveland", "country": "USA", "state": "Ohio", "timezone": "America/New_York" },
    { "city": "Cincinnati", "country": "USA", "state": "Ohio", "timezone": "America/New_York" },
    { "city": "Nashville", "country": "USA", "state": "Tennessee", "timezone": "America/Chicago" },
    { "city": "Memphis", "country": "USA", "state": "Tennessee", "timezone": "America/Chicago" },
    { "city": "Norfolk", "country": "USA", "state": "Virginia", "timezone": "America/New_York" },
    { "city": "Milwaukee", "country": "USA", "state": "Wisconsin", "timezone": "America/Chicago" },
    { "city": "Pittsburgh", "country": "USA", "state": "Pennsylvania", "timezone": "America/New_York" },
    { "city": "Minneapolis", "country": "USA", "state": "Minnesota", "timezone": "America/Chicago" },
    { "city": "Honolulu", "country": "USA", "state": "Hawaii", "timezone": "Pacific/Honolulu" },
    { "city": "Seattle", "country": "USA", "state": "Washington", "timezone": "America/Los_Angeles" },
    { "city": "Phoenix", "country": "USA", "state": "Arizona", "timezone": "America/Phoenix" },
    { "city": "San Diego", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "St. Louis", "country": "USA", "state": "Missouri", "timezone": "America/Chicago" },
    { "city": "New Orleans", "country": "USA", "state": "Louisiana", "timezone": "America/Chicago" },
    { "city": "Dallas", "country": "USA", "state": "Texas", "timezone": "America/Chicago" },
    { "city": "Boston", "country": "USA", "state": "Massachusetts", "timezone": "America/New_York" },
    { "city": "Tampa", "country": "USA", "state": "Florida", "timezone": "America/New_York" },
    { "city": "Philadelphia", "country": "USA", "state": "Pennsylvania", "timezone": "America/New_York" },
    { "city": "Detroit", "country": "USA", "state": "Michigan", "timezone": "America/Detroit" },
    { "city": "Anchorage", "country": "USA", "state": "Alaska", "timezone": "America/Anchorage" },
    { "city": "San Francisco", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "Denver", "country": "USA", "state": "Colorado", "timezone": "America/Denver" },
    { "city": "Houston", "country": "USA", "state": "Texas", "timezone": "America/Chicago" },
    { "city": "Miami", "country": "USA", "state": "Florida", "timezone": "America/New_York" },
    { "city": "Atlanta", "country": "USA", "state": "Georgia", "timezone": "America/New_York" },
    { "city": "Chicago", "country": "USA", "state": "Illinois", "timezone": "America/Chicago" },
    { "city": "Los Angeles", "country": "USA", "state": "California", "timezone": "America/Los_Angeles" },
    { "city": "Washington, D.C.", "country": "USA", "state": "District of Columbia", "timezone": "America/New_York" },
    { "city": "New York", "country": "USA", "state": "New York", "timezone": "America/New_York" },
    { "city": "Montevideo", "country": "Uruguay", "state": "Montevideo", "timezone": "America/Montevideo" },
    { "city": "Urgentch", "country": "Uzbekistan", "state": "Khorezm", "timezone": "Asia/Samarkand" },
    { "city": "Bukhara", "country": "Uzbekistan", "state": "Bukhoro", "timezone": "Asia/Samarkand" },
    { "city": "Andijon", "country": "Uzbekistan", "state": "Andijon", "timezone": "Asia/Tashkent" },
    { "city": "Samarkand", "country": "Uzbekistan", "state": "Samarkand", "timezone": "Asia/Samarkand" },
    { "city": "Tashkent", "country": "Uzbekistan", "state": "Tashkent", "timezone": "Asia/Tashkent" },
    { "city": "Efate", "country": "Vanuatu", "state": "Shefa", "timezone": "Pacific/Efate" },
    { "city": "Port Vila", "country": "Vanuatu", "state": "Shefa", "timezone": "Pacific/Efate" },
    { "city": "Vatican City", "country": "Vatican (Holy Sea)", "state": "Lazio", "timezone": "Europe/Rome" },
    { "city": "Valencia", "country": "Venezuela", "state": "Carabobo", "timezone": "America/Caracas" },
    { "city": "Caracas", "country": "Venezuela", "state": "Distrito Capital", "timezone": "America/Caracas" },
    { "city": "Hanoi", "country": "Vietnam", "state": "Thái Nguyên", "timezone": "Asia/Ho_Chi_Minh" },
    { "city": "Ho Chi Minh City", "country": "Vietnam", "state": "Ho Chi Minh City", "timezone": "Asia/Ho_Chi_Minh" },
    { "city": "Bir Lehlou", "country": "Western Sahara", "state": "", "timezone": "Africa/El_Aaiun" },
    { "city": "Aden", "country": "Yemen", "state": "`Adan", "timezone": "Asia/Aden" },
    { "city": "Sanaa", "country": "Yemen", "state": "Amanat Al Asimah", "timezone": "Asia/Aden" },
    { "city": "Lusaka", "country": "Zambia", "state": "Lusaka", "timezone": "Africa/Lusaka" },
    { "city": "Bulawayo", "country": "Zimbabwe", "state": "Bulawayo", "timezone": "Africa/Harare" },
    { "city": "Harare", "country": "Zimbabwe", "state": "Harare", "timezone": "Africa/Harare" }
]

const calculateTimeFromTimeZone = (timezone) => {
    let cityFullTime = new Date().toLocaleString('en-us', { timeZone: timezone })
    let cityTimeHr = new Date(cityFullTime).getHours()
    let cityTimeMn = new Date(cityFullTime).getMinutes()
    let cityTimeAP = 'AM'

    if (cityTimeHr === 0) {
        cityTimeHr = 12
    }
    else if (cityTimeHr > 12) {
        cityTimeHr -= 12
        cityTimeAP = 'PM'
    }

    if (cityTimeHr < 10) {
        cityTimeHr = '0' + cityTimeHr

    }

    if (cityTimeMn < 10) {
        cityTimeMn = '0' + cityTimeMn
    }

    return `${cityTimeHr}:${cityTimeMn} ${cityTimeAP}`
}

const displaySavedWorldClocks = () => {
    if (document.getElementById('world-clocks')) {
        container.removeChild(document.getElementById('world-clocks'))

        worldClocksContainer = document.createElement('div')
        worldClocksContainer.id = 'world-clocks'
        container.append(worldClocksContainer)

        if (localStorage.getItem('world-clocks')) {
            worldClocks = localStorage.getItem('world-clocks').split(':')

            for (var i = 0; i < worldClocks.length; i++) {
                worldClocksContainer.innerHTML +=
                    `
                <div class="world-clock-holder">
                    <div class="world-clock" id="world-clock-${i}">
                        <div class="world-clock-time">${calculateTimeFromTimeZone(worldClocks[i].split(';')[2])}</div>
                        <div class="world-clock-city">${worldClocks[i].split(';')[0]}, ${worldClocks[i].split(';')[1].split(', ')[worldClocks[i].split(';')[1].split(', ').length - 1]}</div>
                    </div>
                    <span id="delete-btn-${i}" class="delete_world-clock"><img src="./assets/images/delete_icon.svg" alt=""></span>
                </div>
                `
            }
        }
    }
}

displaySavedWorldClocks()

const closeSearchCity = ({ target }) => {
    if (target === searchCity || searchCity.contains(target) || target === addWorldClockBtn || addWorldClockBtn.contains(target)) {
        return
    }
    searchCity.style.display = 'none'
    container.style.opacity = 1
    addWorldClockBtn.style.opacity = 1
    addWorldClockBtn.style.cursor = 'pointer'
    document.removeEventListener('mousedown', closeSearchCity)
}

addWorldClockBtn.onclick = () => {

    if(deleteContainer.style.display === 'none'){
        if (searchCity.style.display === 'block') {
            searchCity.style.display = 'none'
            container.style.opacity = 1
            addWorldClockBtn.style.opacity = 1
            addWorldClockBtn.style.cursor = 'pointer'
        }
        else {
            searchCity.style.display = 'block'
            searchInput.style.display = 'none'
            container.style.opacity = 0.5
            addWorldClockBtn.style.opacity = 0
            addWorldClockBtn.style.cursor = 'pointer'
            document.addEventListener('mousedown', closeSearchCity)
        }
    }
}

backBtn.onclick = () => {
    searchCity.children[1].scrollTop = 0
    searchCity.style.display = 'none'
    container.style.opacity = 1
    addWorldClockBtn.style.opacity = 1
    addWorldClockBtn.style.cursor = 'pointer'
    searchBtn.src = './assets/images/search_icon.svg'

    for (var i = 0; i < cityData.length; i++) {
        worldClocksWidgets[i].style.display = 'flex'
    }
}

searchBtn.onclick = () => {
    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block'
        searchInput.value = ''
        searchInput.focus()
        searchBtn.src = './assets/images/close_icon.svg'
        document.getElementById('add-city').style.display = 'none'
    }
    else {
        searchInput.style.display = 'none'
        searchBtn.src = './assets/images/search_icon.svg'
        document.getElementById('add-city').style.display = ''

        for (var i = 0; i < cityData.length; i++) {
            worldClocksWidgets[i].style.display = 'flex'
        }
    }
}

setInterval(() => {
    const time = new Date()

    dateInfo.innerHTML = `${days[time.getDay()]}, ${time.getDate()} ${months[time.getMonth()]} ${time.getFullYear()}`
    dateInfo.innerHTML = `${days[time.getDay()]}, ${time.getDate()} ${months[8]} ${2023}`

    for (var i = 0; i < worldClocksContainer.children.length; i++) {
        worldClocksContainer.children[i].children[0].children[0].innerHTML = calculateTimeFromTimeZone(
            worldClocks[i].split(';')[2]
        )
    }

    var deleteBtns = document.querySelectorAll('.world-clock-holder .delete_world-clock')
    deleteBtns.forEach(e => {
        e.onclick = () => {

            deleteContainer.style.display = 'flex'
            container.style.opacity = 0.5
            addWorldClockBtn.style.opacity = 0
            addWorldClockBtn.style.cursor = 'default'

            deleteBtn.onclick = () => {
                worldClocks.splice(e.id.split('-')[2], 1)

                localStorage.setItem('world-clocks', worldClocks.join(':'))

                displaySavedWorldClocks()

                deleteContainer.style.display = 'none'
                container.style.opacity = 1
                addWorldClockBtn.style.opacity = 1
                addWorldClockBtn.style.cursor = 'pointer'

                deleteBtns = document.querySelectorAll('.world-clock-holder .delete_world-clock')
            }
            cancelBtn.onclick = () => {
                deleteContainer.style.display = 'none'
                container.style.opacity = 1
                addWorldClockBtn.style.opacity = 1
                addWorldClockBtn.style.cursor = 'pointer'
            }


        }
    });
})

let date = new Date;

let allCities = []
let allStates = []
let allCountries = []


cityData.sort((a, b) => {
    let fa = a.city.toLowerCase()
    let fb = b.city.toLowerCase()

    if (fa < fb) {
        return -1
    }
    else if (fa > fb) {
        return 1
    }
    else {
        return 0
    }
})

for (var i = 0; i < cityData.length; i++) {

    let cityTime = calculateTimeFromTimeZone(cityData[i].timezone)

    allCities.push(cityData[i].city)

    allStates.push(cityData[i].state)

    allCountries.push(cityData[i].country)


    if (cityData[i].state) {
        cities.innerHTML +=
            `
        <div class="city-holder" id="city-${i}">
            <div>
                <div class="city">${cityData[i].city}</div>
                <div class="state">${cityData[i].state}, ${cityData[i].country}</div>
            </div>
            <div class="time">
                <span>${cityTime}</span>
                <span style="display: none;">${cityData[i].timezone}</span>
            </div>
        </div>
        `
    }
    else {
        cities.innerHTML +=
            `
        <div class="city-holder" id="city-${i}">
            <div>
                <div class="city">${cityData[i].city}</div>
                <div class="state">${cityData[i].country}</div>
            </div>
            <div class="time">
                <span>${cityTime}</span>
                <span style="display: none;">${cityData[i].timezone}</span>
            </div>
        </div>
        `
    }
}

var worldClocksWidgets = document.querySelectorAll('.city-holder')

searchInput.addEventListener('input', () => {

    for (var j = 0; j < cityData.length; j++) {
        if (!cityData[j].city.toLowerCase().includes(searchInput.value.toLowerCase()) && !cityData[j].state.toLowerCase().includes(searchInput.value.toLowerCase()) && !cityData[j].country.toLowerCase().includes(searchInput.value.toLowerCase())) {
            worldClocksWidgets[j].style.display = 'none'
        }
        else {
            worldClocksWidgets[j].style.display = 'flex'
        }
    }
})

worldClocksWidgets.forEach(e => {
    e.onclick = () => {
        var saveText = `${e.children[0].children[0].innerHTML};${e.children[0].children[1].innerHTML};${e.children[1].children[1].innerHTML}`

        if (localStorage.getItem('world-clocks')) {
            let savedWorldClocks = localStorage.getItem('world-clocks').split(':')

            if (!savedWorldClocks.includes(saveText)) {
                savedWorldClocks.push(saveText)
                savedWorldClocks.sort((a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase())
                })
                localStorage.setItem('world-clocks', savedWorldClocks.join(':'))

                displaySavedWorldClocks()
                backBtn.click()
            }
        }
        else {
            localStorage.setItem('world-clocks', saveText)
            displaySavedWorldClocks()
            backBtn.click()
        }
    }
});

