import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

interface Lesson {
  id: string;
  title: string;
  short: string;
  category: string;
  duration: string;
  description: string;
  caption: string;
  tip: string;
  keyframes: string;
  easing: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit, OnDestroy {
  lessons: Lesson[] = [
    {
      id: 'bounce',
      title: 'Le mouvement, image par image',
      short: 'Les bases',
      category: 'LES FONDAMENTAUX',
      duration: '3 min',
      description:
        'Une animation CSS fait évoluer une propriété dans le temps. Lance la démo, puis joue avec les réglages pour voir comment chaque paramètre change le mouvement.',
      caption: 'Un mouvement commence ici.',
      tip: 'Les animations CSS reposent sur des images-clés, définies avec @keyframes.',
      keyframes:
        '@keyframes bounce {\n  0%, 100% { transform: translateY(0) scale(1); }\n  45% { transform: translateY(-55px) scale(1.05, .95); }\n  65% { transform: translateY(0) scale(.95, 1.05); }\n  80% { transform: translateY(-15px) scale(1.02, .98); }\n}',
      easing: 'ease',
    },
    {
      id: 'easing',
      title: 'Le tempo avec easing',
      short: 'Le tempo (easing)',
      category: 'RYTHME & FLUIDITÉ',
      duration: '4 min',
      description:
        'Le timing-function donne une personnalité au mouvement. Compare une courbe naturelle à une vitesse linéaire : le début et la fin de l’animation ne se ressentent plus pareil.',
      caption: 'La courbe change tout.',
      tip: 'cubic-bezier() te permet de dessiner ta propre courbe d’accélération.',
      keyframes:
        '@keyframes bounce {\n  0%, 100% { transform: translateY(0) scale(1); }\n  45% { transform: translateY(-55px) scale(1.05, .95); }\n  65% { transform: translateY(0) scale(.95, 1.05); }\n  80% { transform: translateY(-15px) scale(1.02, .98); }\n}',
      easing: 'cubic-bezier(.34, 1.56, .64, 1)',
    },
    {
      id: 'pulse',
      title: 'Créer un effet de pulsation',
      short: 'La pulsation',
      category: 'TRANSFORMATIONS',
      duration: '3 min',
      description:
        'Agrandir et réduire un élément suffit à attirer le regard. Les transformations sont performantes et idéales pour créer de petits retours visuels.',
      caption: 'Un petit battement attire l’œil.',
      tip: 'transform: scale() anime souvent plus facilement que la largeur ou la hauteur.',
      keyframes:
        '@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.28); }\n}',
      easing: 'ease-in-out',
    },
    {
      id: 'slide',
      title: 'Déplacer un élément',
      short: 'Le déplacement',
      category: 'TRANSFORMATIONS',
      duration: '4 min',
      description:
        'Déplace la forme sur l’axe horizontal. Le déplacement avec translateX permet de garder l’élément dans le flux de la page sans recalculer sa mise en page.',
      caption: 'Glisse d’un côté à l’autre.',
      tip: 'Privilégie translateX() ou translateY() pour des déplacements fluides.',
      keyframes:
        '@keyframes slide {\n  from { transform: translateX(-75px); opacity: .3; }\n  to { transform: translateX(75px); opacity: 1; }\n}',
      easing: 'ease-in-out',
    },
    {
      id: 'rotate',
      title: 'Tourner autour d’un axe',
      short: 'La rotation',
      category: 'TRANSFORMATIONS',
      duration: '4 min',
      description:
        'La propriété rotate fait pivoter un élément. Combine-la à scale pour ajouter de l’énergie au mouvement, puis inverse la direction dans les réglages.',
      caption: 'Une rotation, mille possibilités.',
      tip: 'transform regroupe plusieurs effets : rotate(), scale(), translate()…',
      keyframes:
        '@keyframes rotate {\n  from { transform: rotate(0) scale(.75); }\n  to { transform: rotate(360deg) scale(1); }\n}',
      easing: 'ease-in-out',
    },
    {
      id: 'fade',
      title: 'Faire apparaître en douceur',
      short: 'L’apparition',
      category: 'OPACITÉ & TRANSITION',
      duration: '3 min',
      description:
        'Anime l’opacité en même temps qu’un léger déplacement pour faire entrer un élément en scène. C’est une base classique des interfaces web.',
      caption: 'Tout en douceur.',
      tip: 'opacity et transform s’animent bien ensemble pour les apparitions.',
      keyframes:
        '@keyframes fade {\n  from { transform: translateY(15px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}',
      easing: 'ease-out',
    },
    {
      id: 'color',
      title: 'Animer les couleurs',
      short: 'La couleur',
      category: 'COULEURS & CRÉATIVITÉ',
      duration: '4 min',
      description:
        'Les couleurs peuvent évoluer elles aussi. Fais passer la forme par plusieurs teintes tout en la faisant pivoter.',
      caption: 'Le mouvement prend des couleurs.',
      tip: 'Les couleurs animées sont jolies, mais les changements de transform sont plus légers à calculer.',
      keyframes:
        '@keyframes colorShift {\n  0% { background: #b8f36c; transform: rotate(0); }\n  50% { background: #b7a7fc; transform: rotate(90deg); }\n  100% { background: #ffad91; transform: rotate(180deg); }\n}',
      easing: 'ease-in-out',
    },
  ];
  // Declaration des variables pour le composant AccueilComponent
  currentIndex = 0;
  iteration = '1';
  duration = 1.2;
  delay = 0;
  direction = 'normal';
  completed: string[] = [];
  toast = '';
  isPaused = false;
  isFullscreen = false;
  animationEnabled = true;
  progressWidth = '0%';
  private toastTimer: ReturnType<typeof setTimeout> | undefined;
  etatmenu: boolean = false;
  menu() {
    this.etatmenu = !this.etatmenu;
  }

  get currentLesson(): Lesson {
    return this.lessons[this.currentIndex];
  }
  get nextLesson(): Lesson {
    return this.lessons[(this.currentIndex + 1) % this.lessons.length];
  }
  get progressPercent(): number {
    return (this.completed.length / this.lessons.length) * 100;
  }
  get animationName(): string {
    return this.currentLesson.id === 'color'
      ? 'colorShift'
      : this.currentLesson.id;
  }
  //   get animationName(): string {
  //   switch (this.currentLesson.id) {
  //     case 'bounce':
  //     case 'easing':
  //       return 'bounce';

  //     case 'color':
  //       return 'colorShift';

  //     default:
  //       return this.currentLesson.id;
  //   }
  // }
  get animationStyle(): { [key: string]: string } {
    return {
      'animation-name': this.animationEnabled ? this.animationName : 'none',
      'animation-duration': `${this.duration}s`,
      'animation-timing-function': this.currentLesson.easing,
      'animation-delay': `${this.delay}s`,
      'animation-iteration-count': this.iteration,
      'animation-direction': this.direction,
      'animation-play-state': this.isPaused ? 'paused' : 'running',
    };
  }
  get cssCode(): string {
    return `${this.currentLesson.keyframes}\n\n.demo-object {\n  animation-name: ${this.animationName};\n  animation-duration: ${this.duration.toFixed(1)}s;\n  animation-timing-function: ${this.currentLesson.easing};\n  animation-delay: ${this.delay.toFixed(1)}s;\n  animation-iteration-count: ${this.iteration};\n  animation-direction: ${this.direction};\n}`;
  }
  get totalDuration(): string {
    return this.iteration === 'infinite'
      ? '∞'
      : `${(this.duration * Number(this.iteration) + this.delay).toFixed(1)}s`;
  }
  get isCompleted(): boolean {
    return this.completed.includes(this.currentLesson.id);
  }

  ngOnInit(): void {
    try {
      this.completed = JSON.parse(
        localStorage.getItem('motionLabCompleted') || '[]',
      );
    } catch {
      this.completed = [];
    }
    this.replay();
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  selectLesson(index: number): void {
    this.currentIndex = (index + this.lessons.length) % this.lessons.length;
    this.isPaused = false;
    this.replay();
  }

  updateSettings(): void {
    this.isPaused = false;
    this.replay();
  }

  setIteration(value: string): void {
    this.iteration = value;
    this.updateSettings();
  }

  replay(): void {
    this.animationEnabled = false;
    this.isPaused = false;
    this.progressWidth = '0%';
    setTimeout(() => {
      this.animationEnabled = true;
      this.progressWidth = '100%';
    }, 30);
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
  }

  toggleComplete(): void {
    const id = this.currentLesson.id;
    this.completed = this.isCompleted
      ? this.completed.filter((item) => item !== id)
      : [...this.completed, id];
    localStorage.setItem('motionLabCompleted', JSON.stringify(this.completed));
    this.showToast(
      this.completed.includes(id)
        ? 'Leçon ajoutée à ton parcours ✓'
        : 'Leçon retirée du parcours',
    );
  }

  async copyCss(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.cssCode);
      this.showToast('CSS copié dans le presse-papiers ✓');
    } catch {
      this.showToast(
        'Copie impossible : vérifie les autorisations du navigateur.',
      );
    }
  }

