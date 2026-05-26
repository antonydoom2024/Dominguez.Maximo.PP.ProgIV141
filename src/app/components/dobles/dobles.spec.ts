import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dobles } from './dobles';

describe('DadoMayor', () => {
  let component: Dobles;
  let fixture: ComponentFixture<Dobles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dobles],
    }).compileComponents();

    fixture = TestBed.createComponent(Dobles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
