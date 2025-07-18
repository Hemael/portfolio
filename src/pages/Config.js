import React, { useEffect, useState } from "react";
import "./Config.css";
import { UserNewPseudo, UserNewAvatar, ColorPicker } from "@components";
import { ApiService } from "@service";

import { StyleModalIcon, WarningIcon } from "@assets";

const Parametre = () => {


  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await ApiService.getUser();

        if (data?.email) {
          setEmail(data.email);
        }
      } catch {
        setEmail("Erreur lors de la récupération");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={`parametre-page`}>
        <aside className="parametre-sidebar">PARAMETRE</aside>

        <main className="parametre-main">
          <header className="parametre-header">
            {/* Barres décoratives en haut */}
            <StyleModalIcon className="parametre-style-top" />
          </header>

        <h2 className="parametre-h2">Paramètre du compte</h2>

        <section className="parametre-content">
          <div className="parametre-general">
            <UserNewAvatar />

            <div className="parametre-rectangle"></div>

            <div className="parametre-maj">
              <UserNewPseudo />
              <p className="param-g a">
                <span className="param-g-label">Adresse mail :</span>{" "}
                <span className="param-g-value">{email || "..."}</span>
              </p>
              <p className="param-g ">
                <span className="param-g-label">Mot de passe :</span>{" "}
                <span className="param-g-value">***********</span>
              </p>
            </div>
          </div>
        </section>

        <h2 className="parametre-h2">Paramètre de couleur</h2>
        <ColorPicker />

        {/* Barres décoratives en bas */}
        <div className="parametre-warning-wrapper">
          <WarningIcon className={`parametre-warning`} />
        </div>

        <StyleModalIcon className="parametre-style-bottom" />
      </main>
    </div>
  );
};

export default Parametre;
