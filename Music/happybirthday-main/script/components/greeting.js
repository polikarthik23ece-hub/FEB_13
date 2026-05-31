(function () {
  window.Components = window.Components || {};

  window.Components.greeting = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-greeting";
      div.innerHTML = `
        <h1 class="greeting-title">
          ${section.title || "Hi"}
          <span class="greeting-name">${config.name}</span>
        </h1>
        <p class="greeting-subtitle">${section.subtitle || ""}</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const emoji = el.querySelector(".greeting-subtitle span");

      tl.from(el.querySelector(".greeting-title"), {
        duration: 0.7, opacity: 0, y: 10,
      })
      .from(el.querySelector(".greeting-subtitle"), {
        duration: 0.4, opacity: 0, y: 10,
      }, "-=0.2");

      if (emoji) {
        tl.fromTo(emoji,
          {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 40,
            z: 10,
            opacity: 0,
          },
          {
            rotationX: 0,
            rotationZ: 0,
            skewY: "0deg",
            y: 0,
            z: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          }, "-=0.3"
        );

        tl.to(emoji, { duration: 0.7, rotation: 90, x: 8 }, "+=1.4");
      }

      tl.to(el.querySelector(".greeting-title"), {
        duration: 0.7, opacity: 0, y: 10,
      }, "+=3.5")
      .to(el.querySelector(".greeting-subtitle"), {
        duration: 0.7, opacity: 0, y: 10,
      }, "-=1");
    },
  };
})();
