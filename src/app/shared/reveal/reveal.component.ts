import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  /** Variante da entrada: '' (sobe), 'esquerda', 'direita' ou 'escala'. */
  @Input() appReveal: '' | 'esquerda' | 'direita' | 'escala' = '';
  @Input() appRevealDelay = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    if (this.appReveal) node.classList.add(`reveal-${this.appReveal}`);
    node.style.setProperty('--reveal-delay', `${this.appRevealDelay}ms`);

    if (!('IntersectionObserver' in window)) {
      node.classList.add('reveal-visivel');
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('reveal-visivel');
        this.observer?.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
