//Importuję bibliotekę Player z paczki @vimeo/player, która umożliwia interakcję z odtwarzaczem wideo Vimeo.
//Importuję funkcję throttle z biblioteki lodash.throttle, która pozwala kontrolować częstotliwość wywoływania funkcji.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
//Inicjalizacja odtwarzacza:
//Tworzę nową instancję obiektu Player i przekazuję identyfikator elementu <iframe> zawierającego odtwarzacz wideo (w tym przypadku "vimeo-player").
const player = new Player('vimeo-player');
//Śledzenie zdarzenia timeupdate:
//Rejestruję nasłuchiwanie na zdarzenie "timeupdate" (aktualizacja czasu) na odtwarzaczu wideo.
//Używam funkcji throttle, aby ograniczyć częstotliwość wywoływania funkcji handleTimeUpdate do co najmniej 1 sekundy.
player.on('timeupdate', throttle(handleTimeUpdate, 1000));
//Obsługa aktualizacji czasu odtwarzania:
//Definiuję funkcję handleTimeUpdate, która jest wywoływana za każdym razem, gdy następuje aktualizacja czasu odtwarzania.
//Pobieram aktualny czas odtwarzania zdarzenia (event.seconds) i zapisuję go w localStorage pod kluczem "videoplayer-current-time".
function handleTimeUpdate(event) {
  const currentTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}
//Przywracanie zapisanego czasu odtwarzania:
//Dodaję nasłuchiwanie na zdarzenie "DOMContentLoaded", które jest wywoływane, gdy cała strona została załadowana.
//Pobieram zapisany czas odtwarzania z localStorage pod kluczem "videoplayer-current-time".
//Jeśli istnieje zapisany czas, ustawiam czas odtwarzania na odtwarzaczu za pomocą metody setCurrentTime.
document.addEventListener('DOMContentLoaded', function () {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
});
