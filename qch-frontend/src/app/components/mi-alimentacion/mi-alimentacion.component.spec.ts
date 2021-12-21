import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAlimentacionComponent } from './mi-alimentacion.component';

describe('MiAlimentacionComponent', () => {
  let component: MiAlimentacionComponent;
  let fixture: ComponentFixture<MiAlimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiAlimentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
