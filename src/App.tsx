import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const CHECKOUT_URL = "https://whop.com/checkout/plan_iNYuSUVeEQjXl";
    const feed = document.getElementById('chat-feed');
    const typingIndicator = document.getElementById('typing-indicator');
    const optionsContainer = document.getElementById('user-options-area');
    const fakeInputBar = document.getElementById('fake-input-bar');

    const BOOK_COVER_IMG_URL = "https://i.postimg.cc/MTgBV3Jx/Four-books-on-wooden-counter-2K-20260923131019.jpg";
    // Preload book cover image for instantaneous loading
    const bookCoverPreload = new Image();
    bookCoverPreload.src = BOOK_COVER_IMG_URL;

    // Timer, session, and choices tracking
    let activeTimeouts: number[] = [];
    let currentSessionId = 0;
    const sessionStartTime = new Date();

    // Storing user selections across steps for conditional logic
    let userChoiceStep2 = "";
    let userChoiceStep3 = "";
    let userChoiceStep4 = "";

    function formatTopHeaderDate(d: Date): string {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[d.getDay()];
      const monthName = months[d.getMonth()];
      const dayOfMonth = d.getDate();

      let hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minStr = minutes < 10 ? '0' + minutes : minutes;

      return `${dayName}, ${monthName} ${dayOfMonth}, ${hours}:${minStr} ${ampm}`;
    }

    function clearAllTimers() {
      activeTimeouts.forEach(id => clearTimeout(id));
      activeTimeouts = [];
    }

    function safeTimeout(fn: () => void, delay: number, sessionId: number) {
      const id = window.setTimeout(() => {
        if (sessionId === currentSessionId) {
          fn();
        }
      }, delay);
      activeTimeouts.push(id);
      return id;
    }

    function scrollToBottom() {
      requestAnimationFrame(() => {
        if (feed) {
          feed.scrollTo({
            top: feed.scrollHeight + 1000,
            behavior: 'smooth'
          });
        }
      });
      setTimeout(() => {
        if (feed) {
          feed.scrollTop = feed.scrollHeight + 1000;
        }
      }, 100);
    }

    function showTyping() {
      if (typingIndicator) typingIndicator.style.display = 'block';
      scrollToBottom();
    }

    function hideTyping() {
      if (typingIndicator) typingIndicator.style.display = 'none';
    }

    function addTopHeaderMeta() {
      if (!feed) return;
      const metaContainer = document.createElement('div');
      metaContainer.className = 'top-meta-info';
      metaContainer.innerHTML = `
        <div class="top-meta-title">Text Message • SMS</div>
        <div class="top-meta-date">${formatTopHeaderDate(sessionStartTime)}</div>
      `;
      feed.appendChild(metaContainer);
    }

    function addBotText(text: string) {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      row.innerHTML = `<div class="bubble-bot">${text}</div>`;
      feed.appendChild(row);
      scrollToBottom();
    }

    function addBotImage(src: string, alt: string) {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      row.innerHTML = `<img src="${src}" alt="${alt}" style="max-width: 80%; border-radius: 16px; margin-top: 8px; margin-bottom: 8px;">`;
      feed.appendChild(row);
      const img = row.querySelector('img');
      if (img) {
        img.onload = () => {
          scrollToBottom();
          setTimeout(scrollToBottom, 60);
          setTimeout(scrollToBottom, 180);
        };
      }
      scrollToBottom();
      setTimeout(scrollToBottom, 60);
      setTimeout(scrollToBottom, 180);
    }

    function addBotVideo(duration: string, label: string = "Jess • Quick Video") {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      row.innerHTML = `
        <div class="bubble-bot" style="padding: 6px; max-width: 86%;">
          <div class="video-player-card">
            <div class="video-author-badge">
              <span>📹 ${label}</span>
            </div>
            <div class="video-play-btn">
              <div class="video-play-icon"></div>
            </div>
            <div class="video-time-tag">${duration}</div>
          </div>
        </div>
      `;
      feed.appendChild(row);
      scrollToBottom();
    }

    function addBotRealVideo1(onVideoEnded?: () => void) {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';

      row.innerHTML = `
        <div class="video-attachment">
            <video controls playsinline preload="metadata" width="100%">
                <source src="https://www.image2url.com/r2/default/videos/1790614561570-6c624798-b07c-4a78-84a4-68c10e885671.mp4" type="video/mp4">
            </video>
        </div>
      `;
      feed.appendChild(row);

      const vid = row.querySelector('video');
      if (vid) {
        vid.addEventListener('loadedmetadata', scrollToBottom);
        vid.addEventListener('loadeddata', scrollToBottom);

        let resumed = false;
        const triggerResume = () => {
          if (!resumed && onVideoEnded) {
            resumed = true;
            onVideoEnded();
          }
        };

        vid.addEventListener('ended', () => {
          triggerResume();
        });
      }
      scrollToBottom();
      setTimeout(scrollToBottom, 150);
      setTimeout(scrollToBottom, 350);
      setTimeout(scrollToBottom, 700);
    }

    function addBotRealVideo2(onVideoEnded?: () => void) {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';

      row.innerHTML = `
        <div class="video-attachment">
            <video controls playsinline preload="metadata" width="100%">
                <source src="https://www.image2url.com/r2/default/videos/1790614598431-a1b6397d-b53b-4ed3-8cee-bc059fce7fda.mp4" type="video/mp4">
            </video>
        </div>
      `;
      feed.appendChild(row);

      const vid = row.querySelector('video');
      if (vid) {
        vid.addEventListener('loadedmetadata', scrollToBottom);
        vid.addEventListener('loadeddata', scrollToBottom);

        let resumed = false;
        const triggerResume = () => {
          if (!resumed && onVideoEnded) {
            resumed = true;
            onVideoEnded();
          }
        };

        vid.addEventListener('ended', () => {
          triggerResume();
        });
      }
      scrollToBottom();
      setTimeout(scrollToBottom, 150);
      setTimeout(scrollToBottom, 350);
      setTimeout(scrollToBottom, 700);
    }

    function addBotProductCard() {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      row.innerHTML = `
        <div class="bubble-bot" style="padding: 10px; max-width: 88%;">
          <div class="product-card-container">
            <div class="product-banner-container" style="position: relative; width: 100%; margin-bottom: 15px;">
              <img
                src="https://i.postimg.cc/MTgBV3Jx/Four-books-on-wooden-counter-2K-20260923131019.jpg"
                alt="Complete Bundle"
                class="product-banner-img"
                style="width: 100%; border-radius: 12px; display: block; object-fit: cover; margin-bottom: 15px;"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              <div class="product-banner-badge" style="position: absolute; top: 10px; left: 10px; background: #e11d48; color: #ffffff; font-weight: 700; font-size: 11px; padding: 5px 9px; border-radius: 6px; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4); text-transform: uppercase; letter-spacing: 0.2px;">
                🔥 COMPLETE BUNDLE - 50% OFF
              </div>
            </div>

            <div class="product-card-header">
              <div class="product-header-info">
                <div class="product-title">The Dog Longevity Handbook</div>
                <div class="product-subtitle">26 Step-by-Step Home Remedies</div>
              </div>
            </div>

            <div class="product-benefits-list">
              <div class="product-benefit-item">
                <span class="product-check">✓</span>
                <span>Targeted natural recipes for joint mobility, gut relief & youthful energy</span>
              </div>
              <div class="product-benefit-item">
                <span class="product-check">✓</span>
                <span>Simple, budget-friendly kitchen ingredients with zero harmful fillers</span>
              </div>
              <div class="product-benefit-item">
                <span class="product-check">✓</span>
                <span>3 Free Bonuses: Healthy Snacks, Calming Massages & Toxic Food List</span>
              </div>
            </div>

            <div class="product-pricing-box">
              <span class="price-strike">$54.00</span>
              <div class="price-final">
                <span class="price-tag-badge">SAVE 50%</span>
                <span class="price-amount">$27</span>
              </div>
            </div>

            <a href="https://whop.com/checkout/plan_iNYuSUVeEQjXl" target="_self" class="btn-get-it-now">
              <span>GET IT NOW</span>
              <svg style="width: 18px; height: 18px; stroke-width: 2.6; stroke: #fff; fill: none;" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>

            <div class="trust-badges-inline">
              <span>🔒 256-Bit SSL</span>
              <span>•</span>
              <span>🛡️ 30-Day Guarantee</span>
              <span>•</span>
              <span>⚡ Instant Access</span>
            </div>
          </div>
        </div>
      `;
      feed.appendChild(row);
      scrollToBottom();
    }

    function addUserText(text: string) {
      if (!feed) return;
      const row = document.createElement('div');
      row.className = 'msg-row user';
      row.innerHTML = `<div class="bubble-user">${text}</div>`;
      feed.appendChild(row);
      scrollToBottom();
    }

    function setOptions(options: string[], onSelect: (opt: string) => void) {
      if (!optionsContainer || !fakeInputBar) return;
      fakeInputBar.style.display = 'none';
      optionsContainer.innerHTML = '';
      optionsContainer.style.display = 'flex';

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = opt;
        btn.onclick = () => {
          optionsContainer.style.display = 'none';
          optionsContainer.innerHTML = '';
          fakeInputBar.style.display = 'flex';
          addUserText(opt);
          onSelect(opt);
        };
        optionsContainer.appendChild(btn);
      });
      scrollToBottom();
    }

    /* LÓGICA MATEMÁTICA DE DELAY DINÂMICO DE DIGITAÇÃO (UI/UX) */
    function getTypingDelay(content: string): number {
      if (!content) return 800;

      // Exceção para Mídia: se detetar código HTML de vídeo ou imagem
      if (
        content.includes('.video-attachment') ||
        content.includes('video-attachment') ||
        content.includes('<video') ||
        content.includes('<img') ||
        content.includes('product-card-container') ||
        content.includes('video-player-card')
      ) {
        return 1500;
      }

      // Cálculo por caractere: 30ms por caractere
      const calculatedDelay = content.length * 30;

      // Limite Mínimo: 800ms | Limite Máximo: 3500ms
      return Math.min(3500, Math.max(800, calculatedDelay));
    }

    /* FLUXO CONDICIONAL INTELIGENTE (8 PASSOS) */

    // Step 1:
    function startStep1() {
      if (!feed || !optionsContainer || !fakeInputBar) return;

      currentSessionId++;
      const session = currentSessionId;
      clearAllTimers();

      userChoiceStep2 = "";
      userChoiceStep3 = "";
      userChoiceStep4 = "";

      feed.innerHTML = '';
      optionsContainer.innerHTML = '';
      optionsContainer.style.display = 'none';
      fakeInputBar.style.display = 'flex';
      hideTyping();

      // Adiciona o cabeçalho "Text Message • SMS" e a data/hora apenas 1 vez no topo absoluto do chat
      addTopHeaderMeta();

      const msg1 = "Hi there! I'm Jess 👋";
      const msg2 = "I'm so glad you made it here.";
      const msg3 = "Let me understand a little bit about what your pup needs right now.";
      const msg4 = "I'm going to ask you a few quick things, so I can find the exact holistic recipe for them.";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(msg1);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);

              safeTimeout(() => {
                showTyping();
                safeTimeout(() => {
                  hideTyping();
                  addBotText(msg3);

                  safeTimeout(() => {
                    showTyping();
                    safeTimeout(() => {
                      hideTyping();
                      addBotText(msg4);
                      setOptions(["YOU CAN ASK, JESS"], () => startStep2(session));
                    }, getTypingDelay(msg4), session);
                  }, 350, session);

                }, getTypingDelay(msg3), session);
              }, 350, session);

            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(msg1), session);
      }, 400, session);
    }

    // Step 2:
    function startStep2(session: number) {
      if (session !== currentSessionId) return;

      const msg1 = "Awesome. I'm listening carefully 🐶";
      const msg2 = "Which of these situations best describes your dog today?";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(msg1);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);
              setOptions([
                "🦴 Joint pain",
                "🦠 Gut health",
                "🔋 Low energy",
                "❤️ Just want them to live longer"
              ], (choice) => {
                userChoiceStep2 = choice;
                startStep3(session, choice);
              });
            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(msg1), session);
      }, 350, session);
    }

    // Step 3:
    function startStep3(session: number, choiceStep2: string) {
      if (session !== currentSessionId) return;

      let dynamicReaction = "That's the ultimate goal, right? We just want them with us forever.";
      if (choiceStep2.includes("Joint pain")) {
        dynamicReaction = "Joint pain is so tough to watch. It's heartbreaking seeing them struggle to get up.";
      } else if (choiceStep2.includes("Gut health")) {
        dynamicReaction = "Gut issues can be so stressful. It's awful seeing them uncomfortable after eating.";
      } else if (choiceStep2.includes("Low energy")) {
        dynamicReaction = "Low energy is tough. You just want to see them playing and running around again.";
      }

      const msg2 = "And how long has this been bothering them?";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(dynamicReaction);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);
              setOptions([
                "⏳ Just recently",
                "📅 A few months",
                "🗓️ Over 1 year",
                "🤷 I'm not sure"
              ], (choice) => {
                userChoiceStep3 = choice;
                startStep4(session, choice);
              });
            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(dynamicReaction), session);
      }, 350, session);
    }

    // Step 4:
    function startStep4(session: number, choiceStep3: string) {
      if (session !== currentSessionId) return;

      let dynamicReaction = "Wow, it must be frustrating dealing with this for so long. I know the feeling.";
      if (choiceStep3.includes("Just recently")) {
        dynamicReaction = "Oh, good that you're catching it early. That makes it much easier to help.";
      }

      const msg2 = "Have you ever tried making any natural home remedies before?";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(dynamicReaction);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);
              setOptions([
                "🥣 Yes, I have",
                "🤔 Sometimes",
                "❌ Haven't tried yet",
                "🤷 Don't know how"
              ], (choice) => {
                userChoiceStep4 = choice;
                startStep5(session, choice);
              });
            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(dynamicReaction), session);
      }, 350, session);
    }

    // Step 5:
    function startStep5(session: number, choiceStep4: string) {
      if (session !== currentSessionId) return;

      let dynamicReaction = "No worries at all. It can feel overwhelming at first, but it's actually super simple.";
      if (choiceStep4.includes("Yes") || choiceStep4.includes("Sometimes")) {
        dynamicReaction = "That's great! You already know how powerful natural ingredients can be.";
      }

      const msg2 = "I actually recorded a quick video for you, look 👇";
      const mediaAttachmentVideo1 = '<div class="video-attachment"><video>...</video></div>';

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(dynamicReaction);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);

              safeTimeout(() => {
                showTyping();
                safeTimeout(() => {
                  hideTyping();
                  // Renderiza o vídeo e PAUSA o fluxo do chat.
                  // O fluxo só continua após o usuário assistir ao vídeo até ao último segundo (evento 'ended').
                  addBotRealVideo1(() => {
                    if (session !== currentSessionId) return;

                    const resumeMsg1 = "That's exactly why I asked those questions. I wanted to make sure I had the perfect solution for you.";
                    const msgQuestion = "Let me ask you a bit more: when you look up dog recipes online, what frustrates you the most?";

                    safeTimeout(() => {
                      showTyping();
                      scrollToBottom();
                      safeTimeout(() => {
                        hideTyping();
                        addBotText(resumeMsg1);
                        scrollToBottom();

                        safeTimeout(() => {
                          showTyping();
                          safeTimeout(() => {
                            hideTyping();
                            addBotText(msgQuestion);
                            setOptions([
                              "🤷 Don't know who to trust",
                              "🤯 Too complicated",
                              "🛒 Hard-to-find ingredients",
                              "📝 Poorly explained"
                            ], () => startStep6(session));
                          }, getTypingDelay(msgQuestion), session);
                        }, 350, session);

                      }, getTypingDelay(resumeMsg1), session);
                    }, 400, session);
                  });

                }, getTypingDelay(mediaAttachmentVideo1), session); // Exceção de mídia: 1500ms
              }, 350, session);

            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(dynamicReaction), session);
      }, 350, session);
    }

    // Step 6:
    function startStep6(session: number) {
      if (session !== currentSessionId) return;

      const msg1 = "I hear you...";
      const msg2 = "What is the absolute most important thing to you in a recipe?";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(msg1);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);
              setOptions([
                "⏱️ Easy to make",
                "🥕 Simple ingredients",
                "💰 Budget-friendly",
                "✅ All of the above"
              ], () => startStep7(session));
            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(msg1), session);
      }, 350, session);
    }

    // Step 7:
    function startStep7(session: number) {
      if (session !== currentSessionId) return;

      const msg1 = "Makes total sense.";
      const msg2 = "Last question, look.";
      const msg3 = "If I put all my safest, vet-approved home recipes together, perfectly explained... would you want to take a look?";

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(msg1);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);

              safeTimeout(() => {
                showTyping();
                safeTimeout(() => {
                  hideTyping();
                  addBotText(msg3);
                  setOptions(["👀 Yes, I want to see it"], () => startStep8(session));
                }, getTypingDelay(msg3), session);
              }, 350, session);

            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(msg1), session);
      }, 350, session);
    }

    // Step 8 (FINAL):
    function startStep8(session: number) {
      if (session !== currentSessionId) return;

      const msg1 = "All done 🐾";
      const msg2 = "Your focus is helping with their health, and you need simple, budget-friendly recipes with easy-to-find ingredients.";
      const msg3 = "So let me show you something I've kept for a long time, look 👇";
      const msgSocialProof = "But first, look at the DM I got this morning from Sarah. She was so relieved to finally have clear safety tips on exactly what her Golden Retriever can and cannot eat 🥺👇";
      const imgSarahReview = "https://i.postimg.cc/T3Fpy0Vx/depoimento5-webp-2K-20260928122533-(1).jpg";
      const msgIntroVideo2 = "Okay, here is what I made for you:";
      const mediaAttachmentVideo2 = '<div class="video-attachment"><video id="jess-video-2">...</video></div>';

      safeTimeout(() => {
        showTyping();
        safeTimeout(() => {
          hideTyping();
          addBotText(msg1);

          safeTimeout(() => {
            showTyping();
            safeTimeout(() => {
              hideTyping();
              addBotText(msg2);

              safeTimeout(() => {
                showTyping();
                safeTimeout(() => {
                  hideTyping();
                  addBotText(msg3);

                  // INSERÇÃO 1: Prova Social (Antes do Vídeo 2)
                  safeTimeout(() => {
                    showTyping();
                    safeTimeout(() => {
                      hideTyping();
                      addBotText(msgSocialProof);

                      safeTimeout(() => {
                        showTyping();
                        safeTimeout(() => {
                          hideTyping();
                          addBotImage(imgSarahReview, "Customer review");

                          safeTimeout(() => {
                            showTyping();
                            safeTimeout(() => {
                              hideTyping();
                              addBotText(msgIntroVideo2);

                              safeTimeout(() => {
                                showTyping();
                                safeTimeout(() => {
                                  hideTyping();
                                  // Renderiza o Vídeo 2 real e PAUSA o fluxo do chat.
                                  // O fluxo só continua após o usuário assistir ao vídeo até ao último segundo (evento 'ended').
                                  addBotRealVideo2(() => {
                                    if (session !== currentSessionId) return;

                                    const msgOfferIntro = "This is it — I put all my holistic recipes in one place, super affordable, so you can help your best friend thrive without the expensive vet bills.";
                                    const msgPriceAnchor = "A single vet visit costs like $200 nowadays. I wanted to make this accessible, so my whole handbook costs less than a bag of premium dog treats. And it actually fixes the root cause.";
                                    const msgGuarantee = "And hey, I take all the risk. If your dog doesn't completely devour these treats, just email me within 30 days and I'll refund 100% of your money. No hard feelings! 🤝";
                                    const msgLook = "Look at what you're getting 👇";
                                    const mediaProductCard = '<div class="product-card-container">';

                                    safeTimeout(() => {
                                      showTyping();
                                      safeTimeout(() => {
                                        hideTyping();
                                        addBotText(msgOfferIntro);

                                        // INSERÇÃO 2: Ancoragem de Preço e Garantia (Após o Vídeo 2 e antes do Checkout)
                                        safeTimeout(() => {
                                          showTyping();
                                          safeTimeout(() => {
                                            hideTyping();
                                            addBotText(msgPriceAnchor);

                                            safeTimeout(() => {
                                              showTyping();
                                              safeTimeout(() => {
                                                hideTyping();
                                                addBotText(msgGuarantee);

                                                safeTimeout(() => {
                                                  showTyping();
                                                  safeTimeout(() => {
                                                    hideTyping();
                                                    addBotText(msgLook);

                                                    safeTimeout(() => {
                                                      showTyping();
                                                      safeTimeout(() => {
                                                        hideTyping();
                                                        addBotProductCard();
                                                      }, getTypingDelay(mediaProductCard), session); // Exceção de mídia: 1500ms
                                                    }, 350, session);

                                                  }, getTypingDelay(msgLook), session);
                                                }, 350, session);

                                              }, 3000, session); // Indicador de digitação: 3 segundos
                                            }, 350, session);

                                          }, 3000, session); // Indicador de digitação: 3 segundos
                                        }, 350, session);

                                      }, getTypingDelay(msgOfferIntro), session);
                                    }, 400, session);
                                  });

                                }, getTypingDelay(mediaAttachmentVideo2), session); // Exceção de mídia: 1500ms
                              }, 350, session);

                            }, 3000, session); // Indicador de digitação: 3 segundos
                          }, 350, session);

                        }, 3000, session); // Indicador de digitação: 3 segundos
                      }, 350, session);

                    }, 3000, session); // Indicador de digitação: 3 segundos
                  }, 350, session);

                }, getTypingDelay(msg3), session);
              }, 350, session);

            }, getTypingDelay(msg2), session);
          }, 350, session);

        }, getTypingDelay(msg1), session);
      }, 350, session);
    }

    /* =========================================================
       EXIT INTENT POPUP (Gatilhos CRO Mobile & Desktop)
       ========================================================= */
    let hasPopupShown = false;
    let lastScrollTop = 0;
    let lastScrollTime = Date.now();

    const exitPopup = document.getElementById('exit-popup');
    const exitPopupCloseBtn = document.getElementById('exit-popup-close');

    function showExitPopup() {
      if (hasPopupShown) return;
      hasPopupShown = true;
      cleanupExitListeners();
      if (exitPopup) {
        exitPopup.style.display = 'flex';
      }
    }

    function closeExitPopup() {
      if (exitPopup) {
        exitPopup.style.display = 'none';
      }
    }

    // Gatilho 1: Troca de aba / Minimizar no mobile e desktop (visibilitychange)
    function onVisibilityChange() {
      if (document.hidden && !hasPopupShown) {
        showExitPopup();
      }
    }

    // Gatilho 2: Scroll rápido para cima no mobile (tentativa de fechar/acessar barra)
    function onScrollFastUp() {
      if (hasPopupShown) return;
      const currentScrollTop = feed ? feed.scrollTop : window.scrollY;
      const currentTime = Date.now();
      const deltaY = lastScrollTop - currentScrollTop;
      const deltaTime = currentTime - lastScrollTime;

      // Movimento abrupto para cima
      if (deltaY > 80 && deltaTime < 200 && lastScrollTop > 120) {
        showExitPopup();
      }

      lastScrollTop = currentScrollTop;
      lastScrollTime = currentTime;
    }

    // Gatilho 3: Movimento de saída do cursor no desktop (mouseleave para fora do viewport)
    function onMouseLeave(e: MouseEvent) {
      if (hasPopupShown) return;
      if (e.clientY <= 10) {
        showExitPopup();
      }
    }

    function cleanupExitListeners() {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (feed) feed.removeEventListener('scroll', onScrollFastUp);
      window.removeEventListener('scroll', onScrollFastUp);
    }

    // Registra os ouvintes mantidos
    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('mouseleave', onMouseLeave);
    if (feed) feed.addEventListener('scroll', onScrollFastUp, { passive: true });
    window.addEventListener('scroll', onScrollFastUp, { passive: true });

    const exitPopupCta = document.getElementById('exit-popup-cta');
    if (exitPopupCta) {
      exitPopupCta.onclick = () => {
        window.location.href = 'https://whop.com/checkout/plan_iNYuSUVeEQjXl';
      };
    }
    if (exitPopupCloseBtn) {
      exitPopupCloseBtn.onclick = closeExitPopup;
    }
    if (exitPopup) {
      exitPopup.onclick = (e) => {
        if (e.target === exitPopup) {
          closeExitPopup();
        }
      };
    }

    (window as any).restartChat = startStep1;
    startStep1();

    return () => {
      currentSessionId++;
      clearAllTimers();
      cleanupExitListeners();
    };
  }, []);

  return (
    <div className="iphone-screen">
      {/* iOS Dark Mode Header */}
      <header className="ios-header">
        <button
          className="back-button"
          onClick={() => (window as any).restartChat && (window as any).restartChat()}
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="header-contact">
          <div className="avatar-circle">
            <img
              src="https://i.postimg.cc/5yQ9HrTc/Woman-hugging-Siberian-Husky-2K-20260922213242.jpg"
              alt="Jess & Koda"
              className="avatar-img"
              loading="eager"
              decoding="async"
              {...({ fetchPriority: 'high' } as any)}
            />
          </div>
          <div
            className="contact-number"
            onClick={() => (window as any).restartChat && (window as any).restartChat()}
          >
            <span>Jess & Koda</span>
            <svg viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div style={{ width: 44 }}></div>
      </header>

      {/* Message Feed (Holds the scrollable Text Message • SMS header and all chat items) */}
      <main id="chat-feed" className="chat-messages"></main>

      {/* Typing Indicator (3 Animated Dots) */}
      <div id="typing-indicator" style={{ display: 'none', padding: '0 14px 6px 14px' }}>
        <div className="msg-row bot">
          <div className="bubble-bot typing-box">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>

      {/* User Options Area (Replaces Input Bar when visible) */}
      <div id="user-options-area" className="options-area" style={{ display: 'none' }}></div>

      {/* Fake SMS Input Bar (Hidden when options appear) */}
      <footer id="fake-input-bar" className="fake-input-bar">
        <div className="plus-btn" title="Add">+</div>
        <div className="input-field-fake">
          <span>Text Message • SMS</span>
        </div>
        <div className="mic-icon" title="Voice">
          <svg viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
      </footer>

      {/* iOS Home Indicator */}
      <div className="home-indicator"></div>

      {/* EXIT INTENT POPUP (Mobile-First) */}
      <div id="exit-popup" className="exit-popup-overlay" style={{ display: 'none' }}>
        <div className="exit-popup-card">
          <div className="exit-popup-badge">⚠️ LIMITED TIME OPPORTUNITY</div>
          <h3 className="exit-popup-title">WAIT! Don't lose your discount...</h3>
          <p className="exit-popup-text">
            If you leave this page now, your <strong>50% OFF</strong> discount for <em>The Dog Longevity Handbook</em> will expire forever.
          </p>
          <a
            href="https://whop.com/checkout/plan_iNYuSUVeEQjXl"
            target="_self"
            className="exit-popup-btn"
            id="exit-popup-cta"
            onClick={() => {
              window.location.href = 'https://whop.com/checkout/plan_iNYuSUVeEQjXl';
            }}
          >
            <span>CLAIM MY $27 DISCOUNT NOW</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <button type="button" className="exit-popup-close-link" id="exit-popup-close">
            No thanks, I'll pay full price later.
          </button>
        </div>
      </div>
    </div>
  );
}
