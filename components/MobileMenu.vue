<template>
  <div>
    <svg class="hidden">
      <symbol id="icon-menu" viewBox="0 0 119 25">
        <title>menu</title>
        <path
          d="M36,8 L36,0 L100,0 L100,8 L36,8 Z M0,8 L0,0 L24,0 L24,8 L0,8 Z M0,28 L0,20 L71,20 L71,28 L0,28 Z"
        />
      </symbol>
      <symbol id="icon-close" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M24 1.485L22.515 0 12 10.515 1.485 0 0 1.485 10.515 12 0 22.515 1.485 24 12 13.484 22.515 24 24 22.515 13.484 12z"
        />
      </symbol>
    </svg>

    <main>
      <nav class="menu">
        <div class="menu__item menu__item--1" data-direction="tb">
          <div class="menu__item-inner">
            <div class="mainmenu">
              <NuxtLink to="/">О компании</NuxtLink>
              <NuxtLink to="/projects">Архитектура</NuxtLink>
              <NuxtLink to="/design">Дизайн интерьера</NuxtLink>
              <NuxtLink to="/gallery">Галерея</NuxtLink>
              <NuxtLink to="/partnership">Сотрудничество</NuxtLink>
              <NuxtLink to="/contact">Контакты</NuxtLink>
            </div>
            <p class="label label--topleft label--vert-mirror">ready to work</p>
            <p class="label label--bottomright label--vert">
              with love for you
            </p>
          </div>
        </div>

        <button class="action action--menu">
          <svg class="icon icon--menu"><use xlink:href="#icon-menu"></use></svg>
        </button>
        <button class="action action--close">
          <svg class="icon icon--close">
            <use xlink:href="#icon-close"></use>
          </svg>
        </button>
      </nav>
    </main>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",

  mounted() {
    class Menu {
      constructor(el) {
        this.DOM = { el: el };
        // Open and close ctls.
        this.DOM.openCtrl = this.DOM.el.querySelector(".action--menu");
        this.DOM.closeCtrl = this.DOM.el.querySelector(".action--close");
        this.DOM.openCtrl.addEventListener("click", () => this.open());
        this.DOM.closeCtrl.addEventListener("click", () => this.close());
        // The menu items.
        this.DOM.items = Array.from(
          this.DOM.el.querySelectorAll(".menu__item")
        );
        // The total number of items.
        this.itemsTotal = this.DOM.items.length;
        // Custom elements that will be animated.
        this.DOM.mainLinks = this.DOM.el.querySelectorAll(".mainmenu > a");
      }
      open() {
        this.toggle("open");
      }
      close() {
        this.toggle("close");
      }
      toggle(action) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        // Toggling the open state class.
        this.DOM.el.classList[action === "open" ? "add" : "remove"](
          "menu--open"
        );
        // After all is animated..
        const animationEnd = (pos) => {
          if (pos === this.itemsTotal - 1) {
            this.isAnimating = false;
          }
        };

        this.DOM.items.forEach((el, pos) => {
          const innerEl = el.querySelector(".menu__item-inner");
          const config = {};
          const configInner = {};
          const direction = el.dataset.direction;
          if (direction === "bt") {
            config.y = "100%";
            configInner.y = "-100%";
            configInner.x = "0%";
          } else if (direction === "tb") {
            config.y = "-100%";
            configInner.y = "100%";
            configInner.x = "0%";
          } else if (direction === "lr") {
            config.x = "-100%";
            configInner.x = "100%";
          } else if (direction === "rl") {
            config.x = "100%";
            configInner.x = "-100%";
          } else {
            config.x = "100%";
            config.y = "100%";
            configInner.x = "-100%";
            configInner.y = "-100%";
          }

          if (action === "open") {
            // Setting the initial values.
            TweenMax.set(el, config);
            TweenMax.set(innerEl, configInner);

            // Animate.
            TweenMax.to([el, innerEl], 0.9, {
              ease: Quint.easeOut,
              x: "0%",
              y: "0%",
              onComplete: () => animationEnd(pos),
            });
          } else {
            TweenMax.to(el, 0.6, {
              ease: Quart.easeInOut,
              x: config.x || 0,
              y: config.y || 0,
            });
            TweenMax.to(innerEl, 0.6, {
              ease: Quart.easeInOut,
              x: configInner.x || 0,
              y: configInner.y || 0,
              onComplete: () => animationEnd(pos),
            });
          }
        });

        // Show/Hide open and close ctrls.
        TweenMax.to(this.DOM.closeCtrl, 0.6, {
          ease: action === "open" ? Quint.easeOut : Quart.easeInOut,
          startAt: action === "open" ? { rotation: 0 } : null,
          opacity: action === "open" ? 1 : 0,
          rotation: action === "open" ? 180 : 270,
        });
        TweenMax.to(this.DOM.openCtrl, action === "open" ? 0.6 : 0.3, {
          delay: action === "open" ? 0 : 0.3,
          ease: action === "open" ? Quint.easeOut : Quad.easeOut,
          opacity: action === "open" ? 0 : 1,
        });

        // Main links animation.
        TweenMax.staggerTo(
          this.DOM.mainLinks,
          action === "open" ? 0.9 : 0.2,
          {
            ease: action === "open" ? Quint.easeOut : Quart.easeInOut,
            startAt: action === "open" ? { y: "50%", opacity: 0 } : null,
            y: action === "open" ? "0%" : "50%",
            opacity: action === "open" ? 1 : 0,
          },
          action === "open" ? 0.1 : -0.1
        );
      }
    }
    // Initialize the Menu.
    const menu = new Menu(document.querySelector("nav.menu"));
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}

