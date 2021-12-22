import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoRecetasComponent } from './historico-recetas.component';

describe('HistoricoRecetasComponent', () => {
  let component: HistoricoRecetasComponent;
  let fixture: ComponentFixture<HistoricoRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoRecetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