  showToast(message: string): void {
    this.toast = message;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 2200);
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.selectLesson(this.currentIndex + 1);
    }
    if (event.key === 'Escape') this.isFullscreen = false;
  }
  //
  compte = [
    {
      image:
        'data:image/webp;base64,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',
      url: '',
    },
    {
      image:
        'data:image/webp;base64,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',
      url: '',
    },
    {
      image:
        'https://th.bing.com/th/id/OIP.Yd7rHlV9yFOyFHlMp6rGxQHaHa?w=157&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
      url: '',
    },
    {
      image:
        'data:image/webp;base64,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',
      url: '',
    },
    {
      image:
        'data:image/webp;base64,UklGRmQFAABXRUJQVlA4IFgFAADQKgCdASoCAQ4BPp1OpEylpKOiJBTogLATiWVu4XKRAtu7qXsecK7ilVQAhnOWK9avmk/ZL1jtOPg7UIPcehG97T0sTHT3X2jqx9o6sfaOrH2jqx9o6sfaOrH2jqx8Ie/wVPzczz5RWnP5P9ZXE0+Vso2fiWxQiYcnZ+C/QmJTDIGRAoO6+0b/U8jPA7EPPBjqlv01Dq3dh7HQHb8wX78h3JQelJei3PpnCRJhtRveRVmi2wwQ6Q9IFHaUxu/8O/UBQ+8fbLGpM2Rx4KXN/g9s/K4l7Zmr3oh62I6kTX+F3rvO+b+rB4USnuM/1LkqqaiDKjcD+8ILwI9/XCCUao0K5xNQZFmn+/J+czPkJLQAycuoSV38h3X2hUfC+2P8Offseict1+gsXmW83BQUGCHdcADfBZIrvKCgwQ7lk0J/PcZyZ1Co6sfaOrH2jqx9o6sfaOrH2jqx9o6sfaOrHwAA/v7dMAAAACRXF4rm8pbdkbkVMPL/GyTDij8OeFv5ig6d72/fVG0llvmXQ/iliGfuy+R9yQDyw08UnyzSfrQuqH63pPQAsKd5RLs1IGuMDq9RgXUAvG/0DcUzAyGSF30KenvzYsXNwKlsHkVKMxS5SDSJ0D10gLvbd8bRFxYHQ2KoDu44N7JmSbLsSJTxVIeL1fwXb+IjETISd3czHlmh6RB6BrhDjFe5+7aKwzP1HaP8srYRjE1zn5UONq7MaWIC4XH5UGNFkgiwqaARdy0F11yZsIhcYwXj/qBvchTHeCvNQ3IpVhwlaP8z9LY3d+bRHz8vw2dLLVBTmavxvQP7+yYSMMjSSIKJmpSAg1jEZRtAVBYcqmdPisJpXTOYiCwctX1vR60vMLmRCK2DT3e118KFOoEfiM1m8jp+AEVUES3m9f4euqfWbleiC6hyY6uAfxIeXU5oWUpYeuhhZ29ytGj8qnlOTiW3m25xWpMm5pwDDFeQxQ7GzuEABYQ6IP3ajvZK5BjX8PYCtOIOuEDr2fCvZA+uilTm75If6xEZabiYfc9O8hHWatipwAgHVfLp8aMw48w32zpQUJ+jXgi0yve6vjFnn6ujLDXowi4f9zgTD7dnOpuZ9K06bMsRAF2QXPxs7m1PMAAbzGyw79ul+lrHxnqx7jyUsF+K6vTDDZvxAymz6itNlcPCFCU74eM7UCPYZwruLNCTcBBOWcvoz75CEHu97fipEOWi3ZwjXg8pZJXgN6dzYlv33MS20TBAyjD1xqC3KGPbpdVgOTTSyg+2Orlzomdnhi1ETdR9/NKsA/olYyTHQpNxA+NeP2ny1Ha51GocWuY2GdNfaXPZEK4meWwwOx4DHV29fYb7yALKA+5kxwI/iWJIBvYJl0EIcJSPMu2XBpTBUoK/Nuo9C7lBuluzpkSwj8H/cuQMmT7/NVUbCB/ubv6GypyjP/WRZMflyzmhZGwMaLcp44vAdmH8/Y/SsOXu1HXkkf/Y3V2XJuJQewFSB1k6EuWQKMFkv9xFO00/HSozKfmgwAhPGLzeANmQbfOtWQCDQiP+RHeH0K6df4P++L79ysuuoQbaO6NfkbqDk2g16zOh+6/qP7U+I7HQACUiBccoCvzhtbCj7Mmk4jRQ7q7G60p0Mvf5LGVxxq7quxVha91DraB9CjrNgpvM4Zr4jPGXySjPDglt0MxD9Wc9jk3qpsB0/bi/X3mZccKFzVwJGzZDFK7ze8P12KhVyfgb+4MOti+soEly+CWwpMT7zkXdNgLE1bsI3VpMzs8ElZTpJAj/vtwD0B1ihE11cktwfyI/FK2okZIgCS0lJZE5GAAAAAFkCgnHVYAAAAAAAAA=',
      url: '',
    },
  ];
}
