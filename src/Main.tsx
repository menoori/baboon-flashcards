import React, { useState } from "react";

import { LocalStorageManager } from "./manager/LocalStorageManager";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { FlashCard, FlashCardDeck } from "./interface/data_interface";
import { CONSTANTS } from "./enums";
import OverViewPage from "./pages/OverviewPage";
import DeckPage from "./pages/DeckPage";
import NewDeckPage from "./pages/NewDeckPage";
import FlashCardsPage from "./pages/FlashCardsPage";
import NewCardPage from "./pages/NewCardPage";
import EditDeckPage from "./pages/EditDeckPage";
import EditCardPage from "./pages/EditCardPage";
import EditOverViewPage from "./pages/EditOverViewPage";
import AllCardsPage from "./pages/AllCardsPage";
import SettingsPage from "./pages/SettingsPage";
import { Settings } from "./interface/settings_interface";

export default function Main() {
  const pathname = useLocation().pathname;
  const deckId = pathname.split("/")[pathname.split("/").length - 1];
  const LSM = new LocalStorageManager(CONSTANTS.KEYID, CONSTANTS.SETTINGID);

  const [data, setData] = useState(LSM.getAllDecks);
  const [settings, setSettings] = useState(LSM.getAllSettings);
  const [selectedCard, setSelectedCard] = useState<FlashCard>();

  const handleBack = () => {
    window.history.back();
  };
  const handleNewDeck = (newDeck: FlashCardDeck) => {
    setData([...data, newDeck]);
    LSM.addNewDeck = newDeck;
  };
  const handleNewCards = (newCard: FlashCard, deckId: string) => {
    LSM.addCardToDeck(newCard, deckId);
    setData(
      data.map((deck) =>
        deck.id === deckId ? { ...deck, cards: [...deck.cards, newCard] } : deck
      )
    );
  };
  const handleUpdateCard = (updatedCard: FlashCard, deckId: string) => {
    const newData = data.map((deck) =>
      deck.id === deckId
        ? {
            ...deck,
            cards: deck.cards.map((card) =>
              card.id === updatedCard.id ? updatedCard : card
            ),
          }
        : deck
    );
    const updatedDeck = newData.filter((deck) => deck.id === deckId)[0];
    setData(newData);
    LSM.updateDeckById = updatedDeck;
  };
  const handleUpdateDeckById = (updatedDeck: FlashCardDeck) => {
    const newData = data.map((deck) =>
      deck.id === updatedDeck.id ? updatedDeck : deck
    );
    LSM.updateDeckById = updatedDeck;
    setData(newData);
  };
  const handleUpdateAllData = (filteredDecks: FlashCardDeck[]) => {
    setData(filteredDecks);
    LSM.updateAllData = filteredDecks;
  };
  const handleUpdateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    LSM.updateSettings = newSettings;
  };
  const handleExportDeck = () => {};
  return (
    <div className="frosted-glass">
      <div className="popup-window">
        {pathname !== "/" && (
          <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {pathname !== "/settings" && (
          <NavLink to={"settings"}>
            <button className="menu-button">
              <FontAwesomeIcon icon={faCog} />
            </button>
          </NavLink>
        )}

        <Routes>
          <Route
            path=""
            element={
              <OverViewPage
                hide_edit_deck={settings.hide_edit_deck}
                data={data}
              />
            }
          />
          <Route
            path="edit"
            element={
              <EditOverViewPage updateData={handleUpdateAllData} data={data} />
            }
          />
          {data.map((deck) => {
            return (
              <>
                <Route
                  key={`deckpage-${deck.id}`}
                  path={deck.id}
                  element={
                    <DeckPage
                      hide_edit_cards={settings.hide_edit_cards}
                      deck={deck}
                    />
                  }
                />
                <Route
                  key={`flashcards-${deck.id}`}
                  path={`/flashcards/${deck.id}`}
                  element={
                    <FlashCardsPage
                      deck={deck}
                      updateData={handleUpdateDeckById}
                    />
                  }
                />
                <Route
                  key={`editdeck-${deck.id}`}
                  path={`edit-deck/${deck.id}`}
                  element={
                    <EditDeckPage
                      updateData={handleUpdateDeckById}
                      deck={deck}
                      selectCardToEdit={(cardToEdit) =>
                        setSelectedCard(cardToEdit)
                      }
                    />
                  }
                />
              </>
            );
          })}
          <Route path="all-cards" element={<AllCardsPage data={data} />} />
          <Route
            path="new-deck"
            element={<NewDeckPage updateData={handleNewDeck} />}
          />

          <Route
            path="new-card/*"
            element={
              <NewCardPage updateData={handleNewCards} deckId={deckId} />
            }
          />
          <Route
            path="settings"
            element={
              <SettingsPage
                updateSettings={handleUpdateSettings}
                settings={settings}
              />
            }
          />
          {selectedCard !== undefined && (
            <Route
              path="edit-card/*"
              element={
                <EditCardPage
                  updateCard={handleUpdateCard}
                  card={selectedCard}
                  deckId={deckId}
                />
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
}
