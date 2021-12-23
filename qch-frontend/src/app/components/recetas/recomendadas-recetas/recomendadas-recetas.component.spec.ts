import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendadasRecetasComponent } from './recomendadas-recetas.component';

describe('RecomendadasRecetasComponent', () => {
  let component: RecomendadasRecetasComponent;
  let fixture: ComponentFixture<RecomendadasRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendadasRecetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendadasRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
