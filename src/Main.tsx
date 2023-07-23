import React, { useEffect, useState } from "react";

import { LocalStorageManager } from "./manager/LocalStorageManager";

import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FlashCard, FlashCardDeck } from "./interface/data_interface";
import { CONSTANTS } from "./enums";
import OverViewPage from "./pages/OverviewPage";
import DeckPage from "./pages/DeckPage";
import NewDeckPage from "./pages/NewDeckPage";
import FlashCardsPage from "./pages/FlashCardsPage";
import NewCardPage from "./pages/NewCardPage";
import EditDeckPage from "./pages/EditDeckPage";
import EditCardPage from "./pages/EditCardPage";
import EditOverviewPage from "./pages/EditOverviewPage";
import SettingsPage from "./pages/SettingsPage";
import { Settings } from "./interface/settings_interface";
import { DateManager } from "./manager/DateManager";
import { AnimationManager } from "./manager/AnimationManager";
import cogIcon from "./img/cog.svg";
import backIcon from "./img/back.svg";

export default function Main() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const LSM = new LocalStorageManager(CONSTANTS.KEYID, CONSTANTS.SETTINGID);
  const DM = new DateManager();
  const AM = new AnimationManager();

  const [data, setData] = useState(LSM.getAllDecks);
  const [settings, setSettings] = useState(LSM.getAllSettings);
  const [selectedCard, setSelectedCard] = useState<FlashCard>();

  // const pageName = pathname.split("/")[1];
  const pageId = pathname.split("/")[2];

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

  return (
    <div className="frosted-glass">
      <div className="popup-window">
        {pathname !== "/" && (
          <button className="back-button" onClick={handleBack}>
            <img src={backIcon} alt="" />
          </button>
        )}
        {pathname !== "/settings" && (
          <NavLink to={"settings"}>
            <button className="menu-button">
              <img src={cogIcon} alt="" />
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
              <EditOverviewPage updateData={handleUpdateAllData} data={data} />
            }
          />
          {data.map((deck) => {
            return (
              <>
                <Route
                  key={`deckpage-${deck.id}`}
                  path={`deck/${deck.id}`}
                  element={
                    <DeckPage
                      hide_edit_cards={settings.hide_edit_cards}
                      deck={deck}
                      POINTLIMIT={settings.point_limit}
                    />
                  }
                />
                <Route
                  key={`flashcards-${deck.id}`}
                  path={`flashcards/${deck.id}`}
                  element={
                    <FlashCardsPage
                      deck={deck}
                      updateData={handleUpdateDeckById}
                      POINTLIMIT={settings.point_limit}
                      BLOCKTIME={settings.block_time}
                      RETENTIONRATE={settings.retention_rate}
                      getDifference={DM.getDifference}
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
                      navigate={navigate}
                    />
                  }
                />
              </>
            );
          })}
          <Route
            path="new-deck"
            element={
              <NewDeckPage updateData={handleNewDeck} navigate={navigate} />
            }
          />

          <Route
            path="new-card/*"
            element={
              <NewCardPage
                updateData={handleNewCards}
                deckId={pageId}
                animationManager={AM}
              />
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
                  deckId={pageId}
                  formatDate={DM.getFormattedDate}
                />
              }
            />
          )}
        </Routes>
      </div>
    </div>
  );
}
