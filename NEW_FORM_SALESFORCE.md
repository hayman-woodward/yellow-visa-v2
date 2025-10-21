

## Examplo de Payloads

### Student Example
```json
{
  "firstName": "Maria",
  "lastName": "Silva Santos",
  "destination": "united-states",
  "goal": "study-abroad",
  "studentOption": "postgraduate-masters",
  "tourismOption": null,
  "professionalOption": null,
  "academicInfo": "already-have-degree",
  "professionalAdditionalInfo": null,
  "tourismAdditionalInfo": null,
  "howManyPeople": null,
  "howLongTime": null,
  "annualIncome": "less-than-50k",
  "visaType": "student",
  "email": "maria.silva@email.com",
  "phone": "+5511999999999",
  "country": "Brazil",
  "language": "Portuguese",
  "utm_data": {
    "utm_campaign": "facebook_campaign_2025",
    "utm_source": "facebook",
    "utm_medium": "social",
    "utm_term": "visto estudante",
    "refer": "google.com",
    "seller": "seller_123"
  }
}
```

### Professional Example
```json
{
  "firstName": "João",
  "lastName": "Silva Santos",
  "destination": "united-states",
  "goal": "grow-professionally",
  "studentOption": null,
  "tourismOption": null,
  "professionalOption": "knowledge-specialist",
  "academicInfo": "already-have-degree",
  "professionalAdditionalInfo": "5-to-10-years",
  "tourismAdditionalInfo": null,
  "howManyPeople": null,
  "howLongTime": null,
  "annualIncome": "50k-to-199k",
  "visaType": "professional",
  "email": "joao.silva@email.com",
  "phone": "+5511999999999",
  "country": "Brazil",
  "language": "Portuguese",
  "utm_data": {
    "utm_campaign": "facebook_campaign_2025",
    "utm_source": "facebook",
    "utm_medium": "social",
    "utm_term": "visto profissional",
    "refer": "google.com",
    "seller": "seller_123"
  }
}
```

### Tourist Example
```json
{
  "firstName": "Ana",
  "lastName": "Costa Lima",
  "destination": "portugal",
  "goal": "know-the-world",
  "studentOption": null,
  "tourismOption": "unforgettable-moments",
  "professionalOption": null,
  "academicInfo": "already-have-degree",
  "professionalAdditionalInfo": null,
  "tourismAdditionalInfo": "with-family",
  "howManyPeople": "three-to-four",
  "howLongTime": "15-to-30-days",
  "annualIncome": "500k+",
  "visaType": "tourist",
  "email": "ana.costa@email.com",
  "phone": "+5511888888888",
  "country": "Brazil",
  "language": "Portuguese",
  "utm_data": {
    "utm_campaign": "instagram_campaign_2024",
    "utm_source": "instagram",
    "utm_medium": "social",
    "utm_term": "turismo portugal",
    "refer": "facebook.com",
    "seller": "seller_456"
  }
}
```

## Field Values

### `destination` (SELECT)
- `"united-states"` 
- `"portugal"` 
- `"other"`  (valor customizado)

### `goal` (SELECT)
- `"grow-professionally"`
- `"start-business-invest"` 
- `"study-abroad"` 
- `"know-the-world"` 

### `studentOption` (SELECT)
- `"degree-abroad"` 
- `"live-abroad-studying"` 
- `"postgraduate-masters"` 
- `"exploring-options"`

### `tourismOption` (SELECT)
- `"unforgettable-moments"` 
- `"explore-new-places"` 
- `"need-break-reconnect"` 

### `professionalOption` (SELECT)
- `"technical-professional"` s
- `"knowledge-specialist"` 
- `"creative-artistic"` 
- `"professor-researcher"` 
- `"other-profile"` 

### `academicInfo` (SELECT)
- `"already-have-degree"` 
- `"technical-training"`
- `"building-career"`
- `""` (empty string if no academic info provided)
**Note:** This field now appears in all 3 flows (student, professional, tourist)

