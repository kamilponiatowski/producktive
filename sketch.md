# Oryginalna lista zadań
- TODO: zmień link do LinkedIn - końcówka rev (aktualnie na czas rekrutacji: https://www.linkedin.com/in/kamil-poniatowski-rev/)
- dodaj WCAG do technologi których używam + top co jeszcze znajdziesz i uznasz za warte wspomnienia,
- TODO sprawdź jak jest podpięty i gdzie leci numer telefonu z popup,
- TODO aktualnie UKRYJ jest "Gwarancja satysfakcji: Jeśli nie będziesz zadowolony z projektu na etapie designu, zwracam zaliczkę za ten etap. Zależy mi na Twojej rekomendacji, nie tylko na wykonaniu zlecenia." - wymyśl mniej zabowiązujące
- na razie ukryj kafelek ""Gwarancja satysfakcji"
w formularzu kontaktowym ma w Czego potrzebujesz Sklep online oraz Produkt cyfrowy/SaaS na razie one mają status wkrótce więc niech będą te opcjię disabled na razie wyłączone bez możliwosći zaznaczenia i niech pojawią się jako ostatnie pozycje za Inne, daj tooltip dlaczego to nie działą np. "Dostępność wyboru w krótce",
- TODO wygeneruj bonusy w postaci pdf'ów platformy rozwojowej dla konceptu "1-All-1" -> btw. dobra nazwa skrótowa :D pomyśl o gratisach odnośnie produktywności jako PDF czy dostęp do portalu/strony z pigułkami wiedzy na różne tematy – główny benefit: zwiększenie produktywności (narzędzia/techniki/wzorce) i rozwiązania na bolączki (techniki oddechowe, 80/20, itp.)
- dodaj do opisu w Jeden za wszystkich, wszyscy za jdednego "Każdy klient Producktive ma możliwość dołączenia do "1-All-1" czylli dołącza do sieci przedsiębiorców ... "
- TODO na kiedyś: zastanów się z czego będę korzystał przy sklepach – na pewno nie z WooCommerce – usuń
- TODO we współpracy z Designerem - zakadaj do Marcina Jakiel
- TODO na kiedyś: pomyśl o sekcji/pod-stronie co będzie leprze o stronie ze współpracami: z kim mogę np. Filip z KKK odnośnie SEO, Designer Marcin Jakiel, etc.?
- TODO stwórz logo
- TODO stwórz podpis jaki będę umieszczał na stronach które robię
- w prawym dolnym rogu mamy przyciski od przewijania strony gdy klikam na przycisk w dół i zjedzie do dołu to znika to jest dobre zachowanie, natomiast ten górny przycisk od przewijania do góry obniża się w miejsce znikniętego przycisku to już nie jest dobre zachowanie, powinny być te przyciski na sztywno w tym samym miejscu się pojawiać niezależnie czy drugi jest zamontowany czy nie upewnij się ze używasz dyrektywy v-show a nie if,
- gdy zamykam odtwarzacz muzyki nie mam możliwości ponownego jego włączenia, po jego zamknięciu [aria-label="Zamknij odtwarzacz"] powinien być jakiś przycisk do ponownego pokazania odtrwarzacza, może on się tak jakby częściowo ukrywać i sugerowac ponowne jego rozwinięcia by był widoczny - dostosuj odpowiedni przycisk/ikonę dla tej funkcjonalności,
- wumieść zmianę języka w prawym górnym rogu - aktualnie jest przed CTA "Porozmawiajmy",
- gdy klikam w nawigację z pozycji footer na podstronie "polityka prywatności" tworzy się błędny adres url: http://localhost:3000/polityka-prywatnosci#uslugi i nie przekierowuj na żadną podstronę, dodatkowo gdy klikam w logo w header również nie przechodzi do strony głównej,
- stwórz podstronę dla cookies -> patrz załącznik DODAJ!!!,
- włącz muzykę na starcie strony - upewnij się w zgodzie z przepisami czy powinna być włączona po zaakaceptowaniu cookies czy nie,
- w kafelku strona wizytówka dodaj na końcu "...  Szybka, mobilna, optymalna pod SEO oraz GEO czyli wyniki wyszukiwania w google oraz optymalizacja pod wyszukiwarki wspomagane przez AI (ChatGPT, Perplexity, Google AI Overviews, Claude itp.)"
- z portfolio w kafelku neksus jest informacja w benefitach "0 zł/mies. hosting" usuń ponieważ jest nie prawdziwa możęsz dodac dark mode
- z portfolio w Miralive w benefitach Schema.org nic nie mówi klientowi zamień to na benefit "Bezpośrednia możliwość zakupu ubezpieczenia" dodatkowo Lighthouse 95+ też może nic nie mówić potencjalnemu klientowi zamień to na coś zrozumiałego + Dark mode zamień na "Przejrzysta strona z wieloma CTA czyli przyciskami wzywającymi do akcji użytkownika"
- w kafelku dla Producktive w tytule zamiast Ta strona napisz "Dziękuję, że tu jesteś :)" + zmień też lighthouse na bardziej opisowy, wytłumacz zagadnienie po skrócie PWA, zamiast i18n napisz tłumaczenia na inne języki,
- TODO: ogarnij platformę i skonfiguruj kalendarz z umawianiem terminów,
- TODO: sprawdź wysyłanie formularzy i wysyłka emaili z edge funckjons z supabase
- gdy przewijam stronę lub klikam w nawigację to url się nie aktualizuję a jeśli ktoś będzie chciał skopiować link gdy jest na portfolio lub kontakcie będzie to link do głównej strony zmień tak by pasek dynamicznie się aktualizował w zależności na jakiej stronie jesteśmy,
- TODO dodaj dla neksus i miralive znaczniki zgodne z schema.org

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
