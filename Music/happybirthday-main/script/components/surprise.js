(() => {
  window.Components = window.Components || {};

  window.Components.surprise = {
    render(container, section, config) {
      const div = document.createElement('div');
      div.className = 'section section-surprise';
      div.style.transition = 'opacity 0.35s ease';

      const title = document.createElement('h3');
      title.textContent = section.title || 'Surprises';
      title.style.marginBottom = '1rem';
      div.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'surprise-grid';

      const items = Array.isArray(section.items) ? section.items : [];
      const surpriseLabels = (config && config.labels && config.labels.surprise) || {};
      const openLabel = surpriseLabels.open || 'Open';

      items.forEach((it, idx) => {
        const box = document.createElement('div');
        box.className = 'surprise-box';
        box.dataset.index = idx;
        box.dataset.photo = it.photo || '';
        box.dataset.music = it.music || '';
        box.dataset.label = it.label || `Box ${idx + 1}`;

        const front = document.createElement('div');
        front.className = 'surprise-front';

        const title = document.createElement('div');
        title.textContent = it.label || `Box ${idx + 1}`;

        const openBtn = document.createElement('button');
        openBtn.className = 'open-btn';
        openBtn.textContent = it.buttonText || openLabel;

        front.appendChild(title);
        front.appendChild(openBtn);
        box.appendChild(front);
        grid.appendChild(box);
      });

      div.appendChild(grid);

      const continueBtn = document.createElement('div');
      continueBtn.className = 'surprise-continue';
      continueBtn.id = 'surprise-continue';
      continueBtn.textContent = surpriseLabels.continue || 'Continue';
      continueBtn.style.opacity = '0';
      continueBtn.style.display = 'inline-block';
      continueBtn.style.transform = 'translateY(10px)';
      continueBtn.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      continueBtn.style.pointerEvents = 'none';
      div.appendChild(continueBtn);

      const feedback = document.createElement('p');
      feedback.className = 'surprise-feedback';
      feedback.textContent = 'Let me know if you liked it..';
      div.appendChild(feedback);

      container.appendChild(div);
      return div;
    },

    animate(tl, el, config) {
      tl.from(el.querySelector('h3'), { duration: 0.6, opacity: 0, y: 10 })
        .from(el.querySelectorAll('.surprise-box'), {
          duration: 0.6,
          opacity: 0,
          y: 10,
          stagger: 0.08,
        }, '-=0.2');

      const closingEl = document.querySelector('.section-closing');
      if (closingEl) {
        closingEl.style.visibility = 'hidden';
        closingEl.style.pointerEvents = 'none';
      }

      tl.addPause();

      const boxes = Array.from(el.querySelectorAll('.surprise-box'));
      let opened = 0;
      const total = boxes.length;
      const continueBtn = el.querySelector('#surprise-continue');
      const feedback = el.querySelector('.surprise-feedback');
      const bgAudio = document.querySelector('.song');
      const surpriseLabels = (config && config.labels && config.labels.surprise) || {};
      let currentSurpriseAudio = null;

      function checkAll() {
        if (opened >= total) {
          continueBtn.style.pointerEvents = 'auto';
          continueBtn.style.opacity = '1';
          continueBtn.style.transform = 'translateY(0)';
          if (feedback) feedback.classList.add('visible');
        }
      }

      function pauseBackground() {
        if (bgAudio && !bgAudio.paused) {
          bgAudio.pause();
          bgAudio.dataset.pausedBySurprise = 'true';
        }
      }

      function resumeBackground() {
        if (bgAudio && bgAudio.dataset.pausedBySurprise === 'true') {
          bgAudio.play().catch(() => {});
          delete bgAudio.dataset.pausedBySurprise;
        }
      }

      function stopCurrentSurpriseAudio() {
        if (currentSurpriseAudio) {
          currentSurpriseAudio.pause();
          currentSurpriseAudio.currentTime = 0;
          currentSurpriseAudio = null;
        }
      }

      function openSurprisePage(box) {
        const photo = box.dataset.photo;
        const music = box.dataset.music;
        const label = box.dataset.label;
        const isDark = window.currentMode === 'dark';

        stopCurrentSurpriseAudio();
        pauseBackground();

        const html = `
          <div class="surprise-modal">
            ${photo ? `<img src="${photo}" alt="${label}" class="surprise-modal-image">` : ''}
            ${music ? `<button type="button" id="surprise-sound-toggle" class="swal-sound-btn active">${surpriseLabels.soundOn || '🔊 Sound On'}</button>` : ''}
            ${music ? `<button type="button" id="surprise-download-btn" class="swal-download-link">${surpriseLabels.downloadSong || 'Download song'}</button>` : ''}
            <button type="button" id="surprise-back-btn" class="swal-back-btn">${surpriseLabels.backToMain || 'Back to main'}</button>
          </div>
        `;

        Swal.fire({
          title: label,
          html,
          showConfirmButton: false,
          background: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#1e293b',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            const backBtn = document.getElementById('surprise-back-btn');
            const soundToggle = document.getElementById('surprise-sound-toggle');
            const downloadBtn = document.getElementById('surprise-download-btn');

            if (music) {
              currentSurpriseAudio = new Audio(music);
              currentSurpriseAudio.loop = false;
              currentSurpriseAudio.play().catch(() => {
                if (soundToggle) {
                  soundToggle.textContent = '🔇 Sound Off';
                  soundToggle.classList.remove('active');
                }
              });
            }

            if (soundToggle) {
              soundToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!currentSurpriseAudio) return;
                if (currentSurpriseAudio.paused) {
                  currentSurpriseAudio.play().catch(() => {});
                  soundToggle.textContent = surpriseLabels.soundOn || '🔊 Sound On';
                  soundToggle.classList.add('active');
                } else {
                  currentSurpriseAudio.pause();
                  soundToggle.textContent = surpriseLabels.soundOff || '🔇 Sound Off';
                  soundToggle.classList.remove('active');
                }
              });
            }

            if (downloadBtn) {
              downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const a = document.createElement('a');
                a.href = music;
                a.download = music.split('/').pop() || 'surprise-song.mp3';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              });
            }

            backBtn.addEventListener('click', () => {
              stopCurrentSurpriseAudio();
              Swal.close();
              if (!box.classList.contains('opened')) {
                box.classList.add('opened');
                opened += 1;
                checkAll();
              }
            });
          },
          willClose: () => {
            stopCurrentSurpriseAudio();
          },
        });
      }

      boxes.forEach((box) => {
        const btn = box.querySelector('.open-btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openSurprisePage(box);
        });
      });

      continueBtn.addEventListener('click', () => {
        continueBtn.style.pointerEvents = 'none';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        setTimeout(() => {
          el.style.display = 'none';
        }, 350);
        resumeBackground();
        if (closingEl) {
          closingEl.style.visibility = 'visible';
          closingEl.style.pointerEvents = 'auto';
        }
        try {
          tl.play();
        } catch (e) {
          if (closingEl && window.Components && window.Components.closing) {
            const ctl = gsap.timeline();
            window.Components.closing.animate(ctl, closingEl);
          } else {
            gsap.to('.container', { duration: 0.4, opacity: 0 });
          }
        }
      });
    },
  };
})();