### `professionalAdditionalInfo` (SELECT)
- `"less-than-5-years"` 
- `"5-to-10-years"` 
- `"more-than-10-years"` 

### `tourismAdditionalInfo` (SELECT)
- `"alone"` 
- `"with-family"` 
- `"with-friends"` 

### `howManyPeople` (SELECT)
- `"two-people"` 
- `"three-to-four"` 
- `"more-than-four"`

### `howLongTime` (SELECT)
- `"less-than-15-days"` 
- `"15-to-30-days"` 
- `"more-than-1-month"` 

### `annualIncome` (SELECT)
- `"less-than-50k"` 
- `"50k-to-199k"` 
- `"200k-to-499k"` 
- `"500k+"` 

### `visaType` (INTERNAL)
**Type:** String (Internal field - not filled by user)
**Possible values:**
- `"student"` (when goal = "study-abroad")
- `"tourist"` (when goal = "know-the-world")
- `"professional"` (when goal = "grow-professionally" or "start-business-invest")
**Note:** Esse campo é preenchido automaticamente dependendo da resposta do objetivo (goal)

### `country` (SELECT)
- `"Afghanistan"`
- `"Albania"`
- `"Algeria"`
- `"Andorra"`
- `"Angola"`
- `"Antigua and Barbuda"`
- `"Argentina"`
- `"Armenia"`
- `"Australia"`
- `"Austria"`
- `"Azerbaijan"`
- `"The Bahamas"`
- `"Bahrain"`
- `"Bangladesh"`
- `"Barbados"`
- `"Belarus"`
- `"Belgium"`
- `"Belize"`
- `"Benin"`
- `"Bhutan"`
- `"Bolivia"`
- `"Bosnia and Herzegovina"`
- `"Botswana"`
- `"Brazil"`
- `"Brunei"`
- `"Bulgaria"`
- `"Burkina Faso"`
- `"Burundi"`
- `"Cabo Verde"`
- `"Cambodia"`
- `"Cameroon"`
- `"Canada"`
- `"Central African Republic"`
- `"Chad"`
- `"Chile"`
- `"China"`
- `"Colombia"`
- `"Comoros"`
- `"Congo, Democratic Republic of the"`
- `"Congo, Republic of the"`
- `"Costa Rica"`
- `"Cote d'Ivoire"`
- `"Croatia"`
- `"Cuba"`
- `"Cyprus"`
- `"Czech Republic"`
- `"Denmark"`
- `"Djibouti"`
- `"Dominica"`
- `"Dominican Republic"`
- `"East Timor (Timor-Leste)"`
- `"Ecuador"`
- `"Egypt"`
- `"El Salvador"`
- `"Equatorial Guinea"`
- `"Eritrea"`
- `"Estonia"`
- `"Eswatini"`
- `"Ethiopia"`
- `"Fiji"`
- `"Finland"`
- `"France"`
- `"Gabon"`
- `"The Gambia"`
- `"Georgia"`
- `"Germany"`
- `"Ghana"`
- `"Greece"`
- `"Grenada"`
- `"Guatemala"`
- `"Guinea"`
- `"Guinea-Bissau"`
- `"Guyana"`
- `"Haiti"`
- `"Honduras"`
- `"Hungary"`
- `"Iceland"`
- `"India"`
- `"Indonesia"`
- `"Iran"`
- `"Iraq"`
- `"Ireland"`
- `"Israel"`
- `"Italy"`
- `"Jamaica"`
- `"Japan"`
- `"Jordan"`
- `"Kazakhstan"`
- `"Kenya"`
- `"Kiribati"`
- `"Korea, North"`
- `"Korea, South"`
- `"Kosovo"`
- `"Kuwait"`
- `"Kyrgyzstan"`
- `"Laos"`
- `"Latvia"`
- `"Lebanon"`
- `"Lesotho"`
- `"Liberia"`
- `"Libya"`
- `"Liechtenstein"`
- `"Lithuania"`
- `"Luxembourg"`
- `"Madagascar"`
- `"Malawi"`
- `"Malaysia"`
- `"Maldives"`
- `"Mali"`
- `"Malta"`
- `"Marshall Islands"`
- `"Mauritania"`
- `"Mauritius"`
- `"Mexico"`
- `"Micronesia, Federated States of"`
- `"Moldova"`
- `"Monaco"`
- `"Mongolia"`
- `"Montenegro"`
- `"Morocco"`
- `"Mozambique"`
- `"Myanmar (Burma)"`
- `"Namibia"`
- `"Nauru"`
- `"Nepal"`
- `"Netherlands"`
- `"New Zealand"`
- `"Nicaragua"`
- `"Niger"`
- `"Nigeria"`
- `"North Macedonia"`
- `"Norway"`
- `"Oman"`
- `"Pakistan"`
- `"Palau"`
- `"Panama"`
- `"Papua New Guinea"`
- `"Paraguay"`
- `"Peru"`
- `"Philippines"`
- `"Poland"`
- `"Portugal"`
- `"Qatar"`
- `"Romania"`
- `"Russia"`
- `"Rwanda"`
- `"Saint Kitts and Nevis"`
- `"Saint Lucia"`
- `"Saint Vincent and the Grenadines"`
- `"Samoa"`
- `"San Marino"`
- `"Sao Tome and Principe"`
- `"Saudi Arabia"`
- `"Senegal"`
- `"Serbia"`
- `"Seychelles"`
- `"Sierra Leone"`
- `"Singapore"`
- `"Slovakia"`
- `"Slovenia"`
- `"Solomon Islands"`
- `"Somalia"`
- `"South Africa"`
- `"Spain"`
- `"Sri Lanka"`
- `"Sudan"`
- `"Sudan, South"`
- `"Suriname"`
- `"Sweden"`
- `"Switzerland"`
- `"Syria"`
- `"Taiwan"`
- `"Tajikistan"`
- `"Tanzania"`
- `"Thailand"`
- `"Togo"`
- `"Tonga"`
- `"Trinidad and Tobago"`
- `"Tunisia"`
- `"Turkey"`
- `"Turkmenistan"`
- `"Tuvalu"`
- `"Uganda"`
- `"Ukraine"`
- `"United Arab Emirates (UAE)"`
- `"United Kingdom (UK)"`
- `"United States of America (USA)"`
- `"Uruguay"`
- `"Uzbekistan"`
- `"Vanuatu"`
- `"Vatican City"`
- `"Venezuela"`
- `"Vietnam"`
- `"Yemen"`
- `"Zambia"`
- `"Zimbabwe"`

### `language` (SELECT)
- `"Alemão"`
- `"Árabe"`
- `"Bengali"`
- `"Chinês (Mandarim)"`
- `"Coreano"`
- `"Dinamarquês"`
- `"Espanhol"`
- `"Finlandês"`
- `"Francês"`
- `"Grego"`
- `"Hebraico"`
- `"Hindi"`
- `"Holandês"`
- `"Húngaro"`
- `"Inglês"`
- `"Italiano"`
- `"Japonês"`
- `"Norueguês"`
- `"Polonês"`
- `"Português"`
- `"Punjabi"`
- `"Romeno"`
- `"Russo"`
- `"Sueco"`
- `"Tailandês"`
- `"Turco"`
- `"Ucraniano"`
- `"Vietnamita"`

### `utm_data` (OBJECT)
```json
{
  "utm_campaign": "string",
  "utm_source": "string",
  "utm_medium": "string",
  "utm_term": "string",
  "refer": "string",
  "seller": "string"
}
```

## Notes
- Unfilled fields = `null`
- Not all fields are always sent (depends on the flow)
- All values are strings, except `utm_data` which is an object
