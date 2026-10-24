import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorDiaComponent } from './seletor-dia.component';

describe('SeletorDiaComponent', () => {
  let component: SeletorDiaComponent;
  let fixture: ComponentFixture<SeletorDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorDiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeletorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
