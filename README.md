Edytor modułu działa na serwerze HTTP. Domyślnie jest to serwer Edycji Online (EO), który serwuje pliki w formacie epXML do otwarcia w edytorze.

Możliwe jest uruchomienie edytora na dowolnym serwerze HTTP w celach testowych. W tym celu należy skopiować katalog główny edytora /export na wybrany serwer HTTP. W tym przypadku nie mamy możliwości bezpośredniego serwowania plików do edytora, dlatego należy wpisać ręcznie adres pliku epXML do edycji w pliku startowym start.html. Należy ustawić rolę użytkownika w pliku export/epeditor/js/epo-api.js - userRoles_EPO_do_not_change = [AUTHOR_ROLE].

W środowisku produkcyjnym, wymiana informacji (w szczególności epXMLi modułów) między ramkami edytora modułu a stroną główną jest zaimplementowana z użyciem HTML5-Messaging.
Ramka edytora po otrzymaniu wiadomości ze źródłem modułu w postaci string, uruchamia funkcję XOPUS Editor.getActiveCanvas.loadDocument(), która powoduje wywołanie funkcji loadCustomXML (ustawionej przy pomocy narzędzia XOPUS IO.setLoadXMLFunction(loadCustomXML)), w której następuje załadowanie nadesłanego epXML do edytora.

Ze względu na pochodzenie ramek z różnych domen oraz bezpieczeństwo systemu, konieczne jest ustawienie odpowiednich adresów przy wysyłaniu wiadomości, wartości domyślne na stronie głównej ustawiane są przez serwer EO a w kodzie edytora za pomocą zmiennej ALLOWED_IFRAME_URLS.

Licencja Xopus uzyskana od firmy SDL:
umieścić w katalogu export/license/ w pliku o nazwie 'domena'.txt

URLe:
W przypadku zmiany domen należy zmienić następujące URL (w katalogu export/epeditor/js):
	- w pliku womi-reference.js:
		* var WOMIURI = "http://www.beta.epodreczniki.pl";
	- w pliku main.js:
		* var ALLOWED_IFRAME_URLS = [ "http://www.test.epodreczniki.pl", "https://www.test.epodreczniki.pl", "http://www.localhost.epodreczniki.pl:8000", "http://www.beta.epodreczniki.pl", "https://www.beta.epodreczniki.pl" ];
	- w pliku lister-dialog.js:
		* var searchURI = "https://www.beta.epodreczniki.pl/edit/tiles/searchforxopus";
		* var foldersURI = "https://www.beta.epodreczniki.pl/edit/tiles/foldersforxopus";
		* var WOMIURI = "http://www.beta.epodreczniki.pl";
	- w pliku bookmark-dialog.js:
		* var collectionListURI = "//www.beta.epodreczniki.pl/edit/common/api/interlinks";
		  * Przykład zwracanego pliku: interlinks.xml
		* var collectionURI = "//preview.beta.epodreczniki.pl/content/collection/{0}/{1}/collection.xml";
		* var referablesURI = "//www.beta.epodreczniki.pl/edit/common/api/object/collection/{0}/{1}/referables/xml";
		  * Przykład zwracanego pliku: export/epeditor/references.xml
	- w pliku glossary-reference-dialog.js:
		* var referablesURI = "//www.beta.epodreczniki.pl/edit/common/api/object/collection/" + getCollectionId() + "/referables/xml";
	- w pliku load-womi-metadata.js:
		* var previewAddr = "https://preview.beta.epodreczniki.pl/content/womi/";
