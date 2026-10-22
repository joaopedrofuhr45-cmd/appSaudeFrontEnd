import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RevealDirective } from './reveal.component';

@Component({
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal="esquerda" [appRevealDelay]="120" id="alvo">oi</div>`,
})
class HostComponent {}

describe('RevealDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let alvo: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    alvo = fixture.debugElement.query(By.css('#alvo')).nativeElement;
  });

  it('adds the reveal classes and the delay variable', () => {
    expect(alvo.classList).toContain('reveal');
    expect(alvo.classList).toContain('reveal-esquerda');
    expect(alvo.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });
});
