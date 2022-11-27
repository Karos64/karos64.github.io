function randomize(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function create_data() {
    let animal_json = [
        {
            "id": 1,
            "title": "Łajka",
            "img": "../imgs/doggy.jpg",
            'wojewodztwo': 'Małopolskie',
            'miasto': 'Kraków',
            'typ': 'pies',
            'plec': "Samiec",
            'rasa': "Jamnik",
            'waga': 2,
            'wiek': 1,
            'rodowod': false,
            'schronisko': 'DogNoHome Kraków'
        },
    ];

    let names = [
        'Astro', 'Balto', 'Barney', 'Barry', 'Beethoven', 'Benji', 'Kieł', 'Boo', 'Boss', 'Bruiser', 'Chojrak',
        'Cywil', 'Droopy', 'Dżok', 'Eddie', 'Goofy', 'Fala', 'Happy', 'Hooch', 'Huckelberry', 'Kibic', 'Lampo',
        'Lassie', 'Łajka', 'Madison', 'Odie', 'Pankracy', 'Piorun', 'Pluto', 'Reksio', 'Ren', 'Rex', 'Rin Tin Tin',
        'Saba', 'Scooby Doo']

    let wojewodztwa = [
        "dolnośląskie", "kujawsko-pomorskie", "lubelskie", "łódzkie", "małopolskie", "mazowieckie", "opolskie",
        "podkarpackie", "podlaskie", "pomorskie", "śląskie", "świętokrzyskie", "warmińsko-mazurskie",
        "wielkopolskie", "zachodniopomorskie"
    ]

    let miasta = {
        'DOLNOŚLĄSKIE': ['Bolesławiec', 'Nowogrodziec', 'Bielawa', 'Dzierżoniów', 'Pieszyce', 'Piława Górna', 'Niemcza', 'Głogów', 'Góra', 'Wąsosz', 'Jawor', 'Bolków', 'Karpacz', 'Kowary', 'Piechowice', 'Szklarska Poręba', 'Kamienna Góra', 'Lubawka', 'Duszniki-Zdrój', 'Kłodzko', 'Kudowa-Zdrój', 'Nowa Ruda', 'Polanica-Zdrój', 'Bystrzyca Kłodzka', 'Lądek-Zdrój', 'Międzylesie', 'Radków', 'Stronie Śląskie', 'Szczytna', 'Chojnów', 'Prochowice', 'Lubań', 'Świeradów-Zdrój', 'Leśna', 'Olszyna', 'Lubin', 'Ścinawa', 'Gryfów Śląski', 'Lubomierz', 'Lwówek Śląski', 'Mirsk', 'Wleń', 'Milicz', 'Oleśnica', 'Bierutów', 'Międzybórz', 'Syców', 'Twardogóra', 'Oława', 'Jelcz-Laskowice', 'Chocianów', 'Polkowice', 'Przemków', 'Strzelin', 'Wiązów', 'Środa Śląska', 'Świdnica', 'Świebodzice', 'Jaworzyna Śląska', 'Strzegom', 'Żarów', 'Oborniki Śląskie', 'Prusice', 'Trzebnica', 'Żmigród', 'Boguszów-Gorce', 'Jedlina-Zdrój', 'Szczawno-Zdrój', 'Głuszyca', 'Mieroszów', 'Brzeg Dolny', 'Wołów', 'Kąty Wrocławskie', 'Sobótka', 'Siechnice', 'Bardo', 'Ząbkowice Śląskie', 'Ziębice', 'Złoty Stok', 'Zawidów', 'Zgorzelec', 'Bogatynia', 'Pieńsk', 'Węgliniec', 'Wojcieszów', 'Złotoryja', 'Świerzawa', 'Jelenia Góra', 'Legnica', 'Wrocław', 'Wałbrzych'],
        'KUJAWSKO-POMORSKIE': ['Aleksandrów Kujawski', 'Ciechocinek', 'Nieszawa', 'Brodnica', 'Górzno', 'Jabłonowo Pomorskie', 'Koronowo', 'Solec Kujawski', 'Chełmno', 'Golub-Dobrzyń', 'Kowalewo Pomorskie', 'Łasin', 'Radzyń Chełmiński', 'Inowrocław', 'Gniewkowo', 'Janikowo', 'Kruszwica', 'Pakość', 'Lipno', 'Dobrzyń nad Wisłą', 'Skępe', 'Mogilno', 'Strzelno', 'Kcynia', 'Mrocza', 'Nakło nad Notecią', 'Szubin', 'Radziejów', 'Piotrków Kujawski', 'Rypin', 'Kamień Krajeński', 'Sępólno Krajeńskie', 'Więcbork', 'Nowe', 'Świecie', 'Chełmża', 'Tuchola', 'Wąbrzeźno', 'Kowal', 'Brześć Kujawski', 'Chodecz', 'Izbica Kujawska', 'Lubień Kujawski', 'Lubraniec', 'Barcin', 'Janowiec Wielkopolski', 'Łabiszyn', 'Żnin', 'Bydgoszcz', 'Grudziądz', 'Toruń', 'Włocławek'],
        'LUBELSKIE': ['Międzyrzec Podlaski', 'Terespol', 'Biłgoraj', 'Frampol', 'Józefów', 'Tarnogród', 'Rejowiec Fabryczny', 'Siedliszcze', 'Hrubieszów', 'Janów Lubelski', 'Modliborzyce', 'Krasnystaw', 'Kraśnik', 'Annopol', 'Urzędów', 'Lubartów', 'Kock', 'Ostrów Lubelski', 'Bełżyce', 'Bychawa', 'Łęczna', 'Łuków', 'Stoczek Łukowski', 'Opole Lubelskie', 'Poniatowa', 'Parczew', 'Puławy', 'Kazimierz Dolny', 'Nałęczów', 'Radzyń Podlaski', 'Dęblin', 'Ryki', 'Świdnik', 'Piaski', 'Tomaszów Lubelski', 'Lubycza Królewska', 'Łaszczów', 'Tyszowce', 'Włodawa', 'Krasnobród', 'Szczebrzeszyn', 'Zwierzyniec', 'Biała Podlaska', 'Chełm', 'Lublin', 'Zamość'],
        'LUBUSKIE': ['Kostrzyn nad Odrą', 'Witnica', 'Gubin', 'Krosno Odrzańskie', 'Międzyrzecz', 'Skwierzyna', 'Trzciel', 'Nowa Sól', 'Bytom Odrzański', 'Kożuchów', 'Nowe Miasteczko', 'Cybinka', 'Ośno Lubuskie', 'Rzepin', 'Słubice', 'Dobiegniew', 'Drezdenko', 'Strzelce Krajeńskie', 'Lubniewice', 'Sulęcin', 'Torzym', 'Świebodzin', 'Zbąszynek', 'Babimost', 'Czerwieńsk', 'Kargowa', 'Nowogród Bobrzański', 'Sulechów', 'Gozdnica', 'Żagań', 'Iłowa', 'Małomice', 'Szprotawa', 'Łęknica', 'Żary', 'Jasień', 'Lubsko', 'Sława', 'Szlichtyngowa', 'Wschowa', 'Gorzów Wielkopolski', 'Zielona Góra'],
        'ŁÓDZKIE': ['Bełchatów', 'Zelów', 'Kutno', 'Krośniewice', 'Żychlin', 'Łask', 'Łęczyca', 'Łowicz', 'Koluszki', 'Rzgów', 'Tuszyn', 'Drzewica', 'Opoczno', 'Konstantynów Łódzki', 'Pabianice', 'Działoszyn', 'Pajęczno', 'Sulejów', 'Wolbórz', 'Poddębice', 'Uniejów', 'Radomsko', 'Kamieńsk', 'Przedbórz', 'Rawa Mazowiecka', 'Biała Rawska', 'Sieradz', 'Błaszki', 'Warta', 'Złoczew', 'Tomaszów Mazowiecki', 'Wieluń', 'Wieruszów', 'Zduńska Wola', 'Szadek', 'Głowno', 'Ozorków', 'Zgierz', 'Aleksandrów Łódzki', 'Stryków', 'Brzeziny', 'Łódź', 'Piotrków Trybunalski', 'Skierniewice'],
        'MAŁOPOLSKIE': ['Bochnia', 'Nowy Wiśnicz', 'Brzesko', 'Czchów', 'Alwernia', 'Chrzanów', 'Libiąż', 'Trzebinia', 'Dąbrowa Tarnowska', 'Szczucin', 'Gorlice', 'Biecz', 'Bobowa', 'Krzeszowice', 'Skała', 'Skawina', 'Słomniki', 'Świątniki Górne', 'Limanowa', 'Mszana Dolna', 'Miechów', 'Dobczyce', 'Myślenice', 'Sułkowice', 'Grybów', 'Krynica-Zdrój', 'Muszyna', 'Piwniczna-Zdrój', 'Stary Sącz', 'Nowy Targ', 'Szczawnica', 'Rabka-Zdrój', 'Bukowno', 'Olkusz', 'Wolbrom', 'Oświęcim', 'Brzeszcze', 'Chełmek', 'Kęty', 'Zator', 'Nowe Brzesko', 'Proszowice', 'Jordanów', 'Sucha Beskidzka', 'Maków Podhalański', 'Ciężkowice', 'Radłów', 'Ryglice', 'Tuchów', 'Wojnicz', 'Zakliczyn', 'Żabno', 'Zakopane', 'Andrychów', 'Kalwaria Zebrzydowska', 'Wadowice', 'Niepołomice', 'Wieliczka', 'Kraków', 'Nowy Sącz', 'Tarnów'],
        'MAZOWIECKIE': ['Białobrzegi', 'Wyśmierzyce', 'Ciechanów', 'Glinojeck', 'Garwolin', 'Łaskarzew', 'Pilawa', 'Żelechów', 'Gostynin', 'Milanówek', 'Podkowa Leśna', 'Grodzisk Mazowiecki', 'Grójec', 'Mogielnica', 'Nowe Miasto nad Pilicą', 'Warka', 'Kozienice', 'Legionowo', 'Serock', 'Lipsko', 'Łosice', 'Maków Mazowiecki', 'Różan', 'Mińsk Mazowiecki', 'Halinów', 'Kałuszyn', 'Mrozy', 'Sulejówek', 'Mława', 'Nowy Dwór Mazowiecki', 'Nasielsk', 'Zakroczym', 'Myszyniec', 'Ostrów Mazowiecka', 'Brok', 'Józefów', 'Otwock', 'Karczew', 'Góra Kalwaria', 'Konstancin-Jeziorna', 'Piaseczno', 'Tarczyn', 'Drobin', 'Gąbin', 'Wyszogród', 'Płońsk', 'Raciąż', 'Piastów', 'Pruszków', 'Brwinów', 'Przasnysz', 'Chorzele', 'Przysucha', 'Pułtusk', 'Pionki', 'Iłża', 'Skaryszew', 'Mordy', 'Sierpc', 'Sochaczew', 'Sokołów Podlaski', 'Kosów Lacki', 'Szydłowiec', 'Błonie', 'Łomianki', 'Ożarów Mazowiecki', 'Węgrów', 'Łochów', 'Kobyłka', 'Marki', 'Ząbki', 'Zielonka', 'Radzymin', 'Tłuszcz', 'Wołomin', 'Wyszków', 'Zwoleń', 'Bieżuń', 'Żuromin', 'Żyrardów', 'Mszczonów', 'Ostrołęka', 'Płock', 'Radom', 'Siedlce'],
        'OPOLSKIE': ['Brzeg', 'Grodków', 'Lewin Brzeski', 'Baborów', 'Głubczyce', 'Kietrz', 'Kędzierzyn-Koźle', 'Byczyna', 'Kluczbork', 'Wołczyn', 'Gogolin', 'Krapkowice', 'Zdzieszowice', 'Namysłów', 'Głuchołazy', 'Korfantów', 'Nysa', 'Otmuchów', 'Paczków', 'Dobrodzień', 'Gorzów Śląski', 'Olesno', 'Praszka', 'Niemodlin', 'Ozimek', 'Prószków', 'Biała', 'Głogówek', 'Prudnik', 'Kolonowskie', 'Leśnica', 'Strzelce Opolskie', 'Ujazd', 'Zawadzkie', 'Opole'],
        'PODKARPACKIE': ['Ustrzyki Dolne', 'Brzozów', 'Dębica', 'Brzostek', 'Pilzno', 'Jarosław', 'Radymno', 'Pruchnik', 'Jasło', 'Kołaczyce', 'Kolbuszowa', 'Dukla', 'Iwonicz-Zdrój', 'Jedlicze', 'Rymanów', 'Leżajsk', 'Nowa Sarzyna', 'Lubaczów', 'Cieszanów', 'Narol', 'Oleszyce', 'Łańcut', 'Mielec', 'Przecław', 'Radomyśl Wielki', 'Nisko', 'Rudnik nad Sanem', 'Ulanów', 'Przeworsk', 'Kańczuga', 'Sieniawa', 'Ropczyce', 'Sędziszów Małopolski', 'Dynów', 'Błażowa', 'Boguchwała', 'Głogów Małopolski', 'Sokołów Małopolski', 'Tyczyn', 'Sanok', 'Zagórz', 'Stalowa Wola', 'Zaklików', 'Strzyżów', 'Baranów Sandomierski', 'Nowa Dęba', 'Lesko', 'Krosno', 'Przemyśl', 'Rzeszów', 'Tarnobrzeg'],
        'PODLASKIE': ['Augustów', 'Lipsk', 'Choroszcz', 'Czarna Białostocka', 'Łapy', 'Michałowo', 'Supraśl', 'Suraż', 'Tykocin', 'Wasilków', 'Zabłudów', 'Bielsk Podlaski', 'Brańsk', 'Grajewo', 'Rajgród', 'Szczuczyn', 'Hajnówka', 'Kleszczele', 'Kolno', 'Stawiski', 'Jedwabne', 'Nowogród', 'Goniądz', 'Knyszyn', 'Mońki', 'Sejny', 'Siemiatycze', 'Drohiczyn', 'Dąbrowa Białostocka', 'Krynki', 'Sokółka', 'Suchowola', 'Wysokie Mazowieckie', 'Ciechanowiec', 'Czyżew', 'Szepietowo', 'Zambrów', 'Białystok', 'Łomża', 'Suwałki'],
        'POMORSKIE': ['Bytów', 'Miastko', 'Chojnice', 'Brusy', 'Czersk', 'Człuchów', 'Czarne', 'Debrzno', 'Pruszcz Gdański', 'Kartuzy', 'Żukowo', 'Kościerzyna', 'Kwidzyn', 'Prabuty', 'Lębork', 'Łeba', 'Malbork', 'Nowy Staw', 'Krynica Morska', 'Nowy Dwór Gdański', 'Hel', 'Jastarnia', 'Puck', 'Władysławowo', 'Ustka', 'Kępice', 'Czarna Woda', 'Skórcz', 'Starogard Gdański', 'Skarszewy', 'Tczew', 'Gniew', 'Pelplin', 'Reda', 'Rumia', 'Wejherowo', 'Dzierzgoń', 'Sztum', 'Gdańsk', 'Gdynia', 'Słupsk', 'Sopot'],
        'ŚLĄSKIE': ['Będzin', 'Czeladź', 'Wojkowice', 'Siewierz', 'Sławków', 'Szczyrk', 'Czechowice-Dziedzice', 'Wilamowice', 'Cieszyn', 'Ustroń', 'Wisła', 'Skoczów', 'Strumień', 'Blachownia', 'Koniecpol', 'Knurów', 'Pyskowice', 'Sośnicowice', 'Toszek', 'Kłobuck', 'Krzepice', 'Lubliniec', 'Woźniki', 'Łaziska Górne', 'Mikołów', 'Orzesze', 'Myszków', 'Koziegłowy', 'Żarki', 'Pszczyna', 'Racibórz', 'Krzanowice', 'Kuźnia Raciborska', 'Czerwionka-Leszczyny', 'Kalety', 'Miasteczko Śląskie', 'Radzionków', 'Tarnowskie Góry', 'Bieruń', 'Imielin', 'Lędziny', 'Pszów', 'Radlin', 'Rydułtowy', 'Wodzisław Śląski', 'Poręba', 'Zawiercie', 'Łazy', 'Ogrodzieniec', 'Pilica', 'Szczekociny', 'Żywiec', 'Bielsko-Biała', 'Bytom', 'Chorzów', 'Częstochowa', 'Dąbrowa Górnicza', 'Gliwice', 'Jastrzębie-Zdrój', 'Jaworzno', 'Katowice', 'Mysłowice', 'Piekary Śląskie', 'Ruda Śląska', 'Rybnik', 'Siemianowice Śląskie', 'Sosnowiec', 'Świętochłowice', 'Tychy', 'Zabrze', 'Żory'],
        'ŚWIĘTOKRZYSKIE': ['Busko-Zdrój', 'Stopnica', 'Jędrzejów', 'Małogoszcz', 'Sędziszów', 'Kazimierza Wielka', 'Skalbmierz', 'Bodzentyn', 'Chęciny', 'Chmielnik', 'Daleszyce', 'Końskie', 'Stąporków', 'Opatów', 'Ożarów', 'Ostrowiec Świętokrzyski', 'Ćmielów', 'Kunów', 'Działoszyce', 'Pińczów', 'Sandomierz', 'Koprzywnica', 'Zawichost', 'Skarżysko-Kamienna', 'Suchedniów', 'Starachowice', 'Wąchock', 'Osiek', 'Połaniec', 'Staszów', 'Włoszczowa', 'Kielce'],
        'WARMIŃSKO-MAZURSKIE': ['Bartoszyce', 'Górowo Iławeckie', 'Bisztynek', 'Sępopol', 'Braniewo', 'Frombork', 'Pieniężno', 'Działdowo', 'Lidzbark', 'Młynary', 'Pasłęk', 'Tolkmicko', 'Ełk', 'Giżycko', 'Ryn', 'Iława', 'Lubawa', 'Kisielice', 'Susz', 'Zalewo', 'Kętrzyn', 'Korsze', 'Reszel', 'Lidzbark Warmiński', 'Orneta', 'Mrągowo', 'Mikołajki', 'Nidzica', 'Nowe Miasto Lubawskie', 'Olecko', 'Barczewo', 'Biskupiec', 'Dobre Miasto', 'Jeziorany', 'Olsztynek', 'Ostróda', 'Miłakowo', 'Miłomłyn', 'Morąg', 'Biała Piska', 'Orzysz', 'Pisz', 'Ruciane-Nida', 'Szczytno', 'Pasym', 'Gołdap', 'Węgorzewo', 'Elbląg', 'Olsztyn'],
        'WIELKOPOLSKIE': ['Chodzież', 'Margonin', 'Szamocin', 'Czarnków', 'Krzyż Wielkopolski', 'Trzcianka', 'Wieleń', 'Gniezno', 'Czerniejewo', 'Kłecko', 'Trzemeszno', 'Witkowo', 'Borek Wielkopolski', 'Gostyń', 'Krobia', 'Pogorzela', 'Poniec', 'Grodzisk Wielkopolski', 'Rakoniewice', 'Wielichowo', 'Jaraczewo', 'Jarocin', 'Żerków', 'Stawiszyn', 'Kępno', 'Koło', 'Dąbie', 'Kłodawa', 'Przedecz', 'Golina', 'Kleczew', 'Rychwał', 'Sompolno', 'Ślesin', 'Kościan', 'Czempiń', 'Krzywiń', 'Śmigiel', 'Sulmierzyce', 'Kobylin', 'Koźmin Wielkopolski', 'Krotoszyn', 'Zduny', 'Osieczna', 'Rydzyna', 'Międzychód', 'Sieraków', 'Lwówek', 'Nowy Tomyśl', 'Opalenica', 'Zbąszyń', 'Oborniki', 'Rogoźno', 'Ostrów Wielkopolski', 'Nowe Skalmierzyce', 'Odolanów', 'Raszków', 'Grabów nad Prosną', 'Mikstat', 'Ostrzeszów', 'Piła', 'Łobżenica', 'Ujście', 'Wyrzysk', 'Wysoka', 'Chocz', 'Dobrzyca', 'Pleszew', 'Luboń', 'Puszczykowo', 'Buk', 'Kostrzyn', 'Kórnik', 'Mosina', 'Murowana Goślina', 'Pobiedziska', 'Stęszew', 'Swarzędz', 'Bojanowo', 'Jutrosin', 'Miejska Górka', 'Rawicz', 'Słupca', 'Zagórów', 'Obrzycko', 'Ostroróg', 'Pniewy', 'Szamotuły', 'Wronki', 'Środa Wielkopolska', 'Dolsk', 'Książ Wielkopolski', 'Śrem', 'Turek', 'Dobra', 'Tuliszków', 'Wągrowiec', 'Gołańcz', 'Skoki', 'Wolsztyn', 'Miłosław', 'Nekla', 'Pyzdry', 'Września', 'Złotów', 'Jastrowie', 'Krajenka', 'Okonek', 'Kalisz', 'Konin', 'Leszno', 'Poznań'],
        'ZACHODNIOPOMORSKIE': ['Białogard', 'Karlino', 'Tychowo', 'Choszczno', 'Drawno', 'Pełczyce', 'Recz', 'Czaplinek', 'Drawsko Pomorskie', 'Kalisz Pomorski', 'Złocieniec', 'Goleniów', 'Maszewo', 'Nowogard', 'Stepnica', 'Gryfice', 'Płoty', 'Trzebiatów', 'Cedynia', 'Chojna', 'Gryfino', 'Mieszkowice', 'Moryń', 'Trzcińsko-Zdrój', 'Dziwnów', 'Golczewo', 'Kamień Pomorski', 'Międzyzdroje', 'Wolin', 'Kołobrzeg', 'Gościno', 'Bobolice', 'Polanów', 'Sianów', 'Barlinek', 'Dębno', 'Myślibórz', 'Nowe Warpno', 'Police', 'Lipiany', 'Pyrzyce', 'Darłowo', 'Sławno', 'Stargard', 'Chociwel', 'Dobrzany', 'Ińsko', 'Suchań', 'Szczecinek', 'Barwice', 'Biały Bór', 'Borne Sulinowo', 'Świdwin', 'Połczyn-Zdrój', 'Wałcz', 'Człopa', 'Mirosławiec', 'Tuczno', 'Dobra', 'Łobez', 'Resko', 'Węgorzyno', 'Koszalin', 'Szczecin', 'Świnoujście']
    }


    let img_array = []

    for (let i = 1; i <= 9; i++) {
        // img_array.push(fs.readFileSync(path.join(__dirname + `/../img/dog${i}.jpg`)).toString('hex'))
        img_array.push(`../imgs/dog${i}.jpg`)
    }

    for (let i = 2; i < 20; i++) {
        animal_json.push(
            {
                'id': i,
                'title': randomize(names),
                'img': randomize(img_array)
            }
        )
    }

    return animal_json
}

function createElement(elem) {
    let wrap_main = document.querySelector('#main_blocks');

    if (wrap_main != null) {
        let a_elem = document.createElement("a");
        a_elem.href = "./pet.html?id=" + elem['id'];

        let quiz_block = document.createElement("div");
        quiz_block.classList.add('quiz-block');

        let image_box = document.createElement("div");
        image_box.classList.add("image-box")

        let image = document.createElement("img");
        image.classList.add("image");
        image.src = elem['img'];

        let description = document.createElement("span");
        description.classList.add("description");
        if (elem['title'].length > 23) {
            elem['title'] = elem['title'].substring(0, 20) + "...";

        }
        description.innerHTML = elem['title'];

        image_box.appendChild(image);
        quiz_block.appendChild(image_box);
        quiz_block.appendChild(description);
        a_elem.appendChild(quiz_block);

        wrap_main.appendChild(a_elem);
    } else {
        console.log("Can't find #main_blocks");
    }


}

function wrap_data(data) {

    return JSON.parse(JSON.stringify(data));
}


function build_content() {
    let parsed_data = wrap_data(create_data());

    for (let elem in parsed_data) {
        createElement(parsed_data[elem]);
    }

}

