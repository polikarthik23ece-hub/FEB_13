(function () {
  window.Components = window.Components || {};

  window.Components.announcement = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-announcement";
      
      // Date animation line (if provided)
      if (section.dateText && section.dateStart !== undefined && section.dateEnd !== undefined) {
        const dateDiv = document.createElement('p');
        dateDiv.className = 'announcement-date';
        
        const prefix = document.createElement('span');
        prefix.className = 'date-prefix';
        prefix.textContent = section.dateText;
        
        const counter = document.createElement('span');
        counter.className = 'date-counter';
        counter.textContent = section.dateStart;
        counter.setAttribute('data-start', section.dateStart);
        counter.setAttribute('data-end', section.dateEnd);
        
        dateDiv.appendChild(prefix);
        dateDiv.appendChild(document.createTextNode(' '));
        dateDiv.appendChild(counter);
        div.appendChild(dateDiv);
      }
      
      // Main announcement text
      const p = document.createElement('p');
      p.className = 'announcement-text';
      p.textContent = section.text || "It's your birthday!!";
      div.appendChild(p);
      
      container.appendChild(div);
      return div;
    },

    animate(tl, el, config) {
      const dateEl = el.querySelector('.announcement-date');
      const textEl = el.querySelector('.announcement-text');
      const section = el.closest('.section').__section;
      
      if (dateEl) {
        tl.from(dateEl, { duration: 0.5, opacity: 0, y: 10 });
        
        // Animate counter from dateStart to dateEnd
        const counter = dateEl.querySelector('.date-counter');
        const start = parseInt(counter.getAttribute('data-start') || '2006');
        const end = parseInt(counter.getAttribute('data-end') || '2026');
        
        tl.to({ year: start }, {
          year: end,
          duration: 2,
          onUpdate: function() {
            counter.textContent = Math.floor(this.targets()[0].year);
          },
          ease: "power1.inOut",
        }); // Starts after dateEl fade-in
        
        // Fade out the date after year animation completes
        tl.to(dateEl, { duration: 0.6, opacity: 0, y: -10 });
      }
      
      // Text appears AFTER date fades out
      tl.from(textEl, { duration: 0.6, opacity: 0, y: 10 })
        .to(textEl, { duration: 0.7, opacity: 0, y: 10 }, "+=2.5");
    },
  };
})();
