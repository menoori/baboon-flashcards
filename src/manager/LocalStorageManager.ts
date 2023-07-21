import { FlashCard, FlashCardDeck } from "../interface/data_interface";
import { Settings } from "../interface/settings_interface";

export class LocalStorageManager {
  private _dataId: string;
  private _settingId: string;
  private _data: FlashCardDeck[];
  private _settings: Settings;
  constructor(dataId: string, settingId: string) {
    this._dataId = dataId;
    this._settingId = settingId;
    // Getting the app data from localstorage, if not set empty array
    const appDataArr = JSON.parse(localStorage.getItem(this._dataId)!);
    if (appDataArr === null) this._data = [];
    else this._data = appDataArr;

    // Getting the settings data from localstorage, if not set standard settings
    const settings: Settings = JSON.parse(
      localStorage.getItem(this._settingId)!
    );
    if (settings === null) {
      this._settings = {
        hide_edit_deck: true,
        hide_edit_cards: false,
        point_limit: 30,
        retentionRate: 20,
      };
      localStorage.setItem(this._settingId, JSON.stringify(this._settings));
    } else if (
      !settings.hide_edit_cards ||
      !settings.hide_edit_deck ||
      !settings.point_limit ||
      !settings.retentionRate
    ) {
      this._settings = {
        hide_edit_deck: true,
        hide_edit_cards: false,
        point_limit: 30,
        retentionRate: 20,
      };
      localStorage.setItem(this._settingId, JSON.stringify(this._settings));
    } else {
      this._settings = settings;
    }
  }
  get getAllDecks() {
    const appDataArr = JSON.parse(
      localStorage.getItem(this._dataId)!
    ) as FlashCardDeck[];
    if (appDataArr === null) {
      window.alert(
        "No data found. A new local storage app data base will be created"
      );
      localStorage.setItem(this._dataId, JSON.stringify(this._data));
      return this._data;
    } else {
      return appDataArr;
    }
  }

  get getAllSettings() {
    const settings = JSON.parse(
      localStorage.getItem(this._settingId)!
    ) as Settings;
    if (settings === null) {
      window.alert("No settings found. Standard settings will be created");
      localStorage.setItem(this._settingId, JSON.stringify(this._settings));
      return this._settings;
    } else return settings;
  }

  set addNewDeck(newDeck: FlashCardDeck) {
    try {
      this._data = [...this._data, newDeck];
      localStorage.setItem(this._dataId, JSON.stringify(this._data));
    } catch (error) {
      window.alert("Error in addNewDeck in LocalStorageManager");
    }
  }

  addCardToDeck(newCard: FlashCard, deckId: string) {
    try {
      this._data = this._data.map((deck) =>
        deck.id === deckId ? { ...deck, cards: [...deck.cards, newCard] } : deck
      );
      localStorage.setItem(this._dataId, JSON.stringify(this._data));
    } catch (error) {
      window.alert("Error in addCardToDeck in LocalStorageManager");
    }
  }
  set updateDeckById(updatedDeck: FlashCardDeck) {
    try {
      this._data = this._data.map((deck) =>
        deck.id === updatedDeck.id ? updatedDeck : deck
      );
      localStorage.setItem(this._dataId, JSON.stringify(this._data));
    } catch (error) {
      console.log("Error in updateDeck in LocalStorageManager");
    }
  }
  set updateAllData(newData: FlashCardDeck[]) {
    this._data = newData;
    localStorage.setItem(this._dataId, JSON.stringify(this._data));
  }

  set updateSettings(newSettings: Settings) {
    this._settings = newSettings;
    localStorage.setItem(this._settingId, JSON.stringify(newSettings));
  }
}
