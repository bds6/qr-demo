'use client';

import { useEffect, useRef, useState } from 'react';

const WIDGET_ID = '2c9fa6c396f04ed90196f3ef06ce04f4';
const STANDALONE_CHAT = 'https://chat.socialintents.com/c/cliveqrbot';

type EquipmentContext = { asset: string; room: string; id: string };
type SocialIntentsApi = {
  addParams?: (params: Array<{ name: string; value: string }>) => void;
  setChatInfo?: (name: string, email: string, phone: string | null, group: string, question: string) => void;
  showPopup?: () => void;
  startChat?: () => void;
  sendMessage?: (message: string) => void;
};

declare global {
  interface Window {
    SI_API?: SocialIntentsApi;
    onSIApiReady?: () => void;
  }
}

function cleanParameter(value: string | null, fallback: string, max = 100) {
  if (!value) return fallback;
  const cleaned = value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
  return cleaned || fallback;
}

function readEquipmentContext(): EquipmentContext {
  const params = new URLSearchParams(window.location.search);
  return {
    asset: cleanParameter(params.get('asset'), 'Canon EOS R6 Mark II'),
    room: cleanParameter(params.get('room'), 'Shields Photo Studio'),
    id: cleanParameter(params.get('id'), 'prototype-001', 48),
  };
}

export default function Home() {
  const [equipment, setEquipment] = useState<EquipmentContext>({
    asset: 'Canon EOS R6 Mark II',
    room: 'Shields Photo Studio',
    id: 'prototype-001',
  });
  const [status, setStatus] = useState('Preparing your equipment assistant…');
  const [connected, setConnected] = useState(false);
  const equipmentRef = useRef(equipment);
  const initialized = useRef(false);
  const openingQuestion = `Help me get started with the ${equipment.asset}.`;

  useEffect(() => {
    const context = readEquipmentContext();
    equipmentRef.current = context;
    setEquipment(context);

    const initializeChat = () => {
      if (initialized.current || !window.SI_API) return;
      initialized.current = true;
      const current = equipmentRef.current;
      const question = `Help me get started with the ${current.asset}.`;
      const api = window.SI_API;

      api.addParams?.([
        { name: 'Equipment ID', value: current.id },
        { name: 'Asset', value: current.asset },
        { name: 'Room', value: current.room },
        { name: 'Entry Point', value: 'Equipment QR code' },
      ]);
      api.setChatInfo?.('QR Visitor', '', null, '', '');
      api.showPopup?.();
      api.startChat?.();

      const sentKey = `clive-opening:${current.id}`;
      window.setTimeout(() => {
        if (!sessionStorage.getItem(sentKey)) {
          api.sendMessage?.(question);
          sessionStorage.setItem(sentKey, 'sent');
        }
        setConnected(true);
        setStatus('QR Assistant is ready. Continue in the chat window.');
      }, 650);
    };

    window.onSIApiReady = initializeChat;
    if (window.SI_API) {
      initializeChat();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://chat.socialintents.com/api/chat/socialintents.1.5.js#${WIDGET_ID}`;
    script.async = true;
    script.dataset.cliveWidget = 'true';
    script.onerror = () => setStatus('The assistant could not load. You can still open chat manually.');
    document.body.appendChild(script);

    const timeout = window.setTimeout(() => {
      if (!initialized.current) setStatus('The assistant is taking longer than expected to connect.');
    }, 9000);
    return () => window.clearTimeout(timeout);
  }, []);

  function openAssistant() {
    if (window.SI_API?.showPopup) {
      window.SI_API.showPopup();
      return;
    }
    window.open(STANDALONE_CHAT, '_blank', 'noopener,noreferrer');
  }

  function askFollowUp(message: string) {
    if (window.SI_API?.sendMessage) {
      window.SI_API.showPopup?.();
      window.SI_API.sendMessage(message.replace('{asset}', equipment.asset));
      return;
    }
    openAssistant();
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="https://mediacommons.psu.edu/">
          <span className="brand-mark" aria-hidden="true">PSU</span>
          <span><strong>Media Commons</strong><small>Creative Learning Initiatives</small></span>
        </a>
        <a className="support-link" href="https://mediacommons.psu.edu/support/">Support</a>
      </header>

      <main>
        <section className="hero" aria-labelledby="equipment-title">
          <div className="hero-copy">
            <p className="eyebrow">Equipment help</p>
            <h1 id="equipment-title">{equipment.asset}</h1>
            <p className="location"><span aria-hidden="true">●</span> {equipment.room}</p>
            <p className="intro">Scan-to-start guidance for the equipment in front of you. The QR Assistant uses CLI documentation to help you take the next step.</p>
          </div>

          <aside className="assistant-card" aria-labelledby="assistant-heading">
            <div className="assistant-symbol" aria-hidden="true">AI</div>
            <div>
              <p className="card-kicker">CLIve QR Bot</p>
              <h2 id="assistant-heading">Your assistant is opening</h2>
              <p className="question-preview">“{openingQuestion}”</p>
            </div>
            <p className={`connection-status ${connected ? 'is-connected' : ''}`} role="status">
              <span aria-hidden="true" /> {status}
            </p>
            <button className="primary-button" type="button" onClick={openAssistant}>Open QR Assistant <span aria-hidden="true">→</span></button>
          </aside>
        </section>

        <section className="quick-help" aria-labelledby="quick-help-heading">
          <div><p className="eyebrow">Keep exploring</p><h2 id="quick-help-heading">What would you like to do?</h2></div>
          <div className="question-grid">
            <button type="button" onClick={() => askFollowUp('Show me the basic setup steps for the {asset}.')}><span>01</span> Basic setup</button>
            <button type="button" onClick={() => askFollowUp('Explain the main controls on the {asset}.')}><span>02</span> Learn the controls</button>
            <button type="button" onClick={() => askFollowUp('Help me troubleshoot the {asset}.')}><span>03</span> Troubleshoot a problem</button>
            <button type="button" onClick={() => askFollowUp('What should I do when I finish using the {asset}?')}><span>04</span> Finish and reset</button>
          </div>
        </section>

        <section className="support-panel" aria-labelledby="human-help-heading">
          <div>
            <p className="eyebrow">Human support</p>
            <h2 id="human-help-heading">Need help from a person?</h2>
            <p>Ask the assistant for a Media Commons consultant, or use one of the support options below. Human response times depend on staffing.</p>
          </div>
          <div className="support-actions">
            <a href="tel:18662667496">Call 866-266-7496</a>
            <a href="mailto:mediacommons@psu.edu">Email Media Commons</a>
            <a href="https://mediacommons.psu.edu/self-scheduling-by-room/">Request an appointment</a>
          </div>
        </section>

        <p className="equipment-meta">Equipment reference: <strong>{equipment.id}</strong>. The assistant may make mistakes; verify critical setup or safety information with a consultant.</p>
      </main>

      <footer>
        <span>Penn State Media Commons</span>
        <a href="https://mediacommons.psu.edu/project/photo-studio/">Photo Studio</a>
        <a href="https://mediacommons.psu.edu/locations/university-park/shields/">Shields location</a>
      </footer>
    </div>
  );
}