$color-text: #fff;
$color-bg: #252525;
$color-link: #fff;
$color-link-hover: #f4af37;
$color-bg-item1: #e5e5e5;
$color-bg-item2: #e5e5e5;
$color-menu-item: #757470;
$color-item-alt: #494d54;
$color-tagline: #e2e2e2;

body {
  font-family: "europa", Futura, Arial, sans-serif;
  min-height: 100vh;
  color: #57585c;
  color: $color-text;
  background-color: #fff;
  background-color: $color-bg;
  overflow: hidden;
  padding: 6rem 0 0 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hidden {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* Icons */
.icon {
  display: block;
  width: 1.5em;
  height: 1.5em;
  margin: 0 auto;
}

main {
  position: relative;
  width: 100%;
}

.action {
  background: none;
  border: 0;
  color: #fff;
  cursor: pointer;
  padding: 0;
}

.action--menu {
  pointer-events: auto;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

.menu--open .action--menu {
  pointer-events: none;
}

.action--close {
  position: absolute;
  top: 1.5rem;
  right: 1.75rem;
  z-index: 1000;
  opacity: 0;
  padding: 0 0.5rem;
}

.icon--menu {
  width: 2rem;
}

.icon--close {
  width: 1rem;
}

.menu {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  pointer-events: none;
}

.menu--open {
  pointer-events: auto;
}

.menu__item {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.menu__item-inner {
  overflow: hidden;
  transform: translate3d(100%, 0, 0);
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu__item--1 .menu__item-inner {
  background: $color-bg-item1;
}

.label {
  display: none;
}

.mainmenu a {
  position: relative;
  overflow: hidden;
  font-size: 2rem;
  color: $color-menu-item;
  text-decoration: none;
  transition: color 0.1s;
  margin: 0.25rem 0;
  display: block;
  opacity: 0;

  &:hover {
    color: $color-link-hover;
  }
}

@media screen and (min-width: 53em) {
  body {
    padding: 0;
  }

  .menu {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-template-areas:
      "item1"
      "item1";
  }
  .menu__item {
    height: 100%;
  }
  .menu__item--1 {
    grid-area: item1;
  }
  .menu__item--2 {
    grid-area: item2;
  }
  .menu__item-inner {
    align-items: center;
  }
  .label {
    display: block;
    color: $color-item-alt;
    position: absolute;
    z-index: 1000;
    font-size: 0.85rem;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
  }
  .label--topleft {
    top: 2rem;
    left: 2rem;
  }
  .label--vert,
  .label--vert-mirror {
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
  }
  .label--vert-mirror {
    transform: rotate(180deg);
  }
  .label--bottomright {
    bottom: 2rem;
    right: 2rem;
  }
  .label::before {
    content: "------------- ";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -1px;
    margin: 0 0.75rem 0 0;
  }
  .label--vert::before,
  .label--vert-mirror::before {
    margin: 0.75rem 0;
  }
  .mainmenu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mainmenu {
    counter-reset: menuitem;
  }
  .mainmenu a {
    font-size: 5vw;
    text-transform: capitalize;
    overflow: visible;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
    position: relative;
    transition: color 0.3s;

    &:hover {
      color: $color-item-alt;
    }

    &::before {
      counter-increment: menuitem;
      content: counters(menuitem, "", decimal-leading-zero);
      position: absolute;
      font-size: 0.85rem;
      top: 25%;
      left: -1.25rem;
      color: $color-item-alt;
    }

    &::after {
      content: "";
      width: 100%;
      top: 58%;
      height: 6px;
      background: #bf9c62;
      position: absolute;
      left: 0;
      opacity: 0;
      transform: scale3d(0, 1, 1);
      transition: transform 0.3s, opacity 0.3s;
      transform-origin: 100% 50%;
    }

    &:hover::after {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
  .menu__item-inner:hover {
    opacity: 1;
  }
}
@media screen and (min-width: 320px) and (max-width: 767.99px) {
  .action--menu {
    right: 4rem;
  }

  .action--close {
    right: 4.2rem;
  }
}
</style>
