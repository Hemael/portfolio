import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon, FaUserAlt, FaPlus } from 'react-icons/fa';
import {LnModal} from '@components';
import { toggleTheme } from '@store/index';
import { useNavigate } from 'react-router-dom';



import './LoginNew.css';
import { GoldenStremC, GoldenStremE, GoldenStremP, GoldenStremV } from '@assets';
import { golstremb, personp, golden } from '@assets';


const LoginNew = () => {

  const dispatch  = useDispatch();
  const mode      = useSelector(state => state.theme.mode);

  const [modal, setModal] = useState(null);        // 'login' | 'register' | null
  const openLogin    = () => setModal('login');
  const openRegister = () => setModal('register');
  const closeModal   = () => setModal(null);

  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token !== null) {
      navigate('/dashboard');
    }
  }, [navigate]);




  return (
    <div className={`loginNew`}>
      {/* — interrupteur dark / light — */}
      <div className={`mode-toggle ${mode}`} onClick={() => dispatch(toggleTheme())}> {mode === 'dark' ? <FaMoon size={24} /> : <FaSun size={24} />}</div>
      
       {/* — header mobile — */}
      <header className="ln-header">
        <img src={golden} alt="Mon logo" className="ln-logor" />
      </header>

      {/* — carré “Connexion” & “Créer un compte” — */}
      <div className="ln-form">
        <button className={`ln-connexion `} onClick={openLogin}>
          <FaUserAlt className="ln-ico" />
          <span>Connexion</span>
        </button>

        <button className={`ln-create `} onClick={openRegister}>
          <FaPlus className="ln-ico" />
          <span>Créer&nbsp;un&nbsp;compte</span>
        </button>

      </div>

      {modal && <LnModal type={modal} onClose={closeModal} />}


      <div className='ln-backText'>
            <GoldenStremE alt="texte logo 1" className="ln-tgold" />
            <GoldenStremV alt="texte logo 2" className="ln-tgold" />
            <GoldenStremV alt="texte logo 3" className="ln-tgold" />
      </div>

      {/* — aside + background décoratif — */}
      <div className="ln-back">
        <aside className="ln-aside">
          <img src={golstremb} alt="Mon logo" className="ln-logo" />
        </aside>

        <div className="ln-background">
          <img src={personp}   alt="Fond personnage" className="ln-character" />

          <div className="ln-text">
            <GoldenStremP alt="texte logo 1" className="ln-textlogo" />
            <GoldenStremC alt="texte logo 2" className="ln-textlogo" />
            <GoldenStremC alt="texte logo 3" className="ln-textlogo" />
            <p className="ln-connect">CONNEXION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
