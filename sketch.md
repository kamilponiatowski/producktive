# Oryginalna lista zadań
- TODO: zmień link do LinkedIn - końcówka rev (aktualnie na czas rekrutacji: https://www.linkedin.com/in/kamil-poniatowski-rev/)
- TODO sprawdź jak jest podpięty i gdzie leci numer telefonu z popup,
- TODO aktualnie UKRYTY jest "Gwarancja satysfakcji: Jeśli nie będziesz zadowolony z projektu na etapie designu, zwracam zaliczkę za ten etap. Zależy mi na Twojej rekomendacji, nie tylko na wykonaniu zlecenia." - wymyśl mniej zabowiązujące
- TODO wygeneruj bonusy w postaci pdf'ów platformy rozwojowej dla konceptu "1-All-1" -> btw. dobra nazwa skrótowa :D pomyśl o gratisach odnośnie produktywności jako PDF czy dostęp do portalu/strony z pigułkami wiedzy na różne tematy – główny benefit: zwiększenie produktywności (narzędzia/techniki/wzorce) i rozwiązania na bolączki (techniki oddechowe, 80/20, itp.)
- TODO na kiedyś: zastanów się z czego będę korzystał przy sklepach – na pewno nie z WooCommerce – usuń
- TODO we współpracy z Designerem - zakadaj do Marcina Jakiel
- TODO na kiedyś: pomyśl o sekcji/pod-stronie co będzie leprze o stronie ze współpracami: z kim mogę np. Filip z KKK odnośnie SEO, Designer Marcin Jakiel, etc.?
- TODO stwórz logo
- TODO: ogarnij platformę i skonfiguruj kalendarz z umawianiem terminów,
- TODO: sprawdź wysyłanie formularzy i wysyłka emaili z edge funckjons z supabase
- TODO dodaj dla neksus i miralive znaczniki zgodne z schema.org
- TODO stwórz podpis jaki będę umieszczał na stronach które robię
<!-- - w prawym dolnym rogu mamy przyciski od przewijania strony gdy klikam na przycisk w dół i zjedzie do dołu to znika to jest dobre zachowanie, natomiast ten górny przycisk od przewijania do góry obniża się w miejsce znikniętego przycisku to już nie jest dobre zachowanie, powinny być te przyciski na sztywno w tym samym miejscu się pojawiać niezależnie czy drugi jest zamontowany czy nie upewnij się ze używasz dyrektywy v-show a nie if, -->
- zmień formularz tak by użytkownik mógł wybrac kilka opcji tego czego potrzebuje np. Strana wizytówka + Landing Page
- zmień limit znaków na 5000 i daj funkcjonalność do przesyłania załączników - dostosuj też wszystko co jest do tego potrzebne jak baza danych supabase czy potrzebne sql query czy edge functions którę powiniennem dodać w supabase,

===
- Aktualny projekt jest pod adresem '/' czyli startowa strona dla https://producktive.pl, czeka nas spora zmiana. Chcę by na stronie głównej były na razie dwa kafelki blog i współpraca. Pamiętaj w całym projekcie o dobrych praktykach i wzorcach programowania, ponieważ będzie to projekt wizytówka do CV i rozmów kwalifikacyjnych. Pamiętaj o dostępności, CEO, schema.org i tłumaczeniach. Nacis na UX i spójny design.
- w blog chce stworzyć serię postów "Pinia od A do Z", użytkownik będzie widział wiele kafelków od początkowych tematów do zaawansowanych oraz będzie miał możliwość kliknięcia w przycisk w kafelku (bardziej kółko/checkbox) które będzie odpowiadało za oznaczenie posta jako przeczytany i zrozumiany - ta funkcjonalność powinna być też dostępna pod postem jako "Materiał pochłonięty, idę dale" i wtedy użytkownik będzie miał odznaczony post i będzie on widoczny jako wyszażony na głównym widoku serii i przejdzie do kolejnego posta by zaznajomić się z wiedzą,
- podczas tego tworzenie chcę użyć directus jako CMS dla tych artykułów, mam przygotowane wstępne instrukcje, ale CHCĘ byś podejmował własne dobre decyzję przy projektowaniu dlatego przejrzyj materiał #directus-posts-pinia.md czy #directus-nuxt-guide.md Podczas tej pracy chce się nauczyć z niego korzystać także zostaw mi pod koniec plik z przewodnikiem jak i co mam robić by się nauczyć tym zarządzać,
- meteriały które myślałem użyć są w pinia_post.md na górze jest spis treści, myślałem by z każdego odnośnika stworzyć mały post dzięki czemu uczeń będzie mógł szybko wrócić do materiałów i nie będzie przytłoczony ilością tekstu od razu. Piszę posty w stylu z pliku #prompt-Maj-Stajla.md,
- przeanalizuj wszystko, ułóż w całość i wykonaj pracę pamiętając o początkowych założeniach,


feat: migration to cal.eu, Guarantee temporarily hidden, fix post contact
# Uporządkowana lista zadań (po polsku)

## Personalizacja
- Dodaj numer telefonu do sekcji "Wolisz pisać bezpośrednio?" (obok e-maila) +48886127854.
- Zostaw obecny link do LinkedIn (https://www.linkedin.com/in/kamil-poniatowski-rev/), bo jest używany w procesie rekrutacji – zmień po zakończeniu rekrutacji.
- Dodaj na początku strony informację: "Kamil Poniatowski" – klient od razu wie, z kim ma do czynienia.
- Dodaj logo lub avatar z Twoją twarzą.

## Animacje i efekty
- Zwolnij animację tekstu "które pracują na Twój biznes." – efekty mają przechodzić wolniej, by budować spokój.
- Zwolnij pasek z technologiami.

## Ulepszenia UX
- Dodaj kojącą muzykę lofi z widocznym przyciskiem do jej wyłączenia.
- Dodaj popup do kontaktu.
- Dodaj przyciski szybkiego przewijania strony (góra/dół).
- Popraw select w formularzu kontaktowym (płynna animacja kursora, lepszy wygląd; rozważ zamianę na kafelek do zaznaczenia).
- Upewnij się, że po najechaniu na scroll jest widoczny kursor (obecnie znika).

## Prawo i prywatność
- Dodaj stronę z polityką prywatności.
- Przejrzyj i popraw obsługę cookies.

## Aktualizacje treści
- Usuń gwarancję "100% zadowolenia lub zwrot" – zbyt ryzykowne. Zmień na: "Gwarancja satysfakcji: Jeśli nie będziesz zadowolony z projektu na etapie designu, zwracam 100% zaliczki. Chcę, żebyś polecił mnie swoim znajomym, nie żałował."
- Dodaj przedział cenowy (unikaj niskich kwot, na start promocje/rabaty).
- Popraw literówkę w "Nowoczesna strona wizytówkowa dla agencji ubezpieczeniowej ze Włocławka."
- Usuń z portfolio ZenBarber — Salon fryzjerski.
- Dodaj informację o zabezpieczeniach (np. honeypot w formularzach).
- Dodaj przedział cenowy 5-9.

## Współpraca i networking
- Zmień "we współpracy z Designerem" na "UI/UX Design".
- Dodaj stronę ze współpracami (np. Filip z KKK – SEO, Marcin Jakiel – design).

## Produktywność i wartość
- Stwórz "jeden za wszystkich" – umowę dla klientów na wzajemne priorytetowe świadczenie usług na atrakcyjnych warunkach.
- Dodaj gratisy produktywności (PDF, portal z pigułkami wiedzy: narzędzia, techniki, wzorce, 80/20, techniki oddechowe).

## SEO i dostępność
- Tłumacz skróty SEO w nawiasach (np. "roboty które widzą Twoją stronę i wpływają na pozycje w wyszukiwarkach"). Użyj tooltipów, zadbaj o WCAG.
- Zdecyduj o narzędziach e-commerce (nie używaj WooCommerce).

## Design i branding
- Wygeneruj profesjonalne zdjęcie do sekcji "O mnie".
- Stwórz logo.
- Stwórz podpis, który będziesz umieszczał na stronach, które tworzysz.
