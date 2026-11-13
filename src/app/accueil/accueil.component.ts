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
}
