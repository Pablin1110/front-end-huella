import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScopeonePage } from './scopeone.page';

describe('ScopeonePage', () => {
  let component: ScopeonePage;
  let fixture: ComponentFixture<ScopeonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScopeonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
