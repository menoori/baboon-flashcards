import React, { useState } from "react";
import { Settings } from "../interface/settings_interface";

interface SettingsPageProps {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
}
export default function SettingsPage(props: SettingsPageProps) {
  const [settings, setSettings] = useState(props.settings);
  const handleSelectedSetting = (settingType: string) => {
    switch (settingType) {
      case "lock-decks":
        setSettings({ ...settings, hide_edit_deck: !settings.hide_edit_deck });
        break;
      case "lock-cards":
        setSettings({
          ...settings,
          hide_edit_cards: !settings.hide_edit_cards,
        });
        break;
      default:
        break;
    }
  };

  const handleChangeNumberSetting = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveSettings = () => {
    props.updateSettings(settings);
    window.history.back();
  };
  return (
    <div className="edit-page popup-content">
      <h1>Settings</h1>
      <div className="popup-container grid">
        <button
          className={`grid-card green ${settings.hide_edit_deck && "selected"}`}
          onClick={() => handleSelectedSetting("lock-decks")}
          id="lock-decks"
        >
          <div>Hide edit deck button</div>
        </button>
        <button
          className={`grid-card green ${
            settings.hide_edit_cards && "selected"
          }`}
          onClick={() => handleSelectedSetting("lock-cards")}
          id="lock-cards"
        >
          <div>Hide edit card button</div>
        </button>
        <form>
          <fieldset>
            <label htmlFor="point_limit">Point Limit</label>
            <input
              type="text"
              id="point_limit"
              name="point_limit"
              value={settings.point_limit}
              onChange={(e) => handleChangeNumberSetting(e)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="retention_rate">Retention Rate</label>
            <input
              type="text"
              id="retention_rate"
              name="retention_rate"
              value={settings.retention_rate}
              onChange={(e) => handleChangeNumberSetting(e)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="block_time">Block Time (h)</label>
            <input
              type="text"
              id="block_time"
              name="block_time"
              value={settings.block_time}
              onChange={(e) => handleChangeNumberSetting(e)}
            />
          </fieldset>
        </form>
      </div>
      <div className="button-container">
        <button onClick={handleSaveSettings} className="green">
          Save
        </button>
      </div>
    </div>
  );
}
