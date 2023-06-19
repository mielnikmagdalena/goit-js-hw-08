//Importowanie biblioteki lodash.throttle:
//Ta linijka importuje funkcję throttle z biblioteki lodash.throttle. throttle jest używane do kontrolowania częstotliwości aktualizacji local storage.
import throttle from 'lodash.throttle';
//Pobieranie elementów formularza:Te linijki kodu pobierają referencje do elementów formularza, takich jak formularz, pole email i pole wiadomości.
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
//Definiowanie klucza local storage:Ten kod definiuje klucz, który będzie używany do zapisywania i pobierania danych z local storage.
const storageKey = 'feedback-form-state';

// Zapisywanie wartości pól formularza w local storage przy każdej zmianie:
//Ta linijka kodu dodaje nasłuchiwanie na zdarzenie input dla formularza. Za pomocą funkcji throttle kontrolujemy częstotliwość zapisu danych w local storage. Funkcja saveFormData będzie wywoływana przy każdej zmianie wartości pól formularza.
form.addEventListener('input', throttle(saveFormData, 500));

// Wypełnianie pól formularza zapisanymi danymi z local storage przy przeładowaniu strony:
//Ta linijka kodu dodaje nasłuchiwanie na zdarzenie DOMContentLoaded, które występuje po załadowaniu strony.
//Przy użyciu funkcji populateFormFields będziemy wypełniać pola formularza zapisanymi danymi z local storage.
window.addEventListener('DOMContentLoaded', populateFormFields);

// Obsługa zdarzenia wysłania formularza:
//Ta linijka kodu dodaje nasłuchiwanie na zdarzenie submit dla formularza. Gdy formularz zostanie wysłany, funkcja handleSubmit będzie wywołana.
form.addEventListener('submit', handleSubmit);
//Ta funkcja tworzy obiekt formData z wartościami pól email i message.
function saveFormData() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  //Następnie zapisuje ten obiekt w local storage przy użyciu localStorage.setItem.
  localStorage.setItem(storageKey, JSON.stringify(formData));
}
//Ta funkcja pobiera z local storage zapisane dane na podstawie klucza storageKey. Jeśli dane istnieją, są one przypisywane do pól formularza.
function populateFormFields() {
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}
//Funkcja handleSubmit:.
//Ta funkcja obsługuje zdarzenie wysłania formularza.
//Po zatrzymaniu domyślnego działania formularza, usuwa dane z local storage, resetuje pola formularza i wyświetla dane formularza w konsoli.
function handleSubmit(event) {
  event.preventDefault();

  // Wysyłanie formularza...

  // Czyszczenie storage i pól formularza po wysłaniu
  localStorage.removeItem(storageKey);
  form.reset();

  // Wylogowanie danych formularza do konsoli
  console.log('Submitted Form Data:');
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
}
