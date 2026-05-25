import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadoMayor } from './dado-mayor';

describe('DadoMayor', () => {
  let component: DadoMayor;
  let fixture: ComponentFixture<DadoMayor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadoMayor],
    }).compileComponents();

    fixture = TestBed.createComponent(DadoMayor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
